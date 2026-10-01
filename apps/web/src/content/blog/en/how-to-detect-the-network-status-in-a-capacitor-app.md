---
slug: how-to-detect-the-network-status-in-a-capacitor-app
title: "How to Detect the Network Status in a Capacitor App"
description: "Detect the network status in a Capacitor app: read online/offline state, listen for changes, verify real internet access, and handle metered networks."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-10-01T09:00:00.000Z
updated_at: 2026-10-01T03:59:51.000Z
head_image: /capgo_plugins.webp
head_image_alt: "Detecting online and offline network status in a Capacitor mobile app"
keywords: capacitor network status, capacitor network plugin, detect offline capacitor, ionic network status, capacitor networkStatusChange, capacitor internet connection check, capacitor offline mode
tag: Tutorial, Capacitor, Development
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "How do I check if the device is online in Capacitor?"
    answer: "Install @capacitor/network and call Network.getStatus(). It returns connected (boolean) and connectionType ('wifi', 'cellular', 'none' or 'unknown'). Add a networkStatusChange listener to react when the connection changes."
  - question: "Why does Capacitor say I am connected when nothing loads?"
    answer: "connected only means the device has an active network interface. A captive portal, a router without upstream internet, a blocked DNS or a down API all report connected: true. Confirm reachability with a short HTTP request to your own backend, or read internetReachable from @capgo/capacitor-network-diagnostics, which uses Android's validated network capability."
  - question: "Do I need any permission to read the network status?"
    answer: "No runtime permission. On Android the plugins declare ACCESS_NETWORK_STATE in their own manifest, which is a normal install-time permission. iOS needs nothing."
  - question: "Is navigator.onLine enough in a Capacitor app?"
    answer: "It works for a rough signal and fires online and offline events in the WebView, but it cannot tell Wi-Fi from cellular, cannot detect metered or Low Data Mode connections, and is unreliable on some Android WebViews. Use the native plugin on device and keep navigator.onLine as a web fallback."
  - question: "How can I detect a metered or Low Data Mode connection?"
    answer: "Call NetworkDiagnostics.getNetworkStatus() from @capgo/capacitor-network-diagnostics. expensive is true for metered or cellular paths, and constrained is true when iOS Low Data Mode is on. Use these flags to skip large downloads or video autoplay."
---

To detect the network status in a Capacitor app, install `@capacitor/network`, call `Network.getStatus()` for the current state, and subscribe to `networkStatusChange` for updates. That tells you whether the device has a connection and whether it is Wi-Fi or cellular. To know if the internet actually works, or if the connection is metered, add a reachability check or `@capgo/capacitor-network-diagnostics`. This guide covers all three layers with Capacitor 8 code.

## The three questions behind "is the user online?"

| Question | API | Notes |
| --- | --- | --- |
| Is there an active network interface? | `Network.getStatus().connected` | Fast, event-driven, says nothing about internet access |
| What kind of link is it? | `connectionType` | `wifi`, `cellular`, `none`, `unknown` in the official plugin |
| Does the internet actually work? | HTTP check or `internetReachable` | Needs a request or OS validation |
| Should I avoid big downloads? | `expensive`, `constrained` | Metered networks and iOS Low Data Mode |

Most offline bugs come from treating the first row as the third. A hotel Wi-Fi with a login page reports `connected: true` while every API call times out.

## Install the Network plugin

```bash
bun add @capacitor/network
bunx cap sync
```

No configuration is needed. On Android the plugin adds `ACCESS_NETWORK_STATE` to the merged manifest, a normal permission granted at install. iOS requires nothing.

## Read the current status

```typescript
import { Network } from '@capacitor/network';

const status = await Network.getStatus();
console.log(status.connected);      // true or false
console.log(status.connectionType); // 'wifi' | 'cellular' | 'none' | 'unknown'
```

Call it on app start before deciding whether to load from cache or network. It returns in a few milliseconds because it reads the OS state, it does not send traffic.

## Listen for network changes

