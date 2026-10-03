import Link from "next/link";
import SignalArtwork from "@/components/ui/SignalArtwork";
import { type Project, projectPath, projects } from "@/data/projects";

export default function ProjectChannels({ project }: { project: Project }) {
  const channels = project.links?.filter((link) => link.kind !== "website") ?? [];
  const website = projects.find((item) => item.relatedWork?.projectId === project.id);

  return (
    <article className="project-channels signal-surface">
      <SignalArtwork className="surface-signals" />
      <div className="container project-channels-inner">
        <Link href="/projects" className="text-link">
          <span aria-hidden="true">←</span> Our clients
        </Link>
        <header>
          <p className="eyebrow">{project.relationship}</p>
          <h1>{website?.title ?? project.title}</h1>
          <p>{project.description}</p>
        </header>
        <ul className="project-channel-list" aria-label="Explore our client’s public channels">
          {channels.map((channel) => (
            <li key={channel.href}>
              <a href={channel.href} target="_blank" rel="noopener noreferrer">
                <span>
                  <strong>{channel.label}</strong>
                  <span className="project-channel-description">{channel.description}</span>
                </span>
                <span className="project-channel-arrow" aria-hidden="true">
                  ↗
                </span>
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </li>
          ))}
        </ul>
        {website && (
          <Link href={projectPath(website)} className="text-link project-channels-back">
            Explore the website project <span aria-hidden="true">→</span>
          </Link>
        )}
      </div>
    </article>
  );
}
