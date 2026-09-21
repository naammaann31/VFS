import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SmoothScroll from "./components/SmoothScroll.jsx";
import { TransitionProvider } from "./context/TransitionContext.jsx";
import Footer from "./components/Footer.jsx";
import WhatsAppWidget from "./components/WhatsAppWidget.jsx";
import LoadingScreen from "./components/LoadingScreen.jsx";
import Seo from "./components/Seo.jsx";
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

const NotFound = lazy(() => import("./pages/NotFound.jsx"));

// Private, transactional or account-bound screens. They get their own title and
// are kept out of search results; the public pages set their own metadata.
const Private = ({ title, robots = "noindex, nofollow", children }) => (
  <>
    <Seo title={`${title} | Vectra Foreign Services`} robots={robots} />
    {children}
  </>
);

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
            <Route
              path="/thank-you"
              element={
                <Private title="Thank You">
                  <ThankYou />
                </Private>
              }
            />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/compliance" element={<ComplianceDisclaimer />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />

            {/* IELTS Full Mock Test System */}
            <Route
              path="/mock-tests"
              element={
                <Private title="IELTS Mock Tests" robots="noindex, follow">
                  <MockTestList />
                </Private>
              }
            />
            <Route
              path="/mock-tests/attempt/:attemptId"
              element={
                <Private title="IELTS Mock Test">
                  <MockTestAttempt />
                </Private>
              }
            />
            <Route
              path="/mock-tests/result/:attemptId"
              element={
                <Private title="IELTS Mock Test Result">
                  <MockTestResult />
                </Private>
              }
            />
            <Route
              path="/admin/mock-tests"
              element={
                <Private title="Admin Dashboard">
                  <AdminDashboard />
                </Private>
              }
            />
            <Route
              path="/admin/login"
              element={
                <Private title="Admin Login">
                  <AdminLogin />
                </Private>
              }
            />

            {/* Unknown URLs: the server answers these with a real 404 (public/.htaccess) */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Footer />
        <WhatsAppWidget />
      </TransitionProvider>
    </BrowserRouter>
  );
}

export default App;
