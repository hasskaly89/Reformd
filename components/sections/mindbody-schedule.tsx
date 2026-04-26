"use client";

import Script from "next/script";

type Props = {
  /** Healcode widget id from Mindbody */
  widgetId: string;
  /** Optional widget type — Mindbody also supports "Healcode" / "Pricing" / etc., but we use Schedules */
  widgetType?: string;
};

export function MindbodySchedule({ widgetId, widgetType = "Schedules" }: Props) {
  return (
    <>
      <div
        className="mindbody-widget"
        data-widget-type={widgetType}
        data-widget-id={widgetId}
      />
      <Script
        src="https://brandedweb.mindbodyonline.com/embed/widget.js"
        strategy="afterInteractive"
      />
    </>
  );
}
