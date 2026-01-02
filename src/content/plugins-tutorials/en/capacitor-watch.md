---
locale: en
---

# Complete Tutorial: Using @capgo/capacitor-watch for Apple Watch Communication

The `@capgo/capacitor-watch` package provides bidirectional communication between your iPhone app and Apple Watch companion app. This comprehensive tutorial will guide you through integrating Apple Watch connectivity into your iOS mobile apps built with Capacitor, enabling real-time messaging, state synchronization, and reliable data transfers.

## What is Capacitor?

Capacitor is Ionic's modern native runtime that enables developers to build native iOS apps, Android apps, and Progressive Web Apps from a single codebase. Unlike older Cordova-based mobile development, Capacitor provides direct access to native iOS and Android APIs, making it the ideal choice for building production-ready mobile applications. This Capacitor plugin brings Apple Watch communication capabilities to your iOS mobile platform.

## Why Use Watch Communication in Your Capacitor Mobile App?

The @capgo/capacitor-watch plugin enables your iOS mobile applications to communicate seamlessly with Apple Watch companion apps without writing complex WatchConnectivity code. This Capacitor plugin provides a unified JavaScript API that handles all the complexity of watch communication, making it perfect for extending your mobile app to the wrist.

Benefits for iOS mobile applications:
- Bidirectional messaging between iPhone and Apple Watch
- Application context syncing for state management
- Reliable user info transfers with background delivery
- Real-time reachability monitoring
- Reply/response pattern for interactive workflows
- Full TypeScript support for mobile app development
- Seamless integration with existing Capacitor mobile apps

---

# Using @capgo/capacitor-watch

The `@capgo/capacitor-watch` package allows you to communicate between your iPhone app and Apple Watch using WatchConnectivity. Here is a tutorial on how to use this package in your Capacitor app.

## Installation

To install the package, run the following command:

```bash
npm install @capgo/capacitor-watch
npx cap sync
```

## Prerequisites

Before using this plugin, ensure you have:

1. An Xcode project with a watchOS app target
2. WatchConnectivity capability added to your iOS app
3. A companion watchOS app implementing WCSessionDelegate

## Check Watch Connectivity

First, check if watch communication is available and if a watch is connected:

```typescript
import { CapgoWatch } from '@capgo/capacitor-watch';

async function checkWatchStatus() {
  const info = await CapgoWatch.getInfo();

  console.log('Watch supported:', info.isSupported);
  console.log('Watch paired:', info.isPaired);
  console.log('Watch app installed:', info.isWatchAppInstalled);
  console.log('Watch reachable:', info.isReachable);
  console.log('Activation state:', info.activationState);
  // 0 = notActivated, 1 = inactive, 2 = activated
}
```

## Send Messages to Watch

To send interactive messages to the watch (requires watch to be reachable):

```typescript
import { CapgoWatch } from '@capgo/capacitor-watch';

async function sendMessageToWatch() {
  const info = await CapgoWatch.getInfo();

  if (!info.isReachable) {
    console.log('Watch is not reachable');
    return;
  }

  await CapgoWatch.sendMessage({
    data: {
      action: 'refresh',
      userId: '12345',
      timestamp: Date.now()
    }
  });

  console.log('Message sent to watch!');
}
```

## Receive Messages from Watch

To detect messages from the watch, add a listener for the `messageReceived` event:

```typescript
import { CapgoWatch } from '@capgo/capacitor-watch';

// Listen for simple messages
CapgoWatch.addListener('messageReceived', (event) => {
  console.log('Message from watch:', event.message);
  // Handle the message
  processWatchMessage(event.message);
});
```

## Handle Messages Requiring a Reply

Some watch messages may expect a response. Use the `messageReceivedWithReply` event:

```typescript
import { CapgoWatch } from '@capgo/capacitor-watch';

// Listen for messages that need a reply
CapgoWatch.addListener('messageReceivedWithReply', async (event) => {
  console.log('Request from watch:', event.message);

  // Process the request
  const result = await processWatchRequest(event.message);

  // Send the reply back to watch
  await CapgoWatch.replyToMessage({
    callbackId: event.callbackId,
    data: {
      success: true,
      result: result
    }
  });
});
```

## Sync Application Context

Use application context for syncing app state. Only the latest context is kept:

```typescript
import { CapgoWatch } from '@capgo/capacitor-watch';

// Send context to watch
async function syncAppState() {
  await CapgoWatch.updateApplicationContext({
    context: {
      theme: 'dark',
      userId: 'user123',
      preferences: {
        notifications: true,
        units: 'metric'
      },
      lastSync: Date.now()
    }
  });
}

// Listen for context updates from watch
CapgoWatch.addListener('applicationContextReceived', (event) => {
  console.log('Context from watch:', event.context);
  updateLocalState(event.context);
});
```

