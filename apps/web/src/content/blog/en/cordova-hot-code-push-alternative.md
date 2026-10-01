---
slug: cordova-hot-code-push-alternative
title: "Cordova Hot Code Push Alternative in 2026"
description: "cordova-hot-code-push and CodePush for Cordova are dead. Here is a maintained Cordova hot code push alternative with setup, migration steps and rollback."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-10-01T09:00:00.000Z
updated_at: 2026-10-01T09:00:00.000Z
head_image: /cordova.webp
head_image_alt: "Cordova logo illustration for a Cordova hot code push alternative guide"
keywords: cordova hot code push alternative, cordova-hot-code-push-plugin, cordova codepush alternative, cordova live update, cordova ota update, @capgo/cordova-updater
tag: Alternatives, Updates, Migration
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "Is cordova-hot-code-push still maintained?"
    answer: "No. The nordnet/cordova-hot-code-push repository is archived on GitHub, its last code push was in 2018, and the last npm release is 1.5.3. It was built for older Cordova platforms and WebView setups."
  - question: "What happened to CodePush for Cordova?"
    answer: "Microsoft archived cordova-plugin-code-push, ended Cordova support in App Center, and retired App Center entirely on March 31, 2025. The CodePush service the plugin talked to is gone."
  - question: "Do I need cordova-plugin-ionic-webview for Capgo Cordova live updates?"
    answer: "No, and you should remove it. @capgo/cordova-updater relies on the default Cordova scheme handlers (https://localhost on Android, app://localhost on iOS). The Ionic WebView plugin bypasses them, so downloaded bundles would not load."
  - question: "Is it allowed by Apple and Google to update a Cordova app over the air?"
    answer: "Yes, for interpreted code such as HTML, CSS and JavaScript, as long as the update does not change the app's primary purpose or add features that need review. Native code changes still require a store release."
  - question: "Do I have to migrate to Capacitor to use Capgo?"
    answer: "No. @capgo/cordova-updater works in Cordova Android 13+ and Cordova iOS 7+ apps. If you migrate to Capacitor later, keep the same Capgo app ID and channels and switch the client plugin."
---

If you are searching for a Cordova hot code push alternative, it is probably because `cordova-hot-code-push-plugin` and Microsoft's CodePush for Cordova both stopped working or stopped being maintained. A maintained option today is [`@capgo/cordova-updater`](/plugins/cordova-updater/), a Cordova plugin that brings Capgo live updates to Cordova Android 13+ and Cordova iOS 7+ apps, with channels, rollback and encrypted bundles, without forcing you to migrate to Capacitor first.

## The state of Cordova live updates in 2026

### cordova-hot-code-push is archived

The `nordnet/cordova-hot-code-push` repository is archived on GitHub. The last code change was in September 2018 and the last npm release of `cordova-hot-code-push-plugin` is 1.5.3. It was designed for the Cordova platforms and file based WebView loading of that time. Modern Cordova Android serves the app from `https://localhost` through a path handler, and Cordova iOS uses `WKWebView` with an `app://` scheme. A plugin that assumes `file://` loading does not fit that model, and no one is updating it.

Existing installs may still appear to work if you never update Cordova platforms. That is the trap: you cannot move to a current Cordova Android or Xcode without risking the update mechanism.

### CodePush for Cordova is gone

Microsoft archived `cordova-plugin-code-push`, ended Cordova support in App Center in 2022, and retired App Center on March 31, 2025. The plugin talked to the CodePush service in App Center, so there is no backend left to serve updates. If you moved to self-hosting the CodePush server, you still depend on an archived client plugin.

### Ionic Appflow

`cordova-plugin-ionic` connected Cordova apps to Ionic Appflow live updates. Ionic has announced Appflow is being wound down, so teams on it are looking for a replacement too. We cover that path in the [Appflow alternative guide](/blog/alternative-to-appflow/).

## What a replacement needs

Before picking any tool, check it against these requirements:

| Requirement | Why it matters |
| --- | --- |
| Works with current Cordova Android and iOS | Store requirements force platform upgrades: Xcode 26 for App Store uploads since April 2026, and yearly Android target API bumps on Google Play |
| No dependency on `cordova-plugin-ionic-webview` | That plugin is outdated and conflicts with modern scheme handlers |
| Automatic rollback | A bad bundle must not brick the app |
| Channels | Test on internal users before everyone |
| Signed or encrypted bundles | Prevents tampering with code delivered over the network |
| Version targeting | Never send JavaScript that needs a newer native shell |
| CI friendly CLI | Releases should be one command in your pipeline |
| Maintained | Check recent releases, not just stars |

## Capgo for Cordova

`@capgo/cordova-updater` uses the same JavaScript API as `@capgo/capacitor-updater` and the same Capgo Cloud backend. Bundles, channels, stats and signing work the same way for Cordova, Capacitor and Electron clients.

### Requirements

- Cordova CLI 12+
- Cordova Android 13+ (default `https://localhost/` scheme)
- Cordova iOS 7+ (default `app://localhost/` scheme)
- `cordova-plugin-ionic-webview` removed

Check your platforms:

```bash
cordova platform ls
```

Upgrade if needed:

```bash
cordova platform rm android && cordova platform add android@latest
cordova platform rm ios && cordova platform add ios@latest
```

