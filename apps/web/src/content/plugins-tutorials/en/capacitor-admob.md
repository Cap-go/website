---
locale: en
---
# Using @capgo/capacitor-admob

AdMob Plus Plugin interface for displaying Google AdMob ads in Capacitor apps.

## Install

```bash
bun add @capgo/capacitor-admob
bunx cap sync
```

`bunx cap sync` copies the native code into your iOS and Android projects. Run it again after every plugin upgrade.

## Import

```typescript
import { AdMob } from '@capgo/capacitor-admob';
```

## API at a glance

| Method | Description |
| --- | --- |
| `start` | Initialize and start the AdMob SDK. |
| `configure` | Configure AdMob settings. |
| `configRequest` | Configure ad request settings. |
| `adCreate` | Create a new ad instance. |
| `adIsLoaded` | Check if an ad is loaded and ready to be shown. |
| `adLoad` | Load an ad. |
| `adShow` | Show a loaded ad. |
| `adHide` | Hide a currently displayed ad. |
| `trackingAuthorizationStatus` | Get the current tracking authorization status (iOS only). |
| `requestTrackingAuthorization` | Request tracking authorization from the user (iOS only). |

## Examples

### `start()`

Initialize and start the AdMob SDK.

```typescript
import { AdMob } from '@capgo/capacitor-admob';

await AdMob.start();
```

### `configure()`

Configure AdMob settings.

```typescript
import { AdMob } from '@capgo/capacitor-admob';

await AdMob.configure({
  appMuted: false,
  appVolume: 0.5
});
```

### `configRequest()`

Configure ad request settings.

```typescript
import { AdMob } from '@capgo/capacitor-admob';

await AdMob.configRequest({
  maxAdContentRating: MaxAdContentRating.PG,
  tagForChildDirectedTreatment: true,
  testDeviceIds: ['test-device-id']
});
```

### `adCreate()`

Create a new ad instance.

```typescript
import { AdMob } from '@capgo/capacitor-admob';

await AdMob.adCreate({
  adUnitId: 'ca-app-pub-3940256099942544/1033173712'
});
```

### `adIsLoaded()`

Check if an ad is loaded and ready to be shown.

```typescript
import { AdMob } from '@capgo/capacitor-admob';

const isLoaded = await AdMob.adIsLoaded({ id: 1 });
if (isLoaded) {
  await AdMob.adShow({ id: 1 });
}
```

### `adLoad()`

Load an ad.

```typescript
import { AdMob } from '@capgo/capacitor-admob';

await AdMob.adLoad({ id: 1 });
```

The [API reference](/docs/plugins/admob/getting-started/) covers the other 4 methods.

## Listen to events

`addListener` returns a handle. Call `handle.remove()` when the screen unmounts, or `AdMob.removeAllListeners()` to clear every listener.

## Full reference

- [GitHub repository](https://github.com/Cap-go/capacitor-admob/)
- [Documentation](/docs/plugins/admob/)
- [API reference](/docs/plugins/admob/getting-started/)

## Keep going from Using @capgo/capacitor-admob

If you are using **Using @capgo/capacitor-admob** to plan native plugin work, connect it with [@capgo/capacitor-admob](/docs/plugins/admob/) for the implementation detail in @capgo/capacitor-admob, [Getting Started](/docs/plugins/admob/getting-started/) for the implementation detail in Getting Started, [Capgo Plugin Directory](/plugins/) for the product workflow in Capgo Plugin Directory, [Capacitor Plugins by Capgo](/docs/plugins/) for the implementation detail in Capacitor Plugins by Capgo, and [Adding or Updating Plugins](/docs/contributing/adding-plugins/) for the implementation detail in Adding or Updating Plugins.
