import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../state/auth/useAuth";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const auth = useAuth();
  const loc = useLocation();

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: loc.pathname }} />;
  }

  return <>{children}</>;
}
