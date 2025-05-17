---
locale: en
---
# Using @capgo/capacitor-native-biometric Package

The `@capgo/capacitor-native-biometric` package allows you to use biometric authentication in your Capacitor applications. This package provides methods for checking the availability of biometric authentication hardware, verifying the user's identity, and handling user credentials securely. Here is a step-by-step tutorial on how to use this package:

## Installation

To install the `@capgo/capacitor-native-biometric` package, run the following command:

```bash
npm i @capgo/capacitor-native-biometric
```

Make sure you have Capacitor version 5 installed in your project.

## Usage

1. Import the `NativeBiometric` class from the `@capgo/capacitor-native-biometric` package:

```ts
import { NativeBiometric } from "@capgo/capacitor-native-biometric";
```

2. Check if biometric authentication hardware is available by calling the `isAvailable` method:

```ts
const result = await NativeBiometric.isAvailable();

if (!result.isAvailable) {
  // Biometric authentication is not available
  return;
}
```

3. Verify the user's identity by calling the `verifyIdentity` method:

```ts
const verified = await NativeBiometric.verifyIdentity({
  reason: "For easy login",
  title: "Login",
  subtitle: "Maybe add subtitle here?",
  description: "Maybe a description too?",
})
  .then(() => true)
  .catch(() => false);

if (!verified) {
  // User identity verification failed
  return;
}
```

4. Retrieve the user's credentials by calling the `getCredentials` method:

```ts
const credentials = await NativeBiometric.getCredentials({
  server: "www.example.com",
});
```

5. Save the user's credentials by calling the `setCredentials` method:

```ts
NativeBiometric.setCredentials({
  username: "username",
  password: "password",
  server: "www.example.com",
}).then(() => {
  // Credentials saved successfully
});
```

6. Delete the user's credentials by calling the `deleteCredentials` method:

```ts
NativeBiometric.deleteCredentials({
  server: "www.example.com",
}).then(() => {
  // Credentials deleted successfully
});
```

## Error Handling

The `@capgo/capacitor-native-biometric` package provides a list of error codes that can be thrown during the biometric authentication process. These error codes are consolidated across Android and iOS platforms. Here is the list of error codes:

| Code | Description                | Platform                  |
| ---- | -------------------------- | ------------------------- |
| 0    | Unknown Error              | Android, iOS              |
| 1    | Biometrics Unavailable     | Android, iOS              |
| 2    | User Lockout               | Android, iOS              |
| 3    | Biometrics Not Enrolled    | Android, iOS              |
| 4    | User Temporary Lockout     | Android (Lockout for 30sec) |
| 10   | Authentication Failed      | Android, iOS              |
| 11   | App Cancel                 | iOS                       |
| 12   | Invalid Context            | iOS                       |
| 13   | Not Interactive            | iOS                       |
| 14   | Passcode Not Set           | Android, iOS              |
| 15   | System Cancel              | Android, iOS              |
| 16   | User Cancel                | Android, iOS              |
| 17   | User Fallback              | Android, iOS              |

You can handle these error codes based on your application's requirements.

That's it! You have successfully learned how to use the `@capgo/capacitor-native-biometric` package to incorporate biometric authentication into your Capacitor applications.
