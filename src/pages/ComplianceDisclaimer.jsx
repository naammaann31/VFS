import LegalDocument from "../components/LegalDocument.jsx";
import { complianceMeta, complianceSections } from "../data/complianceDisclaimer.js";

const ComplianceDisclaimer = () => (
  <LegalDocument meta={complianceMeta} sections={complianceSections} />
);

export default ComplianceDisclaimer;
