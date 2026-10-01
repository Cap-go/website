---
slug: capacitor-apple-watch-app
title: "How to Build an Apple Watch App for a Capacitor App"
description: "Build an Apple Watch app for your Capacitor app: add a watchOS target, write the SwiftUI side, and sync data with the iPhone using @capgo/capacitor-watch."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-10-01T09:00:00.000Z
updated_at: 2026-10-01T09:00:00.000Z
head_image: /capgo_banner.webp
head_image_alt: "Capgo banner for a guide on building an Apple Watch companion app for a Capacitor iOS app"
keywords: Capacitor Apple Watch, Apple Watch app Capacitor, Ionic Apple Watch, watchOS Capacitor, WatchConnectivity Capacitor, capacitor-watch plugin, SwiftUI watch app
tag: Tutorial, iOS, Capacitor
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "Can you build an Apple Watch app with Capacitor or Ionic?"
    answer: "Not the watch UI itself. watchOS has no WKWebView, so the watch app is written in SwiftUI. Your Capacitor iPhone app talks to it through WatchConnectivity, which @capgo/capacitor-watch exposes to JavaScript."
  - question: "Do I need to write Swift for the Apple Watch app?"
    answer: "Yes, for the watch side. The CapgoWatchSDK Swift package reduces that to a few lines for connectivity, so most of the Swift you write is SwiftUI views. The iPhone side stays in TypeScript."
  - question: "Why does sendMessage reject with 'Watch is not reachable'?"
    answer: "sendMessage only works while the watch app is running in the foreground and connected. Check getInfo().isReachable first, and fall back to updateApplicationContext or transferUserInfo, which queue data until the watch can receive it."
  - question: "Can Capgo live updates change the Apple Watch app?"
    answer: "No. Live updates replace the web bundle of the iPhone app only. The watch app is compiled Swift, so changes to it ship through a normal App Store release."
  - question: "Does the Apple Watch app need its own App Store listing?"
    answer: "No. A companion watch app is embedded in the iOS app, uploaded in the same archive, and appears on the same App Store record with its own Apple Watch screenshots."
---

To build an Apple Watch app for a Capacitor app, you add a native watchOS target to your iOS project, write its UI in SwiftUI, and connect it to your web code with the `@capgo/capacitor-watch` plugin, which wraps Apple's WatchConnectivity framework. The phone app keeps its Capacitor web layer, and the watch app becomes a small native companion that sends and receives dictionaries.

This guide covers the full path on Capacitor 8 and Xcode 26: the architecture, the Xcode target, the Swift and TypeScript code on each side, which transfer method to use, testing on simulators and devices, and how the watch app ships.

## Why the watch UI is native and the phone stays Capacitor

watchOS does not ship a WebView. There is no `WKWebView` on the watch, so a Capacitor app cannot run there, and no plugin changes that. What you can do is split responsibilities:

| Layer | Runs on | Language | Job |
| --- | --- | --- | --- |
| Capacitor app | iPhone | TypeScript, your framework of choice | Business logic, network, auth, storage |
| `@capgo/capacitor-watch` | iPhone | Swift (plugin), JS API | Bridges WatchConnectivity to JavaScript |
| CapgoWatchSDK | Apple Watch | Swift | Session handling on the watch |
| Watch app | Apple Watch | SwiftUI | Small screens, glanceable UI, quick actions |

In practice the watch app is "dependent": it gets its data from the phone. Keep logic on the phone where it already exists in TypeScript, and send the watch only what it needs to display.

## Prerequisites

- A Capacitor 8 app with the iOS platform added. If you are still on an older version, follow the [Capacitor 8 upgrade guide](/blog/upgrade-capacitor-app-to-capacitor-8/) first.
- Xcode 26 on a Mac. Apple has required Xcode 26 for App Store uploads since April 2026, see [the Xcode 26 requirement](/blog/xcode-26-requirement-for-capacitor-apps/).
- An Apple Developer account for device testing and distribution.
- iOS 15 or later on the phone (the plugin minimum) and watchOS 9 or later on the watch (the SDK minimum).
- Ideally, a real iPhone paired with a real Apple Watch. Simulators help, but they do not cover every transfer type.

## Step 1: Install the plugin on the phone side

```bash
bun add @capgo/capacitor-watch
bunx cap sync ios
```

The plugin activates `WCSession` as soon as it loads, so there is no init call. Start by reading the connection state:

```typescript
import { CapgoWatch } from '@capgo/capacitor-watch';

const info = await CapgoWatch.getInfo();
console.log({
  supported: info.isSupported,          // false on iPad, Android without Wear OS, and web
  paired: info.isPaired,                // an Apple Watch is paired with this iPhone
  installed: info.isWatchAppInstalled,  // your watch app is on that watch
  reachable: info.isReachable,          // live messaging is possible right now
  state: info.activationState,          // 0 notActivated, 1 inactive, 2 activated
});
```

