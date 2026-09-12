import type { CollectionVideo } from "@/data/website-collection";

export default function CollectionMedia({
  video,
  title,
}: {
  video: CollectionVideo;
  title: string;
}) {
  return (
    <div className="collection-media">
      <video controls playsInline preload="none" poster={video.poster} aria-label={title}>
        <source src={video.src} type="video/mp4" />
        <track kind="captions" src={video.captions} srcLang="en" label="English" default />
        Your browser does not support this video. Read the transcript below.
      </video>
      <details>
        <summary>Read the video transcript</summary>
        <p>{video.transcript}</p>
      </details>
    </div>
  );
}
