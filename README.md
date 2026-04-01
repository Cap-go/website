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

This is the source code for the Capgo website, built with [Astro](https://astro.build/).

## Documentation

- Live docs: https://capgo.app/docs/
- Source files: `src/content/docs/docs` (English) and `src/content/docs/<locale>/docs` (localized)

## Development

To start the development server, run:

```sh
bun install
bun run dev
```

## Deployment

The website runs as a [Cloudflare Worker](https://developers.cloudflare.com/workers/). Deployments are handled with [`wrangler deploy`](https://developers.cloudflare.com/workers/wrangler/commands/#deploy), driven by the `wrangler.toml` configuration in this repo.

## License

The source code is licensed under the GNU AFFERO GENERAL PUBLIC license. See the [LICENSE](LICENSE) file for details.

## 🚀 Project Structure

Key folders and files in this repo:

```
/
├── public/
├── src/
│   ├── components/
│   ├── content/
│   │   ├── docs/              # Capgo documentation content (console guides, plugin docs, how-tos)
│   │   ├── blog/              # Blog posts by locale
│   │   ├── plugins-tutorials/ # Plugin tutorials by locale
│   │   └── i18n/              # Starlight UI translations
│   ├── layouts/
│   ├── pages/                 # Marketing pages + JSON endpoints
│   ├── assets/
│   ├── css/
│   ├── config/
│   └── content.config.ts      # Content collections config
├── messages/                  # English source copy
└── package.json
```

Astro routes live in `src/pages/`. The docs site is powered by Starlight and content collections from `src/content`.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `bun install`             | Installs dependencies                            |
| `bun run dev`             | Starts local dev server at `localhost:3000`      |
| `bun run build`           | Build your production site to `./dist/`          |
| `bun run preview`         | Preview your build locally, before deploying     |
| `bun run preview:worker`  | Run the Worker locally via `wrangler dev`        |
| `bun run deploy`          | Build and deploy the Worker to Cloudflare        |
| `bun run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `bun run astro -- --help` | Get help using the Astro CLI                     |

## Dynamic Translation

The site keeps English source content in the repo and relies on the Cloudflare Worker layer to serve cached translated HTML for locale-prefixed URLs on demand.
