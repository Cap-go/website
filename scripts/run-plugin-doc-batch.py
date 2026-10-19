#!/usr/bin/env python3
"""Apply plugin doc enrichment patches. Usage: python3 scripts/run-plugin-doc-batch.py 4"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1] / "apps/docs/src/content/docs/docs/plugins"

BATCHES: dict[int, dict] = {}


def reg(tagline: str, overview: str, table: str, gs: str | None = None, gs_before: str | None = None, bun: bool = False):
    return (tagline, overview, table, gs, gs_before, bun)


def load_batches():
    B = BATCHES
    B[4] = {
        "native-market": reg(
            "Open Play Store and App Store listings from your Capacitor app.",
            "`@capgo/capacitor-native-market` deep links users to store listings for ratings, upgrades, and support flows. Android adds Play search and collection helpers.",
            "| Platform | Support | Notes |\n| --- | --- | --- |\n| iOS | Yes | App Store listing |\n| Android | Yes | Play listing plus search helpers |\n| Web | No | Use store URLs |",
            """## Quick start

```typescript
import { NativeMarket } from '@capgo/capacitor-native-market';

await NativeMarket.openStoreListing({ appId: 'com.example.app' });
```

## Example: Play Store search (Android)

```typescript
await NativeMarket.search({ terms: 'fitness tracker' });
```

## Common pitfalls

- **Bundle vs package**: iOS uses App Store bundle id, Android uses application id.
- **Android only**: guard `openDevPage` and `openCollection` with `Capacitor.getPlatform()`.
- **External UI**: store UI opens outside your WebView, plan return deep links separately.
""",
            bun=True,
        ),
        "share-target": reg(
            "Receive text, links, and files shared into your Capacitor app.",
            "Listen for `shareReceived` so Android and iOS share sheets can hand content to JavaScript without custom share extensions per MIME type.",
            "| Platform | Support | Notes |\n| --- | --- | --- |\n| iOS | Yes | Share extension setup in Xcode |\n| Android | Yes | Intent filters in manifest |\n| Web | No | Use PWA share target separately |",
            """## Quick start

```typescript
import { CapacitorShareTarget } from '@capgo/capacitor-share-target';

await CapacitorShareTarget.addListener('shareReceived', (event) => {
  routeSharedPayload(event.title, event.texts, event.files);
});
```

## Common pitfalls

- **Native setup**: intents only work after manifest and Xcode steps in the README.
- **Cold start**: buffer shares until your router is ready.
- **File URIs**: copy to app storage before upload, access may expire.
""",
        ),
        "android-kiosk": reg(
            "Pin Android devices to a single app with kiosk mode and launcher control.",
            "`@capgo/capacitor-android-kiosk` locks fleet tablets to one Capacitor experience with kiosk mode, launcher pinning, and hardware key policies.",
            "| Platform | Support | Notes |\n| --- | --- | --- |\n| iOS | No | Android focused |\n| Android | Yes | Device owner provisioning per README |\n| Web | No | Not applicable |",
            """## Quick start

```typescript
import { CapacitorAndroidKiosk } from '@capgo/capacitor-android-kiosk';

await CapacitorAndroidKiosk.enterKioskMode();
```

## Common pitfalls

- **Launcher**: set the app as default launcher for reliable kiosk lock.
- **MDM**: validate escape hatches before shipping fleet builds.
- **iOS**: not supported.
""",
            bun=True,
        ),
        "mqtt": reg(
            "MQTT connect, subscribe, and publish from Capacitor.",
            "Bridge IoT dashboards and live ops tools with a native MQTT client while your WebView stays in the foreground.",
            "| Platform | Support | Notes |\n| --- | --- | --- |\n| iOS | Yes | Native client |\n| Android | Yes | Native client |\n| Web | Yes | Browser transport per README |",
            """## Quick start

