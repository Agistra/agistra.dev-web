import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
	// Deploying to the default GitHub Pages project-page URL for now
	// (`https://agistra.github.io/agistra.dev-web/`). Custom-domain wiring for
	// `agistra.dev` is a separate ticket (task_2) — when that lands, `site`/`base`
	// move to the apex domain the same way `vladsetchin.me` did (CNAME + base kept).
	site: 'https://agistra.github.io',
	base: '/agistra.dev-web/',
	// MDX (task_3): the `docs` collection needs to embed a live React island
	// (the per-tool command tab switcher) inline with prose content — plain
	// Markdown content collections can't interleave a component mid-flow, MDX
	// is the standard Astro-official mechanism for that. Pinned to an exact
	// version compatible with Astro ^4.16 (astrojs/mdx 4.x requires Astro 5).
	integrations: [react(), sitemap(), mdx()],
	output: 'static',
});
