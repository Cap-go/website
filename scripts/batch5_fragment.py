# Loaded via exec() from run-plugin-doc-batch.py with reg= in namespace.

B5 = {
    "app-tracking-transparency": reg(
        "Request iOS App Tracking Transparency before using IDFA.",
        "Wrap `ATTrackingManager` to request permission and read tracking status before initializing ads or attribution SDKs.",
        "| Platform | Support | Notes |\n| --- | --- | --- |\n| iOS | Yes | ATT dialog |\n| Android | No | Use GAID policies |\n| Web | No | Not applicable |",
        """## Quick start

```typescript
import { AppTrackingTransparency } from '@capgo/capacitor-app-tracking-transparency';

const { status } = await AppTrackingTransparency.getStatus();
if (status === 'notDetermined') {
  await AppTrackingTransparency.requestPermission();
}
```

## Common pitfalls

- **iOS only**: guard other platforms.
- **Timing**: show context before the system dialog.
- **SKAdNetwork**: separate from ATT configuration.
""",
        bun=True,
    ),
    "device-info": reg(
        "Read CPU, memory, storage, and device telemetry from Capacitor.",
        "Expose hardware and runtime metrics for diagnostics, adaptive quality, and support tooling without custom native bridges.",
        "| Platform | Support | Notes |\n| --- | --- | --- |\n| iOS | Yes | Native metrics |\n| Android | Yes | Native metrics |\n| Web | Partial | Limited browser APIs |",
        """## Quick start

```typescript
import { DeviceInfo } from '@capgo/capacitor-device-info';

const snapshot = await DeviceInfo.getInfo();
console.log(snapshot);
```

## Common pitfalls

- **Privacy**: avoid shipping raw identifiers to analytics.
- **Web**: guard native only calls on web builds.
- **Monitoring**: remove listeners on teardown.
""",
        bun=True,
    ),
    "nfc": reg(
        "Discover, read, and write NFC tags on iOS and Android.",
        "Run foreground NFC sessions, parse NDEF payloads, and write records for pairing and tap to check in flows.",
        "| Platform | Support | Notes |\n| --- | --- | --- |\n| iOS | Yes | Core NFC |\n| Android | Yes | NfcAdapter |\n| Web | No | Use Web NFC separately |",
        """## Quick start

```typescript
import { CapacitorNfc } from '@capgo/capacitor-nfc';

await CapacitorNfc.startScan();
```

## Common pitfalls

- **Foreground**: scanning usually requires the app in foreground.
- **Capabilities**: enable NFC in Xcode and test on hardware.
- **Payload size**: respect NDEF size limits.
""",
        bun=True,
    ),
    "in-app-review": reg(
        "Trigger native in app review dialogs on iOS and Android.",
        "Call `requestReview()` after positive moments instead of deep linking users to store listings.",
        "| Platform | Support | Notes |\n| --- | --- | --- |\n| iOS | Yes | StoreKit review |\n| Android | Yes | Play In App Review |\n| Web | No | Link to stores |",
        """## Quick start

```typescript
import { CapgoInAppReview } from '@capgo/capacitor-in-app-review';

await CapgoInAppReview.requestReview();
```

## Common pitfalls

- **Quota**: OS may skip the dialog if called too often.
- **No guarantee**: never block UX on a rating.
- **Milestone**: ask after success, not first launch.
""",
        bun=True,
    ),
    "persistent-account": reg(
        "Persist account identifiers across reinstalls on native storage.",
        "Save account keys in keychain or account manager so returning users can be recognized without full signup.",
        "| Platform | Support | Notes |\n| --- | --- | --- |\n| iOS | Yes | Keychain |\n| Android | Yes | AccountManager |\n| Web | No | Use server sessions |",
        None,
    ),
    "screen-orientation": reg(
        "Lock and unlock screen orientation from Capacitor.",
        "Force landscape video or portrait forms and listen for orientation changes without editing native activities manually.",
        "| Platform | Support | Notes |\n| --- | --- | --- |\n| iOS | Yes | UIDevice |\n| Android | Yes | Activity flags |\n| Web | Partial | Screen Orientation API |",
        """## Quick start

```typescript
import { ScreenOrientation } from '@capgo/capacitor-screen-orientation';

await ScreenOrientation.lock({ orientation: 'landscape' });
```

## Common pitfalls

- **iPad**: locks may be ignored in split view.
- **Unlock**: call `unlock()` when leaving fullscreen flows.
- **Layout**: combine with responsive CSS.
""",
        bun=True,
    ),
    "pay": reg(
        "Accept Apple Pay and Google Pay from Capacitor.",
        "Present native wallet sheets with processor tokens returned to your backend.",
        "| Platform | Support | Notes |\n| --- | --- | --- |\n| iOS | Yes | Apple Pay |\n| Android | Yes | Google Pay |\n| Web | See repo | Payment Request API |",
        None,
    ),
    "mock-location-detector": reg(
        "Detect mock GPS and spoofing on Android.",
        "Run `analyze()` before trusting location for payouts, attendance, or anti fraud rules.",
        "| Platform | Support | Notes |\n| --- | --- | --- |\n| iOS | Limited | See README |\n| Android | Yes | Mock location signals |\n| Web | No | Not applicable |",
        """## Common pitfalls

- **Layered checks**: combine `analyze()` with server velocity rules.
- **Android focus**: most signals target developer settings.
- **User education**: explain why incentives need genuine GPS.
""",
        gs_before="## Recommended Flow",
    ),
    "keep-awake": reg(
        "Keep the screen awake during demos and kiosk flows.",
        "Toggle idle timer suppression natively instead of CSS hacks.",
        "| Platform | Support | Notes |\n| --- | --- | --- |\n| iOS | Yes | UIApplication |\n| Android | Yes | Window flags |\n| Web | Partial | Wake Lock API |",
        """## Quick start

```typescript
import { KeepAwake } from '@capgo/capacitor-keep-awake';

await KeepAwake.keepAwake();
```

## Common pitfalls

- **Battery**: call `allowSleep()` when done.
- **Web**: Wake Lock needs a visible document.
- **Kiosk**: pair with Android kiosk plugins.
""",
        bun=True,
    ),
    "webview-guardian": reg(
        "Harden Capacitor WebView navigation and health monitoring.",
        "Start monitoring, inspect WebView health, and stop monitoring when leaving protected flows.",
        "| Platform | Support | Notes |\n| --- | --- | --- |\n| iOS | Yes | WKWebView |\n| Android | Yes | WebViewClient |\n| Web | No | Use CSP |",
        None,
    ),
    "webview-crash": reg(
        "Recover from WebView renderer crashes in Capacitor.",
        "Listen for restore events, reload safely, and log crash metadata for kiosk apps.",
        "| Platform | Support | Notes |\n| --- | --- | --- |\n| iOS | Yes | WKWebView termination |\n| Android | Yes | Render process gone |\n| Web | No | Handle page errors |",
        None,
    ),
    "wifi": reg(
        "Scan and manage WiFi on supported mobile platforms.",
        "Read networks and open settings for IoT provisioning flows.",
        "| Platform | Support | Notes |\n| --- | --- | --- |\n| iOS | Partial | Restricted APIs |\n| Android | Yes | Scan and connect |\n| Web | No | Not available |",
        """## Quick start

```typescript
import { CapacitorWifi } from '@capgo/capacitor-wifi';

const { networks } = await CapacitorWifi.scan();
```

## Common pitfalls

- **Location**: Android scans may need location permission.
- **iOS**: read README for supported SSID flows.
- **Secrets**: never log passwords.
""",
        bun=True,
    ),
    "light-sensor": reg(
        "Read ambient light for adaptive UI.",
        "Subscribe to lux changes to dim UI or adjust themes outdoors.",
        "| Platform | Support | Notes |\n| --- | --- | --- |\n| iOS | Yes | Light sensor |\n| Android | Yes | SensorManager |\n| Web | Partial | Ambient Light API |",
        """## Quick start

```typescript
import { LightSensor } from '@capgo/capacitor-light-sensor';

await LightSensor.start();
```

## Common pitfalls

- **Hardware**: many devices lack a sensor.
- **Stop**: call `stop()` off screen to save battery.
- **Web**: requires secure context where supported.
""",
        bun=True,
    ),
    "facebook-analytics": reg(
        "Log Meta App Events from Capacitor.",
        "Initialize the Facebook SDK and log standard events with typed names and parameters.",
        "| Platform | Support | Notes |\n| --- | --- | --- |\n| iOS | Yes | FBSDKCoreKit |\n| Android | Yes | Facebook SDK |\n| Web | See repo | Meta Pixel |",
        """## Quick start

```typescript
import { FacebookAnalytics, FacebookEventName } from '@capgo/capacitor-facebook-analytics';

await FacebookAnalytics.logEvent({ eventName: FacebookEventName.CompletedRegistration });
```

## Common pitfalls

- **ATT**: align advertiser tracking with iOS consent.
- **PII**: never send emails in parameters.
- **Init**: follow SDK initialization order in README.
""",
        gs_before="## Native Setup",
        bun=True,
    ),
    "stripe-terminal": reg(
        "In person payments with Stripe Terminal readers.",
        "Initialize with a connection token endpoint, discover readers, and collect payment intents via Stripe SDKs.",
        "| Platform | Support | Notes |\n| --- | --- | --- |\n| iOS | Yes | Stripe Terminal iOS |\n| Android | Yes | Stripe Terminal Android |\n| Web | No | Dashboard readers |",
        """## Quick start

```typescript
import { StripeTerminal } from '@capgo/capacitor-stripe-terminal';

await StripeTerminal.initialize({ tokenProviderEndpoint: 'https://api.example.com/terminal/token' });
```

## Common pitfalls

- **Tokens**: mint connection tokens server side only.
- **Bluetooth**: grant runtime permissions before discovery.
- **Offline**: enable only when Stripe account supports it.
""",
        gs_before="## Import",
    ),
}
