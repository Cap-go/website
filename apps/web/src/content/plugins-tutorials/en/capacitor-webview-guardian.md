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

`bunx cap sync` copies the native code into your iOS and Android projects. Run it again after every plugin upgrade.

## Import

```typescript
import { WebviewGuardian } from '@capgo/capacitor-webview-guardian';
```

## API at a glance

| Method | Description |
| --- | --- |
| `startMonitoring` | Starts observing foreground events and automatically checks the WebView health. |
| `stopMonitoring` | Stops any automatic foreground monitoring. |
| `getState` | Returns the latest known monitoring state. |
| `checkNow` | Forces a WebView health probe immediately. |

## Examples

### `startMonitoring()`

Starts observing foreground events and automatically checks the WebView health.

```typescript
import { WebviewGuardian } from '@capgo/capacitor-webview-guardian';

const result = await WebviewGuardian.startMonitoring();
console.log(result);
```

### `stopMonitoring()`

Stops any automatic foreground monitoring.

```typescript
import { WebviewGuardian } from '@capgo/capacitor-webview-guardian';

const result = await WebviewGuardian.stopMonitoring();
console.log(result);
```

### `getState()`

Returns the latest known monitoring state.

```typescript
import { WebviewGuardian } from '@capgo/capacitor-webview-guardian';

const result = await WebviewGuardian.getState();
console.log(result);
```

### `checkNow()`

Forces a WebView health probe immediately.

```typescript
import { WebviewGuardian } from '@capgo/capacitor-webview-guardian';

const result = await WebviewGuardian.checkNow();
console.log(result);
```

## Listen to events

`addListener` returns a handle. Call `handle.remove()` when the screen unmounts, or `WebviewGuardian.removeAllListeners()` to clear every listener.

## Full reference

- [GitHub repository](https://github.com/Cap-go/capacitor-webview-guardian/)
- [Documentation](/docs/plugins/webview-guardian/)
- [API reference](/docs/plugins/webview-guardian/getting-started/)

## Keep going from Using @capgo/capacitor-webview-guardian

If you are using **Using @capgo/capacitor-webview-guardian** to plan native media and interface behavior, connect it with [@capgo/capacitor-webview-guardian](/docs/plugins/webview-guardian/) for the implementation detail in @capgo/capacitor-webview-guardian, [Getting Started](/docs/plugins/webview-guardian/getting-started/) for the implementation detail in Getting Started, [Using @capgo/capacitor-live-activities](/plugins/capacitor-live-activities/) for the native capability in Using @capgo/capacitor-live-activities, [@capgo/capacitor-live-activities](/docs/plugins/live-activities/) for the implementation detail in @capgo/capacitor-live-activities, and [Using @capgo/capacitor-video-player](/plugins/capacitor-video-player/) for the native capability in Using @capgo/capacitor-video-player.
