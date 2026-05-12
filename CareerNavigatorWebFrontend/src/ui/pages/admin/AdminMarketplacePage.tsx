import React from "react";
import { Btn, C, FadeIn, Glass, font } from "../../prototype/designSystem";

/**
 * PUBLIC_INTERFACE
 */
export function AdminMarketplacePage() {
  /** Prototype Admin Marketplace curation view. */
  return (
    <div style={{ padding: "36px 44px", maxWidth: 1100, fontFamily: font }}>
      <FadeIn>
        <h1 style={{ margin: "0 0 24px", fontSize: 28, fontWeight: 700, color: C.text }}>Marketplace Curation</h1>
      </FadeIn>

      <FadeIn delay={100}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 24 }}>
          {[
            { l: "Learning", v: 34, p: 5, c: C.cyan },
            { l: "Visibility", v: 18, p: 2, c: C.coral },
            { l: "Jobs", v: 12, p: 8, c: C.violet },
          ].map((x) => (
            <Glass key={x.l}>
              <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 8 }}>{x.l}</div>
              <div style={{ fontSize: 28, fontWeight: 700, color: C.text }}>{x.v}</div>
              <div style={{ fontSize: 12, color: C.gold, marginTop: 4 }}>{x.p} pending</div>
            </Glass>
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={200}>
        <Glass>
          <h3 style={{ margin: "0 0 14px", fontSize: 15, fontWeight: 600, color: C.text }}>Pending Approvals</h3>
          {[
            { n: "TechMentor Pro", t: "Coaching" },
            { n: "CloudSkills Academy", t: "Certs" },
            { n: "StartupBoard.io", t: "Board Seats" },
          ].map((p) => (
            <div
              key={p.n}
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", borderBottom: `1px solid ${C.borderSubtle}` }}
            >
              <div>
                <div style={{ fontSize: 14, fontWeight: 500, color: C.text }}>{p.n}</div>
                <div style={{ fontSize: 12, color: C.textMuted }}>{p.t}</div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <Btn style={{ padding: "6px 14px", fontSize: 12 }}>Approve</Btn>
                <Btn variant="ghost" style={{ padding: "6px 14px", fontSize: 12 }}>
                  Reject
                </Btn>
              </div>
            </div>
          ))}
        </Glass>
      </FadeIn>
    </div>
  );
}
