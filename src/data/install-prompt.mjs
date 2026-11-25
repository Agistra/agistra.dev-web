// The install prompt shown on /install. This is the ONLY place it lives in the
// site code.
//
// It must change together with the hub's `docs/AI-INSTALL.md` (the prompt block
// in the "The install prompt" section; source in the hub repo at
// pipelines/deploy/assets/AI-INSTALL.md). `install-prompt.pinned.txt` next to
// this file is a committed copy of that block; `npm test` fails if the two
// differ by one character. When the document's prompt changes, update both
// files in the same commit.

export const INSTALL_PROMPT = [
	'Install the Agistra hub for me. Read this link and follow it exactly:',
	'https://raw.githubusercontent.com/Agistra/agistra.dev/main/docs/AI-INSTALL.md',
	'Ask me before you install anything or leave the folder we chose. Never ask me to paste a secret into the chat.',
].join('\n');

export const INSTALL_DOC_URL =
	'https://raw.githubusercontent.com/Agistra/agistra.dev/main/docs/AI-INSTALL.md';

/**
 * Put the exact prompt on the clipboard.
 * @param {{ writeText: (text: string) => Promise<void> }} clipboard
 * @returns {Promise<boolean>} true when the write succeeded
 */
export async function copyInstallPrompt(clipboard) {
	try {
		await clipboard.writeText(INSTALL_PROMPT);
		return true;
	} catch {
		return false;
	}
}
