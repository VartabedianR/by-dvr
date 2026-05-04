import { cn } from "@/lib/utils";

type BadgeProps = {
  children: React.ReactNode;
  pulse?: boolean;
  className?: string;
};

export function Badge({ children, pulse = false, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1 rounded-full",
        "border border-border bg-surface/60 backdrop-blur-sm",
        "text-xs font-medium text-muted",
        className
      )}
    >
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 animate-ping" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
        </span>
      )}
      {children}
    </span>
  );
}