import { EmbedHtml } from "@/components/ui/embed-html";
import { REVIEWS_WIDGET_HTML, STUDIO_LIST } from "@/lib/constants";

// TODO(owner): confirm these are verbatim 5-star Google reviews before launch.
const REVIEWS = [
  {
    quote:
      "Absolutely love Reformd Pilates. The studio is stunning, the vibe is always welcoming, and the instructors are so knowledgeable and encouraging.",
    initials: "S.M.",
  },
  {
    quote:
      "The classes at Reformd are well-structured, balanced and have lots of variety. All instructors are very knowledgeable and super helpful.",
    initials: "A.K.",
  },
  {
    quote:
      "Best Pilates studio I've been to. The trainers are experienced, very knowledgeable and helpful.",
    initials: "J.D.",
  },
];

function Stars({ className = "" }: { className?: string }) {
  return (
    <span role="img" aria-label="5 out of 5 stars" className={`flex gap-0.5 text-[#E8A33D] ${className}`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} aria-hidden viewBox="0 0 20 20" className="h-4 w-4 fill-current">
          <path d="M10 1.5l2.6 5.4 5.9.8-4.3 4.1 1 5.8L10 14.8 4.8 17.6l1-5.8L1.5 7.7l5.9-.8z" />
        </svg>
      ))}
    </span>
  );
}

function GoogleMark() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5">
      <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.4h6.5a5.6 5.6 0 0 1-2.4 3.6v3h3.9c2.2-2.1 3.5-5.1 3.5-8.7z" />
      <path fill="#34A853" d="M12 24c3.2 0 6-1.1 8-2.9l-3.9-3c-1.1.7-2.5 1.2-4.1 1.2-3.1 0-5.8-2.1-6.7-5H1.3v3.1A12 12 0 0 0 12 24z" />
      <path fill="#FBBC05" d="M5.3 14.3a7.2 7.2 0 0 1 0-4.6V6.6h-4a12 12 0 0 0 0 10.8l4-3.1z" />
      <path fill="#EA4335" d="M12 4.8c1.8 0 3.3.6 4.6 1.8l3.4-3.4A12 12 0 0 0 1.3 6.6l4 3.1c.9-2.9 3.6-4.9 6.7-4.9z" />
    </svg>
  );
}

export function Testimonials() {
  return (
    <section className="bg-cement-100">
      <div className="container-tight section">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow flex items-center gap-2">
              <GoogleMark /> Google reviews
            </p>
            <h2 className="mt-4 text-4xl md:text-5xl">Loved by our members.</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {STUDIO_LIST.map((s) => (
              <a
                key={s.slug}
                href={s.googleReviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-brown/25 bg-cream px-5 py-2.5 text-sm font-medium text-brown transition-colors hover:bg-white"
              >
                <GoogleMark /> {s.shortName} reviews
              </a>
            ))}
          </div>
        </div>

        {REVIEWS_WIDGET_HTML ? (
          <EmbedHtml html={REVIEWS_WIDGET_HTML} className="mt-10" />
        ) : (
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {REVIEWS.map((r) => (
              <figure
                key={r.initials}
                className="flex flex-col rounded-sm bg-cream p-7 shadow-[0_1px_0_rgba(79,62,51,0.08),0_12px_30px_-18px_rgba(79,62,51,0.35)]"
              >
                <Stars />
                <blockquote className="mt-5 flex-1 text-lg leading-relaxed text-charcoal/90">
                  &ldquo;{r.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-6 flex items-center justify-between text-xs uppercase tracking-[0.2em] text-brown/70">
                  <span>{r.initials}</span>
                  <GoogleMark />
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
