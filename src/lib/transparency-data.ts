// Mock transparency / impact data for donor and student dashboards.

export interface DonationRecord {
  id: string;
  date: string; // ISO YYYY-MM-DD
  amount: number;
  studentId: string;
  studentName: string;
  studentPhoto?: string;
  country: string;
  cause: string;
  anonymous: boolean;
  status: "delivered" | "pending" | "in_transit";
  receiptUrl?: string;
}

export interface MilestoneEvent {
  id: string;
  date: string;
  studentName: string;
  title: string;
  type: "milestone" | "update" | "graduation" | "receipt";
}

export interface ProofOfImpactItem {
  id: string;
  studentId: string;
  studentName: string;
  type: "fee_receipt" | "academic_report" | "certificate" | "progress_update";
  title: string;
  date: string;
  fileLabel: string;
  amountVerified?: number;
  thumbColor: string;
  note?: string;
  verified: boolean;
}

// ----- Helpers -----
const today = new Date();
function daysAgo(n: number): string {
  const d = new Date(today);
  d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 10);
}

// ----- Donations (spread across the past year for the heatmap) -----
const seedDonations: Array<[number, number, string, string, string, string, boolean]> = [
  // [daysAgo, amount, studentId, studentName, country, cause, anonymous]
  [2, 50, "r1", "Amara Okafor", "Nigeria", "Final-year tuition", false],
  [5, 25, "r4", "Linh Tran", "Vietnam", "Engineering laptop", false],
  [9, 100, "r5", "Layla Hassan", "Jordan", "Medical school tuition", false],
  [14, 75, "r2", "Rohan Mehta", "India", "Solar research", true],
  [21, 40, "r3", "Sofía Ramírez", "Colombia", "Nursing exam fees", false],
  [28, 60, "r1", "Amara Okafor", "Nigeria", "Final-year tuition", false],
  [35, 120, "r5", "Layla Hassan", "Jordan", "Medical school tuition", false],
  [42, 30, "r6", "Daniel Mwangi", "Kenya", "KCSE registration", false],
  [49, 80, "r2", "Rohan Mehta", "India", "Solar research", false],
  [60, 200, "r5", "Layla Hassan", "Jordan", "Medical school tuition", false],
  [72, 45, "r3", "Sofía Ramírez", "Colombia", "Stethoscope", true],
  [86, 50, "r4", "Linh Tran", "Vietnam", "Engineering laptop", false],
  [101, 90, "r1", "Amara Okafor", "Nigeria", "Final-year tuition", false],
  [118, 35, "r6", "Daniel Mwangi", "Kenya", "School fees", false],
  [134, 150, "r5", "Layla Hassan", "Jordan", "Medical textbooks", false],
  [152, 70, "r2", "Rohan Mehta", "India", "Lab sensors", false],
  [171, 40, "r3", "Sofía Ramírez", "Colombia", "Clinical rotation", false],
  [190, 100, "r1", "Amara Okafor", "Nigeria", "Tuition top-up", true],
  [212, 55, "r4", "Linh Tran", "Vietnam", "CAD software", false],
  [233, 80, "r5", "Layla Hassan", "Jordan", "Tuition", false],
  [255, 30, "r6", "Daniel Mwangi", "Kenya", "Books", false],
  [278, 110, "r2", "Rohan Mehta", "India", "Field testing travel", false],
  [301, 60, "r1", "Amara Okafor", "Nigeria", "Tuition", false],
  [325, 45, "r3", "Sofía Ramírez", "Colombia", "Books", false],
  [340, 90, "r5", "Layla Hassan", "Jordan", "Tuition", true],
];

export const donations: DonationRecord[] = seedDonations.map(
  ([d, amount, sid, sname, country, cause, anon], i) => ({
    id: `d${i + 1}`,
    date: daysAgo(d),
    amount,
    studentId: sid,
    studentName: sname,
    country,
    cause,
    anonymous: anon,
    status: d < 5 ? "in_transit" : "delivered",
    receiptUrl: "#",
  })
);

