---
locale: en
---
# Using @capgo/capacitor-verisoul

`@capgo/capacitor-verisoul` connects Capacitor apps to Verisoul native fraud-prevention sessions on iOS and Android.

## Install

```bash
npm install @capgo/capacitor-verisoul
npx cap sync
```

## What This Plugin Exposes

- `configure` - Initializes the native Verisoul SDK with your environment and project ID.
- `getSessionId` - Returns the current Verisoul session ID for backend risk assessment.
- `reinitialize` - Starts a fresh Verisoul session after account context changes.
- `recordTouchEvent` - Sends Android touch events to Verisoul touch-signal collection.

## Example Usage

```typescript
import { Verisoul } from '@capgo/capacitor-verisoul';

await Verisoul.configure({
  environment: 'prod',
  projectId: 'YOUR_PROJECT_ID',
});

const { sessionId } = await Verisoul.getSessionId();

await fetch('/api/risk/verisoul', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ sessionId }),
});
```

## Reset Sessions

Call `reinitialize()` when a user logs out or switches accounts:

```typescript
await Verisoul.reinitialize();
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-verisoul/
- Docs: /docs/plugins/verisoul/

## Keep going from Using @capgo/capacitor-verisoul

If you are using **Using @capgo/capacitor-verisoul** to add fraud-prevention signals, connect it with [@capgo/capacitor-verisoul](/docs/plugins/verisoul/) for the implementation detail, [Getting Started](/docs/plugins/verisoul/getting-started/) for install steps, [iOS setup](/docs/plugins/verisoul/ios/) for App Attest notes, [Android setup](/docs/plugins/verisoul/android/) for Gradle setup, and [Capgo Security](/security/) for the broader security workflow.
