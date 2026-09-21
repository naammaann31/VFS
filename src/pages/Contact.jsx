import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "../components/Navbar.jsx";
import Seo from "../components/Seo.jsx";
import { countryData } from "../data/countryData.js";
import "./Contact.css";

const faqs = [
  {
    question: "Which countries do you serve?",
    answer:
      "We support applicants for the USA, UK, Canada, Australia, New Zealand, UAE, Europe, and other destinations based on applicant profile and visa purpose.",
  },
  {
    question: "Do you help with SOP writing?",
    answer:
      "Yes. We help prepare SOPs, study plans, cover letters, explanation letters, and travel-purpose letters based on the applicant's background and visa category.",
  },
  {
    question: "Do you provide language coaching?",
    answer:
      "Yes. We provide preparation guidance for IELTS, TOEFL, PTE, German language, and French language.",
  },
  {
    question: "Can you help if my visa was refused earlier?",
    answer:
      "Yes. We can review the refusal reason, application history, documents, and profile to identify possible weaknesses and help prepare a stronger file where appropriate.",
  },
  {
    question: "Do you help with PR or Green Card?",
    answer:
      "Yes. We provide profile-based consultation for PR, Green Card, skilled migration, settlement, and long-term immigration pathways depending on the destination country.",
  },
  {
    question: "Do you help with family sponsorship?",
    answer:
      "Yes. We support spouse visas, dependent visas, family sponsorship, family reunion, and relationship-documentation review.",
  },
  {
    question: "Do you submit applications on behalf of applicants?",
    answer:
      "This depends on the destination country, visa category, and applicable rules. Our team provides guidance, documentation support, review, and preparation assistance based on the permitted scope of service.",
  },
  {
    question: "Do you help students choose universities?",
    answer:
      "Yes. We help students understand suitable country, course, university, and program options based on academic background, budget, career goals, and visa readiness.",
  },
  {
    question: "Do you help with interview preparation?",
    answer:
      "Yes. We provide mock interview preparation and help applicants structure answers clearly, honestly, and confidently.",
  },
  {
    question: "Do you help with financial document review?",
    answer:
      "Yes. We review financial documents to identify missing records, unclear sources, inconsistencies, and areas that may need better explanation.",
  },
];

