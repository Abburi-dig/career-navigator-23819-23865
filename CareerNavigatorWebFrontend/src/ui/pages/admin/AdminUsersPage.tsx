import React from "react";
import { Btn, C, FadeIn, Glass, Tag, font, fontMono } from "../../prototype/designSystem";

/**
 * PUBLIC_INTERFACE
 */
export function AdminUsersPage() {
  /** Prototype Admin Users & Roles view. */
  return (
    <div style={{ padding: "36px 44px", maxWidth: 1100, fontFamily: font }}>
      <FadeIn>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <div>
            <h1 style={{ margin: "0 0 4px", fontSize: 28, fontWeight: 700, color: C.text }}>Users & Roles</h1>
            <p style={{ margin: 0, color: C.textMuted, fontSize: 14 }}>Tech leaders, mentors, curators</p>
          </div>
          <Btn>+ Add User</Btn>
        </div>
      </FadeIn>

      <FadeIn delay={80}>
        <div style={{ display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap" }}>
          {["All", "Tech Leaders", "Mentors", "Curators"].map((f, i) => (
            <Btn key={f} variant={i === 0 ? "primary" : "ghost"} style={{ padding: "6px 14px", fontSize: 12 }}>
              {f}
            </Btn>
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={150}>
        <Glass>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: `1px solid ${C.border}` }}>
                {["Name", "Role", "Stage", "Path", "Joined"].map((h) => (
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
                { n: "Sarah Chen", r: "Tech Leader", s: "Multiverse", p: "Explorer", j: "Jan 26" },
                { n: "James R.", r: "Tech Leader", s: "Assessment", p: "—", j: "Feb 26" },
                { n: "Dr. M. Lopez", r: "Mentor", s: "—", p: "—", j: "Dec 25" },
                { n: "Alex Kim", r: "Curator", s: "—", p: "—", j: "Nov 25" },
              ].map((u) => (
                <tr key={u.n} style={{ borderBottom: `1px solid ${C.borderSubtle}` }}>
                  <td style={{ padding: "10px 12px", fontWeight: 500, color: C.text }}>{u.n}</td>
                  <td style={{ padding: "10px 12px" }}>
                    <Tag color={u.r === "Tech Leader" ? C.cyan : u.r === "Mentor" ? C.coral : C.gold}>{u.r}</Tag>
                  </td>
                  <td style={{ padding: "10px 12px", color: C.text }}>{u.s}</td>
                  <td style={{ padding: "10px 12px" }}>
                    <Tag color={u.p === "Explorer" ? C.violet : u.p === "Linear" ? C.cyan : C.textDim}>{u.p}</Tag>
                  </td>
                  <td style={{ padding: "10px 12px", color: C.textDim }}>{u.j}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Glass>
      </FadeIn>
    </div>
  );
}
