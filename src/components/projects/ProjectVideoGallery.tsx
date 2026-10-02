import ProjectVideo from "@/components/projects/ProjectVideo";
import type { ProjectVideo as ProjectVideoData } from "@/data/project-videos";

export default function ProjectVideoGallery({
  videos,
  projectId,
}: {
  videos: readonly ProjectVideoData[];
  projectId: string;
}) {
  return (
    <ul className="project-video-gallery" aria-label="Content examples">
      {videos.map((video, index) => (
        <li key={video.src}>
          <ProjectVideo video={video} projectId={`${projectId}-${index + 1}`} variant="gallery" />
        </li>
      ))}
    </ul>
  );
}
