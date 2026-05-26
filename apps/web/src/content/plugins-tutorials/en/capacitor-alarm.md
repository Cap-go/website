---
locale: en
---
# Using @capgo/capacitor-alarm

Capacitor Alarm Plugin interface for managing native OS alarms.

## Install

```bash
bun add @capgo/capacitor-alarm
bunx cap sync
```

## What This Plugin Exposes

- `createAlarm` - Create a native OS alarm using the platform clock app. On Android this uses the Alarm Clock intent; on iOS this uses AlarmKit if available (iOS 16+).
- `openAlarms` - Open the platform's native alarm list UI, if available.
- `getOSInfo` - Get information about the OS and capabilities.
- `requestPermissions` - Request relevant permissions for alarm usage on the platform. On Android, may route to settings for exact alarms.

## Example Usage

### `createAlarm`

Create a native OS alarm using the platform clock app. On Android this uses the Alarm Clock intent; on iOS this uses AlarmKit if available (iOS 16+).

```typescript
import { CapgoAlarm } from '@capgo/capacitor-alarm';

const result = await CapgoAlarm.createAlarm({
  hour: 7,
  minute: 30,
  label: 'Wake up',
  skipUi: false,
  vibrate: true
});
console.log('Alarm created:', result.success);
```

### `openAlarms`

Open the platform's native alarm list UI, if available.

```typescript
import { CapgoAlarm } from '@capgo/capacitor-alarm';

const result = await CapgoAlarm.openAlarms();
if (result.success) {
  console.log('Alarms UI opened');
}
```

### `getOSInfo`

Get information about the OS and capabilities.

```typescript
import { CapgoAlarm } from '@capgo/capacitor-alarm';

const info = await CapgoAlarm.getOSInfo();
console.log('Platform:', info.platform);
console.log('Supports native alarms:', info.supportsNativeAlarms);
if (info.platform === 'android') {
  console.log('Can schedule exact alarms:', info.canScheduleExactAlarms);
}
```

### `requestPermissions`

Request relevant permissions for alarm usage on the platform. On Android, may route to settings for exact alarms.

```typescript
import { CapgoAlarm } from '@capgo/capacitor-alarm';

const result = await CapgoAlarm.requestPermissions({ exactAlarm: true });
if (result.granted) {
  console.log('Permissions granted');
} else {
  console.log('Permissions denied');
}
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-alarm/
- Docs: /docs/plugins/alarm/

## Keep going from Using @capgo/capacitor-alarm

If you are using **Using @capgo/capacitor-alarm** to plan native plugin work, connect it with [@capgo/capacitor-alarm](/docs/plugins/alarm/) for the implementation detail in @capgo/capacitor-alarm, [Getting Started](/docs/plugins/alarm/getting-started/) for the implementation detail in Getting Started, [Capgo Plugin Directory](/plugins/) for the product workflow in Capgo Plugin Directory, [Capacitor Plugins by Capgo](/docs/plugins/) for the implementation detail in Capacitor Plugins by Capgo, and [Adding or Updating Plugins](/docs/contributing/adding-plugins/) for the implementation detail in Adding or Updating Plugins.
