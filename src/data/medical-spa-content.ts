export const medicalSpaContent = {
  brand: "Aurel Aesthetics",
  eyebrow: "A MORE CONSIDERED APPROACH TO AESTHETICS",
  headline: "Considered care.",
  emphasis: "Distinctly you.",
  introduction:
    "Space to ask. Time to consider. An individual approach to aesthetic care, beginning with a conversation about you.",
  image: "/images/collection/medical-spa-interior.webp",
  imageAlt:
    "Illustrative Aurel clinic interior with dark marble, champagne-gold details and a quiet reception area",
  detailImage: "/images/collection/medical-spa-detail.webp",
  detailImageAlt:
    "Illustrative still life of skincare vessels and folded linen on gold-veined dark marble",
  treatments: [
    {
      id: "skin",
      number: "01",
      name: "Skin & facial treatments",
      shortName: "Skin & facials",
      note: "Begin with your skin.",
      description:
        "A space to discuss your skin, your current routine and what you would like to explore. Your clinician can explain the available facial and skin-treatment options in the context of an individual assessment.",
      discussion:
        "Your current routine, sensitivities, previous treatments and the questions you would like answered.",
      nextStep:
        "Ask which treatments, if any, are appropriate for you, what each involves and how follow-up is arranged.",
    },
    {
      id: "injectables",
      number: "02",
      name: "Injectable consultations",
      shortName: "Injectables",
      note: "A conversation before a decision.",
      description:
        "Explore your questions about injectable treatments in a dedicated consultation. A qualified clinician would review your history, discuss your preferences and explain available options before any decision is made.",
      discussion:
        "Your preferences, relevant history and any previous aesthetic treatments, shared privately with your clinician.",
      nextStep:
        "Discuss suitability, alternatives, potential risks, expected costs and the option of choosing no treatment.",
    },
    {
      id: "light",
      number: "03",
      name: "Laser & light consultations",
      shortName: "Laser & light",
      note: "Clarity comes first.",
      description:
        "An introduction to the clinic’s laser and light-based services. The consultation is an opportunity to understand the equipment used, ask questions and discuss whether a service belongs in your care plan.",
      discussion:
        "Your area of interest, prior treatment experience and the practical questions that matter to you.",
      nextStep:
        "Request a clear explanation of suitability, preparation, risks, aftercare and any proposed course of appointments.",
    },
  ],
  consultationSteps: [
    {
      number: "01",
      title: "Tell us what brings you here.",
      description:
        "Start with your interests and questions. You do not need to know the name of a treatment or arrive with a decision already made.",
    },
    {
      number: "02",
      title: "Explore the details together.",
      description:
        "A clinician would review your history and explain suitable options, alternatives, limitations, costs and potential risks in a private appointment.",
    },
    {
      number: "03",
      title: "Take the time you need.",
      description:
        "Ask for written information, discuss follow-up and decide what feels right for you. A consultation is a conversation, without an obligation to proceed.",
    },
  ],
  questions: [
    {
      question: "Where should I begin?",
      answer:
        "Begin with a consultation enquiry. You can describe the area you are interested in and ask which appointment would be appropriate. You do not need to choose a treatment in advance.",
    },
    {
      question: "Can I book an appointment through this website?",
      answer:
        "This is a fictional clinic website demo. The example form demonstrates an enquiry experience in your browser; it does not send a message or reserve an appointment. A real clinic’s contact details and booking process would be added at launch.",
    },
    {
      question: "How do I know which treatment is suitable for me?",
      answer:
        "Suitability is assessed by an appropriately qualified clinician, based on your individual circumstances. A website or enquiry form cannot determine it. Your consultation should cover options, alternatives, limitations and potential risks.",
    },
    {
      question: "Where can I find treatment pricing?",
      answer:
        "A real clinic would provide its consultation fees and treatment pricing before you book or agree to proceed. This illustrative menu does not quote treatment prices. The website template price is for the website, not a clinical service.",
    },
    {
      question: "What should I bring to a consultation?",
      answer:
        "Bring your questions and any information requested directly by your clinician. Ask the clinic how to share personal health information securely before your visit; please do not enter it in this demo form.",
    },
    {
      question: "Can I discuss accessibility or appointment preferences?",
      answer:
        "Yes. A real clinic’s enquiry process can include questions about step-free access, communication preferences, a support person and appointment arrangements. Confirm the facilities and arrangements directly before visiting.",
    },
  ],
} as const;
