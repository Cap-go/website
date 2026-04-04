# Agent Instructions

This repo uses Astro, Tailwind CSS v4, and `bun`.

## Package Manager

- Always use `bun` instead of `npm` or `yarn`.
- Always use `bunx` instead of `npx`.

## Tailwind CSS

- Always prefer the current Tailwind v4 canonical utility names.
- Do not introduce deprecated utility aliases when editing templates or styles.
- Example: prefer `bg-linear-to-r` over `bg-gradient-to-r`.

## Tailwind Migration Command

- When old Tailwind utility names need to be migrated, use the official upgrader:

```bash
bunx @tailwindcss/upgrade --force
```

- Use that command to fix deprecated class syntax across the repo instead of doing large manual replacements.

## Adding A Plugin To The Website

- Add the plugin registry entry in `src/config/plugins.ts` with the package name, title, short description, GitHub URL, and Heroicon name.
- Add the plugin docs in `src/content/docs/docs/plugins/<docs-slug>/index.mdx` and `src/content/docs/docs/plugins/<docs-slug>/getting-started.mdx`.
- Add the English tutorial in `src/content/plugins-tutorials/en/<tutorial-slug>.md`.
- The tutorial slug must match the GitHub URL slug used by `item.href` on the plugin entry because `/plugins/[slug]` resolves from that repo slug. Examples:
  `https://github.com/Cap-go/capacitor-live-activities/` -> `src/content/plugins-tutorials/en/capacitor-live-activities.md`
  `https://github.com/Cap-go/electron-updater/` -> `src/content/plugins-tutorials/en/electron-updater.md`
- Register the docs in `astro.config.mjs` by extending `additionalPluginDocs` when the plugin should appear in the Starlight plugin sidebar and search sets.
- Refresh metadata after adding a plugin with `bun run fetch:stars` and `bun run fetch:downloads`.
- Validate the change with `bunx prettier --write <touched-files>` and `NODE_OPTIONS=--max-old-space-size=16384 ./node_modules/.bin/astro check`.
