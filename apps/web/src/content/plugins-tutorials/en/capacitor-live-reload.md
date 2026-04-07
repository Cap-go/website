---
locale: en
---

# Complete Tutorial: Using @capgo/capacitor-live-reload for iOS and Android Development

The `@capgo/capacitor-live-reload` package enables instant hot module replacement and live reloading for your Capacitor mobile applications during iOS and Android development. This comprehensive tutorial will guide you through setting up live reload for your iOS and Android mobile apps built with Capacitor or Cordova, dramatically speeding up mobile app development by eliminating rebuild cycles.

## What is Capacitor Live Reload?

Live reload is essential for fast mobile app development. The @capgo/capacitor-live-reload plugin connects your iOS and Android devices directly to your development server, enabling instant updates without rebuilding your native mobile application. This works seamlessly for both iOS and Android Capacitor apps, and is also compatible with Cordova mobile development.

## Why Use Live Reload in Capacitor Mobile Development?

Traditional iOS and Android mobile app development requires rebuilding and reinstalling after every code change. This Capacitor plugin eliminates that friction:

- Instant updates on iOS and Android devices without rebuilding
- Connect native mobile apps to your Vite or Webpack dev server
- Hot module replacement for iOS and Android applications
- Faster iteration during mobile app development
- WebSocket-based live updates for Capacitor apps
- Works with physical iOS devices and Android phones
- Compatible with both Capacitor and Cordova mobile projects

## Installation for iOS and Android Development

To install the @capgo/capacitor-live-reload package for your Capacitor mobile app development:

```bash
npm install @capgo/capacitor-live-reload
npx cap sync
```

This Capacitor plugin syncs with your native iOS and Android projects, enabling live reload capabilities for mobile development.

## Basic Setup for Mobile App Development

### Configure Dev Server for iOS and Android

```typescript
import { LiveReload } from '@capgo/capacitor-live-reload';

// Configure for iOS and Android development
await LiveReload.configureServer({
  url: 'http://192.168.1.100:5173', // Your dev server for mobile devices
  websocketPath: '/capgo-livereload',
  autoReconnect: true,
  reconnectInterval: 2000
});

// Connect mobile app to dev server
await LiveReload.connect();
console.log('Live reload active for iOS and Android development');
```

### Listen for Reload Events in Mobile App

```typescript
import { LiveReload } from '@capgo/capacitor-live-reload';

// Handle reload events on iOS or Android device
LiveReload.addListener('reloadEvent', (event) => {
  console.log('Reload event on mobile device:', event.type);

  if (event.type === 'full-reload') {
    console.log('Reloading Capacitor mobile app');
  } else if (event.type === 'file-update') {
    console.log('Hot update in iOS or Android app:', event.file);
  }
});

// Monitor connection status for mobile development
LiveReload.addListener('statusChange', (status) => {
  console.log('Dev server connection:', status.connected ? 'Connected' : 'Disconnected');
});
```

## Advanced Mobile Development Setup

### Complete Live Reload Service for Capacitor

```typescript
import { LiveReload } from '@capgo/capacitor-live-reload';

export class MobileDevelopmentServer {
  private connected = false;

  async initialize(serverUrl: string) {
    // Only enable for mobile app development
    if (process.env.NODE_ENV !== 'development') {
      return;
    }

    try {
      // Configure for iOS and Android development
      await LiveReload.configureServer({
        url: serverUrl,
        websocketPath: '/capgo-livereload',
        autoReconnect: true,
        reconnectInterval: 3000
      });

      // Set up listeners for mobile development
      await LiveReload.addListener('reloadEvent', this.handleReload.bind(this));
      await LiveReload.addListener('statusChange', this.handleStatus.bind(this));

      // Connect mobile device to dev server
      await LiveReload.connect();
      console.log('Mobile development server connected for iOS and Android');
    } catch (error) {
      console.error('Failed to connect mobile app to dev server:', error);
    }
  }

  private handleReload(event: any) {
    switch (event.type) {
      case 'full-reload':
        console.log('Full reload triggered on mobile device');
        window.location.reload();
        break;
      case 'file-update':
        console.log('Hot update on iOS or Android app:', event.file?.path);
        break;
    }
  }

  private handleStatus(status: any) {
    this.connected = status.connected;
    console.log(`Dev server ${status.connected ? 'connected' : 'disconnected'} for mobile development`);
  }
}

// Use in Capacitor mobile app development
const devServer = new MobileDevelopmentServer();
await devServer.initialize('http://192.168.1.100:5173');
```

## Vite Configuration for Mobile Development

Configure Vite for iOS and Android live reload:

```typescript
// vite.config.ts for Capacitor mobile development
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    host: '0.0.0.0', // Allow iOS and Android devices to connect
    port: 5173,
    hmr: {
      path: '/capgo-livereload', // Custom path for mobile app
    }
  }
});
```

## Best Practices for iOS and Android Development

### 1. Use Local Network IP for Mobile Devices

```typescript
// Get your local IP for iOS and Android development
const devServerUrl = 'http://192.168.1.100:5173'; // Use your actual IP
await LiveReload.configureServer({ url: devServerUrl });
```

### 2. Only Enable in Development for Mobile Apps

```typescript
// Enable only during iOS and Android development
if (import.meta.env.DEV) {
  await LiveReload.configureServer({
    url: process.env.VITE_DEV_SERVER_URL || 'http://localhost:5173'
  });
  await LiveReload.connect();
}
```

### 3. Handle Connection Errors in Mobile Development

```typescript
try {
  await LiveReload.connect();
  console.log('Connected to dev server for mobile development');
} catch (error) {
  console.warn('Could not connect mobile app to dev server');
  // Mobile app continues with production build
}
```

## Platform-Specific Notes

### iOS Development

- Works with iOS 11.0+ for mobile app development
- Use Mac's local IP for iOS device connection
- Ensure iOS device and Mac are on same network
- Compatible with iPhone and iPad development

### Android Development

- Works with Android 5.0+ for mobile app development
- Use `adb reverse` for localhost on Android:
  ```bash
  adb reverse tcp:5173 tcp:5173
  ```
- Works across all Android device manufacturers
- Compatible with Android emulators and physical devices

## Capacitor vs Cordova for Live Reload

This live reload plugin works with both Capacitor and Cordova mobile frameworks, but Capacitor offers advantages for iOS and Android development:

- Better WebSocket support for mobile platforms
- Faster reload times on iOS and Android
- Modern development experience
- Direct native API access

## Conclusion

You have successfully integrated the @capgo/capacitor-live-reload plugin into your Capacitor mobile development workflow. This plugin provides instant hot reloading for both iOS and Android mobile apps, dramatically speeding up mobile app development by eliminating rebuild cycles.

For detailed API documentation and advanced mobile development features, visit the [GitHub repository](https://github.com/Cap-go/capacitor-live-reload).

Whether you're building iOS apps, Android apps, or cross-platform Capacitor mobile applications, this live reload solution makes mobile development faster and more efficient.
