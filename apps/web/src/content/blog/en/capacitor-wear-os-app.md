---
slug: capacitor-wear-os-app
title: "How to Build a Wear OS App for Your Capacitor App"
description: "Build a Wear OS app for your Capacitor app: add a wear module, write the Kotlin watch side, and sync data over the Data Layer with @capgo/capacitor-watch."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-10-01T09:00:00.000Z
updated_at: 2026-10-01T03:59:51.000Z
head_image: /capgo_banner.webp
head_image_alt: "Capgo banner for a tutorial on building a Wear OS companion app for a Capacitor Android app"
keywords: Capacitor Wear OS, Wear OS app Capacitor, Ionic Wear OS, Wear OS Data Layer Capacitor, capacitor-watch Android, smartwatch Capacitor app, Kotlin Wear OS companion
tag: Tutorial, Android, Capacitor
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "Does Capacitor support Wear OS?"
    answer: "Capacitor does not run on the watch, but your Capacitor Android app can talk to a native Wear OS app. @capgo/capacitor-watch uses the Wear OS Data Layer on Android, so the phone side stays in TypeScript and the watch side is a small Kotlin app."
  - question: "Why can't my phone app see the Wear OS app?"
    answer: "The Data Layer only connects apps that share the same applicationId and are signed with the same certificate. Also check that the watch app declares the capgo_watch capability in res/values/wear.xml."
  - question: "Can a Wear OS watch talk to my iPhone app?"
    answer: "No. Wear OS watches paired with iPhones cannot use the Data Layer with an iOS app. On iOS the same plugin targets Apple Watch through WatchConnectivity."
  - question: "Do I have to write Kotlin for the watch?"
    answer: "Yes. Wear OS apps are native Android apps, usually built with Compose for Wear OS. The protocol is simple JSON over fixed Data Layer paths, so the Kotlin side stays small."
  - question: "Does the phone receive watch messages when the Capacitor app is closed?"
    answer: "Not in JavaScript. The plugin registers its Data Layer listeners while the app process runs. Use DataItems for state the phone must read later, since the Data Layer keeps them synced until the app reads them."
---

To build a Wear OS app for your Capacitor app, add a native Wear OS module to the `android/` project, give it the same application ID and signing key as the phone app, and connect the two with `@capgo/capacitor-watch`, which uses Google's Wear OS Data Layer on Android. The phone keeps its TypeScript code, and the watch runs a small Kotlin app that exchanges JSON with it.

This guide walks through the module setup, the exact Data Layer paths the plugin uses, the Kotlin code on the watch, the TypeScript code on the phone, testing with emulators, and publishing on Google Play.

## How the Capacitor to Wear OS bridge works

Wear OS has no Capacitor runtime, so the watch app is native. The plugin speaks the Data Layer API (`play-services-wearable`) on the phone, and your watch app speaks the same protocol.

| Plugin method / event | Data Layer mechanism | Path |
| --- | --- | --- |
| `sendMessage` (phone to watch) | `MessageClient` | `/capgo/message` |
| `messageReceived` (watch to phone) | `MessageClient` | `/capgo/message` |
| `messageReceivedWithReply` | `MessageClient` | `/capgo/message/withreply` |
| `replyToMessage` | `MessageClient` | `/capgo/reply/{callbackId}` |
| `updateApplicationContext` / `applicationContextReceived` | `DataClient` DataItem | `/capgo/context` |
| `transferUserInfo` / `userInfoReceived` | `DataClient` DataItem | `/capgo/userinfo/{uuid}` |

Messages carry UTF-8 JSON as raw bytes. DataItems carry the same JSON as a string under the DataMap key `payload`. The phone checks for a watch app by looking up the capability `capgo_watch`.

Knowing these paths is the whole trick. Once the watch reads and writes them, every plugin method works.

## What you need

- A Capacitor 8 app with the Android platform added ([upgrade guide](/blog/upgrade-capacitor-app-to-capacitor-8/) if you are behind).
- A recent Android Studio with the Wear OS system images installed.
- A phone with Google Play services. The Data Layer depends on it, so phones without Play services report `isSupported: false`.
- A Wear OS watch or emulator paired to an Android phone. Wear OS watches paired to an iPhone cannot reach your app.

## Step 1: Install the plugin

```bash
bun add @capgo/capacitor-watch
bunx cap sync android
```

