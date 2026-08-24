import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "../components/Navbar.jsx";
import ServiceCTA from "../components/ServiceCTA.jsx";
import "./Resources.css";

const GraduationIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
  </svg>
);

const BriefcaseIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const MonitorIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </svg>
);

const MicIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" y1="19" x2="12" y2="22" />
  </svg>
);

const PenIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
  </svg>
);

const CheckSquareIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 11 12 14 22 4" />
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
  </svg>
);

const TargetIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const DocumentIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const UsersIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const PlaneIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.2-1.1.6L2.5 9l5.4 3.1L5 15H2l-1 1 3.5 1.5L6 21l1-1v-3l2.9-2.9 3.1 5.4l2.2-1.2c.4-.2.7-.6.6-1.1z" />
  </svg>
);

const programs = [
  {
    category: "Standardized Tests",
    icon: <GraduationIcon />,
    title: "IELTS Academic",
    desc: "For students applying to international universities, colleges, and academic programs.",
  },
  {
    category: "Standardized Tests",
    icon: <BriefcaseIcon />,
    title: "IELTS General Training",
    desc: "For applicants preparing for work, migration, PR, or general immigration pathways.",
  },
  {
    category: "Standardized Tests",
    icon: <MonitorIcon />,
    title: "TOEFL iBT",
    desc: "For students applying to institutions where TOEFL is accepted as proof of English proficiency.",
  },
  {
    category: "Standardized Tests",
    icon: <MonitorIcon />,
    title: "PTE Academic",
    desc: "For applicants who prefer a computer-based English test accepted by many academic and migration pathways.",
  },
  {
    category: "Standardized Tests",
    icon: <MonitorIcon />,
    title: "CELPIP",
    desc: "For applicants preparing for Canadian PR, citizenship, or professional designation pathways.",
  },
  {
    category: "Foreign Languages",
    icon: <GraduationIcon />,
    title: "German Language",
    desc: "For students, professionals, and applicants exploring study, work, or relocation options in Germany or German-speaking regions.",
  },
  {
    category: "Foreign Languages",
    icon: <GraduationIcon />,
    title: "French Language",
    desc: "For applicants exploring destinations where French language ability may support academic, professional, or migration goals.",
  },
  {
    category: "Specialized Support",
    icon: <MicIcon />,
    title: "Speaking Practice",
    desc: "Focused sessions to improve fluency, confidence, pronunciation, and response structure.",
  },
  {
    category: "Specialized Support",
    icon: <PenIcon />,
    title: "Writing Support",
    desc: "Guidance on writing tasks, essay structure, grammar clarity, and test-specific scoring expectations.",
  },
  {
    category: "Specialized Support",
    icon: <CheckSquareIcon />,
    title: "Mock Tests",
    desc: "Practice tests to help applicants understand timing, question types, and performance gaps.",
  },
  {
    category: "Specialized Support",
    icon: <TargetIcon />,
    title: "Test Strategy Sessions",
    desc: "Guidance on test format, preparation planning, target score strategy, and improvement areas.",
  },
];

const categories = ["All", "Standardized Tests", "Foreign Languages", "Specialized Support"];

const documentTypes = [
  "Statement of Purpose",
  "Study Plan",
  "Visa Cover Letter",
  "Explanation Letter",
  "Travel Purpose Letter",
  "Business Visit Letter",
  "Refusal Explanation Support",
  "Personal Statement",
];

const interviewTopics = [
  "Mock visa interviews",
  "Student visa interview preparation",
  "Visitor visa interview preparation",
  "Work visa interview guidance",
  "Family visa interview support",
  "Confidence building",
  "Answer structuring",
  "Document explanation practice",
];

const preDepartureTopics = [
  "Travel document checklist",
  "Pre-departure orientation",
  "Arrival preparation",
  "Accommodation basics",
  "Student readiness guidance",
];

