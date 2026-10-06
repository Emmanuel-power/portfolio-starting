import { useMemo, useState } from 'react';

export interface PostSummary {
  title: string;
  description: string;
  href: string;
  date: string;
  readingTime: string;
  tags: string[];
  draft: boolean;
}

interface Props {
  posts: PostSummary[];
  tags: string[];
}

export default function PostSearch({ posts, tags }: Props) {
  const [query, setQuery] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((post) => {
      if (activeTag && !post.tags.includes(activeTag)) return false;
      if (!q) return true;
      return [post.title, post.description, ...post.tags].some((text) => text.toLowerCase().includes(q));
    });
  }, [posts, query, activeTag]);

  return (
    <div>
      <div className="flex flex-col gap-4">
        <label className="relative block">
          <span className="sr-only">Search posts</span>
          <svg viewBox="0 0 24 24" className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-zinc-400" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search posts…"
            className="w-full rounded-lg border border-zinc-200 bg-white py-2.5 pr-3 pl-9 text-sm outline-none placeholder:text-zinc-400 focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20 dark:border-zinc-800 dark:bg-zinc-900"
          />
        </label>
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by tag">
            {tags.map((tag) => {
              const active = tag === activeTag;
              return (
                <button
                  key={tag}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setActiveTag(active ? null : tag)}
                  className={
                    'rounded-full border px-3 py-1 text-xs font-medium transition ' +
                    (active
                      ? 'border-accent-500 bg-accent-500 text-white'
                      : 'border-zinc-200 text-zinc-600 hover:border-zinc-400 dark:border-zinc-800 dark:text-zinc-400 dark:hover:border-zinc-600')
                  }
                >
                  #{tag}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <ul className="mt-8 divide-y divide-zinc-200 dark:divide-zinc-800">
        {visible.map((post) => (
          <li key={post.href} className="py-6 first:pt-0">
            <a href={post.href} className="group block">
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' })}
                </time>
                <span aria-hidden="true">·</span>
                <span>{post.readingTime}</span>
                {post.draft && <span className="rounded bg-amber-100 px-1.5 py-0.5 font-medium text-amber-800 dark:bg-amber-900/40 dark:text-amber-300">Draft</span>}
              </div>
              <h2 className="mt-1.5 text-lg font-semibold tracking-tight text-zinc-900 group-hover:text-accent-600 dark:text-zinc-100 dark:group-hover:text-accent-400">
                {post.title}
              </h2>
              <p className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{post.description}</p>
            </a>
          </li>
        ))}
      </ul>
      {visible.length === 0 && (
        <p className="py-10 text-center text-sm text-zinc-500">No posts match that search yet.</p>
      )}
    </div>
  );
}
