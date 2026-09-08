import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  Briefcase,
  HeartHandshake,
  Laptop,
  Lightbulb,
  Network,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { AppShell } from "@/components/edbridge/AppShell";
import { NetworkGraph } from "@/components/edbridge/NetworkGraph";
import { CommunityCard, RequestCard, StatTile } from "@/components/edbridge/pieces";
import { Button } from "@/components/ui/button";
import { communities, supportRequests, campaign } from "@/lib/edbridge/data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ed-Bridge — Connect. Support. Grow." },
      {
        name: "description",
        content:
          "Ed-Bridge connects Makerere students with the people, communities and opportunities that can help them move forward.",
      },
      { property: "og:title", content: "Ed-Bridge — Connect. Support. Grow." },
      {
        property: "og:description",
        content: "A trusted student support and opportunity network, starting at Makerere University.",
      },
    ],
  }),
  component: Landing,
});

const ways = [
  { icon: HeartHandshake, title: "Financial support", body: "Help clear a verified tuition or accommodation balance." },
  { icon: Lightbulb, title: "Mentorship", body: "Give a student a few hours of guidance in your field." },
  { icon: Laptop, title: "Resources", body: "Lend or donate a laptop, textbooks or lab equipment." },
  { icon: Briefcase, title: "Opportunities", body: "Refer an internship, scholarship or part-time role." },
  { icon: Users, title: "Referrals", body: "Introduce a student to someone who can actually help." },
  { icon: Network, title: "Amplification", body: "Share a verified need with a community that can respond." },
];

function Landing() {
  return (
    <AppShell>
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[image:var(--gradient-soft)]" />
        <div className="pointer-events-none absolute -right-32 -top-32 -z-10 h-[420px] w-[420px] rounded-full bg-connection/10 blur-3xl" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2 lg:py-24">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/70 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-connection" /> Starting at Makerere University
            </span>
            <h1 className="mt-5 text-balance text-5xl font-semibold tracking-tight sm:text-6xl">
              Connect. Support. <span className="bg-[image:var(--gradient-hero)] bg-clip-text text-transparent">Grow.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Ed-Bridge connects students with the people, communities and opportunities that can help them move forward.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link to="/explore-support">
                  Explore Ed-Bridge <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/about">See how it works</Link>
              </Button>
            </div>
            <p className="mt-6 text-sm font-medium text-connection">"We rise by lifting others."</p>
          </div>
          <NetworkGraph centerLabel="Student" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr] lg:items-center">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">The problem is rarely only money</h2>
            <p className="mt-4 text-muted-foreground">
              A student who misses exam registration by UGX 350,000 usually knows nobody who can help — even though someone
              in their college, their course or their old secondary school could. Crowdfunding sends strangers a link.
              Ed-Bridge surfaces the people already connected to that student.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {[
                "Verified student needs, not anonymous appeals",
                "Support that can be money, mentorship, a laptop or an introduction",
                "Communities — colleges, courses, school alumni — as the unit of trust",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-success" /> {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <StatTile label="Students supported" value={216} icon={Users} />
            <StatTile label="Mentorship sessions" value={462} icon={Lightbulb} />
            <StatTile label="Opportunities shared" value={172} icon={Briefcase} />
            <StatTile label="Communities" value={communities.length} icon={Network} />
          </div>
        </div>
      </section>

      <section className="border-y border-border/60 bg-secondary/30 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-3xl font-semibold tracking-tight">How it works</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-4">
            {[
              ["Join your communities", "College, course, secondary school alumni and student organizations."],
              ["See who is around you", "Discover people connected to you by verified shared background."],
              ["Give or receive support", "Money, mentorship, resources, opportunities or a referral."],
              ["Build a verified record", "Every action becomes a traceable entry in your Impact Passport."],
            ].map(([title, body], i) => (
              <div key={title} className="rounded-2xl border border-border/70 bg-card p-5 shadow-[var(--shadow-card)]">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-connection/10 text-sm font-semibold text-connection">
                  {i + 1}
                </span>
                <h3 className="mt-3 font-semibold">{title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <h2 className="text-3xl font-semibold tracking-tight">Different ways to support</h2>
        <p className="mt-2 text-muted-foreground">You do not need money to change a student's semester.</p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ways.map((w) => (
            <div key={w.title} className="rounded-2xl border border-border/70 bg-card p-5 shadow-[var(--shadow-card)] transition-transform hover:-translate-y-1">
              <w.icon className="h-5 w-5 text-primary" />
              <h3 className="mt-3 font-semibold">{w.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{w.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border/60 bg-secondary/30 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight">The community network</h2>
              <p className="mt-2 text-muted-foreground">Communities rank by students helped — never by money raised.</p>
            </div>
            <Button asChild variant="outline">
              <Link to="/explore-communities">All communities</Link>
            </Button>
          </div>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {communities.slice(0, 3).map((c) => (
              <CommunityCard key={c.id} community={c} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Verified student needs</h2>
            <p className="mt-2 text-muted-foreground">Each request passes identity, student status, document and human review.</p>
          </div>
          <Button asChild variant="outline">
            <Link to="/explore-support">Explore all support</Link>
          </Button>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {supportRequests.slice(0, 3).map((r) => (
            <RequestCard key={r.id} request={r} />
          ))}
        </div>
      </section>

      <section className="border-t border-border/60 bg-secondary/30 py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">Transparent impact</h2>
            <p className="mt-3 text-muted-foreground">
              The {campaign.name} campaign has supported {campaign.supportedStudents} of {campaign.goalStudents} students,
              delivered {campaign.laptops} laptops and {campaign.tablets} tablets, and logged{" "}
              {campaign.mentorshipSessions} mentorship sessions this semester.
            </p>
            <p className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-success">
              <ShieldCheck className="h-4 w-4" /> Every contribution creates a traceable impact record.
            </p>
          </div>
          <div className="rounded-2xl border border-border/70 bg-card p-6 text-center shadow-[var(--shadow-card)]">
            <h3 className="text-2xl font-semibold">Ready to see the network?</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Walk through the prototype as a student, supporter, community or organization.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg">
                <Link to="/onboarding">Start onboarding</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/supporter">I want to help</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </AppShell>
  );
}
