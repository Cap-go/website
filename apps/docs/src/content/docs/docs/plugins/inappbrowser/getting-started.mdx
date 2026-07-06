---
title: Getting Started
description: "Install @capgo/capacitor-inappbrowser and start using its current Capacitor API."
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
Use the `capacitor-plugins` skill from `Cap-go/capgo-skills` to install the `@capgo/capacitor-inappbrowser` plugin in my project.
```

If you prefer Manual Setup, install the plugin by running the following commands and follow the platform-specific instructions below:

```bash
npm install @capgo/capacitor-inappbrowser
npx cap sync
```

## Import

```typescript
import { InAppBrowser } from '@capgo/capacitor-inappbrowser';
```

## Choose the Browser Mode

Use `open()` when you want the platform browser surface: Chrome Custom Tabs on Android and `SFSafariViewController` on iOS. Use `openWebView()` when your app needs to control the native WebView: custom size, toolbar, app messaging, JavaScript injection, downloads, proxying, popups, hidden instances, or UI layering.

## Common Use Cases

### Show Ionic UI Over a Live Browser Page

Open the managed WebView behind the Capacitor host WebView with `toBack`. Your Ionic UI can then render above the page while the web content stays loaded behind it. Forward gestures to the browser with `dispatchInputEvent()` when the overlay should interact with the page.

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

Make the relevant app background transparent wherever the browser should be visible. When the browser is behind the app, native gestures are still owned by the Capacitor WebView unless you explicitly forward them.

### Build a Partial-Screen Browser or Bottom Sheet

Set `height`, `width`, `x`, and `y` to keep part of the Capacitor app visible around the native browser. On Android and iOS, touches outside the browser frame pass through to the underlying Capacitor WebView.

```typescript
const bottomGap = 200;

const { id } = await InAppBrowser.openWebView({
  url: 'https://example.com/offers',
  height: window.innerHeight - bottomGap,
  y: 0,
});

await InAppBrowser.updateDimensions({
  id,
  height: window.innerHeight,
  y: 0,
});
```

Use this for mini browsers, offer panels, support widgets, browser-backed bottom sheets, or any flow where native app controls must remain tappable outside the web content.

### Keep Checkout, Auth, or Support Sessions Private

Set `persistWebViewData: false` for managed WebViews that should avoid persistent website data where the platform supports it. Call `clearAllBrowsingData()` after logout, account switching, test sessions, or flows that must clear the default store and opened managed WebViews.

```typescript
const { id } = await InAppBrowser.openWebView({
  url: 'https://example.com/login',
  persistWebViewData: false,
});

await InAppBrowser.clearAllBrowsingData();
await InAppBrowser.close({ id });
```

On Android, cookies use the system WebView cookie store, so `clearAllBrowsingData()` is the cleanup step for cookies and other shared browser data.

### Keep Multiple Browser Instances Ready

Use `hidden`, `hide()`, and `show()` to preload or preserve multiple managed WebViews without keeping each one on screen. Hidden WebViews can still receive `executeScript()`, `postMessage()`, `setUrl()`, and close calls.

```typescript
const first = await InAppBrowser.openWebView({ url: 'https://example.com/a', hidden: true });
const second = await InAppBrowser.openWebView({ url: 'https://example.com/b', hidden: true });

await InAppBrowser.show({ id: first.id });
await InAppBrowser.hide({ id: first.id });
await InAppBrowser.show({ id: second.id });
```

### Embed Advanced Web App Flows

Combine proxy rules, `handleDownloads`, `openBlankTargetInWebView`, `hiddenPopupWindow`, `enableGooglePaySupport`, `postMessage()`, and `executeScript()` for document portals, upload flows, payment pages, support desks, and other embedded web apps that need native control without leaving your app.

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

## API Overview

### `goBack`

Navigates back in the WebView's history if possible

```typescript
import { InAppBrowser } from '@capgo/capacitor-inappbrowser';

await InAppBrowser.goBack();
```

### `open`

Open url in a new window fullscreen, on android it use chrome custom tabs, on ios it use SFSafariViewController

```typescript
import { InAppBrowser } from '@capgo/capacitor-inappbrowser';

await InAppBrowser.open({} as OpenOptions);
```

### `clearCookies`

Clear cookies of url
When `id` is omitted, applies to all open webviews.

```typescript
import { InAppBrowser } from '@capgo/capacitor-inappbrowser';

await InAppBrowser.clearCookies({} as ClearCookieOptions);
```

### `clearAllCookies`

Clear all cookies
When `id` is omitted, applies to all open webviews.

```typescript
import { InAppBrowser } from '@capgo/capacitor-inappbrowser';

await InAppBrowser.clearAllCookies();
```

### `clearCache`

Clear cache
When `id` is omitted, applies to all open webviews.

```typescript
import { InAppBrowser } from '@capgo/capacitor-inappbrowser';

await InAppBrowser.clearCache();
```

### `clearAllBrowsingData`

Clear all browsing data from the default store and opened managed WebViews, including cookies, cache, local storage, session storage, IndexedDB, form data, and HTTP auth data where the platform exposes it.

```typescript
import { InAppBrowser } from '@capgo/capacitor-inappbrowser';

