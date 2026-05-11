import { GraduationCap, DollarSign, Globe2, Award, Clock, Star } from "lucide-react";
import { AnimatedCounter } from "./AnimatedCounter";
import { platformImpact } from "@/lib/mock-data";

export function ImpactStats() {
  const items = [
    { icon: GraduationCap, value: platformImpact.studentsFunded, label: "Students funded", suffix: "+" },
    { icon: DollarSign, value: platformImpact.totalDelivered, label: "Delivered to students", prefix: "$" },
    { icon: Globe2, value: platformImpact.countries, label: "Countries reached" },
    { icon: Award, value: platformImpact.graduationRate, label: "Graduation rate", suffix: "%" },
    { icon: Clock, value: platformImpact.avgVerificationHours, label: "Avg. verification (hrs)" },
    { icon: Star, value: platformImpact.donorRating, label: "Donor trust rating", decimals: 1, suffix: "/5" },
  ];

  return (
    <section className="relative overflow-hidden border-y border-border/60 bg-secondary/40 py-20">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[image:var(--gradient-soft)] opacity-60" />
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-primary">Platform impact</span>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Real numbers. Real students. Real outcomes.
          </h2>
          <p className="mt-3 text-muted-foreground">
            Every figure below is reported live from our verification ledger and updated as donations clear.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it) => (
            <div
              key={it.label}
              className="group relative overflow-hidden rounded-2xl border border-border/70 bg-card p-6 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]"
            >
              <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-primary/5 transition-transform duration-500 group-hover:scale-150" />
              <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-[image:var(--gradient-hero)] text-primary-foreground shadow-[var(--shadow-elegant)]">
                <it.icon className="h-5 w-5" />
              </span>
              <div className="relative mt-5 text-4xl font-semibold tracking-tight text-foreground">
                <AnimatedCounter
                  value={it.value}
                  prefix={it.prefix}
                  suffix={it.suffix}
                  decimals={it.decimals}
                />
              </div>
              <div className="relative mt-1 text-sm text-muted-foreground">{it.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
