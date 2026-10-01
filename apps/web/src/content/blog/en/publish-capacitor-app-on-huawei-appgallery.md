---
slug: publish-capacitor-app-on-huawei-appgallery
title: "How to Publish a Capacitor App on Huawei AppGallery"
description: "Publish a Capacitor app on Huawei AppGallery: developer registration, Google Play services audit, HMS fallbacks, APK signing, listing assets and review tips."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-10-01T09:00:00.000Z
updated_at: 2026-10-01T03:59:51.000Z
head_image: /capacitor.webp
head_image_alt: "Capacitor app published on Huawei AppGallery"
keywords: huawei appgallery, publish app on appgallery, capacitor huawei, appgallery connect, hms core, huawei without google play services, huawei push kit capacitor, appgallery apk upload
tag: Android, Capacitor, Tutorial
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "Can I publish a Capacitor app on Huawei AppGallery?"
    answer: "Yes. AppGallery accepts the same signed APK or Android App Bundle you build for Google Play. Capacitor's core has no Google Play services dependency, so the work is checking which of your plugins rely on Google services and hiding or replacing those features on Huawei devices."
  - question: "Does it cost anything to publish on AppGallery?"
    answer: "No. Registering a HUAWEI Developers account and publishing apps on AppGallery is free. You only need to pass identity verification as an individual or enterprise."
  - question: "Will Firebase push notifications work on Huawei phones?"
    answer: "Not on Huawei phones without Google Play services. Firebase Cloud Messaging requires Google Play services on the device. Use Huawei Push Kit for those users, or fall back to in-app messaging and email."
  - question: "Do Capgo live updates work on Huawei devices?"
    answer: "Yes. The Capgo updater downloads bundles over HTTPS from your update server and applies them locally, without Google Play services. Only its optional Google Play in-app update helpers depend on the Play Store."
  - question: "Can the same APK go to Google Play and AppGallery?"
    answer: "Yes, with the same package name. Note that Google Play re-signs your app with the Play app signing key, while your AppGallery APK is signed with your own key, so users cannot switch between store versions without reinstalling, and API keys tied to a SHA-256 fingerprint need both fingerprints."
---

You can publish a Capacitor app on Huawei AppGallery with the same Android build you ship to Google Play. Register a free HUAWEI Developers account, check which plugins depend on Google Play services (missing on Huawei phones released since late 2019), hide or replace those features, then upload a signed APK in AppGallery Connect with a listing and wait for review. This guide covers each step, including a small native check you can drop into your app to detect Google Play services without extra dependencies.

## Who should ship on AppGallery

AppGallery is the default store on Huawei phones and tablets. It matters if your users include:

- People in Europe, the Middle East, Africa, Latin America and Southeast Asia using Huawei devices released after the 2019 US trade restrictions, which ship without Google Play services and without the Play Store.
- Enterprise or government customers that standardized on Huawei hardware.

A note on HarmonyOS: Huawei phones sold outside mainland China run EMUI, which is Android-based and installs APKs. Devices in mainland China running HarmonyOS NEXT (HarmonyOS 5 and later) only run native HarmonyOS apps, so an Android APK does not reach them. This guide is about the Android-based AppGallery.

## Step 1: Audit Google Play services dependencies

Capacitor itself only depends on AndroidX and its own Android library. The risk comes from plugins that pull in Google libraries. Look at your dependencies:

```bash
cd android
./gradlew :app:dependencies --configuration releaseRuntimeClasspath \
  | grep -E "com.google.android.gms|com.google.firebase|com.google.android.play|billingclient" \
  | sort -u
```

Then sort them into "works without Google Play services" and "needs Google Play services".

| Dependency | On Huawei without GMS | Typical plugins |
| --- | --- | --- |
| Firebase Cloud Messaging | Does not work | `@capacitor/push-notifications`, Firebase messaging plugins |
| Google Maps SDK | Does not work | `@capacitor/google-maps` |
| Google Sign-In (`play-services-auth`, Credential Manager Google ID) | Does not work | Google provider of `@capgo/capacitor-social-login` |
| Google Play Billing | Does not work | `@capgo/capacitor-native-purchases`, RevenueCat on Android |
| Play In-App Review | Does not work | `@capgo/capacitor-in-app-review` |
| Play In-App Updates | Does not work | Play update helpers in `@capgo/capacitor-updater` |
| Play Integrity | Does not work | App attestation plugins on Android |
| Fused location (`play-services-location`) | Depends on plugin; some fall back to Android's LocationManager | `@capacitor/geolocation`, background geolocation plugins |
| `play-services-tasks`, `play-services-basement` alone | Fine (plain libraries) | Many plugins |
| Firestore, Realtime Database, Storage, Remote Config, Crashlytics, email/password Auth | Work | Firebase plugins |
| Capgo live updates | Work | `@capgo/capacitor-updater` |
| Apple and Facebook login | Work | `@capgo/capacitor-social-login` Apple / Facebook providers |

