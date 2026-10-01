---
slug: how-to-sign-in-with-azure-entra-id-using-capacitor
title: "Sign In with Microsoft Entra ID (Azure AD) in Capacitor"
description: "Add Microsoft Entra ID (Azure AD) login to a Capacitor 8 app with PKCE: app registration, redirect URIs, Graph and API scopes, and AADSTS error fixes."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-10-01T09:00:00.000Z
updated_at: 2026-10-01T09:00:00.000Z
head_image: /login.webp
head_image_alt: "Microsoft Entra ID sign-in page launched from a Capacitor app"
keywords: azure entra id capacitor, microsoft entra id capacitor, azure ad capacitor login, ionic azure ad, msal capacitor, microsoft graph capacitor, aadsts50011, capacitor enterprise login
tag: Tutorial, Security, Capacitor
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "Do I need MSAL to use Microsoft Entra ID in a Capacitor app?"
    answer: "No. Entra ID is a standard OpenID Connect provider, so an authorization code flow with PKCE in the system browser works on iOS, Android and web. Microsoft does not ship an MSAL build for Capacitor. You only need native MSAL or the Intune App SDK if you must support broker-based device Conditional Access or Intune app protection policies."
  - question: "Do I need a client secret?"
    answer: "No. Register the redirect URI under the Mobile and desktop applications platform, which makes it a public client. The app uses PKCE. If you register it under the Web platform by mistake, the token endpoint demands a secret and returns AADSTS7000218."
  - question: "Can users from any Microsoft tenant sign in?"
    answer: "Only if you choose a multitenant account type at registration and use the organizations or common authority. Single-tenant apps must use the tenant ID in the URLs. Personal Microsoft accounts need the multitenant plus personal accounts option and the common or consumers authority."
  - question: "Can I use the Graph access token to call my own API?"
    answer: "No. A Graph token is meant for Microsoft Graph and your API cannot validate it. Expose a scope on your app registration, such as api://<client-id>/access_as_user, and request that scope for your API. One access token can only target one resource."
---

To sign in with Microsoft Entra ID (formerly Azure Active Directory) in a Capacitor app, register a public client app in the Entra admin center, add a **Mobile and desktop applications** redirect URI such as `com.example.app://oauth/azure`, and run the OpenID Connect authorization code flow with PKCE through the system browser. With `@capgo/capacitor-social-login` that means one `initialize` call with the Microsoft identity platform v2.0 endpoints and `SocialLogin.login({ provider: 'oauth2', options: { providerId: 'azure' } })`.

This guide covers the app registration, choosing the right authority, Graph and custom API scopes, token validation, Conditional Access, logout, and the AADSTS errors you will see. It targets Capacitor 8 in October 2026.

## What you need

- A Microsoft Entra tenant and a role that can create app registrations (Application Developer or higher).
- A Capacitor 8 app and its `appId`, which you will reuse as the redirect scheme.
- Optionally, a backend API that should accept Entra tokens.

## Why not MSAL.js inside the WebView

MSAL.js is built for browsers that own their origin and can open popups. In a Capacitor WebView the origin is `capacitor://localhost` on iOS and `https://localhost` on Android, popups are blocked, and a full-page redirect would navigate your app away from its own bundle. Microsoft's guidance for native apps is the system browser with PKCE (RFC 8252), which is what the plugin does:

| Platform | Browser used | Extra setup |
|---|---|---|
| iOS | `ASWebAuthenticationSession` | None |
| Android | Chrome Custom Tabs with `androidUseCustomTabs: true` | Intent filter |
| Web | Popup or redirect | SPA redirect URI |

On Android, turn Custom Tabs on. The default embedded WebView cannot talk to Microsoft Authenticator, passkeys or the Company Portal, which Conditional Access often relies on.

## Step 1: Register the app in Entra ID

