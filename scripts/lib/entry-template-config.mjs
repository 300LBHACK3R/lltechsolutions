export const entryTemplateDemos = {
  beauty: {
    id: "still",
    label: "Nails & Esthetics",
    project: "ll-beauty-template",
    folder: "beauty-demo",
    price: 399,
    routes: ["/", "/services", "/contact"],
    marker: 'data-beauty-demo="still"',
    navClass: "beauty-nav",
    components: ["BeautyTemplate", "BeautyCover"],
    data: ["beauty-pages", "beauty-content"],
    style: "beauty-template",
    assets: ["beauty-studio.webp", "beauty-detail.webp"],
  },
  "massage-one-page": {
    id: "massage-one-page",
    label: "One-page Massage",
    project: "ll-massage-one-page",
    folder: "massage-one-page-demo",
    price: 150,
    routes: ["/"],
    marker: 'data-massage-one-page-demo="massage-one-page"',
    navClass: "massage-one-nav",
    components: ["MassageOnePage", "MassageOnePageCover"],
    data: ["massage-one-page-content"],
    style: "massage-one-page",
    assets: ["massage-room.webp"],
  },
};

export function entryTemplateDemo(kind) {
  const demo = entryTemplateDemos[kind];
  if (!demo) throw new Error("Choose the beauty or massage-one-page demo.");
  return demo;
}
