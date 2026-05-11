import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, HeartHandshake, Sparkles, Globe2, GraduationCap, BadgeCheck, Quote, Lock, Eye, Receipt } from "lucide-react";
import heroImg from "@/assets/hero-student.jpg";
import { Button } from "@/components/ui/button";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { ImpactStats } from "@/components/ImpactStats";
import { successStories } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ed-Bridge — Bridging Students to Opportunity" },
      { name: "description", content: "A global education funding platform connecting students with donors who believe in their potential." },
      { property: "og:title", content: "Ed-Bridge — Bridging Students to Opportunity" },
      { property: "og:description", content: "Direct, transparent education funding for students worldwide." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[image:var(--gradient-soft)]" />
        <div className="pointer-events-none absolute -right-32 -top-32 -z-10 h-[480px] w-[480px] rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-32 top-40 -z-10 h-[360px] w-[360px] rounded-full bg-accent/20 blur-3xl" />

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:py-28">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/70 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-primary" /> Global education equity, made personal
            </span>
            <h1 className="mt-5 text-balance text-5xl font-semibold tracking-tight text-foreground sm:text-6xl">
              Bridging Students to <span className="bg-[image:var(--gradient-hero)] bg-clip-text text-transparent">Opportunity</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Ed-Bridge connects students facing financial barriers with donors who believe in their future — directly,
              transparently, and verifiably. Every dollar tells a story.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="hero">
                <Link to="/student">Get Support <ArrowRight className="h-4 w-4" /></Link>
              </Button>
              <Button asChild size="lg" variant="soft">
                <Link to="/browse">Become a Donor</Link>
              </Button>
            </div>

            <div className="mt-10 grid max-w-md grid-cols-3 gap-6">
              {[
                { k: "12,400+", v: "Students funded" },
                { k: "$3.8M", v: "Directly delivered" },
                { k: "62", v: "Countries reached" },
              ].map((s) => (
                <div key={s.v}>
                  <div className="text-2xl font-semibold text-foreground">{s.k}</div>
                  <div className="text-xs text-muted-foreground">{s.v}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-3xl border border-border/60 shadow-[var(--shadow-elegant)]">
              <img src={heroImg} alt="A student smiling, holding books" width={1280} height={960} className="h-full w-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden w-64 rounded-2xl border border-border/60 bg-card p-4 shadow-[var(--shadow-card)] sm:block">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-success/15 text-success">
                  <BadgeCheck className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-sm font-semibold">Verified Student</div>
                  <div className="text-xs text-muted-foreground">Identity & enrollment confirmed</div>
                </div>
              </div>
            </div>
            <div className="absolute -right-4 top-8 hidden w-56 rounded-2xl border border-border/60 bg-card p-4 shadow-[var(--shadow-card)] sm:block">
              <div className="text-xs text-muted-foreground">Tuition · Lagos</div>
              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-xl font-semibold">$1,240</span>
                <span className="text-xs text-muted-foreground">/ $1,800</span>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <div className="h-full w-2/3 rounded-full bg-[image:var(--gradient-hero)]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact stats */}
      <ImpactStats />

      {/* Transparency badges */}
      <section className="mx-auto max-w-7xl px-6 pt-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: ShieldCheck, t: "ID-verified students", d: "Government ID + enrollment letter" },
            { icon: Receipt, t: "100% direct delivery", d: "Funds wired to the institution" },
            { icon: Eye, t: "Public donation ledger", d: "Every contribution traceable" },
            { icon: Lock, t: "Zero platform fees", d: "Operations covered by foundations" },
          ].map((b) => (
            <div key={b.t} className="flex items-start gap-3 rounded-2xl border border-border/70 bg-card p-4 transition-colors hover:border-primary/30">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <b.icon className="h-5 w-5" />
              </span>
              <div>
                <div className="text-sm font-semibold text-foreground">{b.t}</div>
                <div className="text-xs text-muted-foreground">{b.d}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">How Ed-Bridge works</h2>
          <p className="mt-3 text-muted-foreground">Three simple steps from need to opportunity.</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            { icon: GraduationCap, title: "Students share their story", desc: "Verified students publish a funding request with documents and a clear goal." },
            { icon: ShieldCheck, title: "We verify everything", desc: "Our team reviews identity, enrollment, and need before requests go live." },
            { icon: HeartHandshake, title: "Donors fund directly", desc: "Contribute any amount. 100% reaches the student. Track impact in real time." },
          ].map((step, i) => (
            <div key={step.title} className="relative rounded-2xl border border-border/70 bg-card p-7 shadow-[var(--shadow-card)]">
              <div className="absolute right-5 top-5 text-5xl font-bold leading-none text-primary/10">0{i + 1}</div>
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <step.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Trust */}
      <section className="bg-secondary/40 py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">Transparency & trust</span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">Every dollar, every milestone — visible.</h2>
            <p className="mt-4 text-muted-foreground">
              We believe radical transparency is the only way philanthropy scales. Each student receives a trust score,
              every donation is publicly tracked, and milestones are confirmed before funds release.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {["Independent identity & enrollment verification", "Trust score updated with each milestone", "Public ledger of donations and outcomes", "Direct delivery — no platform fees"].map((t) => (
                <li key={t} className="flex items-start gap-3"><BadgeCheck className="mt-0.5 h-5 w-5 text-success" /> <span className="text-foreground">{t}</span></li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { k: "100%", v: "of funds reach students" },
              { k: "98%", v: "verified completion rate" },
              { k: "24h", v: "avg verification time" },
              { k: "4.9/5", v: "donor trust rating" },
            ].map((c) => (
              <div key={c.v} className="rounded-2xl border border-border/70 bg-card p-6 shadow-[var(--shadow-card)]">
                <div className="text-3xl font-semibold text-foreground">{c.k}</div>
                <div className="mt-1 text-sm text-muted-foreground">{c.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stories */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Student success stories</h2>
            <p className="mt-2 text-muted-foreground">Real graduates. Real careers. Powered by donors like you.</p>
          </div>
          <Globe2 className="hidden h-10 w-10 text-primary/40 sm:block" />
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {successStories.map((s) => (
            <figure key={s.name} className="group flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[var(--shadow-elegant)]">
              <div className="relative h-44 overflow-hidden">
                <img src={s.photo} alt={s.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0" />
                <span className="absolute left-3 top-3 rounded-full bg-success/90 px-2.5 py-1 text-[11px] font-medium text-success-foreground shadow-sm">
                  Funded · ${s.amountFunded.toLocaleString()}
                </span>
                <div className="absolute inset-x-3 bottom-3 text-xs font-medium text-white/90">{s.country}</div>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <Quote className="h-5 w-5 text-primary/40" />
                <blockquote className="mt-2 leading-relaxed text-foreground/90">{s.quote}</blockquote>
                <figcaption className="mt-5 flex items-center justify-between border-t border-border/60 pt-4">
                  <div>
                    <div className="font-semibold">{s.name}</div>
                    <div className="text-xs text-muted-foreground">{s.role}</div>
                  </div>
                  <div className="text-right text-xs text-muted-foreground">
                    <div className="font-semibold text-foreground">{s.supporters}</div>
                    <div>supporters</div>
                  </div>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl bg-[image:var(--gradient-hero)] p-12 text-primary-foreground shadow-[var(--shadow-elegant)] sm:p-16">
          <div className="grid items-center gap-6 sm:grid-cols-[1fr_auto]">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Be someone's bridge today.</h2>
              <p className="mt-3 max-w-xl text-primary-foreground/90">Browse verified students and fund the future directly. Or start your own request — we'll guide you.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" variant="secondary"><Link to="/browse">Browse students</Link></Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"><Link to="/student">Apply for support</Link></Button>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
