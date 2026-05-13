import React from "react";
import { Link } from "react-router-dom";
import Glass from "../components/ui/Glass";
import Tag from "../components/ui/Tag";

export default function NotFoundPage() {
  return (
    <div className="page container">
      <Glass>
        <Tag color="var(--text-muted)">404</Tag>
        <h1 style={{ margin: "10px 0 6px" }}>Page not found</h1>
        <p className="muted" style={{ margin: 0 }}>
          The page you requested doesn’t exist.
        </p>
        <p style={{ marginTop: 14 }}>
          <Link to="/dashboard" style={{ color: "var(--cyan)", fontWeight: 700 }}>
            Go to Dashboard →
          </Link>
        </p>
      </Glass>
    </div>
  );
}
