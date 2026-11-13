# Tailwind Capacitor registry snapshot

The directory `tailwind-capacitor-snapshot/` is generated locally and in CI. It is listed in `.gitignore`.

Run from the repo root:

```bash
bun run sync:tailwind-capacitor-registry
```

The pinned commit lives in `apps/shared/config/tailwindCapacitorRegistry.ts`. `bun run build:web` runs sync automatically before the Astro build.

Demo-only shell styles that are not part of the upstream registry live in `apps/web/src/styles/tailwind-capacitor-demo-shell.css`.
