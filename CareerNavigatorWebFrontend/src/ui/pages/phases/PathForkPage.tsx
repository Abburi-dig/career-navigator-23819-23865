import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { C, FadeIn, Tag, font } from "../../prototype/designSystem";

/**
 * PUBLIC_INTERFACE
 */
export function PathForkPage() {
  /** Prototype Phase 03 — Path Discovery fork. */
  const navigate = useNavigate();
  const [hov, setHov] = useState<"linear" | "multi" | null>(null);

  const onChoose = (mode: "linear" | "multiverse") => {
    localStorage.setItem("cn_pathMode", mode);
    navigate(mode === "linear" ? "/app/linear" : "/app/multiverse");
  };

  return (
    <div
      style={{
        padding: "36px 44px",
        maxWidth: 960,
        fontFamily: font,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <FadeIn>
        <div style={{ textAlign: "center", marginBottom: 40 }}>
          <Tag color={C.violet}>PHASE 03 — PATH DISCOVERY</Tag>
          <h1 style={{ margin: "14px 0 8px", fontSize: 32, fontWeight: 700, color: C.text, letterSpacing: -0.5 }}>
            How do you see your future?
          </h1>
          <p
            style={{
              margin: 0,
              color: C.textMuted,
              fontSize: 15,
              lineHeight: 1.6,
              maxWidth: 580,
              marginInline: "auto",
            }}
          >
            Based on your validated profile, choose how to chart your next move. This shapes everything that follows.
          </p>
        </div>
      </FadeIn>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, width: "100%" }}>
        <FadeIn delay={200}>
          <div
            onMouseEnter={() => setHov("linear")}
            onMouseLeave={() => setHov(null)}
            onClick={() => onChoose("linear")}
            style={{
              padding: 28,
              borderRadius: 16,
              cursor: "pointer",
              minHeight: 340,
              background: hov === "linear" ? C.bgGlassHover : C.bgGlass,
              backdropFilter: "blur(24px)",
              border: `1px solid ${hov === "linear" ? C.borderHover : C.border}`,
              boxShadow: hov === "linear" ? `0 0 40px ${C.cyanGlow}` : "0 4px 24px rgba(0,0,0,0.2)",
              transform: hov === "linear" ? "translateY(-3px)" : "translateY(0)",
              transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <svg width="100%" height="80" viewBox="0 0 400 80" style={{ marginBottom: 16 }}>
              <defs>
                <linearGradient id="lg">
                  <stop offset="0%" stopColor={C.cyan} stopOpacity="0.2" />
                  <stop offset="100%" stopColor={C.cyan} stopOpacity="1" />
                </linearGradient>
              </defs>
              <line x1="20" y1="60" x2="360" y2="20" stroke="url(#lg)" strokeWidth="3" strokeLinecap="round" />
              <circle cx="20" cy="60" r="5" fill={C.cyan} opacity="0.4" />
              <circle cx="190" cy="40" r="4" fill={C.cyan} opacity="0.6" />
              <circle cx="360" cy="20" r="7" fill={C.cyan}>
                <animate attributeName="r" values="7;10;7" dur="2s" repeatCount="indefinite" />
              </circle>
            </svg>

            <Tag color={C.cyan}>DIRECT TRAJECTORY</Tag>
            <h2 style={{ margin: "12px 0 8px", fontSize: 22, fontWeight: 700, color: C.text }}>
              "I know where I'm going"
            </h2>
            <p style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.6, margin: "0 0 20px" }}>
              You have a clear target role — VP Engineering, CTO, Director. Get a focused gap analysis and a direct
              roadmap.
            </p>

            {["Select your target role", "Instant gap analysis vs. role requirements", "Focused Now / Near / Next roadmap"].map(
              (t, i) => (
                <div
                  key={i}
                  style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: C.textMuted, marginBottom: 6 }}
                >
                  <span style={{ color: C.cyan }}>→</span> {t}
                </div>
              ),
            )}

            <div style={{ marginTop: 18, fontSize: 13, fontWeight: 600, color: C.cyan }}>Choose Direct Trajectory →</div>
          </div>
        </FadeIn>

        <FadeIn delay={350}>
          <div
            onMouseEnter={() => setHov("multi")}
            onMouseLeave={() => setHov(null)}
            onClick={() => onChoose("multiverse")}
            style={{
              padding: 28,
              borderRadius: 16,
              cursor: "pointer",
              minHeight: 340,
              background: hov === "multi" ? C.bgGlassHover : C.bgGlass,
              backdropFilter: "blur(24px)",
              border: `1px solid ${hov === "multi" ? `${C.violet}40` : C.border}`,
              boxShadow: hov === "multi" ? `0 0 40px ${C.violetGlow}` : "0 4px 24px rgba(0,0,0,0.2)",
              transform: hov === "multi" ? "translateY(-3px)" : "translateY(0)",
              transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <svg width="100%" height="80" viewBox="0 0 400 80" style={{ marginBottom: 16 }}>
              <circle cx="40" cy="40" r="6" fill={C.violet} opacity="0.5">
                <animate attributeName="opacity" values="0.5;0.9;0.5" dur="2.5s" repeatCount="indefinite" />
              </circle>
              <path
                d="M46 40 Q 150 38, 360 12"
                stroke={C.coral}
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                opacity="0.7"
              />
              <path
                d="M46 40 Q 150 42, 360 40"
                stroke={C.violet}
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                opacity="0.7"
              />
              <path
                d="M46 40 Q 150 44, 360 68"
                stroke={C.gold}
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                opacity="0.7"
              />
              <circle cx="360" cy="12" r="5" fill={C.coral} opacity="0.8" />
              <text x="340" y="8" fontSize="9" fill={C.coral} textAnchor="end">
                CTO
              </text>
              <circle cx="360" cy="40" r="5" fill={C.violet} opacity="0.8" />
              <text x="340" y="37" fontSize="9" fill={C.violet} textAnchor="end">
                Lateral
              </text>
              <circle cx="360" cy="68" r="5" fill={C.gold} opacity="0.8" />
              <text x="340" y="66" fontSize="9" fill={C.gold} textAnchor="end">
                Portfolio
              </text>
            </svg>

            <Tag color={C.violet}>MULTIVERSE EXPLORER</Tag>
            <h2 style={{ margin: "12px 0 8px", fontSize: 22, fontWeight: 700, color: C.text }}>
              "I want to explore possibilities"
            </h2>
            <p style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.6, margin: "0 0 20px" }}>
              Open to non-linear paths — lateral moves, pivots, fractional roles, portfolio careers. Explore and compare
              multiple timelines.
            </p>

            {[
              "Explore vertical, lateral, pivot & portfolio",
              "Shopping Cart side-by-side comparison",
              "3/2 Rule: Mastery vs. Challenge balance",
            ].map((t, i) => (
              <div
                key={i}
                style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: C.textMuted, marginBottom: 6 }}
              >
                <span style={{ color: C.violet }}>⟡</span> {t}
              </div>
            ))}

            <div style={{ marginTop: 18, fontSize: 13, fontWeight: 600, color: C.violet }}>Explore Multiverse →</div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
