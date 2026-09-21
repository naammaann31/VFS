export const termsMeta = {
  title: "Terms of Service",
  company: "Vectra Foreign Services",
  effectiveDate: "01 July 2026",
  lastUpdated: "01 July 2026",
  intro:
    "These Terms govern your use of our website, consultations, documentation support, and immigration advisory services. Please read them carefully before engaging our services.",
};

// Blocks render as: "p" paragraph, "list" bulleted list, "details" label/value rows.
export const termsSections = [
  {
    id: "introduction",
    title: "Introduction",
    blocks: [
      {
        type: "p",
        text: "These Terms of Service govern your use of the website, consultation services, documentation support, visa guidance, immigration advisory support, and related services provided by Vectra Foreign Services.",
      },
      {
        type: "p",
        text: "For these Terms, “Vectra Foreign Services,” “we,” “our,” or “us” refers to:",
      },
      {
        type: "details",
        items: [
          { label: "Business Name", value: "Vectra Foreign Services" },
          { label: "Legal Entity", value: "Vectra Foreign Services Private Limited" },
          {
            label: "Office Address",
            value:
              "SF - 202, Olive Greens, above Shambhu's Coffee, Gota, Ahmedabad, Gujarat 382481",
          },
          {
            label: "Email",
            value: "info@vectraforeignservices.com",
            href: "mailto:info@vectraforeignservices.com",
          },
          { label: "Phone", value: "+91 8401172400", href: "tel:+918401172400" },
        ],
      },
      {
        type: "p",
        text: "By using our website, booking a consultation, submitting documents, making payment, or using our services, you agree to these Terms of Service.",
      },
    ],
  },
  {
    id: "nature-of-services",
    title: "Nature of Services",
    blocks: [
      {
        type: "p",
        text: "Vectra Foreign Services provides consulting and support services related to:",
      },
      {
        type: "list",
        items: [
          "Student visa guidance",
          "Visitor visa guidance",
          "Tourist visa guidance",
          "Work permit guidance",
          "Permanent residency guidance",
          "Family and spouse visa support",
          "Business and investor visa guidance",
          "Study abroad guidance",
          "SOP and LOR support",
          "Visa interview preparation",
          "Document checklist preparation",
          "Profile assessment",
          "Application preparation support",
          "Post-approval advisory",
          "Employer immigration support, where applicable",
        ],
      },
      {
        type: "p",
        text: "Our services are advisory, documentation-support, and process-support services. We are not a government authority, embassy, consulate, visa application center, or immigration department.",
      },
    ],
  },
  {
    id: "no-legal-representation",
    title: "No Legal Representation",
    blocks: [
      {
        type: "p",
        text: "Unless clearly stated in a separate written agreement, Vectra Foreign Services does not act as a lawyer, advocate, immigration attorney, government representative, or official legal representative.",
      },
      {
        type: "p",
        text: "Any legal advice, if required, should be obtained from a qualified and licensed legal professional.",
      },
    ],
  },
  {
    id: "no-guarantee-of-approval",
    title: "No Guarantee of Approval",
    blocks: [
      { type: "p", text: "We do not guarantee:" },
      {
        type: "list",
        items: [
          "Visa approval",
          "Immigration approval",
          "Admission approval",
          "Job offer",
          "Work permit approval",
          "PR approval",
          "Interview success",
          "Faster processing",
          "Waiver of government requirements",
          "Reversal of previous refusal",
          "Any specific outcome from an embassy, consulate, immigration department, institution, employer, or third party",
        ],
      },
      {
        type: "p",
        text: "Final decisions are made only by the relevant government authority, embassy, consulate, institution, employer, or authorized third party.",
      },
      {
        type: "p",
        text: "Any estimated timeline, approval chance, or expected result provided by us is only based on general experience and available information. It is not a promise or guarantee.",
      },
    ],
  },
  {
    id: "client-responsibilities",
    title: "Client Responsibilities",
    blocks: [
      { type: "p", text: "You agree to:" },
      {
        type: "list",
        items: [
          "Provide true, complete, and accurate information",
          "Submit genuine documents",
          "Disclose previous visa refusals, overstays, criminal history, immigration issues, medical issues, or other relevant facts",
          "Review all forms and documents before submission",
          "Respond to our team on time",
          "Pay agreed fees on time",
          "Attend appointments, interviews, biometrics, or meetings as required",
          "Follow instructions provided by the relevant authority",
          "Not hide material facts from us",
          "Not submit forged, altered, fake, or misleading documents",
        ],
      },
      {
        type: "p",
        text: "If you provide false, incomplete, delayed, or misleading information, we are not responsible for refusal, delay, rejection, ban, financial loss, or any other consequence.",
      },
    ],
  },
  {
    id: "document-authenticity",
    title: "Document Authenticity",
    blocks: [
      {
        type: "p",
        text: "We do not create fake documents, false statements, forged records, misleading information, or fraudulent applications.",
      },
      {
        type: "p",
        text: "If we suspect that any document or information is false, manipulated, or fraudulent, we reserve the right to refuse service, stop work, or terminate the engagement.",
      },
      {
        type: "p",
        text: "No refund will be provided where services are stopped due to false information, fake documents, fraud, misconduct, or non-cooperation by the client.",
      },
    ],
  },
  {
    id: "fees-and-payments",
    title: "Fees and Payments",
    blocks: [
      { type: "p", text: "Our professional fees will be communicated before starting the service." },
      { type: "p", text: "Fees may include:" },
      {
        type: "list",
        items: [
          "Consultation fees",
          "Documentation fees",
          "Application support fees",
          "SOP or LOR support fees",
          "Interview preparation fees",
          "Case handling fees",
          "Service package fees",
        ],
      },
      {
        type: "p",
        text: "Government fees, embassy fees, visa application center fees, courier fees, biometric fees, medical fees, insurance fees, translation fees, evaluation fees, admission fees, ticketing, accommodation, or third-party charges are separate unless specifically mentioned in writing.",
      },
      {
        type: "p",
        text: "Services may begin only after payment is received, unless otherwise agreed in writing.",
      },
    ],
  },
  {
    id: "refund-policy",
    title: "Refund Policy",
    blocks: [
      {
        type: "p",
        text: "Fees paid to Vectra Foreign Services are generally non-refundable once work has started.",
      },
      { type: "p", text: "Refunds will not be provided in the following situations:" },
      {
        type: "list",
        items: [
          "Visa refusal",
          "Delay by embassy or government authority",
          "Change in immigration rules",
          "Client changes mind",
          "Client fails to provide documents",
          "Client provides false or incomplete information",
          "Client does not attend appointment or interview",
          "Client chooses not to continue",
          "Application is rejected due to eligibility issues",
          "Third-party or government decision is unfavorable",
          "Government or third-party fees have already been paid",
        ],
      },
      { type: "p", text: "A partial refund may be considered only if:" },
      {
        type: "list",
        items: [
          "No work has started",
          "Payment was made by mistake",
          "Duplicate payment was received",
          "A refund is approved by management in writing",
        ],
      },
      {
        type: "p",
        text: "Any approved refund may be subject to deduction of administrative charges, payment gateway charges, consultation charges, or work already completed.",
      },
    ],
  },
  {
    id: "government-and-third-party-fees",
    title: "Government and Third-Party Fees",
    blocks: [
      {
        type: "p",
        text: "Government fees, embassy fees, visa center fees, biometric fees, medical fees, courier fees, university fees, insurance fees, translation fees, or any other third-party charges are not controlled by us.",
      },
      {
        type: "p",
        text: "Such fees are subject to the policies of the relevant third party or government authority.",
      },
      {
        type: "p",
        text: "We are not responsible for refund, delay, cancellation, or rejection of third-party payments.",
      },
    ],
  },
  {
    id: "timelines",
    title: "Timelines",
    blocks: [
      {
        type: "p",
        text: "We may provide estimated timelines based on available information and previous experience.",
      },
      { type: "p", text: "However, processing timelines may change due to:" },
      {
        type: "list",
        items: [
          "Embassy workload",
          "Government rules",
          "Missing documents",
          "Background checks",
          "Appointment availability",
          "Technical issues",
          "Holidays",
          "Policy changes",
          "Client delay",
          "Third-party delay",
          "Security or administrative review",
        ],
      },
      {
        type: "p",
        text: "We are not responsible for delays caused by government authorities, embassies, consulates, visa centers, institutions, employers, or third parties.",
      },
    ],
  },
  {
    id: "communication",
    title: "Communication",
    blocks: [
      { type: "p", text: "We may communicate with you through:" },
      {
        type: "list",
        items: [
          "Phone",
          "Email",
          "WhatsApp",
          "SMS",
          "Social media",
          "Website forms",
          "In-person meetings",
        ],
      },
      {
        type: "p",
        text: "You are responsible for checking messages, emails, updates, document requests, payment reminders, and appointment information.",
      },
      { type: "p", text: "If you fail to respond on time, your application or service may be delayed." },
    ],
  },
  {
    id: "consultation-and-profile-assessment",
    title: "Consultation and Profile Assessment",
    blocks: [
      {
        type: "p",
        text: "Any consultation or profile assessment is based on information provided by you.",
      },
      {
        type: "p",
        text: "If your information changes or if you later disclose new facts, our assessment may also change.",
      },
      {
        type: "p",
        text: "We are not responsible for incorrect advice caused by incomplete, false, or delayed information from your side.",
      },
    ],
  },
  {
    id: "website-use",
    title: "Website Use",
    blocks: [
      { type: "p", text: "You agree not to misuse our website by:" },
      {
        type: "list",
        items: [
          "Uploading harmful files",
          "Attempting unauthorized access",
          "Copying website content without permission",
          "Using the website for unlawful purposes",
          "Submitting fake inquiries",
          "Misrepresenting your identity",
          "Interfering with website security or functionality",
        ],
      },
      { type: "p", text: "We may restrict access to our website or services if misuse is suspected." },
    ],
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    blocks: [
      {
        type: "p",
        text: "All website content, text, graphics, logos, designs, documents, templates, service descriptions, and materials created by Vectra Foreign Services are our intellectual property unless otherwise stated.",
      },
      {
        type: "p",
        text: "You may not copy, reproduce, modify, sell, distribute, or use our content for commercial purposes without written permission.",
      },
    ],
  },
  {
    id: "client-documents-and-content",
    title: "Client Documents and Content",
    blocks: [
      { type: "p", text: "You retain ownership of the documents and information you submit to us." },
      {
        type: "p",
        text: "However, you allow us to use, process, review, organize, and share such documents as required to provide the requested service.",
      },
      {
        type: "p",
        text: "You are responsible for ensuring that all documents submitted by you are genuine and legally obtained.",
      },
    ],
  },
  {
    id: "confidentiality",
    title: "Confidentiality",
    blocks: [
      { type: "p", text: "We will take reasonable steps to keep your information confidential." },
      {
        type: "p",
        text: "However, confidentiality does not apply where disclosure is required:",
      },
      {
        type: "list",
        items: [
          "To provide services",
          "To submit applications",
          "To communicate with institutions or authorities",
          "To comply with law",
          "To protect our legal rights",
          "To prevent fraud or misuse",
        ],
      },
    ],
  },
  {
    id: "third-party-services",
    title: "Third-Party Services",
    blocks: [
      { type: "p", text: "We may refer or coordinate with third-party service providers such as:" },
      {
        type: "list",
        items: [
          "Travel agencies",
          "Insurance providers",
          "Translators",
          "Courier companies",
          "Payment gateways",
          "Education institutions",
          "Visa application centers",
          "Medical centers",
          "Documentation vendors",
          "Technology providers",
        ],
      },
      {
        type: "p",
        text: "We are not responsible for the acts, delays, charges, quality, decisions, or failures of third-party service providers.",
      },
    ],
  },
  {
    id: "limitation-of-liability",
    title: "Limitation of Liability",
    blocks: [
      {
        type: "p",
        text: "To the maximum extent permitted by law, Vectra Foreign Services will not be liable for:",
      },
      {
        type: "list",
        items: [
          "Visa refusal",
          "Immigration refusal",
          "Admission refusal",
          "Job rejection",
          "Delay in processing",
          "Loss of opportunity",
          "Financial loss",
          "Travel cancellation",
          "Change in law or policy",
          "Third-party failure",
          "Government decision",
          "Client’s false or incomplete information",
          "Technical issues outside our control",
        ],
      },
      {
        type: "p",
        text: "Our total liability, if any, shall not exceed the professional service fee paid to us for the specific service giving rise to the claim.",
      },
    ],
  },
  {
    id: "indemnity",
    title: "Indemnity",
    blocks: [
      {
        type: "p",
        text: "You agree to indemnify and hold Vectra Foreign Services, its owners, employees, consultants, agents, and partners harmless from any claim, loss, penalty, liability, cost, or expense arising from:",
      },
      {
        type: "list",
        items: [
          "False information provided by you",
          "Fake or forged documents",
          "Violation of these Terms",
          "Misuse of our services",
          "Misrepresentation",
          "Non-disclosure of important facts",
          "Violation of any law or third-party rights",
        ],
      },
    ],
  },
  {
    id: "service-refusal-and-termination",
    title: "Service Refusal and Termination",
    blocks: [
      { type: "p", text: "We reserve the right to refuse, suspend, or terminate services if:" },
      {
        type: "list",
        items: [
          "You provide false or incomplete information",
          "You submit fake documents",
          "You behave abusively with staff",
          "You fail to make payment",
          "You do not cooperate",
          "You ask us to perform illegal or unethical work",
          "Your case creates legal, compliance, or reputational risk",
          "You violate these Terms",
        ],
      },
      { type: "p", text: "In such cases, fees may not be refundable." },
    ],
  },
  {
    id: "compliance-and-ethical-practice",
    title: "Compliance and Ethical Practice",
    blocks: [
      { type: "p", text: "Vectra Foreign Services follows ethical consulting practices." },
      {
        type: "p",
        text: "We do not promise guaranteed approvals, fake documentation, false claims, illegal shortcuts, or unauthorized influence over government authorities.",
      },
      {
        type: "p",
        text: "Any staff member, agent, or third party claiming guaranteed visa approval or illegal processing is acting outside company policy and should be reported immediately to:",
      },
      {
        type: "details",
        items: [
          {
            label: "Email",
            value: "info@vectraforeignservices.com",
            href: "mailto:info@vectraforeignservices.com",
          },
        ],
      },
    ],
  },
  {
    id: "force-majeure",
    title: "Force Majeure",
    blocks: [
      {
        type: "p",
        text: "We are not responsible for failure or delay caused by events beyond our control, including:",
      },
      {
        type: "list",
        items: [
          "Government restrictions",
          "Embassy closure",
          "War",
          "Pandemic",
          "Natural disasters",
          "Internet failure",
          "Technical breakdown",
          "Strikes",
          "Policy changes",
          "Political events",
          "Visa system downtime",
          "Banking or payment failure",
        ],
      },
    ],
  },
  {
    id: "privacy",
    title: "Privacy",
    blocks: [
      {
        type: "p",
        text: "Your personal information will be handled according to our Privacy Policy.",
      },
      {
        type: "p",
        text: "By using our services, you agree to our collection and use of personal information as described in the Privacy Policy.",
      },
    ],
  },
  {
    id: "changes-to-services-or-terms",
    title: "Changes to Services or Terms",
    blocks: [
      {
        type: "p",
        text: "We may update our services, pricing, policies, website content, or these Terms of Service from time to time.",
      },
      { type: "p", text: "The updated Terms will be effective once posted on our website." },
    ],
  },
  {
    id: "governing-law",
    title: "Governing Law",
    blocks: [
      {
        type: "p",
        text: "These Terms shall be governed by and interpreted according to the laws of India.",
      },
    ],
  },
  {
    id: "jurisdiction",
    title: "Jurisdiction",
    blocks: [
      {
        type: "p",
        text: "Any dispute arising from these Terms, our website, or our services shall be subject to the courts and legal forums located in Ahmedabad, Gujarat, India, unless applicable law requires otherwise.",
      },
    ],
  },
  {
    id: "contact-information",
    title: "Contact Information",
    blocks: [
      { type: "p", text: "For questions about these Terms, contact:" },
      {
        type: "details",
        items: [
          { label: "Company", value: "Vectra Foreign Services" },
          {
            label: "Address",
            value:
              "SF - 202, Olive Greens, above Shambhu's Coffee, Gota, Ahmedabad, Gujarat 382481",
          },
          {
            label: "Email",
            value: "info@vectraforeignservices.com",
            href: "mailto:info@vectraforeignservices.com",
          },
          { label: "Phone", value: "+91 8401172400", href: "tel:+918401172400" },
        ],
      },
    ],
  },
];

export default termsSections;
