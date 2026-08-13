import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar.jsx";
import { scrollToElement } from "../components/SmoothScroll.jsx";
import { termsMeta, termsSections } from "../data/termsOfService.js";
import "./TermsOfService.css";

const sectionNumber = (index) => String(index + 1).padStart(2, "0");

const Block = ({ block }) => {
  if (block.type === "p") {
    return <p className="terms-paragraph">{block.text}</p>;
  }

  if (block.type === "list") {
    return (
      <ul className="terms-list">
        {block.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }

  if (block.type === "details") {
    return (
      <dl className="terms-details">
        {block.items.map((item) => (
          <div className="terms-detail-row" key={item.label}>
            <dt>{item.label}</dt>
            <dd>
              {item.href ? (
                <a href={item.href} className="terms-link">
                  {item.value}
                </a>
              ) : (
                item.value
              )}
            </dd>
          </div>
        ))}
      </dl>
    );
  }

  return null;
};

const TermsOfService = () => {
  const [activeId, setActiveId] = useState(termsSections[0].id);
  const [showTopButton, setShowTopButton] = useState(false);
  const sectionRefs = useRef({});

  // Highlight whichever section is currently nearest the top of the viewport.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-120px 0px -65% 0px", threshold: 0 },
    );

    Object.values(sectionRefs.current).forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setShowTopButton(window.scrollY > 900);
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goToSection = (event, id) => {
    event.preventDefault();
    scrollToElement(sectionRefs.current[id]);
    // Keep the URL shareable without triggering a router navigation
    window.history.replaceState(null, "", `#${id}`);
  };

  return (
    <div className="terms-page">
      <Navbar />

      <section className="terms-hero">
        <motion.div
          className="terms-hero-inner"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="terms-eyebrow">LEGAL</p>
          <h1 className="terms-title">{termsMeta.title}</h1>
          <p className="terms-company">{termsMeta.company}</p>
          <p className="terms-intro">{termsMeta.intro}</p>

          <div className="terms-meta">
            <div className="terms-meta-pill">
              <span className="terms-meta-label">Effective Date</span>
              <span className="terms-meta-value">{termsMeta.effectiveDate}</span>
            </div>
            <div className="terms-meta-pill">
              <span className="terms-meta-label">Last Updated</span>
              <span className="terms-meta-value">{termsMeta.lastUpdated}</span>
            </div>
          </div>
        </motion.div>
      </section>

      <div className="terms-body">
        <aside className="terms-toc" aria-label="Table of contents">
          <div className="terms-toc-inner">
            <h2 className="terms-toc-heading">Contents</h2>
            <nav>
              <ol className="terms-toc-list">
                {termsSections.map((section, index) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className={`terms-toc-link ${activeId === section.id ? "active" : ""}`}
                      onClick={(event) => goToSection(event, section.id)}
                    >
                      <span className="terms-toc-number">{sectionNumber(index)}</span>
                      <span className="terms-toc-text">{section.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </aside>

        <main className="terms-content">
          {termsSections.map((section, index) => (
            <motion.section
              key={section.id}
              id={section.id}
              ref={(el) => (sectionRefs.current[section.id] = el)}
              className="terms-section"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <header className="terms-section-header">
                <span className="terms-section-number">{sectionNumber(index)}</span>
                <h2 className="terms-section-title">{section.title}</h2>
              </header>

              {section.blocks.map((block, blockIndex) => (
                <Block key={blockIndex} block={block} />
              ))}
            </motion.section>
          ))}

          <div className="terms-footer-note">
            <p>
              These Terms were last updated on {termsMeta.lastUpdated}. If anything here is unclear,
              please <Link to="/contact">get in touch</Link> before engaging our services.
            </p>
          </div>
        </main>
      </div>

      <button
        type="button"
        className={`terms-top-button ${showTopButton ? "visible" : ""}`}
        onClick={() => scrollToElement(document.querySelector(".terms-hero"), 0)}
        aria-label="Back to top"
      >
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
          <line x1="12" y1="19" x2="12" y2="5" />
          <polyline points="5 12 12 5 19 12" />
        </svg>
      </button>
    </div>
  );
};

export default TermsOfService;
