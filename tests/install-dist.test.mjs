// Run after `npm run build` (npm run test:dist). Checks the built page.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { INSTALL_PROMPT } from '../src/data/install-prompt.mjs';

const html = readFileSync(new URL('../dist/install/index.html', import.meta.url), 'utf8');
const body = html.slice(html.indexOf('<body'));

test('built page contains the exact prompt as selectable text', () => {
	const decoded = html.replace(/&#38;/g, '&');
	assert.ok(decoded.includes(`<code>${INSTALL_PROMPT}</code>`));
});

test('built page links only to allowed hosts', () => {
	const allowed = ['agistra.dev', 'agistra.ai', 'github.com', 'raw.githubusercontent.com'];
	const hrefs = [...body.matchAll(/<a [^>]*href="([^"]+)"/g)].map((m) => m[1]);
	assert.ok(hrefs.length > 0);
	for (const h of hrefs) {
		if (!/^https?:\/\//.test(h)) continue;
		const u = new URL(h);
		const ok =
			allowed.includes(u.hostname) &&
			(u.hostname !== 'github.com' || u.pathname.startsWith('/Agistra/')) &&
			(u.hostname !== 'raw.githubusercontent.com' || u.pathname.startsWith('/Agistra/'));
		assert.ok(ok, `disallowed link: ${h}`);
	}
});

test('built page has no input fields', () => {
	assert.equal(/<input|<textarea|<form/i.test(body), false);
});
