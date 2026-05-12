import React from "react";
import { C, FadeIn, Glass, Tag, font } from "../../prototype/designSystem";

/**
 * PUBLIC_INTERFACE
 */
export function MarketplacePage() {
  /** Prototype Phase 05 — Marketplace. */
  const cats = [
    {
      cat: "Learning",
      emoji: "📚",
      color: C.cyan,
      items: [
        { name: "AWS Solutions Architect Prep", by: "A Cloud Guru", match: "Gap: Cloud Architecture", tag: "Cert" },
        { name: "Executive Communication", by: "Coursera", match: "Gap: Public Speaking", tag: "Course" },
      ],
    },
    {
      cat: "Visibility",
      emoji: "📡",
      color: C.coral,
      items: [
        { name: "CTO Summit 2026", by: "TechConnect", match: "Network: C-Suite", tag: "Conference" },
        { name: "Eng. Leadership Pod", by: "InfoQ", match: "Thought Leadership", tag: "Podcast" },
      ],
    },
    {
      cat: "Jobs",
      emoji: "💼",
      color: C.violet,
      items: [
        { name: "VP Eng — HealthTech Series B", by: "MedAI Corp", match: "Fit: 85%", tag: "External" },
        { name: "Director of Engineering", by: "Current Company", match: "Fit: 72%", tag: "Internal" },
      ],
    },
  ];

  return (
    <div style={{ padding: "36px 44px", maxWidth: 1000, fontFamily: font }}>
      <FadeIn>
        <Tag color={C.green}>PHASE 05</Tag>
        <h1 style={{ margin: "10px 0 6px", fontSize: 28, fontWeight: 700, color: C.text }}>
          Growth Marketplace
        </h1>
        <p style={{ margin: "0 0 28px", color: C.textMuted, fontSize: 14 }}>
          Every recommendation mapped to your roadmap gaps.
        </p>
      </FadeIn>

      {cats.map((c, ci) => (
        <FadeIn key={c.cat} delay={100 + ci * 80}>
          <div style={{ marginBottom: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <span style={{ fontSize: 18 }}>{c.emoji}</span>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: C.text }}>{c.cat}</h3>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {c.items.map((item) => (
                <Glass key={item.name} hover glow={`${c.color}10`}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 10 }}>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{item.name}</div>
                      <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>{item.by}</div>
                    </div>
                    <Tag color={c.color}>{item.tag}</Tag>
                  </div>

                  <div
                    style={{
                      padding: "6px 10px",
                      borderRadius: 6,
                      background: C.bgSurface,
                      fontSize: 12,
                      color: C.cyan,
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    🎯 {item.match}
                  </div>
                </Glass>
              ))}
            </div>
          </div>
        </FadeIn>
      ))}

      <FadeIn delay={400}>
        <Glass
          style={{
            textAlign: "center",
            background: `linear-gradient(135deg, ${C.cyanSoft}, ${C.violetSoft})`,
            borderColor: `${C.cyan}20`,
          }}
        >
          <div style={{ fontSize: 20, marginBottom: 6 }}>✨</div>
          <div style={{ fontSize: 18, fontWeight: 600, color: C.text, marginBottom: 6 }}>Your Navigator journey is live</div>
          <div style={{ fontSize: 13, color: C.textMuted }}>Return anytime to track progress and discover new opportunities.</div>
        </Glass>
      </FadeIn>
    </div>
  );
}