The same package handles Apple Watch on iOS, so a cross-platform app needs one import. See the [plugin docs](/docs/plugins/watch/) for the full reference, and our [Apple Watch guide](/blog/capacitor-apple-watch-app/) for the iOS side.

## Step 2: Add a Wear OS module to the Android project

Open `android/` in Android Studio (`bunx cap open android`) and use **File > New > New Module > Wear OS**. Letting Android Studio generate the module gives you Gradle files that match your Android Gradle Plugin and Kotlin versions, which is safer than pasting a build file from a blog post. Name the module `wear`.

The wizard adds `include ':wear'` to `android/settings.gradle`. Keep it, and leave the Capacitor-managed lines alone.

### Two rules the Data Layer enforces

1. **Same `applicationId`.** In `wear/build.gradle`, set `applicationId` to exactly the value in `android/app/build.gradle`. The `namespace` can differ, the application ID cannot.
2. **Same signing certificate.** Debug builds on one machine share the debug keystore, so this usually works locally and then breaks in release. Sign the wear release build with the same upload key as the phone app.

If either rule is broken, the two apps never see each other and nothing in your code will fix it.

### Dependencies and minimum SDK

Wear OS 3 and later are based on API 30, so `minSdk 30` is a practical floor for a new watch app. Add the Data Layer and the coroutine helpers:

```groovy
dependencies {
    implementation "com.google.android.gms:play-services-wearable:20.0.1"
    implementation "org.jetbrains.kotlinx:kotlinx-coroutines-play-services:1.11.0"
    // Compose for Wear OS dependencies generated by the wizard stay as they are
}
```

### Declare the capability

Create `wear/src/main/res/values/wear.xml`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<resources xmlns:tools="http://schemas.android.com/tools"
    tools:keep="@array/android_wear_capabilities">
    <string-array name="android_wear_capabilities" translatable="false">
        <item>capgo_watch</item>
    </string-array>
</resources>
```

The string must be `capgo_watch`, because that is what the plugin queries to compute `isWatchAppInstalled`.

### Mark the app as a watch app

In `wear/src/main/AndroidManifest.xml`, the wizard adds `<uses-feature android:name="android.hardware.type.watch" />`. Decide whether the app works without the phone. A companion that only shows phone data should declare:

```xml
<meta-data
    android:name="com.google.android.wearable.standalone"
    android:value="false" />
```

## Step 3: Receive data on the watch

A `WearableListenerService` lets the system deliver Data Layer events even when the watch UI is closed. Register it with filters for the `/capgo` paths:

```xml
<service
    android:name=".PhoneListenerService"
    android:exported="true">
    <intent-filter>
        <action android:name="com.google.android.gms.wearable.MESSAGE_RECEIVED" />
        <data android:scheme="wear" android:host="*" android:pathPrefix="/capgo" />
    </intent-filter>
    <intent-filter>
        <action android:name="com.google.android.gms.wearable.DATA_CHANGED" />
        <data android:scheme="wear" android:host="*" android:pathPrefix="/capgo" />
    </intent-filter>
</service>
```

A small shared store that the UI can observe:

```kotlin
package com.example.shop.wear

import kotlinx.coroutines.flow.MutableStateFlow
import org.json.JSONObject

object WatchStore {
    val context = MutableStateFlow(JSONObject())
    val lastMessage = MutableStateFlow(JSONObject())
    val lastReply = MutableStateFlow(JSONObject())
}
```

The service parses each path:

```kotlin
package com.example.shop.wear

import com.google.android.gms.wearable.DataEvent
import com.google.android.gms.wearable.DataEventBuffer
import com.google.android.gms.wearable.DataMapItem
import com.google.android.gms.wearable.MessageEvent
import com.google.android.gms.wearable.WearableListenerService
import org.json.JSONObject

class PhoneListenerService : WearableListenerService() {

    override fun onMessageReceived(event: MessageEvent) {
        val json = JSONObject(String(event.data, Charsets.UTF_8))
        when {
            event.path == "/capgo/message" -> WatchStore.lastMessage.value = json
            event.path.startsWith("/capgo/reply/") -> WatchStore.lastReply.value = json
        }
    }

