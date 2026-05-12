import React, { useEffect, useState } from "react";
import { Btn, C, FadeIn, Glass, Ring, Tag, font, fontMono } from "../../prototype/designSystem";

/* ─── MIND MAP — Interactive SVG Node Graph ─── */
function MindMapView() {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setAnimated(true), 300);
    return () => window.clearTimeout(t);
  }, []);

  const center = { id: "you", x: 420, y: 260, r: 38, label: "YOU", sub: "Current State", emoji: "👤" };

  const clusters = [
    {
      id: "comp",
      label: "Competencies",
      emoji: "🧩",
      color: C.coral,
      x: 160,
      y: 120,
      r: 30,
      children: [
        { id: "c1", label: "Financial Mgmt", status: "gap", x: 60, y: 50 },
        { id: "c2", label: "Strategic Planning", status: "gap", x: 50, y: 170 },
        { id: "c3", label: "Technical Leadership", status: "strong", x: 170, y: 30 },
      ],
    },
    {
      id: "skills",
      label: "Skills",
      emoji: "🔧",
      color: C.cyan,
      x: 420,
      y: 50,
      r: 30,
      children: [
        { id: "s1", label: "Cloud Architecture", status: "strong", x: 320, y: 10 },
        { id: "s2", label: "Budget Ownership", status: "gap", x: 520, y: 10 },
        { id: "s3", label: "Exec Communication", status: "gap", x: 420, y: -20 },
      ],
    },
    {
      id: "exp",
      label: "Experiences",
      emoji: "🏆",
      color: C.violet,
      x: 680,
      y: 120,
      r: 30,
      children: [
        { id: "e1", label: "P&L Leadership", status: "gap", x: 770, y: 50 },
        { id: "e2", label: "Board Presentation", status: "gap", x: 790, y: 170 },
        { id: "e3", label: "Team Scaling (50+)", status: "strong", x: 680, y: 30 },
      ],
    },
    {
      id: "target",
      label: "Target Role",
      emoji: "🎯",
      color: C.gold,
      x: 420,
      y: 470,
      r: 30,
      children: [
        { id: "t1", label: "VP Engineering", status: "target", x: 300, y: 490 },
        { id: "t2", label: "Requires P&L", status: "req", x: 540, y: 490 },
      ],
    },
    {
      id: "growth",
      label: "Growth Areas",
      emoji: "📈",
      color: C.green,
      x: 160,
      y: 400,
      r: 30,
      children: [
        { id: "g1", label: "Public Speaking", status: "gap", x: 60, y: 370 },
        { id: "g2", label: "Mentoring", status: "progress", x: 60, y: 450 },
      ],
    },
    {
      id: "certs",
      label: "Certifications",
      emoji: "📜",
      color: "#F59E0B",
      x: 680,
      y: 400,
      r: 30,
      children: [
        { id: "cr1", label: "AWS Solutions", status: "progress", x: 790, y: 370 },
        { id: "cr2", label: "TOGAF", status: "gap", x: 790, y: 450 },
      ],
    },
  ] as const;

  const statusColor = (s: string) =>
    s === "strong"
      ? C.green
      : s === "gap"
        ? C.coral
        : s === "progress"
          ? C.gold
          : s === "target"
            ? C.gold
            : s === "req"
              ? C.violet
              : C.textDim;

  const statusLabel = (s: string) =>
    s === "strong" ? "✓ Strong" : s === "gap" ? "Gap" : s === "progress" ? "In Progress" : s === "target" ? "Goal" : "Required";

  return (
    <div style={{ position: "relative" }}>
      <div style={{ display: "flex", gap: 16, marginBottom: 14, flexWrap: "wrap" }}>
        {[
          { color: C.green, label: "Strong / Met" },
          { color: C.gold, label: "In Progress" },
          { color: C.coral, label: "Gap / Needed" },
          { color: C.violet, label: "Required for Target" },
        ].map((l) => (
          <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: C.textMuted }}>
            <div style={{ width: 8, height: 8, borderRadius: 4, background: l.color, boxShadow: `0 0 6px ${l.color}60` }} />
            {l.label}
          </div>
        ))}
      </div>

      <Glass pad={0} style={{ overflow: "hidden", minHeight: 520 }}>
        <svg width="100%" height="520" viewBox="0 0 840 520" style={{ display: "block" }}>
          <defs>
            <filter id="nodeGlow">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="lineGlow">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {clusters.map((cl) => (
            <line
              key={`line-${cl.id}`}
              x1={center.x}
              y1={center.y}
              x2={cl.x}
              y2={cl.y}
              stroke={cl.color}
              strokeWidth={animated ? 1.5 : 0}
              strokeOpacity={0.25}
              strokeDasharray="6 4"
              filter="url(#lineGlow)"
              style={{ transition: "stroke-width 1s ease 0.5s" }}
            />
          ))}

          {clusters.flatMap((cl) =>
            cl.children.map((ch) => (
              <line
                key={`cline-${ch.id}`}
                x1={cl.x}
                y1={cl.y}
                x2={ch.x}
                y2={ch.y}
                stroke={statusColor(ch.status)}
                strokeWidth={animated ? 1 : 0}
                strokeOpacity={0.3}
                style={{ transition: "stroke-width 0.8s ease 0.8s" }}
              />
            )),
          )}

          {clusters.flatMap((cl) =>
            cl.children.map((ch) => {
              const sc = statusColor(ch.status);
              const isActive = activeNode === ch.id;
              return (
                <g key={ch.id} onClick={() => setActiveNode(isActive ? null : ch.id)} style={{ cursor: "pointer" }}>
                  <circle
                    cx={ch.x}
                    cy={ch.y}
                    r={isActive ? 22 : 16}
                    fill={`${sc}15`}
                    stroke={sc}
                    strokeWidth={isActive ? 2 : 1}
                    style={{ transition: "all 0.3s ease", opacity: animated ? 1 : 0 }}
                    filter={isActive ? "url(#nodeGlow)" : undefined}
                  />
                  <circle cx={ch.x} cy={ch.y} r={4} fill={sc} style={{ opacity: animated ? 1 : 0, transition: "opacity 0.5s ease 1s" }} />
                  <text
                    x={ch.x}
                    y={ch.y + (ch.y < 260 ? -22 : 28)}
                    textAnchor="middle"
                    fontSize="10"
                    fontFamily={font}
                    fontWeight="500"
                    fill={isActive ? sc : C.textMuted}
                    style={{ opacity: animated ? 1 : 0, transition: "opacity 0.6s ease 1.1s" }}
                  >
                    {ch.label}
                  </text>
                  {isActive && (
                    <text x={ch.x} y={ch.y + (ch.y < 260 ? -34 : 40)} textAnchor="middle" fontSize="9" fontFamily={fontMono} fontWeight="600" fill={sc}>
                      {statusLabel(ch.status)}
                    </text>
                  )}
                </g>
              );
            }),
          )}

          {clusters.map((cl) => {
            const isActive = activeNode === cl.id;
            return (
              <g key={cl.id} onClick={() => setActiveNode(isActive ? null : cl.id)} style={{ cursor: "pointer" }}>
                <circle
                  cx={cl.x}
                  cy={cl.y}
                  r={cl.r}
                  fill={C.bgSurface}
                  stroke={cl.color}
                  strokeWidth={isActive ? 2.5 : 1.5}
                  style={{ transition: "all 0.3s ease", opacity: animated ? 1 : 0 }}
                  filter={isActive ? "url(#nodeGlow)" : undefined}
                />
                <text x={cl.x} y={cl.y + 5} textAnchor="middle" fontSize="18" style={{ opacity: animated ? 1 : 0, transition: "opacity 0.4s ease 0.6s" }}>
                  {cl.emoji}
                </text>
                <text
                  x={cl.x}
                  y={cl.y + cl.r + 16}
                  textAnchor="middle"
                  fontSize="11"
                  fontFamily={font}
                  fontWeight="600"
                  fill={cl.color}
                  style={{ opacity: animated ? 1 : 0, transition: "opacity 0.5s ease 0.8s" }}
                >
                  {cl.label}
                </text>
              </g>
            );
          })}

          <g>
            <circle cx={center.x} cy={center.y} r={center.r + 8} fill="none" stroke={C.cyan} strokeWidth="1" strokeOpacity="0.2" strokeDasharray="4 3">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from={`0 ${center.x} ${center.y}`}
                to={`360 ${center.x} ${center.y}`}
                dur="30s"
                repeatCount="indefinite"
              />
            </circle>
            <circle
              cx={center.x}
              cy={center.y}
              r={center.r}
              fill={C.bgSurface}
              stroke={C.cyan}
              strokeWidth="2.5"
              filter="url(#nodeGlow)"
              style={{ opacity: animated ? 1 : 0, transition: "opacity 0.3s ease" }}
            />
            <text x={center.x} y={center.y + 5} textAnchor="middle" fontSize="22" style={{ opacity: animated ? 1 : 0, transition: "opacity 0.4s ease 0.3s" }}>
              {center.emoji}
            </text>
            <text
              x={center.x}
              y={center.y + center.r + 18}
              textAnchor="middle"
              fontSize="12"
              fontFamily={fontMono}
              fontWeight="700"
              fill={C.cyan}
              letterSpacing="2"
              style={{ opacity: animated ? 1 : 0, transition: "opacity 0.5s ease 0.5s" }}
            >
              {center.label}
            </text>
            <text
              x={center.x}
              y={center.y + center.r + 32}
              textAnchor="middle"
              fontSize="10"
              fontFamily={font}
              fill={C.textMuted}
              style={{ opacity: animated ? 1 : 0, transition: "opacity 0.5s ease 0.6s" }}
            >
              {center.sub}
            </text>
          </g>
        </svg>
      </Glass>
    </div>
  );
}

