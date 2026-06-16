---
title: Getting Started
description: Quick start guide for integrating live updates into your Capacitor app with the Updater plugin.
sidebar:
  order: 2
---

import { Tabs, TabItem } from '@astrojs/starlight/components';

## Installation

You can use our AI-Assisted Setup to install the plugin. Add the Capgo skills to your AI tool using the following command:

```bash
npx skills add https://github.com/Cap-go/capgo-skills --skill capacitor-plugins
```

Then use the following prompt:

```text
Use the `capacitor-plugins` skill from `Cap-go/capgo-skills` to install the `@capgo/capacitor-updater` plugin in my project.
```

If you prefer Manual Setup, install the plugin by running the following commands and follow the platform-specific instructions below:

<Tabs>
  <TabItem label="npm">
    ```bash
    bun add @capgo/capacitor-updater
    bunx cap sync
    ```
  </TabItem>
  <TabItem label="yarn">
    ```bash
    yarn add @capgo/capacitor-updater
    bunx cap sync
    ```
  </TabItem>
  <TabItem label="pnpm">
    ```bash
    pnpm add @capgo/capacitor-updater
    bunx cap sync
    ```
  </TabItem>
  <TabItem label="bun">
    ```bash
    bun add @capgo/capacitor-updater
    bunx cap sync
    ```
  </TabItem>
</Tabs>

## Quick Start

For most users, we recommend following the [main Quickstart guide](/docs/getting-started/quickstart/) which covers both the plugin installation and Capgo cloud integration.

This getting-started guide focuses on the technical plugin details for advanced users who want to understand the underlying mechanisms or implement self-hosted updates.

## Overview

The Capacitor Updater plugin enables over-the-air (OTA) updates for your Capacitor applications. This allows you to push updates to your app without going through app store reviews.

## How It Works

1. **Bundle Download**: The plugin downloads update bundles (ZIP files containing your web assets)
2. **Extraction**: Bundles are extracted to the device's storage
3. **Hot Reload**: The app switches to the new bundle without requiring a restart
4. **Fallback**: If an update fails, the app reverts to the previous working version

## Usage Modes

### 1. Auto-Update Mode (Recommended)

The simplest way to use the plugin with automatic update management:

```typescript
import { CapacitorUpdater } from '@capgo/capacitor-updater';

// Plugin handles everything automatically
// Configure in capacitor.config.ts
```

Add to your `capacitor.config.ts`:

```typescript
{
  plugins: {
    CapacitorUpdater: {
      autoUpdate: 'atBackground',
      updateUrl: 'https://your-update-server.com/api/updates'
    }
  }
}
```

### 2. Manual Mode

For advanced control over the update process:

```typescript
import { CapacitorUpdater } from '@capgo/capacitor-updater';

// Download an update
const bundle = await CapacitorUpdater.download({
  url: 'https://your-server.com/updates/v1.0.1.zip',
  version: '1.0.1'
});

// Set the bundle (will be used on next app start)
await CapacitorUpdater.set({
  id: bundle.id
});

// Or reload immediately
await CapacitorUpdater.reload();
```

## Platform Configuration

### iOS

No additional configuration required. The plugin works out of the box.

### Android

No additional configuration required. The plugin works out of the box.

## Basic API Usage

### Download an Update

```typescript
import { CapacitorUpdater } from '@capgo/capacitor-updater';

const bundle = await CapacitorUpdater.download({
  url: 'https://example.com/update.zip',
  version: '1.0.1'
});

console.log('Downloaded bundle:', bundle.id);
```

### Set Active Bundle

```typescript
// Set bundle to be used on next app start
await CapacitorUpdater.set({
  id: bundle.id
});
```

### Reload with New Bundle

```typescript
// Reload app immediately with new bundle
await CapacitorUpdater.reload();
```

### List Bundles

```typescript
const { bundles } = await CapacitorUpdater.list();
console.log('Available bundles:', bundles);
```

### Delete a Bundle

```typescript
await CapacitorUpdater.delete({
  id: 'bundle-id'
});
```

### Get Current Bundle

```typescript
const { bundle } = await CapacitorUpdater.current();
console.log('Current bundle:', bundle.version);
```

## Event Listeners

Listen for update events:

