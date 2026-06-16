---
title: Getting Started
description: "Install @capgo/capacitor-share-target and start using its current Capacitor API."
sidebar:
  order: 2
---

## Install

You can use our AI-Assisted Setup to install the plugin. Add the Capgo skills to your AI tool using the following command:

```bash
npx skills add https://github.com/Cap-go/capgo-skills --skill capacitor-plugins
```

Then use the following prompt:

```text
Use the `capacitor-plugins` skill from `Cap-go/capgo-skills` to install the `@capgo/capacitor-share-target` plugin in my project.
```

If you prefer Manual Setup, install the plugin by running the following commands and follow the platform-specific instructions below:

```bash
bun add @capgo/capacitor-share-target
bunx cap sync
```

## Import

```typescript
import { CapacitorShareTarget } from '@capgo/capacitor-share-target';
```

## API Overview

### `addListener`

Listen for shareReceived event.

Registers a listener that will be called when content is shared to the application
from another app. The callback receives event data containing title, texts, and files.

```typescript
import { CapacitorShareTarget } from '@capgo/capacitor-share-target';

const listener = await CapacitorShareTarget.addListener('shareReceived', (event) => {
  console.log('Title:', event.title);
  console.log('Texts:', event.texts);
  event.files?.forEach(file => {
    console.log(`File: ${file.name} (${file.mimeType})`);
  });
});

// To remove the listener:
await listener.remove();
```

### `removeAllListeners`

Remove all listeners for this plugin.

```typescript
import { CapacitorShareTarget } from '@capgo/capacitor-share-target';

await CapacitorShareTarget.removeAllListeners();
```

### `getPluginVersion`

Get the native Capacitor plugin version.

Returns the current version of the native plugin implementation.

```typescript
import { CapacitorShareTarget } from '@capgo/capacitor-share-target';

const { version} = await CapacitorShareTarget.getPluginVersion();
console.log('Plugin version:', version);
```

## Type Reference

### `ShareReceivedEvent`
Event data received when content is shared to the application.
```typescript
export interface ShareReceivedEvent {
  /**
   * The title of the shared content.
   *
   * @since 0.1.0
   */
  title: string;

  /**
   * Array of text content shared to the application.
   *
   * @since 0.1.0
   */
  texts: string[];

  /**
   * Array of files shared to the application.
   *
   * @since 0.2.0
   */
  files: SharedFile[];
}
```

### `SharedFile`
Represents a file shared to the application.
```typescript
export interface SharedFile {
  /**
   * The URI of the shared file. On Android/iOS this will be a file path or data URL.
   * On web this will be a cached URL accessible via fetch.
   *
   * @since 0.1.0
   */
  uri: string;

  /**
   * The name of the shared file, with or without extension.
   *
   * @since 0.1.0
   */
  name: string;

  /**
   * The MIME type of the shared file.
   *
   * @since 0.1.0
   */
  mimeType: string;
}
```

## Source Of Truth

This page is generated from the plugin's `src/definitions.ts`. Re-run the sync when the public API changes upstream.

## Keep going from Getting Started

If you are using **Getting Started** to plan dashboard and API operations, connect it with [Using @capgo/capacitor-share-target](/plugins/capacitor-share-target/) for the native capability in Using @capgo/capacitor-share-target, [API Overview](/docs/public-api/) for the implementation detail in API Overview, [Introduction](/docs/webapp/) for the implementation detail in Introduction, [API Keys](/docs/public-api/api-keys/) for the implementation detail in API Keys, and [Devices](/docs/public-api/devices/) for the implementation detail in Devices.
