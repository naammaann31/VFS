import LegalDocument from "../components/LegalDocument.jsx";
import { cookieMeta, cookieSections } from "../data/cookiePolicy.js";

const CookiePolicy = () => <LegalDocument meta={cookieMeta} sections={cookieSections} />;

export default CookiePolicy;
