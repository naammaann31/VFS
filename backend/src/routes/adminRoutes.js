const express = require('express');
const router = express.Router();
const prisma = require('../db');
const { requireAdmin } = require('../middleware/auth');

// All routes in this router require admin role
router.use(requireAdmin);

// Helper function to check and finalize attempt status & total score
async function checkAndFinalizeAttempt(attemptId) {
  const attempt = await prisma.attempt.findUnique({
    where: { id: attemptId },
    include: {
      writingSubmissions: true,
      speakingSubmissions: true
    }
  });

  if (!attempt) return;

  const writingPending = attempt.writingSubmissions.some(w => w.status !== 'EVALUATED');
  const speakingPending = attempt.speakingSubmissions.some(s => s.status !== 'EVALUATED');

  // Calculate sum of evaluated writing scores
  const writingScore = attempt.writingSubmissions.reduce((sum, w) => sum + (w.score || 0), 0);
  // Calculate sum of evaluated speaking scores
  const speakingScore = attempt.speakingSubmissions.reduce((sum, s) => sum + (s.score || 0), 0);

  const totalScore = attempt.listeningScore + attempt.readingScore + writingScore + speakingScore;
  const isCompleted = !writingPending && !speakingPending;

  // Approximate IELTS band score calculation (0 - 9.0 scale)
  let bandScore = null;
  if (isCompleted && attempt.maxScore > 0) {
    const rawRatio = totalScore / attempt.maxScore;
    bandScore = Math.round(rawRatio * 9.0 * 2) / 2; // rounds to nearest 0.5
    if (bandScore > 9.0) bandScore = 9.0;
    if (bandScore < 1.0) bandScore = 1.0;
  }

  await prisma.attempt.update({
    where: { id: attemptId },
    data: {
      writingScore,
      speakingScore,
      totalScore,
      bandScore,
      status: isCompleted ? 'COMPLETED' : 'UNDER_REVIEW'
    }
  });
}

// 1. Dashboard Overview Metrics
router.get('/stats', async (req, res) => {
  try {
    const totalTests = await prisma.mockTest.count();
    const totalStudents = await prisma.user.count({ where: { role: 'STUDENT' } });
    const totalAttempts = await prisma.attempt.count();
    const pendingWriting = await prisma.writingSubmission.count({ where: { status: 'PENDING' } });
    const pendingSpeaking = await prisma.speakingSubmission.count({ where: { status: 'PENDING' } });
    const completedAttempts = await prisma.attempt.count({ where: { status: 'COMPLETED' } });

    res.json({
      success: true,
      stats: {
        totalTests,
        totalStudents,
        totalAttempts,
        pendingWriting,
        pendingSpeaking,
        pendingTotal: pendingWriting + pendingSpeaking,
        completedAttempts
      }
    });
  } catch (err) {
    console.error('Stats Error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch stats', error: err.message });
  }
});

