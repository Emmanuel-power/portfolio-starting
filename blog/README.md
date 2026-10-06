# Tech journey blog

My developer journal, built with **Astro + React + TypeScript + MDX + Tailwind CSS** and
published to GitHub Pages.

Live at: https://emmanuel-power.github.io/portfolio-starting/

## Features

- Posts written in Markdown or MDX, with type-checked frontmatter
- Instant search and tag filtering (React)
- Light and dark themes that remember the reader's choice
- Syntax-highlighted code blocks, table of contents, reading time
- Tag pages, previous/next links, RSS feed, sitemap, SEO metadata
- Drafts that show locally but never publish

## Run it locally

```sh
cd blog
npm install
npm run dev      # http://localhost:4321/portfolio-starting/
```

## Write a post

```sh
npm run new -- "What I learned about Docker"
```

That creates `src/content/posts/what-i-learned-about-docker.md` as a draft. Write it,
fill in `description` and `tags`, then set `draft: false`.

Frontmatter fields:

| Field | Required | Example |
| --- | --- | --- |
| `title` | yes | `'Learning Rust, week 1'` |
| `description` | yes | `'Ownership finally clicked.'` |
| `pubDate` | yes | `2026-10-06` |
| `updatedDate` | no | `2026-10-12` |
| `tags` | no | `[rust, learning]` |
| `draft` | no | `true` |

Use `.mdx` instead of `.md` to put components such as `<Callout>` inside a post
(see `how-i-built-this-blog.mdx`).

## Publish

Pushing changes under `blog/` to `main` runs `.github/workflows/deploy-blog.yml`, which
builds the site and deploys it to GitHub Pages.

One-time setup: in the repository on GitHub, open **Settings → Pages** and set
**Source** to **GitHub Actions**.

## Customize

- Name, tagline, links: `src/consts.ts`
- About page: `src/pages/about.astro`
- Colors and fonts: `src/styles/global.css`
- Site URL and base path: `astro.config.mjs`
