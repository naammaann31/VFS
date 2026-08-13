export const countryData = {
  canada: {
    title: "CANADA",
    accentColor: "#e31837",
    ctaText:
      "From Express Entry to study permits, our Canadian immigration specialists will help you build a new life in the Great White North.",
    whyChoose: {
      titleStart: "Why choose ",
      titleHighlight: "Canada?",
      accentColor: "#F32D2D",
      paragraphs: [
        "Canada is recognized as one of the world's premier destinations for quality education, rewarding career opportunities, and an exceptional standard of living. With internationally acclaimed universities, vibrant cities, breathtaking landscapes, and welcoming multicultural communities, Canada offers an ideal environment for personal and professional growth while providing safety, stability, and excellent public infrastructure.",
        "Whether your goal is to study, work, or settle permanently, Canada offers clear immigration pathways through Express Entry, Provincial Nominee Programs (PNPs), family sponsorship, and post-graduation work opportunities. Supported by a strong economy, universal healthcare, competitive salaries, and growing demand in technology, healthcare, engineering, finance, and skilled trades, Canada remains an excellent destination for a successful future.",
      ],
      cards: [
        {
          title: "World-Class Education",
          description:
            "Top-ranked universities with affordable tuition and excellent post-study work opportunities.",
          icon: "education",
        },
        {
          title: "Thriving Economy",
          description:
            "Strong demand for qualified professionals in tech, healthcare, and engineering.",
          icon: "economy",
        },
        {
          title: "Universal Healthcare",
          description:
            "Exceptional public healthcare system and generous social benefits for residents.",
          icon: "healthcare",
        },
        {
          title: "Welcoming Culture",
          description: "A safe, inclusive, and multicultural society that embraces newcomers.",
          icon: "community",
        },
      ],
    },
    pathways: {
      student: {
        title: "Study Permit",
        requirements: [
          {
            label: "Academics",
            text: "Acceptance from a Designated Learning Institution (DLI).",
          },
          {
            label: "Language Proficiency",
            text: "IELTS 6.0/6.5 or equivalent depending on the program.",
          },
          {
            label: "Financials",
            text: "Proof of funds for tuition and living expenses (GIC often required).",
          },
          {
            label: "Intent",
            text: "Clear intent to leave Canada after studies (unless applying for PGWP).",
          },
        ],
        steps: [
          "Obtain Letter of Acceptance",
          "Pay Tuition & Secure GIC",
          "Medical Exam & Biometrics",
          "Submit Study Permit Application",
        ],
      },
      tourist: {
        title: "Visitor Visa",
        requirements: [
          {
            label: "Valid Passport",
            text: "Must be valid for the duration of your stay.",
          },
          {
            label: "Proof of Funds",
            text: "Bank statements showing sufficient funds.",
          },
          {
            label: "Ties to Home Country",
            text: "Employment letter, property ownership, or family ties.",
          },
          {
            label: "Travel Purpose",
            text: "Clear itinerary for tourism or family visit.",
          },
        ],
        steps: [
          "Gather Supporting Documents",
          "Complete IRCC Online Form",
          "Provide Biometrics",
          "Wait for Processing & Passport Request",
        ],
      },
      pr: {
        title: "Express Entry / PR",
        requirements: [
          {
            label: "Work Experience",
            text: "Minimum 1 year of continuous skilled work (TEER 0, 1, 2, or 3).",
          },
          {
            label: "Language Proficiency",
            text: "CLB 7 or higher in English or French.",
          },
          {
            label: "Education",
            text: "ECA (Educational Credential Assessment) for foreign degrees.",
          },
          {
            label: "Points System",
            text: "Must meet the CRS cutoff in Express Entry draws.",
          },
        ],
        steps: [
          "Get ECA and Language Test",
          "Create Express Entry Profile",
          "Receive Invitation to Apply (ITA)",
          "Submit Final PR Application",
        ],
      },
      family: {
        title: "Spousal/Family Sponsorship",
        requirements: [
          {
            label: "Sponsor Eligibility",
            text: "Sponsor must be a Canadian Citizen or PR, 18+ years old.",
          },
          {
            label: "Financial Ability",
            text: "Must meet minimum income requirements (LICO) for parents.",
          },
          {
            label: "Relationship Proof",
            text: "Marriage certificate, photos, communications, etc.",
          },
          {
            label: "Undertaking",
            text: "Financial commitment for 3-20 years.",
          },
        ],
        steps: [
          "Prepare Sponsorship Application",
          "Applicant Prepares PR Forms",
          "Submit Together to IRCC",
          "Medical & Background Checks",
        ],
      },
    },
    flagGradient:
      "linear-gradient(90deg, #ff0000 0%, #ff0000 30%, #ffffff 30%, #ffffff 70%, #ff0000 70%, #ff0000 100%)",
    content: [
      "Canada blends vibrant cities like Toronto and Vancouver with breathtaking mountains, lakes, and forests. Its clean, safe, and modern communities offer an exceptional quality of life. Experience a rich multicultural lifestyle, stunning natural beauty, and world-class public amenities. Whether you study, work, or settle, Canada provides endless opportunities to build a bright future.",
    ],
    images: [
      "/canada_images/beaver_canada.webp",
      "/canada_images/canada fox.webp",
      "/canada_images/canada scenes.webp",
      "/canada_images/canada wild.webp",
      "/canada_images/canada_flag.webp",
      "/canada_images/canada_snow.webp",
      "/canada_images/canda flagg.webp",
      "/canada_images/niagara fall.webp",
      "/canada_images/toronnto skyline.webp",
    ],
  },
  usa: {
    title: "USA",
    accentColor: "#0a3161",
    ctaText:
      "Whether you're pursuing the American Dream through an H-1B, student visa, or green card, our experts are here to navigate US immigration laws for you.",
    whyChoose: {
      titleStart: "Why choose ",
      titleHighlight: "USA?",
      accentColor: "#0a3161",
      paragraphs: [
        "The United States is a global destination for individuals seeking world-class education, career advancement, and exciting opportunities for personal growth. Home to prestigious universities, cutting-edge innovation, and one of the world's largest economies, the USA attracts students, skilled professionals, entrepreneurs, and families from around the globe. Its diverse culture, dynamic cities, and thriving industries provide an ideal environment to build a successful future.",
        "Whether your goal is to study, work, or explore long-term opportunities, the United States offers multiple immigration and visa pathways to help achieve your ambitions. With strong demand across technology, healthcare, engineering, finance, business, and research sectors, the USA continues to offer exceptional career prospects. Combined with globally recognized qualifications, a culture of innovation, and unmatched professional opportunities, the United States remains one of the world's most sought-after destinations for ambitious individuals.",
      ],
      cards: [
        {
          title: "Global Innovation Hub",
          description: "Unmatched opportunities in technology, finance, and entrepreneurship.",
          icon: "economy",
        },
        {
          title: "Premier Education",
          description:
            "Home to the majority of the world's top-ranking universities and research facilities.",
          icon: "education",
        },
        {
          title: "High Quality of Life",
          description:
            "Excellent infrastructure, modern amenities, and world-class healthcare systems.",
          icon: "lifestyle",
        },
        {
          title: "Cultural Melting Pot",
          description:
            "A vibrant, multicultural society welcoming dreamers from every corner of the globe.",
          icon: "community",
        },
      ],
    },
    pathways: {
      student: {
        title: "F-1 Student Visa",
        requirements: [
          {
            label: "Academics",
            text: "Acceptance from a SEVP-approved school (Form I-20).",
          },
          {
            label: "Language Proficiency",
            text: "TOEFL, IELTS, or Duolingo as required by the university.",
          },
          {
            label: "Financials",
            text: "Proof of funds to cover the first year of study and living costs.",
          },
          {
            label: "Intent",
            text: "Must demonstrate strong ties to home country (non-immigrant intent).",
          },
        ],
        steps: [
          "Receive Form I-20",
          "Pay SEVIS Fee",
          "Complete DS-160 Form",
          "Attend Visa Interview",
        ],
      },
      tourist: {
        title: "B1/B2 Visitor Visa",
        requirements: [
          {
            label: "Valid Passport",
            text: "Valid for at least 6 months beyond period of stay.",
          },
          {
            label: "Proof of Funds",
            text: "Ability to cover expenses during the US trip.",
          },
          {
            label: "Ties to Home",
            text: "Proof of employment, property, or family in home country.",
          },
          {
            label: "Purpose",
            text: "Business meetings, tourism, or visiting family.",
          },
        ],
        steps: [
          "Complete DS-160 Form",
          "Pay Visa Fee",
          "Schedule Biometrics & Interview",
          "Attend Consular Interview",
        ],
      },
      pr: {
        title: "Employment-Based Green Card",
        requirements: [
          {
            label: "Job Offer",
            text: "A valid job offer from a US employer (EB-2, EB-3).",
          },
          {
            label: "Labor Certification",
            text: "PERM approval demonstrating no US worker is available.",
          },
          {
            label: "Qualifications",
            text: "Relevant degree or extraordinary ability (EB-1).",
          },
          {
            label: "Priority Date",
            text: "Must wait for visa bulletin priority date to become current.",
          },
        ],
        steps: [
          "Employer Files PERM (if needed)",
          "Employer Files I-140 Petition",
          "Wait for Priority Date",
          "File I-485 for Adjustment of Status",
        ],
      },
      family: {
        title: "Family-Based Green Card",
        requirements: [
          {
            label: "Sponsor",
            text: "Sponsor must be a US Citizen or Green Card holder.",
          },
          {
            label: "Relationship",
            text: "Immediate relative (spouse, unmarried child, or parent).",
          },
          {
            label: "Financial Support",
            text: "Affidavit of Support (Form I-864) meeting income guidelines.",
          },
          {
            label: "Background",
            text: "Clean criminal record and medical clearance.",
          },
        ],
        steps: [
          "Sponsor Files I-130 Petition",
          "USCIS Approves Petition",
          "NVC Processing & Fees",
          "Consular Interview or Adjustment",
        ],
      },
    },
    flagGradient:
      "linear-gradient(90deg, #b31942 0%, #b31942 33%, #ffffff 33%, #ffffff 66%, #0a3161 66%, #0a3161 100%)",
    content: [
      "The USA stands as the world's most powerful nation and a global economic leader, offering unmatched opportunities in education, innovation, business, and career growth. From breathtaking natural landscapes to world-class infrastructure and a vibrant multicultural society, it welcomes dreamers from every corner of the globe. Learning from the best inspires excellence, making the USA an ideal destination for study, work, tourism, or a brighter future filled with limitless possibilities.",
    ],
    images: [
      "/usa_images/andy-feliciotti-isg8AL7-6uk-unsplash.webp",
      "/usa_images/brandon-mowinkel-DF1hKdVsn_c-unsplash.webp",
      "/usa_images/chris-robert-1MkR9ehe9Fg-unsplash.webp",
      "/usa_images/dyana-wing-so-Og16Foo-pd8-unsplash.webp",
      "/usa_images/greg-johnson-oyxebE3Z71U-unsplash.webp",
      "/usa_images/josie-weiss-axci3Ep1Shs-unsplash.webp",
      "/usa_images/jp-valery-e7Vx3yXDxoM-unsplash.webp",
      "/usa_images/mike-chavarri-kZokA2VTKn4-unsplash.webp",
      "/usa_images/nathan-defiesta-hzc5cxRicFI-unsplash.webp",
    ],
  },
  australia: {
    title: "AUSTRALIA",
    accentColor: "#FFCD00",
    ctaText:
      "Ready to say G'day to a new life? Let our registered migration agents guide you through Australia's points-based visa system with ease.",
    whyChoose: {
      titleStart: "Why choose ",
      titleHighlight: "Australia?",
      accentColor: "#FFE205",
      paragraphs: [
        "Australia is one of the world's most desirable destinations for international students, skilled professionals, and families seeking a high quality of life. Renowned for its globally ranked universities, thriving economy, modern cities, and stunning natural landscapes, Australia offers exceptional opportunities for education, career growth, and long-term success. Its welcoming multicultural society, safe environment, and excellent healthcare system make it an ideal place to live, study, and work.",
        "Whether you aspire to study, build your career, or settle permanently, Australia provides a range of immigration pathways to support your goals. Skilled migration programs, employer-sponsored visas, student visas, and permanent residency options make it an attractive destination for qualified applicants. With growing opportunities across healthcare, engineering, information technology, construction, finance, and skilled trades, Australia continues to be a leading choice for those seeking a prosperous and fulfilling future.",
      ],
      cards: [
        {
          title: "High Standard of Living",
          description: "Ranked among the top nations globally for quality of life and happiness.",
          icon: "lifestyle",
        },
        {
          title: "Excellent Healthcare",
          description: "Medicare provides access to some of the best medical care in the world.",
          icon: "healthcare",
        },
        {
          title: "Thriving Job Market",
          description: "Robust economy offering high wages and diverse employment opportunities.",
          icon: "economy",
        },
        {
          title: "Stunning Landscapes",
          description: "From the Outback to beautiful beaches, enjoy unparalleled natural beauty.",
          icon: "community",
        },
      ],
    },
    pathways: {
      student: {
        title: "Student Visa (Subclass 500)",
        requirements: [
          {
            label: "Academics",
            text: "Confirmation of Enrolment (CoE) from an Australian institution.",
          },
          {
            label: "Language Proficiency",
            text: "IELTS, PTE, or TOEFL meeting course requirements.",
          },
          {
            label: "GTE",
            text: "Genuine Temporary Entrant requirement statement.",
          },
          {
            label: "Health Insurance",
            text: "Overseas Student Health Cover (OSHC).",
          },
        ],
        steps: [
          "Obtain CoE & OSHC",
          "Write GTE Statement",
          "Lodge Visa Application Online",
          "Biometrics & Health Exam",
        ],
      },
      tourist: {
        title: "Visitor Visa (Subclass 600)",
        requirements: [
          {
            label: "Valid Passport",
            text: "Must be valid for the duration of the stay.",
          },
          {
            label: "Financials",
            text: "Bank statements showing sufficient funds.",
          },
          {
            label: "Ties to Home",
            text: "Employment letter, property, or family ties.",
          },
          {
            label: "Health & Character",
            text: "Must meet health and character requirements.",
          },
        ],
        steps: [
          "Gather Documents",
          "Submit Application via ImmiAccount",
          "Provide Biometrics (if requested)",
          "Wait for Visa Grant",
        ],
      },
      pr: {
        title: "Skilled Independent Visa (189/190)",
        requirements: [
          {
            label: "Occupation",
            text: "Job must be on the relevant skilled occupation list.",
          },
          {
            label: "Skills Assessment",
            text: "Positive skills assessment from relevant authority.",
          },
          {
            label: "Points Test",
            text: "Minimum 65 points on the skilled migration points test.",
          },
          {
            label: "Language",
            text: "Competent English (IELTS 6.0 in each band) or higher.",
          },
        ],
        steps: [
          "Get Skills Assessment & English Test",
          "Submit Expression of Interest (EOI)",
          "Receive Invitation to Apply",
          "Lodge Final Visa Application",
        ],
      },
      family: {
        title: "Partner Visa (820/801)",
        requirements: [
          {
            label: "Sponsor",
            text: "Sponsor must be an Australian Citizen or Permanent Resident.",
          },
          {
            label: "Relationship",
            text: "Married or de facto relationship for at least 12 months.",
          },
          {
            label: "Evidence",
            text: "Proof of shared financial, social, and living arrangements.",
          },
          {
            label: "Health & Character",
            text: "Police checks and medical examinations.",
          },
        ],
        steps: [
          "Compile Extensive Relationship Evidence",
          "Lodge Temporary Partner Visa",
          "Wait for Initial Processing",
          "Lodge Permanent Stage (after 2 years)",
        ],
      },
    },
    flagGradient:
      "linear-gradient(90deg, #00008b 0%, #00008b 33%, #ffffff 33%, #ffffff 66%, #ff0000 66%, #ff0000 100%)",
    content: [
      "Australia has become the first choice for ambitious students and global talent, offering a perfect blend of world-class education, rewarding career opportunities, and an outstanding quality of life. Surrounded by breathtaking coastlines, vibrant cities, and welcoming communities, it provides a safe, multicultural environment where dreams can flourish. Whether you're pursuing higher education, professional growth, skilled migration, or unforgettable adventures, Australia opens the door to a future filled with endless possibilities.",
    ],
    images: [
      "/australia_images/claudette-wicks-Afs-F8pRIeE-unsplash.webp",
      "/australia_images/dan-freeman-7Zb7kUyQg1E-unsplash.webp",
      "/australia_images/hc-digital-kcoo0UtvoeA-unsplash.webp",
      "/australia_images/johnny-bhalla-2K1bUZz1HLI-unsplash.webp",
      "/australia_images/pexels-jjstudio-31398270.webp",
      "/australia_images/pexels-luis-la-79784941-8858270.webp",
      "/australia_images/pexels-waltc-20293107.webp",
    ],
  },
  europe: {
    title: "EUROPE",
    accentColor: "#003399",
    ctaText:
      "Unlock border-free travel and world-class opportunities. We specialize in Schengen visas, EU Blue Cards, and European residency pathways.",
    whyChoose: {
      titleStart: "Why choose ",
      titleHighlight: "Europe?",
      accentColor: "#003399",
      paragraphs: [
        "Europe offers a unique blend of world-class education, rich cultural heritage, and diverse career opportunities across some of the world's most developed nations. From globally recognized universities and innovative research institutions to thriving business hubs and historic cities, Europe provides an inspiring environment for students, professionals, entrepreneurs, and families. With excellent public infrastructure, high living standards, and access to multiple countries within the region, Europe is an ideal destination for those seeking international exposure and long-term growth.",
        "Whether you plan to study, work, invest, or relocate, Europe provides a wide range of visa and immigration opportunities tailored to different aspirations. Many European countries offer pathways for skilled professionals, international graduates, entrepreneurs, and family reunification, making relocation more accessible for eligible applicants. Combined with strong economies, outstanding healthcare, career prospects across technology, engineering, healthcare, hospitality, and finance, Europe remains one of the world's most attractive destinations for building a successful global future.",
      ],
      cards: [
        {
          title: "Border-Free Travel",
          description: "Explore dozens of beautiful countries seamlessly within the Schengen area.",
          icon: "lifestyle",
        },
        {
          title: "Rich Cultural Heritage",
          description:
            "Experience centuries of history, art, and diverse cultures right at your doorstep.",
          icon: "community",
        },
        {
          title: "Affordable Education",
          description:
            "Access world-renowned universities with very low or even free tuition fees.",
          icon: "education",
        },
        {
          title: "Advanced Healthcare",
          description:
            "Benefit from universal healthcare systems that prioritize citizen well-being.",
          icon: "healthcare",
        },
      ],
    },
    pathways: {
      student: {
        title: "Schengen/National Student Visa",
        requirements: [
          {
            label: "Academics",
            text: "Acceptance letter from a recognized European university.",
          },
          {
            label: "Language Proficiency",
            text: "IELTS or local language certification (e.g., Goethe-Zertifikat).",
          },
          {
            label: "Financials",
            text: "Blocked account (Germany) or bank statements.",
          },
          {
            label: "Insurance",
            text: "Valid health insurance covering the entire stay.",
          },
        ],
        steps: [
          "Secure University Admission",
          "Arrange Finances/Blocked Account",
          "Book Embassy Appointment",
          "Submit Documents & Interview",
        ],
      },
      tourist: {
        title: "Schengen Visa",
        requirements: [
          {
            label: "Valid Passport",
            text: "Valid for at least 3 months beyond departure date.",
          },
          {
            label: "Itinerary",
            text: "Confirmed flight reservations and hotel bookings.",
          },
          {
            label: "Financials",
            text: "Bank statements from the last 3-6 months.",
          },
          {
            label: "Insurance",
            text: "Travel insurance with minimum coverage of €30,000.",
          },
        ],
        steps: [
          "Determine Primary Destination",
          "Gather Schengen Required Docs",
          "Book VFS/Embassy Appointment",
          "Provide Biometrics & Submit",
        ],
      },
      pr: {
        title: "EU Blue Card / National PR",
        requirements: [
          {
            label: "Job Offer",
            text: "Binding job offer meeting the minimum salary threshold.",
          },
          {
            label: "Qualifications",
            text: "Recognized university degree.",
          },
          {
            label: "Language",
            text: "Basic to intermediate local language skills (often expedites PR).",
          },
          {
            label: "Residency",
            text: "Usually requires 3-5 years of continuous legal residence.",
          },
        ],
        steps: [
          "Secure Highly Qualified Job Offer",
          "Apply for EU Blue Card",
          "Work and Reside Legally",
          "Apply for Settlement Permit / PR",
        ],
      },
      family: {
        title: "Family Reunification Visa",
        requirements: [
          {
            label: "Sponsor",
            text: "Must hold a valid residence permit or EU Blue Card.",
          },
          {
            label: "Accommodation",
            text: "Proof of sufficient living space for the family.",
          },
          {
            label: "Financials",
            text: "Proof of income to support the joining family members.",
          },
          {
            label: "Language",
            text: "Spouses may need basic A1 language skills depending on country.",
          },
        ],
        steps: [
          "Sponsor Prepares Housing/Income Proof",
          "Applicant Books Embassy Appointment",
          "Submit Marriage/Birth Certificates",
          "Wait for Verification and Visa",
        ],
      },
    },
    servedCountries: [
      {
        name: "Cyprus",
        code: "cy",
      },
      {
        name: "Finland",
        code: "fi",
      },
      {
        name: "France",
        code: "fr",
      },
      {
        name: "Germany",
        code: "de",
      },
      {
        name: "Ireland",
        code: "ie",
      },
      {
        name: "Italy",
        code: "it",
      },
      {
        name: "Malta",
        code: "mt",
      },
      {
        name: "Netherlands",
        code: "nl",
      },
      {
        name: "Poland",
        code: "pl",
      },
      {
        name: "Portugal",
        code: "pt",
      },
      {
        name: "Spain",
        code: "es",
      },
      {
        name: "Sweden",
        code: "se",
      },
    ],
    flagGradient:
      "linear-gradient(90deg, #003399 0%, #003399 33%, #ffcc00 33%, #ffcc00 66%, #003399 66%, #003399 100%)",
    content: [
      "Imagine a place where every journey leads to new opportunities and every day offers a better quality of life. Europe welcomes you with its clean environment, affordable living, rich cultural heritage, world-renowned education, advanced healthcare, and thriving career opportunities. From picturesque landscapes to vibrant cities connected across borders, Europe is the perfect destination to study, work, travel, or build a future where comfort, growth, and unforgettable experiences come together.",
    ],
    images: [
      "/europe_images/anthony-choren-lYzap0eubDY-unsplash.webp",
      "/europe_images/antoine-schibler-KF3Ty-K6NVA-unsplash.webp",
      "/europe_images/belov-sergey-yJmmLsjKkq0-unsplash.webp",
      "/europe_images/christian-lue-8Yw6tsB8tnc-unsplash.webp",
      "/europe_images/david-kohler-VFRTXGw1VjU-unsplash.webp",
      "/europe_images/jorg-angeli-S56zN8cV5fk-unsplash.webp",
      "/europe_images/maheshkumar-painam-HF-lFqdOMF8-unsplash.webp",
      "/europe_images/marcin-nowak-iXqTqC-f6jI-unsplash.webp",
      "/europe_images/marius-serban-iFtuhgn7fYs-unsplash.webp",
    ],
  },
  nz: {
    title: "NEW ZEALAND",
    accentColor: "#cc142b",
    ctaText:
      "Experience the ultimate work-life balance. Our specialists will simplify your New Zealand visa application from start to finish.",
    whyChoose: {
      titleStart: "Why choose ",
      titleHighlight: "New Zealand?",
      accentColor: "#cc142b",
      paragraphs: [
        "New Zealand combines exceptional career opportunities with a relaxed lifestyle, making it a preferred destination for people looking to start a new chapter abroad. Famous for its breathtaking landscapes, innovative education system, and close-knit communities, the country offers an environment where individuals and families can thrive. Its clean cities, low crime rates, modern infrastructure, and strong focus on work-life balance create an unmatched quality of life.",
        "From internationally respected qualifications to rewarding employment prospects, New Zealand provides numerous pathways for those wishing to live, study, or work overseas. Visa options for students, skilled professionals, entrepreneurs, and families are designed to support long-term settlement and career development. Backed by a stable economy and opportunities in healthcare, information technology, engineering, agriculture, tourism, and construction, New Zealand is an excellent destination for building a secure and fulfilling future.",
      ],
      cards: [
        {
          title: "Unmatched Safety",
          description:
            "Consistently ranked as one of the safest and most peaceful nations globally.",
          icon: "healthcare",
        },
        {
          title: "Work-Life Balance",
          description:
            "A culture that highly values personal time, family, and outdoor adventures.",
          icon: "lifestyle",
        },
        {
          title: "Exceptional Education",
          description:
            "World-class universities focused on practical, hands-on learning experiences.",
          icon: "education",
        },
        {
          title: "Welcoming Society",
          description:
            "A friendly, honest, and multicultural community ready to embrace newcomers.",
          icon: "community",
        },
      ],
    },
    pathways: {
      student: {
        title: "Fee Paying Student Visa",
        requirements: [
          {
            label: "Academics",
            text: "Offer of place from a New Zealand education provider.",
          },
          {
            label: "Financials",
            text: "Proof of funds for tuition and living expenses (NZD $20,000/year).",
          },
          {
            label: "Intent",
            text: "Genuine intent to study.",
          },
          {
            label: "Insurance",
            text: "Approved medical and travel insurance.",
          },
        ],
        steps: [
          "Get Offer of Place",
          "Prepare Financial Documents",
          "Apply Online via INZ",
          "Pay Tuition & Send Receipt to INZ",
        ],
      },
      tourist: {
        title: "Visitor Visa",
        requirements: [
          {
            label: "Valid Passport",
            text: "Valid for at least 3 months beyond departure date.",
          },
          {
            label: "Proof of Funds",
            text: "At least NZD $1,000 per month of stay.",
          },
          {
            label: "Onward Travel",
            text: "Proof of onward ticket or funds to buy one.",
          },
          {
            label: "Health & Character",
            text: "May require medical certificate for longer stays.",
          },
        ],
        steps: [
          "Check NZeTA vs Visitor Visa",
          "Gather Evidence of Ties/Funds",
          "Submit Application Online",
          "Provide Passport/Biometrics if asked",
        ],
      },
      pr: {
        title: "Skilled Migrant Category (SMC)",
        requirements: [
          {
            label: "Points System",
            text: "Must claim at least 6 points under the new simplified system.",
          },
          {
            label: "Job Offer",
            text: "Must have a skilled job or job offer in NZ.",
          },
          {
            label: "Language",
            text: "IELTS 6.5 or equivalent.",
          },
          {
            label: "Age & Health",
            text: "Under 55 years of age, good health, and character.",
          },
        ],
        steps: [
          "Calculate SMC Points",
          "Submit Expression of Interest (EOI)",
          "Receive Invitation to Apply",
          "Lodge Resident Visa Application",
        ],
      },
      family: {
        title: "Partnership Visa",
        requirements: [
          {
            label: "Sponsor",
            text: "Sponsor must be a NZ Citizen or Resident.",
          },
          {
            label: "Relationship",
            text: "Must be living together in a genuine, stable relationship.",
          },
          {
            label: "Evidence",
            text: "Joint bank accounts, tenancy agreements, photos.",
          },
          {
            label: "Character",
            text: "Sponsor must meet character requirements for partnership.",
          },
        ],
        steps: [
          "Collect Partnership Evidence",
          "Sponsor Completes Sponsorship Form",
          "Applicant Submits Visa Form",
          "Wait for INZ Assessment",
        ],
      },
    },
    flagGradient:
      "linear-gradient(90deg, #00247d 0%, #00247d 33%, #cc142b 33%, #cc142b 66%, #ffffff 66%, #ffffff 100%)",
    content: [
      "Often described as the country of dreams, New Zealand is where breathtaking natural beauty meets exceptional quality of life. Renowned as one of the world's safest and most honest nations, it offers welcoming communities, a peaceful environment, and abundant opportunities for education, career growth, and settlement. Whether you aspire to study, work, or build a future abroad, New Zealand provides the perfect foundation to turn your ambitions into lasting success.",
    ],
    images: [
      "/new_zealand/josh-tere-XKuBz6ScRMM-unsplash.webp",
      "/new_zealand/kerin-gedge-yzIpBt-1t5g-unsplash.webp",
      "/new_zealand/match-sumaya-On-ayJ6MaDg-unsplash.webp",
      "/new_zealand/nate-watson-seglXGOthDc-unsplash.webp",
      "/new_zealand/national-library-of-australia-7oOVRSZjXL4-unsplash.webp",
      "/new_zealand/pexels-aneta-hartmannova-1229126-2336920.webp",
      "/new_zealand/pexels-franki-frank-16147352.webp",
      "/new_zealand/pexels-petra-reid-419907087-37562114.webp",
      "/new_zealand/sulthan-auliya-Pbwdi8KvDn8-unsplash.webp",
    ],
  },
  uae: {
    title: "UAE",
    accentColor: "#00732f",
    ctaText:
      "Fast-track your career in Dubai or Abu Dhabi. We provide seamless assistance for UAE Golden Visas, work permits, and investor residencies.",
    whyChoose: {
      titleStart: "Why choose ",
      titleHighlight: "UAE?",
      accentColor: "#00732f",
      paragraphs: [
        "The United Arab Emirates has emerged as one of the world's leading destinations for professionals, entrepreneurs, students, and investors seeking international opportunities. Known for its modern skyline, world-class infrastructure, tax-friendly environment, and rapidly growing economy, the UAE offers an exceptional standard of living. With its strategic location, multicultural society, and business-friendly policies, the country provides an ideal gateway to global careers and commercial success.",
        "Whether you plan to work, study, establish a business, or relocate with your family, the UAE offers a variety of visa options to suit different goals. Employment visas, student visas, investor visas, and long-term residency programs make it easier for eligible individuals to build their future in the Emirates. Supported by thriving sectors such as technology, finance, healthcare, hospitality, construction, and aviation, the UAE continues to attract ambitious individuals looking for growth, stability, and international exposure.",
      ],
      cards: [
        {
          title: "Tax-Free Income",
          description:
            "Keep 100% of your earnings with highly competitive, tax-free salary packages.",
          icon: "economy",
        },
        {
          title: "Futuristic Infrastructure",
          description:
            "Experience world-class amenities, smart cities, and cutting-edge transportation.",
          icon: "lifestyle",
        },
        {
          title: "Global Business Hub",
          description:
            "Unmatched opportunities for networking, entrepreneurship, and career growth.",
          icon: "community",
        },
        {
          title: "Safety & Security",
          description:
            "Ranked among the safest countries in the world with incredibly low crime rates.",
          icon: "healthcare",
        },
      ],
    },
    pathways: {
      student: {
        title: "Student Visa",
        requirements: [
          {
            label: "Academics",
            text: "Admission letter from a UAE university/college.",
          },
          {
            label: "Sponsorship",
            text: "University usually acts as the visa sponsor.",
          },
          {
            label: "Medical Fitness",
            text: "Must pass a UAE medical fitness test.",
          },
          {
            label: "Financials",
            text: "Proof of paid tuition fees or financial ability.",
          },
        ],
        steps: [
          "Enroll in UAE Institution",
          "University Initiates Visa Process",
          "Arrive on Entry Permit",
          "Complete Medical & Emirates ID",
        ],
      },
      tourist: {
        title: "Tourist / Visit Visa",
        requirements: [
          {
            label: "Valid Passport",
            text: "Must have at least 6 months validity.",
          },
          {
            label: "Sponsor",
            text: "Airlines, hotels, or UAE-based travel agencies can sponsor.",
          },
          {
            label: "Photos",
            text: "Recent passport-sized photographs.",
          },
          {
            label: "Financials",
            text: "Bank statements may be requested for certain nationalities.",
          },
        ],
        steps: [
          "Select Visa Duration (30 or 60 days)",
          "Apply through Airline or Agency",
          "Pay Visa Fee",
          "Receive E-Visa via Email",
        ],
      },
      pr: {
        title: "Golden Visa / Employment Visa",
        requirements: [
          {
            label: "Employment",
            text: "Standard residency requires a UAE employer sponsor.",
          },
          {
            label: "Golden Visa",
            text: "For investors, entrepreneurs, specialized talents, or outstanding students.",
          },
          {
            label: "Salary/Investment",
            text: "Specific thresholds for Golden Visa (e.g., AED 30K+ salary or AED 2M property).",
          },
          {
            label: "Medical",
            text: "Must pass local health screening.",
          },
        ],
        steps: [
          "Secure Employment or Qualify for Golden Visa",
          "Apply for Entry Permit",
          "Undergo Medical Typing & Exam",
          "Stamp Visa & Collect Emirates ID",
        ],
      },
      family: {
        title: "Dependent Visa",
        requirements: [
          {
            label: "Sponsor Income",
            text: "Sponsor must earn a minimum salary (e.g., AED 4,000/month or AED 3,000 + accommodation).",
          },
          {
            label: "Relationship",
            text: "Attested marriage/birth certificates.",
          },
          {
            label: "Housing",
            text: "Registered tenancy contract (Ejari in Dubai).",
          },
          {
            label: "Medical",
            text: "Dependents over 18 must pass medical fitness.",
          },
        ],
        steps: [
          "Attest Relationship Certificates",
          "Apply for Entry Permit for Family",
          "Complete Family Medical Exams",
          "Process Emirates ID & Visa Stamping",
        ],
      },
    },
    flagGradient:
      "linear-gradient(90deg, #00732f 0%, #00732f 33%, #ffffff 33%, #ffffff 66%, #000000 66%, #000000 100%)",
    content: [
      "Where ambition meets opportunity, the UAE has transformed into a global destination for success, innovation, and an exceptional quality of life. Home to futuristic cities, world-class infrastructure, breathtaking desert landscapes, and a thriving multicultural community, it offers unmatched opportunities for professionals, students, entrepreneurs, and travelers alike. Whether you seek career growth, higher education, business expansion, or unforgettable experiences, the UAE is where dreams find the perfect destination.",
    ],
    images: [
      "/uae_images/fredrik-ohlander-fCW1hWq2nq0-unsplash.webp",
      "/uae_images/haris-khan-DkTPvE8ab50-unsplash.webp",
      "/uae_images/hongbin-1UF8ddEalwk-unsplash.webp",
      "/uae_images/ling-tang-XHLKlSppBvk-unsplash.webp",
      "/uae_images/popup-agency-jJtqDVzozQY-unsplash.webp",
      "/uae_images/riyas-mohammed-A05bIhiry4o-unsplash.webp",
      "/uae_images/saj-shafique-de7Zqg3j3FI-unsplash.webp",
      "/uae_images/saj-shafique-tS5TKo8Mr7k-unsplash.webp",
      "/uae_images/wael-hneini-QJKEa9n3yN8-unsplash.webp",
    ],
  },
  uk: {
    title: "UNITED KINGDOM",
    accentColor: "#012169",
    ctaText:
      "Discover a land of rich history and modern opportunity. Let our experts guide your UK visa journey.",
    whyChoose: {
      titleStart: "Why choose ",
      titleHighlight: "the UK?",
      accentColor: "#012169",
      paragraphs: [
        "The United Kingdom is a global leader in education, finance, and culture. Home to some of the world's oldest and most prestigious universities, it attracts top talent from across the globe. With a rich history seamlessly blending into modern, cosmopolitan cities, the UK offers an unparalleled lifestyle. Its strong economy, universal healthcare (NHS), and central location make it a highly desirable destination for students, professionals, and families.",
        "Whether you are looking to study in world-class institutions, advance your career in a dynamic job market, or settle with your family, the UK offers well-structured immigration pathways. From the Skilled Worker route to the Graduate Visa, the UK provides clear avenues for international growth. Opportunities abound in technology, healthcare, finance, engineering, and the creative industries, ensuring a promising future for skilled migrants.",
      ],
      cards: [
        {
          title: "Elite Education",
          description: "Home to globally renowned institutions and diverse academic excellence.",
          icon: "education",
        },
        {
          title: "Dynamic Economy",
          description: "A major hub for finance, technology, and global business operations.",
          icon: "economy",
        },
        {
          title: "Free Healthcare",
          description:
            "Access to the comprehensive and world-renowned National Health Service (NHS).",
          icon: "healthcare",
        },
        {
          title: "Rich Culture",
          description: "A perfect blend of historical heritage and modern, multicultural living.",
          icon: "community",
        },
      ],
    },
    pathways: {
      student: {
        title: "Tier 4 Student Visa",
        requirements: [
          {
            label: "Academics",
            text: "Confirmation of Acceptance for Studies (CAS) from a UK university.",
          },
          {
            label: "Language Proficiency",
            text: "Secure English Language Test (SELT) like IELTS.",
          },
          {
            label: "Financials",
            text: "Proof of funds to cover course fees and living costs.",
          },
          {
            label: "Surcharge",
            text: "Must pay the Immigration Health Surcharge (IHS).",
          },
        ],
        steps: [
          "Obtain CAS from University",
          "Prepare Financial Evidence",
          "Pay IHS and Application Fees",
          "Attend Biometrics Appointment",
        ],
      },
      tourist: {
        title: "Standard Visitor Visa",
        requirements: [
          {
            label: "Valid Passport",
            text: "Must be valid for the duration of your stay.",
          },
          {
            label: "Financials",
            text: "Proof of sufficient funds to support yourself.",
          },
          {
            label: "Ties to Home",
            text: "Evidence you will leave the UK at the end of your visit.",
          },
          {
            label: "Purpose",
            text: "Tourism, visiting family, or short-term business.",
          },
        ],
        steps: [
          "Complete Online Application",
          "Pay Visa Fee",
          "Book and Attend Biometrics",
          "Wait for Visa Decision",
        ],
      },
      pr: {
        title: "Skilled Worker Visa",
        requirements: [
          {
            label: "Job Offer",
            text: "A valid job offer from an approved UK employer.",
          },
          {
            label: "Sponsorship",
            text: "Certificate of Sponsorship (CoS) required.",
          },
          {
            label: "Skill & Salary",
            text: "Job must meet the skill level and minimum salary threshold.",
          },
          {
            label: "Language",
            text: "Proven knowledge of English.",
          },
        ],
        steps: [
          "Secure UK Job Offer",
          "Employer Issues CoS",
          "Submit Visa Application",
          "Route to ILR (Permanent Residency)",
        ],
      },
      family: {
        title: "Family Visa",
        requirements: [
          {
            label: "Sponsor",
            text: "Sponsor must be a British Citizen or have settled status.",
          },
          {
            label: "Relationship",
            text: "Must be a genuine partner, child, or parent.",
          },
          {
            label: "Financial Requirement",
            text: "Sponsor must meet strict minimum income thresholds.",
          },
          {
            label: "Language",
            text: "Proof of English language proficiency.",
          },
        ],
        steps: [
          "Gather Extensive Relationship Evidence",
          "Meet Financial Criteria",
          "Submit Application",
          "Biometrics and Processing",
        ],
      },
    },
    flagGradient:
      "linear-gradient(90deg, #012169 0%, #012169 33%, #ffffff 33%, #ffffff 66%, #C8102E 66%, #C8102E 100%)",
    content: [
      "The United Kingdom stands as a beacon of academic excellence and professional growth. Known for its lush countryside, historic landmarks, and vibrant cities, the UK offers a unique cultural tapestry. It provides a welcoming environment, robust infrastructure, and endless possibilities. Whether pursuing education, career advancement, or a new life, the UK opens doors to a future rich with opportunity and heritage.",
    ],
    images: [
      "/uk_images/chris-lawton-QPOaQ2Kp80c-unsplash.webp",
      "/uk_images/marcin-nowak-iXqTqC-f6jI-unsplash.webp",
      "/uk_images/mike-newbry-xccv7VJKEf8-unsplash.webp",
      "/uk_images/sabrina-mazzeo-g-krQzQo9mI-unsplash.webp",
      "/uk_images/sander-crombach-6b3r1WAjPBI-unsplash.webp",
    ],
  },
};

export default countryData;
