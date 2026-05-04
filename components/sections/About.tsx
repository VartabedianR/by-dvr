"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SplitText } from "@/components/ui/SplitText";

import { cn } from "@/lib/utils";


export function About() {
  const reduce = useReducedMotion();
  const t = useTranslations("about");

  const fade = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section id="about" className="relative py-20 sm:py-28 lg:py-32 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-10 xl:col-span-9">
            <motion.div {...fade(0)}>
              <SectionHeading label={t("label")} title={t("title")} />
            </motion.div>

            <div tabIndex={0} className="space-y-4 text-base sm:text-lg text-foreground/80 leading-relaxed">
              <motion.p {...fade(0.1)}>{t("paragraph1")}</motion.p>
              <motion.p {...fade(0.2)}>{t("paragraph2")}</motion.p>
              <motion.p {...fade(0.3)}>{t("paragraph3")}</motion.p>
              <motion.p {...fade(0.4)}>{t("paragraph4")}</motion.p>
            </div>

            {/*<motion.p
              {...fade(0.45)}
              className="mt-12 text-lg sm:text-xl lg:text-2xl font-medium text-foreground italic max-w-3xl"
            >
              &laquo;&nbsp;{t("manifesto")}&nbsp;&raquo;
            </motion.p>*/}

            <p className="mt-12 text-lg sm:text-xl lg:text-2xl font-medium text-foreground italic max-w-3xl">
              &laquo;&nbsp;
              <SplitText
                text={t("manifesto")}
                splitBy="word"
                staggerDuration={0.04}
              />
              &nbsp;&raquo;
            </p>

            <motion.p
              {...fade(0.5)}
              className={cn(
                "mt-12 text-base sm:text-lg text-foreground/80 leading-relaxed border-l-2 border-accent pl-6 rounded-sm",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                "transition-colors",
              )}
            >
              <span className="font-semibold text-accent">
                {t("currentlyLabel")}
              </span>
              {" : "}
              {t("currentlyContent")}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
