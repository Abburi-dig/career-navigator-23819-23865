import React from "react";

type Variant = "primary" | "ghost" | "coral";

const styles: Record<Variant, React.CSSProperties> = {
  primary: {
    background: "linear-gradient(135deg, var(--cyan), #2a8f98)",
    color: "var(--bg)",
    border: "none",
    boxShadow: "0 2px 12px rgba(0,0,0,0.3)",
    fontWeight: 650,
  },
  ghost: {
    background: "transparent",
    color: "var(--text)",
    border: "1px solid var(--border)",
  },
  coral: {
    background: "linear-gradient(135deg, var(--coral), #c85a30)",
    color: "white",
    border: "none",
    fontWeight: 650,
  },
};

export default function Button({
  children,
  onClick,
  disabled,
  variant = "primary",
  style,
  type = "button",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: Variant;
  style?: React.CSSProperties;
  type?: "button" | "submit";
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      style={{
        padding: "10px 20px",
        borderRadius: 10,
        fontSize: 13,
        letterSpacing: 0.2,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.45 : 1,
        transition: "transform 120ms ease",
        ...styles[variant],
        ...style,
      }}
    >
      {children}
    </button>
  );
}
