---
locale: en
---
# Using @capgo/capacitor-supabase

Capacitor Supabase Plugin for native Supabase SDK integration.

## Install

```bash
bun add @capgo/capacitor-supabase
bunx cap sync
```

`bunx cap sync` copies the native code into your iOS and Android projects. Run it again after every plugin upgrade.

## Import

```typescript
import { CapacitorSupabase } from '@capgo/capacitor-supabase';
```

## API at a glance

| Method | Description |
| --- | --- |
| `initialize` | Initialize the Supabase client with your project credentials. Must be called before any other methods. |
| `signInWithPassword` | Sign in with email and password. |
| `signUp` | Sign up a new user with email and password. |
| `signInAnonymously` | Sign in anonymously. Creates a temporary guest session without requiring credentials. |
| `signInWithOAuth` | Sign in with an OAuth provider. Opens the provider's authentication page. |
| `signInWithOtp` | Sign in with OTP (One-Time Password) sent via email or SMS. |
| `verifyOtp` | Verify an OTP token. |
| `signOut` | Sign out the current user. |
| `getSession` | Get the current session if one exists. Returns the session with JWT access token. |
| `refreshSession` | Refresh the current session and get new tokens. |
| `getUser` | Get the currently authenticated user. |
| `setSession` | Set the session manually with access and refresh tokens. Useful for restoring a session or integrating with external auth. |
| `select` | Execute a SELECT query on a table. |
| `insert` | Insert data into a table. |
| `update` | Update data in a table. |
| `delete` | Delete data from a table. |

## Examples

### `initialize()`

Initialize the Supabase client with your project credentials. Must be called before any other methods.

```typescript
import { CapacitorSupabase } from '@capgo/capacitor-supabase';

await CapacitorSupabase.initialize({
  supabaseUrl: 'https://xyzcompany.supabase.co',
  supabaseKey: 'your-anon-key'
});
```

### `signInWithPassword()`

Sign in with email and password.

```typescript
import { CapacitorSupabase } from '@capgo/capacitor-supabase';

const { session, user } = await CapacitorSupabase.signInWithPassword({
  email: 'user@example.com',
  password: 'password123'
});
console.log('JWT:', session?.accessToken);
```

### `signUp()`

Sign up a new user with email and password.

```typescript
import { CapacitorSupabase } from '@capgo/capacitor-supabase';

const { session, user } = await CapacitorSupabase.signUp({
  email: 'newuser@example.com',
  password: 'password123',
  data: { name: 'John Doe' }
});
```

### `signInAnonymously()`

Sign in anonymously. Creates a temporary guest session without requiring credentials.

```typescript
import { CapacitorSupabase } from '@capgo/capacitor-supabase';

const { session, user } = await CapacitorSupabase.signInAnonymously();
console.log('Anonymous user ID:', user?.id);
```

### `signInWithOAuth()`

Sign in with an OAuth provider. Opens the provider's authentication page.

```typescript
import { CapacitorSupabase } from '@capgo/capacitor-supabase';

await CapacitorSupabase.signInWithOAuth({
  provider: 'google',
  redirectTo: 'myapp://callback'
});
```

### `signInWithOtp()`

Sign in with OTP (One-Time Password) sent via email or SMS.

```typescript
import { CapacitorSupabase } from '@capgo/capacitor-supabase';

await CapacitorSupabase.signInWithOtp({
  email: 'user@example.com'
});

// Alternatively, only sign in existing users (rejects for unknown emails):
// await CapacitorSupabase.signInWithOtp({
//   email: 'user@example.com',
//   shouldCreateUser: false
// });
```

The [API reference](/docs/plugins/supabase/getting-started/) covers the other 10 methods.

## Listen to events

`addListener` returns a handle. Call `handle.remove()` when the screen unmounts, or `CapacitorSupabase.removeAllListeners()` to clear every listener.

## Full reference

- [GitHub repository](https://github.com/Cap-go/capacitor-supabase/)
- [Documentation](/docs/plugins/supabase/)
- [API reference](/docs/plugins/supabase/getting-started/)