```typescript
import { MqttBridge } from '@capgo/capacitor-mqtt';

await MqttBridge.connect({
  serverURI: 'wss://broker.example.com',
  port: 443,
  clientId: 'cap-app-1',
  setAutomaticReconnect: true,
});
await MqttBridge.subscribe({ topic: 'devices/telemetry', qos: 1 });
```

## Common pitfalls

- **TLS**: match `serverURI` scheme with broker requirements.
- **Background**: reconnect after Android suspends the WebView.
- **QoS**: higher QoS costs battery on cellular links.
""",
        ),
        "recaptcha": reg(
            "Generate reCAPTCHA Enterprise or v3 tokens on mobile and web.",
            "Configure site keys in `capacitor.config.ts`, run `execute()` for actions like login, and verify tokens on your backend.",
            "| Platform | Support | Notes |\n| --- | --- | --- |\n| iOS | Yes | Enterprise mobile SDK |\n| Android | Yes | Enterprise mobile SDK |\n| Web | Yes | Enterprise or v3 |",
            """## Quick start

```typescript
import { Recaptcha } from '@capgo/capacitor-recaptcha';

const { token } = await Recaptcha.execute({ action: 'login' });
await verifyOnServer(token, 'login');
```

## Common pitfalls

- **Server verify**: tokens are short lived, assess with Google before trusting clients.
- **Keys**: set per platform site keys in config.
- **Enterprise flag**: must match key type in Google Cloud.
""",
            gs_before="## Configure Site Keys",
        ),
        "android-inline-install": reg(
            "Google Play inline installs without leaving your Capacitor app.",
            "Wrap Play Core inline install when you distribute through Play and need in app update prompts.",
            "| Platform | Support | Notes |\n| --- | --- | --- |\n| iOS | No | Use App Store flows |\n| Android | Yes | Play inline install |\n| Web | No | Not applicable |",
            """## Quick start

```typescript
import { AndroidInlineInstall } from '@capgo/capacitor-android-inline-install';

await AndroidInlineInstall.startInlineInstall({
  id: 'com.example.companion',
  overlay: true,
  fallback: true,
});
```

## Common pitfalls

- **Play only**: sideloaded APKs cannot inline install.
- **versionCode**: must exceed the installed build.
- **Dismissal**: handle cancel without infinite retry loops.
""",
            bun=True,
        ),
        "age-range": reg(
            "Read age range signals from Google Play and Apple.",
            "Call `requestAgeRange()` before showing social, commerce, or UGC features that require age gating.",
            "| Platform | Support | Notes |\n| --- | --- | --- |\n| iOS | Yes | Declared Age Range when available |\n| Android | Yes | Play Age Signals |\n| Web | No | Use server side checks |",
            """## Quick start

```typescript
import { AgeRange } from '@capgo/capacitor-age-range';

const result = await AgeRange.requestAgeRange({ ageGates: [13, 16, 18] });
```

## Common pitfalls

- **Not ID proof**: signals aid compliance UX, not government ID.
- **Unknown status**: design defaults for older OS versions.
- **Disclosures**: document usage in privacy policies.
""",
            bun=True,
        ),
        "pretty-toast": reg(
            "Native styled toasts with loading and promise helpers.",
            "Use `toast.success()` and `toast.loading()` instead of blocking alerts for lightweight feedback.",
            "| Platform | Support | Notes |\n| --- | --- | --- |\n| iOS | Yes | Native surface |\n| Android | Yes | Material style |\n| Web | Yes | DOM fallback |",
            """## Quick start

```typescript
import { toast } from '@capgo/capacitor-pretty-toast';

toast.success('Saved', { message: 'Draft synced.' });
```

## Common pitfalls

- **Loading ids**: keep ids when calling `toast.update()`.
- **Debouncing**: rapid errors should collapse into one toast.
- **Branding**: tune icons and colors per platform.
""",
            gs_before="## Show A Toast",
            bun=True,
        ),
        "jw-player": reg(
            "Embed JW Player for streaming, ads, and analytics.",
            "Initialize with your license, play remote media, and listen for playback events from the native JW SDK.",
            "| Platform | Support | Notes |\n| --- | --- | --- |\n| iOS | Yes | JW iOS SDK |\n| Android | Yes | JW Android SDK |\n| Web | See repo | JW web player |",
            """## Quick start

