import { useEffect, useRef, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import { usePageTransition } from "../context/TransitionContext.jsx";
import { countryData } from "../data/countryData.js";
import "./CountryPage.css";

const FeatureIcon = ({ name }) => {
  switch (name) {
    case "education":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feature-icon"
        >
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
      );
    case "economy":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feature-icon"
        >
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      );
    case "healthcare":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feature-icon"
        >
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      );
    case "community":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feature-icon"
        >
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    default:
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="feature-icon"
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      );
  }
};

function CountryPage() {
  const { countryName } = useParams();
  const displayName = countryName ? countryName.toUpperCase() : "";
  const country = countryData[countryName ? countryName.toLowerCase() : ""] || null;
  const images = country?.images || [];

  const { isActive } = usePageTransition();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [previousSlide, setPreviousSlide] = useState(-1);
  // Hold the hero back until the globe transition has finished flying in
  const [heroReady, setHeroReady] = useState(!isActive);
  const [activePathway, setActivePathway] = useState("student");
  const [whyChooseVisible, setWhyChooseVisible] = useState(false);
  const whyChooseRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setWhyChooseVisible(true);
      },
      { threshold: 0.2 },
    );

    if (whyChooseRef.current) observer.observe(whyChooseRef.current);
    return () => {
      if (whyChooseRef.current) observer.unobserve(whyChooseRef.current);
    };
  }, []);

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => setHeroReady(true), 800);
      return () => clearTimeout(timer);
    }
    setHeroReady(true);
  }, [isActive]);

  useEffect(() => {
    if (!heroReady || images.length <= 1) return;

    // Preload the next slide so the crossfade never shows a blank frame
    const nextSlide = (currentSlide + 1) % images.length;
    const preload = new Image();
    preload.src = images[nextSlide];

    const interval = setInterval(() => {
      setPreviousSlide(currentSlide);
      setCurrentSlide(nextSlide);
    }, 2500);

    return () => clearInterval(interval);
  }, [images, currentSlide, heroReady]);

  if (!country) {
    return <Navigate to="/" replace />;
  }

  return (
    <div style={{ backgroundColor: "#0a1628", fontFamily: "Inter, sans-serif" }}>
      {images.length > 0 && (
        <div className="country-slideshow-container">
          {images.map((image, index) => {
            let className = "country-slide";
            if (index === currentSlide) {
              className += " active";
              if (!heroReady) className += " instant-show";
            } else if (index === previousSlide) {
              className += " previous";
            }

            return (
              <div className={className} key={image}>
                <img src={image} alt={`${displayName} background`} />
              </div>
            );
          })}
          <div className="country-overlay" />
        </div>
      )}

      <div className="country-page-wrapper">
        <Navbar />

        <div className="country-hero">
          {heroReady && country && (
            <>
              <div
                className="hero-glass-card landscape-card"
                style={{
                  "--flag-gradient":
                    country.flagGradient || "linear-gradient(90deg, #ffffff, #a0aec0)",
                }}
              >
                <div className="hero-title-section">
                  <h1>{country.title}</h1>
                </div>
                <div className="hero-content-section">
                  {country.content.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>

              <div className="hero-action-buttons">
                <Link to="/contact" className="hero-glass-btn">
                  Book Free Consultation
                </Link>
                <a href="tel:8401172400" className="hero-glass-btn hero-glass-btn-outline">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  8401172400
                </a>
              </div>
            </>
          )}
        </div>

        {country.whyChoose && (
          <div className="why-choose-section" ref={whyChooseRef}>
            <div className={`why-choose-container ${whyChooseVisible ? "visible" : ""}`}>
              <h2 className="why-choose-title">
                {country.whyChoose.titleStart}
                <span style={{ color: country.whyChoose.accentColor || "#ff3b00" }}>
                  {country.whyChoose.titleHighlight}
                </span>
              </h2>

              <div className="why-choose-content">
                {country.whyChoose.paragraphs.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              {country.whyChoose.cards && country.whyChoose.cards.length > 0 && (
                <div className="why-choose-grid">
                  {country.whyChoose.cards.map((card, index) => (
                    <div
                      className="feature-card"
                      key={index}
                      style={{
                        animationDelay: `${0.8 + index * 0.15}s`,
                        "--card-accent": country.whyChoose.accentColor || "#ff3b00",
                      }}
                    >
                      <div
                        className="feature-icon-wrapper"
                        style={{ color: country.whyChoose.accentColor || "#ff3b00" }}
                      >
                        <FeatureIcon name={card.icon} />
                      </div>
                      <h3>{card.title}</h3>
                      <p>{card.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {country.pathways && (
          <div className="pathways-section">
            <h2 className="pathways-main-title">
              Immigration <span>Pathways</span>
            </h2>
            <p className="pathways-subtitle">
              Whether you're starting your academic journey or advancing your expertise,
              <br />
              our institutions and pathways maintain high standards of excellence.
            </p>

            <div className="pathways-card">
              <div className="pathways-tabs">
                {Object.keys(country.pathways).map((key) => (
                  <button
                    key={key}
                    className={`pathway-tab ${activePathway === key ? "active" : ""}`}
                    onClick={() => setActivePathway(key)}
                  >
                    {country.pathways[key].title}
                  </button>
                ))}
              </div>

              <div className="pathways-content">
                <h3 className="pathway-content-title">{country.pathways[activePathway].title}</h3>
                <div className="pathways-grid">
                  <div className="pathways-column">
                    <h4 className="pathway-column-title">Requirements</h4>
                    <ul className="pathway-requirements-list">
                      {country.pathways[activePathway].requirements.map((requirement, index) => (
                        <li key={index}>
                          <strong>{requirement.label}:</strong> {requirement.text}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pathways-column">
                    <h4 className="pathway-column-title">Steps</h4>
                    <ul className="pathway-steps-list">
                      {country.pathways[activePathway].steps.map((step, index) => (
                        <li key={index}>{step}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {country.servedCountries && (
          <div className="served-countries-section">
            <h2 className="served-countries-title">
              European Destinations We <span>Serve</span>
            </h2>
            <ul className="served-countries-list">
              {country.servedCountries.map((servedCountry, index) => (
                <li className="served-country-item" key={index}>
                  <img
                    src={`https://flagcdn.com/w40/${servedCountry.code}.png`}
                    srcSet={`https://flagcdn.com/w80/${servedCountry.code}.png 2x`}
                    alt={`${servedCountry.name} flag`}
                    className="served-country-flag"
                  />
                  <span className="served-country-name">{servedCountry.name}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div
          className="country-cta-section"
          style={{
            "--country-color": country?.accentColor || "#003399",
            "--btn-text": country?.accentColor === "#FFCD00" ? "#0f172a" : "#ffffff",
          }}
        >
          <div className="country-cta-content">
            <h2>
              Ready to Begin Your Journey to <span>{displayName}</span>?
            </h2>
            <p>
              {country?.ctaText ||
                `Our immigration experts are here to provide tailored advice and guide you step-by-step through the ${displayName} visa process. Let's make your dream a reality.`}
            </p>
            <div className="country-cta-buttons">
              <Link to="/contact" className="country-cta-btn primary">
                Start Your Journey!
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CountryPage;
