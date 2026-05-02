"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

export function ScrollHint() {
    const reduce = useReducedMotion();
    const t = useTranslations("hero");
    const { scrollY } = useScroll();

    // Disparition progressive entre 0px et 200px de scroll
    const opacity = useTransform(scrollY, [0, 200], [1, 0]);
    const pointerEvents = useTransform(scrollY, (v) => (v > 200 ? "none" : "auto"));

    return (
        <motion.a
            href="#about"
            style={{ opacity, pointerEvents }}
            aria-label={t("scrollHint")}
            className={cn(
                "absolute bottom-8 left-6 sm:left-10 lg:left-16",
                "inline-flex items-center gap-2 text-xs font-mono tracking-wider",
                "text-muted hover:text-accent rounded-sm",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                "transition-colors"
            )}
        >
            <motion.span
                aria-hidden
                animate={reduce ? undefined : { y: [0, 4, 0] }}
                transition={{
                    duration: 1.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            >
                ↓
            </motion.span>
            {t("scrollHint")}
        </motion.a>
    );
}