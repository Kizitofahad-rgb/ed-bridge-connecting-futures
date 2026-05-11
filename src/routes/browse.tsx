import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/SiteHeader";
import { StudentCard } from "@/components/StudentCard";
import { requests } from "@/lib/mock-data";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const Route = createFileRoute("/browse")({
  head: () => ({
    meta: [
      { title: "Browse Students — Ed-Bridge" },
      { name: "description", content: "Discover verified students seeking education funding around the world." },
    ],
  }),
  component: Browse,
});

function Browse() {
  const [country, setCountry] = useState("all");
  const [urgency, setUrgency] = useState("all");
  const [level, setLevel] = useState("all");
  const [q, setQ] = useState("");

  const countries = useMemo(() => Array.from(new Set(requests.map((r) => r.country))), []);
  const filtered = requests.filter((r) =>
    (country === "all" || r.country === country) &&
    (urgency === "all" || r.urgency === urgency) &&
    (level === "all" || r.educationLevel === level) &&
    (q === "" || r.studentName.toLowerCase().includes(q.toLowerCase()) || r.title.toLowerCase().includes(q.toLowerCase())),
  );

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Support a student</h1>
          <p className="mt-2 text-muted-foreground">Verified students from around the world. 100% of your contribution goes directly to them.</p>
        </div>

        <div className="mb-8 grid gap-3 rounded-2xl border border-border/70 bg-card p-4 shadow-[var(--shadow-card)] sm:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search students…" className="pl-9" />
          </div>
          <Select value={country} onValueChange={setCountry}>
            <SelectTrigger><SelectValue placeholder="Country" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All countries</SelectItem>
              {countries.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={urgency} onValueChange={setUrgency}>
            <SelectTrigger><SelectValue placeholder="Urgency" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any urgency</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="low">Low</SelectItem>
            </SelectContent>
          </Select>
          <Select value={level} onValueChange={setLevel}>
            <SelectTrigger><SelectValue placeholder="Education level" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All levels</SelectItem>
              <SelectItem value="High School">High School</SelectItem>
              <SelectItem value="Vocational">Vocational</SelectItem>
              <SelectItem value="Undergraduate">Undergraduate</SelectItem>
              <SelectItem value="Graduate">Graduate</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((r) => <StudentCard key={r.id} r={r} />)}
        </div>
        {filtered.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">No students match your filters.</div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
