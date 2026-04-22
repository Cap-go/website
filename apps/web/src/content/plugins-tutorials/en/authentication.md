---
locale: en
---
# Using @capgo/capacitor-firebase-authentication

Capacitor plugin for Firebase Authentication.

## Install

```bash
bun add @capgo/capacitor-firebase-authentication
bunx cap sync
```

## What This Plugin Exposes

- `applyActionCode` - Applies a verification code sent to the user by email.
- `confirmPasswordReset` - Completes the password reset process.
- `confirmVerificationCode` - Finishes the phone number verification process.
- `createUserWithEmailAndPassword` - Creates a new user account with email and password. If the new account was created, the user is signed in automatically.

## Example Usage

### `applyActionCode`

Applies a verification code sent to the user by email.

```typescript
import { FirebaseAuthentication } from '@capgo/capacitor-firebase-authentication';

await FirebaseAuthentication.applyActionCode({} as ApplyActionCodeOptions);
```

### `confirmPasswordReset`

Completes the password reset process.

```typescript
import { FirebaseAuthentication } from '@capgo/capacitor-firebase-authentication';

await FirebaseAuthentication.confirmPasswordReset({} as ConfirmPasswordResetOptions);
```

### `confirmVerificationCode`

Finishes the phone number verification process.

```typescript
import { FirebaseAuthentication } from '@capgo/capacitor-firebase-authentication';

await FirebaseAuthentication.confirmVerificationCode({} as ConfirmVerificationCodeOptions);
```

### `createUserWithEmailAndPassword`

Creates a new user account with email and password. If the new account was created, the user is signed in automatically.

```typescript
import { FirebaseAuthentication } from '@capgo/capacitor-firebase-authentication';

await FirebaseAuthentication.createUserWithEmailAndPassword({} as CreateUserWithEmailAndPasswordOptions);
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-firebase/tree/main/packages/authentication
- Docs: /docs/plugins/firebase-authentication/
