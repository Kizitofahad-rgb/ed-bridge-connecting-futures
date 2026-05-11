import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export interface DonorProfile {
  name: string;
  email: string;
  country?: string;
  bio?: string;
  joined: string;
}

interface AuthCtx {
  donor: DonorProfile | null;
  login: (email: string, name?: string) => DonorProfile;
  logout: () => void;
  updateProfile: (patch: Partial<DonorProfile>) => void;
}

const Ctx = createContext<AuthCtx | null>(null);
const KEY = "edbridge.donor";

export function DonorAuthProvider({ children }: { children: ReactNode }) {
  const [donor, setDonor] = useState<DonorProfile | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setDonor(JSON.parse(raw));
    } catch {}
  }, []);

  const persist = (d: DonorProfile | null) => {
    setDonor(d);
    try {
      if (d) localStorage.setItem(KEY, JSON.stringify(d));
      else localStorage.removeItem(KEY);
    } catch {}
  };

  const login = (email: string, name?: string) => {
    const profile: DonorProfile = {
      email,
      name: name || email.split("@")[0].replace(/[._-]/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      joined: new Date().toISOString(),
    };
    persist(profile);
    return profile;
  };

  const logout = () => persist(null);
  const updateProfile = (patch: Partial<DonorProfile>) => {
    if (!donor) return;
    persist({ ...donor, ...patch });
  };

  return <Ctx.Provider value={{ donor, login, logout, updateProfile }}>{children}</Ctx.Provider>;
}

export function useDonorAuth() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useDonorAuth must be used within DonorAuthProvider");
  return v;
}