"Does not work" usually means the call throws or never resolves. It rarely crashes the whole app, but reviewers test on Huawei devices and a dead button or a blank screen is a common rejection reason.

## Step 2: Detect Google Play services at runtime

You can check for Google Play services without adding any Google dependency by asking Android's package manager whether `com.google.android.gms` is installed. Add a tiny local plugin to your Capacitor Android project.

`android/app/src/main/java/com/example/app/ServicesCheckPlugin.java`:

```java
package com.example.app;

import android.content.pm.PackageManager;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "ServicesCheck")
public class ServicesCheckPlugin extends Plugin {

    private boolean isInstalled(String packageName) {
        try {
            getContext().getPackageManager().getPackageInfo(packageName, 0);
            return true;
        } catch (PackageManager.NameNotFoundException e) {
            return false;
        }
    }

    @PluginMethod
    public void getStatus(PluginCall call) {
        JSObject ret = new JSObject();
        ret.put("gms", isInstalled("com.google.android.gms"));
        ret.put("hms", isInstalled("com.huawei.hwid"));
        call.resolve(ret);
    }
}
```

Register it in `MainActivity.java` before `super.onCreate`:

```java
package com.example.app;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(ServicesCheckPlugin.class);
        super.onCreate(savedInstanceState);
    }
}
```

Since Android 11, apps only see other packages they declare. Add a `<queries>` block to `android/app/src/main/AndroidManifest.xml`, inside `<manifest>`:

```xml
<queries>
    <package android:name="com.google.android.gms" />
    <package android:name="com.huawei.hwid" />
</queries>
```

Call it from TypeScript:

```typescript
import { Capacitor, registerPlugin } from '@capacitor/core';

interface ServicesCheckPlugin {
  getStatus(): Promise<{ gms: boolean; hms: boolean }>;
}

const ServicesCheck = registerPlugin<ServicesCheckPlugin>('ServicesCheck');

export async function getMobileServices() {
  if (Capacitor.getPlatform() !== 'android') {
    return { gms: true, hms: false };
  }
  return ServicesCheck.getStatus();
}
```

Package presence is a reasonable proxy. It does not tell you whether Google Play services is up to date or enabled; if you also need that, add `com.google.android.gms:play-services-base` and use `GoogleApiAvailability.isGooglePlayServicesAvailable()`, which works even on devices without GMS.

## Step 3: Degrade gracefully

Use the result to switch features on and off:

```typescript
import { PushNotifications } from '@capacitor/push-notifications';
import { getMobileServices } from './services';

export const features = {
  push: true,
  googleSignIn: true,
  playBilling: true,
  inAppReview: true,
};

export async function initFeatures() {
  const { gms } = await getMobileServices();

  features.push = gms;
  features.googleSignIn = gms;
  features.playBilling = gms;
  features.inAppReview = gms;

  if (features.push) {
    const perm = await PushNotifications.requestPermissions();
    if (perm.receive === 'granted') {
      await PushNotifications.register();
    }
  }
}
```

Practical fallbacks:

- **Sign-in**: hide the Google button and show email, Apple or Facebook login instead. With `@capgo/capacitor-social-login` you initialize only the providers you show.
- **Payments**: Google Play Billing is not available. AppGallery has its own Huawei IAP. If digital purchases are core to your app, either integrate Huawei IAP or ship the AppGallery build without purchases and say so in the listing.
- **Push**: use Huawei Push Kit for HMS devices. There is no official Capacitor plugin; Huawei publishes Cordova plugins under `@hmscore/*` which run in Capacitor, or you can write a small native plugin around the Push Kit SDK.
- **Maps**: use a web map (Leaflet, MapLibre GL JS) inside the WebView, which works on every device, or Huawei Map Kit.
- **Rate the app**: on Huawei, link to your AppGallery page instead of calling the Play review API.
- **Store links**: "Update the app" buttons should open AppGallery (`appmarket://details?id=com.example.app`) on Huawei devices, not the Play Store.

Test on a real Huawei device or Huawei's cloud debugging service. An emulator with Google APIs will hide every one of these issues.

## Step 4: Register a HUAWEI Developers account

