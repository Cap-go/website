---
title: Android Setup
description: Android-specific setup for @capgo/capacitor-recaptcha.
sidebar:
  order: 3
---

## Site Key

Create an Android mobile application key in Google Cloud reCAPTCHA. Register the package name used by your Capacitor app, then set the key in `capacitor.config.ts`.

Android uses Google's mobile reCAPTCHA SDK. Regular, non-Enterprise reCAPTCHA v3 is only available on Web in this plugin; `enterprise: false` is rejected on Android.

```ts
import type { CapacitorConfig } from '@capacitor/cli';
import '@capgo/capacitor-recaptcha';

const config: CapacitorConfig = {
  plugins: {
    Recaptcha: {
      androidSiteKey: 'ANDROID_SITE_KEY',
    },
  },
};

export default config;
```

## Dependency

The plugin includes the Google Android reCAPTCHA dependency:

```txt
com.google.android.recaptcha:recaptcha:18.8.0
```

Google's Android reCAPTCHA SDK requires core library desugaring in the consuming app. The plugin enables it automatically during `npx cap sync android` and adds:

```txt
com.android.tools:desugar_jdk_libs:2.1.5
```

You can override the dependency version from the app Gradle config with `recaptchaVersion` when you need to pin a newer Google SDK release.
You can override the desugaring dependency with `desugarJdkLibsVersion`.

## Execute

```ts
import { Recaptcha } from '@capgo/capacitor-recaptcha';

const { token } = await Recaptcha.execute({
  action: 'checkout',
  timeout: 10000,
});
```

Send the token to your backend immediately and create a reCAPTCHA assessment before accepting the protected request.

## Keep going from Android Setup

If you are using **Android Setup** to plan authentication and account flows, connect it with [Using @capgo/capacitor-recaptcha](/plugins/capacitor-recaptcha/) for the native capability in Using @capgo/capacitor-recaptcha, [@capgo/capacitor-social-login](/docs/plugins/social-login/) for the implementation detail in @capgo/capacitor-social-login, [@capgo/capacitor-passkey](/docs/plugins/passkey/) for the implementation detail in @capgo/capacitor-passkey, [@capgo/capacitor-native-biometric](/docs/plugins/native-biometric/) for the implementation detail in @capgo/capacitor-native-biometric, and [Two-factor authentication](/docs/webapp/mfa/) for the implementation detail in Two-factor authentication.
