import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "../components/Navbar.jsx";
import Seo from "../components/Seo.jsx";
import ServiceCTA from "../components/ServiceCTA.jsx";
import "./About.css";

const MissionIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const VisionIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const CheckIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="focus-icon"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const BriefcaseIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const GlobeIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const CodeIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const PinIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const values = [
  {
    image: "/clarity.jpeg",
    title: "Clarity",
    desc: "We demystify global mobility. By breaking down complex immigration laws and requirements into clear, actionable steps, we ensure our clients fully understand their pathways. We replace confusion with absolute certainty.",
  },
  {
    image: "/Responsibilities .jpeg",
    title: "Responsibility",
    desc: "We take shaping your international future seriously. We provide honest assessments and grounded expectations. Our focus on thorough preparation and ethical practices maximizes your chances of success.",
  },
  {
    image: "/transparancy .jpeg",
    title: "Transparency",
    desc: "Honesty is embedded in every stage. We provide upfront, transparent communication regarding potential costs, timelines, and possible risk areas. You will never encounter hidden fees or surprises.",
  },
  {
    image: "/professionalism.jpeg",
    title: "Professionalism",
    desc: "Backed by Vectra Group's corporate discipline, we bring a rigorous, business-focused approach. Our experts handle your case with meticulous attention to detail and unwavering commitment to quality service.",
  },
  {
    image: "/trust.jpeg",
    title: "Trust",
    desc: "Your global aspirations and personal data are safe with us. We handle all sensitive information with the highest level of confidentiality. Building long-term trust is paramount—we act as your dedicated partners.",
  },
];

const focusPoints = [
  "Your background",
  "Your destination goal",
  "Your purpose of travel",
  "Your documents",
  "Your financial readiness",
  "Your language preparation",
  "Your long-term plan",
  "Your possible risk areas",
];

