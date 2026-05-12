import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../state/auth";
import { ErrorPanel } from "../../components/ErrorPanel";

/**
 * PUBLIC_INTERFACE
 */
export function LoginPage() {
  /** Login page: email/password -> backend auth -> redirect to app. */
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation() as any;

  const [email, setEmail] = useState(auth.userEmail ?? "");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const from = location?.state?.from ?? "/app";

  return (
    <div className="center-page">
      <div className="card auth-card">
        <div className="h2">Sign in</div>
        <div className="muted">Access your Dashboard and continue your plan.</div>

        {error ? <ErrorPanel title="Login failed" message={error} /> : null}

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
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </label>

          <button
            className="btn"
            disabled={submitting || !email || password.length < 6}
            onClick={async () => {
              setError(null);
              setSubmitting(true);
              try {
                await auth.login({ email, password });
                navigate(from, { replace: true });
              } catch (e) {
                const msg =
                  typeof e === "object" && e && "message" in e
                    ? String((e as any).message)
                    : "Unable to login";
                setError(msg);
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {submitting ? "Signing in…" : "Sign in"}
          </button>

          <div className="muted">
            New here? <Link to="/register">Create an account</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
