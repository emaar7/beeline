import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/lib/dictionaries";
import PageHero from "@/components/PageHero";
import { HomeCard } from "@/components/TariffCard";
import DownloadRace from "@/components/DownloadRace";
import { homePlans } from "@/lib/data";

export default async function InternetPage({ params }: PageProps<"/[lang]/internet">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const d = getDictionary(lang);
  const p = d.internetPage;
  return (
    <>
      <PageHero title={p.title} sub={p.sub} />
      <section className="bg-ink px-5 py-16 md:px-10">
        <div className="mx-auto max-w-[1300px]">
          <h2 className="font-display text-3xl font-black md:text-5xl">{p.plansTitle}</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {homePlans.map((h) => <HomeCard key={h.id} p={h} d={d.tariffs} unit={d.hero.unit} lang={lang} />)}
          </div>
        </div>
      </section>
      <section className="bg-ink px-5 py-10 md:px-10">
        <div className="mx-auto max-w-[1300px]"><DownloadRace d={p} unit={d.hero.unit} /></div>
      </section>
      <section className="bg-ink px-5 pb-28 pt-16 md:px-10">
        <div className="mx-auto max-w-[900px]">
          <h2 className="font-display text-3xl font-black md:text-5xl">{p.faqTitle}</h2>
          <div className="mt-10 divide-y divide-white/12 border-y border-white/12">
            {p.faq.map((f) => (
              <details key={f.q} className="group py-6">
                <summary className="flex cursor-pointer items-center justify-between gap-6 text-lg font-semibold md:text-xl">
                  {f.q}
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/20 text-xl transition group-open:rotate-45 group-open:bg-yellow group-open:text-ink">+</span>
                </summary>
                <p className="mt-4 max-w-xl text-white/65">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
