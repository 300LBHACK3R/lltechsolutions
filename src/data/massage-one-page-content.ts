/** Fictional demonstration content, replaced with approved client copy at launch. */
export const massageOnePage = {
  brand: "Soma Massage",
  headline: "A softer pace.",
  emphasis: "A little space.",
  introduction:
    "Step out of the everyday. Make time for a massage shaped around your comfort, your preferences and a moment of quiet.",
  photo: {
    src: "/images/collection/massage-room.webp",
    alt: "Illustrative massage room with warm natural light and neutral furnishings",
    width: 1536,
    height: 1024,
  },
  treatments: [
    {
      name: "Relaxation massage",
      description:
        "Unhurried, flowing massage for those moments when you want to slow down and switch off.",
    },
    {
      name: "Focused massage",
      description:
        "Time centred on the areas you would like to give more attention, with pressure discussed together.",
    },
    {
      name: "Extended massage",
      description:
        "A longer appointment with more room to settle in. Talk through your preferences before you begin.",
    },
  ],
} as const;
