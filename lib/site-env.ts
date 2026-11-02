/** Search engines may index the site only when this is explicitly on (launch day). */
export const ALLOW_INDEXING = process.env.ALLOW_INDEXING === "true";

/** Vercel preview deployments (and local dev): show review tools. Never on production. */
export const IS_PREVIEW = process.env.NEXT_PUBLIC_VERCEL_ENV !== "production";
