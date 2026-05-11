import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Upload, BadgeCheck, Sparkles, ArrowRight } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { myRequests } from "@/lib/mock-data";
import studentImg from "@/assets/student-1.jpg";
import { toast } from "sonner";

export const Route = createFileRoute("/student")({
  head: () => ({
    meta: [
      { title: "Student Dashboard — Ed-Bridge" },
      { name: "description", content: "Manage your funding requests and track donor support." },
    ],
  }),
  component: StudentDashboard,
});

const statusColor: Record<string, string> = {
  pending: "bg-warning/15 text-foreground border-warning/30",
  verified: "bg-primary/10 text-primary border-primary/20",
  funded: "bg-success/15 text-success border-success/30",
  rejected: "bg-destructive/10 text-destructive border-destructive/30",
};

function StudentDashboard() {
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success("Funding request submitted for verification");
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-6 py-12">
        {/* Profile */}
        <section className="mb-10 flex flex-col gap-6 rounded-3xl border border-border/70 bg-card p-6 shadow-[var(--shadow-card)] sm:flex-row sm:items-center">
          <img src={studentImg} alt="" width={96} height={96} className="h-24 w-24 rounded-2xl object-cover" />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-semibold tracking-tight">Amara Okafor</h1>
              <span className="inline-flex items-center gap-1 rounded-full bg-success/15 px-2 py-0.5 text-xs font-medium text-success"><BadgeCheck className="h-3.5 w-3.5" /> Verified</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">Computer Science · University of Lagos · Nigeria</p>
            <div className="mt-3 flex flex-wrap gap-3 text-xs">
              <span className="rounded-full bg-secondary px-3 py-1 text-secondary-foreground">Trust score · 94</span>
              <span className="rounded-full bg-secondary px-3 py-1 text-secondary-foreground">2 active requests</span>
              <span className="rounded-full bg-secondary px-3 py-1 text-secondary-foreground">$1,240 raised</span>
            </div>
          </div>
        </section>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
          {/* Form */}
          <section className="rounded-3xl border border-border/70 bg-card p-7 shadow-[var(--shadow-card)]">
            <h2 className="text-xl font-semibold">Create a funding request</h2>
            <p className="mt-1 text-sm text-muted-foreground">Tell donors what you need and why. Be specific — clarity builds trust.</p>
            <form onSubmit={onSubmit} className="mt-6 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="title">Title of need</Label>
                <Input id="title" required placeholder="e.g. Final-year tuition" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="desc">Description</Label>
                <Textarea id="desc" required rows={5} placeholder="Share your story, your goals, and how this funding will change things." />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="amt">Amount needed (USD)</Label>
                  <Input id="amt" required type="number" min={1} placeholder="1500" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dl">Deadline</Label>
                  <Input id="dl" required type="date" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Supporting document</Label>
                <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border bg-secondary/40 px-6 py-8 text-center text-sm text-muted-foreground transition-colors hover:bg-secondary">
                  <Upload className="h-5 w-5" />
                  <span>Click to upload enrollment letter, ID, or invoice (PDF, JPG)</span>
                  <input type="file" className="hidden" />
                </label>
              </div>
              <Button type="submit" variant="hero" size="lg" className="w-full">
                {submitted ? "Submitted ✓ Awaiting verification" : "Submit for verification"}
              </Button>
            </form>
          </section>

          {/* Active requests */}
          <section>
            <h2 className="mb-4 text-xl font-semibold">My active requests</h2>
            <div className="space-y-4">
              {myRequests.map((r) => {
                const pct = Math.min(100, Math.round((r.amountRaised / r.amountNeeded) * 100));
                return (
                  <div key={r.id} className="rounded-2xl border border-border/70 bg-card p-5 shadow-[var(--shadow-card)]">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-semibold leading-tight">{r.title}</h3>
                      <Badge variant="outline" className={`capitalize ${statusColor[r.status]}`}>{r.status}</Badge>
                    </div>
                    <div className="mt-4 flex items-end justify-between text-sm">
                      <span className="font-semibold">${r.amountRaised.toLocaleString()}</span>
                      <span className="text-muted-foreground">of ${r.amountNeeded.toLocaleString()}</span>
                    </div>
                    <Progress value={pct} className="mt-2 h-2" />
                    <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                      <span>{pct}% funded</span>
                      <span>Due {new Date(r.deadline).toLocaleDateString()}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
