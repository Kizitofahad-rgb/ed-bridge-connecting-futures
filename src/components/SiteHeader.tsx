import { Link } from "@tanstack/react-router";
import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
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
          <Link to="/admin" className="px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground" activeProps={{ className: "px-3 py-2 text-sm text-foreground font-medium" }}>
            Admin
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
            <Link to="/student">Get Support</Link>
          </Button>
          <Button asChild size="sm" variant="hero">
            <Link to="/browse">Become a Donor</Link>
          </Button>
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
