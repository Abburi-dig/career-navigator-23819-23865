import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Btn, C, FadeIn, Glass, Tag, font } from "../../prototype/designSystem";

type Msg = { from: "ai" | "user"; text: string };

/**
 * PUBLIC_INTERFACE
 */
export function GrillPage() {
  /** Prototype Phase 02 — The Grill. */
  const navigate = useNavigate();
  const [msgs, setMsgs] = useState<Msg[]>([
    {
      from: "ai",
      text: "I've reviewed your profile. You mentioned leading a cloud migration — tell me about the specific business value delivered, not just the timeline.",
    },
  ]);
  const [input, setInput] = useState("");
  const [phase, setPhase] = useState(0);
  const chatRef = useRef<HTMLDivElement | null>(null);

  const followups = [
    "Reducing latency by 40% is notable. How did you measure that? Walk me through the baseline metrics and who validated the results.",
    "Good depth. You listed 'cloud architecture' — have you designed a multi-region failover from scratch, or worked within existing patterns?",
    "That distinction matters. Your profile shows no P&L ownership yet. Describe a time you managed budget trade-offs above $1M.",
    "I've completed your validation. Strong hands-on technical leadership, with growth gaps in financial management and exec communication. Ready to discover your path.",
  ];

  const send = () => {
    if (!input.trim() || phase >= followups.length) return;
    setMsgs((m) => [...m, { from: "user", text: input }]);
    setInput("");

    window.setTimeout(() => {
      setMsgs((m) => [...m, { from: "ai", text: followups[phase] }]);
      setPhase((p) => p + 1);
    }, 1000);
  };

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [msgs]);

  return (
    <div
      style={{
        padding: "36px 44px",
        maxWidth: 880,
        fontFamily: font,
        display: "flex",
        flexDirection: "column",
        height: "calc(100vh - 40px)",
      }}
    >
      <FadeIn>
        <Tag color={C.coral}>PHASE 02</Tag>
        <h1 style={{ margin: "10px 0 6px", fontSize: 28, fontWeight: 700, color: C.text }}>
          The Grill — Deep Competency Validation
        </h1>
        <p style={{ margin: "0 0 14px", color: C.textMuted, fontSize: 14 }}>
          Distinguishing "reading the book" from "flying the plane."
        </p>
      </FadeIn>

      <FadeIn delay={80}>
        <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
          {["Contextual Inquiry", "Experience Verification", "Static Assessment"].map((m, i) => (
            <Tag key={m} color={i === 0 || (i === 1 && phase >= 2) ? C.cyan : C.textDim}>
              {(i === 0 || (i === 1 && phase >= 2)) ? "● " : "○ "}
              {m}
            </Tag>
          ))}
        </div>
      </FadeIn>

      <div
        ref={chatRef}
        style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 14, padding: "8px 0" }}
      >
        {msgs.map((m, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              justifyContent: m.from === "user" ? "flex-end" : "flex-start",
              gap: 10,
              alignItems: "flex-end",
            }}
          >
            {m.from === "ai" && (
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 10,
                  flexShrink: 0,
                  background: `linear-gradient(135deg, ${C.coral}, #C85A30)`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: `0 0 16px ${C.coralGlow}`,
                  fontSize: 14,
                }}
              >
                🔥
              </div>
            )}

            <Glass
              pad={14}
              style={{
                maxWidth: "72%",
                background: m.from === "user" ? `linear-gradient(135deg, ${C.cyan}20, ${C.cyan}10)` : C.bgGlass,
                borderColor: m.from === "user" ? `${C.cyan}30` : C.border,
                borderRadius: m.from === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
              }}
            >
              <div style={{ fontSize: 14, lineHeight: 1.6, color: C.text }}>{m.text}</div>
            </Glass>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", gap: 10, paddingTop: 14, borderTop: `1px solid ${C.border}` }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder={phase >= followups.length ? "Assessment complete" : "Share your experience..."}
          disabled={phase >= followups.length}
          style={{
            flex: 1,
            padding: "12px 16px",
            borderRadius: 12,
            border: `1px solid ${C.border}`,
            background: C.bgSurface,
            color: C.text,
            fontFamily: font,
            fontSize: 14,
            outline: "none",
          }}
        />
        <Btn onClick={send} disabled={phase >= followups.length} style={{ padding: "12px 18px" }}>
          Send
        </Btn>
      </div>

      {phase >= followups.length && (
        <FadeIn delay={200}>
          <div style={{ textAlign: "right", paddingTop: 14 }}>
            <Btn
              onClick={() => {
                navigate("/app/path");
              }}
            >
              Discover Your Path →
            </Btn>
          </div>
        </FadeIn>
      )}
    </div>
  );
}
