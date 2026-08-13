import LegalDocument from "../components/LegalDocument.jsx";
import { termsMeta, termsSections } from "../data/termsOfService.js";

const TermsOfService = () => <LegalDocument meta={termsMeta} sections={termsSections} />;

export default TermsOfService;
