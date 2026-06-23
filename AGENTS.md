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

## Plugin Count Copy

- Never hardcode the number of Capgo plugins in text, marketing copy, docs, or UI.
- Use the real registry-derived count from `apps/web/src/config/plugins.ts` (`pluginCount` or `pluginCountLabel`) anywhere code can import it.
- In Markdown or static content that cannot import the registry value, avoid stating a plugin count and link to the live plugin directory instead.

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

## Visual Diff For PRs

Use the visual diff tool whenever a PR changes page layout, styling, components, or marketing copy that affects rendered HTML.

### When To Run

- **Before starting visual work:** capture a `before` baseline from `main` (or the PR base branch).
- **Before opening the PR:** capture `after`, compare, and paste the report into the PR description.
- **After each new push** to the PR when the author or reviewer asked for visual verification: rebuild, re-capture `after`, re-compare, and post an updated report as a new PR comment.

### Setup (once per machine)

```bash
bun install
bun run visual-diff:setup
```

Requires ImageMagick (`compare` CLI) for pixel diffs.

### Workflow

```bash
# 1. Baseline (on main or base branch, before your changes)
bun run build
bun run visual-diff:capture:before

# 2. After your visual changes
bun run build
bun run visual-diff:capture:after

# 3. Compare + PR markdown
bun run visual-diff:compare
bun run visual-diff:report
```

Paste the `## Visual diff` section from `bun run visual-diff:report` into the PR description. On follow-up pushes with visual changes, run steps 2–3 again and post the updated markdown in a new comment.

### Focused captures

Default routes live in `visual-diff.config.json`. Override for a targeted PR:

```bash
bun run visual-diff:capture:before -- --suite web --routes /,/pricing/
bun run visual-diff:capture:after -- --suite web --routes /,/pricing/
```

### Agent checklist

1. Confirm the PR includes visual/UI changes (or the user explicitly requested visual verification).
2. Run the workflow above before marking the PR ready.
3. Include the visual diff markdown in the PR body.
4. After subsequent pushes that change visuals, re-run `capture:after`, `compare`, and `report`; post the fresh results.
5. Do not commit `.visual-diff/` artifacts — they are gitignored.