```typescript
import { JwPlayer } from '@capgo/capacitor-jw-player';

await JwPlayer.initialize({ licenseKey: 'YOUR_JW_LICENSE' });
await JwPlayer.play({ mediaUrl: 'https://cdn.example.com/stream.m3u8', mediaType: 'video' });
```

## Common pitfalls

- **License**: valid JW license required before `initialize()`.
- **DRM**: pass DRM configs from your backend, never embed secrets.
- **Audio**: coordinate with `@capgo/capacitor-audiosession` on iOS.
""",
            bun=True,
        ),
        "background-task": reg(
            "Periodic background fetch tasks on iOS and Android.",
            "Define module scope tasks, schedule intervals, and return results the OS understands for sync and cache warming.",
            "| Platform | Support | Notes |\n| --- | --- | --- |\n| iOS | Yes | BGTaskScheduler identifiers in Info.plist |\n| Android | Yes | WorkManager style jobs |\n| Web | No | Use service workers |",
            """## Common pitfalls

- **Module scope**: register `defineTask` before `registerTaskAsync`.
- **iOS ids**: match `BGTaskSchedulerPermittedIdentifiers` entries.
- **Intervals**: OS may delay jobs beyond `minimumInterval`.
""",
            gs_before="## Define A Task",
        ),
        "audiosession": reg(
            "Configure iOS audio routing for playback and VoIP.",
            "Read active outputs and override speaker routes before other audio plugins fight over AVAudioSession.",
            "| Platform | Support | Notes |\n| --- | --- | --- |\n| iOS | Yes | AVAudioSession routing |\n| Android | Partial | See README |\n| Web | No | Browser policies differ |",
            """## Quick start

```typescript
import { AudioSession } from '@capgo/capacitor-audiosession';

await AudioSession.overrideOutput('speaker');
```

## Common pitfalls

- **iOS focus**: routing APIs target iOS audio session behavior.
- **Restore**: call `overrideOutput('default')` after calls end.
- **Ordering**: configure before Twilio or media plugins start.
""",
            bun=True,
        ),
        "android-sms-retriever": reg(
            "Read one app targeted SMS OTP on Android without SMS permissions.",
            "Start the retriever, listen for `smsReceived`, and parse OTP hashes your server includes in the SMS body.",
            "| Platform | Support | Notes |\n| --- | --- | --- |\n| iOS | No | Use autofill or passkeys |\n| Android | Yes | SMS Retriever API |\n| Web | No | Not applicable |",
            """## Quick start

```typescript
import { AndroidSmsRetriever } from '@capgo/capacitor-android-sms-retriever';

await AndroidSmsRetriever.addListener('smsReceived', ({ message }) => {
  const code = message.match(/\\b\\d{6}\\b/)?.[0];
  if (code) submitCode(code);
});
await AndroidSmsRetriever.startWatch();
```

## Common pitfalls

- **Hash**: SMS templates must include the app retriever hash.
- **Timeout**: restart watch when users request a new code.
- **Play services**: required on device.
""",
            bun=True,
        ),
        "twilio-voice": reg(
            "Place and receive VoIP calls with Twilio Voice.",
            "Login with access tokens, place calls with `makeCall()`, and control mute and speaker from JavaScript.",
            "| Platform | Support | Notes |\n| --- | --- | --- |\n| iOS | Yes | CallKit per README |\n| Android | Yes | ConnectionService |\n| Web | Limited | Twilio Voice JS |",
            """## Quick start

```typescript
import { CapacitorTwilioVoice } from '@capgo/capacitor-twilio-voice';

await CapacitorTwilioVoice.login({ accessToken: tokenFromBackend });
await CapacitorTwilioVoice.makeCall({ to: '+15551234567' });
```

