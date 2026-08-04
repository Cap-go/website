---
title: Versioning
description: "How Capgo versions plugins, the CLI, and the console — including Capacitor major alignment, API stability, LTS backports, and why you should always use the latest CLI."
sidebar:
  order: 1
---

import { Aside } from '@astrojs/starlight/components';

Capgo uses [semantic versioning (semver)](/semver_tester/) for plugins, the CLI, and the products we ship — the same practice we recommend for your own app bundles.

This page explains how those versions relate to each other, what stays compatible across majors, and how to pin older Capacitor majors with LTS tags.

## Quick rules

| Product | Major versioning | Compatibility notes |
| --- | --- | --- |
| Capgo plugins | Follow the matching **Capacitor major** | Plugin major `8` targets Capacitor 8, `7` targets Capacitor 7, and so on |
| Capgo CLI | **Independent** | Do not sync CLI major with plugins or Capacitor. Always use the latest CLI |
| Capgo Console | **Independent** | Own release cadence; compatible with supported updater plugin versions |

<Aside type="tip" title="Always use the latest CLI">
Run the CLI with `@latest` (for example `npx @capgo/cli@latest ...`). The CLI major does **not** need to match your plugin major or Capacitor major. The latest CLI works with any supported updater plugin version.
</Aside>

## Plugins follow Capacitor majors

Every Capgo plugin major tracks the Capacitor major it is built for:

- `@capgo/capacitor-updater@8` → Capacitor 8
- `@capgo/capacitor-updater@7` → Capacitor 7
- and the same pattern for other Capgo plugins

When Capacitor ships a new major, Capgo ships a matching plugin major. That is when we may change **default options** if a new default is the better long-term choice for that Capacitor generation.

### API stability across majors

Plugin APIs stay stable between majors unless a change is broken by design for everyone (for example a Capacitor platform requirement that forces the same break on all consumers). You should usually be able to move between Capgo plugin majors as you upgrade Capacitor without rewriting your integration.

Defaults may still change on a new major. Review release notes and migration guides (see [updater upgrades](/docs/plugins/updater/) and the guides under Migrations in the updater sidebar) when you bump.

## CLI and Console use their own versions

The Capgo CLI and Capgo Console do **not** share major versions with plugins or Capacitor.

- You do **not** need CLI major `8` because you are on Capacitor 8 or updater `8`.
- Always install or invoke the **latest** CLI.
- The latest CLI and Console remain compatible with any supported `@capgo/capacitor-updater` (and related updater) major.

Pinning an old CLI version is discouraged. Prefer:

```bash
npx @capgo/cli@latest bundle upload --channel=production
```

## LTS tags for previous plugin majors

When you stay on an older Capacitor major, install the matching Capgo plugin major with an LTS dist-tag instead of copying an outdated lockfile forever.

```bash
# Latest Capgo updater for Capacitor 7
npm i @capgo/capacitor-updater@lts-v7

# Same pattern for other majors
npm i @capgo/capacitor-updater@lts-v6
npm i @capgo/capacitor-updater@lts-v5
npm i @capgo/capacitor-updater@lts-v4
```

Outside the updater, LTS releases of previous plugin majors are published **on demand**.

### Updater backports vs other plugins

| Package | Previous-major backports |
| --- | --- |
| `@capgo/capacitor-updater` | Monthly mirrored backports to `v7` / `v6` / `v5` (`lts-v7`, `lts-v6`, `lts-v5`). `lts-v4` stays available for Capacitor 4 but is not on that monthly cadence |
| Other Capgo plugins | On demand |

### Same features, mirrored version numbers

LTS lines mirror the current latest line’s minor and patch when a backport exists.

If the latest release is `8.3.4`, the Capacitor 7 LTS line is published as `7.3.4` with the **same feature set and bug fixes**, adapted to that Capacitor major.

Install with the tag when you want “latest for this Capacitor major”:

```bash
npm i @capgo/capacitor-updater@lts-v7   # resolves to the current 7.x LTS, e.g. 7.3.4
```

### LTS is a backport of latest

After a new plugin major ships, an `lts-v7` (or `lts-v6`, …) release is a **backport of latest** so the same work runs on the previous Capacitor major.

Because it tracks latest, the LTS line’s public API **may change** when latest changes — even though the major number stays on `7`. Treat LTS as “current Capgo behavior on an older Capacitor,” not as a frozen legacy API forever.

## What this means for your app

1. Upgrade Capgo plugins when you upgrade Capacitor majors.
2. Always run `@capgo/cli@latest` — CLI major sync with Capacitor/plugins is unnecessary.
3. Stay on Capacitor 7 (or older)? Use `@lts-v7` (or the matching tag), not a random old `7.x` from months ago.
4. Version your own live-update bundles with [semver](/semver_tester/) the same way Capgo versions its packages. See [bundle versioning and channels](/docs/live-updates/channels/#bundle-versioning-and-channels) and [version targeting](/docs/live-updates/version-targeting/).

## Related docs

- [Add an app](/docs/getting-started/add-an-app/) — install commands and LTS tags for the updater
- [CLI overview](/docs/cli/) — how to run Capgo CLI commands
- [Native compatibility](/docs/live-updates/compatibility/) — when a change needs a store binary vs an OTA bundle
- [From V7 to V8](/docs/upgrade/from-v7-to-v8/) — example of a Capacitor-aligned plugin major upgrade
