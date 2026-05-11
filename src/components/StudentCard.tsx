import { Link } from "@tanstack/react-router";
import { BadgeCheck, MapPin, Clock, Users, ShieldCheck } from "lucide-react";
import type { FundingRequest } from "@/lib/mock-data";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function daysLeft(deadline: string) {
  const d = Math.ceil((new Date(deadline).getTime() - Date.now()) / 86_400_000);
  return d > 0 ? d : 0;
}

export function StudentCard({ r }: { r: FundingRequest }) {
  const pct = Math.min(100, Math.round((r.amountRaised / r.amountNeeded) * 100));
  const left = daysLeft(r.deadline);
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/30 hover:shadow-[var(--shadow-elegant)]">
      <div className="relative h-52 overflow-hidden bg-muted">
        <img
          src={r.photo}
          alt={r.studentName}
          loading="lazy"
          width={512}
          height={512}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/0" />
        {r.verified && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-background/95 px-2.5 py-1 text-xs font-medium text-success shadow-sm backdrop-blur">
            <BadgeCheck className="h-3.5 w-3.5" /> Verified · {r.trustScore}
          </span>
        )}
        <span className="absolute right-3 top-3">
          <Badge
            variant={r.urgency === "high" ? "destructive" : r.urgency === "medium" ? "default" : "secondary"}
            className="capitalize shadow-sm"
          >
            {r.urgency} urgency
          </Badge>
        </span>
        <div className="absolute inset-x-3 bottom-3 flex items-center justify-between text-xs font-medium text-white">
          <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" /> {r.country}</span>
          <span className="rounded-full bg-white/20 px-2 py-0.5 backdrop-blur">{r.fieldOfStudy}</span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{r.educationLevel}</span>
          <span className="inline-flex items-center gap-1"><Users className="h-3 w-3" /> {r.supporters} supporters</span>
        </div>
        <h3 className="mt-2 text-lg font-semibold leading-tight text-foreground">{r.studentName}</h3>
        <p className="mt-1 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{r.story}</p>

        <div className="mt-5">
          <div className="flex items-end justify-between text-sm">
            <span className="text-base font-semibold text-foreground">${r.amountRaised.toLocaleString()}</span>
            <span className="text-muted-foreground">of ${r.amountNeeded.toLocaleString()}</span>
          </div>
          <Progress value={pct} className="mt-2 h-2" />
          <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
            <span className="font-medium text-foreground/80">{pct}% funded</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3 w-3" /> {left > 0 ? `${left} days left` : "Closing soon"}
            </span>
          </div>
        </div>

        <div className="mt-5 flex items-center gap-3">
          <Button asChild className="flex-1" variant="hero">
            <Link to="/request/$id" params={{ id: r.id }}>Support {r.studentName.split(" ")[0]}</Link>
          </Button>
          <span className="hidden items-center gap-1 text-[11px] text-muted-foreground sm:inline-flex">
            <ShieldCheck className="h-3 w-3" /> Direct
          </span>
        </div>
      </div>
    </article>
  );
}
