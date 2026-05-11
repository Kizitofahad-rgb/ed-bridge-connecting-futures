import { ShieldCheck } from "lucide-react";

interface Props {
  score: number; // 0-100
  size?: number;
  label?: string;
  tier?: string;
  className?: string;
}

export function TrustScoreRing({ score, size = 120, label = "Trust score", tier, className }: Props) {
  const r = (size - 12) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (score / 100) * c;
  const tone = score >= 90 ? "text-success" : score >= 75 ? "text-primary" : score >= 50 ? "text-warning" : "text-destructive";

  return (
    <div className={`relative inline-flex flex-col items-center ${className ?? ""}`}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} className="fill-none stroke-secondary" strokeWidth={8} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          className={`fill-none ${tone} transition-all duration-700`}
          stroke="currentColor"
          strokeWidth={8}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <ShieldCheck className={`h-4 w-4 ${tone}`} />
        <div className="text-2xl font-semibold leading-none">{score}</div>
        <div className="mt-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">/ 100</div>
      </div>
      <div className="mt-2 text-center">
        <div className="text-xs font-medium">{label}</div>
        {tier && <div className="text-[11px] text-muted-foreground">{tier} tier</div>}
      </div>
    </div>
  );
}
