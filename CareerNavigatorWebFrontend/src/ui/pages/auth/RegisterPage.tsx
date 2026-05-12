import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../state/auth";
import { ErrorPanel } from "../../components/ErrorPanel";

/**
 * PUBLIC_INTERFACE
 */
export function RegisterPage() {
  /** Register page: email/password -> backend -> authenticated app. */
  const auth = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState(auth.userEmail ?? "");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="center-page">
      <div className="card auth-card">
        <div className="h2">Create account</div>
        <div className="muted">Start building your persona and roadmap.</div>

        {error ? <ErrorPanel title="Registration failed" message={error} /> : null}

        <div className="stack-md">
          <label className="field">
            <div className="label">Email</div>
            <input
              className="input"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </label>

          <label className="field">
            <div className="label">Password</div>
            <input
              className="input"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
            />
          </label>

          <button
            className="btn"
            disabled={submitting || !email || password.length < 6}
            onClick={async () => {
              setError(null);
              setSubmitting(true);
              try {
                await auth.register({ email, password });
                navigate("/app", { replace: true });
              } catch (e) {
                const msg =
                  typeof e === "object" && e && "message" in e
                    ? String((e as any).message)
                    : "Unable to register";
                setError(msg);
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {submitting ? "Creating…" : "Create account"}
          </button>

          <div className="muted">
            Already have an account? <Link to="/login">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