// 2. List All Attempts with Filters
router.get('/attempts', async (req, res) => {
  try {
    const { status, search } = req.query;
    const where = {};
    if (status) where.status = status;
    if (search) {
      where.user = {
        OR: [
          { name: { contains: search } },
          { email: { contains: search } },
          { phone: { contains: search } }
        ]
      };
    }

    const attempts = await prisma.attempt.findMany({
      where,
      include: {
        user: {
          select: { id: true, name: true, email: true, phone: true, targetCountry: true }
        },
        mockTest: {
          select: { id: true, title: true, category: true }
        },
        writingSubmissions: {
          select: { id: true, status: true, score: true }
        },
        speakingSubmissions: {
          select: { id: true, status: true, score: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ success: true, attempts });
  } catch (err) {
    console.error('Fetch Attempts Error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch attempts', error: err.message });
  }
});

// 3. List Students
router.get('/students', async (req, res) => {
  try {
    const students = await prisma.user.findMany({
      where: { role: 'STUDENT' },
      include: {
        attempts: {
          include: {
            mockTest: { select: { title: true } }
          },
          orderBy: { createdAt: 'desc' }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ success: true, students });
  } catch (err) {
    console.error('Fetch Students Error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch students', error: err.message });
  }
});

// 4. Get Pending Evaluations (Unified Queue)
router.get('/evaluations', async (req, res) => {
  try {
    const pendingWriting = await prisma.writingSubmission.findMany({
      where: { status: 'PENDING' },
      include: {
        attempt: {
          include: {
            user: { select: { id: true, name: true, email: true } },
            mockTest: { select: { id: true, title: true } }
          }
        },
        question: { select: { id: true, questionText: true, marks: true } }
      },
      orderBy: { createdAt: 'asc' }
    });

    const pendingSpeaking = await prisma.speakingSubmission.findMany({
      where: { status: 'PENDING' },
      include: {
        attempt: {
          include: {
            user: { select: { id: true, name: true, email: true } },
            mockTest: { select: { id: true, title: true } }
          }
        },
        question: { select: { id: true, questionText: true, marks: true } }
      },
      orderBy: { createdAt: 'asc' }
    });

    res.json({
      success: true,
      writing: pendingWriting,
      speaking: pendingSpeaking,
      totalPending: pendingWriting.length + pendingSpeaking.length
    });
  } catch (err) {
    console.error('Fetch Evaluations Error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch evaluations', error: err.message });
  }
});

// 5. Get Writing Evaluations List
router.get('/evaluations/writing', async (req, res) => {
  try {
    const { status } = req.query;
    const where = status ? { status } : {};

    const list = await prisma.writingSubmission.findMany({
      where,
      include: {
        attempt: {
          include: {
            user: { select: { id: true, name: true, email: true } },
            mockTest: { select: { id: true, title: true } }
          }
        },
        question: true,
        evaluatedBy: { select: { id: true, name: true } }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ success: true, writingSubmissions: list });
  } catch (err) {
    console.error('Fetch Writing List Error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch writing submissions', error: err.message });
  }
});

// 6. Evaluate Writing Submission
router.post('/writing/:id/evaluate', async (req, res) => {
  try {
    const { id } = req.params;
    const { score, feedback } = req.body;
    const adminId = req.user.id;

    if (score === undefined || score === null || isNaN(score)) {
      return res.status(400).json({ success: false, message: 'Valid score is required' });
    }

    const updated = await prisma.writingSubmission.update({
      where: { id },
      data: {
        score: parseFloat(score),
        feedback: feedback ? feedback.trim() : null,
        status: 'EVALUATED',
        evaluatedById: adminId,
        evaluatedAt: new Date()
      }
    });

    // Check if entire attempt is now completed
    await checkAndFinalizeAttempt(updated.attemptId);

    res.json({
      success: true,
      message: 'Writing evaluated successfully',
      submission: updated
    });
  } catch (err) {
    console.error('Evaluate Writing Error:', err);
    res.status(500).json({ success: false, message: 'Failed to evaluate writing', error: err.message });
  }
});

// 7. Get Speaking Evaluations List
router.get('/evaluations/speaking', async (req, res) => {
  try {
    const { status } = req.query;
    const where = status ? { status } : {};

    const list = await prisma.speakingSubmission.findMany({
      where,
      include: {
        attempt: {
          include: {
            user: { select: { id: true, name: true, email: true } },
            mockTest: { select: { id: true, title: true } }
          }
        },
        question: true,
        evaluatedBy: { select: { id: true, name: true } }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({ success: true, speakingSubmissions: list });
  } catch (err) {
    console.error('Fetch Speaking List Error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch speaking submissions', error: err.message });
  }
});

// 8. Evaluate Speaking Submission
router.post('/speaking/:id/evaluate', async (req, res) => {
  try {
    const { id } = req.params;
    const { score, feedback } = req.body;
    const adminId = req.user.id;

    if (score === undefined || score === null || isNaN(score)) {
      return res.status(400).json({ success: false, message: 'Valid score is required' });
    }

    const updated = await prisma.speakingSubmission.update({
      where: { id },
      data: {
        score: parseFloat(score),
        feedback: feedback ? feedback.trim() : null,
        status: 'EVALUATED',
        evaluatedById: adminId,
        evaluatedAt: new Date()
      }
    });

    // Check if entire attempt is now completed
    await checkAndFinalizeAttempt(updated.attemptId);

    res.json({
      success: true,
      message: 'Speaking evaluated successfully',
      submission: updated
    });
  } catch (err) {
    console.error('Evaluate Speaking Error:', err);
    res.status(500).json({ success: false, message: 'Failed to evaluate speaking', error: err.message });
  }
});

// 9. Google Sheets / CSV Importer
router.post('/import-sheet', async (req, res) => {
  try {
    const { mockTitle, duration, rows } = req.body;

    if (!rows || !Array.isArray(rows) || rows.length === 0) {
      return res.status(400).json({ success: false, message: 'Rows array is required for import' });
    }

    const title = mockTitle || rows[0]['Mock ID'] || rows[0]['Mock Title'] || 'Imported Mock Test';
    const testDuration = parseInt(duration) || parseInt(rows[0]['Duration']) || 40;

    // Create or find Mock Test
    const mockTest = await prisma.mockTest.create({
      data: {
        title,
        description: `Imported on ${new Date().toLocaleDateString()}`,
        category: 'IELTS',
        duration: testDuration,
        status: 'PUBLISHED'
      }
    });

    // Define sections map: LISTENING, READING, WRITING, SPEAKING
    const sectionTypes = ['LISTENING', 'READING', 'WRITING', 'SPEAKING'];
    const sectionMap = {};

    for (let i = 0; i < sectionTypes.length; i++) {
      const type = sectionTypes[i];
      const section = await prisma.section.create({
        data: {
          mockTestId: mockTest.id,
          type,
          title: `${type.charAt(0) + type.slice(1).toLowerCase()} Section`,
          order: i + 1
        }
      });
      sectionMap[type] = section.id;
    }

    let importedCount = 0;

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const rawSection = (row['Section'] || row['section'] || 'LISTENING').toUpperCase().trim();
      const sectionType = sectionTypes.includes(rawSection) ? rawSection : 'LISTENING';
      const sectionId = sectionMap[sectionType];

      const questionText = row['Question'] || row['question'] || `Question ${i + 1}`;
      let qType = (row['Question Type'] || row['type'] || 'MCQ').toUpperCase().trim().replace(/[-\s]/g, '_');
      if (!['MCQ', 'TRUE_FALSE', 'FILL_BLANK', 'WRITING', 'SPEAKING'].includes(qType)) {
        if (sectionType === 'WRITING') qType = 'WRITING';
        else if (sectionType === 'SPEAKING') qType = 'SPEAKING';
        else qType = 'MCQ';
      }

      const passage = row['Passage'] || row['passage'] || null;
      const audioUrl = row['Audio File'] || row['audioUrl'] || null;
      const marks = parseFloat(row['Marks'] || row['marks']) || (qType === 'WRITING' || qType === 'SPEAKING' ? 9.0 : 1.0);
      const prepTime = parseInt(row['Preparation Time'] || row['preparationTime']) || 0;
      const respTime = parseInt(row['Response Time'] || row['responseTime']) || 60;
      const correctAns = (row['Correct Answer'] || row['correctAnswer'] || '').trim();

      const question = await prisma.question.create({
        data: {
          sectionId,
          type: qType,
          questionText,
          passage,
          audioUrl,
          preparationTime: prepTime,
          responseTime: respTime,
          marks,
          order: i + 1
        }
      });

      // Create Options if objective
      if (qType === 'MCQ' || qType === 'TRUE_FALSE') {
        const optionKeys = ['Option A', 'Option B', 'Option C', 'Option D'];
        for (let optIdx = 0; optIdx < optionKeys.length; optIdx++) {
          const optKey = optionKeys[optIdx];
          const optText = row[optKey];
          if (optText && optText.trim()) {
            const letter = String.fromCharCode(65 + optIdx); // 'A', 'B', 'C', 'D'
            const isCorrect = correctAns.toUpperCase() === letter || 
                              correctAns.toLowerCase() === optText.toLowerCase().trim();
            await prisma.option.create({
              data: {
                questionId: question.id,
                optionText: optText.trim(),
                isCorrect,
                order: optIdx + 1
              }
            });
          }
        }
      } else if (qType === 'FILL_BLANK' && correctAns) {
        // Create an Option entry for valid fill-in-the-blank answer(s)
        const validAnswers = correctAns.split(/[,|\/]/).map(a => a.trim()).filter(Boolean);
        for (let vIdx = 0; vIdx < validAnswers.length; vIdx++) {
          await prisma.option.create({
            data: {
              questionId: question.id,
              optionText: validAnswers[vIdx],
              isCorrect: true,
              order: vIdx + 1
            }
          });
        }
      }

      importedCount++;
    }

    res.json({
      success: true,
      message: `Successfully imported Mock Test with ${importedCount} questions`,
      mockTestId: mockTest.id
    });
  } catch (err) {
    console.error('Import Error:', err);
    res.status(500).json({ success: false, message: 'Failed to import sheet data', error: err.message });
  }
});

module.exports = router;