    override fun onDataChanged(events: DataEventBuffer) {
        for (event in events) {
            if (event.type != DataEvent.TYPE_CHANGED) continue
            val path = event.dataItem.uri.path ?: continue
            val payload = DataMapItem.fromDataItem(event.dataItem)
                .dataMap.getString("payload") ?: "{}"
            val json = JSONObject(payload)

            when {
                path == "/capgo/context" -> WatchStore.context.value = json
                path.startsWith("/capgo/userinfo/") -> handleUserInfo(json)
            }
        }
    }

    private fun handleUserInfo(json: JSONObject) {
        // Persist or act on queued events from the phone
    }
}
```

When the watch UI opens, also read the current context directly so it shows data that arrived while the app was closed:

```kotlin
suspend fun loadCurrentContext(context: android.content.Context) {
    val items = Wearable.getDataClient(context).dataItems.await()
    try {
        for (item in items) {
            if (item.uri.path == "/capgo/context") {
                val payload = DataMapItem.fromDataItem(item).dataMap.getString("payload") ?: "{}"
                WatchStore.context.value = JSONObject(payload)
            }
        }
    } finally {
        items.release()
    }
}
```

## Step 4: Send data from the watch

The watch sends to every connected phone node. Messages are for live interactions, DataItems for state.

```kotlin
package com.example.shop.wear

import android.content.Context
import com.google.android.gms.wearable.PutDataMapRequest
import com.google.android.gms.wearable.Wearable
import kotlinx.coroutines.tasks.await
import org.json.JSONObject
import java.util.UUID

object PhoneLink {

    suspend fun send(context: Context, data: JSONObject, expectReply: Boolean = false) {
        val path = if (expectReply) "/capgo/message/withreply" else "/capgo/message"
        val bytes = data.toString().toByteArray(Charsets.UTF_8)
        val nodes = Wearable.getNodeClient(context).connectedNodes.await()
        for (node in nodes) {
            Wearable.getMessageClient(context).sendMessage(node.id, path, bytes).await()
        }
    }

    suspend fun updateContext(context: Context, data: JSONObject) {
        // Include a timestamp: identical DataItems are not redelivered
        data.put("updatedAt", System.currentTimeMillis())
        val request = PutDataMapRequest.create("/capgo/context").apply {
            dataMap.putString("payload", data.toString())
            setUrgent()
        }.asPutDataRequest()
        Wearable.getDataClient(context).putDataItem(request).await()
    }

    suspend fun queueEvent(context: Context, data: JSONObject) {
        val request = PutDataMapRequest.create("/capgo/userinfo/${UUID.randomUUID()}").apply {
            dataMap.putString("payload", data.toString())
            setUrgent()
        }.asPutDataRequest()
        Wearable.getDataClient(context).putDataItem(request).await()
    }
}
```

When the phone receives a `/capgo/userinfo/...` item it emits `userInfoReceived` and deletes the item, so the queue does not grow forever.

A minimal Compose screen ties it together:

```kotlin
@Composable
fun OrdersScreen() {
    val context = LocalContext.current
    val scope = rememberCoroutineScope()
    val state by WatchStore.context.collectAsState()
    val reply by WatchStore.lastReply.collectAsState()

    LaunchedEffect(Unit) { loadCurrentContext(context) }

    Column(horizontalAlignment = Alignment.CenterHorizontally) {
        Text("${state.optInt("openOrders", 0)} open orders")
        Button(onClick = {
            scope.launch {
                PhoneLink.send(context, JSONObject().put("action", "refresh"), expectReply = true)
            }
        }) { Text("Refresh") }
        if (reply.has("count")) Text("Phone: ${reply.getInt("count")}")
    }
}
```

The phone generates the `callbackId`, so the watch cannot match a reply to a specific request. If you fire several requests at once, include your own request ID in the payload and echo it back in the reply.

## Step 5: Talk to the watch from your Capacitor code

The TypeScript side is the same code you would write for Apple Watch:

```typescript
import { Capacitor } from '@capacitor/core';
import { CapgoWatch } from '@capgo/capacitor-watch';

export async function initWearBridge(loadOpenOrders: () => Promise<number>) {
  if (Capacitor.getPlatform() === 'web') return;

  await CapgoWatch.addListener('messageReceivedWithReply', async ({ message, callbackId }) => {
    if (message.action === 'refresh') {
      const count = await loadOpenOrders();
      await CapgoWatch.replyToMessage({ callbackId, data: { count } });
    }
  });

  await CapgoWatch.addListener('applicationContextReceived', ({ context }) => {
    console.log('watch state', context);
  });

  await CapgoWatch.addListener('userInfoReceived', ({ userInfo }) => {
    console.log('queued event from watch', userInfo);
  });
}

