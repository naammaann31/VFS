import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar.jsx";
import Seo from "../components/Seo.jsx";
import "./IeltsAcademic.css";

// Score Conversion Matrix — Listening and Academic Reading raw scores map to
// the same 9-band scale but at slightly different raw-score cutoffs, exactly
// as published in the source guide.
const scoreTable = [
  { band: "9.0 (Expert)", listening: "39–40", reading: "39–40" },
  { band: "8.5", listening: "37–38", reading: "37–38" },
  { band: "8.0 (Very Good)", listening: "35–36", reading: "35–36" },
  { band: "7.5", listening: "32–34", reading: "33–34" },
  { band: "7.0 (Good)", listening: "30–31", reading: "30–32" },
  { band: "6.5", listening: "26–29", reading: "27–29" },
  { band: "6.0 (Competent)", listening: "23–25", reading: "23–26" },
  { band: "5.5", listening: "18–22", reading: "19–22" },
  { band: "5.0 (Modest)", listening: "16–17", reading: "15–18" },
];

const cbtFeatures = [
  {
    label: "Direct Interface Layout",
    text: "Questions and resource texts appear simultaneously side-by-side or stacked.",
  },
  {
    label: "Built-in Digital Toolkit",
    text: "On-screen text highlighter, right-click notes system, and copy-paste utilities are accessible throughout.",
  },
  {
    label: "Automatic Writing Assistance",
    text: "Displays dynamic word counters for both Tasks with no manual calculation required.",
  },
  {
    label: "Timing System",
    text: "Integrated countdown clock that flashes warnings when 10 minutes and 5 minutes remain.",
  },
  {
    label: "Hybrid Option",
    text: "Available ‘Writing on Paper’ format in select regional hubs allows candidates to complete Listening and Reading on a computer while handwriting the Writing test module.",
  },
];

const writingCriteria = [
  {
    label: "Task Achievement/Response",
    text: "Complete addressing of all prompts, clear positions, fully developed arguments.",
  },
  {
    label: "Coherence and Cohesion",
    text: "Logical sequencing, smooth semantic text flow, sophisticated structural paragraphing.",
  },
  {
    label: "Lexical Resource",
    text: "Precise word choices, advanced idioms, controlled collocation, and zero orthographical or spelling mistakes.",
  },
  {
    label: "Grammatical Range and Accuracy",
    text: "Blend of complex structures, syntactic variety, and error-free sentence punctuation.",
  },
];

const speakingCriteria = [
  {
    label: "Fluency and Coherence",
    text: "Spontaneous extended communication free of semantic drift, speech breakdowns, or visible self-correction patterns.",
  },
  {
    label: "Lexical Resource",
    text: "Flexibility in word choice to conceptualize complex abstract topics dynamically.",
  },
  {
    label: "Grammatical Range and Accuracy",
    text: "Systematic control over highly complex structures and subordinate clauses.",
  },
  {
    label: "Pronunciation",
    text: "Phonemic precision, contextual word stresses, clear intonation, and flawless audience intelligibility.",
  },
];

const registrationSteps = [
  <>
    Access official channels via the international hubs:{" "}
    <a
      href="https://ielts.idp.com"
      target="_blank"
      rel="noopener noreferrer"
      className="ielts-academic-link"
    >
      IDP IELTS Portal
    </a>{" "}
    or{" "}
    <a
      href="https://takeielts.britishcouncil.org"
      target="_blank"
      rel="noopener noreferrer"
      className="ielts-academic-link"
    >
      British Council Take IELTS Portal
    </a>
    .
  </>,
  <>
    Filter locations by choosing the <strong>Computer-Delivered IELTS Academic</strong> selection.
  </>,
  <>Reserve an open test session slot from the live electronic facility calendar.</>,
  <>Populate profile details explicitly matching your valid international travel passport credentials.</>,
  <>
    Finalize reservation fees online via safe local electronic payment processing solutions (UPI,
    Credit/Debit cards).
  </>,
];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.6, ease: "easeOut" },
};

function Section({ number, title, children }) {
  return (
    <motion.section className="ielts-academic-section" {...fadeUp}>
      <div className="ielts-academic-section-header">
        <span className="ielts-academic-section-number">{number}</span>
        <h2 className="ielts-academic-section-title">{title}</h2>
      </div>
      {children}
    </motion.section>
  );
}

function FeatureList({ items }) {
  return (
    <ul className="ielts-academic-feature-list">
      {items.map((item) => (
        <li key={item.label}>
          <strong>{item.label}:</strong> {item.text}
        </li>
      ))}
    </ul>
  );
}

