import { BadgeCheck, ShieldCheck, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "verified" | "pending" | "trust";

export function VerificationBadge({
  variant = "verified",
  score,
  className,
}: {
  variant?: Variant;
  score?: number;
  className?: string;
}) {
  if (variant === "pending") {
    return (
      <span className={cn("inline-flex items-center gap-1 rounded-full bg-warning/15 px-2.5 py-1 text-xs font-medium text-foreground", className)}>
        <Clock className="h-3.5 w-3.5" /> Pending verification
      </span>
    );
  }
  if (variant === "trust") {
    return (
      <span className={cn("inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary", className)}>
        <ShieldCheck className="h-3.5 w-3.5" /> Trust score {score ?? "—"}/100
      </span>
    );
  }
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-full bg-success/15 px-2.5 py-1 text-xs font-medium text-success", className)}>
      <BadgeCheck className="h-3.5 w-3.5" /> Verified{typeof score === "number" ? ` · ${score}` : ""}
    </span>
  );
}
