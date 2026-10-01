---
slug: how-to-sign-in-with-google-using-capacitor
title: "How to Sign In with Google Using Capacitor (2026)"
description: "Set up Google Sign-In in a Capacitor 8 app: client IDs, SHA-1, iOS URL scheme, Android Credential Manager, ID token checks, and fixes for error 28444."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-10-01T09:00:00.000Z
updated_at: 2026-10-01T09:00:00.000Z
head_image: /social_login_plugin_blog.webp
head_image_alt: "Google Sign-In account picker inside a Capacitor app using the Capgo Social Login plugin"
keywords: google sign in capacitor, capacitor google login, ionic google auth, credential manager capacitor, google id token, capacitor social login, 28444 developer console is not set up correctly
tag: Tutorial, Android, Capacitor
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "Why do I need a web client ID for Google Sign-In on Android?"
    answer: "Android Credential Manager issues the ID token for a server audience, and that audience is the Web application client ID. The Android client ID is never passed to the plugin. It only tells Google that an app with a given package name and SHA-1 is allowed to request tokens for your project."
  - question: "Do I need a backend for Google Sign-In in Capacitor?"
    answer: "Not to sign the user in. Online mode returns an ID token and profile directly to the app. You still need a server, or a service like Firebase or Supabase, to verify the ID token before you trust the user. Offline mode, which returns a serverAuthCode for long-lived server access to Google APIs, always requires a backend."
  - question: "Why does Google Sign-In work in debug but fail after publishing to Google Play?"
    answer: "Google Play re-signs your app with the Play App Signing key, so the SHA-1 on users' devices differs from your upload or debug key. Create an extra Android OAuth client with the SHA-1 from Play Console > App integrity > App signing key certificate."
  - question: "Can I request extra Google scopes like Calendar or Drive?"
    answer: "Yes. Pass them in options.scopes when calling login. On Android, custom scopes require the MainActivity change described in this guide, otherwise the plugin rejects the call. Sensitive and restricted scopes also require Google verification before you can ship to the public."
  - question: "Does this work with Firebase Authentication or Supabase?"
    answer: "Yes. Take result.idToken from the plugin and pass it to signInWithCredential in Firebase or signInWithIdToken in Supabase. Use the Web client ID as webClientId, since that is the audience those services expect."
---

To add Google Sign-In to a Capacitor app, create a Web, an iOS and one or more Android OAuth client IDs in Google Cloud, install `@capgo/capacitor-social-login`, call `SocialLogin.initialize({ google: { webClientId, iOSClientId } })`, then `SocialLogin.login({ provider: 'google' })`. Android uses Google's Credential Manager, iOS uses the Google Sign-In SDK, and the web uses Google Identity Services. All three return an ID token you verify on your server.

This guide walks through every step for Capacitor 8 in October 2026, including the parts that usually break: SHA-1 fingerprints, the Play App Signing key, and the iOS URL scheme.

## How Google Sign-In works in a Capacitor app

| Platform | Native API used by the plugin | Client ID passed to the plugin | Other console setup |
|---|---|---|---|
| Android | Credential Manager (`androidx.credentials`) | Web client ID as `webClientId` | Android client with package name and SHA-1 |
| iOS | Google Sign-In SDK | iOS client ID as `iOSClientId` | Reversed client ID URL scheme in `Info.plist` |
| Web | Google Identity Services | Web client ID as `webClientId` | Authorized JavaScript origins |

Google blocks OAuth inside embedded WebViews with the `disallowed_useragent` error, which is why loading Google's login page inside your Capacitor WebView does not work. The plugin uses the native account picker instead.

## Step 1: Configure Google Cloud

### Create a project and the Google Auth Platform