## Transfer User Info Reliably

Use user info transfers for data that must be delivered reliably:

```typescript
import { CapgoWatch } from '@capgo/capacitor-watch';

// Queue data for reliable delivery
async function sendImportantData() {
  await CapgoWatch.transferUserInfo({
    userInfo: {
      recordId: 'rec123',
      action: 'created',
      data: {
        title: 'New Item',
        description: 'This will be delivered even if watch is offline'
      }
    }
  });
}

// Listen for user info from watch
CapgoWatch.addListener('userInfoReceived', (event) => {
  console.log('User info from watch:', event.userInfo);
  processUserInfo(event.userInfo);
});
```

## Monitor Connectivity Changes

Track when the watch becomes reachable or unreachable:

```typescript
import { CapgoWatch } from '@capgo/capacitor-watch';

// Track reachability
CapgoWatch.addListener('reachabilityChanged', (event) => {
  console.log('Watch reachable:', event.isReachable);

  if (event.isReachable) {
    // Watch is available for interactive messaging
    syncPendingData();
  }
});

// Track session activation
CapgoWatch.addListener('activationStateChanged', (event) => {
  // 0 = notActivated, 1 = inactive, 2 = activated
  console.log('Session state:', event.state);
});
```

## Remove Listeners

When you no longer need to listen for watch events:

```typescript
import { CapgoWatch } from '@capgo/capacitor-watch';

// Remove all listeners
await CapgoWatch.removeAllListeners();

// Or remove specific listener
const handle = await CapgoWatch.addListener('messageReceived', (event) => {
  console.log('Message:', event.message);
});

// Later...
handle.remove();
```

## Complete Example

Here's a complete service class for watch communication:

```typescript
import { CapgoWatch, WatchInfo } from '@capgo/capacitor-watch';

export class WatchService {
  private initialized = false;

  async initialize() {
    if (this.initialized) return;

    // Set up all listeners
    await CapgoWatch.addListener('messageReceived', (event) => {
      this.handleMessage(event.message);
    });

    await CapgoWatch.addListener('messageReceivedWithReply', async (event) => {
      const result = await this.processRequest(event.message);
      await CapgoWatch.replyToMessage({
        callbackId: event.callbackId,
        data: result
      });
    });

    await CapgoWatch.addListener('applicationContextReceived', (event) => {
      this.handleContextUpdate(event.context);
    });

    await CapgoWatch.addListener('reachabilityChanged', (event) => {
      this.handleReachabilityChange(event.isReachable);
    });

    this.initialized = true;
  }

  async getStatus(): Promise<WatchInfo> {
    return await CapgoWatch.getInfo();
  }

  async sendAction(action: string, data: any) {
    const info = await this.getStatus();
    if (info.isReachable) {
      await CapgoWatch.sendMessage({ data: { action, ...data } });
    } else {
      // Fall back to user info for reliable delivery
      await CapgoWatch.transferUserInfo({ userInfo: { action, ...data } });
    }
  }

  async syncState(state: any) {
    await CapgoWatch.updateApplicationContext({ context: state });
  }

  private handleMessage(message: any) {
    console.log('Received:', message);
  }

  private async processRequest(message: any): Promise<any> {
    // Process and return result
    return { success: true };
  }

  private handleContextUpdate(context: any) {
    console.log('Context updated:', context);
  }

  private handleReachabilityChange(reachable: boolean) {
    console.log('Watch reachable:', reachable);
  }

  async cleanup() {
    await CapgoWatch.removeAllListeners();
    this.initialized = false;
  }
}
```

## Platform-Specific Notes

### iOS Mobile Platform

- Requires iOS 15.0+ (minimum for Capacitor 8)
- Uses WatchConnectivity framework for communication
- Session automatically activates when plugin loads
- Supports background delivery for context and user info
- Works with all Apple Watch models compatible with watchOS 9+

### Android and Web Platforms

- Apple Watch is only available on iOS
- On Android, all methods reject with "Apple Watch is only supported on iOS"
- On Web, all methods throw unavailable errors
- Use `getInfo()` to check `isSupported` before calling other methods

## watchOS App Implementation

Your watchOS companion app needs to implement WatchConnectivity. See the plugin documentation for a complete SwiftUI example.

## Conclusion

You have successfully integrated @capgo/capacitor-watch into your Capacitor mobile application for iOS. This plugin provides seamless bidirectional communication between your iPhone app and Apple Watch, enabling you to extend your mobile experience to the wrist.

For detailed API documentation and advanced watch features, visit the [GitHub repository](https://github.com/Cap-go/capacitor-watch).

Whether you're building health apps, productivity tools, or any iOS application that benefits from watch connectivity, this plugin provides the native capabilities you need for professional mobile app development on the Apple ecosystem.
