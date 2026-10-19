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

`bunx cap sync` copies the plugin's native code into your native projects. Run it again after every plugin upgrade.

## Import

```typescript
import { FirebaseAuthentication } from '@capgo/capacitor-firebase-authentication';
```

## API at a glance

| Method | Description |
| --- | --- |
| `applyActionCode` | Applies a verification code sent to the user by email. |
| `confirmPasswordReset` | Completes the password reset process. |
| `confirmVerificationCode` | Finishes the phone number verification process. |
| `createUserWithEmailAndPassword` | Creates a new user account with email and password. If the new account was created, the user is signed in automatically. |
| `deleteUser` | Deletes and signs out the user. |
| `fetchSignInMethodsForEmail` | Fetches the sign-in methods for an email address. |
| `getCurrentUser` | Fetches the currently signed-in user. |
| `getPendingAuthResult` | Returns the `SignInResult` if your app launched a web sign-in flow and the OS cleans up the app while in the background. |
| `getIdToken` | Fetches the Firebase Auth ID Token for the currently signed-in user. |
| `getIdTokenResult` | Returns a deserialized JSON Web Token (JWT) used to identify the user to a Firebase service. |
| `getRedirectResult` | Returns the `SignInResult` from the redirect-based sign-in flow. |
| `getTenantId` | Get the tenant id. |
| `isSignInWithEmailLink` | Checks if an incoming link is a sign-in with email link suitable for `signInWithEmailLink`. |
| `linkWithApple` | Links the user account with Apple authentication provider. |
| `linkWithEmailAndPassword` | Links the user account with Email authentication provider. |
| `linkWithEmailLink` | Links the user account with Email authentication provider. |
| `linkWithFacebook` | Links the user account with Facebook authentication provider. |
| `linkWithGameCenter` | Links the user account with Game Center authentication provider. |
| `linkWithGithub` | Links the user account with GitHub authentication provider. |
| `linkWithGoogle` | Links the user account with Google authentication provider. |
| `linkWithMicrosoft` | Links the user account with Microsoft authentication provider. |
| `linkWithOpenIdConnect` | Links the user account with an OpenID Connect provider. |
| `linkWithPhoneNumber` | Links the user account with Phone Number authentication provider. |
| `linkWithPlayGames` | Links the user account with Play Games authentication provider. |
| `linkWithTwitter` | Links the user account with Twitter authentication provider. |
| `linkWithYahoo` | Links the user account with Yahoo authentication provider. |
| `reload` | Reloads user account data, if signed in. |
| `revokeAccessToken` | Revokes the given access token. Currently only supports Apple OAuth access tokens. |
| `sendEmailVerification` | Sends a verification email to the currently signed in user. |
| `sendPasswordResetEmail` | Sends a password reset email. |
| `sendSignInLinkToEmail` | Sends a sign-in email link to the user with the specified email. |
| `setLanguageCode` | Sets the user-facing language code for auth operations. |
| `setPersistence` | Sets the type of persistence for the currently saved auth session. |
| `setTenantId` | Sets the tenant id. |
| `signInAnonymously` | Signs in as an anonymous user. |
| `signInWithApple` | Starts the Apple sign-in flow. |
| `signInWithCustomToken` | Starts the Custom Token sign-in flow. |
| `signInWithEmailAndPassword` | Starts the sign-in flow using an email and password. |
| `signInWithEmailLink` | Signs in using an email and sign-in email link. |
| `signInWithFacebook` | Starts the Facebook sign-in flow. |
| `signInWithGameCenter` | Starts the Game Center sign-in flow. |
| `signInWithGithub` | Starts the GitHub sign-in flow. |
| `signInWithGoogle` | Starts the Google sign-in flow. |
| `signInWithMicrosoft` | Starts the Microsoft sign-in flow. |
| `signInWithOpenIdConnect` | Starts the OpenID Connect sign-in flow. |
| `signInWithPhoneNumber` | Starts the sign-in flow using a phone number. |
| `signInWithPlayGames` | Starts the Play Games sign-in flow. |
| `signInWithTwitter` | Starts the Twitter sign-in flow. |
| `signInWithYahoo` | Starts the Yahoo sign-in flow. |
| `signOut` | Starts the sign-out flow. |
| `unlink` | Unlinks a provider from a user account. |
| `updateEmail` | Updates the email address of the currently signed in user. |
| `updatePassword` | Updates the password of the currently signed in user. |
| `updateProfile` | Updates a user's profile data. |
| `useAppLanguage` | Sets the user-facing language code to be the default app language. |
| `useEmulator` | Instrument your app to talk to the Authentication emulator. |
| `verifyBeforeUpdateEmail` | Verifies the new email address before updating the email address of the currently signed in user. |
| `checkAppTrackingTransparencyPermission` | Checks the current status of app tracking transparency. |
| `requestAppTrackingTransparencyPermission` | Opens the system dialog to authorize app tracking transparency. |

