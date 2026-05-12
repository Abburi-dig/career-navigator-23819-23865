import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Btn, C, FadeIn, Glass, Tag, font } from "../../prototype/designSystem";

/**
 * PUBLIC_INTERFACE
 */
export function LinearPathPage() {
  /** Prototype Linear Path view. */
  const navigate = useNavigate();
  const [sel, setSel] = useState<string | null>(null);
  const [showGap, setShowGap] = useState(false);

  const roles = [
    { id: "vp", title: "VP Engineering", org: "Enterprise", time: "1–2 yrs", fit: "75%", emoji: "🏢" },
    { id: "dir", title: "Director of Engineering", org: "Growth-stage", time: "6–12 mo", fit: "88%", emoji: "📐" },
    { id: "cto", title: "CTO", org: "Series A/B Startup", time: "2+ yrs", fit: "90%", emoji: "🚀" },
    { id: "head", title: "Head of Platform", org: "Mid-size", time: "1 yr", fit: "82%", emoji: "⚙️" },
  ];

  const gaps = [
    { skill: "Technical Architecture", cur: 85, req: 80, color: C.green },
    { skill: "People Leadership", cur: 70, req: 85, color: C.gold },
    { skill: "Financial / P&L Management", cur: 30, req: 70, color: C.coral },
    { skill: "Executive Communication", cur: 45, req: 80, color: C.coral },
    { skill: "Strategic Planning", cur: 60, req: 75, color: C.gold },
  ];

  return (
    <div style={{ padding: "36px 44px", maxWidth: 920, fontFamily: font }}>
      <FadeIn>
        <Tag color={C.cyan}>DIRECT TRAJECTORY</Tag>
        <h1 style={{ margin: "10px 0 6px", fontSize: 28, fontWeight: 700, color: C.text }}>Select Your Target Role</h1>
        <p style={{ margin: "0 0 28px", color: C.textMuted, fontSize: 14 }}>
          Roles aligned with your validated competencies. Pick your destination.
        </p>
      </FadeIn>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 24 }}>
        {roles.map((r, i) => (
          <FadeIn key={r.id} delay={100 + i * 60}>
            <Glass
              hover
              glow={sel === r.id ? C.cyanGlow : null}
              onClick={() => {
                setSel(r.id);
                setShowGap(true);
              }}
              style={{
                cursor: "pointer",
                borderColor: sel === r.id ? `${C.cyan}40` : C.border,
                background: sel === r.id ? `${C.cyan}08` : C.bgGlass,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ fontSize: 28 }}>{r.emoji}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 16, fontWeight: 600, color: C.text }}>{r.title}</div>
                  <div style={{ fontSize: 12, color: C.textMuted }}>{r.org}</div>
                </div>
                {sel === r.id && <Tag color={C.cyan}>Selected</Tag>}
              </div>

              <div style={{ display: "flex", gap: 10, marginTop: 14, flexWrap: "wrap" }}>
                <Tag color={C.textMuted}>⏱ {r.time}</Tag>
                <Tag color={C.green}>Fit: {r.fit}</Tag>
              </div>
            </Glass>
          </FadeIn>
        ))}
      </div>

      {showGap && (
        <FadeIn delay={100}>
          <Glass style={{ borderColor: `${C.cyan}20` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
              <span style={{ fontSize: 20 }}>🎯</span>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: C.text }}>
                Gap Analysis — {roles.find((r) => r.id === sel)?.title}
              </h3>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 20 }}>
              {gaps.map((g) => (
                <div key={g.skill}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 13, color: C.text, fontWeight: 500 }}>{g.skill}</span>
                    <span
                      style={{
                        fontSize: 12,
                        fontFamily: "'JetBrains Mono', monospace",
                        color: g.cur >= g.req ? C.green : C.coral,
                      }}
                    >
                      {g.cur}% / {g.req}%
                    </span>
                  </div>

                  <div style={{ position: "relative", height: 6, borderRadius: 3, background: C.bgSurface }}>
                    <div
                      style={{
                        position: "absolute",
                        left: `${g.req}%`,
                        top: -3,
                        width: 2,
                        height: 12,
                        background: C.textDim,
                        borderRadius: 1,
                      }}
                    />
                    <div
                      style={{
                        height: "100%",
                        borderRadius: 3,
                        width: `${g.cur}%`,
                        background: `linear-gradient(90deg, ${g.color}60, ${g.color})`,
                        boxShadow: `0 0 8px ${g.color}40`,
                        transition: "width 1s ease",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Btn onClick={() => navigate("/app/roadmap")}>Build Roadmap →</Btn>
            </div>
          </Glass>
        </FadeIn>
      )}
    </div>
  );
}
