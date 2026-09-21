import LegalDocument from "../components/LegalDocument.jsx";
import Seo from "../components/Seo.jsx";
import { complianceMeta, complianceSections } from "../data/complianceDisclaimer.js";

const ComplianceDisclaimer = () => (
  <>
    <Seo
      title="Compliance & Legal Disclaimer | Vectra Foreign Services"
      description="The nature and limitations of Vectra Foreign Services as an independent private organization, and what we can and cannot do on your behalf."
      path="/compliance"
    />
    <LegalDocument meta={complianceMeta} sections={complianceSections} />
  </>
);

export default ComplianceDisclaimer;
