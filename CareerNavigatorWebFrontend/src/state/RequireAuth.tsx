import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./auth";

/**
 * PUBLIC_INTERFACE
 */
export function RequireAuth(props: { children: React.ReactNode }) {
  /** Protects authenticated routes; redirects to /login when unauthenticated. */
  const { token } = useAuth();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return <>{props.children}</>;
}
