import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: React.ReactNode;
  subtitle?: string;
  description?: React.ReactNode;
  alignment?: "left" | "center";
  className?: string;
  isMainHeading?: boolean;
  titleClassName?: string;
  descriptionClassName?: string;
}

export function SectionHeader({
  title,
  subtitle,
  description,
  alignment = "center",
  className,
  isMainHeading = false,
  titleClassName,
  descriptionClassName,
}: SectionHeaderProps) {
  const HeadingTag = isMainHeading ? "h1" : "h2";

  return (
    <div
      className={cn(
        "mb-12",
        alignment === "center" ? "text-center" : "text-left",
        className,
      )}
    >
      {subtitle && (
        <span className="text-blue-600 font-semibold text-sm uppercase tracking-wide block mb-2">
          {subtitle}
        </span>
      )}
      <HeadingTag
        className={cn(
          "text-2xl md:text-4xl lg:text-5xl font-extrabold text-center text-gray-900",
          description ? "mb-4" : "",
          titleClassName,
        )}
      >
        {title}
      </HeadingTag>
      {description && (
        <div
          className={cn(
            "text-center text-gray-600 max-w-5xl mx-auto mb-8 sm:mb-12 text-sm md:text-base lg:text-lg",
            alignment === "center" ? "mx-auto" : "",
            descriptionClassName,
          )}
        >
          {description}
        </div>
      )}
    </div>
  );
}
