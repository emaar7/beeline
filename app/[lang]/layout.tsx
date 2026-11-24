import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Unbounded, Inter } from "next/font/google";
import "../globals.css";
import { getDictionary, hasLocale, locales } from "@/lib/dictionaries";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollProgress from "@/components/ScrollProgress";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const display = Unbounded({
  variable: "--font-display",
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["500", "700", "900"],
});
const body = Inter({
  variable: "--font-body",
  subsets: ["latin", "latin-ext", "cyrillic"],
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const d = getDictionary(lang);
  return { title: d.meta.title, description: d.meta.description };
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const d = getDictionary(lang);
  return (
    <html lang={lang} className={`${display.variable} ${body.variable}`}>
      <body>
        <SmoothScroll />
        <ScrollProgress />
        <Header lang={lang} d={d.nav} />
        <main>{children}</main>
        <Footer lang={lang} d={d.footer} />
      </body>
    </html>
  );
}
