const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function seedRealityTest() {
  console.log('🌱 Seeding Full IELTS Reality Test 02 (60 min Reading + 60 min Writing + 40 min Listening + 15 min Speaking)...');

  // Check or update the primary test
  let test = await prisma.mockTest.findFirst({
    where: { title: 'IELTS Reality Practice Test 02 (Full 2h 45m)' }
  });

  if (test) {
    console.log('🗑️ Removing old version of Reality Test 02 to reseed fresh...');
    await prisma.mockTest.delete({ where: { id: test.id } });
  }

  // Also remove old Test 01 if needed so Test 02 is the single primary test
  const oldTest1 = await prisma.mockTest.findFirst({
    where: { title: 'IELTS Full Mock Test 01' }
  });
  if (oldTest1) {
    await prisma.mockTest.update({
      where: { id: oldTest1.id },
      data: { status: 'ARCHIVED' }
    });
  }

  test = await prisma.mockTest.create({
    data: {
      title: 'IELTS Reality Practice Test 02 (Full 2h 45m)',
      description: 'Official 4-Module IELTS General Training Reality Test containing 40 Listening Questions, 40 Reading Questions (60 Mins), Task 1 & Task 2 Writing (60 Mins), and Speaking Voice Tasks.',
      category: 'IELTS General Training',
      duration: 165, // 2 hours 45 mins
      status: 'PUBLISHED'
    }
  });

  console.log(`✅ Created test: ${test.title} (ID: ${test.id})`);

  // ==========================================
  // MODULE 1: LISTENING (40 Questions)
  // ==========================================
  const listeningSec = await prisma.section.create({
    data: {
      mockTestId: test.id,
      type: 'LISTENING',
      title: 'Listening Test (40 Questions)',
      instructions: 'The listening test consists of 4 parts with 40 questions. Listen to the recording carefully and answer all questions.',
      order: 1
    }
  });

  // Part 1: Questions 1-10
  const part1Prompt = `Part 1: Job details from employment agency
Role: [1]
Location: Fordham [2] Centre, [3] Road, Fordham
Work involves:
• dealing with enquiries
• making [4] and reorganising them
• maintaining the internal [5]
• general administration
Requirements:
• [6] (essential)
• a calm and [7] manner
• good IT skills
Other information:
• a [8] job – further opportunities may be available
• hours: 7.45 a.m. to [9] p.m. Monday to Friday
• [10] is available onsite.`;

  const lqDataPart1 = [
    { num: 1, text: 'Question 1: Complete the role title. Write ONE WORD AND/OR A NUMBER:', ans: 'receptionist' },
    { num: 2, text: 'Question 2: Complete the location center name:', ans: 'Medical' },
    { num: 3, text: 'Question 3: Complete the road name in Fordham:', ans: 'Station' },
    { num: 4, text: 'Question 4: Work involves making ______ and reorganising them:', ans: 'appointments' },
    { num: 5, text: 'Question 5: Work involves maintaining the internal ______:', ans: 'database' },
    { num: 6, text: 'Question 6: Requirements - ______ (essential):', ans: 'experience' },
    { num: 7, text: 'Question 7: Requirements - a calm and ______ manner:', ans: 'confident' },
    { num: 8, text: 'Question 8: Other information - a ______ job (further opportunities available):', ans: 'temporary' },
    { num: 9, text: 'Question 9: Hours: 7.45 a.m. to ______ p.m. Monday to Friday:', ans: '5.15' },
    { num: 10, text: 'Question 10: ______ is available onsite:', ans: 'parking' }
  ];

  for (const item of lqDataPart1) {
    const q = await prisma.question.create({
      data: {
        sectionId: listeningSec.id,
        type: 'FILL_BLANK',
        questionText: `${part1Prompt}\n\n${item.text}`,
        audioUrl: '/listening-audio.mp3',
        marks: 1.0,
        order: item.num
      }
    });
    await prisma.option.create({
      data: {
        questionId: q.id,
        optionText: item.ans,
        isCorrect: true,
        order: 1
      }
    });
  }

  // Part 2: Questions 11-20
  const lqDataPart2 = [
    {
      num: 11,
      text: 'Question 11: The museum building was originally',
      options: [
        { text: 'A. a factory.', correct: false },
        { text: 'B. a private home.', correct: true },
        { text: 'C. a hall of residence.', correct: false }
      ]
    },
    {
      num: 12,
      text: 'Question 12: The university uses part of the museum building as',
      options: [
        { text: 'A. teaching rooms.', correct: false },
        { text: 'B. a research library.', correct: false },
        { text: 'C. administration offices.', correct: true }
      ]
    },
    {
      num: 13,
      text: 'Question 13: What does the guide say about the entrance fee?',
      options: [
        { text: 'A. Visitors decide whether or not they wish to pay.', correct: true },
        { text: 'B. Only children and students receive a discount.', correct: false },
        { text: 'C. The museum charges extra for special exhibitions.', correct: false }
      ]
    },
    {
      num: 14,
      text: 'Question 14: What are visitors advised to leave in the cloakroom?',
      options: [
        { text: 'A. cameras', correct: false },
        { text: 'B. coats', correct: false },
        { text: 'C. bags', correct: true }
      ]
    }
  ];

  for (const item of lqDataPart2) {
    const q = await prisma.question.create({
      data: {
        sectionId: listeningSec.id,
        type: 'MCQ',
        questionText: item.text,
        audioUrl: '/listening-audio.mp3',
        marks: 1.0,
        order: item.num
      }
    });
    for (let optIdx = 0; optIdx < item.options.length; optIdx++) {
      const opt = item.options[optIdx];
      await prisma.option.create({
        data: {
          questionId: q.id,
          optionText: opt.text,
          isCorrect: opt.correct,
          order: optIdx + 1
        }
      });
    }
  }

  // ==========================================
  // MODULE 2: READING (60 MINUTES - 40 QUESTIONS)
  // ==========================================
  const readingSec = await prisma.section.create({
    data: {
      mockTestId: test.id,
      type: 'READING',
      title: 'General Training Reading Test (60 Minutes - 40 Questions)',
      instructions: 'The total time for the reading test is 60 minutes. The test consists of 40 questions divided into three sections.',
      order: 2
    }
  });

  // Section 1 Passage 1: The best ice cream makers
  const passage1Text = `SECTION 1: Questions 1 - 7

Read the text below and answer Questions 1-7.

The best ice cream makers
Have you ever considered making ice cream at home but thought it would be too complicated? Here is a selection of machines that could change your mind:

A Magimix Gelato Expert
If you're an ice cream fanatic, it doesn't get better than this. It's quick, taking as little as 20 minutes, and consistent in its results, while the three automated programmes are very easy to use and it has an unusually generous two-litre capacity. On the other hand, we found it noisier than many, and the ice cream is softer than we might have liked.

B Shake n Make Ice Cream Maker
If you want to make some basic soft ice cream, this is a fun little gadget that gets decent results. You add a little ice and salt to the base, then your ingredients to the stainless-steel tub, pop the lid on and give it a good shake for at least three minutes. Provided you measure everything exactly and shake back and forth consistently, it’s surprisingly efficient.

C Sage Smart Scoop
This is a seriously smart machine. Our favourite feature is the built-in sensor that works out whether the consistency of your ice cream or frozen yoghurt is right for you (from the 12 hardness settings) so that it can stop mixing when it’s ready, alerting you with a fun tune. As you’d expect from the considerable price tag, there’s a built-in freezer and it feels beautifully engineered.

D Lakeland Digital Ice Cream Maker
You simply pop on the lid and pour in the ingredients, then set the timer using the nice, clear digital display. Some customers reportedly struggled to disassemble it in order to wash the bowl and paddle, but we didn’t have that problem. We’re also giving it extra points for the recipe book, which has some really tasty ideas.

E Judge Ice Cream Maker
We had a few criticisms, perhaps not surprisingly when you consider this is one of the cheapest models in our selection — notably the fact that the paddle isn’t as robust as the ones in other models. We’d have liked more recipes, too. But, for a budget machine, this is a bargain.

F KitchenAid Artisan Ice Cream Maker
If you own a KitchenAid food mixer, this attachment (one of 15 that fits this machine) is a good way to start ice cream making. You simply freeze the bowl before use and attach it to the mixer (a quick and easy job) and pour in your favourite fresh ingredients, with some recipes taking just 20 minutes.`;

  const readingQ1to7 = [
    { num: 1, text: '1. Users of this machine will need to put some physical effort into making ice cream.', ans: 'B' },
    { num: 2, text: '2. Users of this machine can decide how soft they want their ice cream to be.', ans: 'C' },
    { num: 3, text: '3. This ice cream maker can be fixed onto an existing kitchen appliance.', ans: 'F' },
    { num: 4, text: '4. It is possible to make a larger amount of ice cream at one time than in most other machines.', ans: 'A' },
    { num: 5, text: '5. This machine has features that make it worth the high price.', ans: 'C' },
    { num: 6, text: '6. People might find it difficult to take this machine apart.', ans: 'D' },
    { num: 7, text: '7. This machine makes an enjoyable sound when the ice cream is prepared.', ans: 'C' }
  ];

  const iceCreamOptions = [
    { text: 'A) Magimix Gelato Expert', id: 'A' },
    { text: 'B) Shake n Make Ice Cream Maker', id: 'B' },
    { text: 'C) Sage Smart Scoop', id: 'C' },
    { text: 'D) Lakeland Digital Ice Cream Maker', id: 'D' },
    { text: 'E) Judge Ice Cream Maker', id: 'E' },
    { text: 'F) KitchenAid Artisan Ice Cream Maker', id: 'F' }
  ];

  for (const item of readingQ1to7) {
    const q = await prisma.question.create({
      data: {
        sectionId: readingSec.id,
        type: 'MCQ',
        questionText: item.text,
        passage: passage1Text,
        marks: 1.0,
        order: item.num
      }
    });
    for (let oIdx = 0; oIdx < iceCreamOptions.length; oIdx++) {
      const opt = iceCreamOptions[oIdx];
      await prisma.option.create({
        data: {
          questionId: q.id,
          optionText: opt.text,
          isCorrect: opt.id === item.ans,
          order: oIdx + 1
        }
      });
    }
  }

  // Section 1 Passage 2: Photography weekend course in Cornwall (Questions 8-14)
  const passage2Text = `SECTION 1 (Part 2): Questions 8 - 14

Read the text below and answer Questions 8-14.

Photography weekend course on the coast of Cornwall
Our three-night photography weekend is designed to appeal to all levels. Participants will be able to enjoy some of the fantastic locations on this beautiful coastline, with its ever-changing light, while staying in a comfortable hotel and enjoying some typical dishes of this south-western region of Britain.

Price includes: Personal daily tuition, discussions, welcome reception, and dinner, bed and breakfast for three nights in a twin or double room.
Price does not include: Insurance and photographic equipment plus transport to photographic venues. Participants are required to arrange this. Car share during the weekend is a popular option.

Course information:
• Our courses are relaxed but comprehensive, and the content is largely dictated by those attending. Included within the sessions are editing workshops at the hotel and photo shoots down by the sea. Visits further away are also undertaken to experiment with different landscapes.
• Arrival by mid-afternoon on the first day will allow you to check into the hotel and enjoy some Cornish refreshments before heading out into the fresh air for our first shoot together at sunset. Dinner and a good night’s sleep and you’ll be ready to start at sunrise the next day. In the evenings you will have a chance to unwind at the hotel, share your thoughts on the day and spend time looking at images and sharing editing techniques.
• Maximum numbers: Four photographers per course.
• Essential equipment: A digital SLR or bridge camera with instruction manual, batteries and charger; memory cards; comfortable walking footwear with good grip; warm outdoor clothing and waterproofs.
• Recommended equipment: A tripod, filters, a laptop with editing software and charger.`;

  const readingQ8to14 = [
    { num: 8, text: '8. The course is aimed at people who are already skilled photographers.', ans: 'FALSE' },
    { num: 9, text: '9. Three meals a day are included in the course fee.', ans: 'FALSE' },
    { num: 10, text: '10. The only way to reach the hotel is by car.', ans: 'NOT GIVEN' },
    { num: 11, text: '11. The topics covered on the course depend mainly on the wishes of the participants.', ans: 'TRUE' },
    { num: 12, text: '12. Participants are expected to get up early on their first morning to take photographs.', ans: 'TRUE' },
    { num: 13, text: '13. The tutor will show participants examples of her work after dinner.', ans: 'NOT GIVEN' },
    { num: 14, text: '14. Participants should be prepared for bad weather.', ans: 'TRUE' }
  ];

  const tfOptions = [
    { text: 'TRUE', val: 'TRUE' },
    { text: 'FALSE', val: 'FALSE' },
    { text: 'NOT GIVEN', val: 'NOT GIVEN' }
  ];

  for (const item of readingQ8to14) {
    const q = await prisma.question.create({
      data: {
        sectionId: readingSec.id,
        type: 'TRUE_FALSE',
        questionText: item.text,
        passage: passage2Text,
        marks: 1.0,
        order: item.num
      }
    });
    for (let oIdx = 0; oIdx < tfOptions.length; oIdx++) {
      const opt = tfOptions[oIdx];
      await prisma.option.create({
        data: {
          questionId: q.id,
          optionText: opt.text,
          isCorrect: opt.val === item.ans,
          order: oIdx + 1
        }
      });
    }
  }

  // Section 2 Passage 1: RPE & Dairy Farming (Questions 15-27)
  const passage3Text = `SECTION 2: Questions 15 - 27

Read the text below and answer Questions 15-21.

Respiratory Protective Equipment (RPE) — advice for factory employees
You need to wear Respiratory Protective Equipment (RPE) when you’re doing work where you could breathe in hazardous substances in the air such as dust, vapour or gas. Common health effects from breathing hazardous substances include sore eyes and headaches. Make sure you are using the right RPE for the task. For example, negative pressure respirators should not be used in low oxygen environments.

Some types of RPE must have a tight seal around the facial area to be effective. Your employer will arrange a yearly facial fit test to ensure that you are given RPE that fits properly. This checks that the seal between the respirator and the facial area is secure, by releasing a substance that you can smell or taste if the RPE is not working properly. RPE will only provide effective protection if you are clean shaven. Facial hair growth makes it almost impossible to get a good seal so, if you have a beard, you should talk to your employer about other forms of RPE that do not rely on a tight facial fit. Jewellery and long hair can also compromise an effective fit.

Using your RPE:
You should complete a visual check of your RPE for signs of damage before you use it. If you are using RPE that requires a tight fit, you must check it fits properly before entering a hazardous area.

Cleaning your RPE:
Wash and dry your RPE after using it. Use a mild detergent, as harsh products such as solvents can cause damage. Use a brush and warm water and rinse with clean water. This will remove excess detergent that can cause skin irritation. Dry your RPE on a solid wooden rack or suspend from a clothes line.

Maintaining your RPE:
Inspect your RPE after each use and during cleaning. Make sure you check the straps for breaks, tears, fraying edges and deterioration of elasticity. Check the inhalation and exhalation valves are working and not damaged.

Storing your RPE:
Improper storage can cause distortion to your RPE. Store your RPE in a clean, dry place, away from dust, oil and sunlight. RPE should be stored so that it doesn’t get crushed.`;

  const readingQ15to21 = [
    { num: 15, text: '15. Some respirators are unsuitable for use in areas with limited levels of ______ (ONE WORD):', ans: 'oxygen' },
    { num: 16, text: '16. Facial fit tests should be conducted on a ______ basis (ONE WORD):', ans: 'yearly' },
    { num: 17, text: '17. For workers who have a ______, an alternative to tight-fitting RPE may be required (ONE WORD):', ans: 'beard' },
    { num: 18, text: '18. Workers should avoid cleaning their RPE with ______ (ONE WORD):', ans: 'solvents' },
    { num: 19, text: '19. RPE can either be hung up or placed on a timber ______ in order to dry it (ONE WORD):', ans: 'rack' },
    { num: 20, text: '20. It is important to ensure that the RPE ______ are not ripped and can still stretch (ONE WORD):', ans: 'straps' },
    { num: 21, text: '21. RPE should not be exposed to direct ______ when it is being stored (ONE WORD):', ans: 'sunlight' }
  ];

  for (const item of readingQ15to21) {
    const q = await prisma.question.create({
      data: {
        sectionId: readingSec.id,
        type: 'FILL_BLANK',
        questionText: item.text,
        passage: passage3Text,
        marks: 1.0,
        order: item.num
      }
    });
    await prisma.option.create({
      data: {
        questionId: q.id,
        optionText: item.ans,
        isCorrect: true,
        order: 1
      }
    });
  }

  // Section 2 Passage 2: Working with cows in a dairy (Questions 22-27)
  const passage4Text = `SECTION 2 (Part 2): Questions 22 - 27

Working with cows in a dairy — Guidelines for employers

Slips and trips:
Slips and trips are one of the most common accidents when working in farm dairies. They often happen when working with cows in a dairy during milking, and during maintenance and cleaning.
1. Surfaces which are wet or dirty:
• Have a system for cleaning up milk, oil, cleaning fluid and grain spills as soon as they happen.
• Install non-slip mats in wet work areas and make sure that footwear is slip-resistant.
2. Obstacles such as pipes or cables in the farm dairy:
• Reduce tripping accidents by hanging hoses and pipes along walls out of people’s way and remove unused fittings, like bolt fasteners in floors.
• Move obstacles from walkways and entrances where possible. Overhead obstacles should be wrapped in padding.
3. Steps which are too high or not deep enough, or steps in poorly lit areas:
• Build steps properly and use non-slip surfaces.
• Handrails should also be fitted. The provision of good lighting can also help reduce injury risk.

Lifting and carrying:
• Balance the load by using two buckets, one in each hand.
• Where possible, use trolleys and other mechanical aids to replace manual tasks.

Milking by hand:
• Ensure equipment is close by to avoid workers having to overreach or adopt an awkward bending position.
• Introduce a system of rotation between jobs to increase variety.`;

  const readingQ22to27 = [
    { num: 22, text: '22. Slippery floor surfaces: Ensure all items of ______ have good grip (ONE WORD):', ans: 'footwear' },
    { num: 23, text: '23. Unsuitable steps: Ensure they are covered with ______ (ONE WORD):', ans: 'non-slip' },
    { num: 24, text: '24. Provide good lighting and install ______ (ONE WORD):', ans: 'handrails' },
    { num: 25, text: '25. Try to avoid moving containers by hand, and use equipment such as ______ instead (ONE WORD):', ans: 'trolleys' },
    { num: 26, text: '26. Keep everything accessible so that employees don’t need to bend or ______ (ONE WORD):', ans: 'overreach' },
    { num: 27, text: '27. Introduce a system of ______ to increase variety (ONE WORD):', ans: 'rotation' }
  ];

  for (const item of readingQ22to27) {
    const q = await prisma.question.create({
      data: {
        sectionId: readingSec.id,
        type: 'FILL_BLANK',
        questionText: item.text,
        passage: passage4Text,
        marks: 1.0,
        order: item.num
      }
    });
    await prisma.option.create({
      data: {
        questionId: q.id,
        optionText: item.ans,
        isCorrect: true,
        order: 1
      }
    });
  }

  // Section 3: Night photography in autumn (Questions 28-40)
  const passage5Text = `SECTION 3: Questions 28 - 40

Read the text below and answer Questions 28-40.

Night photography in autumn

A. November in the northern hemisphere is not the most inspiring of months for the photographer. The days shorten appreciably as winter approaches and the last autumn leaves are blown free by high winds and frequent rain. Nature seems dormant, as many birds have long since flown to warmer climates, fungi break through the earth, and many animal species sleep until spring’s warm awakening. It would seem a good time also to put the camera to bed and forget about photography until the first snowfall. Well, not quite. With the days being shorter and daylight less bright, November is an excellent month to turn your attention to what can be found in the long darkness from dusk to dawn. In the nocturnal hours a vast number of life forms still thrive, and provide a completely different set of subjects to those the daylight hours present.

B. As the most noticeable object in the night sky, the moon is an obvious subject when making your initial attempts at night photography. The timing of an evening moonrise is important to know because, not only does it vary according to the time of year, but the moon always appears largest at this point, when it is closest to the horizon. To capture the moon at its brilliant best, you need a bit of luck too: a time when its brightest phase — a full moon — coincides with the ideal weather forecast of a cloudless night sky. The moon is not a direct light source such as the sun or the stars; instead it is reflecting the light of the sun hitting its surface. On such a night, a full moon will reflect only about ten percent of the sunlight, but that is still enough to illuminate buildings, trees, bridges and other landscape features.

C. With today’s cameras, far greater detail can be rendered. Whole constellations consisting of thousands of points of starlight filling the frame and even galaxies such as our own Milky Way can be captured. This is a type of night photography for which few of us had suitable equipment a decade ago, but now it has become accessible to all photographers, thanks to the much improved, affordable technology.
However, photographers choosing to shoot the moon may be less concerned by this, as they tend to prefer to use telephoto lenses to magnify the size of the moon, particularly when it is low in the sky and can be shown in relation to a landmark or recognisable structure within the frame.

D. Of course, the nocturnal world offers other subjects closer to the ground, some that are even familiar to us by day. As cities and towns spread further into our green spaces, some wild animals move further afield to escape our intrusions, while others adapt to their new urbanised surroundings.
In European cities, sightings of foxes at night are increasingly common, as they thrive thanks to the cover of darkness and a ready supply of residents’ waste bins, which they use as feeding stations. Deer and wild boar are larger mammals that have also adapted to the urban fringes in recent years, emerging from the cover of parks and nearby forests to forage in residential gardens by night.

E. Such is the proliferation of urban wildlife that some photographers now specialise in documenting the nocturnal animals that have developed a taste for city nightlife. The improvement in camera technology that has made night sky images more accessible has also extended the creative repertoire of the wildlife photographer. It is now possible to photograph some wild species at night, or soon after dusk, without having to always resort to the use of specialist equipment.
More exciting still is how the techniques of astro-photography and the wildlife camera-trap have combined in recent years, to produce images of nocturnal animals against a background of a star-studded night sky. This marriage of two photographic genres has created an innovative style of night photography.

F. If that all sounds a bit too complex and time-consuming, with too many variables to spoil the hoped-for result, then consider using the fading light of the night sky in the brief time after dusk in a more opportunistic manner. Dusk is the part of the nocturnal phase when the light of the sun is still visible, though the sun itself has disappeared completely. During the earliest phase of dusk there is enough ambient light remaining to enable features in our surroundings to be seen without the aid of artificial light sources such as floodlights or street lamps.

G. While many of us shoot sunsets, the period of dusk also provides an opportunity to use the ambient light low in the sky as a backdrop to photographing foreground subjects in varying stages of illumination, or even as shadowy outlines against the fading sky. The variety of possible subjects includes ships at sea, flocks of low-flying birds, trees, windmills, skyscrapers and high bridges. These are all well known by day, but against a night sky at dusk they lack colour, so any compositional strength is determined by the graphic appeal of their distinct and recognisable shapes.`;

  const headingsList = [
    { text: 'i How chance contributes to conditions being right', id: 'i' },
    { text: 'ii Concern about the changing environment', id: 'ii' },
    { text: 'iii The process of photographing animals at night is getting easier', id: 'iii' },
    { text: 'iv How human developments are affecting wildlife', id: 'iv' },
    { text: 'v Photographing objects that can’t be seen in detail', id: 'v' },
    { text: 'vi A season that may seem unsuitable for photographers', id: 'vi' },
    { text: 'vii No longer too expensive', id: 'vii' },
    { text: 'viii A less ambitious approach', id: 'viii' }
  ];

  const readingQ28to34 = [
    { num: 28, text: '28. Choose the correct heading for Section A:', ans: 'vi' },
    { num: 29, text: '29. Choose the correct heading for Section B:', ans: 'i' },
    { num: 30, text: '30. Choose the correct heading for Section C:', ans: 'vii' },
    { num: 31, text: '31. Choose the correct heading for Section D:', ans: 'iv' },
    { num: 32, text: '32. Choose the correct heading for Section E:', ans: 'iii' },
    { num: 33, text: '33. Choose the correct heading for Section F:', ans: 'viii' },
    { num: 34, text: '34. Choose the correct heading for Section G:', ans: 'v' }
  ];

  for (const item of readingQ28to34) {
    const q = await prisma.question.create({
      data: {
        sectionId: readingSec.id,
        type: 'MCQ',
        questionText: item.text,
        passage: passage5Text,
        marks: 1.0,
        order: item.num
      }
    });
    for (let hIdx = 0; hIdx < headingsList.length; hIdx++) {
      const h = headingsList[hIdx];
      await prisma.option.create({
        data: {
          questionId: q.id,
          optionText: h.text,
          isCorrect: h.id === item.ans,
          order: hIdx + 1
        }
      });
    }
  }

  // Questions 35-40: Complete sentences with ONE WORD
  const readingQ35to40 = [
    { num: 35, text: '35. November is a time when ______ grow (ONE WORD):', ans: 'fungi' },
    { num: 36, text: '36. The apparent size of the moon depends on its position in relation to the ______ (ONE WORD):', ans: 'horizon' },
    { num: 37, text: '37. Sunlight is reflected by the ______ of the moon (ONE WORD):', ans: 'surface' },
    { num: 38, text: '38. When the night sky is clear, many objects in the ______ e.g., buildings, are visible (ONE WORD):', ans: 'landscape' },
    { num: 39, text: '39. With modern cameras, it is possible to photograph not only constellations but also ______ (ONE WORD):', ans: 'galaxies' },
    { num: 40, text: '40. Deer and wild boar may search for food in ______ in towns (ONE WORD):', ans: 'gardens' }
  ];

  for (const item of readingQ35to40) {
    const q = await prisma.question.create({
      data: {
        sectionId: readingSec.id,
        type: 'FILL_BLANK',
        questionText: item.text,
        passage: passage5Text,
        marks: 1.0,
        order: item.num
      }
    });
    await prisma.option.create({
      data: {
        questionId: q.id,
        optionText: item.ans,
        isCorrect: true,
        order: 1
      }
    });
  }

  // ==========================================
  // MODULE 3: WRITING (60 MINUTES - 2 TASKS)
  // ==========================================
  const writingSec = await prisma.section.create({
    data: {
      mockTestId: test.id,
      type: 'WRITING',
      title: 'General Training Writing Test (60 Minutes - 2 Tasks)',
      instructions: 'The total time for writing is 60 minutes. Spend 20 minutes on Task 1 (Letter, at least 150 words) and 40 minutes on Task 2 (Essay, at least 250 words).',
      order: 3
    }
  });

  // Task 1: Letter
  await prisma.question.create({
    data: {
      sectionId: writingSec.id,
      type: 'WRITING',
      questionText: `WRITING TASK-1 (Suggested time: 20 minutes • At least 150 words)

A friend you made while you were studying abroad has written to ask you for help in finding a job in your country.
You have heard about a job in a local company that might be suitable for him/her.

Write a letter to this friend. In your letter:
• Tell your friend about the job and what sort of work it involves.
• Say why you think the job would be suitable for him/her.
• Explain how to apply for the job.

Write at least 150 words.
You do NOT need to write any addresses.
Begin your letter as follows:
Dear............,`,
      marks: 9.0,
      order: 1
    }
  });

  // Task 2: Essay
  await prisma.question.create({
    data: {
      sectionId: writingSec.id,
      type: 'WRITING',
      questionText: `WRITING TASK-2 (Suggested time: 40 minutes • At least 250 words)

Write about the following topic:

Some people say it is important to keep your home and your workplace tidy, with everything organised and in the correct place.
What is your opinion about this?

Give reasons for your answers and include any relevant examples from your own knowledge or experience.
Write at least 250 words.`,
      marks: 9.0,
      order: 2
    }
  });

  // ==========================================
  // MODULE 4: SPEAKING (11-14 MINUTES - 3 PARTS)
  // ==========================================
  const speakingSec = await prisma.section.create({
    data: {
      mockTestId: test.id,
      type: 'SPEAKING',
      title: 'Speaking Test (Voice Recorder)',
      instructions: 'The speaking test consists of 3 parts. Record your voice responses using your device\'s microphone.',
      order: 4
    }
  });

  // Part 1
  await prisma.question.create({
    data: {
      sectionId: speakingSec.id,
      type: 'SPEAKING',
      questionText: `SPEAKING PART 1: General Familiar Topics

Flowers & Lifestyle & Museums:
1. Do you like to have flowers in your home? Why / why not?
2. On what occasions would you give someone flowers in your culture?
3. What do you do in your free time? Has your life changed much in the last year?
4. Are museums popular in your country? Do you like to visit museums nowadays?`,
      preparationTime: 15,
      responseTime: 90,
      marks: 9.0,
      order: 1
    }
  });

  // Part 2
  await prisma.question.create({
    data: {
      sectionId: speakingSec.id,
      type: 'SPEAKING',
      questionText: `SPEAKING PART 2: Cue Card (Long Turn)

Describe a meeting you remember going to at work, college or school.

You should say:
• when and where the meeting was held
• who was at the meeting
• what the people at the meeting talked about
and explain why you remember this meeting.`,
      preparationTime: 60,
      responseTime: 120,
      marks: 9.0,
      order: 2
    }
  });

  // Part 3
  await prisma.question.create({
    data: {
      sectionId: speakingSec.id,
      type: 'SPEAKING',
      questionText: `SPEAKING PART 3: Two-Way Discussion

Going to Meetings & International Leadership:
1. What are the different types of meetings that people often go to?
2. Some people say that no one likes to go to meetings – what is your perspective?
3. Why do you think world leaders often have meetings together?
4. Do you think that meetings between international leaders will become more frequent in the future?`,
      preparationTime: 20,
      responseTime: 120,
      marks: 9.0,
      order: 3
    }
  });

  console.log('🎉 Full 2h 45m IELTS Reality Test 02 successfully seeded!');
}

seedRealityTest()
  .catch(e => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
