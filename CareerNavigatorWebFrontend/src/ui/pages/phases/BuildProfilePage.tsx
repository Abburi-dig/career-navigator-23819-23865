import React, { useEffect, useMemo, useState } from "react";
import { backend, Persona } from "../../../api/backend";
import { ErrorPanel } from "../../components/ErrorPanel";
import { LoadingCard } from "../../components/LoadingCard";

/**
 * PUBLIC_INTERFACE
 */
export function BuildProfilePage() {
  /** Build Profile: upload documents and review/edit persona. */
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);

  const [loadingPersona, setLoadingPersona] = useState(true);
  const [persona, setPersona] = useState<Persona | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const skillString = useMemo(() => (persona?.skills ?? []).join(", "), [persona?.skills]);

  useEffect(() => {
    (async () => {
      setError(null);
      setLoadingPersona(true);
      try {
        const p = await backend.getPersona();
        setPersona(p);
      } catch (e) {
        const msg =
          typeof e === "object" && e && "message" in e ? String((e as any).message) : "Load failed";
        setError(msg);
        setPersona({ headline: "", summary: "", skills: [] });
      } finally {
        setLoadingPersona(false);
      }
    })();
  }, []);

  return (
    <div className="stack-lg">
      <div>
        <div className="h1">Build Profile</div>
        <div className="muted">Upload documents and refine your persona baseline.</div>
      </div>

      {error ? <ErrorPanel title="Profile error" message={error} /> : null}

      <div className="card">
        <div className="h3">Upload documents</div>
        <div className="muted">Supported: PDF/DOCX/TXT (depending on backend).</div>

        <div className="row gap-md mt-md">
          <input
            className="input"
            type="file"
            multiple
            onChange={(e) => setFiles(Array.from(e.target.files ?? []))}
          />
          <button
            className="btn"
            disabled={uploading || files.length === 0}
            onClick={async () => {
              setError(null);
              setUploading(true);
              try {
                await backend.uploadProfileDocs(files);
                // refresh persona after upload/extraction
                const p = await backend.getPersona();
                setPersona(p);
                setFiles([]);
              } catch (e) {
                const msg =
                  typeof e === "object" && e && "message" in e
                    ? String((e as any).message)
                    : "Upload failed";
                setError(msg);
              } finally {
                setUploading(false);
              }
            }}
          >
            {uploading ? "Uploading…" : "Upload"}
          </button>
        </div>
      </div>

      {loadingPersona ? (
        <LoadingCard title="Loading persona…" lines={5} />
      ) : (
        <div className="card">
          <div className="row-between">
            <div className="h3">Persona</div>
            <button
              className="btn btn-secondary"
              disabled={saving || !persona}
              onClick={async () => {
                if (!persona) return;
                setError(null);
                setSaving(true);
                try {
                  const updated = await backend.updatePersona(persona);
                  setPersona(updated);
                } catch (e) {
                  const msg =
                    typeof e === "object" && e && "message" in e
                      ? String((e as any).message)
                      : "Save failed";
                  setError(msg);
                } finally {
                  setSaving(false);
                }
              }}
            >
              {saving ? "Saving…" : "Save changes"}
            </button>
          </div>

          <div className="grid-2 mt-md">
            <label className="field">
              <div className="label">Headline</div>
              <input
                className="input"
                value={persona?.headline ?? ""}
                onChange={(e) => setPersona((p) => ({ ...(p ?? {}), headline: e.target.value }))}
              />
            </label>

            <label className="field">
              <div className="label">Location</div>
              <input
                className="input"
                value={persona?.location ?? ""}
                onChange={(e) => setPersona((p) => ({ ...(p ?? {}), location: e.target.value }))}
              />
            </label>

            <label className="field">
              <div className="label">Years of experience</div>
              <input
                className="input"
                type="number"
                value={persona?.yearsExperience ?? 0}
                onChange={(e) =>
                  setPersona((p) => ({
                    ...(p ?? {}),
                    yearsExperience: Number(e.target.value),
                  }))
                }
              />
            </label>

            <label className="field">
              <div className="label">Skills (comma-separated)</div>
              <input
                className="input"
                value={skillString}
                onChange={(e) =>
                  setPersona((p) => ({
                    ...(p ?? {}),
                    skills: e.target.value
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean),
                  }))
                }
              />
            </label>
          </div>

          <label className="field mt-md">
            <div className="label">Summary</div>
            <textarea
              className="input"
              rows={6}
              value={persona?.summary ?? ""}
              onChange={(e) => setPersona((p) => ({ ...(p ?? {}), summary: e.target.value }))}
            />
          </label>
        </div>
      )}
    </div>
  );
}
