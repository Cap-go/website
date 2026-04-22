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
