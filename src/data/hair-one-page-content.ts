/** Fictional demonstration content, replaced with supplied and approved salon content. */
export const hairOnePage = {
  brand: "JUNE HAIR",
  headline: "Good hair.",
  emphasis: "Good company.",
  introduction:
    "A fresh shape, a little colour, a moment for yourself. Thoughtful hairdressing with a relaxed, personal touch.",
  photo: {
    src: "/images/collection/hair-salon-detail.webp",
    alt: "Illustrative salon styling station with a chair and hairdressing tools in warm natural light",
    width: 1536,
    height: 1024,
  },
  services: [
    {
      name: "Cut & finish",
      detail: "Shape / movement / everyday ease",
      description:
        "From a familiar trim to a different shape, a cut considered around your hair and how you like to wear it.",
    },
    {
      name: "Colour refresh",
      detail: "Tone / dimension / a fresh start",
      description:
        "A conversation about your colour, the look you have in mind and the upkeep that works for you.",
    },
    {
      name: "Blow-dry & style",
      detail: "Polished / relaxed / ready to go",
      description:
        "A finished look for a special plan or an ordinary day, with a style that still feels like you.",
    },
  ],
  about: {
    headline: "A conversation before the cut.",
    description:
      "Welcome to JUNE, a neighbourhood hair studio built around the person in the chair. Bring your ideas, your questions and your everyday routine. We’ll talk through what you love about your hair and what you’d like to change.",
    signoff: "A fresh look. Still very much you.",
  },
} as const;
