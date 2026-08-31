import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { usePageTransition } from "../context/TransitionContext.jsx";
import logo from "../assets/VFS-removebg-preview.png";
import "./Navbar.css";

const LIGHT_BACKGROUND_ROUTES = [
  "/about",
  "/services",
  "/resources",
  "/contact",
  "/check-eligibility",
  "/terms-of-service",
  "/compliance",
  "/cookie-policy",
  "/admin",
  "/mock-tests/result",
  "/thank-you",
];

const countries = [
  { name: "Canada", path: "/country/canada", code: "ca" },
  { name: "USA", path: "/country/usa", code: "us" },
  { name: "Australia", path: "/country/australia", code: "au" },
  { name: "Europe", path: "/country/europe", code: "eu" },
  { name: "New Zealand", path: "/country/nz", code: "nz" },
  { name: "UAE", path: "/country/uae", code: "ae" },
  { name: "UK", path: "/country/uk", code: "gb" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const { triggerTransition } = usePageTransition();

  // Light-background pages need the solid navbar from the start, otherwise the
  // white nav text renders invisible against them.
  const isSolid =
    scrolled ||
    LIGHT_BACKGROUND_ROUTES.some((route) =>
      location.pathname.startsWith(route)
    );

  useEffect(() => {
    let ticking = false;

    // Passive + rAF-throttled: the handler fires on every scroll event, so
    // reading scrollY directly there forces layout mid-scroll.
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 50);
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen((open) => !open);

  const closeMenu = () => {
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  const handleCountryClick = (e, path, name) => {
    e.preventDefault();
    closeMenu();
    triggerTransition(path, name);
  };

  return (
    <nav className={`navbar ${isSolid ? "scrolled" : ""}`}>
      <div className="navbar-logo">
        <Link to="/" onClick={closeMenu}>
          <img src={logo} alt="Vectra Foreign Services Logo" />
        </Link>
      </div>

      <button
        className={`navbar-hamburger ${menuOpen ? "open" : ""}`}
        onClick={toggleMenu}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
      >
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </button>

      {menuOpen && <div className="navbar-overlay" onClick={closeMenu} />}

      <ul className={`navbar-links ${menuOpen ? "open" : ""}`}>
        <li>
          <Link to="/#home" className={location.pathname === "/" ? "active" : ""} onClick={closeMenu}>
            HOME
          </Link>
        </li>
        <li>
          <Link
            to="/about"
            className={location.pathname === "/about" ? "active" : ""}
            onClick={closeMenu}
          >
            ABOUT US
          </Link>
        </li>
        <li>
          <Link
            to="/services"
            className={location.pathname === "/services" ? "active" : ""}
            onClick={closeMenu}
          >
            SERVICES
          </Link>
        </li>
        <li>
          <Link
            to="/resources"
            className={location.pathname === "/resources" ? "active" : ""}
            onClick={closeMenu}
          >
            RESOURCES
          </Link>
        </li>

        <li className="navbar-dropdown-wrapper">
          <Link
            to="/#countries"
            className="countries-dropdown-toggle"
            onClick={(e) => {
              // On mobile the toggle expands the list instead of navigating
              if (window.innerWidth <= 768) {
                e.preventDefault();
                setDropdownOpen(!dropdownOpen);
              } else {
                closeMenu();
              }
            }}
          >
            COUNTRIES
            <svg
              className={`dropdown-icon ${dropdownOpen ? "open" : ""}`}
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ marginLeft: "4px", transition: "transform 0.3s ease" }}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </Link>

          <div className={`navbar-dropdown-menu ${dropdownOpen ? "show-mobile" : ""}`}>
            <ul>
              {countries.map((country) => (
                <li key={country.name}>
                  <Link
                    to={country.path}
                    className="dropdown-country-link"
                    onClick={(e) => handleCountryClick(e, country.path, country.name)}
                  >
                    <img
                      src={`https://flagcdn.com/${country.code}.svg`}
                      alt={`${country.name} flag`}
                      className="dropdown-flag"
                    />
                    <span>{country.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </li>

        <li>
          <Link
            to="/contact"
            className={location.pathname === "/contact" ? "active" : ""}
            onClick={closeMenu}
          >
            CONTACT
          </Link>
        </li>

        <li className="mobile-only-link">
          <a
            href="/ielts-mock-test.html"
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-action-btn primary"
            onClick={closeMenu}
          >
            IELTS MOCK TEST
          </a>
        </li>
        <li className="mobile-only-link">
          <Link
            to="/contact"
            className="mobile-action-btn secondary"
            onClick={closeMenu}
          >
            BOOK CONSULTATION
          </Link>
        </li>
      </ul>

      <div className="navbar-action">
        <a
          href="/ielts-mock-test.html"
          target="_blank"
          rel="noopener noreferrer"
          className="ielts-test-btn"
          onClick={closeMenu}
        >
          IELTS MOCK TEST
        </a>
        <Link to="/contact" className="lets-talk-btn" onClick={closeMenu}>
          Book Consultation
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
