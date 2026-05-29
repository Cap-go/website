---
locale: en
---
# Using @capgo/capacitor-social-login

All social logins in one plugin.

## Install

```bash
bun add @capgo/capacitor-social-login
bunx cap sync
```

## What This Plugin Exposes

- `initialize` - Initialize the plugin.
- `login` - Login with the selected provider.
- `logout` - Logout.
- `isLoggedIn` - IsLoggedIn.

## Example Usage

### `initialize`

Initialize the plugin.

```typescript
import { SocialLogin } from '@capgo/capacitor-social-login';

await SocialLogin.initialize({} as InitializeOptions);
```

### `login`

Login with the selected provider.

```typescript
import { SocialLogin } from '@capgo/capacitor-social-login';

await SocialLogin.login({} as Extract<LoginOptions, { provider: T }>);
```

### `logout`

Logout.

```typescript
import { SocialLogin } from '@capgo/capacitor-social-login';

await SocialLogin.logout({} as {
    provider: 'apple' | 'google' | 'facebook' | 'twitter' | 'oauth2';
    providerId?: string;
  });
```

### `isLoggedIn`

IsLoggedIn.

```typescript
import { SocialLogin } from '@capgo/capacitor-social-login';

await SocialLogin.isLoggedIn({} as isLoggedInOptions);
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-social-login/
- Docs: /docs/plugins/social-login/

## Keep going from Using @capgo/capacitor-social-login

If you are using **Using @capgo/capacitor-social-login** to plan authentication and account flows, connect it with [@capgo/capacitor-social-login](/docs/plugins/social-login/) for the implementation detail in @capgo/capacitor-social-login, [Getting Started](/docs/plugins/social-login/getting-started/) for the implementation detail in Getting Started, [@capgo/capacitor-passkey](/docs/plugins/passkey/) for the implementation detail in @capgo/capacitor-passkey, [@capgo/capacitor-native-biometric](/docs/plugins/native-biometric/) for the implementation detail in @capgo/capacitor-native-biometric, and [Two-factor authentication](/docs/webapp/mfa/) for the implementation detail in Two-factor authentication.
