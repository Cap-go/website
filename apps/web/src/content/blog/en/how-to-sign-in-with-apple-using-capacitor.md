---
slug: how-to-sign-in-with-apple-using-capacitor
title: "How to Sign In with Apple Using Capacitor (2026)"
description: "Add Sign in with Apple to a Capacitor 8 app on iOS, Android, and web: Apple Developer setup, plugin code, backend token checks, and common errors."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-10-01T09:00:00.000Z
updated_at: 2026-10-01T09:00:00.000Z
head_image: /social_login_plugin_blog.webp
head_image_alt: "Sign in with Apple button running in a Capacitor app with the Capgo Social Login plugin"
keywords: sign in with apple capacitor, capacitor apple login, apple sign in ionic, capacitor social login, apple identity token, sign in with apple android, capacitor 8 authentication
tag: Tutorial, iOS, Capacitor
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "Do I need a backend to use Sign in with Apple in a Capacitor app?"
    answer: "Not on iOS. The native AuthenticationServices sheet returns an identity token directly to your app. On Android you need a small HTTPS endpoint, because Apple only supports a web OAuth flow there and posts the result to a server URL. In every case you should verify the identity token on a server before you trust it."
  - question: "Why does Apple only return the user's name and email once?"
    answer: "Apple sends the name and email only on the first authorization between a given Apple ID and your app. Later sign-ins return just the stable user identifier (the sub claim). Save the name and email on your backend the first time you receive them. To test the first-login path again, remove the app under Settings > [your name] > Sign-In & Security > Sign in with Apple on the test device."
  - question: "Is Sign in with Apple mandatory for my iOS app?"
    answer: "Under App Store Review Guideline 4.8, if your app uses a third-party or social login such as Google or Facebook for the primary account, you must also offer an equivalent login service that limits data collection to name and email, lets users hide their email, and does not track them. Sign in with Apple meets those rules, so most teams simply add it. Apps that only use their own email and password, or an enterprise SSO, are exempt."
  - question: "Which Capacitor version does @capgo/capacitor-social-login support?"
    answer: "The plugin major version follows Capacitor. Version 8.x targets Capacitor 8, which is the current release in October 2026. Older majors exist for Capacitor 7 and earlier, but only the latest major is actively maintained."
  - question: "Can I test Sign in with Apple on the iOS Simulator?"
    answer: "Yes, if the simulator is signed in to an Apple Account, but a physical device is more reliable and is what Apple reviewers use. Make sure the Sign in with Apple capability is present in the target you build, otherwise the request fails immediately with error 1000."
---

To add Sign in with Apple to a Capacitor app, install `@capgo/capacitor-social-login`, enable the Sign in with Apple capability on your App ID and in Xcode, call `SocialLogin.initialize({ apple: {} })`, then call `SocialLogin.login({ provider: 'apple' })`. On iOS this opens the native Apple sheet and returns an identity token. Android and web use Apple's web OAuth flow, which needs a Services ID and an HTTPS redirect URL.

This guide covers Apple Developer setup, the client code for iOS, Android and web, verifying the token on your backend, and the errors you are most likely to hit. It targets Capacitor 8 and Xcode 26, which App Store Connect has required for uploads since April 2026.

## What you need before you start

| Requirement | Why |
|---|---|
| Paid Apple Developer Program membership | App IDs, Services IDs and Sign in with Apple keys are only available to members |
| A Mac with Xcode 26 | Needed to build and upload iOS apps in 2026 |
| Capacitor 8 project | Plugin v8 targets Capacitor 8 |
| An HTTPS domain you control | Only for Android and web. Apple refuses `localhost` and plain HTTP return URLs |
| A backend endpoint | Always to verify tokens. On Android it also receives Apple's callback |

If you do not have signing certificates yet, the [iOS certificate generator](/tools/ios-certificate-generator/) creates them without a Mac keychain dance.

## How Sign in with Apple works on each platform

Apple only ships a native SDK for its own platforms, so the flow differs:

| Platform | Mechanism | Client ID used | Backend required for login |
|---|---|---|---|
| iOS | Native `ASAuthorizationAppleIDProvider` sheet | Your app's bundle ID | No |
| Android | Apple web OAuth in a Chrome Custom Tab, Apple posts to your server, server redirects back into the app | Services ID | Yes |
| Web | Apple JS popup | Services ID | No (but verify the token) |

The audience (`aud`) of the identity token follows the client ID. Tokens from iOS carry your bundle ID, tokens from Android and web carry the Services ID. Your backend has to accept both.

## Step 1: Configure the Apple Developer account

### Enable the capability on your App ID

