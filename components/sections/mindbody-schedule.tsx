"use client";

import { useEffect, useRef } from "react";

const WIDGET_SRC = "https://brandedweb.mindbodyonline.com/embed/widget.js";

type Props = {
  /** Branded Web widget id from Mindbody */
  widgetId: string;
  widgetType?: string;
};

/**
 * Mindbody Branded Web widget.
 * The script scans the DOM once when it executes, so on client-side
 * navigation (e.g. Cecil Hills → Kings Park) we inject a fresh copy
 * each mount; next/script would dedupe it and leave the widget empty.
 */
export function MindbodySchedule({ widgetId, widgetType = "Schedules" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    const script = document.createElement("script");
    script.src = WIDGET_SRC;
    script.async = true;
    host.appendChild(script);
    return () => {
      script.remove();
    };
  }, [widgetId]);

  return (
    <div ref={ref}>
      <div
        key={widgetId}
        className="mindbody-widget"
        data-widget-type={widgetType}
        data-widget-id={widgetId}
      />
    </div>
  );
}
