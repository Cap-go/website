---
locale: en
---
# Using @capgo/capacitor-webview-crash

Detect recovered WebView crashes, restart dead WebViews natively, and recycle long-running WebViews on a fixed interval before memory pressure turns into an OOM.

## Install

```bash
npm install @capgo/capacitor-webview-crash
npx cap sync
```

## What This Plugin Exposes

- Native restart after WebView crashes on iOS and Android.
- Fixed-interval native WebView restart for kiosk, POS, signage, scanner, and dashboard apps that run for days.
- `restartWebView` - Lets JavaScript request a fresh native WebView without doing a page reload.
- `getPendingCrashInfo` - Returns the stored native crash or restart marker, or `null` when nothing is pending.
- `clearPendingCrashInfo` - Clears the stored marker after your app has restored its state.
- `simulateCrashRecovery` - Creates a fake crash marker so recovery flows can be tested locally.
- `webViewRestoredAfterCrash` - Listener event fired when a crash marker is still pending in the recovered runtime.
- `webViewRestoredAfterRestart` - Listener event fired when any native restart marker is still pending.

## Example Usage

```typescript
import { WebViewCrash } from '@capgo/capacitor-webview-crash';

await WebViewCrash.addListener('webViewRestoredAfterCrash', async (info) => {
  console.log('Recovered after a WebView crash', info);
  await WebViewCrash.clearPendingCrashInfo();
});

await WebViewCrash.addListener('webViewRestoredAfterRestart', async (info) => {
  console.log('Recovered after a native WebView restart', info);
  await WebViewCrash.clearPendingCrashInfo();
});

const pending = await WebViewCrash.getPendingCrashInfo();
// Note: the listener callback may have already cleared the pending marker.
if (pending.value) {
  console.log('Pending crash or restart marker', pending.value);
}
```

## Native Auto Restart

Configure restart behavior in `capacitor.config.ts` so it keeps working when JavaScript is unavailable:

```typescript
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  plugins: {
    WebViewCrash: {
      restartOnCrash: true,
      restartIntervalMs: 60 * 60 * 1000,
      restartAfterCrashDelayMs: 0,
    },
  },
};

export default config;
```

Scheduled restarts write `reason: 'periodicRestart'`. Persist critical app state before using short intervals.

## Manual Native Restart

Call `restartWebView()` when JavaScript decides the native WebView should be replaced proactively, for example after a memory-heavy workflow:

```typescript
await WebViewCrash.restartWebView();
```

The method writes `reason: 'manualRestart'` and asks native code to create a fresh WebView. Android recreates the host activity. iOS rebuilds the Capacitor bridge view so a new `WKWebView` is created instead of reloading the current page.

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-webview-crash/
- Docs: /docs/plugins/webview-crash/

## Keep going from Using @capgo/capacitor-webview-crash

If you are using **Using @capgo/capacitor-webview-crash** to plan native media and interface behavior, connect it with [@capgo/capacitor-webview-crash](/docs/plugins/webview-crash/) for the implementation detail in @capgo/capacitor-webview-crash, [Getting Started](/docs/plugins/webview-crash/getting-started/) for the implementation detail in Getting Started, [Using @capgo/capacitor-live-activities](/plugins/capacitor-live-activities/) for the native capability in Using @capgo/capacitor-live-activities, [@capgo/capacitor-live-activities](/docs/plugins/live-activities/) for the implementation detail in @capgo/capacitor-live-activities, and [Using @capgo/capacitor-video-player](/plugins/capacitor-video-player/) for the native capability in Using @capgo/capacitor-video-player.