```typescript
import { CapacitorUpdater } from '@capgo/capacitor-updater';

// Listen for download progress
CapacitorUpdater.addListener('download', (info) => {
  console.log('Download progress:', info.percent);
});

// Listen for download completion
CapacitorUpdater.addListener('downloadComplete', (bundle) => {
  console.log('Download complete:', bundle.version);
});

// Listen for update failures
CapacitorUpdater.addListener('updateFailed', (error) => {
  console.error('Update failed:', error);
});

// Listen for successful updates
CapacitorUpdater.addListener('updateAvailable', (info) => {
  console.log('Update available:', info.version);
});
```

## Configuration Options

Configure the plugin in your `capacitor.config.ts`:

```typescript
{
  plugins: {
    CapacitorUpdater: {
      // Auto-update settings
      autoUpdate: 'atBackground',
      updateUrl: 'https://api.example.com/updates',

      // Update behavior
      resetWhenUpdate: true,

      // Version settings
      version: '1.0.0',

      // Security
      allowModifyUrl: false,

      // Stats collection
      statsUrl: 'https://api.example.com/stats',

      // Channel (for Capgo cloud)
      defaultChannel: 'production'
    }
  }
}
```

## Integration Patterns

### With Capgo Cloud

The easiest way to get started:

```typescript
// Install the Capgo CLI
bun add -g @capgo/cli

// Login to Capgo
npx @capgo/cli login

// Upload your first bundle
npx @capgo/cli bundle upload

// The plugin auto-updates from Capgo cloud
```

See the [main Quickstart guide](/docs/getting-started/quickstart/) for details.

### Self-Hosted Updates

Host your own update server:

```typescript
// Configure your update endpoint
{
  plugins: {
    CapacitorUpdater: {
      autoUpdate: 'atBackground',
      updateUrl: 'https://your-server.com/api/check-update'
    }
  }
}
```

Your server should return:

```json
{
  "version": "1.0.1",
  "url": "https://your-server.com/updates/1.0.1.zip"
}
```

See [Self-Hosted Mode](/docs/plugins/updater/self-hosted/getting-started/) for complete details.

### Manual Update Flow

Complete control over updates:

```typescript
import { CapacitorUpdater } from '@capgo/capacitor-updater';

async function checkAndUpdate() {
  // Check for updates from your server
  const response = await fetch('https://api.example.com/check-update');
  const { version, url } = await response.json();

  // Download the update
  const bundle = await CapacitorUpdater.download({
    url,
    version
  });

  // Notify bundle is ready
  await CapacitorUpdater.notifyAppReady();

  // Set as next version
  await CapacitorUpdater.set({ id: bundle.id });

  // Reload when ready
  await CapacitorUpdater.reload();
}
```

## Best Practices

- Always call `notifyAppReady()` when your app successfully loads
- Test updates thoroughly before pushing to production
- Implement proper error handling for network failures
- Use version numbers consistently
- Keep bundle sizes small for faster downloads
- Monitor update success rates

## Next Steps

- [Plugin API Reference](/docs/plugins/updater/api/) - Complete API documentation
- [Plugin Settings](/docs/plugins/updater/settings/) - All configuration options
- [Events](/docs/plugins/updater/events/) - Available update events
- [Self-Hosted Mode](/docs/plugins/updater/self-hosted/getting-started/) - Run your own update server
- [Local Development](/docs/plugins/updater/local-dev/getting-started/) - Test updates locally
- [Debugging](/docs/plugins/updater/debugging/) - Troubleshooting guide

## Support

- [Known Issues](/docs/plugins/updater/known-issues/) - Common problems and solutions
- [GitHub Discussions](https://github.com/Cap-go/capacitor-updater/discussions) - Community support
- [Discord](https://discord.gg/VnYRvBfgA6) - Real-time chat

## Keep going from Getting Started

If you are using **Getting Started** to plan native plugin work, connect it with [Using @capgo/capacitor-updater](/plugins/capacitor-updater/) for the native capability in Using @capgo/capacitor-updater, [Capgo Plugin Directory](/plugins/) for the product workflow in Capgo Plugin Directory, [Capacitor Plugins by Capgo](/docs/plugins/) for the implementation detail in Capacitor Plugins by Capgo, [Adding or Updating Plugins](/docs/contributing/adding-plugins/) for the implementation detail in Adding or Updating Plugins, and [Ionic Enterprise Plugin Alternatives](/ionic-enterprise-plugins/) for the product workflow in Ionic Enterprise Plugin Alternatives.
