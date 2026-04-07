---
locale: en
---

# Complete Tutorial: Using @capgo/capacitor-ffmpeg for iOS and Android Video Processing

The `@capgo/capacitor-ffmpeg` package provides powerful native video encoding, compression, and processing capabilities for your Capacitor mobile applications on iOS and Android. This comprehensive tutorial will guide you through integrating FFmpeg video processing into your iOS and Android mobile apps built with Capacitor or Cordova. Whether you're building a social media app, video editing application, or any mobile app requiring video processing, this Capacitor plugin brings native FFmpeg capabilities to both iOS and Android platforms.

## What is Capacitor?

Capacitor is Ionic's modern native runtime that enables developers to build native iOS apps, Android apps, and Progressive Web Apps from a single codebase. Unlike older Cordova-based mobile development, Capacitor provides direct access to native iOS and Android APIs, making it perfect for performance-intensive tasks like video processing. This Capacitor plugin leverages native iOS VideoToolbox and Android MediaCodec for hardware-accelerated video encoding on mobile devices.

## Why Use FFmpeg in Your Capacitor Mobile App?

Video processing is essential for modern mobile applications. The @capgo/capacitor-ffmpeg plugin enables your iOS and Android mobile app to:

- Compress large videos to reduce file size for mobile storage and network transmission
- Re-encode videos with custom resolution and bitrate for iOS and Android compatibility
- Convert video formats natively on iOS and Android devices
- Process user-generated video content directly in your mobile application
- Optimize videos for social media sharing from iOS and Android apps
- Create video thumbnails and previews on mobile platforms
- Handle video encoding without server-side processing in your Capacitor app

This Capacitor plugin wraps the powerful FFmpeg library, providing a unified JavaScript API that works seamlessly on both iOS and Android mobile platforms, eliminating the need to write separate native code for iOS or Android video processing.

## Installation for iOS and Android Mobile Platforms

To install the @capgo/capacitor-ffmpeg package in your Capacitor mobile application, run the following command in your project's root directory:

```bash
npm install @capgo/capacitor-ffmpeg
npx cap sync
```

The `npx cap sync` command synchronizes the Capacitor plugin with your native iOS and Android projects, integrating FFmpeg video processing libraries for both mobile platforms.

## iOS Platform Configuration for Video Processing

For iOS mobile apps, the plugin integrates with native iOS VideoToolbox for hardware-accelerated video encoding. The Capacitor plugin automatically configures FFmpeg for iOS devices (iPhone and iPad), providing optimal video processing performance on iOS mobile platforms.

## Android Platform Configuration for Video Encoding

For Android mobile applications, the plugin leverages native Android MediaCodec and FFmpeg libraries for video processing. Capacitor handles Android configuration automatically, ensuring FFmpeg works across all Android devices and manufacturers for your mobile app.

## Basic Video Processing in Capacitor Mobile Apps

### Re-encoding Videos on iOS and Android

The primary use case for FFmpeg in mobile applications is video re-encoding. This works identically on both iOS and Android mobile platforms:

```typescript
import { CapacitorFFmpeg } from '@capgo/capacitor-ffmpeg';

// Re-encode video for mobile app
async function compressVideo() {
  await CapacitorFFmpeg.reencodeVideo({
    inputPath: '/path/to/input/video.mp4',
    outputPath: '/path/to/output/video.mp4',
    width: 1280,
    height: 720,
    bitrate: 2000000 // 2 Mbps for mobile sharing
  });

  console.log('Video compressed for iOS and Android');
}

// Use in your Capacitor mobile application
compressVideo();
```

### Getting Plugin Version for Mobile Platforms

Verify the FFmpeg plugin version running on your iOS or Android device:

```typescript
import { CapacitorFFmpeg } from '@capgo/capacitor-ffmpeg';

// Check version on iOS and Android
async function checkFFmpegVersion() {
  const { version } = await CapacitorFFmpeg.getPluginVersion();
  console.log('FFmpeg plugin version on mobile device:', version);
}
```

## Conclusion

You have successfully integrated the @capgo/capacitor-ffmpeg plugin into your Capacitor mobile application. This plugin provides powerful native video encoding and processing capabilities for both iOS and Android mobile platforms, enabling you to compress, convert, and optimize videos directly on mobile devices.

For detailed API documentation and advanced video processing features for mobile app development, visit the [GitHub repository](https://github.com/Cap-go/capacitor-ffmpeg).

Whether you're building a social media mobile app, video editing application, or any iOS/Android app requiring video processing, this FFmpeg Capacitor plugin provides the native capabilities you need for professional-grade mobile video processing on both iOS and Android platforms.
