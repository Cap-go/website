---
locale: en
---
# Using @capgo/capacitor-webview-crash

Detect recovered WebView crashes and tell the next JavaScript runtime what happened.

## Install

```bash
bun add @capgo/capacitor-webview-crash
bunx cap sync
```

## What This Plugin Exposes

- `getPendingCrashInfo` - Returns the stored native crash marker, or `null` when nothing is pending.
- `clearPendingCrashInfo` - Clears the stored crash marker after your app has restored its state.
- `simulateCrashRecovery` - Creates a fake crash marker so recovery flows can be tested locally.
- `webViewRestoredAfterCrash` - Listener event fired when a crash marker is still pending in the recovered runtime.

## Example Usage

```typescript
import { WebViewCrash } from '@capgo/capacitor-webview-crash';

await WebViewCrash.addListener('webViewRestoredAfterCrash', async (info) => {
  console.log('Recovered after a WebView crash', info);
  await WebViewCrash.clearPendingCrashInfo();
});

const pending = await WebViewCrash.getPendingCrashInfo();
// Note: the listener callback may have already cleared the pending marker.
if (pending.value) {
  console.log('Pending crash marker', pending.value);
}
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-webview-crash/
- Docs: /docs/plugins/webview-crash/
