"use client";

import { useEffect, useRef, useState } from "react";

const WIDGET_SRC = "https://brandedweb.mindbodyonline.com/embed/widget.js";
/** After this long with nothing rendered, offer the direct Mindbody link. */
const SLOW_AFTER_MS = 8000;

type Props = {
  /** Branded Web widget id from Mindbody */
  widgetId: string;
  widgetType?: string;
  /** Direct Mindbody timetable link, shown if the widget is slow or blocked */
  fallbackUrl: string;
};

/**
 * Mindbody Branded Web widget.
 * The script scans the DOM once when it executes, so on client-side
 * navigation (e.g. Cecil Hills → Kings Park) we inject a fresh copy
 * each mount; next/script would dedupe it and leave the widget empty.
 * Until the widget renders, a loading state shows instead of a blank box.
 */
export function MindbodySchedule({ widgetId, widgetType = "Schedules", fallbackUrl }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [slow, setSlow] = useState(false);

  useEffect(() => {
    const host = ref.current;
    const widget = widgetRef.current;
    if (!host || !widget) return;
    setLoaded(false);
    setSlow(false);

    const observer = new MutationObserver(() => {
      if (widget.childElementCount > 0) {
        setLoaded(true);
        observer.disconnect();
      }
    });
    observer.observe(widget, { childList: true, subtree: true });
    const timer = window.setTimeout(() => setSlow(true), SLOW_AFTER_MS);

    const script = document.createElement("script");
    script.src = WIDGET_SRC;
    script.async = true;
    host.appendChild(script);
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
      script.remove();
    };
  }, [widgetId]);

  return (
    <div ref={ref}>
      {!loaded && (
        <div role="status" className="flex min-h-[16rem] flex-col items-center justify-center gap-4 text-center">
          {!slow ? (
            <>
              <span aria-hidden className="h-6 w-6 animate-spin rounded-full border-2 border-brown/20 border-t-brown" />
              <p className="text-sm text-charcoal/75">Loading the live timetable…</p>
            </>
          ) : (
            <>
              <p className="max-w-sm text-sm text-charcoal/80">
                The timetable is taking a while to load. You can book directly on Mindbody instead.
              </p>
              <a
                href={fallbackUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full bg-brown px-6 py-3 text-sm font-medium text-cream transition-colors hover:bg-charcoal"
              >
                Open timetable in Mindbody ↗
              </a>
            </>
          )}
        </div>
      )}
      <div
        ref={widgetRef}
        key={widgetId}
        className="mindbody-widget"
        data-widget-type={widgetType}
        data-widget-id={widgetId}
      />
    </div>
  );
}