await InAppBrowser.clearAllBrowsingData();
```

### `getCookies`

Get cookies for a specific URL.

```typescript
import { InAppBrowser } from '@capgo/capacitor-inappbrowser';

await InAppBrowser.getCookies({} as GetCookieOptions);
```

### `close`

Close the webview.
When `id` is omitted, closes the active webview.

```typescript
import { InAppBrowser } from '@capgo/capacitor-inappbrowser';

await InAppBrowser.close();
```

### `hide`

Hide the webview without closing it.
Use show() to bring it back.
When `id` is omitted, targets the active webview.

```typescript
import { InAppBrowser } from '@capgo/capacitor-inappbrowser';

await InAppBrowser.hide();
```

### `show`

Show a previously hidden webview.
When `id` is omitted, targets the active webview.

```typescript
import { InAppBrowser } from '@capgo/capacitor-inappbrowser';

await InAppBrowser.show();
```

### `sendToBack`

Moves the native browser behind the Capacitor host WebView. Use this when your Ionic UI should appear above a live browser page.

```typescript
import { InAppBrowser } from '@capgo/capacitor-inappbrowser';

await InAppBrowser.sendToBack({ id: 'webview-id', transparentBackground: true });
```

### `bringToFront`

Moves a browser that was behind the host WebView back to the front. When `id` is omitted, targets the active webview.

```typescript
import { InAppBrowser } from '@capgo/capacitor-inappbrowser';

await InAppBrowser.bringToFront({ id: 'webview-id' });
```

### `dispatchInputEvent`

Dispatches a click, touch, or scroll event to a managed browser. Coordinates are relative to the browser viewport in CSS pixels.

```typescript
import { InAppBrowser } from '@capgo/capacitor-inappbrowser';

await InAppBrowser.dispatchInputEvent({
  id: 'webview-id',
  type: 'click',
  x: 160,
  y: 420,
});
```

### `openWebView`

Open url in a new webview with toolbars, and enhanced capabilities, like camera access, file access, listen events, inject javascript, bi directional communication, etc.

JavaScript Interface:
When you open a webview with this method, a JavaScript interface is automatically injected that provides:
- `window.mobileApp.close()`: Closes the webview from JavaScript
- `window.mobileApp.postMessage({detail: {message: "myMessage"}})`: Sends a message from the webview to the app, detail object is the data you want to send to the webview
- `window.mobileApp.takeScreenshot()` when `allowScreenshotsFromWebPage` is true

Promise timing differs by platform when `isPresentAfterPageLoad` is used.
Android resolves with `{ id }` after the dialog is ready to control, while iOS resolves with `{ id }` immediately after creating the native webview.

```typescript
import { InAppBrowser } from '@capgo/capacitor-inappbrowser';

await InAppBrowser.openWebView({} as OpenWebViewOptions);
```

### `executeScript`

Injects JavaScript code into the InAppBrowser window.
When `id` is omitted, executes in all open webviews.

```typescript
import { InAppBrowser } from '@capgo/capacitor-inappbrowser';

await InAppBrowser.executeScript({} as { code: string; id?: string });
```

### `postMessage`

Sends an event to the webview (in-app browser). In the webview JavaScript, listen for it with `window.addEventListener('messageFromNative', listenerFunc)`.
`detail` is the payload sent to the webview. Because it crosses the Capacitor bridge, it must be JSON-serializable.
When `id` is omitted, broadcasts to all open webviews.

```typescript
import { InAppBrowser } from '@capgo/capacitor-inappbrowser';

await InAppBrowser.postMessage({} as { detail: Record<string, any>; id?: string });
```

### `takeScreenshot`

Captures the current webview viewport as a PNG screenshot.
When `id` is omitted, targets the active webview.

```typescript
import { InAppBrowser } from '@capgo/capacitor-inappbrowser';

await InAppBrowser.takeScreenshot();
```

### `setUrl`

Sets the URL of the webview.
When `id` is omitted, targets the active webview.

```typescript
import { InAppBrowser } from '@capgo/capacitor-inappbrowser';

await InAppBrowser.setUrl({} as { url: string; id?: string });
```

### `handleProxyRequest`

Internal method used by `addProxyHandler()` to send a proxy decision back to native.
Forward the original `phase` when replying to a manual `proxyRequest` listener.

```typescript
import { InAppBrowser } from '@capgo/capacitor-inappbrowser';

await InAppBrowser.handleProxyRequest({} as {
    requestId: string;
    decision?: ProxyDecision | null;
    response?: ProxyResponse | null;
    webviewId?: string;
    phase?: 'outbound' | 'inbound';
  });
```

### `reload`

Reload the current web page.

```typescript
import { InAppBrowser } from '@capgo/capacitor-inappbrowser';

await InAppBrowser.reload();
```

### `updateDimensions`

Update the dimensions of the webview.
Allows changing the size and position of the webview at runtime.
When `id` is omitted, targets the active webview.

```typescript
import { InAppBrowser } from '@capgo/capacitor-inappbrowser';

await InAppBrowser.updateDimensions({} as DimensionOptions & { id?: string });
```

### `setEnabledSafeTopMargin`

Sets the enabled safe top margin of the webview at runtime.
When `id` is omitted, targets the active webview.
On Web, this method is a no-op and resolves without changing layout.

```typescript
import { InAppBrowser } from '@capgo/capacitor-inappbrowser';

