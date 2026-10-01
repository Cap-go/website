---
slug: admob-gdpr-consent-capacitor
title: "How to Handle AdMob GDPR Consent in Capacitor"
description: "Handle AdMob GDPR consent in a Capacitor app with Google's UMP SDK: consent form, privacy options, ATT order, debug geography and error handling, with code."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-10-01T09:00:00.000Z
updated_at: 2026-10-01T09:00:00.000Z
head_image: /blog-images/privacy-manifest-for-capacitor-apps-guide.webp
head_image_alt: "Privacy and consent illustration for AdMob GDPR consent in a Capacitor app"
keywords: admob gdpr consent capacitor, ump sdk capacitor, user messaging platform capacitor, admob consent form ionic, capacitor admob privacy options, gdpr ads mobile app
tag: Capacitor, Security, Tutorial
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "Do I need a consent form for AdMob in the EU?"
    answer: "Yes. For users in the EEA, the UK and Switzerland, Google requires publishers serving ads to use a Google-certified consent management platform that integrates with the IAB TCF. Google's own User Messaging Platform (UMP) SDK is certified and free."
  - question: "Should I request consent before initializing the Google Mobile Ads SDK?"
    answer: "Google recommends gathering consent with UMP first and only initializing the Mobile Ads SDK and requesting ads once canRequestAds returns true. This avoids ad requests before the user has made a choice."
  - question: "Should UMP or App Tracking Transparency appear first on iOS?"
    answer: "Show the UMP flow first. If you configure an IDFA explainer message in AdMob, UMP shows it and then triggers the ATT prompt. Showing ATT first and then a GDPR form confuses users and can lower consent rates."
  - question: "How do I test the GDPR consent form outside the EU?"
    answer: "Use UMP debug settings: register your test device hashed ID and set the debug geography to EEA. Reset consent between tests so the form shows again."
  - question: "Does @capgo/capacitor-admob include UMP methods?"
    answer: "No. It covers SDK start, request configuration, ad formats and iOS tracking authorization. Gather consent with a small native UMP bridge before calling AdMob.start(), or use a plugin that wraps UMP, such as @capacitor-community/admob."
---

To handle AdMob GDPR consent in a Capacitor app, use Google's User Messaging Platform (UMP) SDK: request consent information on every launch, show the consent form if required, and only initialize ads when `canRequestAds` is true. You also need a privacy options entry point so users can change their choice, and on iOS the UMP flow should come before the App Tracking Transparency prompt. This guide shows the full flow with two setups: a plugin that wraps UMP in JavaScript, and [`@capgo/capacitor-admob`](/plugins/capacitor-admob/) with a small native consent bridge.

## What UMP does and why AdMob requires it

Since January 2024, Google requires publishers that serve ads to users in the EEA, the UK and Switzerland to use a Google-certified consent management platform (CMP) integrated with the IAB Transparency and Consent Framework (TCF). The UMP SDK is Google's own certified CMP, free and built into the AdMob console.

UMP does three things for you:

1. Detects whether the user is in a region where consent is required.
2. Shows the consent message you configured in AdMob, in the user's language.
3. Stores the user's choices as a TC string on the device (the standard `IABTCF_` keys in `UserDefaults` on iOS and `SharedPreferences` on Android), which the Google Mobile Ads SDK and mediation partners read when requesting ads.

You can also use UMP for US state privacy regulations, which AdMob calls "US states" messages, from the same console.

## Step 1: create the messages in AdMob

In the AdMob console, go to **Privacy & messaging**:

- Create a **European regulations** message (GDPR). Choose which apps it applies to, the languages, and your list of ad partners.
- Optionally create a **US states** message.
- On iOS, create an **IDFA explainer** message if you plan to request App Tracking Transparency. UMP will show it before the system ATT prompt.
- Publish the messages. An unpublished message will never show.

If the form never appears in your app later, an unpublished or unassigned message is the first thing to check.

## Step 2: decide the order of operations

