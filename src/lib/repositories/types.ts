import type {
  AppNotification,
  Community,
  ImpactEvent,
  Opportunity,
  Person,
  Privacy,
  SupportRequest,
  SupportType,
  VerificationState,
} from "../edbridge/types";

export interface ISupportRequestRepository {
  getAll(): Promise<SupportRequest[]>;
  getById(id: string): Promise<SupportRequest | null>;
  create(
    request: Omit<SupportRequest, "id" | "personId" | "supporters" | "status" | "checks" | "createdAt">,
    authorId: string,
  ): Promise<SupportRequest>;
  updateStatus(id: string, status: VerificationState): Promise<SupportRequest | null>;
  recordFinancialSupport(id: string, amount: number): Promise<SupportRequest | null>;
  recordOtherSupport(id: string, type: Exclude<SupportType, "financial">): Promise<SupportRequest | null>;
}

export interface IUserRepository {
  getById(id: string): Promise<Person | null>;
  getAll(): Promise<Person[]>;
  updateProfile(id: string, updates: Partial<Person>): Promise<Person | null>;
}

export interface IImpactRepository {
  getByUserId(userId: string): Promise<ImpactEvent[]>;
  recordEvent(event: Omit<ImpactEvent, "id">): Promise<ImpactEvent>;
}

export interface ICommunityRepository {
  getAll(): Promise<Community[]>;
  getById(id: string): Promise<Community | null>;
  incrementMemberCount(communityId: string): Promise<void>;
}
