---
slug: "automatic-capacitor-ios-build-codemagic"
title: Automatic Capacitor IOS build with Codemagic
description: How to set up a CI/CD pipeline for your IOS Ionic app using Codemagic and Codemagic in 5 mins (2024)
author: Martin Donadieu
author_url: https://x.com/martindonadieu
created_at: 2024-07-24
updated_at: 2024-07-24
head_image: "/Codemagic_ios.webp"
head_image_alt: Codemagic testflight illustration
tag: CI/CD
published: true
next_blog: "automatic-capacitor-android-build-codemagic"

---


## Continuous Delivery for iOS using Codemagic


## Prerequisites

Before continuing with the tutorial…

-   iOS developer program membership.
-   Desire to read 😆…

## Important about the price

![Price GitHub Action](/price_codemagic.webp)

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

1.  Open your Codemagic Team settings, go to **Team integrations** > **Developer Portal** > **Manage keys**.
2.  Click the **Add key** button.
3.  Enter the `App Store Connect API key name`. This is a human readable name for the key that will be used to refer to the key later in application settings.
4.  Enter the `Issuer ID` and `Key ID` values.
5.  Click on **Choose a .p8 file** or drag the file to upload the App Store Connect API key downloaded earlier.
6.  Click **Save**.

_Now we can manage Codemagic with the App Store Connect API key, great!_


## 2\. Create certificates and provisioning profiles


Got to [Apple Developer Portal](https://developer.apple.com/account/resources/certificates/list) and create a new certificate for distribution.

![Create certificate](/create_certificate.webp)

Then you can download the certificate and the private key.

![Download certificate](/download_certificate.webp)

Now you need to convert the certificate to a `.p12` file.

With the `openssl` command, you can convert the certificate to a `.p12` file.

Convert the certificate to a `.pem` file.
```shell
openssl x509 -in certificate.cer -inform DER -out certificate.pem
```

Finally, you need to upload the certificate to Codemagic.

![Upload certificate](/upload_certificate.webp)


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

![Set GitHub secrets](/github_secets.webp)

1\. `APP_STORE_CONNECT_TEAM_ID` - the ID of your App Store Connect team in you’re in multiple teams.

2\. `DEVELOPER_APP_ID` - in App Store Connect, go to the app → **App Information** → Scroll down to the `General Information` section of your app and look for `Apple ID`.

3\. `DEVELOPER_APP_IDENTIFIER` - your app’s bundle identifier.

4\. `DEVELOPER_PORTAL_TEAM_ID` - the ID of your Developer Portal team if you’re in multiple teams.

5\. `Codemagic_APPLE_ID` - the Apple ID or developer email you use to manage the app.

6\. `GIT_USERNAME` & `GIT_TOKEN` - Your git username and your personal access token.

7\. `MATCH_PASSWORD` - the passphrase that you assigned when initializing match, will be used for decrypting the certificates and provisioning profiles.

8\. `PROVISIONING_PROFILE_SPECIFIER` - `match AppStore <YOUR_APP_BUNDLE_IDENTIFIER>`, eg. `match AppStore com.domain.blabla.demo`.

9\. `TEMP_KEYCHAIN_USER` & `TEMP_KEYCHAIN_PASSWORD` - assign a temp keychain user and password for your workflow.

10\. `APPLE_KEY_ID` — App Store Connect API Key 🔺Key ID.

11\. `APPLE_ISSUER_ID` — App Store Connect API Key 🔺Issuer ID.

12\. `APPLE_KEY_CONTENT` — App Store Connect API Key 🔺 Key file or Key content of _.p8_, [check it](https://github.com/Codemagic/Codemagic/issues/18655/#issuecomment-881764901)
<!-- markdown-link-check-disable-next-line -->
13\. `CERTIFICATE_STORE_URL` — The repo url of your Match keys (ex: https://github.com/***/Codemagic_match.git)

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

This workflow should be triggered after each GitHub _tag_, if you need to automatize tag please, refer to [Automatic build and release with GitHub actions](/blog/automatic-build-and-release-with-github-actions/) first.

Then this workflow will pull your NodeJS deps, install them and build your JavaScript app.

> Each time you send a new commit, a release will be built in TestFlight.

Your App doesn't need to use Ionic, only Capacitor base is mandatory, it can have old Cordova module, but Capacitor JS plugin should be preferred.

## 5\. Trigger workflow

**Create a Commit**

Make a _commit_, you should see the active workflow in the repository.

**Trigger the workflow**

Push the new commits to the branch `main` or `developement` to trigger the workflow.

![Started with commit](/cd_started.webp)

After a few minutes, the build should be available in your App Store Connect dashboard.

![Testflight Dashboard](/testflight_app.webp)

## Can deploy from local machine?

Yes, you can, and it is effortless.

You can use Xcode to build and sign your app, as always.

### Thanks

This blog is based on the following articles:
- [Continuous delivery for IOS using Codemagic and GitHub actions](https://litoarias.medium.com/continuous-delivery-for-ios-using-Codemagic-and-github-actions-edf62ee68ecc/)
- [Codemagic Documentation](https://docs.Codemagic.tools/app-store-connect-api/)
- [This GitHub message from @mrogunlana](https://github.com/Codemagic-community/Codemagic-plugin-ionic/issues/63/#issuecomment-1074328057)
