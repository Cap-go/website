---
slug: how-to-add-authentication-to-a-capacitor-app
title: "How to Add Authentication to a Capacitor App (2026)"
description: "Compare every way to add authentication to a Capacitor app: native Google and Apple login, OIDC SSO, Firebase, Supabase, Better Auth, passkeys and biometrics."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-10-01T09:00:00.000Z
updated_at: 2026-10-01T09:00:00.000Z
head_image: /mfa-login.webp
head_image_alt: "Login screen of a Capacitor app offering social, SSO and passkey sign-in"
keywords: capacitor authentication, add authentication to capacitor app, ionic capacitor login, capacitor social login, capacitor oauth, capacitor passkeys, capacitor biometric login, capacitor firebase auth, capacitor supabase auth
tag: Guides, Security, Capacitor
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "Can I use more than one authentication method in the same Capacitor app?"
    answer: "Yes, and most consumer apps do. A common setup is Sign in with Apple, Google and email with password or passkeys, all creating the same user record on the backend. Link accounts by the provider's verified email or let signed-in users connect extra providers from their settings."
  - question: "Why does Google login fail inside my Capacitor WebView?"
    answer: "Google blocks OAuth pages loaded in embedded WebViews and returns disallowed_useragent. Use native Google Sign-In through a plugin, which uses Credential Manager on Android and the Google SDK on iOS, then send the ID token to your backend."
  - question: "Is biometric authentication a replacement for a password?"
    answer: "No. Face ID or fingerprint checks happen on the device and only prove that the device owner is present. Use biometrics to unlock a session token or credential that a real login created earlier, and keep the server as the authority on who the user is."
  - question: "What does Apple require for login in iOS apps?"
    answer: "If you offer a third-party login such as Google or Facebook as the main account system, guideline 4.8 requires an equivalent privacy-focused login, which Sign in with Apple satisfies. If users can create accounts, guideline 5.1.1(v) requires in-app account deletion, including revoking Sign in with Apple tokens."
  - question: "Do these authentication plugins support Capacitor 8 and the web?"
    answer: "Yes. @capgo/capacitor-social-login v8 targets Capacitor 8 and runs on iOS, Android and web. The Google and Apple providers use Google Identity Services and Apple JS on the web, and the OAuth2 engine uses a popup or redirect."
---

To add authentication to a Capacitor app, pick an identity source (your own backend, a hosted service like Firebase or Supabase, an OIDC provider like Auth0, Okta or Entra ID, or a self-hosted library like Better Auth), use native plugins for anything that opens a provider login page, verify tokens on a server, and store the resulting session in the Keychain or Keystore. Biometrics and passkeys then make the next sign-in fast.

This guide maps every common option to the right Capacitor plugin and flow, with code for the parts that are the same in every app: the login call, token verification, session storage and biometric unlock. It is up to date for Capacitor 8 in October 2026. Each provider has its own step-by-step guide linked below.

## The auth flow every Capacitor app ends up with

No matter which provider you choose, the shape is the same:

1. **Identify** the user: native social sheet, provider login page in the system browser, passkey prompt, or a form that posts email and password.
2. **Get a proof**: an ID token, an authorization code, or a session token from your auth server.
3. **Verify on the server**: check signature, issuer, audience and expiry, then create or find the user.
4. **Issue a session**: your own token or the provider's tokens, with a refresh strategy.
5. **Store it securely** on the device and attach it to API calls.
6. **Unlock quickly** next time with biometrics, and handle logout and account deletion.

Steps 1 and 2 change with the provider. Steps 3 to 6 are your responsibility in every option except fully hosted BaaS, where the SDK does most of it.

## Why WebView login pages break

A Capacitor app runs your web code in a WKWebView (iOS) or Android WebView with a local origin (`capacitor://localhost` or `https://localhost`). Loading a provider's login page inside that WebView causes three problems:

- Google returns `disallowed_useragent` and refuses to show the page.
- The app cannot prove the page is the real provider, which is why RFC 8252 tells native apps to use the system browser.
- A full-page redirect navigates away from your bundled app and loses state.

So every flow below uses either a native SDK (Apple, Google, Facebook) or a system browser session (`ASWebAuthenticationSession` on iOS, Chrome Custom Tabs on Android) that returns to the app through a custom scheme.

## Your options at a glance

