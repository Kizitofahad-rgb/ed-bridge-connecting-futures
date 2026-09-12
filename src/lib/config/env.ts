// Environment configuration & service boundaries for Ed-Bridge

export interface AppConfig {
  env: "development" | "staging" | "production";
  apiBaseUrl: string;
  isMockMode: boolean;
  supabase: {
    url?: string;
    anonKey?: string;
    configured: boolean;
  };
  features: {
    realAuth: boolean;
    realPayments: boolean;
    realDocumentStorage: boolean;
  };
}

// Safely extract environment variables without hardcoding secrets
const getEnvVar = (key: string, defaultValue = ""): string => {
  if (typeof import.meta !== "undefined" && import.meta.env) {
    return (import.meta.env[key] as string) || defaultValue;
  }
  return defaultValue;
};

const supabaseUrl = getEnvVar("VITE_SUPABASE_URL");
const supabaseAnonKey = getEnvVar("VITE_SUPABASE_ANON_KEY");

export const config: AppConfig = {
  env: (getEnvVar("MODE", "development") as AppConfig["env"]) || "development",
  apiBaseUrl: getEnvVar("VITE_API_BASE_URL", "http://localhost:5173"),
  isMockMode: !supabaseUrl || !supabaseAnonKey,
  supabase: {
    url: supabaseUrl,
    anonKey: supabaseAnonKey,
    configured: Boolean(supabaseUrl && supabaseAnonKey),
  },
  features: {
    realAuth: Boolean(getEnvVar("VITE_ENABLE_REAL_AUTH")),
    realPayments: Boolean(getEnvVar("VITE_ENABLE_REAL_PAYMENTS")),
    realDocumentStorage: Boolean(getEnvVar("VITE_ENABLE_REAL_STORAGE")),
  },
};
