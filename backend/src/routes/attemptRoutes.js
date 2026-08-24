const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const prisma = require('../db');
const { requireAuth, optionalAuth } = require('../middleware/auth');

// Setup upload directory for speaking recordings
const uploadDir = path.join(__dirname, '../../uploads/speaking');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname) || '.webm';
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `speaking-${req.params.id || 'rec'}-${uniqueSuffix}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 25 * 1024 * 1024 } // 25MB max per recording
});

// Start or Resume a Mock Test Attempt
router.post('/mock-tests/:id/start', requireAuth, async (req, res) => {
  try {
    const mockTestId = req.params.id;
    const userId = req.user.id;

    // Check if test exists
    const mockTest = await prisma.mockTest.findUnique({
      where: { id: mockTestId },
      include: {
        sections: {
          include: {
            questions: true
          }
        }
      }
    });

    if (!mockTest) {
      return res.status(404).json({ success: false, message: 'Mock test not found' });
    }

    // Check if user has an existing IN_PROGRESS attempt
    let attempt = await prisma.attempt.findFirst({
      where: {
        userId,
        mockTestId,
        status: 'IN_PROGRESS'
      },
      orderBy: { startedAt: 'desc' }
    });

    // Calculate maximum possible scores
    let listeningMax = 0, readingMax = 0, writingMax = 0, speakingMax = 0;
    mockTest.sections.forEach(sec => {
      sec.questions.forEach(q => {
        if (sec.type === 'LISTENING') listeningMax += q.marks;
        else if (sec.type === 'READING') readingMax += q.marks;
        else if (sec.type === 'WRITING') writingMax += q.marks;
        else if (sec.type === 'SPEAKING') speakingMax += q.marks;
      });
    });
    const maxScore = listeningMax + readingMax + writingMax + speakingMax;

    if (!attempt) {
      attempt = await prisma.attempt.create({
        data: {
          userId,
          mockTestId,
          status: 'IN_PROGRESS',
          listeningMax,
          readingMax,
          writingMax,
          speakingMax,
          maxScore
        }
      });
    }

    res.json({
      success: true,
      message: 'Attempt initialized',
      attemptId: attempt.id,
      attempt
    });
  } catch (err) {
    console.error('Start Attempt Error:', err);
    res.status(500).json({ success: false, message: 'Failed to start attempt', error: err.message });
  }
});

// Get Attempt State (for test-taking)
router.get('/attempts/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const isAdmin = req.user.role === 'ADMIN';

    const attempt = await prisma.attempt.findUnique({
      where: { id },
      include: {
        mockTest: {
          include: {
            sections: {
              orderBy: { order: 'asc' },
              include: {
                questions: {
                  orderBy: { order: 'asc' },
                  include: {
                    options: {
                      orderBy: { order: 'asc' },
                      select: {
                        id: true,
                        optionText: true,
                        order: true,
                        ...(isAdmin ? { isCorrect: true } : {})
                      }
                    }
                  }
                }
              }
            }
          }
        },
        answers: true,
        writingSubmissions: true,
        speakingSubmissions: true
      }
    });

    if (!attempt) {
      return res.status(404).json({ success: false, message: 'Attempt not found' });
    }

    // Security: only the student who owns the attempt or an admin can access it
    if (attempt.userId !== userId && !isAdmin) {
      return res.status(403).json({ success: false, message: 'Access denied to this attempt' });
    }

    res.json({ success: true, attempt });
  } catch (err) {
    console.error('Get Attempt Error:', err);
    res.status(500).json({ success: false, message: 'Failed to load attempt', error: err.message });
  }
});

// Save or Auto-save Answers Draft
router.post('/attempts/:id/answers', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const { answers, writing, speaking } = req.body;
    const userId = req.user.id;

    const attempt = await prisma.attempt.findUnique({ where: { id } });
    if (!attempt || (attempt.userId !== userId && req.user.role !== 'ADMIN')) {
      return res.status(403).json({ success: false, message: 'Unauthorized or attempt not found' });
    }

    if (attempt.status !== 'IN_PROGRESS') {
      return res.status(400).json({ success: false, message: 'Cannot edit answers on a submitted test' });
    }

    // Save objective/text answers
    if (Array.isArray(answers)) {
      for (const ans of answers) {
        if (!ans.questionId) continue;
        await prisma.answer.upsert({
          where: {
            attemptId_questionId: {
              attemptId: id,
              questionId: ans.questionId
            }
          },
          update: {
            answer: ans.answer !== undefined ? String(ans.answer).trim() : null
          },
          create: {
            attemptId: id,
            questionId: ans.questionId,
            answer: ans.answer !== undefined ? String(ans.answer).trim() : null
          }
        });
      }
    }

    // Save writing draft (supports single object or array of writing tasks)
    if (writing) {
      const writingList = Array.isArray(writing) ? writing : [writing];
      for (const w of writingList) {
        if (w && w.questionId && w.answer !== undefined) {
          let wordsArr = String(w.answer).trim().split(/\s+/).filter(Boolean);
          if (wordsArr.length > 215) {
            wordsArr = wordsArr.slice(0, 215);
            w.answer = wordsArr.join(' ');
          }
          const words = wordsArr.length;
          await prisma.writingSubmission.upsert({
            where: {
              attemptId_questionId: {
                attemptId: id,
                questionId: w.questionId
              }
            },
            update: {
              answer: w.answer,
              wordCount: words,
              status: 'PENDING'
            },
            create: {
              attemptId: id,
              questionId: w.questionId,
              answer: w.answer,
              wordCount: words,
              status: 'PENDING'
            }
          });
        }
      }
    }

    res.json({ success: true, message: 'Answers saved successfully' });
  } catch (err) {
    console.error('Save Answers Error:', err);
    res.status(500).json({ success: false, message: 'Failed to save answers', error: err.message });
  }
});

// Upload Speaking Audio Recording
router.post('/attempts/:id/upload-speaking', requireAuth, upload.single('audio'), async (req, res) => {
  try {
    const { id } = req.params;
    const { questionId, duration } = req.body;
    const userId = req.user.id;

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No audio file provided' });
    }

    const attempt = await prisma.attempt.findUnique({ where: { id } });
    if (!attempt || (attempt.userId !== userId && req.user.role !== 'ADMIN')) {
      return res.status(403).json({ success: false, message: 'Unauthorized or attempt not found' });
    }

    const audioUrl = `/uploads/speaking/${req.file.filename}`;
    const durSec = parseInt(duration) || 0;

    const submission = await prisma.speakingSubmission.upsert({
      where: {
        attemptId_questionId: {
          attemptId: id,
          questionId
        }
      },
      update: {
        audioUrl,
        duration: durSec,
        status: 'PENDING'
      },
      create: {
        attemptId: id,
        questionId,
        audioUrl,
        duration: durSec,
        status: 'PENDING'
      }
    });

    res.json({
      success: true,
      message: 'Speaking audio uploaded successfully',
      audioUrl,
      submission
    });
  } catch (err) {
    console.error('Upload Speaking Error:', err);
    res.status(500).json({ success: false, message: 'Failed to upload speaking audio', error: err.message });
  }
});

// Submit Attempt & Trigger Evaluation
router.post('/attempts/:id/submit', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { answers, writing, speaking } = req.body;

    const attempt = await prisma.attempt.findUnique({
      where: { id },
      include: {
        mockTest: {
          include: {
            sections: {
              include: {
                questions: {
                  include: {
                    options: true
                  }
                }
              }
            }
          }
        }
      }
    });

    if (!attempt || (attempt.userId !== userId && req.user.role !== 'ADMIN')) {
      return res.status(403).json({ success: false, message: 'Unauthorized or attempt not found' });
    }

    if (attempt.status === 'COMPLETED' || attempt.status === 'UNDER_REVIEW') {
      return res.json({ success: true, message: 'Attempt was already submitted', attemptId: id });
    }

    // Process & save submitted answers first
    if (Array.isArray(answers)) {
      for (const ans of answers) {
        if (!ans.questionId) continue;
        await prisma.answer.upsert({
          where: { attemptId_questionId: { attemptId: id, questionId: ans.questionId } },
          update: { answer: ans.answer !== undefined ? String(ans.answer).trim() : '' },
          create: { attemptId: id, questionId: ans.questionId, answer: ans.answer !== undefined ? String(ans.answer).trim() : '' }
        });
      }
    }

    if (writing) {
      const writingList = Array.isArray(writing) ? writing : [writing];
      for (const w of writingList) {
        if (w && w.questionId && w.answer !== undefined) {
          let wordsArr = String(w.answer).trim().split(/\s+/).filter(Boolean);
          if (wordsArr.length > 215) {
            wordsArr = wordsArr.slice(0, 215);
            w.answer = wordsArr.join(' ');
          }
          const words = wordsArr.length;
          await prisma.writingSubmission.upsert({
            where: { attemptId_questionId: { attemptId: id, questionId: w.questionId } },
            update: { answer: w.answer, wordCount: words, status: 'PENDING' },
            create: { attemptId: id, questionId: w.questionId, answer: w.answer, wordCount: words, status: 'PENDING' }
          });
        }
      }
    }

    if (Array.isArray(speaking)) {
      for (const spk of speaking) {
        if (spk.questionId && spk.audioUrl) {
          await prisma.speakingSubmission.upsert({
            where: { attemptId_questionId: { attemptId: id, questionId: spk.questionId } },
            update: { audioUrl: spk.audioUrl, duration: spk.duration || 0, status: 'PENDING' },
            create: { attemptId: id, questionId: spk.questionId, audioUrl: spk.audioUrl, duration: spk.duration || 0, status: 'PENDING' }
          });
        }
      }
    }

    // --- AUTOMATIC EVALUATION ENGINE ---
    // Fetch all answers saved for this attempt
    const savedAnswers = await prisma.answer.findMany({ where: { attemptId: id } });
    const answersMap = new Map(savedAnswers.map(a => [a.questionId, a.answer]));

    let listeningScore = 0, listeningMax = 0;
    let readingScore = 0, readingMax = 0;
    let writingMax = 0, speakingMax = 0;
    let hasWriting = false, hasSpeaking = false;

    for (const section of attempt.mockTest.sections) {
      if (section.type === 'WRITING') {
        hasWriting = true;
        writingMax += section.questions.reduce((sum, q) => sum + q.marks, 0);
      } else if (section.type === 'SPEAKING') {
        hasSpeaking = true;
        speakingMax += section.questions.reduce((sum, q) => sum + q.marks, 0);
      }

      for (const question of section.questions) {
        const studentAns = (answersMap.get(question.id) || '').trim();

        if (section.type === 'LISTENING' || section.type === 'READING') {
          if (section.type === 'LISTENING') listeningMax += question.marks;
          if (section.type === 'READING') readingMax += question.marks;

          let isCorrect = false;
          let marksEarned = 0;

          if (question.type === 'MCQ' || question.type === 'TRUE_FALSE') {
            // Find the correct option
            const correctOpt = question.options.find(o => o.isCorrect);
            if (correctOpt && studentAns) {
              // Match by option ID or optionText
              if (
                studentAns.toLowerCase() === correctOpt.id.toLowerCase() ||
                studentAns.toLowerCase() === correctOpt.optionText.toLowerCase() ||
                studentAns.toLowerCase() === correctOpt.optionText.charAt(0).toLowerCase() // e.g. "A"
              ) {
                isCorrect = true;
                marksEarned = question.marks;
              }
            }
          } else if (question.type === 'FILL_BLANK') {
            // Options might contain valid accepted words
            const correctOptions = question.options.filter(o => o.isCorrect);
            if (correctOptions.length > 0) {
              const matched = correctOptions.some(opt => 
                opt.optionText.toLowerCase().trim() === studentAns.toLowerCase().trim()
              );
              if (matched) {
                isCorrect = true;
                marksEarned = question.marks;
              }
            }
          }

          // Update Answer with isCorrect and marks
          await prisma.answer.upsert({
            where: { attemptId_questionId: { attemptId: id, questionId: question.id } },
            update: { isCorrect, marks: marksEarned },
            create: { attemptId: id, questionId: question.id, answer: studentAns, isCorrect, marks: marksEarned }
          });

          if (section.type === 'LISTENING') listeningScore += marksEarned;
          if (section.type === 'READING') readingScore += marksEarned;
        }
      }
    }

    const needsManualReview = hasWriting || hasSpeaking;
    const finalStatus = needsManualReview ? 'UNDER_REVIEW' : 'COMPLETED';
    const totalScore = listeningScore + readingScore;
    const maxScore = listeningMax + readingMax + writingMax + speakingMax;

    const updatedAttempt = await prisma.attempt.update({
      where: { id },
      data: {
        submittedAt: new Date(),
        status: finalStatus,
        listeningScore,
        listeningMax,
        readingScore,
        readingMax,
        writingMax,
        speakingMax,
        totalScore,
        maxScore
      }
    });

    res.json({
      success: true,
      message: 'Test submitted successfully',
      status: finalStatus,
      listeningScore: `${listeningScore}/${listeningMax}`,
      readingScore: `${readingScore}/${readingMax}`,
      attempt: updatedAttempt
    });

  } catch (err) {
    console.error('Submit Attempt Error:', err);
    res.status(500).json({ success: false, message: 'Failed to submit attempt', error: err.message });
  }
});

// Get Student Result Summary
router.get('/results/:attemptId', optionalAuth, async (req, res) => {
  try {
    const { attemptId } = req.params;

    const attempt = await prisma.attempt.findUnique({
      where: { id: attemptId },
      include: {
        user: {
          select: { id: true, name: true, email: true, phone: true, targetCountry: true }
        },
        mockTest: true,
        answers: {
          include: {
            question: {
              include: {
                section: true,
                options: true
              }
            }
          }
        },
        writingSubmissions: {
          include: {
            question: true,
            evaluatedBy: { select: { name: true } }
          }
        },
        speakingSubmissions: {
          include: {
            question: true,
            evaluatedBy: { select: { name: true } }
          }
        }
      }
    });

    if (!attempt) {
      return res.status(404).json({ success: false, message: 'Result not found' });
    }

    // If student is requesting, make sure they own it (or admin)
    if (req.user && req.user.role !== 'ADMIN' && attempt.userId !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Unauthorized' });
    }

    // Format section reviews
    const objectiveReviews = attempt.answers.map(ans => {
      const q = ans.question;
      const correctOpt = q.options.find(o => o.isCorrect);
      return {
        questionId: q.id,
        sectionType: q.section.type,
        questionText: q.questionText,
        studentAnswer: ans.answer,
        correctAnswer: correctOpt ? correctOpt.optionText : 'N/A',
        isCorrect: ans.isCorrect,
        marks: ans.marks,
        maxMarks: q.marks
      };
    });

    res.json({
      success: true,
      result: {
        attemptId: attempt.id,
        student: attempt.user,
        testTitle: attempt.mockTest.title,
        status: attempt.status,
        startedAt: attempt.startedAt,
        submittedAt: attempt.submittedAt,
        scores: {
          listening: { score: attempt.listeningScore, max: attempt.listeningMax, status: 'COMPLETED' },
          reading: { score: attempt.readingScore, max: attempt.readingMax, status: 'COMPLETED' },
          writing: {
            score: attempt.writingScore,
            max: attempt.writingMax,
            status: attempt.writingSubmissions.every(w => w.status === 'EVALUATED') ? 'EVALUATED' : 'PENDING'
          },
          speaking: {
            score: attempt.speakingScore,
            max: attempt.speakingMax,
            status: attempt.speakingSubmissions.every(s => s.status === 'EVALUATED') ? 'EVALUATED' : 'PENDING'
          },
          total: { score: attempt.totalScore, max: attempt.maxScore },
          bandScore: attempt.bandScore
        },
        writingDetails: attempt.writingSubmissions.map(w => ({
          id: w.id,
          questionText: w.question.questionText,
          essay: w.answer,
          wordCount: w.wordCount,
          score: w.score,
          maxMarks: w.maxMarks,
          feedback: w.feedback,
          status: w.status,
          evaluatedBy: w.evaluatedBy ? w.evaluatedBy.name : null,
          evaluatedAt: w.evaluatedAt
        })),
        speakingDetails: attempt.speakingSubmissions.map(s => ({
          id: s.id,
          questionText: s.question.questionText,
          audioUrl: s.audioUrl,
          duration: s.duration,
          score: s.score,
          maxMarks: s.maxMarks,
          feedback: s.feedback,
          status: s.status,
          evaluatedBy: s.evaluatedBy ? s.evaluatedBy.name : null,
          evaluatedAt: s.evaluatedAt
        })),
        objectiveReviews
      }
    });

  } catch (err) {
    console.error('Get Result Error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch result', error: err.message });
  }
});

module.exports = router;
