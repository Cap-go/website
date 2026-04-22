---
locale: en
---
# Using @capgo/capacitor-firebase-functions

Capacitor plugin for Firebase Cloud Functions.

## Install

```bash
bun add @capgo/capacitor-firebase-functions
bunx cap sync
```

## What This Plugin Exposes

- `callByName` - Call a callable function by name.
- `callByUrl` - Call a callable function by URL.
- `useEmulator` - Instrument your app to talk to the Cloud Functions emulator.

## Example Usage

### `callByName`

Call a callable function by name.

```typescript
import { FirebaseFunctions } from '@capgo/capacitor-firebase-functions';

await FirebaseFunctions.callByName({} as CallByNameOptions<RequestData>);
```

### `callByUrl`

Call a callable function by URL.

```typescript
import { FirebaseFunctions } from '@capgo/capacitor-firebase-functions';

await FirebaseFunctions.callByUrl({} as CallByUrlOptions<RequestData>);
```

### `useEmulator`

Instrument your app to talk to the Cloud Functions emulator.

```typescript
import { FirebaseFunctions } from '@capgo/capacitor-firebase-functions';

await FirebaseFunctions.useEmulator({} as UseEmulatorOptions);
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-firebase/tree/main/packages/functions
- Docs: /docs/plugins/firebase-functions/
