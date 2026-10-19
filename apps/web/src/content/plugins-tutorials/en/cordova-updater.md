---
locale: en
---

# Using @capgo/cordova-updater

`@capgo/cordova-updater` brings Capgo live updates to Cordova iOS and Android apps with the same JavaScript API as `@capgo/capacitor-updater`. Install the Cordova plugin, call `notifyAppReady()` on every launch, and upload bundles with `@capgo/cli`.

## Installation

```bash
cordova plugin add @capgo/cordova-updater --variable APP_ID=com.example.app
cordova prepare android ios
```

## Basic usage

```javascript
document.addEventListener('deviceready', async () => {
  const { Updater } = cordova.plugins;

  await Updater.notifyAppReady();

  const { bundle } = await Updater.current();
  console.log('Active bundle', bundle);

  const latest = await Updater.getLatest();
  if (latest.url && !latest.error) {
    const downloaded = await Updater.download({
      url: latest.url,
      version: latest.version,
      checksum: latest.checksum,
    });

    await Updater.next({ id: downloaded.id });
  }
});
```

## Platform requirements

- Cordova Android **13+** and Cordova iOS **7+**
- Default Cordova WebView schemes (`https://localhost/` on Android, `app://localhost/` on iOS)
- Avoid `cordova-plugin-ionic-webview` — it prevents bundle swapping

## Deploy a new bundle

```bash
bun run build
bunx @capgo/cli@latest bundle upload --channel=production
```

## Practical advice

- Reuse the same Capgo app ID and channels if you also ship a Capacitor or Electron client.
- Treat native plugin or Cordova platform upgrades like any other native change: ship a new store binary before relying on new native APIs in JavaScript bundles.
- Full setup details live in the [Cordova updater docs](/docs/plugins/cordova-updater/getting-started/).
