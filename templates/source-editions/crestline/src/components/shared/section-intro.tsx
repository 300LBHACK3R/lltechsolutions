type Props = {
  eyebrow: string;
  title: string;
  copy?: string;
  align?: "left" | "center";
  variant?: "default" | "services";
  className?: string;
};

export default function SectionIntro({
  eyebrow,
  title,
  copy,
  align = "left",
  variant = "default",
  className = "",
}: Props) {
  const classes = [
    "section-intro",
    `section-intro--${align}`,
    variant === "services" ? "section-intro--services" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      <span className="section-intro__eyebrow">{eyebrow}</span>

      <h2 className="section-intro__title">{title}</h2>

      {copy ? <p className="section-intro__copy">{copy}</p> : null}
    </div>
  );
}
