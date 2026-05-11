import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, TrendingUp, Users, DollarSign, Sparkles, ShieldCheck, Receipt, ArrowRight } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { StudentCard } from "@/components/StudentCard";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { Button } from "@/components/ui/button";
import { requests, recentActivity } from "@/lib/mock-data";

export const Route = createFileRoute("/donor")({
  head: () => ({
    meta: [
      { title: "Donor Dashboard — Ed-Bridge" },
      { name: "description", content: "Track your impact and discover students to support." },
    ],
  }),
  component: DonorDashboard,
});

function DonorDashboard() {
  const stats = [
    { icon: Heart, label: "Students supported", value: 7 },
    { icon: DollarSign, label: "Total contributed", value: 1840, prefix: "$" },
    { icon: TrendingUp, label: "Milestones funded", value: 12 },
    { icon: Users, label: "Lives impacted", value: 23 },
  ];

  const trustBadges = [
    { icon: ShieldCheck, t: "Identity verified", d: "Every student" },
    { icon: Receipt, t: "Receipts on every donation", d: "Tax-ready" },
    { icon: Sparkles, t: "Milestone-based release", d: "Funds tied to outcomes" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
        {/* Welcome header */}
        <section className="relative overflow-hidden rounded-3xl border border-border/70 bg-[image:var(--gradient-hero)] p-6 text-primary-foreground shadow-[var(--shadow-elegant)] sm:p-10">
          <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
          <div className="relative flex flex-col gap-1">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" /> You're in the top 5% of donors this month
            </span>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Welcome back, Sarah 👋</h1>
            <p className="mt-2 max-w-xl text-primary-foreground/90">
              Your generosity has touched 23 lives across 4 countries. Here's what's happening with the students you support.
            </p>
          </div>

          <div className="relative mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur transition-transform duration-300 hover:-translate-y-0.5"
              >
                <s.icon className="h-5 w-5 opacity-90" />
                <div className="mt-3 text-3xl font-semibold tracking-tight">
                  <AnimatedCounter value={s.value} prefix={s.prefix} />
                </div>
                <div className="text-xs opacity-90">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Trust strip */}
        <section className="mt-8 grid gap-3 sm:grid-cols-3">
          {trustBadges.map((b) => (
            <div key={b.t} className="flex items-center gap-3 rounded-2xl border border-border/70 bg-card p-4 transition-colors hover:border-primary/30">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <b.icon className="h-5 w-5" />
              </span>
              <div>
                <div className="text-sm font-semibold">{b.t}</div>
                <div className="text-xs text-muted-foreground">{b.d}</div>
              </div>
            </div>
          ))}
        </section>

        {/* Main grid */}
        <section className="mt-12 grid gap-8 lg:grid-cols-[1fr_320px]">
          <div>
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Recommended for you</h2>
                <p className="mt-1 text-sm text-muted-foreground">Verified students who match the causes you've supported.</p>
              </div>
              <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
                <Link to="/browse">View all <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {requests.filter((r) => r.verified).slice(0, 4).map((r) => <StudentCard key={r.id} r={r} />)}
            </div>
          </div>

          {/* Recent activity */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-border/70 bg-card p-6 shadow-[var(--shadow-card)]">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Recent activity</h3>
                <span className="inline-flex items-center gap-1 text-[11px] text-success">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-success" />
                  </span>
                  Live
                </span>
              </div>
              <ol className="mt-5 space-y-4">
                {recentActivity.map((a) => (
                  <li key={a.id} className="flex gap-3 text-sm">
                    <div className="relative">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Heart className="h-4 w-4" />
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="leading-snug">
                        <span className="font-medium text-foreground">{a.who}</span>{" "}
                        <span className="text-muted-foreground">{a.action}</span>{" "}
                        <span className="font-medium text-foreground">{a.target}</span>
                      </p>
                      <p className="mt-0.5 text-xs text-muted-foreground">{a.when}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <Button asChild variant="soft" size="sm" className="mt-6 w-full">
                <Link to="/browse">Find your next student</Link>
              </Button>
            </div>
          </aside>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
