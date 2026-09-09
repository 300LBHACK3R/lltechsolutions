/** Replace approved media in public/media/projects and update this one mapping.
 * See docs/REPLACING_PROJECT_VIDEOS.md. No publishing credentials belong here.
 */
export type ProjectVideo = {
  src: string;
  poster: string;
  title: string;
  description: string;
  descriptionTrack: string;
  captionsTrack?: string;
  hasAudio?: boolean;
  durationLabel: string;
  width: number;
  height: number;
  portrait?: boolean;
};
export const projectVideos = {
  "tow-n-go": {
    src: "/media/projects/tow-n-go-website.mp4",
    poster: "/media/projects/tow-n-go-website.webp",
    title: "Tow-N-Go website walkthrough",
    description:
      "A scroll preview of the homepage, fleet presentation, services and rental inquiry pathway, captured from the public website. Explore the monthly partnership below for an example of our social content.",
    descriptionTrack: "/media/projects/tow-n-go-website.vtt",
    durationLabel: "26 sec",
    width: 1280,
    height: 880,
    hasAudio: false,
  },
  crestline: {
    src: "/media/projects/crestline-website.mp4",
    poster: "/media/projects/crestline-website.webp",
    title: "Crestline website walkthrough",
    description:
      "A scroll preview of Crestline’s service presentation, company introduction, real project gallery and quote pathway, captured from the public website.",
    descriptionTrack: "/media/projects/crestline-website.vtt",
    durationLabel: "26 sec",
    width: 1280,
    height: 880,
    hasAudio: false,
  },
  "mckenzie-house": {
    src: "/media/projects/mckenzie-website.mp4",
    poster: "/media/projects/mckenzie-website.webp",
    title: "McKenzie House website walkthrough",
    description:
      "A scroll preview of the treatment-space imagery, service presentation, client information and ClinicSense booking pathway, captured from the public website.",
    descriptionTrack: "/media/projects/mckenzie-website.vtt",
    durationLabel: "26 sec",
    width: 1280,
    height: 880,
    hasAudio: false,
  },
  "tates-tv": {
    src: "/media/projects/tates-tv-interface.mp4",
    poster: "/media/projects/tates-tv-interface.webp",
    title: "Tate’s TV guide & controls",
    description:
      "A visual tour of the programme guide and on-screen remote, using captured application screens. This preview focuses on interface design; programme availability changes on the live application.",
    descriptionTrack: "/media/projects/tates-tv-interface.vtt",
    durationLabel: "16 sec",
    width: 1280,
    height: 880,
    hasAudio: false,
  },
  "tow-n-go-digital": {
    src: "/media/projects/tow-n-go-content.mp4",
    poster: "/media/projects/tow-n-go-content.webp",
    title: "Tow-N-Go social content",
    description:
      "A fleet education Reel from the monthly content partnership. On-screen labels introduce enclosed-trailer components before the branded booking message. Rental customers load their cargo; Tow-N-Go’s transport service hauls prepared loads.",
    descriptionTrack: "/media/projects/tow-n-go-content.vtt",
    durationLabel: "23 sec",
    width: 720,
    height: 1280,
    portrait: true,
    hasAudio: false,
  },
  "mckenzie-digital-launch": {
    src: "/media/projects/mckenzie-launch.mp4",
    poster: "/media/projects/mckenzie-launch.webp",
    title: "McKenzie House launch showcase",
    description:
      "A before-and-after showcase comparing the previous website with the custom green-and-cream design, treatment content and booking journey. This is a completed launch project.",
    descriptionTrack: "/media/projects/mckenzie-launch.vtt",
    durationLabel: "33 sec",
    width: 1280,
    height: 598,
    hasAudio: false,
  },
} satisfies Record<string, ProjectVideo>;
