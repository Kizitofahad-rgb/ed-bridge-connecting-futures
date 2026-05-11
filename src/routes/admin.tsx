import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Check, X, ShieldCheck, FileText } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { requests } from "@/lib/mock-data";
import { toast } from "sonner";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Verification — Ed-Bridge" },
      { name: "description", content: "Review student submissions and assign trust scores." },
    ],
  }),
  component: Admin,
});

function Admin() {
  const [items, setItems] = useState(
    requests.map((r) => ({ ...r, _trust: r.trustScore, _decided: r.status === "verified" || r.status === "rejected" ? r.status : null as null | "verified" | "rejected" })),
  );

  const decide = (id: string, decision: "verified" | "rejected") => {
    setItems((s) => s.map((it) => (it.id === id ? { ...it, _decided: decision } : it)));
    toast.success(`Request ${decision === "verified" ? "approved" : "rejected"}`);
  };

  const setTrust = (id: string, v: number) => {
    setItems((s) => s.map((it) => (it.id === id ? { ...it, _trust: v } : it)));
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-8 flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary"><ShieldCheck className="h-5 w-5" /></span>
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Verification dashboard</h1>
            <p className="text-sm text-muted-foreground">Review submissions, assign trust scores, and approve requests.</p>
          </div>
        </div>

        <div className="space-y-4">
          {items.map((r) => (
            <div key={r.id} className="rounded-2xl border border-border/70 bg-card p-6 shadow-[var(--shadow-card)]">
              <div className="grid gap-6 lg:grid-cols-[80px_1fr_320px]">
                <img src={r.photo} alt="" width={80} height={80} className="h-20 w-20 rounded-xl object-cover" />
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-semibold">{r.studentName}</h3>
                    <Badge variant="outline" className="capitalize">{r.country}</Badge>
                    <Badge variant="outline">{r.educationLevel}</Badge>
                    {r._decided === "verified" && <Badge className="bg-success text-success-foreground">Approved</Badge>}
                    {r._decided === "rejected" && <Badge variant="destructive">Rejected</Badge>}
                    {!r._decided && <Badge variant="secondary">Pending review</Badge>}
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">{r.school}</div>
                  <p className="mt-3 text-sm text-foreground/90"><span className="font-medium">{r.title}</span> — {r.story}</p>
                  <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1"><FileText className="h-3 w-3" /> enrollment-letter.pdf</span>
                    <span className="inline-flex items-center gap-1"><FileText className="h-3 w-3" /> id-document.pdf</span>
                    <span>Requested ${r.amountNeeded.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-4 rounded-xl bg-secondary/40 p-4">
                  <div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">Trust score</span>
                      <span className="font-semibold text-primary">{r._trust}</span>
                    </div>
                    <Slider value={[r._trust]} onValueChange={([v]) => setTrust(r.id, v)} min={0} max={100} step={1} className="mt-3" />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => decide(r.id, "verified")} variant="hero" size="sm" className="flex-1"><Check className="h-4 w-4" /> Approve</Button>
                    <Button onClick={() => decide(r.id, "rejected")} variant="outline" size="sm" className="flex-1"><X className="h-4 w-4" /> Reject</Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
