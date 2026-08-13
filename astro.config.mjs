import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	// Deploying to the default GitHub Pages project-page URL for now
	// (`https://agistra.github.io/agistra.dev-web/`). Custom-domain wiring for
	// `agistra.dev` is a separate ticket (task_2) — when that lands, `site`/`base`
	// move to the apex domain the same way `vladsetchin.me` did (CNAME + base kept).
	site: 'https://agistra.github.io',
	base: '/agistra.dev-web/',
	integrations: [react(), sitemap()],
	output: 'static',
});
