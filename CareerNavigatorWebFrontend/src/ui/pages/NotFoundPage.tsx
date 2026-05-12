import React from "react";
import { useNavigate } from "react-router-dom";
import { Btn, C, Glass, Tag, font } from "../prototype/designSystem";

/**
 * PUBLIC_INTERFACE
 */
export function NotFoundPage() {
  /** Minimal 404 with prototype styling. */
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: C.bg, fontFamily: font, padding: 24 }}>
      <Glass style={{ width: "min(680px, 100%)" }}>
        <Tag color={C.coral}>NOT FOUND</Tag>
        <h1 style={{ margin: "12px 0 8px", fontSize: 28, fontWeight: 700, color: C.text }}>Page not found</h1>
        <p style={{ margin: 0, color: C.textMuted, fontSize: 14, lineHeight: 1.6 }}>
          The route you requested doesn't exist in this prototype-matched build.
        </p>
        <div style={{ marginTop: 18 }}>
          <Btn onClick={() => navigate("/app")}>Return to Mission Control →</Btn>
        </div>
      </Glass>
    </div>
  );
}
