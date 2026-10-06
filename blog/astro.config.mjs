// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// Published to GitHub Pages at https://emmanuel-power.github.io/portfolio-starting/
// If you move the blog to a custom domain or a <username>.github.io repo,
// change `site` and set `base` to '/'.
export default defineConfig({
  site: 'https://emmanuel-power.github.io',
  base: '/portfolio-starting',
  integrations: [react(), mdx(), sitemap()],
  markdown: {
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
