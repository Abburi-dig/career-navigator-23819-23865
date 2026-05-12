import React, { useEffect, useRef, useState } from "react";

/**
 * Prototype design tokens + shared components.
 * Implemented to match `attachments/career_navigator_prototype.html` as closely as possible.
 */

export const C = {
  bg: "#080C14",
  bgCard: "rgba(14,22,38,0.75)",
  bgGlass: "rgba(16,28,50,0.55)",
  bgGlassHover: "rgba(22,38,66,0.7)",
  bgSurface: "#0E1626",
  border: "rgba(58,175,185,0.12)",
  borderHover: "rgba(58,175,185,0.35)",
  borderSubtle: "rgba(255,255,255,0.06)",
  cyan: "#3AAFB9",
  cyanGlow: "rgba(58,175,185,0.4)",
  cyanSoft: "rgba(58,175,185,0.12)",
  coral: "#E8734A",
  coralGlow: "rgba(232,115,74,0.35)",
  coralSoft: "rgba(232,115,74,0.12)",
  violet: "#7C5CFC",
  violetGlow: "rgba(124,92,252,0.35)",
  violetSoft: "rgba(124,92,252,0.12)",
  gold: "#F5B731",
  goldSoft: "rgba(245,183,49,0.12)",
  green: "#34D399",
  greenSoft: "rgba(52,211,153,0.12)",
  red: "#F87171",
  text: "#E8EDF5",
  textMuted: "#7A8BA8",
  textDim: "#4A5A74",
  white: "#FFFFFF",
};

export const font = "'DM Sans', 'SF Pro Display', -apple-system, sans-serif";
export const fontMono = "'JetBrains Mono', 'SF Mono', monospace";

/**
 * PUBLIC_INTERFACE
 */
export function StarField() {
  /** Animated canvas background from the prototype. */
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const stars = Array.from({ length: 70 }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.2 + 0.3,
      a: Math.random() * 0.4 + 0.1,
      speed: Math.random() * 0.15 + 0.02,
      phase: Math.random() * Math.PI * 2,
    }));

    let frame = 0;

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);

      stars.forEach((s) => {
        const pulse = Math.sin(t * 0.001 * s.speed * 10 + s.phase) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(58,175,185,${s.a * pulse})`;
        ctx.fill();
      });

      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x;
          const dy = stars[i].y - stars[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.strokeStyle = `rgba(58,175,185,${0.035 * (1 - dist / 140)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      frame = requestAnimationFrame(draw);
    };

    frame = requestAnimationFrame(draw);

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
    />
  );
}

/**
 * PUBLIC_INTERFACE
 */
export function Glass(props: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  hover?: boolean;
  glow?: string | null;
  onClick?: () => void;
  pad?: number;
}) {
  /** Prototype Glass surface component. */
  const { children, style, hover, glow, onClick, pad = 24 } = props;
  const [h, setH] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        background: h && hover ? C.bgGlassHover : C.bgGlass,
        backdropFilter: "blur(24px) saturate(1.4)",
        WebkitBackdropFilter: "blur(24px) saturate(1.4)",
        border: `1px solid ${h && hover ? C.borderHover : C.border}`,
        borderRadius: 16,
        padding: pad,
        boxShadow: h && glow ? `0 0 40px ${glow}` : "0 4px 24px rgba(0,0,0,0.2)",
        transition: "all 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
        cursor: onClick ? "pointer" : "default",
        transform: h && hover ? "translateY(-2px)" : "translateY(0)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 */
export function GlowIcon(props: { emoji: string; color: string; size?: number }) {
  /** Rounded icon tile with subtle glow. */
  const { emoji, color, size = 44 } = props;
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.3,
        background: `${color}15`,
        border: `1px solid ${color}30`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size * 0.5,
        boxShadow: `0 0 20px ${color}20`,
        flexShrink: 0,
      }}
    >
      {emoji}
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 */
export function Ring(props: { pct: number; size?: number; stroke?: number; color?: string }) {
  /** Circular progress ring. */
  const { pct, size = 52, stroke = 4, color = C.cyan } = props;
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={C.borderSubtle}
        strokeWidth={stroke}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={stroke}
        strokeDasharray={circ}
        strokeDashoffset={circ - (pct / 100) * circ}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 1s cubic-bezier(0.16, 1, 0.3, 1)" }}
      />
    </svg>
  );
}

/**
 * PUBLIC_INTERFACE
 */
export function Tag(props: { children: React.ReactNode; color?: string }) {
  /** Small pill label. */
  const { children, color = C.cyan } = props;
  return (
    <span
      style={{
        padding: "4px 10px",
        borderRadius: 20,
        fontSize: 11,
        fontWeight: 600,
        fontFamily: font,
        background: `${color}15`,
        color,
        border: `1px solid ${color}25`,
        letterSpacing: 0.3,
        display: "inline-block",
      }}
    >
      {children}
    </span>
  );
}

type BtnVariant = "primary" | "ghost" | "coral";

/**
 * PUBLIC_INTERFACE
 */
export function Btn(props: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: BtnVariant;
  style?: React.CSSProperties;
  disabled?: boolean;
}) {
  /** Prototype button. */
  const { children, onClick, variant = "primary", style: sx = {}, disabled } = props;
  const [h, setH] = useState(false);

  const base: Record<BtnVariant, React.CSSProperties> = {
    primary: {
      background: h ? C.cyan : `linear-gradient(135deg, ${C.cyan}, #2A8F98)`,
      color: C.bg,
      fontWeight: 600,
      boxShadow: h ? `0 0 30px ${C.cyanGlow}` : `0 2px 12px rgba(0,0,0,0.3)`,
    },
    ghost: {
      background: h ? C.cyanSoft : "transparent",
      color: C.text,
      border: `1px solid ${h ? C.borderHover : C.border}`,
    },
    coral: {
      background: h ? C.coral : `linear-gradient(135deg, ${C.coral}, #C85A30)`,
      color: C.white,
      fontWeight: 600,
    },
  };

  return (
    <button
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => setH(true)}
      onMouseLeave={() => setH(false)}
      style={{
        padding: "10px 24px",
        borderRadius: 10,
        border: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        fontSize: 13,
        fontFamily: font,
        letterSpacing: 0.2,
        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        opacity: disabled ? 0.4 : 1,
        ...base[variant],
        ...sx,
      }}
    >
      {children}
    </button>
  );
}

/**
 * PUBLIC_INTERFACE
 */
export function FadeIn(props: {
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
}) {
  /** Simple mount fade/slide animation from prototype. */
  const { children, delay = 0, style = {} } = props;
  const [show, setShow] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setShow(true), delay);
    return () => window.clearTimeout(t);
  }, [delay]);

  return (
    <div
      style={{
        opacity: show ? 1 : 0,
        transform: show ? "translateY(0)" : "translateY(18px)",
        transition: "all 0.7s cubic-bezier(0.16, 1, 0.3, 1)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
