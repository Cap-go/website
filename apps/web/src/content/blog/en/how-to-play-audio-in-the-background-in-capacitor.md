---
slug: how-to-play-audio-in-the-background-in-capacitor
title: "How to Play Audio in the Background in Capacitor"
description: "Play audio in the background in Capacitor: iOS audio background mode, Android foreground service, lock screen controls, playlists, and interruptions."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-10-01T09:00:00.000Z
updated_at: 2026-10-01T09:00:00.000Z
head_image: /capgo_plugins.webp
head_image_alt: "Background audio playback with lock screen controls in a Capacitor app"
keywords: capacitor background audio, play audio in background capacitor, ionic background audio, capacitor native audio, capacitor media session, UIBackgroundModes audio, android foreground service media playback
tag: Tutorial, Capacitor, Mobile
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "Why does audio stop when my Capacitor app goes to the background?"
    answer: "On iOS, the app is suspended unless it declares the audio background mode and uses a playback audio session. On Android, the system pauses the WebView and can kill the process unless playback runs inside a foreground service of type mediaPlayback with a visible notification."
  - question: "Can I use the HTML audio element for background playback?"
    answer: "Yes. With the audio background mode on iOS and @capgo/capacitor-media-session on Android, which runs a mediaPlayback foreground service while the session is playing or paused, an HTML audio element keeps playing with the screen locked. Web Audio API contexts are less reliable in the background, so use an audio element for long playback."
  - question: "Which Android permissions are needed for background audio?"
    answer: "FOREGROUND_SERVICE and, for apps targeting Android 14 (API 34) or higher, FOREGROUND_SERVICE_MEDIA_PLAYBACK. Add WAKE_LOCK if you stream over the network with the screen off. The service must declare android:foregroundServiceType=\"mediaPlayback\"."
  - question: "Will Apple reject an app that uses the audio background mode?"
    answer: "Only if the mode is misused. Apple expects audible content the user started, such as music, podcasts, audiobooks or guided sessions. Playing silent audio to keep the app alive for other work is a common rejection reason under guideline 2.5.4."
  - question: "How do I show play and pause buttons on the lock screen?"
    answer: "Set metadata and action handlers with @capgo/capacitor-media-session (setMetadata, setPlaybackState, setActionHandler), or enable showNotification in @capgo/native-audio and pass notificationMetadata when you preload a track."
---

To play audio in the background in Capacitor, you need two native pieces: the `audio` background mode on iOS, and a `mediaPlayback` foreground service on Android. Add lock screen controls through a media session, and your music, podcast or meditation app keeps playing when the user locks the phone or switches apps. This guide shows both setups on Capacitor 8, with `@capgo/native-audio` for native playback and `@capgo/capacitor-media-session` for system controls.

## Why audio stops in the background

A Capacitor app is a native shell around a WebView, so it follows each platform's lifecycle rules:

| | iOS | Android |
| --- | --- | --- |
| What happens on background | App is suspended within seconds | Activity is paused, WebView timers throttle, process can be killed |
| What keeps audio alive | `UIBackgroundModes` contains `audio`, audio session category `playback` | A foreground service of type `mediaPlayback` with a notification |
| Silent switch | `playback` category ignores it, `ambient` respects it | No equivalent |
| Lock screen controls | `MPNowPlayingInfoCenter` and `MPRemoteCommandCenter` | `MediaSession` with a media style notification |
| Store rule | Must play audible content the user expects (guideline 2.5.4) | Foreground service type must match real use, declared in Play Console |

Neither platform gives you background audio by default, and fixing only one side is the most common reason for "works on iPhone, stops on Android" bug reports.

## Choose your playback approach

There are two good architectures:

1. **Native playback with `@capgo/native-audio`**: audio is decoded by AVFoundation on iOS and Media3 ExoPlayer on Android. Best for music players, audiobooks, meditation apps, and anything where the WebView might be throttled. It supports local files, remote URLs, HLS streams, fades, rate, and Now Playing metadata.
2. **HTML `<audio>` plus `@capgo/capacitor-media-session`**: keep your existing web player and let the plugin publish metadata and controls to the OS. On Android it also runs the foreground service while the session is playing. Best when you already have a web player or need a single code path for web and native.

