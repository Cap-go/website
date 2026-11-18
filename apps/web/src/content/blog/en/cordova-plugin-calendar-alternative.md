---
slug: cordova-plugin-calendar-alternative
title: "cordova-plugin-calendar Alternative for Capacitor"
description: "cordova-plugin-calendar alternative for Capacitor: create, list, modify and delete native calendar events with @capgo/capacitor-calendar and iOS Reminders support."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-11-18T09:00:00.000Z
updated_at: 2026-11-18T09:00:00.000Z
head_image: /migrating-cordova-to-capacitor.webp
head_image_alt: "Illustration of migrating a Cordova app to Capacitor, used for a calendar plugin guide"
keywords: cordova-plugin-calendar alternative, capacitor calendar, @capgo/capacitor-calendar, window.plugins.calendar, cordova calendar migration
tag: Alternatives, Capacitor, Migration
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "What is the best cordova-plugin-calendar alternative in Capacitor?"
    answer: "@capgo/capacitor-calendar exposes createEvent, listEventsInRange, listCalendars, modifyEvent, deleteEvent, createEventWithPrompt, and iOS Reminders APIs with Capacitor permission helpers."
  - question: "Is cordova-plugin-calendar still maintained?"
    answer: "npm lists cordova-plugin-calendar at version 5.1.6. The registry modified timestamp is 13 June 2022. The latest npm release 5.1.6 was published 11 January 2022. Source: EddyVerbruggen/Calendar-PhoneGap-Plugin on GitHub."
  - question: "Does @capgo/capacitor-calendar support interactive event creation?"
    answer: "Yes. createEventWithPrompt opens the system editor, similar to Cordova createEventInteractively. Silent createEvent maps to Cordova createEvent and createEventWithOptions."
  - question: "Where are the docs?"
    answer: "https://capgo.app/docs/plugins/calendar/, npm @capgo/capacitor-calendar, and GitHub Cap-go/capacitor-calendar."
---

The practical **cordova-plugin-calendar alternative** for a Capacitor app is [`@capgo/capacitor-calendar`](/plugins/capacitor-calendar/). It maps `window.plugins.calendar` callbacks on `Calendar.js` to `CapacitorCalendar` promises, adds typed permission helpers for iOS 17 calendar access levels, and covers iOS Reminders APIs that the Cordova plugin never shipped. This guide lists npm facts, install steps, usage, and an API map for your Cordova to Capacitor move.

## Why leave cordova-plugin-calendar in Capacitor

