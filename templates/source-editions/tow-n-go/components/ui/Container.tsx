import { cn } from "@/utils/cn";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  size?: "default" | "wide" | "narrow" | "full";
};

export function Container({ children, className, size = "default" }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        size === "default" && !className?.includes("max-w-") && "max-w-7xl",
        size === "wide" && "max-w-[1400px]",
        size === "narrow" && "max-w-4xl",
        size === "full" && "max-w-none",
        className,
      )}
    >
      {children}
    </div>
  );
}
