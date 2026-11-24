import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/lib/dictionaries";
import PageHero from "@/components/PageHero";
import TariffsBrowser from "@/components/TariffsBrowser";
import TariffFinder from "@/components/TariffFinder";

export default async function TariffsPage({ params }: PageProps<"/[lang]/tariffs">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const d = getDictionary(lang);
  return (
    <>
      <PageHero title={d.tariffsPage.title} sub={d.tariffsPage.sub} />
      <section className="bg-ink px-5 py-16 md:px-10">
        <div className="mx-auto max-w-[1300px]">
          <TariffsBrowser lang={lang} d={d.tariffs} unit={d.hero.unit} />
        </div>
      </section>
      <section className="bg-ink px-5 pb-28 pt-6 md:px-10">
        <div className="mx-auto max-w-[1300px]"><TariffFinder lang={lang} d={d.tariffs} /></div>
      </section>
    </>
  );
}
