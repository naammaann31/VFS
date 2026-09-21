import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar.jsx";
import Seo from "../components/Seo.jsx";
import ServiceCTA from "../components/ServiceCTA.jsx";
import "./Services.css";

const processSteps = [
  {
    id: 1,
    title: "Consultation",
    subtitle: "INITIAL ANALYSIS",
    description:
      "Our process begins with an in-depth evaluation of your academic credentials, professional trajectory, and global ambitions. In this initial discovery phase, we proactively identify any potential complexities and curate a bespoke visa strategy perfectly aligned with your unique circumstances.",
  },
  {
    id: 2,
    title: "Strategy",
    subtitle: "CUSTOM ROADMAP",
    description:
      "Upon determining the optimal pathway, our immigration specialists engineer a meticulously structured roadmap. We establish precise timelines, detail financial prerequisites, and provide an exhaustive documentation checklist designed to optimize your application's probability of success.",
  },
  {
    id: 3,
    title: "Execution",
    subtitle: "PAPERWORK & SUBMISSION",
    description:
      "Our dedicated team seamlessly manages the intricate paperwork on your behalf. Every document undergoes a rigorous, multi-tiered review to ensure absolute consistency and mitigate any risk factors, culminating in a flawless submission to the relevant immigration authorities.",
  },
  {
    id: 4,
    title: "Approval",
    subtitle: "VISA GRANT & NEXT STEPS",
    description:
      "While your application is under review, we proactively prepare you for potential interviews or medical evaluations. Upon the successful grant of your visa, we celebrate your milestone and equip you with comprehensive guidance for a smooth relocation and successful settlement.",
  },
];

const HowWeWork = () => {
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();
  const step = processSteps[activeStep];

  return (
    <section className="hww-section">
      <div className="hww-container">
        <motion.div
          className="hww-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="hww-title">How We Work</h2>
        </motion.div>

        <motion.div
          className="hww-timeline-wrapper"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="hww-connecting-line"></div>
          <div className="hww-nodes-container">
            {processSteps.map((item, index) => (
              <div
                key={item.id}
                role="button"
                tabIndex={0}
                className={`hww-node-item ${index === activeStep ? "active" : ""}`}
                onClick={() => setActiveStep(index)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveStep(index);
                  }
                }}
              >
                <div className="hww-circle">{String(item.id).padStart(2, "0")}</div>
                <div className="hww-node-text">
                  <div className="hww-node-title">{item.title}</div>
                  <div className="hww-node-subtitle">{item.subtitle}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="hww-content-card"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <div className="hww-card-inner">
            <div className="hww-card-header">
              <span className="hww-step-badge">Step {String(step.id).padStart(2, "0")}</span>
              <h3 className="hww-card-title">{step.title}</h3>
            </div>
            <p className="hww-card-desc">{step.description}</p>
            <button className="hww-card-btn" onClick={() => navigate("/contact")}>
              <span>Start this step</span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ServiceIcon = ({ name }) => {
  switch (name) {
    case "study":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
        </svg>
      );
    case "tourist":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.2-1.1.6L2.5 9l5.4 3.1L5 15H2l-1 1 3.5 1.5L6 21l1-1v-3l2.9-2.9 3.1 5.4l2.2-1.2c.4-.2.7-.6.6-1.1z" />
        </svg>
      );
    case "pr":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="4" y="10" width="16" height="10" rx="2" ry="2" />
          <path d="M12 10V2" />
          <path d="M8 2h8" />
          <path d="M12 14v2" />
          <path d="M12 22v-2" />
          <path d="M20 10v4" />
          <path d="M4 10v4" />
        </svg>
      );
    case "family":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "review":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <path d="m9 15 2 2 4-4" />
        </svg>
      );
    default:
      return null;
  }
};

const services = [
  {
    id: 1,
    title: "Study Visa",
    icon: "study",
    description:
      "University selection, admissions guidance, financial documentation, and interview preparation.",
    features: [
      "University & Program Selection",
      "Admission Offer Letter Support",
      "Financial Proof Guidance",
    ],
  },
  {
    id: 2,
    title: "Tourist Visa",
    icon: "tourist",
    description:
      "Tourist, family visit, and short-stay visa support with itinerary and proof-of-funds planning.",
    features: [
      "Customized Travel Itineraries",
      "Proof of Funds Verification",
      "Visa Interview Coaching",
    ],
  },
  {
    id: 3,
    title: "Permanent Residency",
    icon: "pr",
    description:
      "Eligibility assessment, profile strategy, expression of interest, and settlement documentation.",
    features: [
      "Comprehensive Eligibility Check",
      "Expression of Interest Filing",
      "Settlement Documentation",
    ],
  },
  {
    id: 4,
    title: "Family Sponsorship",
    icon: "family",
    description:
      "Reunite with your loved ones through our expert family and spousal sponsorship programs.",
    features: ["Spouse & Dependent Filing", "Relationship Proof Strategy", "Sponsorship Assessment"],
  },
  {
    id: 5,
    title: "Application Review",
    icon: "review",
    description:
      "Comprehensive audit and refinement of your DIY visa application to maximize approval chances.",
    features: [
      "Detailed Application Audit",
      "Error Checking & Refinement",
      "Approval Probability Optimization",
    ],
  },
];

const Services = () => (
  <div className="services-page-wrapper">
    <Seo
      title="Visa & Immigration Services in Ahmedabad | Vectra Foreign Services"
      description="Study visa, tourist visa, permanent residency, family sponsorship and application review support, from first consultation to visa approval."
      path="/services"
    />
    <Navbar />

    <section className="services-hero-section">
      <div className="services-hero-container">
        <div className="services-header">
          <motion.h1
            className="services-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          >
            Expert Guidance, Every Step of the Way
          </motion.h1>
          <motion.p
            className="services-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          >
            Whether you are a student aspiring to study at a top global university, a skilled
            professional seeking international career growth, or a family looking to reunite, we
            offer end-to-end services to make your transition seamless.
          </motion.p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              className="service-card-wrapper"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{
                duration: 0.6,
                // First row waits for the hero copy; later rows animate on scroll
                delay: index < 3 ? 1 + index * 0.15 : 0.1 + (index - 3) * 0.15,
                ease: "easeOut",
              }}
            >
              <div className="service-card">
                <div className="service-icon-wrapper">
                  <ServiceIcon name={service.icon} />
                </div>
                <h3 className="service-card-title">{service.title}</h3>
                <p className="service-card-description">{service.description}</p>
                <ul className="service-features-list">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex}>
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="check-icon"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className="book-service-btn"
                  style={{
                    textDecoration: "none",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  Book this service
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <HowWeWork />
    <ServiceCTA />
  </div>
);

export default Services;
