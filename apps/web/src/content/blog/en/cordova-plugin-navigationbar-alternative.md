---
slug: cordova-plugin-navigationbar-alternative
title: "cordova-plugin-navigationbar Alternative for Capacitor"
description: "cordova-plugin-navigationbar alternative for Capacitor: hide, show and theme the Android navigation bar with @capgo/capacitor-navigation-bar."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-11-27T09:00:00.000Z
updated_at: 2026-11-27T09:00:00.000Z
head_image: /blog-images/migrating-cordova-to-capacitor.png
head_image_alt: "Illustration of migrating a Cordova app to Capacitor, used for an Android navigation bar plugin guide"
keywords: cordova-plugin-navigationbar alternative, capacitor navigation bar, @capgo/capacitor-navigation-bar, android navigation bar color
tag: Alternatives, Capacitor, Migration
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "What is the best cordova-plugin-navigationbar alternative in Capacitor?"
    answer: "@capgo/capacitor-navigation-bar replaces Cordova hide and setup calls with typed promises, adds setNavigationBarColor and getNavigationBarColor for Android 7+ (API 24), and documents divider colors on API 28+."
  - question: "Does @capgo/capacitor-navigation-bar work on iOS?"
    answer: "No. iOS has no software navigation bar. The Cordova plugin was Android-only as well. Use safe area and edge-to-edge WebView config on iOS."
  - question: "Is cordova-plugin-navigationbar still maintained?"
    answer: "npm lists cordova-plugin-navigationbar at version 1.0.31. The last version publish on the registry timeline is 25 February 2016. Source: cranberrygame/cordova-plugin-navigationbar on GitHub."
  - question: "Where are the docs?"
    answer: "https://capgo.app/docs/plugins/navigation-bar/, npm @capgo/capacitor-navigation-bar, and GitHub Cap-go/capacitor-navigation-bar."
---

The practical **cordova-plugin-navigationbar alternative** for a Capacitor app is [`@capgo/capacitor-navigation-bar`](/plugins/capacitor-navigation-bar/). It covers Android immersive hide and show, adds navigation bar color and light or dark button themes, and returns the current color without `cordova.exec` callbacks. This guide lists npm facts, install steps, usage, and a Cordova to Capacitor API map.

## Why leave cordova-plugin-navigationbar in Capacitor

**cordova-plugin-navigationbar** on npm is version **1.0.31**. The last numbered release on the npm `time` object is **25 February 2016**. The registry `modified` timestamp is **14 June 2022** (metadata only, not a new plugin version). The npm repository URL points to [cranberrygame/cordova-plugin-navigationbar](https://github.com/cranberrygame/cordova-plugin-navigationbar).

The JavaScript bridge in `www/navigationbar.js` exposes:

- `setUp(autoHideNavigationBar, success, error)` to configure auto-hide behavior
- `hideNavigationBar(success, error)` to hide the bar

Examples in the upstream repo sometimes call `window.navigationbar.hide()`, but the published module actions are `setUp` and `hideNavigationBar`. There is no show API, no color API, and no promise surface in the Cordova package.

[`@capgo/capacitor-navigation-bar`](https://www.npmjs.com/package/@capgo/capacitor-navigation-bar) latest on npm is **8.2.23** with a `modified` date of **13 November 2026**. `src/definitions.ts` documents `hide`, `show`, `setNavigationBarColor`, `getNavigationBarColor`, and optional `dividerColor` on Android API 28+. Capgo ships fixes on an open source cadence where a human still reviews, tests and merges 50+ pull requests daily.

## Install

The command below installs the npm **8.x** line for **Capacitor 8** (`@capacitor/core` >= 8). Capgo plugin majors track Capacitor majors. On Capacitor 7, install the matching **7.x** release instead (see the plugin README).

```bash
bun add @capgo/capacitor-navigation-bar
bunx cap sync
```

Optional defaults in `capacitor.config` under `plugins.NavigationBar` can set `color`, `dividerColor`, and `style` before the WebView loads. See the [navigation bar plugin docs](/docs/plugins/navigation-bar/).

## Usage example

```ts
import { Capacitor } from '@capacitor/core';
import { NavigationBar, NavigationBarColor } from '@capgo/capacitor-navigation-bar';

export async function enterImmersiveReader() {
  if (Capacitor.getPlatform() !== 'android') return;
  await NavigationBar.setNavigationBarColor({
    color: NavigationBarColor.BLACK,
    darkButtons: false,
  });
  await NavigationBar.hide();
}

export async function exitImmersiveReader() {
  if (Capacitor.getPlatform() !== 'android') return;
  await NavigationBar.show();
  const { color, darkButtons } = await NavigationBar.getNavigationBarColor();
  console.log(color, darkButtons);
}
```

Pair navigation bar theming with [edge-to-edge display configuration](/blog/capacitor-edge-to-edge-display-native-config/) so your WebView content respects system insets when the bar returns.

## Migrating from Cordova to Capacitor

```js
// Before (Cordova)
document.addEventListener('deviceready', () => {
  window.navigationbar.setUp(false, success, error);
  window.navigationbar.hideNavigationBar(success, error);
});
```

```ts
// After (Capacitor), enter immersive screen
import { Capacitor } from '@capacitor/core';
import { NavigationBar } from '@capgo/capacitor-navigation-bar';

if (Capacitor.getPlatform() === 'android') {
  await NavigationBar.setNavigationBarColor({ color: '#0f172a', darkButtons: false });
  await NavigationBar.hide();
}
```

```ts
// After (Capacitor), leave immersive screen
if (Capacitor.getPlatform() === 'android') {
  await NavigationBar.show();
}
```

Cordova `setUp(true, ...)` only toggles auto-hide on the native side. In Capacitor you implement auto-hide in app logic: call `hide()` when entering fullscreen and `show()` when leaving, or listen to your router and keyboard events.

### API mapping table

| cordova-plugin-navigationbar (`window.navigationbar`) | @capgo/capacitor-navigation-bar |
| --- | --- |
| `setUp(autoHide, success, error)` | No direct equivalent; use `hide()` / `show()` in app code, or config `plugins.NavigationBar` defaults |
| `hideNavigationBar(success, error)` | `hide()` |
| Not in Cordova | `show()` |
| Not in Cordova | `setNavigationBarColor({ color, darkButtons?, dividerColor? })` |
| Not in Cordova | `getNavigationBarColor()` returns `{ color, darkButtons }` |
| Not in Cordova | `getPluginVersion()` |
| Cordova plugin install | `bun add @capgo/capacitor-navigation-bar` plus `bunx cap sync` |

## Links and next steps

- Plugin docs: [https://capgo.app/docs/plugins/navigation-bar/](/docs/plugins/navigation-bar/)
- Marketing page: [/plugins/capacitor-navigation-bar/](/plugins/capacitor-navigation-bar/)
- npm: [https://www.npmjs.com/package/@capgo/capacitor-navigation-bar](https://www.npmjs.com/package/@capgo/capacitor-navigation-bar)
- GitHub: [https://github.com/Cap-go/capacitor-navigation-bar/](https://github.com/Cap-go/capacitor-navigation-bar/)
- Cordova upstream: [https://github.com/cranberrygame/cordova-plugin-navigationbar](https://github.com/cranberrygame/cordova-plugin-navigationbar)

Navigation bar behavior ships in the native binary. Use [Capgo Build](/native-build/) for store builds, then adjust immersive layouts with [Capgo live updates](/live-update/) where only JavaScript changes. For the full platform move, read the [Cordova to Capacitor migration guide](/blog/migrating-cordova-to-capacitor/).