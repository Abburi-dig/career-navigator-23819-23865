import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApiClient } from "../api/useApiClient";
import type { RoadmapItem } from "../api/types";
import Glass from "../components/ui/Glass";
import Tag from "../components/ui/Tag";
import Button from "../components/ui/Button";
import ProgressRing from "../components/ui/ProgressRing";
import { SkeletonLines } from "../components/ui/Skeleton";

function group(items: RoadmapItem[]) {
  const g: Record<string, RoadmapItem[]> = { now: [], near: [], next: [] };
  for (const i of items) g[i.timeframe].push(i);
  return g as { now: RoadmapItem[]; near: RoadmapItem[]; next: RoadmapItem[] };
}

export default function RoadmapPage() {
  const api = useApiClient();
  const nav = useNavigate();

  const [items, setItems] = useState<RoadmapItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setErr(null);
      try {
        const res = await api.request<RoadmapItem[]>("/roadmap", "GET");
        if (!cancelled) setItems(res);
      } catch (e: any) {
        if (!cancelled) setErr(e?.message ?? "Failed to load roadmap");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [api]);

  const progress = useMemo(() => {
    const list = items ?? [];
    const total = list.length;
    const done = list.filter((i) => i.done).length;
    const percent = total === 0 ? 0 : Math.round((done / total) * 100);
    return { total, done, percent };
  }, [items]);

  const toggle = async (id: string) => {
    setBusyId(id);
    setErr(null);
    try {
      await api.request("/roadmap/toggle", "POST", { id });
      const updated = await api.request<RoadmapItem[]>("/roadmap", "GET");
      setItems(updated);
    } catch (e: any) {
      setErr(e?.message ?? "Failed to update item");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="page container" style={{ maxWidth: 1100 }}>
      <Tag color="var(--gold)">PHASE 04</Tag>
      <h1 style={{ margin: "10px 0 6px", fontSize: 28, fontWeight: 850 }}>Your Personalized Roadmap</h1>
      <p className="muted" style={{ margin: "0 0 16px", lineHeight: 1.6 }}>
        Track milestones over time. Mark items complete as you make progress.
      </p>

      <Glass style={{ marginBottom: 16, padding: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <ProgressRing percent={progress.percent} size={44} stroke={3} />
            <div>
              <div style={{ fontSize: 14, fontWeight: 750 }}>
                {progress.done} / {progress.total} milestones
              </div>
              <div className="muted small">Progress updates the dashboard phase state</div>
            </div>
          </div>
          <Tag color={progress.percent === 100 ? "var(--green)" : progress.percent === 0 ? "var(--text-dim)" : "var(--gold)"}>
            {progress.percent === 100 ? "Complete!" : progress.percent === 0 ? "Not Started" : "In Progress"}
          </Tag>
        </div>
      </Glass>

      {loading && (
        <Glass>
          <SkeletonLines lines={6} />
        </Glass>
      )}

      {!loading && err && (
        <Glass style={{ borderColor: "rgba(248,113,113,0.35)", background: "rgba(248,113,113,0.06)" }}>
          <Tag color="var(--red)">ERROR</Tag>
          <div style={{ marginTop: 10, fontSize: 13 }}>{err}</div>
        </Glass>
      )}

      {!loading && items && (
        <>
          <div className="grid-3" style={{ alignItems: "start" }}>
            {(["now", "near", "next"] as const).map((tf) => {
              const label = tf === "now" ? "Now (0–6 months)" : tf === "near" ? "Near (1–2 years)" : "Next (2–5 years)";
              const color = tf === "now" ? "var(--cyan)" : tf === "near" ? "var(--violet)" : "var(--coral)";
              const groups = group(items);

              return (
                <div key={tf}>
                  <div style={{ textAlign: "center", marginBottom: 12 }}>
                    <div style={{ fontSize: 18, fontWeight: 900, color }}>{tf.toUpperCase()}</div>
                    <div className="mono dim small" style={{ letterSpacing: 1 }}>
                      {label}
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {groups[tf].map((it) => (
                      <Glass
                        key={it.id}
                        hover
                        onClick={() => toggle(it.id)}
                        style={{
                          padding: 12,
                          borderColor: it.done ? "rgba(52,211,153,0.30)" : "var(--border)",
                          background: it.done ? "rgba(52,211,153,0.06)" : undefined,
                          cursor: busyId ? "not-allowed" : "pointer",
                          opacity: busyId && busyId !== it.id ? 0.65 : 1,
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "start", gap: 10 }}>
                          <div
                            aria-hidden="true"
                            style={{
                              width: 20,
                              height: 20,
                              borderRadius: 6,
                              flexShrink: 0,
                              marginTop: 1,
                              border: `2px solid ${it.done ? "var(--green)" : `color-mix(in srgb, ${color} 55%, transparent)`}`,
                              background: it.done ? "rgba(52,211,153,0.20)" : "transparent",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              transition: "all 200ms ease",
                            }}
                          >
                            {it.done ? <span style={{ fontSize: 11, color: "var(--green)" }}>✓</span> : null}
                          </div>

                          <div style={{ flex: 1 }}>
                            <div
                              style={{
                                fontSize: 13,
                                fontWeight: 650,
                                color: it.done ? "var(--green)" : "var(--text)",
                                textDecoration: it.done ? "line-through" : "none",
                                opacity: it.done ? 0.75 : 1,
                              }}
                            >
                              {it.title}
                            </div>
                            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 6 }}>
                              <span
                                className="small"
                                style={{
                                  padding: "2px 7px",
                                  borderRadius: 6,
                                  fontWeight: 800,
                                  background: `color-mix(in srgb, ${color} 14%, transparent)`,
                                  border: `1px solid color-mix(in srgb, ${color} 22%, transparent)`,
                                  color,
                                }}
                              >
                                {it.type}
                              </span>
                            </div>
                          </div>

                          {busyId === it.id ? <span className="dim small mono">…</span> : null}
                        </div>
                      </Glass>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 18 }}>
            <Button variant="ghost" onClick={() => nav("/dashboard")}>
              Back to Dashboard
            </Button>
            <Button onClick={() => nav("/phases/marketplace")}>Explore Marketplace →</Button>
          </div>
        </>
      )}
    </div>
  );
}
