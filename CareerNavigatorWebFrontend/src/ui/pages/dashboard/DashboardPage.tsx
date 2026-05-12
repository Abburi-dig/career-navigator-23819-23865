import React from "react";
import { useNavigate } from "react-router-dom";
import { Btn, C, FadeIn, Glass, GlowIcon, Ring, Tag, font } from "../../prototype/designSystem";

type Step = {
  id: string;
  n: string;
  title: string;
  sub: string;
  emoji: string;
  color: string;
  ready: boolean;
  path: string;
};

/**
 * PUBLIC_INTERFACE
 */
export function DashboardPage() {
  /** Prototype “Mission Control” dashboard (static progress like prototype). */
  const navigate = useNavigate();

  const steps: Step[] = [
    {
      id: "step1",
      n: "01",
      title: "Build Profile",
      sub: "Whole Person data ingestion",
      emoji: "👤",
      color: C.cyan,
      ready: true,
      path: "/app/profile",
    },
    {
      id: "step2",
      n: "02",
      title: "The Grill",
      sub: "AI competency validation",
      emoji: "🔥",
      color: C.coral,
      ready: false,
      path: "/app/grill",
    },
    {
      id: "pathfork",
      n: "03",
      title: "Discover Path",
      sub: "Linear trajectory or multiverse exploration",
      emoji: "⚡",
      color: C.violet,
      ready: false,
      path: "/app/path",
    },
    {
      id: "step4",
      n: "04",
      title: "Build Roadmap",
      sub: "Gap analysis & action plan",
      emoji: "🗺️",
      color: C.gold,
      ready: false,
      path: "/app/roadmap",
    },
    {
      id: "step5",
      n: "05",
      title: "Marketplace",
      sub: "Curated growth opportunities",
      emoji: "🚀",
      color: C.green,
      ready: false,
      path: "/app/marketplace",
    },
  ];

  const go = (path: string) => navigate(path);

  return (
    <div style={{ padding: "36px 44px", maxWidth: 1050, fontFamily: font }}>
      <FadeIn>
        <Glass
          style={{
            marginBottom: 32,
            position: "relative",
            overflow: "hidden",
            background: `linear-gradient(135deg, rgba(58,175,185,0.08), rgba(14,22,38,0.8))`,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -60,
              right: -40,
              width: 250,
              height: 250,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${C.cyanGlow} 0%, transparent 70%)`,
              opacity: 0.3,
            }}
          />
          <div style={{ position: "relative", zIndex: 1 }}>
            <Tag color={C.cyan}>MISSION CONTROL</Tag>
            <h1
              style={{
                margin: "12px 0 8px",
                fontSize: 28,
                fontWeight: 700,
                color: C.text,
                letterSpacing: -0.5,
              }}
            >
              Welcome, Navigator
            </h1>
            <p style={{ margin: 0, color: C.textMuted, fontSize: 14, lineHeight: 1.6, maxWidth: 560 }}>
              Your career isn't a ladder — it's a constellation of possibilities. Complete each phase to chart your unique
              trajectory.
            </p>

            <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 20 }}>
              <Ring pct={0} />
              <div>
                <div
                  style={{
                    fontSize: 11,
                    color: C.textDim,
                    fontFamily: "'JetBrains Mono', monospace",
                    letterSpacing: 1,
                    textTransform: "uppercase",
                  }}
                >
                  Progress
                </div>
                <div style={{ fontSize: 20, fontWeight: 700, color: C.text }}>
                  0 / 5 <span style={{ fontSize: 13, color: C.textMuted, fontWeight: 400 }}>phases</span>
                </div>
              </div>
            </div>
          </div>
        </Glass>
      </FadeIn>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {steps.map((s, i) => (
          <FadeIn key={s.id} delay={150 + i * 80}>
            <Glass
              hover={s.ready}
              glow={s.ready ? `${s.color}15` : null}
              onClick={s.ready ? () => go(s.path) : undefined}
              style={{ cursor: s.ready ? "pointer" : "default" }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                <div
                  style={{
                    fontSize: 11,
                    fontFamily: "'JetBrains Mono', monospace",
                    fontWeight: 700,
                    color: s.ready ? s.color : C.textDim,
                    letterSpacing: 2,
                    width: 28,
                  }}
                >
                  {s.n}
                </div>

                <GlowIcon emoji={s.emoji} color={s.ready ? s.color : C.textDim} size={42} />

                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: s.ready ? C.text : C.textDim }}>{s.title}</div>
                  <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>{s.sub}</div>
                </div>

                {s.ready ? (
                  <Btn onClick={() => go(s.path)} style={{ padding: "8px 20px" }}>
                    Begin →
                  </Btn>
                ) : (
                  <Tag color={C.textDim}>Locked</Tag>
                )}
              </div>
            </Glass>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