The full API reference lives in the [plugin docs](/docs/plugins/watch/) and the [plugin page](/plugins/capacitor-watch/).

## Step 2: Add a watchOS target in Xcode

Open the iOS project with `bunx cap open ios`. Capacitor 8 projects created with Swift Package Manager open `App.xcodeproj`; older CocoaPods projects open `App.xcworkspace`. Either works.

1. Choose **File > New > Target**, select the **watchOS** tab, then **App**.
2. Name it, for example `MyWatch`, and use **SwiftUI** as the interface.
3. In the options sheet, make sure the watch app is embedded in your existing `App` target as its companion. That setting is what makes Xcode embed the watch app in the iPhone build and set the companion bundle identifier.
4. Leave notification scenes and complications off unless you need them now. You can add widgets later.
5. Accept the prompt to activate the new scheme.

### The bundle identifier rule

The watch app's bundle ID must start with the iPhone app's bundle ID. If your app is `com.example.shop`, Xcode proposes `com.example.shop.watchkitapp`. Keep that prefix. If you change the iOS bundle ID later, change the watch one too, or the build will fail validation and WatchConnectivity will not pair the two apps.

Under **Signing & Capabilities**, select the same team for both targets. With automatic signing, Xcode registers the second App ID and provisioning profile for you.

### Add CapgoWatchSDK to the watch target

1. **File > Add Package Dependencies**.
2. Enter `https://github.com/Cap-go/capacitor-watch.git`.
3. Use "Up to Next Major Version" from `8.0.0`.
4. When Xcode asks which products to add, select only **CapgoWatchSDK** and assign it to the **watch** target, not the iOS app. The iOS side already gets the plugin through `cap sync`.

## Step 3: Write the watch app in SwiftUI

The SDK exposes `WatchConnector.shared`, an `ObservableObject` with published `isReachable`, `isActivated`, `lastMessage`, and `applicationContext` properties. Activate it when the app starts:

```swift
import SwiftUI
import CapgoWatchSDK

@main
struct MyWatchApp: App {
    init() {
        WatchConnector.shared.activate()
    }

    var body: some Scene {
        WindowGroup {
            OrdersView()
        }
    }
}
```

A small screen that shows data pushed from the phone and sends an action back:

```swift
import SwiftUI
import CapgoWatchSDK

struct OrdersView: View {
    @ObservedObject private var connector = WatchConnector.shared
    @State private var status = ""

    var openOrders: Int {
        connector.applicationContext["openOrders"] as? Int ?? 0
    }

    var body: some View {
        VStack(spacing: 8) {
            Text("\(openOrders)")
                .font(.system(size: 44, weight: .bold))
            Text("open orders")
                .font(.footnote)
                .foregroundStyle(.secondary)

            Button("Refresh") {
                refresh()
            }
            .disabled(!connector.isReachable)

            if !status.isEmpty {
                Text(status).font(.caption2)
            }
        }
    }

    private func refresh() {
        Task {
            do {
                let reply = try await connector.sendMessage(["action": "refresh"])
                status = "Updated \(reply["count"] as? Int ?? 0)"
            } catch {
                status = "iPhone not reachable"
            }
        }
    }
}
```

The `async` variant of `sendMessage` sends with a reply handler, so the phone receives it as a `messageReceivedWithReply` event. The callback-based variant `sendMessage(_:replyHandler:errorHandler:)` lets you skip the reply.

If you prefer delegate callbacks over observing published properties, conform to `WatchConnectorDelegate` and set `WatchConnector.shared.delegate`. It has methods for messages, messages with a reply handler, application context, user info, reachability, and activation.

## Step 4: Talk to the watch from TypeScript

Register listeners early, for example in your app bootstrap, so events that arrive at launch are not missed.

```typescript
import { CapgoWatch } from '@capgo/capacitor-watch';

export async function setupWatchBridge(getOpenOrders: () => Promise<number>) {
  // Watch asked for something and is waiting for an answer
  await CapgoWatch.addListener('messageReceivedWithReply', async (event) => {
    if (event.message.action === 'refresh') {
      const count = await getOpenOrders();
      await CapgoWatch.replyToMessage({
        callbackId: event.callbackId,
        data: { count },
      });
      await pushStateToWatch(count);
    }
  });

  // Fire-and-forget messages from the watch
  await CapgoWatch.addListener('messageReceived', (event) => {
    console.log('watch says', event.message);
  });

  await CapgoWatch.addListener('reachabilityChanged', (event) => {
    console.log('watch reachable:', event.isReachable);
  });

  await pushStateToWatch(await getOpenOrders());
}

export async function pushStateToWatch(openOrders: number) {
  const info = await CapgoWatch.getInfo();
  if (!info.isSupported || !info.isPaired || !info.isWatchAppInstalled) return;

  // Latest state only, delivered when the watch app next runs
  await CapgoWatch.updateApplicationContext({
    context: { openOrders, updatedAt: Date.now() },
  });
}
```

