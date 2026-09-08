import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { AppShell, PageHeader } from "@/components/edbridge/AppShell";
import { RequestCard } from "@/components/edbridge/pieces";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { peopleById } from "@/lib/edbridge/data";
import { useEdBridge } from "@/lib/edbridge/store";

export const Route = createFileRoute("/explore-support")({
  head: () => ({
    meta: [
      { title: "Explore Support — Ed-Bridge" },
      { name: "description", content: "Browse verified Makerere student support requests: tuition, resources, mentorship, opportunities and more." },
      { property: "og:title", content: "Explore Support — Ed-Bridge" },
      { property: "og:description", content: "Verified student needs you can meet with money, mentorship, resources or a referral." },
    ],
  }),
  component: ExploreSupport,
});

function ExploreSupport() {
  const { requests } = useEdBridge();
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("all");
  const [college, setCollege] = useState("all");
  const [status, setStatus] = useState("all");

  const categories = useMemo(() => Array.from(new Set(requests.map((r) => r.category))), [requests]);
  const colleges = useMemo(
    () => Array.from(new Set(requests.map((r) => peopleById[r.personId]?.college).filter(Boolean) as string[])),
    [requests],
  );

  const filtered = requests.filter((r) => {
    const person = peopleById[r.personId];
    return (
      (category === "all" || r.category === category) &&
      (college === "all" || person?.college === college) &&
      (status === "all" || r.status === status) &&
      (q === "" ||
        r.title.toLowerCase().includes(q.toLowerCase()) ||
        (person?.name ?? "").toLowerCase().includes(q.toLowerCase()))
    );
  });

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl px-6 py-12">
        <PageHeader
          eyebrow="Explore support"
          title="Verified student needs at Makerere"
          subtitle="Every request shows exactly what it needs — and every request accepts more than money."
        />

        <div className="mb-8 grid gap-3 rounded-2xl border border-border/70 bg-card p-4 shadow-[var(--shadow-card)] sm:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search requests…" className="pl-9" />
          </div>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={college} onValueChange={setCollege}>
            <SelectTrigger><SelectValue placeholder="College" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All colleges</SelectItem>
              {colleges.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
            </SelectContent>
          </Select>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger><SelectValue placeholder="Verification" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any status</SelectItem>
              <SelectItem value="verified">Verified</SelectItem>
              <SelectItem value="pending">Pending review</SelectItem>
              <SelectItem value="needs-info">Needs more information</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((r) => <RequestCard key={r.id} request={r} />)}
        </div>
        {filtered.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border p-12 text-center text-muted-foreground">
            No requests match these filters yet.
          </div>
        )}
      </div>
    </AppShell>
  );
}
