---
slug: automatic-capacitor-ios-build-github-action
title: Automatic Capacitor IOS build with GitHub actions with certificate
description: >-
  How to set up a CI/CD pipeline for your IOS Ionic app using fastlane and
  GitHub Actions in 5 mins (2024)
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2024-08-04T00:00:00.000Z
updated_at: 2024-08-04T00:00:00.000Z
head_image: /fastlane_ios.webp
head_image_alt: Fastlane testflight GitHub action illustration
tag: CI/CD
published: true
locale: en
next_blog: automatic-capacitor-android-build-github-action
---

## Continuous Delivery for iOS using Fastlane and GitHub Actions and certificate


## Prerequisites

Before continuing with the tutorial…

-   Make sure you have Fastlane [installed](https://docs.fastlane.tools/) on your development machine.
-   iOS developer program membership.
-   Desire to read 😆…

## Important about the price

![Price GitHub Action](/price_github_actions.webp)

[https://github.com/features/actions](https://github.com/features/actions/)

The service is '_free'_ up to the limit, depending on the chosen machine.  
We are going to use a **_macOS_** machine, you can see in the screenshot its price and limits (prices as of the creation of the tutorial, they could undergo changes in the future)

🔴 **_Once warned of requirements and prices, if you like, we continue…_**

> **_📣_ In the post we assume that we have the app created in iTunes connect, we do have the certificates of the Apple ecosystem, everything will be copied by Fastlane!**

## Let's go to the mess 🧑🏽💻

**Steps to follow in the post**

1.  _Using App Store Connect API with Fastlane_
2.  _Requirements_
3.  _Creating an App Store Connect API Key_
4.  _Using an App Store Connect API Key_
5.  _Copy Fastline files_
6.  _Configure GitHub Actions_


## 1. Using App Store Connect API with Fastlane

> Starting February 2021, two-factor authentication or two-step verification is required for all users to sign in to App Store Connect. This extra layer of security for your Apple ID helps ensure that you're the only person who can access your account.  
> From [Apple Support](https://developer.apple.com/support/authentication/)

## Requirements

To be able to use App Store Connect API, Fastlane needs **three** things:

1.  Issuer ID
2.  Key ID
3.  Key file or Key content

## Creating an App Store Connect API Key

To generate keys, you must have Admin permission in App Store Connect. If you don't have that permission, you can direct the relevant person to this article and follow the following instructions.

1 — Log in to [App Store Connect](https://appstoreconnect.apple.com/).

2 — Select [Users and Access](https://appstoreconnect.apple.com/access/users/).

![App Store Connect user access](/select_user_access.webp)

3 — Select the API Keys tab.

![App Store Connect API Keys](/user_access_keys.webp)

4 — Click Generate API Key or the Add (+) button.

![App Store Connect API keys create](/user_access.webp)

5 — Enter a name for the key. The name is for your reference only and is not part of the key itself.

![App Store Connect API keys create name](/gen_key.webp)

6 — Under Access, select the role for the key. The roles that apply to keys are the same roles that apply to users on your team. See [role permissions](https://help.apple.com/app-store-connect/#/deve5f9a89d7/). We recommend to select **App management**.


7 — Click Generate.

> **An API key's access cannot be limited to specific apps.**

The new key's name, key ID, a download link, and other information appear on the page.

![App Store Connect download keys](/download_key.webp)

You can grab all three necessary information here.  
<1> Issue ID.  
<2> Key ID.  
<3> Click "Download API Key" to download your API private key. The download link appears only if the private key has not yet been downloaded. Apple does not keep a copy of the private key. So, you can download it only once.

> _🔴_ Store your private key in a safe place. You should never share your keys, store keys in a code repository, or include keys in client-side code.

## Using an App Store Connect API Key

The API Key file (p8 file that you download), the key ID, and the issuer ID are needed to create the JWT token for authorization. There are multiple ways that these pieces of information can be input into Fastlane using Fastlane's new action, `app_store_connect_api_key`. You can learn other ways in [Fastlane documentation](https://docs.fastlane.tools/actions/app_store_connect_api_key/). I show this method because I think it is the easiest way to work with most CI out there, where you can set environment variables.

_Now we can manage Fastlane with the App Store Connect API key, great!_

### Create certificates and provisioning profiles

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

> The name will be used to identify the profile in Fastlane, under the value of `APPLE_PROFILE_NAME`.

![Generate the profile](/generate_profile.webp)

You can download the profile as a `.mobileprovision` file.

![Download the profile](/download_profile.webp)


### Creating GitHub secrets for your certificate and provisioning profile

The signing process involves storing certificates and provisioning profiles, transferring them to the runner, importing them to the runner's keychain, and using them in your build.

Create secrets in your repository or organization for the following items:

-   Your Apple signing certificate.
    
    -   This is your `p12` certificate file. For more information on exporting your signing certificate from Xcode, see the [Xcode documentation](https://help.apple.com/xcode/mac/current/#/dev154b28f09).
        
    -   You should convert your certificate to Base64 when saving it as a secret. In this example, the secret is named `BUILD_CERTIFICATE_BASE64`.
        
    -   Use the following command to convert your certificate to Base64 and copy it to your clipboard:
        
        ```shell
        base64 -i BUILD_CERTIFICATE.p12 | pbcopy
        ```
        
-   The password for your Apple signing certificate.
    
    -   In this example, the secret is named `P12_PASSWORD`.
-   Your Apple provisioning profile.
    
    -   For more information on exporting your provisioning profile from Xcode, see the [Xcode documentation](https://help.apple.com/xcode/mac/current/#/deva899b4fe5).
        
    -   You should convert your provisioning profile to Base64 when saving it as a secret. In this example, the secret is named `BUILD_PROVISION_PROFILE_BASE64`.
        
    -   Use the following command to convert your provisioning profile to Base64 and copy it to your clipboard:
        
        ```shell
        base64 -i PROVISIONING_PROFILE.mobileprovision | pbcopy
        ```


## 2\. Copy Fastline files

Fastlane is a Ruby library created to automate common mobile development tasks. Using Fastlane, you can configure custom “lanes” which bundle a series of “actions” that perform tasks that you’d normally perform using Android studio. You can do a lot with Fastlane, but for the purposes of this tutorial, we’ll be using only a handful of core actions.


Create a Fastlane folder at the root of your project and copy the following files:
Fastfile
```ruby
platform :ios do
  desc 'Export ipa and submit to TestFlight'
  lane :beta do
    keychain_info = { keychain_name: "ios-build-#{Time.now.to_i}.keychain", keychain_password: SecureRandom.uuid }
    
    begin
      setup_signing(keychain_info)
      bump_build_number
      build_app_with_signing(keychain_info)
      submit_to_testflight
    ensure
      cleanup_keychain(keychain_info)
    end
  end

  private_lane :setup_signing do |options|
    create_keychain(
      name: options[:keychain_name],
      password: options[:keychain_password],
      unlock: true,
      timeout: 0,
      lock_when_sleeps: false, 
      add_to_search_list: true
    )
    import_cert(options)
    install_profile
    update_project_settings
  end

  lane :bump_build_number do
		file = File.read('../package.json')
		data_hash = JSON.parse(file)
		api_key = app_store_connect_api_key(
      key_id: ENV['APPLE_KEY_ID'],
      issuer_id: ENV['APPLE_ISSUER_ID'],
      key_content: Base64.decode64(ENV['APPLE_KEY_CONTENT']),
      duration: 1200,
      in_house: false
    )
		build_num = app_store_build_number(
      api_key: api_key,
			app_identifier: ENV['BUNDLE_IDENTIFIER'],
			live: false
    )
		build_num = build_num + 1
		UI.message("Bumped build number to #{build_num}")
		increment_build_number(
			build_number: build_num,
			xcodeproj: "./ios/App/App.xcodeproj",
			skip_info_plist: true
		)
	end

  private_lane :import_cert do |options|
    cert_path = "#{Dir.tmpdir}/build_certificate.p12"
    File.write(cert_path, Base64.decode64(ENV['BUILD_CERTIFICATE_BASE64']))
    import_certificate(
      certificate_path: cert_path,
      certificate_password: ENV['P12_PASSWORD'] || "",
      keychain_name: options[:keychain_name],
      keychain_password: options[:keychain_password],
      log_output: true
    )
    File.delete(cert_path)
  end  
  
  private_lane :cleanup_keychain do |options|
    delete_keychain(
      name: options[:keychain_name]
    )
  end  

  private_lane :install_profile do
    profile_path = "#{Dir.tmpdir}/build_pp.mobileprovision"
    File.write(profile_path, Base64.decode64(ENV['BUILD_PROVISION_PROFILE_BASE64']))
    UI.user_error!("Failed to create provisioning profile at #{profile_path}") unless File.exist?(profile_path)
    ENV['PROVISIONING_PROFILE_PATH'] = profile_path
    install_provisioning_profile(path: profile_path)
    File.delete(profile_path)
  end

  private_lane :update_project_settings do
    update_code_signing_settings(
      use_automatic_signing: false,
      path: "./ios/App/App.xcodeproj",
      code_sign_identity: "iPhone Distribution",
      profile_name: ENV['APPLE_PROFILE_NAME'],
      bundle_identifier: ENV['BUNDLE_IDENTIFIER'],
      team_id: ENV['APP_STORE_CONNECT_TEAM_ID']
    )
    update_project_team(
      path: "./ios/App/App.xcodeproj",
      teamid: ENV['APP_STORE_CONNECT_TEAM_ID']
    )
  end

  private_lane :build_app_with_signing do |options|
    unlock_keychain(
      path: options[:keychain_name],
      password: options[:keychain_password],
      set_default: false
    )
    build_app(
      workspace: "./ios/App/App.xcworkspace",
      scheme: "App",
      configuration: "Release",
      export_method: "app-store",
      output_name: "App.ipa",
      export_options: {
        provisioningProfiles: {
          ENV['BUNDLE_IDENTIFIER'] => ENV['APPLE_PROFILE_NAME']
        }
      },
      xcargs: "-verbose",
      buildlog_path: "./build_logs",
      export_xcargs: "-allowProvisioningUpdates",
    )
  end   

  private_lane :submit_to_testflight do
    api_key = app_store_connect_api_key(
      key_id: ENV['APPLE_KEY_ID'],
      issuer_id: ENV['APPLE_ISSUER_ID'],
      key_content: Base64.decode64(ENV['APPLE_KEY_CONTENT']),
      duration: 1200,
      in_house: false
    )
    pilot(
      api_key: api_key,
      skip_waiting_for_build_processing: true,
      skip_submission: true,
      distribute_external: false,
      notify_external_testers: false,
      ipa: "./App.ipa"
    )
  end
end
```

## **Build Processing**

In GitHub Actions, **you are billed based on the minutes** you have used for running your CI/CD workflow. From experience, it takes about 10–15 minutes before a build can be processed in App Store Connect.

For private projects, the estimated cost per build can go up to **$0.08/min x 15 mins = $1.2**, or more, depending on the configuration or dependencies of your project.

If you share the same concerns for the pricing as I do for private projects, you can keep the `skip_waiting_for_build_processing` to `true`.

What’s the catch? You have to manually update the compliance of your app in App Store Connect after the build has been processed, for you to distribute the build to your users.

This is just an optional parameter to update if you want to save on the build minutes for private projects. For free projects, this shouldn’t be a problem at all. See [pricing](https://github.com/pricing/).


## 3\. Setup GitHub Actions

**Configure GitHub secrets**

Ever wonder where the values of the `ENV` are coming from? Well, it’s not a secret anymore – it’s from your project’s secret. 🤦

![Set GitHub secrets](/github_secets.webp)

1\. `APP_STORE_CONNECT_TEAM_ID` - the ID of your App Store Connect team in you’re in multiple teams.

2\. `PROVISIONING_PROFILE_SPECIFIER` - `match AppStore <YOUR_APP_BUNDLE_IDENTIFIER>`, eg. `match AppStore com.domain.blabla.demo`.

3\. `BUILD_CERTIFICATE_BASE64` - Base64 encoded certificate.

4\. `BUILD_PROVISION_PROFILE_BASE64` - Base64 encoded provisioning profile.

5\. `BUNDLE_IDENTIFIER` - your app’s bundle identifier.

6\. `APPLE_KEY_ID` — App Store Connect API Key 🔺Key ID.

7\. `APPLE_ISSUER_ID` — App Store Connect API Key 🔺Issuer ID.

8\. `APPLE_KEY_CONTENT` — App Store Connect API Key 🔺 Key content of _.p8_, [check it](https://github.com/fastlane/fastlane/issues/18655/#issuecomment-881764901)

## **4\. Configure GitHub workflow file**

Create a GitHub workflow directory.

```
cd .github/workflows
```

Inside the `workflow` folder, create a file named `build-upload-ios.yml`and add the following.

```yaml
name: Build source code on ios

on:
  push:
    tags:
      - '*'

jobs:
  build_ios:
    runs-on: macOS-latest
    steps:
      - uses: actions/checkout@v4
      - name: Use Node.js 20
        uses: actions/setup-node@v3
        with:
          node-version: 20
          cache: npm
      - name: Install dependencies
        id: install_code
        run: npm ci
      - name: Build
        id: build_code
        run: npm run build
      - name: Build
        id: build_code
        run: npm run mobile
      - uses: actions/cache@v3
        with:
          path: ios/App/Pods
          key: ${{ runner.os }}-pods-${{ hashFiles('**/Podfile.lock') }}
          restore-keys: |
            ${{ runner.os }}-pods-
      - name: Sync
        id: sync_code
        run: npx cap sync
      - uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.0'
          bundler-cache: true
      - uses: maierj/fastlane-action@v3.1.0
        env:
          APP_STORE_CONNECT_TEAM_ID: ${{ secrets.APP_STORE_CONNECT_TEAM_ID }}
          BUNDLE_IDENTIFIER: ${{ secrets.BUNDLE_IDENTIFIER }}
          BUILD_CERTIFICATE_BASE64: ${{ secrets.BUILD_CERTIFICATE_BASE64 }}
          BUILD_PROVISION_PROFILE_BASE64: ${{ secrets.BUILD_PROVISION_PROFILE_BASE64 }}
          APPLE_KEY_ID: ${{ secrets.APPLE_KEY_ID }}
          APPLE_ISSUER_ID: ${{ secrets.APPLE_ISSUER_ID }}
          APPLE_KEY_CONTENT: ${{ secrets.APPLE_KEY_CONTENT }}
          APPLE_PROFILE_NAME: ${{ secrets.APPLE_PROFILE_NAME }}
        with:
          lane: ios beta
      - name: Upload release bundle
        uses: actions/upload-artifact@v4
        with:
          name: ios-release
          path: ./App.ipa
          retention-days: 10
```

This workflow should be triggered after each GitHub _tag_, if you need to automatize tag please, refer to [Automatic build and release with GitHub actions](/blog/automatic-build-and-release-with-github-actions/) first.

Then this workflow will pull your NodeJS deps, install them and build your JavaScript app.

> Each time you send a new commit, a release will be built in TestFlight.

Your App doesn't need to use Ionic, only Capacitor base is mandatory., it can have old Cordova module, but Capacitor JS plugin should be preferred.

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
- [Continuous delivery for IOS using Fastlane and GitHub actions](https://litoarias.medium.com/continuous-delivery-for-ios-using-fastlane-and-github-actions-edf62ee68ecc/)
- [Fastlane Documentation](https://docs.fastlane.tools/app-store-connect-api/)
- [This GitHub message from @mrogunlana](https://github.com/fastlane-community/fastlane-plugin-ionic/issues/63/#issuecomment-1074328057)
- [This GitHub documentation](https://docs.github.com/en/actions/deployment/deploying-xcode-applications/installing-an-apple-certificate-on-macos-runners-for-xcode-development)