Always reply to `messageReceivedWithReply`. The watch is waiting, and an unanswered request ends in a timeout error on the watch side.

## Which transfer method should you use?

WatchConnectivity gives you three channels, and the plugin maps each one:

| Method | Delivery | Needs watch reachable | Good for |
| --- | --- | --- | --- |
| `sendMessage` | Immediate | Yes, rejects otherwise | Button taps, live updates while both apps are open |
| `updateApplicationContext` | Latest value wins, delivered when possible | No | Current state: counts, settings, logged-in user |
| `transferUserInfo` | Queued, delivered in order | No | Events that must all arrive: logged workouts, created records |

A pattern that works well: use application context as the source of truth for what the watch displays, use `sendMessage` only for interactions while the watch app is open, and use `transferUserInfo` for anything you cannot afford to drop.

## Limits to design around

- **Payload size.** WatchConnectivity rejects payloads that are too large with `payloadTooLarge`, and Apple does not publish a fixed byte count for every channel. Keep payloads small: IDs, counts, short strings. Fetch large content from your API instead.
- **Payload types.** Data must be property-list compatible: strings, numbers, booleans, dates, data, arrays, and dictionaries. `null` values from JavaScript are not valid. Strip them before sending.
- **The phone must be running your app to handle events.** Listeners live in the Capacitor JavaScript runtime. If iOS has terminated the app, events will not reach your TypeScript until the app runs again. Context and user info stay queued by the system, but design the watch UI so it works from cached context.
- **Pairing.** An Apple Watch only pairs with an iPhone. Android users cannot use it, and the plugin's Android implementation targets Wear OS instead, covered in our [Wear OS guide](/blog/capacitor-wear-os-app/).
- **Independence.** A companion app built on WatchConnectivity depends on the phone. If the watch must work far from the phone, add a second data source such as your own API over the watch's network connection.

## Testing on simulators and devices

You can iterate on SwiftUI layout in the watch simulator, but data transfer needs a paired setup.

```bash
xcrun simctl list devices
xcrun simctl pair <watch-udid> <phone-udid>
```

Run the iOS app on the paired iPhone simulator, then run the watch scheme on the watch simulator. Both apps must be installed before `isWatchAppInstalled` turns true. Apple notes that the Simulator does not support `transferUserInfo`, so confirm that path on real hardware.

For devices, plug in the iPhone, make sure the watch has developer mode enabled, and select the watch as the run destination for the watch scheme. Use `getInfo()` as your smoke test:

| `getInfo()` result | Meaning |
| --- | --- |
| `isPaired: false` | No watch paired with this phone |
| `isWatchAppInstalled: false` | Watch app missing, or bundle ID / companion setting wrong |
| `isReachable: false`, rest true | Watch app not in the foreground or out of range |
| `activationState: 2`, all true | Ready for `sendMessage` |

## Troubleshooting

**`isWatchAppInstalled` stays false.** Check the watch bundle ID prefix, check that the watch target is embedded in the `App` target (Build Phases > Embed Watch Content), and reinstall both apps.

**Messages from the watch never reach JavaScript.** Register listeners before the watch sends, and confirm the watch calls `WatchConnector.shared.activate()` on launch. On the phone, check the Xcode console for the plugin's activation log.

**`sendMessage` rejects with "Watch is not reachable".** Expected when the watch app is closed. Fall back to `updateApplicationContext`.

**`replyToMessage` seems ignored.** Pass the exact `callbackId` from the event and reply quickly. The watch's reply handler has a timeout.

**Build fails with "Embedded binary's bundle identifier is not prefixed".** The watch bundle ID must start with the iOS bundle ID.

**Archive upload rejected for missing icons.** Watch targets need their own app icon in `Assets.xcassets`.

## Shipping the watch app

The watch app is not a separate product. It is embedded in the iOS archive, uploaded together, and shown on the same App Store Connect record, where you add Apple Watch screenshots under the watch tab. Whatever produces your archive, local Xcode, CI, or [Capgo Build](/native-build/), needs a provisioning profile for both bundle IDs and must use Xcode 26.

Keep one thing in mind for updates. [Capgo live updates](/live-update/) can ship changes to the phone's web bundle without a store review, which is handy when the TypeScript side of your watch bridge has a bug. Swift code on the watch, and any change to the native plugin, still goes through the App Store. Version your message format, for example with a `v` field in every dictionary, so a newer phone bundle keeps working with an older watch build.

## Wrap-up

The split is simple once you accept it: SwiftUI for the wrist, Capacitor for everything else, and three WatchConnectivity channels in between. Install `@capgo/capacitor-watch`, add the watch target with CapgoWatchSDK, keep payloads small, and test on paired hardware before you submit.
