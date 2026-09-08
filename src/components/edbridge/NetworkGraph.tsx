import { peopleById } from "@/lib/edbridge/data";

interface Node {
  id: string;
  label: string;
  reason: string;
  x: number;
  y: number;
}

const layout: { id: string; reason: string; x: number; y: number }[] = [
  { id: "p-amina", reason: "Same course", x: 82, y: 22 },
  { id: "p-david", reason: "Same secondary school", x: 20, y: 30 },
  { id: "p-sarah", reason: "Mentor in your field", x: 84, y: 74 },
  { id: "p-joel", reason: "Same college", x: 16, y: 76 },
  { id: "p-brian", reason: "Alumni circle", x: 50, y: 8 },
  { id: "p-peter", reason: "Community supporter", x: 50, y: 92 },
];

export function NetworkGraph({ centerLabel = "You" }: { centerLabel?: string }) {
  const nodes: Node[] = layout.map((l) => ({
    ...l,
    label: peopleById[l.id]?.name ?? l.id,
  }));

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-border/70 bg-card p-2 shadow-[var(--shadow-card)] sm:aspect-[16/9]">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        {nodes.map((n) => (
          <line
            key={n.id}
            x1="50"
            y1="50"
            x2={n.x}
            y2={n.y}
            stroke="var(--connection)"
            strokeWidth="0.35"
            strokeDasharray="1.6 1.4"
            opacity="0.55"
          />
        ))}
      </svg>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[image:var(--gradient-hero)] text-xs font-semibold text-primary-foreground shadow-[var(--shadow-elegant)]">
          {centerLabel}
        </div>
      </div>

      {nodes.map((n) => (
        <div
          key={n.id}
          className="absolute -translate-x-1/2 -translate-y-1/2 text-center"
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
        >
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-connection/40 bg-background text-xs font-semibold text-connection transition-transform hover:scale-110">
            {n.label.charAt(0)}
          </div>
          <p className="mt-1 hidden text-[11px] font-medium leading-tight sm:block">{n.label}</p>
          <p className="hidden text-[10px] leading-tight text-muted-foreground md:block">{n.reason}</p>
        </div>
      ))}
    </div>
  );
}
