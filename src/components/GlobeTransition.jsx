import { useEffect, useRef, useState } from "react";
import Globe from "react-globe.gl";

const COUNTRY_COORDS = {
  usa: { lat: 38.8977, lng: -77.0365 },
  canada: { lat: 45.4215, lng: -75.6972 },
  australia: { lat: -35.2809, lng: 149.13 },
  uk: { lat: 51.5074, lng: -0.1278 },
  europe: { lat: 51.5074, lng: -0.1278 },
  newzealand: { lat: -41.2866, lng: 174.7756 },
  uae: { lat: 24.4539, lng: 54.3773 },
};

function getCountryCoords(countryName) {
  if (!countryName) return COUNTRY_COORDS.usa;

  const name = countryName.toLowerCase().replace(/\s+/g, "");

  if (name.includes("usa") || name.includes("unitedstates") || name.includes("america"))
    return COUNTRY_COORDS.usa;
  if (name.includes("uk") || name.includes("unitedkingdom") || name.includes("europe"))
    return COUNTRY_COORDS.uk;
  if (name.includes("newzealand") || name.includes("nz")) return COUNTRY_COORDS.newzealand;
  if (name.includes("canada")) return COUNTRY_COORDS.canada;
  if (name.includes("australia")) return COUNTRY_COORDS.australia;
  if (name.includes("uae") || name.includes("emirates")) return COUNTRY_COORDS.uae;

  return COUNTRY_COORDS.usa;
}

function isWebGLAvailable() {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

function GlobeTransition({ countryName, isTransitioning }) {
  const globeRef = useRef();
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Ignore mobile viewport-height jitter from the browser chrome showing/hiding
  useEffect(() => {
    let lastWidth = window.innerWidth;
    const handleResize = () => {
      if (window.innerWidth !== lastWidth || window.innerWidth > 768) {
        lastWidth = window.innerWidth;
        setSize({ width: window.innerWidth, height: window.innerHeight });
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fly to the destination country, then dive down to the surface
  useEffect(() => {
    if (!globeRef.current) return;

    const altitude = window.innerWidth <= 768 ? 4 : 2.5;

    if (!isTransitioning || !countryName) {
      globeRef.current.pointOfView({ lat: 20, lng: 0, altitude }, 0);
      return;
    }

    const coords = getCountryCoords(countryName);
    globeRef.current.pointOfView(
      { lat: coords.lat - 15, lng: coords.lng - 50, altitude },
      0,
    );

    const flyTimer = setTimeout(() => {
      globeRef.current.pointOfView({ lat: coords.lat, lng: coords.lng, altitude }, 2200);
    }, 50);

    const diveTimer = setTimeout(() => {
      globeRef.current.pointOfView(
        { lat: coords.lat, lng: coords.lng, altitude: 0.05 },
        1300,
      );
    }, 2250);

    return () => {
      clearTimeout(flyTimer);
      clearTimeout(diveTimer);
    };
  }, [countryName, isTransitioning]);

  useEffect(() => {
    if (!globeRef.current) return;
    const controls = globeRef.current.controls();
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableRotate = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
  }, []);

  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = !isTransitioning;
    }
  }, [isTransitioning]);

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        background: "#02040a",
        overflow: "hidden",
      }}
    >
      {isWebGLAvailable() ? (
        <Globe
          ref={globeRef}
          width={size.width}
          height={size.height}
          globeImageUrl="/assets/globe/earth-blue-marble.jpg"
          bumpImageUrl="/assets/globe/earth-topology.png"
          backgroundImageUrl="/assets/globe/night-sky.png"
          showAtmosphere={true}
          atmosphereColor="lightskyblue"
          atmosphereAltitude={0.15}
        />
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            color: "#fff",
            fontSize: "1.2rem",
            background: "#02040a",
          }}
        >
          Navigating to {countryName || "Destination"}...
        </div>
      )}
    </div>
  );
}

export default GlobeTransition;
