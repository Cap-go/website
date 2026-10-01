---
slug: how-to-sign-in-with-okta-using-capacitor
title: "How to Sign In with Okta Using Capacitor"
description: "Connect Okta to a Capacitor 8 app with OIDC and PKCE: create the native app integration, set redirect URIs, refresh tokens, logout, and fix Okta errors."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-10-01T09:00:00.000Z
updated_at: 2026-10-01T03:59:51.000Z
head_image: /login.webp
head_image_alt: "Okta sign-in page opened from a Capacitor mobile app with PKCE"
keywords: okta capacitor, capacitor okta login, ionic okta, okta pkce mobile, okta oidc native app, okta refresh token capacitor, capacitor enterprise sso
tag: Tutorial, Security, Capacitor
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "Do I need an Okta client secret for a Capacitor app?"
    answer: "No. Create an OIDC Native Application, which is a public client. Client authentication is set to None and PKCE protects the code exchange. A secret shipped in an app bundle is not a secret."
  - question: "Which Okta issuer URL should I use?"
    answer: "Use a custom authorization server issuer such as https://your-org.okta.com/oauth2/default when your own API validates the access tokens. The org authorization server (https://your-org.okta.com) only issues access tokens for Okta's own APIs, so your backend cannot validate them."
  - question: "How do I get a refresh token from Okta?"
    answer: "Enable the Refresh Token grant type on the app integration, request the offline_access scope, and make sure the access policy rule on your authorization server allows the refresh token grant. Okta can rotate refresh tokens on every use, so save the new one each time."
  - question: "Why do users get 'User is not assigned to the client application'?"
    answer: "Okta only lets assigned users or groups sign in to an app integration. Open the app in the Admin Console, go to Assignments, and assign the users or a group such as Everyone."
---

To sign in with Okta in a Capacitor app, create an **OIDC Native Application** in the Okta Admin Console, register a sign-in redirect URI such as `com.example.app://oauth/okta`, and run the authorization code flow with PKCE in a system browser. With `@capgo/capacitor-social-login` you configure Okta once with your issuer and client ID, then call `SocialLogin.login({ provider: 'oauth2', options: { providerId: 'okta' } })`.

This guide covers the Okta app integration, authorization server policies, the plugin code for iOS, Android and web, token refresh, user profile, logout, and the Okta errors that show up most often. It targets Capacitor 8 as of October 2026.

## What you need

- An Okta org (Workforce Identity or Customer Identity) with admin access to create app integrations.
- A Capacitor 8 app.
- Your Capacitor `appId`, which you will reuse as the redirect scheme.
- Optionally, a backend API that validates Okta access tokens.

## How Okta login works in a Capacitor app

Your app never shows a password form. It opens the Okta sign-in page in a secure browser, Okta handles MFA and policies, then redirects back to your app with a code. The app exchanges the code plus the PKCE verifier for tokens.

| Platform | Browser | What you configure |
|---|---|---|
| iOS | `ASWebAuthenticationSession` | Nothing in `Info.plist` |
| Android | Chrome Custom Tabs with `androidUseCustomTabs: true` (WebView by default) | Intent filter for the redirect scheme |
| Web | Popup or redirect | Trusted Origin for CORS |

Prefer Custom Tabs on Android. Okta Verify, FastPass and passkeys behave better in the system browser than in an embedded WebView, and SSO cookies are shared with Chrome.

## Step 1: Create the Okta app integration

1. In the Okta Admin Console, go to **Applications > Applications > Create App Integration**.
2. Choose **OIDC - OpenID Connect** and **Native Application**.
3. Name it, then under **Grant type** keep **Authorization Code** and tick **Refresh Token** if users should stay signed in.
4. **Sign-in redirect URIs**: `com.example.app://oauth/okta`. Add `https://app.example.com/auth/callback` if you ship a web build.
5. **Sign-out redirect URIs**: `com.example.app://oauth/logout` (and the web URL if needed).
6. **Assignments**: pick who can use the app. Users who are not assigned get an error at sign-in.
7. Save, then copy the **Client ID**. Under **Client Credentials**, client authentication should be **None** and **Require PKCE** should be on.

Okta requires native redirect URIs to use a private-use scheme in reverse-domain form. Your bundle ID or application ID fits.

### Check the authorization server