| | `@capgo/native-audio` | `<audio>` + media session |
| --- | --- | --- |
| Playback engine | Native | WebView |
| Web support | Yes (HTML audio fallback) | Yes |
| Lock screen metadata | `showNotification` + `notificationMetadata` | `setMetadata` |
| Android foreground service | You start one | Plugin starts it while playing or paused |
| Remote control events | `playbackState` listener | `setActionHandler` |
| Precise low-latency SFX | Yes | Limited |

## Configure iOS for background audio

Open `ios/App/App/Info.plist` and add the background mode. You can also tick "Audio, AirPlay, and Picture in Picture" under Signing & Capabilities, Background Modes in Xcode, which writes the same key:

```xml
<key>UIBackgroundModes</key>
<array>
  <string>audio</string>
</array>
```

The audio session category matters too. `@capgo/native-audio` sets it for you: with `showNotification: true` it uses `.playback` with the default mode, which interrupts other apps (Spotify pauses) and makes your app the Now Playing app. With `showNotification: false` it uses `.playback` with `mixWithOthers`, which is right for sound effects but does not show lock screen controls. Pick one per app, not per track.

If you play through `<audio>`, WebKit activates the playback session when media starts. Make sure playback is started from a user gesture the first time, or iOS will block it.

Build with Xcode 26 or later before uploading to App Store Connect, which has been required since April 2026. [Capgo Build](/native-build/) can do that in the cloud if you work on Windows or Linux.

## Configure Android for background audio

Add the permissions to `android/app/src/main/AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.FOREGROUND_SERVICE" />
<uses-permission android:name="android.permission.FOREGROUND_SERVICE_MEDIA_PLAYBACK" />
<uses-permission android:name="android.permission.WAKE_LOCK" />
<uses-permission android:name="android.permission.POST_NOTIFICATIONS" />
```

`FOREGROUND_SERVICE_MEDIA_PLAYBACK` is mandatory for apps targeting Android 14 (API 34) or higher, and Capacitor 8 targets API 36. Without it, starting the service throws a `SecurityException`. When you publish, Play Console asks you to declare the foreground service type and justify it. "Media playback the user started" is the accepted use.

`POST_NOTIFICATIONS` is a runtime permission on Android 13+. Media session notifications are exempt from the notification permission and still show in the shade, but any other notification your service posts needs it.

Android 12+ blocks starting a foreground service while the app is in the background. Start it when the user presses play, while your activity is visible.

### Option A: let the media session plugin run the service

`@capgo/capacitor-media-session` declares a `mediaPlayback` service in its own manifest and starts it when you set the playback state to `playing` or `paused`. It stops it when the state goes back to `none` and the app is in the background. If you want the service to run for the whole app session, set the plugin config in `capacitor.config.ts`:

```typescript
plugins: {
  MediaSession: {
    foregroundService: 'always',
  },
},
```

The default, starting only during playback, is what most apps want.

### Option B: start your own foreground service

`@capgo/native-audio` handles playback, focus and the media notification, but it does not create the foreground service. If you use it without the media session plugin, add a small service and a local plugin to your Android project.

`android/app/src/main/java/com/example/app/PlaybackService.java`:

```java
package com.example.app;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.Service;
import android.content.Intent;
import android.content.pm.ServiceInfo;
import android.os.Build;
import android.os.IBinder;
import androidx.core.app.NotificationCompat;

public class PlaybackService extends Service {
    private static final String CHANNEL_ID = "playback";

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel(
                CHANNEL_ID, "Playback", NotificationManager.IMPORTANCE_LOW);
            getSystemService(NotificationManager.class).createNotificationChannel(channel);
        }
        Notification notification = new NotificationCompat.Builder(this, CHANNEL_ID)
            .setContentTitle("Playing audio")
            .setSmallIcon(R.mipmap.ic_launcher)
            .setOngoing(true)
            .build();

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
            startForeground(1, notification, ServiceInfo.FOREGROUND_SERVICE_TYPE_MEDIA_PLAYBACK);
        } else {
            startForeground(1, notification);
        }
        return START_NOT_STICKY;
    }

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }
}
```

`PlaybackServicePlugin.java` in the same package:

```java
package com.example.app;

import android.content.Intent;
import androidx.core.content.ContextCompat;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "PlaybackService")
public class PlaybackServicePlugin extends Plugin {
    @PluginMethod
    public void start(PluginCall call) {
        ContextCompat.startForegroundService(getContext(), new Intent(getContext(), PlaybackService.class));
        call.resolve();
    }

    @PluginMethod
    public void stop(PluginCall call) {
        getContext().stopService(new Intent(getContext(), PlaybackService.class));
        call.resolve();
    }
}
```

