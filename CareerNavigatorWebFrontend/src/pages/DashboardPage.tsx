import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApiClient } from "../api/useApiClient";
import type { DashboardResponse, PhaseCard } from "../api/types";
import Glass from "../components/ui/Glass";
import Tag from "../components/ui/Tag";
import ProgressRing from "../components/ui/ProgressRing";
import Button from "../components/ui/Button";
import { SkeletonBlock, SkeletonLines } from "../components/ui/Skeleton";
import { useAuth } from "../state/auth/useAuth";

function phaseToRoute(phaseId: PhaseCard["id"]): string {
  switch (phaseId) {
    case "profile":
      return "/phases/profile";
    case "assessment":
      return "/phases/assessment";
    case "paths":
      return "/phases/paths";
    case "roadmap":
      return "/phases/roadmap";
    case "marketplace":
      return "/phases/marketplace";
  }
}

function statusLabel(status: PhaseCard["status"]) {
  switch (status) {
    case "not_started":
      return "Not Started";
    case "in_progress":
      return "In Progress";
    case "completed":
      return "Completed";
    case "locked":
      return "Locked";
  }
}

function statusColor(status: PhaseCard["status"]) {
  switch (status) {
    case "completed":
      return "var(--green)";
    case "in_progress":
      return "var(--gold)";
    case "not_started":
      return "var(--text-muted)";
    case "locked":
      return "var(--text-dim)";
  }
}

export default function DashboardPage() {
  const api = useApiClient();
  const auth = useAuth();
  const nav = useNavigate();

  const [data, setData] = useState<DashboardResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const greetingName = useMemo(() => data?.user.name ?? auth.user?.name ?? "Navigator", [data, auth.user?.name]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setErr(null);
      try {
        const res = await api.request<DashboardResponse>("/dashboard", "GET");
        if (!cancelled) setData(res);
      } catch (e: any) {
        if (!cancelled) setErr(e?.message ?? "Failed to load dashboard");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [api]);

  if (loading) {
    return (
      <div className="page container">
        <Glass style={{ marginBottom: 22 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
            <div style={{ flex: 1 }}>
              <SkeletonBlock height={14} />
              <div style={{ height: 10 }} />
              <SkeletonLines lines={2} />
            </div>
            <SkeletonBlock height={52} radius={26} />
          </div>
        </Glass>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {Array.from({ length: 5 }).map((_, idx) => (
            <Glass key={idx} style={{ padding: 18 }}>
              <SkeletonBlock height={12} />
              <div style={{ height: 10 }} />
              <SkeletonBlock height={10} />
            </Glass>
          ))}
        </div>
      </div>
    );
  }

  if (err) {
    return (
      <div className="page container">
        <Glass>
          <Tag color="var(--red)">ERROR</Tag>
          <h1 style={{ margin: "10px 0 6px" }}>Dashboard unavailable</h1>
          <p className="muted" style={{ margin: 0 }}>
            {err}
          </p>
          <div style={{ marginTop: 14 }}>
            <Button onClick={() => window.location.reload()}>Retry</Button>
          </div>
        </Glass>
      </div>
    );
  }

  const percent = data?.progress.percent ?? 0;

  return (
    <div className="page container">
      <Glass
        style={{
          marginBottom: 22,
          position: "relative",
          overflow: "hidden",
          background: "linear-gradient(135deg, rgba(58,175,185,0.08), rgba(14,22,38,0.8))",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -60,
            right: -40,
            width: 250,
            height: 250,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(58,175,185,0.4) 0%, transparent 70%)",
            opacity: 0.25,
          }}
          aria-hidden="true"
        />
        <div style={{ position: "relative", zIndex: 1 }}>
          <Tag color="var(--cyan)">MISSION CONTROL</Tag>
          <h1 style={{ margin: "12px 0 8px", fontSize: 28, fontWeight: 850, letterSpacing: -0.5 }}>
            Welcome, {greetingName}
          </h1>
          <p className="muted" style={{ margin: 0, fontSize: 14, lineHeight: 1.6, maxWidth: 640 }}>
            Your career isn’t a ladder — it’s a constellation of possibilities. Complete each phase to chart your unique trajectory.
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 18 }}>
            <ProgressRing percent={percent} />
            <div>
              <div className="mono dim small" style={{ letterSpacing: 1, textTransform: "uppercase" }}>
                Progress
              </div>
              <div style={{ fontSize: 20, fontWeight: 850 }}>
                {data?.progress.completedCount ?? 0} / {data?.progress.totalCount ?? 5}{" "}
                <span className="muted" style={{ fontSize: 13, fontWeight: 450 }}>
                  phases
                </span>
              </div>
            </div>
          </div>
        </div>
      </Glass>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {(data?.phases ?? []).map((p) => {
          const locked = p.status === "locked";
          const route = phaseToRoute(p.id);

          return (
            <Glass
              key={p.id}
              hover={!locked}
              onClick={!locked ? () => nav(route) : undefined}
              style={{
                padding: 18,
                opacity: locked ? 0.7 : 1,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div className="mono small" style={{ width: 120, color: statusColor(p.status), letterSpacing: 1.2 }}>
                  {statusLabel(p.status).toUpperCase()}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, fontWeight: 750 }}>{p.title}</div>
                  <div className="muted" style={{ fontSize: 12, marginTop: 2 }}>
                    {p.description}
                  </div>
                </div>
                {locked ? (
                  <Tag color="var(--text-dim)">Locked</Tag>
                ) : (
                  <Button onClick={() => nav(route)} style={{ padding: "8px 18px" }}>
                    {p.status === "not_started" ? "Begin →" : p.status === "completed" ? "Review →" : "Continue →"}
                  </Button>
                )}
              </div>
            </Glass>
          );
        })}
      </div>
    </div>
  );
}
