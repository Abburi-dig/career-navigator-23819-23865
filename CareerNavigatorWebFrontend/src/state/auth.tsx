import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { apiClient } from "../utils/apiClient";

type AuthState = {
  token: string | null;
  userEmail: string | null;
};

type AuthContextValue = AuthState & {
  // PUBLIC_INTERFACE
  login: (args: { email: string; password: string }) => Promise<void>;
  // PUBLIC_INTERFACE
  register: (args: { email: string; password: string }) => Promise<void>;
  // PUBLIC_INTERFACE
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const TOKEN_KEY = "careerNavigator.auth.token";
const EMAIL_KEY = "careerNavigator.auth.email";

/**
 * PUBLIC_INTERFACE
 */
export function AuthProvider(props: { children: React.ReactNode }) {
  /** Provides auth state + actions to the app; syncs token to apiClient. */
  const [token, setToken] = useState<string | null>(() => localStorage.getItem(TOKEN_KEY));
  const [userEmail, setUserEmail] = useState<string | null>(() =>
    localStorage.getItem(EMAIL_KEY),
  );

  useEffect(() => {
    apiClient.setAuthToken(token);
  }, [token]);

  const value = useMemo<AuthContextValue>(() => {
    return {
      token,
      userEmail,

      // PUBLIC_INTERFACE
      async login({ email, password }) {
        /**
         * Logs in via backend.
         * Expected backend shape (MVP): POST /auth/login -> { token, user: { email } }
         */
        const resp = await apiClient.postJson<{
          token: string;
          user?: { email?: string };
        }>("/auth/login", { email, password });

        setToken(resp.token);
        setUserEmail(resp.user?.email ?? email);
        localStorage.setItem(TOKEN_KEY, resp.token);
        localStorage.setItem(EMAIL_KEY, resp.user?.email ?? email);
      },

      // PUBLIC_INTERFACE
      async register({ email, password }) {
        /**
         * Registers via backend.
         * Expected backend shape (MVP): POST /auth/register -> { token, user: { email } }
         */
        const resp = await apiClient.postJson<{
          token: string;
          user?: { email?: string };
        }>("/auth/register", { email, password });

        setToken(resp.token);
        setUserEmail(resp.user?.email ?? email);
        localStorage.setItem(TOKEN_KEY, resp.token);
        localStorage.setItem(EMAIL_KEY, resp.user?.email ?? email);
      },

      // PUBLIC_INTERFACE
      logout() {
        /** Clears auth locally. */
        setToken(null);
        setUserEmail(null);
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(EMAIL_KEY);
      },
    };
  }, [token, userEmail]);

  return <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>;
}

/**
 * PUBLIC_INTERFACE
 */
export function useAuth(): AuthContextValue {
  /** Hook to access auth context. */
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
