---
slug: how-to-sign-in-with-auth0-using-capacitor
title: "How to Sign In with Auth0 Using Capacitor"
description: "Add Auth0 login to a Capacitor 8 app with OIDC and PKCE: Auth0 dashboard setup, callback URLs, API audience, refresh tokens, logout, and troubleshooting."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-10-01T09:00:00.000Z
updated_at: 2026-10-01T09:00:00.000Z
head_image: /login.webp
head_image_alt: "Auth0 Universal Login opened from a Capacitor app through the system browser"
keywords: auth0 capacitor, capacitor auth0 login, ionic auth0, auth0 pkce mobile, auth0 refresh token capacitor, oidc capacitor, capacitor social login oauth2
tag: Tutorial, Security, Capacitor
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "Do I need an Auth0 client secret in my Capacitor app?"
    answer: "No. Create the application as a Native application, which is a public client with the token endpoint authentication method set to None. The app proves it started the flow with PKCE instead of a secret. Never put a client secret in a mobile or web bundle, since anyone can extract it."
  - question: "Why is my Auth0 access token not a JWT?"
    answer: "Without an audience parameter, Auth0 issues a token meant only for its /userinfo endpoint, which is not a JWT you can validate in your own API. Create an API in the Auth0 dashboard and pass its identifier as the audience in additionalParameters. The access token then becomes a JWT for that API."
  - question: "How do I keep users signed in after they close the app?"
    answer: "Request the offline_access scope, enable Allow Offline Access on your Auth0 API, and turn on refresh token rotation for the application. The plugin stores the tokens and SocialLogin.refresh renews the access token without showing the login page again."
  - question: "Can I use Auth0's own SDK instead of a plugin?"
    answer: "Yes. Auth0 documents a Capacitor setup that uses its SPA SDK with @capacitor/browser and @capacitor/app to catch the callback deep link. It works, but you wire the browser, deep link and token cache yourself. The Social Login plugin handles those parts natively and lets you add Google, Apple or other OIDC providers through the same API."
---

To sign in with Auth0 in a Capacitor app, create a **Native** application in Auth0, register a custom-scheme callback URL such as `com.example.app://oauth/auth0`, and run the OpenID Connect authorization code flow with PKCE through a system browser. With `@capgo/capacitor-social-login` that is one `initialize` call with your Auth0 endpoints and one `SocialLogin.login({ provider: 'oauth2', options: { providerId: 'auth0' } })`.

This guide covers the Auth0 dashboard settings, the client code for iOS, Android and web, API access tokens, refresh tokens, logout, and the errors you will run into. It is written for Capacitor 8 as of October 2026.

## How the Auth0 flow works in Capacitor

Auth0 hosts the login page (Universal Login). Your app never sees the password. The flow is:

1. The app generates a PKCE verifier and challenge, then opens `https://YOUR_TENANT/authorize` in a secure browser.
2. The user signs in (password, social, passkey, MFA, whatever you configured in Auth0).
3. Auth0 redirects to your callback URL with a one-time `code`.
4. The app exchanges the code and the PKCE verifier at `/oauth/token` for an ID token, an access token and, optionally, a refresh token.

The browser used depends on the platform:

| Platform | Browser | Callback handling |
|---|---|---|
| iOS | `ASWebAuthenticationSession` | Handled by the system, no `Info.plist` change |
| Android | Embedded WebView by default, or Chrome Custom Tabs with `androidUseCustomTabs: true` | Custom Tabs need an intent filter |
| Web | Popup (default) or full-page redirect | `handleRedirectCallback()` on the return page |

On Android, use Custom Tabs. They share cookies with Chrome, support passkeys and password managers, and follow RFC 8252 (OAuth for native apps), which is what Auth0 expects.

## Step 1: Set up the Auth0 application

