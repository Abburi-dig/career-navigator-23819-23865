import React, { createContext, useEffect, useMemo, useState } from "react";
import type { AuthState, LoginInput } from "./types";
import { useApiClient } from "../../api/useApiClient";

type AuthContextValue = AuthState & {
  // PUBLIC_INTERFACE
  login: (input: LoginInput) => Promise<void>;
  // PUBLIC_INTERFACE
  logout: () => Promise<void>;
};

const AUTH_STORAGE_KEY = "career_navigator_auth_v1";

export const AuthContext = createContext<AuthContextValue | null>(null);

function loadStoredAuth(): AuthState {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return { isAuthenticated: false, accessToken: null, user: null };
    const parsed = JSON.parse(raw) as AuthState;
    if (!parsed.accessToken || !parsed.user) return { isAuthenticated: false, accessToken: null, user: null };
    return { ...parsed, isAuthenticated: true };
  } catch {
    return { isAuthenticated: false, accessToken: null, user: null };
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [auth, setAuth] = useState<AuthState>(() => loadStoredAuth());
  const api = useApiClient();

  // Keep storage in sync
  useEffect(() => {
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
    } catch {
      // Ignore storage failures (e.g., privacy mode).
    }
  }, [auth]);

  const value = useMemo<AuthContextValue>(() => {
    return {
      ...auth,
      login: async (input: LoginInput) => {
        const res = await api.request<{ accessToken: string; user: { id: string; name: string; role: "user" | "admin" } }>(
          "/auth/login",
          "POST",
          input
        );
        setAuth({ isAuthenticated: true, accessToken: res.accessToken, user: res.user });
      },
      logout: async () => {
        try {
          await api.request("/auth/logout", "POST");
        } catch {
          // Logout should be best-effort; clear local state regardless.
        }
        setAuth({ isAuthenticated: false, accessToken: null, user: null });
      },
    };
  }, [api, auth]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
