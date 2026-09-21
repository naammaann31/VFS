// This is the Cookie Policy page. The file is deliberately NOT named
// "CookiePolicy" because the bundler names each lazy chunk after its source
// file, and cookie-notice filter lists (uBlock, AdGuard, Brave) block requests
// whose filename contains "cookie" — which left the page blank for anyone
// running a blocker. The route is still /cookie-policy.
import LegalDocument from "../components/LegalDocument.jsx";
import Seo from "../components/Seo.jsx";
import { cookieMeta, cookieSections } from "../data/storagePolicy.js";

const CookiePolicy = () => (
  <>
    <Seo
      title="Cookie Policy | Vectra Foreign Services"
      description="How the Vectra Foreign Services website uses cookies and similar technologies, what they collect, and how you can control them."
      path="/cookie-policy"
    />
    <LegalDocument meta={cookieMeta} sections={cookieSections} />
  </>
);

export default CookiePolicy;
