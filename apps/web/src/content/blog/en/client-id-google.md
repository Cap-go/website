---
slug: client-id-google
title: 'Google Client ID: What It Is and How to Create One'
description: 'Learn what a Google OAuth client ID is, where to find it in Google Cloud Console, and how to create Web, Android, and iOS credentials. Fix common sign-in errors.'
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2026-07-03T09:15:23.535Z
updated_at: 2026-11-02T11:15:00.000Z
head_image: 'https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/e3751602-0124-4684-ad22-20a67d988230/client-id-google-guide.jpg'
head_image_alt: 'Google OAuth client ID setup in Google Cloud Console for Web, Android, and iOS apps'
keywords: 'google client id, client id google, oauth 2.0 client id, google cloud console credentials, android client id, apps googleusercontent com client id'
tag: 'Mobile, Capacitor, Guides'
published: true
locale: en
origin: ai
next_blog: ''
faq:
  - question: 'What is a Google client ID?'
    answer: 'A Google OAuth 2.0 client ID is the public identifier Google assigns to your app when you create credentials in Google Cloud Console. It usually ends with .apps.googleusercontent.com. Google uses it to recognize your app during Sign in with Google and other OAuth flows.'
  - question: 'Where do I find my Google client ID in Google Cloud Console?'
    answer: 'Open Google Cloud Console, select your project, then go to Google Auth Platform > Clients or APIs & Services > Credentials. Click your OAuth 2.0 client name. The Client ID field shows the full xxxx.apps.googleusercontent.com value you copy into your app or backend.'
  - question: 'Do Android and iOS OAuth clients include a client secret?'
    answer: 'Usually no. Android, iOS, and other installed app types are public OAuth clients. Google gives you a client ID only because the secret cannot stay hidden on a phone or tablet. Web application clients typically include a client secret for server-side token exchange.'
  - question: 'Why does Supabase or Firebase say at least one client id is required when Google sign-in is enabled?'
    answer: 'The auth provider is turned on but no valid Google OAuth client ID is saved yet. Create the correct client IDs in Google Cloud Console, copy the Web client ID into the provider settings, add the Android and iOS client IDs to those provider settings when you ship native apps, and configure the native clients as required. Save the dashboard only after each ID is filled in.'
  - question: 'What causes DEVELOPER_ERROR or status 10 on Android Google Sign-In?'
    answer: 'Most often the Android OAuth client is missing, or the package name and SHA-1 certificate fingerprint in Google Cloud Console do not match the keystore that signed the APK on the device. Add the Play App Signing SHA-1 if users install from Google Play. Use a Web client ID as the server audience where your SDK requires it.'
  - question: 'Can one Google client ID work for Web, Android, and iOS?'
    answer: 'No. Google expects a separate OAuth 2.0 client for each application type. Register a Web client for browser flows, an Android client with package name and SHA-1, and an iOS client with your bundle ID. Capacitor apps often use all three even when the product feels like one app.'
  - question: "Do the Web client ID and Android client ID need to be in the same Google Cloud project?"
    answer: "Yes. For Google Sign-In on Android, create the Android client (package name and SHA-1) and the Web application client in the same Google Cloud project. The app passes the Web client ID as the server client ID, and Google checks that the Android client belongs to the same project. A mismatch is a common cause of DEVELOPER_ERROR. The Capgo social login plugin docs show the setup."
