export const hairSalonContent = {
  brand: "LINE & FORM HAIR",
  image: "/images/collection/hair-salon-interior.webp",
  imageAlt: "Illustrative contemporary hair salon with clean styling stations and natural light",
  detailImage: "/images/collection/hair-salon-detail.webp",
  detailImageAlt:
    "Illustrative hair salon detail with professional styling tools and considered finishes",
  eyebrow: "CUT. COLOUR. CONFIDENCE.",
  headline: "Good hair.",
  emphasis: "Clear intention.",
  introduction:
    "Thoughtful cuts, considered colour and a finish that feels like you. A fresh perspective on your everyday hair.",
  categories: [
    {
      id: "cut",
      name: "Cut & style",
      short: "Shape",
      note: "A strong foundation.",
      description: "A clean shape, a considered change, or a fresh take on your signature cut.",
    },
    {
      id: "colour",
      name: "Colour",
      short: "Tone",
      note: "Dimension, your way.",
      description: "From subtle refinement to a new direction. Colour starts with a conversation.",
    },
    {
      id: "care",
      name: "Care & finish",
      short: "Finish",
      note: "The details count.",
      description: "A little extra care and a polished finish to bring the whole look together.",
    },
  ],
  services: [
    {
      id: "cut-finish",
      category: "cut",
      name: "Cut & finish",
      description: "Consultation, wash, tailored cut and style.",
      price: "$65",
      duration: "60 min",
    },
    {
      id: "clipper-cut",
      category: "cut",
      name: "Clipper cut",
      description: "A precise short cut with clean finishing details.",
      price: "$35",
      duration: "30 min",
    },
    {
      id: "blow-dry",
      category: "cut",
      name: "Wash & blow-dry",
      description: "A fresh wash and finish, styled your way.",
      price: "$40",
      duration: "45 min",
    },
    {
      id: "root-colour",
      category: "colour",
      name: "Root colour",
      description: "A colour refresh focused on regrowth.",
      price: "$95",
      duration: "90 min",
    },
    {
      id: "full-colour",
      category: "colour",
      name: "All-over colour",
      description: "A considered single-colour application.",
      price: "$130",
      duration: "120 min",
    },
    {
      id: "highlights",
      category: "colour",
      name: "Partial highlights",
      description: "Selected sections for light and dimension.",
      price: "$165",
      duration: "150 min",
    },
    {
      id: "balayage",
      category: "colour",
      name: "Balayage",
      description: "Softly placed colour with a natural-looking transition.",
      price: "$210",
      duration: "180 min",
    },
    {
      id: "conditioning",
      category: "care",
      name: "Conditioning add-on",
      description: "Additional conditioning within your hair appointment.",
      price: "$25",
      duration: "+15 min",
    },
    {
      id: "gloss",
      category: "care",
      name: "Gloss add-on",
      description: "A finishing colour service to refine tone and shine.",
      price: "$45",
      duration: "+30 min",
    },
  ],
  journey: [
    {
      title: "Talk it through",
      description:
        "Share your inspiration, your hair history and how you like to wear it day to day.",
    },
    {
      title: "Make a clear plan",
      description:
        "Agree on the service, the finish, the time and the price before the appointment begins.",
    },
    {
      title: "Take it with you",
      description:
        "Leave with practical styling guidance to help your look fit naturally into your routine.",
    },
  ],
  questions: [
    {
      question: "Not sure which service to choose?",
      answer:
        "Start with a consultation. Share a reference photo, your current hair colour and the result you have in mind. Your stylist can help you choose the appropriate appointment.",
    },
    {
      question: "Planning a significant colour change?",
      answer:
        "Mention previous colour services when you get in touch. Ask about a consultation, any required testing, the number of appointments and an individual quote before booking.",
    },
    {
      question: "How should I prepare for my visit?",
      answer:
        "Bring a few ideas and tell your stylist about your usual routine. Confirm any specific preparation, accessibility needs or product sensitivities directly with the salon in advance.",
    },
  ],
} as const;
