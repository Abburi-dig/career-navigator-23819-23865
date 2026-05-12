import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../state/auth";
import { Btn, C, FadeIn, StarField, font, fontMono } from "../../prototype/designSystem";

/**
 * PUBLIC_INTERFACE
 */
export function LoginPage() {
  /** Prototype-matching role selector login. */
  const auth = useAuth();
  const navigate = useNavigate();
  const [hov, setHov] = useState<"user" | "admin" | null>(null);

  const onLogin = (role: "user" | "admin") => {
    // Prototype is a role switcher, not a credential form.
    // We keep auth token mechanics satisfied with a lightweight "login".
    auth.login({
      token: `prototype-${role}`,
      email: role === "admin" ? "admin@digitalt3.example" : "navigator@digitalt3.example",
    });
    localStorage.setItem("cn_role", role);
    localStorage.removeItem("cn_pathMode");
    navigate("/app", { replace: true });
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: C.bg,
        fontFamily: font,
        position: "relative",
      }}
    >
      <StarField />
      <FadeIn delay={100}>
        <div style={{ textAlign: "center", zIndex: 1, position: "relative" }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 20,
              margin: "0 auto 20px",
              background: `linear-gradient(135deg, ${C.cyan}, #2A8F98)`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: `0 0 60px ${C.cyanGlow}, 0 0 120px ${C.cyanGlow}`,
              fontSize: 36,
            }}
          >
            🧭
          </div>
          <h1
            style={{
              margin: "0 0 6px",
              fontSize: 36,
              fontWeight: 700,
              color: C.text,
              letterSpacing: -1,
            }}
          >
            Career Navigator
          </h1>
          <p style={{ color: C.textMuted, fontSize: 15, margin: "0 0 48px", letterSpacing: 0.5 }}>
            AI-Powered Career Copilot for Tech Leaders
          </p>

          <div style={{ display: "flex", gap: 20, justifyContent: "center", flexWrap: "wrap" }}>
            {[
              {
                role: "user" as const,
                title: "Tech Leader",
                sub: "Chart your professional journey",
                emoji: "👤",
                color: C.cyan,
              },
              {
                role: "admin" as const,
                title: "Administrator",
                sub: "Manage platform & users",
                emoji: "🛡️",
                color: C.coral,
              },
            ].map((r) => (
              <div
                key={r.role}
                onMouseEnter={() => setHov(r.role)}
                onMouseLeave={() => setHov(null)}
                onClick={() => onLogin(r.role)}
                style={{
                  width: 250,
                  padding: 28,
                  borderRadius: 16,
                  textAlign: "center",
                  cursor: "pointer",
                  background: hov === r.role ? C.bgGlassHover : C.bgGlass,
                  backdropFilter: "blur(24px)",
                  border: `1px solid ${hov === r.role ? `${r.color}40` : C.border}`,
                  boxShadow: hov === r.role ? `0 0 40px ${r.color}20` : "0 4px 24px rgba(0,0,0,0.2)",
                  transform: hov === r.role ? "translateY(-3px)" : "translateY(0)",
                  transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 16,
                    margin: "0 auto 16px",
                    background: `${r.color}12`,
                    border: `1px solid ${r.color}30`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 26,
                    boxShadow: `0 0 30px ${r.color}15`,
                  }}
                >
                  {r.emoji}
                </div>
                <div style={{ fontSize: 18, fontWeight: 600, color: C.text, marginBottom: 6 }}>
                  {r.title}
                </div>
                <div style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.5, marginBottom: 18 }}>
                  {r.sub}
                </div>
                <div style={{ color: r.color, fontSize: 13, fontWeight: 600 }}>Enter →</div>
              </div>
            ))}
          </div>

          <p style={{ color: C.textDim, fontSize: 11, marginTop: 48, fontFamily: fontMono, letterSpacing: 1 }}>
            DIGITAL T3 — BRINGING DIGITAL & AI TOGETHER
          </p>
        </div>
      </FadeIn>
    </div>
  );
}
