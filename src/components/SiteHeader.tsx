import { Link, useNavigate } from "@tanstack/react-router";
import { GraduationCap, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDonorAuth } from "@/lib/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function SiteHeader() {
  const { donor, logout } = useDonorAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[image:var(--gradient-hero)] text-primary-foreground shadow-[var(--shadow-elegant)]">
            <GraduationCap className="h-5 w-5" />
          </span>
          <span className="text-lg font-semibold tracking-tight">Ed-Bridge</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          <Link to="/browse" className="px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground" activeProps={{ className: "px-3 py-2 text-sm text-foreground font-medium" }}>
            Browse Students
          </Link>
          <Link to="/student" className="px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground" activeProps={{ className: "px-3 py-2 text-sm text-foreground font-medium" }}>
            Student Dashboard
          </Link>
          <Link to="/donor" className="px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground" activeProps={{ className: "px-3 py-2 text-sm text-foreground font-medium" }}>
            Donor Dashboard
          </Link>
          <Link to="/transparency" className="px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground" activeProps={{ className: "px-3 py-2 text-sm text-foreground font-medium" }}>
            Transparency
          </Link>
          <Link to="/admin" className="px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground" activeProps={{ className: "px-3 py-2 text-sm text-foreground font-medium" }}>
            Admin
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          {donor ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 rounded-full border border-border bg-card px-2 py-1 pr-3 transition-colors hover:bg-secondary">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[image:var(--gradient-hero)] text-xs font-semibold text-primary-foreground">
                    {donor.name.charAt(0).toUpperCase()}
                  </span>
                  <span className="hidden text-sm font-medium sm:inline">{donor.name.split(" ")[0]}</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>
                  <div className="font-medium">{donor.name}</div>
                  <div className="truncate text-xs font-normal text-muted-foreground">{donor.email}</div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate({ to: "/donor" })}>
                  <User className="h-4 w-4" /> My dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate({ to: "/transparency" })}>
                  <ShieldCheck className="h-4 w-4" /> Transparency & impact
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => { logout(); navigate({ to: "/" }); }}>
                  <LogOut className="h-4 w-4" /> Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
                <Link to="/onboarding">I'm a student</Link>
              </Button>
              <Button asChild size="sm" variant="hero">
                <Link to="/login">Sign in</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-secondary/40">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-muted-foreground sm:flex-row">
        <p>© {new Date().getFullYear()} Ed-Bridge. Bridging students to opportunity.</p>
        <p className="opacity-80">Built for global education equity.</p>
      </div>
    </footer>
  );
}
