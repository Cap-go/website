---
locale: en
---

# Using @capgo/capacitor-intune

The `@capgo/capacitor-intune` package brings Microsoft Intune MAM enrollment, app protection policies, app config, and MSAL authentication to Capacitor apps.

Use it to:

- sign users in with Microsoft using MSAL
- enroll the authenticated account into Intune MAM
- read Intune app configuration and policy values
- react to policy and app config refresh events

## Installation

```bash
bun add @capgo/capacitor-intune
bunx cap sync
```

## iOS Setup

This plugin bundles Intune iOS SDK `21.5.1`, which means:

- iOS deployment target `17.0+`
- current Xcode 26 compatibility

Add your `IntuneMAMSettings` dictionary to `Info.plist`, configure your `msauth...` redirect URI, forward the callback to `MSALPublicClientApplication.handleMSALResponse(...)`, and run Microsoft's `IntuneMAMConfigurator`.

## Android Setup

Add the Intune Gradle plugin, the Duo Maven feed, your `auth_config.json`, broker visibility queries, the `BrowserTabActivity` redirect filter, and either:

- `android:name="app.capgo.intune.IntuneApplication"`
- or your own `MAMApplication` subclass that registers `IntuneMamServiceAuthenticationCallback`

## Basic Usage

```ts
import { IntuneMAM } from '@capgo/capacitor-intune';

await IntuneMAM.addListener('policyChange', (result) => {
  console.log('Policy changed', result.accountId);
});

const auth = await IntuneMAM.acquireToken({
  scopes: ['https://graph.microsoft.com/.default'],
});

await IntuneMAM.registerAndEnrollAccount({
  accountId: auth.accountId,
});

const user = await IntuneMAM.enrolledAccount();
const appConfig = await IntuneMAM.appConfig({ accountId: auth.accountId });
const policy = await IntuneMAM.getPolicy({ accountId: auth.accountId });

console.log({ user, appConfig, policy });
```

## API Summary

- `acquireToken(options)`: interactive Microsoft sign-in
- `acquireTokenSilent(options)`: silent token refresh
- `registerAndEnrollAccount(options)`: Intune registration and enrollment
- `appConfig(user)`: Intune app config payload
- `getPolicy(user)`: Intune app protection policy payload
- `sdkVersion()`: bundled Intune/MSAL versions
