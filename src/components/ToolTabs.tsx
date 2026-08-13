import { useState } from 'react';
import { TOOL_COMMANDS } from '../data/quickstart';

const TOOLS = TOOL_COMMANDS;

/**
 * Per-tool command tab switcher (AC6). Modeled on career-ops.org/docs's Step 2
 * pattern: a row of `role="tablist"` buttons, clicking one swaps the code block
 * below it. Plain React state + conditional render — no tab library.
 */
export default function ToolTabs() {
	const [activeId, setActiveId] = useState(TOOLS[0].id);
	const active = TOOLS.find((tool) => tool.id === activeId) ?? TOOLS[0];

	return (
		<div className="tool-tabs">
			<div className="tool-tabs__list" role="tablist" aria-label="Editor or agent tool">
				{TOOLS.map((tool) => {
					const selected = tool.id === activeId;
					return (
						<button
							key={tool.id}
							type="button"
							role="tab"
							id={`tool-tab-${tool.id}`}
							aria-selected={selected}
							aria-controls={`tool-panel-${tool.id}`}
							className={`tool-tabs__tab${selected ? ' is-active' : ''}`}
							onClick={() => setActiveId(tool.id)}
						>
							{tool.label}
						</button>
					);
				})}
			</div>

			<div
				id={`tool-panel-${active.id}`}
				role="tabpanel"
				aria-labelledby={`tool-tab-${active.id}`}
				className="tool-tabs__panel"
			>
				<pre className="tool-tabs__code">
					<code>{active.command}</code>
				</pre>
			</div>
		</div>
	);
}
