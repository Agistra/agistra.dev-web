export interface ToolCommand {
	id: string;
	label: string;
	command: string;
}

// Real per-tool agent-profile folders, straight from agistra.dev's own README
// (top-of-file badges link to `.claude/agents`, `.cursor/agents`, `.github/agents`,
// `.codex/agents`; the "2. Claude, Cursor, GitHub Copilot, Codex" section confirms
// the same four tools ship agent definitions out of the box). The command itself
// reuses the exact dispatch template from the README's "Dispatch work to agents"
// section, with only the one token that genuinely varies per tool — the profile
// folder — substituted in. Single source of truth for both the `ToolTabs` island
// (interactive rendering) and the docs page's plain-markdown "Copy Markdown" output.
export const TOOL_COMMANDS: ToolCommand[] = [
	{
		id: 'claude',
		label: 'Claude Code',
		command:
			'Read my-hub/.claude/agents/architect.md then my-hub/memory/architect.md.\nThen: you are in architecture mode. Review <project> and create a planning backlog.',
	},
	{
		id: 'cursor',
		label: 'Cursor',
		command:
			'@architect Read my-hub/.cursor/agents/architect.md then my-hub/memory/architect.md.\nThen: you are in architecture mode. Review <project> and create a planning backlog.',
	},
	{
		id: 'copilot',
		label: 'GitHub Copilot',
		command:
			'@architect Read my-hub/.github/agents/architect.md then my-hub/memory/architect.md.\nThen: you are in architecture mode. Review <project> and create a planning backlog.',
	},
	{
		id: 'codex',
		label: 'Codex',
		command:
			'Read my-hub/.codex/agents/architect.md then my-hub/memory/architect.md.\nThen: you are in architecture mode. Review <project> and create a planning backlog.',
	},
];
