---
locale: en
---
# Using @capgo/capacitor-firebase-app

Capacitor plugin for Firebase App.

## Install

```bash
bun add @capgo/capacitor-firebase-app
bunx cap sync
```

## What This Plugin Exposes

- `getName` - Get the name for this app.
- `getOptions` - Get the configuration options for this app.

## Example Usage

### `getName`

Get the name for this app.

```typescript
import { FirebaseApp } from '@capgo/capacitor-firebase-app';

await FirebaseApp.getName();
```

### `getOptions`

Get the configuration options for this app.

```typescript
import { FirebaseApp } from '@capgo/capacitor-firebase-app';

await FirebaseApp.getOptions();
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-firebase/tree/main/packages/app
- Docs: /docs/plugins/firebase-app/

## Keep going from Using @capgo/capacitor-firebase-app

If you are using **Using @capgo/capacitor-firebase-app** to plan native plugin work, connect it with [Capgo Plugin Directory](/plugins/) for the product workflow in Capgo Plugin Directory, [Capacitor Plugins by Capgo](/docs/plugins/) for the implementation detail in Capacitor Plugins by Capgo, [Adding or Updating Plugins](/docs/contributing/adding-plugins/) for the implementation detail in Adding or Updating Plugins, [Ionic Enterprise Plugin Alternatives](/ionic-enterprise-plugins/) for the product workflow in Ionic Enterprise Plugin Alternatives, and [Capgo Native Builds](/native-build/) for the product workflow in Capgo Native Builds.
