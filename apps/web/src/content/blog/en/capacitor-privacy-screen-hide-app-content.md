---
slug: capacitor-privacy-screen-hide-app-content
title: "Capacitor Privacy Screen: Hide App Content"
description: "Add a Capacitor privacy screen to hide app content in the app switcher and block screenshots, with per-screen control, config and platform caveats."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-10-01T09:00:00.000Z
updated_at: 2026-10-01T03:59:51.000Z
head_image: /org_security.webp
head_image_alt: "Security settings illustration for adding a privacy screen to a Capacitor app"
keywords: capacitor privacy screen, hide app content app switcher, capacitor prevent screenshot, FLAG_SECURE capacitor, ionic privacy screen, @capgo/capacitor-privacy-screen
tag: Security, Capacitor, Tutorial
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "How do I hide my app content in the iOS and Android app switcher?"
    answer: "Install @capgo/capacitor-privacy-screen and call PrivacyScreen.enable(), or set enabled: true under plugins.PrivacyScreen in capacitor.config.ts. iOS shows a blur or launch screen in the snapshot, Android uses FLAG_SECURE with an optional dim or splash overlay."
  - question: "Does the privacy screen block screenshots?"
    answer: "On Android, yes. FLAG_SECURE blocks screenshots and screen recording while protection is enabled. On iOS the plugin places content in a secure rendering layer while enabled, but treat iOS screenshot blocking as best effort and never as a security boundary."
  - question: "Can I enable the privacy screen only on some pages?"
    answer: "Yes. Call enable() when entering a sensitive page and disable() when leaving it. Make sure back navigation and deep links also go through that logic."
  - question: "Does it work on the web?"
    answer: "The web implementation keeps an enabled flag for API parity, but browsers cannot hide tab previews or block screenshots."
  - question: "Does a privacy screen affect performance?"
    answer: "No measurable effect in normal use. It sets a window flag on Android and adds an overlay on iOS when the app resigns active."
---

A Capacitor privacy screen hides your app's content when the user opens the app switcher and, on Android, blocks screenshots and screen recording. Without one, iOS and Android take a snapshot of your last screen, so a bank balance, a medical record or a one-time code stays visible in the recent apps list. [`@capgo/capacitor-privacy-screen`](/plugins/capacitor-privacy-screen/) adds this with one call or one config flag, and lets you protect only the screens that need it.

## What the app switcher exposes

When a user leaves your app, both systems capture an image of the current screen:

- **iOS** takes a snapshot when the app resigns active and shows it in the app switcher, and briefly while the app relaunches.
- **Android** shows a live or cached preview in Recents.

Anyone glancing at the phone sees that snapshot. So does anyone screen-sharing a call, or a user who records their screen for a support ticket. Screenshots are also synced to cloud photo libraries, which is where sensitive data really leaks.

## Which apps need it

| App type | What can leak |
| --- | --- |
| Banking, fintech, crypto | Balances, card numbers, IBANs, transactions |
| Password managers, authenticators | Passwords, TOTP codes, recovery keys |
| Health and medical | Diagnoses, prescriptions, lab results |
| Messaging | Private conversations |
| HR, payroll, legal | Salaries, contracts |
| Dating, private media | Photos and matches |

Security reviews and penetration tests for these categories routinely flag missing app switcher protection. OWASP MASVS includes checks for sensitive data exposed through the UI, and auditors test exactly this.

## Install

```bash
bun add @capgo/capacitor-privacy-screen
bunx cap sync
```

The plugin supports Capacitor 8 with version 8.x.

## Option 1: protect the whole app from launch

Set it in `capacitor.config.ts`. The native plugin reads this when it loads, before your JavaScript runs, so even the first snapshot is protected:

```ts
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.bank',
  appName: 'Example Bank',
  webDir: 'dist',
  plugins: {
    PrivacyScreen: {
      enabled: true,
      android: {
        dimBackground: false,
        privacyModeOnActivityHidden: 'splash',
      },
      ios: {
        blurEffect: 'dark',
      },
    },
  },
};

export default config;
```

Run `bunx cap sync` after changing the config. The `enabled` option is read from Capacitor config only, it is not a runtime option.

## Option 2: protect specific screens

```ts
import { PrivacyScreen } from '@capgo/capacitor-privacy-screen';

export async function enterSensitiveScreen() {
  await PrivacyScreen.enable({
    android: { dimBackground: true },
    ios: { blurEffect: 'light' },
  });
}

export async function leaveSensitiveScreen() {
  await PrivacyScreen.disable();
}

const { enabled } = await PrivacyScreen.isEnabled();
```

Hook these into your router so every path in and out is covered. With Vue Router, for example:

```ts
router.afterEach(async (to) => {
  if (to.meta.sensitive) {
    await PrivacyScreen.enable();
  } else {
    await PrivacyScreen.disable();
  }
});
```

With Angular, use a guard or a `NavigationEnd` subscription. With React Router, a hook in your layout component works. The important thing is that back navigation, deep links and tab switches go through the same logic, otherwise a sensitive screen can end up unprotected.

