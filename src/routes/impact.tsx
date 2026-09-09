import { createFileRoute } from "@tanstack/react-router";
import { Award, Share2, ShieldCheck } from "lucide-react";
import { AppShell, PageHeader } from "@/components/edbridge/AppShell";
import { StatTile } from "@/components/edbridge/pieces";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useEdBridge } from "@/lib/edbridge/store";
import { CURRENT_USER_ID, communitiesById, peopleById } from "@/lib/edbridge/data";
import { toast } from "sonner";

export const Route = createFileRoute("/impact")({
  head: () => ({
    meta: [
      { title: "Impact Passport — Ed-Bridge Makerere" },
      { name: "description", content: "A verified record of students supported, mentorship given, opportunities referred and communities joined." },
      { property: "og:title", content: "Impact Passport — Ed-Bridge Makerere" },
      { property: "og:description", content: "Badges reflect verified contribution, never wealth." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ImpactPassport,
});

const privacyLabel: Record<string, string> = {
  private: "Private",
  recognized: "Recognized",
  public: "Public impact",
};

function ImpactPassport() {
  const { impact, totals, joinedCommunities } = useEdBridge();
  const user = peopleById[CURRENT_USER_ID];

  return (
    <AppShell>
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <PageHeader eyebrow="Impact passport" title={`${user.name} — Ed-Bridge Impact Passport`} subtitle="Optional public profile. Badges represent verified, meaningful contribution — not wealth." />

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatTile label="Students supported" value={totals.studentsSupported} />
          <StatTile label="Mentorship connections" value={totals.mentorships} />
          <StatTile label="Opportunity referrals" value={totals.referrals} />
          <StatTile label="Resources provided" value={totals.resources} />
        </div>

        <section className="mb-8 rounded-3xl border border-border/70 bg-card p-6 shadow-[var(--shadow-card)]">
          <h2 className="text-lg font-semibold">Communities</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {joinedCommunities.map((c) => (
              <Badge key={c} variant="secondary">{communitiesById[c]?.short ?? c}</Badge>
            ))}
          </div>
          <h2 className="mt-6 text-lg font-semibold">Achievements</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {["Community Builder", "Mentor", "Student Supporter"].map((a) => (
              <span key={a} className="inline-flex items-center gap-1 rounded-full border border-connection/30 bg-connection/10 px-3 py-1 text-xs font-medium text-connection">
                <Award className="h-3.5 w-3.5" /> {a}
              </span>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button onClick={() => toast.success("Impact certificate generated (prototype)")}>
              <ShieldCheck className="h-4 w-4" /> Generate impact certificate
            </Button>
            <Button variant="outline" onClick={() => toast.success("Shareable link copied (prototype)")}>
              <Share2 className="h-4 w-4" /> Share impact profile
            </Button>
            <Button variant="ghost" onClick={() => toast("Your identity is now hidden on public views (prototype)")}>Keep my identity private</Button>
          </div>
        </section>

        <section className="rounded-3xl border border-border/70 bg-card p-6 shadow-[var(--shadow-card)]">
          <h2 className="text-lg font-semibold">Activity timeline</h2>
          <ol className="mt-4 space-y-4 border-l border-border pl-5">
            {impact.map((e) => (
              <li key={e.id} className="relative">
                <span className="absolute -left-[26px] top-1.5 h-2.5 w-2.5 rounded-full bg-connection" />
                <p className="text-sm font-medium">{e.label}</p>
                <p className="text-sm text-muted-foreground">{e.detail}</p>
                <p className="mt-1 text-xs text-muted-foreground">{e.date} · {privacyLabel[e.privacy]}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </AppShell>
  );
}
