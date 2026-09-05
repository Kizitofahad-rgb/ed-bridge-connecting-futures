export type CollegeCode = "CoCIS" | "CEDAT" | "CHUSS" | "CAES" | "CONAS" | "CEES" | "COBAMS" | "CHS";

export type CommunityKind = "college" | "course" | "school-alumni" | "organization" | "club";

export interface Community {
  id: string;
  name: string;
  short: string;
  kind: CommunityKind;
  tagline: string;
  members: number;
  studentsHelped: number;
  mentorshipSessions: number;
  opportunitiesCreated: number;
  resourcesShared: number;
  accent: "primary" | "connection" | "cyan" | "success";
}

export type PersonRole = "student" | "supporter" | "mentor" | "alumni" | "organization";

export interface Person {
  id: string;
  name: string;
  role: PersonRole;
  headline: string;
  college?: CollegeCode;
  course?: string;
  year?: number;
  secondarySchool?: string;
  communities: string[];
  skills: string[];
  offers: SupportType[];
  verified: boolean;
  trustScore: number;
  bio: string;
}

export type SupportType = "financial" | "mentorship" | "resource" | "opportunity" | "referral" | "amplification";

export type RequestCategory =
  | "Tuition"
  | "Academic Resources"
  | "Laptop / Equipment"
  | "Medical / Emergency"
  | "Accommodation"
  | "Mentorship"
  | "Career / Internship"
  | "Other";

export type VerificationState = "pending" | "verified" | "needs-info" | "rejected";

export interface SupportRequest {
  id: string;
  personId: string;
  title: string;
  category: RequestCategory;
  need: string;
  why: string;
  amountNeeded?: number;
  amountRaised?: number;
  resourceNeeded?: string;
  deadlineDays: number;
  supporters: number;
  supportTypes: SupportType[];
  status: VerificationState;
  checks: { identity: boolean; studentStatus: boolean; documents: boolean; humanReview: boolean };
  createdAt: string;
}

export interface Opportunity {
  id: string;
  title: string;
  org: string;
  kind: "Internship" | "Scholarship" | "Mentorship" | "Competition" | "Part-time" | "Training" | "Hackathon";
  location: string;
  closesInDays: number;
  summary: string;
  matchReason: string;
  communities: string[];
}

export interface Organization {
  id: string;
  name: string;
  kind: string;
  studentsReached: number;
  campaigns: number;
  mentorshipSessions: number;
  opportunitiesCreated: number;
  blurb: string;
}

export type Privacy = "private" | "recognized" | "public";

export interface ImpactEvent {
  id: string;
  date: string;
  type: SupportType | "join" | "verification";
  label: string;
  detail: string;
  privacy: Privacy;
}

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  at: string;
  read: boolean;
  tone: "match" | "support" | "verification" | "impact" | "opportunity";
}

export interface Recommendation {
  personId: string;
  relevance: number;
  reasons: string[];
}