```typescript
import { Network, type ConnectionStatus } from '@capacitor/network';
import type { PluginListenerHandle } from '@capacitor/core';

let handle: PluginListenerHandle | undefined;

export async function watchNetwork(onChange: (s: ConnectionStatus) => void) {
  onChange(await Network.getStatus());
  handle = await Network.addListener('networkStatusChange', onChange);
}

export async function stopWatchingNetwork() {
  await handle?.remove();
}
```

Two practical details:

- **Debounce the event.** When switching from Wi-Fi to cellular, both platforms can briefly report `none` before the new link is up. A 1 to 2 second debounce before showing an "offline" banner avoids flicker.
- **Remove listeners** when a component unmounts, or you will run the callback several times after hot reloads and navigation.

### React hook

```typescript
import { useEffect, useState } from 'react';
import { Network, type ConnectionStatus } from '@capacitor/network';

export function useNetworkStatus() {
  const [status, setStatus] = useState<ConnectionStatus>({ connected: true, connectionType: 'unknown' });

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const listener = Network.addListener('networkStatusChange', (s) => {
      clearTimeout(timer);
      timer = setTimeout(() => setStatus(s), s.connected ? 0 : 1500);
    });
    Network.getStatus().then(setStatus);
    return () => {
      clearTimeout(timer);
      listener.then((l) => l.remove());
    };
  }, []);

  return status;
}
```

Going online is applied immediately, going offline waits 1.5 seconds. The same pattern works as a Vue composable or an Angular service with a `BehaviorSubject`.

## Why "connected" does not mean online

`connected: true` comes from the OS network stack. It stays true when:

- the Wi-Fi network has a captive portal (airports, hotels, trains)
- the router has no upstream connection
- DNS is broken or filtered
- a corporate firewall or VPN blocks your API domain
- your own backend is down

The fix is a reachability check against something you control:

```typescript
export async function canReachApi(timeoutMs = 4000): Promise<boolean> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch('https://api.example.com/health', {
      method: 'HEAD',
      cache: 'no-store',
      signal: controller.signal,
    });
    return res.ok;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}
```

Run it on app start, when `networkStatusChange` reports `connected: true`, and after a request fails. Do not poll every few seconds, it drains battery and data. Make sure the health endpoint allows your app's origin in CORS (`capacitor://localhost` on iOS, `https://localhost` on Android by default), or use `CapacitorHttp` to send it from native code.

## Get richer status with network diagnostics

[`@capgo/capacitor-network-diagnostics`](/plugins/capacitor-network-diagnostics/) reads more of what the OS knows and can run native checks that bypass WebView CORS:

```bash
bun add @capgo/capacitor-network-diagnostics
bunx cap sync
```

```typescript
import { NetworkDiagnostics } from '@capgo/capacitor-network-diagnostics';

const status = await NetworkDiagnostics.getNetworkStatus();
// {
//   connected: true,
//   connectionType: 'wifi' | 'cellular' | 'ethernet' | 'vpn' | 'other' | 'unknown' | 'none',
//   internetReachable: true,
//   expensive: false,      // metered / cellular
//   constrained: false,    // iOS Low Data Mode
//   captivePortal: false,  // Android only
//   details: { ... }
// }
```

How the fields map to the OS:

| Field | Android | iOS |
| --- | --- | --- |
| `internetReachable` | `NET_CAPABILITY_VALIDATED` (Android probed the internet) | Mirrors the `NWPathMonitor` path status |
| `expensive` | `isActiveNetworkMetered()` | `NWPath.isExpensive` |
| `constrained` | Always `false` | `NWPath.isConstrained` (Low Data Mode) |
| `captivePortal` | `NET_CAPABILITY_CAPTIVE_PORTAL` | Not reported |
| `vpn` type | Yes | Yes |

On Android, `internetReachable` is a strong signal because the OS already tested the connection. On iOS it is closer to `connected`, so keep the HTTP check for critical flows.

### Native reachability checks

```typescript
const api = await NetworkDiagnostics.testUrl({
  url: 'https://api.example.com/health',
  method: 'HEAD',
  timeoutMs: 4000,
});
// api.reachable, api.statusCode, api.durationMs, api.errorCode

const socket = await NetworkDiagnostics.testWebSocket({ url: 'wss://realtime.example.com' });
const port = await NetworkDiagnostics.testPort({ host: 'mqtt.example.com', port: 8883 });
```

