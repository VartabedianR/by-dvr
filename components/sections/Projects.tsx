"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { projects } from "@/data/projects";

export function Projects() {
    const reduce = useReducedMotion();
    const t = useTranslations("projects");

    const fade = {
        initial: reduce ? false : { opacity: 0, y: 16 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-100px" },
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    };

    return (
        <section
            id="projects"
            className="relative py-24 sm:py-32 lg:py-40 scroll-mt-24"
        >
            <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
                <motion.div {...fade}>
                    <SectionHeading label={t("label")} title={t("title")} />
                </motion.div>

                <div className="space-y-24 sm:space-y-32 lg:space-y-40">
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