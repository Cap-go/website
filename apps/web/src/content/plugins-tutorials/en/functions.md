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

`bunx cap sync` copies the native code into your iOS and Android projects. Run it again after every plugin upgrade.

## Import

```typescript
import { FirebaseFunctions } from '@capgo/capacitor-firebase-functions';
```

## API at a glance

| Method | Description |
| --- | --- |
| `callByName` | Call a callable function by name. |
| `callByUrl` | Call a callable function by URL. |
| `useEmulator` | Instrument your app to talk to the Cloud Functions emulator. |

## Examples

### `callByName()`

Call a callable function by name.

```typescript
import { FirebaseFunctions } from '@capgo/capacitor-firebase-functions';

const result = await FirebaseFunctions.callByName({ name: 'myFunction' });
console.log(result);
```

### `callByUrl()`

Call a callable function by URL.

```typescript
import { FirebaseFunctions } from '@capgo/capacitor-firebase-functions';

const result = await FirebaseFunctions.callByUrl({
  url: 'https://us-central1-my-project.cloudfunctions.net/myFunction',
});
console.log(result);
```

### `useEmulator()`

Instrument your app to talk to the Cloud Functions emulator.

```typescript
import { FirebaseFunctions } from '@capgo/capacitor-firebase-functions';

await FirebaseFunctions.useEmulator({ host: "127.0.0.1" });
```

## Full reference

- [GitHub repository](https://github.com/Cap-go/capacitor-firebase/tree/main/packages/functions)
- [Documentation](/docs/plugins/firebase-functions/)
- [API reference](/docs/plugins/firebase-functions/getting-started/)

## Keep going from Using @capgo/capacitor-firebase-functions

If you are using **Using @capgo/capacitor-firebase-functions** to plan native plugin work, connect it with [Capgo Plugin Directory](/plugins/) for the product workflow in Capgo Plugin Directory, [Capacitor Plugins by Capgo](/docs/plugins/) for the implementation detail in Capacitor Plugins by Capgo, [Adding or Updating Plugins](/docs/contributing/adding-plugins/) for the implementation detail in Adding or Updating Plugins, [Ionic Enterprise Plugin Alternatives](/ionic-enterprise-plugins/) for the product workflow in Ionic Enterprise Plugin Alternatives, and [Capgo Native Builds](/native-build/) for the product workflow in Capgo Native Builds.
