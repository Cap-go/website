---
slug: how-to-use-better-auth-in-capacitor-apps
title: "How to Use Better Auth in Capacitor Apps (2026 Guide)"
description: "Use Better Auth in a Capacitor 8 app: trusted origins, bearer tokens instead of cookies, email and password, native Google and Apple sign-in, and fixes."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-10-01T09:00:00.000Z
updated_at: 2026-10-01T09:00:00.000Z
head_image: /signup.webp
head_image_alt: "Sign-up screen of a Capacitor app backed by Better Auth"
keywords: better auth capacitor, better-auth ionic, better auth mobile app, better auth bearer plugin, capacitor authentication self hosted, better auth google sign in capacitor, better auth apple sign in
tag: Tutorial, Security, Capacitor
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "Does Better Auth work in Capacitor without changes?"
    answer: "The client SDK runs in the WebView, but two things need setup. Better Auth rejects requests from origins it does not trust, so add capacitor://localhost and https://localhost to trustedOrigins. And session cookies set by a different domain are unreliable in WKWebView, so use the bearer plugin and send the session token in the Authorization header."
  - question: "Can I call authClient.signIn.social for Google inside the app?"
    answer: "Not with the default redirect flow. Google blocks OAuth in embedded WebViews with disallowed_useragent, and the redirect would navigate your app away from its bundle. Use a native sign-in plugin to get an ID token, then pass it to signIn.social with the idToken option."
  - question: "Where should I store the Better Auth session token on mobile?"
    answer: "In the iOS Keychain or Android Keystore rather than localStorage. The setData and getData methods of @capgo/capacitor-native-biometric store strings encrypted at rest, and you can keep a copy in memory for the auth client's token getter."
  - question: "Is Better Auth a good choice for enterprise SSO like Okta or Entra ID?"
    answer: "It can be. Better Auth's Generic OAuth plugin supports any OIDC provider. On native platforms the redirect has to run in the system browser and come back to the app with a deep link, which takes more wiring than social ID token sign-in. If you only need SSO and no user database, signing in directly with the provider can be simpler."
---

To use Better Auth in a Capacitor app, install the `better-auth` client in your web code, point it at your Better Auth server, add the Capacitor origins (`capacitor://localhost` on iOS, `https://localhost` on Android) to `trustedOrigins`, and switch from cookies to bearer tokens with the `bearer` plugin. Email and password works through the SDK as-is. For Google and Apple, get an ID token with a native plugin such as `@capgo/capacitor-social-login` and hand it to `authClient.signIn.social({ idToken })`.

This guide shows the server and client setup, token storage, social sign-in, enterprise providers, and the errors people hit when they move a Better Auth web app into Capacitor 8.

## What changes when Better Auth runs inside Capacitor

A Capacitor app is a web app served from a local origin inside a native WebView. Compared to a normal website, three things are different:

| Topic | On a website | In a Capacitor app |
|---|---|---|
| Origin | `https://app.example.com` | `capacitor://localhost` (iOS), `https://localhost` (Android) |
| Auth server | Often same site, cookies just work | Different domain, third-party cookies are blocked by WKWebView |
| OAuth redirects | Full-page redirect is fine | Redirect leaves your bundled app, Google blocks WebViews |

The fixes are: trust the Capacitor origins, use bearer tokens, and use native plugins for social login.

## Step 1: Configure the Better Auth server

This example uses Hono, but the Better Auth config is the same for Express, Next.js route handlers or any other runtime.

```bash
bun add better-auth hono
```

```typescript
// auth.ts
import { betterAuth } from 'better-auth';
import { bearer } from 'better-auth/plugins';
import { db } from './db'; // your Drizzle, Prisma, Kysely or pg instance

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL, // https://auth.example.com
  database: db,
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_WEB_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    apple: {
      clientId: process.env.APPLE_SERVICE_ID as string,
      clientSecret: process.env.APPLE_CLIENT_SECRET as string,
      appBundleIdentifier: process.env.APPLE_BUNDLE_ID as string, // com.example.app
    },
  },
  trustedOrigins: [
    'capacitor://localhost', // iOS WebView
    'https://localhost', // Android WebView (androidScheme https, the default)
    'https://app.example.com', // your web build
    'https://appleid.apple.com',
  ],
  plugins: [bearer()],
});
```

`appBundleIdentifier` matters for Apple. Tokens from the native iOS sheet carry your bundle ID as audience, while web and Android tokens carry the Services ID. Better Auth uses this field to accept both.

Mount the handler and allow CORS from the app origins. Expose the `set-auth-token` header, otherwise the client never sees the bearer token:

