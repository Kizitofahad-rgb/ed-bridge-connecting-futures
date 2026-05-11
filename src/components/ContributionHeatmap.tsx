import { useMemo, useState } from "react";
import { buildHeatmap } from "@/lib/transparency-data";

interface Props {
  className?: string;
}

// GitHub-style contribution heatmap.
// 7 rows (days) × ~53 cols (weeks). Color scale 0..4 keyed to event count.
export function ContributionHeatmap({ className }: Props) {
  const days = useMemo(() => buildHeatmap(), []);
  const [hover, setHover] = useState<{ date: string; count: number; amount: number; x: number; y: number } | null>(null);

  // Pad the start so the first column begins on Sunday (0).
  const first = new Date(days[0].date + "T00:00:00");
  const padStart = first.getDay(); // 0..6
  const cells: ({ date: string; count: number; amount: number } | null)[] = [
    ...Array(padStart).fill(null),
    ...days,
  ];
  // Group into columns of 7 (week columns).
  const weeks: (typeof cells)[] = [];
  for (let i = 0; i < cells.length; i += 7) weeks.push(cells.slice(i, i + 7));

  const colorFor = (count: number) => {
    if (count <= 0) return "bg-secondary";
    if (count === 1) return "bg-primary/25";
    if (count === 2) return "bg-primary/50";
    if (count === 3) return "bg-primary/75";
    return "bg-primary";
  };

  // Month labels: show the month for the column where day-of-month is small.
  const monthLabels: { col: number; label: string }[] = [];
  weeks.forEach((week, idx) => {
    const firstDay = week.find((c) => c) as { date: string } | undefined;
    if (!firstDay) return;
    const d = new Date(firstDay.date + "T00:00:00");
    if (d.getDate() <= 7) {
      const label = d.toLocaleString(undefined, { month: "short" });
      const last = monthLabels[monthLabels.length - 1];
      if (!last || last.label !== label) monthLabels.push({ col: idx, label });
    }
  });

  const total = days.reduce((s, d) => s + d.count, 0);
  const totalAmount = days.reduce((s, d) => s + d.amount, 0);

  return (
    <div className={className}>
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h3 className="text-base font-semibold">Activity over the last year</h3>
          <p className="text-xs text-muted-foreground">
            {total} contributions · ${totalAmount.toLocaleString()} delivered · {days.filter((d) => d.count > 0).length} active days
          </p>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map((n) => (
            <span key={n} className={`h-3 w-3 rounded-sm ${colorFor(n)}`} />
          ))}
          <span>More</span>
        </div>
      </div>

      <div className="relative mt-4 overflow-x-auto pb-2">
        <div className="inline-block min-w-full">
          {/* Month labels row */}
          <div className="relative ml-7 h-4">
            {monthLabels.map((m) => (
              <span key={m.col + m.label} className="absolute text-[10px] uppercase tracking-wider text-muted-foreground"
                    style={{ left: `${m.col * 14}px` }}>
                {m.label}
              </span>
            ))}
          </div>
          <div className="flex gap-[3px]">
            {/* Day-of-week labels */}
            <div className="mr-1 flex flex-col gap-[3px] pt-px text-[10px] text-muted-foreground">
              {["", "Mon", "", "Wed", "", "Fri", ""].map((d, i) => (
                <span key={i} className="h-[11px] leading-[11px]">{d}</span>
              ))}
            </div>
            {weeks.map((week, wi) => (
              <div key={wi} className="flex flex-col gap-[3px]">
                {week.map((c, di) => (
                  <span
                    key={di}
                    className={`h-[11px] w-[11px] rounded-[2px] ${c ? colorFor(c.count) : "bg-transparent"} transition-transform hover:scale-125`}
                    onMouseEnter={(e) => {
                      if (!c) return;
                      const r = (e.target as HTMLElement).getBoundingClientRect();
                      setHover({ ...c, x: r.left + window.scrollX, y: r.top + window.scrollY });
                    }}
                    onMouseLeave={() => setHover(null)}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {hover && (
        <div
          className="pointer-events-none fixed z-50 -translate-x-1/2 -translate-y-full rounded-md border border-border bg-popover px-2.5 py-1.5 text-xs shadow-lg"
          style={{ left: hover.x + 6, top: hover.y - 6 }}
        >
          <div className="font-medium">
            {hover.count} {hover.count === 1 ? "event" : "events"}
            {hover.amount > 0 ? ` · $${hover.amount}` : ""}
          </div>
          <div className="text-muted-foreground">
            {new Date(hover.date + "T00:00:00").toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric", year: "numeric" })}
          </div>
        </div>
      )}
    </div>
  );
}
