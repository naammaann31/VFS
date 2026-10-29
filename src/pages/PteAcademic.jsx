import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar.jsx";
import Seo from "../components/Seo.jsx";
import "./PteAcademic.css";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const stats = [
  { label: "Total Duration", value: "~2 Hours (Single Session)" },
  { label: "Testing Method", value: "100% Computer-Based" },
  { label: "Scoring Engine", value: "Automated AI (10–90)" },
  { label: "Result Turnaround", value: "Typically Within 48 Hours" },
];

const scoringArchitecture = [
  {
    label: "Fully Automated Testing:",
    text: "Completed entirely at a secure Pearson test center workstation equipped with a QWERTY keyboard, monitor, and noise-cancelling headset with microphone.",
  },
  {
    label: "Standardized AI Scoring:",
    text: "Evaluated by patented machine-learning algorithms trained on millions of real spoken and written samples. Eliminates examiner bias, fatigue, and regional grading variance.",
  },
  {
    label: "Integrated Cross-Skill Scoring:",
    text: "A single task regularly scores two distinct skills simultaneously (e.g., Reading aloud awards points to both Speaking and Reading).",
  },
];

const speakingWritingTasks = [
  {
    title: "1. Read Aloud (6–7 Items)",
    points: [
      "Read a short text (up to 60 words) aloud after 35–40s prep.",
      "Tests Reading & Speaking via oral fluency and pronunciation.",
    ],
  },
  {
    title: "2. Repeat Sentence (10–12 Items)",
    points: [
      "Listen to a 3–9s audio and immediately repeat it verbatim.",
      "Tests Listening & Speaking; requires high auditory retention.",
    ],
  },
  {
    title: "3. Describe Image (3–4 Items)",
    points: [
      "Examine a graph, chart, map, or process for 25s, then describe it for 40s.",
      "Tests Speaking fluency, content structure, and keywords.",
    ],
  },
  {
    title: "4. Re-tell Lecture (1–2 Items)",
    points: [
      "Listen to a 60–90s academic lecture, then summarize key themes in 40s.",
      "Contributes to both Listening & Speaking.",
    ],
  },
  {
    title: "5. Answer Short Question (5–6 Items)",
    points: [
      "Answer a simple general question in one or a few words.",
      "Tests Listening & Speaking vocabulary retrieval.",
    ],
  },
  {
    title: "6. Summarize Written Text (1–2 Items)",
    points: [
      "Read a passage and write a single-sentence summary (5–75 words) in 10 mins.",
      "Tests Reading & Writing.",
    ],
  },
  {
    title: "7. Write Essay (1–2 Items) — 20 Minutes per Essay",
    points: [
      "Write a formal, argumentative essay of 200–300 words responding to a prompt.",
      "Scored on content development, paragraph structure, vocabulary range, grammar, and formal conventions.",
    ],
  },
];

const readingTasks = [
  {
    title: "1. Reading & Writing: Fill in Blanks (5–6 Items)",
    points: [
      "Passage with embedded drop-down menus.",
      "Tests Reading & Writing through collocations, syntax, and context.",
    ],
  },
  {
    title: "2. Multiple Choice, Multiple Answers (1–2 Items)",
    points: [
      "Select more than one correct option.",
      "Negative Marking: -1 point for incorrect choices (min score 0).",
    ],
  },
  {
    title: "3. Re-order Paragraphs (2–3 Items)",
    points: [
      "Drag and drop text boxes into logical sequence.",
      "Scored on correctly linked adjacent paragraph pairs.",
    ],
  },
  {
    title: "4. Reading: Fill in the Blanks (4–5 Items)",
    points: [
      "Drag words from a bottom pool into blank boxes inside a text.",
      "Tests reading vocabulary and grammatical word class.",
    ],
  },
  {
    title: "5. Multiple Choice, Single Answer (1–2 Items)",
    points: [
      "Read a passage and choose one correct answer evaluating tone, main purpose, inference, or detailed information.",
    ],
  },
];

