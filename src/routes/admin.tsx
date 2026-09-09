import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { AppShell, PageHeader } from "@/components/edbridge/AppShell";
import { StatTile, StatusBadge, VerificationChecks } from "@/components/edbridge/pieces";
import { Button } from "@/components/ui/button";
import { useEdBridge } from "@/lib/edbridge/store";
import { peopleById } from "@/lib/edbridge/data";
import type { VerificationState } from "@/lib/edbridge/types";
import { toast } from "sonner";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Verification Queue — Ed-Bridge Makerere" },
      { name: "description", content: "Review Makerere student requests, confirm verification checks and record decisions." },
      { property: "og:title", content: "Verification Queue — Ed-Bridge Makerere" },
      { property: "og:description", content: "Pending review, verified, needs more information, rejected." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Admin,
});

const decisions: { id: VerificationState; label: string }[] = [
  { id: "verified", label: "Verify" },
  { id: "needs-info", label: "Needs more info" },
  { id: "rejected", label: "Reject" },
];

function Admin() {
  const { requests } = useEdBridge();
  const [overrides, setOverrides] = useState<Record<string, VerificationState>>({});

  const statusOf = (id: string, fallback: VerificationState) => overrides[id] ?? fallback;
  const counts = (s: VerificationState) => requests.filter((r) => statusOf(r.id, r.status) === s).length;

  return (
    <AppShell>
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <PageHeader
          eyebrow="Admin"
          title="Verification queue"
          subtitle="Confirm identity, student status and documents before a request goes live. Sensitive documents are never exposed here."
        />

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatTile label="Pending review" value={counts("pending")} />
          <StatTile label="Verified" value={counts("verified")} />
          <StatTile label="Needs more info" value={counts("needs-info")} />
          <StatTile label="Rejected" value={counts("rejected")} />
        </div>

        <div className="space-y-4">
          {requests.map((r) => {
            const person = peopleById[r.personId];
            const status = statusOf(r.id, r.status);
            return (
              <article key={r.id} className="rounded-2xl border border-border/70 bg-card p-6 shadow-[var(--shadow-card)]">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary"><ShieldCheck className="h-4 w-4" /></span>
                      <h3 className="text-lg font-semibold">{person?.name ?? "Student"}</h3>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{r.title} · {r.category}</p>
                  </div>
                  <StatusBadge status={status} />
                </div>

                <div className="mt-5 grid gap-6 lg:grid-cols-2">
                  <p className="text-sm text-muted-foreground">{r.why}</p>
                  <VerificationChecks checks={r.checks} />
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {decisions.map((d) => (
                    <Button
                      key={d.id}
                      size="sm"
                      variant={status === d.id ? "default" : "outline"}
                      onClick={() => {
                        setOverrides((o) => ({ ...o, [r.id]: d.id }));
                        toast.success(`${person?.name ?? "Request"} marked as ${d.label.toLowerCase()}`);
                      }}
                    >
                      {d.label}
                    </Button>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
