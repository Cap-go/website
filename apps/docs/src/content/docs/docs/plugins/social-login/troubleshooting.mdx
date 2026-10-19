---
title: Troubleshooting
description: Fix common @capgo/capacitor-social-login setup issues from the plugin README.
sidebar:
  order: 6
---

## Invalid Privacy Manifest (ITMS-91056)

If App Store Connect reports this error:

> ITMS-91056: Invalid privacy manifest - The PrivacyInfo.xcprivacy file from the following path is invalid: ...

Check your app-level `PrivacyInfo.xcprivacy` file:

- The file must be valid JSON.
- Use only Apple-documented keys and values.
- Do not add a privacy manifest to the plugin package; add it to your app.

See [Privacy manifest and iOS URL handlers](/docs/plugins/social-login/privacy-and-ios-handlers/) for examples.

## Google Play Console AD_ID permission error

After submitting an app to Google Play, you may see:

```text
Google Api Error: Invalid request - This release includes the com.google.android.gms.permission.AD_ID permission
but your declaration on Play Console says your app doesn't use advertising ID.
```

The Facebook SDK includes `AD_ID` and other advertising-related permissions. If your app does not use Facebook Login, disable the Facebook provider in `capacitor.config.ts`:

```typescript
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  plugins: {
    SocialLogin: {
      providers: {
        google: true,
        facebook: false,
        apple: true,
      },
    },
  },
};

export default config;
```

Then run:

```bash
npx cap sync
```

The plugin uses stub classes instead of the real Facebook SDK, so Facebook dependencies and permissions are not included in your build.

## Google Sign-In 28444 on Android

`GetCredentialCustomException: [28444] Developer console is not set up correctly` comes from Google Credential Manager when the installed APK's signing certificate, package name, or `webClientId` does not match Google Cloud Console.

Use the full [Android Google troubleshooting checklist](/docs/plugins/social-login/google/android/#troubleshooting). After a failed login, filter Logcat for `GoogleProvider`; the plugin prints `package`, `signingSha1`, and a masked `webClientId` to compare with your OAuth clients.

## Google Sign-In with Family Link supervised accounts

Family Link supervised accounts can fail with:

```text
NoCredentialException: No credentials available
```

For apps that need to support Family Link accounts, disable authorized-account filtering for the Google login call:

```typescript
import { SocialLogin } from '@capgo/capacitor-social-login';

await SocialLogin.login({
  provider: 'google',
  options: {
    style: 'bottom',
    filterByAuthorizedAccounts: false,
    scopes: ['profile', 'email'],
  },
});
```

Key points:

- Set `filterByAuthorizedAccounts` to `false`; the default is `true`.
- The plugin automatically retries with `standard` style if `bottom` style fails with `NoCredentialException`.
- These options only affect Android. iOS handles Family Link accounts normally.
- The error message suggests disabling `filterByAuthorizedAccounts` when this failure is detected.

## Where to store access tokens

Use [@capgo/capacitor-persistent-account](https://github.com/Cap-go/capacitor-persistent-account) when your app needs native secure storage for access or refresh tokens.

On Android, it stores data in Account Manager. On iOS, it stores data in Keychain.

## Related docs

- [Getting started](/docs/plugins/social-login/getting-started/)
- [Google Login on Android](/docs/plugins/social-login/google/android/)
- [Provider configuration](/docs/plugins/social-login/getting-started/#dynamic-provider-dependencies)
- [Privacy manifest and iOS URL handlers](/docs/plugins/social-login/privacy-and-ios-handlers/)
