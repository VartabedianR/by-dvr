"use client";

import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

export function ScrollProgress() {
    const reduce = useReducedMotion();
    const { scrollYProgress } = useScroll();

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 120,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <motion.div
            aria-hidden
            className="fixed top-0 left-0 right-0 h-0.5 bg-accent origin-left z-60"
            style={{ scaleX: reduce ? scrollYProgress : scaleX }}
        />
    );
}