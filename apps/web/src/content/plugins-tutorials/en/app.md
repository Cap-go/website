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

`bunx cap sync` copies the plugin's native code into your native projects. Run it again after every plugin upgrade.

## Import

```typescript
import { FirebaseApp } from '@capgo/capacitor-firebase-app';
```

## API at a glance

| Method | Description |
| --- | --- |
| `getName` | Get the name for this app. |
| `getOptions` | Get the configuration options for this app. |

## Examples

### `getName()`

Get the name for this app.

```typescript
import { FirebaseApp } from '@capgo/capacitor-firebase-app';

const result = await FirebaseApp.getName();
console.log(result);
```

### `getOptions()`

Get the configuration options for this app.

```typescript
import { FirebaseApp } from '@capgo/capacitor-firebase-app';

const result = await FirebaseApp.getOptions();
// The result holds sensitive values: use it without logging it.
```

## Full reference

- [GitHub repository](https://github.com/Cap-go/capacitor-firebase/tree/main/packages/app)
- [Documentation](/docs/plugins/firebase-app/)
- [API reference](/docs/plugins/firebase-app/getting-started/)

## Keep going from Using @capgo/capacitor-firebase-app

If you are using **Using @capgo/capacitor-firebase-app** to plan native plugin work, connect it with [Capgo Plugin Directory](/plugins/) for the product workflow in Capgo Plugin Directory, [Capacitor Plugins by Capgo](/docs/plugins/) for the implementation detail in Capacitor Plugins by Capgo, [Adding or Updating Plugins](/docs/contributing/adding-plugins/) for the implementation detail in Adding or Updating Plugins, [Ionic Enterprise Plugin Alternatives](/ionic-enterprise-plugins/) for the product workflow in Ionic Enterprise Plugin Alternatives, and [Capgo Native Builds](/native-build/) for the product workflow in Capgo Native Builds.
