import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar.jsx";
import "./ThankYou.css";

const ThankYou = () => (
  <div className="thank-you-page">
    <Navbar />
    <div className="thank-you-container">
      <motion.div
        className="thank-you-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="success-icon-wrapper">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="success-icon"
          >
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
        </div>
        <h1 className="thank-you-heading">Thank You!</h1>
        <p className="thank-you-description">
          Your request has been successfully submitted. Our immigration experts will review your
          profile and get back to you shortly at the email address provided.
        </p>
        <Link to="/" className="btn-primary thank-you-btn">
          Return to Home
        </Link>
      </motion.div>
    </div>
  </div>
);

export default ThankYou;