### Install

Create the app in Capgo (dashboard or CLI), then add the plugin with your app ID:

```bash
bunx @capgo/cli@latest login
bunx @capgo/cli@latest app add com.example.app --name "My Cordova App"

cordova plugin add @capgo/cordova-updater --variable APP_ID=com.example.app
cordova prepare android ios
```

You can set more options at install time. These are plugin variables, so run `cordova prepare` after changing them:

```bash
cordova plugin add @capgo/cordova-updater \
  --variable APP_ID=com.example.app \
  --variable DEFAULT_CHANNEL=production \
  --variable AUTO_UPDATE=atBackground \
  --variable APP_READY_TIMEOUT=10000
```

`AUTO_UPDATE` defaults to `atBackground`, which downloads updates in the background and applies them the next time the app is backgrounded. Other modes include `atInstall`, `onLaunch` and `off` for fully manual control.

### Tell the plugin the app started correctly

This is the one line you cannot skip. Call `notifyAppReady()` on every launch after `deviceready`. If a new bundle does not call it within `APP_READY_TIMEOUT` milliseconds, the plugin marks it as failed and rolls back to the last working bundle.

```js
document.addEventListener('deviceready', async () => {
  const { Updater } = cordova.plugins;
  await Updater.notifyAppReady();
}, false);
```

Call it after your app has actually rendered, not at the very top of your script, so a bundle that crashes during startup is detected.

### Manual update flow

If you set `AUTO_UPDATE=off`, you control when to check, download and apply:

```js
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
    // Applied on next background/restart
    await Updater.next({ id: bundle.id });
  }
});
```

TypeScript types ship with the package:

```ts
import type { UpdaterPlugin } from '@capgo/cordova-updater';

declare const cordova: { plugins: { Updater: UpdaterPlugin } };
```

### Publish an update

Build your `www` folder and upload it:

```bash
bun run build
bunx @capgo/cli@latest bundle upload com.example.app --path ./www --channel production
```

Put that in CI after your tests. The [live updates page](/live-update/) shows channel rollouts, stats and rollback from the dashboard.

## Migrating from cordova-hot-code-push

1. **Remove the old plugin and its config.** Delete `cordova-hot-code-push-plugin`, the `chcp` section in `config.xml`, and the `cordova-hcp` CLI and `chcp.json` / `chcp.manifest` generation from your build.
2. **Remove `cordova-plugin-ionic-webview`** if present, and test that the app runs on the default Cordova WebView.
3. **Upgrade Cordova platforms** to Android 13+ and iOS 7+.
4. **Install `@capgo/cordova-updater`** and add `notifyAppReady()`.
5. **Release a new store build.** Old installs keep the old plugin. Only the new binary contains the Capgo updater.
6. **Upload your first bundle** to a test channel, check it on devices, then promote to production.

Users who do not update from the store stay on the old mechanism until they do. Keep your old update server online during the transition if it still works, or accept that those users get no OTA updates until they install the new binary.

## Migrating from CodePush for Cordova

- Replace `codePush.sync()` calls with `notifyAppReady()` and either automatic mode or the `getLatest` / `download` / `next` flow.
- Replace deployment keys with channels (`DEFAULT_CHANNEL`).
- Replace `code-push release-cordova` with `bunx @capgo/cli@latest bundle upload`.
- Remove the `CodePushDeploymentKey` preferences from `config.xml`.

For a step by step version aimed at App Center users, see the [App Center migration guide](/blog/appcenter-migration/).

## Security and store rules

- **Encryption and signing.** Set `PUBLIC_KEY` at install time and use the CLI's encryption keys, so devices only accept bundles signed for your app.
- **Apple and Google policies.** Both allow updating interpreted code such as JavaScript over the air, as long as you do not change the app's purpose or add features that would need review. Native code, new plugins and permission changes need a store release.
- **Version targeting.** If a bundle needs a native plugin that only exists in a newer binary, target it to that native version. The Capgo docs on [live update compatibility](/docs/live-updates/compatibility/) explain how.

## Troubleshooting

**Bundle downloads but the app shows the old version.** You are still using `cordova-plugin-ionic-webview`, or a custom scheme. Remove it and use the defaults.

**App rolls back after every update.** `notifyAppReady()` is not called, or it is called after an error. Check the console on the device and confirm the call runs on every start.

**iOS build fails after platform upgrade.** Cordova iOS 7+ needs a current Xcode. App Store uploads require Xcode 26. You can generate signing assets with the [iOS certificate generator](/tools/ios-certificate-generator/). Once you move to Capacitor, [Capgo Build](/native-build/) can produce signed iOS builds in the cloud without a local Mac.

**Updates work on Android but not iOS.** Check that the iOS scheme in `config.xml` is the default `app` scheme with `localhost` hostname.

## Should you move to Capacitor instead?

You do not have to. Capgo for Cordova exists so you can keep shipping while you decide. Capacitor brings a maintained native layer, Swift Package Manager on iOS, and a larger plugin ecosystem. When you are ready, keep the same Capgo app ID and channels and swap the client plugin. Our [Cordova to Capacitor migration guide](/blog/migrating-cordova-to-capacitor/) walks through it.
