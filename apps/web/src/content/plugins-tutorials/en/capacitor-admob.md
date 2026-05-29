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

## What This Plugin Exposes

- `start` - Initialize and start the AdMob SDK.
- `configure` - Configure AdMob settings.
- `configRequest` - Configure ad request settings.
- `adCreate` - Create a new ad instance.

## Example Usage

### `start`

Initialize and start the AdMob SDK.

```typescript
import { AdMob } from '@capgo/capacitor-admob';

await AdMob.start();
```

### `configure`

Configure AdMob settings.

```typescript
import { AdMob } from '@capgo/capacitor-admob';

await AdMob.configure({
  appMuted: false,
  appVolume: 0.5
});
```

### `configRequest`

Configure ad request settings.

```typescript
import { AdMob } from '@capgo/capacitor-admob';

await AdMob.configRequest({
  maxAdContentRating: MaxAdContentRating.PG,
  tagForChildDirectedTreatment: true,
  testDeviceIds: ['test-device-id']
});
```

### `adCreate`

Create a new ad instance.

```typescript
import { AdMob } from '@capgo/capacitor-admob';

await AdMob.adCreate({
  adUnitId: 'ca-app-pub-3940256099942544/1033173712'
});
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-admob/
- Docs: /docs/plugins/admob/

## Keep going from Using @capgo/capacitor-admob

If you are using **Using @capgo/capacitor-admob** to plan native plugin work, connect it with [@capgo/capacitor-admob](/docs/plugins/admob/) for the implementation detail in @capgo/capacitor-admob, [Getting Started](/docs/plugins/admob/getting-started/) for the implementation detail in Getting Started, [Capgo Plugin Directory](/plugins/) for the product workflow in Capgo Plugin Directory, [Capacitor Plugins by Capgo](/docs/plugins/) for the implementation detail in Capacitor Plugins by Capgo, and [Adding or Updating Plugins](/docs/contributing/adding-plugins/) for the implementation detail in Adding or Updating Plugins.
