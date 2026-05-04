"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { useTranslations } from "next-intl";

import { Badge } from "@/components/ui/Badge";
import { ScrollHint } from "@/components/ui/ScrollHint";
import { HeroOrbs } from "@/components/ui/HeroOrbs";
import { SplitText } from "@/components/ui/SplitText";
import { GlowButton } from "@/components/ui/GlowButton";

import { profile } from "@/data/profile";

export function Hero() {
  const reduce = useReducedMotion();
  const t = useTranslations("hero");
  const tCommon = useTranslations("common");

  const fade = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden scroll-mt-24"
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.05]"
        style={{
          background:
            "radial-gradient(550px circle at 20% 30%, var(--color-accent), transparent 60%)",
        }}
      />

      <HeroOrbs />

      <div className="w-full max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-10 xl:col-span-9">
            {profile.status.available ? (
              <motion.div {...fade(0)} className="mb-8">
                <Badge pulse>{tCommon("openToWork")}</Badge>
              </motion.div>
            ) : null}

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight leading-[1.05]">
              <SplitText text={profile.name} delay={0.1} />
            </h1>

            <motion.p
              {...fade(0.2)}
              className="mt-6 text-xl sm:text-2xl lg:text-3xl text-foreground/90 font-medium"
            >
              {t("title")}
              <span className="text-muted"> &middot; </span>
              <span className="text-muted">{profile.stack}</span>
            </motion.p>

            <motion.p
              {...fade(0.3)}
              className="mt-4 text-base sm:text-lg text-muted max-w-2xl"
            >
              {t("tagline")} &middot; {profile.location}
            </motion.p>

            <motion.p
              {...fade(0.35)}
              className="mt-8 text-sm sm:text-base font-mono tracking-wider text-accent"
            >
              {t("statement")}
            </motion.p>

            <motion.div
              {...fade(0.4)}
              className="mt-10 flex flex-col sm:flex-row gap-4"
            >
              <GlowButton href="#projects" variant="primary">
                {t("cta.viewProjects")}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </GlowButton>

              <GlowButton href={`mailto:${profile.email}`} variant="secondary">
                <Mail className="h-4 w-4" />
                {t("cta.contact")}
              </GlowButton>
            </motion.div>
          </div>
        </div>

        <ScrollHint />
      </div>
    </section>
  );
}
