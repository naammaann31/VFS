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
const TermsOfService = lazy(() => import("./pages/TermsOfService.jsx"));
const ComplianceDisclaimer = lazy(() => import("./pages/ComplianceDisclaimer.jsx"));
// See StoragePolicy.jsx for why the cookie policy page is not named after it
const CookiePolicy = lazy(() => import("./pages/StoragePolicy.jsx"));

// Mock Test Platform Routes
const MockTestList = lazy(() => import("./pages/mockTest/MockTestList.jsx"));
const MockTestAttempt = lazy(() => import("./pages/mockTest/MockTestAttempt.jsx"));
const MockTestResult = lazy(() => import("./pages/mockTest/MockTestResult.jsx"));
const AdminDashboard = lazy(() => import("./pages/mockTest/AdminDashboard.jsx"));
const AdminLogin = lazy(() => import("./pages/mockTest/AdminLogin.jsx"));

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
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/compliance" element={<ComplianceDisclaimer />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />

            {/* IELTS Full Mock Test System */}
            <Route path="/mock-tests" element={<MockTestList />} />
            <Route path="/mock-tests/attempt/:attemptId" element={<MockTestAttempt />} />
            <Route path="/mock-tests/result/:attemptId" element={<MockTestResult />} />
            <Route path="/admin/mock-tests" element={<AdminDashboard />} />
            <Route path="/admin/login" element={<AdminLogin />} />

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