export async function syncToWatch(openOrders: number) {
  const info = await CapgoWatch.getInfo();
  if (!info.isSupported || !info.isWatchAppInstalled) return;

  await CapgoWatch.updateApplicationContext({ context: { openOrders } });

  if (info.isReachable) {
    await CapgoWatch.sendMessage({ data: { toast: 'Orders updated' } });
  }
}
```

Android specifics worth knowing:

- `sendMessage` rejects with "No connected Wear OS devices found" when no watch node is connected.
- `isPaired` and `isReachable` both mean "at least one Wear OS node is connected". `isWatchAppInstalled` means a node advertises `capgo_watch`.
- Reachability is not pushed as an event on Android today. Call `getInfo()` when you need a fresh value, for example when the screen gains focus.
- Pending replies expire after five minutes on the phone side.

## Which channel to use

| Need | Use | Why |
| --- | --- | --- |
| Live button press, watch app open | `sendMessage` / `/capgo/message` | Fast, but dropped if no node is connected |
| What the watch should display | `updateApplicationContext` / `/capgo/context` | Latest value is kept and synced later |
| Events that must not be lost | `transferUserInfo` / `/capgo/userinfo/{uuid}` | Each event is its own DataItem |

## Limits of the Data Layer

- DataItems are limited to about 100 KB. Messages should stay small too. Send IDs and fetch content from your backend.
- Writing a DataItem with identical content does not trigger a change event. Add a timestamp when you need a fresh event.
- A message to the watch starts your `WearableListenerService`, not your UI.
- On the phone, the plugin's listeners exist while the Capacitor app process runs. Messages sent while it is dead are not replayed to JavaScript. DataItems stay in the Data Layer, so use context for anything the phone must see later.
- Payloads are JSON objects. Top-level arrays and non-JSON values will not parse.

## Testing with emulators and devices

1. Create a phone emulator with a Google Play system image and a Wear OS emulator in Device Manager.
2. Use Android Studio's Wear OS pairing assistant to pair them. It installs the companion app on the phone emulator.
3. Run the `wear` configuration on the watch emulator, then run your Capacitor app on the phone with `bunx cap run android`.
4. Call `CapgoWatch.getInfo()` from the phone. `isWatchAppInstalled: true` confirms the capability and package match.

For a physical watch, enable developer options and ADB debugging over Wi-Fi on the watch, then connect with `adb connect <watch-ip>:<port>`.

## Troubleshooting

**`isSupported: false`.** Google Play services or the Wear OS API is missing on the phone. Common on emulators without Play images.

**`isWatchAppInstalled: false` while a watch is connected.** The `capgo_watch` capability is missing or misspelled, or the wear app is not installed on that watch.

**Messages never arrive on the watch.** Different `applicationId` or different signing keys. Compare `./gradlew :app:signingReport` and `./gradlew :wear:signingReport`.

**Context updates stop arriving.** You are writing the same payload repeatedly. Add a changing field.

**Release build works on debug but not on Play.** If you use Play App Signing, both the phone and watch artifacts must be signed by the same app signing key in the same Play Console app.

**R8 strips your service.** Keep classes referenced only from the manifest if you use custom shrinking rules.

## Publishing on Google Play

The Wear OS app ships under the same Play Console app as the phone app, since they share the package name. Add the Wear OS form factor in Play Console, upload the wear bundle to a Wear OS release track, and add watch screenshots. Google reviews Wear OS apps against its Wear OS quality guidelines, so check round-screen layouts and touch target sizes.

For updates, [Capgo live updates](/live-update/) can push fixes to the phone app's web layer without a store release, which covers bugs in your TypeScript bridge code. Kotlin changes on the watch go through Google Play. Version your JSON payloads so a newer phone bundle stays compatible with an older watch build. If you build the phone app in the cloud, [Capgo Build](/native-build/) handles the Capacitor Android build and signing, and you can generate a matching keystore with the [Android keystore generator](/tools/android-keystore-generator/).

## Wrap-up

A Wear OS companion for a Capacitor app comes down to three pieces: `@capgo/capacitor-watch` on the phone, a Kotlin module that shares the phone's application ID and signing key, and the `/capgo/*` Data Layer paths in between. Get the capability and signing right first, then the code is short.
