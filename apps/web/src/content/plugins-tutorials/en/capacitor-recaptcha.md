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
