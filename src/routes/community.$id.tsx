import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/edbridge/AppShell";
import { RequestCard, StatTile } from "@/components/edbridge/pieces";
import { Button } from "@/components/ui/button";
import { useEdBridge } from "@/lib/edbridge/store";
import { communitiesById, communityActivity, peopleById } from "@/lib/edbridge/data";
import { toast } from "sonner";

export const Route = createFileRoute("/community/$id")({
  head: () => ({
    meta: [
      { title: "Community — Ed-Bridge Makerere" },
      { name: "description", content: "Members, support activity, mentorship and opportunities inside a Makerere Ed-Bridge community." },
      { property: "og:title", content: "Community — Ed-Bridge Makerere" },
      { property: "og:description", content: "Communities are ranked by students helped, never by money." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CommunityDetail,
});

function CommunityDetail() {
  const { id } = Route.useParams();
  const { requests, joinedCommunities, joinCommunity } = useEdBridge();
  const community = communitiesById[id];

  if (!community) {
    return (
      <AppShell>
        <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
          <h1 className="text-2xl font-semibold">Community not found</h1>
          <Button asChild className="mt-6"><Link to="/explore-communities">Browse communities</Link></Button>
        </div>
      </AppShell>
    );
  }

  const joined = joinedCommunities.includes(community.id);
  const members = Object.values(peopleById).filter((p) => p.communities.includes(community.id));
  const communityRequests = requests.filter((r) => peopleById[r.personId]?.communities.includes(community.id));
  const activity = communityActivity.filter((a) => a.community === community.id);

  return (
    <AppShell>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <PageHeader eyebrow={community.kind.replace("-", " ")} title={community.short} subtitle={community.tagline} />

        <div className="mb-6 flex flex-wrap gap-3">
          <Button
            disabled={joined}
            onClick={() => {
              joinCommunity(community.id);
              toast.success(`You joined ${community.short}`);
            }}
          >
            {joined ? "You are a member" : "Join this community"}
          </Button>
          <Button variant="outline" asChild><Link to="/explore-communities">All communities</Link></Button>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatTile label="Members" value={community.members.toLocaleString()} />
          <StatTile label="Students helped" value={community.studentsHelped} />
          <StatTile label="Mentorship sessions" value={community.mentorshipSessions} />
          <StatTile label="Opportunities created" value={community.opportunitiesCreated} />
        </div>

        <p className="mb-8 rounded-2xl border border-border/70 bg-card p-5 text-sm text-muted-foreground shadow-[var(--shadow-card)]">
          {community.short} has supported {community.studentsHelped} students this semester.
        </p>

        {communityRequests.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-4 text-xl font-semibold">Requests from this community</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {communityRequests.map((r) => <RequestCard key={r.id} request={r} />)}
            </div>
          </section>
        )}

        <section className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-[var(--shadow-card)]">
            <h2 className="text-lg font-semibold">Recent activity</h2>
            <ul className="mt-4 space-y-4">
              {activity.length === 0 && <li className="text-sm text-muted-foreground">No recent activity logged.</li>}
              {activity.map((a) => (
                <li key={a.id}>
                  <p className="text-sm font-medium">{a.label}</p>
                  <p className="text-sm text-muted-foreground">{a.detail}</p>
                  <p className="text-xs text-muted-foreground">{a.when}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-border/70 bg-card p-6 shadow-[var(--shadow-card)]">
            <h2 className="text-lg font-semibold">Members</h2>
            <ul className="mt-4 space-y-3">
              {members.slice(0, 8).map((m) => (
                <li key={m.id} className="text-sm">
                  <span className="font-medium">{m.name}</span>
                  <span className="text-muted-foreground"> — {m.headline}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
