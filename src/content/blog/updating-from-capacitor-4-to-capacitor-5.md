---

slug: "updating-from-capacitor-4-to-capacitor-5"
title: 'Updating from Capacitor 4 to Capacitor 5: A Step-by-Step Guide'
description: Learn how to update your project from Capacitor 4 to Capacitor 5 with minimal breaking changes, including updating official plugins and required tools.
author: Martin Donadieu
author_url: https://twitter.com/martindonadieu
created_at: 2023-06-09
updated_at: 2023-06-29
head_image: "/capacitor-5-update.webp"
head_image_alt: Capacitor 4 to 5 update illustration
tag: Capacitor
published: true
next_blog: ""

---

Compared to previous updates, the transition from Capacitor 4 to Capacitor 5 involves minimal breaking changes. This guide provides step-by-step instructions for updating your project to Capacitor 5, as well as a list of breaking changes for official plugins.

**Note**: Capacitor 5 requires NodeJS 16 or higher, as Node 12 has reached end-of-life and Node 14 will reach end-of-life on April 30th, 2023. It is recommended to use the latest LTS version of NodeJS.

1. Install the `latest` version of the Capacitor CLI in your project:

   ```
   npm i -D @capacitor/cli@latest
   ```

2. Run the following command to let the CLI handle the migration:

   ```
   npx cap migrate
   ```

   If any migration steps cannot be achieved, additional information will be provided in the terminal output. Manual migration steps are listed below.

3. If you have the VS Code extension installed, check the recommendations section of the extension to find the option to migrate your project to Capacitor 5.

### Upgrading Capacitor 4 iOS Project to Capacitor 5

1. **Upgrade Xcode**: Capacitor 5 requires Xcode 14.1+.

2. **Update .gitignore**: Make the following changes to your `.gitignore` file:

   ```
   - App/Podfile.lock
   + App/output
   ```

3. **Update Assets to use a single app icon**: Xcode 14 supports a single app icon of 1024x1024. Clean up your AppIcon.appiconset by removing all unnecessary sizes.

### Upgrading Capacitor 4 Android Project to Capacitor 5

1. **Upgrade Android Studio**: Capacitor 5 requires Android Studio Flamingo | 2022.2.1 or newer due to the usage of Gradle 8, which requires Java JDK 17. Java 17 ships with Android Studio Flamingo, so no additional downloads are needed.

2. **Run AGP Upgrade Assistant**: Android Studio can help with some updates related to Gradle and moving packages into build files. To start, run `Tools -> AGP Upgrade Assistant`.

3. **Update Android Project Variables**: In your `variables.gradle` file, update your values to the following new minimums:

   ```
   minSdkVersion = 22
   compileSdkVersion = 33
   targetSdkVersion = 33
   androidxActivityVersion = '1.7.0'
   androidxAppCompatVersion = '1.6.1'
   androidxCoordinatorLayoutVersion = '1.2.0'
   androidxCoreVersion = '1.10.0'
   androidxFragmentVersion = '1.5.6'
   coreSplashScreenVersion = '1.0.0'
   androidxWebkitVersion = '1.6.1'
   junitVersion = '4.13.2'
   androidxJunitVersion = '1.1.5'
   androidxEspressoCoreVersion = '3.5.1'
   cordovaAndroidVersion = '10.1.1'
   ```

4. **Update Google Services**:

   ```
   # build.gradle
   dependencies {
   -       classpath 'com.google.gms:google-services:4.3.13'
   +       classpath 'com.google.gms:google-services:4.3.15'
   }
   ```

5. **Update Gradle plugin to 8.0.0**:

   ```
   # build.gradle
   dependencies {
   -       classpath 'com.android.tools.build:gradle:7.2.1'
   +       classpath 'com.android.tools.build:gradle:8.0.0'
   }
   ```