1. Open [Certificates, Identifiers & Profiles](https://developer.apple.com/account/resources/identifiers/list) and select **Identifiers**.
2. Open the App ID that matches your Capacitor `appId` (for example `com.example.app`). Create it if it does not exist.
3. Under **Capabilities**, tick **Sign in with Apple** and save. Leave it as a primary App ID unless you group several apps.

If you change capabilities on an existing App ID, regenerate the provisioning profiles that use it. Old profiles do not include the new entitlement.

### Create a Services ID (Android and web only)

1. In **Identifiers**, click **+** and choose **Services IDs**.
2. Use a description like "Example Web Login" and an identifier like `com.example.app.signin`. This value becomes the `clientId` on Android and web.
3. Open the new Services ID, tick **Sign in with Apple**, and click **Configure**.
4. Pick your App ID as the primary App ID.
5. Add your domain under **Domains and Subdomains** (no scheme, for example `auth.example.com`).
6. Add the return URLs under **Return URLs** with the full `https://` path, for example `https://auth.example.com/apple/callback`. For web logins add the page URL that calls the login, with and without a trailing slash.

### Create a Sign in with Apple key (Android and server token exchange)

1. Go to **Keys**, click **+**, tick **Sign in with Apple**, and click **Configure** to choose the primary App ID.
2. Register the key and download the `.p8` file. Apple lets you download it only once.
3. Note the **Key ID** and your **Team ID** (shown in the top right of the developer portal and under Membership).

Your server uses the key to sign the `client_secret` JWT it sends to Apple's token endpoint.

### Register email sources if you send email

Users can choose **Hide My Email**, which gives you an `@privaterelay.appleid.com` address. Apple only forwards mail from domains and addresses you register under **Services > Sign in with Apple for Email Communication**. Skip this and your password reset and receipt emails silently disappear.

## Step 2: Install the plugin

```bash
bun add @capgo/capacitor-social-login
bunx cap sync
```

The plugin bundles several providers. If you only use Apple (and maybe Google), turn the others off in `capacitor.config.ts` so their SDKs are not shipped:

```typescript
import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'Example',
  webDir: 'dist',
  plugins: {
    SocialLogin: {
      providers: {
        apple: true,
        google: false,
        facebook: false,
        twitter: false,
      },
    },
  },
};

export default config;
```

Run `bunx cap sync` again after changing this block. A disabled provider is unavailable at runtime, so do not disable one you call. Dropping Facebook also removes the `AD_ID` permission warnings that its SDK triggers in Google Play Console.

## Step 3: iOS setup

1. Run `bunx cap open ios`.
2. Select the **App** target, open **Signing & Capabilities**, click **+ Capability**, and add **Sign in with Apple**.
3. Make sure the bundle identifier matches the App ID you configured.

Xcode writes `com.apple.developer.applesignin` into `App.entitlements`. If you build in CI or with [Capgo Build](/native-build/), commit that entitlements file, otherwise the cloud build produces an app that fails with `ASAuthorizationError` code 1000.

No `Info.plist` URL scheme or `AppDelegate` change is needed for Apple on iOS.

## Step 4: Android setup

Apple has no Android SDK. The plugin opens Apple's authorize page in a Custom Tab with your Services ID. Apple then sends the result as a form POST to your HTTPS return URL. Your server exchanges the code, then redirects to a deep link that reopens the app with the tokens.

### Add the deep link

In `android/app/src/main/AndroidManifest.xml`, inside the `MainActivity` `<activity>` element:

```xml
<intent-filter>
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data android:scheme="com.example.app" android:host="apple-login" />
</intent-filter>
```

### Forward the intent to the plugin

Edit `MainActivity.java` so the deep link reaches the plugin:

```java
package com.example.app;

import android.content.Intent;
import android.net.Uri;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginHandle;
import ee.forgr.capacitor.social.login.SocialLoginPlugin;

public class MainActivity extends BridgeActivity {

    @Override
    protected void onNewIntent(Intent intent) {
        Uri data = intent.getData();
        if (Intent.ACTION_VIEW.equals(intent.getAction()) && data != null
                && "apple-login".equals(data.getHost())) {
            PluginHandle handle = getBridge().getPlugin("SocialLogin");
            if (handle != null) {
                Plugin plugin = handle.getInstance();
                if (plugin instanceof SocialLoginPlugin) {
                    ((SocialLoginPlugin) plugin).handleAppleLoginIntent(intent);
                    return;
                }
            }
        }
        super.onNewIntent(intent);
    }
}
```

Filtering on the host keeps your other deep links (password reset, marketing links) working.

### The callback endpoint

Apple posts `code`, `id_token`, `state`, and on first login a `user` JSON string to your return URL. The endpoint has to exchange the code and redirect to the app with `success=true` plus the tokens, which is the contract the plugin parses. A minimal Hono example using `jose`:

```typescript
import { Hono } from 'hono';
import { SignJWT, importPKCS8, createRemoteJWKSet, jwtVerify } from 'jose';
import { saveAppleRefreshToken } from './db'; // your own persistence layer

const app = new Hono();

const TEAM_ID = process.env.APPLE_TEAM_ID!;
const KEY_ID = process.env.APPLE_KEY_ID!;
const SERVICE_ID = process.env.APPLE_SERVICE_ID!; // com.example.app.signin
const PRIVATE_KEY = process.env.APPLE_PRIVATE_KEY!; // contents of the .p8 file
const APP_REDIRECT = 'com.example.app://apple-login';
const APPLE_JWKS = createRemoteJWKSet(new URL('https://appleid.apple.com/auth/keys'));

async function appleClientSecret() {
  const key = await importPKCS8(PRIVATE_KEY, 'ES256');
  return new SignJWT({})
    .setProtectedHeader({ alg: 'ES256', kid: KEY_ID })
    .setIssuer(TEAM_ID)
    .setSubject(SERVICE_ID)
    .setAudience('https://appleid.apple.com')
    .setIssuedAt()
    .setExpirationTime('5m')
    .sign(key);
}

app.post('/apple/callback', async (c) => {
  const form = await c.req.parseBody();
  const code = String(form.code ?? '');
  if (!code) {
    return c.redirect(`${APP_REDIRECT}?success=false`);
  }

  // `form.user` is only present on the first authorization. Store it now.

  const res = await fetch('https://appleid.apple.com/auth/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: SERVICE_ID,
      client_secret: await appleClientSecret(),
      code,
      grant_type: 'authorization_code',
      redirect_uri: 'https://auth.example.com/apple/callback',
    }),
  });
  if (!res.ok) {
    return c.redirect(`${APP_REDIRECT}?success=false`);
  }
  const tokens = await res.json();

  // Verify the identity token, then keep the long-lived refresh token on the server.
  // Only the short-lived tokens go back to the app in the deep link.
  const { payload } = await jwtVerify(tokens.id_token, APPLE_JWKS, {
    issuer: 'https://appleid.apple.com',
    audience: SERVICE_ID,
  });
  if (tokens.refresh_token) {
    await saveAppleRefreshToken(String(payload.sub), tokens.refresh_token);
  }
  const params = new URLSearchParams({
    success: 'true',
    access_token: tokens.access_token,
    id_token: tokens.id_token,
  });
  return c.redirect(`${APP_REDIRECT}?${params}`);
});

export default app;
```

The plugin reads the tokens from the deep link query string, so anything you put there can end up in logs or be read by another app that registers the same custom scheme. Send only the short-lived `access_token` and `id_token`, never the refresh token, verify the `id_token` signature and `nonce` on your server before trusting it, and use a scheme unique to your app (your reverse bundle ID).

The `client_secret` JWT can live up to six months, but generating a short one per request avoids an expiry outage. Keep the `.p8` file in your secret manager, never in the app bundle.

## Step 5: Web setup

The web build uses Apple JS with the Services ID. Add the exact page URL that triggers the login to the Services ID return URLs. Apple does not accept `localhost`, so test web login on a deployed preview domain or through a tunnel with a real hostname.

## Step 6: Initialize and sign in

Initialize once at app start. Pass the `redirectUrl` only on Android and web. On iOS, a non-empty `redirectUrl` makes the plugin POST the result to that URL, which you do not want with the native flow.

```typescript
import { Capacitor } from '@capacitor/core';
import { SocialLogin } from '@capgo/capacitor-social-login';

const platform = Capacitor.getPlatform();

export async function initAuth() {
  await SocialLogin.initialize({
    apple: {
      clientId: platform === 'ios' ? 'com.example.app' : 'com.example.app.signin',
      redirectUrl:
        platform === 'android'
          ? 'https://auth.example.com/apple/callback'
          : platform === 'web'
            ? 'https://app.example.com/login'
            : '',
    },
  });
}
```

Then trigger the login from a button. Use a random nonce so your server can reject replayed tokens:

```typescript
import { SocialLogin } from '@capgo/capacitor-social-login';

export async function signInWithApple() {
  const nonce = crypto.randomUUID();

  try {
    const { result } = await SocialLogin.login({
      provider: 'apple',
      options: {
        scopes: ['email', 'name'],
        nonce,
      },
    });

    if (!result.idToken) {
      throw new Error('Apple did not return an identity token');
    }

    // Send to your backend. Name and email are only present on the first login.
    const response = await fetch('https://api.example.com/auth/apple', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        idToken: result.idToken,
        nonce,
        givenName: result.profile.givenName,
        familyName: result.profile.familyName,
      }),
    });
    return response.json();
  } catch (error: any) {
    if (error?.code === 'USER_CANCELLED') {
      return null; // user closed the sheet, not a failure
    }
    throw error;
  }
}
```

The response gives you:

| Field | Content |
|---|---|
| `result.idToken` | Signed JWT from Apple, the thing your server verifies |
| `result.profile.user` | Apple's stable user ID (same as the `sub` claim) |
| `result.profile.email` | Email or private relay address, when granted |
| `result.profile.givenName` / `familyName` | Only on the first authorization |
| `result.accessToken` | With the default settings this holds the authorization code, not a real access token |
| `result.authorizationCode` | Present when you initialize with `useProperTokenExchange: true` |

If your server needs Apple refresh tokens (for example to call the revoke endpoint when a user deletes their account), set `useProperTokenExchange: true` in the `apple` config and exchange `authorizationCode` on the server.

## Step 7: Verify the identity token on your backend

Never trust the profile fields the client sends. Verify the JWT signature against Apple's public keys and check the claims:

```typescript
import { createRemoteJWKSet, jwtVerify } from 'jose';

const appleKeys = createRemoteJWKSet(new URL('https://appleid.apple.com/auth/keys'));

export async function verifyAppleToken(idToken: string, expectedNonce: string) {
  const { payload } = await jwtVerify(idToken, appleKeys, {
    issuer: 'https://appleid.apple.com',
    audience: ['com.example.app', 'com.example.app.signin'], // bundle ID + Services ID
  });

  if (payload.nonce !== expectedNonce) {
    throw new Error('Nonce mismatch');
  }

  return {
    appleUserId: payload.sub as string,
    email: payload.email as string | undefined,
    emailVerified: payload.email_verified === true || payload.email_verified === 'true',
  };
}
```

Key the user record on `sub`, not on email. The email can be a relay address, and users can stop sharing it. After verification, issue your own session token. If you use Supabase or Firebase, they verify the token for you, see [Supabase with Capacitor Social Login](/blog/setup-supabase-with-capacitor-social-login/).

## App Store rules to keep in mind

- **Guideline 4.8**: if you offer Google, Facebook or another third-party login as the main account system, you must also offer an equivalent privacy-focused option. Sign in with Apple qualifies.
- **Guideline 5.1.1(v)**: apps that let users create accounts must let them delete the account in the app. For Sign in with Apple users, call Apple's `https://appleid.apple.com/auth/revoke` endpoint on deletion. See our [account deletion guide](/blog/account-deletion-compliance-apple-guidelines/).
- **Button design**: use Apple's approved button styles and make the button at least as prominent as other login buttons.

## Troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| `ASAuthorizationError` code 1000 on iOS | Capability or entitlement missing in the built target | Add Sign in with Apple in Xcode, commit `App.entitlements`, regenerate profiles |
| Code 1001 on iOS | User cancelled | The plugin rejects with `USER_CANCELLED`, treat as a non-error |
| `invalid_client` on Android or web | Wrong `clientId` (bundle ID used instead of Services ID) or bad `client_secret` | Use the Services ID, check Team ID, Key ID and key contents |
| `invalid_request: Invalid redirect_uri` | Return URL not registered exactly | Add the full `https://` URL to the Services ID, match trailing slashes |
| App does not come back after Android login | Intent filter scheme or host differs from the server redirect | Compare `com.example.app://apple-login` character by character |
| `apple.android.redirectUrl is null or empty` | No `redirectUrl` on Android | Pass your HTTPS callback URL when initializing on Android |
| Name and email are `null` | Not the first authorization | Read them from your database. Revoke the app in device settings to test again |
| Token rejected by backend: `aud` mismatch | Server only accepts one audience | Accept both bundle ID and Services ID |

## Shipping fixes after release

Most auth bugs live in TypeScript: a wrong client ID per platform, a missing nonce, bad error handling. Those can be shipped to users the same day with [Capgo live updates](/live-update/) without waiting for App Review. Changes to entitlements, the Android manifest or `MainActivity` are native and need a new store build.

## Where to go next

- Add Google next to Apple: [How to sign in with Google using Capacitor](/blog/how-to-sign-in-with-google-using-capacitor/).
- Pick the right mix of methods for your app: [How to add authentication to a Capacitor app](/blog/how-to-add-authentication-to-a-capacitor-app/).
- Plugin reference and platform pages: [Social Login docs](/docs/plugins/social-login/) and the [Apple iOS setup page](/docs/plugins/social-login/apple/ios/).
