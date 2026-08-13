export const SITE = {
	title: 'agistra.dev',
	tagline: 'Become a Team Lead of your AI Engineering Team.',
	description:
		'A free, open-source multi-agent hub for Claude Code, Cursor, GitHub Copilot, and Codex. Architect, Builder, Tester, and Router run your ticket lifecycle so context survives between sessions.',
	url: 'https://agistra.github.io/agistra.dev-web/',
	github: 'https://github.com/vsetchinfc/agistra.dev',
	installCommand: [
		'git clone https://github.com/vsetchinfc/agistra.dev.git my-hub',
		'cd my-hub',
	],
} as const;

export interface RosterMember {
	name: string;
	emoji: string;
	role: string;
	tagline: string;
}

// Names, roles, and taglines are the real values from this hub's own agent
// profiles (`.claude/agents/<name>.md`) — not invented marketing copy.
export const ROSTER: RosterMember[] = [
	{
		name: 'Architect',
		emoji: '\u{1F3D7}\u{FE0F}',
		role: 'Principal Architect / Technical Lead',
		tagline: 'Design it. Scope it. Hand it off.',
	},
	{
		name: 'Builder',
		emoji: '\u{1F528}',
		role: 'Principal Engineer',
		tagline: 'Ship it. Test it. Close the ticket.',
	},
	{
		name: 'Tester',
		emoji: '\u{1F50D}',
		role: 'Principal QA Engineer',
		tagline: 'Verify it. Evidence it. Report it.',
	},
	{
		name: 'Router',
		emoji: '⚡',
		role: 'Inter-team Relay Agent',
		tagline: 'Classify it. Route it. Nothing more.',
	},
];
