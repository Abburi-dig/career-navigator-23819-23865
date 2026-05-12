import React from "react";

/**
 * PUBLIC_INTERFACE
 */
export function ErrorPanel(props: { title?: string; message: string; onRetry?: () => void }) {
  /** Renders a standardized error message with an optional retry action. */
  return (
    <div className="card error">
      <div className="row-between">
        <div>
          <div className="h3">{props.title ?? "Something went wrong"}</div>
          <div className="muted">{props.message}</div>
        </div>
        {props.onRetry ? (
          <button className="btn" onClick={props.onRetry}>
            Retry
          </button>
        ) : null}
      </div>
    </div>
  );
}
