// Mobile tariffs: real data from https://beeline.uz/ru/products/tariffs (+ /other), checked 2026-11-24.
// Re-verify before launch — prices and promos change. Home internet plans below are still DEMO placeholders.

export type MobilePlan = {
  id: "suhbat" | "optimal" | "vibe" | "oila3" | "oila5" | "oila7" | "uklon" | "ijtimoiy";
  slug: string; // beeline.uz/{lang}/products/tariffs/{slug}
  name: string;
  price: number; // so'm / month as listed
  regularPrice?: number; // price after the new-connection promo ends
  gb: number; // main internet, GB (Infinity = unlimited)
  bonusGb?: number; // extra GB on local TAS-IX traffic
  min: number; // minutes (Infinity = unlimited calls)
  sms: number;
  numbers?: number; // family plans: up to N numbers
  restricted?: boolean; // only for special groups — never recommended
  popular?: boolean;
};

export const allMobilePlans: MobilePlan[] = [
  { id: "ijtimoiy", slug: "ijtimoiy", name: "IJTIMOIY", price: 25000, gb: 5, bonusGb: 10, min: 500, sms: 500, restricted: true },
  { id: "suhbat", slug: "suhbat-plus", name: "SUHBAT+", price: 45000, gb: 0, min: 3000, sms: 1000 },
  { id: "uklon", slug: "uklon", name: "UKLON", price: 50000, gb: 50, bonusGb: 50, min: Infinity, sms: 1000, restricted: true },
  { id: "optimal", slug: "optimal-plus", name: "OPTIMAL+", price: 55000, gb: 15, bonusGb: 25, min: 700, sms: 500 },
  { id: "vibe", slug: "vibe", name: "VIBE", price: 80000, gb: 80, min: 45000, sms: 500, popular: true },
  { id: "oila3", slug: "oila-3", name: "Oila 3", price: 90000, regularPrice: 155000, gb: 225, min: Infinity, sms: 1000, numbers: 3 },
  { id: "oila5", slug: "oila-5", name: "Oila 5", price: 150000, regularPrice: 300000, gb: 450, min: Infinity, sms: 1000, numbers: 5 },
  { id: "oila7", slug: "oila-7", name: "Oila 7", price: 175000, regularPrice: 350000, gb: 700, min: Infinity, sms: 1000, numbers: 7 },
];

/** Plans anyone can connect, cheapest first. */
export const mobilePlans: MobilePlan[] = allMobilePlans
  .filter((p) => !p.restricted)
  .sort((a, b) => a.price - b.price);

export const personalPlans = mobilePlans.filter((p) => !p.numbers);
export const familyPlans = mobilePlans.filter((p) => p.numbers);

export type HomePlan = { id: string; mbit: number; price: number; popular?: boolean };

export const homePlans: HomePlan[] = [
  { id: "h50", mbit: 50, price: 99000 },
  { id: "h100", mbit: 100, price: 139000 },
  { id: "h300", mbit: 300, price: 199000, popular: true },
  { id: "h1000", mbit: 1000, price: 299000 },
];

export const fmtPrice = (n: number) =>
  new Intl.NumberFormat("fr-FR").format(n).replace(/ | /g, " ");

/** Cheapest public plan covering the need; falls back to the biggest one. */
export function pickPlan(gb: number, min: number): MobilePlan {
  return (
    mobilePlans.find((p) => p.gb >= gb && p.min >= min) ??
    mobilePlans[mobilePlans.length - 1]
  );
}

/** Cheapest public plan covering the need, plus the next plan up (if any). */
export function recommend(gb: number, min: number) {
  const i = mobilePlans.findIndex((p) => p.gb >= gb && p.min >= min);
  const k = i === -1 ? mobilePlans.length - 1 : i;
  return { main: mobilePlans[k], alt: mobilePlans[k + 1] as MobilePlan | undefined };
}

export const familyFor = (n: number): MobilePlan =>
  familyPlans.find((p) => (p.numbers ?? 0) >= n) ?? familyPlans[familyPlans.length - 1];

export const beelineUrl = (lang: string, slug: string) =>
  `https://beeline.uz/${lang}/products/tariffs/${slug}`;
export const hambiUrl = () => "https://hambi.uz";
