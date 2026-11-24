"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import { locales, type Dict, type Locale } from "@/lib/dictionaries";

export default function Header({ lang, d }: { lang: Locale; d: Dict["nav"] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  useEffect(() => setOpen(false), [pathname]);

  const rest = pathname.replace(/^\/[a-z]{2}(?=\/|$)/, "") || "";
  const links = [
    { href: `/${lang}/tariffs`, label: d.tariffs },
    { href: `/${lang}/internet`, label: d.internet },
    { href: `/${lang}#world`, label: d.world },
    { href: `/${lang}#coverage`, label: d.coverage },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid || open ? "bg-ink/70 backdrop-blur-xl" : ""
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between px-5 md:h-20 md:px-10">
        <Link href={`/${lang}`} aria-label="Beeline"><Logo /></Link>

        <nav className="hidden items-center gap-9 text-sm font-medium lg:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="relative text-white/75 transition hover:text-yellow">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden items-center rounded-full border border-white/15 p-0.5 text-xs font-semibold sm:flex">
            {locales.map((l) => (
              <Link
                key={l}
                href={`/${l}${rest}`}
                className={`rounded-full px-2.5 py-1 uppercase transition ${
                  l === lang ? "bg-yellow text-ink" : "text-white/60 hover:text-white"
                }`}
              >
                {l}
              </Link>
            ))}
          </div>
          <Link
            href={`/${lang}/tariffs`}
            className="hidden rounded-full bg-yellow px-5 py-2.5 text-sm font-bold text-ink transition hover:scale-105 sm:block"
          >
            {d.connect}
          </Link>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={d.menu}
            aria-expanded={open}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/15 lg:hidden"
          >
            <span className="relative block h-3 w-5">
              <span className={`absolute left-0 h-0.5 w-full bg-white transition ${open ? "top-1/2 rotate-45" : "top-0"}`} />
              <span className={`absolute left-0 h-0.5 w-full bg-white transition ${open ? "top-1/2 -rotate-45" : "bottom-0"}`} />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/10 px-5 pb-8 pt-4 lg:hidden">
          <nav className="flex flex-col">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="font-display border-b border-white/10 py-4 text-2xl">
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="mt-6 flex items-center gap-2">
            {locales.map((l) => (
              <Link
                key={l}
                href={`/${l}${rest}`}
                className={`rounded-full border px-4 py-2 text-sm font-semibold uppercase ${
                  l === lang ? "border-yellow bg-yellow text-ink" : "border-white/20"
                }`}
              >
                {l}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
