import { useState } from "react";
import { FileCheck2, FileText, GraduationCap, Receipt, Upload, BadgeCheck, Clock, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { proofItems, type ProofOfImpactItem } from "@/lib/transparency-data";
import { toast } from "sonner";

const typeMeta: Record<ProofOfImpactItem["type"], { label: string; icon: typeof Receipt }> = {
  fee_receipt: { label: "Fee receipt", icon: Receipt },
  academic_report: { label: "Academic report", icon: FileText },
  certificate: { label: "Certificate", icon: GraduationCap },
  progress_update: { label: "Progress update", icon: FileCheck2 },
};

interface Props {
  studentId?: string; // Filter to a specific student
  uploadable?: boolean; // Show the uploader UI
  className?: string;
}

export function ProofOfImpact({ studentId, uploadable = false, className }: Props) {
  const [items, setItems] = useState<ProofOfImpactItem[]>(
    studentId ? proofItems.filter((p) => p.studentId === studentId) : proofItems
  );
  const [pickedType, setPickedType] = useState<ProofOfImpactItem["type"]>("fee_receipt");

  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const newItem: ProofOfImpactItem = {
      id: `p${Date.now()}`,
      studentId: studentId ?? "r1",
      studentName: "You",
      type: pickedType,
      title: file.name.replace(/\.[^.]+$/, ""),
      date: new Date().toISOString().slice(0, 10),
      fileLabel: file.name,
      thumbColor: "from-primary/30 to-primary/5",
      verified: false,
    };
    setItems((arr) => [newItem, ...arr]);
    toast.success("Proof uploaded — pending verification");
    e.target.value = "";
  };

  return (
    <section className={className}>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight">Proof of Impact</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Receipts, transcripts, certificates and progress updates — uploaded by students, verified by Ed-Bridge.
          </p>
        </div>
        {uploadable && (
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={pickedType}
              onChange={(e) => setPickedType(e.target.value as ProofOfImpactItem["type"])}
              className="h-9 rounded-lg border border-border bg-background px-3 text-sm"
            >
              {Object.entries(typeMeta).map(([k, v]) => (
                <option key={k} value={k}>{v.label}</option>
              ))}
            </select>
            <label>
              <input type="file" className="hidden" onChange={onUpload} />
              <Button asChild variant="hero" size="sm">
                <span className="cursor-pointer"><Plus className="h-4 w-4" /> Upload proof</span>
              </Button>
            </label>
          </div>
        )}
      </div>

      {uploadable && (
        <label className="mt-5 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-border bg-secondary/40 px-6 py-10 text-center text-sm text-muted-foreground transition-colors hover:bg-secondary">
          <Upload className="h-5 w-5" />
          <span>Drop a file or click to upload — PDF, JPG or PNG · {typeMeta[pickedType].label}</span>
          <input type="file" className="hidden" onChange={onUpload} />
        </label>
      )}

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it) => {
          const Icon = typeMeta[it.type].icon;
          return (
            <article
              key={it.id}
              className="group overflow-hidden rounded-2xl border border-border/70 bg-card shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-elegant)]"
            >
              <div className={`relative flex h-28 items-center justify-center bg-gradient-to-br ${it.thumbColor}`}>
                <Icon className="h-10 w-10 text-foreground/70" />
                <span className="absolute right-3 top-3">
                  {it.verified ? (
                    <span className="inline-flex items-center gap-1 rounded-full bg-success/20 px-2 py-0.5 text-[11px] font-medium text-success">
                      <BadgeCheck className="h-3 w-3" /> Verified
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 rounded-full bg-warning/20 px-2 py-0.5 text-[11px] font-medium text-foreground">
                      <Clock className="h-3 w-3" /> Pending
                    </span>
                  )}
                </span>
              </div>
              <div className="p-4">
                <div className="text-[11px] uppercase tracking-wider text-muted-foreground">{typeMeta[it.type].label}</div>
                <h4 className="mt-1 text-sm font-semibold leading-snug">{it.title}</h4>
                <div className="mt-2 text-xs text-muted-foreground">
                  {it.studentName} · {new Date(it.date).toLocaleDateString()}
                </div>
                {it.note && <p className="mt-2 line-clamp-2 text-xs text-foreground/80">{it.note}</p>}
                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className="truncate text-muted-foreground">{it.fileLabel}</span>
                  {it.amountVerified ? (
                    <span className="font-medium text-success">${it.amountVerified.toLocaleString()}</span>
                  ) : null}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
