import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar.jsx";
import Seo from "../components/Seo.jsx";
import "./IeltsGeneralTraining.css";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const stats = [
  { label: "Total Test Duration", value: "2 Hours 45 Mins" },
  { label: "Delivery Modes", value: "Computer / Paper" },
  { label: "Scoring System", value: "Bands 0 – 9.0" },
  { label: "Test Purpose", value: "Work & Migration" },
];

const listeningParts = [
  {
    title: "Part 1: Social & Everyday Dialogue",
    points: [
      "Two speakers in daily social interactions (e.g., booking accommodation, travel inquiry).",
      "Focus on factual retrieval: names, dates, contact numbers, addresses, and codes.",
    ],
  },
  {
    title: "Part 2: Social & Informational Monologue",
    points: [
      "A single speaker delivering a practical announcement (e.g., local facility guide, exhibition tour).",
      "Focus on directional layout, event timelines, and functional services.",
    ],
  },
  {
    title: "Part 3: Educational / Training Discussion",
    points: [
      "Up to four people conversing in a work or study environment (e.g., assignment debrief).",
      "Focus on tracking stances, speaker agreements, and analytical exchanges.",
    ],
  },
  {
    title: "Part 4: Workplace / Academic Monologue",
    points: [
      "An uninterrupted presentation on a workplace, environmental, or general interest topic.",
      "Focus on main ideas, thematic development, and technical note completion.",
    ],
  },
];

const listeningRules = [
  {
    label: "Question Typologies:",
    text: "Form/note completion, multiple choice, map/diagram labeling, flow-chart summaries, and matching.",
  },
  {
    label: "Word Count Precision:",
    text: 'Stated word constraints (e.g., "NO MORE THAN TWO WORDS AND/OR A NUMBER") are strictly enforced; over-limit answers score zero.',
  },
  {
    label: "Spelling & Plurals:",
    text: "Standard British, American, or Australian spellings are accepted; incorrect pluralization or grammatical forms forfeit the point.",
  },
];

const readingSections = [
  {
    label: "Section 1 (Social Survival):",
    text: "Contains two to three short, informative factual texts (e.g., public notices, timetables, course leaflets). Tests scanning for specific everyday information.",
  },
  {
    label: "Section 2 (Workplace Context):",
    text: "Contains two workplace-focused texts (e.g., company job descriptions, contract conditions, staff training, safety manuals). Evaluates procedural navigation.",
  },
  {
    label: "Section 3 (General Reading):",
    text: "One extended, syntactically complex prose text on a broad historical or lifestyle topic. Tests deeper comprehension, tone identification, and argument flow.",
  },
  {
    label: "Key Item Types:",
    text: "True / False / Not Given, Identifying Writer's Views (Yes / No / Not Given), Paragraph Matching, Sentence Completion, and Summary Completion.",
  },
];

const bandComparisonTable = [
  { band: "9.0", tier: "high", listening: "39–40", reading: "40", level: "Expert User: Complete fluent operational command" },
  { band: "8.5", tier: "high", listening: "37–38", reading: "39", level: "Very Good User (Upper): Occasional unsystematic inaccuracies" },
  { band: "8.0", tier: "high", listening: "35–36", reading: "37–38", level: "Very Good User: Handles complex argumentation effectively" },
  { band: "7.5", tier: "high", listening: "32–34", reading: "36", level: "Good User (Upper): Solid operational command of nuance" },
  { band: "7.0", tier: "mid", listening: "30–31", reading: "34–35", level: "Good User: Generally handles complex language well" },
  { band: "6.5", tier: "mid", listening: "26–29", reading: "32–33", level: "Competent User (Upper): Effective command with occasional errors" },
  { band: "6.0", tier: "mid", listening: "23–25", reading: "30–31", level: "Competent User: Understands fairly complex language in familiar contexts" },
  { band: "5.5", tier: "low", listening: "18–22", reading: "27–29", level: "Modest User (Upper): Partial command; copes with overall meaning" },
  { band: "5.0", tier: "low", listening: "16–17", reading: "23–26", level: "Modest User: Frequent errors; basic communication preserved" },
  { band: "4.0", tier: "low", listening: "10–12", reading: "15–18", level: "Limited User: Basic competence in familiar situations only" },
];

