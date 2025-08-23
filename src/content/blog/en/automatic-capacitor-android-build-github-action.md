---
slug: automatic-capacitor-android-build-github-action
title: Automatic Capacitor Android build with GitHub actions
description: >-
  How to set up a CI/CD pipeline for your Android Capacitor app using fastlane and
  GitHub Actions in 5 minutes
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-10-27T00:00:00.000Z
updated_at: 2025-09-23T00:00:00.000Z
head_image: /fastlane_android.webp
head_image_alt: Fastlane Google play GitHub action illustration
keywords: Fastlane, CI/CD, Android, automatic build, automatic release, mobile app updates, Capacitor
tag: CI/CD
published: true
locale: en
next_blog: automatic-capacitor-ios-build-github-action
---

Setting up CI/CD for Capacitor apps can be complex and time-consuming. Here's what you need to know:

## Prerequisites

Before starting, you'll need to set up:

- A GitHub account with admin access
- Your app already published on Google Play Store with proper signing
- Android signing key and keystore files
- Google Cloud Console project with Play Store API enabled
- Service account with proper permissions
- Understanding of GitHub Actions workflows
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

[Setup CI/CD Now](https://cal.com/team/capgo/mobile-ci-cd-done-for-you/)

## Manual Setup Guide

If you still want to set up everything yourself, here's what you need to do:

## GitHub Actions Pricing

![Price GitHub Action](/price_github_actions.webp)

GitHub Actions offers free minutes based on your repository type:
- Public repositories: 2,000 minutes/month
- Private repositories: 2,000 minutes/month (Linux runners)

For private projects, costs are approximately $0.008/minute. A typical build takes 3-5 minutes.

## Manual Setup Steps

1. Set up Fastlane
2. Configure GitHub secrets
3. Create GitHub Actions workflow

## 1. Set Up Fastlane

Create a `fastlane` folder at your project root and add a `Fastfile` with this content:

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
        
        # Get previous build number and increment
        previous_build_number = google_play_track_version_codes(
            package_name: ENV['DEVELOPER_PACKAGE_NAME'],
            track: "internal",
            json_key_data: json_key_data,
        )[0]
        current_build_number = previous_build_number + 1
        sh("export NEW_BUILD_NUMBER=#{current_build_number}")
        
        # Build the app
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
        
        # Upload to Play Store
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
end
```

## 2. Configure GitHub Secrets

You need to store sensitive information securely in GitHub. Go to your repository → Settings → Secrets and variables → Actions → New repository secret.

### Required Secrets:

1. **Google Play Service Account Key**
   - Create a service account in Google Cloud Console
   - Enable Google Play Developer API
   - Grant the service account access to your app in Play Console
   - Download the JSON key file
   - Convert to base64: `base64 service_account_key.json | pbcopy`
   - Add as `PLAY_CONFIG_JSON`

2. **Android Signing Key**
   - Convert your keystore to base64: `base64 your_keystore.jks | pbcopy`
   - Add as `ANDROID_KEYSTORE_FILE`
   - Add keystore details:
     - `KEYSTORE_KEY_ALIAS`
     - `KEYSTORE_KEY_PASSWORD`
     - `KEYSTORE_STORE_PASSWORD`
     - `DEVELOPER_PACKAGE_NAME` (e.g., com.example.app)

## 3. Create GitHub Actions Workflow

Create `.github/workflows/build-upload-android.yml`:

```yaml
name: Build and Deploy Android App

on:
  push:
    tags:
      - '*'

jobs:
  build_android:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v5
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 24
          cache: npm
          
      - name: Install dependencies
        run: npm ci
        
      - name: Cache Gradle
        uses: actions/cache@v3
        with:
          path: |
            ~/.gradle/caches
            ~/.gradle/wrapper
          key: ${{ runner.os }}-gradle-${{ hashFiles('**/*.gradle*', '**/gradle-wrapper.properties') }}
          restore-keys: |
            ${{ runner.os }}-gradle-
            
      - name: Build app
        run: npm run build
        
      - name: Sync Capacitor
        run: npx cap sync
        
      - name: Setup Java
        uses: actions/setup-java@v4
        with:
            distribution: 'zulu'
            java-version: '17'
            
      - name: Setup Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: '3.0'
          bundler-cache: true
          
      - name: Run Fastlane
        uses: maierj/fastlane-action@v3.1.0
        env:
          PLAY_CONFIG_JSON: ${{ secrets.PLAY_CONFIG_JSON }}
          ANDROID_KEYSTORE_FILE: ${{ secrets.ANDROID_KEYSTORE_FILE }}
          DEVELOPER_PACKAGE_NAME: ${{ secrets.DEVELOPER_PACKAGE_NAME }}
          KEYSTORE_KEY_ALIAS: ${{ secrets.KEYSTORE_KEY_ALIAS }}
          KEYSTORE_KEY_PASSWORD: ${{ secrets.KEYSTORE_KEY_PASSWORD }}
          KEYSTORE_STORE_PASSWORD: ${{ secrets.KEYSTORE_STORE_PASSWORD }}
        with:
          lane: android beta
          
      - name: Upload artifact
        uses: actions/upload-artifact@v2
        with:
          name: android-release
          path: ./android/app/build/outputs/bundle/release/app-release.aab
          retention-days: 10
```

## How It Works

1. Create a Git tag to trigger the workflow
2. GitHub Actions builds your app
3. Fastlane uploads it to Google Play beta channel
4. Your app is automatically updated

## Build Time and Costs

- Build time: 3-5 minutes
- Cost for private repos: ~$0.04 per build
- Free for open-source projects

## Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions/)
- [Fastlane Documentation](https://docs.fastlane.tools/)