1. Create a HUAWEI ID at [developer.huawei.com](https://developer.huawei.com/consumer/en/).
2. Complete **identity verification** as an individual or an enterprise. Individuals typically provide an ID document and bank card details; enterprises provide business registration documents. Review usually takes one to two working days.
3. Pick the account type and country carefully. Huawei does not let you convert an individual account to an enterprise account, and the verified country or region cannot be changed later.

Registration is free.

## Step 5: Create the app in AppGallery Connect

1. Open **AppGallery Connect > My apps > New app**.
2. Platform: **Android**. Device: **Mobile phone** (covers tablets too).
3. App name, default language and package name. The package name must match `appId` in `capacitor.config.ts` and cannot be changed after the first upload.
4. Choose the app category.

## Step 6: Build and sign the release package

AppGallery accepts APK and AAB. The APK route is simpler: you sign it with your own key, and Huawei does not need to hold your signing key.

```bash
bun run build
bunx cap sync android
cd android
./gradlew assembleRelease
```

Configure signing in `android/app/build.gradle` (load passwords from environment variables or `keystore.properties`, never commit them):

```groovy
android {
    signingConfigs {
        release {
            storeFile file(System.getenv("ANDROID_KEYSTORE_PATH") ?: "upload-keystore.jks")
            storePassword System.getenv("ANDROID_KEYSTORE_PASSWORD")
            keyAlias System.getenv("ANDROID_KEY_ALIAS")
            keyPassword System.getenv("ANDROID_KEY_PASSWORD")
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
        }
    }
}
```

The APK is in `android/app/build/outputs/apk/release/`. If you need a keystore, the [Android keystore generator](/tools/android-keystore-generator/) creates one. Keep it safe: every future AppGallery update must be signed with the same key.

If you upload an AAB instead, AppGallery requires its App Signing service, which means Huawei generates and holds the final signing key, the same model as Play App Signing.

A few things to check before upload:

- `versionCode` must increase with every upload.
- The app name in the APK should match the AppGallery listing name.
- If you distribute outside mainland China, provide English (US) as a language in the listing.
- Since September 30, 2026, Android's developer verification applies to apps installed on certified devices in Brazil, Indonesia, Singapore and Thailand. Huawei devices without Google services are not Google-certified, but if the same package also installs from outside Google Play on certified devices, register the package name in the Android Developer Console.

## Step 7: Prepare the listing

AppGallery's listing has its own specs, different from Apple and Google:

| Field | Requirement |
| --- | --- |
| Icon | 216 x 216 PNG (512 x 512 also accepted), no rounded corners added by you |
| Screenshots | 3 to 8, 450 x 800 or 800 x 450 px (or proportionally larger), same orientation |
| Brief introduction | Up to 80 characters |
| Introduction | Up to 8,000 characters |
| Privacy policy URL | Required if the app collects personal data |
| Age rating | Questionnaire in AppGallery Connect |
| Test account | Required if the app has a login |
| Countries / regions | Pick distribution countries explicitly |

Do not reuse screenshots that show the Google Play logo, Android device frames branded by other manufacturers, or "Get it on Google Play" badges. Huawei rejects listings that reference other stores. For the rest of the assets, reuse what you made for the other stores; our [App Store and Google Play listing guide](/blog/how-to-prepare-app-store-and-google-play-listing/) covers them.

## Step 8: Upload, submit and review

1. In **Version information > Draft**, upload the APK under **Software version**.
2. Fill in the listing, rating, privacy and countries.
3. Set the release time (immediately after approval or scheduled).
4. Submit for review.

Review usually takes a few working days. Rejections arrive by email with the guideline reference. The common ones for Capacitor apps:

- **Features that do not work without Google Play services** (login button that does nothing, map screen blank).
- **Duplicate app**: an app with the same package name already exists on AppGallery from another developer, or Huawei previously copied your app from Google Play. Contact Huawei developer support with proof of ownership.
- **Other store references** in screenshots or text.
- **Missing English** for international distribution.
- **Privacy policy** missing or not reachable from inside the app.

AppGallery Connect also has a Publishing API, so you can automate uploads from CI once the first version is live.

## Step 9: Keep updates fast

Every native change goes through Huawei review again, just like the other stores. For JavaScript, HTML and CSS changes, [Capgo live updates](/live-update/) deliver the new bundle directly to installed apps on Huawei, Google and Apple devices with one upload, because the updater fetches bundles from your Capgo endpoint and does not use Google Play services. Use a dedicated channel if your Huawei build has different features:

```bash
bunx @capgo/cli@latest bundle upload --channel huawei
```

Set the default channel for the Huawei build at build time, or assign devices to the channel from your app. The [Capgo updater docs](/docs/plugins/updater/) explain channels and configuration.

## Checklist

- [ ] Dependency audit done, GMS-only features listed
- [ ] Runtime services check added and tested on a real Huawei device
- [ ] Google-only features hidden or replaced (push, sign-in, billing, maps, review)
- [ ] HUAWEI Developers account verified
- [ ] App created with the same package name as `capacitor.config.ts`
- [ ] Release APK signed with a backed-up keystore, `versionCode` bumped
- [ ] Icon, 3 to 8 screenshots, brief and full introduction, privacy policy
- [ ] No Google Play references in listing assets
- [ ] Test account for reviewers if needed
- [ ] Submitted, review email monitored

If you are also preparing Google Play, read [how to create Apple and Google Play developer accounts](/blog/how-to-create-apple-developer-and-google-play-developer-accounts/) for the 12-tester rule that only applies there.
