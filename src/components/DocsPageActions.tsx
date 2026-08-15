import { useEffect, useRef, useState } from 'react';

interface DocsPageActionsProps {
	/** Raw Markdown source of the page, used for the "Copy Markdown" button. */
	markdown: string;
	/** Fully-qualified page URL, passed through to "Open in" links. */
	pageUrl: string;
}

type CopyState = 'idle' | 'copied' | 'error';

function buildAiUrl(base: string, pageUrl: string): string {
	const prompt = `Read ${pageUrl} and help me get started with Agistra Dev.`;
	return `${base}?q=${encodeURIComponent(prompt)}`;
}

/**
 * "Copy Markdown" / "Open in AI" control modeled on career-ops.org/docs's
 * page-actions dropdown: a Copy Markdown button plus an "Open in" menu that hands
 * the page URL through to ChatGPT/Claude's prompt-prefill `?q=` pattern so the
 * assistant fetches and reads the page itself, rather than relying on the raw
 * page content fitting in a URL query string.
 */
export default function DocsPageActions({ markdown, pageUrl }: DocsPageActionsProps) {
	const [copyState, setCopyState] = useState<CopyState>('idle');
	const [menuOpen, setMenuOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function onClickOutside(event: MouseEvent) {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setMenuOpen(false);
			}
		}
		function onKeyDown(event: KeyboardEvent) {
			if (event.key === 'Escape') setMenuOpen(false);
		}
		document.addEventListener('mousedown', onClickOutside);
		document.addEventListener('keydown', onKeyDown);
		return () => {
			document.removeEventListener('mousedown', onClickOutside);
			document.removeEventListener('keydown', onKeyDown);
		};
	}, []);

	async function handleCopy() {
		try {
			await navigator.clipboard.writeText(markdown);
			setCopyState('copied');
		} catch {
			setCopyState('error');
		}
		setTimeout(() => setCopyState('idle'), 2000);
	}

	const openLinks = [
		{ label: 'Open in ChatGPT', href: buildAiUrl('https://chatgpt.com/', pageUrl) },
		{ label: 'Open in Claude', href: buildAiUrl('https://claude.ai/new', pageUrl) },
	];

	return (
		<div className="docs-actions">
			<button type="button" className="docs-actions__button" onClick={handleCopy}>
				{copyState === 'copied' ? 'Copied!' : copyState === 'error' ? 'Copy failed' : 'Copy Markdown'}
			</button>

			<div className="docs-actions__menu-wrap" ref={menuRef}>
				<button
					type="button"
					className="docs-actions__button"
					aria-haspopup="menu"
					aria-expanded={menuOpen}
					onClick={() => setMenuOpen((v) => !v)}
				>
					Open in <span aria-hidden="true">▾</span>
				</button>

				{menuOpen && (
					<div className="docs-actions__menu" role="menu">
						{openLinks.map((link) => (
							<a
								key={link.label}
								role="menuitem"
								className="docs-actions__menu-item"
								href={link.href}
								target="_blank"
								rel="noopener noreferrer"
								onClick={() => setMenuOpen(false)}
							>
								{link.label}
							</a>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
