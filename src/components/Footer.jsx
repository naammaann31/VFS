import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="vectra-footer">
      <div className="footer-top">
        <div className="footer-col brand-col">
          <div className="footer-logo">
            <img src="/vectrafooter.png" alt="Vectra Group" />
          </div>
          <h4 className="footer-heading">Vectra Group</h4>
          <ul className="footer-list group-list">
            <li>
              <span className="bullet">•</span> Vectra Staffing LLC
            </li>
            <li>
              <span className="bullet">•</span> Vectra Foreign Services
            </li>
            <li>
              <span className="bullet">•</span> Vectra Informatics
            </li>
            <li>
              <span className="bullet">•</span> Vectra Staffing Ca.
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">COMPANY</h4>
          <ul className="footer-list link-list">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/services">Services</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">QUICK LINKS</h4>
          <ul className="footer-list link-list">
            <li>
              <Link to="/check-eligibility">Check Eligibility</Link>
            </li>
            <li>
              <Link to="/resources">Resources &amp; Guides</Link>
            </li>
            <li>
              <Link to="/contact">Book Consultation</Link>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">SERVING</h4>
          <ul className="footer-list link-list">
            <li>
              <Link to="/country/canada">Canada</Link>
            </li>
            <li>
              <Link to="/country/australia">Australia</Link>
            </li>
            <li>
              <Link to="/country/nz">New Zealand</Link>
            </li>
            <li>
              <Link to="/country/usa">US</Link>
            </li>
            <li>
              <Link to="/country/uk">UK</Link>
            </li>
            <li>
              <Link to="/country/europe">Europe</Link>
            </li>
            <li>
              <Link to="/country/uae">UAE</Link>
            </li>
          </ul>
        </div>

        <div className="footer-col contact-offices-col">
          <h4 className="footer-heading">CONTACT &amp; OFFICES</h4>
          <div className="footer-contact-info">
            <a href="mailto:info@vectraforeignservices.com">info@vectraforeignservices.com</a>
            <a href="tel:+918401172400">+91-8401172400</a>
          </div>
          <div className="contact-divider"></div>
          <div className="offices-grid">
            <div className="office-item full-width-office">
              <h5 className="office-title">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="pin-icon"
                >
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                INDIA — AHMEDABAD
              </h5>
              <p>
                <a
                  href="https://maps.google.com/?q=SF-202+Olive+Greens,+Ahmedabad+382481"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  SF-202 Olive Greens, Ahmedabad 382481
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p className="copyright">© {year} Vectra Foreign Services. All rights reserved.</p>
          <ul className="legal-links">
            <li>
              <Link to="/terms-of-service">Terms of Service</Link>
            </li>
            <li>
              <Link to="#">Cookie Policy</Link>
            </li>
            <li>
              <Link to="#">Compliance</Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