const visaTypes = [
  "Student Visa",
  "Work Visa",
  "Permanent Residency (PR)",
  "Tourist Visa",
  "Family Visa",
  "Spouse Visa",
];

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    visaType: "",
    message: "",
    website: "", // honeypot — bots fill this, humans never see it
  });
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [activeFaq, setActiveFaq] = useState(0);
  const navigate = useNavigate();

  const countryOptions = Object.entries(countryData).map(([key, value]) => ({
    key,
    title: value.title,
  }));

  const handleChange = (e) => {
    let { name, value, type, checked } = e.target;

    if (name === "fullName") {
      // Allow only letters, spaces, hyphens, and apostrophes
      value = value.replace(/[^a-zA-Z\s'-]/g, "");
    } else if (name === "phone") {
      // Allow only numbers and restrict to 12 digits max
      value = value.replace(/\D/g, "").slice(0, 12);
    }

    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // 1. Full Name Validation: Mandatory, only characters, at least 2 chars
    const cleanName = formData.fullName.trim();
    if (!cleanName) {
      return setError("Please enter your full name (letters only).");
    }
    if (!/^[a-zA-Z\s'-]{2,}$/.test(cleanName)) {
      return setError("Full name must contain only letters (at least 2 characters).");
    }

    // 2. Email Address Validation: Mandatory & standard email format
    const cleanEmail = formData.email.trim();
    if (!cleanEmail) {
      return setError("Please enter your email address.");
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(cleanEmail)) {
      return setError("Please enter a valid email address (e.g. name@example.com).");
    }

    // 3. Phone Number Validation: Mandatory, 10 to 12 digits only
    const cleanPhone = formData.phone.trim();
    if (!cleanPhone) {
      return setError("Please enter your phone number.");
    }
    if (!/^\d{10,12}$/.test(cleanPhone)) {
      return setError("Phone number must contain only numbers and be between 10 and 12 digits.");
    }

    // 4. Country of Interest: Mandatory
    if (!formData.country) {
      return setError("Please select your country of interest.");
    }

    // 5. Visa Type: Mandatory
    if (!formData.visaType) {
      return setError("Please select a visa type.");
    }

    // 6. Message: Mandatory
    if (!formData.message.trim()) {
      return setError("Please enter your message describing your goals.");
    }

    setSubmitting(true);
    try {
      const response = await fetch("/send_mail.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ formType: "Contact Form", ...formData }),
      });

      if (response.ok) {
        navigate("/thank-you");
      } else {
        const payload = await response.json().catch(() => null);
        setError(payload?.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error("Error sending email:", err);
      setError("Network error. Please check your connection and try again.");
    }
    setSubmitting(false);
  };

  return (
    <div className="contact-page">
      <Seo
        title="Contact Vectra Foreign Services | Visa & Immigration Consultants"
        description="Book a free consultation with Vectra Foreign Services in Ahmedabad. Call +91 8401172400 or email info@vectraforeignservices.com. Mon-Sat, 10 AM-6 PM."
        path="/contact"
      />
      <Navbar />

      <section className="contact-section">
        <motion.div
          className="contact-page-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="contact-tagline">CONTACT US</p>
          <h1 className="contact-heading">Begin Your Global Immigration Journey</h1>
          <p className="contact-description">
            Book a free consultation and get profile-based guidance for your study, work, visitor,
            family, PR, Green Card, or settlement plans.
          </p>
        </motion.div>

        <div className="contact-container">
          <div className="contact-left-column">
            <motion.div
              className="contact-info"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="contact-card-title">Get In Touch</h2>

              <div className="contact-info-list">
                <motion.div
                  className="contact-info-item"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1, ease: "easeOut" }}
                >
                  <div className="contact-info-icon">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div className="contact-info-text-group">
                    <h4 className="contact-info-title">Email Us</h4>
                    <p className="contact-info-detail">info@vectraforeignservices.com</p>
                  </div>
                </motion.div>

                <motion.div
                  className="contact-info-item"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.1, ease: "easeOut" }}
                >
                  <div className="contact-info-icon">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                    </svg>
                  </div>
                  <div className="contact-info-text-group">
                    <h4 className="contact-info-title">Call Us</h4>
                    <p className="contact-info-detail">+91 8401172400</p>
                  </div>
                </motion.div>

                <motion.div
                  className="contact-info-item"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.2, ease: "easeOut" }}
                >
                  <div className="contact-info-icon">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <div className="contact-info-text-group">
                    <h4 className="contact-info-title">Working Hours</h4>
                    <p className="contact-info-detail">Mon - Sat, 10:00 AM - 6:00 PM</p>
                  </div>
                </motion.div>

                <motion.div
                  className="contact-info-item"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.3, ease: "easeOut" }}
                >
                  <div className="contact-info-icon">
                    <svg
                      width="20"
                      height="20"
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
                  </div>
                  <div className="contact-info-text-group">
                    <h4 className="contact-info-title">India - Ahmedabad</h4>
                    <p className="contact-info-detail">
                      <a
                        href="https://www.google.com/maps/place/Vectra+Staffing+Pvt+Ltd/@23.1039949,72.5289416,16.93z/data=!4m10!1m2!2m1!1svectra+staffing+ahmedabad!3m6!1s0x395e830bcc3b1ec5:0x8a3f8f07b4c1f530!8m2!3d23.1039929!4d72.5338474!15sChl2ZWN0cmEgc3RhZmZpbmcgYWhtZWRhYmFkkgEVZW1wbG95bWVudF9jb25zdWx0YW504AEA!16s%2Fg%2F11npsvsbyt?authuser=0&entry=ttu&g_ep=EgoyMDI2MDYxMC4wIKXMDSoASAFQAw%3D%3D"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "inherit", textDecoration: "none" }}
                        onMouseEnter={(e) => (e.target.style.textDecoration = "underline")}
                        onMouseLeave={(e) => (e.target.style.textDecoration = "none")}
                      >
                        SF-202 Olive Greens, Ahmedabad 382481
                      </a>
                    </p>
                  </div>
                </motion.div>
              </div>

              <motion.div
                className="contact-social-section"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.3, ease: "easeOut" }}
              >
                <h4 className="contact-social-title">Follow Us</h4>
                <div className="contact-social-icons">
                  <a
                    href="https://www.facebook.com/share/1aqXaxdXT6/?mibextid=wwXIfr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-social-btn"
                    aria-label="Facebook"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#1877F2">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </a>

                  <a
                    href="https://www.instagram.com/vectra_foreignservices_vfs?igsh=MWZwc3lkNTVpYm4xeQ=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-social-btn"
                    aria-label="Instagram"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <defs>
                        <linearGradient
                          id="ig-grad"
                          x1="2"
                          y1="2"
                          x2="22"
                          y2="22"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop offset="0%" stopColor="#f09433" />
                          <stop offset="25%" stopColor="#e6683c" />
                          <stop offset="50%" stopColor="#dc2743" />
                          <stop offset="75%" stopColor="#cc2366" />
                          <stop offset="100%" stopColor="#bc1888" />
                        </linearGradient>
                      </defs>
                      <path
                        fill="url(#ig-grad)"
                        d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
                      />
                    </svg>
                  </a>

                  <a
                    href="https://www.linkedin.com/company/vectra-foreign-services/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-social-btn"
                    aria-label="LinkedIn"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#0A66C2">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>

                  <a
                    href="https://x.com/vectraoverseas"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-social-btn"
                    aria-label="X (Twitter)"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="#000000">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            className="contact-form-wrapper"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-honeypot" aria-hidden="true">
                <label htmlFor="contact-website">Website</label>
                <input
                  type="text"
                  id="contact-website"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <h2 className="contact-form-title">Send Us an Inquiry</h2>
              <p className="contact-form-subtitle">
                Fill out the form below and our team will get back to you within 1–2 business days.
              </p>

              <div className="form-group">
                <label htmlFor="contact-fullName" className="form-label">
                  Full Name <span style={{ color: "#E11D48" }}>*</span>
                </label>
                <input
                  type="text"
                  id="contact-fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name (letters only)"
                  className="form-input"
                  autoComplete="name"
                  pattern="[A-Za-z\s'-]+"
                  title="Only letters and spaces allowed"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="contact-email" className="form-label">
                    Email Address <span style={{ color: "#E11D48" }}>*</span>
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    className="form-input"
                    autoComplete="email"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="contact-phone" className="form-label">
                    Phone Number <span style={{ color: "#E11D48" }}>*</span>
                  </label>
                  <input
                    type="tel"
                    id="contact-phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter 10–12 digit number"
                    className="form-input"
                    autoComplete="tel"
                    inputMode="numeric"
                    pattern="[0-9]{10,12}"
                    minLength={10}
                    maxLength={12}
                    title="10 to 12 digit phone number"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="contact-country" className="form-label">
                    Country of Interest <span style={{ color: "#E11D48" }}>*</span>
                  </label>
                  <select
                    id="contact-country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="form-select"
                    required
                  >
                    <option value="">Select a country</option>
                    {countryOptions.map((country) => (
                      <option key={country.key} value={country.key}>
                        {country.title}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="contact-visaType" className="form-label">
                    Visa Type <span style={{ color: "#E11D48" }}>*</span>
                  </label>
                  <select
                    id="contact-visaType"
                    name="visaType"
                    value={formData.visaType}
                    onChange={handleChange}
                    className="form-select"
                    required
                  >
                    <option value="">Select visa type</option>
                    {visaTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="contact-message" className="form-label">
                  Message <span style={{ color: "#E11D48" }}>*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your immigration goals..."
                  className="form-textarea"
                  rows="4"
                  maxLength={1000}
                  required
                />
              </div>

              <AnimatePresence>
                {error && (
                  <motion.div
                    className="contact-form-error"
                    initial={{ opacity: 0, y: -10, height: 0 }}
                    animate={{ opacity: 1, y: 0, height: "auto" }}
                    exit={{ opacity: 0, y: -10, height: 0 }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <span>{error}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <button type="submit" className="contact-submit-btn" disabled={submitting}>
                {submitting ? (
                  <div className="btn-spinner" />
                ) : (
                  <>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{ marginRight: "10px", transform: "rotate(45deg)" }}
                    >
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                    SEND MESSAGE
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      <section className="faq-section">
        <div className="faq-container">
          <motion.div
            className="faq-header"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="faq-tagline">FAQs</p>
            <h2 className="faq-heading">Frequently Asked Questions</h2>
            <p className="faq-subtitle">
              Everything you need to know before starting your immigration journey with Vectra
              Foreign Services.
            </p>
          </motion.div>

          <div className="faq-split">
            <div className="faq-questions-list">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  role="button"
                  tabIndex={0}
                  className={`faq-list-item ${activeFaq === index ? "active" : ""}`}
                  onClick={() => setActiveFaq(index)}
                  onMouseEnter={() => setActiveFaq(index)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveFaq(index);
                    }
                  }}
                >
                  <span className="faq-list-number">{"0" + (index + 1)}</span>
                  <span className="faq-list-text">{faq.question}</span>
                  {activeFaq === index && (
                    <motion.div
                      layoutId="faqIndicator"
                      className="faq-list-indicator"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <AnimatePresence>
                    {activeFaq === index && (
                      <motion.div
                        className="faq-mobile-answer"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p>{faq.answer}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            <div className="faq-answer-display">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFaq}
                  className="faq-answer-card"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <div className="faq-answer-icon">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                      <line x1="12" y1="17" x2="12.01" y2="17" />
                    </svg>
                  </div>
                  <h3 className="faq-answer-question">{faqs[activeFaq].question}</h3>
                  <p className="faq-answer-text">{faqs[activeFaq].answer}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
