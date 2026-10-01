import { notFound } from "next/navigation";
import ProjectCaseStudy from "@/components/projects/ProjectCaseStudy";
import JsonLd from "@/components/seo/JsonLd";
import { absoluteUrl } from "@/config/site";
import { projects, projectPath } from "@/data/projects";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ project: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ project: project.id }));
}

export async function generateMetadata({ params }: Props) {
  const { project: id } = await params;
  const project = projects.find((item) => item.id === id);
  if (!project) notFound();
  return pageMetadata(`${project.title} Case Study`, project.description, projectPath(project));
}

export default async function ProjectPage({ params }: Props) {
  const { project: id } = await params;
  const project = projects.find((item) => item.id === id);
  if (!project) notFound();
  const image = project.gallery?.[0]?.src ?? project.image;
  const clientBusiness = projects.find(
    (item) => item.category === "web-builds" && item.liveUrl === project.liveUrl,
  );

  return (
    <>
      <ProjectCaseStudy project={project} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "CreativeWork",
              "@id": absoluteUrl(projectPath(project)),
              name: project.title,
              description: project.description,
              url: absoluteUrl(projectPath(project)),
              ...(image ? { image: absoluteUrl(image) } : {}),
              creator: { "@id": absoluteUrl("/#organization") },
              ...(project.ownership === "client"
                ? {
                    about: {
                      "@type": "Organization",
                      name: clientBusiness?.title ?? project.title,
                      url: project.liveUrl,
                    },
                  }
                : {}),
              ...(project.liveUrl ? { sameAs: project.liveUrl } : {}),
              inLanguage: "en-CA",
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                {
                  "@type": "ListItem",
                  position: 1,
                  name: "Our Clients",
                  item: absoluteUrl("/projects"),
                },
                {
                  "@type": "ListItem",
                  position: 2,
                  name: project.title,
                  item: absoluteUrl(projectPath(project)),
                },
              ],
            },
          ],
        }}
      />
    </>
  );
}
