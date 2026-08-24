const express = require('express');
const router = express.Router();
const prisma = require('../db');
const { optionalAuth, requireAdmin } = require('../middleware/auth');

// List published mock tests
router.get('/', optionalAuth, async (req, res) => {
  try {
    const isAdmin = req.user && req.user.role === 'ADMIN';
    const where = isAdmin ? {} : { status: 'PUBLISHED' };

    const tests = await prisma.mockTest.findMany({
      where,
      include: {
        sections: {
          orderBy: { order: 'asc' },
          include: {
            questions: {
              select: {
                id: true,
                type: true,
                marks: true
              }
            }
          }
        },
        _count: {
          select: { attempts: true }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    const formattedTests = tests.map(test => {
      let totalQuestions = 0;
      let totalMarks = 0;
      const sectionSummary = test.sections.map(sec => {
        totalQuestions += sec.questions.length;
        const secMarks = sec.questions.reduce((sum, q) => sum + q.marks, 0);
        totalMarks += secMarks;
        return {
          id: sec.id,
          type: sec.type,
          title: sec.title,
          questionCount: sec.questions.length,
          marks: secMarks
        };
      });

      return {
        id: test.id,
        title: test.title,
        description: test.description,
        category: test.category,
        duration: test.duration,
        status: test.status,
        totalQuestions,
        totalMarks,
        sections: sectionSummary,
        attemptCount: test._count.attempts,
        createdAt: test.createdAt
      };
    });

    res.json({ success: true, tests: formattedTests });
  } catch (err) {
    console.error('Fetch Mock Tests Error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch mock tests', error: err.message });
  }
});

// Get single mock test by ID (sanitizing correct answers for students)
router.get('/:id', optionalAuth, async (req, res) => {
  try {
    const { id } = req.params;
    const isAdmin = req.user && req.user.role === 'ADMIN';

    const test = await prisma.mockTest.findUnique({
      where: { id },
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
                    ...(isAdmin ? { isCorrect: true } : {}) // Only include isCorrect for Admin
                  }
                }
              }
            }
          }
        }
      }
    });

    if (!test) {
      return res.status(404).json({ success: false, message: 'Mock test not found' });
    }

    res.json({ success: true, test });
  } catch (err) {
    console.error('Fetch Mock Test Detail Error:', err);
    res.status(500).json({ success: false, message: 'Failed to fetch mock test', error: err.message });
  }
});

// Admin: Create Mock Test
router.post('/', requireAdmin, async (req, res) => {
  try {
    const { title, description, category, duration, status } = req.body;

    if (!title) {
      return res.status(400).json({ success: false, message: 'Test title is required' });
    }

    const newTest = await prisma.mockTest.create({
      data: {
        title,
        description,
        category: category || 'IELTS',
        duration: parseInt(duration) || 40,
        status: status || 'PUBLISHED'
      }
    });

    res.status(201).json({ success: true, message: 'Mock test created successfully', test: newTest });
  } catch (err) {
    console.error('Create Mock Test Error:', err);
    res.status(500).json({ success: false, message: 'Failed to create mock test', error: err.message });
  }
});

// Admin: Update Mock Test
router.put('/:id', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category, duration, status } = req.body;

    const updated = await prisma.mockTest.update({
      where: { id },
      data: {
        ...(title && { title }),
        ...(description !== undefined && { description }),
        ...(category && { category }),
        ...(duration && { duration: parseInt(duration) }),
        ...(status && { status })
      }
    });

    res.json({ success: true, message: 'Mock test updated successfully', test: updated });
  } catch (err) {
    console.error('Update Mock Test Error:', err);
    res.status(500).json({ success: false, message: 'Failed to update mock test', error: err.message });
  }
});

// Admin: Delete Mock Test
router.delete('/:id', requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.mockTest.delete({ where: { id } });
    res.json({ success: true, message: 'Mock test deleted successfully' });
  } catch (err) {
    console.error('Delete Mock Test Error:', err);
    res.status(500).json({ success: false, message: 'Failed to delete mock test', error: err.message });
  }
});

module.exports = router;