const listeningTasks = [
  {
    title: "1. Summarize Spoken Text (1–2 Items)",
    points: [
      "Listen to audio (60–90s); write a 50–70 word summary in 10 mins.",
      "Tests Listening & Writing.",
    ],
  },
  {
    title: "2. MC, Multiple Answers (1–2 Items)",
    points: [
      "Choose multiple correct statements.",
      "Negative Marking: -1 for incorrect selections.",
    ],
  },
  {
    title: "3. Fill in the Blanks (2–3 Items)",
    points: [
      "Type missing words in a transcript while listening.",
      "Tests Listening & Writing (spelling accuracy).",
    ],
  },
  {
    title: "4. Highlight Correct Summary (1–2 Items)",
    points: [
      "Select the written summary that best mirrors the recording.",
      "Tests synthesis across Listening & Reading.",
    ],
  },
  {
    title: "5. MC, Single Answer (1–2 Items)",
    points: ["Select one option matching recording gist or purpose."],
  },
  {
    title: "6. Select Missing Word (1–2 Items)",
    points: ["Select the audio's beeped concluding word/phrase."],
  },
  {
    title: "7. Highlight Incorrect Words (2–3 Items)",
    points: [
      "Click words in transcript that differ from audio.",
      "Negative Marking: -1 for wrongly clicked words.",
    ],
  },
  {
    title: "8. Write From Dictation (3–4 Items)",
    points: [
      "Listen to a spoken sentence and type it exactly.",
      "Crucial high-weight task for Listening & Writing.",
    ],
  },
];

const scoreConcordanceTable = [
  { pte: "84 – 90", tier: "high", ielts: "Band 9.0", cefr: "C2", benchmark: "Expert / Native Mastery (Maximum migration language points)" },
  { pte: "76 – 83", tier: "high", ielts: "Band 8.0 / 8.5", cefr: "C1 / C2", benchmark: "Superior English: High-tier postgraduate, medical registration" },
  { pte: "66 – 75", tier: "high", ielts: "Band 7.0 / 7.5", cefr: "C1", benchmark: "Proficient English: Standard direct university admission & skilled visas" },
  { pte: "58 – 65", tier: "mid", ielts: "Band 6.5", cefr: "B2", benchmark: "Competent English (Upper): Standard undergraduate & Master's cutoff" },
  { pte: "50 – 57", tier: "mid", ielts: "Band 6.0", cefr: "B2", benchmark: "Competent English: Foundation entry, technical diplomas, trade visas" },
  { pte: "42 – 49", tier: "mid", ielts: "Band 5.5", cefr: "B1", benchmark: "Modest User: Pre-sessional English study pathway required" },
  { pte: "36 – 41", tier: "low", ielts: "Band 5.0", cefr: "B1", benchmark: "Vocational English: Secondary school programs, introductory training" },
  { pte: "30 – 35", tier: "low", ielts: "Band 4.5", cefr: "A2", benchmark: "Limited User: Functional survival language only" },
  { pte: "10 – 29", tier: "low", ielts: "Band 0 – 4.0", cefr: "Below A2", benchmark: "Extremely limited operational ability" },
];

const scoringMatrix = [
  { item: "Read Aloud", primary: "Speaking", secondary: "Reading", impact: "Very High" },
  { item: "Repeat Sentence", primary: "Speaking", secondary: "Listening", impact: "Very High" },
  { item: "Re-tell Lecture", primary: "Speaking", secondary: "Listening", impact: "Medium" },
  { item: "Summarize Written Text", primary: "Writing", secondary: "Reading", impact: "High" },
  { item: "Reading & Writing: Blanks", primary: "Reading", secondary: "Writing", impact: "Very High" },
  { item: "Summarize Spoken Text", primary: "Writing", secondary: "Listening", impact: "High" },
  { item: "Listening: Fill in the Blanks", primary: "Listening", secondary: "Writing", impact: "Medium" },
  { item: "Highlight Incorrect Words", primary: "Listening", secondary: "Reading", impact: "Medium" },
  { item: "Write From Dictation", primary: "Listening", secondary: "Writing", impact: "Critical" },
];

const scoringCriteria = [
  {
    dimension: "Oral Fluency",
    evaluates: "Smooth rhythm, consistent phrasing, natural pauses without hesitation, false starts, or repeated filler words.",
    tasks: "Read Aloud, Repeat Sentence, Describe Image, Re-tell Lecture.",
  },
  {
    dimension: "Pronunciation",
    evaluates: "Vowel/consonant accuracy, word stress, sentence intonation intelligible to native speakers across global dialects.",
    tasks: "Read Aloud, Repeat Sentence, Describe Image, Re-tell Lecture.",
  },
  {
    dimension: "Content Relevance",
    evaluates: "Accurate capture of all key data points, facts, supporting arguments, and relationships mentioned in prompts.",
    tasks: "All Speaking & Writing tasks; if content score is 0, entire item receives 0.",
  },
  {
    dimension: "Form & Word Limits",
    evaluates: "Strict adherence to structural rules (e.g., 200–300 words for essays; exactly 1 sentence for Summarize Written Text).",
    tasks: "Summarize Written Text, Write Essay, Summarize Spoken Text.",
  },
  {
    dimension: "Grammar & Mechanics",
    evaluates: "Syntax, correct tense usage, structural range, punctuation, and capitalization.",
    tasks: "Write Essay, Summarize Spoken Text, Summarize Written Text.",
  },
  {
    dimension: "Spelling",
    evaluates: "Single spelling convention consistency (UK or US accepted; mixing conventions within one text is penalized).",
    tasks: "Write Essay, Write From Dictation, Fill in the Blanks.",
  },
];

