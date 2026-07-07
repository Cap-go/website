---
title: Google Login on Android
description: This guide provides a comprehensive walkthrough on setting up Google Login using Capacitor for Android devices, detailing each step to ensure a smooth integration process and addressing potential challenges you may encounter.
sidebar:
    order: 2
---
import { Steps } from '@astrojs/starlight/components';

## Introduction

In this guide, you will learn how to setup Google Login with Capgo Social Login for Android.
I assume that you have already read the [general setup guide](/docs/plugins/social-login/google/general/).

## Using Google login on Android

In this part, you will learn how to setup Google login in Android.

:::caution
The Android SHA1 certificate is beyond painful and I wouldn't wish it on anyone to have to set this up. The following steps assume the simplest scenario of an app that isn't published to Google Play Store and that is only used by the local simulator, or development hardware device. 

If you have deployed your app to Google Play Store, you **MUST** add an additional Android client ID that contains the SHA1 from Google Play console for production releases. You can find the SHA1 hash that Google Play uses to sign your release bundle under `Test and release > Setup > App Signing`.

Finally, it's important to mention that if you mess up, the error will NOT be obvious. It may be very difficult to debug. If you struggle with the setup, please look at the [Github issues](https://github.com/Cap-go/capacitor-social-login/issues).

Additionally, you may look at the troubleshooting section of the [Google Login setup for Android](#troubleshooting) for more information.
:::

:::note
You may create multiple Android client IDs. This is required if you have multiple SHA1 certificates.
:::

<Steps>
1. Create an Android client ID.
   1. Click on the search bar
      <img src="/social-login-assets/google_cons_search.png" alt="Google Console search bar" />
   
   2. Search for `credentials` and click on the `APIs and Services` one (number 2 on the screenshot)
      <img src="/social-login-assets/google_cons_cred_search.png" alt="Search results showing credentials option with APIs and Services highlighted" />
   
   3. Click on the `create credentials`
      <img src="/social-login-assets/google_cons_create_cred.png" alt="Create credentials button in Google Console" />
   
   4. Select `OAuth client ID`
      <img src="/social-login-assets/google_cons_cred_oauth.png" alt="OAuth client ID option in credentials creation menu" />

   5. Select the `Android` application type
      <img src="/social-login-assets/google_cons_app_type_android.png" alt="Application type selection with Android option highlighted" />
   
   6. Open Android Studio
   
   7. At the very bottom of the navigator, find the `Gradle Scripts`
      <img src="/social-login-assets/studio_gradle_scripts.png" alt="Gradle Scripts section in Android Studio project navigator" />
   
   8. Find `build.gradle` for the module `app`
      <img src="/social-login-assets/studio_build_gradle.png" alt="build.gradle (Module: app) file in Gradle Scripts section" />
   
   9. Copy the `android.defaultConfig.applicationId`. This will be your `package name` in the Google console
      <img src="/social-login-assets/studio_build_gradle_app_id.png" alt="Build.gradle file showing applicationId configuration" />
   
   10. Now, open the terminal. Make sure that you are in the `android` folder of your app and run `./gradlew signInReport`
      <img src="/social-login-assets/term_sign_report.png" alt="Terminal showing gradlew signInReport command" />
   
   11. Scroll to the top of this command. You should see the following. Copy the `SHA1`.
      <img src="/social-login-assets/term_sign_report_res.png" alt="Terminal output showing SHA1 certificate fingerprint" />
   
   12. Now, go back to the Google Console. Enter your `applicationId` as the `Package Name` and your SHA1 in the certificate field and click `create`
      <img src="/social-login-assets/google_cons_creat_android_client.png" alt="Android client creation form with package name and SHA1 fields filled in" />
   
2. Create a web client (this is required for Android)
   
   1. Go to the `Create credentials` page in Google Console
   
   2. Set application type to `Web`
      <img src="/social-login-assets/google_cons_app_type_web.png" alt="Application type selection with Web option highlighted" />
   
   3. Click `Create`
      <img src="/social-login-assets/google_cons_web_app_create.png" alt="Web client creation form with Create button at bottom" />
   
   4. Copy the client ID, you'll use this as the `webClientId` in your JS/TS code
      <img src="/social-login-assets/google_cons_copy_web_client_id.png" alt="Client ID details showing Web client ID to copy" />

3. Modify your `MainActivity`
   
   1. Please open your app in Android Studio. You can run `cap open android`
   
   2. Find `MainActivity.java`
     
      1. Open the `app` folder
         <img src="/social-login-assets/studio_app_folder.png" alt="App folder in Android Studio project navigator" />
     
      2. Find `java`
         <img src="/social-login-assets/studio_app_java.png" alt="Java folder in Android Studio project structure" />
     
      3. Find your `MainActivity.java` and click on it
         <img src="/social-login-assets/studio_app_java_activity_main.png" alt="MainActivity.java file in package structure" />
   
   3. Modify `MainActivity.java`. Please add the following code
     
      ```java
      import ee.forgr.capacitor.social.login.GoogleProvider;
      import ee.forgr.capacitor.social.login.SocialLoginPlugin;
      import ee.forgr.capacitor.social.login.ModifiedMainActivityForSocialLoginPlugin;
      import com.getcapacitor.PluginHandle;
      import com.getcapacitor.Plugin;
      import android.content.Intent;
      import android.util.Log;
      import com.getcapacitor.BridgeActivity;
      
      // ModifiedMainActivityForSocialLoginPlugin is VERY VERY important !!!!!!    
      public class MainActivity extends BridgeActivity implements ModifiedMainActivityForSocialLoginPlugin {
      
            @Override
            public void onActivityResult(int requestCode, int resultCode, Intent data) {
              super.onActivityResult(requestCode, resultCode, data);
      
              if (requestCode >= GoogleProvider.REQUEST_AUTHORIZE_GOOGLE_MIN && requestCode < GoogleProvider.REQUEST_AUTHORIZE_GOOGLE_MAX) {
                PluginHandle pluginHandle = getBridge().getPlugin("SocialLogin");
                if (pluginHandle == null) {
                  Log.i("Google Activity Result", "SocialLogin login handle is null");
                  return;
                }
                Plugin plugin = pluginHandle.getInstance();
                if (!(plugin instanceof SocialLoginPlugin)) {
                  Log.i("Google Activity Result", "SocialLogin plugin instance is not SocialLoginPlugin");
                  return;
                }
                ((SocialLoginPlugin) plugin).handleGoogleLoginIntent(requestCode, data);
              }
            }
      
            // This function will never be called, leave it empty
            @Override
            public void IHaveModifiedTheMainActivityForTheUseWithSocialLoginPlugin() {}
      }
      ```

   4. Save the file

4. Use Google Login in your application
   
   1. First, import `SocialLogin`
     
      ```typescript
      import { SocialLogin } from '@capgo/capacitor-social-login';
      ```
   
   2. Call initialize. This should be called only once.
     
      ```typescript
      // onMounted is Vue specific
      // webClientId is the client ID you got in the web client creation step not the android client ID.
      onMounted(() => {
        SocialLogin.initialize({
          google: {
            webClientId: '673324426943-avl4v9ubdas7a0u7igf7in03pdj1dkmg.apps.googleusercontent.com',
          }
        })
      })
      ```
     
   3. Call `SocialLogin.login`. Create a button and run the following code on click.
     
      ```typescript
      const res = await SocialLogin.login({
        provider: 'google',
        options: {}
      })
      // handle the response
      console.log(JSON.stringify(res))
      ```

      :::caution
      If you initialize Google with `mode: 'offline'`, `SocialLogin.login()` returns `serverAuthCode` for your backend exchange flow. Do not call `SocialLogin.refresh({ provider: 'google' })` in the app in that mode. Exchange `serverAuthCode` on your backend, store the Google refresh token there, and refresh on the backend.
      :::

5. Configure the emulator for testing
   
   1. Go into `Device manager` and click the plus button
      <img src="/social-login-assets/studio_device_man.png" alt="Device Manager in Android Studio with plus button highlighted" />
   
   2. Create a virtual device
      <img src="/social-login-assets/studio_create_virt_dev.png" alt="Create Virtual Device button in Virtual Device Configuration" />
   
   3. Select any device with a `Play Store` icon
      <img src="/social-login-assets/studio_new_dev_select_hardware.png" alt="Hardware selection showing devices with Play Store support" />
     
      As you can see, the `pixel 8` supports the `Play Store` services
   
   4. Click `next`
      <img src="/social-login-assets/studio_new_dev_next_1.png" alt="Next button in device creation wizard" />
   
   5. Make sure that the OS image is of type `Google Play`. **IT MUST** be of type `Google Play`
      <img src="/social-login-assets/studio_new_dev_google_play_dev_type.png" alt="System image selection showing Google Play type images" />
   
   6. Click next
      <img src="/social-login-assets/studio_new_dev_next_1.png" alt="Next button in system image selection screen" />
   
   7. Confirm your device. You can name your emulator as you prefer
      <img src="/social-login-assets/studio_new_dev_next_3.png" alt="Device configuration verification screen with Finish button" />
   
   8. Go into `Device Manager` and boot up your simulator
      <img src="/social-login-assets/studio_dev_manager.png" alt="Device Manager with virtual device listed and play button" />
   
   9. After the simulator boots up, go into its settings
      <img src="/social-login-assets/emul_and_settings_1.png" alt="Android emulator showing settings app" />
   
   10. Go into `Google Play`
      <img src="/social-login-assets/emul_and_settings_2.png" alt="Settings screen with Google Play option" />
   
   11. Click `Update` and wait about 60 seconds
      <img src="/social-login-assets/emul_and_settings_update_play_store.png" alt="Google Play update screen with Update button" />

6. Test your application
   
   If you did everything correctly, you should see the Google login flow working properly:
   <img src="/social-login-assets/google_android_final_login_show.webp" alt="Demo of Google login flow on Android showing sign-in process and successful authentication" />
</Steps>

## Troubleshooting

If you have any issues, first compare your app configuration with the Google Cloud Console values. Android Google Sign-In failures are usually caused by a package name, SHA-1, or client ID mismatch.

### Credential Manager, SHA-1, and Firebase

On Android this plugin uses Google Credential Manager (`androidx.credentials` and Sign in with Google), not the legacy `GoogleSignInClient` API. Logcat errors such as `GetCredentialCustomException: [28444] Developer console is not set up correctly` come from that stack.

Filter Logcat with `GoogleProvider` or `CapgoSocialLogin` after a failed login. The plugin logs your package name, signing SHA-1, and a masked `webClientId` so you can compare them against Google Cloud Console.

### Required Google Cloud setup

You need two kinds of OAuth 2.0 client IDs in the same Google Cloud project:

| Client type | Used for | Where it goes |
| --- | --- | --- |
| Web application | Server / ID token audience | `webClientId` in `SocialLogin.initialize()` |
| Android, one per signing key | Proves your APK is allowed to call Google | Google Cloud Console only. Do not pass this ID to `webClientId` |

A common mistake is using the Android client ID as `webClientId`. Credential Manager requires the Web client ID there. The Android client only needs the correct package name and SHA-1 registered in the console.

Create one Android OAuth client for each certificate that signs builds you test:

- Debug: from `./gradlew signingReport` for the debug variant.
- Release: from the APK or AAB you actually install.
- Play App Signing: from Play Console > App integrity > App signing key certificate. This is required for Play Store builds even if your upload key SHA-1 is already registered.

The `applicationId` in `android/app/build.gradle` must exactly match the Android OAuth client package name, including any `.debug` suffix.

If the OAuth consent screen is in Testing mode, add every Google account you test with under Audience > Test users. Publishing the app to Production is not required for `email` and `profile` scopes. Digital Asset Links (`assetlinks.json`) are not required for Sign in with Google through Credential Manager.

Google Cloud changes can take up to a few hours to propagate.

### Error 28444: Developer console is not set up correctly

This almost always means Google rejected the combination of installed APK signing certificate, package name, and `webClientId`. Work through this checklist:

1. Confirm `webClientId` is the Web application client ID and ends with `.apps.googleusercontent.com`.
2. Run the app, reproduce the failure, and read Logcat for `GoogleProvider`, `signingSha1=`, and `package=`.
3. In [Google Cloud Console > Credentials](https://console.cloud.google.com/apis/credentials), open your Android OAuth client and verify the exact package name and SHA-1.
4. If testing a release build, register the SHA-1 from that build, not only the debug keystore.
5. If the app is distributed through Play Store, also register the Play App Signing SHA-1.
6. Ensure Web and Android clients live in the same Google Cloud project.
7. If the consent screen is in Testing, confirm the Google account is a test user.
8. Wait and retry after console changes.

`USER_CANCELLED` after picking an account on a misconfigured debug build can still be a SHA-1 or client ID mismatch. Fix the console setup above first.

### Extract SHA-1 from the build you install

Debug or local builds:

```bash
cd android && ./gradlew signingReport
```

Signed release APK:

```bash
keytool -printcert -jarfile android/app/release/app-release.apk
```

Add that SHA-1 to an Android OAuth client with the matching package name, reinstall the same signed APK, and test again:

```bash
adb install android/app/release/app-release.apk
```

### Reading the login result

Tokens are nested under `result`:

```typescript
const login = await SocialLogin.login({ provider: 'google' });
const idToken = login.result?.idToken;
```

For Firebase Auth, create credentials with that `idToken` and use the Web client ID as `webClientId` in `initialize`.

If you cannot get the development SHA-1 certificate, try a custom keystore. [This issue comment](https://github.com/Cap-go/capacitor-social-login/issues/147#issuecomment-2849742574) explains how to add a keystore to your project.

## Keep going from Google Login on Android

If you are using **Google Login on Android** to plan authentication and account flows, connect it with [Using @capgo/capacitor-social-login](/plugins/capacitor-social-login/) for the native capability in Using @capgo/capacitor-social-login, [@capgo/capacitor-social-login](/docs/plugins/social-login/) for the implementation detail in @capgo/capacitor-social-login, [@capgo/capacitor-passkey](/docs/plugins/passkey/) for the implementation detail in @capgo/capacitor-passkey, [@capgo/capacitor-native-biometric](/docs/plugins/native-biometric/) for the implementation detail in @capgo/capacitor-native-biometric, and [Two-factor authentication](/docs/webapp/mfa/) for the implementation detail in Two-factor authentication.
