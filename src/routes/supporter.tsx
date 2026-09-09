import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, PageHeader } from "@/components/edbridge/AppShell";
import { RequestCard, StatTile } from "@/components/edbridge/pieces";
import { Button } from "@/components/ui/button";
import { useEdBridge } from "@/lib/edbridge/store";
import { peopleById } from "@/lib/edbridge/data";

export const Route = createFileRoute("/supporter")({
  head: () => ({
    meta: [
      { title: "Supporter Dashboard — Ed-Bridge Makerere" },
      { name: "description", content: "Find verified Makerere students you can help with money, mentorship, resources or opportunities." },
      { property: "og:title", content: "Supporter Dashboard — Ed-Bridge Makerere" },
      { property: "og:description", content: "Make an impact where it matters." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Supporter,
});

const filters = ["All", "My college", "My course", "My secondary school", "Urgent needs", "Mentorship", "Resources"] as const;

function Supporter() {
  const { requests, totals } = useEdBridge();
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");

  const visible = requests.filter((r) => {
    const person = peopleById[r.personId];
    switch (filter) {
      case "My college":
        return person?.college === "CoCIS";
      case "My course":
        return person?.course === "Computer Science";
      case "My secondary school":
        return person?.secondarySchool === "Busia Secondary School";
      case "Urgent needs":
        return r.deadlineDays <= 14;
      case "Mentorship":
        return r.supportTypes.includes("mentorship");
      case "Resources":
        return r.supportTypes.includes("resource");
      default:
        return true;
    }
  });

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <PageHeader
          eyebrow="Supporter dashboard"
          title="Make an impact where it matters"
          subtitle={`You have ${visible.length} relevant support opportunities right now.`}
        />

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatTile label="Students supported" value={totals.studentsSupported} />
          <StatTile label="Mentorships" value={totals.mentorships} />
          <StatTile label="Referrals" value={totals.referrals} />
          <StatTile label="Communities" value={totals.communities} />
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {filters.map((f) => (
            <Button key={f} size="sm" variant={filter === f ? "default" : "outline"} onClick={() => setFilter(f)}>
              {f}
            </Button>
          ))}
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((r) => (
            <RequestCard key={r.id} request={r} />
          ))}
        </div>
        {visible.length === 0 && (
          <p className="rounded-2xl border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
            No requests match this filter yet.
          </p>
        )}
      </div>
    </AppShell>
  );
}