const About = () => {
  const [activeTab, setActiveTab] = useState("mission");

  const groupCompanies = [
    {
      name: "Vectra Staffing LLC",
      url: "https://www.vectrastaffing.com/",
      desc: "Global IT & Recruitment Solutions",
      icon: <BriefcaseIcon />,
    },
    {
      name: "Vectra Foreign Services",
      url: "/",
      desc: "Immigration & Visa Consulting",
      icon: <GlobeIcon />,
    },
    {
      name: "Vectra Informatics",
      url: "https://vectrainformatics.com/",
      desc: "Technology & Software Development",
      icon: <CodeIcon />,
    },
    {
      name: "Vectra Staffing Canada",
      url: "https://www.vectrastaffing.com/",
      desc: "Canadian Workforce & Staffing Solutions",
      icon: <PinIcon />,
    },
  ];

  return (
    <div className="about-page-wrapper">
      <Seo
        title="About Vectra Foreign Services | Immigration & Visa Consultants"
        description="Vectra Foreign Services, a member of the Vectra Group, helps individuals and families plan study, work, travel, sponsorship and settlement abroad."
        path="/about"
      />
      <Navbar />

      <section className="about-hero-section">
        <div className="about-hero-container">
          <motion.h1
            className="about-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          >
            About Vectra Foreign Services
          </motion.h1>
          <motion.p
            className="about-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          >
            Vectra Foreign Services is a global mobility, visa, and immigration consulting company
            helping individuals and families plan international education, employment, travel,
            sponsorship, and settlement pathways with clarity and confidence.
          </motion.p>
        </div>
      </section>

      <section className="about-section">
        <motion.div
          className="about-section-container"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1, ease: "easeOut" }}
        >
          <div className="story-card">
            <h2 className="about-section-title">Our Story</h2>
            <ul className="story-list">
              <li>
                Vectra Foreign Services was created to support people who want to move abroad but
                feel overwhelmed by confusing visa rules, documentation requirements, country
                choices, application forms, financial proof, SOPs, interviews, and changing
                immigration processes.
              </li>
              <li>
                We comprehensively help applicants understand all available options, meticulously
                prepare their documents, and approach the entire application process with better
                structure, reduced stress, and utmost confidence.
              </li>
              <li>
                As a proud member of the Vectra Group, we bring unmatched business discipline,
                rigorous process clarity, and a highly service-focused execution methodology to the
                complex field of immigration and visa consulting.
              </li>
            </ul>
          </div>
        </motion.div>
      </section>

      <section className="about-section">
        <motion.div
          className="about-section-container"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h2
            className="about-section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Part of Vectra Group
          </motion.h2>
          <motion.p
            className="about-section-text"
            style={{ textAlign: "center", maxWidth: "800px", margin: "0 auto" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            Vectra Group includes a growing network of companies focused on staffing, consulting,
            technology, immigration, and global business support. Together, the Vectra Group
            companies support individuals, professionals, students, employers, and businesses across
            staffing, global mobility, technology consulting, and international service solutions.
          </motion.p>

          <div className="group-grid">
            {groupCompanies.map((company, index) => (
              <motion.div
                key={company.name}
                className="group-card-wrapper"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              >
                <div className="group-card">
                  <div className="group-card-content">
                    <div className="group-icon">{company.icon}</div>
                    <span className="group-name">{company.name}</span>
                  </div>
                  <div className="group-card-reveal">
                    <p className="group-desc">{company.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="about-section">
        <div className="about-section-container mv-container">
          <motion.div
            className="mv-tabs"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <button
              className={`mv-tab ${activeTab === "mission" ? "active" : ""}`}
              onClick={() => setActiveTab("mission")}
            >
              Our Mission
            </button>
            <button
              className={`mv-tab ${activeTab === "vision" ? "active" : ""}`}
              onClick={() => setActiveTab("vision")}
            >
              Our Vision
            </button>
          </motion.div>

          <motion.div
            className="mv-content-wrapper"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          >
            <AnimatePresence mode="wait">
              {activeTab === "mission" && (
                <motion.div
                  key="mission"
                  className="mv-card-wrapper"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mv-card">
                    <div className="mv-icon-wrapper">
                      <MissionIcon />
                    </div>
                    <p className="about-section-text mv-text">
                      Our mission is to make international mobility simpler, clearer, and far more
                      structured for students, professionals, families, travelers, and businesses
                      alike. We achieve this by offering deeply honest consultation, meticulously
                      organized documentation support, and tailored destination-specific guidance.
                      By removing the confusion and stress from complex immigration processes, we
                      empower our clients to confidently pursue their global aspirations and
                      seamlessly transition to their new lives abroad.
                    </p>
                  </div>
                </motion.div>
              )}

              {activeTab === "vision" && (
                <motion.div
                  key="vision"
                  className="mv-card-wrapper"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="mv-card">
                    <div className="mv-icon-wrapper">
                      <VisionIcon />
                    </div>
                    <p className="about-section-text mv-text">
                      Our vision is to become the most trusted global mobility consulting brand
                      worldwide, renowned for our unwavering commitment to transparent guidance and
                      responsible documentation support. We aim to set the gold standard in the
                      immigration industry by continually providing highly practical, innovative,
                      and compliant solutions for individuals and families planning to study, work,
                      visit, or permanently settle in their dream destinations across the globe.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <section className="about-section">
        <div className="about-section-container values-container">
          <motion.h2
            className="about-section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Our Values
          </motion.h2>

          <div className="values-staggered-grid">
            {values.map((value, index) => {
              // Alternate the image between the top and bottom of each row
              const imageFirst = index % 2 === 0;
              return (
                <motion.div
                  key={value.title}
                  className={`staggered-value-card ${imageFirst ? "image-top" : "image-bottom"}`}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1, ease: "easeOut" }}
                >
                  {imageFirst ? (
                    <>
                      <div
                        className="svc-image"
                        style={{ backgroundImage: `url("${value.image}")` }}
                      />
                      <div className="svc-content">
                        <h3 className="svc-title">{value.title}</h3>
                        <p className="svc-desc">{value.desc}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="svc-content">
                        <h3 className="svc-title">{value.title}</h3>
                        <p className="svc-desc">{value.desc}</p>
                      </div>
                      <div
                        className="svc-image"
                        style={{ backgroundImage: `url("${value.image}")` }}
                      />
                    </>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="about-section" style={{ paddingBottom: "100px" }}>
        <motion.div
          className="about-section-container different-card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="about-section-title">What Makes Us Different</h2>
          <p className="different-intro">
            We do not treat applicants like files. We understand that moving abroad is a major life
            decision involving career, family, finances, education, and future planning. Our
            consultation focuses on:
          </p>
          <ul className="focus-list">
            {focusPoints.map((point, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
              >
                <CheckIcon />
                {point}
              </motion.li>
            ))}
          </ul>
          <p className="different-intro" style={{ marginTop: "40px", marginBottom: "0" }}>
            This helps us provide more practical, honest, and structured guidance.
          </p>
        </motion.div>
      </section>

      <ServiceCTA
        title="Ready to Take the Next Step?"
        subtitle="Now that you know our story and values, let our dedicated team guide you through your international journey with clarity, honesty, and unmatched professionalism."
      />
    </div>
  );
};

export default About;