6. **Update Gradle wrapper to 8.0.2**:

   ```
   # gradle-wrapper.properties
   distributionBase=GRADLE_USER_HOME
   distributionPath=wrapper/dists
   - distributionUrl=https\://services.gradle.org/distributions/gradle-7.4.2-all.zip
   + distributionUrl=https\://services.gradle.org/distributions/gradle-8.0.2-all.zip
   zipStoreBase=GRADLE_USER_HOME
   zipStorePath=wrapper/dists
   ```

7. **Disable Jetifier**:

   ```
   # gradle.properties
   android.useAndroidX=true
   - android.enableJetifier=true
   ```

8. **Move package to `build.gradle`**:

   ```
   # AndroidManifest.xml
   <?xml version="1.0" encoding="utf-8"?>
   - <manifest xmlns:android="http://schemas.android.com/apk/res/android"
   -     package="[YOUR_PACKAGE_ID]">
   + <manifest xmlns:android="http://schemas.android.com/apk/res/android">
   ```

   ```
   # build.gradle
   android {
   +     namespace "[YOUR_PACKAGE_ID]"
         compileSdkVersion rootProject.ext.compileSdkVersion
   ```

9. **Update androidScheme**: In Capacitor 6, `https` will be the default setting for `androidScheme` for existing apps to better enable Capacitor applications to use the system Autofill feature. To avoid data loss as a result of this change, set the scheme to `http` now, even if it's the current default.

   ```
   {
     server: {
       androidScheme: "http"
     }
   }
   ```

10. **Update Kotlin version**: If your project uses Kotlin, update the `kotlin_version` variable to `'1.8.20'`.

### Plugin Functionality Changes

The following plugin functionality has been modified or removed. Update your code accordingly:

- Action Sheet
- Browser
- Camera
- Device
- Geolocation
- Google Maps
- Local Notifications
- Push Notifications
- Status Bar

### Action Sheet

- Update the `androidxMaterialVersion` variable to `1.8.0`.

### Browser

- Update the `androidxBrowserVersion` variable to `1.5.0`.

### Camera

- For Android 13, add the read media images permission (`<uses-permission android:name="android.permission.READ_MEDIA_IMAGES"/>`) in `AndroidManifest.xml`.
- Update the `androidxMaterialVersion` variable to `1.8.0`.
- Update the `androidxExifInterfaceVersion` variable to `1.3.6`.

### Device

- Change `DeviceId.uuid` to `DeviceId.identifier`.
- On iOS 16+, `DeviceInfo.name` will return a generic device name unless you add the appropriate [entitlements](https://developer.apple.com/documentation/bundleresources/entitlements/com_apple_developer_device-information_user-assigned-device-name).

### Geolocation

- Update the `playServicesLocationVersion` to `21.0.1`.

### Google Maps

- Update the following variables:
  - `googleMapsPlayServicesVersion` to `18.1.0`.
  - `googleMapsUtilsVersion` to `3.4.0`.
  - `googleMapsKtxVersion` to `3.4.0`.
  - `googleMapsUtilsKtxVersion` to `3.4.0`.
  - `kotlinxCoroutinesVersion` to `1.6.4`.
  - `androidxCoreKTXVersion` to `1.10.0`.
  - `kotlin_version` to `1.8.20`.

### Local Notifications

- For Android 13, a new runtime permission check is required to schedule local notifications when targeting SDK 33. Call `checkPermissions()` and `requestPermissions()` accordingly.

### Push Notifications

- For Android 13, a new runtime permission check is required to receive push notifications when targeting SDK 33. Call `checkPermissions()` and `requestPermissions()` accordingly.
- Update the `firebaseMessagingVersion` variable to `23.1.2`.

### Status Bar

- On iOS, the default status bar animation has been changed to `FADE`.

By following these steps and updating your code accordingly, you should now have successfully updated your project from Capacitor 4 to Capacitor 5. Make sure to test your application thoroughly to ensure that all features and plugins are working as expected.