function Section({ number, title, children }) {
  return (
    <motion.section className="pte-academic-section" {...fadeUp}>
      <div className="pte-academic-section-header">
        <span className="pte-academic-section-number">{number}</span>
        <h2 className="pte-academic-section-title">{title}</h2>
      </div>
      {children}
    </motion.section>
  );
}

function SubCardGrid({ items }) {
  return (
    <div className="pte-academic-subcard-grid">
      {items.map((item) => (
        <div className="pte-academic-subcard" key={item.title}>
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
    <ul className="pte-academic-rule-list">
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
    <div className="pte-academic-callout">
      <strong>{label}:</strong> {children}
    </div>
  );
}

export default function PteAcademic() {
  const navigate = useNavigate();

  return (
    <div className="pte-academic-page">
      <Seo
        title="PTE Academic Test Guide | Vectra Foreign Services"
        description="The complete PTE Academic guide: computer-delivery and AI scoring architecture, Speaking & Writing, Reading and Listening task breakdowns, the score concordance table, and automated scoring criteria."
        path="/resources/pte-academic"
      />
      <Navbar />

      <div className="pte-academic-hero">
        <div className="pte-academic-hero-inner">
          <div className="pte-academic-back-row">
            <button type="button" className="pte-academic-back-button" onClick={() => navigate(-1)}>
              ← Back to Resources
            </button>
          </div>

          <span className="pte-academic-eyebrow">PTE Academic Official Candidate Blueprint</span>
          <h1>PTE Academic: Module Architecture &amp; Test Guide</h1>
          <p className="pte-academic-subtitle">
            Brief technical overview of computer delivery, automated AI scoring mechanisms,
            question types, and core communicative skills.
          </p>

          <div className="pte-academic-stats">
            {stats.map((s) => (
              <div className="pte-academic-stat" key={s.label}>
                <span className="pte-academic-stat-label">{s.label}</span>
                <span className="pte-academic-stat-value">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="pte-academic-body">
        <Section number="01" title="Testing Method & Automated Scoring Architecture">
          <RuleList items={scoringArchitecture} />
        </Section>

        <Section number="02" title="Part 1: Speaking & Writing (Combined Session)">
          <p className="pte-academic-module-meta">
            Time: 54–67 Minutes | 8 Distinct Task Types | Assesses Production &amp; Oral
            Communication
          </p>
          <SubCardGrid items={speakingWritingTasks} />
          <Callout label="The 3-Second Microphone Rule">
            Recording starts automatically after the tone. If you hesitate and remain silent
            for more than 3 seconds, the microphone shuts off permanently for that question.
          </Callout>
        </Section>

        <Section number="03" title="Part 2: Reading Module">
          <p className="pte-academic-module-meta">
            Time: 29–30 Minutes | 5 Task Types | Single Overall Timer (Candidate-Paced)
          </p>
          <p className="pte-academic-paragraph">
            The Reading section uses academic passages drawn from humanities, natural
            sciences, and social sciences. Time is shared across all questions without
            individual item timers.
          </p>
          <SubCardGrid items={readingTasks} />
        </Section>

        <Section number="04" title="Part 3: Listening Module">
          <p className="pte-academic-module-meta">
            Time: 30–43 Minutes | 8 Task Types | Audio Tracks Played Once Only
          </p>
          <p className="pte-academic-paragraph">
            Listening tracks include authentic lectures, interviews, and academic discussions
            featuring international native accents. Headphone volume can be adjusted at any
            time.
          </p>
          <SubCardGrid items={listeningTasks} />
          <Callout label="Time Allocation Warning">
            While Summarize Spoken Text has its own fixed 10-minute timer per prompt, all
            remaining Listening tasks share a collective timer. Reserve at least 5–6 minutes
            for Write From Dictation.
          </Callout>
        </Section>

        <Section number="05" title="Score Concordance & Benchmark Comparison">
          <p className="pte-academic-paragraph">
            Official Equivalence: PTE Academic (10–90) vs. IELTS vs. CEFR Benchmarks.
          </p>
          <div className="pte-academic-table-wrapper">
            <table className="pte-academic-table">
              <thead>
                <tr>
                  <th>PTE Academic</th>
                  <th>IELTS Equivalent</th>
                  <th>CEFR Level</th>
                  <th>Functional &amp; Visa Benchmark Application</th>
                </tr>
              </thead>
              <tbody>
                {scoreConcordanceTable.map((row) => (
                  <tr key={row.pte}>
                    <td>
                      <span className={`pte-academic-band-badge pte-academic-tier-${row.tier}`}>
                        {row.pte}
                      </span>
                    </td>
                    <td>{row.ielts}</td>
                    <td>{row.cefr}</td>
                    <td>{row.benchmark}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section number="06" title="Integrated Scoring Contribution Matrix">
          <p className="pte-academic-paragraph">
            How high-impact tasks cross-fund multiple communicative skills.
          </p>
          <div className="pte-academic-table-wrapper">
            <table className="pte-academic-table">
              <thead>
                <tr>
                  <th>Item Type Name</th>
                  <th>Primary Skill Scored</th>
                  <th>Secondary Cross-Skill</th>
                  <th>Impact</th>
                </tr>
              </thead>
              <tbody>
                {scoringMatrix.map((row) => (
                  <tr key={row.item}>
                    <td>{row.item}</td>
                    <td>{row.primary}</td>
                    <td>{row.secondary}</td>
                    <td>{row.impact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Callout label="Strategic Preparation Tip">
            You cannot reach 79+ in Writing without mastering <em>Write From Dictation</em>{" "}
            and <em>Reading &amp; Writing Fill in the Blanks</em>, because cross-contributions
            account for a major share of total writing points.
          </Callout>
        </Section>

        <Section number="07" title="PTE Automated Scoring Criteria & Enabling Descriptors">
          <p className="pte-academic-paragraph">
            How machine learning evaluates spoken, written, and lexical responses.
          </p>
          <div className="pte-academic-table-wrapper">
            <table className="pte-academic-table">
              <thead>
                <tr>
                  <th>Assessment Dimension</th>
                  <th>What the Automated Scoring Engine Evaluates</th>
                  <th>Primary Tasks Evaluated</th>
                </tr>
              </thead>
              <tbody>
                {scoringCriteria.map((row) => (
                  <tr key={row.dimension}>
                    <td>{row.dimension}</td>
                    <td>{row.evaluates}</td>
                    <td>{row.tasks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="pte-academic-subheading">Scoring Rules &amp; Negative Marking Overview</h3>
          <RuleList
            items={[
              {
                label: "Partial Credit Tasks:",
                text: "Most questions assign points for partial accuracy (e.g., repeating 50% or 100% of a sentence correctly).",
              },
              {
                label: "Negative Marking (-1 point per error):",
                text: "Applies ONLY to three question types — Reading: Multiple Choice, Multiple Answers; Listening: Multiple Choice, Multiple Answers; Listening: Highlight Incorrect Words. A question's final score will never drop below zero.",
              },
              {
                label: "Form Zero-Gate Rule:",
                text: "In Summarize Written Text, if your response is more than one sentence or outside 5–75 words, the entire question scores 0. In Write Essay, essays below 120 or above 380 words receive zero points.",
              },
            ]}
          />

          <Callout label="Website Quick Takeaway">
            In computer-scored exams, do not pause or restart sentences mid-stream. Keep an
            even speaking cadence and prioritize high-yield integrated tasks (Write From
            Dictation, Read Aloud, Fill in the Blanks) for maximum score gains.
          </Callout>
        </Section>

        <div className="pte-academic-cta">
          <h2>Ready to Begin Your PTE Academic Preparation?</h2>
          <p>
            Vectra Foreign Services provides personalized coaching across all four
            communicative skills, mock tests, and one-on-one feedback to help you reach your
            target score.
          </p>
          <div className="pte-academic-cta-buttons">
            <Link to="/check-eligibility" className="pte-academic-cta-btn primary">
              Check Your Eligibility
            </Link>
            <Link to="/contact" className="pte-academic-cta-btn secondary">
              Talk to a Counselor
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
