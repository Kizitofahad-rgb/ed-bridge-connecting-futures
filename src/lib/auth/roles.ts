// Authorization & Role-Based Access Control (RBAC) Architecture

export type AppRole =
  | "visitor"
  | "student"
  | "supporter"
  | "mentor"
  | "alumni"
  | "community"
  | "organization"
  | "admin";

export type Permission =
  | "create_request"
  | "view_requests"
  | "support_financially"
  | "offer_mentorship"
  | "post_opportunity"
  | "manage_community"
  | "verify_requests"
  | "view_admin_queue"
  | "access_impact_passport";

export const ROLE_PERMISSIONS: Record<AppRole, Permission[]> = {
  visitor: ["view_requests"],
  student: ["view_requests", "create_request", "access_impact_passport"],
  supporter: ["view_requests", "support_financially", "offer_mentorship", "access_impact_passport"],
  mentor: ["view_requests", "offer_mentorship", "access_impact_passport"],
  alumni: ["view_requests", "support_financially", "offer_mentorship", "post_opportunity", "access_impact_passport"],
  community: ["view_requests", "manage_community", "access_impact_passport"],
  organization: ["view_requests", "post_opportunity", "support_financially"],
  admin: [
    "view_requests",
    "create_request",
    "support_financially",
    "offer_mentorship",
    "post_opportunity",
    "manage_community",
    "verify_requests",
    "view_admin_queue",
    "access_impact_passport",
  ],
};

export function hasPermission(role: AppRole, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

export interface AuthUser {
  id: string;
  email?: string;
  role: AppRole;
  isVerifiedStudent: boolean;
  isVerifiedSupporter: boolean;
  isSystemAdmin: boolean;
}

export function canAccessRoute(role: AppRole, pathname: string): { allowed: boolean; redirectReason?: string } {
  if (pathname.startsWith("/admin") && !hasPermission(role, "view_admin_queue")) {
    return {
      allowed: false,
      redirectReason: "Admin authorization required to access verification queue.",
    };
  }
  return { allowed: true };
}
