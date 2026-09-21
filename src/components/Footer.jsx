import { Link, useLocation } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  const year = new Date().getFullYear();
  const location = useLocation();

  return (
    <footer className="vectra-footer" id="footer">
      <div className="footer-top">
        <div className="footer-col brand-col">
          <div className="footer-logo">
            <a href="https://vectragroup.in/" target="_blank" rel="noopener noreferrer" title="Vectra Group">
              <img
                src="/vectrafooter.png"
                alt="Vectra Group"
                width="355"
                height="339"
                loading="lazy"
              />
            </a>
          </div>
          <h4 className="footer-heading">Vectra Group</h4>
          <ul className="footer-list group-list">
            <li>
              <span className="bullet">•</span>
              <a href="https://www.vectrastaffing.com/" target="_blank" rel="noopener noreferrer">
                Vectra Staffing LLC
              </a>
            </li>
            <li>
              <span className="bullet">•</span>
              <Link to="/">
                Vectra Foreign Services
              </Link>
            </li>
            <li>
              <span className="bullet">•</span>
              <a href="https://vectrainformatics.com/" target="_blank" rel="noopener noreferrer">
                Vectra Informatics
              </a>
            </li>
            <li>
              <span className="bullet">•</span>
              <a href="https://www.vectrastaffing.com/" target="_blank" rel="noopener noreferrer">
                Vectra Staffing Canada.
              </a>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-heading">EXPLORE VECTRA</h4>
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
              <a
                href="/ielts-mock-test.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                Free IELTS Mock Test
              </a>
            </li>
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
            <a href="tel:+918401172400">+91 8401172400</a>
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
                  href="https://www.google.com/maps/place/Vectra+Foreign+Services/@23.1040068,72.5312766,868m/data=!3m2!1e3!4b1!4m6!3m5!1s0x395e8353e85779ef:0x5f8842681a02f3c5!8m2!3d23.1040019!4d72.5338515!16s%2Fg%2F11zxcpmf25?entry=ttu&g_ep=EgoyMDI2MDkxNi4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  SF - 202, Olive Greens, above Shambhu's Coffee, Gota, Ahmedabad, Gujarat 382481
                </a>
              </p>
            </div>
          </div>

          <div className="footer-social-wrapper">
            <h5 className="footer-social-title">Follow Us</h5>
            <div className="footer-social-icons">
              <a
                href="https://www.facebook.com/share/1aqXaxdXT6/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                aria-label="Facebook"
              >
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="12" fill="#1877F2"/>
                  <path d="M15.12 12.67l.38-2.5h-2.4v-1.62c0-.68.33-1.35 1.41-1.35h1.09V5.07s-.99-.17-1.94-.17c-1.98 0-3.27 1.2-3.27 3.37v1.9H8.16v2.5h2.23V19h2.73v-6.33h2z" fill="#ffffff"/>
                </svg>
              </a>

              <a
                href="https://www.instagram.com/vectra_foreignservices_vfs?igsh=MWZwc3lkNTVpYm4xeQ=="
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                aria-label="Instagram"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <defs>
                    <linearGradient
                      id="footer-ig-grad"
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
                  <rect width="24" height="24" rx="6" fill="url(#footer-ig-grad)" />
                  <rect x="5.5" y="5.5" width="13" height="13" rx="3.5" stroke="#ffffff" strokeWidth="1.6" />
                  <circle cx="12" cy="12" r="3.2" stroke="#ffffff" strokeWidth="1.6" />
                  <circle cx="15.8" cy="8.2" r="0.9" fill="#ffffff" />
                </svg>
              </a>

              <a
                href="https://www.linkedin.com/company/vectra-foreign-services/"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                aria-label="LinkedIn"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect width="24" height="24" rx="5" fill="#0A66C2"/>
                  <circle cx="7" cy="6.75" r="1.35" fill="#ffffff"/>
                  <rect x="5.65" y="9.5" width="2.7" height="9" rx="0.5" fill="#ffffff"/>
                  <path d="M10.5 9.5h2.6v1.25c.5-.8 1.5-1.45 2.85-1.45 2.15 0 3.3 1.3 3.3 3.65v6.05h-2.7v-5.2c0-1.1-.45-1.75-1.4-1.75-.95 0-1.45.65-1.45 1.6v5.35h-2.7V9.5z" fill="#ffffff"/>
                </svg>
              </a>

              <a
                href="https://x.com/vectraoverseas"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                aria-label="X (Twitter)"
              >
                <svg width="24" height="24" viewBox="0 0 24 24">
                  <rect width="24" height="24" rx="5" fill="#000000" stroke="#334155" strokeWidth="1"/>
                  <path d="M16.5 6.5h2.1l-4.6 5.3 5.4 7.2h-4.2l-3.3-4.3-3.8 4.3H6l4.9-5.6L5.7 6.5h4.3l3 4 3.5-4z" fill="#ffffff"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p className="copyright">© {year} Vectra Foreign Services. All rights reserved.</p>
          <ul className="legal-links">
            <li>
              <Link
                to="/terms-of-service"
                state={{
                  from: location.pathname,
                  fromHash: "#footer",
                  scrollY: typeof window !== "undefined" ? window.scrollY : 0
                }}
              >
                Terms of Service
              </Link>
            </li>
            <li>
              <Link
                to="/cookie-policy"
                state={{
                  from: location.pathname,
                  fromHash: "#footer",
                  scrollY: typeof window !== "undefined" ? window.scrollY : 0
                }}
              >
                Cookie Policy
              </Link>
            </li>
            <li>
              <Link
                to="/compliance"
                state={{
                  from: location.pathname,
                  fromHash: "#footer",
                  scrollY: typeof window !== "undefined" ? window.scrollY : 0
                }}
              >
                Compliance
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
