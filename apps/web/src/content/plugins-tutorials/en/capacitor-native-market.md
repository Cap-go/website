---
locale: en
---
# Using @capgo/native-market

Capacitor Native Market Plugin for opening app store listings and pages.

## Install

```bash
bun add @capgo/native-market
bunx cap sync
```

## What This Plugin Exposes

- `openStoreListing` - Launch app listing page in Play Store (Android) or App Store (iOS).
- `openDevPage` - Deep-link directly to a developer's page in the Play Store. Android only.
- `openCollection` - Link users to a collection or top charts in the Play Store. Android only.
- `openEditorChoicePage` - Link users to Editor's choice page in the Play Store. Android only.

## Example Usage

### `openStoreListing`

Launch app listing page in Play Store (Android) or App Store (iOS).

```typescript
import { NativeMarket } from '@capgo/native-market';

// Open app in store
await NativeMarket.openStoreListing({
  appId: 'com.example.app'
});

// Open app in specific country store (iOS only)
await NativeMarket.openStoreListing({
  appId: 'com.example.app',
  country: 'IT'
});
```

### `openDevPage`

Deep-link directly to a developer's page in the Play Store. Android only.

```typescript
import { NativeMarket } from '@capgo/native-market';

await NativeMarket.openDevPage({
  devId: 'Google+LLC'
});
```

### `openCollection`

Link users to a collection or top charts in the Play Store. Android only.

```typescript
import { NativeMarket } from '@capgo/native-market';

await NativeMarket.openCollection({
  name: 'featured'
});
```

### `openEditorChoicePage`

Link users to Editor's choice page in the Play Store. Android only.

```typescript
import { NativeMarket } from '@capgo/native-market';

await NativeMarket.openEditorChoicePage({
  editorChoice: 'editorial_fitness_apps_us'
});
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-native-market/
- Docs: /docs/plugins/native-market/

## Keep going from Using @capgo/native-market

If you are using **Using @capgo/native-market** to plan store approval and distribution, connect it with [@capgo/native-market](/docs/plugins/native-market/) for the implementation detail in @capgo/native-market, [Getting Started](/docs/plugins/native-market/getting-started/) for the implementation detail in Getting Started, [@capgo/capacitor-in-app-review](/docs/plugins/in-app-review/) for the implementation detail in @capgo/capacitor-in-app-review, [Using @capgo/capacitor-in-app-review](/plugins/capacitor-in-app-review/) for the native capability in Using @capgo/capacitor-in-app-review, and [Capacitor OTA Updates: App Store Approval Guide](/blog/capacitor-ota-updates-app-store-approval-guide/) for the practical context in Capacitor OTA Updates: App Store Approval Guide.
