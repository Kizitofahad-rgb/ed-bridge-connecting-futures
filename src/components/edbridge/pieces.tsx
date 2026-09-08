import { Link } from "@tanstack/react-router";
import {
  BadgeCheck,
  Building2,
  CalendarClock,
  CheckCircle2,
  Circle,
  GraduationCap,
  HeartHandshake,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { communitiesById, peopleById, ugx } from "@/lib/edbridge/data";
import type { Community, Opportunity, Person, SupportRequest } from "@/lib/edbridge/types";

export function Avatar({ name, size = 40, accent = "primary" }: { name: string; size?: number; accent?: "primary" | "connection" }) {
  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
  return (
    <span
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full font-semibold text-white",
        accent === "primary" ? "bg-[image:var(--gradient-hero)]" : "bg-connection",
      )}
      style={{ height: size, width: size, fontSize: size / 2.8 }}
    >
      {initials}
    </span>
  );
}

export function StatusBadge({ status }: { status: SupportRequest["status"] }) {
  const map = {
    verified: { label: "Verified", cls: "border-success/30 bg-success/10 text-success" },
    pending: { label: "Pending review", cls: "border-warning/40 bg-warning/10 text-warning" },
    "needs-info": { label: "Needs more information", cls: "border-connection/30 bg-connection/10 text-connection" },
    rejected: { label: "Rejected", cls: "border-destructive/30 bg-destructive/10 text-destructive" },
  } as const;
  const s = map[status];
  return <span className={cn("inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium", s.cls)}>
    <BadgeCheck className="h-3.5 w-3.5" /> {s.label}
  </span>;
}

export function VerificationChecks({ checks }: { checks: SupportRequest["checks"] }) {
  const items: [string, boolean][] = [
    ["Identity verified", checks.identity],
    ["Student status verified", checks.studentStatus],
    ["Request documents checked", checks.documents],
    ["Human review complete", checks.humanReview],
  ];
  return (
    <ul className="space-y-2">
      {items.map(([label, ok]) => (
        <li key={label} className="flex items-center gap-2 text-sm">
          {ok ? (
            <CheckCircle2 className="h-4 w-4 text-success" />
          ) : (
            <Circle className="h-4 w-4 text-muted-foreground" />
          )}
          <span className={ok ? "text-foreground" : "text-muted-foreground"}>{label}</span>
        </li>
      ))}
    </ul>
  );
}

export function Progress({ raised, needed }: { raised: number; needed: number }) {
  const pct = Math.min(100, Math.round((raised / needed) * 100));
  return (
    <div>
      <div className="flex items-baseline justify-between text-sm">
        <span className="font-medium">{ugx(raised)}</span>
        <span className="text-muted-foreground">of {ugx(needed)}</span>
      </div>
      <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
        <div className="h-full rounded-full bg-[image:var(--gradient-hero)] transition-all duration-700" style={{ width: `${pct}%` }} />
      </div>
      <p className="mt-1 text-xs text-muted-foreground">{pct}% funded</p>
    </div>
  );
}

export function RequestCard({ request }: { request: SupportRequest }) {
  const person = peopleById[request.personId];
  return (
    <article className="group flex flex-col rounded-2xl border border-border/70 bg-card p-5 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-[var(--shadow-elegant)]">
      <div className="flex items-start gap-3">
        <Avatar name={person?.name ?? "Student"} />
        <div className="min-w-0">
          <p className="truncate font-semibold">{person?.name}</p>
          <p className="truncate text-xs text-muted-foreground">{person?.headline}</p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Badge variant="secondary">{request.category}</Badge>
        <StatusBadge status={request.status} />
      </div>
      <h3 className="mt-3 text-base font-semibold leading-snug">{request.title}</h3>
      <p className="mt-2 line-clamp-3 flex-1 text-sm text-muted-foreground">{request.need}</p>
      <div className="mt-4 space-y-3">
        {request.amountNeeded ? <Progress raised={request.amountRaised ?? 0} needed={request.amountNeeded} /> : null}
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1"><CalendarClock className="h-3.5 w-3.5" /> {request.deadlineDays} days left</span>
          <span className="inline-flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {request.supporters} supporters</span>
        </div>
        <Button asChild className="w-full">
          <Link to="/support/$id" params={{ id: request.id }}>See how you can help</Link>
        </Button>
      </div>
    </article>
  );
}

