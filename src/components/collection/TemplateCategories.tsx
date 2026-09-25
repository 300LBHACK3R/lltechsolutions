import Image from "next/image";
import Link from "next/link";
import { categoryDesigns, categoryHref, templateCategories } from "@/data/website-collection";

export default function TemplateCategories() {
  return (
    <section
      className="collection-section template-category-section"
      id="designs"
      aria-labelledby="template-categories-title"
    >
      <div className="template-category-heading">
        <h2 id="template-categories-title">Browse by business type</h2>
        <a href="#how-it-works" className="text-link">
          How it works <span aria-hidden="true">↓</span>
        </a>
      </div>
      <div className="template-category-list">
        {templateCategories.map((category, index) => {
          const count = categoryDesigns(category).length;
          return (
            <Link className="template-category" href={categoryHref(category)} key={category.id}>
              <span className="template-category-visual" aria-hidden="true">
                <Image
                  className="template-category-photo"
                  src={category.image}
                  alt=""
                  fill
                  loading={index === 0 ? "eager" : "lazy"}
                  sizes="(min-width: 2560px) 2080px, (min-width: 1900px) 1760px, (min-width: 1520px) 1440px, (max-width: 374px) calc(100vw - 32px), (max-width: 699px) calc(100vw - 40px), calc(100vw - 80px)"
                />
              </span>
              <div className="template-category-content">
                <span className="template-category-number" aria-hidden="true">
                  0{index + 1}
                </span>
                <div className="template-category-copy">
                  <h3>{category.name}</h3>
                  <p>{category.description}</p>
                </div>
                <span className="template-category-count">
                  {count
                    ? `${count} ${count === 1 ? "design" : "designs"} to explore`
                    : "No templates added yet"}
                  <span aria-hidden="true">↗</span>
                </span>
              </div>
            </Link>
          );
        })}
      </div>
      <p className="collection-fineprint">
        More templates will be added over time. Every design can be discussed and personalized with
        L&L.
      </p>
    </section>
  );
}
