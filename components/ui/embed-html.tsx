"use client";

import { useEffect, useRef } from "react";

/**
 * Renders a third-party embed snippet (e.g. a reviews widget). Scripts set
 * via innerHTML don't run, so each <script> is re-created to execute it.
 */
export function EmbedHtml({ html, className }: { html: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    host.innerHTML = html;
    host.querySelectorAll("script").forEach((old) => {
      const s = document.createElement("script");
      Array.from(old.attributes).forEach((a) => s.setAttribute(a.name, a.value));
      s.text = old.text;
      old.replaceWith(s);
    });
    return () => {
      host.innerHTML = "";
    };
  }, [html]);

  return <div ref={ref} className={className} />;
}
