import { createFileRoute } from "@tanstack/react-router";
import { Heart, TrendingUp, Users, DollarSign } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { StudentCard } from "@/components/StudentCard";
import { requests } from "@/lib/mock-data";

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
    { icon: Heart, label: "Students supported", value: "7" },
    { icon: DollarSign, label: "Total contributed", value: "$1,840" },
    { icon: TrendingUp, label: "Milestones funded", value: "12" },
    { icon: Users, label: "Lives impacted", value: "23" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-10 rounded-3xl border border-border/70 bg-[image:var(--gradient-hero)] p-8 text-primary-foreground shadow-[var(--shadow-elegant)]">
          <h1 className="text-3xl font-semibold tracking-tight">Welcome back, Sarah 👋</h1>
          <p className="mt-2 text-primary-foreground/90">Your generosity changes lives. Here's your impact.</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl bg-primary-foreground/10 p-4 backdrop-blur">
                <s.icon className="h-5 w-5 opacity-80" />
                <div className="mt-3 text-2xl font-semibold">{s.value}</div>
                <div className="text-xs opacity-80">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">Recommended for you</h2>
            <p className="text-sm text-muted-foreground">Verified students who match the causes you've supported.</p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {requests.filter((r) => r.verified).map((r) => <StudentCard key={r.id} r={r} />)}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
