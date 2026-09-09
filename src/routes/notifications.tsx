import { createFileRoute } from "@tanstack/react-router";
import { Bell } from "lucide-react";
import { AppShell, PageHeader } from "@/components/edbridge/AppShell";
import { Button } from "@/components/ui/button";
import { useEdBridge } from "@/lib/edbridge/store";

export const Route = createFileRoute("/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications — Ed-Bridge Makerere" },
      { name: "description", content: "Mentorship matches, verified requests, community activity and impact updates." },
      { property: "og:title", content: "Notifications — Ed-Bridge Makerere" },
      { property: "og:description", content: "Stay on top of matches, verifications and impact updates." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Notifications,
});

function Notifications() {
  const { notifications, markAllRead } = useEdBridge();
  return (
    <AppShell>
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <PageHeader eyebrow="Activity" title="Notifications" subtitle="Everything happening across your circle and communities." />
        <Button variant="outline" size="sm" onClick={markAllRead} className="mb-6">Mark all as read</Button>
        <ul className="space-y-3">
          {notifications.length === 0 && (
            <li className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">Nothing yet.</li>
          )}
          {notifications.map((n) => (
            <li
              key={n.id}
              className={`flex gap-3 rounded-2xl border p-4 shadow-[var(--shadow-card)] ${n.read ? "border-border/60 bg-card" : "border-connection/30 bg-connection/5"}`}
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-secondary text-connection">
                <Bell className="h-4 w-4" />
              </span>
              <div>
                <p className="font-medium">{n.title}</p>
                <p className="text-sm text-muted-foreground">{n.body}</p>
                <p className="mt-1 text-xs text-muted-foreground">{n.at}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </AppShell>
  );
}
