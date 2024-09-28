# Capgo website

 <a href="https://capgo.app/"><img src='https://raw.githubusercontent.com/Cap-go/capgo/main/assets/capgo_banner.png' alt='Capgo - Instant updates for capacitor'/></a>
[![Discord](https://badgen.net/badge/icon/discord?icon=discord&label)](https://discord.com/invite/VnYRvBfgA6)
<a href="https://discord.com/invite/VnYRvBfgA6"><img src="https://img.shields.io/discord/912707985829163099?color=%237289DA&label=Discord" alt="Discord">
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

This is the source code for the Capgo website. It is built using [Astro](https://astro.build/), a new static site generator.

## Development

To start the development server, run:

```sh
bun install
bun run dev
```

## Deployment

The website is deployed to [Cloudflare Pages](https://pages.cloudflare.com/). The deployment is automated using a GitHub action.

## License

The source code is licensed under the GNU AFFERO GENERAL PUBLIC license. See the [LICENSE](LICENSE) file for details.

# Astro Starter Kit: Basics

```
npm create astro@latest -- --template basics
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/basics/)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/basics/)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro/?devcontainer_path=.devcontainer/basics/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

![just-the-basics](https://github.com/withastro/astro/assets/2244813/a0a5533c-a856-4198-8470-2d67b1d7c554/)

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   └── Card.astro
│   ├── layouts/
│   │   └── Layout.astro
│   └── pages/
│       └── index.astro
└── package.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `bun install`             | Installs dependencies                            |
| `bun run dev`             | Starts local dev server at `localhost:3000`      |
| `bun run build`           | Build your production site to `./dist/`          |
| `bun run preview`         | Preview your build locally, before deploying     |
| `bun run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `bun run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build/) or jump into our [Discord server](https://astro.build/chat/).
