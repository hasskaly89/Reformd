#!/usr/bin/env node
/**
 * Launch verification for the Reformd site.
 *
 *   node scripts/verify-launch.mjs https://www.reformdpilates.com.au
 *   node scripts/verify-launch.mjs https://<preview>.vercel.app --expect=preview
 *
 * production (default): pages indexable, robots.txt open with a sitemap,
 *   canonicals/og:url/sitemap on the production host, legacy URLs redirect.
 * preview: everything still noindexed and robots.txt disallowed.
 *
 * Options: --canonical-host=<host>  host canonicals should use (default: the URL's host)
 * Exits 1 if any check fails. Needs Node 18+ (global fetch). No dependencies.
 */

const args = process.argv.slice(2);
const base = (args.find((a) => !a.startsWith("--")) || "").replace(/\/$/, "");
if (!base) {
  console.error("Usage: node scripts/verify-launch.mjs <base-url> [--expect=preview] [--canonical-host=host]");
  process.exit(2);
}
const opt = (name, dflt) => (args.find((a) => a.startsWith(`--${name}=`)) || "").split("=")[1] || dflt;
const expect = opt("expect", "production");
const canonicalHost = opt("canonical-host", new URL(base).host);
const PROD = expect === "production";

const PAGES = [
  "/", "/classes", "/about", "/contact", "/creche", "/private-sessions", "/privacy",
  "/studios/cecil-hills", "/studios/kings-park",
  "/schedule", "/schedule/cecil-hills", "/schedule/kings-park",
  "/pricing", "/pricing/cecil-hills", "/pricing/kings-park",
];
const REDIRECTS = {
  "/home": "/",
  "/cecil-hills": "/schedule/cecil-hills",
  "/kings-park": "/schedule/kings-park",
  "/pricing-cecil-hills": "/pricing/cecil-hills",
  "/pricing-kings-park": "/pricing/kings-park",
};

const results = [];
const check = (ok, label, detail = "") => results.push({ ok, label, detail });
const get = (path, init = {}) => fetch(path.startsWith("http") ? path : base + path, { redirect: "manual", ...init });
const attr = (html, re) => (html.match(re) || [])[1];

for (const path of PAGES) {
  let res;
  try {
    res = await get(path);
  } catch (e) {
    check(false, `${path} loads`, e.message);
    continue;
  }
  check(res.status === 200, `${path} returns 200`, `got ${res.status}`);
  if (res.status !== 200) continue;
  const html = await res.text();
  const robotsMeta = attr(html, /<meta name="robots" content="([^"]+)"/) || "";
  const header = res.headers.get("x-robots-tag") || "";
  const noindex = /noindex/i.test(robotsMeta) || /noindex/i.test(header);
  const intentionallyHidden = path === "/login";
  if (PROD && !intentionallyHidden) check(!noindex, `${path} is indexable`, `meta="${robotsMeta}" header="${header}"`);
  if (!PROD) check(noindex, `${path} is noindexed (preview)`, `meta="${robotsMeta}" header="${header}"`);

  const canonical = attr(html, /<link rel="canonical" href="([^"]+)"/);
  check(!!canonical, `${path} has a canonical`);
  if (canonical) {
    const c = new URL(canonical);
    check(c.host === canonicalHost && (c.pathname.replace(/\/$/, "") || "/") === path, `${path} canonical points at itself`, canonical);
  }
  const ogUrl = attr(html, /<meta property="og:url" content="([^"]+)"/);
  if (ogUrl) check(new URL(ogUrl).host === canonicalHost, `${path} og:url on ${canonicalHost}`, ogUrl);
  const ogImage = attr(html, /<meta property="og:image" content="([^"]+)"/);
  check(!!ogImage, `${path} has og:image`);
  if (path === "/" && ogImage) {
    // On a pre-launch preview, og:image points at the production domain; fetch it there only in production mode.
    if (PROD) {
      const img = await fetch(ogImage).catch(() => null);
      check(!!img && img.ok && /image\//.test(img.headers.get("content-type") || ""), "homepage og:image loads", ogImage);
    }
  }
}

for (const [from, to] of Object.entries(REDIRECTS)) {
  const res = await get(from).catch(() => null);
  const loc = res?.headers.get("location") || "";
  const target = loc ? new URL(loc, base).pathname : "";
  check(!!res && [301, 308].includes(res.status) && target === to, `${from} permanently redirects to ${to}`, `got ${res?.status} -> ${loc}`);
}

const robots = await get("/robots.txt").then((r) => r.text()).catch(() => "");
const disallowAll = /^\s*Disallow:\s*\/\s*$/im.test(robots);
if (PROD) {
  check(!disallowAll, "robots.txt allows crawling", robots.trim().replace(/\n/g, " | "));
  check(/Sitemap:\s*https?:\/\//i.test(robots), "robots.txt lists the sitemap");
} else {
  check(disallowAll, "robots.txt blocks crawling (preview)");
}

const sitemap = await get("/sitemap.xml").then((r) => (r.ok ? r.text() : "")).catch(() => "");
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
check(locs.length > 0, "sitemap.xml lists pages", `${locs.length} URLs`);
check(locs.every((l) => new URL(l).host === canonicalHost), `sitemap URLs use ${canonicalHost}`);
if (PROD) {
  for (const l of locs) {
    const r = await fetch(l, { redirect: "manual" }).catch(() => null);
    check(r?.status === 200, `sitemap URL ${new URL(l).pathname} returns 200`, `got ${r?.status}`);
  }
}

const failed = results.filter((r) => !r.ok);
for (const r of results) console.log(`${r.ok ? "PASS" : "FAIL"}  ${r.label}${!r.ok && r.detail ? `  (${r.detail})` : ""}`);
console.log(`\n${results.length - failed.length}/${results.length} checks passed (${expect} mode, ${base})`);
process.exit(failed.length ? 1 : 0);
