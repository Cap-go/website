---
locale: en
---
# Using @capgo/capacitor-inappbrowser

`@capgo/capacitor-inappbrowser` opens external web content from a Capacitor app. Use `open()` for the platform browser surface, or `openWebView()` when your app needs a managed native WebView with custom size, toolbar, messages, scripts, downloads, proxying, popup control, private storage, or Ionic UI layered above the page.

## Install

```bash
npm install @capgo/capacitor-inappbrowser
npx cap sync
```

## What This Plugin Exposes

- System browser flow with Chrome Custom Tabs on Android and `SFSafariViewController` on iOS.
- Managed WebViews that can be sized, hidden, shown, moved behind the Capacitor app, and brought back to the front.
- Click, touch, and scroll forwarding with `dispatchInputEvent()` when app UI sits above the browser.
- Partial-screen browsers where taps outside the native WebView frame pass through to the Capacitor app on Android and iOS.
- Cookie, cache, and full browsing-data cleanup with `persistWebViewData`, `clearCookies`, `clearAllCookies`, `clearCache`, and `clearAllBrowsingData`.
- App-to-page communication with `postMessage()`, page-to-app communication with `window.mobileApp.postMessage(...)`, and script injection with `executeScript()`.
- Download handling, native-first proxy rules, popup control, Google Pay support, `_blank` link handling, and hidden preloadable browser instances.

## Common Use Cases

### Put App UI Above a Live Browser

```typescript
import { InAppBrowser } from '@capgo/capacitor-inappbrowser';

const { id } = await InAppBrowser.openWebView({
  url: 'https://example.com/checkout',
  toBack: true,
  transparentBackground: true,
});

await InAppBrowser.dispatchInputEvent({
  id,
  type: 'click',
  x: 160,
  y: 420,
});

await InAppBrowser.bringToFront({ id });
```

Use this for checkout overlays, browser-backed payment flows, guided support flows, or any feature where Ionic controls need to stay above live web content.

### Keep the App Clickable Around a Browser Sheet

```typescript
const { id } = await InAppBrowser.openWebView({
  url: 'https://example.com/offers',
  height: window.innerHeight - 200,
  y: 0,
});

await InAppBrowser.updateDimensions({ id, height: window.innerHeight });
```

A custom-sized browser only captures touches inside its frame. The remaining visible app area stays tappable on Android and iOS.

### Avoid Persistent Web Sessions

```typescript
const { id } = await InAppBrowser.openWebView({
  url: 'https://example.com/login',
  persistWebViewData: false,
});

await InAppBrowser.clearAllBrowsingData();
await InAppBrowser.close({ id });
```

Use this for account switching, checkout testing, support impersonation, or auth flows where cookies, cache, local storage, and IndexedDB should not survive longer than needed.

### Preload and Swap Multiple WebViews

```typescript
const first = await InAppBrowser.openWebView({ url: 'https://example.com/a', hidden: true });
const second = await InAppBrowser.openWebView({ url: 'https://example.com/b', hidden: true });

await InAppBrowser.show({ id: first.id });
await InAppBrowser.hide({ id: first.id });
await InAppBrowser.show({ id: second.id });
```

Hidden instances keep their state available while avoiding native overlays that block app touches.

### Embed an Advanced Web App

```typescript
const { id } = await InAppBrowser.openWebView({
  url: 'https://example.com/portal',
  handleDownloads: true,
  openBlankTargetInWebView: true,
  hiddenPopupWindow: true,
  outboundProxyRules: [
    {
      urlRegex: '^https://example\\.com/api/',
      action: 'delegateToJs',
    },
  ],
});

await InAppBrowser.postMessage({
  id,
  detail: { source: 'app', action: 'refresh' },
});
```

Use this pattern for document portals, upload flows, support desks, video calls, Google Pay pages, or interactive web apps that need native app control without leaving the app shell.

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-inappbrowser/
- Docs: /docs/plugins/inappbrowser/

## Keep going from Using @capgo/capacitor-inappbrowser

If you are using **Using @capgo/capacitor-inappbrowser** to plan native plugin work, connect it with [@capgo/capacitor-inappbrowser](/docs/plugins/inappbrowser/) for the implementation detail in @capgo/capacitor-inappbrowser, [Getting Started](/docs/plugins/inappbrowser/getting-started/) for the implementation detail in Getting Started, [Capgo Plugin Directory](/plugins/) for the product workflow in Capgo Plugin Directory, [Capacitor Plugins by Capgo](/docs/plugins/) for the implementation detail in Capacitor Plugins by Capgo, and [Adding or Updating Plugins](/docs/contributing/adding-plugins/) for the implementation detail in Adding or Updating Plugins.
