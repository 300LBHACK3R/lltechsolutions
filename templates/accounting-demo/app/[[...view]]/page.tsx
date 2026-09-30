import { notFound } from "next/navigation";
import ProfessionalTemplate from "@/components/collection/ProfessionalTemplate";
import {
  professionalTemplate,
  professionalPagePath,
  collectionInquiryHref,
} from "@/data/website-collection";
const template = professionalTemplate("accounting")!;
type Props = { params: Promise<{ view?: string[] }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return template.pages.map((page) => ({
    view: professionalPagePath(page).split("/").filter(Boolean),
  }));
}
function getPage(view: string[] | undefined) {
  return template.pages.find((page) => professionalPagePath(page) === `/${(view ?? []).join("/")}`);
}
export async function generateMetadata({ params }: Props) {
  const page = getPage((await params).view);
  if (!page) notFound();
  return { title: page === "Home" ? template.brand : page };
}
export default async function Page({ params }: Props) {
  const page = getPage((await params).view);
  if (!page) notFound();
  return (
    <ProfessionalTemplate
      template={template}
      page={page}
      enquiryHref={`https://lltechsolutions.ca${collectionInquiryHref({ design: template.id })}`}
    />
  );
}
