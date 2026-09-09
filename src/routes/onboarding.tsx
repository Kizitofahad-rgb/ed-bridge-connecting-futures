import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Upload, Camera, ShieldCheck, BadgeCheck, FileText, ArrowRight, ArrowLeft, Check } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/edbridge/AppShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Student onboarding — Ed-Bridge" },
      { name: "description", content: "Create your verified student profile and apply for direct funding." },
    ],
  }),
  component: Onboarding,
});

const steps = ["Identity", "Education", "Profile", "Verify"] as const;

function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [photo, setPhoto] = useState<string | null>(null);
  const [docs, setDocs] = useState<string[]>([]);
  const [form, setForm] = useState({
    fullName: "",
    country: "",
    institution: "",
    level: "",
    field: "",
    bio: "",
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onPhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => setPhoto(r.result as string);
    r.readAsDataURL(f);
  };

  const onDocs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    setDocs((d) => [...d, ...files.map((f) => f.name)]);
  };

  const next = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const submit = () => {
    toast.success("Profile submitted! Verification typically completes within 24 hours.");
    setTimeout(() => navigate({ to: "/student" }), 800);
  };

  const pct = ((step + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
        <div className="mb-2 text-xs font-medium uppercase tracking-wider text-primary">Student onboarding</div>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Build your verified profile</h1>
        <p className="mt-2 text-muted-foreground">
          Donors fund people they trust. A complete, verified profile typically raises funds 3× faster.
        </p>

        {/* Stepper */}
        <div className="mt-8">
          <Progress value={pct} className="h-1.5" />
          <ol className="mt-4 grid grid-cols-4 gap-2">
            {steps.map((s, i) => (
              <li
                key={s}
                className={cn(
                  "flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-medium transition-colors",
                  i < step
                    ? "border-success/30 bg-success/10 text-success"
                    : i === step
                      ? "border-primary/30 bg-primary/10 text-primary"
                      : "border-border bg-card text-muted-foreground",
                )}
              >
                <span
                  className={cn(
                    "flex h-5 w-5 items-center justify-center rounded-full text-[10px]",
                    i < step ? "bg-success text-success-foreground" : i === step ? "bg-primary text-primary-foreground" : "bg-muted",
                  )}
                >
                  {i < step ? <Check className="h-3 w-3" /> : i + 1}
                </span>
                <span className="hidden sm:inline">{s}</span>
              </li>
            ))}
          </ol>
        </div>

        <section className="mt-8 rounded-3xl border border-border/70 bg-card p-6 shadow-[var(--shadow-card)] sm:p-8">
          {step === 0 && (
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <label className="group relative flex h-24 w-24 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-border bg-secondary/40 text-muted-foreground transition-colors hover:border-primary hover:text-primary">
                  {photo ? (
                    <img src={photo} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <Camera className="h-6 w-6" />
                  )}
                  <input type="file" accept="image/*" className="hidden" onChange={onPhoto} />
                </label>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">Profile photo</h2>
                  <p className="mt-1 text-sm text-muted-foreground">A clear face photo helps donors connect with your story. JPG or PNG, max 5MB.</p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full name</Label>
                  <Input id="fullName" required value={form.fullName} onChange={set("fullName")} placeholder="Amara Okafor" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" required value={form.country} onChange={set("country")} placeholder="Nigeria" />
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-5">
              <h2 className="text-lg font-semibold">Education</h2>
              <div className="space-y-2">
                <Label htmlFor="institution">Institution / School</Label>
                <Input id="institution" required value={form.institution} onChange={set("institution")} placeholder="University of Lagos" />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Education level</Label>
                  <Select value={form.level} onValueChange={(v) => setForm((f) => ({ ...f, level: v }))}>
                    <SelectTrigger><SelectValue placeholder="Select level" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="High School">High School</SelectItem>
                      <SelectItem value="Vocational">Vocational</SelectItem>
                      <SelectItem value="Undergraduate">Undergraduate</SelectItem>
                      <SelectItem value="Graduate">Graduate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="field">Field of study</Label>
                  <Input id="field" value={form.field} onChange={set("field")} placeholder="Computer Science" />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Your story</h2>
              <p className="text-sm text-muted-foreground">A short biography donors will read. Be specific — what you study, what you dream of, what you've overcome.</p>
              <Textarea rows={8} value={form.bio} onChange={set("bio")} placeholder="I'm a third-year nursing student from Medellín. My mother cleans hospital floors and inspired me to..." />
              <div className="text-right text-xs text-muted-foreground">{form.bio.length}/800</div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-5">
              <h2 className="text-lg font-semibold">Verification documents</h2>
              <p className="text-sm text-muted-foreground">
                Upload at least two of the following. Documents are reviewed by our verification team and never shown publicly.
              </p>
              <ul className="grid gap-2 text-sm text-muted-foreground sm:grid-cols-2">
                {["Government-issued ID", "Enrollment / acceptance letter", "Recent transcript or report card", "Tuition invoice"].map((d) => (
                  <li key={d} className="flex items-center gap-2"><FileText className="h-4 w-4 text-primary" /> {d}</li>
                ))}
              </ul>
              <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-secondary/40 px-6 py-10 text-center text-sm text-muted-foreground transition-colors hover:border-primary hover:bg-secondary">
                <Upload className="h-5 w-5" />
                <span>Click to upload (PDF, JPG, PNG)</span>
                <input type="file" multiple accept=".pdf,image/*" className="hidden" onChange={onDocs} />
              </label>
              {docs.length > 0 && (
                <ul className="space-y-1 rounded-xl border border-border bg-secondary/40 p-3 text-xs">
                  {docs.map((d, i) => (
                    <li key={i} className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-success" /> {d}</li>
                  ))}
                </ul>
              )}

              <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4 text-sm">
                <div className="flex items-center gap-2 font-medium text-primary"><ShieldCheck className="h-4 w-4" /> What happens next</div>
                <ul className="mt-2 space-y-1 text-muted-foreground">
                  <li>• Our team verifies your identity and enrollment within 24 hours.</li>
                  <li>• You receive a <span className="inline-flex items-center gap-1 font-medium text-success"><BadgeCheck className="h-3.5 w-3.5" /> Verified</span> badge and trust score.</li>
                  <li>• Funds release directly to your institution upon donor support.</li>
                </ul>
              </div>
            </div>
          )}

          {/* Nav */}
          <div className="mt-8 flex items-center justify-between">
            <Button type="button" variant="ghost" onClick={back} disabled={step === 0}>
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
            {step < steps.length - 1 ? (
              <Button type="button" variant="hero" onClick={next}>
                Continue <ArrowRight className="h-4 w-4" />
              </Button>
            ) : (
              <Button type="button" variant="hero" onClick={submit}>
                Submit for verification
              </Button>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