## What each option does

### Android

- Protection uses `WindowManager.LayoutParams.FLAG_SECURE`. While enabled, screenshots and screen recordings are blocked and the Recents preview is hidden.
- `dimBackground: true` shows a dim overlay in the app switcher. With `false`, the plugin shows your splash drawable when available and falls back to dimming.
- `privacyModeOnActivityHidden` controls what shows when your activity is hidden by something else, for example the system biometric prompt: `'none'` (default), `'dim'` or `'splash'`.
- The old `preventScreenshots` option is deprecated and ignored. `FLAG_SECURE` is always applied while protection is on. To allow a screenshot on one screen, call `disable()` before it and `enable()` after.

### iOS

- When the app resigns active, the plugin adds an overlay so the app switcher snapshot does not show your content.
- `blurEffect: 'light'` or `'dark'` uses native blur. `'none'` (default) shows your launch screen when available, otherwise a system background.
- While enabled, app content is also placed in a secure rendering layer. Treat iOS screenshot blocking as best effort: Apple does not offer an official API to block screenshots, and behavior can change between iOS versions.

### Web

The web implementation only tracks the enabled flag so your code runs everywhere. Browsers cannot hide tab previews or block screenshots.

## Combine it with biometrics

A common pattern for banking apps: blur in the switcher, then require Face ID or fingerprint when the app comes back after some time. The plugin's `privacyModeOnActivityHidden` keeps the content covered while the Android biometric prompt is up.

```ts
import { App } from '@capacitor/app';
import { NativeBiometric } from '@capgo/capacitor-native-biometric';

// null until the app has really gone to the background
let backgroundedAt: number | null = null;

App.addListener('appStateChange', async ({ isActive }) => {
  if (!isActive) {
    backgroundedAt = Date.now();
    return;
  }
  const away = backgroundedAt === null ? 0 : Date.now() - backgroundedAt;
  backgroundedAt = null;
  if (away > 60_000) {
    await NativeBiometric.verifyIdentity({ reason: 'Confirm it is you' });
  }
});
```

See the [native biometric plugin](/plugins/capacitor-native-biometric/) for setup and error handling.

## The official plugin and the Capgo plugin

The Capacitor team also publishes `@capacitor/privacy-screen` with a very similar API (`enable`, `disable`, `isEnabled` and the same platform options). The Capgo plugin keeps that API and adds:

- `enabled: true` in Capacitor config, so protection is active before any JavaScript runs. The official plugin is enabled from JavaScript only.
- iOS secure rendering of content while enabled, documented as part of the plugin's behavior, in addition to the app switcher overlay.
- `getPluginVersion()` for diagnostics.
- A web implementation that keeps the enabled flag, so the same code runs in a browser preview.

If you already use the official plugin, switching is mostly an import change.

## UX details that matter

- **Do not block screenshots everywhere without reason.** Users take screenshots of receipts, confirmation numbers and settings. Protect screens with sensitive data, not the whole app, unless your security policy requires it.
- **Tell users why.** If someone tries to take a screenshot on Android and gets a black image, a short note in your help center saves support tickets.
- **Test screen sharing.** Video calls and casting are blocked on Android while `FLAG_SECURE` is set. If your app has a "share screen with support" flow, disable protection for it.
- **Check accessibility.** Screen readers still work with `FLAG_SECURE`, but test with TalkBack and VoiceOver anyway.

## Testing checklist

1. Open a sensitive screen, go to the app switcher. Content must be hidden on both platforms.
2. On Android, try a screenshot and a screen recording. Both must be black or blocked.
3. Trigger a biometric prompt and check the background.
4. Navigate back from a sensitive screen to a normal one. Protection should turn off if you use per-screen mode.
5. Kill and relaunch the app. With `enabled: true` in config, the first snapshot must be protected.
6. Test on an iPad with Split View and Slide Over. The app may stay visible while not active.

## Troubleshooting

**Snapshot still shows content on iOS.** You enabled protection after the app already went to the background, or only on some routes. Use the config option for whole-app protection.

**Black screen in Recents on Android instead of the splash.** Set `dimBackground: false` and make sure your splash drawable exists, otherwise the plugin falls back to dimming.

**Screenshots still work on Android.** Check `isEnabled()`. Another part of your app may call `disable()` on navigation.

**Protection lost after an OTA update.** Config values are native. If you change `plugins.PrivacyScreen` in `capacitor.config.ts`, ship a new store build. Runtime `enable()` and `disable()` calls in your JavaScript can be changed with [Capgo live updates](/live-update/).

## Related security work

A privacy screen is one item on a mobile security checklist. Also look at secure storage, certificate pinning and root detection. Capgo has plugins for [SSL pinning](/docs/plugins/ssl-pinning/) and [root and jailbreak detection](/docs/plugins/is-root/), and our post on [Apple's privacy rules for Capacitor apps](/blog/apple-privacy-rules-for-capacitor-apps/) covers the review side. Full plugin options are in the [privacy screen docs](/docs/plugins/privacy-screen/).
