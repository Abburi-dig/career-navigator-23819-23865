import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApiClient } from "../api/useApiClient";
import type { QuestionnaireResponse } from "../api/types";
import Glass from "../components/ui/Glass";
import Tag from "../components/ui/Tag";
import Button from "../components/ui/Button";
import { SkeletonLines } from "../components/ui/Skeleton";

type Answers = Record<string, number>;

export default function SkillAssessmentPage() {
  const api = useApiClient();
  const nav = useNavigate();

  const [data, setData] = useState<QuestionnaireResponse | null>(null);
  const [answers, setAnswers] = useState<Answers>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setErr(null);
      try {
        const res = await api.request<QuestionnaireResponse>("/assessment/questionnaire", "GET");
        if (!cancelled) setData(res);
      } catch (e: any) {
        if (!cancelled) setErr(e?.message ?? "Failed to load questionnaire");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [api]);

  const canSubmit = data && Object.keys(answers).length === data.questions.length;

  const submit = async () => {
    if (!data) return;
    setSubmitting(true);
    setErr(null);
    try {
      await api.request("/assessment/submit", "POST", { answers });
      nav("/phases/paths");
    } catch (e: any) {
      setErr(e?.message ?? "Failed to submit assessment");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page container" style={{ maxWidth: 980 }}>
      <Tag color="var(--coral)">PHASE 02</Tag>
      <h1 style={{ margin: "10px 0 6px", fontSize: 28, fontWeight: 850 }}>Skill Assessment</h1>
      <p className="muted" style={{ margin: "0 0 18px" }}>
        Complete the static questionnaire, then we’ll calibrate your self-reported skill levels.
      </p>

      {loading && (
        <Glass>
          <SkeletonLines lines={5} />
        </Glass>
      )}

      {!loading && err && (
        <Glass style={{ borderColor: "rgba(248,113,113,0.35)", background: "rgba(248,113,113,0.06)" }}>
          <Tag color="var(--red)">ERROR</Tag>
          <div style={{ marginTop: 10, fontSize: 13 }}>{err}</div>
        </Glass>
      )}

      {!loading && data && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {data.questions.map((q) => (
            <Glass key={q.id}>
              <div className="mono dim small" style={{ letterSpacing: 1, textTransform: "uppercase" }}>
                {q.domain}
              </div>
              <div style={{ marginTop: 6, fontSize: 14, fontWeight: 650 }}>{q.question}</div>

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 12 }}>
                {q.options.map((opt, idx) => {
                  const active = answers[q.id] === idx;
                  return (
                    <button
                      key={opt}
                      onClick={() => setAnswers((p) => ({ ...p, [q.id]: idx }))}
                      style={{
                        padding: "8px 12px",
                        borderRadius: 10,
                        border: active ? "1px solid var(--border-hover)" : "1px solid var(--border)",
                        background: active ? "rgba(58,175,185,0.12)" : "rgba(14,22,38,0.75)",
                        color: active ? "var(--cyan)" : "var(--text)",
                        cursor: "pointer",
                        fontSize: 13,
                      }}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </Glass>
          ))}

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 10 }}>
            <Button variant="ghost" onClick={() => nav("/dashboard")}>
              Back to Dashboard
            </Button>
            <Button disabled={!canSubmit || submitting} onClick={submit}>
              {submitting ? "Submitting..." : "Submit & Continue →"}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
