import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, TrendingUp, Users, DollarSign, Sparkles, ShieldCheck, Receipt, ArrowRight, Pencil, Check } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { StudentCard } from "@/components/StudentCard";
import { AnimatedCounter } from "@/components/AnimatedCounter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { requests, recentActivity } from "@/lib/mock-data";
import { useDonorAuth } from "@/lib/auth";
import { toast } from "sonner";

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
  const { donor, updateProfile } = useDonorAuth();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({ country: donor?.country ?? "", bio: donor?.bio ?? "" });

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

  if (!donor) {
    return (
      <div className="min-h-screen bg-background">
        <SiteHeader />
        <main className="mx-auto flex max-w-md flex-col items-center justify-center px-6 py-24 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Heart className="h-6 w-6" />
          </span>
          <h1 className="mt-5 text-2xl font-semibold tracking-tight">Sign in to see your impact</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Create a free donor account to track contributions, get milestone updates, and download receipts.
          </p>
          <Button asChild variant="hero" size="lg" className="mt-6 w-full">
            <Link to="/login">Sign in or create account</Link>
          </Button>
          <Button asChild variant="ghost" size="sm" className="mt-2">
            <Link to="/browse">Browse students first</Link>
          </Button>
        </main>
        <SiteFooter />
      </div>
    );
  }

  const saveProfile = () => {
    updateProfile(draft);
    setEditing(false);
    toast.success("Profile updated");
  };
  const firstName = donor.name.split(" ")[0];

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
            <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Welcome back, {firstName} 👋</h1>
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

        <section className="mt-6 flex flex-col items-start justify-between gap-3 rounded-3xl border border-primary/20 bg-primary/5 p-5 sm:flex-row sm:items-center">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary"><ShieldCheck className="h-5 w-5" /></span>
            <div>
              <h2 className="text-base font-semibold">See full transparency & impact dashboard</h2>
              <p className="text-sm text-muted-foreground">Heatmaps, charts, donation history, and proof of impact uploads.</p>
            </div>
          </div>
          <Button asChild variant="hero" size="sm">
            <Link to="/transparency">Open dashboard <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </section>

        {/* Donor profile */}
        <section className="mt-8 rounded-3xl border border-border/70 bg-card p-6 shadow-[var(--shadow-card)] sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[image:var(--gradient-hero)] text-lg font-semibold text-primary-foreground shadow-[var(--shadow-elegant)]">
                {donor.name.charAt(0).toUpperCase()}
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg font-semibold">{donor.name}</h2>
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary">
                    <ShieldCheck className="h-3 w-3" /> Verified donor
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{donor.email}</p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={() => { setDraft({ country: donor.country ?? "", bio: donor.bio ?? "" }); setEditing((v) => !v); }}>
              {editing ? "Cancel" : (<><Pencil className="h-4 w-4" /> Edit profile</>)}
            </Button>
          </div>

          {editing ? (
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="dcountry">Country</Label>
                <Input id="dcountry" value={draft.country} onChange={(e) => setDraft((d) => ({ ...d, country: e.target.value }))} placeholder="United States" />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="dbio">About you (optional)</Label>
                <Textarea id="dbio" rows={3} value={draft.bio} onChange={(e) => setDraft((d) => ({ ...d, bio: e.target.value }))} placeholder="A short note students will see when you donate publicly." />
              </div>
              <div className="sm:col-span-2">
                <Button variant="hero" size="sm" onClick={saveProfile}><Check className="h-4 w-4" /> Save changes</Button>
              </div>
            </div>
          ) : (
            <div className="mt-5 grid gap-3 text-sm sm:grid-cols-3">
              <div className="rounded-xl border border-border bg-secondary/40 p-3">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Country</div>
                <div className="mt-1 font-medium">{donor.country || "—"}</div>
              </div>
              <div className="rounded-xl border border-border bg-secondary/40 p-3">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Member since</div>
                <div className="mt-1 font-medium">{new Date(donor.joined).toLocaleDateString(undefined, { month: "short", year: "numeric" })}</div>
              </div>
              <div className="rounded-xl border border-border bg-secondary/40 p-3 sm:col-span-1">
                <div className="text-xs uppercase tracking-wider text-muted-foreground">About</div>
                <div className="mt-1 line-clamp-2 text-foreground/90">{donor.bio || "Add a short bio so students can thank you personally."}</div>
              </div>
            </div>
          )}
        </section>
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
