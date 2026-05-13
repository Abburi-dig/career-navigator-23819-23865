import React from "react";

export default function ProgressRing({
  percent,
  size = 52,
  stroke = 4,
  color = "var(--cyan)",
}: {
  percent: number;
  size?: number;
  stroke?: number;
  color?: string;
}) {
  const radius = (size - stroke) / 2;
  const circ = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, percent));
  const offset = circ - (clamped / 100) * circ;

  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={stroke} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeDasharray={circ}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 600ms cubic-bezier(0.16, 1, 0.3, 1)" }}
      />
    </svg>
  );
}