Go to **Security > API > Authorization Servers**. Most setups use the `default` custom authorization server, issuer `https://your-org.okta.com/oauth2/default`.

| Issuer | Use when |
|---|---|
| `https://your-org.okta.com/oauth2/default` (custom) | Your own API validates access tokens, you need custom scopes or claims |
| `https://your-org.okta.com` (org) | You only need ID tokens or call Okta APIs |

Open the server's **Access Policies** tab. There must be a policy assigned to your app (or All clients) with a rule that allows the **Authorization Code** grant, and **Refresh Token** if you use it. A missing rule produces "Policy evaluation failed for this request".

### Trusted Origins for web

If you run the same code on the web, add your web origin under **Security > API > Trusted Origins** with **CORS** checked. Without it, the browser blocks the token request.

## Step 2: Install the plugin

```bash
bun add @capgo/capacitor-social-login
bunx cap sync
```

If Okta is the only provider, turn off the bundled social SDKs in `capacitor.config.ts`:

```typescript
plugins: {
  SocialLogin: {
    providers: { google: false, facebook: false, apple: false, twitter: false },
  },
},
```

## Step 3: Add the Android redirect intent filter

In `android/app/src/main/AndroidManifest.xml`, inside the `MainActivity` activity:

```xml
<intent-filter>
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data android:scheme="com.example.app" android:host="oauth" />
</intent-filter>
```

`MainActivity` must stay `android:launchMode="singleTask"`, which is the Capacitor default, so the redirect arrives in the running activity.

## Step 4: Initialize Okta

```typescript
import { Capacitor } from '@capacitor/core';
import { SocialLogin } from '@capgo/capacitor-social-login';

const OKTA_ISSUER = 'https://your-org.okta.com/oauth2/default';
const isWeb = Capacitor.getPlatform() === 'web';

export async function initAuth() {
  await SocialLogin.initialize({
    oauth2: {
      okta: {
        appId: 'YOUR_OKTA_CLIENT_ID',
        authorizationBaseUrl: `${OKTA_ISSUER}/v1/authorize`,
        accessTokenEndpoint: `${OKTA_ISSUER}/v1/token`,
        resourceUrl: `${OKTA_ISSUER}/v1/userinfo`,
        redirectUrl: isWeb
          ? 'https://app.example.com/auth/callback'
          : 'com.example.app://oauth/okta',
        scope: 'openid profile email offline_access',
        pkceEnabled: true,
        logoutUrl: `${OKTA_ISSUER}/v1/logout`,
        postLogoutRedirectUrl: isWeb
          ? 'https://app.example.com/'
          : 'com.example.app://oauth/logout',
        androidUseCustomTabs: true,
      },
    },
  });
}
```

Shorter alternative: set `issuerUrl: OKTA_ISSUER` and drop the endpoint URLs. The plugin loads `/.well-known/openid-configuration` and fills them in. Teams migrating from Ionic Auth Connect can use `SocialLoginAuthConnect` with the `okta` preset (`issuer`, `clientId`, `redirectUrl`), covered in the [migration guide](/docs/plugins/social-login/migrations/ionic-auth-connect/).

## Step 5: Sign in and read the profile

```typescript
import { SocialLogin } from '@capgo/capacitor-social-login';

export async function signInWithOkta() {
  try {
    const { result } = await SocialLogin.login({
      provider: 'oauth2',
      options: { providerId: 'okta' },
    });

    const profile = result.resourceData as {
      sub: string;
      email?: string;
      name?: string;
      preferred_username?: string;
    } | null;

    return {
      accessToken: result.accessToken?.token,
      idToken: result.idToken,
      refreshToken: result.refreshToken,
      scopes: result.scope,
      profile,
    };
  } catch (error: any) {
    if (error?.code === 'USER_CANCELLED') return null;
    throw error;
  }
}
```

`resourceData` holds the JSON returned by the `/userinfo` endpoint, so you get the profile without another request. To read the ID token claims for display, use `SocialLogin.decodeIdToken({ idToken })`. That call does not verify the signature.

Login options worth knowing:

- `loginHint` pre-fills the username.
- `prompt: 'login'` forces re-authentication even with an active Okta session.
- `additionalParameters: { idp: '0oa...' }` routes straight to a specific identity provider configured in Okta.

On web with `flow: 'redirect'`, call `SocialLogin.handleRedirectCallback()` on the callback page to finish the exchange.