const Resources = () => {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPrograms = programs.filter(
    (program) => activeCategory === "All" || program.category === activeCategory,
  );

  return (
    <div className="resources-page-wrapper">
      <Navbar />

      <section className="resources-hero">
        <div className="resources-hero-content">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          >
            Language Coaching for Study, Work, and Migration
          </motion.h1>
          <motion.p
            className="resources-hero-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          >
            Prepare for IELTS, TOEFL, PTE, German, and French language requirements with focused
            training and practical guidance.
          </motion.p>
          <motion.a
            href="/contact"
            className="hero-btn"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
          >
            Join Language Coaching
          </motion.a>
        </div>
      </section>

      <section className="resources-intro-section">
        <div className="resources-container">
          <motion.div
            className="intro-glass-card"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
          >
            <p>
              Language scores can play an important role in study abroad, work visa, PR, and
              settlement pathways. A strong language profile can improve academic options,
              professional opportunities, and migration readiness depending on the destination.
            </p>
            <p>
              We help applicants understand which test may be relevant for their destination and
              prepare through structured coaching, practice, and feedback.
            </p>
          </motion.div>

          {/* Featured IELTS Mock Test Banner */}
          <motion.div
            className="ielts-mock-test-banner"
            style={{
              background: "linear-gradient(135deg, #1C2B4B 0%, #142038 100%)",
              color: "#FFFFFF",
              borderRadius: "16px",
              padding: "2rem",
              marginTop: "1.5rem",
              border: "2px solid #D97706",
              boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
              alignItems: "flex-start"
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4, ease: "easeOut" }}
          >
            <div style={{ background: "#D97706", color: "#142038", padding: "0.35rem 0.75rem", borderRadius: "6px", fontWeight: "700", fontSize: "0.85rem", textTransform: "uppercase" }}>
              100% Free Practice Test
            </div>
            <h2 style={{ color: "#FFFFFF", fontFamily: "'Fraunces', Georgia, serif", fontSize: "1.8rem", margin: 0 }}>
              Take Our Free Full-Length Online IELTS Mock Test
            </h2>
            <p style={{ color: "#E2E8F0", fontSize: "1rem", lineHeight: "1.6", margin: 0, maxWidth: "750px" }}>
              Experience an authentic exam environment with live 40-minute timer, Listening single-play audio, Reading passages, Task 2 Essay word-count tracker, and browser-based Speaking voice recording. Receive your detailed score breakdown within 48 hours!
            </p>
            <a
              href="/ielts-mock-test.html"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                background: "#B3382C",
                color: "#FFFFFF",
                fontWeight: "700",
                padding: "0.85rem 1.75rem",
                borderRadius: "8px",
                textDecoration: "none",
                fontSize: "1rem",
                boxShadow: "0 4px 12px rgba(179, 56, 44, 0.4)",
                transition: "all 0.2s ease"
              }}
            >
              🚀 Launch Free IELTS Mock Test Now →
            </a>
          </motion.div>
        </div>
      </section>

      <section className="programs-section">
        <div className="resources-container">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.6 }}
          >
            Our Coaching Programs
          </motion.h2>

          <motion.div
            className="programs-filter-tabs"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {categories.map((category) => (
              <button
                key={category}
                className={`filter-tab ${activeCategory === category ? "active" : ""}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </motion.div>

          <motion.div layout className="programs-grid">
            <AnimatePresence mode="popLayout">
              {filteredPrograms.map((program, index) => (
                <motion.div
                  key={program.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: (index % 6) * 0.1 }}
                  className="program-card"
                >
                  <div className="program-icon-wrapper">{program.icon}</div>
                  <div className="program-category-label">{program.category}</div>
                  <h3>{program.title}</h3>
                  <p>{program.desc}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <section className="specialized-services-section">
        <div className="resources-container">
          <motion.div
            className="specialized-service-card"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <div className="ss-icon">
              <DocumentIcon />
            </div>
            <div className="ss-content">
              <h2>Strong Written Documentation for Visa Applications</h2>
              <p className="ss-desc">
                We help applicants prepare professional SOPs, study plans, cover letters, explanation
                letters, refusal-response letters, and personal statements based on their purpose of
                travel and profile.
              </p>
              <div className="ss-list-wrapper">
                <h4>What We Prepare</h4>
                <ul className="ss-list">
                  {documentTypes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <a href="/contact" className="ss-cta">
                Get SOP Support
              </a>
            </div>
          </motion.div>

          <motion.div
            className="specialized-service-card reverse"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <div className="ss-icon">
              <UsersIcon />
            </div>
            <div className="ss-content">
              <h2>Visa Interview and Profile Presentation Support</h2>
              <p className="ss-desc">
                We help applicants prepare for visa interviews by reviewing common questions,
                improving answer structure, identifying weak areas, and helping them present their
                purpose clearly and honestly.
              </p>
              <div className="ss-list-wrapper">
                <h4>What We Help With</h4>
                <ul className="ss-list">
                  {interviewTopics.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <a href="/contact" className="ss-cta">
                Book Interview Preparation
              </a>
            </div>
          </motion.div>

          <motion.div
            className="specialized-service-card"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <div className="ss-icon">
              <PlaneIcon />
            </div>
            <div className="ss-content">
              <h2>Support After Approval and Before Travel</h2>
              <p className="ss-desc">
                Visa approval is not the end of the journey. We help applicants prepare for travel,
                arrival, document organization, and the practical next steps after approval.
              </p>
              <div className="ss-list-wrapper">
                <h4>What We Help With</h4>
                <ul className="ss-list">
                  {preDepartureTopics.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <a href="/contact" className="ss-cta">
                Get Pre-Departure Support
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <ServiceCTA />
    </div>
  );
};

export default Resources;
