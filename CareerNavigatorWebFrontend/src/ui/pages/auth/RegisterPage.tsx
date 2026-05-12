import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../state/auth";

/**
 * PUBLIC_INTERFACE
 */
export function RegisterPage() {
  /** Integration-friendly register route: creates a default user, then redirects into the app. */
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    const run = async () => {
      const email = "navigator@digitalt3.example";
      const password = "prototype-password";
      try {
        await auth.register({ email, password });
      } catch {
        await auth.login({ email, password });
      }
      navigate("/app", { replace: true });
    };
    void run();
  }, [auth, navigate]);

  return null;
}
