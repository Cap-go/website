---
title: iOS Setup
description: Configure passkeys on iOS for @capgo/capacitor-passkey with Associated Domains and the apple-app-site-association file.
sidebar:
  order: 3
---

On iOS, passkeys only work when the app is associated with the same relying-party domain as the website.

## What the plugin handles

After you add the plugin config and run `bunx cap sync`, the plugin patches the generated iOS host project so you do not need to keep editing it manually:

- adds the `webcredentials:` associated domains entries for the configured domains
- wires `CODE_SIGN_ENTITLEMENTS` when the generated app target does not already point at an entitlements file

## What you still need to host

You must publish `apple-app-site-association` on the relying-party domain:

```text
https://signin.example.com/.well-known/apple-app-site-association
```

Example:

```json
{
  "webcredentials": {
    "apps": ["ABCDE12345.app.capgo.passkey.example"]
  }
}
```

## Checklist

1. Set `origin` and `domains` in `plugins.CapacitorPasskey` in `capacitor.config.*`.
2. Run `bunx cap sync`.
3. Confirm your Apple Team ID and app bundle ID, then build the `TEAMID.bundleId` value for the association file.
4. Host `apple-app-site-association` with HTTP `200` and no `.json` extension.
5. Make sure the relying-party ID used by your backend matches the associated domain.

## Notes

- The website file must be served from the exact passkey domain you use as the relying-party ID.
- On iOS 17.4 and newer, the plugin uses the browser-style client-data API so the configured HTTPS origin is reflected in `clientDataJSON`.
- The plugin can patch native project files during sync, but it cannot create or host the website association file on your domain.

## Keep going from iOS Setup

If you are using **iOS Setup** to plan authentication and account flows, connect it with [Using @capgo/capacitor-passkey](/plugins/capacitor-passkey/) for the native capability in Using @capgo/capacitor-passkey, [@capgo/capacitor-social-login](/docs/plugins/social-login/) for the implementation detail in @capgo/capacitor-social-login, [@capgo/capacitor-passkey](/docs/plugins/passkey/) for the implementation detail in @capgo/capacitor-passkey, [@capgo/capacitor-native-biometric](/docs/plugins/native-biometric/) for the implementation detail in @capgo/capacitor-native-biometric, and [Two-factor authentication](/docs/webapp/mfa/) for the implementation detail in Two-factor authentication.
