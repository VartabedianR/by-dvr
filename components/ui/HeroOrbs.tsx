"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

type Orb = {
    size: number;
    initialX: string;
    initialY: string;
    duration: number;
    delay: number;
    opacity: number;
    xRange: number;
    yRange: number;
};

const orbs: Orb[] = [
    // Grand orbe : bas-droite, dérive lente
    {
        size: 320,
        initialX: "70%",
        initialY: "60%",
        duration: 22,
        delay: 0,
        opacity: 0.15,
        xRange: 60,
        yRange: 40,
    },
    // Orbe moyen : centre-haut, dérive opposée
    {
       size: 220,
        initialX: "45%",
        initialY: "20%",
        duration: 28,
        delay: 2,
        opacity: 0.10,
        xRange: -50,
        yRange: 50, 
    },
    // Petit orbe : bas-gauche, dérive courte
    {
       size: 160,
        initialX: "15%",
        initialY: "75%",
        duration: 18,
        delay: 4,
        opacity: 0.08,
        xRange: 40,
        yRange: -30, 
    },
];

export function HeroOrbs() {
    const reduce = useReducedMotion();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const id = requestAnimationFrame(() => setMounted(true));
        return () => cancelAnimationFrame(id);
    }, []);

    if (!mounted) return null;

    return (
        <div
            aria-hidden
            className="absolute inset-0 pointer-events-none overflow-hidden"
        >
            {orbs.map((orb, idx) => (
                <motion.div
                    key={idx}
                    className="absolute rounded-full blur-3xl"
                    style={{
                        width: orb.size,
                        height: orb.size,
                        left: orb.initialX,
                        top: orb.initialY,
                        background: "var(--color-accent)",
                        opacity: orb.opacity,
                        willChange: "transform",
                    }}
                    animate={
                        reduce
                        ? undefined
                        : {
                            x: [0, orb.xRange, 0],
                            y: [0, orb.yRange, 0],
                        }
                    }
                    transition={{
                        duration: orb.duration,
                        delay: orb.delay,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    );
}