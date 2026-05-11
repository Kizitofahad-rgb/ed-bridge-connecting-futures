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
  supporters: number;
  gpa?: string;
  fieldOfStudy: string;
}

export const requests: FundingRequest[] = [
  {
    id: "r1",
    studentName: "Amara Okafor",
    photo: s1,
    country: "Nigeria",
    educationLevel: "Undergraduate",
    fieldOfStudy: "Computer Science",
    title: "One semester away from my CS degree",
    story:
      "I'm 21, the eldest of four, and one semester away from finishing my Computer Science degree at the University of Lagos. When my father was diagnosed with kidney disease last year, our savings went to dialysis. I started tutoring high-school students at night, but it isn't enough to cover this final semester's tuition. I've already received a conditional offer to join Andela's software apprenticeship — I just need to graduate. With your help, I will. I'll send you my transcript, my final project (a tool that translates Igbo voice notes into text for elderly users), and a video on graduation day.",
    amountNeeded: 1800,
    amountRaised: 1240,
    deadline: "2026-07-15",
    urgency: "high",
    verified: true,
    trustScore: 94,
    status: "verified",
    school: "University of Lagos",
    supporters: 87,
    gpa: "3.8 / 4.0",
  },
  {
    id: "r2",
    studentName: "Rohan Mehta",
    photo: s2,
    country: "India",
    educationLevel: "Graduate",
    fieldOfStudy: "Renewable Energy Engineering",
    title: "Solar storage research for rural villages",
    story:
      "I grew up in a village in Rajasthan that lost power for 6–8 hours every day. Today I'm in the final year of my Master's at IIT Bombay, building a low-cost solar battery prototype designed for households earning under $4 a day. I've already secured lab space, but I need $950 for sensors, a charge controller, and field-testing travel to three pilot villages. Every rupee will be receipted and reported. If my prototype works, three families I grew up with will have their first reliable evening light.",
    amountNeeded: 950,
    amountRaised: 410,
    deadline: "2026-08-30",
    urgency: "medium",
    verified: true,
    trustScore: 88,
    status: "verified",
    school: "IIT Bombay",
    supporters: 42,
    gpa: "9.1 / 10",
  },
  {
    id: "r3",
    studentName: "Sofía Ramírez",
    photo: s3,
    country: "Colombia",
    educationLevel: "Undergraduate",
    fieldOfStudy: "Nursing",
    title: "First in my family to wear a nursing uniform",
    story:
      "My mother cleans hospital floors in Medellín. She's the reason I chose nursing — she said the nurses were the kindest people she met during my brother's surgery. I'm now in my third year and need help covering this term's textbooks, a stethoscope, and my clinical rotation exam fees. After graduation I've committed to two years of service in a rural clinic in Chocó. I will write to every donor when I receive my license.",
    amountNeeded: 620,
    amountRaised: 580,
    deadline: "2026-06-10",
    urgency: "high",
    verified: true,
    trustScore: 91,
    status: "verified",
    school: "Universidad Nacional",
    supporters: 64,
    gpa: "4.3 / 5.0",
  },
  {
    id: "r4",
    studentName: "Linh Tran",
    photo: s4,
    country: "Vietnam",
    educationLevel: "Undergraduate",
    fieldOfStudy: "Mechanical Engineering",
    title: "A laptop to finish my engineering degree",
    story:
      "My laptop died during finals last semester and I've been queuing for the campus lab from 6am to run my CAD assignments. My professor flagged me for an internship at a Hanoi robotics startup, but I need a working laptop to accept it. $700 covers a refurbished engineering-grade machine and a one-year warranty. I'll post a build photo and my first internship paycheck — half of which I'm donating back to Ed-Bridge.",
    amountNeeded: 700,
    amountRaised: 220,
    deadline: "2026-09-01",
    urgency: "medium",
    verified: true,
    trustScore: 85,
    status: "verified",
    school: "Hanoi University of Science",
    supporters: 19,
    gpa: "3.6 / 4.0",
  },
  {
    id: "r5",
    studentName: "Layla Hassan",
    photo: s5,
    country: "Jordan",
    educationLevel: "Graduate",
    fieldOfStudy: "Medicine",
    title: "A refugee, a future doctor — bridge the gap",
    story:
      "My family fled Syria when I was 12. I taught myself enough Arabic medical vocabulary to volunteer in our refugee camp's clinic at 15. I'm now in my fourth year of medical school at the University of Jordan, ranked top 10% of my class. My UNHCR scholarship covers most of tuition but leaves a $2,400 gap this year. I will return to underserved communities — I've already signed a 5-year commitment to Médecins Sans Frontières. Help me become the doctor my younger self needed.",
    amountNeeded: 2400,
    amountRaised: 900,
    deadline: "2026-10-20",
    urgency: "medium",
    verified: true,
    trustScore: 96,
    status: "verified",
    school: "University of Jordan",
    supporters: 128,
    gpa: "3.9 / 4.0",
  },
  {
    id: "r6",
    studentName: "Daniel Mwangi",
    photo: s6,
    country: "Kenya",
    educationLevel: "High School",
    fieldOfStudy: "Sciences (pre-Engineering)",
    title: "Final year of high school — top of my class",
    story:
      "I'm 17, the top math student at Alliance High School, and the son of two smallholder maize farmers in Nyeri. Last year's drought halved our harvest. I dream of studying civil engineering at the University of Nairobi to design rainwater systems for farms like ours. I need $480 to cover this final year's school fees and KCSE exam registration. My headmaster will sign every disbursement receipt.",
    amountNeeded: 480,
    amountRaised: 120,
    deadline: "2026-05-25",
    urgency: "high",
    verified: false,
    trustScore: 78,
    status: "pending",
    school: "Alliance High School",
    supporters: 11,
    gpa: "A− avg",
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

export interface SuccessStory {
  name: string;
  quote: string;
  role: string;
  photo: string;
  country: string;
  amountFunded: number;
  supporters: number;
}

export const successStories: SuccessStory[] = [
  {
    name: "Priya Sharma",
    photo: s3,
    country: "India",
    amountFunded: 2200,
    supporters: 94,
    quote:
      "Ed-Bridge donors covered my final year of computer science. I now work as a software engineer in Bengaluru and pay for my younger sisters' school fees every month.",
    role: "Software Engineer · Funded 2024",
  },
  {
    name: "Joseph Banda",
    photo: s6,
    country: "Zambia",
    amountFunded: 3100,
    supporters: 142,
    quote:
      "Strangers from twelve countries believed in me. I'm in my final year of medical school and I'll dedicate my first decade to rural clinics in southern Africa.",
    role: "Medical Student · Funded 2023",
  },
  {
    name: "Aisha Bello",
    photo: s1,
    country: "Nigeria → Germany",
    amountFunded: 4500,
    supporters: 211,
    quote:
      "From a village in Kano to a master's lab in Berlin. Every milestone was visible to my donors — and so was my graduation day.",
    role: "Graduate Researcher · Funded 2024",
  },
];

export const platformImpact = {
  studentsFunded: 12_473,
  totalDelivered: 3_812_540,
  countries: 62,
  graduationRate: 94,
  avgVerificationHours: 24,
  donorRating: 4.9,
};

export const recentActivity = [
  { id: "a1", who: "You", action: "donated $50 to", target: "Amara Okafro's tuition", when: "2 hours ago", amount: 50 },
  { id: "a2", who: "Sofía Ramírez", action: "completed milestone", target: "Clinical exam passed ✓", when: "yesterday", amount: 0 },
  { id: "a3", who: "You", action: "donated $25 to", target: "Linh Tran's laptop", when: "3 days ago", amount: 25 },
  { id: "a4", who: "Layla Hassan", action: "posted an update on", target: "Year 4 final exams", when: "5 days ago", amount: 0 },
  { id: "a5", who: "You", action: "donated $100 to", target: "Layla Hassan's tuition", when: "1 week ago", amount: 100 },
];

