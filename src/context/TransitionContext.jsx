import { Component, createContext, lazy, Suspense, useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { countryData } from "../data/countryData.js";

// The globe (three.js + react-globe.gl + ~2.7 MB of textures) is only ever
// shown during a country transition, so it is loaded on demand instead of with
// every page. warmGlobe() is called when a visitor shows intent (hovering or
// touching the country links, or scrolling the country carousel into view) so
// that it is normally ready before the transition starts.
const loadGlobeTransition = () => import("../components/GlobeTransition.jsx");
const GlobeTransition = lazy(loadGlobeTransition);

// If the chunk cannot be fetched (offline, or a stale tab after a redeploy) the
// transition just shows its dark backdrop; navigation still happens on its timer.
class GlobeBoundary extends Component {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? null : this.props.children;
  }
}

const TransitionContext = createContext();

export const usePageTransition = () => useContext(TransitionContext);

export const TransitionProvider = ({ children }) => {
  const [isActive, setIsActive] = useState(false);
  const [targetCountry, setTargetCountry] = useState(null);
  // Once mounted the globe stays mounted (hidden), as it always did, so repeat
  // transitions start instantly.
  const [globeRequested, setGlobeRequested] = useState(false);
  const navigate = useNavigate();

  const warmGlobe = useCallback(() => {
    loadGlobeTransition().catch(() => {});
    setGlobeRequested(true);
  }, []);

  const triggerTransition = useCallback(
    (path, countryName) => {
      warmGlobe();
      setTargetCountry(countryName);
      setIsActive(true);

      // Warm the destination page's hero image while the globe flies
      if (countryName) {
        const images = countryData[countryName.toLowerCase()]?.images;
        if (images && images.length > 0) {
          const preload = new Image();
          preload.src = images[0];
        }
      }

      setTimeout(() => {
        navigate(path);
        setTimeout(() => {
          setIsActive(false);
          setTimeout(() => setTargetCountry(null), 500);
        }, 100);
      }, 3000);
    },
    [navigate, warmGlobe],
  );

  return (
    <TransitionContext.Provider value={{ triggerTransition, isActive, warmGlobe }}>
      {children}
      <div
        className={`globe-transition-overlay ${isActive ? "active" : ""}`}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9999,
          pointerEvents: isActive ? "auto" : "none",
          opacity: isActive ? 1 : 0,
          visibility: isActive || targetCountry ? "visible" : "hidden",
          transition: "opacity 0.5s ease-in-out",
          backgroundColor: "#02040a",
        }}
      >
        {globeRequested && (
          <GlobeBoundary>
            <Suspense fallback={null}>
              <GlobeTransition
                countryName={targetCountry}
                isTransitioning={isActive || !!targetCountry}
              />
            </Suspense>
          </GlobeBoundary>
        )}
      </div>
    </TransitionContext.Provider>
  );
};
