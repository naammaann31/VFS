import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "../components/Navbar.jsx";
import Seo from "../components/Seo.jsx";
import { usePageTransition } from "../context/TransitionContext.jsx";
import logo from "../assets/VFS-removebg-preview.png";
import bgVideo from "../assets/bg_video.mp4";
import maraLogo from "../assets/mara.webp";
import isoLogo from "../assets/iso9001.webp";
import oiscLogo from "../assets/oisc.webp";
import iaaLogo from "../assets/iaa-newzealand.webp";
import britishCouncilLogo from "../assets/british-council.jpeg";
import icefLogo from "../assets/icef.webp";
import canadaImg from "../assets/CANADA.webp";
import usaImg from "../assets/USA.webp";
import europeImg from "../assets/EUROPE.webp";
import nzImg from "../assets/NEW_ZEALAND.webp";
import uaeImg from "../assets/UAE.webp";
import australiaImg from "../assets/AUSTRALIA.webp";
import ukImg from "../assets/UK.jpeg";
import "./Home.css";

const VideoBackground = () => {
  const videoRef = useRef(null);

  // Decoding video costs main-thread and GPU time even when it's scrolled well
  // out of view, which shows up as jank further down the page.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="video-container">
      <video
        ref={videoRef}
        className="bg-video"
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        src={bgVideo}
      >
        Your browser does not support the video tag.
      </video>
      <div className="video-overlay"></div>
    </div>
  );
};

const Hero = () => (
  <div className="hero-container">
    <div className="hero-logo-wrapper">
      <Link to="/">
        <img
          src={logo}
          alt="Vectra Foreign Services"
          className="hero-logo"
          width="500"
          height="500"
        />
      </Link>
    </div>
    <div className="hero-content">
      <h1 className="hero-title">
        Your Trusted Pathway to <br />
        Study, Work, Visit, and Settle Abroad <br /> with Confidence.
      </h1>
      <p className="hero-subtitle">
        Vectra Foreign Services supports students, professionals, families, and travelers in
        achieving their international goals with expert visa guidance, documentation, application
        review, SOP assistance, language coaching, and personalized country consultation.
      </p>
      <div className="hero-actions">
        <Link to="/services" className="btn-primary" style={{ textDecoration: "none" }}>
          EXPLORE SERVICES
        </Link>
        <Link to="/check-eligibility" className="btn-secondary" style={{ textDecoration: "none" }}>
          CHECK ELIGIBILITY
        </Link>
      </div>
    </div>
  </div>
);

const certifications = [
  {
    id: 2,
    title: "MARA Certified",
    subtitle: "Migration Agents Registration Authority (Australia)",
    logo: maraLogo,
  },
  {
    id: 3,
    title: "ISO 9001:2015",
    subtitle: "Quality Management Standard",
    logo: isoLogo,
  },
  {
    id: 4,
    title: "OISC Accredited",
    subtitle: "Office of the Immigration Services Commissioner (UK)",
    logo: oiscLogo,
  },
  {
    id: 5,
    title: "IAA New Zealand",
    subtitle: "Immigration Advisers Authority",
    logo: iaaLogo,
  },
  {
    id: 6,
    title: "British Council",
    subtitle: "Certified Agent",
    logo: britishCouncilLogo,
  },
  {
    id: 7,
    title: "ICEF Agency",
    subtitle: "International Consultants for Education and Fairs",
    logo: icefLogo,
  },
];

