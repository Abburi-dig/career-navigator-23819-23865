import React from "react";

export default function Tag({
  children,
  color = "var(--cyan)",
}: {
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <span
      className="small"
      style={{
        padding: "4px 10px",
        borderRadius: 20,
        fontWeight: 700,
        display: "inline-block",
        background: `color-mix(in srgb, ${color} 14%, transparent)`,
        border: `1px solid color-mix(in srgb, ${color} 26%, transparent)`,
        color,
        letterSpacing: 0.4,
      }}
    >
      {children}
    </span>
  );
}
