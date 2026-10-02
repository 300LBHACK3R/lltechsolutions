type PageHeroProps = {
  eyebrow?: string;
  title: string;
  copy?: string;
  backgroundImage?: string;
  backgroundPosition?: string;
  darkOverlay?: boolean;
  align?: "left" | "center";
  compact?: boolean;
  className?: string;
};

export default function PageHero({
  eyebrow,
  title,
  copy,
  backgroundImage,
  backgroundPosition = "center center",
  darkOverlay = true,
  align = "left",
  compact = false,
  className = "",
}: PageHeroProps) {
  const hasImage = Boolean(backgroundImage);

  const classes = [
    "page-hero-base",
    hasImage ? "page-hero-base--with-image" : "page-hero-base--plain",
    hasImage && darkOverlay ? "page-hero-base--dark" : "",
    hasImage && !darkOverlay ? "page-hero-base--light" : "",
    align === "center" ? "page-hero-base--center" : "",
    compact ? "page-hero-base--compact" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={classes}>
      {hasImage ? (
        <>
          <div
            className="page-hero-base__bg"
            style={{
              backgroundImage: `url("${backgroundImage}")`,
              backgroundPosition,
            }}
            aria-hidden="true"
          />

          <div
            className={`page-hero-base__overlay ${
              darkOverlay ? "page-hero-base__overlay--dark" : "page-hero-base__overlay--light"
            }`}
            aria-hidden="true"
          />
        </>
      ) : null}

      <div className="page-hero-base__container">
        <div className="page-hero-base__content">
          {eyebrow ? <span className="page-hero-base__eyebrow">{eyebrow}</span> : null}

          <h1 className="page-hero-base__title">{title}</h1>

          {copy ? <p className="page-hero-base__copy">{copy}</p> : null}
        </div>
      </div>
    </section>
  );
}
