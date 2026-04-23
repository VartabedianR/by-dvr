"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LocaleSwitch() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const switchLocale = (nextLocale: string) => {
    if (nextLocale === locale) return;
    const segments = pathname.split("/");
    segments[1] = nextLocale;
    const nextPath = segments.join("/") || `/${nextLocale}`;
    startTransition(() => router.replace(nextPath));
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 text-xs font-mono",
        isPending && "opacity-50"
      )}
      aria-label="Language switcher"
    >
      {routing.locales.map((loc, idx) => (
        <div key={loc} className="flex items-center">
          <button
            type="button"
            onClick={() => switchLocale(loc)}
            className={cn(
              "uppercase tracking-wider px-1 transition-colors",
              loc === locale
                ? "text-foreground"
                : "text-muted hover:text-foreground"
            )}
            aria-current={loc === locale ? "true" : undefined}
          >
            {loc}
          </button>
          {idx < routing.locales.length - 1 && (
            <span className="text-border">/</span>
          )}
        </div>
      ))}
    </div>
  );
}