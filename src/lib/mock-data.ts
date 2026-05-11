import s1 from "@/assets/student-1.jpg";
import s2 from "@/assets/student-2.jpg";
import s3 from "@/assets/student-3.jpg";
import s4 from "@/assets/student-4.jpg";
import s5 from "@/assets/student-5.jpg";
import s6 from "@/assets/student-6.jpg";

export type Urgency = "low" | "medium" | "high";
export type EducationLevel = "High School" | "Undergraduate" | "Graduate" | "Vocational";
export type RequestStatus = "pending" | "verified" | "funded" | "rejected";

export interface FundingRequest {
  id: string;
  studentName: string;
  photo: string;
  country: string;
  educationLevel: EducationLevel;
  title: string;
  story: string;
  amountNeeded: number;
  amountRaised: number;
  deadline: string;
  urgency: Urgency;
  verified: boolean;
  trustScore: number;
  status: RequestStatus;
  school: string;
}

export const requests: FundingRequest[] = [
  {
    id: "r1",
    studentName: "Amara Okafor",
    photo: s1,
    country: "Nigeria",
    educationLevel: "Undergraduate",
    title: "Final-year Computer Science tuition",
    story:
      "I'm one semester away from completing my Computer Science degree at the University of Lagos. After my father's illness, my family can no longer cover tuition. With your support I can graduate and join a software apprenticeship I've already been offered.",
    amountNeeded: 1800,
    amountRaised: 1240,
    deadline: "2026-07-15",
    urgency: "high",
    verified: true,
    trustScore: 94,
    status: "verified",
    school: "University of Lagos",
  },
  {
    id: "r2",
    studentName: "Rohan Mehta",
    photo: s2,
    country: "India",
    educationLevel: "Graduate",
    title: "Master's research equipment",
    story:
      "I'm pursuing a Master's in Renewable Energy Engineering. I need funding for sensors and lab materials to complete my thesis on low-cost solar storage for rural villages.",
    amountNeeded: 950,
    amountRaised: 410,
    deadline: "2026-08-30",
    urgency: "medium",
    verified: true,
    trustScore: 88,
    status: "verified",
    school: "IIT Bombay",
  },
  {
    id: "r3",
    studentName: "Sofía Ramírez",
    photo: s3,
    country: "Colombia",
    educationLevel: "Undergraduate",
    title: "Nursing program textbooks & exam fees",
    story:
      "I'm the first in my family to attend university. I need help covering nursing textbooks and clinical exam fees so I can continue serving my community.",
    amountNeeded: 620,
    amountRaised: 580,
    deadline: "2026-06-10",
    urgency: "high",
    verified: true,
    trustScore: 91,
    status: "verified",
    school: "Universidad Nacional",
  },
  {
    id: "r4",
    studentName: "Linh Tran",
    photo: s4,
    country: "Vietnam",
    educationLevel: "Undergraduate",
    title: "Engineering laptop for coursework",
    story:
      "My laptop broke last semester and I've been borrowing time at the university lab. A reliable laptop will let me complete my CAD coursework and internship applications.",
    amountNeeded: 700,
    amountRaised: 220,
    deadline: "2026-09-01",
    urgency: "medium",
    verified: true,
    trustScore: 85,
    status: "verified",
    school: "Hanoi University of Science",
  },
  {
    id: "r5",
    studentName: "Layla Hassan",
    photo: s5,
    country: "Jordan",
    educationLevel: "Graduate",
    title: "Medical school tuition assistance",
    story:
      "As a refugee pursuing medicine, I want to return to underserved communities as a doctor. Help me cover this year's tuition gap.",
    amountNeeded: 2400,
    amountRaised: 900,
    deadline: "2026-10-20",
    urgency: "medium",
    verified: true,
    trustScore: 96,
    status: "verified",
    school: "University of Jordan",
  },
  {
    id: "r6",
    studentName: "Daniel Mwangi",
    photo: s6,
    country: "Kenya",
    educationLevel: "High School",
    title: "Final-year high school fees",
    story:
      "I'm a top student in my class hoping to study civil engineering. My parents are smallholder farmers and this year's school fees are out of reach.",
    amountNeeded: 480,
    amountRaised: 120,
    deadline: "2026-05-25",
    urgency: "high",
    verified: false,
    trustScore: 78,
    status: "pending",
    school: "Alliance High School",
  },
];

export const myRequests = [
  {
    id: "m1",
    title: "Final-year Computer Science tuition",
    amountNeeded: 1800,
    amountRaised: 1240,
    deadline: "2026-07-15",
    status: "verified" as RequestStatus,
  },
  {
    id: "m2",
    title: "Internship travel & housing",
    amountNeeded: 600,
    amountRaised: 0,
    deadline: "2026-06-01",
    status: "pending" as RequestStatus,
  },
];

export const successStories = [
  {
    name: "Priya Sharma",
    quote:
      "Ed-Bridge donors helped me finish my degree. I'm now a software engineer supporting my younger siblings' education.",
    role: "Software Engineer · Funded 2024",
  },
  {
    name: "Joseph Banda",
    quote:
      "I never thought strangers across the world would believe in me. Today I'm in my final year of medical school.",
    role: "Medical Student · Funded 2023",
  },
  {
    name: "Aisha Bello",
    quote:
      "From a small village in northern Nigeria to a master's program in Berlin — all because someone gave.",
    role: "Graduate Researcher · Funded 2024",
  },
];
