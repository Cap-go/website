---
slug: how-to-use-capgo-documentation-for-ota-updates
title: How to Use Capgo Documentation for OTA Updates
description: "Learn how to implement secure Over-the-Air updates in your Capacitor apps with Capgo's comprehensive documentation and step-by-step guidance."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2025-02-19T03:56:01.854Z
updated_at: 2025-10-31T10:28:43.000Z
head_image: https://assets.seobotai.com/capgo.app/67b53306eac600a2c6713dad-1740671704703.jpg
head_image_alt: Mobile Development
keywords: OTA updates, Capacitor, Capgo, mobile app updates, documentation, app deployment, security features, error handling
tag: Development, Mobile, Updates
published: true
locale: en
next_blog: ''
---

**Need faster [app updates](https://capgo.app/plugins/capacitor-updater/) without app store delays?** [Capgo](https://capgo.app/) lets you deliver secure Over-the-Air (OTA) updates instantly to your users. Skip app store reviews and keep your app up-to-date with ease.

### Key Takeaways:

-   **What is Capgo?** An open-source platform for live updates in [Capacitor](https://capacitorjs.com/) apps.
-   **Why OTA Updates?** Save time, improve user experience, and fix bugs quickly.
-   **How to Get Started?**
    -   Install the [Capgo plugin](https://capgo.app/plugins/): `npm install @capgo/capacitor-updater`
    -   Configure your app with an API key.
    -   Use channels like "production" or "beta" for targeted rollouts.
-   **Advanced Features:** End-to-end encryption, error handling, and CI/CD integration.

Capgo's documentation ([capgo.app/docs](https://capgo.app/docs)) provides step-by-step instructions for setup, security, and troubleshooting. From installation to advanced configurations, it's your go-to guide for seamless updates.

## [Capgo](https://capgo.app/), CapacitorJs plugin for Live update

![Capgo](https://mars-images.imgix.net/seobot/screenshots/capgo.app-26aea05b7e2e737b790a9becb40f7bc5-2025-02-19.jpg?auto=compress)

<iframe src="https://www.youtube.com/embed/NzXXKoyhTIo" aria-label="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## Using Capgo Documentation

Navigating documentation effectively is essential when working with OTA updates. Capgo's documentation offers detailed guidance for integrating live updates into Capacitor apps.

### Where to Find the Documentation

You can access Capgo's documentation at [capgo.app/docs](https://capgo.app/docs) [\[1\]](https://github.com/Cap-go/capacitor-updater). It's organized into sections based on specific purposes:

| **Section** | **Purpose** | **Key Topics** |
| --- | --- | --- |
| Getting Started | Initial setup | Installation steps, [API key setup](https://capgo.app/docs/webapp/api-keys/) |
| Configuration | Core settings | Plugin configuration, environment setup |
| API Reference | Technical details | Methods, parameters, return values |
| Security | Protection measures | Encryption setup, signature verification |
| Troubleshooting | Problem-solving | Common issues, diagnostic tools |

### Important Terms and Concepts

Here are some key terms you’ll encounter:

-   **Channels**: These are update streams used to control version distribution. For instance, you might set up "production", "beta", and "staging" channels to cater to different user groups [\[4\]](https://www.indeed.com/career-advice/career-development/how-to-write-articles).
-   **Update Policies**: These define how updates are delivered and applied. Options include automatic downloads, installation timing, and user prompts [\[1\]](https://github.com/Cap-go/capacitor-updater).
-   **App State Listeners**: These components track whether the app is in the foreground or background [\[4\]](https://www.indeed.com/career-advice/career-development/how-to-write-articles).
-   **Bundles**: Packaged update files containing your app's new version, including assets, code changes, and configuration updates [\[4\]](https://www.indeed.com/career-advice/career-development/how-to-write-articles).

### Code Examples and Tutorials

The documentation provides sample code to simplify integration. Here's a basic example using TypeScript/JavaScript:

```typescript
import { CapacitorUpdater } from '@capgo/capacitor-updater'

// Initialize the updater
await CapacitorUpdater.notifyAppReady()
```

For more advanced use cases, the documentation includes real-world examples [\[2\]](https://dev.to/arnosolo/ionic-appflow-live-update-alternative-55c3)[\[3\]](https://github.com/Cap-go/capgo), such as:

-   Switching channels for A/B testing
-   Custom update flows with user prompts
-   Handling errors and implementing rollbacks
-   Integrating updates with CI/CD pipelines

Each tutorial also highlights performance considerations and security aspects, helping you make informed decisions. The documentation is frequently updated to include the latest features and best practices [\[1\]](https://github.com/Cap-go/capacitor-updater).

For implementation details, check out the setup guide next.

## Setting Up OTA Updates

Set up OTA updates in Capgo to streamline your deployment process. Follow these steps and tips for a hassle-free configuration.

### Basic Setup Steps

Start by installing the Capgo plugin in your Capacitor project:

```typescript
npm install @capgo/capacitor-updater
npx cap sync
```

Next, update your `capacitor.config.json` file with your [Capgo API key](https://capgo.app/docs/webapp/api-keys/):

```json
{
  "plugins": {
    "CapacitorUpdater": {
      "autoUpdate": true,
      "apiKey": "YOUR_API_KEY_HERE"
    }
  }
}
```

Then, initialize the updater in your app's main file to detect updates:

```typescript
import { CapacitorUpdater } from '@capgo/capacitor-updater';
await CapacitorUpdater.notifyAppReady();
```

Once this is done, you can set up channels to manage different update streams.

### Update Channel Setup

Organize your [update channels](https://capgo.app/docs/webapp/channels/) to suit your deployment needs:

| Channel Type | Purpose | Use Case |
| --- | --- | --- |
| Production | Stable releases | General user base |
| Staging | Pre-release testing | QA team and beta testers |
| Beta | Feature testing | Early adopters |

To upload an update to a specific channel, use the [Capgo CLI](https://capgo.app/docs/cli/commands):

```bash
npx @capgo/cli upload -c production
```

### Update Methods

Capgo provides two main ways to handle updates:

**[Automatic Updates](https://capgo.app/docs/plugin/cloud-mode/auto-update/)**  
Enable automatic updates by setting `autoUpdate: true` in your configuration. This ensures updates are applied in the background with no extra effort from developers.

**[Manual Updates](https://capgo.app/docs/plugin/cloud-mode/manual-update/)**  
For more control, you can manage updates manually. Use the following pattern to check for and apply updates:

```typescript
// Check for updates
const update = await CapacitorUpdater.download();

// Install when ready
if (update) {
  await CapacitorUpdater.set(update);
}
```

For critical updates, you can prompt users before proceeding:

```typescript
if (update.version > currentVersion) {
  const userConsent = await showUpdatePrompt();
  if (userConsent) {
    await CapacitorUpdater.set(update);
  }
}
```

You can also target specific user groups with custom IDs and channels:

```typescript
await CapacitorUpdater.setCustomId('beta-tester-123');
await CapacitorUpdater.setChannel('beta');
```

Finally, make sure to include error handling and rollback options:

```typescript
try {
  await CapacitorUpdater.set(update);
} catch (error) {
  await CapacitorUpdater.reset(); // Revert to the last working version
  console.error('Update failed:', error);
}
```

With these steps, your OTA update system is ready to go. Explore advanced settings to customize the update process further.

###### sbb-itb-f9944d2

## Advanced Settings

Improve your [Capgo OTA update](https://console.capgo.app/resend_email) setup with added security measures and flexible update configurations. These options ensure a secure and smooth update experience while meeting app store guidelines.

### Security Features

Capgo provides strong security protocols to safeguard your update bundles and deliver them securely to users. The platform uses end-to-end encryption with public-key cryptography for all updates [\[1\]](https://github.com/Cap-go/capacitor-updater). Below is how you can enable key security features:

```typescript
// Enable bundle verification
await CapacitorUpdater.setVerifyBundles(true);

// Configure encryption settings
await CapacitorUpdater.configure({
  encryption: {
    enabled: true,
    failOnError: true
  }
});
```

Key components of the bundle protection system include:

| Security Feature | Description | Implementation |
| --- | --- | --- |
| **[Bundle Integrity](https://capgo.app/docs/webapp/bundles/)** | Verifies package authenticity with cryptographic signatures | Automatically enabled with setVerifyBundles() |
| **Rollback Protection** | Reverts to a stable version if an update fails | Built into the update process |
| **Access Control** | Manages updates with role-based permissions | Configured via the dashboard |

### Update Behavior Settings

You can customize how updates are delivered and installed by using event listeners and configuration options. Adjust the timing and user interaction for updates with these settings:

```typescript
// Listen for when an update is available
CapacitorUpdater.addListener('updateAvailable', async (info) => {
  if (info.version > currentVersion) {
    // Custom update logic based on app state
    const isAppInactive = await checkAppState();
    if (isAppInactive) {
      await CapacitorUpdater.download();
    }
  }
});

// Monitor download completion
CapacitorUpdater.addListener('downloadComplete', (info) => {
  console.log(`Update ${info.version} ready to install`);
  // Implement custom installation timing if desired
});
```

For phased rollouts, you can configure update distribution directly through the dashboard or with code:

```typescript
// Set custom update conditions for a gradual rollout
await CapacitorUpdater.configure({
  rollout: {
    percentage: 25, // Start with 25% of users
    timeInterval: 24 // Increase rollout percentage every 24 hours
  }
});
```

To handle specific version-related behaviors:

```typescript
// Handle version-specific update failures
CapacitorUpdater.addListener('updateFailed', async (info) => {
  if (info.error.code === 'VERSION_MISMATCH') {
    await CapacitorUpdater.reset(); // Revert to the last stable version
    // Optionally, handle error notification here
  }
});
```

These settings ensure updates are reliable while allowing you to tailor the process to your app's needs. Always test updates thoroughly in Capgo's staging environment before rolling them out to production [\[2\]](https://dev.to/arnosolo/ionic-appflow-live-update-alternative-55c3).

## Problem Solving Guide

Capgo's error logs and built-in tools help tackle OTA update challenges while keeping your app compliant with store requirements.

### Common Issues and Solutions

Here are some typical problems and how to address them:

-   **Failed Downloads**  
    _Symptoms_: Downloads freeze or fail to complete.  
    _Solution_: Check your network connection, confirm the update URL is valid, and add retry mechanisms to handle interruptions.
    
-   **Version Conflicts**  
    _Symptoms_: Updates either fail to install or cause app instability.  
    _Solution_: Use clear version numbers to avoid conflicts and implement rollback options for safety.
    
-   **Installation Errors**  
    _Symptoms_: Updates fail or trigger automatic rollbacks.  
    _Solution_: Ensure you call `notifyAppReady()` after a successful update to prevent rollbacks.
    

For updates larger than 50MB, splitting them into smaller files can improve performance on Android devices [\[5\]](https://github.com/Cap-go/capacitor-updater/issues/119).

Use detailed error logging to catch problems early. For example, implement this listener:

```typescript
CapacitorUpdater.addListener('updateFailed', (error) => {
  console.log(`Update failed: ${error.code}`);
  logUpdateError({
    errorCode: error.code,
    deviceInfo: error.device,
    timestamp: new Date().toISOString()
  });
});
```

By combining error logging with pre-checks, you can handle these issues effectively before focusing on compliance.

### App Store Rules

Technical fixes alone aren't enough - your updates also need to align with app store guidelines.

**Apple App Store Requirements**:

-   _User Transparency_: Clearly inform users about the update's content and get their consent.
-   _Core Functionality_: Ensure your app's main features remain intact as reviewed.
-   _Security Measures_: Use secure methods for transmitting updates.

**Android Implementation**:

```typescript
await CapacitorUpdater.configure({
  updateNotification: {
    title: "Update Available",
    message: "A new version is available. Please update to access the latest features.",
    requireUserConsent: true
  }
});
```

**Best Practices**:

-   _Version Control_: Roll out updates gradually to reduce conflicts.
-   _Update Notifications_: Provide clear and user-friendly update alerts.
-   _Security_: Verify the bundle's integrity and use encryption to protect data.

## Summary

This section pulls together the main ideas from the guide.

Capgo's documentation provides clear instructions for integrating OTA updates into Capacitor apps while staying compliant with app store regulations.

Using Capgo's resources, developers can implement essential features like **end-to-end encryption** and **CI/CD integration**, covering everything from initial setup to advanced configurations [\[1\]](https://github.com/Cap-go/capacitor-updater).

### Key Implementation Areas

| **Aspect** | **Key Focus** | **Where to Find It** |
| --- | --- | --- |
| **Security** | Encryption and integrity checks | _Security Features_ section |
| **Compliance** | Meeting Apple and Android requirements | _App Store Rules_ guide |
| **[Update Management](https://capgo.app/docs/plugin/cloud-mode/manual-update/)** | Version control and rollback options | _[Update Methods](https://capgo.app/docs/plugin/cloud-mode/hybrid-update)_ guide |
| **Error Handling** | Logging and troubleshooting steps | _Problem Solving Guide_ |

These areas form the backbone of Capgo's update management system.

Capgo's CLI and analytics tools simplify [managing updates](https://capgo.app/docs/plugin/cloud-mode/manual-update/) throughout your app's lifecycle [\[1\]](https://github.com/Cap-go/capacitor-updater).

For further support, you can explore additional resources like **API documentation**, **sample projects**, and **community forums** [\[2\]](https://dev.to/arnosolo/ionic-appflow-live-update-alternative-55c3).