const Certifications = () => (
  <section className="certifications-section">
    <div className="marquee-container">
      <div className="marquee-content">
        {/* Repeated so the marquee loop never shows a gap */}
        {[...certifications, ...certifications, ...certifications, ...certifications].map(
          (cert, index) => (
            <div className="cert-item" key={`${cert.id}-${index}`}>
              <div className="cert-card">
                <img src={cert.logo} alt={cert.title} className="cert-logo" />
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  </section>
);

const WhyVectra = () => {
  const [activeTab, setActiveTab] = useState(0);

  const reasons = [
    {
      id: 1,
      title: "Strategic Profile Mapping",
      icon: (
        <svg
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
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
      ),
      description:
        "Before recommending a pathway, we conduct an exhaustive analysis of your academic, professional, and financial background to pinpoint the highest-probability route.",
    },
    {
      id: 2,
      title: "Bulletproof Documentation",
      icon: (
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      ),
      description:
        "We rigorously audit every piece of evidence for absolute consistency and compliance. By anticipating case officer scrutiny, we actively mitigate refusal risks.",
    },
    {
      id: 3,
      title: "Unwavering Transparency",
      icon: (
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
        </svg>
      ),
      description:
        "No false promises or hidden fees. We provide honest feasibility assessments and maintain proactive, crystal-clear communication throughout your entire journey.",
    },
  ];

  return (
    <section className="why-vectra-section">
      <div className="why-vectra-container">
        <div className="why-vectra-header">
          <motion.div
            className="why-vectra-tagline-wrapper"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="why-vectra-tagline">WHY VECTRA FOREIGN SERVICES</p>
          </motion.div>
          <motion.h2
            className="why-vectra-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            "Built for serious visa decisions, not guesswork."
          </motion.h2>
          <motion.p
            className="why-vectra-subtitle"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            We replace uncertainty with strategy. By combining deep regulatory expertise with a
            meticulous understanding of your unique profile, we build applications designed to meet
            the exact standards of global immigration authorities.
          </motion.p>
        </div>

        <div className="why-vectra-split-container">
          <div className="why-vectra-tabs">
            {reasons.map((reason, index) => (
              <div
                key={reason.id}
                role="button"
                tabIndex={0}
                className={`why-vectra-tab ${activeTab === index ? "active" : ""}`}
                onMouseEnter={() => setActiveTab(index)}
                onClick={() => setActiveTab(index)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiveTab(index);
                  }
                }}
              >
                <span className="tab-number">0{index + 1}</span>
                <h3 className="tab-title">{reason.title}</h3>
                {activeTab === index && (
                  <motion.div
                    layoutId="activeTabIndicator"
                    className="tab-indicator"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="why-vectra-display">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="why-vectra-display-card"
              >
                <div className="why-vectra-display-icon">{reasons[activeTab].icon}</div>
                <p className="why-vectra-display-desc">{reasons[activeTab].description}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

const countries = [
  {
    id: 1,
    name: "CANADA",
    slug: "canada",
    image: canadaImg,
    gradient: "linear-gradient(90deg, #ff0000 33%, #d1d5db 33%, #d1d5db 66%, #ff0000 66%)",
  },
  {
    id: 2,
    name: "USA",
    slug: "usa",
    image: usaImg,
    gradient: "linear-gradient(90deg, #002868 50%, #bf0a30 50%)",
  },
  {
    id: 5,
    name: "EUROPE",
    slug: "europe",
    image: europeImg,
    gradient: "linear-gradient(90deg, #003399 50%, #ffcc00 50%)",
  },
  {
    id: 3,
    name: "NEW ZEALAND",
    slug: "nz",
    image: nzImg,
    gradient: "linear-gradient(90deg, #00247d 50%, #cc142b 50%)",
  },
  {
    id: 6,
    name: "UAE",
    slug: "uae",
    image: uaeImg,
    gradient: "linear-gradient(90deg, #00732f 33%, #d1d5db 33%, #d1d5db 66%, #000000 66%)",
  },
  {
    id: 4,
    name: "AUSTRALIA",
    slug: "australia",
    image: australiaImg,
    gradient: "linear-gradient(90deg, #00008b 50%, #ff0000 50%)",
  },
  {
    id: 7,
    name: "UK",
    slug: "uk",
    image: ukImg,
    gradient: "linear-gradient(90deg, #012169 33%, #ffffff 33%, #ffffff 66%, #C8102E 66%)",
  },
];

const CountriesCarousel = () => {
  // Tripled so the auto-scroll can wrap around seamlessly
  const items = [...countries, ...countries, ...countries];
  const { triggerTransition, warmGlobe } = usePageTransition();
  const scrollerRef = useRef(null);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const rafRef = useRef(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        // Someone looking at the country list is likely to open one of them
        if (entry.isIntersecting) warmGlobe();
      },
      { threshold: 0 },
    );

    observer.observe(scroller);
    return () => observer.disconnect();
  }, [warmGlobe]);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller || paused || !inView) return;

    // Writing scrollLeft forces layout on every frame, so don't run the loop at
    // all unless the carousel is actually on screen and moving.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const step = () => {
      scroller.scrollLeft += 0.5;
      const oneSetWidth = scroller.scrollWidth / 3;
      if (scroller.scrollLeft >= oneSetWidth * 2) {
        scroller.scrollLeft -= oneSetWidth;
      } else if (scroller.scrollLeft <= 0) {
        scroller.scrollLeft += oneSetWidth;
      }
      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, [paused, inView]);

  const handleCountryClick = (e, path, name) => {
    e.preventDefault();
    triggerTransition(path, name);
  };

  const scroll = (direction) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    setPaused(true);
    scroller.scrollBy({ left: direction * 350, behavior: "smooth" });
    setTimeout(() => setPaused(false), 2000);
  };

  return (
    <section id="countries" className="countries-section">
      <h2 className="countries-heading">Countries We Serve</h2>
      <div className="carousel-wrapper">
        <button className="carousel-btn left-btn" onClick={() => scroll(-1)}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        <div
          className="marquee-container"
          ref={scrollerRef}
          onMouseEnter={() => {
            setPaused(true);
            warmGlobe();
          }}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={warmGlobe}
        >
          <div className="countries-marquee-content">
            {items.map((country, index) => {
              const path = `/country/${country.slug}`;
              return (
                <a
                  key={`${country.id}-${index}`}
                  href={path}
                  onClick={(e) => handleCountryClick(e, path, country.name)}
                  className="country-item"
                  style={{ "--line-gradient": country.gradient }}
                >
                  <div className="country-card">
                    {/* The country name is printed right below, so the image adds nothing for a screen reader */}
                    <img src={country.image} alt="" className="country-logo" />
                    <p className="country-title">{country.name}</p>
                  </div>
                </a>
              );
            })}
          </div>
        </div>

        <button className="carousel-btn right-btn" onClick={() => scroll(1)}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </section>
  );
};

const PromiseIcon = ({ name }) => {
  switch (name) {
    case "consultation":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      );
    case "assessment":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
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
    case "success":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
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
    default:
      return null;
  }
};

const VectraPromise = () => (
  <section className="vectra-promise-section">
    <div className="promise-header">
      <h2 className="promise-title">"The Vectra Promise"</h2>
      <p className="promise-subtitle">Navigating your immigration journey in 3 simple steps.</p>
    </div>
    <div className="promise-timeline-container">
      <div className="promise-connecting-line"></div>
      <div className="promise-steps-grid">
        <div className="promise-step-card">
          <div className="promise-icon-wrapper">
            <PromiseIcon name="consultation" />
          </div>
          <h3 className="promise-step-title">Initial Consultation</h3>
          <p className="promise-step-desc">
            We discuss your goals, answer your questions, and evaluate your eligibility for various
            pathways.
          </p>
        </div>
        <div className="promise-step-card">
          <div className="promise-icon-wrapper">
            <PromiseIcon name="assessment" />
          </div>
          <h3 className="promise-step-title">Profile Assessment &amp; Strategy</h3>
          <p className="promise-step-desc">
            We create a tailored, step-by-step roadmap to maximize your chances of approval.
          </p>
        </div>
        <div className="promise-step-card">
          <div className="promise-icon-wrapper">
            <PromiseIcon name="success" />
          </div>
          <h3 className="promise-step-title">Visa Application &amp; Success</h3>
          <p className="promise-step-desc">
            We handle the complex paperwork and represent you until your visa is successfully
            granted.
          </p>
        </div>
      </div>
    </div>
  </section>
);

function Home() {
  return (
    <>
      <Seo
        title="Visa & Immigration Consultants in Ahmedabad | Vectra Foreign Services"
        description="Visa and immigration guidance from Ahmedabad for students, professionals and families: documentation, SOP support, language coaching and country advice."
        path="/"
      />
      <div className="content-wrapper">
        <VideoBackground />
        <Navbar />
        <Hero />
      </div>
      <Certifications />
      <WhyVectra />
      <CountriesCarousel />
      <VectraPromise />
    </>
  );
}

export default Home;
