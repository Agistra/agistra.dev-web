import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
	// Custom domain wiring: `agistra.dev` resolves via CNAME to GitHub Pages.
	// No base path needed for apex domain — everything serves from root.
	site: 'https://agistra.dev',
	integrations: [react(), sitemap()],
	output: 'static',
});