Register it in `MainActivity.java` before `super.onCreate`, and declare the service in the manifest:

```java
public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(PlaybackServicePlugin.class);
        super.onCreate(savedInstanceState);
    }
}
```

```xml
<service
    android:name=".PlaybackService"
    android:exported="false"
    android:foregroundServiceType="mediaPlayback" />
```

From TypeScript:

```typescript
import { Capacitor, registerPlugin } from '@capacitor/core';

interface PlaybackServicePlugin {
  start(): Promise<void>;
  stop(): Promise<void>;
}

export const PlaybackService = registerPlugin<PlaybackServicePlugin>('PlaybackService');

export const isAndroid = Capacitor.getPlatform() === 'android';
```

## Play audio natively with @capgo/native-audio

```bash
bun add @capgo/native-audio
bunx cap sync
```

Configure once at startup, then preload and play:

```typescript
import { NativeAudio } from '@capgo/native-audio';
import { PlaybackService, isAndroid } from './playback-service';

await NativeAudio.configure({
  focus: true,               // request audio focus, pause others
  background: true,          // keep playing in the background
  backgroundPlayback: true,  // Android: skip auto pause on background
  showNotification: true,    // lock screen and notification controls
});

export async function playEpisode(id: string, url: string, title: string, artwork: string) {
  await NativeAudio.preload({
    assetId: id,
    assetPath: url,
    isUrl: true,
    notificationMetadata: {
      title,
      artist: 'My Podcast',
      artworkUrl: artwork,
    },
  });

  if (isAndroid) await PlaybackService.start();
  await NativeAudio.play({ assetId: id });
}

export async function stopEpisode(id: string) {
  await NativeAudio.stop({ assetId: id });
  await NativeAudio.unload({ assetId: id });
  if (isAndroid) await PlaybackService.stop();
}
```

`assetPath` accepts a path relative to your web assets (`audio/intro.mp3`), a `file://` URL, an `https://` URL or an HLS `.m3u8` stream. For anything other than a bundled asset, set `isUrl: true`. If your audio host requires auth, pass `headers`.

### Build a playlist that advances on its own

The `complete` event fires when a track ends, even with the screen locked, because the native player keeps running:

```typescript
const queue = [
  { id: 'ep1', url: 'https://cdn.example.com/ep1.mp3', title: 'Episode 1' },
  { id: 'ep2', url: 'https://cdn.example.com/ep2.mp3', title: 'Episode 2' },
];
let index = 0;

await NativeAudio.addListener('complete', async ({ assetId }) => {
  await NativeAudio.unload({ assetId });
  index += 1;
  if (index < queue.length) {
    const next = queue[index];
    await NativeAudio.preload({
      assetId: next.id,
      assetPath: next.url,
      isUrl: true,
      notificationMetadata: { title: next.title, artist: 'My Podcast' },
    });
    await NativeAudio.play({ assetId: next.id });
  } else if (isAndroid) {
    await PlaybackService.stop();
  }
});
```

Keep the foreground service running between tracks. If you stop it after one track and try to start it again while in the background, Android 12+ throws `ForegroundServiceStartNotAllowedException`.

### Keep your UI in sync with the lock screen

Users will press pause on the lock screen, on headphones, or in the notification. Listen to `playbackState` and treat the native player as the source of truth:

```typescript
await NativeAudio.addListener('playbackState', (event) => {
  // event.state: 'playing' | 'paused' | 'stopped'
  // event.reason: 'play', 'pause', 'remotePlay', 'complete', ...
  store.setPlaying(event.isPlaying);
  if (event.currentTime !== undefined) store.setPosition(event.currentTime);
});

await NativeAudio.addListener('currentTime', ({ currentTime }) => {
  store.setPosition(currentTime); // every 100 ms while playing
});
```

Also refresh state when the app returns to the foreground, using `isPlaying` and `getCurrentTime`, since the WebView may have been paused while events were emitted.

## Use an HTML audio element with media session controls

If you already have a web player, keep it and add the plugin:

```bash
bun add @capgo/capacitor-media-session
bunx cap sync
```

