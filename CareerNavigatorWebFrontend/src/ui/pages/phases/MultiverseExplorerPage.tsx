import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Btn, C, FadeIn, Glass, GlowIcon, Tag, font, fontMono } from "../../prototype/designSystem";

type Path = {
  id: string;
  type: string;
  role: string;
  emoji: string;
  color: string;
  desc: string;
  time: string;
  fit: string;
  gap: "Low" | "Medium" | "High";
  m: number;
  c: number;
};

/**
 * PUBLIC_INTERFACE
 */
export function MultiverseExplorerPage() {
  /** Prototype Multiverse Explorer view. */
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [cart, setCart] = useState<string[]>([]);

  const paths: Path[] = [
    {
      id: "vert",
      type: "Vertical",
      role: "VP Engineering",
      emoji: "⬆️",
      color: C.cyan,
      desc: "Promotion — increased scope, P&L ownership, org leadership.",
      time: "1–2 Yrs",
      fit: "75%",
      gap: "Medium",
      m: 3,
      c: 2,
    },
    {
      id: "lat",
      type: "Lateral",
      role: "Principal Engineer",
      emoji: "↔️",
      color: C.violet,
      desc: "Adjacent role — breadth, cross-functional influence, deep tech.",
      time: "6–12 Mo",
      fit: "88%",
      gap: "Low",
      m: 4,
      c: 1,
    },
    {
      id: "pivot",
      type: "Pivot",
      role: "CTO at HealthTech",
      emoji: "↗️",
      color: C.coral,
      desc: "Industry change — FinTech to HealthTech, enterprise to startup.",
      time: "2+ Yrs",
      fit: "90%",
      gap: "High",
      m: 2,
      c: 3,
    },
    {
      id: "port",
      type: "Non-Linear",
      role: "Fractional CTO + Advisor",
      emoji: "🌐",
      color: C.gold,
      desc: "Portfolio career — advisory, fractional leadership, speaking.",
      time: "1–3 Yrs",
      fit: "65%",
      gap: "Medium",
      m: 3,
      c: 2,
    },
  ];

  const toggle = (id: string) => setCart((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id]));

  return (
    <div style={{ padding: "36px 44px", maxWidth: 1000, fontFamily: font }}>
      <FadeIn>
        <Tag color={C.violet}>MULTIVERSE EXPLORER</Tag>
        <h1 style={{ margin: "10px 0 6px", fontSize: 28, fontWeight: 700, color: C.text }}>
          Explore Your Professional Multiverse
        </h1>
        <p style={{ margin: "0 0 10px", color: C.textMuted, fontSize: 14, lineHeight: 1.6 }}>
          Each path is a different reality. Add to your Shopping Cart to compare side-by-side.
        </p>
        {cart.length > 0 && <Tag color={C.gold}>🛒 {cart.length} path{cart.length > 1 ? "s" : ""} in cart</Tag>}
      </FadeIn>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, margin: "20px 0 24px" }}>
        {paths.map((p, i) => (
          <FadeIn key={p.id} delay={100 + i * 60}>
            <Glass
              hover
              glow={expanded === p.id ? `${p.color}20` : null}
              onClick={() => setExpanded(expanded === p.id ? null : p.id)}
              style={{ cursor: "pointer", borderColor: cart.includes(p.id) ? `${p.color}40` : C.border }}
            >
              <div style={{ display: "flex", alignItems: "start", gap: 12 }}>
                <GlowIcon emoji={p.emoji} color={p.color} size={40} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div>
                      <span style={{ fontSize: 11, fontFamily: fontMono, color: p.color, fontWeight: 600 }}>
                        {p.type.toUpperCase()}
                      </span>
                      <div style={{ fontSize: 16, fontWeight: 600, color: C.text, marginTop: 2 }}>{p.role}</div>
                    </div>
                    {cart.includes(p.id) && <Tag color={p.color}>In Cart</Tag>}
                  </div>

                  <p style={{ fontSize: 13, color: C.textMuted, lineHeight: 1.55, margin: "8px 0 12px" }}>{p.desc}</p>

                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <Tag color={C.textMuted}>⏱ {p.time}</Tag>
                    <Tag color={C.green}>Fit: {p.fit}</Tag>
                    <Tag color={p.gap === "High" ? C.coral : p.gap === "Medium" ? C.gold : C.green}>Gap: {p.gap}</Tag>
                  </div>

                  {expanded === p.id && (
                    <div
                      style={{
                        marginTop: 16,
                        padding: "12px 14px",
                        borderRadius: 10,
                        background: C.bgSurface,
                        border: `1px solid ${C.borderSubtle}`,
                      }}
                    >
                      <div style={{ fontSize: 11, fontFamily: fontMono, color: C.textDim, marginBottom: 8, letterSpacing: 1 }}>
                        3/2 RULE BALANCE
                      </div>
                      <div style={{ display: "flex", gap: 4, marginBottom: 6 }}>
                        {[...Array(5)].map((_, j) => (
                          <div
                            key={j}
                            style={{
                              flex: 1,
                              height: 24,
                              borderRadius: 4,
                              background:
                                j < p.m
                                  ? `linear-gradient(135deg, ${C.cyan}60, ${C.cyan})`
                                  : `linear-gradient(135deg, ${C.coral}60, ${C.coral})`,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: 9,
                              fontWeight: 700,
                              color: C.white,
                              fontFamily: fontMono,
                            }}
                          >
                            {j < p.m ? "M" : "C"}
                          </div>
                        ))}
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11 }}>
                        <span style={{ color: C.cyan }}>Mastery: {p.m}/5</span>
                        <span style={{ color: C.coral }}>Challenge: {p.c}/5</span>
                      </div>
                      <div style={{ fontSize: 11, color: p.m === 3 && p.c === 2 ? C.green : C.gold, marginTop: 6, fontWeight: 600 }}>
                        {p.m === 3 && p.c === 2 ? "✓ Optimal 3/2 balance" : p.m >= 4 ? "⚠ Stagnation risk" : "⚠ Burnout risk"}
                      </div>
                    </div>
                  )}

                  <div style={{ marginTop: 14 }}>
                    <Btn
                      variant={cart.includes(p.id) ? "ghost" : "primary"}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggle(p.id);
                      }}
                      style={{ fontSize: 12, padding: "7px 16px" }}
                    >
                      {cart.includes(p.id) ? "Remove" : "🛒 Add to Cart"}
                    </Btn>
                  </div>
                </div>
              </div>
            </Glass>
          </FadeIn>
        ))}
      </div>

      {cart.length >= 2 && (
        <FadeIn delay={100}>
          <Glass style={{ borderColor: `${C.gold}25` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
              <span style={{ fontSize: 20 }}>🛒</span>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: C.text }}>Shopping Cart — Comparison</h3>
            </div>

            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                  <th style={{ textAlign: "left", padding: "10px 14px", color: C.textDim, fontSize: 12, fontFamily: fontMono }}>
                    Metric
                  </th>
                  {cart.map((id) => {
                    const p = paths.find((x) => x.id === id)!;
                    return (
                      <th
                        key={id}
                        style={{ textAlign: "center", padding: "10px 14px", color: p.color, fontSize: 13, fontWeight: 600 }}
                      >
                        {p.role}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Timeline", "time"],
                  ["Persona Fit", "fit"],
                  ["Gap Difficulty", "gap"],
                  ["Mastery", "m"],
                  ["Challenge", "c"],
                ].map(([label, key]) => (
                  <tr key={label} style={{ borderBottom: `1px solid ${C.borderSubtle}` }}>
                    <td style={{ padding: "10px 14px", color: C.textMuted }}>{label}</td>
                    {cart.map((id) => {
                      const p = paths.find((x) => x.id === id)!;
                      const v = key === "m" || key === "c" ? `${(p as any)[key]}/5` : (p as any)[key];
                      return (
                        <td key={id} style={{ textAlign: "center", padding: "10px 14px", color: C.text, fontWeight: 500 }}>
                          {v}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 18 }}>
              <Btn onClick={() => navigate("/app/roadmap")}>Select & Build Roadmap →</Btn>
            </div>
          </Glass>
        </FadeIn>
      )}

      {cart.length === 1 && (
        <FadeIn>
          <div style={{ textAlign: "center", marginTop: 16 }}>
            <Btn onClick={() => navigate("/app/roadmap")}>Proceed with Path →</Btn>
          </div>
        </FadeIn>
      )}
    </div>
  );
}
