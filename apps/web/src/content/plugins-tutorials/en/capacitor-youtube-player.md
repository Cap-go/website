---
locale: en
---

# Complete Tutorial: Using @capgo/capacitor-youtube-player for iOS and Android

The `@capgo/capacitor-youtube-player` package provides comprehensive YouTube video integration for your Capacitor mobile applications on iOS and Android. This tutorial covers embedding YouTube videos with full player API control in your iOS and Android mobile apps built with Capacitor or Cordova, including playlists, quality settings, and event handling.

## What is Capacitor YouTube Player?

The @capgo/capacitor-youtube-player plugin brings native YouTube video playback to your iOS and Android mobile apps. This Capacitor plugin wraps the official YouTube Player API, providing full control over YouTube videos in your mobile application. Works seamlessly in both Capacitor and Cordova mobile projects on iOS and Android platforms.

## Why Use YouTube Player in Mobile Apps?

YouTube integration is essential for video content in iOS and Android mobile applications:

- Embed YouTube videos natively in iOS and Android apps
- Full control over playback in mobile applications
- Playlist support for YouTube content on mobile devices
- Quality adjustment for mobile network conditions
- Event listeners for player state on iOS and Android
- Cue and autoplay control in Capacitor apps
- Works with YouTube iframe API on mobile platforms
- Optimal performance on iOS and Android devices

## Installation for iOS and Android

To install the @capgo/capacitor-youtube-player package for your Capacitor mobile app:

```bash
npm install @capgo/capacitor-youtube-player
npx cap sync
```

This syncs the YouTube player with your native iOS and Android projects.

## Basic YouTube Integration in Mobile Apps

### Initialize YouTube Player on iOS and Android

```typescript
import { YoutubePlayer } from '@capgo/capacitor-youtube-player';

// Initialize YouTube player for iOS and Android
const { player } = await YoutubePlayer.initialize({
  playerId: 'youtube-player',
  playerSize: { width: 1280, height: 720 },
  videoId: 'dQw4w9WgXcQ',
  fullscreen: false,
  playerVars: {
    autoplay: 0,
    controls: 1
  }
});

console.log('YouTube player ready for mobile device');
```

### Control YouTube Playback on Mobile Devices

```typescript
// Play YouTube video on iOS or Android
await YoutubePlayer.playVideo(playerId);

// Pause YouTube video on mobile device
await YoutubePlayer.pauseVideo(playerId);

// Seek in YouTube video on iOS and Android
await YoutubePlayer.seekTo(playerId, 30, true);

// Adjust quality for mobile network
await YoutubePlayer.setPlaybackQuality(playerId, 'hd720');
```

### Handle YouTube Playlists in Mobile Apps

```typescript
// Load YouTube playlist on iOS and Android
await YoutubePlayer.loadPlaylist(playerId, {
  listType: 'playlist',
  list: 'PLAYLIST_ID'
});

// Navigate playlist on mobile device
await YoutubePlayer.nextVideo(playerId);
await YoutubePlayer.previousVideo(playerId);
```

## Event Handling for iOS and Android

### Listen to YouTube Player Events on Mobile Devices

```typescript
// Monitor player state on iOS and Android
YoutubePlayer.addEventListener(playerId, 'onStateChange', (event) => {
  console.log('YouTube player state on mobile device:', event.data);
  // -1: unstarted, 0: ended, 1: playing, 2: paused, 3: buffering, 5: cued
});

// Handle errors on iOS or Android
YoutubePlayer.addEventListener(playerId, 'onError', (event) => {
  console.error('YouTube error on mobile device:', event.data);
});

// Quality changes on mobile app
YoutubePlayer.addEventListener(playerId, 'onPlaybackQualityChange', (event) => {
  console.log('Quality changed on mobile device:', event.data);
});
```

## Platform-Specific Features

### iOS YouTube Player

- Uses WKWebView with YouTube iframe API on iOS devices
- Fullscreen support on iPhone and iPad
- Works with iOS 9.0+ mobile devices
- Optimal performance on iOS mobile platform

### Android YouTube Player

- Uses WebView with YouTube iframe API on Android devices
- Fullscreen support on Android mobile devices
- Works with Android 5.0+ mobile devices
- Compatible with all Android manufacturers

## Conclusion

You have successfully integrated YouTube video playback into your Capacitor mobile application for iOS and Android. This plugin provides comprehensive YouTube Player API access for professional mobile apps.

For detailed API documentation, visit the [GitHub repository](https://github.com/Cap-go/capacitor-youtube-player).
