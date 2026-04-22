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

## What This Plugin Exposes

- `acquireToken` - Present the Microsoft sign-in flow and return an access token plus the account metadata.
- `acquireTokenSilent` - Acquire a token from the MSAL cache for a previously signed-in user.
- `registerAndEnrollAccount` - Register a previously authenticated account with Intune and start enrollment.
- `loginAndEnrollAccount` - Ask Intune to authenticate and enroll a user without first requesting an app token.

## Example Usage

### `acquireToken`

Present the Microsoft sign-in flow and return an access token plus the account metadata.

```typescript
import { IntuneMAM } from '@capgo/capacitor-intune';

await IntuneMAM.acquireToken({} as AcquireTokenOptions);
```

### `acquireTokenSilent`

Acquire a token from the MSAL cache for a previously signed-in user.

```typescript
import { IntuneMAM } from '@capgo/capacitor-intune';

await IntuneMAM.acquireTokenSilent({} as AcquireTokenSilentOptions);
```

### `registerAndEnrollAccount`

Register a previously authenticated account with Intune and start enrollment.

```typescript
import { IntuneMAM } from '@capgo/capacitor-intune';

await IntuneMAM.registerAndEnrollAccount({} as RegisterAndEnrollAccountOptions);
```

### `loginAndEnrollAccount`

Ask Intune to authenticate and enroll a user without first requesting an app token.

```typescript
import { IntuneMAM } from '@capgo/capacitor-intune';

await IntuneMAM.loginAndEnrollAccount();
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-intune/
- Docs: /docs/plugins/intune/