// ----- Milestones / activity feed combined into heatmap -----
export const milestones: MilestoneEvent[] = [
  { id: "m1", date: daysAgo(3), studentName: "Sofía Ramírez", title: "Passed clinical rotation exam", type: "milestone" },
  { id: "m2", date: daysAgo(11), studentName: "Amara Okafor", title: "Submitted final-year project draft", type: "update" },
  { id: "m3", date: daysAgo(18), studentName: "Layla Hassan", title: "Year 4 tuition receipt uploaded", type: "receipt" },
  { id: "m4", date: daysAgo(34), studentName: "Rohan Mehta", title: "Solar prototype v2 tested", type: "milestone" },
  { id: "m5", date: daysAgo(51), studentName: "Linh Tran", title: "Accepted robotics internship offer", type: "milestone" },
  { id: "m6", date: daysAgo(80), studentName: "Daniel Mwangi", title: "Top of class — term report", type: "update" },
  { id: "m7", date: daysAgo(140), studentName: "Sofía Ramírez", title: "Completed nursing year 2", type: "graduation" },
  { id: "m8", date: daysAgo(210), studentName: "Amara Okafor", title: "Passed semester 6 with distinction", type: "milestone" },
  { id: "m9", date: daysAgo(290), studentName: "Layla Hassan", title: "Selected for hospital rotation", type: "milestone" },
];

// ----- Heatmap helper: build daily activity counts for the past 365 days -----
export interface HeatmapDay {
  date: string; // YYYY-MM-DD
  count: number; // total events
  amount: number; // donation total that day
}

export function buildHeatmap(): HeatmapDay[] {
  const map = new Map<string, HeatmapDay>();
  for (let i = 364; i >= 0; i--) {
    const date = daysAgo(i);
    map.set(date, { date, count: 0, amount: 0 });
  }
  for (const d of donations) {
    const day = map.get(d.date);
    if (day) {
      day.count += 1;
      day.amount += d.amount;
    }
  }
  for (const m of milestones) {
    const day = map.get(m.date);
    if (day) day.count += 1;
  }
  return Array.from(map.values());
}

// ----- Monthly funding history (for line / bar charts) -----
export interface MonthlyPoint {
  month: string; // e.g. "Jun"
  donated: number;
  delivered: number;
  students: number;
}

export function buildMonthly(): MonthlyPoint[] {
  const buckets = new Map<string, MonthlyPoint>();
  const labels: string[] = [];
  for (let i = 11; i >= 0; i--) {
    const d = new Date(today);
    d.setMonth(d.getMonth() - i);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    const label = d.toLocaleString(undefined, { month: "short" });
    labels.push(key);
    buckets.set(key, { month: label, donated: 0, delivered: 0, students: 0 });
  }
  const studentsPerMonth = new Map<string, Set<string>>();
  for (const d of donations) {
    const key = d.date.slice(0, 7);
    const b = buckets.get(key);
    if (!b) continue;
    b.donated += d.amount;
    b.delivered += d.status === "delivered" ? d.amount : 0;
    if (!studentsPerMonth.has(key)) studentsPerMonth.set(key, new Set());
    studentsPerMonth.get(key)!.add(d.studentId);
  }
  for (const [key, set] of studentsPerMonth) {
    const b = buckets.get(key);
    if (b) b.students = set.size;
  }
  return labels.map((k) => buckets.get(k)!);
}

// ----- Cause breakdown for pie / donut -----
export function buildCauseBreakdown() {
  const map = new Map<string, number>();
  for (const d of donations) {
    const key = causeCategory(d.cause);
    map.set(key, (map.get(key) || 0) + d.amount);
  }
  return Array.from(map, ([name, value]) => ({ name, value }));
}

function causeCategory(c: string): string {
  const x = c.toLowerCase();
  if (x.includes("tuition") || x.includes("school fees") || x.includes("registration")) return "Tuition & fees";
  if (x.includes("book") || x.includes("textbook") || x.includes("stethoscope") || x.includes("laptop") || x.includes("software")) return "Materials & equipment";
  if (x.includes("research") || x.includes("lab") || x.includes("travel") || x.includes("field")) return "Research & travel";
  return "Living & other";
}

