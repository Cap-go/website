# Tailwind Capacitor registry snapshot

Runtime build output still lives in `tailwind-capacitor-snapshot/` (gitignored). A committed vendor copy lives in `apps/web/vendor/tailwind-capacitor-registry-snapshot/`.

`bun run sync:tailwind-capacitor-registry` (also run by `bun run build:web`):

1. Hydrates `tailwind-capacitor-snapshot/` from the vendor tree when the pin matches `apps/shared/config/tailwindCapacitorRegistry.ts`.
2. Skips network when an existing snapshot already matches the pin.
3. Fetches from GitHub only on a pin bump or when `TC_REGISTRY_FORCE_SYNC=1`.

After a network sync, the script refreshes the vendor tree so deploys survive a raw GitHub outage.

The pinned commit lives in `apps/shared/config/tailwindCapacitorRegistry.ts`. Demo-only shell styles live in `apps/web/src/styles/tailwind-capacitor-demo-shell.css`.