---
slug: automatic-capacitor-ios-build-codemagic
title: Automatic Capacitor IOS build with Codemagic
description: >-
  How to set up a CI/CD pipeline for your IOS Ionic app using Codemagic and
  Codemagic in 5 mins (2024)
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2024-07-24T00:00:00.000Z
updated_at: 2024-07-24T00:00:00.000Z
head_image: /Codemagic_ios.webp
head_image_alt: Codemagic testflight illustration
keywords: Codemagic, CI/CD, iOS, automatic build, automatic release, mobile app updates
tag: CI/CD
published: true
locale: en
next_blog: automatic-capacitor-android-build-codemagic
---


## Continuous Delivery for iOS using Codemagic


## Prerequisites

Before continuing with the tutorial…

-   iOS developer program membership.
-   Desire to read 😆…

## Important about the price

![Price Codemagic Action](/price_codemagic.webp)

[https://codemagic.io/pricing/](https://codemagic.io/pricing/)

The service is ‘_free’_ up to 500 macOS M1 minutes / month, depending on the chosen machine.  
We are going to use a **_macOS M1_** machine, you can see in the screenshot its price and limits (prices as of the creation of the tutorial, they could undergo changes in the future)

🔴 **_Once warned of requirements and prices, if you like, we continue…_**

> **_📣_ In the post we assume that we have the app created in iTunes connect, we do have the certificates of the Apple ecosystem, everything will be setup by Codemagic!**

## Let’s go to the mess 🧑🏽💻

**Steps to follow in the post**

1.  _Using App Store Connect API with Codemagic_
2.  _Requirements_
3.  _Creating an App Store Connect API Key_
4.  _Using an App Store Connect API Key_
5.  _Copy Fastline files_
6.  _Configure Codemagic_

## 1\. Using App Store Connect API with Codemagic

> Starting February 2021, two-factor authentication or two-step verification is required for all users to sign in to App Store Connect. This extra layer of security for your Apple ID helps ensure that you’re the only person who can access your account.  
> From [Apple Support](https://developer.apple.com/support/authentication/)

> Getting started with match requires you to revoke your existing certificates. But no worry, you will have the new one directly.


### Requirements

To be able to use App Store Connect API, Codemagic needs **three** things.

1.  Issuer ID.
2.  Key ID.
3.  Key file or Key content.

### Creating an App Store Connect API Key

To generate keys, you must have Admin permission in App Store Connect. If you don’t have that permission, you can direct the relevant person to this article and follow the following instructions.

1 — Log in to [App Store Connect](https://appstoreconnect.apple.com/).

2 — Select [Users and Access](https://appstoreconnect.apple.com/access/users/).

![App Store Connect user access](/select_user_access.webp)

3 — Select the API Keys tab.

![App Store Connect API Keys](/user_access_keys.webp)

4 — Click Generate API Key or the Add (+) button.

![App Store Connect API keys create](/user_access.webp)

5 —  Enter the name for the key and select an access level. We recommend choosing `App Manager` access rights, read more about Apple Developer Program role permissions [here](https://help.apple.com/app-store-connect/#/deve5f9a89d7)

![App Store Connect API keys create name](/gen_key.webp)

6 — Click Generate.

> **An API key’s access cannot be limited to specific apps.**

The new key’s name, key ID, a download link, and other information appear on the page.

![App Store Connect download keys](/download_key.webp)

Grab all three necessary information here:
<1> Issue ID.  
<2> Key ID.  
<3> Click “Download API Key” to download your API private key. The download link appears only if the private key has not yet been downloaded. Apple does not keep a copy of the private key. So, you can download it only once.

> _🔴_ Store your private key in a safe place. You should never share your keys, store keys in a code repository, or include keys in client-side code.

### Adding the App Store Connect API key to Codemagic

1.  Open your Codemagic Team settings,
![Select Team integrations](/select_team.webp)
![Open team](/open_team.webp)
Select code signing identities
![Select code signing identities](/select_code_signing_identities.webp)
And the upload the certificate
![Upload the certificate](/upload_certificate.webp)

2.  Click the **Add key** button.
3.  Enter the `App Store Connect API key name`. This is a human readable name for the key that will be used to refer to the key later in application settings.
4.  Enter the `Issuer ID` and `Key ID` values.
5.  Click on **Choose a .p8 file** or drag the file to upload the App Store Connect API key downloaded earlier.
6.  Click **Save**.

_Now we can manage Codemagic with the App Store Connect API key, great!_


## 2\. Create certificates and provisioning profiles


#### Certificates

Open XCode and go to **Settings** > **Accounts** > **Apple ID** > **Teams** and select your team.

![Code signing identities](/code_signing_identities.webp)

Click on **Manage certificates** > **+** and select **Apple Distribution**.

![Apple Distribution](/apple_distribution.webp)

Then you can create a new certificate.

Then you need to go to keychain to download the certificate as a `.p12` file.

To do so, you need to go to keychain switch to the **login** keychain and then the tab **My Certificates**.

![My Certificates](/my_certificates.webp)

Then you can select the certificate you want to download. (Look by the date of the certificate)

And then right-click on the certificate and select **Export**.

Choose the file format **Personal Information Exchange (.p12)**.

That will download the certificate as a `.p12` file.

#### Provisioning profiles

Open [Apple Developer](https://developer.apple.com/account/resources/profiles/list) and select the right team.

Then create a new profile, by clicking on **+** 

![Create a new profile](/create_new_profile.webp)

And select **App Store Connect**. 

![Select App Store Connect](/select_app_store_connect.webp)

Then you need to select the right app, be careful you cannot use wildcard otherwise signing will fail.

![Select the right app](/select_app.webp)

Select the right certificate you created before (look for the date of expiration it should same day and month as today) and click on **Continue**.

![Select the right certificate](/select_certificate.webp)

Finally enter the name of the profile and click on **Generate**. 

> The name will be used to identify the profile in Codemagic.

![Generate the profile](/generate_profile.webp)

You can download the profile as a `.mobileprovision` file.

![Download the profile](/download_profile.webp)


### Adding the Code signing certificate

Codemagic lets you upload code signing certificates as PKCS#12 archives containing both the certificate and the private key which is needed to use it. When uploading, Codemagic will ask you to provide the certificate password (if the certificate is password-protected) along with a unique **Reference name**, which can then be used in the `codemagic.yaml` configuration to fetch the specific file.

-   Upload certificate
-   Generate new certificate
-   Fetch from Developer Portal

1.  Open your Codemagic Team settings, go to **codemagic.yaml settings** > **Code signing identities**.
2.  Open **iOS certificates** tab.
3.  Upload the certificate file by clicking on **Choose a .p12 or .pem file** or by dragging it into the indicated frame.
4.  Enter the **Certificate password** and choose a **Reference name**.
5.  Click **Add certificate**

### Adding the provisioning profile

Codemagic allows you to upload a provisioning profile to be used for the application or to fetch a profile from the Apple Developer Portal.

The profile’s type, team, bundle id, and expiration date are displayed for each profile added to Code signing identities. Furthermore, Codemagic will let you know whether a matching code signing certificate is available in Code signing identities (a green checkmark in the **Certificate** field) or not.

## 3\. Setup Codemagic

**Configure Codemagic secrets**

Ever wonder where the values of the `ENV` are coming from? Well, it’s not a secret anymore – it’s from your project’s secret. 🤦


## **4\. Configure Codemagic workflow file**

Create a file named `codemagic.yml` at the root of your project and add the following.

```yaml
workflows:
  ionic-capacitor-ios-workflow:
    name: Capacitor iOS Workflow
    max_build_duration: 120
    instance_type: mac_mini_m1
    integrations:
      app_store_connect: CodeMagic
    environment:
      ios_signing:
        distribution_type: app_store
        bundle_identifier: YOUR_BUNDLE_IDENTIFIER
      vars:
        XCODE_WORKSPACE: ios/App/App.xcworkspace
        XCODE_SCHEME: App
        APP_STORE_APP_ID: YOUR_APP_STORE_APP_ID
      node: v20.14.0
      xcode: 15.4
      cocoapods: default
    triggering:
      events:
        - tag
      tag_patterns:
        - pattern: '*'
          include: true
    scripts:
      - name: Install dependencies
        script: |
          npm install
      - name: Cocoapods installation
        script: |
          cd ios/App && pod install
      - name: Update dependencies and copy web assets to native project
        script: |
          npm run build
          npx cap sync ios
      - name: Set up code signing settings on Xcode project
        script: |
          xcode-project use-profiles
      - name: Increment build number
        script: |
          cd $CM_BUILD_DIR/ios/App
          LATEST_BUILD_NUMBER=$(app-store-connect get-latest-app-store-build-number "$APP_ID")
          agvtool new-version -all $(($LATEST_BUILD_NUMBER + 1))
      - name: Build ipa for distribution
        script: |
          xcode-project build-ipa \
            --workspace "$XCODE_WORKSPACE" \
            --scheme "$XCODE_SCHEME"
    artifacts:
      - build/ios/ipa/*.ipa
      - /tmp/xcodebuild_logs/*.log
      - $HOME/Library/Developer/Xcode/DerivedData/**/Build/**/*.app
      - $HOME/Library/Developer/Xcode/DerivedData/**/Build/**/*.dSYM
    publishing:
      email:
        recipients:
          - YOUR_EMAIL
        notify:
          success: true # To not receive a notification when a build succeeds
          failure: false # To not receive a notification when a build fails
      app_store_connect:
        auth: integration
        # Configuration related to TestFlight (optional)
        # Note: This action is performed during post-processing.
        submit_to_testflight: true
        # Configuration related to App Store (optional)
        # Note: This action is performed during post-processing.
        submit_to_app_store: false

```

This workflow should be triggered manually or after each GitHub _tag_, if you need to automatize tag please, refer to [Automatic build and release with GitHub actions](/blog/automatic-build-and-release-with-github-actions/) first.

Then this workflow will pull your NodeJS deps, install them and build your JavaScript app.

> Each time you send a new tag, a release will be built in TestFlight.

Your App doesn't need to use Ionic, only Capacitor base is mandatory, it can have old Cordova module, but Capacitor JS plugin should be preferred.

## 5\. Trigger workflow


**Trigger the workflow**

Push the new commits to the branch `main` or `developement` to trigger the workflow.

![Started with commit](/build_result.webp)

After a few minutes, the build should be available in your App Store Connect dashboard.

![Testflight Dashboard](/testflight_app.webp)

## Start manually

You can start the workflow manually. 

First select the app you want to build, then click on **Start new build**.

![Select app](/select_app_codemagic.webp)

Then select the branch you want to build.

![Select branch](/select_branch.webp)

And click on **Start new build**.

Then go you the build list

![Build list](/build_list.webp)

And click on the build to see the result.

![Build result](/build_result.webp)

## Can deploy from local machine

Yes, you can, and it is effortless.

You can use Xcode to build and sign your app, as always.

### Thanks

This blog is based on the following articles:
- [Continuous delivery for IOS using Codemagic and GitHub actions](https://litoarias.medium.com/continuous-delivery-for-ios-using-Codemagic-and-github-actions-edf62ee68ecc/)
- [Codemagic Documentation](https://docs.Codemagic.tools/app-store-connect-api/)
- [This GitHub message from @mrogunlana](https://github.com/Codemagic-community/Codemagic-plugin-ionic/issues/63/#issuecomment-1074328057)