## Common pitfalls

- **Token TTL**: refresh Twilio tokens before expiry.
- **Inbound**: configure VoIP push on iOS.
- **Mic permission**: request before placing calls.
""",
            bun=True,
        ),
        "speech-recognition": reg(
            "Stream speech to text with partial results.",
            "Request microphone access, start recognition with locale options, and render partial transcripts live.",
            "| Platform | Support | Notes |\n| --- | --- | --- |\n| iOS | Yes | Speech framework |\n| Android | Yes | SpeechRecognizer |\n| Web | Partial | Browser API varies |",
            """## Quick start

```typescript
import { SpeechRecognition } from '@capgo/capacitor-speech-recognition';

await SpeechRecognition.requestPermissions();
await SpeechRecognition.start({ language: 'en-US', partialResults: true });
await SpeechRecognition.addListener('partialResults', ({ matches }) => setTranscript(matches[0] ?? ''));
```

## Common pitfalls

- **Cleanup**: remove listeners when leaving the screen.
- **Locales**: use BCP 47 tags matching your UI.
- **Web**: guard unavailable browsers.
""",
            bun=True,
        ),
        "contacts": reg(
            "List, search, create, and update device contacts.",
            "Wrap the native address book with permission helpers and picker flows for invites and referrals.",
            "| Platform | Support | Notes |\n| --- | --- | --- |\n| iOS | Yes | Contacts framework |\n| Android | Yes | ContactsContract |\n| Web | Partial | Contact Picker when available |",
            """## Quick start

```typescript
import { CapacitorContacts } from '@capgo/capacitor-contacts';

await CapacitorContacts.requestPermissions();
const { contacts } = await CapacitorContacts.getContacts();
```

## Common pitfalls

- **Rationale**: explain why contacts access is needed before the dialog.
- **Pagination**: avoid loading entire address books at once.
- **Writes**: creating contacts needs write permission.
""",
            bun=True,
        ),
    }


load_batches()


def patch_index_file(slug: str, tagline: str, overview: str, table: str) -> None:
    path = ROOT / slug / "index.mdx"
    text = path.read_text()
    if "## Platform support" in text:
        print("skip index", slug)
        return
    text = re.sub(r'tagline: "[^"]*"', f'tagline: "{tagline}"', text, count=1)
    platform = f"## Platform support\n\n{table}\n\n"
    block = f"## Overview\n\n{overview}\n\n{platform}"
    m = re.search(r"## Overview\n\n[\s\S]*?\n\n## ", text)
    if not m:
        print("overview fail", slug)
        return
    text = text[: m.start()] + block + "## " + text[m.end() :]
    path.write_text(text)
    print("index", slug)


def patch_gs(slug: str, block: str | None, before: str | None, bun: bool) -> None:
    if not block:
        return
    path = ROOT / slug / "getting-started.mdx"
    text = path.read_text()
    if bun:
        text = text.replace("npm install @capgo/", "bun add @capgo/")
        text = text.replace("npx cap sync", "bunx cap sync")
    if "## Quick start" in text and "## Quick start" in block:
        if "## Common pitfalls" not in block.split("\n")[0:3]:
            print("skip gs", slug)
            return
    if block[:40] in text:
        print("dup gs", slug)
        return
    pattern = before or "## API Overview"
    if pattern not in text:
        for alt in [
            "## Define A Task",
            "## Show A Toast",
            "## Configure Site Keys",
            "## Import",
        ]:
            if alt in text:
                pattern = alt
                break
        else:
            print("no insert", slug)
            return
    text = text.replace(pattern, block + "\n" + pattern, 1)
    path.write_text(text)
    print("gs", slug)


def main() -> None:
    batch = int(sys.argv[1])
    for slug, (tag, ov, table, gs, gs_before, bun) in BATCHES[batch].items():
        patch_index_file(slug, tag, ov, table)
        patch_gs(slug, gs, gs_before, bun)


if __name__ == "__main__":
    main()