export function PersonCard({ person, relevance, reasons }: { person: Person; relevance?: number; reasons?: string[] }) {
  return (
    <article className="relative rounded-2xl border border-border/70 bg-card p-5 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:border-connection/40">
      {relevance !== undefined && (
        <span className="absolute right-4 top-4 rounded-full bg-connection/10 px-2.5 py-1 text-xs font-semibold text-connection">
          {relevance}% relevance
        </span>
      )}
      <div className="flex items-center gap-3">
        <Avatar name={person.name} accent="connection" size={44} />
        <div className="min-w-0">
          <p className="flex items-center gap-1 font-semibold">
            {person.name}
            {person.verified && <BadgeCheck className="h-4 w-4 text-success" />}
          </p>
          <p className="truncate text-xs text-muted-foreground">{person.headline}</p>
        </div>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">{person.bio}</p>
      {reasons && (
        <ul className="mt-3 space-y-1">
          {reasons.map((r) => (
            <li key={r} className="flex items-center gap-2 text-xs text-connection">
              <span className="h-px w-4 bg-connection" /> {r}
            </li>
          ))}
        </ul>
      )}
      <p className="mt-3 text-[11px] text-muted-foreground">Connection relevance is based on shared communities — not a validated prediction.</p>
    </article>
  );
}

export function CommunityCard({ community }: { community: Community }) {
  return (
    <Link
      to="/community/$id"
      params={{ id: community.id }}
      className="block rounded-2xl border border-border/70 bg-card p-5 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/30"
    >
      <div className="flex items-center justify-between">
        <Badge variant="secondary" className="capitalize">{community.kind.replace("-", " ")}</Badge>
        <span className="text-xs text-muted-foreground">{community.members.toLocaleString()} members</span>
      </div>
      <h3 className="mt-3 text-lg font-semibold">{community.short}</h3>
      <p className="text-xs text-muted-foreground">{community.name}</p>
      <p className="mt-2 text-sm text-muted-foreground">{community.tagline}</p>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        {[
          ["Students helped", community.studentsHelped],
          ["Mentorship", community.mentorshipSessions],
          ["Opportunities", community.opportunitiesCreated],
        ].map(([label, value]) => (
          <div key={label as string} className="rounded-xl bg-secondary/60 p-2">
            <p className="text-base font-semibold">{value as number}</p>
            <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{label as string}</p>
          </div>
        ))}
      </div>
    </Link>
  );
}

export function OpportunityCard({ opportunity }: { opportunity: Opportunity }) {
  return (
    <article className="rounded-2xl border border-border/70 bg-card p-5 shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:border-cyan/40">
      <div className="flex items-center justify-between gap-2">
        <Badge variant="secondary">{opportunity.kind}</Badge>
        <span className="text-xs text-muted-foreground">Closes in {opportunity.closesInDays} days</span>
      </div>
      <h3 className="mt-3 font-semibold">{opportunity.title}</h3>
      <p className="text-xs text-muted-foreground"><Building2 className="mr-1 inline h-3 w-3" />{opportunity.org} · {opportunity.location}</p>
      <p className="mt-2 text-sm text-muted-foreground">{opportunity.summary}</p>
      <details className="mt-3 rounded-xl bg-secondary/60 p-3 text-sm">
        <summary className="cursor-pointer text-xs font-medium text-primary">Why am I seeing this?</summary>
        <p className="mt-2 text-xs text-muted-foreground">{opportunity.matchReason}</p>
        <p className="mt-1 text-[11px] text-muted-foreground">
          Communities: {opportunity.communities.map((c) => communitiesById[c]?.short ?? c).join(", ")}
        </p>
      </details>
    </article>
  );
}

export function StatTile({ label, value, icon: Icon }: { label: string; value: string | number; icon?: typeof HeartHandshake }) {
  return (
    <div className="rounded-2xl border border-border/70 bg-card p-5 shadow-[var(--shadow-card)]">
      <div className="flex items-center gap-2 text-muted-foreground">
        {Icon ? <Icon className="h-4 w-4" /> : <GraduationCap className="h-4 w-4" />}
        <span className="text-xs font-medium uppercase tracking-wide">{label}</span>
      </div>
      <p className="mt-2 text-3xl font-semibold tracking-tight">{value}</p>
    </div>
  );
}

export function PrototypeNote({ children }: { children?: React.ReactNode }) {
  return (
    <p className="rounded-xl border border-dashed border-border bg-secondary/50 px-3 py-2 text-xs text-muted-foreground">
      {children ?? "Prototype — simulated transaction. No real money moves."}
    </p>
  );
}
