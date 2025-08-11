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

## Automatic i18n

The website aims at having an automatic i18n done via various scripts in the `scripts` directory.

The [translations.tsx](./scripts/translations.tsx) script is used to translate the website content into the desired language. It has two methods to create translations, via `OpenAI API` or `Anthropic API`, and the other via `api.datpmt.com`. To use the OpenAI API method, make sure you have an `OPENAI_API_KEY` or `ANTHROPIC_API_KEY` as the environment variable set. To use the other API, just un-comment the `translateText` function call using it.

Now, let's say that you want to update translations or add a new locale, `fr`.

First, make sure to update the files `scripts/setup_new_locale.tsx` and `scripts/generate_locale_translations.tsx` to have the latest locale values as the following respectively.

```tsx
const newLocale = 'fr'
```

```tsx
const locales = ['fr']
```

Now to have translations generated for `fr`, you'd want to run:

- `bun run setup:new:locale`: This script copies the existing files in `src/pages` directory to `src/pages/fr` directory and makes sure to replace each reference to `content/blog` to `content/fr/blog`. Then, it copies the `src/content/blog` directory to `src/content/fr/blog` and makes sure to set `locale` frontmatter in each markdown file as `fr`. Then, it runs all the translation scripts mentioned below.
- `bun run generate:locale:translations`: This script uses the translate function to translate the `en.yml` key value pairs into the desired language, and creates a `fr.yml` file.
- `bun run generate:translation.ts`: This script uses all the `.yml` files in the `locales` directory to generate two files, `src/services/locale.ts` and `src/services/translation.ts` files with all the locales translations key value pair.
- `bun run generate:blog:translations`: This script uses all the `.md` files in the `src/content/blog` directory to generate the translated version of the file in the `src/content/fr/blog` directory.
- `bun run generate:plugin:translations`: This script uses all the `.md` files in the `src/content/plugins-tutorials` directory to generate the translated version of the file in the `src/content/fr/plugins-tutorials` directory.
