# Reformd launch checklist

Everything here happens at or just before the switch from Squarespace. Until step 4, the live site is untouched.

## 1. Business facts (owner)
- [x] Reviews: live Google reviews via the repu.ai widget (42c91ec9f33ae8a4), plus ClassPass ratings (checked 17 Nov). Check the widget renders on the preview and shows both studios.
- [ ] About: founder name, photo and verified credentials.
- [x] Classes: 50 minutes, grip socks required (sold with towels at the desk), arrive 10 minutes early (9 Nov). Still to add: intensity and who each class suits.
- [ ] Cecil Hills map pin from the Google Business Profile (`lib/constants.ts`, `geo`).
- [ ] Kings Park Lite contract code (`lib/constants.ts`, `contractIds`).
- [ ] Photos, rights: written confirmation that Big Creativa's edits and the 19 Jan shoot are licensed for website use, and that every recognisable member/instructor has consented.
- [x] Photos, Cecil Hills: wide studio image is DSC05704.jpg (owner-picked, 8 Nov), cropped to remove a delivery box. It predates opening (shelves empty); swap for a current wide shot when one exists.
- [ ] Photos, gaps: Ignite jumpboard shot (current image is a lunge placeholder); creche playroom shot added 19 Nov (owner photo, tidied).
- [ ] Photos, Kings Park wide in session: IMG_2117 (10 Feb shoot) is over the 10 MB Drive transfer limit; export it at about 3 MB if wanted.

## 1b. Protect what already brings leads (from the meeting review)
- [ ] The exit pop-up is the top-clicked lead source today. The new site's pop-up has desktop exit intent, and it only sends leads once the PD Wise settings below are in Vercel; test it end to end before DNS switches.
- [ ] Organization legal name for schema (`legalName`), if you want it shown; confirm the exact registered name.

