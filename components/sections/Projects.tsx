"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { projects } from "@/data/projects";

export function Projects() {
    const reduce = useReducedMotion();
    const t = useTranslations("projects");

    return (
        <section
            id="projects"
            className="relative py-20 sm:py-28 lg:py-32 scroll-mt-24 overflow-hidden"
        >
            <div
                aria-hidden
                className="absolute inset-0 pointer-events-none opacity-[0.12]"
                style={{
                    background:
                        "radial-gradient(600px circle at 80% 20%, var(--color-accent), transparent 60%)",
                }}
            />
            <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
                <motion.div
                    initial={reduce ? false : { clipPath: "inset(0 0 100% 0)" }}
                    whileInView={{ clipPath: "inset(0 0 0% 0)" }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                >
                    <SectionHeading label={t("label")} title={t("title")} />
                </motion.div>

                <div className="space-y-16 sm:space-y-20 lg:space-y-24 relative">
                    {projects.map((project, idx) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            reversed={idx % 2 === 1}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}