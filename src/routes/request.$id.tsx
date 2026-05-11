import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, BadgeCheck, MapPin, Clock, ShieldCheck, EyeOff, Eye, UserCircle2, Lock } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { requests } from "@/lib/mock-data";
import { useDonorAuth } from "@/lib/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/request/$id")({
  loader: ({ params }) => {
    const r = requests.find((x) => x.id === params.id);
    if (!r) throw notFound();
    return r;
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: loaderData ? `${loaderData.studentName} — Ed-Bridge` : "Funding Request — Ed-Bridge" },
      { name: "description", content: loaderData?.title ?? "Support a verified student through Ed-Bridge." },
      { property: "og:image", content: loaderData?.photo ?? "" },
    ],
  }),
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center"><p>Request not found. <Link to="/browse" className="text-primary underline">Browse students</Link></p></div>
  ),
  errorComponent: ({ error }) => <div className="p-12 text-center text-destructive">{error.message}</div>,
  component: RequestDetail,
});

function RequestDetail() {
  const r = Route.useLoaderData();
  const { donor } = useDonorAuth();
  const navigate = useNavigate();
  const [amount, setAmount] = useState("50");
  const [anonymous, setAnonymous] = useState(false);
  const pct = Math.min(100, Math.round((r.amountRaised / r.amountNeeded) * 100));

  const onDonate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donor) {
      toast.message("Please sign in to donate", { description: "Create a free donor account in under a minute." });
      navigate({ to: "/login" });
      return;
    }
    const displayName = anonymous ? "Anonymous Donor" : donor.name;
    toast.success(`Thank you, ${displayName}! $${amount} is on its way to ${r.studentName}.`);
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-6 py-10">
        <Link to="/browse" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-4 w-4" /> Back to browse
        </Link>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <article>
            <div className="overflow-hidden rounded-3xl border border-border/70 shadow-[var(--shadow-card)]">
              <img src={r.photo} alt={r.studentName} width={1280} height={720} className="h-80 w-full object-cover" />
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-semibold tracking-tight">{r.studentName}</h1>
              {r.verified && (
                <span className="inline-flex items-center gap-1 rounded-full bg-success/15 px-2.5 py-1 text-xs font-medium text-success">
                  <BadgeCheck className="h-4 w-4" /> Verified · Trust {r.trustScore}
                </span>
              )}
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {r.country}</span>
              <span>·</span>
              <span>{r.educationLevel}</span>
              <span>·</span>
              <span>{r.school}</span>
            </div>

            <h2 className="mt-8 text-xl font-semibold">{r.title}</h2>
            <p className="mt-3 leading-relaxed text-foreground/90">{r.story}</p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Funds will be released directly to the institution upon verification of milestones. You will receive
              progress updates and a final outcome report from {r.studentName}.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { label: "Verification", value: "Identity + enrollment" },
                { label: "Trust score", value: `${r.trustScore}/100` },
                { label: "Disbursement", value: "Direct to institution" },
              ].map((b) => (
                <div key={b.label} className="rounded-2xl border border-border/70 bg-card p-4">
                  <div className="text-xs uppercase tracking-wider text-muted-foreground">{b.label}</div>
                  <div className="mt-1 font-medium">{b.value}</div>
                </div>
              ))}
            </div>
          </article>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-[var(--shadow-elegant)]">
              <div className="flex items-end justify-between">
                <div className="text-3xl font-semibold">${r.amountRaised.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">of ${r.amountNeeded.toLocaleString()}</div>
              </div>
              <Progress value={pct} className="mt-3 h-2.5" />
              <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
                <span>{pct}% funded</span>
                <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> Deadline {new Date(r.deadline).toLocaleDateString()}</span>
              </div>

              <form onSubmit={onDonate} className="mt-6 space-y-4">
                <div>
                  <Label className="text-xs uppercase tracking-wider text-muted-foreground">Choose an amount</Label>
                  <div className="mt-2 grid grid-cols-4 gap-2">
                    {["25", "50", "100", "250"].map((v) => (
                      <button type="button" key={v} onClick={() => setAmount(v)}
                        className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${amount === v ? "border-primary bg-primary/10 text-primary" : "border-border bg-background hover:bg-secondary"}`}>
                        ${v}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Custom amount (USD)</Label>
                  <Input id="amount" type="number" min={1} value={amount} onChange={(e) => setAmount(e.target.value)} />
                </div>
                <div className="rounded-xl border border-border bg-secondary/40 p-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      {anonymous ? <EyeOff className="h-4 w-4 text-muted-foreground" /> : <Eye className="h-4 w-4 text-primary" />}
                      <div>
                        <div className="text-sm font-medium">Donate anonymously</div>
                        <div className="text-xs text-muted-foreground">
                          {anonymous
                            ? `${r.studentName.split(" ")[0]} will see "Anonymous Donor" instead of your name.`
                            : "Your name and country will be shown to the student."}
                        </div>
                      </div>
                    </div>
                    <Switch checked={anonymous} onCheckedChange={setAnonymous} />
                  </div>
                  <div className="mt-3 flex items-center gap-2 rounded-lg border border-border/70 bg-background px-3 py-2 text-xs">
                    {anonymous ? (
                      <>
                        <Lock className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-muted-foreground">Will appear as <span className="font-medium text-foreground">Anonymous Donor</span></span>
                      </>
                    ) : donor ? (
                      <>
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[image:var(--gradient-hero)] text-[10px] font-semibold text-primary-foreground">
                          {donor.name.charAt(0).toUpperCase()}
                        </span>
                        <span>Will appear as <span className="font-medium text-foreground">{donor.name}</span>{donor.country ? ` · ${donor.country}` : ""}</span>
                      </>
                    ) : (
                      <>
                        <UserCircle2 className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-muted-foreground"><Link to="/login" className="font-medium text-primary hover:underline">Sign in</Link> to attach your identity</span>
                      </>
                    )}
                  </div>
                </div>
                <Button type="submit" variant="hero" size="lg" className="w-full">
                  {donor ? `Support ${r.studentName.split(" ")[0]}` : "Sign in to donate"}
                </Button>
                <p className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground"><ShieldCheck className="h-3.5 w-3.5" /> 100% reaches the student · No fees · Tax-ready receipt</p>
              </form>
            </div>
          </aside>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
