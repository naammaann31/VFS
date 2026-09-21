import LegalDocument from "../components/LegalDocument.jsx";
import Seo from "../components/Seo.jsx";
import { termsMeta, termsSections } from "../data/termsOfService.js";

const TermsOfService = () => (
  <>
    <Seo
      title="Terms of Service | Vectra Foreign Services"
      description="The terms that govern your use of the Vectra Foreign Services website, consultations, documentation support and immigration advisory services."
      path="/terms-of-service"
    />
    <LegalDocument meta={termsMeta} sections={termsSections} />
  </>
);

export default TermsOfService;
