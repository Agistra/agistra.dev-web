import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { INSTALL_PROMPT, copyInstallPrompt } from '../src/data/install-prompt.mjs';

const read = (p) => readFileSync(new URL(`../${p}`, import.meta.url), 'utf8');

// Drift guard: the pinned file is a committed copy of the prompt block in the
// hub's docs/AI-INSTALL.md. Compare character for character (the file's single
// trailing newline is the only allowance).
test('install prompt equals the pinned copy of the hub document prompt', () => {
	const pinned = read('src/data/install-prompt.pinned.txt');
	assert.equal(pinned.endsWith('\n') && !pinned.endsWith('\n\n'), true);
	assert.equal(INSTALL_PROMPT, pinned.slice(0, -1));
});

test('drift guard fails when one character differs', () => {
	const pinned = read('src/data/install-prompt.pinned.txt').slice(0, -1);
	assert.notEqual(INSTALL_PROMPT.replace('Agistra', 'Agistrb'), pinned);
	assert.notEqual(INSTALL_PROMPT + ' ', pinned);
	assert.notEqual(INSTALL_PROMPT.slice(0, -1), pinned);
});

test('the prompt text is defined in one place only', () => {
	for (const f of ['src/pages/install.astro', 'src/components/InstallPrompt.tsx', 'src/components/sections/Hero.astro']) {
		assert.equal(read(f).includes('Install the Agistra hub for me'), false, f);
	}
});

test('copy puts the exact prompt on the clipboard', async () => {
	let written;
	const ok = await copyInstallPrompt({ writeText: async (t) => { written = t; } });
	assert.equal(ok, true);
	assert.equal(written, INSTALL_PROMPT);
});

test('copy reports failure when the clipboard rejects', async () => {
	const ok = await copyInstallPrompt({ writeText: async () => { throw new Error('denied'); } });
	assert.equal(ok, false);
});

test('install page has no secret field and no form', () => {
	const src = read('src/pages/install.astro') + read('src/components/InstallPrompt.tsx');
	assert.equal(/<input|<textarea|<form|type="password"/i.test(src), false);
});
