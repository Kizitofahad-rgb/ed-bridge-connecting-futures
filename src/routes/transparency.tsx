import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  Calendar,
  Download,
  EyeOff,
  Globe2,
  GraduationCap,
  Heart,
  Receipt,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { ContributionHeatmap } from "@/components/ContributionHeatmap";
import { TrustScoreRing } from "@/components/TrustScoreRing";
import {
  CauseBreakdownChart,
  FundingProgressChart,
  FundingTrendChart,
  MilestoneProgressChart,
} from "@/components/TransparencyCharts";
import { ProofOfImpact } from "@/components/ProofOfImpact";
import { useDonorAuth } from "@/lib/auth";
import {
  buildDonorTotals,
  donations,
  donorTrustScore,
  milestones,
} from "@/lib/transparency-data";
import { requests } from "@/lib/mock-data";

export const Route = createFileRoute("/transparency")({
  head: () => ({
    meta: [
      { title: "Transparency & Impact — Ed-Bridge" },
      { name: "description", content: "Track every dollar, every milestone, and every student you've supported on Ed-Bridge." },
    ],
  }),
  component: TransparencyPage,
});

function TransparencyPage() {
  const { donor } = useDonorAuth();
  const totals = buildDonorTotals();
  const firstName = donor?.name.split(" ")[0] ?? "there";

  // Build timeline: donations + milestones, newest first.
  const timeline = [
    ...donations.map((d) => ({
      id: d.id,
      date: d.date,
      kind: "donation" as const,
      title: `Donated $${d.amount} to ${d.studentName}`,
      sub: `${d.cause} · ${d.country}${d.anonymous ? " · Anonymous" : ""}`,
      amount: d.amount,
      anonymous: d.anonymous,
    })),
    ...milestones.map((m) => ({
      id: m.id,
      date: m.date,
      kind: "milestone" as const,
      title: m.title,
      sub: `${m.studentName} · ${m.type.replace("_", " ")}`,
      amount: 0,
      anonymous: false,
    })),
  ].sort((a, b) => (a.date < b.date ? 1 : -1));

  const fundingProgressData = requests.slice(0, 6).map((r) => ({
    name: r.studentName.split(" ")[0],
    raised: r.amountRaised,
    target: r.amountNeeded,
  }));

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
        {/* Hero */}
        <section className="relative overflow-hidden rounded-3xl border border-border/70 bg-[image:var(--gradient-hero)] p-6 text-primary-foreground shadow-[var(--shadow-elegant)] sm:p-10">
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-28 -left-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="relative flex flex-col gap-2">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
              <ShieldCheck className="h-3.5 w-3.5" /> Transparency dashboard
            </span>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
              Every dollar, every milestone — fully traceable, {firstName}.
            </h1>
            <p className="mt-2 max-w-2xl text-primary-foreground/90">
              See exactly where your support went, what students achieved, and how your trust score is built — all in one place.
            </p>
          </div>

          <div className="relative mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Heart, label: "Total donated", value: totals.totalDonated, prefix: "$" },
              { icon: GraduationCap, label: "Students supported", value: totals.studentsSupported },
              { icon: Globe2, label: "Countries reached", value: totals.countries },
              { icon: TrendingUp, label: "Milestones funded", value: totals.milestonesFunded },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur transition-transform duration-300 hover:-translate-y-0.5">
                <s.icon className="h-5 w-5 opacity-90" />
                <div className="mt-3 text-3xl font-semibold tracking-tight">
                  <AnimatedCounter value={s.value} prefix={s.prefix} />
                </div>
                <div className="text-xs opacity-90">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Trust score + heatmap */}
        <section className="mt-8 grid gap-6 lg:grid-cols-[320px_1fr]">
          <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-[var(--shadow-card)]">
            <h2 className="text-base font-semibold">Your donor trust score</h2>
            <p className="mt-1 text-xs text-muted-foreground">Computed from verification, consistency, and student feedback.</p>
            <div className="mt-4 flex items-center justify-center">
              <TrustScoreRing score={donorTrustScore.score} tier={donorTrustScore.tier} size={140} />
            </div>
            <ul className="mt-4 space-y-2 text-xs">
              {donorTrustScore.factors.map((f) => {
                const pct = Math.round((f.value / f.max) * 100);
                return (
                  <li key={f.label}>
                    <div className="flex justify-between">
                      <span className="text-foreground/90">{f.label}</span>
                      <span className="text-muted-foreground">{f.value}/{f.max}</span>
                    </div>
                    <div className="mt-1 h-1.5 rounded-full bg-secondary">
                      <div className="h-full rounded-full bg-primary transition-all duration-700" style={{ width: `${pct}%` }} />
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-[var(--shadow-card)]">
            <ContributionHeatmap />
            <div className="mt-5 flex flex-wrap gap-3 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-primary" /> Donations</span>
              <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-success" /> Milestones</span>
              <span className="inline-flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-warning" /> Updates</span>
            </ul>
          </div>
        </section>

        {/* Charts */}
        <section className="mt-8 grid gap-6 lg:grid-cols-2">
          <FundingTrendChart />
          <CauseBreakdownChart />
          <FundingProgressChart data={fundingProgressData} />
          <MilestoneProgressChart />
        </section>

        {/* Funding history + timeline */}
        <section className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-[var(--shadow-card)]">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <h2 className="text-lg font-semibold">Funding history</h2>
                <p className="text-xs text-muted-foreground">Every donation with verified delivery status.</p>
              </div>
              <Button variant="ghost" size="sm"><Download className="h-4 w-4" /> Export CSV</Button>
            </div>
            <div className="mt-4 -mx-2 overflow-x-auto">
              <table className="w-full min-w-[560px] text-sm">
                <thead className="text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-2 py-2">Date</th>
                    <th className="px-2 py-2">Student</th>
                    <th className="px-2 py-2">Cause</th>
                    <th className="px-2 py-2 text-right">Amount</th>
                    <th className="px-2 py-2">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {donations.slice(0, 12).map((d) => (
                    <tr key={d.id} className="border-t border-border/60 transition-colors hover:bg-secondary/40">
                      <td className="px-2 py-3 text-muted-foreground">{new Date(d.date).toLocaleDateString()}</td>
                      <td className="px-2 py-3 font-medium">
                        {d.anonymous ? (
                          <span className="inline-flex items-center gap-1 text-muted-foreground"><EyeOff className="h-3 w-3" /> Anonymous → {d.studentName}</span>
                        ) : d.studentName}
                      </td>
                      <td className="px-2 py-3 text-muted-foreground">{d.cause}</td>
                      <td className="px-2 py-3 text-right font-semibold">${d.amount}</td>
                      <td className="px-2 py-3">
                        {d.status === "delivered" ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-success/15 px-2 py-0.5 text-[11px] font-medium text-success"><BadgeCheck className="h-3 w-3" /> Delivered</span>
                        ) : (
                          <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary"><Sparkles className="h-3 w-3" /> In transit</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-[var(--shadow-card)]">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Activity timeline</h2>
                <p className="text-xs text-muted-foreground">Donations and student milestones.</p>
              </div>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </div>
            <ol className="relative mt-5 space-y-5 border-l border-border/70 pl-5">
              {timeline.slice(0, 10).map((e) => (
                <li key={e.id} className="relative">
                  <span className={`absolute -left-[27px] top-1 flex h-4 w-4 items-center justify-center rounded-full border-2 border-background ${e.kind === "donation" ? "bg-primary" : "bg-success"}`} />
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div className="text-sm font-medium leading-snug">{e.title}</div>
                    <span className="text-[11px] text-muted-foreground">{new Date(e.date).toLocaleDateString()}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">{e.sub}</div>
                </li>
              ))}
            </ol>
            <Button asChild variant="soft" size="sm" className="mt-6 w-full">
              <Link to="/browse">Find your next student <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
        </section>

        {/* Proof of impact */}
        <div className="mt-12">
          <ProofOfImpact />
        </div>

        <section className="mt-12 rounded-3xl border border-border/70 bg-secondary/40 p-6 text-center sm:p-8">
          <Receipt className="mx-auto h-6 w-6 text-primary" />
          <h3 className="mt-2 text-lg font-semibold">Tax-ready receipts on every donation</h3>
          <p className="mx-auto mt-1 max-w-xl text-sm text-muted-foreground">
            We auto-generate receipts and impact summaries you can share with your accountant or your team.
          </p>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
