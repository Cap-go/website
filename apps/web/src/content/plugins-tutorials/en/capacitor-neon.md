---
locale: en
---
# Using @capgo/capacitor-neon

Capacitor Neon Plugin for native Neon Auth and Data API integration.

## Install

```bash
bun add @capgo/capacitor-neon
bunx cap sync
```

`bunx cap sync` copies the plugin's native code into your native projects. Run it again after every plugin upgrade.

## Import

```typescript
import { CapacitorNeon } from '@capgo/capacitor-neon';
```

## API at a glance

| Method | Description |
| --- | --- |
| `initialize` | Initialize the Neon client with your branch URLs. Must be called before any other methods. Restores a stored session and emits `INITIAL_SESSION`. |
| `signInWithPassword` | Sign in with email and password. |
| `signUp` | Sign up a new user with email and password. |
| `getAnonymousToken` | Get an anonymous Data API token. Neon Auth has no anonymous user accounts, so this token lets signed-out users query the Data API as the `anonymous` Postgres role. |
| `signInWithOAuth` | Sign in with an OAuth provider. Opens the provider's authentication page in the system browser. |
| `signInWithOtp` | Sign in with OTP (One-Time Password) sent via email. |
| `verifyOtp` | Verify an OTP token. |
| `signOut` | Sign out the current user. |
| `getSession` | Get the current session if one exists. Returns the session with JWT access token. |
| `refreshSession` | Refresh the current session and get a new access token. |
| `getUser` | Get the currently authenticated user. |
| `setSession` | Set the session manually from a refresh token. Useful for restoring a session or integrating with external auth. |
| `select` | Execute a SELECT query on a table through the Neon Data API. |
| `insert` | Insert data into a table through the Neon Data API. |
| `update` | Update data in a table through the Neon Data API. |
| `delete` | Delete data from a table through the Neon Data API. |

## Examples

### `initialize()`

Initialize the Neon client with your branch URLs. Must be called before any other methods.

```typescript
import { CapacitorNeon } from '@capgo/capacitor-neon';

await CapacitorNeon.initialize({
  authUrl: 'https://ep-xxx.neonauth.us-east-2.aws.neon.tech/neondb/auth',
  dataApiUrl: 'https://ep-xxx.apirest.us-east-2.aws.neon.tech/neondb/rest/v1'
});
```

### `signInWithPassword()`

Sign in with email and password.

```typescript
import { CapacitorNeon } from '@capgo/capacitor-neon';

const { session, user } = await CapacitorNeon.signInWithPassword({
  email: 'user@example.com',
  password: 'password123'
});
console.log('JWT:', session?.accessToken);
```

### `signUp()`

Sign up a new user with email and password.

```typescript
import { CapacitorNeon } from '@capgo/capacitor-neon';

const { session, user } = await CapacitorNeon.signUp({
  email: 'newuser@example.com',
  password: 'password123',
  name: 'John Doe'
});
```

### `getAnonymousToken()`

Get an anonymous Data API token for signed-out users.

```typescript
import { CapacitorNeon } from '@capgo/capacitor-neon';

const { token, expiresAt } = await CapacitorNeon.getAnonymousToken();
```

### `signInWithOAuth()`

Sign in with an OAuth provider. Opens the provider's authentication page.

```typescript
import { CapacitorNeon } from '@capgo/capacitor-neon';

await CapacitorNeon.signInWithOAuth({
  provider: 'google',
  redirectTo: 'https://app.example.com/auth/callback'
});
```

`redirectTo` must be an `http` or `https` URL on a trusted domain in Neon Auth that opens your app.

### `signInWithOtp()`

Sign in with OTP (One-Time Password) sent via email.

```typescript
import { CapacitorNeon } from '@capgo/capacitor-neon';

await CapacitorNeon.signInWithOtp({
  email: 'user@example.com'
});

const { session, user } = await CapacitorNeon.verifyOtp({
  email: 'user@example.com',
  token: '123456',
  type: 'email'
});
```

The table above lists the 16 core methods. Listener and version helpers, and the full contract of each method, are documented in the [GitHub repository](https://github.com/Cap-go/capacitor-neon/).

## Listen to events

`addListener` returns a handle. Call `handle.remove()` when the screen unmounts, or `CapacitorNeon.removeAllListeners()` to clear every listener.

## Full reference

- [GitHub repository](https://github.com/Cap-go/capacitor-neon/)
- [Documentation](/docs/plugins/neon/)
- [API reference](/docs/plugins/neon/getting-started/)
