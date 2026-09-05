import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  CURRENT_USER_ID,
  communitiesById,
  people,
  peopleById,
  seedImpact,
  seedNotifications,
  supportRequests as seedRequests,
} from "./data";
import type { AppNotification, ImpactEvent, Privacy, SupportRequest, SupportType } from "./types";

export type DemoRole = "visitor" | "student" | "supporter" | "community" | "organization";

interface State {
  role: DemoRole;
  requests: SupportRequest[];
  impact: ImpactEvent[];
  notifications: AppNotification[];
  joinedCommunities: string[];
  connections: string[];
  mentorships: string[];
  onboarded: boolean;
}

interface Ctx extends State {
  user: typeof people[number];
  setRole: (r: DemoRole) => void;
  completeOnboarding: () => void;
  supportFinancially: (requestId: string, amount: number, privacy: Privacy) => void;
  offerSupport: (requestId: string, type: Exclude<SupportType, "financial">, privacy: Privacy, note?: string) => void;
  joinCommunity: (id: string) => void;
  createRequest: (r: Omit<SupportRequest, "id" | "personId" | "supporters" | "status" | "checks" | "createdAt">) => string;
  markAllRead: () => void;
  totals: {
    studentsSupported: number;
    mentorships: number;
    referrals: number;
    resources: number;
    communities: number;
    amount: number;
  };
  reset: () => void;
}

const KEY = "edbridge.prototype.v1";
const C = createContext<Ctx | null>(null);

const initial: State = {
  role: "visitor",
  requests: seedRequests,
  impact: seedImpact,
  notifications: seedNotifications,
  joinedCommunities: ["cocis", "cs", "busia-alumni"],
  connections: ["p-amina", "p-david", "p-sarah", "p-hassan"],
  mentorships: ["p-joel"],
  onboarded: false,
};

const supportLabel: Record<string, string> = {
  mentorship: "Offered mentorship",
  resource: "Offered a resource",
  opportunity: "Connected a student to an opportunity",
  referral: "Made a referral",
  amplification: "Shared with a community",
};

export function EdBridgeProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(initial);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setState({ ...initial, ...JSON.parse(raw) });
    } catch {
      /* ignore */
    }
  }, []);

  const update = useCallback((fn: (s: State) => State) => {
    setState((prev) => {
      const next = fn(prev);
      try {
        localStorage.setItem(KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const today = () => new Date().toISOString().slice(0, 10);
  const uid = () => Math.random().toString(36).slice(2, 9);

  const notify = (s: State, n: Omit<AppNotification, "id" | "at" | "read">): AppNotification[] => [
    { ...n, id: uid(), at: "Just now", read: false },
    ...s.notifications,
  ];

  const supportFinancially: Ctx["supportFinancially"] = (requestId, amount, privacy) =>
    update((s) => {
      const req = s.requests.find((r) => r.id === requestId);
      if (!req) return s;
      const student = peopleById[req.personId];
      return {
        ...s,
        requests: s.requests.map((r) =>
          r.id === requestId
            ? { ...r, amountRaised: (r.amountRaised ?? 0) + amount, supporters: r.supporters + 1 }
            : r,
        ),
        connections: s.connections.includes(req.personId) ? s.connections : [...s.connections, req.personId],
        impact: [
          {
            id: uid(),
            date: today(),
            type: "financial",
            label: "Supported a request financially",
            detail: `${student?.name ?? "A student"} — ${req.title}`,
            privacy,
          },
          ...s.impact,
        ],
        notifications: notify(s, {
          title: "Support recorded",
          body: `Your simulated contribution to ${student?.name ?? "a student"} was added to your Impact Passport.`,
          tone: "impact",
        }),
      };
    });

  const offerSupport: Ctx["offerSupport"] = (requestId, type, privacy, note) =>
    update((s) => {
      const req = s.requests.find((r) => r.id === requestId);
      if (!req) return s;
      const student = peopleById[req.personId];
      return {
        ...s,
        requests: s.requests.map((r) => (r.id === requestId ? { ...r, supporters: r.supporters + 1 } : r)),
        connections: s.connections.includes(req.personId) ? s.connections : [...s.connections, req.personId],
        mentorships:
          type === "mentorship" && !s.mentorships.includes(req.personId)
            ? [...s.mentorships, req.personId]
            : s.mentorships,
        impact: [
          {
            id: uid(),
            date: today(),
            type,
            label: supportLabel[type],
            detail: `${student?.name ?? "A student"}${note ? ` — ${note}` : ` — ${req.title}`}`,
            privacy,
          },
          ...s.impact,
        ],
        notifications: notify(s, {
          title: type === "mentorship" ? "New mentorship connection" : "Support offered",
          body: `${supportLabel[type]} for ${student?.name ?? "a student"}.`,
          tone: type === "mentorship" ? "match" : "support",
        }),
      };
    });

  const joinCommunity: Ctx["joinCommunity"] = (id) =>
    update((s) =>
      s.joinedCommunities.includes(id)
        ? s
        : {
            ...s,
            joinedCommunities: [...s.joinedCommunities, id],
            impact: [
              {
                id: uid(),
                date: today(),
                type: "join",
                label: "Joined a community",
                detail: communitiesById[id]?.short ?? id,
                privacy: "public",
              },
              ...s.impact,
            ],
            notifications: notify(s, {
              title: "Community joined",
              body: `You are now part of ${communitiesById[id]?.short ?? id}.`,
              tone: "impact",
            }),
          },
    );

  const createRequest: Ctx["createRequest"] = (r) => {
    const id = `r-${uid()}`;
    update((s) => ({
      ...s,
      requests: [
        {
          ...r,
          id,
          personId: CURRENT_USER_ID,
          supporters: 0,
          status: "pending",
          checks: { identity: true, studentStatus: true, documents: true, humanReview: false },
          createdAt: today(),
        },
        ...s.requests,
      ],
      notifications: notify(s, {
        title: "Your request is under verification",
        body: "A reviewer will confirm your documents. You will be notified when it is verified.",
        tone: "verification",
      }),
    }));
    return id;
  };

  const value: Ctx = useMemo(() => {
    const totals = {
      studentsSupported: new Set(state.impact.filter((i) => i.type === "financial" || i.type === "resource").map((i) => i.detail.split(" — ")[0])).size,
      mentorships: state.impact.filter((i) => i.type === "mentorship").length,
      referrals: state.impact.filter((i) => i.type === "referral" || i.type === "opportunity").length,
      resources: state.impact.filter((i) => i.type === "resource").length,
      communities: state.joinedCommunities.length,
      amount: 0,
    };
    return {
      ...state,
      user: peopleById[CURRENT_USER_ID],
      totals,
      setRole: (role) => update((s) => ({ ...s, role })),
      completeOnboarding: () => update((s) => ({ ...s, onboarded: true, role: "student" })),
      supportFinancially,
      offerSupport,
      joinCommunity,
      createRequest,
      markAllRead: () => update((s) => ({ ...s, notifications: s.notifications.map((n) => ({ ...n, read: true })) })),
      reset: () => update(() => initial),
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return <C.Provider value={value}>{children}</C.Provider>;
}

export function useEdBridge() {
  const v = useContext(C);
  if (!v) throw new Error("useEdBridge must be used inside EdBridgeProvider");
  return v;
}
