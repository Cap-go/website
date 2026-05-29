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

## Keep going from Using @capgo/capacitor-firebase-authentication

If you are using **Using @capgo/capacitor-firebase-authentication** to plan authentication and account flows, connect it with [@capgo/capacitor-social-login](/docs/plugins/social-login/) for the implementation detail in @capgo/capacitor-social-login, [@capgo/capacitor-passkey](/docs/plugins/passkey/) for the implementation detail in @capgo/capacitor-passkey, [@capgo/capacitor-native-biometric](/docs/plugins/native-biometric/) for the implementation detail in @capgo/capacitor-native-biometric, [Two-factor authentication](/docs/webapp/mfa/) for the implementation detail in Two-factor authentication, and [SSO (Enterprise)](/docs/webapp/enterprise-sso/) for the implementation detail in SSO (Enterprise).
