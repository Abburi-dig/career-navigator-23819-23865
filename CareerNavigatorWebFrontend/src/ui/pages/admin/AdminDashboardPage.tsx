import React from "react";
import { C, FadeIn, Glass, GlowIcon, Tag, font, fontMono } from "../../prototype/designSystem";

/**
 * PUBLIC_INTERFACE
 */
export function AdminDashboardPage() {
  /** Prototype Admin Dashboard view. */
  return (
    <div style={{ padding: "36px 44px", maxWidth: 1100, fontFamily: font }}>
      <FadeIn>
        <h1 style={{ margin: "0 0 6px", fontSize: 28, fontWeight: 700, color: C.text }}>Admin Dashboard</h1>
        <p style={{ margin: "0 0 28px", color: C.textMuted, fontSize: 14 }}>Platform health</p>
      </FadeIn>

      <FadeIn delay={100}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 14, marginBottom: 24 }}>
          {[
            { l: "Users", v: "1,247", d: "+12%", e: "👥", c: C.cyan },
            { l: "Journeys", v: "834", d: "+8%", e: "🧭", c: C.violet },
            { l: "Assessments", v: "2,891", d: "+23%", e: "🔥", c: C.coral },
            { l: "Connects", v: "456", d: "+15%", e: "🚀", c: C.gold },
          ].map((s) => (
            <Glass key={s.l}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <GlowIcon emoji={s.e} color={s.c} size={36} />
                <span style={{ fontSize: 11, fontWeight: 600, color: C.green }}>{s.d}</span>
              </div>
              <div style={{ fontSize: 26, fontWeight: 700, color: C.text }}>{s.v}</div>
              <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>{s.l}</div>
            </Glass>
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={200}>
        <Glass>
          <h3 style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 600, color: C.text }}>Recent Activity</h3>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                {["User", "Role", "Step", "Path", "Status"].map((h) => (
                  <th
                    key={h}
                    style={{ textAlign: "left", padding: "8px 12px", color: C.textDim, fontWeight: 600, fontSize: 11, fontFamily: fontMono }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { n: "Sarah Chen", r: "Eng Director", s: "Multiverse", p: "Explorer", st: "Active" },
                { n: "James R.", r: "Sr Architect", s: "The Grill", p: "—", st: "In Progress" },
                { n: "Priya S.", r: "Tech Lead", s: "Roadmap", p: "Linear", st: "Active" },
                { n: "Marcus J.", r: "VP Platform", s: "Marketplace", p: "Linear", st: "Completed" },
              ].map((u) => (
                <tr key={u.n} style={{ borderBottom: `1px solid ${C.borderSubtle}` }}>
                  <td style={{ padding: "10px 12px", fontWeight: 500, color: C.text }}>{u.n}</td>
                  <td style={{ padding: "10px 12px", color: C.textMuted }}>{u.r}</td>
                  <td style={{ padding: "10px 12px", color: C.text }}>{u.s}</td>
                  <td style={{ padding: "10px 12px" }}>
                    <Tag color={u.p === "Explorer" ? C.violet : u.p === "Linear" ? C.cyan : C.textDim}>{u.p}</Tag>
                  </td>
                  <td style={{ padding: "10px 12px" }}>
                    <Tag color={u.st === "Completed" ? C.green : u.st === "Active" ? C.cyan : C.gold}>{u.st}</Tag>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Glass>
      </FadeIn>
    </div>
  );
}
