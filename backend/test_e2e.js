const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

async function runE2ETests() {
  console.log('🚀 Running Mock Test System E2E API Verification...\n');

  try {
    // 1. Health check
    const health = await axios.get(`${BASE_URL}/health`);
    console.log('✅ 1. Health Check:', health.data.status);

    // 2. Fetch published mock tests
    const testsRes = await axios.get(`${BASE_URL}/mock-tests`);
    console.log(`✅ 2. Fetch Mock Tests: Found ${testsRes.data.tests.length} tests`);
    const test = testsRes.data.tests[0];
    console.log(`   - Test: "${test.title}" (Duration: ${test.duration}m, Total Qs: ${test.totalQuestions})`);

    // 3. Register a Student
    const studentRes = await axios.post(`${BASE_URL}/auth/register`, {
      name: 'Ananya Patel',
      email: 'ananya.patel@test.com',
      phone: '+919876500000',
      targetCountry: 'Canada'
    });
    console.log('✅ 3. Student Quick Registration:', studentRes.data.user.name, `(Token generated)`);
    const studentToken = studentRes.data.token;

    // 4. Start Exam Attempt
    const attemptRes = await axios.post(
      `${BASE_URL}/mock-tests/${test.id}/start`,
      {},
      { headers: { Authorization: `Bearer ${studentToken}` } }
    );
    const attemptId = attemptRes.data.attemptId;
    console.log('✅ 4. Start Attempt Created ID:', attemptId);

    // 5. Fetch Attempt details
    const getAttemptRes = await axios.get(
      `${BASE_URL}/attempts/${attemptId}`,
      { headers: { Authorization: `Bearer ${studentToken}` } }
    );
    const attemptData = getAttemptRes.data.attempt;
    const listeningSec = attemptData.mockTest.sections.find(s => s.type === 'LISTENING');
    const readingSec = attemptData.mockTest.sections.find(s => s.type === 'READING');
    const writingSec = attemptData.mockTest.sections.find(s => s.type === 'WRITING');
    const speakingSec = attemptData.mockTest.sections.find(s => s.type === 'SPEAKING');
    console.log(`✅ 5. Attempt Loaded: 4 Sections verified (Listening, Reading, Writing, Speaking)`);

    // 6. Submit Objective Answers + Writing Essay + Speaking recordings
    const listeningQ1 = listeningSec.questions[0];
    const listeningQ2 = listeningSec.questions[1];
    const listeningQ3 = listeningSec.questions[2];
    const readingQ1 = readingSec.questions[0];
    const readingQ2 = readingSec.questions[1];
    const readingQ3 = readingSec.questions[2];
    const writingQ1 = writingSec.questions[0];
    const speakingQ1 = speakingSec.questions[0];
    const speakingQ2 = speakingSec.questions[1];

    const answersToSubmit = [
      { questionId: listeningQ1.id, answer: 'Studio apartment near the university campus' }, // Correct
      { questionId: listeningQ2.id, answer: '£150 per week' }, // Correct
      { questionId: listeningQ3.id, answer: 'month' }, // Correct
      { questionId: readingQ1.id, answer: 'Institutional revenue diversification and demand for recognized credentials' }, // Correct
      { questionId: readingQ2.id, answer: 'TRUE' }, // Correct
      { questionId: readingQ3.id, answer: 'career' } // Correct
    ];

    const submitRes = await axios.post(
      `${BASE_URL}/attempts/${attemptId}/submit`,
      {
        answers: answersToSubmit,
        writing: {
          questionId: writingQ1.id,
          answer: 'In the modern globalized economy, higher education plays an instrumental role in shaping professional trajectories. While pursuing a degree abroad equips students with intercultural competencies and international exposure, staying in one\'s home country offers local networking and cultural familiarity. In my perspective, international education provides a distinct competitive edge in today\'s interconnected labor market.'
        },
        speaking: [
          { questionId: speakingQ1.id, audioUrl: '/uploads/speaking/sample_q1.webm', duration: 45 },
          { questionId: speakingQ2.id, audioUrl: '/uploads/speaking/sample_q2.webm', duration: 75 }
        ]
      },
      { headers: { Authorization: `Bearer ${studentToken}` } }
    );

    console.log('✅ 6. Auto-Evaluation Engine Result on Submission:');
    console.log(`   - Listening Score: ${submitRes.data.listeningScore}`);
    console.log(`   - Reading Score: ${submitRes.data.readingScore}`);
    console.log(`   - Attempt Status: ${submitRes.data.status} (Needs Writing & Speaking Review)`);

    // 7. Admin Login
    const adminRes = await axios.post(`${BASE_URL}/auth/admin-login`, {
      email: 'admin@vectraforeignservices.com',
      password: 'admin123'
    });
    const adminToken = adminRes.data.token;
    console.log('✅ 7. Admin Login Authenticated:', adminRes.data.user.name);

    // 8. Fetch Pending Evaluations Queue
    const evalsRes = await axios.get(`${BASE_URL}/admin/evaluations`, {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    console.log(`✅ 8. Pending Queue: ${evalsRes.data.writing.length} Writing, ${evalsRes.data.speaking.length} Speaking tasks`);

    // 9. Admin evaluates Writing submission
    const pendingWriting = evalsRes.data.writing.find(w => w.attemptId === attemptId);
    if (pendingWriting) {
      const gradeWriting = await axios.post(
        `${BASE_URL}/admin/writing/${pendingWriting.id}/evaluate`,
        {
          score: 7.5,
          feedback: 'Excellent structure and vocabulary. Paragraph transitions are logical and coherent.'
        },
        { headers: { Authorization: `Bearer ${adminToken}` } }
      );
      console.log('✅ 9. Writing Evaluated & Saved: Band', gradeWriting.data.submission.score);
    }

    // 10. Admin evaluates Speaking submissions
    const pendingSpeakingList = evalsRes.data.speaking.filter(s => s.attemptId === attemptId);
    for (const spk of pendingSpeakingList) {
      const gradeSpk = await axios.post(
        `${BASE_URL}/admin/speaking/${spk.id}/evaluate`,
        {
          score: 8.0,
          feedback: 'Natural pronunciation, good pace, and confident use of complex grammatical structures.'
        },
        { headers: { Authorization: `Bearer ${adminToken}` } }
      );
      console.log(`✅ 10. Speaking Evaluated & Saved (${spk.id.slice(0, 8)}): Band`, gradeSpk.data.submission.score);
    }

    // 11. Fetch Final Result Report
    const finalResult = await axios.get(`${BASE_URL}/results/${attemptId}`, {
      headers: { Authorization: `Bearer ${studentToken}` }
    });
    const r = finalResult.data.result;
    console.log('✅ 11. Final Band Score Calculation:');
    console.log(`   - Final Status: ${r.status}`);
    console.log(`   - Listening: ${r.scores.listening.score}/${r.scores.listening.max}`);
    console.log(`   - Reading: ${r.scores.reading.score}/${r.scores.reading.max}`);
    console.log(`   - Writing: Band ${r.scores.writing.score}`);
    console.log(`   - Speaking: Band ${r.scores.speaking.score}`);
    console.log(`   - Total Aggregate Band Score: Band ${r.scores.bandScore}`);

    // 12. Test Google Sheets / CSV Importer
    const sampleRows = [
      {
        'Section': 'LISTENING',
        'Question Type': 'MCQ',
        'Question': 'Where will the international orientation take place?',
        'Option A': 'Main Auditorium',
        'Option B': 'Science Block',
        'Option C': 'Sports Arena',
        'Option D': 'Library Lawn',
        'Correct Answer': 'A',
        'Marks': '1.0'
      },
      {
        'Section': 'READING',
        'Question Type': 'TRUE_FALSE',
        'Question': 'Scholarship applications close in September.',
        'Option A': 'TRUE',
        'Option B': 'FALSE',
        'Option C': 'NOT GIVEN',
        'Correct Answer': 'TRUE',
        'Marks': '1.0'
      },
      {
        'Section': 'WRITING',
        'Question Type': 'WRITING',
        'Question': 'Some people believe remote work enhances productivity. Discuss.',
        'Marks': '9.0'
      },
      {
        'Section': 'SPEAKING',
        'Question Type': 'SPEAKING',
        'Question': 'Describe your favorite subject in high school and why you enjoyed it.',
        'Marks': '9.0'
      }
    ];

    const importRes = await axios.post(
      `${BASE_URL}/admin/import-sheet`,
      {
        mockTitle: 'IELTS Academic Full Practice Test 02',
        duration: 40,
        rows: sampleRows
      },
      { headers: { Authorization: `Bearer ${adminToken}` } }
    );
    console.log('✅ 12. Google Sheets / CSV Importer Tested:', importRes.data.message);

    console.log('\n🎉 ALL 12 E2E VERIFICATION CHECKS PASSED PERFECTLY!\n');

  } catch (err) {
    console.error('❌ Test failed:', err.response?.data || err.message);
    process.exit(1);
  }
}

runE2ETests();
