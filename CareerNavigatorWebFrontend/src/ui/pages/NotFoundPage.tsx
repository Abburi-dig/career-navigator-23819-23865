import React from "react";
import { Link } from "react-router-dom";

/**
 * PUBLIC_INTERFACE
 */
export function NotFoundPage() {
  /** Basic 404 page. */
  return (
    <div className="center-page">
      <div className="card">
        <div className="h2">Page not found</div>
        <div className="muted">The page you requested doesn’t exist.</div>
        <div className="mt-md">
          <Link className="btn" to="/app">
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
