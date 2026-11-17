---
slug: cordova-plugin-googleplus-alternative
title: "cordova-plugin-googleplus Alternative for Capacitor"
description: "cordova-plugin-googleplus alternative for Capacitor: Google Sign-In with @capgo/capacitor-social-login, offline serverAuthCode mode, and promise APIs."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-11-17T10:00:00.000Z
updated_at: 2026-11-17T10:00:00.000Z
head_image: /migrating-cordova-to-capacitor.webp
head_image_alt: "Illustration of migrating a Cordova app to Capacitor, used for a Google Sign-In plugin guide"
keywords: cordova-plugin-googleplus alternative, capacitor google login, Google Sign-In capacitor, @capgo/capacitor-social-login
tag: Alternatives, Capacitor, Migration
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "What is the best cordova-plugin-googleplus alternative in Capacitor?"
    answer: "@capgo/capacitor-social-login replaces window.plugins.googleplus with SocialLogin.initialize() and SocialLogin.login({ provider: 'google' }) plus typed GoogleLoginResponse fields."
  - question: "Is cordova-plugin-googleplus still maintained?"
    answer: "npm lists cordova-plugin-googleplus at version 8.5.2 with a registry modified date of 14 June 2022. Upstream is EddyVerbruggen/cordova-plugin-googleplus."
  - question: "Does Capgo support serverAuthCode?"
    answer: "Yes. Initialize Google with mode offline in InitializeOptions; login() returns serverAuthCode in GoogleLoginResponseOffline per definitions.ts."
  - question: "Where are the docs?"
    answer: "https://capgo.app/docs/plugins/social-login/, npm @capgo/capacitor-social-login, and GitHub Cap-go/capacitor-social-login."
---

The practical **cordova-plugin-googleplus alternative** for a Capacitor app is [`@capgo/capacitor-social-login`](/plugins/capacitor-social-login/). It replaces `window.plugins.googleplus` with `SocialLogin`, keeps Google email and token fields, and adds Apple, Facebook, and other providers in one `definitions.ts` surface. This guide covers npm facts, install steps, usage, and an API map for your Cordova to Capacitor move.

## Why leave cordova-plugin-googleplus in Capacitor

**cordova-plugin-googleplus** on npm is version **8.5.2**. The registry `modified` timestamp is **14 June 2022**. The source lives at [EddyVerbruggen/cordova-plugin-googleplus](https://github.com/EddyVerbruggen/cordova-plugin-googleplus). The README and `www/GooglePlus.js` document:

- `window.plugins.googleplus.login(options, success, error)`
- `trySilentLogin`, `logout`, `disconnect`
- `isAvailable` and `getSigningCertificateFingerprint`

Login options include `webClientId`, `offline` for `serverAuthCode`, and scopes for `idToken`.

In a Capacitor codebase the Cordova plugin still means `cordova plugin add`, manual `GoogleService-Info.plist` and Android OAuth client setup, and callback APIs with no shared types across providers.

[`@capgo/capacitor-social-login`](https://www.npmjs.com/package/@capgo/capacitor-social-login) latest on npm is **8.7.11** with a `modified` date of **13 November 2026**. `src/definitions.ts` documents `initialize()`, `login()`, `logout()`, `isLoggedIn()`, `getAuthorizationCode()`, and `refresh()` with `GoogleLoginOptions` and online or offline response shapes. Capgo ships fixes on an open source cadence where a human still reviews, tests and merges 50+ pull requests daily.

## Install

```bash
bun add @capgo/capacitor-social-login
bunx cap sync
```

Configure Google like the Cordova README: iOS `GoogleService-Info.plist`, Android OAuth client, and matching bundle or application id. Pass `webClientId` and iOS `iosClientId` in `SocialLogin.initialize({ google: { ... } })` per plugin docs.

## Usage example

```ts
import { SocialLogin } from '@capgo/capacitor-social-login';

export async function signInWithGoogle() {
  await SocialLogin.initialize({
    google: {
      webClientId: '<web-client-id>',
      iOSClientId: '<ios-client-id>',
      mode: 'online',
    },
  });

  const { result } = await SocialLogin.login({
    provider: 'google',
    options: { scopes: ['email', 'profile'] },
  });

  if ('idToken' in result) {
    console.log(result.idToken, result.email);
  }
}
```

## Migrating from Cordova to Capacitor

```js
// Before (Cordova)
window.plugins.googleplus.login(
  { webClientId: '<id>', offline: true },
  (obj) => console.log(obj.idToken, obj.serverAuthCode),
  (err) => console.error(err),
);
```

```ts
// After (Capacitor)
import { SocialLogin } from '@capgo/capacitor-social-login';

await SocialLogin.initialize({
  google: { webClientId: '<id>', mode: 'offline' },
});
const { result } = await SocialLogin.login({ provider: 'google', options: {} });
if ('serverAuthCode' in result) {
  console.log(result.serverAuthCode);
}
```

### API mapping table

| cordova-plugin-googleplus (`window.plugins.googleplus`) | @capgo/capacitor-social-login |
| --- | --- |
| `login(options, success, error)` | `login({ provider: 'google', options })` returns `GoogleLoginResponse` |
| `trySilentLogin(...)` | Re-login with stored session via `login()` or `refresh()` per platform notes in definitions.ts |
| `logout(success, error)` | `logout({ provider: 'google' })` (not in Google offline mode) |
| `disconnect(success, error)` | `logout({ provider: 'google' })` plus revoke on backend |
| `isAvailable(callback)` | Detect capability through `login()` result or platform docs |
| `options.offline` for `serverAuthCode` | `initialize({ google: { mode: 'offline' } })` |
| `options.scopes` | `login({ options: { scopes: [...] } })` |
| Success object `idToken`, `email`, `displayName`, ... | Typed fields on `GoogleLoginResponseOnline` or `GoogleLoginResponseOffline` |
| Callback errors | Promise rejection with `SocialLoginError` and `code: 'USER_CANCELLED'` when the user dismisses the UI |
| Cordova plugin install | `bun add @capgo/capacitor-social-login` plus `bunx cap sync` |

## Links and next steps

- Plugin docs: [https://capgo.app/docs/plugins/social-login/](/docs/plugins/social-login/)
- Marketing page: [/plugins/capacitor-social-login/](/plugins/capacitor-social-login/)
- npm: [https://www.npmjs.com/package/@capgo/capacitor-social-login](https://www.npmjs.com/package/@capgo/capacitor-social-login)
- GitHub: [https://github.com/Cap-go/capacitor-social-login/](https://github.com/Cap-go/capacitor-social-login/)
- Cordova upstream: [https://github.com/EddyVerbruggen/cordova-plugin-googleplus](https://github.com/EddyVerbruggen/cordova-plugin-googleplus)

OAuth client ids ship in the native binary and Google Cloud console. Plan a store build after you swap plugins. Use [Capgo Build](/native-build/) for cloud builds. For the full platform move, read the [Cordova to Capacitor migration guide](/blog/migrating-cordova-to-capacitor/).