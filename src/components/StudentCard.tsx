import { Link } from "@tanstack/react-router";
import { BadgeCheck, MapPin, Clock } from "lucide-react";
import type { FundingRequest } from "@/lib/mock-data";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function StudentCard({ r }: { r: FundingRequest }) {
  const pct = Math.min(100, Math.round((r.amountRaised / r.amountNeeded) * 100));
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-elegant)]">
      <div className="relative h-48 overflow-hidden bg-muted">
        <img
          src={r.photo}
          alt={r.studentName}
          loading="lazy"
          width={512}
          height={512}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {r.verified && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-background/95 px-2.5 py-1 text-xs font-medium text-success shadow-sm">
            <BadgeCheck className="h-3.5 w-3.5" /> Verified
          </span>
        )}
        <span className="absolute right-3 top-3">
          <Badge variant={r.urgency === "high" ? "destructive" : r.urgency === "medium" ? "default" : "secondary"} className="capitalize">
            {r.urgency} urgency
          </Badge>
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" /> {r.country}
          <span className="opacity-50">·</span>
          <span>{r.educationLevel}</span>
        </div>
        <h3 className="text-lg font-semibold leading-tight text-foreground">{r.studentName}</h3>
        <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{r.story}</p>

        <div className="mt-4">
          <div className="flex items-end justify-between text-sm">
            <span className="font-semibold text-foreground">${r.amountRaised.toLocaleString()}</span>
            <span className="text-muted-foreground">of ${r.amountNeeded.toLocaleString()}</span>
          </div>
          <Progress value={pct} className="mt-2 h-2" />
          <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
            <span>{pct}% funded</span>
            <span className="inline-flex items-center gap-1"><Clock className="h-3 w-3" /> {new Date(r.deadline).toLocaleDateString()}</span>
          </div>
        </div>

        <Button asChild className="mt-5" variant="hero">
          <Link to="/request/$id" params={{ id: r.id }}>Support Student</Link>
        </Button>
      </div>
    </article>
  );
}
