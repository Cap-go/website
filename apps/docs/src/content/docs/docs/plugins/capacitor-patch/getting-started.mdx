---
title: Getting Started
description: Install @capgo/capacitor-patch and apply selected Capacitor patch IDs during sync and update.
sidebar:
  order: 2
---

import { Steps, Aside } from '@astrojs/starlight/components';

## Install

You can use our AI-Assisted Setup to install the plugin. Add the Capgo skills to your AI tool using the following command:

```bash
npx skills add https://github.com/Cap-go/capgo-skills --skill capacitor-plugins
```

Then use the following prompt:

```text
Use the `capacitor-plugins` skill from `Cap-go/capgo-skills` to install the `@capgo/capacitor-patch` plugin in my project.
```

If you prefer Manual Setup, install the plugin by running the following commands and follow the platform-specific instructions below:

```bash
npm install @capgo/capacitor-patch
npx cap sync
```

The package is a no-op until you select patches in your Capacitor config.

## Select patch IDs

List all shipped patches:

```bash
npx capgo-capacitor-patch list --all
```

Then add the patch IDs your app needs to `capacitor.config.ts`:

```ts
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'Example',
  webDir: 'dist',
  plugins: {
    CapacitorPatch: {
      patches: ['upstream-pr-8418-android'],
      strict: true,
    },
  },
};

export default config;
```

Run sync again:

```bash
npx cap sync
```

Package patches run before `sync` and `update`. Native project patches run after `sync` and `update`.

## Dry-run before applying

Use `doctor` to check whether selected patches match your installed package versions:

```bash
npx capgo-capacitor-patch doctor --phase package --strict
```

Use `apply` when you want to run the selected patches manually:

```bash
npx capgo-capacitor-patch apply --phase package
```

## Configuration options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `recommended` | `boolean` | `false` | Applies patches Capgo marks as recommended. |
| `patches` | `string[]` | `[]` | Applies explicit patch IDs. |
| `disabled` | `string[]` | `[]` | Skips selected patch IDs, even when recommended. |
| `strict` | `boolean` | `false` | Throws when a selected patch is incompatible or cannot apply. |

<Aside type="tip">
  Prefer explicit `patches` for production apps so the applied fixes are visible in code review.
</Aside>

## CLI commands

```bash
npx capgo-capacitor-patch list --all
npx capgo-capacitor-patch doctor
npx capgo-capacitor-patch apply
```

Useful options:

- `--root <dir>` sets the app root.
- `--phase package|native|all` limits which patch phase runs.
- `--platform ios|android` applies platform filtering outside a Capacitor hook.
- `--strict` treats selected patch failures as errors.

## Workflow

<Steps>
1. Install `@capgo/capacitor-patch`.
2. Run `npx capgo-capacitor-patch list --all`.
3. Add the selected patch IDs to `plugins.CapacitorPatch.patches`.
4. Run `npx capgo-capacitor-patch doctor --strict`.
5. Run `npx cap sync`.
</Steps>

When a selected patch targets `@capacitor/cli`, the patch applies to the installed CLI package and the next `cap` command uses the patched CLI code.

## Keep going from Getting Started

If you are using **Getting Started** to plan native plugin work, connect it with [Using @capgo/capacitor-patch](/plugins/capacitor-patch/) for the native capability in Using @capgo/capacitor-patch, [Capgo Plugin Directory](/plugins/) for the product workflow in Capgo Plugin Directory, [Capacitor Plugins by Capgo](/docs/plugins/) for the implementation detail in Capacitor Plugins by Capgo, [Adding or Updating Plugins](/docs/contributing/adding-plugins/) for the implementation detail in Adding or Updating Plugins, and [Ionic Enterprise Plugin Alternatives](/ionic-enterprise-plugins/) for the product workflow in Ionic Enterprise Plugin Alternatives.
