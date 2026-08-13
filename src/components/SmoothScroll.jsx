import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";

function SmoothScroll() {
  const { pathname, hash } = useLocation();
  const lenisRef = useRef(null);

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 1,
    });
    lenisRef.current = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    if (!lenisRef.current) return;

    if (hash) {
      const el = document.querySelector(hash);
      if (el) lenisRef.current.scrollTo(el);
    } else {
      window.scrollTo(0, 0);
      lenisRef.current.scrollTo(0, { immediate: true });
    }
  }, [pathname, hash]);

  return null;
}

export default SmoothScroll;
