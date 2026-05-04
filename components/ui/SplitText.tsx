"use client";

import { motion, useReducedMotion } from "framer-motion";

type SplitTextProps = {
    text: string;
    className?: string;
    delay?: number;
    staggerDuration?: number;
    splitBy?: "char" | "word";
};

export function SplitText({
    text,
    className,
    delay = 0,
    staggerDuration = 0.038,
    splitBy = "char",
}: SplitTextProps) {
    const reduce = useReducedMotion();

    if (reduce) {
        return <span className={className}>{text}</span>;
    }

    // Split selon le mode
    const segments =
        splitBy === "word" ? text.split(" ") : text.split("");

    return (
        <span className={className} aria-label={text}>
            {segments.map((segment, idx) => (
                <motion.span
                    key={idx}
                    aria-hidden
                    style={{ display: "inline-block" }}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{
                        duration: 0.6,
                        delay: delay + idx * staggerDuration,
                        ease: [0.22, 1, 0.36, 1],
                    }}
                >
                    {splitBy === "word"
                        ? idx === segments.length - 1
                            ? segment
                            : `${segment}\u00A0`
                        : segment === " "
                            ? "\u00A0"
                            : segment}
                </motion.span>
            ))}
        </span>
    );
}