**cordova-plugin-calendar** on npm is version **5.1.6**. The registry `modified` timestamp is **13 June 2022**. Version **5.1.6** was published **11 January 2022**. The npm repository URL points to [EddyVerbruggen/Calendar-PhoneGap-Plugin](https://github.com/EddyVerbruggen/Calendar-PhoneGap-Plugin).

The `www/Calendar.js` source exposes `window.plugins.calendar` with methods including:

- Permission helpers: `hasReadPermission`, `requestReadWritePermission`, and related callbacks
- `createEvent`, `createEventWithOptions`, `createEventInteractively`, `createEventInteractivelyWithOptions`
- `findEvent`, `findEventWithOptions`, `listEventsInRange`, `listCalendars`
- `modifyEvent`, `modifyEventWithOptions`, `deleteEvent`, `deleteEventById`
- `createCalendar`, `deleteCalendar`, `openCalendar`
- Positional arguments: `title`, `location`, `notes`, JavaScript `Date` `startDate` and `endDate`

In a Capacitor codebase the Cordova plugin still depends on `cordova.exec`, converts dates to epoch milliseconds in JavaScript, and mixes Android `calendarId` with iOS `calendarName` in option bags.

[`@capgo/capacitor-calendar`](https://www.npmjs.com/package/@capgo/capacitor-calendar) latest on npm is **8.0.17** with a `modified` date of **12 November 2026**. `src/definitions.ts` documents `createEvent`, `createEventWithPrompt`, `modifyEvent`, `deleteEvent`, `listEventsInRange`, `listCalendars`, `getDefaultCalendar`, `createCalendar`, `deleteCalendar`, `modifyCalendar`, `openCalendar`, and iOS `createReminder` / `getRemindersFromLists` helpers. Capgo ships fixes on an open source cadence where a human still reviews, tests and merges 50+ pull requests daily.

## Install

```bash
bun add @capgo/capacitor-calendar
bunx cap sync
```

On iOS set the calendar and reminders usage description keys your app needs in `Info.plist`. On Android add `READ_CALENDAR` and `WRITE_CALENDAR` when you use silent reads and writes, not only `createEventWithPrompt`.

## Usage example

```ts
import { CapacitorCalendar } from '@capgo/capacitor-calendar';

export async function addSilentEvent() {
  const access = await CapacitorCalendar.requestFullCalendarAccess();
  if (access.result !== 'granted') {
    throw new Error('Calendar permission denied');
  }

  const startDate = Date.now() + 3_600_000;
  const endDate = startDate + 3_600_000;

  const { id } = await CapacitorCalendar.createEvent({
    title: 'Site visit',
    location: 'Warehouse 4',
    notes: 'Bring safety gear',
    startDate,
    endDate,
    alerts: [60],
  });

  return id;
}
```

## Migrating from Cordova to Capacitor

```js
// Before (Cordova silent create)
var startDate = new Date(2025, 2, 15, 18, 30, 0, 0, 0);
var endDate = new Date(2025, 2, 15, 19, 30, 0, 0, 0);
window.plugins.calendar.createEvent(
  'My event',
  'Home',
  'Notes',
  startDate,
  endDate,
  success,
  error,
);
```

```ts
// After (Capacitor)
import { CapacitorCalendar } from '@capgo/capacitor-calendar';

await CapacitorCalendar.requestFullCalendarAccess();
await CapacitorCalendar.createEvent({
  title: 'My event',
  location: 'Home',
  notes: 'Notes',
  startDate: new Date(2025, 2, 15, 18, 30, 0, 0).getTime(),
  endDate: new Date(2025, 2, 15, 19, 30, 0, 0).getTime(),
});
```

```js
// Before (Cordova list in range)
window.plugins.calendar.listEventsInRange(startDate, endDate, success, error);
```

```ts
// After (Capacitor)
const { result } = await CapacitorCalendar.listEventsInRange({
  from: startDate.getTime(),
  to: endDate.getTime(),
});
```

### API mapping table

| cordova-plugin-calendar (`window.plugins.calendar`) | @capgo/capacitor-calendar |
| --- | --- |
| `requestReadWritePermission(...)` | `requestFullCalendarAccess()` or granular `requestWriteOnlyCalendarAccess` / `requestReadOnlyCalendarAccess` |
| `createEvent(title, location, notes, start, end, ...)` | `createEvent({ title, location, notes, startDate, endDate, ... })` with millisecond timestamps |
| `createEventWithOptions(..., options, ...)` | `createEvent` fields: `alerts`, `recurrence`, `calendarId`, `url`, etc. |
| `createEventInteractively(...)` | `createEventWithPrompt(...)` |
| `listEventsInRange(start, end, ...)` | `listEventsInRange({ from, to })` |
| `listCalendars(...)` | `listCalendars()` |
| `deleteEventById(id, fromDate, ...)` | `deleteEvent({ id, ... })` |
| `deleteEvent(title, location, ...)` | `deleteEvent` by id when known, or `deleteEventWithPrompt` |
| `modifyEvent(...)` / `modifyEventWithOptions(...)` | `modifyEvent({ id, ...fields })` or `modifyEventWithPrompt` |
| `findEvent` / `findEventWithOptions` | `listEventsInRange` plus filter in app code, or query by id when you stored it |
| `openCalendar(date, ...)` | `openCalendar({ date })` |
| `createCalendar(nameOrOptions, ...)` | `createCalendar({ title, color, ... })` |
| `deleteCalendar(name, ...)` | `deleteCalendar({ id })` (Capgo uses calendar id) |
| Not in Cordova | iOS `createReminder`, `getRemindersFromLists`, `openReminders` |
| Cordova plugin install | `bun add @capgo/capacitor-calendar` plus `bunx cap sync` |

## Links and next steps

- Plugin docs: [https://capgo.app/docs/plugins/calendar/](/docs/plugins/calendar/)
- Marketing page: [/plugins/capacitor-calendar/](/plugins/capacitor-calendar/)
- npm: [https://www.npmjs.com/package/@capgo/capacitor-calendar](https://www.npmjs.com/package/@capgo/capacitor-calendar)
- GitHub: [https://github.com/Cap-go/capacitor-calendar/](https://github.com/Cap-go/capacitor-calendar/)
- Cordova upstream: [https://github.com/EddyVerbruggen/Calendar-PhoneGap-Plugin](https://github.com/EddyVerbruggen/Calendar-PhoneGap-Plugin)

Calendar access and OS permission strings ship in the native binary, so plan a store build after you swap plugins. Use [Capgo Build](/native-build/) for cloud builds, then ship scheduling UI with [Capgo live updates](/live-update/) where the logic stays in JavaScript. For the full platform move, read the [Cordova to Capacitor migration guide](/blog/migrating-cordova-to-capacitor/).