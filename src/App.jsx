import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SmoothScroll from "./components/SmoothScroll.jsx";
import { TransitionProvider } from "./context/TransitionContext.jsx";
import Footer from "./components/Footer.jsx";
import WhatsAppWidget from "./components/WhatsAppWidget.jsx";
import LoadingScreen from "./components/LoadingScreen.jsx";
import "./App.css";

const Home = lazy(() => import("./pages/Home.jsx"));
const CountryPage = lazy(() => import("./pages/CountryPage.jsx"));
const Services = lazy(() => import("./pages/Services.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const CheckEligibility = lazy(() => import("./pages/CheckEligibility.jsx"));
const Resources = lazy(() => import("./pages/Resources.jsx"));
const ThankYou = lazy(() => import("./pages/ThankYou.jsx"));

function App() {
  return (
    <BrowserRouter>
      <SmoothScroll />
      <TransitionProvider>
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/country/:countryName" element={<CountryPage />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/check-eligibility" element={<CheckEligibility />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
        <Footer />
        <WhatsAppWidget />
      </TransitionProvider>
    </BrowserRouter>
  );
}

export default App;