```typescript
import { MediaSession } from '@capgo/capacitor-media-session';

const audio = new Audio();
audio.preload = 'auto';

export async function play(track: { url: string; title: string; artist: string; cover: string }) {
  audio.src = track.url;
  await audio.play();

  await MediaSession.setMetadata({
    title: track.title,
    artist: track.artist,
    artwork: [{ src: track.cover, sizes: '512x512', type: 'image/jpeg' }],
  });
  await MediaSession.setPlaybackState({ playbackState: 'playing' });
}

await MediaSession.setActionHandler({ action: 'play' }, async () => {
  await audio.play();
  await MediaSession.setPlaybackState({ playbackState: 'playing' });
});
await MediaSession.setActionHandler({ action: 'pause' }, async () => {
  audio.pause();
  await MediaSession.setPlaybackState({ playbackState: 'paused' });
});
await MediaSession.setActionHandler({ action: 'seekto' }, (details) => {
  if (details.seekTime != null) audio.currentTime = details.seekTime;
});
await MediaSession.setActionHandler({ action: 'nexttrack' }, () => playNext());

audio.addEventListener('timeupdate', () => {
  MediaSession.setPositionState({
    duration: audio.duration || 0,
    position: audio.currentTime,
    playbackRate: audio.playbackRate,
  });
});
```

Call `setPositionState` at most once or twice a second in production. The lock screen interpolates between updates, and flooding the bridge with `timeupdate` events wastes battery.

## Handle interruptions and route changes

Phone calls, Siri, alarms and other apps interrupt playback. Native audio pauses on interruption and, on iOS, resumes when the system says it should. Two more cases need your attention:

- **Headphones unplugged**: users expect playback to pause. On Android, register a receiver for `AudioManager.ACTION_AUDIO_BECOMING_NOISY` in your service if your player does not already pause. On iOS, listen for route changes with [`@capgo/capacitor-audio-session`](/plugins/capacitor-audiosession/):

```typescript
import { AudioSession, RouteChangeReasons } from '@capgo/capacitor-audio-session';

await AudioSession.addListener('routeChanged', (reason) => {
  if (reason === RouteChangeReasons.OLD_DEVICE_UNAVAILABLE) {
    pausePlayback();
  }
});

await AudioSession.addListener('interruption', (type) => {
  // 'began' or 'ended'
});
```

- **Ducking vs. pausing**: navigation prompts duck your audio. Spoken-word apps should pause instead, since lowered speech is hard to follow.

## Test background playback

Simulators lie about background behavior. Test on real devices:

1. Start playback, lock the screen, wait two minutes. Audio must keep playing.
2. Use the lock screen play, pause, next and seek controls, then unlock and check your UI matches.
3. Play, switch to another app that plays audio, then come back.
4. Start a phone call or FaceTime audio during playback.
5. On Android, enable battery saver and test on a Samsung or Xiaomi device. Some OEMs kill background apps aggressively. A foreground service survives, a plain background task does not.
6. On Android 13+, deny the notification permission and confirm playback still works.
7. Let a playlist run through several tracks with the screen off.

`adb shell dumpsys activity services | grep -A3 PlaybackService` shows whether your service is running in the foreground.

## Troubleshooting

**Audio stops after about 30 seconds on iOS**: `UIBackgroundModes` lacks `audio`, or the session category is `ambient` or `soloAmbient`. Check `Info.plist` in the built app, not only in your source.

**Audio stops after a few minutes on Android**: no foreground service, or the service is not of type `mediaPlayback`. Also check OEM battery optimization settings.

**`SecurityException: Starting FGS with type mediaPlayback ... requires permissions`**: add `FOREGROUND_SERVICE_MEDIA_PLAYBACK`.

**`ForegroundServiceStartNotAllowedException`**: you started the service while the app was in the background. Start it on the user's play tap.

**No lock screen controls on iOS**: `showNotification` is false (mixable session), or no metadata was set. Only the app that owns a non-mixable session becomes the Now Playing app.

**Two notifications on Android**: you enabled `showNotification` in native audio and also posted your own service notification. Keep the service notification minimal, or use the media session plugin's service only.

**Other music apps keep playing over yours**: you configured a mixable session. Set `focus: true` and `showNotification: true`.

## Ship player changes faster

Queue logic, UI, metadata, and analytics for your player live in JavaScript. Once the native setup above is in a store build, [Capgo live updates](/live-update/) let you push fixes to that code without a new review cycle. The [native audio docs](/docs/plugins/native-audio/) and [media session docs](/docs/plugins/media-session/) cover every option, and if your app also records audio, see the [Capacitor audio recorder plugin](/plugins/capacitor-audio-recorder/).
