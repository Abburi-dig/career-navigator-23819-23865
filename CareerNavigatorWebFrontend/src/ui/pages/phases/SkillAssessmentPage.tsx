import React, { useMemo, useState } from "react";
import { backend } from "../../../api/backend";
import { useAsync } from "../../../utils/useAsync";
import { ErrorPanel } from "../../components/ErrorPanel";
import { LoadingCard } from "../../components/LoadingCard";

/**
 * PUBLIC_INTERFACE
 */
export function SkillAssessmentPage() {
  /** Skill Assessment: questionnaire + submit responses. */
  const { loading, error, data, reload } = useAsync(() => backend.getQuestionnaire(), []);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitMsg, setSubmitMsg] = useState<string | null>(null);

  const isComplete = useMemo(() => {
    if (!data) return false;
    return data.questions.every((q) => Boolean(answers[q.id]));
  }, [data, answers]);

  if (loading) return <LoadingCard title="Loading questionnaire…" lines={6} />;

  if (error || !data) {
    return (
      <div className="stack-lg">
        <div className="h1">Skill Assessment</div>
        <ErrorPanel message={error ?? "Failed to load questionnaire"} onRetry={reload} />
      </div>
    );
  }

  return (
    <div className="stack-lg">
      <div>
        <div className="h1">Skill Assessment</div>
        <div className="muted">Answer a few questions to calibrate your current level.</div>
      </div>

      {submitMsg ? <div className="card ok">{submitMsg}</div> : null}

      <div className="stack-md">
        {data.questions.map((q) => (
          <div key={q.id} className="card">
            <div className="h3">{q.prompt}</div>
            <div className="row gap-md mt-md wrap">
              {q.options.map((opt) => (
                <label key={opt.value} className="chip">
                  <input
                    type="radio"
                    name={q.id}
                    value={opt.value}
                    checked={answers[q.id] === opt.value}
                    onChange={() => setAnswers((a) => ({ ...a, [q.id]: opt.value }))}
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="row-between">
        <div className="muted">{isComplete ? "Ready to submit" : "Please answer all questions"}</div>
        <button
          className="btn"
          disabled={!isComplete || submitting}
          onClick={async () => {
            setSubmitMsg(null);
            setSubmitting(true);
            try {
              await backend.submitAssessment(answers);
              setSubmitMsg("Saved. You can revisit anytime.");
            } catch (e) {
              const msg =
                typeof e === "object" && e && "message" in e
                  ? String((e as any).message)
                  : "Submit failed";
              setSubmitMsg(`Error: ${msg}`);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {submitting ? "Submitting…" : "Submit"}
        </button>
      </div>
    </div>
  );
}
