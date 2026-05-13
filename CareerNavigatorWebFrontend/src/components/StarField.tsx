import React, { useEffect, useRef } from "react";

type Star = {
  x: number;
  y: number;
  r: number;
  a: number;
  speed: number;
  phase: number;
};

// PUBLIC_INTERFACE
export default function StarField() {
  /** Animated constellation-like star background. */
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const stars: Star[] = Array.from({ length: 70 }, () => ({
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

      for (const s of stars) {
        const pulse = Math.sin(t * 0.001 * s.speed * 10 + s.phase) * 0.3 + 0.7;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(58,175,185,${s.a * pulse})`;
        ctx.fill();
      }

      // Draw faint connection lines between nearby stars
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

      frame = window.requestAnimationFrame(draw);
    };

    frame = window.requestAnimationFrame(draw);

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
