---
locale: en
---
# Using @capgo/capacitor-firebase-remote-config

Capacitor plugin for Firebase Remote Config.

## Install

```bash
bun add @capgo/capacitor-firebase-remote-config
bunx cap sync
```

## What This Plugin Exposes

- `activate` - Make the last fetched configuration available to the getters.
- `fetchAndActivate` - Perform fetch and activate operations.
- `fetchConfig` - Fetch and cache configuration from the Remote Config service.
- `getBoolean` - Get the value for the given key as a boolean.

## Example Usage

### `activate`

Make the last fetched configuration available to the getters.

```typescript
import { FirebaseRemoteConfig } from '@capgo/capacitor-firebase-remote-config';

await FirebaseRemoteConfig.activate();
```

### `fetchAndActivate`

Perform fetch and activate operations.

```typescript
import { FirebaseRemoteConfig } from '@capgo/capacitor-firebase-remote-config';

await FirebaseRemoteConfig.fetchAndActivate();
```

### `fetchConfig`

Fetch and cache configuration from the Remote Config service.

```typescript
import { FirebaseRemoteConfig } from '@capgo/capacitor-firebase-remote-config';

await FirebaseRemoteConfig.fetchConfig();
```

### `getBoolean`

Get the value for the given key as a boolean.

```typescript
import { FirebaseRemoteConfig } from '@capgo/capacitor-firebase-remote-config';

await FirebaseRemoteConfig.getBoolean({} as GetBooleanOptions);
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-firebase/tree/main/packages/remote-config
- Docs: /docs/plugins/firebase-remote-config/
