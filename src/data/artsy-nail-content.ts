export const artsyNailContent = {
  brand: "Chroma Nail Club",
  eyebrow: "GOOD NAILS. NO RULES.",
  headline: "Small canvas.",
  emphasis: "BIG ENERGY.",
  introduction:
    "Colour outside the lines. A nail studio for bold ideas, tiny details and whatever feels like you.",
  image: "/images/collection/nail-art-hands.webp",
  imageAlt: "Illustrative close-up of colourful sculptural nail art with cobalt and orange details",
  studioImage: "/images/collection/nail-art-studio.webp",
  studioImageAlt:
    "Illustrative creative nail studio with playful colours and carefully arranged manicure stations",
  services: [
    {
      id: "the-clean-set",
      name: "The clean set",
      label: "A FRESH START",
      note: "One colour. All you.",
      description:
        "A considered shape, cuticle tidy and a colour that feels right. Keep it sheer, take it bright or meet somewhere in the middle.",
      detail: "Discuss your preferred finish, removal needs and appointment length before booking.",
    },
    {
      id: "the-art-set",
      name: "The art set",
      label: "LET’S GET INTO IT",
      note: "Tiny canvas. Big ideas.",
      description:
        "Graphic lines, a little chrome, playful colour blocking. Bring your references and we’ll talk through a set that makes them your own.",
      detail:
        "Art is planned around the detail, time and finish you choose. Confirm your quote first.",
    },
    {
      id: "the-reset",
      name: "The reset",
      label: "A LITTLE TLC",
      note: "A moment between looks.",
      description:
        "Time for removal, reshaping or a simple refresh. Make space for your next idea with a service matched to your current set.",
      detail: "Tell us what is currently on your nails so we can discuss the right appointment.",
    },
  ],
  palettes: [
    {
      id: "cobalt",
      name: "Cobalt crush",
      caption: "Electric blue, creamy negative space and a very good curve.",
      colour: "#294ce6",
      accent: "#d0c1f6",
      base: "#fcf4df",
      finish: "Graphic waves / colour blocking",
    },
    {
      id: "citrus",
      name: "Citrus club",
      caption: "A little orange. A little pink. A full dose of sunny-side-up.",
      colour: "#ef6839",
      accent: "#f3bdd5",
      base: "#fff2bf",
      finish: "Playful dots / contrasting tips",
    },
    {
      id: "lilac",
      name: "Lilac hour",
      caption: "Soft lilac meets deep plum. Quiet colour with something to say.",
      colour: "#705498",
      accent: "#c8b7eb",
      base: "#f4e8e0",
      finish: "Tonal shapes / soft contrast",
    },
  ],
} as const;
