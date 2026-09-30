import { notFound } from "next/navigation";
import FineDiningTemplate from "@/components/collection/FineDiningTemplate";
import { foodTemplate, foodPagePath, collectionInquiryHref } from "@/data/website-collection";
const template = foodTemplate("fine-dining")!;
type Props = { params: Promise<{ view?: string[] }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return template.pages.map((page) => ({
    view: foodPagePath(page).split("/").filter(Boolean),
  }));
}
function getPage(view: string[] | undefined) {
  return template.pages.find((page) => foodPagePath(page) === `/${(view ?? []).join("/")}`);
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
    <FineDiningTemplate
      template={template}
      page={foodPagePath(page).slice(1) || "home"}
      enquiryHref={`https://lltechsolutions.ca${collectionInquiryHref({ design: template.id })}`}
    />
  );
}
