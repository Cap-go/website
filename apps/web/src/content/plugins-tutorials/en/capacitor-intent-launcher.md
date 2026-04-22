---
locale: en
---
# Using @capgo/capacitor-intent-launcher

Capacitor Intent Launcher Plugin for launching Android intents and opening system settings on both Android and iOS.

## Install

```bash
bun add @capgo/capacitor-intent-launcher
bunx cap sync
```

## What This Plugin Exposes

- `startActivityAsync` - Starts an Android activity for the given action.
- `openIOSSettings` - Opens iOS settings screen.
- `openApplication` - Opens an application by its package name.
- `getApplicationIconAsync` - Gets the application icon as a base64-encoded PNG string.

## Example Usage

### `startActivityAsync`

Starts an Android activity for the given action.

```typescript
import { IntentLauncher } from '@capgo/capacitor-intent-launcher';

// Open location settings
const result = await IntentLauncher.startActivityAsync({
  action: ActivityAction.LOCATION_SOURCE_SETTINGS
});

// Open a specific app settings
const result = await IntentLauncher.startActivityAsync({
  action: ActivityAction.APPLICATION_DETAILS_SETTINGS,
  data: 'package:com.example.app'
});
```

### `openIOSSettings`

Opens iOS settings screen.

```typescript
import { IntentLauncher } from '@capgo/capacitor-intent-launcher';

// Open app settings (recommended - officially supported by Apple)
await IntentLauncher.openIOSSettings({ option: IOSSettings.App });

// Open WiFi settings (may not work in all iOS versions)
await IntentLauncher.openIOSSettings({ option: IOSSettings.WiFi });
```

### `openApplication`

Opens an application by its package name.

```typescript
import { IntentLauncher } from '@capgo/capacitor-intent-launcher';

// Open Gmail app
await IntentLauncher.openApplication({ packageName: 'com.google.android.gm' });
```

### `getApplicationIconAsync`

Gets the application icon as a base64-encoded PNG string.

```typescript
import { IntentLauncher } from '@capgo/capacitor-intent-launcher';

const { icon } = await IntentLauncher.getApplicationIconAsync({
  packageName: 'com.google.android.gm'
});
if (icon) {
  const img = document.createElement('img');
  img.src = icon;
}
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-intent-launcher/
- Docs: /docs/plugins/intent-launcher/
