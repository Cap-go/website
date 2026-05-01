# Capgo website

<a href="https://capgo.app/"><img src='https://raw.githubusercontent.com/Cap-go/capgo/main/assets/capgo_banner.png' alt='Capgo - Instant updates for capacitor'/></a>
[![Discord](https://badgen.net/badge/icon/discord?icon=discord&label)](https://discord.capgo.app)
<a href="https://discord.capgo.app"><img src="https://img.shields.io/discord/912707985829163099?color=%237289DA&label=Discord" alt="Discord">
[![npm](https://img.shields.io/npm/dm/@capgo/website)](https://www.npmjs.com/package/@capgo/website)
[![GitHub latest commit](https://badgen.net/github/last-commit/Cap-go/website/main)](https://GitHub.com/Cap-go/website/commit/)
[![https://good-labs.github.io/greater-good-affirmation/assets/images/badge.svg](https://good-labs.github.io/greater-good-affirmation/assets/images/badge.svg)](https://good-labs.github.io/greater-good-affirmation)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=Cap-go_website&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=Cap-go_website)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=Cap-go_website&metric=bugs)](https://sonarcloud.io/summary/new_code?id=Cap-go_website)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=Cap-go_website&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=Cap-go_website)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=Cap-go_website&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=Cap-go_website)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=Cap-go_website&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=Cap-go_website)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Cap-go_website&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=Cap-go_website)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=Cap-go_website&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=Cap-go_website)
[![Open Bounties](https://img.shields.io/endpoint?url=https%3A%2F%2Fconsole.algora.io%2Fapi%2Fshields%2FCapgo%2Fbounties%3Fstatus%3Dopen)](https://console.algora.io/org/Capgo/bounties?status=open)
[![Rewarded Bounties](https://img.shields.io/endpoint?url=https%3A%2F%2Fconsole.algora.io%2Fapi%2Fshields%2FCapgo%2Fbounties%3Fstatus%3Dcompleted)](https://console.algora.io/org/Capgo/bounties?status=completed)

<h2><a href="https://capgo.app/consulting/">Hire a Capacitor consultant</a></h2>

This is the source code for the Capgo website, built with [Astro](https://astro.build/) and deployed on [Cloudflare Workers](https://developers.cloudflare.com/workers/).

## Monorepo layout

The repo is now a `bun` workspace with two Astro apps:

- `apps/web`: the marketing site and product pages
- `apps/docs`: the documentation site powered by Starlight

Both apps keep the current public URL structure on `capgo.app`, but they deploy as two different Cloudflare Workers:

- `apps/web/wrangler.jsonc`: handles the main site
- `apps/docs/wrangler.jsonc`: handles `/docs*`, `/{locale}/docs*`, and `/_docs*`

The docs worker uses a dedicated asset prefix (`/_docs`) so both Workers can coexist on the same domain without asset collisions.

## Documentation

- Live docs: https://capgo.app/docs/
- English docs content: `apps/docs/src/content/docs/docs`
- Localized docs content: `apps/docs/src/content/docs/<locale>/docs`

## Development

Install dependencies once from the repo root:

```sh
bun install
```

Run the marketing site locally:

```sh
bun run dev:web
```

Run the documentation site locally:

```sh
bun run dev:docs
```

## Deployment

Deployments are handled with [`wrangler deploy`](https://developers.cloudflare.com/workers/wrangler/commands/#deploy).

- `bun run deploy:web` deploys the main website worker
- `bun run deploy:docs` deploys the documentation worker
- `bun run deploy` is intentionally disabled so docs and web cannot be published together

Production deploys are split into two GitHub workflows:

- `Deploy Docs` runs on pushes to `main` that touch `apps/docs/**` or docs build inputs shared with the workspace
- `Deploy Web` runs on pushes to `main` that touch `apps/web/**` or web build inputs shared with the workspace

Shared workspace changes can queue both workflows, but the shared concurrency group keeps production deploys serialized so they never run at the same time.

## Project structure

Key folders and files in this repo:

```text
/
├── apps/
│   ├── web/
│   │   ├── public/
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── content/
│   │   │   │   ├── blog/
│   │   │   │   └── plugins-tutorials/
│   │   │   ├── pages/
│   │   │   ├── config/
│   │   │   └── content.config.ts
│   │   ├── astro.config.mjs
│   │   └── wrangler.jsonc
│   ├── docs/
│   │   ├── public -> ../web/public
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── content/
│   │   │   │   └── docs/
│   │   │   ├── css/
│   │   │   └── content.config.ts
│   │   ├── astro.config.mjs
│   │   └── wrangler.jsonc
│   └── translation-worker/
├── scripts/
└── package.json
```

Astro routes for the website live in `apps/web/src/pages/`. The docs site is powered by Starlight in `apps/docs/`.

## Commands

All commands are run from the repo root:

| Command | Action |
| :------ | :----- |
| `bun install` | Install workspace dependencies |
| `bun run dev:web` | Start the marketing site locally |
| `bun run dev:docs` | Start the docs site locally |
| `bun run build:web` | Build the website app |
| `bun run build:docs` | Build the docs app |
| `bun run build` | Build both apps |
| `bun run check` | Run `astro check` for both apps |
| `bun run preview:web` | Preview the website locally |
| `bun run preview:docs` | Preview the docs locally |
| `bun run deploy:web` | Deploy the website worker |
| `bun run deploy:docs` | Deploy the docs worker |
| `bun run deploy:translation` | Deploy the localized edge translation worker |
| `bun run deploy` | Fails intentionally; use `deploy:web`, `deploy:docs`, or `deploy:translation` for one worker at a time |
| `bun run astro -- --help` | Get help using the Astro CLI |

## Localized Pages

English source content is kept in the web and docs apps. Localized URL paths, canonical metadata, alternates, and sitemap entries are still generated by Astro, while non-English page content is translated at the edge by the translation Worker.

When updating localized behavior, check:

- Website source content under `apps/web/src`
- Documentation source content under `apps/docs/src`
- Edge translation logic under `apps/translation-worker/src`

## License

The source code is licensed under the GNU AFFERO GENERAL PUBLIC license. See the [LICENSE](LICENSE) file for details.
