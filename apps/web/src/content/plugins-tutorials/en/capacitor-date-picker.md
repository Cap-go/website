---
locale: en
---
# Using @capgo/capacitor-date-picker

`@capgo/capacitor-date-picker` adds native date, time, date-time, year-month, and range pickers to Capacitor apps on iOS and Android, with a matching Web fallback.

This is Capgo's maintained alternative to `@capacitor-community/date-picker`. We listen to community reports, fix issues fast, and ship updates instead of leaving long-standing GitHub issues open.

## Install

```bash
npm install @capgo/capacitor-date-picker
npx cap sync
```

## Native Picker Screenshots

| iOS | Android |
| :---: | :---: |
| <img src="/date-picker/screenshots/ios-date-picker.png" alt="iOS screenshot of @capgo/capacitor-date-picker showing the native date picker" width="280" /> | <img src="/date-picker/screenshots/android-date-picker.png" alt="Android screenshot of @capgo/capacitor-date-picker showing the native date picker" width="280" /> |

## Pick A Date

```typescript
import { DatePicker } from '@capgo/capacitor-date-picker';

const result = await DatePicker.present({
  mode: 'date',
  date: '2026-05-27',
  min: '2026-01-01',
  max: '2026-12-31',
  format: 'yyyy-MM-dd',
  title: 'Select date',
});

console.log(result.value);
```

## Pick A Time

```typescript
const result = await DatePicker.present({
  mode: 'time',
  is24h: true,
  minuteStep: 15,
  format: 'HH:mm',
  title: 'Select time',
});
```

## Pick A Range

```typescript
const range = await DatePicker.presentRange({
  start: '2026-05-01',
  end: '2026-05-27',
  format: 'yyyy-MM-dd',
  startTitle: 'Start date',
  endTitle: 'End date',
});

console.log(range.start, range.end);
```

## Close An Active Picker

```typescript
await DatePicker.hide();
```

## What This Fixes

- Capacitor 8 support.
- Web implementation with the same `present()` API.
- Programmatic `hide()`.
- Dialog title support.
- iOS rotation-safe layout, locale handling, and `yearAndMonth` mode.
- Safer date parsing and date-only timezone handling.
- Android nested options, `is24h`, dialog layout handling, and UI-thread dialog handling.
- Minute steps and date range selection.

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-date-picker/
- Docs: /docs/plugins/date-picker/
