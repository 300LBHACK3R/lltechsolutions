import JsonLd from "@/components/seo/JsonLd";
import { absoluteUrl } from "@/config/site";
import type { Project } from "@/data/projects";

export default function ProjectCollection({
  title,
  path,
  projects,
}: {
  title: string;
  path: string;
  projects: Project[];
}) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: title,
        url: absoluteUrl(path),
        inLanguage: "en-CA",
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: projects.length,
          itemListElement: projects.map((project, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "CreativeWork",
              name: project.title,
              url: absoluteUrl(`/projects/${project.category}#${project.id}`),
              description: project.description,
              ...(project.image ? { image: absoluteUrl(project.image) } : {}),
              creator: { "@id": absoluteUrl("/#organization") },
            },
          })),
        },
      }}
    />
  );
}