1. Open [Google Cloud Console](https://console.cloud.google.com/) and create a project, or pick an existing one. All client IDs must live in the same project.
2. Open **Google Auth Platform** (the screen formerly called "OAuth consent screen").
3. Under **Branding**, set the app name users will see, a support email, and your domains and privacy policy URL.
4. Under **Audience**, choose **External** for consumer apps. While the app is in **Testing**, only the accounts listed under **Test users** can sign in.
5. Under **Data Access**, keep the default `openid`, `email` and `profile` scopes unless you need more.

You do not need to publish to production or pass verification for the basic scopes. Sensitive scopes (Calendar, Drive, Gmail) need verification before public release.

### Create the client IDs

Go to **Google Auth Platform > Clients** (or **APIs & Services > Credentials**) and create:

| Client type | What to enter | Where the ID goes |
|---|---|---|
| Web application | Authorized JavaScript origins for your web build (for example `https://app.example.com`, `http://localhost:5173`) | `webClientId` |
| iOS | Your bundle ID, plus App Store ID and Team ID once you have them | `iOSClientId` |
| Android (debug) | Package name plus debug SHA-1 | Console only |
| Android (release) | Package name plus upload key SHA-1 | Console only |
| Android (Play) | Package name plus Play App Signing SHA-1 | Console only |

Get the SHA-1 values:

```bash
# Debug key and any signing config in build.gradle
cd android && ./gradlew signingReport

# From a signed APK you actually install
keytool -printcert -jarfile android/app/build/outputs/apk/release/app-release.apk
```

For Play Store builds, copy the SHA-1 from **Play Console > Test and release > App integrity > App signing key certificate**. If you need a release keystore first, the [Android keystore generator](/tools/android-keystore-generator/) creates one in the browser. Our [Google client ID guide](/blog/client-id-google/) goes deeper on the console screens.

## Step 2: Install the plugin

```bash
bun add @capgo/capacitor-social-login
bunx cap sync
```

Disable providers you do not use so their SDKs stay out of the binary:

```typescript
// capacitor.config.ts
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'Example',
  webDir: 'dist',
  plugins: {
    SocialLogin: {
      providers: {
        google: true,
        apple: true,
        facebook: false,
        twitter: false,
      },
    },
  },
};

export default config;
```

Run `bunx cap sync` after changing providers.

## Step 3: iOS configuration

### Add the reversed client ID URL scheme

Open the iOS client in Google Cloud and copy the **iOS URL scheme**, which looks like `com.googleusercontent.apps.1234567890-abcdef`. Add it to `ios/App/App/Info.plist` before the closing `</dict>`:

```xml
<key>CFBundleURLTypes</key>
<array>
  <dict>
    <key>CFBundleURLSchemes</key>
    <array>
      <string>com.googleusercontent.apps.1234567890-abcdef</string>
    </array>
  </dict>
</array>
```

If you already have a `CFBundleURLTypes` array for deep links, add a new `<dict>` entry to it instead of creating a second key.

### Let the Google SDK handle the callback URL

In `ios/App/App/AppDelegate.swift`, import the SDK and route the URL to it before Capacitor:

```swift
import GoogleSignIn // add at the top of the file

// Replace the generated application(_:open:options:) method
func application(_ app: UIApplication, open url: URL,
                 options: [UIApplication.OpenURLOptionsKey: Any] = [:]) -> Bool {
    if GIDSignIn.sharedInstance.handle(url) {
        return true
    }
    return ApplicationDelegateProxy.shared.application(app, open: url, options: options)
}
```

Keep the `ApplicationDelegateProxy` call so `@capacitor/app` still receives your other deep links.

## Step 4: Android configuration

Basic sign-in with the default scopes works without native changes. If you request **extra scopes** or use **offline mode**, the plugin needs to receive activity results, so `MainActivity` must implement the plugin's marker interface:

```java
package com.example.app;

import android.content.Intent;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginHandle;
import ee.forgr.capacitor.social.login.GoogleProvider;
import ee.forgr.capacitor.social.login.ModifiedMainActivityForSocialLoginPlugin;
import ee.forgr.capacitor.social.login.SocialLoginPlugin;

public class MainActivity extends BridgeActivity implements ModifiedMainActivityForSocialLoginPlugin {

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode >= GoogleProvider.REQUEST_AUTHORIZE_GOOGLE_MIN
                && requestCode < GoogleProvider.REQUEST_AUTHORIZE_GOOGLE_MAX) {
            PluginHandle handle = getBridge().getPlugin("SocialLogin");
            if (handle == null) return;
            Plugin plugin = handle.getInstance();
            if (plugin instanceof SocialLoginPlugin) {
                ((SocialLoginPlugin) plugin).handleGoogleLoginIntent(requestCode, data);
            }
        }
    }

    @Override
    public void IHaveModifiedTheMainActivityForTheUseWithSocialLoginPlugin() {}
}
```

Without it, calls with `scopes` reject with "You CANNOT use scopes without modifying the main activity".

For the emulator, use a system image with the **Google Play** label and sign in to a Google account in device settings. Images without Play services return `NoCredentialException`.

## Step 5: Web configuration

Add every origin you serve the web build from to the Web client's **Authorized JavaScript origins**, including the port (`http://localhost:5173`). Call `initialize` early: the plugin injects Google's script tag and the login fails if it runs before the script is ready.

## Step 6: Initialize and sign in

```typescript
import { SocialLogin } from '@capgo/capacitor-social-login';

const WEB_CLIENT_ID = '1234567890-web.apps.googleusercontent.com';
const IOS_CLIENT_ID = '1234567890-ios.apps.googleusercontent.com';

export async function initAuth() {
  await SocialLogin.initialize({
    google: {
      webClientId: WEB_CLIENT_ID, // Android + web
      iOSClientId: IOS_CLIENT_ID, // iOS
      iOSServerClientId: WEB_CLIENT_ID, // same as webClientId, required for offline mode on iOS
      mode: 'online',
    },
  });
}

export async function signInWithGoogle() {
  try {
    const { result } = await SocialLogin.login({
      provider: 'google',
      options: {},
    });

    if (result.responseType !== 'online' || !result.idToken) {
      throw new Error('Expected an ID token from Google');
    }

    const res = await fetch('https://api.example.com/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken: result.idToken }),
    });
    return res.json();
  } catch (error: any) {
    if (error?.code === 'USER_CANCELLED') return null;
    throw error;
  }
}
```

The online response contains:

| Field | Notes |
|---|---|
| `idToken` | OpenID Connect JWT. Send this to your server |
| `accessToken` | For calling Google APIs from the client. Can be `null` on Android when only default scopes are requested |
| `profile` | `email`, `name`, `givenName`, `familyName`, `imageUrl`, `id` |
| `responseType` | `'online'` |

### Android-only display options

The `options` object accepts `style: 'bottom'` for the bottom sheet UI, plus `filterByAuthorizedAccounts` and `autoSelectEnabled` for returning users. Leave `filterByAuthorizedAccounts` off if you support Family Link accounts. `forceRefreshToken: true` asks Android for a fresh access token instead of a cached one.

### Requesting extra scopes

```typescript
const { result } = await SocialLogin.login({
  provider: 'google',
  options: {
    scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
  },
});
```

Remember the `MainActivity` change on Android, and add the scope under **Data Access** in Google Cloud.

### Online vs offline mode

| | Online (default) | Offline |
|---|---|---|
| Returns | ID token, access token, profile | `serverAuthCode` only |
| Backend needed | Only to verify the token | Yes, to exchange the code |
| Google refresh token | Stays with Google SDK on device | Stored on your server |
| Use when | You only need to know who the user is | Your server calls Google APIs while the user is away |
| `logout`, `isLoggedIn`, `refresh` | Supported | Not supported |

Offline mode on iOS requires `iOSServerClientId`, and on Android it requires the `MainActivity` change.

### Logout and session checks

```typescript
await SocialLogin.isLoggedIn({ provider: 'google' }); // { isLoggedIn: boolean }
await SocialLogin.logout({ provider: 'google' });
```

On Android, `logout` also clears the Credential Manager state, so the account picker appears again next time.

## Step 7: Verify the ID token on your server

```typescript
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client();

export async function verifyGoogleToken(idToken: string) {
  const ticket = await client.verifyIdToken({
    idToken,
    audience: [
      '1234567890-web.apps.googleusercontent.com',
      '1234567890-ios.apps.googleusercontent.com',
    ],
  });
  const payload = ticket.getPayload();
  if (!payload) throw new Error('Empty token payload');

  return {
    googleUserId: payload.sub,
    email: payload.email,
    emailVerified: payload.email_verified === true,
    name: payload.name,
  };
}
```

Use `sub` as the stable user key. Only link an existing account by email when `email_verified` is `true`. Accepting both client IDs as audience keeps tokens from every platform valid. Then issue your own session. If you use a managed backend, follow [Supabase with Capacitor Social Login](/blog/setup-supabase-with-capacitor-social-login/) or the [Firebase Google guide](/docs/plugins/social-login/firebase/introduction/).

## Troubleshooting

| Error | Cause | Fix |
|---|---|---|
| `[28444] Developer console is not set up correctly` | Package name, SHA-1 or `webClientId` mismatch | Use the Web client ID, register the SHA-1 of the installed build, keep all clients in one project |
| Works in debug, fails from Play Store | Play re-signs the app | Add an Android client with the Play App Signing SHA-1 |
| `[16] Account reauth failed` | Cached account state is stale, account not a test user, or user disabled the app | The plugin retries once automatically. Check test users, External audience, and Play signing SHA-1 |
| `NoCredentialException` | No Google account on device, or emulator without Play services | Use a Google Play system image and sign in |
| `USER_CANCELLED` right after picking an account | Usually still a SHA-1 or client ID mismatch | Fix console setup before treating it as a real cancel |
| iOS crash: "missing support for the following URL schemes" | Reversed client ID missing in `Info.plist` | Add the `com.googleusercontent.apps...` scheme |
| Web: "The given origin is not allowed for the given client ID" | Origin missing on the Web client | Add the exact origin, including port |
| `access_denied` with "app has not completed the Google verification process" | Account is not a test user while in Testing | Add it under Audience > Test users |
| Google login screen interrupted on iOS | `@capacitor/privacy-screen` covers the SDK view | Call `PrivacyScreen.disable()` before `login` |

On Android, filter Logcat by `GoogleProvider`. The plugin logs the package name, signing SHA-1 and a masked `webClientId`, which you can compare against the console in a minute.

## Shipping and maintaining

Console changes can take a few hours to propagate, so do not rotate client IDs on release day. Once the native setup is in a store build, client-side changes such as scopes, error handling or the backend URL can go out through [Capgo live updates](/live-update/). If your team does not have a Mac for iOS releases, [Capgo Build](/native-build/) builds and signs the iOS binary in the cloud.

## Related guides

- [How to sign in with Apple using Capacitor](/blog/how-to-sign-in-with-apple-using-capacitor/), which you will need on iOS if Google is your main login.
- [How to add authentication to a Capacitor app](/blog/how-to-add-authentication-to-a-capacitor-app/) for choosing between social login, OIDC, passkeys and Better Auth.
- [Social Login plugin page](/plugins/capacitor-social-login/) and the [Google Android setup docs](/docs/plugins/social-login/google/android/).