```typescript
// server.ts
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { auth } from './auth';

const app = new Hono();

app.use(
  '/api/auth/*',
  cors({
    origin: ['capacitor://localhost', 'https://localhost', 'https://app.example.com'],
    allowHeaders: ['Content-Type', 'Authorization'],
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    exposeHeaders: ['set-auth-token'],
    credentials: true,
  }),
);

app.on(['GET', 'POST'], '/api/auth/*', (c) => auth.handler(c.req.raw));

export default app;
```

Run `bunx @better-auth/cli migrate` (or `generate` for your ORM) to create the tables.

## Step 2: Create the auth client in the app

```bash
bun add better-auth @capgo/capacitor-native-biometric
bunx cap sync
```

Store the session token in the Keychain or Keystore, and keep a copy in memory so the client can read it synchronously:

```typescript
// auth-client.ts
import { createAuthClient } from 'better-auth/client';
import { NativeBiometric } from '@capgo/capacitor-native-biometric';

const TOKEN_KEY = 'session.token';
let sessionToken = '';

export async function loadSessionToken() {
  try {
    const { value } = await NativeBiometric.getData({ key: TOKEN_KEY });
    sessionToken = value;
  } catch {
    sessionToken = '';
  }
}

async function saveSessionToken(token: string) {
  sessionToken = token;
  if (token) {
    await NativeBiometric.setData({ key: TOKEN_KEY, value: token });
  } else {
    await NativeBiometric.deleteData({ key: TOKEN_KEY }).catch(() => {});
  }
}

export const authClient = createAuthClient({
  baseURL: 'https://auth.example.com',
  fetchOptions: {
    auth: {
      type: 'Bearer',
      token: () => sessionToken,
    },
    onSuccess: async (ctx) => {
      const token = ctx.response.headers.get('set-auth-token');
      if (token) await saveSessionToken(token);
    },
  },
});

export async function clearSession() {
  await saveSessionToken('');
}
```

Call `await loadSessionToken()` before your app renders, then `authClient.getSession()` to restore the user:

```typescript
import { authClient, loadSessionToken } from './auth-client';

await loadSessionToken();
const { data: session } = await authClient.getSession();
if (session) {
  console.log('Signed in as', session.user.email);
}
```

If you use React, Vue, Svelte or Solid, import `createAuthClient` from the matching subpath (`better-auth/react`, `better-auth/vue`, ...) to get the `useSession` hook. The `fetchOptions` stay the same. The `setData` and `getData` methods are native only. On web, fall back to cookies or `sessionStorage` using `Capacitor.isNativePlatform()`.

## Step 3: Email and password

No plugin needed. These are plain HTTP calls.

```typescript
import { authClient, clearSession } from './auth-client';

export async function signUp(email: string, password: string, name: string) {
  const { data, error } = await authClient.signUp.email({ email, password, name });
  if (error) throw new Error(error.message);
  return data;
}

export async function signIn(email: string, password: string) {
  const { data, error } = await authClient.signIn.email({ email, password });
  if (error) throw new Error(error.message);
  return data;
}

export async function signOut() {
  await authClient.signOut();
  await clearSession();
}
```

For email verification and password reset, Better Auth sends links that open a URL. Point `callbackURL` at a page on your domain that is also configured as an iOS Universal Link and Android App Link, so the link opens the app on phones and the website elsewhere.

## Step 4: Native Google sign-in

Configure Google as described in [How to sign in with Google using Capacitor](/blog/how-to-sign-in-with-google-using-capacitor/), then:

```typescript
import { SocialLogin } from '@capgo/capacitor-social-login';
import { authClient } from './auth-client';

await SocialLogin.initialize({
  google: {
    webClientId: 'WEB_CLIENT_ID.apps.googleusercontent.com',
    iOSClientId: 'IOS_CLIENT_ID.apps.googleusercontent.com',
    mode: 'online', // Better Auth needs the idToken, offline mode only returns a code
  },
});

export async function signInWithGoogle() {
  const { result } = await SocialLogin.login({ provider: 'google', options: {} });

  if (result.responseType !== 'online' || !result.idToken) {
    throw new Error('Google did not return an ID token');
  }

  const { data, error } = await authClient.signIn.social({
    provider: 'google',
    idToken: {
      token: result.idToken,
      accessToken: result.accessToken?.token,
    },
  });
  if (error) throw new Error(error.message);
  return data;
}
```

Better Auth verifies the token against Google's keys and the configured client ID, creates or links the user, and returns a session. The bearer token arrives in the `set-auth-token` header and your `onSuccess` hook stores it.

## Step 5: Native Apple sign-in

Configure Apple as described in [How to sign in with Apple using Capacitor](/blog/how-to-sign-in-with-apple-using-capacitor/). Generate a nonce, pass it to Apple, and send the same value to Better Auth:

