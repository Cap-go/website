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
