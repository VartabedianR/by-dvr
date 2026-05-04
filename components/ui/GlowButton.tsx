"use client";

import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion, useMotionValue, useMotionTemplate } from "framer-motion";
import { cn } from "@/lib/utils";

type GlowButtonProps = {
    href: string;
    children: ReactNode;
    className?: string;
    variant?: "primary" | "secondary";
};

export function GlowButton({
    href,
    children,
    className,
    variant = "primary",
}: GlowButtonProps) {
    const ref = useRef<HTMLAnchorElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        mouseX.set(e.clientX - rect.left);
        mouseY.set(e.clientY - rect.top);
    };

    const background = useMotionTemplate`radial-gradient(180px circle at ${mouseX}px ${mouseY}px, rgba(150, 191, 72, 0.25), transparent 70%)`;

    const baseClasses = cn(
        "group relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-medium overflow-hidden",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "transition-colors"
    );

    const variantClasses =
    variant === "primary"
    ? "bg-accent text-background hover:bg-accent-hover"
    : "border border-border bg-surface/40 hover:bg-surface hover:border-foreground/30 text-foreground";

    return (
        <a
        ref={ref}
        href={href}
        onMouseMove={handleMouseMove}
        className={cn(baseClasses, variantClasses, className)}
        >
            {/* Glow trail */}
            <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{ background }}
            />
            {/* Contenu : z-10 pour rester au dessus du glow */}
            <span className="relative z-10 inline-flex items-center gap-2">
                {children}
            </span>
        </a>
    );
}