import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Lenis from "lenis";

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Shared so in-page anchors can scroll through Lenis instead of fighting it
// with a native scroll that Lenis would immediately override.
let activeLenis = null;

export const scrollToElement = (el, offset = -110) => {
  if (!el) return;
  if (activeLenis) {
    activeLenis.scrollTo(el, { offset });
  } else {
    el.scrollIntoView({ block: "start" });
  }
};

function SmoothScroll() {
  const { pathname, hash } = useLocation();
  const lenisRef = useRef(null);

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    // Honour the OS setting — forcing momentum scrolling on someone who asked
    // for reduced motion is a good way to make them motion sick.
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      // lerp instead of duration/easing: it's frame-rate independent and
      // tracks the wheel closely, where a 1.2s eased tween kept coasting
      // after the user stopped and read as laggy.
      lerp: 0.09,
      wheelMultiplier: 1,
      // Leave touch devices on native scrolling. Browsers hand that to the
      // compositor, so it stays smooth even when the main thread is busy.
      syncTouch: false,
      touchMultiplier: 1.5,
      overscroll: false,
    });
    lenisRef.current = lenis;
    activeLenis = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
      activeLenis = null;
    };
  }, []);

  useEffect(() => {
    const lenis = lenisRef.current;

    if (hash) {
      const el = document.querySelector(hash);
      if (!el) return;

      if (lenis) {
        lenis.scrollTo(el, { offset: -80 });
      } else {
        el.scrollIntoView();
      }
      return;
    }

    // New page — start at the top, with no visible scroll animation.
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

export default SmoothScroll;
