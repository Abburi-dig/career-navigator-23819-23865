import React from "react";

export function SkeletonBlock({ height = 16, radius = 10 }: { height?: number; radius?: number }) {
  return (
    <div
      style={{
        height,
        borderRadius: radius,
        background:
          "linear-gradient(90deg, rgba(255,255,255,0.04), rgba(255,255,255,0.10), rgba(255,255,255,0.04))",
        backgroundSize: "240% 100%",
        animation: "skeleton 1.4s ease infinite",
      }}
    />
  );
}

export function SkeletonLines({ lines = 3 }: { lines?: number }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {Array.from({ length: lines }).map((_, idx) => (
        <SkeletonBlock key={idx} height={12} radius={8} />
      ))}
    </div>
  );
}
