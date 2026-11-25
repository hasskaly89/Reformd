# Reformd Pilates website: how we build

## North star
Every page answers what the visitor searched for on the first screen, then makes booking the obvious next step.
Judge every change by one question: does it help someone who typed a real query find the answer and book faster?

## Who searches, and where they should land

| What they type (intent) | Page | Must answer on the first screen |
|---|---|---|
| "reformer pilates near me", "pilates Cecil Hills / Liverpool" | `/studios/cecil-hills` | Suburb, address, map, how to book, the $49 intro offer |
| "pilates Kings Park / Blacktown" | `/studios/kings-park` | Same as above |
| "reformer pilates price", "pilates intro offer" | `/pricing/[studio]` | Intro offer first, then weekly memberships, packs |
| "pilates class times", "book pilates" | `/schedule/[studio]` | Live timetable, with a direct Mindbody fallback |
| "reformer pilates for beginners" | Home (First Visit), studio FAQs | Start with Balanced, 50-minute classes, grip socks, arrive 10 min early |
| "pilates with creche" | `/creche` | Days and times, $5 a session, free with Infinite |
| "private pilates", "pilates party" | `/private-sessions` | 1:1 and 2:1, events, how to enquire |
| Class names ("jumpboard pilates", "pilates strength") | `/classes#slug` | What the class is and who it suits |

After launch, replace guesses with real data: review Google Search Console queries monthly and adjust this table and the pages.

## Rules
- **Facts are never invented.** Prices, times, policies, ratings, reviews, names and credentials come from the owner or a checked source, live in `lib/constants.ts` (one source of truth), and feed both the page and the FAQ/JSON-LD. If a fact is missing, ask for it; don't write around it.
- **Answers before persuasion.** A visitor's question (price, location, length, what to bring, creche) is answered in plain words before marketing copy.
- **One clear next step per section.** Usually the studio-specific $49 intro offer or the schedule.
- **Mobile first.** Check every change at 390px wide. Use the shared `.btn` / `.btn-sm` system, `.section` spacing and `.eyebrow` labels; don't introduce one-off sizes or letter-spacing.
- **Real photos only**, with model/rights consent. Crop 4:5 at 1440x1800, compress to under ~400 KB, strip EXIF, and only name a suburb in alt text when the location is verified.
- **Speed is part of the answer.** Don't add third-party scripts without a clear user benefit; keep the hero image `priority`.
- **SEO plumbing stays intact:** per-page canonical, `withOg`, sitemap, FAQ and LocalBusiness JSON-LD. Previews stay noindex until `ALLOW_INDEXING=true` at launch.
- **Never touch production.** Work on the preview branch; merging to `main` and DNS changes need the owner's explicit approval.

## Before pushing
`npm run build`, `npx tsc --noEmit`, `npm run lint`, then screenshot changed pages at desktop (1440) and mobile (iPhone 13). For launch checks, run `node scripts/verify-launch.mjs <url>`. Keep `LAUNCH.md` current.