// ----- Educational milestone progress (for the "milestones" chart) -----
export interface MilestoneProgress {
  label: string;
  completed: number;
  total: number;
}
export const milestoneProgress: MilestoneProgress[] = [
  { label: "Identity verified", completed: 7, total: 7 },
  { label: "Enrollment confirmed", completed: 7, total: 7 },
  { label: "First disbursement", completed: 6, total: 7 },
  { label: "Mid-year report", completed: 5, total: 7 },
  { label: "Final exam passed", completed: 3, total: 7 },
  { label: "Graduation / completion", completed: 1, total: 7 },
];

// ----- Proof of impact items uploaded by students -----
export const proofItems: ProofOfImpactItem[] = [
  {
    id: "p1",
    studentId: "r1",
    studentName: "Amara Okafor",
    type: "fee_receipt",
    title: "University of Lagos — Semester 8 tuition receipt",
    date: daysAgo(6),
    fileLabel: "UNILAG_Receipt_S8.pdf",
    amountVerified: 1240,
    thumbColor: "from-primary/30 to-primary/5",
    note: "Tuition fully credited by bursary office.",
    verified: true,
  },
  {
    id: "p2",
    studentId: "r1",
    studentName: "Amara Okafor",
    type: "academic_report",
    title: "Semester 7 transcript",
    date: daysAgo(45),
    fileLabel: "Amara_Transcript_S7.pdf",
    thumbColor: "from-success/30 to-success/5",
    note: "GPA 3.8 / 4.0 — Dean's list.",
    verified: true,
  },
  {
    id: "p3",
    studentId: "r5",
    studentName: "Layla Hassan",
    type: "progress_update",
    title: "Year 4 clinical rotation log",
    date: daysAgo(12),
    fileLabel: "Rotation_Log_Q1.pdf",
    thumbColor: "from-chart-2/30 to-chart-2/5",
    note: "Completed pediatrics + emergency medicine rotations.",
    verified: true,
  },
  {
    id: "p4",
    studentId: "r3",
    studentName: "Sofía Ramírez",
    type: "certificate",
    title: "Clinical rotation certificate",
    date: daysAgo(3),
    fileLabel: "Sofia_Clinical_Cert.pdf",
    thumbColor: "from-warning/30 to-warning/5",
    note: "Issued by Universidad Nacional, Medellín.",
    verified: true,
  },
  {
    id: "p5",
    studentId: "r2",
    studentName: "Rohan Mehta",
    type: "progress_update",
    title: "Solar prototype field-test report",
    date: daysAgo(34),
    fileLabel: "Solar_Prototype_v2.pdf",
    thumbColor: "from-chart-3/30 to-chart-3/5",
    note: "Three pilot households with reliable evening light.",
    verified: false,
  },
  {
    id: "p6",
    studentId: "r4",
    studentName: "Linh Tran",
    type: "fee_receipt",
    title: "Refurbished laptop invoice",
    date: daysAgo(82),
    fileLabel: "Laptop_Invoice.pdf",
    amountVerified: 220,
    thumbColor: "from-chart-4/30 to-chart-4/5",
    verified: true,
  },
];

// ----- Donor trust score (computed from donations + behavior) -----
export interface DonorTrustScore {
  score: number; // 0-100
  tier: "Bronze" | "Silver" | "Gold" | "Platinum";
  factors: { label: string; value: number; max: number }[];
}

export const donorTrustScore: DonorTrustScore = {
  score: 92,
  tier: "Gold",
  factors: [
    { label: "Verified identity", value: 20, max: 20 },
    { label: "Donation consistency (12 mo)", value: 22, max: 25 },
    { label: "Milestone-tied giving", value: 18, max: 20 },
    { label: "Direct disbursement (no fees)", value: 20, max: 20 },
    { label: "Student feedback score", value: 12, max: 15 },
  ],
};

// ----- Aggregate totals for dashboard header -----
export function buildDonorTotals() {
  const totalDonated = donations.reduce((s, d) => s + d.amount, 0);
  const studentsSupported = new Set(donations.map((d) => d.studentId)).size;
  const countries = new Set(donations.map((d) => d.country)).size;
  const milestonesFunded = milestones.length;
  return { totalDonated, studentsSupported, countries, milestonesFunded };
}
