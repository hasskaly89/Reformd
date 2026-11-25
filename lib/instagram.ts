/**
 * Live Instagram posts.
 *
 * Each studio reads a JSON feed URL from a server-only env var. Either works:
 *  - a Behold JSON feed (https://feeds.behold.so/<id>): no token upkeep, recommended
 *  - the Instagram API: https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,timestamp&access_token=<long-lived token>
 * Pages re-fetch at most hourly. With no URL set, or if the feed fails, the
 * section is hidden.
 */

import type { Studio } from "@/lib/constants";

export type InstaPost = {
  id: string;
  permalink: string;
  image: string;
  caption: string;
};

const FEED_ENV: Record<Studio["slug"], string | undefined> = {
  "cecil-hills": process.env.INSTAGRAM_FEED_CECIL_HILLS,
  "kings-park": process.env.INSTAGRAM_FEED_KINGS_PARK,
};

export const feedUrlFor = (studio: Studio) => FEED_ENV[studio.slug];

type RawPost = Record<string, unknown>;
const str = (v: unknown) => (typeof v === "string" ? v : "");

/** Accepts Behold ({ posts }) or Instagram API ({ data }) payloads. */
function normalise(json: unknown): InstaPost[] {
  const obj = (json ?? {}) as Record<string, unknown>;
  const list = (Array.isArray(json) ? json : obj.posts ?? obj.data ?? []) as RawPost[];
  return list
    .map((p) => {
      const type = str(p.mediaType ?? p.media_type);
      const sizes = (p.sizes ?? {}) as Record<string, { mediaUrl?: string }>;
      const image =
        sizes.medium?.mediaUrl ||
        (type === "VIDEO" ? str(p.thumbnailUrl ?? p.thumbnail_url) : "") ||
        str(p.mediaUrl ?? p.media_url);
      return {
        id: str(p.id),
        permalink: str(p.permalink),
        image,
        caption: str(p.prunedCaption ?? p.caption).slice(0, 140),
      };
    })
    .filter((p) => p.id && p.permalink && p.image);
}

export async function getInstagramPosts(url: string | undefined, limit = 6): Promise<InstaPost[]> {
  if (!url) return [];
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return [];
    return normalise(await res.json()).slice(0, limit);
  } catch {
    return [];
  }
}
