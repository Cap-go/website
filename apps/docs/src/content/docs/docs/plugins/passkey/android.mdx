---
title: Android Setup
description: Configure passkeys on Android for @capgo/capacitor-passkey with Digital Asset Links and assetlinks.json.
sidebar:
  order: 4
---

On Android, passkeys work with your website when the app and the relying-party domain are connected through Digital Asset Links.

## What the plugin handles

After you add the plugin config and run `bunx cap sync`, the plugin patches the generated Android host project:

- injects the `asset_statements` manifest metadata
- writes the generated string resource referenced by that metadata

## What you still need to host

You must publish `assetlinks.json` on the relying-party domain:

```text
https://signin.example.com/.well-known/assetlinks.json
```

Example:

```json
[
  {
    "relation": [
      "delegate_permission/common.handle_all_urls",
      "delegate_permission/common.get_login_creds"
    ],
    "target": {
      "namespace": "android_app",
      "package_name": "app.capgo.passkey.example",
      "sha256_cert_fingerprints": [
        "AA:BB:CC:DD:EE:FF:00:11:22:33:44:55:66:77:88:99:AA:BB:CC:DD:EE:FF:00:11:22:33:44:55:66:77:88:99"
      ]
    }
  }
]
```

## Checklist

1. Set `origin` and `domains` in `plugins.CapacitorPasskey` in `capacitor.config.*`.
2. Run `bunx cap sync`.
3. Use your real Android package name in `assetlinks.json`.
4. Add every signing certificate fingerprint you need, including debug or internal signing keys if you test those builds.
5. Host the file on the same domain you use as the relying-party ID.

## Important behavior difference from a browser

With Digital Asset Links configured, Android can use the same relying party and passkeys as your website. The remaining difference is the literal origin reported in native `clientDataJSON`.

- A normal Android app does not behave like a privileged browser.
- The assertion origin can be tied to the Android app signature instead of your website origin.
- If your backend strictly validates `clientDataJSON.origin`, accept the Android app origin alongside the website origin.

## Keep going from Android Setup

If you are using **Android Setup** to plan authentication and account flows, connect it with [Using @capgo/capacitor-passkey](/plugins/capacitor-passkey/) for the native capability in Using @capgo/capacitor-passkey, [@capgo/capacitor-social-login](/docs/plugins/social-login/) for the implementation detail in @capgo/capacitor-social-login, [@capgo/capacitor-passkey](/docs/plugins/passkey/) for the implementation detail in @capgo/capacitor-passkey, [@capgo/capacitor-native-biometric](/docs/plugins/native-biometric/) for the implementation detail in @capgo/capacitor-native-biometric, and [Two-factor authentication](/docs/webapp/mfa/) for the implementation detail in Two-factor authentication.
