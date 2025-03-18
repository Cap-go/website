---
slug: how-live-updates-for-capacitor-work
title: 'How Live Updates Work in Capgo'
description: 'Deep dive into the technical implementation of live updates in Capgo, understanding how it works under the hood for both iOS and Android.'
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2024-03-18T06:14:25.862Z
updated_at: 2024-03-18T15:14:16.781Z
head_image: https://assets.seobotai.com/capgo.app/live-updates-capacitor.jpg
head_image_alt: 'Live Updates Architecture'
keywords: 'Capgo live updates, OTA updates, Capacitor updates, mobile app development, app updates'
tag: 'Development, Mobile, Updates'
published: true
locale: en
next_blog: ''
---

# Understanding Live Updates in Capgo

Live updates are one of the most powerful features in Capacitor apps, allowing real-time updates without app store submissions. Let's dive deep into how Capgo implements this functionality.

## Core Concepts

A Capacitor app consists of two main layers:

1. **Web Layer**: Contains HTML, CSS, and JavaScript files loaded in the WebView
2. **Native Layer**: Contains platform-specific code (Java/Kotlin for Android, Swift for iOS)

Capgo's live update system works by replacing the web layer at runtime, as these files aren't compiled into the app binary.

## Technical Implementation

### Server Paths in Capacitor

Capgo manages two critical paths:

- **Current Server Path**: Points to files currently loaded in WebView
- **Next Server Path**: Points to files that will load on next app restart

### Android Implementation

On Android, Capgo manages paths through:

```java
// Store next server path
private void setNextCapacitorServerPath(String path) {
    SharedPreferences prefs = context.getSharedPreferences("CapWebViewSettings", Activity.MODE_PRIVATE);
    SharedPreferences.Editor editor = prefs.edit();
    editor.putString("serverBasePath", path);
    editor.apply();
}

// Update current path and reload
private void setCurrentCapacitorServerPath(String path) {
    bridge.setServerBasePath(path);
    bridge.reload();
}
```

### iOS Implementation

On iOS, paths are managed through:

```swift
// Store next server path
private func setNextCapacitorServerPath(path: String) {
    KeyValueStore.standard["serverBasePath"] = path
}

// Update current path
private func setCurrentCapacitorServerPath(path: String) {
    bridge.viewController.setServerBasePath(path: path)
}
```

## Security Measures

Capgo implements military-grade security through end-to-end encryption, ensuring your app updates remain completely secure from development to deployment. Our encryption system goes beyond traditional code signing to provide true zero-knowledge security.

### End-to-End Encryption Architecture

1. **End-to-End Encryption (E2EE)**: Every update bundle is encrypted using AES-256-GCM encryption before leaving your development environment. This military-grade encryption ensures that your app updates remain completely private and secure throughout the entire delivery process.

2. **Zero-Knowledge Architecture**: Unlike other OTA update solutions that only sign updates, Capgo employs true zero-knowledge encryption. This means:
   - Update contents are encrypted before upload
   - Capgo servers only store encrypted data
   - Decryption only happens on end-user devices
   - No intermediary can access your update content

3. **Secure Key Management**: 
   - Encryption keys are generated and stored securely in your CI/CD environment
   - Private keys never touch Capgo's servers
   - Each app version can use unique encryption keys
   - Key rotation support for enhanced security