## 1c. Measurement: set up BEFORE launch (so there's a "before" to compare against)
Live-site baseline, Squarespace Analytics 27 Aug - 25 Nov 2026: 3,044 visits, 2,214 unique visitors, 7,174 pageviews, 44.8% bounce, 77% mobile. Sources: direct 55%, Google 23%, Trialus 15% (447), Linktree 3%, social 2%. Top pages: home 1,543, classes 1,021, Kings Park timetable 935, Cecil Hills timetable 804, pricing KP 675 / CH 655. Google keywords: none, because Search Console is disconnected.
- [ ] **Google Search Console (owner, ~10 min, doesn't touch the live site):** search.google.com/search-console > Add property > **Domain** > `reformdpilates.com.au`. Add the TXT record it gives you at the DNS provider (Squarespace Domains), then Verify. A Domain property covers www, the apex and both the old and new sites, so it survives the switch with no re-verification.
- [ ] Search Console, two weeks later: export Performance > Queries and Pages for the last 3 months as the pre-launch baseline. Use it to update the query table in `CLAUDE.md`.
- [ ] Optional: reconnect Search Console inside Squarespace (Analytics > Search Keywords) so the old dashboard shows real terms until launch.
- [ ] **GA4 (owner):** analytics.google.com > Admin > Create property "Reformd Pilates website" (Australia, AUD, timezone Sydney) > Web stream for `https://www.reformdpilates.com.au`, with Enhanced measurement on (default). Copy the Measurement ID (`G-...`).
- [ ] GA4 > Admin > Data retention: 14 months (default is 2).
- [ ] GA4 > Admin > Product links > Search Console: link the Domain property above.
- [ ] Trialus (Google lead capture landing page) stays as it is. No change needed.

## 2. Transactions (test with a real, approved customer account)
- [ ] In a private/incognito window, open every pricing tile at both studios and confirm the product, price and terms Mindbody shows.
- [ ] Complete one intro-offer purchase per studio. Confirm the payment, the confirmation email and the booking in Mindbody.
- [ ] Pop-up: submit a test lead per studio. Confirm PD Wise shows the contact (tags `website-intro-offer`, `studio-<slug>`, `no-purchase`) and an open opportunity in the **No Purchase** stage, and that the SMS arrives with a working link.

## 3. Vercel settings (Production environment)
- [ ] `NEXT_PUBLIC_SITE_URL=https://www.reformdpilates.com.au` (or unset, which defaults to the same).
- [ ] PD Wise (from PD): `PDWISE_TOKEN_<STUDIO>` (Private Integration token with contacts.write, opportunities.readonly, opportunities.write) and `PDWISE_LOCATION_ID_<STUDIO>` for CECIL_HILLS and KINGS_PARK (or un-suffixed if one sub-account). Optional `PDWISE_PIPELINE` / `PDWISE_STAGE` if the stage isn't literally "No Purchase".
- [ ] PD Wise workflow: trigger on opportunity created in "No Purchase" (or tag `website-intro-offer`) and send the intro-offer SMS. The site creates the lead; PD Wise sends the text.
- [ ] Optional: `CRM_WEBHOOK_URL` as a backup path, plus `INTRO_OFFER_SMS_URL_CECIL_HILLS` / `_KINGS_PARK` if PD supplies tracked links.
- [ ] Optional: `INSTAGRAM_FEED_CECIL_HILLS` / `_KINGS_PARK`.
- [ ] `NEXT_PUBLIC_META_PIXEL_ID=1571899406800868` in Production only (same pixel as the current site and the kpintro/chintro landing pages; keeps retargeting audiences filling). Check Events Manager shows PageView from the new domain on day one.
- [ ] `NEXT_PUBLIC_GA4_ID=G-...` in **Production only** (previews stay out of the data). The site then sends: `generate_lead` (form or pop-up submitted), `intro_offer_checkout` (sent to a studio's Mindbody intro offer), `mindbody_click` (other Mindbody links), `phone_click`.
- [ ] Leave `NEXT_PUBLIC_FEEDBACK_EMAIL` unset in Production (the feedback button is preview-only anyway).
- [ ] Adobe Fonts kit `kkx7tho`: allowed domains include the production domain.

## 4. Go live
- [ ] Merge the PR into `main`.
- [ ] Add `www.reformdpilates.com.au` (and the apex) to the Vercel project, then point DNS from Squarespace to Vercel.
- [ ] Set `ALLOW_INDEXING=true` in Production and redeploy.
- [ ] Run `node scripts/verify-launch.mjs https://www.reformdpilates.com.au`. Every check must pass (includes the legacy redirects: /home, /book, /coming-soon, /cecil-hills, /kings-park, /pricing-cecil-hills, /pricing-kings-park).
- [ ] GA4 > Reports > Realtime: open the site on your phone, tap a Mindbody link, and confirm the visit and `mindbody_click` appear. Submit one test lead and confirm `generate_lead` and `intro_offer_checkout`.
- [ ] GA4 > Admin > Events: mark `generate_lead` and `intro_offer_checkout` as **key events** (they show up to mark once they've fired once).
- [ ] Linktree: point the Instagram bio links straight at the new pages (`/studios/...`, `/schedule/...`) instead of relying on redirects.
- [ ] Keep the Squarespace site available (unpublished, not deleted) for a few weeks in case you need to roll back.

## 5. After launch
- [ ] Google Search Console (already verified in 1c): submit `https://www.reformdpilates.com.au/sitemap.xml`, then watch Pages and 404 reports daily for two weeks. Any old URL with a 404 gets a redirect in `next.config.mjs`.
- [ ] Google Business Profiles: website links point to the matching studio page; hours match the site.
- [ ] Monthly: compare GA4 `intro_offer_checkout` and `generate_lead` with Mindbody intro-offer sales and PD Wise leads per studio. The gap between checkouts started and intro sales is the Mindbody checkout drop-off.
- [ ] Monthly: Search Console queries vs the `CLAUDE.md` query table. Fix any query landing on the wrong page.
- [ ] Bing Webmaster Tools: import the site from Search Console (one click), submit `/sitemap.xml`. Bing's index also feeds ChatGPT search and Copilot answers.
- [ ] Check `/llms.txt` loads on the live domain (it's generated from `lib/constants.ts`, so it updates itself when prices or times change).
- [ ] Re-run the schema check after any image or page change: every JSON-LD block should parse and every image it references should load (Schema Markup Validator: validator.schema.org).
