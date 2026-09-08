import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/edbridge/AppShell";
import { CommunityCard } from "@/components/edbridge/pieces";
import { communities } from "@/lib/edbridge/data";

export const Route = createFileRoute("/explore-communities")({
  head: () => ({
    meta: [
      { title: "Communities — Ed-Bridge" },
      { name: "description", content: "Makerere colleges, courses, secondary school alumni networks and student organizations on Ed-Bridge." },
      { property: "og:title", content: "Communities — Ed-Bridge" },
      { property: "og:description", content: "Communities ranked by students helped, mentorship delivered and opportunities created." },
    ],
  }),
  component: ExploreCommunities,
});

function ExploreCommunities() {
  const leaderboard = [...communities].sort((a, b) => b.studentsHelped - a.studentsHelped);

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-6 py-12">
        <PageHeader
          eyebrow="Communities"
          title="Where connections come from"
          subtitle="Colleges, courses, secondary school alumni networks and student organizations — the trusted units of the Ed-Bridge network."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {communities.map((c) => <CommunityCard key={c.id} community={c} />)}
        </div>

        <section className="mt-14">
          <h2 className="text-2xl font-semibold tracking-tight">Community leaderboard</h2>
          <p className="mt-1 text-sm text-muted-foreground">Ranked by students helped — never by money raised.</p>
          <div className="mt-5 overflow-hidden rounded-2xl border border-border/70 bg-card shadow-[var(--shadow-card)]">
            <table className="w-full text-sm">
              <thead className="bg-secondary/60 text-left text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">Community</th>
                  <th className="px-4 py-3">Students helped</th>
                  <th className="hidden px-4 py-3 sm:table-cell">Mentorship</th>
                  <th className="hidden px-4 py-3 sm:table-cell">Opportunities</th>
                  <th className="hidden px-4 py-3 md:table-cell">Resources</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((c, i) => (
                  <tr key={c.id} className="border-t border-border/60">
                    <td className="px-4 py-3 text-muted-foreground">{i + 1}</td>
                    <td className="px-4 py-3 font-medium">{c.short}</td>
                    <td className="px-4 py-3">{c.studentsHelped}</td>
                    <td className="hidden px-4 py-3 sm:table-cell">{c.mentorshipSessions}</td>
                    <td className="hidden px-4 py-3 sm:table-cell">{c.opportunitiesCreated}</td>
                    <td className="hidden px-4 py-3 md:table-cell">{c.resourcesShared}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
