import { notFound } from "next/navigation";
import DetailingTemplate from "@/components/collection/DetailingTemplate";
import { retailTemplate, retailPagePath, collectionInquiryHref } from "@/data/website-collection";
const template = retailTemplate("mobile-detailing")!;
type Props = { params: Promise<{ view?: string[] }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return template.pages.map((page) => ({
    view: retailPagePath(page).split("/").filter(Boolean),
  }));
}
function getPage(view: string[] | undefined) {
  return template.pages.find((page) => retailPagePath(page) === `/${(view ?? []).join("/")}`);
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
    <DetailingTemplate
      template={template}
      page={retailPagePath(page).slice(1) || "home"}
      enquiryHref={`https://lltechsolutions.ca${collectionInquiryHref({ design: template.id })}`}
    />
  );
}
