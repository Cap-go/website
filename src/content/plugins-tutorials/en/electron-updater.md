---
locale: en
---

# Using @capgo/electron-updater

`@capgo/electron-updater` gives Electron apps the same Capgo live-update model as `@capgo/capacitor-updater`. You initialize it in the main process, expose the renderer bridge through preload, and call `notifyAppReady()` on every launch so rollback protection knows the bundle is healthy.

## Installation

```bash
bun add @capgo/electron-updater
```

## Main process setup

```typescript
import { app, BrowserWindow } from 'electron';
import path from 'node:path';
import { ElectronUpdater, setupEventForwarding, setupIPCHandlers } from '@capgo/electron-updater';

const updater = new ElectronUpdater({
  appId: 'com.example.desktop',
  autoUpdate: true,
});

app.whenReady().then(async () => {
  const window = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
    },
  });

  const builtinPath = path.join(__dirname, 'www/index.html');
  await updater.initialize(window, builtinPath);
  setupIPCHandlers(updater);
  setupEventForwarding(updater, window);

  await window.loadFile(updater.getCurrentBundlePath());
});
```

## Preload bridge

```typescript
import { exposeUpdaterAPI } from '@capgo/electron-updater/preload';

exposeUpdaterAPI();
```

## Renderer usage

```typescript
import { requireUpdater } from '@capgo/electron-updater/renderer';

const updater = requireUpdater();

await updater.notifyAppReady();

const latest = await updater.getLatest();

if (latest.url && !latest.error) {
  const bundle = await updater.download({
    url: latest.url,
    version: latest.version,
    checksum: latest.checksum,
  });

  await updater.next({ id: bundle.id });
}
```

## Listen for update events

```typescript
updater.addListener('download', ({ percent }) => {
  console.log('Download progress', percent);
});

updater.addListener('updateFailed', ({ bundle }) => {
  console.error('Update failed', bundle.version);
});
```

## Deploy a new bundle

```bash
bun run build
bunx @capgo/cli@latest bundle upload --channel=production
```

## Practical advice

- Always call `notifyAppReady()` early in the renderer so rollback protection works as intended.
- Keep the builtin path stable and let the updater decide whether to load the shipped bundle or a downloaded one.
- Reuse the same Capgo channel and rollout model you already use on mobile when your Electron app shares a backend release pipeline.
