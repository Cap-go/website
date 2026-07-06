---
title: "Getting Started with Cordova Updater"
description: Install and configure @capgo/cordova-updater in a Cordova iOS or Android app.
sidebar:
  order: 2
---

import { Steps, Aside, Tabs, TabItem } from '@astrojs/starlight/components';

This guide walks you through adding `@capgo/cordova-updater` to a Cordova app so you can receive Capgo live updates on iOS and Android.

<Aside type="caution">
  Do **not** use `cordova-plugin-ionic-webview` with this plugin. Ionic WebView bypasses Cordova's scheme handlers, so downloaded bundles will not load.
</Aside>

## Prerequisites

- Cordova CLI 12+
- Cordova Android 13+ and/or Cordova iOS 7+
- A Capgo account ([capgo.app/register](https://capgo.app/register))

## Installation

<Steps>

1. Install the plugin from npm and pass your Capgo app ID:

   ```bash
   cordova plugin add @capgo/cordova-updater --variable APP_ID=YOUR_CAPGO_APP_ID
   ```

2. Optional: override defaults at install time (same variables as the Capacitor updater):

   ```bash
   cordova plugin add @capgo/cordova-updater \
     --variable APP_ID=YOUR_CAPGO_APP_ID \
     --variable DEFAULT_CHANNEL=production \
     --variable UPDATE_URL=https://plugin.capgo.app/updates \
     --variable AUTO_UPDATE=atBackground
   ```

3. Prepare native projects after changing plugin variables:

   ```bash
   cordova prepare android ios
   ```

</Steps>

## JavaScript usage

After `deviceready`, the plugin is available as `cordova.plugins.Updater`:

```javascript
document.addEventListener('deviceready', async () => {
  const { Updater } = cordova.plugins;

  await Updater.notifyAppReady();

  const latest = await Updater.getLatest();
  if (latest.url && !latest.error) {
    const bundle = await Updater.download({
      url: latest.url,
      version: latest.version,
      checksum: latest.checksum,
    });

    await Updater.next({ id: bundle.id });
  }
});
```

TypeScript types ship with the npm package:

```typescript
import type { UpdaterPlugin } from '@capgo/cordova-updater';

declare const cordova: { plugins: { Updater: UpdaterPlugin } };
```

## Platform notes

<Tabs>
  <TabItem label="Android">

    - Requires Cordova Android 13+ so the WebView is served from the default `https://localhost/` scheme.
    - The plugin registers a `CordovaPluginPathHandler` to serve downloaded bundle assets.

  </TabItem>
  <TabItem label="iOS">

    - Requires Cordova iOS 7+ with the default `app://localhost/` scheme.
    - The plugin implements `CDVPluginSchemeHandler` to intercept bundle requests.

  </TabItem>
</Tabs>

## Upload your first bundle

Build your web assets, then upload with the Capgo CLI (same workflow as Capacitor):

```bash
bun run build
bunx @capgo/cli@latest bundle upload --channel=production
```

## Next steps

- Compare settings with the [Capacitor updater configuration](/docs/plugins/updater/settings/) — most options map to `plugin.xml` variables.
- Read [Live update compatibility](/docs/live-updates/compatibility/) before shipping native plugin changes.
- Migrating to Capacitor later? Keep the same Capgo app ID and channels; only the client plugin package changes.
