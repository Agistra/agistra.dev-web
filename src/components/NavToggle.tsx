import { useState, useEffect, useRef } from 'react';

interface NavLink {
	href: string;
	label: string;
	external?: boolean;
}

interface NavToggleProps {
	links: NavLink[];
}

/**
 * Mobile navigation toggle — the site's one React island. Renders the
 * responsive nav-links menu and its open/close button; keyboard- and
 * screen-reader-accessible (aria-expanded, Escape-to-close, focus stays
 * reachable via normal tab order).
 */
export default function NavToggle({ links }: NavToggleProps) {
	const [open, setOpen] = useState(false);
	const navRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function onKeyDown(event: KeyboardEvent) {
			if (event.key === 'Escape') setOpen(false);
		}
		document.addEventListener('keydown', onKeyDown);
		return () => document.removeEventListener('keydown', onKeyDown);
	}, []);

	return (
		<div className="nav-toggle-wrap" ref={navRef}>
			<button
				type="button"
				className="nav__toggle"
				aria-label={open ? 'Close menu' : 'Open menu'}
				aria-expanded={open}
				aria-controls="nav-links"
				onClick={() => setOpen((v) => !v)}
			>
				<span className="nav__toggle-bar" />
				<span className="nav__toggle-bar" />
				<span className="nav__toggle-bar" />
			</button>

			<div
				id="nav-links"
				className={`nav__links${open ? ' is-open' : ''}`}
			>
				{links.map((link) => (
					<a
						key={link.href}
						href={link.href}
						className="nav__link"
						target={link.external ? '_blank' : undefined}
						rel={link.external ? 'noopener noreferrer' : undefined}
						onClick={() => setOpen(false)}
					>
						{link.label}
						{link.external && <span aria-hidden="true"> ↗</span>}
					</a>
				))}
			</div>
		</div>
	);
}
