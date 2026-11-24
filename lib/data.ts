// DEMO data — placeholders, not real Beeline pricing.

export type MobilePlan = {
  id: "start" | "smart" | "max" | "ultra";
  name: string;
  price: number;
  gb: number; // Infinity = unlimited
  min: number;
  sms: number;
  popular?: boolean;
};

export const mobilePlans: MobilePlan[] = [
  { id: "start", name: "Start", price: 29000, gb: 5, min: 300, sms: 100 },
  { id: "smart", name: "Smart", price: 49000, gb: 20, min: 700, sms: 300, popular: true },
  { id: "max", name: "Max", price: 79000, gb: 60, min: 1500, sms: 500 },
  { id: "ultra", name: "Ultra", price: 119000, gb: Infinity, min: 3000, sms: 1000 },
];

export type HomePlan = { id: string; mbit: number; price: number; popular?: boolean };

export const homePlans: HomePlan[] = [
  { id: "h50", mbit: 50, price: 99000 },
  { id: "h100", mbit: 100, price: 139000 },
  { id: "h300", mbit: 300, price: 199000, popular: true },
  { id: "h1000", mbit: 1000, price: 299000 },
];

export const fmtPrice = (n: number) =>
  new Intl.NumberFormat("fr-FR").format(n).replace(/ | /g, " ");

export function pickPlan(gb: number, min: number): MobilePlan {
  return (
    mobilePlans.find((p) => p.gb >= gb && p.min >= min) ??
    mobilePlans[mobilePlans.length - 1]
  );
}