Native requests are not subject to CORS, so you can test third-party hosts too.

### A support "network report" screen

When users say "the app does not work", a one-tap diagnostic report saves hours of back and forth:

```typescript
const report = await NetworkDiagnostics.runDiagnostics({
  urls: [{ url: 'https://api.example.com/health' }, { url: 'https://cdn.example.com/ping' }],
  websockets: [{ url: 'wss://realtime.example.com' }],
  download: { url: 'https://cdn.example.com/1mb.bin', maxBytes: 1_048_576 },
  packetLoss: { url: 'https://api.example.com/health', count: 5 },
});

console.log(report.issues);        // human-readable list of problems
console.log(report.download?.mbps);
console.log(report.packetLoss?.lossPercent);
```

Attach the JSON to a support ticket. You will see right away whether the problem is DNS, a blocked WebSocket, a captive portal, or a slow link.

## Adapt to metered and Low Data Mode connections

Respecting data limits is a quick win for reviews in markets with expensive mobile data:

```typescript
export async function shouldPrefetchMedia() {
  const s = await NetworkDiagnostics.getNetworkStatus();
  if (!s.connected) return false;
  if (s.constrained) return false; // user asked iOS to save data
  if (s.expensive) return false;   // cellular or metered Wi-Fi
  return true;
}
```

Use it to decide on video autoplay, image quality, background sync, and large downloads. On Android, users can mark a Wi-Fi network as metered, so do not assume Wi-Fi is free.

## Build an offline banner

A small banner is clearer than failing requests. Using the hook above:

```tsx
export function OfflineBanner() {
  const { connected } = useNetworkStatus();
  if (connected) return null;
  return (
    <div role="status" aria-live="polite" className="offline-banner">
      You are offline. Changes will sync when you reconnect.
    </div>
  );
}
```

`role="status"` with `aria-live="polite"` makes screen readers announce the change. For framework-specific UI, see our guide to [building an offline screen in Vue, Angular and React](/blog/create-offline-screen-in-vue-angular-react/).

## Queue work while offline

Detection is only half of offline support. When the status goes offline:

1. Serve reads from local storage. A SQLite database such as [`@capgo/capacitor-fast-sql`](/plugins/capacitor-fast-sql/) handles large datasets better than `localStorage`.
2. Write user actions to an outbox table with a timestamp and an idempotency key.
3. On `networkStatusChange` to connected, run `canReachApi()`, then flush the outbox in order.
4. Retry failed requests with exponential backoff, capped at a few minutes.

For uploads that must survive the app being closed, hand them to a native uploader rather than `fetch`.

## Web fallback

`@capacitor/network` also runs in the browser, where it is based on `navigator.onLine` and the `online` and `offline` events. That means your code works in `bun run dev` and in a PWA without changes, but `connectionType` will often be `unknown` on the web. Chrome's `navigator.connection` exposes `effectiveType` and `saveData`, Safari does not, so treat them as optional hints.

## Troubleshooting

**The listener never fires on iOS Simulator**: the simulator shares the Mac's network. Toggle Wi-Fi on the Mac or test on a device with airplane mode.

**`connectionType` is `unknown` on a VPN**: the official plugin only reports `wifi`, `cellular`, `none` and `unknown`. Use the diagnostics plugin, which returns `vpn` and `ethernet`.

**The app shows offline for a second when switching networks**: debounce the offline transition as shown above.

**The health check fails on device but works in the browser**: CORS. Allow `capacitor://localhost` and `https://localhost`, or use `NetworkDiagnostics.testUrl`, which runs natively.

**`navigator.onLine` is true while the plugin says offline**: trust the plugin. Some Android WebViews do not update `navigator.onLine` reliably.

## Ship offline fixes over the air

Offline handling is mostly JavaScript: thresholds, banners, retry logic, cache rules. With [Capgo live updates](/live-update/), you can tune those for every user the same day. Capgo downloads update bundles in the background and keeps the current version if a download fails, so a bad connection never leaves users with a half-installed update. The [network diagnostics docs](/docs/plugins/network-diagnostics/) list every option.
