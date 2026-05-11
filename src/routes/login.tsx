import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, ShieldCheck, Sparkles, Lock } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDonorAuth } from "@/lib/auth";
import { toast } from "sonner";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in to support a student — Ed-Bridge" },
      { name: "description", content: "Create a donor account to fund verified students directly." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { login } = useDonorAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signup");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    login(email, mode === "signup" ? name : undefined);
    toast.success(mode === "signup" ? "Welcome to Ed-Bridge 🎉" : "Welcome back");
    navigate({ to: "/donor" });
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto grid max-w-6xl gap-10 px-6 py-12 lg:grid-cols-2 lg:py-20">
        {/* Left — pitch */}
        <section className="hidden flex-col justify-center lg:flex">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            <Sparkles className="h-3.5 w-3.5" /> Donor accounts
          </span>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">
            Fund a verified student in under two minutes.
          </h1>
          <p className="mt-3 text-muted-foreground">
            Create a free donor account to track your impact, get milestone updates, and download tax-ready receipts.
          </p>
          <ul className="mt-8 space-y-4">
            {[
              { icon: ShieldCheck, t: "Every student is identity-verified", d: "Government ID + enrollment letter checked by our team." },
              { icon: Heart, t: "100% reaches the student", d: "We charge zero platform fees. Funds release on milestones." },
              { icon: Lock, t: "Donate anonymously if you prefer", d: "You control whether your name is shown to the student." },
            ].map((b) => (
              <li key={b.t} className="flex gap-3">
                <span className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <b.icon className="h-4 w-4" />
                </span>
                <div>
                  <div className="font-medium">{b.t}</div>
                  <div className="text-sm text-muted-foreground">{b.d}</div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Right — form */}
        <section className="flex items-center">
          <div className="w-full rounded-3xl border border-border/70 bg-card p-7 shadow-[var(--shadow-card)] sm:p-9">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold tracking-tight">
                {mode === "signup" ? "Create donor account" : "Welcome back"}
              </h2>
              <button
                type="button"
                onClick={() => setMode(mode === "signup" ? "signin" : "signup")}
                className="text-xs font-medium text-primary hover:underline"
              >
                {mode === "signup" ? "I already have one" : "Create account"}
              </button>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">
              {mode === "signup"
                ? "Free forever. No card required to browse students."
                : "Sign in to continue your impact journey."}
            </p>

            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              {mode === "signup" && (
                <div className="space-y-2">
                  <Label htmlFor="name">Full name</Label>
                  <Input id="name" required value={name} onChange={(e) => setName(e.target.value)} placeholder="Sarah Johnson" />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pw">Password</Label>
                <Input id="pw" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
              </div>
              <Button type="submit" variant="hero" size="lg" className="w-full">
                {mode === "signup" ? "Create account" : "Sign in"}
              </Button>
              <p className="text-center text-xs text-muted-foreground">
                Are you a student?{" "}
                <Link to="/onboarding" className="font-medium text-primary hover:underline">
                  Apply for funding
                </Link>
              </p>
            </form>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
