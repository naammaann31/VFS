const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // 1. Create or update default Admin user
  const adminPasswordHash = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@vectraforeignservices.com' },
    update: {
      name: 'Vectra Admin',
      role: 'ADMIN',
      passwordHash: adminPasswordHash
    },
    create: {
      name: 'Vectra Admin',
      email: 'admin@vectraforeignservices.com',
      phone: '+919876543210',
      role: 'ADMIN',
      passwordHash: adminPasswordHash
    }
  });
  console.log('✅ Admin user ready:', admin.email);

  // 2. Create or update Demo Student user
  const student = await prisma.user.upsert({
    where: { email: 'student@example.com' },
    update: {
      name: 'Rahul Sharma',
      phone: '+919825000000',
      targetCountry: 'Canada',
      role: 'STUDENT'
    },
    create: {
      name: 'Rahul Sharma',
      email: 'student@example.com',
      phone: '+919825000000',
      targetCountry: 'Canada',
      role: 'STUDENT'
    }
  });
  console.log('✅ Demo student user ready:', student.email);

  // 3. Create "IELTS Full Mock Test 01"
  // First check if already seeded
  const existingTest = await prisma.mockTest.findFirst({
    where: { title: 'IELTS Full Mock Test 01' }
  });

  if (existingTest) {
    console.log('ℹ️ IELTS Full Mock Test 01 already exists, skipping creation.');
    return;
  }

  const mockTest = await prisma.mockTest.create({
    data: {
      title: 'IELTS Full Mock Test 01',
      description: 'Comprehensive IELTS Academic Practice Test covering Listening, Reading, Writing Task 2, and Speaking Tasks 1 & 2.',
      category: 'IELTS Academic',
      duration: 40,
      status: 'PUBLISHED'
    }
  });

  console.log('✅ Created Mock Test:', mockTest.title);

  // SECTION 1: LISTENING
  const listeningSection = await prisma.section.create({
    data: {
      mockTestId: mockTest.id,
      type: 'LISTENING',
      title: 'Listening Test',
      instructions: 'Listen to the audio recording carefully and answer Questions 1–3. The audio plays twice.',
      order: 1
    }
  });

  // Listening Q1 (MCQ)
  const lq1 = await prisma.question.create({
    data: {
      sectionId: listeningSection.id,
      type: 'MCQ',
      questionText: 'What type of student accommodation is the candidate inquiring about?',
      audioUrl: '/listening-audio.mp3',
      marks: 1.0,
      order: 1
    }
  });
  await prisma.option.createMany({
    data: [
      { questionId: lq1.id, optionText: 'Single room in a shared student house', isCorrect: false, order: 1 },
      { questionId: lq1.id, optionText: 'Studio apartment near the university campus', isCorrect: true, order: 2 },
      { questionId: lq1.id, optionText: 'Private bedroom in a host family homestay', isCorrect: false, order: 3 },
      { questionId: lq1.id, optionText: 'Shared room in a university hall of residence', isCorrect: false, order: 4 }
    ]
  });

  // Listening Q2 (MCQ)
  const lq2 = await prisma.question.create({
    data: {
      sectionId: listeningSection.id,
      type: 'MCQ',
      questionText: 'What is the maximum weekly budget stated by the student?',
      audioUrl: '/listening-audio.mp3',
      marks: 1.0,
      order: 2
    }
  });
  await prisma.option.createMany({
    data: [
      { questionId: lq2.id, optionText: '£120 per week', isCorrect: false, order: 1 },
      { questionId: lq2.id, optionText: '£150 per week', isCorrect: true, order: 2 },
      { questionId: lq2.id, optionText: '£180 per week', isCorrect: false, order: 3 },
      { questionId: lq2.id, optionText: '£210 per week', isCorrect: false, order: 4 }
    ]
  });

  // Listening Q3 (Fill in blank)
  const lq3 = await prisma.question.create({
    data: {
      sectionId: listeningSection.id,
      type: 'FILL_BLANK',
      questionText: 'Complete the sentence below. Write ONE WORD ONLY for your answer:\n"The tenancy agreement requires a refundable security deposit equal to one [blank] rent."',
      audioUrl: '/listening-audio.mp3',
      marks: 1.0,
      order: 3
    }
  });
  await prisma.option.createMany({
    data: [
      { questionId: lq3.id, optionText: 'month', isCorrect: true, order: 1 },
      { questionId: lq3.id, optionText: "month's", isCorrect: true, order: 2 }
    ]
  });

  // SECTION 2: READING
  const readingSection = await prisma.section.create({
    data: {
      mockTestId: mockTest.id,
      type: 'READING',
      title: 'Reading Test',
      instructions: 'Read the text below and answer Questions 1–3.',
      order: 2
    }
  });

  const readingPassageText = `The Evolution of Global Higher Education and Transnational Student Mobility

Over the past two decades, international student mobility has transformed from an elite pursuit into a core pillar of global higher education strategy. Universities in traditional destination countries—such as Canada, the United Kingdom, Australia, and the United States—have increasingly internationalized their campuses, welcoming hundreds of thousands of scholars annually. This shift is driven not only by institutional revenue diversification but also by the growing demand for globally recognized qualifications, multicultural competencies, and post-study work opportunities.

Emerging research indicates that transnational education (TNE) partnerships, including dual-degree programs and branch campuses, are further decentralizing learning. Students in developing nations can now earn qualifications from Western institutions without immediately relocating abroad. However, full physical immersion in a foreign academic environment remains the preferred pathway for those seeking permanent career advancement and global network building.

Despite economic shifts and changing visa frameworks, international education continues to foster bilateral diplomatic ties, bridge talent gaps in STEM fields, and accelerate innovation through cross-cultural research collaborations.`;

  // Reading Q1 (MCQ)
  const rq1 = await prisma.question.create({
    data: {
      sectionId: readingSection.id,
      type: 'MCQ',
      questionText: 'According to Paragraph 1, what is a key factor driving internationalization in universities?',
      passage: readingPassageText,
      marks: 1.0,
      order: 1
    }
  });
  await prisma.option.createMany({
    data: [
      { questionId: rq1.id, optionText: 'The complete elimination of tuition fees', isCorrect: false, order: 1 },
      { questionId: rq1.id, optionText: 'Institutional revenue diversification and demand for recognized credentials', isCorrect: true, order: 2 },
      { questionId: rq1.id, optionText: 'Mandatory study-abroad mandates by foreign governments', isCorrect: false, order: 3 },
      { questionId: rq1.id, optionText: 'The replacement of physical campuses by virtual reality classrooms', isCorrect: false, order: 4 }
    ]
  });

  // Reading Q2 (True/False)
  const rq2 = await prisma.question.create({
    data: {
      sectionId: readingSection.id,
      type: 'TRUE_FALSE',
      questionText: 'Dual-degree programs allow students in developing nations to earn Western qualifications locally.',
      passage: readingPassageText,
      marks: 1.0,
      order: 2
    }
  });
  await prisma.option.createMany({
    data: [
      { questionId: rq2.id, optionText: 'TRUE', isCorrect: true, order: 1 },
      { questionId: rq2.id, optionText: 'FALSE', isCorrect: false, order: 2 },
      { questionId: rq2.id, optionText: 'NOT GIVEN', isCorrect: false, order: 3 }
    ]
  });

  // Reading Q3 (Fill in blank / Short Answer)
  const rq3 = await prisma.question.create({
    data: {
      sectionId: readingSection.id,
      type: 'FILL_BLANK',
      questionText: 'Complete the sentence. Write NO MORE THAN TWO WORDS from the passage for your answer:\n"Full physical immersion remains the preferred pathway for individuals seeking permanent [blank] advancement."',
      passage: readingPassageText,
      marks: 1.0,
      order: 3
    }
  });
  await prisma.option.createMany({
    data: [
      { questionId: rq3.id, optionText: 'career', isCorrect: true, order: 1 },
      { questionId: rq3.id, optionText: 'career advancement', isCorrect: true, order: 2 }
    ]
  });

  // SECTION 3: WRITING
  const writingSection = await prisma.section.create({
    data: {
      mockTestId: mockTest.id,
      type: 'WRITING',
      title: 'Academic Writing (Task 2)',
      instructions: 'You should spend about 20 minutes on this task. Write at least 150 words.',
      order: 3
    }
  });

  await prisma.question.create({
    data: {
      sectionId: writingSection.id,
      type: 'WRITING',
      questionText: 'Some people believe that studying abroad is essential for achieving long-term career success, while others argue that higher education in one\'s home country is equally beneficial.\n\nDiscuss both views and give your opinion. Support your position with relevant reasons and examples from your knowledge or experience.',
      marks: 9.0,
      order: 1
    }
  });

  // SECTION 4: SPEAKING
  const speakingSection = await prisma.section.create({
    data: {
      mockTestId: mockTest.id,
      type: 'SPEAKING',
      title: 'Speaking Test (Voice Recorder)',
      instructions: 'Record your voice responses using your device\'s microphone. Click record when ready.',
      order: 4
    }
  });

  // Speaking Task 1 (60 seconds)
  await prisma.question.create({
    data: {
      sectionId: speakingSection.id,
      type: 'SPEAKING',
      questionText: 'Speaking Task 1 (Part 1 - Introduction): Describe your academic background and explain why you wish to study abroad, and how your chosen program fits your future career goals.',
      preparationTime: 15,
      responseTime: 60,
      marks: 9.0,
      order: 1
    }
  });

  // Speaking Task 2 (90 seconds)
  await prisma.question.create({
    data: {
      sectionId: speakingSection.id,
      type: 'SPEAKING',
      questionText: 'Speaking Task 2 (Part 2 - Cue Card): Describe a significant challenge you faced in your academic or working life and how you managed to overcome it.\n\nYou should mention: what the challenge was, what specific action you took, and what you learned from the experience.',
      preparationTime: 30,
      responseTime: 90,
      marks: 9.0,
      order: 2
    }
  });

  console.log('🎉 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
