// Usage: npm run new -- "My post title"
import { existsSync, writeFileSync } from 'node:fs';

const title = process.argv.slice(2).join(' ').trim();
if (!title) {
  console.error('Usage: npm run new -- "My post title"');
  process.exit(1);
}

const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const file = `src/content/posts/${slug}.md`;
if (existsSync(file)) {
  console.error(`${file} already exists`);
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
writeFileSync(
  file,
  `---
title: ${JSON.stringify(title)}
description: ''
pubDate: ${today}
tags: []
draft: true
---

Start writing here.
`,
);
console.log(`Created ${file} (draft: set draft: false when it's ready to publish)`);
