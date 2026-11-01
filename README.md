# agistra.dev-web

The public marketing site for [Agistra](https://github.com/vsetchinfc/agistra.dev) — a free,
open-source multi-agent hub for Claude Code, Cursor, GitHub Copilot, and Codex.

## Tech Stack

- **Framework:** Astro 4.x (SSG)
- **Interactive components:** React 18
- **Content:** Markdown, via Astro content collections
- **Hosting:** GitHub Pages
- **CI/CD:** GitHub Actions

## Development

### Prerequisites

- Node.js 20+
- npm

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

The site will be available at `http://localhost:4321/agistra.dev-web/`.

### Build for production

```bash
npm run build
```

The static output will be generated in the `dist/` directory.

### Preview production build

```bash
npm run preview
```

### Pageview counting (optional)

The site can emit a [GoatCounter](https://www.goatcounter.com) pageview script — cookie-free,
no localStorage, no personal data — on production builds only. It is off by default. To enable
it, copy `.env.example` to `.env` and set `PUBLIC_GOATCOUNTER_CODE` to the site's GoatCounter
code before running `npm run build`. Leaving it unset ships with no analytics script at all.

## Deployment

Deployment is fully automated via GitHub Actions (`.github/workflows/deploy.yml`):

1. Push to `main`
2. GitHub Actions runs `npm ci && npm run build`
3. The `dist/` folder is deployed to GitHub Pages

## License

See [LICENSE](LICENSE).
