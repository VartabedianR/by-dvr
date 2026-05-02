"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/SocialIcons";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

export function Contact() {
  const reduce = useReducedMotion();
  const t = useTranslations("contact");
  const [copied, setCopied] = useState(false);

  const fade = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <section id="contact" className="relative pt-20 pb-24 sm:pb-32 lg:pt-32 lg:pb-40 scroll-mt-24 overflow-hidden">
      <div
                aria-hidden
                className="absolute inset-0 pointer-events-none opacity-[0.1]"
                style={{
                    background:
                        "radial-gradient(600px circle at 50% 80%, var(--color-accent), transparent 60%)",
                }}
            />
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
        <motion.div {...fade(0)} className="text-center">
          <SectionHeading
            label={t("label")}
            title={t("title")}
            className="mb-6"
          />
        </motion.div>

        <motion.p
          {...fade(0.1)}
          className="text-lg sm:text-xl text-foreground/80 text-center max-w-2xl mx-auto mb-12 sm:mb-16"
        >
          {t("tagline")}
        </motion.p>

        {/* Email + bouton copy */}
        <motion.div
          {...fade(0.2)}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12"
        >
          <a
            href={`mailto:${profile.email}`}
            className="text-xl sm:text-3xl lg:text-4xl font-mono text-foreground hover:text-accent rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-colors break-all sm:break-normal"
          >
            {profile.email}
          </a>

          <button
            type="button"
            onClick={handleCopy}
            aria-label={copied ? t("copied") : t("copyEmail")}
            className={cn(
              "inline-flex items-center gap-2 px-3 py-1.5 rounded-full",
              "border border-border bg-surface/40 text-xs font-mono",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              "hover:border-foreground/30 hover:bg-surface transition-colors",
              copied && "border-accent text-accent",
            )}
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5" />
                {t("copied")}
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                {t("copyEmail")}
              </>
            )}
          </button>
        </motion.div>

        {/* Réseaux sociaux */}
        <motion.div {...fade(0.3)} className="flex flex-col items-center gap-4">
          <span className="text-xs font-mono tracking-widest uppercase text-muted">
            {t("followLabel")}
          </span>

          <div className="flex items-center gap-3">
            <a
              href={profile.social.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-border bg-surface/40 text-muted hover:text-foreground hover:border-foreground/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-colors"
            >
              <GitHubIcon className="h-5 w-5" />
            </a>

            <a
              href={profile.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-border bg-surface/40 text-muted hover:text-foreground hover:border-foreground/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-colors"
            >
              <LinkedInIcon className="h-5 w-5" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