The order that works for most apps:

1. App starts.
2. Request consent info update with UMP (every launch).
3. If required, load and show the consent form.
4. If `canRequestAds` is true, start the Mobile Ads SDK and load ads.
5. Show a "Privacy settings" entry in your settings screen when UMP says privacy options are required.

Google also allows starting the Mobile Ads SDK in parallel with the consent request when `canRequestAds` was already true from a previous session. That shortens time to first ad for returning users.

## Option A: a plugin that wraps UMP in JavaScript

`@capacitor-community/admob` (version 8 supports Capacitor 8) exposes UMP methods directly: `requestConsentInfo`, `showConsentForm`, `showPrivacyOptionsForm` and `resetConsentInfo`.

```bash
bun add @capacitor-community/admob
bunx cap sync
```

```ts
import {
  AdMob,
  AdmobConsentStatus,
  AdmobConsentDebugGeography,
} from '@capacitor-community/admob';

export async function initAdsWithConsent(isDebug: boolean) {
  await AdMob.initialize();

  let info = await AdMob.requestConsentInfo(
    isDebug
      ? {
          debugGeography: AdmobConsentDebugGeography.EEA,
          testDeviceIdentifiers: ['YOUR_TEST_DEVICE_ID'],
        }
      : undefined,
  );

  if (info.isConsentFormAvailable && info.status === AdmobConsentStatus.REQUIRED) {
    info = await AdMob.showConsentForm();
  }

  // The enum value is the string 'REQUIRED'
  const showPrivacyEntry = String(info.privacyOptionsRequirementStatus) === 'REQUIRED';

  return { canRequestAds: info.canRequestAds, showPrivacyEntry };
}

export async function openPrivacyOptions() {
  await AdMob.showPrivacyOptionsForm();
}
```

Check `canRequestAds` before every ad load, not just at startup, because the user can withdraw consent from the privacy options form.

## Option B: @capgo/capacitor-admob with a native UMP bridge

[`@capgo/capacitor-admob`](/docs/plugins/admob/) gives you `AdMob.start()`, request configuration, banner, interstitial, rewarded and rewarded interstitial ads, plus iOS tracking authorization. It does not wrap UMP, so you add a small app-local plugin that runs the consent flow before you call `AdMob.start()`.

```bash
bun add @capgo/capacitor-admob
bunx cap sync
```

### Add the UMP SDK

- **iOS:** add Google's `GoogleUserMessagingPlatform` package with Swift Package Manager (Capacitor 8 projects use SPM by default), or the CocoaPods pod of the same name if your project still uses CocoaPods.
- **Android:** in `android/app/build.gradle`:

```groovy
dependencies {
    implementation "com.google.android.ump:user-messaging-platform:<latest version>"
}
```

Use the latest release from Google's Maven repository.

### iOS consent plugin

Create `ios/App/App/ConsentPlugin.swift`:

```swift
import Capacitor
import UserMessagingPlatform

@objc(ConsentPlugin)
public class ConsentPlugin: CAPPlugin, CAPBridgedPlugin {
    public let identifier = "ConsentPlugin"
    public let jsName = "Consent"
    public let pluginMethods: [CAPPluginMethod] = [
        CAPPluginMethod(name: "gather", returnType: CAPPluginReturnPromise),
        CAPPluginMethod(name: "showPrivacyOptions", returnType: CAPPluginReturnPromise),
    ]

    @objc func gather(_ call: CAPPluginCall) {
        let parameters = RequestParameters()
        DispatchQueue.main.async {
            ConsentInformation.shared.requestConsentInfoUpdate(with: parameters) { error in
                if let error = error {
                    call.reject(error.localizedDescription)
                    return
                }
                guard let vc = self.bridge?.viewController else {
                    call.reject("No view controller")
                    return
                }
                ConsentForm.loadAndPresentIfRequired(from: vc) { formError in
                    if let formError = formError {
                        call.reject(formError.localizedDescription)
                        return
                    }
                    call.resolve(self.state())
                }
            }
        }
    }

    @objc func showPrivacyOptions(_ call: CAPPluginCall) {
        DispatchQueue.main.async {
            guard let vc = self.bridge?.viewController else {
                call.reject("No view controller")
                return
            }
            ConsentForm.presentPrivacyOptionsForm(from: vc) { formError in
                if let formError = formError {
                    call.reject(formError.localizedDescription)
                    return
                }
                call.resolve(self.state())
            }
        }
    }

    private func state() -> [String: Any] {
        return [
            "canRequestAds": ConsentInformation.shared.canRequestAds,
            "privacyOptionsRequired":
                ConsentInformation.shared.privacyOptionsRequirementStatus == .required,
        ]
    }
}
```

