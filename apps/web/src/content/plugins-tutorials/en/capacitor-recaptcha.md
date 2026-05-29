---
locale: en
---
# Using @capgo/capacitor-recaptcha

Generate reCAPTCHA and reCAPTCHA Enterprise tokens from Web, Android, and iOS Capacitor apps.

## Install

```bash
npm install @capgo/capacitor-recaptcha
npx cap sync
```

## Configure

```typescript
import type { CapacitorConfig } from '@capacitor/cli';
import '@capgo/capacitor-recaptcha';

const config: CapacitorConfig = {
  plugins: {
    Recaptcha: {
      androidSiteKey: 'ANDROID_SITE_KEY',
      iosSiteKey: 'IOS_SITE_KEY',
      webSiteKey: 'WEB_SITE_KEY',
      enterprise: true,
    },
  },
};

export default config;
```

Use `enterprise: false` only when the Web implementation should load standard reCAPTCHA v3 instead of reCAPTCHA Enterprise. Android and iOS use Google's Enterprise/mobile SDK path and reject `enterprise: false`.

## Generate A Token

```typescript
import { Recaptcha } from '@capgo/capacitor-recaptcha';

const { token } = await Recaptcha.execute({
  action: 'login',
});
```

Send the token to your backend and create a reCAPTCHA assessment before accepting the protected request.

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-recaptcha/
- Docs: /docs/plugins/recaptcha/

## Keep going from Using @capgo/capacitor-recaptcha

If you are using **Using @capgo/capacitor-recaptcha** to plan authentication and account flows, connect it with [@capgo/capacitor-recaptcha](/docs/plugins/recaptcha/) for the implementation detail in @capgo/capacitor-recaptcha, [Getting Started](/docs/plugins/recaptcha/getting-started/) for the implementation detail in Getting Started, [@capgo/capacitor-social-login](/docs/plugins/social-login/) for the implementation detail in @capgo/capacitor-social-login, [@capgo/capacitor-passkey](/docs/plugins/passkey/) for the implementation detail in @capgo/capacitor-passkey, and [@capgo/capacitor-native-biometric](/docs/plugins/native-biometric/) for the implementation detail in @capgo/capacitor-native-biometric.
