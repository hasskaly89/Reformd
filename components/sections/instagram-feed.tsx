import { SectionHeading } from "@/components/ui/section-heading";
import type { Studio } from "@/lib/constants";
import { feedUrlFor, getInstagramPosts, type InstaPost } from "@/lib/instagram";

function PostGrid({ posts }: { posts: InstaPost[] }) {
  return (
    <ul className="grid grid-cols-3 gap-2 md:gap-3">
      {posts.map((p) => (
        <li key={p.id}>
          <a
            href={p.permalink}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block aspect-square overflow-hidden rounded-sm bg-cement-100"
          >
            {/* Instagram CDN URLs are signed and short-lived, so skip next/image caching. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.image}
              alt={p.caption || "Instagram post from Reformd Pilates"}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </a>
        </li>
      ))}
    </ul>
  );
}

function FollowLink({ label, handle }: { label?: string; handle: string }) {
  return (
    <a
      href={`https://www.instagram.com/${handle}/`}
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm text-brown underline-offset-4 hover:underline"
    >
      Follow {label ? `${label} ` : ""}@{handle} →
    </a>
  );
}

/**
 * Live posts for one or more studios. Studios that share a feed are merged;
 * the section is hidden when no studio has live posts.
 */
export async function InstagramFeed({ studios, title = "Life at Reformd" }: { studios: Studio[]; title?: string }) {
  const seen = new Set<string>();
  const feeds = await Promise.all(
    studios.map(async (studio) => {
      const url = feedUrlFor(studio);
      if (url && seen.has(url)) return { studio, posts: [] as InstaPost[], shared: true };
      if (url) seen.add(url);
      return { studio, posts: await getInstagramPosts(url), shared: false };
    }),
  );
  const live = feeds.filter((f) => f.posts.length > 0);
  // No feed connected (or feed down): skip the section rather than show an empty shell.
  if (live.length === 0) return null;
  const anyShared = feeds.some((f) => f.shared);
  // One follow link per account; name the studio only when studios have their own accounts.
  const uniqueHandles = Array.from(new Set(studios.map((s) => s.instagram)));
  const handles = uniqueHandles.map((handle) => ({
    handle,
    label: uniqueHandles.length > 1 ? studios.find((s) => s.instagram === handle)?.shortName : undefined,
  }));

  return (
    <section className="bg-cream">
      <div className="container-tight section">
        <SectionHeading
          eyebrow="Instagram"
          title={title}
          aside={
            <div className="flex flex-col gap-1 md:items-end">
              {handles.map(({ handle, label }) => (
                <FollowLink key={handle} handle={handle} label={label} />
              ))}
            </div>
          }
        />
        {live.length > 0 && (
          <div className={`mt-10 grid gap-10 ${live.length > 1 && !anyShared ? "md:grid-cols-2 md:gap-8" : ""}`}>
            {live.map((f) => (
              <div key={f.studio.slug}>
                {live.length > 1 && !anyShared && (
                  <p className="eyebrow mb-4">{f.studio.shortName}</p>
                )}
                <PostGrid posts={f.posts} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