1. Open the [Microsoft Entra admin center](https://entra.microsoft.com) and go to **Entra ID > App registrations > New registration**.
2. Enter a name, such as "Example Mobile".
3. Pick **Supported account types**. This decides the authority you use later.
4. Skip the redirect URI for now and click **Register**.
5. On **Overview**, copy the **Application (client) ID** and **Directory (tenant) ID**.

### Choose the authority

| Account type at registration | Authority segment in URLs |
|---|---|
| Single tenant (your org only) | Your tenant ID, for example `8f1c...` |
| Any organizational directory | `organizations` |
| Any org directory plus personal Microsoft accounts | `common` |
| Personal Microsoft accounts only | `consumers` |

Use the tenant ID whenever you can. It produces predictable issuers and avoids accidental sign-ins from other tenants.

### Add redirect URIs

Go to **Authentication > Add a platform**:

- **Mobile and desktop applications**: add `com.example.app://oauth/azure` as a custom redirect URI. Add `com.example.app://oauth/logout` too if you want a post-logout redirect.
- **Single-page application** (only if you ship a web build): add `https://app.example.com/auth/callback`.

Do not register the mobile URI under **Web**. Web platform redirects are confidential clients and require a secret at the token endpoint.

### API permissions

**API permissions** already contains `Microsoft Graph > User.Read`. Add `offline_access`, `openid`, `profile` and `email` if they are not listed. Some tenants block user consent. In that case an admin must click **Grant admin consent**, otherwise users see AADSTS65001 or a "Need admin approval" screen.

### Expose a scope for your own API (optional)

If your backend should accept the token:

1. Open **Expose an API** and set the Application ID URI, typically `api://<client-id>`.
2. Add a scope named `access_as_user`, who can consent: Admins and users.
3. In **Manifest**, set `"requestedAccessTokenVersion": 2` so access tokens use the v2.0 issuer format.

## Step 2: Install the plugin and add the intent filter

```bash
bun add @capgo/capacitor-social-login
bunx cap sync
```

In `android/app/src/main/AndroidManifest.xml`, inside `MainActivity`:

```xml
<intent-filter>
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data android:scheme="com.example.app" android:host="oauth" />
</intent-filter>
```

Keep `android:launchMode="singleTask"` on `MainActivity` (the Capacitor default). If you do not use Google, Apple or Facebook login, disable them under `plugins.SocialLogin.providers` in `capacitor.config.ts` to keep their SDKs out of the build.

## Step 3: Initialize the Entra ID provider

```typescript
import { Capacitor } from '@capacitor/core';
import { SocialLogin } from '@capgo/capacitor-social-login';

const TENANT = 'YOUR_TENANT_ID'; // or organizations / common
const AUTHORITY = `https://login.microsoftonline.com/${TENANT}/oauth2/v2.0`;
const isWeb = Capacitor.getPlatform() === 'web';

export async function initAuth() {
  await SocialLogin.initialize({
    oauth2: {
      azure: {
        appId: 'YOUR_CLIENT_ID',
        authorizationBaseUrl: `${AUTHORITY}/authorize`,
        accessTokenEndpoint: `${AUTHORITY}/token`,
        redirectUrl: isWeb
          ? 'https://app.example.com/auth/callback'
          : 'com.example.app://oauth/azure',
        scope: 'openid profile email offline_access User.Read',
        pkceEnabled: true,
        resourceUrl: 'https://graph.microsoft.com/v1.0/me',
        logoutUrl: `${AUTHORITY}/logout`,
        postLogoutRedirectUrl: isWeb ? 'https://app.example.com/' : 'com.example.app://oauth/logout',
        androidUseCustomTabs: true,
      },
    },
  });
}
```

With `resourceUrl` pointing at Graph `/me`, the plugin calls Graph right after login and returns the profile in `resourceData`.

If you are migrating from Ionic Auth Connect, `SocialLoginAuthConnect` has an `azure` preset that only needs `tenantId`, `clientId` and `redirectUrl`. See the [Entra ID integration page](/docs/plugins/social-login/integrations/azure/).

## Step 4: Sign in

```typescript
import { SocialLogin } from '@capgo/capacitor-social-login';

export async function signInWithMicrosoft() {
  try {
    const { result } = await SocialLogin.login({
      provider: 'oauth2',
      options: { providerId: 'azure' },
    });

    const me = result.resourceData as {
      id: string;
      displayName?: string;
      mail?: string | null;
      userPrincipalName?: string;
    } | null;

    return {
      idToken: result.idToken,
      graphToken: result.accessToken?.token,
      refreshToken: result.refreshToken,
      user: me,
    };
  } catch (error: any) {
    if (error?.code === 'USER_CANCELLED') return null;
    throw error;
  }
}
```

Useful options:

- `loginHint: 'jane@contoso.com'` pre-fills the account and skips the account picker for that user.
- `prompt: 'select_account'` always shows the account picker, useful for shared devices.
- `additionalParameters: { domain_hint: 'contoso.com' }` sends users straight to their federated IdP.

`mail` is often `null` for accounts without a mailbox. Fall back to `userPrincipalName` or the `preferred_username` claim of the ID token.

## Step 5: Call Microsoft Graph

```typescript
export async function getMyPhotoBlob(graphToken: string) {
  const res = await fetch('https://graph.microsoft.com/v1.0/me/photo/$value', {
    headers: { Authorization: `Bearer ${graphToken}` },
  });
  if (res.status === 404) return null; // no photo set
  if (!res.ok) throw new Error(`Graph error ${res.status}`);
  return res.blob();
}
```

Add each Graph scope you need (for example `Calendars.Read`) both in **API permissions** and in the `scope` string.

## Step 6: Get a token for your own API

An access token targets one resource. To call your backend, add a second entry next to `azure` in the same `oauth2` map of your `initialize` call, requesting your API scope instead of Graph:

```typescript
await SocialLogin.initialize({
  oauth2: {
    azure: graphConfig, // the object from step 3, moved into a const
    azureApi: {
      appId: 'YOUR_CLIENT_ID',
      authorizationBaseUrl: `${AUTHORITY}/authorize`,
      accessTokenEndpoint: `${AUTHORITY}/token`,
      redirectUrl: 'com.example.app://oauth/azure-api', // register this URI too
      scope: 'openid profile offline_access api://YOUR_CLIENT_ID/access_as_user',
      pkceEnabled: true,
      androidUseCustomTabs: true,
    },
  },
});
```

The user already has a Microsoft session, so the second login usually completes without a prompt. Validate the token on the server:

```typescript
import { createRemoteJWKSet, jwtVerify } from 'jose';

const TENANT_ID = 'YOUR_TENANT_ID';
const jwks = createRemoteJWKSet(
  new URL(`https://login.microsoftonline.com/${TENANT_ID}/discovery/v2.0/keys`),
);

export async function verifyEntraToken(token: string) {
  const { payload } = await jwtVerify(token, jwks, {
    issuer: `https://login.microsoftonline.com/${TENANT_ID}/v2.0`,
    audience: 'YOUR_CLIENT_ID', // v2 tokens use the client ID as aud
  });
  if (!String(payload.scp ?? '').split(' ').includes('access_as_user')) {
    throw new Error('Missing scope');
  }
  return payload; // payload.oid is the stable user object ID
}
```

For multitenant apps, the issuer contains each customer's tenant ID. Validate the `tid` claim against the list of tenants you accept instead of a fixed issuer. Key users on `oid` plus `tid`, not on email.

## Step 7: Refresh and sign out

```typescript
// Get a valid Graph token, refreshing it when it has expired
export async function getGraphToken() {
  const { isLoggedIn } = await SocialLogin.isLoggedIn({ provider: 'oauth2', providerId: 'azure' });
  if (!isLoggedIn) {
    try {
      await SocialLogin.refresh({ provider: 'oauth2', options: { providerId: 'azure' } });
    } catch {
      // no session, or the refresh token expired or was revoked
      await signInWithMicrosoft();
    }
  }
  const { accessToken } = await SocialLogin.getAuthorizationCode({ provider: 'oauth2', providerId: 'azure' });
  return accessToken;
}

// Sign out
await SocialLogin.logout({ provider: 'oauth2', providerId: 'azure' });
```

Entra refresh tokens for public clients last up to 90 days with a sliding window and are replaced on each use. The plugin stores the new one. If you store tokens yourself, use the Keychain or Keystore, for example `NativeBiometric.setData` from [@capgo/capacitor-native-biometric](/plugins/capacitor-native-biometric/), and pass them to `SocialLogin.refreshToken`.

`logout` clears local tokens and opens the v2.0 logout endpoint in the system browser. Microsoft sometimes shows a "You signed out of your account" page instead of redirecting to a custom scheme, so the user may have to close it. If you only need a local logout, drop `logoutUrl` and pass `prompt: 'select_account'` at the next login.

## Conditional Access and Intune

Browser-based OIDC works with MFA, passwordless and most Conditional Access policies. Two cases need more:

- **Require compliant or hybrid-joined device**: Entra must see device state. On Android this works through Custom Tabs when the Company Portal or Authenticator is installed. On managed iOS devices, the Microsoft Enterprise SSO plug-in deployed by your MDM provides it. Test this early with a real policy.
- **Intune app protection policies (MAM)**: these require the Intune App SDK inside the native app. OIDC alone does not satisfy "Require app protection policy" grants.

## Troubleshooting

| Error | Meaning | Fix |
|---|---|---|
| AADSTS50011 | Redirect URI mismatch | Add the exact URI under Mobile and desktop applications |
| AADSTS7000218 | Token request needs a secret | Redirect was registered under Web. Move it to Mobile and desktop |
| AADSTS9002326 | Cross-origin token redemption only allowed for SPA | Web build uses a mobile redirect. Register the web URL under Single-page application |
| AADSTS700016 | App not found in directory | Wrong tenant in the authority, or single-tenant app used with `common` |
| AADSTS50020 | User account from another tenant | Use a multitenant registration, or invite the user as a guest |
| AADSTS65001 | Consent not granted | Grant admin consent or allow user consent |
| AADSTS53003 | Blocked by Conditional Access | Check sign-in logs, see the section above |
| AADSTS28000 | Scopes for more than one resource in one request | Request Graph and your API scopes in separate logins |
| No refresh token | `offline_access` missing | Add it to scopes and permissions |

The Entra admin center **Sign-in logs** show the exact failure reason for each attempt, and `logsEnabled: true` in the plugin config prints the authorize URL and token response on the device.

## Shipping updates

Policy changes on the Entra side are instant, but client-side fixes still need to reach devices. TypeScript changes such as scopes or error handling can ship through [Capgo live updates](/live-update/). Native changes (intent filters, new schemes) need a new store build, which [Capgo Build](/native-build/) can produce without a local Mac.

## Related guides

- [How to sign in with Okta using Capacitor](/blog/how-to-sign-in-with-okta-using-capacitor/)
- [How to sign in with Auth0 using Capacitor](/blog/how-to-sign-in-with-auth0-using-capacitor/)
- [How to add authentication to a Capacitor app](/blog/how-to-add-authentication-to-a-capacitor-app/)
- [Generic OAuth2 provider reference](/docs/plugins/social-login/oauth2/)
