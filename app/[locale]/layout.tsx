import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

const meta = {
  fr: {
    title: "Romain Vartabedian - Développeur Shopify & Full-Stack",
    description: 
    "Développeur Shopify Partner basé à Marseille. Apps Shopify, thèmes Liquid, React / Next.js / Node.js. Disponible CDI & Freelance.",
  },
  en: {
    title: "Romain Vartabedian - Shopify & Full-Stack Developer",
    description:
    "Shopify Partner developer based in Marseille. Shopify apps, Liquid themes, React / Next.js / Node.js. Available for hire.",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const m = meta[locale as keyof typeof meta] ?? meta.fr;
  const url = `https://by-dvr.vercel.app/${locale}`;

  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: url,
      languages: {
        fr: "https://by-dvr.vercel.app/fr",
        en: "https://by-dvr.vercel.app/en",
      },
    },
    openGraph: {
      title: m.title,
      description: m.description,
      url,
      siteName: "Romain Vartabedian",
      locale: locale === "fr" ? "fr_FR" : "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: m.title,
      description: m.description,
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}