import { createContext, useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import GlobeTransition from "../components/GlobeTransition.jsx";
import { countryData } from "../data/countryData.js";

const TransitionContext = createContext();

export const usePageTransition = () => useContext(TransitionContext);

export const TransitionProvider = ({ children }) => {
  const [isActive, setIsActive] = useState(false);
  const [targetCountry, setTargetCountry] = useState(null);
  const navigate = useNavigate();

  const triggerTransition = useCallback(
    (path, countryName) => {
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
    [navigate],
  );

  return (
    <TransitionContext.Provider value={{ triggerTransition, isActive }}>
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
        <GlobeTransition
          countryName={targetCountry}
          isTransitioning={isActive || !!targetCountry}
        />
      </div>
    </TransitionContext.Provider>
  );
};
