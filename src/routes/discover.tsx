import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/edbridge/AppShell";
import { NetworkGraph } from "@/components/edbridge/NetworkGraph";
import { PersonCard } from "@/components/edbridge/pieces";
import { peopleById, recommendations } from "@/lib/edbridge/data";

export const Route = createFileRoute("/discover")({
  head: () => ({
    meta: [
      { title: "Discover — Ed-Bridge Makerere" },
      { name: "description", content: "People and opportunities connected to your Ed-Bridge circle at Makerere University." },
      { property: "og:title", content: "Discover — Ed-Bridge Makerere" },
      { property: "og:description", content: "See who in your college, course and school network you can help." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Discover,
});

function Discover() {
  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <PageHeader
          eyebrow="Discover"
          title="People and opportunities connected to your circle"
          subtitle="Relevance comes from shared colleges, courses, secondary schools and communities — never from anyone's financial status."
        />
        <div className="mb-10 rounded-3xl border border-border/70 bg-card p-6 shadow-[var(--shadow-card)]">
          <NetworkGraph />
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {recommendations.map((rec) => {
            const person = peopleById[rec.personId];
            if (!person) return null;
            return <PersonCard key={rec.personId} person={person} relevance={rec.relevance} reasons={rec.reasons} />;
          })}
        </div>
      </div>
    </AppShell>
  );
}
