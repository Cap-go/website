---
locale: en
curated: true
seoTitle: 'Capacitor Text Interaction: Disable iOS Text Selection'
seoDescription: 'Disable text selection and the iOS magnifier lens in Capacitor WebViews. Install @capgo/capacitor-textinteraction, see the API, examples and FAQ.'
keywords: 'capacitor disable text selection, capacitor ios magnifier, disable magnifier lens ios webview, wkwebview isTextInteractionEnabled, capacitor text interaction, ionic disable text selection ios, capacitor long press loupe, capacitor-textinteraction'
summary: 'Turn text selection and the iOS magnifier lens off in the Capacitor WebView when your app should feel native, then turn it back on before the user needs to type.'
platforms:
  - name: iOS
    status: supported
    note: 'iOS 14.5+'
  - name: Android
    status: unsupported
    note: 'resolves success: false'
  - name: Web
    status: unsupported
    note: 'throws unimplemented'
faq:
  - question: 'How do I disable text selection in a Capacitor iOS app?'
    answer: 'Install @capgo/capacitor-textinteraction, run bunx cap sync, then call TextInteraction.toggle({ enabled: false }). The plugin sets isTextInteractionEnabled to false on the WKWebView, which turns off text selection and the magnifier lens for the whole WebView.'
  - question: 'Why is CSS user-select: none not enough on iOS?'
    answer: 'user-select and -webkit-touch-callout stop most selection in page content, but the WKWebView can still show the magnifier lens and selection behavior on long-press, and every element you forget to style stays selectable. The plugin switches text interaction off at the WebView level, so one call covers every screen.'
  - question: 'Can users still type in inputs while text interaction is disabled?'
    answer: 'No. While text interaction is disabled, text inputs, textareas and contenteditable elements stop working. Call TextInteraction.toggle({ enabled: true }) before showing a form or search field, and disable it again when the user leaves that screen.'
  - question: 'Does the plugin work on Android or the web?'
    answer: 'No. Text interaction toggling is iOS only. On Android the call resolves with success set to false and changes nothing. On the web the call throws an unimplemented error, so guard it with Capacitor.getPlatform() === "ios".'
  - question: 'Which iOS and Capacitor versions are supported?'
    answer: 'The native API needs iOS 14.5 or later. Plugin major versions follow Capacitor: use plugin v8 with Capacitor 8 and plugin v7 with Capacitor 7.'
  - question: 'Does the setting persist after the app restarts?'
    answer: 'The setting lives on the WebView configuration, so it stays in effect across page navigations until you call toggle again. A fresh app launch creates a new WebView with text interaction enabled, so call toggle again at startup if you want it off by default.'
---

# Disable text selection and the magnifier lens in Capacitor iOS apps

`@capgo/capacitor-textinteraction` gives you one call to switch text interaction on or off for the Capacitor WebView on iOS. When it is off, long-pressing text no longer selects it, shows the copy callout, or brings up the magnifier lens that iOS 15 reintroduced. Your web app stops feeling like a web page inside a native shell.

