import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, BadgeCheck, Sparkles, Upload } from "lucide-react";
import { AppShell, PageHeader } from "@/components/edbridge/AppShell";
import { NetworkGraph } from "@/components/edbridge/NetworkGraph";
import { Progress, RequestCard, StatTile, StatusBadge } from "@/components/edbridge/pieces";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEdBridge } from "@/lib/edbridge/store";
import { CURRENT_USER_ID, peopleById, ugx } from "@/lib/edbridge/data";
import { toast } from "sonner";

export const Route = createFileRoute("/student")({
  head: () => ({
    meta: [
      { title: "Student Dashboard — Ed-Bridge Makerere" },
      { name: "description", content: "Your Ed-Bridge circle, recommended support, opportunities and requests at Makerere University." },
      { property: "og:title", content: "Student Dashboard — Ed-Bridge Makerere" },
      { property: "og:description", content: "Your circle, verified requests and opportunities in one place." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StudentDashboard,
});

function StudentDashboard() {
  const { requests, totals, createRequest } = useEdBridge();
  const user = peopleById[CURRENT_USER_ID];
  const mine = requests.filter((r) => r.personId === CURRENT_USER_ID);
  const others = requests.filter((r) => r.personId !== CURRENT_USER_ID).slice(0, 2);

  const [title, setTitle] = useState("");
  const [why, setWhy] = useState("");
  const [amount, setAmount] = useState("");
  const [days, setDays] = useState("14");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createRequest({
      title,
      category: "Tuition",
      need: title,
      why,
      amountNeeded: Number(amount) || undefined,
      amountRaised: 0,
      deadlineDays: Number(days) || 14,
      supportTypes: ["financial", "mentorship", "amplification"],
    });
    setTitle("");
    setWhy("");
    setAmount("");
    toast.success("Request submitted — verification pending");
  };

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <PageHeader
          eyebrow="Student dashboard"
          title={`Good morning, ${user.name.split(" ")[0]}`}
          subtitle={`${user.course} · Year ${user.year} · ${user.college} — here is who and what is close to you today.`}
        />

        <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatTile label="Students supported" value={totals.studentsSupported} />
          <StatTile label="Mentorship links" value={totals.mentorships} />
          <StatTile label="Opportunity referrals" value={totals.referrals} />
          <StatTile label="Communities" value={totals.communities} />
        </div>

        <section className="mb-10 rounded-3xl border border-border/70 bg-card p-6 shadow-[var(--shadow-card)]">
          <h2 className="text-xl font-semibold">Your Ed-Bridge circle</h2>
          <p className="mt-1 text-sm text-muted-foreground">Connections come from your college, course, secondary school and communities.</p>
          <div className="mt-4"><NetworkGraph /></div>
          <Button asChild variant="outline" size="sm" className="mt-4">
            <Link to="/discover">Discover people <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </section>

        <section className="mb-10 flex flex-col items-start justify-between gap-4 rounded-3xl border border-primary/20 bg-primary/5 p-6 sm:flex-row sm:items-center">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary"><Sparkles className="h-5 w-5" /></span>
            <div>
              <h2 className="text-base font-semibold">New to Ed-Bridge?</h2>
              <p className="text-sm text-muted-foreground">Set up your profile, communities and support preferences in four steps.</p>
            </div>
          </div>
          <Button asChild size="sm">
            <Link to="/onboarding">Run onboarding <ArrowRight className="h-4 w-4" /></Link>
          </Button>
        </section>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          <section className="rounded-3xl border border-border/70 bg-card p-7 shadow-[var(--shadow-card)]">
            <h2 className="text-xl font-semibold">Create a support request</h2>
            <p className="mt-1 text-sm text-muted-foreground">Be specific — clarity builds trust. Every request is reviewed before it goes live.</p>
            <form onSubmit={onSubmit} className="mt-6 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="title">What do you need?</Label>
                <Input id="title" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g. Remaining tuition balance" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="why">Why does it matter?</Label>
                <Textarea id="why" required rows={5} value={why} onChange={(e) => setWhy(e.target.value)} placeholder="Share your situation and what this unlocks." />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="amt">Amount needed (UGX)</Label>
                  <Input id="amt" type="number" min={0} value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="350000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dl">Days remaining</Label>
                  <Input id="dl" type="number" min={1} value={days} onChange={(e) => setDays(e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Supporting document</Label>
                <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-secondary/40 px-6 py-8 text-center text-sm text-muted-foreground transition-colors hover:bg-secondary">
                  <Upload className="h-5 w-5" />
                  <span>Upload admission letter, invoice or student ID (prototype only)</span>
                  <input type="file" className="hidden" />
                </label>
              </div>
              <Button type="submit" size="lg" className="w-full">Submit for verification</Button>
            </form>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-semibold">My requests</h2>
            <div className="space-y-4">
              {mine.length === 0 && (
                <p className="rounded-2xl border border-dashed border-border p-6 text-sm text-muted-foreground">
                  You have no requests yet. Create one on the left.
                </p>
              )}
              {mine.map((r) => (
                <div key={r.id} className="rounded-2xl border border-border/70 bg-card p-5 shadow-[var(--shadow-card)]">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-semibold leading-tight">{r.title}</h3>
                    <StatusBadge status={r.status} />
                  </div>
                  {r.amountNeeded ? (
                    <Progress raised={r.amountRaised ?? 0} needed={r.amountNeeded} />
                  ) : (
                    <p className="mt-3 text-sm text-muted-foreground">{r.resourceNeeded ?? r.need}</p>
                  )}
                  <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                    <span>{r.supporters} supporters</span>
                    <span>{r.deadlineDays} days left</span>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="mb-4 mt-8 text-xl font-semibold">Recommended support near you</h2>
            <div className="space-y-4">
              {others.map((r) => (
                <RequestCard key={r.id} request={r} />
              ))}
            </div>
          </section>
        </div>

        <p className="mt-10 flex items-center gap-2 text-xs text-muted-foreground">
          <BadgeCheck className="h-4 w-4 text-success" /> Fictional Makerere data. Amounts such as {ugx(350000)} are illustrative only.
        </p>
      </div>
    </AppShell>
  );
}
