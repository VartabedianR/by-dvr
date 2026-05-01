import { cn } from "@/lib/utils";

type TechBadgeProps = {
    label: string;
    className?: string;
};

export function TechBadge({ label, className }: TechBadgeProps) {
    return (
        <span
            className={cn(
                "inline-flex items-center px-2.5 py-1 rounded-md",
                "border border-border bg-surface/40",
                "text-xs font-mono text-muted",
                "hover:text-foreground hover:border-foreground/30 hover:bg-surface/60 transition-colors",
                className
            )}
        >
            {label}
        </span>
    );
}