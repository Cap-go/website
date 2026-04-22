---
locale: en
---
# Using @capgo/capacitor-android-age-signals

Capacitor interface for retrieving Play Age Signals.

## Install

```bash
bun add @capgo/capacitor-android-age-signals
bunx cap sync
```

## What This Plugin Exposes

- `checkAgeSignals` - Request the current Play Age Signals for the active user.

## Example Usage

### `checkAgeSignals`

Request the current Play Age Signals for the active user.

```typescript
import { AgeSignals } from '@capgo/capacitor-android-age-signals';

await AgeSignals.checkAgeSignals();
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-android-age-signals/
- Docs: /docs/plugins/age-signals/
