import { useEffect, useState } from 'react';
import { INSTALL_PROMPT, copyInstallPrompt } from '../data/install-prompt.mjs';

type CopyState = 'idle' | 'copied' | 'error';

/**
 * The install prompt in a code block with a copy button. The prompt is plain
 * text in the server-rendered HTML, so it is selectable and readable without
 * JavaScript. The button only appears once the island has hydrated, so a
 * visitor without JavaScript never sees a dead button.
 */
export default function InstallPrompt() {
	const [ready, setReady] = useState(false);
	const [copyState, setCopyState] = useState<CopyState>('idle');

	useEffect(() => setReady(true), []);

	async function handleCopy() {
		const ok = await copyInstallPrompt(navigator.clipboard);
		setCopyState(ok ? 'copied' : 'error');
		setTimeout(() => setCopyState('idle'), 2000);
	}

	return (
		<div className="install-prompt">
			<div className="install-prompt__bar">
				<span className="install-prompt__label">Install prompt</span>
				{ready && (
					<button type="button" className="install-prompt__copy" onClick={handleCopy}>
						{copyState === 'copied'
							? 'Copied!'
							: copyState === 'error'
								? 'Copy failed: select the text instead'
								: 'Copy prompt'}
					</button>
				)}
				<span className="install-prompt__status" role="status" aria-live="polite">
					{copyState === 'copied' ? 'Prompt copied to the clipboard' : ''}
				</span>
			</div>
			<pre className="install-prompt__code">
				<code>{INSTALL_PROMPT}</code>
			</pre>
		</div>
	);
}
