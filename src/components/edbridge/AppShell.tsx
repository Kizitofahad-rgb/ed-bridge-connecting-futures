import { useState, type ReactNode } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Bell, Menu, Network, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEdBridge, type DemoRole } from "@/lib/edbridge/store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const publicNav = [
  { to: "/explore-support", label: "Explore Support" },
  { to: "/explore-communities", label: "Communities" },
  { to: "/opportunities", label: "Opportunities" },
  { to: "/about", label: "About" },
] as const;

const memberNav = [
  { to: "/student", label: "Dashboard" },
  { to: "/discover", label: "Discover" },
  { to: "/explore-support", label: "Support Requests" },
  { to: "/explore-communities", label: "Communities" },
  { to: "/opportunities", label: "Opportunities" },
  { to: "/impact", label: "Impact Passport" },
] as const;

const roles: { id: DemoRole; label: string; to: string }[] = [
  { id: "student", label: "Demo Student", to: "/student" },
  { id: "supporter", label: "Demo Supporter", to: "/supporter" },
  { id: "community", label: "Demo Community", to: "/explore-communities" },
  { id: "organization", label: "Demo Organization", to: "/organization" },
];

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

export function SiteHeader() {
  const { role, setRole, notifications } = useEdBridge();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const unread = notifications.filter((n) => !n.read).length;
  const nav = role === "visitor" ? publicNav : memberNav;

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[image:var(--gradient-hero)] text-primary-foreground shadow-[var(--shadow-elegant)]">
            <Network className="h-5 w-5" />
          </span>
          <span className="text-lg font-semibold tracking-tight">Ed-Bridge</span>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeProps={{ className: "rounded-lg px-3 py-2 text-sm font-medium text-foreground bg-secondary" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {role !== "visitor" && (
            <Link
              to="/notifications"
              className="relative rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
              {unread > 0 && (
                <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-connection px-1 text-[10px] font-semibold text-white">
                  {unread}
                </span>
              )}
            </Link>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant={role === "visitor" ? "default" : "outline"} size="sm">
                {role === "visitor" ? "Try Demo" : roles.find((r) => r.id === role)?.label ?? "Demo"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Review the prototype as…</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {roles.map((r) => (
                <DropdownMenuItem
                  key={r.id}
                  onClick={() => {
                    setRole(r.id);
                    navigate({ to: r.to });
                  }}
                >
                  {r.label}
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate({ to: "/onboarding" })}>Run onboarding</DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate({ to: "/admin" })}>Admin verification</DropdownMenuItem>
              {role !== "visitor" && (
                <DropdownMenuItem
                  onClick={() => {
                    setRole("visitor");
                    navigate({ to: "/" });
                  }}
                >
                  Exit demo
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <button
            className="rounded-lg p-2 text-muted-foreground lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border/60 bg-background px-4 py-3 lg:hidden">
          {[...nav, { to: "/supporter", label: "Supporter view" }, { to: "/organization", label: "Organization" }].map((n) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
            >
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-secondary/40">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Ed-Bridge — Makerere University student support & opportunity network.</p>
        <p className="opacity-80">Prototype with fictional data. We rise by lifting others.</p>
      </div>
    </footer>
  );
}

export function PageHeader({ title, subtitle, eyebrow }: { title: string; subtitle?: string; eyebrow?: string }) {
  return (
    <div className="mb-8">
      {eyebrow && <p className="text-xs font-semibold uppercase tracking-wider text-connection">{eyebrow}</p>}
      <h1 className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
      {subtitle && <p className="mt-2 max-w-2xl text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