await InAppBrowser.setEnabledSafeTopMargin({} as { enabled: boolean; id?: string });
```

### `setEnabledSafeBottomMargin`

Sets the enabled safe bottom margin of the webview at runtime.
When `id` is omitted, targets the active webview.
On Web, this method is a no-op and resolves without changing layout.

```typescript
import { InAppBrowser } from '@capgo/capacitor-inappbrowser';

await InAppBrowser.setEnabledSafeBottomMargin({} as { enabled: boolean; id?: string });
```

### `openSecureWindow`

Opens a secured window for OAuth2 authentication.
For web, you should have the code in the redirected page to use a broadcast channel to send the redirected url to the app
Something like:
```html
<html>
<head></head>
<body>
<script>
  const searchParams = new URLSearchParams(location.search)
  if (searchParams.has("code")) {
    new BroadcastChannel("my-channel-name").postMessage(location.href);
    window.close();
  }
</script>
</body>
</html>
```
For mobile, you should have a redirect uri that opens the app, something like: `myapp://oauth_callback/`
And make sure to register it in the app's info.plist:
```xml
<key>CFBundleURLTypes</key>
<array>
   <dict>
      <key>CFBundleURLSchemes</key>
      <array>
         <string>myapp</string>
      </array>
   </dict>
</array>
```
And in the AndroidManifest.xml file:
```xml
<activity>
   <intent-filter>
      <action android:name="android.intent.action.VIEW" />
      <category android:name="android.intent.category.DEFAULT" />
      <category android:name="android.intent.category.BROWSABLE" />
      <data android:host="oauth_callback" android:scheme="myapp" />
   </intent-filter>
</activity>
```

```typescript
import { InAppBrowser } from '@capgo/capacitor-inappbrowser';

await InAppBrowser.openSecureWindow({} as OpenSecureWindowOptions);
```

## Type Reference

### `OpenOptions`
```typescript
export interface OpenOptions {
  /**
   * Target URL to load.
   * @since 0.1.0
   */
  url: string;
  /**
   * if true, the browser will be presented after the page is loaded, if false, the browser will be presented immediately.
   * @since 0.1.0
   */
  isPresentAfterPageLoad?: boolean;
  /**
   * if true the deeplink will not be opened, if false the deeplink will be opened when clicked on the link
   * @since 0.1.0
   */
  preventDeeplink?: boolean;

  // --- Chrome Custom Tab customization (Android only, ignored on iOS) ---

  /**
   * Toolbar background color in hex format (e.g., "#1A1A2E").
   * Applied to both light and dark color schemes.
   * Also sets the navigation bar color to match.
   * **Android only** — ignored on iOS.
   * @since 8.2.0
   */
  toolbarColor?: string;

  /**
   * Whether the URL bar should auto-hide when the user scrolls down.
   * The bar reappears on any upward scroll.
   * **Android only** — ignored on iOS.
   * @default false
   * @since 8.2.0
   */
  urlBarHidingEnabled?: boolean;

  /**
   * Show the page's HTML <title> in the toolbar instead of the raw URL.
   * The true URL is still visible when the user taps the title area.
   * **Android only** — ignored on iOS.
   * @default false
   * @since 8.2.0
   */
  showTitle?: boolean;

  /**
   * Replace the default "X" close icon with a back arrow.
   * Makes the Custom Tab feel like a native navigation push rather than a modal overlay.
   * **Android only** — ignored on iOS.
   * @default false
   * @since 8.2.0
   */
  showArrow?: boolean;

  /**
   * Remove the share action from the overflow menu.
   * **Android only** — ignored on iOS.
   * @default false
   * @since 8.2.0
   */
  disableShare?: boolean;

  /**
   * Hide the bookmark star icon in the overflow menu.
   * Uses an undocumented Chromium intent extra — may stop working on future Chrome updates.
   * **Android only** — ignored on iOS.
   * @default false
   * @since 8.2.0
   */
  disableBookmark?: boolean;

  /**
   * Hide the download icon in the overflow menu.
   * Uses an undocumented Chromium intent extra — may stop working on future Chrome updates.
   * **Android only** — ignored on iOS.
   * @default false
   * @since 8.2.0
   */
  disableDownload?: boolean;
}
```

### `ClearCookieOptions`
```typescript
export interface ClearCookieOptions {
  /**
   * Target webview id.
   * When omitted, applies to all open webviews.
   */
  id?: string;
  url: string;
}
```

### `GetCookieOptions`
```typescript
export interface GetCookieOptions {
  url: string;
  includeHttpOnly?: boolean;
}
```

### `CloseWebviewOptions`
```typescript
export interface CloseWebviewOptions {
  /**
   * Target webview id to close. If omitted, closes the active webview.
   */
  id?: string;
  /**
   * Whether the webview closing is animated or not, ios only
   * @default true
   */
  isAnimated?: boolean;
}
```

### `LayerOptions`
```typescript
export interface LayerOptions {
  /**
   * Target webview id. If omitted, targets the active webview.
   */
  id?: string;
  /**
   * Makes the Capacitor host WebView transparent while this native webview is behind it.
   *
   * @default true
   */
  transparentBackground?: boolean;
}
```

