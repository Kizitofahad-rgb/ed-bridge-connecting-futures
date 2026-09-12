import { z } from "zod";

// Support Request Validation Schema
export const SupportRequestSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(100, "Title must not exceed 100 characters"),
  category: z.enum([
    "Tuition",
    "Academic Resources",
    "Laptop / Equipment",
    "Medical / Emergency",
    "Accommodation",
    "Mentorship",
    "Career / Internship",
    "Other",
  ]),
  need: z.string().min(10, "Please describe your specific need in detail"),
  why: z
    .string()
    .min(20, "Please provide a brief background explanation (min 20 chars)")
    .max(1000, "Explanation too long"),
  amountNeeded: z
    .number()
    .positive("Amount must be positive")
    .max(50000000, "Amount exceeds maximum limit")
    .optional(),
  resourceNeeded: z.string().optional(),
  deadlineDays: z.number().int().min(1).max(90),
  supportTypes: z
    .array(z.enum(["financial", "mentorship", "resource", "opportunity", "referral", "amplification"]))
    .min(1, "Select at least one support type requested"),
});

// Financial Contribution Schema
export const FinancialSupportSchema = z.object({
  requestId: z.string().min(1),
  amount: z
    .number()
    .min(1000, "Minimum contribution is UGX 1,000")
    .max(10000000, "Contribution exceeds single transaction limit"),
  privacy: z.enum(["private", "recognized", "public"]),
});

// Non-Financial Support Schema
export const OfferSupportSchema = z.object({
  requestId: z.string().min(1),
  type: z.enum(["mentorship", "resource", "opportunity", "referral", "amplification"]),
  privacy: z.enum(["private", "recognized", "public"]),
  note: z.string().max(500, "Note exceeds 500 characters").optional(),
});

// Opportunity Creation Schema
export const OpportunitySchema = z.object({
  title: z.string().min(5, "Title is required"),
  org: z.string().min(2, "Organization name is required"),
  kind: z.enum([
    "Internship",
    "Scholarship",
    "Mentorship",
    "Competition",
    "Part-time",
    "Training",
    "Hackathon",
  ]),
  location: z.string().min(2, "Location is required"),
  closesInDays: z.number().int().min(1).max(365),
  summary: z.string().min(10, "Summary is required"),
  matchReason: z.string().min(5, "Match reason is required"),
  communities: z.array(z.string()).min(1, "Select at least one target community"),
});

// Onboarding Profile Setup Schema
export const StudentProfileSchema = z.object({
  name: z.string().min(2, "Full name required"),
  college: z.enum(["CoCIS", "CEDAT", "CHUSS", "CAES", "CONAS", "CEES", "COBAMS", "CHS"]),
  course: z.string().min(2, "Course name required"),
  year: z.number().int().min(1).max(7),
  secondarySchool: z.string().optional(),
  bio: z.string().max(500).optional(),
});
