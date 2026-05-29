---
locale: en
---
# Using @capgo/capacitor-webview-guardian

Capacitor plugin to Detect when the WebView was killed in the background and relaunch it on foreground.

## Install

```bash
bun add @capgo/capacitor-webview-guardian
bunx cap sync
```

## What This Plugin Exposes

- `startMonitoring` - Starts observing foreground events and automatically checks the WebView health.
- `stopMonitoring` - Stops any automatic foreground monitoring.
- `getState` - Returns the latest known monitoring state.
- `checkNow` - Forces a WebView health probe immediately.

## Example Usage

### `startMonitoring`

Starts observing foreground events and automatically checks the WebView health.

```typescript
import { WebviewGuardian } from '@capgo/capacitor-webview-guardian';

await WebviewGuardian.startMonitoring();
```

### `stopMonitoring`

Stops any automatic foreground monitoring.

```typescript
import { WebviewGuardian } from '@capgo/capacitor-webview-guardian';

await WebviewGuardian.stopMonitoring();
```

### `getState`

Returns the latest known monitoring state.

```typescript
import { WebviewGuardian } from '@capgo/capacitor-webview-guardian';

await WebviewGuardian.getState();
```

### `checkNow`

Forces a WebView health probe immediately.

```typescript
import { WebviewGuardian } from '@capgo/capacitor-webview-guardian';

await WebviewGuardian.checkNow();
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-webview-guardian/
- Docs: /docs/plugins/webview-guardian/

## Keep going from Using @capgo/capacitor-webview-guardian

If you are using **Using @capgo/capacitor-webview-guardian** to plan native media and interface behavior, connect it with [@capgo/capacitor-webview-guardian](/docs/plugins/webview-guardian/) for the implementation detail in @capgo/capacitor-webview-guardian, [Getting Started](/docs/plugins/webview-guardian/getting-started/) for the implementation detail in Getting Started, [Using @capgo/capacitor-live-activities](/plugins/capacitor-live-activities/) for the native capability in Using @capgo/capacitor-live-activities, [@capgo/capacitor-live-activities](/docs/plugins/live-activities/) for the implementation detail in @capgo/capacitor-live-activities, and [Using @capgo/capacitor-video-player](/plugins/capacitor-video-player/) for the native capability in Using @capgo/capacitor-video-player.
