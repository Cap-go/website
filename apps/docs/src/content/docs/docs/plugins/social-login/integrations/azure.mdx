---
title: Microsoft Entra ID
description: Integrate Microsoft Entra ID or Azure AD with @capgo/capacitor-social-login using the Auth Connect preset wrapper or direct OAuth2 configuration.
sidebar:
  order: 3
---

## Overview

Microsoft Entra ID is supported through:

- The `azure` Auth Connect preset
- Direct `oauth2` configuration against Microsoft identity endpoints

## Auth Connect preset example

```typescript
import { SocialLoginAuthConnect } from '@capgo/capacitor-social-login';

await SocialLoginAuthConnect.initialize({
  authConnect: {
    azure: {
      tenantId: 'common',
      clientId: 'your-azure-client-id',
      redirectUrl: 'myapp://oauth/azure',
    },
  },
});

const result = await SocialLoginAuthConnect.login({
  provider: 'azure',
});
```

## Direct OAuth2 example

```typescript
import { SocialLogin } from '@capgo/capacitor-social-login';

await SocialLogin.initialize({
  oauth2: {
    azure: {
      appId: 'your-azure-client-id',
      authorizationBaseUrl: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
      accessTokenEndpoint: 'https://login.microsoftonline.com/common/oauth2/v2.0/token',
      redirectUrl: 'myapp://oauth/azure',
      scope: 'openid profile email User.Read',
      pkceEnabled: true,
      resourceUrl: 'https://graph.microsoft.com/v1.0/me',
    },
  },
});

const result = await SocialLogin.login({
  provider: 'oauth2',
  options: {
    providerId: 'azure',
  },
});
```

## Notes

- Replace `common` with your tenant ID for single-tenant apps.
- `resourceUrl` can point to Microsoft Graph when you want profile data immediately after login.

## Related docs

- [OAuth2 and OIDC providers](/docs/plugins/social-login/oauth2/)
- [Ionic Auth Connect migration](/docs/plugins/social-login/migrations/ionic-auth-connect/)
- [Better Auth integration](/docs/plugins/social-login/better-auth/)

## Keep going from Microsoft Entra ID

If you are using **Microsoft Entra ID** to plan authentication and account flows, connect it with [Using @capgo/capacitor-social-login](/plugins/capacitor-social-login/) for the native capability in Using @capgo/capacitor-social-login, [@capgo/capacitor-social-login](/docs/plugins/social-login/) for the implementation detail in @capgo/capacitor-social-login, [@capgo/capacitor-passkey](/docs/plugins/passkey/) for the implementation detail in @capgo/capacitor-passkey, [@capgo/capacitor-native-biometric](/docs/plugins/native-biometric/) for the implementation detail in @capgo/capacitor-native-biometric, and [Two-factor authentication](/docs/webapp/mfa/) for the implementation detail in Two-factor authentication.
