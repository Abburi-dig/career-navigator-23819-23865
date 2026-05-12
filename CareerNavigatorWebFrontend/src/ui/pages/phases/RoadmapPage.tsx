import React, { useState } from "react";
import { backend } from "../../../api/backend";
import { useAsync } from "../../../utils/useAsync";
import { ErrorPanel } from "../../components/ErrorPanel";
import { LoadingCard } from "../../components/LoadingCard";

/**
 * PUBLIC_INTERFACE
 */
export function RoadmapPage() {
  /** Roadmap: shows milestones and allows task completion tracking. */
  const { loading, error, data, reload } = useAsync(() => backend.getRoadmap(), []);
  const [busy, setBusy] = useState<string | null>(null);

  if (loading) return <LoadingCard title="Loading roadmap…" lines={7} />;

  if (error || !data) {
    return (
      <div className="stack-lg">
        <div className="h1">Roadmap</div>
        <ErrorPanel message={error ?? "Failed to load roadmap"} onRetry={reload} />
      </div>
    );
  }

  return (
    <div className="stack-lg">
      <div>
        <div className="h1">Roadmap</div>
        <div className="muted">
          {data.selectedPathTitle
            ? `Target path: ${data.selectedPathTitle}`
            : "Select a career path to generate a tailored roadmap."}
        </div>
      </div>

      <div className="stack-md">
        {data.milestones.map((m) => (
          <div key={m.id} className="card">
            <div className="row-between">
              <div className="h3">
                Month {m.targetMonth}: {m.title}
              </div>
              <div className="pill">{m.tasks.filter((t) => t.done).length}/{m.tasks.length} done</div>
            </div>

            <div className="stack-sm mt-md">
              {m.tasks.map((t) => (
                <label key={t.id} className="task">
                  <input
                    type="checkbox"
                    checked={t.done}
                    disabled={busy === t.id}
                    onChange={async (e) => {
                      setBusy(t.id);
                      try {
                        await backend.toggleTask({
                          milestoneId: m.id,
                          taskId: t.id,
                          done: e.target.checked,
                        });
                        await reload();
                      } finally {
                        setBusy(null);
                      }
                    }}
                  />
                  <span className={t.done ? "task-done" : ""}>{t.title}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