---
A **Google OAuth client ID** is the public app identifier Google shows as a string ending in `.apps.googleusercontent.com`. You create and manage it in [Google Cloud Console](https://console.cloud.google.com/) under **Google Auth Platform > Clients** or **APIs & Services > Credentials**. That value tells Google which registered app is starting Sign in with Google or requesting OAuth tokens.

You're probably here because Google Sign-In should have been a quick integration, and instead you're staring at a credentials screen wondering why one app type gives you a client secret and another doesn't. That confusion is normal, especially if you're building with Capacitor, Ionic, Electron, or a mixed web and native stack.

The part most guides skip is the thing that breaks real implementations: **Google Client IDs are platform-specific**, and non-web app types often **don't** get a client secret by design. If you create the wrong credential just to force a secret into the flow, you usually end up with a broken OAuth setup that's harder to debug than it should be.

## Table of Contents
- [Prerequisite: OAuth consent screen](#prerequisite-oauth-consent-screen)
- [How to create an OAuth 2.0 client ID](#how-to-create-an-oauth-20-client-id)
  - [Web application client](#web-application-client)
  - [Android client (package name and SHA-1)](#android-client-package-name-and-sha-1)
  - [iOS client (bundle ID)](#ios-client-bundle-id)
- [Where to find an existing client ID](#where-to-find-an-existing-client-id)
- [Client ID vs client secret](#client-id-vs-client-secret)
- [What Is a Google Client ID](#what-is-a-google-client-id)
- [Platform-Specific Client ID Configurations](#platform-specific-client-id-configurations)
- [Securing Your Google API Credentials](#securing-your-google-api-credentials)
- [Troubleshooting Common Client ID Errors](#troubleshooting-common-client-id-errors)
- [FAQ](#faq)

<a id="prerequisite-oauth-consent-screen"></a>
## Prerequisite: OAuth consent screen

Before Google lets you create OAuth clients, the project must register the app for Google Auth. Google prompts you to complete this when you open **Google Auth Platform > Clients** for the first time.

Typical steps:

1. Open [Google Cloud Console](https://console.cloud.google.com/) and select the project that will own sign-in.
2. Go to **Google Auth Platform** (or **APIs & Services > OAuth consent screen** in older navigation).
3. Choose **External** or **Internal** user type, then fill in the app name, support email, and developer contact.
4. Add the scopes your app will request (for basic sign-in, `email` and `profile` are common).
5. Save and continue through the consent screen workflow until the app is registered.

The application name on this screen is what users see on the Google permission prompt. It should match the app they installed, not an internal codename.

<a id="how-to-create-an-oauth-20-client-id"></a>
## How to create an OAuth 2.0 client ID

Google documents the flow on the [Manage OAuth Clients](https://support.google.com/cloud/answer/15549257?hl=en) help page. Both of these entry points work:

1. **Google Auth Platform > Clients** (then **CREATE CLIENT**)
2. **APIs & Services > Credentials** (then **Create credentials > OAuth client ID**)

Select or create a Cloud project first. Do not scatter auth credentials across unrelated projects.

![A person typing on a laptop displaying the Google Cloud console for creating OAuth 2.0 client credentials.](https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/56b73f11-08eb-4d9e-92ea-50de2c523c2b/client-id-google-api-credentials.jpg)

<a id="web-application-client"></a>
### Web application client

Use this type for browser apps and for the **Web client ID** many mobile SDKs expect as a server audience.

1. Click **CREATE CLIENT** (or create an **OAuth client ID** from Credentials).
2. Choose **Web application** as the application type.
3. Set **Authorized JavaScript origins** to each origin that runs your sign-in UI (scheme, host, and port must match exactly). Use `http://localhost:<port>` for local development. Production origins must use HTTPS except for localhost, per Google's rules.
4. Set **Authorized redirect URIs** to each callback URL your server or SPA uses after Google redirects back.
5. Click **Create**. Copy the **Client ID** and store the **Client secret** securely. Google may show the secret only once.

For Capacitor hybrid apps, the Web client ID often backs token verification even when sign-in runs through native SDKs. See [How to Sign In with Google Using Capacitor](/blog/how-to-sign-in-with-google-using-capacitor/) for the full mobile wiring.

<a id="android-client-package-name-and-sha-1"></a>
### Android client (package name and SHA-1)

Android OAuth clients tie Google Sign-In to your **package name** and the **SHA-1** of the signing certificate.

1. Click **CREATE CLIENT** and choose **Android**.
2. Enter the **Package name** from your app (for example `com.example.app`, matching `applicationId` in Gradle).
3. Get the **SHA-1 certificate fingerprint** for the keystore that signs the build you are testing:

   ```bash
   keytool -list -v -keystore path-to-debug-or-production-keystore -alias your-key-alias
   ```

   For the default debug keystore, Google notes the password is often `android` and the path is commonly `~/.android/debug.keystore`.

4. Paste the SHA-1 into the form and click **Create**.
5. Copy the Android **Client ID**. Google typically does **not** issue a client secret for this type.

If the app is on Google Play, also register the **Play App Signing** SHA-1 from Play Console **App integrity**. Play re-signs releases with a different key than your upload keystore.

<a id="ios-client-bundle-id"></a>
### iOS client (bundle ID)

1. Click **CREATE CLIENT** and choose **iOS**.
2. Enter the **Bundle ID** from Xcode (the same value as `CFBundleIdentifier` in `Info.plist`, for example `com.example.app`).
3. Optionally add **App Store ID** and **Team ID** when Google asks for them.
4. Click **Create** and copy the iOS **Client ID**.

Use this client with native iOS Google Sign-In or with [@capgo/capacitor-social-login](/docs/plugins/social-login/) when you configure Apple and Google providers for Capacitor.

This walkthrough is a decent visual reference if you want to compare the UI while you click through:

<iframe width="100%" style="aspect-ratio: 16 / 9;" src="https://www.youtube.com/embed/iCOKS0XTizw" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen title="Video walkthrough of creating a Google OAuth client ID"></iframe>

<a id="where-to-find-an-existing-client-id"></a>
## Where to find an existing client ID

After creation, open **Google Auth Platform > Clients** or **APIs & Services > Credentials**. Each row lists OAuth 2.0 Client IDs by name and type. Open a client to copy its **Client ID** string (`xxxx.apps.googleusercontent.com`). Web clients also show **Client secret** management on the same detail page.

> The consent screen isn't decoration. It's part of the trust boundary. Users see your application name there, not your internal project nickname.

<a id="client-id-vs-client-secret"></a>
## Client ID vs client secret

| Credential | Who sees it | Typical use |
|---|---|---|
| **Client ID** | Public. Safe to embed in apps and frontends. | Identifies your app to Google in every OAuth flow. |
| **Client secret** | Confidential. Server or CI only. | Proves your backend owns the Web OAuth client during code-for-token exchange. |

Google classifies **Web application** clients that run on your servers as **private** clients that may use a secret. **Android**, **iOS**, and other **installed** clients are **public** clients. Google intentionally omits a secret because users can extract anything shipped in an APK or IPA.

Do not create a Web client for a mobile app just to obtain a secret. That mismatch causes `invalid_client`, DEVELOPER_ERROR, and confusing token audience errors later.

<a id="what-is-a-google-client-id"></a>
## What Is a Google Client ID

A **Google OAuth 2.0 client ID** is the public identifier for your application in Google's auth system. Google describes it as the unique username for an application when requesting access tokens from Google authentication endpoints, and notes that it's distinct from API keys because it's used in OAuth flows to verify the app's identity during token exchange, as explained in [Google Cloud's OAuth client documentation](https://support.google.com/cloud/answer/15549257?hl=en).

![A diagram explaining that a Google Client ID acts as a unique identifier and security layer for applications.](https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/2e5ac3bc-f2b6-4225-b713-eb7dc8c20141/client-id-google-client-id.jpg)

Think of the **client id Google** issues as your app's **public username**.

It tells Google, “this request is coming from this registered application.” That matters during sign-in, consent, token exchange, and any flow where your app asks to act on behalf of a user. The client ID is meant to be referenced by both your app and Google's auth servers.

What trips people up is that this credential sits next to two other concepts that are not interchangeable.

> **Client ID** identifies the app in OAuth.  
> **API key** identifies a project for certain API calls that don't involve delegated user authorization.  
> **Client secret** is the confidential counterpart used only in flows and app types that can safely keep secrets.

A lot of broken integrations start when someone treats these as variations of the same thing. They aren't.

If you need **Sign In With Google** or **One Tap**, the client ID is the value your frontend uses to initiate the authentication handshake. Google's documentation also notes that the app must be registered in a dedicated Cloud Console project before the credential can be generated, and that web apps require configured authorized JavaScript origins or redirect URIs with the full scheme and hostname.

For teams building hybrid apps, the safest mental model is this:

- **Use the client ID to identify the app**
- **Use the consent screen to represent the app to the user**
- **Use the correct app type to determine whether a secret belongs in the flow**

If you want a broader primer on how app identity and delegated access fit together, [this guide to app authorization](https://capgo.app/blog/app-authorization/) is a good refresher. For OAuth2 in Capacitor end-to-end, see [OAuth2 in Capacitor apps](https://capgo.app/blog/5-steps-to-implement-oauth2-in-capacitor-apps/).

<a id="platform-specific-client-id-configurations"></a>
## Platform-Specific Client ID Configurations

The fastest way to break a Google login setup is to assume one client ID can cover every platform. It can't. For multi-platform apps, each platform must register its own distinct OAuth 2.0 client ID, and Android setup specifically requires the SHA1 fingerprint to verify ownership, as noted in [Google's Android client instructions](https://support.google.com/cloud/answer/15549257?hl=en).

Your product may be one app to the user, but it's multiple OAuth clients to Google.

A **web app**, an **Android build**, an **iOS build**, and a **desktop app** don't present the same security properties. Google handles that by giving each platform its own app registration model.

Here's the practical split to follow:

- **Web** uses a web client ID and strict origin and redirect URI matching.
- **Android** uses an Android client ID tied to the package identity and SHA1 fingerprint.
- **iOS** uses an iOS client ID tied to the app's bundle identity.
- **Desktop or Electron** often uses an installed or desktop-style OAuth pattern rather than a secret-backed browser flow.

### Google Client ID types compared

| Application Type | Primary Identifier | Provides Client Secret? | Key Use Case |
|---|---|---|---|
| Web | Authorized JavaScript origins and redirect URIs | Usually yes | Browser apps and backend-assisted web OAuth |
| Android | Package identity plus SHA1 fingerprint | Often no | Native Android sign-in |
| iOS | App bundle identity | Often no | Native iPhone and iPad sign-in |
| Desktop | Installed app identity | Often no | Desktop apps, including Electron-style native flows |

### The client secret paradox for mobile and desktop

Mobile and desktop developers often expect every OAuth client to come with both a **client ID** and a **client secret**. Then they create a **Web Application** credential because that's the only way they can see a secret in the console.

According to Google's OAuth client guidance, non-web application types such as Android, iOS, and installed apps often receive a client ID but no client secret intentionally, because Google doesn't want a confidential secret embedded in client-side software where users can extract it.

For Capacitor teams, this usually shows up in one of two bad patterns:

1. The app launches a browser-based flow using a **web client** and then tries to behave like a confidential server.
2. The app sends a **client secret** from bundled code, which defeats the point of having a secret.

The better approach is to treat mobile and desktop apps as **public clients**. If your backend is involved, keep confidential operations on the backend and keep the native app limited to what a public client should do.

Another subtle point matters for Firebase-backed Android sign-in. In that setup, the **web application type client ID** is used as the backend server's OAuth client ID, while the Android app keeps its own platform-specific identity. They serve different roles.

If you remember one rule, use this one: **choose the client type that matches where the code runs, not the credential shape you wish you had**.

<a id="securing-your-google-api-credentials"></a>
## Securing Your Google API Credentials

Most OAuth incidents aren't caused by complex attacks. Teams leak credentials, over-broaden redirect settings, or put secrets into places where they were never safe to begin with.

Google's OAuth guidance treats **client secrets** as confidential credentials that belong on servers you control. **Client IDs** are public identifiers, but you should still register them carefully. For web apps, Google enforces the client ID against pre-registered redirect URIs. If the redirect URI doesn't strictly match, Google rejects the request.

![A professional developer sitting at a desk reviewing security credentials on dual computer monitors in office.](https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/9e923993-ab70-4498-b539-55762242a757/client-id-google-software-developer.jpg)

If you only do a few things right, do these:

- **Never ship a client secret in app code.** Web bundles, mobile binaries, and Electron packages are inspectable by users.
- **Register exact redirect URIs.** Close enough isn't enough. Google validates strict matches for web flows.
- **Keep origins tight.** Don't authorize broad domains just to get past setup friction.
- **Separate platform credentials.** Don't let convenience push Android, iOS, and web into one credential.

The teams that stay out of trouble treat OAuth credentials like any other production secret. They keep web client secrets on the backend, inject them through environment management, and audit who has console access. If you're cleaning up your release pipeline, this guide on [managing secrets in CI/CD pipelines](https://capgo.app/blog/managing-secrets-in-cicd-pipelines/) is worth applying to your auth setup too.

<a id="troubleshooting-common-client-id-errors"></a>
## Troubleshooting Common Client ID Errors

Most Google OAuth failures come from a small set of setup mistakes. The error text isn't always kind, but the underlying issue is usually straightforward once you know where to look.

**`redirect_uri_mismatch`**

Your app is sending a redirect URI that doesn't exactly match what's registered for that web client. Check the scheme, host, path, and any trailing differences.

**`invalid_client`**

This usually means the app is sending the wrong client ID, the wrong secret for that client, or mixing credentials across platforms.

**`origin_mismatch` (JavaScript flows)**

The page origin is not listed under **Authorized JavaScript origins** for the Web client.

**At least one client id is required when Google sign-in is enabled (Supabase, Firebase, and similar dashboards)**

The provider toggle is on but the **Web client ID** field is empty or pasted from the wrong project. Create OAuth clients in Google Cloud Console, paste the Web client ID into the provider settings, add the Android and iOS client IDs to the Supabase provider settings when you ship those platforms, configure the native clients, then save. For Supabase plus Capacitor, follow [Capacitor social login setup with Supabase](https://capgo.app/blog/setup-supabase-with-capacitor-social-login/).

**DEVELOPER_ERROR, error 10, or sign-in works in debug but fails in production on Android**

The Android OAuth client is missing or the **package name / SHA-1** pair does not match the keystore that signed the APK users run. Add the Play App Signing certificate fingerprint for store builds. Confirm your plugin uses the **Web client ID** where the SDK expects a server client ID, as described in the [Capgo Social Login docs](/docs/plugins/social-login/).

**Google Sign-In works on web but fails on mobile**

Inspect the client type first. A web credential cannot replace an Android or iOS client for native flows.

**Consent screen looks wrong**

Verify the application name and branding on the OAuth consent screen in Google Cloud Console.

The practical debugging order is simple: **check client type first, then redirect settings, then platform identifiers, then whether a secret belongs in the flow at all**.

<a id="faq"></a>
## FAQ


### Do the Web client ID and Android client ID need to be in the same Google Cloud project?

Yes. For Google Sign-In on Android, create the Android client (package name and SHA-1) and the Web application client in the same Google Cloud project. The app passes the Web client ID as the server client ID, and Google checks that the Android client belongs to the same project. A mismatch is a common cause of DEVELOPER_ERROR. The [Capgo social login plugin](/docs/plugins/social-login/) docs show the setup.

### What is a Google client ID?

It is the public OAuth 2.0 identifier Google assigns when you create credentials for your app. It usually looks like `123456789012-abcdefg.apps.googleusercontent.com`. Google uses it whenever your app starts Sign in with Google or exchanges authorization codes for tokens.

### Where do I find my Google client ID?

In Google Cloud Console, open **Google Auth Platform > Clients** or **APIs & Services > Credentials**, then open your OAuth 2.0 client. The **Client ID** field contains the full string to copy.

### Do Android and iOS clients include a client secret?

Typically no. Installed apps are public OAuth clients. Only use a client secret on a server you control, usually with a **Web application** OAuth client.

### Why does my backend say at least one client id is required?

Google sign-in is enabled in the dashboard but no client ID is saved. Create the OAuth clients in Google Cloud Console and paste at least the Web client ID into the provider configuration before you enable the feature for users.

### What fixes DEVELOPER_ERROR on Android?

Register an Android OAuth client with the correct package name and SHA-1 for the signing key on the device. If you distribute through Google Play, include the Play App Signing SHA-1. Match the Web client ID to what your auth SDK expects.

### Can I reuse one client ID on every platform?

No. Create separate OAuth clients for Web, Android, and iOS. Capacitor apps commonly configure all three even when users see a single product.

---

If your team ships Capacitor or Electron apps, auth bugs rarely stay isolated. They usually surface alongside release pressure, rollback needs, and environment-specific fixes. [Capgo](https://capgo.app/) helps teams ship targeted updates to app code and assets without waiting on store review, which makes it much easier to correct login flows, callback handling, and client-side auth issues when they slip into production.
