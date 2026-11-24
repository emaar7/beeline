import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/lib/dictionaries";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import Statement from "@/components/Statement";
import TariffsRail from "@/components/TariffsRail";
import TariffFinder from "@/components/TariffFinder";
import SpeedRace from "@/components/SpeedRace";
import WorldStack from "@/components/WorldStack";
import Stats from "@/components/Stats";
import FinalCta from "@/components/FinalCta";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const d = getDictionary(lang);
  return (
    <>
      <Hero lang={lang} d={d.hero} />
      <Ticker items={d.ticker} />
      <Statement kicker={d.statement.kicker} text={d.statement.text} />
      <TariffsRail lang={lang} d={d.tariffs} />
      <section className="bg-ink px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1300px]"><TariffFinder lang={lang} d={d.tariffs} /></div>
      </section>
      <SpeedRace d={d.speed} />
      <WorldStack d={d.world} />
      <Stats d={d.stats} />
      <FinalCta lang={lang} d={d.cta} />
    </>
  );
}
