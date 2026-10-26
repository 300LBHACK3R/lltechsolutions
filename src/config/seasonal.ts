// Switch off after the Christmas season; the main brand and standalone demos stay intact.
export const christmasThemeEnabled = true;

// King James Version (public domain). Keep each quotation and reference together.
export const christmasScriptures = {
  light: {
    invitation: "A little light",
    text: "And the light shineth in darkness; and the darkness comprehended it not.",
    reference: "John 1:5",
  },
  work: {
    invitation: "Work with purpose",
    text: "Commit thy works unto the Lord, and thy thoughts shall be established.",
    reference: "Proverbs 16:3",
  },
  path: {
    invitation: "For the path ahead",
    text: "In all thy ways acknowledge him, and he shall direct thy paths.",
    reference: "Proverbs 3:6",
  },
  christmas: {
    invitation: "The heart of Christmas",
    text: "For unto you is born this day in the city of David a Saviour, which is Christ the Lord.",
    reference: "Luke 2:11",
  },
} as const;