## Examples

### `applyActionCode()`

Applies a verification code sent to the user by email.

```typescript
import { FirebaseAuthentication } from '@capgo/capacitor-firebase-authentication';

await FirebaseAuthentication.applyActionCode({ oobCode: 'oob-code' });
```

### `confirmPasswordReset()`

Completes the password reset process.

```typescript
import { FirebaseAuthentication } from '@capgo/capacitor-firebase-authentication';

await FirebaseAuthentication.confirmPasswordReset({
  oobCode: 'oob-code',
  newPassword: 'new-password',
});
```

### `confirmVerificationCode()`

Finishes the phone number verification process.

```typescript
import { FirebaseAuthentication } from '@capgo/capacitor-firebase-authentication';

const result = await FirebaseAuthentication.confirmVerificationCode({
  verificationId: 'phoneCodeSent',
  verificationCode: 'phoneCodeSent',
});
// The result holds sensitive values: use it without logging it.
```

### `createUserWithEmailAndPassword()`

Creates a new user account with email and password. If the new account was created, the user is signed in automatically.

```typescript
import { FirebaseAuthentication } from '@capgo/capacitor-firebase-authentication';

const result = await FirebaseAuthentication.createUserWithEmailAndPassword({
  email: 'user@example.com',
  password: 'password',
});
// The result holds sensitive values: use it without logging it.
```

### `deleteUser()`

Deletes and signs out the user.

```typescript
import { FirebaseAuthentication } from '@capgo/capacitor-firebase-authentication';

await FirebaseAuthentication.deleteUser();
```

### `fetchSignInMethodsForEmail()`

Fetches the sign-in methods for an email address.

```typescript
import { FirebaseAuthentication } from '@capgo/capacitor-firebase-authentication';

const result = await FirebaseAuthentication.fetchSignInMethodsForEmail({ email: 'user@example.com' });
console.log(result);
```

The table above lists the 59 core methods. Listener and version helpers, and the full contract of each method, are documented in the [GitHub repository](https://github.com/Cap-go/capacitor-firebase/tree/main/packages/authentication).

## Listen to events

`addListener` returns a handle. Call `handle.remove()` when the screen unmounts, or `FirebaseAuthentication.removeAllListeners()` to clear every listener.

## Full reference

- [GitHub repository](https://github.com/Cap-go/capacitor-firebase/tree/main/packages/authentication)
- [Documentation](/docs/plugins/firebase-authentication/)
- [API reference](/docs/plugins/firebase-authentication/getting-started/)

## Keep going from Using @capgo/capacitor-firebase-authentication

If you are using **Using @capgo/capacitor-firebase-authentication** to plan authentication and account flows, connect it with [@capgo/capacitor-social-login](/docs/plugins/social-login/) for the implementation detail in @capgo/capacitor-social-login, [@capgo/capacitor-passkey](/docs/plugins/passkey/) for the implementation detail in @capgo/capacitor-passkey, [@capgo/capacitor-native-biometric](/docs/plugins/native-biometric/) for the implementation detail in @capgo/capacitor-native-biometric, [Two-factor authentication](/docs/webapp/mfa/) for the implementation detail in Two-factor authentication, and [SSO (Enterprise)](/docs/webapp/enterprise-sso/) for the implementation detail in SSO (Enterprise).
