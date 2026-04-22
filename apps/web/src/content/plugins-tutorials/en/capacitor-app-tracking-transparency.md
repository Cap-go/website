---
locale: en
---
# Using @capgo/capacitor-app-tracking-transparency

Capacitor App Tracking Transparency Plugin.

## Install

```bash
bun add @capgo/capacitor-app-tracking-transparency
bunx cap sync
```

## What This Plugin Exposes

- `getStatus` - Gets the current tracking authorization status without prompting the user.
- `requestPermission` - Requests user authorization to access app-related data for tracking. Displays the native iOS tracking permission dialog.

## Example Usage

### `getStatus`

Gets the current tracking authorization status without prompting the user.

```typescript
import { AppTrackingTransparency } from '@capgo/capacitor-app-tracking-transparency';

const { status } = await AppTrackingTransparency.getStatus();
if (status === 'authorized') {
  console.log('Tracking is authorized');
}
```

### `requestPermission`

Requests user authorization to access app-related data for tracking. Displays the native iOS tracking permission dialog.

```typescript
import { AppTrackingTransparency } from '@capgo/capacitor-app-tracking-transparency';

const { status } = await AppTrackingTransparency.requestPermission();
switch (status) {
  case 'authorized':
    console.log('User authorized tracking');
    break;
  case 'denied':
    console.log('User denied tracking');
    break;
  case 'restricted':
    console.log('Tracking is restricted');
    break;
  case 'notDetermined':
    console.log('Status not determined');
    break;
}
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-app-tracking-transparency/
- Docs: /docs/plugins/app-tracking-transparency/
