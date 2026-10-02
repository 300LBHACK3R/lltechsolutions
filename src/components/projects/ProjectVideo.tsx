"use client";

import { useState } from "react";
import type { ProjectVideo as ProjectVideoData } from "@/data/project-videos";

export default function ProjectVideo({
  video,
  projectId,
  variant = "preview",
}: {
  video: ProjectVideoData;
  projectId: string;
  variant?: "preview" | "gallery";
}) {
  const [failed, setFailed] = useState(false);
  const captionId = `${projectId}-video-caption`;
  const isGallery = variant === "gallery";

  return (
    <figure
      className={`project-video${video.portrait ? " project-video-portrait" : ""}${isGallery ? " project-video-card" : ""}`}
    >
      {!isGallery && (
        <div className="project-video-heading">
          <span>{video.title}</span>
          <span>
            {video.durationLabel} · {video.hasAudio ? "Video preview" : "Silent preview"}
          </span>
        </div>
      )}
      <video
        controls
        playsInline
        preload="none"
        poster={video.poster}
        src={video.src}
        width={video.width}
        height={video.height}
        aria-label={video.title}
        aria-describedby={captionId}
        data-project-video
        onError={() => setFailed(true)}
        onPlay={(event) => {
          // A visitor can start one example without leaving another playing off screen.
          const active = event.currentTarget;
          document
            .querySelectorAll<HTMLVideoElement>("video[data-project-video]")
            .forEach((other) => {
              if (other !== active) other.pause();
            });
        }}
      >
        <track
          kind="descriptions"
          src={video.descriptionTrack}
          srcLang="en"
          label="Visual description"
        />
        {video.captionsTrack && (
          <track kind="captions" src={video.captionsTrack} srcLang="en" label="English captions" />
        )}
        Your browser does not support embedded video. Use the video link below.
      </video>
      <figcaption id={captionId}>
        {isGallery && (
          <>
            <div className="project-video-card-meta">
              {video.category && <span className="project-video-category">{video.category}</span>}
              <span>{video.durationLabel}</span>
            </div>
            <h3>{video.title}</h3>
          </>
        )}
        <p>{video.description}</p>
        <a href={video.src} className="text-link">
          Open video file ↗<span className="sr-only">: {video.title}</span>
        </a>
      </figcaption>
      {failed && (
        <p className="project-video-error" role="status">
          This browser couldn’t load the preview. Try the video file above, or explore the project
          details and live-site link below.
        </p>
      )}
    </figure>
  );
}
