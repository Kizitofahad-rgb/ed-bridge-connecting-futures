import { createFileRoute, Link } from "@tanstack/react-router";
import { Lock, ShieldCheck, Eye, Flag } from "lucide-react";
import { AppShell, PageHeader } from "@/components/edbridge/AppShell";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Ed-Bridge — How the network works" },
      { name: "description", content: "How Ed-Bridge differs from crowdfunding: verified communities, non-financial support and traceable impact." },
      { property: "og:title", content: "About Ed-Bridge — How the network works" },
      { property: "og:description", content: "Verified communities, non-financial support and traceable impact at Makerere University." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <AppShell>
      <div className="mx-auto max-w-4xl px-6 py-14">
        <PageHeader
          eyebrow="About"
          title="A student network, not a donation page"
          subtitle="Ed-Bridge helps a student answer two questions: who around me can help, and who around me might need my help."
        />

        <section className="space-y-4 text-muted-foreground">
          <p>
            Crowdfunding asks strangers for money. Ed-Bridge starts from relationships that already exist — the same college,
            the same course, the same secondary school, the same alumni network — and makes it easy for those people to offer
            whatever they actually have: money, time, a spare laptop, an internship lead or an introduction.
          </p>
          <p>
            The prototype focuses deliberately on Makerere University so the network effects are concrete. All people,
            requests and organizations shown are fictional.
          </p>
        </section>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {[
            { icon: ShieldCheck, title: "Verification", body: "Identity, student status, request documents and human review — each shown separately on every request." },
            { icon: Lock, title: "Privacy by default", body: "Every action can be Private, Recognized or Public. Ed-Bridge never infers or displays anyone's wealth." },
            { icon: Eye, title: "Traceable impact", body: "Support becomes a record — students supported, mentorship given, opportunities referred, resources provided." },
            { icon: Flag, title: "Safety", body: "Report a request or user, block someone, adjust privacy settings. Sensitive documents are never public." },
          ].map((c) => (
            <div key={c.title} className="rounded-2xl border border-border/70 bg-card p-5 shadow-[var(--shadow-card)]">
              <c.icon className="h-5 w-5 text-primary" />
              <h3 className="mt-3 font-semibold">{c.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-dashed border-border bg-secondary/40 p-6">
          <h3 className="font-semibold">What this prototype does not do</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            No real money transfers, no university payment integration, no real identity verification, no medical document
            processing and no production matching algorithms. Financial actions are simulated for demonstration.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button asChild><Link to="/onboarding">Try the student flow</Link></Button>
            <Button asChild variant="outline"><Link to="/supporter">Try the supporter flow</Link></Button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
