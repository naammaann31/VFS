import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Seo from "../components/Seo.jsx";
// Reuses the confirmation page's layout so this screen needs no stylesheet of its own
import "./ThankYou.css";

// The server answers unknown URLs with a real HTTP 404 and serves the app shell
// as the body (see public/.htaccess), so this is what a visitor sees there.
const NotFound = () => (
  <div className="thank-you-page">
    <Seo
      title="Page Not Found | Vectra Foreign Services"
      description="The page you are looking for does not exist or may have moved."
      robots="noindex, follow"
    />
    <Navbar />
    <div className="thank-you-container">
      <div className="thank-you-content">
        <h1 className="thank-you-heading">Page Not Found</h1>
        <p className="thank-you-description">
          The page you are looking for does not exist or may have moved. You can return to the
          homepage or get in touch and we will point you in the right direction.
        </p>
        <Link
          to="/"
          className="thank-you-btn"
          style={{
            display: "inline-block",
            padding: "0.9rem 2rem",
            border: "1px solid #ffffff66",
            borderRadius: "999px",
            color: "#fff",
            fontWeight: 600,
            letterSpacing: "0.5px",
          }}
        >
          Return to Home
        </Link>
      </div>
    </div>
  </div>
);

export default NotFound;
