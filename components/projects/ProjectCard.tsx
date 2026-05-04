"use client";

import Image from "next/image";

import { useState, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { useTranslations } from "next-intl";
import { TechBadge } from "@/components/ui/TechBadge";
import type { Project } from "@/data/projects";

import { useTilt } from "@/hooks/useTilt";
import { cn } from "@/lib/utils";


type ProjectCardProps = {
  project: Project;
  reversed?: boolean;
};

export function ProjectCard({ project, reversed = false }: ProjectCardProps) {
  const reduce = useReducedMotion();
  const t = useTranslations("projects");
  const tProject = useTranslations(`projects.${project.id}`);
  const [activeIndex, setActiveIndex] = useState(0);

  const hasImages = project.images.length > 0;
  const activeImage = hasImages ? project.images[activeIndex] : null;
  const bullets = tProject.raw("bullets") as string[];

  const cardRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start 85%", "end 15%"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [15, -15]);

  const fade = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  const tilt = useTilt();

  return (
    <article ref={cardRef} className="relative grid grid-cols-12 gap-6 lg:gap-12 items-start" style={{ position: "relative"}}>
      {/* Bloc images */}
      <motion.div
        {...fade(0)}
        style={{ y: imageY }}
        className={cn("col-span-12 lg:col-span-7", reversed && "lg:order-2")}
      >
        {hasImages ? (
          <div className="space-y-4">
            <div style={{ perspective: "1000px" }}>
              <motion.div
                onMouseMove={tilt.onMouseMove}
                onMouseLeave={tilt.onMouseLeave}
                style={{
                  rotateX: tilt.rotateX,
                  rotateY: tilt.rotateY,
                  transformStyle: "preserve-3d",
                }}
                className="relative aspect-video rounded-xl overflow-hidden border border-border bg-surface transition-colors hover:border-accent/40 hover:shadow-[0_0_20px_var(--color-accent)/15]"
              >
                <Image
                src={activeImage!.src}
                alt={activeImage!.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 700px"
                className="object-contain"
                priority={false}
              />
              </motion.div>
            </div>

            {/*<div className="relative aspect-video rounded-xl overflow-hidden border border-border bg-surface group/img transition-colors hover:border-accent/40">
              <Image
                src={activeImage!.src}
                alt={activeImage!.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 700px"
                className="object-contain transition-transform duration-500 ease-out motion-safe:group-hover/img:scale-[1.02]"
                priority={false}
              />
            </div>*/}

            {project.images.length > 1 && (
              <div className="flex gap-3">
                {project.images.map((img, idx) => (
                  <button
                    key={img.src}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    onMouseEnter={() => setActiveIndex(idx)}
                    aria-label={img.alt}
                    aria-current={idx === activeIndex}
                    className={cn(
                      "relative flex-1 aspect-video rounded-lg overflow-hidden border-2 bg-surface",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-all",
                      idx === activeIndex
                        ? "border-accent opacity-100"
                        : "border-border opacity-60 hover:opacity-90",
                    )}
                  >
                    <Image
                      src={img.src}
                      alt=""
                      fill
                      sizes="(max-width: 640px) 33vw, 200px"
                      className="object-contain"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="aspect-video rounded-xl border border-dashed border-border bg-surface/40 flex items-center justify-center">
            <span className="text-xs font-mono text-muted tracking-widest uppercase">
              {t("imagesComingSoon")}
            </span>
          </div>
        )}
      </motion.div>

      {/* Bloc contenu */}
      <motion.div
        {...fade(0.15)}
        className={cn("col-span-12 lg:col-span-5", reversed && "lg:order-1")}
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="text-xs font-mono tracking-widest uppercase text-accent">
            {project.category}
          </span>
          {project.status === "in-progress" && (
            <span className="text-xs font-mono tracking-wider uppercase text-muted border border-border rounded-full px-2 py-0.5">
              {t("statusInProgress")}
            </span>
          )}
        </div>

        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight mb-4">
          {tProject("title")}
        </h3>

        <p className="text-base text-foreground/80 leading-relaxed mb-6">
          {tProject("description")}
        </p>

        <ul className="space-y-2 mb-6">
          {bullets.map((bullet, idx) => (
            <li
              key={idx}
              className="flex items-start gap-3 text-sm text-foreground/70 leading-relaxed"
            >
              <span>
                <span className="text-accent mt-1.5 shrink-0">-</span>
                <span> {bullet}</span>
              </span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.stack.map((tech) => (
            <TechBadge key={tech} label={tech} />
          ))}
        </div>

        {project.links.live && (
          <a
            href={project.links.live.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex items-center gap-2 text-sm font-medium text-accent rounded-sm hover:text-accent-hover",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-colors",
            )}
          >
            {t("viewLive")} - {project.links.live.label}
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        )}
      </motion.div>
    </article>
  );
}