Learn more about our encryption system in our detailed guide: [End-to-End Encryption in Capgo Live Updates](https://capgo.app/blog/introducing-end-to-end-security-to-capacitor-updater-with-code-signing/)

### Update Security Process

1. **Pre-Upload Encryption**:
   - Updates are encrypted in your CI/CD pipeline
   - Each file is individually encrypted
   - Metadata is also encrypted for complete privacy

2. **Secure Storage**:
   - Encrypted bundles are stored on Capgo's global CDN
   - No plain text data ever touches our servers
   - Even in case of server breach, data remains secure

3. **Secure Delivery**:
   - Updates are delivered through encrypted channels
   - Each app instance validates encryption integrity
   - Automatic retry mechanisms for failed decryption

4. **Client-Side Security**:
   - Updates are verified before installation
   - Failed decryption triggers automatic rollback
   - Secure key storage in app's protected storage

This comprehensive security approach ensures that your app updates remain protected against:
- Man-in-the-middle attacks
- Server-side breaches
- Unauthorized modifications
- Replay attacks
- Content tampering

## Update Lifecycle

Capgo's update process is designed to be automatic by default. Here's how the automatic process works:

### 1. Automatic Update Check

The plugin automatically checks for updates in these situations:
- When app starts

This behavior is controlled by the `autoUpdate` setting:

```typescript
// capacitor.config.json
{
  "plugins": {
    "CapacitorUpdater": {
      "autoUpdate": true // Enable automatic updates
    }
  }
}
```
You can also check manually with with `getLatest()`

### 2. Automatic Download

When a new version is detected, if `autoUpdate` is enabled:
1. Download starts automatically
2. Progress is tracked internally
3. Failed downloads auto-retry at each app open
4. Successful downloads are stored in app storage

You can monitor this process through events:
```typescript
CapacitorUpdater.addListener('download', (info: DownloadEvent) => {
  console.log('Auto-download progress:', info.percent);
});

CapacitorUpdater.addListener('downloadComplete', (info: DownloadCompleteEvent) => {
  console.log('Auto-download complete:', info.bundle);
});
```

### 3. Automatic Installation

The installation timing depends on your configuration:

```typescript
// capacitor.config.json
{
  "plugins": {
    "CapacitorUpdater": {
      "autoUpdate": true,
      "directUpdate": false // install update on app backgrounding
      "resetWhenUpdate": true, // reset live updates on native update (true by default)
      "autoDeleteFailed": true, // Auto cleanup failed updates (true by default)
      "autoDeletePrevious": true // Auto cleanup old versions (true by default)
    }
  }
}
```

Installation happens:
- Immediately if `directUpdate` is true
- On next app backgrounding if `directUpdate` is false
- Auto-rollback if installation fails

The plugin also automatically manages storage:
- Removes failed updates if `autoDeleteFailed` is true
- Cleans up old versions if `autoDeletePrevious` is true

### Delaying Updates

You can control when updates are installed using delay conditions:

```typescript
// Delay until app goes to background
await CapacitorUpdater.setDelay({
  kind: 'background'
});

// Delay until specific date
await CapacitorUpdater.setDelay({
  kind: 'date',
  value: '2024-03-20T10:00:00.000Z'
});

// Delay until next native version
await CapacitorUpdater.setDelay({
  kind: 'nativeVersion'
});

// Multiple conditions
await CapacitorUpdater.setMultiDelay({
  delayConditions: [
    {
      kind: 'background'
    },
    {
      kind: 'date',
      value: '2024-03-20T10:00:00.000Z'
    }
  ]
});
```

Available delay conditions:
- **background**: Install when app goes to background
- **date**: Install after specific date/time
- **nativeVersion**: Install after next native update
- **kill**: Install after app is killed

This is useful for:
- Scheduling updates during off-peak hours
- Coordinating updates with user activity
- Ensuring smooth update experience
- Preventing disruption during critical tasks

### Update States

During the automatic process, bundles transition through these states:
1. **downloading**: Download in progress
2. **pending**: Download complete, waiting for install
3. **success**: Update installed and active
4. **error**: Update failed (triggers auto-rollback)

## Store Compliance

### Apple App Store ✅

Live Updates are fully compliant with the Apple App Store policies. As stated in the Apple Developer Program License Agreement:

> "Interpreted code may be downloaded to an Application but only so long as such code: (a) does not change the primary purpose of the Application by providing features or functionality that are inconsistent with the intended and advertised purpose of the Application as submitted to the App Store, (b) does not create a store or storefront for other code or applications, and (c) does not bypass signing, sandbox, or other security features of the OS."

Capgo updates only modify the web layer while respecting all platform security boundaries.

### Google Play Store ✅

Live Updates comply with Google Play Policies. The Device and Network Abuse policy specifically states:

> "This restriction does not apply to code that runs in a virtual machine or an interpreter where either provides indirect access to Android APIs (such as JavaScript in a webview or browser)."

Since Capgo only updates WebView content, it falls within these permitted guidelines.

## Best Practices

1. **Phased Rollouts**: Deploy updates gradually
2. **Version Control**: Track all deployed versions
3. **Rollback Support**: Quick recovery from issues
4. **Delta Updates**: Only download changed files

## When to Use Live Updates

Perfect for:
- Bug fixes
- UI improvements
- Content updates
- Feature toggles

Not suitable for:
- Native code changes
- Major version updates
- Security patches requiring native changes 
