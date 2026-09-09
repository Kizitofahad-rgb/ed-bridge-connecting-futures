import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/edbridge/AppShell";
import { OpportunityCard } from "@/components/edbridge/pieces";
import { opportunities } from "@/lib/edbridge/data";

export const Route = createFileRoute("/opportunities")({
  head: () => ({
    meta: [
      { title: "Opportunities — Ed-Bridge Makerere" },
      { name: "description", content: "Internships, scholarships, mentorship cohorts and competitions matched to your Makerere communities." },
      { property: "og:title", content: "Opportunities — Ed-Bridge Makerere" },
      { property: "og:description", content: "Opportunities matched to your college, course and communities." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Opportunities,
});

function Opportunities() {
  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <PageHeader
          eyebrow="Opportunities"
          title="Opportunities for you"
          subtitle="Each card explains why it reached you — matching is based on your course, college and communities."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {opportunities.map((o) => (
            <OpportunityCard key={o.id} opportunity={o} />
          ))}
        </div>
      </div>
    </AppShell>
  );
}