## Step 6: Validate Okta tokens on your API

```typescript
import { createRemoteJWKSet, jwtVerify } from 'jose';

const ISSUER = 'https://your-org.okta.com/oauth2/default';
const jwks = createRemoteJWKSet(new URL(`${ISSUER}/v1/keys`));

export async function verifyOktaAccessToken(token: string) {
  const { payload } = await jwtVerify(token, jwks, {
    issuer: ISSUER,
    audience: 'api://default', // the Audience value of your authorization server
  });
  return payload; // payload.uid is the Okta user ID, payload.sub the login
}
```

Find the audience on the authorization server's **Settings** tab. Do not validate access tokens from the org authorization server in your API. Okta does not support that.

## Step 7: Refresh tokens

```typescript
import { SocialLogin } from '@capgo/capacitor-social-login';

export async function ensureFreshOktaToken() {
  const { isLoggedIn } = await SocialLogin.isLoggedIn({ provider: 'oauth2', providerId: 'okta' });
  if (!isLoggedIn) {
    await SocialLogin.refresh({ provider: 'oauth2', options: { providerId: 'okta' } });
  }
  const { accessToken } = await SocialLogin.getAuthorizationCode({ provider: 'oauth2', providerId: 'okta' });
  return accessToken;
}
```

If the refresh token is expired or revoked, `refresh` rejects. Catch that and send the user back to `signInWithOkta()`.

Check the **Refresh Token** section of the app integration. With **Rotate token after every use**, each refresh returns a new refresh token and the old one stops working after a short grace period. The plugin replaces its stored copy automatically. If you hold the refresh token yourself (for example in the Keychain through [@capgo/capacitor-native-biometric](/plugins/capacitor-native-biometric/) `setData`), use `SocialLogin.refreshToken({ provider: 'oauth2', providerId: 'okta', refreshToken })` and save the returned value.

## Step 8: Sign out

```typescript
await SocialLogin.logout({ provider: 'oauth2', providerId: 'okta' });
```

The plugin clears its stored tokens, then opens `/v1/logout` with `id_token_hint` and `post_logout_redirect_uri`. Okta ends the session and redirects to your sign-out URI, which must be listed in the app integration. On mobile the logout page opens in the system browser.

To also revoke the refresh token server-side, call Okta's `/v1/revoke` endpoint from your backend or the app before logging out. See our [token revocation guide](/blog/token-revocation-in-capacitor-apps-guide/) for the pattern.

## Troubleshooting

| Error | Cause | Fix |
|---|---|---|
| `invalid_request: The 'redirect_uri' parameter must be a Login redirect URI in the client app settings` | Redirect not registered | Add the exact URI to Sign-in redirect URIs |
| `User is not assigned to the client application` | Missing assignment | Assign the user or group under Assignments |
| `Policy evaluation failed for this request` | No access policy rule for this client or grant | Add a policy and rule on the authorization server |
| `invalid_client` at token endpoint | App is Web or SPA type, or auth method is not None | Use a Native app with client authentication None |
| No refresh token | Refresh Token grant off, `offline_access` missing, or rule blocks it | Enable grant, add scope, allow it in the rule |
| API rejects token with bad issuer | Token came from org server | Use the custom authorization server issuer |
| Web: CORS error on `/v1/token` | Origin not trusted | Add a Trusted Origin with CORS |
| Android stays in browser after login | Intent filter mismatch | Match scheme and host to `redirectUrl` |

Turn on `logsEnabled: true` in the provider config while debugging to see the authorize URL and token responses in the native logs.

## Rolling out Okta changes

Enterprise customers often change policies or claims after launch. Client-side changes like scopes, claim handling or error screens can ship with [Capgo live updates](/live-update/) instead of a full store review. The native pieces (intent filter, new scheme) still require a new build.

## Related guides

- [How to sign in with Auth0 using Capacitor](/blog/how-to-sign-in-with-auth0-using-capacitor/)
- [How to sign in with Microsoft Entra ID using Capacitor](/blog/how-to-sign-in-with-azure-entra-id-using-capacitor/)
- [How to add authentication to a Capacitor app](/blog/how-to-add-authentication-to-a-capacitor-app/)
- [Okta integration docs for the Social Login plugin](/docs/plugins/social-login/integrations/okta/)
