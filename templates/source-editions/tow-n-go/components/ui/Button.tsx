import Link from "next/link";
import type { ButtonHTMLAttributes, ComponentProps, ReactNode } from "react";
import { cn } from "@/utils/cn";

type ButtonVariant = "primary" | "secondary";

type BaseButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  disabled?: boolean;
};

type LinkButtonProps = BaseButtonProps &
  Omit<ComponentProps<typeof Link>, "href" | "children" | "className" | "onClick"> & {
    href: string;
    onClick?: never;
    type?: never;
  };

type ActionButtonProps = BaseButtonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className" | "disabled"> & {
    href?: never;
  };

type ButtonProps = LinkButtonProps | ActionButtonProps;

const baseStyles = [
  "inline-flex min-h-12 items-center justify-center",
  "rounded-2xl px-6 py-3.5",
  "text-center text-sm font-semibold",
  "transition-[transform,background-color,border-color,color,box-shadow,opacity]",
  "duration-200 ease-out",
  "focus-visible:outline-none",
  "focus-visible:ring-2",
  "focus-visible:ring-[#d4af37]/75",
  "focus-visible:ring-offset-4",
  "focus-visible:ring-offset-[#050505]",
  "motion-reduce:transform-none",
  "motion-reduce:transition-none",
].join(" ");

const variantStyles: Record<ButtonVariant, string> = {
  primary: [
    "bg-[#d4af37] text-black",
    "shadow-[0_16px_45px_rgba(212,175,55,0.20)]",
    "hover:-translate-y-0.5",
    "hover:bg-[#edca52]",
    "hover:shadow-[0_20px_55px_rgba(212,175,55,0.27)]",
    "active:translate-y-0",
    "active:shadow-[0_10px_28px_rgba(212,175,55,0.18)]",
  ].join(" "),

  secondary: [
    "border border-white/15",
    "bg-white/[0.045] text-white",
    "shadow-[0_14px_38px_rgba(0,0,0,0.18)]",
    "backdrop-blur",
    "hover:-translate-y-0.5",
    "hover:border-[#d4af37]/45",
    "hover:bg-[#d4af37]/10",
    "hover:text-[#e6c354]",
    "active:translate-y-0",
  ].join(" "),
};

const disabledButtonStyles = [
  "disabled:pointer-events-none",
  "disabled:cursor-not-allowed",
  "disabled:opacity-50",
  "disabled:shadow-none",
  "disabled:transform-none",
].join(" ");

export function Button(props: ButtonProps) {
  const { variant = "primary", className, ...rest } = props;

  const classes = cn(baseStyles, variantStyles[variant], disabledButtonStyles, className);

  if (typeof rest.href === "string") {
    const { href, children, disabled, tabIndex, ...linkProps } = rest;

    return (
      <Link
        {...linkProps}
        href={href}
        tabIndex={disabled ? -1 : tabIndex}
        aria-disabled={disabled ? true : undefined}
        onClick={
          disabled
            ? (event) => {
                event.preventDefault();
              }
            : undefined
        }
        className={cn(
          classes,
          disabled && "pointer-events-none cursor-not-allowed opacity-50 shadow-none",
        )}
      >
        {children}
      </Link>
    );
  }

  const { children, disabled, type = "button", ...buttonProps } = rest;

  return (
    <button {...buttonProps} type={type} disabled={disabled} className={classes}>
      {children}
    </button>
  );
}
