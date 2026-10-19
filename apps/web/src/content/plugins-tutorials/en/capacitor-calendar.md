---
locale: en
---
# Using @capgo/capacitor-calendar

The `@capgo/capacitor-calendar` package lets a Capacitor app manage native calendar events on iOS and Android. It can request calendar permissions, create and edit events, open native calendar UI, list calendars and events, and manage Reminders on iOS.

## Install

```bash
npm install @capgo/capacitor-calendar
npx cap sync
```

## Configure Native Permissions

On iOS, add the usage descriptions your app needs to `ios/App/App/Info.plist`:

```xml
<key>NSCalendarsUsageDescription</key>
<string>This app needs calendar access.</string>
<key>NSCalendarsWriteOnlyAccessUsageDescription</key>
<string>This app needs permission to add calendar events.</string>
<key>NSCalendarsFullAccessUsageDescription</key>
<string>This app needs permission to read and manage calendar events.</string>
<key>NSRemindersFullAccessUsageDescription</key>
<string>This app needs permission to read and manage reminders.</string>
```

On Android, add the calendar permissions your app needs to `android/app/src/main/AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.READ_CALENDAR" />
<uses-permission android:name="android.permission.WRITE_CALENDAR" />
```

## Request Permission

```typescript
import { CapacitorCalendar } from '@capgo/capacitor-calendar';

const permission = await CapacitorCalendar.requestFullCalendarAccess();

if (permission.result !== 'granted') {
  throw new Error('Calendar permission was not granted');
}
```

## Create An Event

```typescript
const startDate = Date.now() + 60 * 60 * 1000;
const endDate = startDate + 60 * 60 * 1000;

const { id } = await CapacitorCalendar.createEvent({
  title: 'Product review',
  location: 'Capgo',
  startDate,
  endDate,
  description: 'Created with @capgo/capacitor-calendar',
});

console.log('Created event', id);
```

## Open The Native Event UI

```typescript
await CapacitorCalendar.createEventWithPrompt({
  title: 'Planning session',
  location: 'Office',
  startDate: Date.now() + 24 * 60 * 60 * 1000,
  endDate: Date.now() + 25 * 60 * 60 * 1000,
});
```

## List Events

```typescript
const now = Date.now();

const { result: events } = await CapacitorCalendar.listEventsInRange({
  from: now,
  to: now + 7 * 24 * 60 * 60 * 1000,
});
```

## iOS Reminders

```typescript
const permission = await CapacitorCalendar.requestFullRemindersAccess();

if (permission.result === 'granted') {
  await CapacitorCalendar.createReminder({
    title: 'Send launch notes',
    dueDate: Date.now() + 2 * 24 * 60 * 60 * 1000,
  });
}
```

Reminders are only available on iOS.

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-calendar/
- Docs: /docs/plugins/calendar/
