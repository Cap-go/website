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