| Approach | Best for | Capacitor plugin | Backend work | Guide |
|---|---|---|---|---|
| Sign in with Apple | Any iOS app with third-party login | `@capgo/capacitor-social-login` | Verify ID token | [Apple guide](/blog/how-to-sign-in-with-apple-using-capacitor/) |
| Google Sign-In | Consumer apps, Android first | `@capgo/capacitor-social-login` | Verify ID token | [Google guide](/blog/how-to-sign-in-with-google-using-capacitor/) |
| Auth0 | Hosted login with many connections | `@capgo/capacitor-social-login` (OAuth2) | Validate access tokens | [Auth0 guide](/blog/how-to-sign-in-with-auth0-using-capacitor/) |
| Okta | Workforce and B2B SSO | `@capgo/capacitor-social-login` (OAuth2) | Validate access tokens | [Okta guide](/blog/how-to-sign-in-with-okta-using-capacitor/) |
| Microsoft Entra ID | Microsoft 365 organizations | `@capgo/capacitor-social-login` (OAuth2) | Validate access tokens, Graph | [Entra ID guide](/blog/how-to-sign-in-with-azure-entra-id-using-capacitor/) |
| Better Auth | Self-hosted, own user database | `better-auth` client + Social Login | Run the Better Auth server | [Better Auth guide](/blog/how-to-use-better-auth-in-capacitor-apps/) |
| Supabase Auth | Postgres backend with built-in auth | Social Login + `supabase-js` | Minimal | [Supabase guide](/blog/setup-supabase-with-capacitor-social-login/) |
| Firebase Authentication | Apps already on Firebase | `@capgo/capacitor-firebase-authentication` | Minimal | [Firebase docs](/docs/plugins/firebase-authentication/) |
| Passkeys | Passwordless login on your own domain | `@capgo/capacitor-passkey` | WebAuthn server | [Passkey docs](/docs/plugins/passkey/) |
| Email and password | Simple apps, own backend | None (HTTP) | Hashing, reset, rate limits | This article |

## Native social sign-in (Apple, Google, Facebook)

One plugin covers the three big consumer providers plus a generic OAuth2 engine:

```bash
bun add @capgo/capacitor-social-login
bunx cap sync
```

```typescript
import { SocialLogin } from '@capgo/capacitor-social-login';

await SocialLogin.initialize({
  apple: { clientId: 'com.example.app' },
  google: {
    webClientId: 'WEB_CLIENT_ID.apps.googleusercontent.com',
    iOSClientId: 'IOS_CLIENT_ID.apps.googleusercontent.com',
  },
});

const { result } = await SocialLogin.login({ provider: 'google', options: {} });
// send result.idToken to your server
```

Turn off providers you do not use in `capacitor.config.ts` (`plugins.SocialLogin.providers`) so their SDKs are not compiled into the app. That also removes the Facebook SDK's advertising ID permission if you do not use Facebook.

Each provider has native setup: Apple needs the capability in Xcode and a Services ID for Android, Google needs SHA-1 fingerprints and a reversed client ID URL scheme. The [Apple](/blog/how-to-sign-in-with-apple-using-capacitor/) and [Google](/blog/how-to-sign-in-with-google-using-capacitor/) guides go through every step and the common errors.

## Enterprise SSO with OAuth 2.0 and OpenID Connect

For Auth0, Okta, Microsoft Entra ID, Keycloak, Cognito, OneLogin or your own OIDC server, use the plugin's `oauth2` provider. It runs the authorization code flow with PKCE in `ASWebAuthenticationSession` on iOS and in Custom Tabs on Android when you set `androidUseCustomTabs: true`:

```typescript
await SocialLogin.initialize({
  oauth2: {
    corp: {
      issuerUrl: 'https://sso.example.com/realms/mobile', // OIDC discovery
      clientId: 'mobile-app',
      redirectUrl: 'com.example.app://oauth/corp',
      scope: 'openid profile email offline_access',
      pkceEnabled: true,
      androidUseCustomTabs: true,
    },
  },
});

const { result } = await SocialLogin.login({
  provider: 'oauth2',
  options: { providerId: 'corp' },
});
```

