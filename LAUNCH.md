# Reformd launch checklist

Everything here happens at or just before the switch from Squarespace. Until step 4, the live site is untouched.

## 1. Business facts (owner)
- [ ] Reviews: verbatim quotes with studio, date and a link to each original review (or remove them).
- [ ] About: founder name, photo and verified credentials.
- [ ] Classes: duration, intensity and who each class suits.
- [ ] Cecil Hills map pin from the Google Business Profile (`lib/constants.ts`, `geo`).
- [ ] Kings Park Lite contract code (`lib/constants.ts`, `contractIds`).
- [ ] Photos, rights: written confirmation that Big Creativa's edits and the 19 Jan shoot are licensed for website use, and that every recognisable member/instructor has consented.
- [ ] Photos, Cecil Hills: the current studio image is confirmed Cecil Hills (8 Nov) but is a tight, dark crop. Replace with a wide shot: best source is the Feb 2025 DSC0xxxx-Enhanced-NR set in the Photos folder root, exported at about 2500 px wide (originals are 12-24 MB, over the Drive transfer limit).
- [ ] Photos, gaps: Ignite jumpboard shot (current image is a lunge placeholder); creche playroom shot (creche card shows a class photo).
- [ ] Photos, Kings Park wide in session: IMG_2117 (10 Feb shoot) is over the 10 MB Drive transfer limit; export it at about 3 MB if wanted.

## 2. Transactions (test with a real, approved customer account)
- [ ] In a private/incognito window, open every pricing tile at both studios and confirm the product, price and terms Mindbody shows.
- [ ] Complete one intro-offer purchase per studio. Confirm the payment, the confirmation email and the booking in Mindbody.
- [ ] Pop-up: submit a test lead per studio. Confirm it lands in PD Wise with the right studio tag and pipeline stage, and that the SMS arrives with a working link.

## 3. Vercel settings (Production environment)
- [ ] `NEXT_PUBLIC_SITE_URL=https://www.reformdpilates.com.au` (or unset, which defaults to the same).
- [ ] `CRM_WEBHOOK_URL`, plus `INTRO_OFFER_SMS_URL_CECIL_HILLS` / `_KINGS_PARK` if PD supplies tracked links.
- [ ] Optional: `INSTAGRAM_FEED_CECIL_HILLS` / `_KINGS_PARK`.
- [ ] Leave `NEXT_PUBLIC_FEEDBACK_EMAIL` unset in Production (the feedback button is preview-only anyway).
- [ ] Adobe Fonts kit `kkx7tho`: allowed domains include the production domain.

## 4. Go live
- [ ] Merge the PR into `main`.
- [ ] Add `www.reformdpilates.com.au` (and the apex) to the Vercel project, then point DNS from Squarespace to Vercel.
- [ ] Set `ALLOW_INDEXING=true` in Production and redeploy.
- [ ] Run `node scripts/verify-launch.mjs https://www.reformdpilates.com.au`. Every check must pass.
- [ ] Keep the Squarespace site available (unpublished, not deleted) for a few weeks in case you need to roll back.

## 5. After launch
- [ ] Google Search Console: verify the domain, submit `/sitemap.xml`, watch Pages and 404 reports for two weeks.
- [ ] Google Business Profiles: website links point to the matching studio page; hours match the site.
- [ ] Analytics: pick one (GA4 or Vercel Web Analytics). Track offer clicks and leads, and reconcile intro purchases against Mindbody sales.
