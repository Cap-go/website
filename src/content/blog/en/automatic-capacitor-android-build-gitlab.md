---
slug: automatic-capacitor-android-build-gitlab
title: Automatic Capacitor Android build with GitLab
description: >-
  How to set up a CI/CD pipeline for your Android Ionic app using fastlane and
  GitLab in 5 mins
author: Anik Dhabal Babu
author_image_url: 'https://avatars.githubusercontent.com/u/81948346?v=4'
author_url: 'https://x.com/anikdhabal'
created_at: 2023-09-27T00:00:00.000Z
updated_at: 2023-09-27T00:00:00.000Z
head_image: /andriod_app_gitlab.webp
head_image_alt: Fastlane Google play GitLab illustration
keywords: Fastlane, CI/CD, Android, automatic build, automatic release, mobile app updates
tag: CI/CD
published: true
locale: en
next_blog: null
---

# Automatic Android Builds with GitLab CI

Setting up CI/CD for Capacitor apps can be complex and time-consuming. Here's what you need to know:

## Prerequisites

Before starting, you'll need to set up:

- A GitLab account with admin access
- Your app already published on Google Play Store with proper signing
- Android signing key and keystore files
- Google Cloud Console project with Play Store API enabled
- Service account with proper permissions
- Understanding of GitLab CI/CD workflows
- Knowledge of Fastlane configuration
- Time to maintain and debug the pipeline

## Professional CI/CD Setup by Capgo