Register it from a `CAPBridgeViewController` subclass, and set that class on the view controller in `Main.storyboard`:

```swift
import Capacitor

class MainViewController: CAPBridgeViewController {
    override open func capacitorDidLoad() {
        bridge?.registerPluginInstance(ConsentPlugin())
    }
}
```

### Android consent plugin

Create `android/app/src/main/java/com/example/app/ConsentPlugin.java` (use your package name):

```java
package com.example.app;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.google.android.ump.ConsentInformation;
import com.google.android.ump.ConsentRequestParameters;
import com.google.android.ump.UserMessagingPlatform;

@CapacitorPlugin(name = "Consent")
public class ConsentPlugin extends Plugin {

    @PluginMethod
    public void gather(PluginCall call) {
        ConsentInformation info = UserMessagingPlatform.getConsentInformation(getContext());
        ConsentRequestParameters params = new ConsentRequestParameters.Builder().build();

        getActivity().runOnUiThread(() ->
            info.requestConsentInfoUpdate(
                getActivity(),
                params,
                () -> UserMessagingPlatform.loadAndShowConsentFormIfRequired(getActivity(), formError -> {
                    if (formError != null) {
                        call.reject(formError.getMessage());
                        return;
                    }
                    call.resolve(state(info));
                }),
                requestError -> call.reject(requestError.getMessage())
            )
        );
    }

    @PluginMethod
    public void showPrivacyOptions(PluginCall call) {
        getActivity().runOnUiThread(() ->
            UserMessagingPlatform.showPrivacyOptionsForm(getActivity(), formError -> {
                if (formError != null) {
                    call.reject(formError.getMessage());
                    return;
                }
                call.resolve(state(UserMessagingPlatform.getConsentInformation(getContext())));
            })
        );
    }

    private JSObject state(ConsentInformation info) {
        JSObject ret = new JSObject();
        ret.put("canRequestAds", info.canRequestAds());
        ret.put(
            "privacyOptionsRequired",
            info.getPrivacyOptionsRequirementStatus() ==
                ConsentInformation.PrivacyOptionsRequirementStatus.REQUIRED
        );
        return ret;
    }
}
```

Register it in `MainActivity.java` before `super.onCreate`:

```java
public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(ConsentPlugin.class);
        super.onCreate(savedInstanceState);
    }
}
```

### Call it from TypeScript

```ts
import { registerPlugin } from '@capacitor/core';
import { AdMob, BannerAd } from '@capgo/capacitor-admob';

interface ConsentState {
  canRequestAds: boolean;
  privacyOptionsRequired: boolean;
}

interface ConsentPlugin {
  gather(): Promise<ConsentState>;
  showPrivacyOptions(): Promise<ConsentState>;
}

const Consent = registerPlugin<ConsentPlugin>('Consent');

export async function startAds() {
  let state: ConsentState;
  try {
    state = await Consent.gather();
  } catch (err) {
    console.warn('Consent flow failed', err);
    return { showPrivacyEntry: false };
  }

  if (state.canRequestAds) {
    await AdMob.start();
    const banner = new BannerAd({
      adUnitId: 'ca-app-pub-3940256099942544/2934735716', // Google test banner (iOS)
      position: 'bottom',
    });
    await banner.show();
  }

  return { showPrivacyEntry: state.privacyOptionsRequired };
}

export const openPrivacyOptions = () => Consent.showPrivacyOptions();
```

