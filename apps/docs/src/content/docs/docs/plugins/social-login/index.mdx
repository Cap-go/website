---
title: "@capgo/capacitor-social-login"
description: "All social logins in one plugin for Web, iOS, and Android."
tableOfContents: true
next: false
prev: false
sidebar:
  order: 1
  label: "Introduction"
hero:
  tagline: "All social logins in one plugin."
  actions:
    - text: Get started
      link: /docs/plugins/social-login/getting-started/
      icon: right-arrow
      variant: primary
    - text: GitHub
      link: https://github.com/Cap-go/capacitor-social-login/
      icon: external
      variant: minimal
---

import YouTubeEmbed from '@/components/YouTubeEmbed.astro';

## Overview

`@capgo/capacitor-social-login` is the all-in-one social authentication plugin for Web, iOS, and Android.

It implements:

- Google Sign-In with Android Credential Manager
- Sign in with Apple, including OAuth on Android
- Facebook Login with the current Facebook SDK
- Twitter/X through OAuth 2.0
- Generic OAuth2 and OIDC providers, including GitHub, Microsoft Entra ID, Auth0, Okta, Keycloak, and other compliant servers

It is also the Capgo migration path for apps moving from Ionic Appflow Social Login or Ionic Auth Connect.

## Fork and migration notes

This plugin started as a fork of `@codetrix-studio/capacitor-google-auth`. The original package is effectively archived, so Capgo maintains this plugin as the supported replacement.

If you are still using `@codetrix-studio/capacitor-google-auth`, follow the [legacy Google Auth migration guide](https://github.com/Cap-go/capacitor-social-login/blob/main/MIGRATION_CODETRIX.md).

If you are migrating from Ionic Auth Connect, use the built-in `SocialLoginAuthConnect` wrapper for the `auth0`, `azure`, `cognito`, `okta`, and `onelogin` provider names:

- [Ionic Auth Connect migration](/docs/plugins/social-login/migrations/ionic-auth-connect/)
- [Auth Connect compatibility guide](https://github.com/Cap-go/capacitor-social-login/blob/main/docs/auth_connect_compatibility.md)
- [Keycloak setup](/docs/plugins/social-login/integrations/keycloak/)

## Compatibility

| Plugin version | Capacitor compatibility | Maintained |
| --- | --- | --- |
| v8.x | v8.x | Yes |
| v7.x | v7.x | On demand |
| v6.x | v6.x | No |
| v5.x | v5.x | No |

The major version of this plugin follows the major version of Capacitor. For example, use plugin v8 with Capacitor 8. Only the latest major version is actively maintained.

## Video Walkthrough

Watch a quick demo of the plugin setup and login flow in action.

<YouTubeEmbed id="iTINYxvSJrE" title="Capgo Social Login plugin overview" />

## Core Capabilities

- `initialize` - Initialize the plugin.
- `login` - Login with the selected provider.
- `logout` - Logout.
- `isLoggedIn` - IsLoggedIn.

## Public API

| Method | Description |
| --- | --- |
| `initialize` | Initialize the plugin. |
| `login` | Login with the selected provider. |
| `logout` | Logout. |
| `isLoggedIn` | IsLoggedIn. |
| `getAuthorizationCode` | Get the current authorization code. |
| `refresh` | Refresh the access token. |
| `refreshToken` | OAuth2 refresh-token helper for the built-in OAuth2 provider. |
| `handleRedirectCallback` | Web-only: handle the OAuth redirect callback and return the parsed result. |
| `decodeIdToken` | Decode a JWT (typically an OIDC ID token) into its claims. |
| `getAccessTokenExpirationDate` | Convert an access token expiration timestamp (milliseconds since epoch) to an ISO date string. |
| `isAccessTokenAvailable` | Check if an access token is available (non-empty). |
| `isAccessTokenExpired` | Check if an access token is expired. |
| `isRefreshTokenAvailable` | Check if a refresh token is available (non-empty). |
| `providerSpecificCall` | Execute provider-specific calls. |
| `getPluginVersion` | Get the native Capacitor plugin version. |
| `openSecureWindow` | Opens a secured window for OAuth2 authentication. For web, you should have the code in the redirected page to use a broadcast channel to send the redirected url to the app Something like: ```html <html> <head></head> <body> <script> const searchParams = new URLSearchParams(location.search) if (searchParams.has("code")) { new BroadcastChannel("my-channel-name").postMessage(location.href); window.close(); } </script> </body> </html> ``` For mobile, you should have a redirect uri that opens the app, something like: `myapp://oauth_callback/` And make sure to register it in the app's info.plist: ```xml <key>CFBundleURLTypes</key> <array> <dict> <key>CFBundleURLSchemes</key> <array> <string>myapp</string> </array> </dict> </array> ``` And in the AndroidManifest.xml file: ```xml <activity> <intent-filter> <action android:name="android.intent.action.VIEW" /> <category android:name="android.intent.category.DEFAULT" /> <category android:name="android.intent.category.BROWSABLE" /> <data android:host="oauth_callback" android:scheme="myapp" /> </intent-filter> </activity> ```. |

## Source Of Truth

This reference is synced from `src/definitions.ts` in [capacitor-social-login](https://github.com/Cap-go/capacitor-social-login/).

## Keep going from @capgo/capacitor-social-login

If you are using **@capgo/capacitor-social-login** to plan authentication and account flows, connect it with [Using @capgo/capacitor-social-login](/plugins/capacitor-social-login/) for the native capability in Using @capgo/capacitor-social-login, [@capgo/capacitor-passkey](/docs/plugins/passkey/) for the implementation detail in @capgo/capacitor-passkey, [@capgo/capacitor-native-biometric](/docs/plugins/native-biometric/) for the implementation detail in @capgo/capacitor-native-biometric, [Two-factor authentication](/docs/webapp/mfa/) for the implementation detail in Two-factor authentication, and [SSO (Enterprise)](/docs/webapp/enterprise-sso/) for the implementation detail in SSO (Enterprise).
