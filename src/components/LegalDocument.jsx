import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "./Navbar.jsx";
import { scrollToElement } from "./SmoothScroll.jsx";
import "./LegalDocument.css";

const sectionNumber = (index) => String(index + 1).padStart(2, "0");

const Block = ({ block }) => {
  switch (block.type) {
    case "p":
      return <p className="legal-paragraph">{block.text}</p>;

    case "h3":
      return <h3 className="legal-subheading">{block.text}</h3>;

    case "list":
      return (
        <ul className="legal-list">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );

    case "linklist":
      return (
        <ul className="legal-list">
          {block.items.map((item) => (
            <li key={item.label}>
              {item.to ? (
                <Link to={item.to} className="legal-link">
                  {item.label}
                </Link>
              ) : (
                item.label
              )}
            </li>
          ))}
        </ul>
      );

    case "options":
      return (
        <div className="legal-options">
          {block.items.map((item) => (
            <span className="legal-option" key={item}>
              {item}
            </span>
          ))}
        </div>
      );

    case "details":
      return (
        <dl className="legal-details">
          {block.items.map((item) => (
            <div className="legal-detail-row" key={item.label}>
              <dt>{item.label}</dt>
              <dd>
                {item.href ? (
                  <a
                    href={item.href}
                    className="legal-link"
                    {...(item.href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
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

    case "notice":
      return (
        <div className="legal-notice">
          {block.title && <p className="legal-notice-title">{block.title}</p>}
          {block.paragraphs.map((text) => (
            <p key={text}>{text}</p>
          ))}
        </div>
      );

    default:
      return null;
  }
};

const LegalDocument = ({ meta, sections }) => {
  const [activeId, setActiveId] = useState(sections[0].id);
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
  }, [sections]);

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
    <div className="legal-page">
      <Navbar />

      <section className="legal-hero">
        <motion.div
          className="legal-hero-inner"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="legal-eyebrow">{meta.eyebrow || "LEGAL"}</p>
          <h1 className="legal-title">{meta.title}</h1>
          <p className="legal-company">{meta.company}</p>
          <p className="legal-intro">{meta.intro}</p>

          <div className="legal-meta">
            <div className="legal-meta-pill">
              <span className="legal-meta-label">Effective Date</span>
              <span className="legal-meta-value">{meta.effectiveDate}</span>
            </div>
            <div className="legal-meta-pill">
              <span className="legal-meta-label">Last Updated</span>
              <span className="legal-meta-value">{meta.lastUpdated}</span>
            </div>
          </div>
        </motion.div>
      </section>

      <div className="legal-body">
        <aside className="legal-toc" aria-label="Table of contents">
          {/* data-lenis-prevent: Lenis swallows wheel events globally, so
              without this the list can never be scrolled to its end. */}
          <div className="legal-toc-inner" data-lenis-prevent>
            <h2 className="legal-toc-heading">Contents</h2>
            <nav>
              <ol className="legal-toc-list">
                {sections.map((section, index) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className={`legal-toc-link ${activeId === section.id ? "active" : ""}`}
                      onClick={(event) => goToSection(event, section.id)}
                    >
                      <span className="legal-toc-number">{sectionNumber(index)}</span>
                      <span className="legal-toc-text">{section.title}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </aside>

        <main className="legal-content">
          {meta.preamble && (
            <div className="legal-section">
              {meta.preamble.map((text) => (
                <p className="legal-paragraph" key={text}>
                  {text}
                </p>
              ))}
            </div>
          )}

          {sections.map((section, index) => (
            <motion.section
              key={section.id}
              id={section.id}
              ref={(el) => (sectionRefs.current[section.id] = el)}
              className="legal-section"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <header className="legal-section-header">
                <span className="legal-section-number">{sectionNumber(index)}</span>
                <h2 className="legal-section-title">{section.title}</h2>
              </header>

              {section.blocks.map((block, blockIndex) => (
                <Block key={blockIndex} block={block} />
              ))}
            </motion.section>
          ))}

          {meta.closing && (
            <div className="legal-section">
              <div className="legal-notice">
                <p className="legal-notice-title">{meta.closing.title}</p>
                {meta.closing.paragraphs.map((text) => (
                  <p key={text}>{text}</p>
                ))}
              </div>
            </div>
          )}

          <div className="legal-footer-note">
            <p>
              This document was last updated on {meta.lastUpdated}. If anything here is unclear,
              please <Link to="/contact">get in touch</Link> before engaging our services.
            </p>
          </div>
        </main>
      </div>

      <button
        type="button"
        className={`legal-top-button ${showTopButton ? "visible" : ""}`}
        onClick={() => scrollToElement(document.querySelector(".legal-hero"), 0)}
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

export default LegalDocument;