const writingTasks = [
  {
    title: "Task 1: Functional Letter (20 Mins)",
    points: [
      "Write a minimum of 150 words based on a practical situation.",
      "Must address all 3 bulleted prompt requirements clearly.",
      "Registers: Formal (to an unknown official), Semi-formal (colleague/landlord), or Informal (friend).",
    ],
  },
  {
    title: "Task 2: Discursive Essay (40 Mins)",
    points: [
      "Write a minimum of 250 words on a topical issue.",
      "Presents an opinion, discusses advantages/disadvantages, or solves problems.",
      "Evaluated with double the score weighting of Task 1.",
    ],
  },
];

const writingDescriptors = [
  {
    criterion: "Task Achievement (T1) / Task Response (T2)",
    b6: "Addresses requirements; presents relevant overview; some points may lack detail or focus.",
    b7: "Covers all requirements; clear position throughout; main ideas extended and supported.",
    b8: "Fully satisfies all requirements; well-developed response with relevant, extended ideas.",
  },
  {
    criterion: "Coherence & Cohesion (CC)",
    b6: "Arranges information coherently; uses cohesive devices effectively, though with minor mechanical errors.",
    b7: "Logically organizes information; clear progression throughout; uses cohesive devices flexibly.",
    b8: "Sequences information skillfully; manages paragraphing impeccably; cohesive devices flow seamlessly.",
  },
  {
    criterion: "Lexical Resource (LR)",
    b6: "Adequate range for the task; attempts less common vocabulary with some spelling/word-formation lapses.",
    b7: "Sufficient range to show flexibility; uses less common lexical items with awareness of style and collocation.",
    b8: "Wide vocabulary resource; fluent and flexible use; very rare minor inaccuracies or slips in word choice.",
  },
  {
    criterion: "Grammatical Range & Accuracy (GRA)",
    b6: "Uses a mix of simple and complex sentence structures; makes some errors, but they rarely impede meaning.",
    b7: "Uses a variety of complex structures; produces frequent error-free sentences; has good grammatical control.",
    b8: "Wide range of structures flexibly deployed; majority of sentences are error-free with exceptional precision.",
  },
];

const speakingParts = [
  {
    title: "Part 1: Introduction & Familiar Topics (4–5 Mins)",
    points: [
      "ID verification and ice-breaker questions.",
      "Questions on personal background, hometown, daily habits, hobbies, and work/studies.",
    ],
  },
  {
    title: "Part 2: Individual Long Turn (3–4 Mins)",
    points: [
      "Receive a task cue card with bullet prompts; 1 minute to plan with paper and pencil.",
      "Deliver a 1 to 2 minute continuous monologue without interruption.",
    ],
  },
];

const speakingDescriptors = [
  {
    criterion: "Fluency & Coherence (FC)",
    b6: "Willing to speak at length; may lose coherence at times due to repetition, self-correction, or hesitation.",
    b7: "Speaks at length effortlessly; demonstrates discourse markers and connective devices with minor hesitation.",
    b8: "Speaks fluently with only rare self-correction; develops topics coherently, fully, and appropriately.",
  },
  {
    criterion: "Lexical Resource (LR)",
    b6: "Has a wide enough vocabulary to discuss topics at length; makes meaning clear despite inappropriate choices.",
    b7: "Uses vocabulary resource flexibly to discuss variety of topics; uses idiomatic expressions and collocations.",
    b8: "Uses wide vocabulary readily and flexibly; skillfully uses uncommon and idiomatic vocabulary with ease.",
  },
  {
    criterion: "Grammatical Range & Accuracy (GRA)",
    b6: "Uses a mix of simple and complex structures, but with limited flexibility; errors rarely cause comprehension breakdown.",
    b7: "Frequently uses complex structures with good control; produces a high proportion of error-free sentences.",
    b8: "Consistently uses a wide range of complex structures; errors are rare and resemble native-speaker slips.",
  },
  {
    criterion: "Pronunciation (PR)",
    b6: "Uses a range of pronunciation features with mixed control; intelligible throughout, though mispronunciations occur.",
    b7: "Shows all positive features of Band 6 and some of Band 8; can be understood easily with sustained rhythm.",
    b8: "Uses a wide range of phonological features; easy to understand throughout; native accent influence is minimal.",
  },
];