/* ─── PATHWAY — Journey Timeline ─── */
function PathwayView() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const toggle = (id: string) => setCheckedItems((p) => ({ ...p, [id]: !p[id] }));

  const phases = [
    {
      period: "Now",
      range: "0–6 Months",
      color: C.cyan,
      icon: "🏁",
      items: [
        { id: "n1", t: "AWS Solutions Certification", type: "Certification", gap: "Cloud Architecture" },
        { id: "n2", t: "Public Speaking Course", type: "Skill Development", gap: "Exec Communication" },
        { id: "n3", t: "Weekly 1:1 with CFO sponsor", type: "Relationship", gap: "Financial Exposure" },
      ],
    },
    {
      period: "Near",
      range: "1–2 Years",
      color: C.violet,
      icon: "⚡",
      items: [
        { id: "m1", t: "Lead $5M P&L Project", type: "Experience", gap: "Financial Management" },
        { id: "m2", t: "Mentor 3 Junior Developers", type: "Leadership", gap: "People Leadership" },
        { id: "m3", t: "Present at Board Meeting", type: "Visibility", gap: "Board Presentation" },
      ],
    },
    {
      period: "Next",
      range: "2–5 Years",
      color: C.coral,
      icon: "🎯",
      items: [
        { id: "f1", t: "VP Engineering", type: "Target Role", gap: "Destination" },
        { id: "f2", t: "Own engineering org (50+ ICs)", type: "Scope", gap: "Org Leadership" },
      ],
    },
  ];

  const totalItems = phases.reduce((a, p) => a + p.items.length, 0);
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;

  return (
    <div>
      <Glass pad={16} style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Ring pct={(checkedCount / totalItems) * 100} size={40} stroke={3} />
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>
                {checkedCount} / {totalItems} milestones
              </div>
              <div style={{ fontSize: 11, color: C.textMuted }}>Track your progress interactively</div>
            </div>
          </div>
          <Tag color={checkedCount > 0 ? C.green : C.textDim}>
            {checkedCount === 0 ? "Not Started" : checkedCount === totalItems ? "Complete!" : "In Progress"}
          </Tag>
        </div>
        <div style={{ height: 4, borderRadius: 2, background: C.bgSurface, overflow: "hidden" }}>
          <div
            style={{
              height: "100%",
              borderRadius: 2,
              width: `${(checkedCount / totalItems) * 100}%`,
              background: `linear-gradient(90deg, ${C.cyan}, ${C.violet}, ${C.coral})`,
              boxShadow: `0 0 12px ${C.cyanGlow}`,
              transition: "width 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
        </div>
      </Glass>

      <div style={{ position: "relative" }}>
        <div
          style={{
            position: "absolute",
            top: 28,
            left: 40,
            right: 40,
            height: 3,
            zIndex: 0,
            background: `linear-gradient(90deg, ${C.cyan}40, ${C.violet}40, ${C.coral}40)`,
            borderRadius: 2,
          }}
        >
          <div
            style={{
              height: "100%",
              borderRadius: 2,
              width: `${(checkedCount / totalItems) * 100}%`,
              background: `linear-gradient(90deg, ${C.cyan}, ${C.violet}, ${C.coral})`,
              boxShadow: `0 0 10px ${C.cyanGlow}`,
              transition: "width 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, position: "relative", zIndex: 1 }}>
          {phases.map((p) => {
            const phaseChecked = p.items.filter((item) => checkedItems[item.id]).length;
            const phaseComplete = phaseChecked === p.items.length;

            return (
              <div key={p.period}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 16,
                      background: phaseComplete ? `${p.color}25` : C.bgSurface,
                      border: `2px solid ${phaseComplete ? p.color : `${p.color}40`}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 24,
                      position: "relative",
                      boxShadow: phaseComplete ? `0 0 24px ${p.color}30` : "none",
                      transition: "all 0.4s ease",
                    }}
                  >
                    {phaseComplete ? "✅" : (p as any).icon}
                  </div>
                </div>

                <div style={{ textAlign: "center", marginBottom: 12 }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: p.color }}>{p.period}</div>
                  <div style={{ fontSize: 11, color: C.textDim, fontFamily: fontMono, letterSpacing: 1 }}>{p.range}</div>
                  <div style={{ fontSize: 11, color: C.textMuted, marginTop: 4 }}>
                    {phaseChecked}/{p.items.length} complete
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {p.items.map((item) => {
                    const checked = checkedItems[item.id];
                    return (
                      <Glass
                        key={item.id}
                        pad={12}
                        hover
                        glow={checked ? `${C.green}12` : `${p.color}08`}
                        onClick={() => toggle(item.id)}
                        style={{
                          cursor: "pointer",
                          borderColor: checked ? `${C.green}30` : C.border,
                          background: checked ? `${C.green}06` : C.bgGlass,
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "start", gap: 10 }}>
                          <div
                            style={{
                              width: 20,
                              height: 20,
                              borderRadius: 6,
                              flexShrink: 0,
                              marginTop: 1,
                              border: `2px solid ${checked ? C.green : `${p.color}50`}`,
                              background: checked ? `${C.green}20` : "transparent",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              transition: "all 0.3s ease",
                            }}
                          >
                            {checked && <span style={{ fontSize: 11, color: C.green }}>✓</span>}
                          </div>

                          <div style={{ flex: 1 }}>
                            <div
                              style={{
                                fontSize: 13,
                                fontWeight: 500,
                                color: checked ? C.green : C.text,
                                textDecoration: checked ? "line-through" : "none",
                                opacity: checked ? 0.7 : 1,
                                transition: "all 0.3s ease",
                              }}
                            >
                              {item.t}
                            </div>

                            <div style={{ display: "flex", gap: 6, marginTop: 6, flexWrap: "wrap" }}>
                              <span
                                style={{
                                  padding: "2px 7px",
                                  borderRadius: 4,
                                  fontSize: 10,
                                  fontWeight: 600,
                                  background: `${p.color}12`,
                                  color: p.color,
                                  border: `1px solid ${p.color}20`,
                                }}
                              >
                                {item.type}
                              </span>

                              <span
                                style={{
                                  padding: "2px 7px",
                                  borderRadius: 4,
                                  fontSize: 10,
                                  background: C.bgSurface,
                                  color: C.textMuted,
                                  border: `1px solid ${C.borderSubtle}`,
                                }}
                              >
                                🎯 {item.gap}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Glass>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 */
export function RoadmapPage() {
  /** Prototype Phase 04 — Roadmap with MindMap/Pathway tabs. */
  const [tab, setTab] = useState<"mindmap" | "pathway">("mindmap");

  return (
    <div style={{ padding: "36px 44px", maxWidth: 1050, fontFamily: font }}>
      <FadeIn>
        <Tag color={C.gold}>PHASE 04</Tag>
        <h1 style={{ margin: "10px 0 6px", fontSize: 28, fontWeight: 700, color: C.text, letterSpacing: -0.5 }}>
          Your Personalized Roadmap
        </h1>
        <p style={{ margin: "0 0 20px", color: C.textMuted, fontSize: 14, lineHeight: 1.6 }}>
          Two views of your journey: the Mind Map shows your delta — what you have and what you need. The Pathway shows
          when and how to get there.
        </p>
      </FadeIn>

      <FadeIn delay={100}>
        <div
          style={{
            display: "inline-flex",
            padding: 4,
            borderRadius: 12,
            marginBottom: 24,
            background: C.bgSurface,
            border: `1px solid ${C.border}`,
          }}
        >
          {[
            { id: "mindmap" as const, label: "🧠 Mind Map", sub: "The Delta" },
            { id: "pathway" as const, label: "🛤️ Pathway", sub: "The Journey" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                padding: "10px 24px",
                borderRadius: 10,
                border: "none",
                cursor: "pointer",
                background: tab === t.id ? `${C.cyan}15` : "transparent",
                transition: "all 0.25s ease",
                fontFamily: font,
              }}
            >
              <div style={{ fontSize: 13, fontWeight: 600, color: tab === t.id ? C.cyan : C.textMuted }}>{t.label}</div>
              <div style={{ fontSize: 10, color: tab === t.id ? `${C.cyan}90` : C.textDim, marginTop: 2 }}>{t.sub}</div>
            </button>
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={200} key={tab}>
        {tab === "mindmap" ? <MindMapView /> : <PathwayView />}
      </FadeIn>

      <div style={{ textAlign: "right", marginTop: 24 }}>
        <Btn onClick={() => (window.location.href = "/app/marketplace")}>Explore Marketplace →</Btn>
      </div>
    </div>
  );
}
