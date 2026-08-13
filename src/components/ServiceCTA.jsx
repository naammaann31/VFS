import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./ServiceCTA.css";

const ServiceCTA = ({
  title = "Ready to Begin Your Global Journey?",
  subtitle = "You've explored our specialized pathways. Now, let our experts craft a personalized immigration strategy tailored specifically to your academic, professional, or family goals.",
}) => (
  <section className="service-cta-section">
    <motion.div
      className="service-cta-container"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <h2 className="service-cta-title">{title}</h2>
      <p className="service-cta-subtitle">{subtitle}</p>
      <Link to="/contact" className="service-cta-btn" style={{ textDecoration: "none" }}>
        Book Your Consultation
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
      </Link>
    </motion.div>
  </section>
);

export default ServiceCTA;
