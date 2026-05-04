"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";
import { Loader2 } from "lucide-react";
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

  useEffect(() => {
    if (isPending) {
      document.documentElement.classList.add("cursor-wait");
    } else {
      document.documentElement.classList.remove("cursor-wait");
    }
    return () => {
      document.documentElement.classList.remove("cursor-wait");
    };
  }, [isPending]);

  return (
    <div
      className="inline-flex items-center gap-1.5 text-xs font-mono"
      aria-label="Language switcher"
      aria-busy={isPending}
    >
      {routing.locales.map((loc, idx) => (
        <div key={loc} className="flex items-center">
          <button
            type="button"
            onClick={() => switchLocale(loc)}
            className={cn(
              "uppercase tracking-wider px-1 rounded-sm transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              "disabled:cursor-wait",
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

      {isPending && (
        <Loader2
          className="h-3 w-3 ml-1 animate-spin text-accent"
          aria-hidden="true"
        />
      )}
    </div>
  );
}