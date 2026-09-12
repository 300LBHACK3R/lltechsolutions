"use client";

import { useRef, useState } from "react";
import {
  briefFieldLimit,
  briefSections,
  briefText,
  emptyBrief,
  parseBrief,
  type BriefDraft,
} from "@/data/collection-brief";

const storageKey = "landl-website-content-brief-v1";

export default function ContentBrief() {
  const [draft, setDraft] = useState<BriefDraft>(emptyBrief);
  const [step, setStep] = useState(0);
  const [notice, setNotice] = useState("");
  const [confirmClear, setConfirmClear] = useState(false);
  const [confirmRestore, setConfirmRestore] = useState(false);
  const title = useRef<HTMLHeadingElement>(null);
  function go(next: number) {
    setStep(next);
    setNotice("");
    requestAnimationFrame(() => title.current?.focus());
  }
  function save() {
    try {
      localStorage.setItem(storageKey, JSON.stringify(draft));
      setNotice("Draft saved in this browser. Use Restore saved draft when you return.");
    } catch {
      setNotice(
        "This browser could not save your draft. You can still download it on the review step.",
      );
    }
  }
  function restore() {
    setConfirmRestore(false);
    try {
      const raw = localStorage.getItem(storageKey);
      const result = raw && raw.length <= 80000 ? parseBrief(JSON.parse(raw)) : null;
      if (!result) {
        setNotice("No usable saved draft was found in this browser.");
        return;
      }
      setDraft(result);
      setNotice("Your saved draft is restored.");
    } catch {
      setNotice("Your saved draft could not be opened. Your current entries are still here.");
    }
  }
  function clear() {
    try {
      localStorage.removeItem(storageKey);
      setDraft(emptyBrief());
      setConfirmClear(false);
      setNotice("Your entries and saved browser draft have been cleared.");
    } catch {
      setConfirmClear(false);
      setNotice(
        "This browser could not clear its saved draft. Your entries are still here; you can clear this site’s storage in browser settings.",
      );
    }
  }
  function download() {
    try {
      const url = URL.createObjectURL(
        new Blob([briefText(draft)], { type: "text/plain;charset=utf-8" }),
      );
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "My-LandL-Website-Brief.txt";
      document.body.append(anchor);
      anchor.click();
      anchor.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      setNotice(
        "Download requested. Attach My-LandL-Website-Brief.txt when you reply to your project email; nothing has been sent from this page.",
      );
    } catch {
      setNotice(
        "The download could not start. You can select and copy your brief from the review below.",
      );
    }
  }
  const section = briefSections[step];
  return (
    <div className="collection-journey content-brief">
      <ol className="journey-progress" aria-label="Content brief progress">
        {[...briefSections.map((item) => item.title), "Review"].map((label, index) => (
          <li key={label} aria-current={step === index ? "step" : undefined}>
            <span>{index + 1}</span>
            {index < step ? (
              <button type="button" onClick={() => go(index)}>
                {label}
              </button>
            ) : (
              label
            )}
          </li>
        ))}
      </ol>
      <h2 ref={title} tabIndex={-1}>
        {section?.title ?? "Ready when you are."}
      </h2>
      <p>
        {section?.intro ??
          "Review your notes, download the brief and reply to your existing project email with it attached. Tate will guide you through sharing your logo, photos and other files."}
      </p>
      {section ? (
        <div className="brief-fields">
          {section.fields.map((field) => (
            <label key={field.id}>
              {field.label}
              <small>{field.hint}</small>
              <textarea
                maxLength={briefFieldLimit}
                value={draft.values[field.id] ?? ""}
                onChange={(event) => {
                  setDraft({
                    ...draft,
                    values: { ...draft.values, [field.id]: event.target.value },
                  });
                  setNotice("");
                }}
              />
            </label>
          ))}
          <label className="brief-help">
            <input
              type="checkbox"
              checked={draft.help.includes(section.id)}
              onChange={(event) =>
                setDraft({
                  ...draft,
                  help: event.target.checked
                    ? [...draft.help, section.id]
                    : draft.help.filter((id) => id !== section.id),
                })
              }
            />
            I’d like help with this section.
          </label>
        </div>
      ) : (
        <>
          <label className="brief-review-label">
            Your brief — ready to copy or download
            <textarea readOnly value={briefText(draft)} rows={18} />
          </label>
          <button className="button button-gold" type="button" onClick={download}>
            Download my brief ↓
          </button>
        </>
      )}
      <div className="journey-actions">
        {step > 0 && (
          <button className="button button-outline" type="button" onClick={() => go(step - 1)}>
            Back
          </button>
        )}
        {step < 3 && (
          <button className="button button-gold" type="button" onClick={() => go(step + 1)}>
            {step === 2 ? "Review my brief" : "Continue"} →
          </button>
        )}
      </div>
      <details className="brief-save">
        <summary>Save, restore or clear a draft</summary>
        <p>
          Saving is optional and uses this browser only. It does not send your details to L&L. On a
          shared device, download your notes and clear the saved draft when finished.
        </p>
        <div className="button-row">
          <button className="button button-outline" type="button" onClick={save}>
            Save draft
          </button>
          <button
            className="button button-outline"
            type="button"
            onClick={() => {
              if (Object.values(draft.values).some((value) => value?.trim()) || draft.help.length)
                setConfirmRestore(true);
              else restore();
            }}
          >
            Restore saved draft
          </button>
          <button className="text-link" type="button" onClick={() => setConfirmClear(true)}>
            Clear draft
          </button>
        </div>
        {confirmRestore && (
          <div className="brief-clear">
            <p>Replace your current entries with the saved draft?</p>
            <button type="button" className="button button-outline" onClick={restore}>
              Restore saved draft instead
            </button>
            <button type="button" className="text-link" onClick={() => setConfirmRestore(false)}>
              Keep current entries
            </button>
          </div>
        )}
        {confirmClear && (
          <div className="brief-clear">
            <p>Clear your current entries and the draft saved in this browser?</p>
            <button type="button" className="button button-outline" onClick={clear}>
              Yes, clear this draft
            </button>
            <button type="button" className="text-link" onClick={() => setConfirmClear(false)}>
              Keep it
            </button>
          </div>
        )}
      </details>
      <p role="status" aria-live="polite" className="brief-notice">
        {notice}
      </p>
      <noscript>
        <p>
          This interactive checklist needs JavaScript. You can also reply to your project email with
          your business details, services, branding and questions. Tate will guide you through the
          rest.
        </p>
      </noscript>
    </div>
  );
}
