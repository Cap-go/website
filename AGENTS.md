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

## Social Meta Images

- Do not switch Open Graph or Twitter/X social meta images to `webp`; use `png` or `jpg`/`jpeg` for those assets and tags.

## Adding A Plugin To The Website

- Add the plugin registry entry in `apps/web/src/config/plugins.ts` inside `actionDefinitionRows` with the package name, title, short description, and GitHub URL.
- Add the plugin docs in `apps/docs/src/content/docs/docs/plugins/<docs-slug>/index.mdx` and `apps/docs/src/content/docs/docs/plugins/<docs-slug>/getting-started.mdx`.
- Add the English tutorial in `apps/web/src/content/plugins-tutorials/en/<tutorial-slug>.md`.
- The tutorial slug must match the GitHub URL slug used by `item.href` on the plugin entry because `/plugins/[slug]` resolves from that repo slug. Examples:
  `https://github.com/Cap-go/capacitor-live-activities/` -> `apps/web/src/content/plugins-tutorials/en/capacitor-live-activities.md`
  `https://github.com/Cap-go/electron-updater/` -> `apps/web/src/content/plugins-tutorials/en/electron-updater.md`
- Register documented plugins in `apps/docs/src/config/sidebar.mjs` so they appear in the Starlight plugin sidebar.
- Register documented plugins in `apps/docs/src/config/llmsCustomSets.ts` so they appear in the docs search and LLM sets.
- Refresh metadata after adding a plugin with `bun run fetch:stars` and `bun run fetch:downloads`.
- Validate the change with `bunx prettier --write <touched-files>` and `NODE_OPTIONS=--max-old-space-size=16384 bunx astro check` in both `apps/web` and `apps/docs`, or `bun run check` from the repo root.