You can register several providers in the same map and pick one with `providerId`, which is how multi-tenant B2B apps let each customer bring their own IdP. The plugin also handles refresh (`SocialLogin.refresh`), logout with `id_token_hint`, and an Ionic Auth Connect compatible wrapper (`SocialLoginAuthConnect`) for teams migrating off Auth Connect. Provider walkthroughs: [Auth0](/blog/how-to-sign-in-with-auth0-using-capacitor/), [Okta](/blog/how-to-sign-in-with-okta-using-capacitor/), [Entra ID](/blog/how-to-sign-in-with-azure-entra-id-using-capacitor/). For the protocol background, see [5 steps to implement OAuth2 in Capacitor apps](/blog/5-steps-to-implement-oauth2-in-capacitor-apps/).

## Hosted backends: Firebase and Supabase

If your data already lives in Firebase or Supabase, use their auth so security rules and row-level security work without extra glue.

- **Supabase**: get an ID token with the Social Login plugin and call `supabase.auth.signInWithIdToken({ provider: 'google', token })`. Supabase verifies it and returns a session. Full setup: [Supabase with Capacitor Social Login](/blog/setup-supabase-with-capacitor-social-login/).
- **Firebase**: either use `@capgo/capacitor-firebase-authentication`, which wraps the native Firebase Auth SDKs, or get an ID token with Social Login and create a Firebase credential from it in the JS SDK. See the [Firebase Google login docs](/docs/plugins/social-login/firebase/introduction/).

## Self-hosted: Better Auth

Better Auth is an open-source TypeScript auth library that stores users in your own database. It works in Capacitor once you trust the app origins and switch to bearer tokens, because cross-site cookies are unreliable in WKWebView. Social login goes through the native plugin and an ID token handoff. Step-by-step: [How to use Better Auth in Capacitor apps](/blog/how-to-use-better-auth-in-capacitor-apps/).

## Passkeys

Passkeys replace passwords with a key pair stored in iCloud Keychain or Google Password Manager. They need your app to be associated with your website domain (`apple-app-site-association` on iOS, `assetlinks.json` on Android) and a WebAuthn server.

`@capgo/capacitor-passkey` lets you keep standard WebAuthn code. Configure the relying party in `capacitor.config.ts`, call the shim once at startup, and `navigator.credentials.create()` and `.get()` are routed to the native passkey APIs:

```typescript
import { CapacitorPasskey } from '@capgo/capacitor-passkey';

await CapacitorPasskey.autoShimWebAuthn();

// existing WebAuthn code keeps working
const assertion = await navigator.credentials.get({
  publicKey: requestOptionsFromServer,
});
```

Libraries like Better Auth, and hosted providers like Auth0 and Okta, can act as the WebAuthn server. See the [passkey plugin page](/plugins/capacitor-passkey/).

## Email and password with your own backend

No plugin is needed, it is just `fetch`. The work is on the server: hash with Argon2id or bcrypt, rate-limit login attempts, send verification and reset emails, and support account deletion. Open reset and verification links in the app with Universal Links and App Links, so the link lands in the right place on a phone. Unless you have a reason to own all of that, a library like Better Auth or a hosted service gives you the same features with less risk.

## Verify tokens on the server, always

Client-side checks can be bypassed. Whatever the provider, the server must verify the token before creating a session:

```typescript
import { createRemoteJWKSet, jwtVerify } from 'jose';

type IssuerConfig = {
  jwks: ReturnType<typeof createRemoteJWKSet>;
  issuer: string | string[];
  audience: string[];
};

const issuers: Record<'google' | 'apple', IssuerConfig> = {
  google: {
    jwks: createRemoteJWKSet(new URL('https://www.googleapis.com/oauth2/v3/certs')),
    issuer: ['https://accounts.google.com', 'accounts.google.com'],
    audience: ['WEB_CLIENT_ID.apps.googleusercontent.com', 'IOS_CLIENT_ID.apps.googleusercontent.com'],
  },
  apple: {
    jwks: createRemoteJWKSet(new URL('https://appleid.apple.com/auth/keys')),
    issuer: 'https://appleid.apple.com',
    audience: ['com.example.app', 'com.example.app.signin'],
  },
};

export async function verifyIdToken(provider: 'google' | 'apple', idToken: string) {
  const cfg = issuers[provider];
  const { payload } = await jwtVerify(idToken, cfg.jwks, {
    issuer: cfg.issuer,
    audience: cfg.audience,
  });
  return payload; // use payload.sub as the stable provider user ID
}
```

Key users on the provider's `sub` (plus provider name), not on email. Only link accounts by email when the provider marks it verified (`email_verified: true`). Meta's Limited Login tokens do not include that claim.

## Store the session securely

