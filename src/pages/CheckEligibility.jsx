import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "../components/Navbar.jsx";
import Seo from "../components/Seo.jsx";
import "./CheckEligibility.css";

const steps = [
  { id: 1, name: "Basic Information", icon: "👤" },
  { id: 2, name: "Education", icon: "🎓" },
  { id: 3, name: "Work Experience", icon: "💼" },
  { id: 4, name: "Language Skills", icon: "💬" },
  { id: 5, name: "Your Goal", icon: "🎯" },
];

const educationOptions = [
  "High School",
  "Diploma / Certificate",
  "Bachelor's Degree",
  "Master's / Postgraduate",
  "PhD / Doctorate",
];

const experienceOptions = ["Less than 1 year", "1 - 2 years", "3 - 4 years", "5+ years"];

const languageOptions = [
  "Basic (A1 / A2)",
  "Intermediate (B1 / B2)",
  "Advanced (C1)",
  "Fluent / Native (C2)",
];

const goalOptions = [
  "Study Abroad",
  "Work Abroad",
  "Permanent Residency (PR)",
  "Visit / Tourist",
  "Family Sponsorship",
];

const educationPoints = {
  "High School": 1,
  "Diploma / Certificate": 2,
  "Bachelor's Degree": 3,
  "Master's / Postgraduate": 4,
  "PhD / Doctorate": 5,
};

const experiencePoints = {
  "Less than 1 year": 1,
  "1 - 2 years": 2,
  "3 - 4 years": 3,
  "5+ years": 4,
};

const languagePoints = {
  "Basic (A1 / A2)": 1,
  "Intermediate (B1 / B2)": 2,
  "Advanced (C1)": 3,
  "Fluent / Native (C2)": 4,
};

