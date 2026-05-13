import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApiClient } from "../api/useApiClient";
import type { MarketplaceItem } from "../api/types";
import Glass from "../components/ui/Glass";
import Tag from "../components/ui/Tag";
import Button from "../components/ui/Button";
import { SkeletonLines } from "../components/ui/Skeleton";

function groupByCategory(items: MarketplaceItem[]) {
  const map = new Map<string, MarketplaceItem[]>();
  for (const i of items) {
    map.set(i.category, [...(map.get(i.category) ?? []), i]);
  }
  return Array.from(map.entries()).map(([category, list]) => ({ category, list }));
}

export default function MarketplacePage() {
  const api = useApiClient();
  const nav = useNavigate();

  const [items, setItems] = useState<MarketplaceItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setErr(null);
      try {
        const res = await api.request<MarketplaceItem[]>("/marketplace", "GET");
        if (!cancelled) setItems(res);
      } catch (e: any) {
        if (!cancelled) setErr(e?.message ?? "Failed to load marketplace");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [api]);

  const grouped = useMemo(() => groupByCategory(items ?? []), [items]);

  return (
    <div className="page container" style={{ maxWidth: 1100 }}>
      <Tag color="var(--green)">PHASE 05</Tag>
      <h1 style={{ margin: "10px 0 6px", fontSize: 28, fontWeight: 850 }}>Growth Marketplace</h1>
      <p className="muted" style={{ margin: "0 0 18px" }}>
        Browse curated items mapped to your gaps and roadmap.
      </p>

      {loading && (
        <Glass>
          <SkeletonLines lines={6} />
        </Glass>
      )}

      {!loading && err && (
        <Glass style={{ borderColor: "rgba(248,113,113,0.35)", background: "rgba(248,113,113,0.06)" }}>
          <Tag color="var(--red)">ERROR</Tag>
          <div style={{ marginTop: 10, fontSize: 13 }}>{err}</div>
          <div style={{ marginTop: 14 }}>
            <Button onClick={() => window.location.reload()}>Retry</Button>
          </div>
        </Glass>
      )}

      {!loading && items && (
        <>
          {grouped.map((g) => (
            <div key={g.category} style={{ marginBottom: 22 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800 }}>{g.category}</h3>
                <Tag color="var(--text-muted)">{g.list.length} items</Tag>
              </div>

              <div className="grid-2">
                {g.list.map((it) => (
                  <Glass key={it.id} hover>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", gap: 12, marginBottom: 10 }}>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 750 }}>{it.title}</div>
                        <div className="muted small" style={{ marginTop: 2 }}>
                          {it.provider}
                        </div>
                      </div>
                      <Tag color="var(--cyan)">{it.tag}</Tag>
                    </div>

                    <div
                      className="small"
                      style={{
                        padding: "6px 10px",
                        borderRadius: 8,
                        background: "var(--bg-surface)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        color: "var(--cyan)",
                        display: "inline-flex",
                        gap: 6,
                        alignItems: "center",
                      }}
                    >
                      🎯 {it.mappedTo}
                    </div>
                  </Glass>
                ))}
              </div>
            </div>
          ))}

          <Glass style={{ textAlign: "center", background: "linear-gradient(135deg, rgba(58,175,185,0.12), rgba(124,92,252,0.12))" }}>
            <div aria-hidden="true" style={{ fontSize: 20, marginBottom: 6 }}>
              ✨
            </div>
            <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 6 }}>Your Navigator journey is live</div>
            <div className="muted" style={{ fontSize: 13 }}>
              Return anytime to track progress and discover new opportunities.
            </div>
          </Glass>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 18 }}>
            <Button variant="ghost" onClick={() => nav("/dashboard")}>
              Back to Dashboard
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
