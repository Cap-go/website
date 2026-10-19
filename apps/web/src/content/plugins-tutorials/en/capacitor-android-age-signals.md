---
locale: en
---
# Using @capgo/capacitor-android-age-signals

Capacitor interface for retrieving Play Age Signals.

## Install

```bash
bun add @capgo/capacitor-android-age-signals
bunx cap sync
```

`bunx cap sync` copies the plugin's native code into your native projects. Run it again after every plugin upgrade.

## Import

```typescript
import { AgeSignals } from '@capgo/capacitor-android-age-signals';
```

## API at a glance

| Method | Description |
| --- | --- |
| `checkAgeSignals` | Request the current Play Age Signals for the active user. |

## Examples

### `checkAgeSignals()`

Request the current Play Age Signals for the active user.

```typescript
import { AgeSignals } from '@capgo/capacitor-android-age-signals';

const result = await AgeSignals.checkAgeSignals();
console.log(result);
```

## Full reference

- [GitHub repository](https://github.com/Cap-go/capacitor-android-age-signals/)
- [Documentation](/docs/plugins/age-signals/)
- [API reference](/docs/plugins/age-signals/getting-started/)

## Keep going from Using @capgo/capacitor-android-age-signals

If you are using **Using @capgo/capacitor-android-age-signals** to plan native plugin work, connect it with [Capgo Plugin Directory](/plugins/) for the product workflow in Capgo Plugin Directory, [Capacitor Plugins by Capgo](/docs/plugins/) for the implementation detail in Capacitor Plugins by Capgo, [Adding or Updating Plugins](/docs/contributing/adding-plugins/) for the implementation detail in Adding or Updating Plugins, [Ionic Enterprise Plugin Alternatives](/ionic-enterprise-plugins/) for the product workflow in Ionic Enterprise Plugin Alternatives, and [Capgo Native Builds](/native-build/) for the product workflow in Capgo Native Builds.
