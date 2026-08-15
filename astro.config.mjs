import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
	// Custom domain wiring: `agistra.dev` resolves via CNAME to GitHub Pages.
	// No base path needed for apex domain — everything serves from root.
	site: 'https://agistra.dev',
	// MDX lets the docs collection embed interactive React islands inline with prose.
	// The pinned integration version remains compatible with Astro 4.
	integrations: [react(), sitemap(), mdx()],
	output: 'static',
});