const CheckEligibility = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    education: "",
    experience: "",
    language: "",
    goal: "",
    website: "", // honeypot — bots fill this, humans never see it
  });
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState({ score: 0, level: "", color: "" });

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    const score =
      (educationPoints[formData.education] || 0) +
      (experiencePoints[formData.experience] || 0) +
      (languagePoints[formData.language] || 0);

    let level = "";
    let color = "";
    if (score <= 6) {
      level = "Fair";
      color = "#f59e0b";
    } else if (score <= 9) {
      level = "Good";
      color = "#3b82f6";
    } else {
      level = "Excellent";
      color = "#10b981";
    }

    try {
      const response = await fetch("/send_mail.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "Check Eligibility Form",
          ...formData,
          calculatedScore: score,
          eligibilityLevel: level,
        }),
      });

      if (response.ok) {
        setResult({ score, level, color });
        setSubmitted(true);
      } else {
        const error = await response.json().catch(() => null);
        alert(error?.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Network error. Please check your connection and try again.");
    }
  };

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return (
          formData.fullName.trim() !== "" &&
          /^\S+@\S+\.\S+$/.test(formData.email) &&
          formData.phone.trim().length >= 6
        );
      case 2:
        return formData.education !== "";
      case 3:
        return formData.experience !== "";
      case 4:
        return formData.language !== "";
      case 5:
        return formData.goal !== "";
      default:
        return true;
    }
  };

  const renderOptions = (options, field) => (
    <div className="options-grid">
      {options.map((option, index) => (
        <motion.div
          key={option}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          role="button"
          tabIndex={0}
          className={`option-card ${formData[field] === option ? "selected" : ""}`}
          onClick={() => updateField(field, option)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              updateField(field, option);
            }
          }}
        >
          <span>{option}</span>
          <div className="check-circle">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const stepPrompts = {
    1: "Tell us a bit about yourself",
    2: "What is your highest level of education?",
    3: "How many years of skilled work experience do you have?",
    4: "How would you rate your English proficiency?",
    5: "What is your primary immigration goal?",
  };

  return (
    <div className="eligibility-page-wrapper">
      <Seo
        title="Check Your Visa Eligibility | Vectra Foreign Services"
        description="Answer five short questions about your education, work experience and English level to get an initial eligibility rating from Vectra Foreign Services."
        path="/check-eligibility"
      />
      <Navbar />

      <div className="eligibility-container">
        {submitted ? (
          <motion.div
            className="form-glass-card success-state"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="success-icon" style={{ backgroundColor: result.color }}>
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2>Assessment Received!</h2>
            <div
              className="score-display"
              style={{
                margin: "25px 0",
                padding: "20px",
                borderRadius: "12px",
                background: "rgba(255,255,255,0.8)",
                border: `1px solid ${result.color}40`,
                boxShadow: `0 4px 15px ${result.color}15`,
              }}
            >
              <h3
                style={{
                  margin: "0 0 10px 0",
                  fontSize: "1.1rem",
                  color: "#050a14",
                  fontWeight: "600",
                }}
              >
                Your Initial Eligibility Score
              </h3>
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <span style={{ fontSize: "2.5rem", fontWeight: "800", color: result.color }}>
                  {result.level}
                </span>
              </div>
              <p style={{ margin: "10px 0 0 0", fontSize: "0.9rem", color: "#6b6375" }}>
                Based on your education, experience, and language skills.
              </p>
            </div>
            <p>
              Thank you, <strong>{formData.fullName}</strong>. We have received your details. One of
              our expert immigration consultants will review your profile ({formData.goal}) and
              reach out to you at <strong>{formData.email}</strong> within 24 hours.
            </p>
            <Link to="/" className="btn-home">
              Return to Homepage
            </Link>
          </motion.div>
        ) : (
          <>
            <div className="eligibility-header">
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                Check Your Eligibility
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                Let us know a bit about your background and goals, and our experts will tailor the
                perfect immigration pathway for you.
              </motion.p>
            </div>

            <div className="progress-section">
              <div className="progress-header">
                <span>Step {currentStep} of 5</span>
                <span>{currentStep * 20}%</span>
              </div>
              <div className="progress-bar-bg">
                <div className="progress-bar-fill" style={{ width: `${currentStep * 20}%` }} />
              </div>
              <div className="step-indicators">
                {steps.map((step) => (
                  <div
                    key={step.id}
                    className={`step-badge ${currentStep === step.id ? "active" : ""} ${
                      currentStep > step.id ? "completed" : ""
                    }`}
                  >
                    {step.name}
                  </div>
                ))}
              </div>
            </div>

            <div className="form-glass-card">
              <div className="step-header">
                <div className="step-icon">
                  <span style={{ fontSize: "1.5rem" }}>{steps[currentStep - 1].icon}</span>
                </div>
                <div className="step-title">
                  <h2>{steps[currentStep - 1].name}</h2>
                  <p>{stepPrompts[currentStep]}</p>
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {currentStep === 1 && (
                    <div className="basic-info-form">
                      <div
                        style={{
                          position: "absolute",
                          left: "-9999px",
                          opacity: 0,
                          height: 0,
                          overflow: "hidden",
                        }}
                        aria-hidden="true"
                      >
                        <label>Website</label>
                        <input
                          type="text"
                          tabIndex={-1}
                          autoComplete="off"
                          value={formData.website}
                          onChange={(e) => updateField("website", e.target.value)}
                        />
                      </div>

                      <div className="form-group">
                        <label>Full Name *</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="e.g. John Doe"
                          value={formData.fullName}
                          onChange={(e) => updateField("fullName", e.target.value)}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label>Email Address *</label>
                        <input
                          type="email"
                          className="form-control"
                          placeholder="e.g. john@example.com"
                          value={formData.email}
                          onChange={(e) => updateField("email", e.target.value)}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label>Phone Number *</label>
                        <input
                          type="tel"
                          className="form-control"
                          placeholder="e.g. +1 234 567 890"
                          value={formData.phone}
                          onChange={(e) => updateField("phone", e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  )}

                  {currentStep === 2 && renderOptions(educationOptions, "education")}
                  {currentStep === 3 && renderOptions(experienceOptions, "experience")}
                  {currentStep === 4 && renderOptions(languageOptions, "language")}
                  {currentStep === 5 && renderOptions(goalOptions, "goal")}
                </motion.div>
              </AnimatePresence>

              <div className="form-actions">
                <button
                  className="btn-back"
                  onClick={handleBack}
                  style={{ visibility: currentStep === 1 ? "hidden" : "visible" }}
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="19" y1="12" x2="5" y2="12" />
                    <polyline points="12 19 5 12 12 5" />
                  </svg>
                  Back
                </button>

                <button className="btn-next" onClick={handleNext} disabled={!isStepValid()}>
                  {currentStep === 5 ? "Submit" : "Next"}
                  {currentStep !== 5 && (
                    <svg
                      width="18"
                      height="18"
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
                  )}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CheckEligibility;