function Section({ number, title, children }) {
  return (
    <motion.section className="ielts-gt-section" {...fadeUp}>
      <div className="ielts-gt-section-header">
        <span className="ielts-gt-section-number">{number}</span>
        <h2 className="ielts-gt-section-title">{title}</h2>
      </div>
      {children}
    </motion.section>
  );
}

function SubCardGrid({ items }) {
  return (
    <div className="ielts-gt-subcard-grid">
      {items.map((item) => (
        <div className="ielts-gt-subcard" key={item.title}>
          <h3>{item.title}</h3>
          <ul>
            {item.points.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function RuleList({ items }) {
  return (
    <ul className="ielts-gt-rule-list">
      {items.map((item) => (
        <li key={item.label}>
          <strong>{item.label}</strong> {item.text}
        </li>
      ))}
    </ul>
  );
}

function Callout({ label, children }) {
  return (
    <div className="ielts-gt-callout">
      <strong>{label}:</strong> {children}
    </div>
  );
}

function DescriptorTable({ rows }) {
  return (
    <div className="ielts-gt-table-wrapper">
      <table className="ielts-gt-table">
        <thead>
          <tr>
            <th>Assessment Criterion</th>
            <th>Band 6.0</th>
            <th>Band 7.0</th>
            <th>Band 8.0</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.criterion}>
              <td>{row.criterion}</td>
              <td>{row.b6}</td>
              <td>{row.b7}</td>
              <td>{row.b8}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function IeltsGeneralTraining() {
  const navigate = useNavigate();

  return (
    <div className="ielts-gt-page">
      <Seo
        title="IELTS General Training Guide | Vectra Foreign Services"
        description="The complete IELTS General Training guide: Listening, Reading, Writing and Speaking module blueprints, official band descriptor matrices, and the score conversion table."
        path="/resources/ielts-general-training"
      />
      <Navbar />

      <div className="ielts-gt-hero">
        <div className="ielts-gt-hero-inner">
          <div className="ielts-gt-back-row">
            <button type="button" className="ielts-gt-back-button" onClick={() => navigate(-1)}>
              ← Back to Resources
            </button>
          </div>

          <span className="ielts-gt-eyebrow">Website Official Candidate Resource</span>
          <h1>IELTS General Training: Master Blueprint</h1>
          <p className="ielts-gt-subtitle">
            Comprehensive module-by-module breakdown, assessment descriptors, and score
            conversion benchmarks for migration and workplace certification.
          </p>

          <div className="ielts-gt-stats">
            {stats.map((s) => (
              <div className="ielts-gt-stat" key={s.label}>
                <span className="ielts-gt-stat-label">{s.label}</span>
                <span className="ielts-gt-stat-value">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="ielts-gt-body">
        <Section number="01" title="Module 1: Listening (General & Academic Shared)">
          <p className="ielts-gt-module-meta">
            Duration: ~30 Minutes (+10 min paper transfer / 2 min computer review) | 4
            Sections | 40 Items
          </p>
          <p className="ielts-gt-paragraph">
            The Listening module measures receptive auditory competency across a broad
            spectrum of real-life social, transactional, and training contexts. Audio tracks
            are heard once only and include native accents from the UK, Australia, New
            Zealand, Canada, and the United States.
          </p>
          <SubCardGrid items={listeningParts} />
          <h3 className="ielts-gt-subheading">Core Assessment Features & Execution Rules</h3>
          <RuleList items={listeningRules} />
          <Callout label="Candidate Strategy Note">
            Read the questions ahead of each audio phase during the allotted 30 to 45
            seconds of preparation time. Underline keywords and anticipate required word
            classes (noun, verb, quantity).
          </Callout>
        </Section>

        <Section number="02" title="Module 2: Reading (General Training Focus)">
          <p className="ielts-gt-module-meta">
            Duration: 60 Minutes (No Transfer Time) | 3 Sections | 40 Total Questions
          </p>
          <p className="ielts-gt-paragraph">
            General Training Reading evaluates functional literacy required for basic
            survival and professional mobility in an English-speaking workplace or society.
            Unlike Academic texts, GT materials use advertisements, staff handbooks,
            contracts, and general interest articles.
          </p>
          <h3 className="ielts-gt-subheading">Sectional Structure & Text Sources</h3>
          <RuleList items={readingSections} />

          <h3 className="ielts-gt-subheading">
            Official Band Score Comparison: Listening vs. General Reading
          </h3>
          <div className="ielts-gt-table-wrapper">
            <table className="ielts-gt-table">
              <thead>
                <tr>
                  <th>Band Level</th>
                  <th>Listening Score (/40)</th>
                  <th>General Reading (/40)</th>
                  <th>Benchmark Competency Level</th>
                </tr>
              </thead>
              <tbody>
                {bandComparisonTable.map((row) => (
                  <tr key={row.band}>
                    <td>
                      <span className={`ielts-gt-band-badge ielts-gt-tier-${row.tier}`}>
                        {row.band}
                      </span>
                    </td>
                    <td>{row.listening}</td>
                    <td>{row.reading}</td>
                    <td>{row.level}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Callout label="Critical Conversion Insight">
            Because General Reading texts are more everyday and accessible than Academic
            texts, the threshold for top bands is notably higher. For example, Band 7.0
            requires 34 correct answers in General Reading versus only 30 in Listening.
          </Callout>
        </Section>

        <Section number="03" title="Module 3: Writing (General Training Focus)">
          <p className="ielts-gt-module-meta">
            Duration: 60 Minutes | 2 Compulsory Tasks | Task 2 Carries Double the Weight of
            Task 1
          </p>
          <p className="ielts-gt-paragraph">
            The General Training Writing module evaluates correspondence and discursive
            exposition in practical settings. Task 1 tests situational epistolary skills;
            Task 2 assesses argumentative synthesis and discursive reasoning.
          </p>
          <SubCardGrid items={writingTasks} />
          <h3 className="ielts-gt-subheading">
            Official Band Descriptors Matrix: Writing Criteria Breakdown
          </h3>
          <DescriptorTable rows={writingDescriptors} />
          <Callout label="Examiner Penalty Warning">
            Memorized templates, off-topic paragraphs, and responses falling below the
            minimum length (150 words for Task 1; 250 words for Task 2) receive systematic
            point deductions under Task Achievement / Response.
          </Callout>
        </Section>

        <Section number="04" title="Module 4: Speaking (Face-to-Face / Video Call)">
          <p className="ielts-gt-module-meta">
            Duration: 11 – 14 Minutes | 3 Structured Parts | Standard Across General &
            Academic
          </p>
          <p className="ielts-gt-paragraph">
            Speaking is conducted as an interactive oral interview with a certified
            examiner. The test assesses spontaneous conversational ability, idea synthesis,
            argument defense, and phonological intelligibility.
          </p>
          <SubCardGrid items={speakingParts} />
          <h3 className="ielts-gt-subheading">
            Official Band Descriptors Matrix: Speaking Criteria Breakdown
          </h3>
          <DescriptorTable rows={speakingDescriptors} />
          <Callout label="Candidate Web Checklist for Success">
            In Part 2, speak for the entire 2 minutes until the examiner stops you. In Part
            3, avoid simple "yes/no" answers; use the <em>PEEL</em> framework (Point,
            Explanation, Example, Link) to develop in-depth, balanced answers.
          </Callout>
        </Section>

        <div className="ielts-gt-cta">
          <h2>Ready to Begin Your IELTS General Training Journey?</h2>
          <p>
            Vectra Foreign Services provides personalized coaching across all four modules,
            mock tests, and one-on-one feedback to help you reach your target band score.
          </p>
          <div className="ielts-gt-cta-buttons">
            <Link to="/check-eligibility" className="ielts-gt-cta-btn primary">
              Check Your Eligibility
            </Link>
            <Link to="/contact" className="ielts-gt-cta-btn secondary">
              Talk to a Counselor
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
