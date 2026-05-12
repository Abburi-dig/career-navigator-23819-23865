import React from "react";
import { C, FadeIn, Glass, font, fontMono } from "../../prototype/designSystem";

/**
 * PUBLIC_INTERFACE
 */
export function AdminConfigPage() {
  /** Prototype Admin configuration view. */
  return (
    <div style={{ padding: "36px 44px", maxWidth: 900, fontFamily: font }}>
      <FadeIn>
        <h1 style={{ margin: "0 0 28px", fontSize: 28, fontWeight: 700, color: C.text }}>Configuration</h1>
      </FadeIn>

      <FadeIn delay={100}>
        <Glass style={{ marginBottom: 16 }}>
          <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 600, color: C.text }}>🔒 Privacy</h3>
          {[
            { l: "Privacy Firewall", d: "Job exploration stays confidential", on: true },
            { l: "Data Vault Isolation", d: "Full tenant separation", on: true },
          ].map((s) => (
            <div
              key={s.l}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px 0",
                borderBottom: `1px solid ${C.borderSubtle}`,
              }}
            >
              <div>
                <div style={{ fontSize: 14, fontWeight: 500, color: C.text }}>{s.l}</div>
                <div style={{ fontSize: 12, color: C.textMuted }}>{s.d}</div>
              </div>

              <div style={{ width: 44, height: 24, borderRadius: 12, padding: 2, background: s.on ? C.cyan : C.textDim }}>
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    background: C.white,
                    transform: s.on ? "translateX(20px)" : "translateX(0)",
                    transition: "transform 0.2s",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.3)",
                  }}
                />
              </div>
            </div>
          ))}
        </Glass>
      </FadeIn>

      <FadeIn delay={200}>
        <Glass>
          <h3 style={{ margin: "0 0 16px", fontSize: 15, fontWeight: 600, color: C.text }}>⚙️ Assessment</h3>
          {[
            { l: "Grill Depth", v: "4–6 questions" },
            { l: "Frameworks", v: "TOGAF · ITIL · SFIA" },
            { l: "Path Fork", v: "User-selected" },
          ].map((s) => (
            <div
              key={s.l}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "12px 0",
                borderBottom: `1px solid ${C.borderSubtle}`,
              }}
            >
              <span style={{ fontSize: 14, fontWeight: 500, color: C.text }}>{s.l}</span>
              <span
                style={{
                  padding: "4px 12px",
                  borderRadius: 6,
                  background: C.bgSurface,
                  border: `1px solid ${C.borderSubtle}`,
                  fontSize: 12,
                  color: C.cyan,
                  fontFamily: fontMono,
                }}
              >
                {s.v}
              </span>
            </div>
          ))}
        </Glass>
      </FadeIn>
    </div>
  );
}