### `DispatchInputEventOptions`
```typescript
export type WebViewPointerInputEventType = 'click' | 'touchstart' | 'touchmove' | 'touchend' | 'touchcancel';
export type WebViewInputEventType = WebViewPointerInputEventType | 'scroll';

export interface DispatchPointerInputEventOptions {
  id?: string;
  type: WebViewPointerInputEventType;
  x: number;
  y: number;
}

export interface DispatchScrollInputEventOptions {
  id?: string;
  type: 'scroll';
  x: number;
  y: number;
  deltaX: number;
  deltaY: number;
}

export type DispatchInputEventOptions = DispatchPointerInputEventOptions | DispatchScrollInputEventOptions;
```

### `OpenWebViewOptions`
```typescript
export interface OpenWebViewOptions {
  /**
   * Target URL to load.
   * @since 0.1.0
   * @example "https://capgo.app"
   */
  url: string;
  /**
   * Headers to send with the request.
   * @since 0.1.0
   * @example
   * headers: {
   *   "Custom-Header": "test-value",
   *   "Authorization": "Bearer test-token"
   * }
   * Test URL: https://www.whatismybrowser.com/detect/what-http-headers-is-my-browser-sending/
   */
  headers?: Headers;
  /**
   * Credentials to send with the request and all subsequent requests for the same host.
   * @since 6.1.0
   * @example
   * credentials: {
   *   username: "test-user",
   *   password: "test-pass"
   * }
   * Test URL: https://www.whatismybrowser.com/detect/what-http-headers-is-my-browser-sending/
   */
  credentials?: Credentials;
  /**
   * HTTP method to use for the initial request.
   *
   * **Optional parameter - defaults to GET if not specified.**
   * Existing code that doesn't provide this parameter will continue to work unchanged with standard GET requests.
   *
   * When specified with 'POST', 'PUT', or 'PATCH' methods that support a body,
   * you can also provide a `body` parameter with the request payload.
   *
   * **Platform Notes:**
   * - iOS: Full support for all HTTP methods with headers
   * - Android: Custom headers may not be sent with POST/PUT/PATCH requests due to WebView limitations
   *
   * @since 8.2.0
   * @default "GET"
   * @example
   * method: "POST",
   * body: JSON.stringify({ token: "auth-token", data: "value" }),
   * headers: { "Content-Type": "application/json" }
   */
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS' | string;
  /**
   * HTTP body to send with the request when using POST, PUT, or other methods that support a body.
   * Should be a string (use JSON.stringify for JSON data).
   *
   * **Optional parameter - only used when `method` is specified and supports a request body.**
   * Omitting this parameter (or using GET method) results in standard behavior without a request body.
   *
   * @since 8.2.0
   * @example
   * method: "POST",
   * body: JSON.stringify({ username: "user", password: "pass" }),
   * headers: { "Content-Type": "application/json" }
   */
  body?: string;
  /**
   * materialPicker: if true, uses Material Design theme for date and time pickers on Android.
   * This improves the appearance of HTML date inputs to use modern Material Design UI instead of the old style pickers.
   * @since 7.4.1
   * @default false
   * @example
   * materialPicker: true
   * Test URL: https://show-picker.glitch.me/demo.html
   */
  materialPicker?: boolean;
  /**
   * JavaScript Interface:
   * The webview automatically injects a JavaScript interface providing:
   * - `window.mobileApp.close()`: Closes the webview from JavaScript
   * - `window.mobileApp.postMessage(obj)`: Sends a message to the app (listen via "messageFromWebview" event)
   * - `window.mobileApp.hide()` / `window.mobileApp.show()` when allowWebViewJsVisibilityControl is true in CapacitorConfig
   * - `window.mobileApp.takeScreenshot()` when `allowScreenshotsFromWebPage` is true
   *
   * @example
   * // In your webpage loaded in the webview:
   * document.getElementById("closeBtn").addEventListener("click", () => {
   *   window.mobileApp.close();
   * });
   *
   * // Send data to the app
   * window.mobileApp.postMessage({ action: "login", data: { user: "test" }});
   *
   * @since 6.10.0
   */
  jsInterface?: never; // This property doesn't exist, it's just for documentation
  /**
   * Allows page JavaScript to call `window.mobileApp.takeScreenshot()`.
   * Disabled by default so only the host app can trigger native screenshots through the plugin API.
   *
   * @default false
   * @since 8.4.0
   */
  allowScreenshotsFromWebPage?: boolean;
  /**
   * Emits `consoleMessage` events for JavaScript `console.*` output coming from the managed page.
   * Useful when the webview stays hidden and you still need page-level diagnostics.
   *
   * @default false
   * @since 8.6.0
   */
  captureConsoleLogs?: boolean;
  /**
   * Controls whether the webview should persist website data such as cache, cookies, local storage,
   * IndexedDB, and session data.
   *
   * When false, iOS uses a non-persistent `WKWebsiteDataStore`. Android disables per-view cache and
   * DOM/database storage where the system WebView supports it. Android cookies use the shared
   * WebView cookie store, so call `clearAllBrowsingData()` to remove cookies and other global data.
   *
   * @default true
   * @since 8.6.36
   */
  persistWebViewData?: boolean;
  /**
   * Automatically handles downloads triggered inside the webview without requiring a custom JavaScript bridge.
   *
   * When enabled:
   * - Standard attachment responses are written to a temporary file.
   * - `blob:` downloads are also captured when the platform supports them.
   * - Previewable files reopen inside the in-app browser when possible.
   * - Other files are handed off to the native preview or viewer flow.
   * - `downloadCompleted` and `downloadFailed` events notify the host app about the saved file.
   *
   * @default false
   * @since 8.6.0
   */
  handleDownloads?: boolean;
  /**
   * Share options for the webview. When provided, shows a disclaimer dialog before sharing content.
   * This is useful for:
   * - Warning users about sharing sensitive information
   * - Getting user consent before sharing
   * - Explaining what will be shared
   * - Complying with privacy regulations
   *
   * Note: shareSubject is required when using shareDisclaimer
   * @since 0.1.0
   * @example
   * shareDisclaimer: {
   *   title: "Disclaimer",
   *   message: "This is a test disclaimer",
   *   confirmBtn: "Accept",
   *   cancelBtn: "Decline"
   * }
   * Test URL: https://capgo.app
   */
  shareDisclaimer?: DisclaimerOptions;
  /**
   * Toolbar type determines the appearance and behavior of the browser's toolbar
   * - "activity": Shows a simple toolbar with just a close button and share button
   * - "navigation": Shows a full navigation toolbar with back/forward buttons
   * - "blank": Shows no toolbar
   * - "": Default toolbar with close button
   * @since 0.1.0
   * @default ToolBarType.DEFAULT
   * @example
   * toolbarType: ToolBarType.ACTIVITY,
   * title: "Activity Toolbar Test"
   * Test URL: https://capgo.app
   */
  toolbarType?: ToolBarType;
  /**
   * Subject text for sharing. Required when using shareDisclaimer.
   * This text will be used as the subject line when sharing content.
   * @since 0.1.0
   * @example "Share this page"
   */
  shareSubject?: string;
  /**
   * Title of the browser
   * @since 0.1.0
   * @default "New Window"
   * @example "Camera Test"
   */
  title?: string;
  /**
   * Background color of the browser
   * @since 0.1.0
   * @default BackgroundColor.BLACK
   */
  backgroundColor?: BackgroundColor;
  /**
   * If true, enables native navigation gestures within the webview.
   * - Android: Native back button navigates within webview history
   * - iOS: Enables swipe left/right gestures for back/forward navigation
   * @default false (Android), true (iOS - enabled by default)
   * @example
   * activeNativeNavigationForWebview: true,
   * disableGoBackOnNativeApplication: true
   * Test URL: https://capgo.app
   */
  activeNativeNavigationForWebview?: boolean;
  /**
   * Disable the possibility to go back on native application,
   * useful to force user to stay on the webview, Android only
   * @default false
   * @example
   * disableGoBackOnNativeApplication: true
   * Test URL: https://capgo.app
   */
  disableGoBackOnNativeApplication?: boolean;
  /**
   * Open url in a new window fullscreen
   * isPresentAfterPageLoad: if true, the browser will be presented after the page is loaded, if false, the browser will be presented immediately.
   * Promise timing: on Android, `openWebView()` resolves with the webview id when the webview is ready to be controlled
   * (immediately for hidden/immediate presentation, after the first page load when `isPresentAfterPageLoad` is `true`).
   * On iOS, the promise resolves with the id as soon as the native webview is created, even if presentation is deferred.
   * @since 0.1.0
   * @default false
   * @example
   * isPresentAfterPageLoad: true,
   * preShowScript: "await import('https://unpkg.com/darkreader@4.9.89/darkreader.js');\nDarkReader.enable({ brightness: 100, contrast: 90, sepia: 10 });"
   * Test URL: https://capgo.app
   */
  isPresentAfterPageLoad?: boolean;
  /**
   * Whether the website in the webview is inspectable or not, ios only
   * @default false
   */
  isInspectable?: boolean;
  /**
   * Whether the webview opening is animated or not, ios only
   * @default true
   */
  isAnimated?: boolean;
  /**
   * Shows a reload button that reloads the web page
   * @since 1.0.15
   * @default false
   * @example
   * showReloadButton: true
   * Test URL: https://capgo.app
   */
  showReloadButton?: boolean;
  /**
   * CloseModal: if true a confirm will be displayed when user clicks on close button, if false the browser will be closed immediately.
   * @since 1.1.0
   * @default false
   * @example
   * closeModal: true,
   * closeModalTitle: "Close Window",
   * closeModalDescription: "Are you sure you want to close?",
   * closeModalOk: "Yes, close",
   * closeModalCancel: "No, stay"
   * Test URL: https://capgo.app
   */
  closeModal?: boolean;
  /**
   * CloseModalTitle: title of the confirm when user clicks on close button
   * @since 1.1.0
   * @default "Close"
   */
  closeModalTitle?: string;
  /**
   * CloseModalDescription: description of the confirm when user clicks on close button
   * @since 1.1.0
   * @default "Are you sure you want to close this window?"
   */
  closeModalDescription?: string;
  /**
   * CloseModalOk: text of the confirm button when user clicks on close button
   * @since 1.1.0
   * @default "Close"
   */
  closeModalOk?: string;
  /**
   * CloseModalCancel: text of the cancel button when user clicks on close button
   * @since 1.1.0
   * @default "Cancel"
   */
  closeModalCancel?: string;
  /**
   * closeModalURLPattern: a regex pattern to match against the current URL when the close button is pressed.
   * When provided along with closeModal: true, the close confirmation modal is only shown if the current URL matches this pattern.
   * If the current URL does not match, the browser closes immediately without showing the modal.
   * Requires closeModal to be true.
   * @since 7.2.0
   * @example
   * closeModal: true,
   * closeModalURLPattern: ".*checkout.*"
   */
  closeModalURLPattern?: string;
  /**
   * visibleTitle: if true the website title would be shown else shown empty
   * @since 1.2.5
   * @default true
   */
  visibleTitle?: boolean;
  /**
   * toolbarColor: color of the toolbar in hex format
   * @since 1.2.5
   * @default "#ffffff"
   * @example
   * toolbarColor: "#FF5733"
   * Test URL: https://capgo.app
   */
  toolbarColor?: string;
  /**
   * toolbarTextColor: color of the buttons and title in the toolbar in hex format
   * When set, it overrides the automatic light/dark mode detection for text color
   * @since 6.10.0
   * @default calculated based on toolbarColor brightness
   * @example
   * toolbarTextColor: "#FFFFFF"
   * Test URL: https://capgo.app
   */
  toolbarTextColor?: string;
  /**
   * showArrow: if true an arrow would be shown instead of cross for closing the window
   * @since 1.2.5
   * @default false
   * @example
   * showArrow: true
   * Test URL: https://capgo.app
   */
  showArrow?: boolean;
  /**
   * ignoreUntrustedSSLError: if true, the webview will ignore untrusted SSL errors allowing the user to view the website.
   * @since 6.1.0
   * @default false
   */
  ignoreUntrustedSSLError?: boolean;
  /**
   * preShowScript: if isPresentAfterPageLoad is true and this variable is set the plugin will inject a script before showing the browser.
   * This script will be run in an async context. The plugin will wait for the script to finish (max 10 seconds)
   * @since 6.6.0
   * @example
   * preShowScript: "await import('https://unpkg.com/darkreader@4.9.89/darkreader.js');\nDarkReader.enable({ brightness: 100, contrast: 90, sepia: 10 });"
   * Test URL: https://capgo.app
   */
  preShowScript?: string;
  /**
   * preShowScriptInjectionTime: controls when the preShowScript is injected.
   * - "documentStart": injects before any page JavaScript runs (good for polyfills like Firebase)
   * - "pageLoad": injects after page load (default, original behavior)
   * @since 7.26.0
   * @default "pageLoad"
   * @example
   * preShowScriptInjectionTime: "documentStart"
   */
  preShowScriptInjectionTime?: 'documentStart' | 'pageLoad';
  /**
   * Proxy interception mode.
   *
   * - `true`: legacy blanket mode, delegates all HTTP/HTTPS requests to JavaScript.
   * - `string`: Android-only regex mode kept for backward compatibility.
   *
   * Prefer `outboundProxyRules` and `inboundProxyRules` for native-first matching.
   *
   * @since 6.9.0
   */
  proxyRequests?: boolean | string;
  /**
   * Native-first outbound proxy rules.
   *
   * @since 8.6.0
   */
  outboundProxyRules?: NativeProxyRule[];
  /**
   * Native-first inbound proxy rules.
   *
   * @since 8.6.0
   */
  inboundProxyRules?: NativeProxyRule[];
  /**
   * buttonNearDone allows for a creation of a custom button near the done/close button.
   * The button is only shown when toolbarType is not "activity", "navigation", or "blank".
   *
   * For Android:
   * - iconType must be "asset"
   * - icon path should be in the public folder (e.g. "monkey.svg")
   * - width and height are optional, defaults to 48dp
   * - button is positioned at the end of toolbar with 8dp margin
   *
   * For iOS:
   * - iconType can be "sf-symbol" or "asset"
   * - for sf-symbol, icon should be the symbol name
   * - for asset, icon should be the asset name
   * @since 6.7.0
   * @example
   * buttonNearDone: {
   *   ios: {
   *     iconType: "sf-symbol",
   *     icon: "star.fill"
   *   },
   *   android: {
   *     iconType: "asset",
   *     icon: "public/monkey.svg",
   *     width: 24,
   *     height: 24
   *   }
   * }
   * Test URL: https://capgo.app
   */
  buttonNearDone?: {
    ios: {
      iconType: 'sf-symbol' | 'asset';
      icon: string;
    };
    android: {
      iconType: 'asset' | 'vector';
      icon: string;
      width?: number;
      height?: number;
    };
  };
  /**
   * Shows a native screenshot button near the done/close button.
   * The button is hidden by default and captures the current viewport when tapped.
   * This option uses the same toolbar slot as `buttonNearDone` and is therefore incompatible with it.
   * The button is only shown when toolbarType is not "activity", "navigation", or "blank".
   *
   * @default false
   * @since 8.4.0
   */
  showScreenshotButton?: boolean;
  /**
   * textZoom: sets the text zoom of the page in percent.
   * Allows users to increase or decrease the text size for better readability.
   * @since 7.6.0
   * @default 100
   * @example
   * textZoom: 120
   * Test URL: https://capgo.app
   */
  textZoom?: number;
  /**
   * enableZoom: enables pinch-to-zoom gestures in the Android WebView.
   * When true, built-in zoom controls are enabled and the zoom buttons are hidden.
   * **Android only** — ignored on iOS where zoom is enabled by default.
   * @since 8.5.0
   * @default false
   * @example
   * enableZoom: true
   */
  enableZoom?: boolean;
  /**
   * preventDeeplink: if true, the deeplink will not be opened, if false the deeplink will be opened when clicked on the link. on IOS each schema need to be added to info.plist file under LSApplicationQueriesSchemes when false to make it work.
   * @since 0.1.0
   * @default false
   * @example
   * preventDeeplink: true
   * Test URL: https://aasa-tester.capgo.app/
   */
  preventDeeplink?: boolean;

  /**
   * When true, HTTP and HTTPS links opened from `target="_blank"` anchors stay in the current webview instead of spawning a popup or opening in the system browser.
   * By default, blank-target HTTP(S) links stay inside the plugin as managed popups that share cookies with the opener; enabling this option keeps everything in the same tab.
   * Custom schemes such as `tel:` and `mailto:` and authorized app links still prefer their native handlers unless `preventDeeplink` is enabled.
   *
   * @since 8.5.6
   * @default false
   * @example
   * openBlankTargetInWebView: true
   */
  openBlankTargetInWebView?: boolean;

  /**
   * List of base URLs whose hosts are treated as authorized App Links (Android) and Universal Links (iOS).
   *
   * - On both platforms, only HTTPS links whose host matches any entry in this list
   *   will attempt to open via the corresponding native application.
   * - If the app is not installed or the system cannot handle the link, the URL
   *   will continue loading inside the in-app browser.
   * - Matching is host-based (case-insensitive), ignoring the "www." prefix.
   * - When `preventDeeplink` is enabled, all external handling is blocked regardless of this list.
   *
   * @example
   * ```ts
   * ["https://example.com", "https://subdomain.app.io"]
   * ```
   *
   * @since 7.12.0
   * @default []
   */
  authorizedAppLinks?: string[];

  /**
   * If true, the webView will not take the full height and will have a 20px margin at the bottom.
   * This creates a safe margin area outside the browser view.
   * @since 7.13.0
   * @default false
   * @example
   * enabledSafeBottomMargin: true
   */
  enabledSafeBottomMargin?: boolean;

  /**
   * If false, the webView will extend behind the status bar for true full-screen immersive content.
   * When true (default), respects the safe area at the top of the screen.
   * Works independently of toolbarType - use for full-screen video players, games, or immersive web apps.
   * @since 8.2.0
   * @default true
   * @example
   * enabledSafeTopMargin: false  // Full screen, extends behind status bar
   */
  enabledSafeTopMargin?: boolean;

  /**
   * When true, applies the system status bar inset as the WebView top margin on Android.
   * Keeps the legacy 0px margin by default for apps that handle padding themselves.
   * @default false
   * @example
   * useTopInset: true
   */
  useTopInset?: boolean;

  /**
   * enableGooglePaySupport: if true, enables support for Google Pay popups and Payment Request API.
   * This fixes OR_BIBED_15 errors by allowing popup windows and configuring Cross-Origin-Opener-Policy.
   * Only enable this if you need Google Pay functionality as it allows popup windows.
   *
   * When enabled:
   * - Allows popup windows for Google Pay authentication
   * - Sets proper CORS headers for Payment Request API
   * - Enables multiple window support in WebView
   * - Configures secure context for payment processing
   *
   * @since 7.13.0
   * @default false
   * @example
   * enableGooglePaySupport: true
   * Test URL: https://developers.google.com/pay/api/web/guides/tutorial
   */
  enableGooglePaySupport?: boolean;

  /**
   * Opens popup windows created by the page in hidden mode.
   * Hidden popup windows can still be controlled with `executeScript`, `postMessage`, `show`, and `close`.
   * Listen to `popupWindowOpened` to capture the popup id, then call `show({ id })` only if you want to reveal it.
   *
   * @default false
   * @since 8.6.0
   * @example
   * hiddenPopupWindow: true
   */
  hiddenPopupWindow?: boolean;

  /**
   * blockedHosts: List of host patterns that should be blocked from loading in the InAppBrowser's internal navigations.
   * Any request inside WebView to a URL with a host matching any of these patterns will be blocked.
   * Supports wildcard patterns like:
   * - "*.example.com" to block all subdomains
   * - "www.example.*" to block wildcard domain extensions
   *
   * @since 7.17.0
   * @default []
   * @example
   * blockedHosts: ["*.tracking.com", "ads.example.com"]
   */
  blockedHosts?: string[];

  /**
   * Width of the webview in pixels.
   * If not set, webview will be fullscreen width.
   * @default undefined (fullscreen)
   * @example
   * width: 400
   */
  width?: number;

  /**
   * Height of the webview in pixels.
   * If not set, webview will be fullscreen height.
   * @default undefined (fullscreen)
   * @example
   * height: 600
   */
  height?: number;

  /**
   * X position of the webview in pixels from the left edge.
   * Only effective when width is set.
   * @default 0
   * @example
   * x: 50
   */
  x?: number;

  /**
   * Y position of the webview in pixels from the top edge.
   * Only effective when height is set.
   * @default 0
   * @example
   * y: 100
   */
  y?: number;

  /**
   * Places the native browser behind the Capacitor host WebView.
   * Make the app background transparent to reveal it, or rely on `transparentBackground` to clear the host WebView.
   *
   * @default false
   */
  toBack?: boolean;

  /**
   * When `toBack` is true, makes the Capacitor host WebView transparent so the native browser can be seen behind Ionic content.
   * Ignored when the browser is in front.
   *
   * @default true
   */
  transparentBackground?: boolean;

  /**
   * Disables the bounce (overscroll) effect on iOS WebView.
   * When enabled, prevents the rubber band scrolling effect when users scroll beyond content boundaries.
   * This is useful for:
   * - Creating a more native, app-like experience
   * - Preventing accidental overscroll states
   * - Avoiding issues when keyboard opens/closes
   *
   * Note: This option only affects iOS. Android does not have this bounce effect by default.
   *
   * @since 8.0.2
   * @default false
   * @example
   * disableOverscroll: true
   */
  disableOverscroll?: boolean;

  /**
   * Opens the webview in hidden mode (not visible to user but fully functional).
   * When hidden, the webview loads and executes JavaScript but is not displayed.
   * All control methods (executeScript, postMessage, setUrl, etc.) work while hidden.
   * Use close() to clean up the hidden webview when done.
   *
   * @since 8.0.7
   * @default false
   * @example
   * hidden: true
   */
  hidden?: boolean;

  /**
   * Controls how a hidden webview reports its visibility and size.
   * - AWARE: webview is aware it's hidden (dimensions may be zero).
   * - FAKE_VISIBLE: webview is hidden but reports fullscreen dimensions (uses alpha=0 to remain invisible).
   *
   * @default InvisibilityMode.AWARE
   * @example
   * invisibilityMode: InvisibilityMode.FAKE_VISIBLE
   */
  invisibilityMode?: InvisibilityMode;
}
```

