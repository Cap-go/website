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

`bunx cap sync` copies the plugin's native code into your native projects. Run it again after every plugin upgrade.

## Import

```typescript
import { FirebaseRemoteConfig } from '@capgo/capacitor-firebase-remote-config';
```

## API at a glance

| Method | Description |
| --- | --- |
| `activate` | Make the last fetched configuration available to the getters. |
| `fetchAndActivate` | Perform fetch and activate operations. |
| `fetchConfig` | Fetch and cache configuration from the Remote Config service. |
| `getBoolean` | Get the value for the given key as a boolean. |
| `getNumber` | Get the value for the given key as a number. |
| `getString` | Get the value for the given key as a string. |
| `getAll` | Get all the values from the Remote Config service. |
| `getInfo` | Get information about the last fetch operation. |
| `setMinimumFetchInterval` | Set the minimum fetch interval. |
| `setDefaults` | Sets config defaults for parameter keys and values in the default namespace config. |
| `setSettings` | Set the remote config settings. |
| `addConfigUpdateListener` | Add a listener for the config update event. |
| `removeConfigUpdateListener` | Remove a listener for the config update event. |

## Examples

### `activate()`

Make the last fetched configuration available to the getters.

```typescript
import { FirebaseRemoteConfig } from '@capgo/capacitor-firebase-remote-config';

await FirebaseRemoteConfig.activate();
```

### `fetchAndActivate()`

Perform fetch and activate operations.

```typescript
import { FirebaseRemoteConfig } from '@capgo/capacitor-firebase-remote-config';

await FirebaseRemoteConfig.fetchAndActivate();
```

### `fetchConfig()`

Fetch and cache configuration from the Remote Config service.

```typescript
import { FirebaseRemoteConfig } from '@capgo/capacitor-firebase-remote-config';

await FirebaseRemoteConfig.fetchConfig();
```

### `getBoolean()`

Get the value for the given key as a boolean.

```typescript
import { FirebaseRemoteConfig } from '@capgo/capacitor-firebase-remote-config';

const result = await FirebaseRemoteConfig.getBoolean({ key: 'key-123' });
console.log(result);
```

### `getNumber()`

Get the value for the given key as a number.

```typescript
import { FirebaseRemoteConfig } from '@capgo/capacitor-firebase-remote-config';

const result = await FirebaseRemoteConfig.getNumber({ key: 'key-123' });
console.log(result);
```

### `getString()`

Get the value for the given key as a string.

```typescript
import { FirebaseRemoteConfig } from '@capgo/capacitor-firebase-remote-config';

const result = await FirebaseRemoteConfig.getString({ key: 'key-123' });
console.log(result);
```

The table above lists the 13 core methods. Listener and version helpers, and the full contract of each method, are documented in the [GitHub repository](https://github.com/Cap-go/capacitor-firebase/tree/main/packages/remote-config).

## Full reference

- [GitHub repository](https://github.com/Cap-go/capacitor-firebase/tree/main/packages/remote-config)
- [Documentation](/docs/plugins/firebase-remote-config/)
- [API reference](/docs/plugins/firebase-remote-config/getting-started/)

## Keep going from Using @capgo/capacitor-firebase-remote-config

If you are using **Using @capgo/capacitor-firebase-remote-config** to plan native plugin work, connect it with [Capgo Plugin Directory](/plugins/) for the product workflow in Capgo Plugin Directory, [Capacitor Plugins by Capgo](/docs/plugins/) for the implementation detail in Capacitor Plugins by Capgo, [Adding or Updating Plugins](/docs/contributing/adding-plugins/) for the implementation detail in Adding or Updating Plugins, [Ionic Enterprise Plugin Alternatives](/ionic-enterprise-plugins/) for the product workflow in Ionic Enterprise Plugin Alternatives, and [Capgo Native Builds](/native-build/) for the product workflow in Capgo Native Builds.
