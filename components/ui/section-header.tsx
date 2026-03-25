import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string;
  alignment?: "left" | "center";
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  description,
  alignment = "left",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-12",
        alignment === "center" ? "text-center" : "text-left",
        className
      )}
    >
      {subtitle && (
        <span className="text-blue-600 font-semibold text-sm uppercase tracking-wide block mb-2">
          {subtitle}
        </span>
      )}
      <h2
        className={cn(
          "text-3xl md:text-4xl font-bold text-slate-900",
          description ? "mb-4" : ""
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "text-sm md:text-base text-slate-600 max-w-2xl",
            alignment === "center" ? "mx-auto" : ""
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
