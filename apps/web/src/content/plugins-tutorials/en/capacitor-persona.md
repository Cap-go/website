---
locale: en
---
# Using @capgo/capacitor-intune

Capacitor plugin for Microsoft Intune MAM enrollment, app protection policies, app config, and MSAL authentication.

## Install

```bash
bun add @capgo/capacitor-intune
bunx cap sync
```

`bunx cap sync` copies the plugin's native code into your native projects. Run it again after every plugin upgrade.

## Import

```typescript
import { IntuneMAM } from '@capgo/capacitor-intune';
```

## API at a glance

| Method | Description |
| --- | --- |
| `acquireToken` | Present the Microsoft sign-in flow and return an access token plus the account metadata. |
| `acquireTokenSilent` | Acquire a token from the MSAL cache for a previously signed-in user. |
| `registerAndEnrollAccount` | Register a previously authenticated account with Intune and start enrollment. |
| `loginAndEnrollAccount` | Ask Intune to authenticate and enroll a user without first requesting an app token. |
| `enrolledAccount` | Return the currently enrolled Intune account, if one is available. |
| `deRegisterAndUnenrollAccount` | Deregister the account from Intune and trigger selective wipe when applicable. |
| `logoutOfAccount` | Sign the user out of MSAL without unenrolling the Intune account. |
| `appConfig` | Fetch the remote Intune app configuration for a managed account. |
| `getPolicy` | Fetch the currently effective Intune app protection policy for a managed account. |
| `groupName` | Convenience helper that resolves the `GroupName` app configuration value when present. |
| `sdkVersion` | Return the native Intune and MSAL SDK versions bundled by this plugin. |
| `displayDiagnosticConsole` | Show the native Intune diagnostics UI. |

## Examples

### `acquireToken()`

Present the Microsoft sign-in flow and return an access token plus the account metadata.

```typescript
import { IntuneMAM } from '@capgo/capacitor-intune';

const result = await IntuneMAM.acquireToken({ scopes: ['openid'] });
// The result holds sensitive values: use it without logging it.
```

### `acquireTokenSilent()`

Acquire a token from the MSAL cache for a previously signed-in user.

```typescript
import { IntuneMAM } from '@capgo/capacitor-intune';

const result = await IntuneMAM.acquireTokenSilent({
  scopes: ['openid'],
  accountId: 'acquireToken',
});
// The result holds sensitive values: use it without logging it.
```

### `registerAndEnrollAccount()`

Register a previously authenticated account with Intune and start enrollment.

```typescript
import { IntuneMAM } from '@capgo/capacitor-intune';

await IntuneMAM.registerAndEnrollAccount({ accountId: 'account-id-123' });
```

### `loginAndEnrollAccount()`

Ask Intune to authenticate and enroll a user without first requesting an app token.

```typescript
import { IntuneMAM } from '@capgo/capacitor-intune';

await IntuneMAM.loginAndEnrollAccount();
```

### `enrolledAccount()`

Return the currently enrolled Intune account, if one is available.

```typescript
import { IntuneMAM } from '@capgo/capacitor-intune';

const result = await IntuneMAM.enrolledAccount();
console.log(result);
```

### `deRegisterAndUnenrollAccount()`

Deregister the account from Intune and trigger selective wipe when applicable.

```typescript
import { IntuneMAM } from '@capgo/capacitor-intune';

await IntuneMAM.deRegisterAndUnenrollAccount({ accountId: 'account-id-123' });
```

The table above lists the 12 core methods. Listener and version helpers, and the full contract of each method, are documented in the [GitHub repository](https://github.com/Cap-go/capacitor-persona/).

## Listen to events

`addListener` returns a handle. Call `handle.remove()` when the screen unmounts, or `IntuneMAM.removeAllListeners()` to clear every listener.

## Full reference

- [GitHub repository](https://github.com/Cap-go/capacitor-persona/)
- [Documentation](/docs/plugins/persona/)
- [API reference](/docs/plugins/persona/getting-started/)

## Keep going from Using @capgo/capacitor-intune

If you are using **Using @capgo/capacitor-intune** to plan authentication and account flows, connect it with [@capgo/capacitor-intune](/docs/plugins/persona/) for the implementation detail in @capgo/capacitor-intune, [Getting Started](/docs/plugins/persona/getting-started/) for the implementation detail in Getting Started, [@capgo/capacitor-social-login](/docs/plugins/social-login/) for the implementation detail in @capgo/capacitor-social-login, [@capgo/capacitor-passkey](/docs/plugins/passkey/) for the implementation detail in @capgo/capacitor-passkey, and [@capgo/capacitor-native-biometric](/docs/plugins/native-biometric/) for the implementation detail in @capgo/capacitor-native-biometric.
