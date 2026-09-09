import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AppShell, PageHeader } from "@/components/edbridge/AppShell";
import { Avatar, Progress, PrototypeNote, StatusBadge, VerificationChecks } from "@/components/edbridge/pieces";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEdBridge } from "@/lib/edbridge/store";
import { peopleById, ugx } from "@/lib/edbridge/data";
import type { Privacy, SupportType } from "@/lib/edbridge/types";
import { toast } from "sonner";

export const Route = createFileRoute("/support/$id")({
  head: () => ({
    meta: [
      { title: "Support request — Ed-Bridge Makerere" },
      { name: "description", content: "A verified Makerere student request: the need, the verification checks and every way you can help." },
      { property: "og:title", content: "Support request — Ed-Bridge Makerere" },
      { property: "og:description", content: "Help with money, mentorship, a resource, an opportunity or a referral." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SupportDetail,
});

const privacies: { id: Privacy; label: string }[] = [
  { id: "private", label: "Private" },
  { id: "recognized", label: "Recognized" },
  { id: "public", label: "Public impact" },
];

const otherOptions: { type: Exclude<SupportType, "financial">; label: string }[] = [
  { type: "mentorship", label: "Mentor this student" },
  { type: "resource", label: "Offer or lend a resource" },
  { type: "opportunity", label: "Connect them to an opportunity" },
  { type: "referral", label: "Make a referral" },
  { type: "amplification", label: "Share with my community" },
];

function SupportDetail() {
  const { id } = Route.useParams();
  const { requests, supportFinancially, offerSupport } = useEdBridge();
  const request = requests.find((r) => r.id === id);
  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("50000");
  const [privacy, setPrivacy] = useState<Privacy>("recognized");

  if (!request) {
    return (
      <AppShell>
        <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
          <h1 className="text-2xl font-semibold">Request not found</h1>
          <p className="mt-2 text-muted-foreground">It may have been removed from the prototype data.</p>
          <Button asChild className="mt-6"><Link to="/explore-support">Back to requests</Link></Button>
        </div>
      </AppShell>
    );
  }

  const person = peopleById[request.personId];

  return (
    <AppShell>
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <PageHeader eyebrow={request.category} title={request.title} subtitle={request.need} />

        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr]">
          <div className="space-y-6">
            <section className="rounded-3xl border border-border/70 bg-card p-6 shadow-[var(--shadow-card)]">
              <div className="flex items-center gap-3">
                <Avatar name={person?.name ?? "Student"} size={52} />
                <div>
                  <p className="font-semibold">{person?.name}</p>
                  <p className="text-sm text-muted-foreground">{person?.headline}</p>
                </div>
                <div className="ml-auto"><StatusBadge status={request.status} /></div>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{request.why}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {request.supportTypes.map((t) => (
                  <Badge key={t} variant="secondary" className="capitalize">{t}</Badge>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-border/70 bg-card p-6 shadow-[var(--shadow-card)]">
              <h2 className="text-lg font-semibold">Verification status</h2>
              <div className="mt-4"><VerificationChecks checks={request.checks} /></div>
            </section>
          </div>

          <aside className="space-y-6">
            <section className="rounded-3xl border border-border/70 bg-card p-6 shadow-[var(--shadow-card)]">
              {request.amountNeeded ? (
                <Progress raised={request.amountRaised ?? 0} needed={request.amountNeeded} />
              ) : (
                <p className="text-sm text-muted-foreground">{request.resourceNeeded ?? "Non-financial support needed"}</p>
              )}
              <p className="mt-3 text-xs text-muted-foreground">{request.supporters} supporters · {request.deadlineDays} days remaining</p>

              <h2 className="mt-6 text-lg font-semibold">How you can help</h2>
              <div className="mt-3 space-y-2">
                <Label className="text-xs">Visibility of your support</Label>
                <div className="flex flex-wrap gap-2">
                  {privacies.map((p) => (
                    <Button key={p.id} size="sm" variant={privacy === p.id ? "default" : "outline"} onClick={() => setPrivacy(p.id)}>
                      {p.label}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="mt-4 space-y-2">
                {request.amountNeeded && (
                  <Button className="w-full" onClick={() => setOpen(true)}>Support financially</Button>
                )}
                {otherOptions
                  .filter((o) => request.supportTypes.includes(o.type))
                  .map((o) => (
                    <Button
                      key={o.type}
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        offerSupport(request.id, o.type, privacy);
                        toast.success(`${o.label} — recorded in your Impact Passport`);
                      }}
                    >
                      {o.label}
                    </Button>
                  ))}
              </div>

              <div className="mt-4"><PrototypeNote /></div>
            </section>
          </aside>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Prototype transaction</DialogTitle>
            <DialogDescription>
              No real money moves. Confirming records a simulated contribution to {person?.name}'s request.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (UGX)</Label>
            <Input id="amount" type="number" min={1000} value={amount} onChange={(e) => setAmount(e.target.value)} />
            <p className="text-xs text-muted-foreground">You are contributing {ugx(Number(amount) || 0)}.</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button
              onClick={() => {
                supportFinancially(request.id, Number(amount) || 0, privacy);
                setOpen(false);
                toast.success("Simulated support recorded");
              }}
            >
              Confirm prototype support
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AppShell>
  );
}
