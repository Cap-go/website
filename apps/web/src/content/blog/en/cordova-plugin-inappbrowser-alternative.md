---
slug: cordova-plugin-inappbrowser-alternative
title: "cordova-plugin-inappbrowser Alternative for Capacitor"
description: "cordova-plugin-inappbrowser alternative for Capacitor: @capgo/capacitor-inappbrowser for Custom Tabs, managed WebViews, OAuth, downloads, and postMessage bridges."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-11-16T09:00:00.000Z
updated_at: 2026-11-16T09:00:00.000Z
head_image: /migrating-cordova-to-capacitor.webp
head_image_alt: "Illustration of migrating a Cordova app to Capacitor, used for an in-app browser plugin guide"
keywords: cordova-plugin-inappbrowser alternative, capacitor in app browser, @capgo/capacitor-inappbrowser, InAppBrowser cordova migration
tag: Alternatives, Capacitor, Migration
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "What is the best cordova-plugin-inappbrowser alternative in Capacitor?"
    answer: "@capgo/capacitor-inappbrowser maps _self and _blank style flows to open() and openWebView(), with Capacitor listeners instead of InAppBrowser channel callbacks."
  - question: "Is cordova-plugin-inappbrowser still maintained?"
    answer: "npm lists cordova-plugin-inappbrowser at version 7.0.0 with a registry modified date of 22 June 2026. The source lives in apache/cordova-plugin-inappbrowser."
  - question: "Does @capgo/inappbrowser still exist?"
    answer: "Yes on npm as a legacy package name at 8.6.14. New installs should use @capgo/capacitor-inappbrowser, which is the current name at 8.27.9."
  - question: "How do I replace loadstart and exit events?"
    answer: "Use addListener('browserPageLoadStart', ...) and addListener('closeEvent', ...) on openWebView sessions, or browserPageLoaded for loadstop parity."
  - question: "Where are the docs?"
    answer: "https://capgo.app/docs/plugins/inappbrowser/, npm @capgo/capacitor-inappbrowser, and GitHub Cap-go/capacitor-inappbrowser."
---