```typescript
import { SocialLogin } from '@capgo/capacitor-social-login';
import { authClient } from './auth-client';

export async function signInWithApple() {
  const nonce = crypto.randomUUID();

  const { result } = await SocialLogin.login({
    provider: 'apple',
    options: { scopes: ['email', 'name'], nonce },
  });

  if (!result.idToken) throw new Error('Apple did not return an ID token');

  const { data, error } = await authClient.signIn.social({
    provider: 'apple',
    idToken: {
      token: result.idToken,
      nonce,
      accessToken: result.accessToken?.token,
    },
  });
  if (error) throw new Error(error.message);
  return data;
}
```

Apple only shares the user's name on the first authorization. If you want it on the user record, update the profile right after the first sign-in with `result.profile.givenName` and `familyName`.

Facebook follows the same pattern. On iOS with Limited Login you get an `idToken`, elsewhere you pass the access token. The [Better Auth integration page](/docs/plugins/social-login/better-auth/) has the full Facebook example.

## Step 6: Okta, Auth0, Entra ID and other OIDC providers

Better Auth's `genericOAuth` plugin ships helpers for Auth0, Okta, Keycloak and Microsoft Entra ID, plus manual config for any OIDC server. On the web build, `authClient.signIn.oauth2({ providerId })` works as on any site.

On iOS and Android the flow needs the system browser, because the provider login page must not load inside your WebView. The pattern that works:

1. The app opens your Better Auth sign-in URL in the system browser (for example with `SocialLogin.openSecureWindow` or an in-app browser plugin).
2. Better Auth runs the OAuth dance with the provider and creates the session on the server.
3. Your callback page converts that session into a short-lived one-time token (Better Auth has a `oneTimeToken` plugin for this) and redirects to a deep link such as `com.example.app://auth?token=...`.
4. The app verifies the one-time token with the auth client and receives a normal bearer session.

That is more moving parts than the ID token handoff. If you only need enterprise SSO and do not need Better Auth's user database, signing in directly against the provider is simpler, see the [Okta](/blog/how-to-sign-in-with-okta-using-capacitor/), [Auth0](/blog/how-to-sign-in-with-auth0-using-capacitor/) and [Entra ID](/blog/how-to-sign-in-with-azure-entra-id-using-capacitor/) guides.

## Step 7: Protect your API with the session

Your own API can read the session from the bearer token with Better Auth's server API:

```typescript
import { Hono } from 'hono';
import { auth } from './auth';

const api = new Hono();

api.get('/me/orders', async (c) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  if (!session) return c.json({ error: 'unauthorized' }, 401);
  return c.json(await listOrders(session.user.id));
});
```

The bearer plugin makes `getSession` accept `Authorization: Bearer <token>` the same way it accepts the cookie.

## Troubleshooting

| Problem | Cause | Fix |
|---|---|---|
| `Invalid origin` or 403 on sign-in | Capacitor origin not trusted | Add `capacitor://localhost` and `https://localhost` to `trustedOrigins` |
| CORS error in the WebView console | Server CORS does not list the app origins | Add them to your CORS middleware, allow `Authorization` |
| Sign-in succeeds but `getSession` returns `null` | Relying on cookies across domains | Use the bearer plugin and send the token |
| `set-auth-token` is always `null` | Header not exposed | Add `exposeHeaders: ['set-auth-token']` to CORS |
| Google: `disallowed_useragent` | OAuth page loaded in the WebView | Use native sign-in and the `idToken` handoff |
| Google ID token rejected | Audience does not match the configured client ID | Decode the token with `SocialLogin.decodeIdToken` and compare `aud` with `clientId` |
| Apple ID token rejected on iOS | Audience is the bundle ID | Set `appBundleIdentifier` in the Apple provider |
| Apple nonce error | Different nonce sent to Apple and Better Auth | Generate once, reuse the same value |
| Session lost after app restart | Token kept only in memory | Persist with `setData` and load it before the first request |

## Deploying the mobile side

Auth changes are rarely native. Trusted origins and providers are server config, and the client code is TypeScript, so most fixes can ship through [Capgo live updates](/live-update/) instead of a store release. You only need a new binary when you add a native plugin or change URL schemes.

## Related guides

- [How to add authentication to a Capacitor app](/blog/how-to-add-authentication-to-a-capacitor-app/) compares Better Auth with Firebase, Supabase and hosted identity providers.
- [Biometric authentication in Capacitor apps](/blog/biometric-authentication-in-capacitor-apps/) for unlocking a stored session with Face ID or fingerprint.
- [Social Login plugin](/plugins/capacitor-social-login/) for the native Google, Apple and Facebook flows.