Under the hood the plugin sets [`WKPreferences.isTextInteractionEnabled`](https://developer.apple.com/documentation/webkit/wkpreferences/istextinteractionenabled) on the app's `WKWebView`. It changes nothing else.

## When to use it

- **Games, kiosks and drawing apps** where long-press and drag gestures should never select text.
- **Custom long-press menus** that clash with the native selection handles and callout.
- **Media players, maps and carousels** where a slow swipe accidentally triggers the loupe.
- **Branded, app-like UI** where selectable labels and buttons break the native feel.

Keep text interaction on for screens where users read long content they may want to copy, or where they fill in forms.

## Install

```bash
bun add @capgo/capacitor-textinteraction
bunx cap sync
```

No `Info.plist` keys, permissions or `capacitor.config.ts` entries are needed.

| Plugin version | Capacitor version | Maintained |
| --- | --- | --- |
| v8.x | v8.x | Yes |
| v7.x | v7.x | On demand |
| v6.x and older | v6.x and older | No |

## Disable text interaction on app start

```typescript
import { Capacitor } from '@capacitor/core';
import { TextInteraction } from '@capgo/capacitor-textinteraction';

if (Capacitor.getPlatform() === 'ios') {
  const { success } = await TextInteraction.toggle({ enabled: false });
  if (!success) console.warn('Text interaction could not be changed on this device');
}
```

Always pass `enabled` explicitly. The native side treats a missing value as `false`.

## Re-enable it before users type

While text interaction is off, `<input>`, `<textarea>` and `contenteditable` elements stop accepting input. Turn it back on for any screen with a form, then turn it off again when the user leaves.

```typescript
import { Capacitor } from '@capacitor/core';
import { TextInteraction } from '@capgo/capacitor-textinteraction';

const isIos = Capacitor.getPlatform() === 'ios';

export async function setTextInteraction(enabled: boolean) {
  if (!isIos) return false;
  const { success } = await TextInteraction.toggle({ enabled });
  return success;
}

// Entering a login, search or checkout screen
await setTextInteraction(true);

// Leaving it
await setTextInteraction(false);
```

With a router, call `setTextInteraction(true)` in the enter hook of routes that contain inputs (for example Vue Router `beforeEnter`, a React `useEffect`, or Angular `ionViewWillEnter`) and `setTextInteraction(false)` when leaving them.

## Plugin vs CSS

You can hide most selection with CSS:

```css
body {
  -webkit-user-select: none;
  user-select: none;
  -webkit-touch-callout: none;
}

input,
textarea,
[contenteditable] {
  -webkit-user-select: text;
  user-select: text;
}
```

CSS works per element, so anything you forget stays selectable, and it does not change how the WebView itself handles long-press. The plugin works at the WebView level: one call covers every screen, including the magnifier lens. Many apps use both: the plugin for app-like screens and CSS for fine control inside screens where text interaction stays on.

## API reference

### `toggle(options)`

```typescript
toggle(options: { enabled: boolean }): Promise<{ success: boolean }>
```

Turns text interaction on or off for the Capacitor WebView.

- `enabled`: `true` restores selection, the callout and the magnifier lens. `false` disables them.
- `success`: `true` when the change was applied (iOS 14.5+ with a WebView available). `false` on Android and when no WebView is available.

### `getPluginVersion()`

```typescript
getPluginVersion(): Promise<{ version: string }>
```

Returns the native plugin version. Returns `web` in the browser.

## Platform behavior

| Platform | Behavior |
| --- | --- |
| iOS 14.5+ | Sets `isTextInteractionEnabled` on the `WKWebView`. Applies to all pages until toggled again. |
| Android | No-op. Resolves `{ success: false }`. Use CSS if you need to limit selection. |
| Web | `toggle` throws an unimplemented error. Guard calls with `Capacitor.getPlatform()`. |

## Troubleshooting

- **Inputs stopped working.** Text interaction is still disabled. Call `toggle({ enabled: true })` before the form is shown.
- **Nothing changes on Android.** Expected. The plugin only supports iOS.
- **`TextInteraction.toggle is not available on web`.** The call ran in the browser or during development in a desktop browser. Wrap it in a platform check.
- **Selection comes back after restarting the app.** Each launch creates a new WebView with text interaction enabled. Call `toggle({ enabled: false })` during startup.

## Related plugins

- [Privacy Screen](/plugins/capacitor-privacy-screen/) hides app content in the iOS app switcher and blocks Android screenshots.
- [Home Indicator](/plugins/capacitor-home-indicator/) hides the iOS home indicator for immersive screens.
- [Screen Orientation](/plugins/capacitor-screen-orientation/) locks and reads screen orientation.
- Browse all [Capacitor plugins by Capgo](/plugins/).

## Ship the change without an App Store review

Toggling text interaction is JavaScript. Once the plugin is in your native build, you can change where and when it runs with a [Capgo live update](/docs/getting-started/quickstart/) instead of waiting for App Store review.

## Full reference

- Docs: [Text Interaction plugin documentation](/docs/plugins/textinteraction/)
- Getting started: [Install and API guide](/docs/plugins/textinteraction/getting-started/)
- Source: [Cap-go/capacitor-textinteraction on GitHub](https://github.com/Cap-go/capacitor-textinteraction/)
