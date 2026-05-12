import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * PUBLIC_INTERFACE
 */
export function RegisterPage() {
  /** Prototype has no register form; redirect to role selector. */
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/login", { replace: true });
  }, [navigate]);

  return null;
}
