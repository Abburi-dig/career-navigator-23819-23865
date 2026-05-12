import React, { useEffect, useState } from "react";
import { backend, MarketplaceItem } from "../../../api/backend";
import { ErrorPanel } from "../../components/ErrorPanel";
import { LoadingCard } from "../../components/LoadingCard";

function typeLabel(t: MarketplaceItem["type"]) {
  switch (t) {
    case "BOOTCAMP":
      return "Bootcamp";
    case "CERT":
      return "Certification";
    case "BOOK":
      return "Book";
    case "PROJECT":
      return "Project";
    default:
      return "Course";
  }
}

/**
 * PUBLIC_INTERFACE
 */
export function MarketplacePage() {
  /** Marketplace: browse items relevant to roadmap; supports basic filtering. */
  const [q, setQ] = useState("");
  const [type, setType] = useState<string>("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<MarketplaceItem[]>([]);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const resp = await backend.getMarketplace({ q: q.trim() || undefined, type: type || undefined });
      setItems(resp.items);
    } catch (e) {
      const msg =
        typeof e === "object" && e && "message" in e ? String((e as any).message) : "Load failed";
      setError(msg);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="stack-lg">
      <div>
        <div className="h1">Marketplace</div>
        <div className="muted">Browse learning resources and projects aligned to your gaps.</div>
      </div>

      <div className="card">
        <div className="row gap-md wrap">
          <input
            className="input"
            placeholder="Search (e.g., React, AWS, SQL)…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
          <select className="input" value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">All types</option>
            <option value="COURSE">Course</option>
            <option value="CERT">Certification</option>
            <option value="BOOTCAMP">Bootcamp</option>
            <option value="BOOK">Book</option>
            <option value="PROJECT">Project</option>
          </select>
          <button className="btn btn-secondary" onClick={load} disabled={loading}>
            Apply
          </button>
        </div>
      </div>

      {loading ? <LoadingCard title="Loading items…" lines={7} /> : null}
      {error ? <ErrorPanel title="Marketplace error" message={error} onRetry={load} /> : null}

      <div className="grid-2">
        {items.map((it) => (
          <div key={it.id} className="card">
            <div className="row-between">
              <div className="h3">{it.title}</div>
              <span className="badge">{typeLabel(it.type)}</span>
            </div>
            <div className="muted">{it.provider}</div>
            <div className="tags mt-md">
              {it.skillTags.slice(0, 8).map((s) => (
                <span key={s} className="tag">
                  {s}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {!loading && !error && items.length === 0 ? (
        <div className="card">
          <div className="muted">No items found. Try a different filter.</div>
        </div>
      ) : null}
    </div>
  );
}