### `ScreenshotResult`
```typescript
export interface ScreenshotResult {
  /**
   * Image format used for the screenshot.
   */
  format: '.png';
  /**
   * MIME type of the generated screenshot.
   */
  mimeType: 'image/.png';
  /**
   * Base64-encoded screenshot payload without the data URL prefix.
   */
  base64: string;
  /**
   * Data URL for direct use in HTML img tags or uploads.
   */
  dataUrl: string;
  /**
   * Screenshot width in pixels.
   */
  width: number;
  /**
   * Screenshot height in pixels.
   */
  height: number;
}
```

### `UrlChangeListener`
```typescript
export type UrlChangeListener = (state: UrlEvent) => void;
```

### `ButtonNearDoneEvent`
```typescript
export interface ButtonNearDoneEvent {
  /**
   * Webview instance id.
   *
   * @since 8.6.36
   */
  id: string;
}
```

### `ButtonNearListener`
```typescript
export type ButtonNearListener = (state: ButtonNearDoneEvent) => void;
```

### `ConfirmBtnListener`
```typescript
export type ConfirmBtnListener = (state: BtnEvent) => void;
```

### `DownloadCompletedEvent`
Event emitted after a managed download is saved locally.
```typescript
export interface DownloadCompletedEvent {
  /**
   * Source webview instance id.
   */
  id?: string;
  /**
   * Original URL that triggered the download when available.
   */
  sourceUrl?: string;
  /**
   * Saved filename.
   */
  fileName: string;
  /**
   * Resolved MIME type when available.
   */
  mimeType?: string;
  /**
   * Absolute native filesystem path to the saved file.
   */
  path: string;
  /**
   * `file://` URL pointing at the saved file.
   */
  localUrl: string;
  /**
   * How native handled the downloaded file after saving it.
   */
  handledBy: DownloadHandledBy;
}
```

### `DownloadFailedEvent`
Event emitted when managed download handling fails.
```typescript
export interface DownloadFailedEvent {
  /**
   * Source webview instance id.
   */
  id?: string;
  /**
   * Original URL that triggered the download when available.
   */
  sourceUrl?: string;
  /**
   * Intended filename when known.
   */
  fileName?: string;
  /**
   * Resolved MIME type when available.
   */
  mimeType?: string;
  /**
   * Native error message.
   */
  error: string;
}
```

### `PopupWindowEvent`
Event emitted when a web page opens a popup/new window.
```typescript
export interface PopupWindowEvent {
  /**
   * Popup webview instance id.
   */
  id: string;
  /**
   * Parent webview instance id.
   */
  parentId?: string;
  /**
   * Requested popup URL when available.
   */
  url?: string;
  /**
   * Whether the popup was presented immediately.
   */
  visible: boolean;
}
```

## Source Of Truth

This page is generated from the plugin's `src/definitions.ts`. Re-run the sync when the public API changes upstream.

## Keep going from Getting Started

If you are using **Getting Started** to plan dashboard and API operations, connect it with [Using @capgo/capacitor-inappbrowser](/plugins/capacitor-inappbrowser/) for the native capability in Using @capgo/capacitor-inappbrowser, [API Overview](/docs/public-api/) for the implementation detail in API Overview, [Introduction](/docs/webapp/) for the implementation detail in Introduction, [API Keys](/docs/public-api/api-keys/) for the implementation detail in API Keys, and [Devices](/docs/public-api/devices/) for the implementation detail in Devices.
