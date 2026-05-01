"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechBadge } from "@/components/ui/TechBadge";
import { skills } from "@/data/profile";

export function Skills() {
  const reduce = useReducedMotion();
  const t = useTranslations("skills");

  const fade = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section id="skills" className="relative py-24 sm:py-32 lg:py-40 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
        <motion.div {...fade(0)}>
          <SectionHeading label={t("label")} title={t("title")} />
        </motion.div>

        <div className="space-y-10 sm:space-y-12">
          {/* Première ligne — 3 catégories */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 sm:gap-y-12">
            {skills.slice(0, 3).map((category, idx) => (
              <motion.div key={category.id} {...fade(0.1 + idx * 0.05)}>
                <h3
                  tabIndex={0}
                  className="text-xs font-mono tracking-widest uppercase text-muted mb-4 text-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:px-2 focus-visible:py-1"
                >
                  {t(category.id)}
                </h3>

                <div className="flex flex-wrap gap-2 justify-center">
                  {category.items.map((item) => (
                    <TechBadge key={item} label={item} />
                  ))}
                </div>

                {category.id === "design" && (
                  <p className="mt-3 text-sm text-muted/80 italic text-center">
                    {t("designNote")}
                  </p>
                )}
              </motion.div>
            ))}
          </div>

          {/* Deuxième ligne — 2 catégories centrées */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10 sm:gap-y-12 max-w-3xl mx-auto">
            {skills.slice(3).map((category, idx) => (
              <motion.div key={category.id} {...fade(0.25 + idx * 0.05)}>
                <h3
                  tabIndex={0}
                  className="text-xs font-mono tracking-widest uppercase text-muted mb-4 text-center rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:px-2 focus-visible:py-1"
                >
                  {t(category.id)}
                </h3>

                <div className="flex flex-wrap gap-2 justify-center">
                  {category.items.map((item) => (
                    <TechBadge key={item} label={item} />
                  ))}
                </div>

                {category.id === "design" && (
                  <p className="mt-3 text-sm text-muted/80 italic text-center">
                    {t("designNote1")}
                    <br />
                    {t("designNote2")}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