1. In the [Auth0 Dashboard](https://manage.auth0.com), go to **Applications > Applications > Create Application**.
2. Pick **Native** and create it.
3. On the **Settings** tab, note the **Domain** (for example `example.eu.auth0.com`) and the **Client ID**.
4. Under **Credentials**, check that the authentication method is **None**. That is the public-client setting used with PKCE.

### Callback and logout URLs

Fill these fields in **Settings > Application URIs**:

| Field | Value for mobile | Value for web |
|---|---|---|
| Allowed Callback URLs | `com.example.app://oauth/auth0` | `https://app.example.com/auth/callback` |
| Allowed Logout URLs | `com.example.app://oauth/logout` | `https://app.example.com/` |
| Allowed Web Origins | Not needed | `https://app.example.com` |

Comma-separate multiple values. Use your Capacitor `appId` as the scheme. A reverse-domain scheme avoids collisions with other apps. If you also ship a web build, many teams create a separate **Single Page Application** in Auth0 for it, so the web and mobile settings do not mix.

### Refresh tokens

If users should stay signed in:

1. In **Settings > Refresh Token Rotation**, turn rotation on. Each refresh returns a new refresh token and invalidates the old one.
2. Set an absolute and inactivity lifetime that fits your product.
3. If you call your own API, open **Applications > APIs > your API > Settings** and enable **Allow Offline Access**.
4. Request the `offline_access` scope in the app.

### API audience

If your backend validates Auth0 access tokens, create an API under **Applications > APIs** with an identifier such as `https://api.example.com`. Pass that identifier as `audience`. Without it, the access token is only good for Auth0's `/userinfo` endpoint.

## Step 2: Install and configure the plugin

```bash
bun add @capgo/capacitor-social-login
bunx cap sync
```

If Auth0 is your only provider, disable the bundled social SDKs to keep the binary small:

```typescript
// capacitor.config.ts
plugins: {
  SocialLogin: {
    providers: { google: false, facebook: false, apple: false, twitter: false },
  },
},
```

The generic OAuth2 engine does not depend on those SDKs.

### Android intent filter for Custom Tabs

Add the callback scheme to `MainActivity` in `android/app/src/main/AndroidManifest.xml`:

```xml
<intent-filter>
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data android:scheme="com.example.app" android:host="oauth" />
</intent-filter>
```

The Capacitor template already sets `android:launchMode="singleTask"` on `MainActivity`, which the redirect needs. Keep it.

## Step 3: Initialize the Auth0 provider

```typescript
import { Capacitor } from '@capacitor/core';
import { SocialLogin } from '@capgo/capacitor-social-login';

const AUTH0_DOMAIN = 'https://example.eu.auth0.com';
const isWeb = Capacitor.getPlatform() === 'web';

export async function initAuth() {
  await SocialLogin.initialize({
    oauth2: {
      auth0: {
        appId: 'YOUR_AUTH0_CLIENT_ID',
        authorizationBaseUrl: `${AUTH0_DOMAIN}/authorize`,
        accessTokenEndpoint: `${AUTH0_DOMAIN}/oauth/token`,
        resourceUrl: `${AUTH0_DOMAIN}/userinfo`,
        redirectUrl: isWeb
          ? 'https://app.example.com/auth/callback'
          : 'com.example.app://oauth/auth0',
        scope: 'openid profile email offline_access',
        pkceEnabled: true,
        additionalParameters: {
          audience: 'https://api.example.com',
        },
        logoutUrl: `${AUTH0_DOMAIN}/oidc/logout`,
        postLogoutRedirectUrl: isWeb
          ? 'https://app.example.com/'
          : 'com.example.app://oauth/logout',
        androidUseCustomTabs: true,
      },
    },
  });
}
```

You can replace the explicit endpoints with `issuerUrl: AUTH0_DOMAIN`. The plugin then reads `/.well-known/openid-configuration`. Explicit values win over discovered ones, which helps when you use an Auth0 custom domain.

If you are moving from Ionic Auth Connect, the plugin also exports `SocialLoginAuthConnect` with an `auth0` preset that takes `domain`, `clientId`, `redirectUrl` and `audience`. See the [Auth Connect migration guide](/docs/plugins/social-login/migrations/ionic-auth-connect/).

## Step 4: Sign in

```typescript
import { SocialLogin } from '@capgo/capacitor-social-login';

export async function signInWithAuth0() {
  try {
    const { result } = await SocialLogin.login({
      provider: 'oauth2',
      options: { providerId: 'auth0' },
    });

    return {
      idToken: result.idToken,
      accessToken: result.accessToken?.token,
      expiresAt: result.accessToken?.expires,
      refreshToken: result.refreshToken,
      user: result.resourceData, // JSON from /userinfo
    };
  } catch (error: any) {
    if (error?.code === 'USER_CANCELLED') return null;
    throw error;
  }
}
```

Useful login options:

- `prompt: 'login'` forces the login page even if Auth0 still has a session cookie.
- `loginHint: 'user@example.com'` pre-fills the email.
- `additionalParameters: { connection: 'google-oauth2' }` skips Universal Login and goes straight to one connection.
- `additionalParameters: { screen_hint: 'signup' }` opens the sign-up screen.

### Web redirect callback

On web, the default popup flow needs nothing extra. If you use `flow: 'redirect'`, read the result on the callback page:

```typescript
const result = await SocialLogin.handleRedirectCallback();
if (result?.provider === 'oauth2') {
  console.log(result.result.idToken);
}
```

`handleRedirectCallback` is web only and rejects on iOS and Android.

## Step 5: Read the ID token and call your API

Decode the ID token on the client only for display:

```typescript
const { claims } = await SocialLogin.decodeIdToken({ idToken: result.idToken! });
console.log(claims.email, claims.name, claims.sub);
```

`decodeIdToken` does not check the signature. For anything security related, send the access token to your API and validate it there:

```typescript
import { createRemoteJWKSet, jwtVerify } from 'jose';

const jwks = createRemoteJWKSet(new URL('https://example.eu.auth0.com/.well-known/jwks.json'));

export async function verifyAuth0AccessToken(token: string) {
  const { payload } = await jwtVerify(token, jwks, {
    issuer: 'https://example.eu.auth0.com/', // Auth0 issuers end with a slash
    audience: 'https://api.example.com',
  });
  return payload; // payload.sub is the Auth0 user ID
}
```

## Step 6: Refresh the access token

```typescript
import { SocialLogin } from '@capgo/capacitor-social-login';

export async function getValidAccessToken() {
  const { isLoggedIn } = await SocialLogin.isLoggedIn({ provider: 'oauth2', providerId: 'auth0' });

  if (!isLoggedIn) {
    // access token expired: try the stored refresh token
    try {
      await SocialLogin.refresh({ provider: 'oauth2', options: { providerId: 'auth0' } });
    } catch {
      // refresh token expired, revoked or already rotated: sign in again
      const loginResult = await signInWithAuth0();
      if (!loginResult) throw new Error('Sign-in cancelled');
    }
  }

  const { accessToken } = await SocialLogin.getAuthorizationCode({
    provider: 'oauth2',
    providerId: 'auth0',
  });
  return accessToken;
}
```

`refresh` rejects when the refresh token is expired or revoked. With rotation on, a refresh token that was already used also fails, so always handle the rejection by sending the user back to sign in.

`refresh` uses the refresh token the plugin saved at login. If you keep the refresh token yourself, call `SocialLogin.refreshToken({ provider: 'oauth2', providerId: 'auth0', refreshToken })`, which returns the full new token response. With rotation on, store the new refresh token every time.

The plugin keeps its token copy in app-private storage. If your security review asks for Keychain or Keystore, store the refresh token with `NativeBiometric.setData({ key, value })` from [@capgo/capacitor-native-biometric](/plugins/capacitor-native-biometric/) and pass it to `refreshToken` yourself. Our [secure token storage guide](/blog/secure-token-storage-best-practices-for-mobile-developers/) compares the options.

## Step 7: Sign out

```typescript
await SocialLogin.logout({ provider: 'oauth2', providerId: 'auth0' });
```

The plugin deletes the stored tokens, then opens `logoutUrl` with `id_token_hint` and `post_logout_redirect_uri` so Auth0 clears its session cookie. Auth0's `/oidc/logout` endpoint understands those parameters, and the redirect target must be listed in **Allowed Logout URLs**.

On iOS and Android the end-session page opens in the system browser, so the user briefly leaves the app. If you only want a local logout, omit `logoutUrl` and pass `prompt: 'login'` on the next sign-in so a remembered Auth0 session does not log the user straight back in. Setting `iosPrefersEphemeralSession: true` also avoids shared cookies on iOS, at the cost of no SSO between apps.

## Troubleshooting

| Error | Cause | Fix |
|---|---|---|
| `Callback URL mismatch` | Redirect URL not in Allowed Callback URLs | Copy the exact value from code to the dashboard, check scheme and host |
| `Unauthorized` or `invalid_client` at `/oauth/token` | App type is not Native, or auth method is not None | Recreate as Native, set token endpoint auth to None |
| No `refreshToken` in result | `offline_access` missing or API does not allow offline access | Add the scope, enable Allow Offline Access, enable rotation |
| Access token cannot be verified by API | No `audience` sent | Add `audience` in `additionalParameters` |
| App does not reopen after login on Android | Intent filter scheme or host does not match `redirectUrl` | Match `com.example.app` and `oauth` exactly |
| `OAuth2 provider "auth0" not configured` | `login` called before `initialize` or key mismatch | Await `initialize` at startup, use the same `providerId` |
| Logout page stays open | `post_logout_redirect_uri` not in Allowed Logout URLs | Add it, or use local-only logout |
| Web CORS error on token exchange | Origin not in Allowed Web Origins | Add the web origin, or use a SPA application for web |

Set `logsEnabled: true` in the provider config to print the generated URLs and token exchange details while you debug.

## Ship auth fixes without a store release

Changing scopes, the audience or error handling is TypeScript only. With [Capgo live updates](/live-update/) you can roll those fixes out to users the same day. Native changes such as a new intent filter still need a new binary, which [Capgo Build](/native-build/) can produce in the cloud.

## Related guides

- [How to sign in with Okta using Capacitor](/blog/how-to-sign-in-with-okta-using-capacitor/)
- [How to sign in with Microsoft Entra ID using Capacitor](/blog/how-to-sign-in-with-azure-entra-id-using-capacitor/)
- [How to add authentication to a Capacitor app](/blog/how-to-add-authentication-to-a-capacitor-app/)
- [Generic OAuth2 and OIDC provider docs](/docs/plugins/social-login/oauth2/)