`localStorage` and Capacitor Preferences are plain files. Put long-lived tokens in the Keychain (iOS) or Keystore-encrypted storage (Android). `@capgo/capacitor-native-biometric` has simple `setData`, `getData` and `deleteData` methods for that:

```bash
bun add @capgo/capacitor-native-biometric
bunx cap sync
```

```typescript
import { NativeBiometric } from '@capgo/capacitor-native-biometric';

export const sessionStore = {
  async save(token: string) {
    await NativeBiometric.setData({ key: 'session.token', value: token });
  },
  async load(): Promise<string | null> {
    try {
      const { value } = await NativeBiometric.getData({ key: 'session.token' });
      return value;
    } catch {
      return null;
    }
  },
  async clear() {
    await NativeBiometric.deleteData({ key: 'session.token' }).catch(() => {});
  },
};
```

Keep access tokens short-lived and refresh them with a refresh token or a server session. Our [secure token storage guide](/blog/secure-token-storage-best-practices-for-mobile-developers/) covers rotation and revocation in more depth.

## Biometrics: unlock, not identity

Face ID and fingerprint only prove that the person holding the phone can unlock it. Use them to gate access to a stored session:

```typescript
import { AccessControl, NativeBiometric } from '@capgo/capacitor-native-biometric';

// after a real login, offer biometric unlock
await NativeBiometric.setData({
  key: 'session.refresh',
  value: refreshToken,
  accessControl: AccessControl.BIOMETRY_ANY,
});

// next app start
const { value } = await NativeBiometric.getSecureData({
  key: 'session.refresh',
  reason: 'Unlock your account',
});
// exchange `value` with your server for a fresh access token
```

With `accessControl` set, the OS releases the value only after a successful biometric check, so the protection is enforced by the Keychain or Keystore, not by JavaScript. Pair it with server-side session expiry and, for high-risk apps, root and jailbreak detection. More in [Biometric authentication in Capacitor apps](/blog/biometric-authentication-in-capacitor-apps/).

## Choosing a method

| If you... | Use |
|---|---|
| Ship a consumer app on iOS and Android | Apple + Google via Social Login, plus email or passkeys |
| Sell to companies that use Microsoft 365 | Entra ID via OAuth2 provider |
| Need many enterprise IdPs per customer | Auth0 or Okta as a broker, or several OAuth2 providers by `providerId` |
| Already use Supabase or Firebase | Their auth with native ID token sign-in |
| Want your own user table without a vendor | Better Auth |
| Want passwordless | Passkeys, with a fallback such as email magic link |
| Need fast re-login | Biometric unlock of a stored session, on top of any of the above |

## App Store and Play rules that affect login

- **Apple 4.8 Login Services**: third-party login as the main account system requires an equivalent privacy-focused option. Sign in with Apple satisfies it.
- **Apple 5.1.1(v)**: account creation requires in-app account deletion, and Sign in with Apple tokens should be revoked. See [account deletion compliance](/blog/account-deletion-compliance-apple-guidelines/).
- **Google Play account deletion**: apps with accounts must offer deletion in the app and through a web link declared in Play Console.
- **Reviewer access**: give reviewers a working demo account. If login is SSO only, provide a test tenant user.
- **Xcode 26**: App Store Connect has required builds made with Xcode 26 and the iOS 26 SDK since April 2026, so update before you submit a release that adds new auth capabilities.

## Ship auth changes safely

Auth bugs block every user, so you want to fix them fast. Native changes (entitlements, URL schemes, intent filters) need a store build. Everything in TypeScript, like provider config, scopes, error handling and UI, can be pushed with [Capgo live updates](/live-update/) and rolled back if something breaks. [Capgo Build](/native-build/) produces the signed iOS and Android binaries in the cloud when you do need a new native release.

## Next steps

Pick your provider and follow the matching guide:

- [Sign in with Apple](/blog/how-to-sign-in-with-apple-using-capacitor/)
- [Sign in with Google](/blog/how-to-sign-in-with-google-using-capacitor/)
- [Auth0](/blog/how-to-sign-in-with-auth0-using-capacitor/)
- [Okta](/blog/how-to-sign-in-with-okta-using-capacitor/)
- [Microsoft Entra ID](/blog/how-to-sign-in-with-azure-entra-id-using-capacitor/)
- [Better Auth](/blog/how-to-use-better-auth-in-capacitor-apps/)
- [Social Login plugin documentation](/docs/plugins/social-login/)
