import React from "react";

export default function Glass({
  children,
  className,
  style,
  hover = false,
  onClick,
  padding = 20,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  hover?: boolean;
  onClick?: () => void;
  padding?: number;
}) {
  const base: React.CSSProperties = {
    padding,
    cursor: onClick ? "pointer" : "default",
  };

  const cls = ["card", hover ? "card--hover" : "", className ?? ""].filter(Boolean).join(" ");

  return (
    <div className={cls} style={{ ...base, ...style }} onClick={onClick}>
      {children}
    </div>
  );
}
