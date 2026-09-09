import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/edbridge/AppShell";
import { PrototypeNote, StatTile } from "@/components/edbridge/pieces";
import { Button } from "@/components/ui/button";
import { campaign, organizations } from "@/lib/edbridge/data";
import { toast } from "sonner";

export const Route = createFileRoute("/organization")({
  head: () => ({
    meta: [
      { title: "Organization Dashboard — Ed-Bridge Makerere" },
      { name: "description", content: "Run campaigns, publish opportunities and track traceable impact as a Makerere partner organization." },
      { property: "og:title", content: "Organization Dashboard — Ed-Bridge Makerere" },
      { property: "og:description", content: "Every contribution creates a traceable impact record." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OrganizationView,
});

function OrganizationView() {
  const org = organizations[0];
  return (
    <AppShell>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <PageHeader eyebrow="Organization" title={org.name} subtitle={org.blurb} />

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatTile label="Students reached" value={org.studentsReached} />
          <StatTile label="Campaigns" value={org.campaigns} />
          <StatTile label="Mentorship sessions" value={org.mentorshipSessions} />
          <StatTile label="Opportunities created" value={org.opportunitiesCreated} />
        </div>

        <section className="mb-8 rounded-3xl border border-border/70 bg-card p-6 shadow-[var(--shadow-card)]">
          <h2 className="text-lg font-semibold">{campaign.name}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Goal {campaign.goalStudents} students · {campaign.supportedStudents} supported · {campaign.laptops} laptops · {campaign.tablets} tablets · {campaign.mentorshipSessions} mentorship sessions
          </p>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-[image:var(--gradient-hero)]"
              style={{ width: `${Math.round((campaign.supportedStudents / campaign.goalStudents) * 100)}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-muted-foreground">Every contribution creates a traceable impact record.</p>
        </section>

        <div className="mb-6 flex flex-wrap gap-3">
          {["Create a campaign", "Support a verified group", "Offer mentorship", "Publish an opportunity", "Generate report"].map((a) => (
            <Button key={a} variant="outline" onClick={() => toast.success(`${a} (prototype)`)}>{a}</Button>
          ))}
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {organizations.map((o) => (
            <div key={o.id} className="rounded-2xl border border-border/70 bg-card p-5 shadow-[var(--shadow-card)]">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">{o.kind}</p>
              <h3 className="mt-1 font-semibold">{o.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{o.blurb}</p>
            </div>
          ))}
        </div>

        <div className="mt-8"><PrototypeNote /></div>
      </div>
    </AppShell>
  );
}
