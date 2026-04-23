import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  label: string;
  title: string;
  className?: string;
};

export function SectionHeading({ label, title, className }: SectionHeadingProps) {
  return (
    <div className={cn("mb-12 lg:mb-16", className)}>
      <p className="text-xs font-mono tracking-widest uppercase text-accent mb-4">
        {label}
      </p>
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight">
        {title}
      </h2>
    </div>
  );
}