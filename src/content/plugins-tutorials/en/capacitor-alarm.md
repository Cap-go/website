---
locale: en
---
# Using @capgo/capacitor-alarm

The `@capgo/capacitor-alarm` package allows you to schedule native alarms and notifications even when your app is closed. Here is a tutorial on how to use this package.

## Installation

To install the package, run the following command:

```bash
npm install @capgo/capacitor-alarm
npx cap sync
```

## Configuration

### Android Setup

Add the following permissions to your `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.SCHEDULE_EXACT_ALARM" />
<uses-permission android:name="android.permission.USE_EXACT_ALARM" />
```

## Usage

### Schedule an Alarm

```typescript
import { CapacitorAlarm } from '@capgo/capacitor-alarm';

await CapacitorAlarm.schedule({
  id: 1,
  title: 'Alarm Title',
  message: 'Alarm Message',
  triggerTime: new Date(Date.now() + 60000), // 1 minute from now
});
```

### Cancel an Alarm

```typescript
import { CapacitorAlarm } from '@capgo/capacitor-alarm';

await CapacitorAlarm.cancel({ id: 1 });
```

### Get All Scheduled Alarms

```typescript
import { CapacitorAlarm } from '@capgo/capacitor-alarm';

const alarms = await CapacitorAlarm.getAll();
console.log('Scheduled alarms:', alarms);
```

That's it! You have successfully integrated native alarms into your Capacitor app.
