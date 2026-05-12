import React from "react";

/**
 * PUBLIC_INTERFACE
 */
export function LoadingCard(props: { title?: string; lines?: number }) {
  /** Simple skeleton-style loading card. */
  const lines = props.lines ?? 3;
  return (
    <div className="card">
      <div className="skeleton-title">{props.title ?? "Loading…"}</div>
      <div className="stack-sm">
        {Array.from({ length: lines }).map((_, idx) => (
          <div key={idx} className="skeleton-line" />
        ))}
      </div>
    </div>
  );
}
