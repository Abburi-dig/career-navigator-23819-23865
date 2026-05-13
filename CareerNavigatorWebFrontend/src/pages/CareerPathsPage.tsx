import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApiClient } from "../api/useApiClient";
import type { CareerPathRecommendation } from "../api/types";
import Glass from "../components/ui/Glass";
import Tag from "../components/ui/Tag";
import Button from "../components/ui/Button";
import { SkeletonLines } from "../components/ui/Skeleton";

export default function CareerPathsPage() {
  const api = useApiClient();
  const nav = useNavigate();

  const [paths, setPaths] = useState<CareerPathRecommendation[] | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setErr(null);
      try {
        const res = await api.request<CareerPathRecommendation[]>("/paths/recommendations", "GET");
        if (!cancelled) setPaths(res);
      } catch (e: any) {
        if (!cancelled) setErr(e?.message ?? "Failed to load recommendations");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [api]);

  const select = async () => {
    if (!selectedId) return;
    setSubmitting(true);
    setErr(null);
    try {
      await api.request("/paths/select", "POST", { id: selectedId });
      nav("/phases/roadmap");
    } catch (e: any) {
      setErr(e?.message ?? "Failed to select path");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page container" style={{ maxWidth: 1040 }}>
      <Tag color="var(--violet)">PHASE 03</Tag>
      <h1 style={{ margin: "10px 0 6px", fontSize: 28, fontWeight: 850 }}>Career Path Discovery</h1>
      <p className="muted" style={{ margin: "0 0 18px", lineHeight: 1.6 }}>
        Review multiple recommended paths, compare effort and timeline, then select one to generate your roadmap.
      </p>

      {loading && (
        <Glass>
          <SkeletonLines lines={5} />
        </Glass>
      )}

      {!loading && err && (
        <Glass style={{ borderColor: "rgba(248,113,113,0.35)", background: "rgba(248,113,113,0.06)" }}>
          <Tag color="var(--red)">ERROR</Tag>
          <div style={{ marginTop: 10, fontSize: 13 }}>{err}</div>
        </Glass>
      )}

      {!loading && paths && (
        <>
          <div className="grid-2" style={{ marginBottom: 16 }}>
            {paths.map((p) => {
              const active = selectedId === p.id;
              const color = p.type === "linear" ? "var(--cyan)" : "var(--violet)";
              return (
                <Glass
                  key={p.id}
                  hover
                  onClick={() => setSelectedId(p.id)}
                  style={{
                    borderColor: active ? `color-mix(in srgb, ${color} 50%, transparent)` : "var(--border)",
                    background: active ? `color-mix(in srgb, ${color} 10%, var(--glass))` : undefined,
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", gap: 12 }}>
                    <div>
                      <Tag color={color}>{p.type === "linear" ? "DIRECT TRAJECTORY" : "MULTIVERSE"}</Tag>
                      <div style={{ marginTop: 10, fontSize: 16, fontWeight: 800 }}>{p.title}</div>
                      <div className="muted" style={{ marginTop: 6, fontSize: 13, lineHeight: 1.55 }}>
                        {p.summary}
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div className="mono dim small" style={{ letterSpacing: 1, textTransform: "uppercase" }}>
                        Fit
                      </div>
                      <div style={{ fontSize: 22, fontWeight: 900, color }}>{p.fitPercent}%</div>
                    </div>
                  </div>

                  <div style={{ marginTop: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    {active ? <Tag color={color}>Selected</Tag> : <span className="dim small">Click to select</span>}
                    <span className="dim small">Next: Roadmap →</span>
                  </div>
                </Glass>
              );
            })}
          </div>

          {err && (
            <div className="small" style={{ color: "var(--red)", marginBottom: 10 }}>
              {err}
            </div>
          )}

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
            <Button variant="ghost" onClick={() => nav("/dashboard")}>
              Back to Dashboard
            </Button>
            <Button disabled={!selectedId || submitting} onClick={select}>
              {submitting ? "Selecting..." : "Select & Build Roadmap →"}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
