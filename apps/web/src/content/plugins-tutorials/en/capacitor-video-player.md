---
locale: en
---

# Complete Tutorial: Using @capgo/capacitor-video-player for iOS and Android

The `@capgo/capacitor-video-player` package provides native video playback capabilities for your Capacitor mobile applications on iOS and Android. This tutorial covers integrating full-featured video playback into your iOS and Android mobile apps built with Capacitor or Cordova, including fullscreen mode, subtitles, and comprehensive playback controls.

## What is Capacitor Video Player?

The @capgo/capacitor-video-player plugin brings native video playback to your iOS and Android mobile apps. Unlike web-based video players, this Capacitor plugin uses native iOS AVPlayer and Android ExoPlayer for optimal performance and battery efficiency on mobile devices. This works seamlessly in both Capacitor and Cordova mobile applications.

## Why Use Native Video Player in Mobile Apps?

Native video playback is essential for professional iOS and Android mobile applications:

- Hardware-accelerated playback on iOS and Android devices
- Better battery life compared to web video players
- Full subtitle support (VTT, SRT) on iOS and Android
- Picture-in-picture mode for mobile platforms
- Fullscreen and embedded video modes
- Comprehensive playback controls for mobile apps
- Background audio support on iOS and Android
- Works with local and remote videos in Capacitor apps

## Installation for iOS and Android

To install the @capgo/capacitor-video-player package for your Capacitor mobile app:

```bash
npm install @capgo/capacitor-video-player
npx cap sync
```

This syncs the video player with your native iOS and Android projects.

## Basic Video Playback for Mobile Apps

### Initialize Video Player on iOS and Android

```typescript
import { CapacitorVideoPlayer } from '@capgo/capacitor-video-player';

// Initialize video player for iOS and Android
const result = await CapacitorVideoPlayer.initPlayer({
  mode: 'fullscreen',
  url: 'https://example.com/video.mp4',
  playerId: 'myPlayer',
  subtitle: 'https://example.com/subtitles.vtt'
});

console.log('Video player ready for mobile device');
```

### Control Playback on Mobile Devices

```typescript
// Play video on iOS or Android
await CapacitorVideoPlayer.play({ playerId: 'myPlayer' });

// Pause video on mobile device
await CapacitorVideoPlayer.pause({ playerId: 'myPlayer' });

// Seek to position in mobile app
await CapacitorVideoPlayer.setCurrentTime({
  playerId: 'myPlayer',
  seektime: 30 // seconds
});

// Adjust volume on iOS or Android
await CapacitorVideoPlayer.setVolume({
  playerId: 'myPlayer',
  volume: 0.8
});
```

## Platform-Specific Features

### iOS Video Player Features

- Uses native iOS AVPlayer for mobile video playback
- Picture-in-picture support on iOS devices
- Background audio playback on iPhone and iPad
- Integration with iOS media controls
- Supports iOS 10.0+ mobile devices

### Android Video Player Features

- Uses Android ExoPlayer for native playback
- Chromecast support on Android devices
- Custom accent colors for Android mobile apps
- Works with Android 5.0+ mobile devices
- Optimized for all Android manufacturers

## Conclusion

You have successfully integrated native video playback into your Capacitor mobile application for iOS and Android. This plugin provides professional-grade video playback using native iOS and Android video players.

For detailed API documentation, visit the [GitHub repository](https://github.com/Cap-go/capacitor-video-player).
