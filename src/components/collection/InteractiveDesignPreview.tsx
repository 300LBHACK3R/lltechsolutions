"use client";

import { useEffect, useId, useRef, type PointerEvent, type MouseEvent } from "react";
import DesignPreview from "@/components/collection/DesignPreview";
import MotionControl from "@/components/ui/MotionControl";
import type { WebsiteDesign } from "@/data/website-collection";

export default function InteractiveDesignPreview({
  design,
  liveDemoUrl,
}: {
  design: WebsiteDesign;
  liveDemoUrl?: string | null;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const launchRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const releaseScroll = useRef<(() => void) | null>(null);
  const backdropPress = useRef(false);
  const id = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    return () => {
      if (dialog?.open) dialog.close();
      releaseScroll.current?.();
      releaseScroll.current = null;
    };
  }, []);

  function openPreview() {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;

    const { body, documentElement } = document;
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    const saved = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
      rootOverflow: documentElement.style.overflow,
    };
    dialog.showModal();

    // Fixed body also prevents the underlying page from moving in mobile Safari.
    Object.assign(body.style, {
      position: "fixed",
      top: `-${scrollY}px`,
      left: "0",
      right: "0",
      width: "100%",
      overflow: "hidden",
    });
    documentElement.style.overflow = "hidden";
    releaseScroll.current = () => {
      body.style.position = saved.position;
      body.style.top = saved.top;
      body.style.left = saved.left;
      body.style.right = saved.right;
      body.style.width = saved.width;
      body.style.overflow = saved.overflow;
      documentElement.style.overflow = saved.rootOverflow;
      const scrollBehavior = documentElement.style.scrollBehavior;
      documentElement.style.scrollBehavior = "auto";
      window.scrollTo(scrollX, scrollY);
      documentElement.style.scrollBehavior = scrollBehavior;
    };
    closeRef.current?.focus({ preventScroll: true });
  }

  function finishClose() {
    releaseScroll.current?.();
    releaseScroll.current = null;
    backdropPress.current = false;
    if (launchRef.current?.isConnected) launchRef.current.focus({ preventScroll: true });
  }

  function isBackdrop(event: PointerEvent<HTMLDialogElement> | MouseEvent<HTMLDialogElement>) {
    if (event.target !== event.currentTarget) return false;
    const bounds = event.currentTarget.getBoundingClientRect();
    return (
      event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom
    );
  }

  return (
    <section className="template-interactive-preview" id="interactive-preview">
      <div className="template-preview-launch">
        <div>
          <p>Try it with your business in mind.</p>
          <span>Explore the pages, change the name and switch to a phone preview.</span>
        </div>
        <button
          ref={launchRef}
          className="button button-outline"
          type="button"
          aria-haspopup="dialog"
          aria-controls={`${id}-dialog`}
          onClick={openPreview}
        >
          Try this design here <span aria-hidden="true">↗</span>
        </button>
      </div>
      <dialog
        ref={dialogRef}
        id={`${id}-dialog`}
        className="template-preview-dialog"
        aria-labelledby={`${id}-title`}
        onClose={finishClose}
        onPointerDown={(event) => {
          backdropPress.current = isBackdrop(event);
        }}
        onClick={(event) => {
          if (backdropPress.current && isBackdrop(event)) event.currentTarget.close();
          backdropPress.current = false;
        }}
      >
        <header className="template-preview-dialog-heading">
          <div>
            <span>L&L / Interactive preview</span>
            <h2 id={`${id}-title`}>{design.name}</h2>
          </div>
          <div className="template-preview-dialog-controls">
            <MotionControl />
            {liveDemoUrl && (
              <a href={liveDemoUrl} target="_blank" rel="noopener noreferrer">
                View live demo <span className="sr-only">in a new tab</span>↗
              </a>
            )}
            <button
              ref={closeRef}
              type="button"
              className="template-preview-close"
              onClick={() => dialogRef.current?.close()}
            >
              Close preview <span aria-hidden="true">×</span>
            </button>
          </div>
        </header>
        <div className="template-preview-dialog-body">
          <DesignPreview design={design} />
        </div>
      </dialog>
      <noscript>
        <p className="collection-fineprint">
          Enable JavaScript to use the interactive preview.
          {liveDemoUrl && <a href={liveDemoUrl}> Open the live website demo instead.</a>}
        </p>
      </noscript>
    </section>
  );
}
