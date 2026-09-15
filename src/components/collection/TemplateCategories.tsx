import Link from "next/link";
import { categoryDesigns, categoryHref, templateCategories } from "@/data/website-collection";

export default function TemplateCategories() {
  return (
    <section
      className="collection-section"
      id="designs"
      aria-labelledby="template-categories-title"
    >
      <div className="collection-heading">
        <div>
          <p className="eyebrow">Start with your business</p>
          <h2 id="template-categories-title">What do you do?</h2>
        </div>
        <p>
          Choose a category, browse the website layouts, then open any template for a closer look.
        </p>
      </div>
      <div className="template-category-list">
        {templateCategories.map((category, index) => {
          const count = categoryDesigns(category).length;
          return (
            <Link className="template-category" href={categoryHref(category)} key={category.id}>
              <span className="template-category-number" aria-hidden="true">
                0{index + 1}
              </span>
              <div>
                <h3>{category.name}</h3>
                <p>{category.description}</p>
              </div>
              <span className="template-category-count">
                {count
                  ? `${count} ${count === 1 ? "template" : "templates"} to explore`
                  : "No templates added yet"}
                <span aria-hidden="true">↗</span>
              </span>
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
