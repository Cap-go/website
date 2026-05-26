---
locale: en
---
# Using @capgo/capacitor-patch

Apply selected Capacitor fixes from a version-gated patch catalog during `cap sync` and `cap update`.

## Install

```bash
npm install @capgo/capacitor-patch
npx cap sync
```

## List available patches

```bash
npx capgo-capacitor-patch list --all
```

The catalog includes patch IDs, target packages, supported Capacitor versions, and links back to upstream Capacitor PRs.

## Select patches in Capacitor config

```typescript
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

## Dry-run and sync

```bash
npx capgo-capacitor-patch doctor --phase package --strict
npx cap sync
```

Package patches run before `sync` and `update`. Native project patches run after `sync` and `update`.

## Configuration

- `patches` - explicit patch IDs to apply.
- `recommended` - apply patches Capgo marks as recommended.
- `disabled` - skip a selected patch ID.
- `strict` - fail when a selected patch is incompatible or cannot apply.

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-patch/
- Docs: /docs/plugins/capacitor-patch/

## Keep going from Using @capgo/capacitor-patch

If you are using **Using @capgo/capacitor-patch** to plan native plugin work, connect it with [@capgo/capacitor-patch](/docs/plugins/capacitor-patch/) for the implementation detail in @capgo/capacitor-patch, [Capgo Plugin Directory](/plugins/) for the product workflow in Capgo Plugin Directory, [Capacitor Plugins by Capgo](/docs/plugins/) for the implementation detail in Capacitor Plugins by Capgo, [Adding or Updating Plugins](/docs/contributing/adding-plugins/) for the implementation detail in Adding or Updating Plugins, and [Ionic Enterprise Plugin Alternatives](/ionic-enterprise-plugins/) for the product workflow in Ionic Enterprise Plugin Alternatives.
