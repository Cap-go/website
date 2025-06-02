---
slug: firebase-crashlytics-for-capacitor-apps
title: Firebase Crashlytics for Capacitor Apps
description: Learn how to integrate real-time crash reporting into your mobile apps with a step-by-step guide on setting up Crashlytics for both iOS and Android.
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2025-04-21T03:55:39.168Z
updated_at: 2025-04-21T03:56:15.479Z
head_image: https://assets.seobotai.com/capgo.app/6805ba51360079f947b8a1bf-1745207775479.jpg
head_image_alt: Mobile Development
keywords: Firebase, Crashlytics, mobile apps, Capacitor, app development, crash reporting, error tracking
tag: Development, Mobile, Updates
published: true
locale: en
next_blog: ''
---

**[Firebase Crashlytics](https://firebase.google.com/docs/crashlytics)** helps you track app crashes in real-time, providing detailed reports to fix issues quickly. It integrates seamlessly with [Capacitor](https://capacitorjs.com/) for both iOS and Android apps. Here’s what you need to know:

-   **Why Use Crashlytics?**
    
    -   Get **real-time crash alerts**.
    -   Analyze detailed crash reports with **automatic issue grouping**.
    -   Monitor critical errors to keep apps stable.
-   **Setup Requirements:**
    
    -   Install **[Node.js](https://nodejs.org/en) (v16+)**, **Capacitor (v4+)**, and tools like **[Xcode](https://developer.apple.com/xcode/) 14+** and **[Android Studio](https://developer.android.com/studio) Electric Eel**.
    -   Download [Firebase](https://firebase.google.com/) configuration files (`GoogleService-Info.plist` for iOS, `google-services.json` for Android).
    -   Update platform-specific files like `Podfile` (iOS) and `build.gradle` (Android).
-   **Key Steps:**
    
    -   Install Crashlytics:
        
        ```bash
        npm install @capacitor-firebase/crashlytics && npx cap sync
        ```
        
    -   Initialize Crashlytics in your app:
        
        ```typescript
        import { FirebaseCrashlytics } from '@capacitor-firebase/crashlytics';
        await FirebaseCrashlytics.initialize();
        ```
        
-   **Test Your Setup:**
    
    -   Trigger a test crash:
        
        ```typescript
        await FirebaseCrashlytics.crash();
        ```
        
-   **Bonus Tip:** Combine Crashlytics with **[Capgo](https://capgo.app/)** for instant live updates without app store delays.
    

This guide ensures your app is crash-free and user-friendly. Start by setting up Firebase Crashlytics today!

## 2021 Android Guide: [Firebase Crashlytics](https://firebase.google.com/docs/crashlytics) - custom crash ...

![Firebase Crashlytics](https://assets.seobotai.com/capgo.app/6805ba51360079f947b8a1bf/3578d58943ebaf5b91a7f0e1afb1607f.jpg)

<iframe src="https://www.youtube.com/embed/JxVYfZprK0g" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## Setup Requirements

Before diving in, make sure you’ve completed the following steps:

### Required Software and Accounts

You'll need to install the following:

-   **Node.js** (v16 or higher) and **Capacitor** (v4 or higher)
-   A **Firebase account** with an active project
-   **Xcode 14+** for iOS development
-   **Android Studio Electric Eel** or a newer version for Android development
-   The latest version of **[CocoaPods](https://cocoapods.org/)** (required for iOS)

### Platform Configuration Files

**For iOS:**

-   Download the `GoogleService-Info.plist` file from the Firebase Console.
-   Update your `Podfile` to include Crashlytics dependencies.
-   Add the necessary privacy keys to your `Info.plist` file.

**For Android:**

-   Obtain the `google-services.json` file from the Firebase Console.
-   Make changes to both the project-level and app-level `build.gradle` files.
-   Update the `AndroidManifest.xml` to include the required permissions.

### [Firebase](https://firebase.google.com/) Console Setup

![Firebase](https://assets.seobotai.com/capgo.app/6805ba51360079f947b8a1bf/e510e8ab32244fff0b09e93222500c83.jpg)

Set up Firebase and enable Crashlytics through these steps:

1.  **Create a Firebase project** and enable Crashlytics.
    
2.  **Register your apps** in the Firebase Console:
    
    -   Use the **bundle ID** for iOS and the **package name** for Android.
    -   Download the configuration files: `GoogleService-Info.plist` (iOS) and `google-services.json` (Android).
3.  **Integrate Firebase SDKs** into your app by adding these dependencies:
    
    **For Android (app-level `build.gradle`):**
    
    ```kotlin
    dependencies {
        implementation platform('com.google.firebase:firebase-bom:32.0.0')
        implementation 'com.google.firebase:firebase-crashlytics'
        implementation 'com.google.firebase:firebase-analytics'
    }
    ```
    
    **For iOS (`Podfile`):**
    
    ```ruby
    pod 'Firebase/Crashlytics'
    pod 'Firebase/Analytics'
    ```
    

Once these steps are complete, you’re ready to move on to the Plugin Installation section.

## Installation Steps

### Plugin Installation

First, install the plugin and [sync it with Capacitor](https://capgo.app/plugins/capacitor-updater/):

```bash
npm install @capacitor-firebase/crashlytics && npx cap sync
```

Then, initialize Crashlytics in your app. Add the following code to `app.component.ts` or `main.ts`:

```typescript
import { FirebaseCrashlytics } from '@capacitor-firebase/crashlytics';
await FirebaseCrashlytics.initialize();
```

### Platform Configuration

Set up the required configurations for Android and iOS platforms.

**Android Setup**

1.  Add the Crashlytics Gradle plugin to your app-level `build.gradle` file:
    
    ```kotlin
    buildscript { 
        dependencies { 
            classpath 'com.google.firebase:firebase-crashlytics-gradle:2.9.5' 
        } 
    }
    apply plugin: 'com.google.firebase.crashlytics'
    ```
    
2.  Enable crash collection in `AndroidManifest.xml`:
    
    ```xml
    <meta-data
        android:name="firebase_crashlytics_collection_enabled"
        android:value="true" />
    ```
    

**iOS Setup**

1.  Configure Firebase in `AppDelegate.swift`:
    
    ```swift
    import Firebase
    FirebaseApp.configure()
    ```
    

### Testing Your Setup

Confirm that Crashlytics is working by running a test crash and checking the Firebase Console:

-   Trigger a test crash with a custom key:
    
    ```typescript
    await FirebaseCrashlytics.setCustomKey({key: 'test_scenario', value: 'manual_crash'});
    await FirebaseCrashlytics.crash();
    ```
    
-   Optionally, identify a user:
    
    ```typescript
    await FirebaseCrashlytics.setUserId({userId: 'user123'});
    ```
    
-   Log custom events:
    
    ```typescript
    await FirebaseCrashlytics.log({message: 'Test crash triggered'});
    ```
    

Reports, including stack traces, device details, and custom keys, should appear in the Firebase Console within about 5 minutes.

**Important:** Remove crash calls before releasing your app. To disable crash collection during development, use:

```typescript
await FirebaseCrashlytics.setCrashlyticsCollectionEnabled({enabled: false});
```

## Monitoring Guide

Once you've confirmed your setup with a test crash, use the Firebase Console to track actual crashes and errors in your live app.

### Reading Crash Reports

You can find crash reports in the Firebase Console under the Crashlytics section. Here's what you'll see:

-   **Crash-free users**: The percentage of users who haven't experienced crashes.
-   **Issue stability**: How often crashes are occurring.
-   **Impact analysis**: The number of users affected.

Click on any issue to dive deeper into details like stack traces, device information (e.g., OS version, memory), custom keys, logs, and the user's journey leading up to the crash.

**Pro tip**: Enable the "velocity alerts" feature to get notified when crash rates suddenly increase. This can help you address problems before they impact too many users.

### Error Management Tips

-   **Prioritize by Impact**: Focus on crashes that affect the most users or occur in critical parts of your app. Tracking trends can help you identify urgent issues.
    
-   **Use Custom Keys**: Add context to your crash reports with custom keys. For example:
    
    ```typescript
    await FirebaseCrashlytics.setCustomKey({
      key: 'current_view',
      value: 'payment_processing'
    });
    ```
    
-   **Group Similar Issues**: Take advantage of Firebase's automatic issue grouping. You can also tag related crashes with consistent custom keys and use clear, descriptive titles for easier tracking.
    

### Protecting User Privacy

To ensure compliance and safeguard user data, follow these guidelines:

-   **Permissions**:
    
    -   Mention crash reporting in your privacy policy.
    -   Get user consent for data collection in regions with GDPR regulations.
    -   Provide users with an option to opt-out of crash reporting.
-   **Data Collection Controls**:
    
    ```typescript
    await FirebaseCrashlytics.setCrashlyticsCollectionEnabled({enabled: false});
    await FirebaseCrashlytics.setCrashlyticsCollectionEnabled({enabled: true});
    ```
    
-   **Data Retention**:
    
    -   Set up automatic data deletion after 90 days.
    -   Scrub sensitive information from your reports.
    -   Use non-identifiable custom keys to maintain user privacy while debugging.

## [Capgo](https://capgo.app/) Integration

![Capgo](https://assets.seobotai.com/capgo.app/6805ba51360079f947b8a1bf/12eddca90b08193253253ea10516a6c4.jpg)

Streamline the process from crash detection to fix deployment by pairing Capgo's live update system with Crashlytics.

### About Capgo

Capgo is a live update tool designed specifically for [Capacitor apps](https://capgo.app/blog/capacitor-comprehensive-guide/). With over 1,900 apps in production and a 95% update rate within 24 hours, it ensures quick fixes without the delays of app store approvals [\[1\]](https://capgo.app/).

Key features include:

-   **End-to-end encryption** for secure updates
-   **One-click rollback** to previous versions
-   **Channel-based distribution** for targeted releases
-   **Seamless CI/CD integration**
-   A **100% open-source platform**

### Crashlytics and Capgo Together

Using Crashlytics with Capgo creates an efficient workflow for identifying and resolving issues quickly.

Here’s how it works:

1.  **Crash Detection and Response**  
    Crashlytics identifies a crash, and Capgo allows you to deploy fixes instantly without waiting for app store approval.
    
2.  **Targeted Updates**
    
    -   _Beta Testing_: Test fixes with a specific group to ensure they are effective.
    -   _Staged Rollout_: Gradually deploy updates to reduce risks.
    -   _Emergency Fix_: Quickly push critical patches to resolve urgent issues.
3.  **Monitoring and Verification**  
    After deploying updates with Capgo, use Crashlytics to track crash rates and confirm the issue is resolved.
    

### Security and App Store Rules

Capgo adheres to Apple and Google’s policies while providing strong security features:

-   82% global success rate for delivering updates [\[1\]](https://capgo.app/)
-   Automatic version control for better organization
-   Compliance with app store live update guidelines

For secure integration with Crashlytics:

-   Enable error tracking in both systems.
-   Use Capgo’s monitoring tools alongside Crashlytics reports.
-   Maintain version control for all updates.
-   Keep detailed logs of updates for auditing purposes.

Continue to the Plugin Options section to explore other live update tools.

## Plugin Options

Choosing the right crash-reporting plugin can greatly impact how you identify and fix errors in your app.

Here’s a quick comparison of Crashlytics with other popular error-reporting tools for Capacitor:

-   **[Sentry](https://sentry.io/)**: Offers a free tier with paid plans starting at $26/month. Supports over 30 platforms and provides real-time error monitoring with detailed context.
-   **[Bugsnag](https://www.bugsnag.com/)**: Starts at $47/month. Covers both mobile and web platforms, featuring automatic error grouping and release tracking.
-   **[Rollbar](https://rollbar.com/)**: Priced from $31/month. Works across multiple platforms, with features like deployment tracking and person tracking.

Crashlytics is especially appealing for teams already using Firebase, thanks to its smooth integration and a free tier.

## Summary

Here's a quick look at what you've accomplished and what comes next:

### Setup Steps Recap

You’ve completed three key steps to get started:

-   Created a Firebase project and registered your iOS/Android apps.
-   Installed and configured the Crashlytics plugin.
-   Updated the necessary iOS and Android platform files.

### Why Integrate These Tools?

Pairing Firebase Crashlytics with Capgo gives you a powerful system for error tracking and [update management](https://capgo.app/docs/plugin/cloud-mode/manual-update/). Here’s what this combo offers:

-   **Quick fixes**: Push instant updates and roll back changes with just one click.
-   **Reliable rollouts**: Ensure updates are widely adopted and smoothly delivered to users.

### What’s Next?

1.  Turn on detailed crash analytics in the Firebase Console.
2.  Add Capgo to your CI/CD pipeline for streamlined updates.
3.  Use [Capgo channels](https://capgo.app/docs/webapp/channels/) to test and release fixes step by step.

With Crashlytics and Capgo in place, you’re set to keep your app running smoothly and improving over time.