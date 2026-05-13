import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import StarField from "../components/StarField";
import Glass from "../components/ui/Glass";
import Button from "../components/ui/Button";
import { useAuth } from "../state/auth/useAuth";

type Role = "user" | "admin";

export default function LoginPage() {
  const auth = useAuth();
  const navigate = useNavigate();
  const loc = useLocation();
  const [loadingRole, setLoadingRole] = useState<Role | null>(null);
  const [error, setError] = useState<string | null>(null);

  const from = (loc.state as any)?.from ?? "/dashboard";

  const doLogin = async (role: Role) => {
    setError(null);
    setLoadingRole(role);
    try {
      await auth.login({ role });
      navigate(from);
    } catch (e: any) {
      setError(e?.message ?? "Login failed");
    } finally {
      setLoadingRole(null);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <StarField />
      <div style={{ width: "min(820px, 94vw)", textAlign: "center", position: "relative", zIndex: 1 }}>
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 20,
            margin: "0 auto 16px",
            background: "linear-gradient(135deg, var(--cyan), #2A8F98)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 60px rgba(58,175,185,0.4)",
            fontSize: 36,
          }}
          aria-hidden="true"
        >
          🧭
        </div>

        <h1 style={{ margin: "0 0 6px", fontSize: 36, fontWeight: 850, letterSpacing: -1 }}>Career Navigator</h1>
        <p style={{ margin: "0 0 36px", color: "var(--text-muted)", letterSpacing: 0.4 }}>
          AI-Powered Career Copilot for Tech Leaders
        </p>

        {error && (
          <div
            style={{
              margin: "0 auto 18px",
              width: "min(520px, 92vw)",
              padding: "10px 12px",
              borderRadius: 10,
              border: "1px solid rgba(248,113,113,0.35)",
              background: "rgba(248,113,113,0.10)",
              color: "var(--red)",
              fontSize: 13,
              textAlign: "left",
            }}
          >
            {error}
          </div>
        )}

        <div className="grid-2" style={{ gap: 18 }}>
          <Glass hover padding={24} onClick={() => doLogin("user")}>
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 16,
                  margin: "0 auto 12px",
                  background: "rgba(58,175,185,0.12)",
                  border: "1px solid rgba(58,175,185,0.30)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 26,
                }}
                aria-hidden="true"
              >
                👤
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>Tech Leader</div>
              <div className="muted" style={{ fontSize: 13, lineHeight: 1.5, marginBottom: 14 }}>
                Chart your professional journey
              </div>
              <Button disabled={loadingRole !== null} style={{ width: "100%" }}>
                {loadingRole === "user" ? "Entering..." : "Enter →"}
              </Button>
            </div>
          </Glass>

          <Glass hover padding={24} onClick={() => doLogin("admin")}>
            <div style={{ textAlign: "center" }}>
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 16,
                  margin: "0 auto 12px",
                  background: "rgba(232,115,74,0.12)",
                  border: "1px solid rgba(232,115,74,0.30)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 26,
                }}
                aria-hidden="true"
              >
                🛡️
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>Administrator</div>
              <div className="muted" style={{ fontSize: 13, lineHeight: 1.5, marginBottom: 14 }}>
                Manage platform & users
              </div>
              <Button variant="coral" disabled={loadingRole !== null} style={{ width: "100%" }}>
                {loadingRole === "admin" ? "Entering..." : "Enter →"}
              </Button>
            </div>
          </Glass>
        </div>

        <p className="mono dim" style={{ marginTop: 34, fontSize: 11, letterSpacing: 1 }}>
          DIGITAL T3 — BRINGING DIGITAL & AI TOGETHER
        </p>
      </div>
    </div>
  );
}
