/** Replace approved media in public/media/projects and update this one mapping.
 * See docs/REPLACING_PROJECT_VIDEOS.md. No publishing credentials belong here.
 */
export type ProjectVideo = {
  src: string;
  poster: string;
  title: string;
  category?: string;
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
  "tow-n-go-halloween": {
    src: "/media/projects/tow-n-go-halloween-2026.mp4",
    poster: "/media/projects/tow-n-go-halloween-2026.jpg",
    title: "Less haunting. More hauling.",
    category: "Seasonal campaign",
    description:
      "Halloween creative built around Tow-N-Go’s trailer services, with a seasonal visual theme, edited transitions and a branded closing message.",
    descriptionTrack: "/media/projects/tow-n-go-halloween-2026.vtt",
    durationLabel: "52 sec",
    width: 720,
    height: 1280,
    portrait: true,
    hasAudio: true,
  },
  "tow-n-go-ready": {
    src: "/media/projects/tow-n-go-ready-for-whats-next.mp4",
    poster: "/media/projects/tow-n-go-ready-for-whats-next.jpg",
    title: "Ready for what’s next.",
    category: "Service promotion",
    description:
      "A short-form trailer-services promotion for Facebook and TikTok, bringing the service message and Tow-N-Go branding together in one vertical edit.",
    descriptionTrack: "/media/projects/tow-n-go-ready-for-whats-next.vtt",
    durationLabel: "33 sec",
    width: 720,
    height: 1280,
    portrait: true,
    hasAudio: true,
  },
  "tow-n-go-digital": {
    src: "/media/projects/tow-n-go-content.mp4",
    poster: "/media/projects/tow-n-go-content.webp",
    title: "Know your trailer.",
    category: "Fleet education",
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
