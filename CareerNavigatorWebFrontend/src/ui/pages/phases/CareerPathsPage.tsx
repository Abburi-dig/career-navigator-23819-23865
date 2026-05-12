import React, { useMemo, useState } from "react";
import { backend, CareerPathRec } from "../../../api/backend";
import { useAsync } from "../../../utils/useAsync";
import { ErrorPanel } from "../../components/ErrorPanel";
import { LoadingCard } from "../../components/LoadingCard";

/**
 * PUBLIC_INTERFACE
 */
export function CareerPathsPage() {
  /** Career Paths: show recommendations, compare and select a target path. */
  const { loading, error, data, reload } = useAsync(() => backend.getCareerPathRecs(), []);
  const [selected, setSelected] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const recs = data?.recommendations ?? [];

  const selectedRec: CareerPathRec | null = useMemo(() => {
    if (!selected) return null;
    return recs.find((r) => r.id === selected) ?? null;
  }, [selected, recs]);

  if (loading) return <LoadingCard title="Loading recommendations…" lines={6} />;

  if (error || !data) {
    return (
      <div className="stack-lg">
        <div className="h1">Career Paths</div>
        <ErrorPanel message={error ?? "Failed to load recommendations"} onRetry={reload} />
      </div>
    );
  }

  return (
    <div className="stack-lg">
      <div>
        <div className="h1">Career Paths</div>
        <div className="muted">Compare options and choose a target to generate a roadmap.</div>
      </div>

      {msg ? <div className="card ok">{msg}</div> : null}

      <div className="grid-2">
        {recs.map((r) => (
          <button
            key={r.id}
            className={selected === r.id ? "card selectable selected" : "card selectable"}
            onClick={() => setSelected(r.id)}
          >
            <div className="row-between">
              <div className="h3">{r.title}</div>
              <div className="pill">{Math.round(r.fitScore * 100)}% fit</div>
            </div>
            <div className="muted mt-sm">{r.why.join(" • ")}</div>
            <div className="tags mt-md">
              {r.keySkills.slice(0, 6).map((s) => (
                <span className="tag" key={s}>
                  {s}
                </span>
              ))}
            </div>
          </button>
        ))}
      </div>

      <div className="card">
        <div className="row-between">
          <div>
            <div className="h3">Selection</div>
            <div className="muted">
              {selectedRec ? `Selected: ${selectedRec.title}` : "Pick a path to continue."}
            </div>
          </div>
          <button
            className="btn"
            disabled={!selectedRec || saving}
            onClick={async () => {
              if (!selectedRec) return;
              setMsg(null);
              setSaving(true);
              try {
                await backend.selectCareerPath(selectedRec.id);
                setMsg(`Saved selection: ${selectedRec.title}`);
              } catch (e) {
                const emsg =
                  typeof e === "object" && e && "message" in e
                    ? String((e as any).message)
                    : "Save failed";
                setMsg(`Error: ${emsg}`);
              } finally {
                setSaving(false);
              }
            }}
          >
            {saving ? "Saving…" : "Select path"}
          </button>
        </div>
      </div>
    </div>
  );
}