Native code changes need a new store build. After that, consent copy in your settings screen and ad placement logic can be shipped with [Capgo live updates](/live-update/).

## Step 3: add the privacy options entry point

When UMP reports that privacy options are required, Google expects a visible way to reopen the consent choices. Add a "Privacy settings" row to your settings page and hide it when not required:

```ts
const { showPrivacyEntry } = await startAds();
document.querySelector('#privacy-row')?.toggleAttribute('hidden', !showPrivacyEntry);
document.querySelector('#privacy-row')?.addEventListener('click', () => openPrivacyOptions());
```

After the user changes their choices, read `canRequestAds` again before the next ad request.

## Step 4: App Tracking Transparency on iOS

ATT is separate from GDPR. ATT controls access to the IDFA on iOS. GDPR consent controls whether and how personal data can be processed. You usually need both for an EU user on iOS.

- Add `NSUserTrackingUsageDescription` to `Info.plist`.
- Let UMP show the IDFA explainer message and trigger ATT, if you configured that message in AdMob. Otherwise, request ATT yourself after the consent flow.

With `@capgo/capacitor-admob` you can read and request the ATT status directly:

```ts
import { AdMob, TrackingAuthorizationStatus } from '@capgo/capacitor-admob';

const { status } = await AdMob.trackingAuthorizationStatus();
if (status === TrackingAuthorizationStatus.notDetermined) {
  await AdMob.requestTrackingAuthorization();
}
```

Capgo also has a standalone [App Tracking Transparency plugin](/plugins/capacitor-app-tracking-transparency/) if you need ATT for other SDKs. Do not forget to declare tracking in your privacy manifest and App Store privacy labels, see our [privacy manifest guide](/blog/privacy-manifest-for-capacitor-apps-guide/).

## Step 5: test with debug geography

UMP only shows the GDPR form to users it locates in the EEA, UK or Switzerland. To test elsewhere:

- Run the app once and find the log line from UMP with your device's hashed ID.
- Add it as a test device and set debug geography to EEA. With the community plugin, pass `debugGeography` and `testDeviceIdentifiers` to `requestConsentInfo`. In a native bridge, set `DebugSettings` on iOS and `ConsentDebugSettings` on Android in debug builds only.
- Reset consent between runs (`resetConsentInfo()` in the community plugin, `ConsentInformation.reset()` natively) so the form shows again.

Never ship debug settings in release builds. Gate them on a build flag.

## Step 6: handle errors without blocking the app

Consent requests can fail: no network, misconfigured app ID, or no published message. Treat failure as "no ads for now", not as a crash:

- If `requestConsentInfoUpdate` fails but `canRequestAds` was true from a previous session, you can still request ads.
- If the form fails to load, log it and retry on the next launch.
- Never show ads while the consent form is on screen.

## Troubleshooting

**The form never shows.** Message not published, not assigned to this app ID, or you are outside the EEA without debug geography. Check the AdMob app ID in `Info.plist` and `AndroidManifest.xml` matches the console.

**The form shows every launch.** The user closed it without a choice, or you call reset in production code.

**`canRequestAds` false for US users.** You published a US states message and the user opted out of sale or sharing. Serve limited ads only through the SDK, do not bypass it.

**Mediation partners get no consent.** Make sure each partner adapter is up to date and listed in your GDPR message's ad partner list.

**iOS ATT prompt never appears.** `NSUserTrackingUsageDescription` is missing, or the user disabled "Allow Apps to Request to Track" in Settings.

## Compliance beyond the form

UMP handles the ad side. Your app still needs a privacy policy that lists AdMob, data retention rules and a way to handle data requests. Our [GDPR compliance checklist](/blog/gdpr-compliance-checklist/) covers the rest of the app.