export default function IeltsAcademic() {
  const navigate = useNavigate();

  return (
    <div className="ielts-academic-page">
      <Seo
        title="IELTS Academic Test Guide | Vectra Foreign Services"
        description="The complete IELTS Academic Computer-Based Test (CBT) guide: Listening, Reading, Writing and Speaking module blueprints, the official band-score conversion table, and how to register."
        path="/resources/ielts-academic"
      />
      <Navbar />

      <header className="ielts-academic-hero">
        <div className="ielts-academic-hero-inner">
          <div className="ielts-academic-back-row">
            <button type="button" className="ielts-academic-back-button" onClick={() => navigate(-1)}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Back
            </button>
          </div>

          <motion.p
            className="ielts-academic-quote"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            &ldquo;The world&rsquo;s most trusted English test&rdquo;
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          >
            IELTS Academic Test Specification
          </motion.h1>
          <motion.p
            className="ielts-academic-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          >
            The Official Guide to the Computer-Based Test (CBT)
          </motion.p>

          <motion.div
            className="ielts-academic-meta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          >
            <span className="ielts-academic-meta-pill">Official CBT Exam Blueprint &amp; Specifications</span>
            <span className="ielts-academic-meta-pill">2026 Edition</span>
          </motion.div>
        </div>
      </header>

      <main className="ielts-academic-body">
        <Section number="01" title="Executive Overview">
          <p className="ielts-academic-paragraph">
            The <strong>IELTS Academic test</strong> measures English language proficiency required for
            an academic, higher education environment. In line with the global transition to
            computer-delivered testing (with traditional paper testing phased out in major markets),
            this guide defines the blueprint, functional tools, and assessment parameters governing the
            current Computer-Based Test (CBT) format.
          </p>

          <h3 className="ielts-academic-subheading">Core CBT Platform Functional Features</h3>
          <FeatureList items={cbtFeatures} />
        </Section>

        <Section number="02" title="Listening Module Blueprint">
          <ul className="ielts-academic-feature-list">
            <li>
              <strong>Duration:</strong> Approximately 30 minutes total.{" "}
              <em>
                Critical CBT Change: Unlike the paper test, there is no 10-minute transfer period.
                Test takers receive exactly 2 minutes at the end to review responses on-screen.
              </em>
            </li>
            <li>
              <strong>Items:</strong> 40 questions across 4 distinct recorded audio sequences.
            </li>
            <li>
              <strong>Structure:</strong> Part 1 (Social dialogue), Part 2 (Social monologue), Part 3
              (Educational multi-person discussion), Part 4 (Academic lecture).
            </li>
            <li>
              <strong>CBT Mechanics:</strong> Drag-and-drop mechanics, form-filling text entry, and
              interactive multiple-choice buttons.
            </li>
          </ul>
        </Section>

        <Section number="03" title="Reading Module Blueprint">
          <ul className="ielts-academic-feature-list">
            <li>
              <strong>Duration:</strong> Strict 60 minutes time allocation (No transfer window).
            </li>
            <li>
              <strong>Items:</strong> 40 items across 3 long, authentic academic texts drawn from
              scientific journals, books, and analytical periodicals.
            </li>
            <li>
              <strong>CBT Mechanics:</strong> Split-screen view allowing concurrent reading and answer
              logging. Standard highlight tools facilitate quick structural parsing.
            </li>
          </ul>
        </Section>

        <Section number="04" title="Writing Module Blueprint">
          <ul className="ielts-academic-feature-list">
            <li>
              <strong>Duration:</strong> Strict 60 minutes total (Recommended split: 20 mins for Task
              1, 40 mins for Task 2).
            </li>
            <li>
              <strong>Task 1 Requirements:</strong> Synthesize static visuals (graphs, flow charts,
              maps, process diagrams) into a formal report of <strong>minimum 150 words</strong>.
            </li>
            <li>
              <strong>Task 2 Requirements:</strong> Formulate an academic argumentative or discursive
              essay responding to a formal prompt. <strong>Minimum 250 words</strong>.
            </li>
            <li>
              <strong>CBT Mechanics:</strong> Direct keyboard text-input with persistent, live
              character/word statistics displayed at the bottom of the input boxes.
            </li>
          </ul>
        </Section>

        <Section number="05" title="Speaking Module Blueprint">
          <ul className="ielts-academic-feature-list">
            <li>
              <strong>Duration:</strong> 11 to 14 minutes total session duration.
            </li>
            <li>
              <strong>Delivery Status:</strong> Handled entirely as a live face-to-face interaction
              with a certified human examiner, ensuring authentic interactive testing even within
              computer-based center packages.
            </li>
            <li>
              <strong>Structure:</strong> Part 1 (Biographical introductory queries), Part 2
              (Individual sustained talk based on prompt card), Part 3 (Abstract thematic dialogue).
            </li>
          </ul>
        </Section>

        <Section number="06" title="Grading Standards &amp; Score Conversion Matrices">
          <p className="ielts-academic-paragraph">
            Every raw mark scored on the Listening and Reading segments provides 1 point. Conversion
            matrices map these outputs into the official IELTS 9-Band scale.
          </p>

          <div className="ielts-academic-table-wrapper">
            <table className="ielts-academic-table">
              <thead>
                <tr>
                  <th>IELTS Band Score</th>
                  <th>Listening (Raw Score / 40)</th>
                  <th>Academic Reading (Raw Score / 40)</th>
                </tr>
              </thead>
              <tbody>
                {scoreTable.map((row) => (
                  <tr key={row.band}>
                    <td>{row.band}</td>
                    <td>{row.listening}</td>
                    <td>{row.reading}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section number="07" title="Core Subject Assessment Criteria">
          <h3 className="ielts-academic-subheading">Writing Evaluation Matrices (Weighted 25% each)</h3>
          <FeatureList items={writingCriteria} />

          <h3 className="ielts-academic-subheading">Speaking Evaluation Matrices (Weighted 25% each)</h3>
          <FeatureList items={speakingCriteria} />
        </Section>

        <Section number="08" title="Administrative Steps for Official CBT Registration">
          <ol className="ielts-academic-steps">
            {registrationSteps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </Section>

        <motion.div className="ielts-academic-cta" {...fadeUp}>
          <h2>Ready to start your IELTS Academic preparation?</h2>
          <p>
            Our team provides structured coaching, mock tests, and speaking &amp; writing feedback
            tailored to your target band score.
          </p>
          <div className="ielts-academic-cta-buttons">
            <Link to="/contact" className="ielts-academic-cta-btn primary">
              Book Free Consultation
            </Link>
            <a
              href="/ielts-mock-test.html"
              target="_blank"
              rel="noopener noreferrer"
              className="ielts-academic-cta-btn secondary"
            >
              Take the Free Mock Test
            </a>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