The practical **cordova-plugin-inappbrowser alternative** for Capacitor is [`@capgo/capacitor-inappbrowser`](/plugins/capacitor-inappbrowser/). Use `InAppBrowser.open()` when you want Chrome Custom Tabs or `SFSafariViewController` behavior like Cordova `_system`, and `InAppBrowser.openWebView()` when you need the full Cordova `_blank` window with toolbars, script injection, and `message` events. Capgo keeps the npm scope at `@capgo/capacitor-inappbrowser` while the older [`@capgo/inappbrowser`](https://www.npmjs.com/package/@capgo/inappbrowser) name still resolves on npm for existing lockfiles. This guide lists verifiable maintenance facts, install steps, a usage example, and an API map from the real Cordova and Capacitor plugin surfaces.

## Why leave cordova-plugin-inappbrowser in Capacitor

**cordova-plugin-inappbrowser** on npm is version **7.0.0**. The registry `modified` timestamp is **22 June 2026**. The JavaScript entry point is `cordova.InAppBrowser.open(url, target, options)`, which returns an object with `close`, `show`, `hide`, `executeScript`, `insertCSS`, `addDownloadListener`, and `addEventListener` for `loadstart`, `loadstop`, `loaderror`, `exit`, `message`, and related channels (see `www/inappbrowser.js` in [apache/cordova-plugin-inappbrowser](https://github.com/apache/cordova-plugin-inappbrowser)).

In a Capacitor app the Cordova plugin still means:

- depending on `cordova.InAppBrowser` and string window targets such as `_blank`, `_self`, and `_system`
- channel subscriptions instead of `async`/`await` flows
- no first-class OAuth helper, managed download callbacks, or multi-webview ids

[`@capgo/capacitor-inappbrowser`](https://www.npmjs.com/package/@capgo/capacitor-inappbrowser) latest on npm is **8.27.9** with `modified` **13 November 2026**. The legacy package [`@capgo/inappbrowser`](https://www.npmjs.com/package/@capgo/inappbrowser) is **8.6.14** with `modified` **19 August 2026**. Capgo ships fixes on an open source cadence where a human still reviews, tests and merges 50+ pull requests daily.

## Install

```bash
bun add @capgo/capacitor-inappbrowser
bunx cap sync
```

**iOS:** add custom URL schemes or universal links the same way you did for Cordova OAuth redirects. For `openSecureWindow`, register your redirect URI in `Info.plist` and `AndroidManifest.xml` as described in the plugin README.

**Android:** Chrome Custom Tab options such as `toolbarColor` apply only to `open()`, while `openWebView()` uses the managed WebView stack.

## Usage example

```ts
import { InAppBrowser, ToolBarType } from '@capgo/capacitor-inappbrowser';

export async function openAuthenticatedHelp() {
  const listener = await InAppBrowser.addListener('messageFromWebview', (event) => {
  console.log('From webview', event.detail);
  });

  const { id } = await InAppBrowser.openWebView({
    url: 'https://help.example.com/sso',
    toolbarType: ToolBarType.NAVIGATION,
    title: 'Help',
    handleDownloads: true,
  });

  await InAppBrowser.addListener('closeEvent', async () => {
    await listener.remove();
    console.log('Closed webview', id);
  });
}
```

For external checkout in the system browser shell, call `InAppBrowser.open({ url: 'https://pay.example.com/' })` instead of `openWebView()`.

## Migrating from Cordova to Capacitor

Cordova opens a browser with `cordova.InAppBrowser.open(url, '_blank', 'location=yes')` and listens on the returned reference. Capacitor uses `InAppBrowser.openWebView()` plus `addListener`.

```js
// Before (Cordova)
const ref = cordova.InAppBrowser.open('https://example.com', '_blank', 'location=yes');
ref.addEventListener('loadstart', (e) => console.log(e.url));
ref.addEventListener('exit', () => console.log('closed'));
ref.executeScript({ code: "document.title" }, (values) => console.log(values));
```

```ts
// After (Capacitor)
import { InAppBrowser, ToolBarType } from '@capgo/capacitor-inappbrowser';

await InAppBrowser.addListener('browserPageLoadStart', (e) => console.log(e.url));
await InAppBrowser.addListener('closeEvent', (e) => console.log('closed', e.url));
await InAppBrowser.openWebView({
  url: 'https://example.com/',
  toolbarType: ToolBarType.NAVIGATION,
  visibleTitle: true,
});
await InAppBrowser.executeScript({ code: 'document.title' });
await InAppBrowser.close();
```

Map Cordova window targets explicitly: `_system` maps to `InAppBrowser.open()`, `_blank` with toolbars maps to `openWebView()`, and in-app `_self` navigation usually stays in your Ionic or Capacitor router instead of this plugin.

### API mapping table

| cordova-plugin-inappbrowser | @capgo/capacitor-inappbrowser |
| --- | --- |
| `cordova.InAppBrowser.open(url, target, options)` | `open({ url })` for system-style shell; `openWebView({ url, ... })` for managed WebView |
| `ref.close()` | `close()` or `close({ id })` |
| `ref.show()` / `ref.hide()` | `show()` / `hide()` |
| `ref.executeScript({ code \| file })` | `executeScript({ code, id? })` |
| `ref.insertCSS({ code \| file })` | Inject via `executeScript` with a style element, or preload CSS in the hosted page |
| `addEventListener('loadstart')` | `addListener('browserPageLoadStart')` |
| `addEventListener('loadstop')` | `addListener('browserPageLoaded')` |
| `addEventListener('loaderror')` | `addListener('pageLoadError')` |
| `addEventListener('exit')` | `addListener('closeEvent')` |
| `addEventListener('message')` | `addListener('messageFromWebview')`; page uses `window.mobileApp.postMessage(...)` |
| `addEventListener('customscheme')` | `addListener('customSchemeIntercepted')` |
| `addDownloadListener(success, error)` | `handleDownloads: true` on `openWebView` plus `addListener('downloadCompleted')` |
| Options string `location=yes`, `hidden=yes`, `clearcache=yes` | `openWebView` fields such as `hidden`, `clearCacheOnOpen`, `clearCookiesOnOpen`, `toolbarType` |
| Cordova plugin install | `bun add @capgo/capacitor-inappbrowser` plus `bunx cap sync` |

Capgo adds APIs with no Cordova equivalent in the same form, including `openSecureWindow()` for OAuth, `postMessage()` to the page, cookie helpers, and proxy request hooks. Adopt them when you need those flows; they are not required for a minimal Cordova parity migration.

## Links and next steps

- Plugin docs: [https://capgo.app/docs/plugins/inappbrowser/](/docs/plugins/inappbrowser/)
- Marketing page: [/plugins/capacitor-inappbrowser/](/plugins/capacitor-inappbrowser/)
- npm: [https://www.npmjs.com/package/@capgo/capacitor-inappbrowser](https://www.npmjs.com/package/@capgo/capacitor-inappbrowser)
- Legacy npm name: [https://www.npmjs.com/package/@capgo/inappbrowser](https://www.npmjs.com/package/@capgo/inappbrowser)
- GitHub: [https://github.com/Cap-go/capacitor-inappbrowser/](https://github.com/Cap-go/capacitor-inappbrowser/)
- Cordova upstream: [https://github.com/apache/cordova-plugin-inappbrowser](https://github.com/apache/cordova-plugin-inappbrowser)

Swapping in-app browser plugins needs a store build. Use [Capgo Build](/native-build/) for cloud iOS and Android builds, then tune JavaScript-only flows with [Capgo live updates](/live-update/) where allowed. For the full platform move, read the [Cordova to Capacitor migration guide](/blog/migrating-cordova-to-capacitor/).