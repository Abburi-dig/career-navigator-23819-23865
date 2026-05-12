import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Btn, C, FadeIn, Glass, GlowIcon, Tag, font } from "../../prototype/designSystem";

/**
 * PUBLIC_INTERFACE
 */
export function BuildProfilePage() {
  /** Prototype Phase 01 — Build Profile. */
  const navigate = useNavigate();
  const [connected, setConnected] = useState<Record<string, boolean>>({});
  const [showPersona, setShowPersona] = useState(false);

  const anyConn = useMemo(() => Object.values(connected).some(Boolean), [connected]);

  return (
    <div style={{ padding: "36px 44px", maxWidth: 920, fontFamily: font }}>
      <FadeIn>
        <Tag color={C.cyan}>PHASE 01</Tag>
        <h1 style={{ margin: "10px 0 6px", fontSize: 28, fontWeight: 700, color: C.text }}>
          Build Your Whole Person Profile
        </h1>
        <p style={{ margin: "0 0 28px", color: C.textMuted, fontSize: 14, lineHeight: 1.6 }}>
          We go deeper than keywords. Upload data from multiple dimensions to build a validated, holistic profile.
        </p>
      </FadeIn>

      <FadeIn delay={100}>
        <div
          style={{
            fontSize: 11,
            color: C.textDim,
            fontFamily: "'JetBrains Mono', monospace",
            letterSpacing: 1.5,
            marginBottom: 10,
            textTransform: "uppercase",
          }}
        >
          Formal Data Sources
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginBottom: 24 }}>
          {[
            { key: "resume", label: "Resume / CV", sub: "PDF, DOCX", emoji: "📄", color: C.cyan },
            { key: "linkedin", label: "LinkedIn Profile", sub: "Professional data", emoji: "🔗", color: "#0A66C2" },
            { key: "reviews", label: "360° Reviews", sub: "Performance feedback", emoji: "⭐", color: C.gold },
          ].map((s) => (
            <Glass key={s.key} hover glow={connected[s.key] ? `${C.green}15` : `${s.color}10`}>
              <div style={{ textAlign: "center" }}>
                <GlowIcon emoji={connected[s.key] ? "✓" : s.emoji} color={connected[s.key] ? C.green : s.color} size={48} />
                <div style={{ fontSize: 14, fontWeight: 600, color: C.text, margin: "12px 0 4px" }}>{s.label}</div>
                <div style={{ fontSize: 12, color: C.textMuted, marginBottom: 14 }}>{s.sub}</div>
                <Btn
                  variant={connected[s.key] ? "ghost" : "primary"}
                  onClick={() => setConnected((p) => ({ ...p, [s.key]: true }))}
                  style={{ width: "100%", fontSize: 12, padding: "8px 16px" }}
                >
                  {connected[s.key] ? "✓ Connected" : "Connect"}
                </Btn>
              </div>
            </Glass>
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={200}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 24 }}>
          <Glass>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <GlowIcon emoji="💎" color={C.gold} size={36} />
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>Hidden Value</div>
                <div style={{ fontSize: 12, color: C.textMuted }}>Side gigs, board roles, volunteering</div>
              </div>
            </div>
            <textarea
              placeholder="Side projects, board memberships, sabbaticals..."
              style={{
                width: "100%",
                height: 72,
                padding: 12,
                borderRadius: 10,
                border: `1px solid ${C.border}`,
                background: C.bgSurface,
                color: C.text,
                fontFamily: font,
                fontSize: 13,
                resize: "none",
                outline: "none",
                boxSizing: "border-box",
              }}
            />
          </Glass>

          <Glass>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <GlowIcon emoji="🧠" color={C.violet} size={36} />
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>Psychometric Profile</div>
                <div style={{ fontSize: 12, color: C.textMuted }}>Personality & behavioral traits</div>
              </div>
            </div>
            <Btn variant="ghost" style={{ width: "100%", marginBottom: 6 }}>
              Begin Assessment →
            </Btn>
            <div style={{ fontSize: 11, color: C.textDim, textAlign: "center" }}>~15 min • DISC, values, work style</div>
          </Glass>
        </div>
      </FadeIn>

      {anyConn && !showPersona && (
        <FadeIn delay={100}>
          <Glass style={{ background: `linear-gradient(135deg, ${C.cyanSoft}, ${C.bgGlass})`, borderColor: C.borderHover }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ fontSize: 28 }}>✨</div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: C.text }}>Your Draft Persona is ready</div>
                  <div style={{ fontSize: 13, color: C.textMuted }}>Review and validate before proceeding</div>
                </div>
              </div>
              <Btn onClick={() => setShowPersona(true)}>Review Persona</Btn>
            </div>
          </Glass>
        </FadeIn>
      )}

      {showPersona && (
        <FadeIn delay={50}>
          <Glass style={{ borderColor: `${C.cyan}25` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600, color: C.text }}>Draft Persona</h3>
              <Tag color={C.gold}>Pending Validation</Tag>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 16 }}>
              {[
                { l: "Role Archetype", v: "Engineering Leader", e: "⚙️" },
                { l: "Experience Level", v: "Senior (8+ yrs)", e: "📈" },
                { l: "Promotion Readiness", v: "72%", e: "🎯" },
              ].map((d) => (
                <div
                  key={d.l}
                  style={{
                    padding: "14px 16px",
                    borderRadius: 10,
                    background: C.bgSurface,
                    border: `1px solid ${C.borderSubtle}`,
                  }}
                >
                  <div style={{ fontSize: 11, color: C.textDim, marginBottom: 4 }}>
                    <span style={{ fontSize: 12 }}>{d.e}</span> {d.l}
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: C.text }}>{d.v}</div>
                </div>
              ))}
            </div>

            <div
              style={{
                padding: "12px 16px",
                borderRadius: 10,
                background: C.coralSoft,
                border: `1px solid ${C.coral}25`,
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 18,
              }}
            >
              <span style={{ fontSize: 16 }}>⚠️</span>
              <span style={{ fontSize: 13, color: C.coral, fontWeight: 500 }}>
                Communication flagged as potential promotion blocker — The Grill will explore this
              </span>
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
              <Btn variant="ghost">Edit</Btn>
              <Btn
                onClick={() => {
                  // Unlock next phase in the prototype flow.
                  navigate("/app/grill");
                }}
              >
                Confirm & Continue →
              </Btn>
            </div>
          </Glass>
        </FadeIn>
      )}
    </div>
  );
}