Skip the complexity. [Capgo](https://capgo.app/docs/getting-started/cicd-integration/) configures your CI/CD pipeline directly in your preferred platform:

- **Platform Independence**: Works with GitHub Actions, GitLab CI, or others
- **Seamless Integration**: No platform switch needed, works with your current process
- **Tailored Configuration**: Customized setup matching your project needs
- **Expert Guidance**: We've already set up CI/CD for 50+ apps

### Pricing
- One-time setup fee: $2,600
- Your running costs: ~$300/year
- Compare to Other proprietary solution: $6,000/year
- **Save $26,100 over 5 years**

[Setup CI/CD Now](https://cal.com/martindonadieu/mobile-ci-cd-done-for-you/)

## Manual Setup Guide

If you still want to set up everything yourself, here's what you need to do:

**Steps to follow in the post**

1.  _Copy Fastline files_
2.  _Storing your secrets in GitLab encrypted secrets_
3.  _Creating & storing your Google Play service account key_
4.  _Storing your Android signing key_
5.  _Set up your GitLab workflow .yml file_

## 1. Copy Fastline files

Fastlane is a Ruby library created to automate common mobile development tasks. Using Fastlane, you can configure custom "lanes" which bundle a series of "actions" that perform tasks that you'd normally perform using Android studio. You can do a lot with Fastlane, but for the purposes of this tutorial, we'll be using only a handful of core actions.

Create a Fastlane folder at the root of your project and copy the following files:
Fastlane
```ruby
default_platform(:android)

KEYSTORE_KEY_ALIAS = ENV["KEYSTORE_KEY_ALIAS"]
KEYSTORE_KEY_PASSWORD = ENV["KEYSTORE_KEY_PASSWORD"]
KEYSTORE_STORE_PASSWORD = ENV["KEYSTORE_STORE_PASSWORD"]

platform :android do
    desc "Deploy a beta version to the Google Play"
    private_lane :verify_changelog_exists do |version_code: |
      changelog_path = "android/metadata/en-US/changelogs/#{version_code}.txt"
      UI.user_error!("Missing changelog file at #{changelog_path}") unless File.exist?(changelog_path)
      UI.message("Changelog exists for version code #{version_code}")
    end

    private_lane :verify_upload_to_staging do |version_name: |
      UI.message "Skipping staging verification step"
    end
    lane :beta do
				keystore_path = "#{Dir.tmpdir}/build_keystore.keystore"
				File.write(keystore_path, Base64.decode64(ENV['ANDROID_KEYSTORE_FILE']))
				json_key_data = Base64.decode64(ENV['PLAY_CONFIG_JSON'])
				previous_build_number = google_play_track_version_codes(
					package_name: ENV['DEVELOPER_PACKAGE_NAME'],
					track: "internal",
					json_key_data: json_key_data,
				)[0]

				current_build_number = previous_build_number + 1
				sh("export NEW_BUILD_NUMBER=#{current_build_number}")
        gradle(
          task: "clean bundleRelease",
          project_dir: 'android/',
          print_command: false,
          properties: {
            "android.injected.signing.store.file" => "#{keystore_path}",
            "android.injected.signing.store.password" => "#{KEYSTORE_STORE_PASSWORD}",
            "android.injected.signing.key.alias" => "#{KEYSTORE_KEY_ALIAS}",
            "android.injected.signing.key.password" => "#{KEYSTORE_KEY_PASSWORD}",
						'versionCode' => current_build_number
          })
        upload_to_play_store(
					package_name: ENV['DEVELOPER_PACKAGE_NAME'],
					json_key_data: json_key_data,
          track: 'internal',
          release_status: 'completed',
          skip_upload_metadata: true,
          skip_upload_changelogs: true,
          skip_upload_images: true,
          skip_upload_screenshots: true,
        )
    end
    lane :build do
      gradle(
        task: "clean bundleRelease",
        project_dir: 'android/',
        print_command: false,
        properties: {
          "android.injected.signing.store.file" => "#{keystore_path}",
          "android.injected.signing.store.password" => "#{KEYSTORE_STORE_PASSWORD}",
          "android.injected.signing.key.alias" => "#{KEYSTORE_KEY_ALIAS}",
          "android.injected.signing.key.password" => "#{KEYSTORE_KEY_PASSWORD}",
        })
    end
    lane :prod_release do
      build_gradle = File.read("../android/app/build.gradle")

      verify_changelog_exists(version_code: build_gradle.match(/versionCode (\d+)/)[1])
      verify_upload_to_staging(version_name: build_gradle.match(/versionName '([\d\.]+)'/)[1])

      supply(
        track_promote_to: 'beta',
        skip_upload_apk: true,
        skip_upload_aab: true,
        skip_upload_metadata: false,
        skip_upload_changelogs: false,
        skip_upload_images: false,
        skip_upload_screenshots: false
      )
    end
end
```

### Storing Your Secrets in GitLab CI/CD Variables

GitLab provides a way to store encrypted CI/CD variables, similar to GitHub's repository secrets. To store your sensitive information securely.

1. Go to your GitLab project's Settings.
2. Navigate to CI/CD > Variables
3. Add the following variables:

-   ANDROID_KEYSTORE_FILE:  the base64-encoded `.jks` or `.keystore` file used to sign your Android builds. This will either be the keystore file associated with your upload key (if using Play App Signing), or your app signing key.
-   KEYSTORE_KEY_PASSWORD: the password associated with the keystore file
-   KEYSTORE_KEY_ALIAS: the key store alias
-   KEYSTORE_STORE_PASSWORD: the private key password
-   DEVELOPER_PACKAGE_NAME: your android app ID like com.example.app
-   PLAY_CONFIG_JSON: The base64-encoded service account key JSON.

### Creating a Google Play Service Account Key

To generate the `PLAY_CONFIG_JSON` secret, follow these steps:

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google Play Android Developer API
4. Create a service account:
   - Go to "IAM & Admin" > "Service Accounts"
   - Click "Create Service Account"
   - Give it a name and description
   - Click "Create and Continue"
   - Skip role assignment and click "Done"
5. Generate a JSON key:
   - Find your service account in the list
   - Click the three dots menu > "Manage keys"
   - Click "Add Key" > "Create new key"
   - Choose JSON format
   - Click "Create"
6. Grant the service account access to your app in the Play Console:
   - Go to [Play Console](https://play.google.com/console)
   - Navigate to "Users and permissions"
   - Click "Invite new users"
   - Enter the service account email (ends with @*.iam.gserviceaccount.com)
   - Grant "Release to production" permission
   - Click "Invite user"
7. Convert the JSON key to base64:
   ```bash
   base64 -i path/to/your/service-account-key.json | pbcopy
   ```
8. Add the base64-encoded string as the `PLAY_CONFIG_JSON` variable in GitLab

## Set Up Your GitLab CI/CD Pipeline

Create a .gitlab-ci.yml file at the root of your project to define your CI/CD pipeline. Below is an example of how you can structure your pipeline:

```yaml

image: mingc/android-build-box:latest

stages:
  - build
  - upload_to_capgo
  - build_and_upload_android

build:
  stage: build
  tags:
    - saas-linux-xlarge-amd64
  cache:
    - key:
        files:
          - bun.lockb
      paths:
        - .node_modules/
  script:
    - npm install
    - npm run build
  artifacts:
    paths:
      - node_modules/
      - dist/
  only:
    - master

upload_to_capgo:
  stage: upload_to_capgo
  tags:
    - saas-linux-xlarge-amd64
  script:
    - npx @capgo/cli@latest bundle upload -a $CAPGO_TOKEN -c dev
  dependencies:
    - build
  when: manual
  only:
    - master

build_and_upload_android:
  tags:
    - saas-linux-xlarge-amd64
  stage:    build_and_upload_android
  cache:
    - key:
        files:
          - android/gradle/wrapper/gradle-wrapper.properties
      paths:
        - ~/.gradle/caches/
  script:
    - npx cap sync android
    - npx cap copy android
    - bundle exec fastlane android beta # We do create a tag for the build to trigger XCode cloud builds
  dependencies:
    - build
  when: manual
  only:
    - master

```

## Trigger the Pipeline

Whenever you push a new tag to your GitLab repository, GitLab CI/CD will automatically trigger the defined pipeline, which will build and deploy your Android app using Fastlane.

Make sure to adjust the paths and dependencies according to your project's structure and requirements. This setup will help you automate the deployment of your Android app on GitLab CI/CD.

## Conclusion

By configuring GitLab CI/CD with the mingc/android-build-box Docker image, you can automate the Android app build process, making your development workflow more efficient and reliable. This automation frees up your time to focus on the core aspects of app development, ultimately helping you deliver high-quality Android apps more efficiently.
