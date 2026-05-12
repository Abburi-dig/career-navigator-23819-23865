import React from "react";
import { Link } from "react-router-dom";
import { backend, DashboardPhase } from "../../../api/backend";
import { useAuth } from "../../../state/auth";
import { useAsync } from "../../../utils/useAsync";
import { ErrorPanel } from "../../components/ErrorPanel";
import { LoadingCard } from "../../components/LoadingCard";

function statusBadge(status: DashboardPhase["status"]) {
  switch (status) {
    case "COMPLETED":
      return <span className="badge ok">Completed</span>;
    case "IN_PROGRESS":
      return <span className="badge warn">In progress</span>;
    case "LOCKED":
      return <span className="badge">Locked</span>;
    default:
      return <span className="badge">Not started</span>;
  }
}

/**
 * PUBLIC_INTERFACE
 */
export function DashboardPage() {
  /** Dashboard: shows overall progress + phase cards and CTA routing. */
  const auth = useAuth();
  const { loading, error, data, reload } = useAsync(
    () => backend.getDashboard({ emailFallback: auth.userEmail ?? "user@example.com" }),
    [auth.userEmail],
  );

  if (loading) {
    return (
      <div className="stack-lg">
        <div className="h1">Dashboard</div>
        <LoadingCard title="Loading your progress…" lines={4} />
        <div className="grid-2">
          <LoadingCard title="Build Profile" />
          <LoadingCard title="Skill Assessment" />
          <LoadingCard title="Career Paths" />
          <LoadingCard title="Roadmap" />
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="stack-lg">
        <div className="h1">Dashboard</div>
        <ErrorPanel message={error ?? "Failed to load dashboard"} onRetry={reload} />
      </div>
    );
  }

  return (
    <div className="stack-lg">
      <div className="row-between">
        <div>
          <div className="h1">Dashboard</div>
          <div className="muted">Welcome back, {data.user.email}</div>
        </div>

        <div className="card compact">
          <div className="muted">Overall progress</div>
          <div className="h2">{Math.round(data.overallProgressPct)}%</div>
          <div className="progress">
            <div className="progress-bar" style={{ width: `${data.overallProgressPct}%` }} />
          </div>
        </div>
      </div>

      <div className="grid-2">
        {data.phases.map((p) => {
          const locked = p.status === "LOCKED";
          return (
            <div key={p.key} className="card">
              <div className="row-between">
                <div className="h3">{p.title}</div>
                {statusBadge(p.status)}
              </div>
              <div className="muted">{p.description}</div>

              <div className="progress mt-sm">
                <div className="progress-bar" style={{ width: `${p.progressPct}%` }} />
              </div>
              <div className="row-between mt-md">
                <div className="muted">{Math.round(p.progressPct)}% complete</div>
                {locked ? (
                  <span className="muted">Complete earlier phases to unlock</span>
                ) : (
                  <Link className="btn btn-secondary" to={p.ctaPath}>
                    Open
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
