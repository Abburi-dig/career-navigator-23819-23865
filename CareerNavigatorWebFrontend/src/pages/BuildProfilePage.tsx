import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApiClient } from "../api/useApiClient";
import type { PersonaDraft } from "../api/types";
import Glass from "../components/ui/Glass";
import Tag from "../components/ui/Tag";
import Button from "../components/ui/Button";
import { SkeletonBlock, SkeletonLines } from "../components/ui/Skeleton";

export default function BuildProfilePage() {
  const api = useApiClient();
  const nav = useNavigate();

  const [draft, setDraft] = useState<PersonaDraft | null>(null);
  const [loading, setLoading] = useState(true);
  const [confirming, setConfirming] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const [connected, setConnected] = useState<Record<string, boolean>>({});

  useEffect(() => {
    let cancelled = false;

    async function loadDraft() {
      setLoading(true);
      setErr(null);
      try {
        const res = await api.request<PersonaDraft>("/persona/draft", "GET");
        if (!cancelled) setDraft(res);
      } catch (e: any) {
        if (!cancelled) setErr(e?.message ?? "Failed to load persona draft");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadDraft();
    return () => {
      cancelled = true;
    };
  }, [api]);

  const anyConnected = Object.values(connected).some(Boolean);

  const confirm = async () => {
    setConfirming(true);
    try {
      await api.request("/persona/confirm", "POST", { confirmed: true });
      nav("/phases/assessment");
    } catch (e: any) {
      setErr(e?.message ?? "Failed to confirm persona");
    } finally {
      setConfirming(false);
    }
  };

  return (
    <div className="page container" style={{ maxWidth: 980 }}>
      <Tag color="var(--cyan)">PHASE 01</Tag>
      <h1 style={{ margin: "10px 0 6px", fontSize: 28, fontWeight: 850 }}>Build Your Whole Person Profile</h1>
      <p className="muted" style={{ margin: "0 0 22px", lineHeight: 1.6 }}>
        Upload data from multiple dimensions to build a validated, holistic profile.
      </p>

      <div className="grid-3" style={{ marginBottom: 18 }}>
        {[
          { key: "resume", label: "Resume / CV", sub: "PDF, DOCX", emoji: "📄", color: "var(--cyan)" },
          { key: "linkedin", label: "LinkedIn Profile", sub: "Professional data", emoji: "🔗", color: "#0A66C2" },
          { key: "reviews", label: "360° Reviews", sub: "Performance feedback", emoji: "⭐", color: "var(--gold)" },
        ].map((s) => {
          const isConnected = !!connected[s.key];
          return (
            <Glass key={s.key} hover style={{ textAlign: "center" }}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 14,
                  margin: "0 auto 12px",
                  background: `color-mix(in srgb, ${s.color} 12%, transparent)`,
                  border: `1px solid color-mix(in srgb, ${s.color} 30%, transparent)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                }}
                aria-hidden="true"
              >
                {isConnected ? "✓" : s.emoji}
              </div>

              <div style={{ fontSize: 14, fontWeight: 750 }}>{s.label}</div>
              <div className="muted small" style={{ marginTop: 4, marginBottom: 12 }}>
                {s.sub}
              </div>

              <Button
                variant={isConnected ? "ghost" : "primary"}
                style={{ width: "100%", padding: "8px 16px", fontSize: 12 }}
                onClick={() => setConnected((p) => ({ ...p, [s.key]: true }))}
              >
                {isConnected ? "✓ Connected" : "Connect"}
              </Button>
            </Glass>
          );
        })}
      </div>

      <div className="grid-2" style={{ marginBottom: 18 }}>
        <Glass>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <div aria-hidden="true">💎</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 750 }}>Hidden Value</div>
              <div className="muted small">Side gigs, board roles, volunteering</div>
            </div>
          </div>
          <textarea
            placeholder="Side projects, board memberships, sabbaticals..."
            style={{
              width: "100%",
              height: 80,
              padding: 12,
              borderRadius: 10,
              border: "1px solid var(--border)",
              background: "var(--bg-surface)",
              color: "var(--text)",
              resize: "none",
              outline: "none",
            }}
          />
        </Glass>

        <Glass>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <div aria-hidden="true">🧠</div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 750 }}>Psychometric Profile</div>
              <div className="muted small">Personality & behavioral traits</div>
            </div>
          </div>
          <Button variant="ghost" style={{ width: "100%", marginBottom: 6 }}>
            Begin Assessment →
          </Button>
          <div className="dim small" style={{ textAlign: "center" }}>
            ~15 min • DISC, values, work style
          </div>
        </Glass>
      </div>

      {loading && (
        <Glass style={{ borderColor: "var(--border-hover)" }}>
          <SkeletonBlock height={14} />
          <div style={{ height: 10 }} />
          <SkeletonLines lines={3} />
        </Glass>
      )}

      {!loading && err && (
        <Glass style={{ borderColor: "rgba(248,113,113,0.35)", background: "rgba(248,113,113,0.06)" }}>
          <Tag color="var(--red)">ERROR</Tag>
          <div style={{ marginTop: 10, fontSize: 13 }}>{err}</div>
        </Glass>
      )}

      {!loading && draft && (
        <>
          {anyConnected && (
            <Glass
              style={{
                marginTop: 14,
                background: "linear-gradient(135deg, rgba(58,175,185,0.12), rgba(16,28,50,0.55))",
                borderColor: "var(--border-hover)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div aria-hidden="true" style={{ fontSize: 22 }}>
                    ✨
                  </div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 750 }}>Your Draft Persona is ready</div>
                    <div className="muted" style={{ fontSize: 13 }}>
                      Review and validate before proceeding
                    </div>
                  </div>
                </div>
                <Button onClick={() => {}} disabled>
                  Review Persona
                </Button>
              </div>
            </Glass>
          )}

          <Glass style={{ marginTop: 14, borderColor: "rgba(58,175,185,0.25)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 750 }}>Draft Persona</h3>
              <Tag color="var(--gold)">Pending Validation</Tag>
            </div>

            <div className="grid-3" style={{ marginBottom: 14 }}>
              {[
                { l: "Role Archetype", v: draft.roleArchetype, e: "⚙️" },
                { l: "Experience Level", v: draft.experienceLevel, e: "📈" },
                { l: "Promotion Readiness", v: `${draft.promotionReadinessPercent}%`, e: "🎯" },
              ].map((d) => (
                <div
                  key={d.l}
                  style={{
                    padding: "14px 16px",
                    borderRadius: 10,
                    background: "var(--bg-surface)",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div className="dim small" style={{ marginBottom: 4 }}>
                    <span aria-hidden="true">{d.e}</span> {d.l}
                  </div>
                  <div style={{ fontSize: 18, fontWeight: 850 }}>{d.v}</div>
                </div>
              ))}
            </div>

            {draft.flags?.[0] && (
              <div
                style={{
                  padding: "12px 14px",
                  borderRadius: 10,
                  background: "rgba(232,115,74,0.12)",
                  border: "1px solid rgba(232,115,74,0.25)",
                  display: "flex",
                  gap: 10,
                  alignItems: "center",
                  marginBottom: 14,
                }}
              >
                <span aria-hidden="true">⚠️</span>
                <span style={{ fontSize: 13, color: "var(--coral)", fontWeight: 650 }}>{draft.flags[0]}</span>
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
              <Button variant="ghost" disabled>
                Edit
              </Button>
              <Button onClick={confirm} disabled={confirming}>
                {confirming ? "Confirming..." : "Confirm & Continue →"}
              </Button>
            </div>
          </Glass>
        </>
      )}
    </div>
  );
}
