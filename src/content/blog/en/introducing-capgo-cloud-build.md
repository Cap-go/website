---
slug: introducing-capgo-cloud-build
title: Introducing Capgo Cloud Build - Build Native Apps Without the Hassle
description: >-
  Build your Capacitor apps for iOS and Android in the cloud, just like Expo.
  No need for local Xcode or Android Studio - submit directly to app stores from your CLI.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2025-11-19T00:00:00.000Z
updated_at: 2025-11-19T06:05:57.000Z
head_image: /capgo_banner.webp
head_image_alt: Capgo illustration
keywords: cloud build, native build, capacitor, iOS build, Android build, CI/CD, app store, play store
tag: Product
published: true
locale: en
---

We're excited to announce **Capgo Cloud Build** - a new way to build your Capacitor apps for iOS and Android directly in the cloud, without the need for local development environments or CI/CD infrastructure.

## The Problem We're Solving

Building native mobile apps has always been a pain point for web developers. You need:

- **Local Development Tools**: Install and maintain Xcode (30+ GB) and Android Studio on your machine
- **Mac Hardware**: iOS builds require a Mac, which can be expensive or impossible on Linux/Windows CI runners
- **CI/CD Configuration**: Set up complex GitHub Actions or other CI/CD workflows with build caching, credentials management, and more
- **Dependency Management**: Keep build tools, SDKs, and certificates up to date across environments

What if you could skip all of that and just run a single command?

## Introducing Cloud Build

With Capgo Cloud Build, building your app is as simple as:

```bash
# First time: Save your credentials locally
npx @capgo/cli@latest build credentials save --platform ios
npx @capgo/cli@latest build credentials save --platform android

# Then build
npx @capgo/cli@latest build com.example.app
```

That's it. No Xcode, no Android Studio, no complex CI/CD setup. Just one command that:

1. Zips your project locally
2. Uploads it to Capgo's cloud infrastructure
3. Builds your app on dedicated infrastructure using your saved credentials
4. Streams logs to your terminal in real-time
5. Submits to the App Store and Play Store (if configured)

## How It Works

We built Capgo Cloud Build using the same approach as Expo EAS Build - dedicated cloud infrastructure that handles all the complexity for you.

But here's what makes us different: **we've been doing this for 3 years**. We've been building native apps for our clients internally since the beginning of Capgo, and we've learned exactly what it takes to build Capacitor apps reliably.

### Our Expertise

Over the past three years, we've:

- **Built our own Fastlane system** - We've created custom Fastlane configurations specifically optimized for Capacitor apps
- **Mastered Capacitor builds** - We have deep knowledge of what's important when building for Capacitor, from plugin configurations to native dependencies
- **Focused on native-only** - We build only the native parts (iOS and Android). Your JavaScript stays on your side - we never touch or store your web code
- **Refined our infrastructure** - Thousands of internal builds have helped us perfect our build system before making it available to you

This isn't a new experiment. It's battle-tested infrastructure we've relied on for years, now available as a service.

### For Android

Android builds run in secure Cloudflare sandboxes with instant cleanup after completion. Your app is compiled using Gradle with our Capacitor-optimized build scripts, signed, and ready to submit to the Play Store.

### For iOS

iOS builds run on dedicated Mac machines (Scaleway Mac minis) provisioned on-demand. We use our custom Fastlane setup - refined over years of Capacitor builds - to build, sign, and submit your app to TestFlight. Each build runs in an isolated macOS user account for security, and machines are automatically cleaned up after 24 hours.

### Real-Time Logs

Unlike other solutions, we stream build logs directly to your terminal as they happen. You can watch:

- Dependency installation
- Build compilation
- Code signing
- App store submission
- Any errors or warnings

And here's the important part: **we don't store your logs**. They're only available during the build through your CLI session, ensuring your privacy.

## How Credentials Work

Before you can build, you need to provide your signing credentials. Capgo handles this with maximum security in mind.

### Saving Credentials Locally

Your credentials are stored locally on your machine in `~/.capgo/credentials.json`:

```bash
# For iOS - provide certificates and provisioning profiles
npx @capgo/cli@latest build credentials save --platform ios \
  --certificate ./path/to/cert.p12 \
  --p12-password "your-password" \
  --provisioning-profile ./path/to/profile.mobileprovision

# For Android - provide keystore and passwords
npx @capgo/cli@latest build credentials save --platform android \
  --keystore ./path/to/keystore.jks \
  --keystore-alias "your-alias" \
  --keystore-key-password "key-password" \
  --keystore-store-password "store-password"
```

These credentials are **never uploaded to Capgo** until you request a build. They stay safely on your machine.

### What Happens During a Build

When you run a build command:

1. **Local**: CLI reads credentials from `~/.capgo/credentials.json`
2. **Upload**: Credentials are sent securely over HTTPS to Capgo's build servers along with your project
3. **Build**: Credentials are used ONLY during the active build process
4. **Cleanup**: Credentials are automatically deleted from Capgo servers after the build completes

### Security Guarantees

Here's what we guarantee about your credentials:

- ✅ **Never stored permanently** - Credentials exist on Capgo servers only during the active build
- ✅ **Automatic deletion** - Deleted immediately after build completion (maximum 24 hours even if build fails)
- ✅ **No logs, no artifacts** - We don't store build logs or IPA/APK files that might contain credential traces
- ✅ **Ephemeral environments** - Build environments are completely destroyed after use
- ✅ **Direct to stores** - Apps go directly to App Store/Play Store - Capgo never keeps them

### Managing Your Credentials

You have full control over your saved credentials:

```bash
# List saved credentials (passwords masked)
npx @capgo/cli@latest build credentials list

# Clear credentials for a specific platform
npx @capgo/cli@latest build credentials clear --platform ios

# Clear all credentials
npx @capgo/cli@latest build credentials clear
```

### What Credentials Are Needed?

**For iOS:**
- Build certificate (.p12 file and password)
- Provisioning profile(s) (.mobileprovision files)
- Optional: App Store Connect API key (for automated submission)

**For Android:**
- Keystore file (.jks or .keystore)
- Keystore alias
- Keystore key password
- Keystore store password
- Optional: Google Play service account JSON (for automated submission)

See our [credentials documentation](/docs/cli/cloud-build/credentials/) for detailed setup instructions.

## Privacy & Security First

Beyond credentials, we've designed the entire build system with privacy and security in mind:

- **No Log Storage**: Build logs stream to your terminal in real-time via Server-Sent Events (SSE) but are never persisted to disk or databases
- **No Artifact Storage**: Your built IPA/APK files go directly from our build machines to App Store/Play Store servers - Capgo never stores them
- **Automatic Cleanup**:
  - Android: Build sandbox destroyed instantly after completion
  - iOS: Mac user account cleaned after build, machine dismissed after 24 hours
- **Isolated Builds**: Each iOS build runs in a completely separate macOS user account with its own keychain
- **Your Code Privacy**: We only build native parts - your JavaScript/HTML/CSS never touches our servers
- **No Build History**: We don't maintain a database of your builds, versions, or any build metadata beyond what's needed for active builds

## Use It Anywhere

Cloud Build works everywhere - your local machine, GitHub Actions, GitLab CI, or any CI/CD platform.

### Local Development

On your local machine, save credentials once and build anytime:

```bash
# One-time credential setup
npx @capgo/cli@latest build credentials save --platform ios \
  --certificate ./certs/dist.p12 \
  --p12-password "$P12_PASSWORD" \
  --provisioning-profile ./certs/profile.mobileprovision

# Build anytime
npx @capgo/cli@latest build com.example.app --platform ios
```

### CI/CD Integration

In CI environments, you can either:

**Option 1: Save credentials in CI** (recommended for simplicity)

```yaml
# GitHub Actions example
- name: Save credentials and build
  env:
    CAPGO_TOKEN: ${{ secrets.CAPGO_TOKEN }}
    P12_PASSWORD: ${{ secrets.P12_PASSWORD }}
  run: |
    # Decode base64-encoded credentials from secrets
    echo "${{ secrets.IOS_CERTIFICATE_BASE64 }}" | base64 -d > cert.p12
    echo "${{ secrets.PROVISIONING_PROFILE_BASE64 }}" | base64 -d > profile.mobileprovision

    # Save credentials
    npx @capgo/cli@latest build credentials save --platform ios \
      --certificate ./cert.p12 \
      --p12-password "$P12_PASSWORD" \
      --provisioning-profile ./profile.mobileprovision

    # Build
    npx @capgo/cli@latest build com.example.app --platform ios
```

**Option 2: Provide credentials inline** (for advanced use cases)

You can also pass credentials directly in environment variables - see the [credentials documentation](/docs/cli/cloud-build/credentials/) for details.

No need to configure Mac runners, manage build caches, or install SDKs in your CI environment. Capgo handles all of that in the cloud.

## Simple, Transparent Pricing

We charge based on actual build time used:

- **Android builds**: 1× multiplier
- **iOS builds**: 2× multiplier (due to dedicated Mac hardware costs)

No surprise fees, no minimum commitments. You only pay for what you use.

## Your Code, Your Responsibility

One important principle of Capgo Cloud Build: **we only build the native parts**.

Your JavaScript, HTML, and CSS stay on your side. We never process, inspect, or store your web code. You're responsible for building your web assets locally (using `npm run build` or your preferred build tool), and we handle the native compilation.

This separation is intentional:
- **Better security** - Your application logic never leaves your control
- **Faster builds** - We don't waste time rebuilding your web code
- **Clear responsibility** - You control your web build process; we handle the native complexity

## What About Live Updates?

Cloud Build complements our existing [live update system](/blog/update-your-capacitor-apps-seamlessly-using-capacitor-updater/). Here's how they work together:

- **Cloud Build**: For native app changes (plugins, permissions, native code) that require App Store/Play Store review
- **Live Updates**: For web code changes (HTML, CSS, JavaScript) that can be deployed instantly without review

Use Cloud Build when you add a new plugin or change native configurations. Use live updates for everything else. Together, they give you the fastest possible deployment workflow.

## Current Status: Public Beta

Cloud Build is currently in **public beta**. We're working with a select group of early adopters to refine the experience before opening it to everyone.

Interested in trying it out? [Join our Discord](https://discord.com/invite/VnYRvBfgA6) and let us know - we'd love to have you as an early tester!

## Getting Started

Ready to build without the hassle? Check out the [Cloud Build documentation](/docs/cli/reference/build/) to learn more about:

- [Setting up credentials](/docs/cli/cloud-build/credentials/) - iOS certificates and Android keystores
- [Getting started guide](/docs/cli/cloud-build/getting-started/) - Your first build in 5 minutes
- [iOS-specific setup](/docs/cli/cloud-build/ios/) - Certificates, provisioning profiles, and App Store Connect
- [Android-specific setup](/docs/cli/cloud-build/android/) - Keystores and Play Store configuration
- [CI/CD integration](/docs/cli/cloud-build/getting-started/#cicd-integration) - Automate builds in your pipeline
- [Troubleshooting](/docs/cli/cloud-build/troubleshooting/) - Common issues and solutions

## What's Next?

We're actively working on:

- **Faster iOS builds**: Caching dependencies across builds to reduce build times
- **Build artifacts storage**: Optional download of IPA/APK files for manual distribution
- **Custom build scripts**: Support for pre/post-build hooks and custom Fastlane lanes
- **Build logs history**: Optional log storage for debugging and audit trails

We're building Capgo Cloud Build to be the simplest, most developer-friendly way to build native mobile apps. If you have feedback or feature requests, we'd love to hear from you in our [Discord community](https://discord.com/invite/VnYRvBfgA6).

Happy building!

---

## Learn More

- [Cloud Build Overview](/docs/cli/reference/build/)
- [Credentials Setup Guide](/docs/cli/cloud-build/credentials/)
- [Getting Started with Cloud Build](/docs/cli/cloud-build/getting-started/)
- [iOS Build Configuration](/docs/cli/cloud-build/ios/)
- [Android Build Configuration](/docs/cli/cloud-build/android/)
- [Join our Discord](https://discord.com/invite/VnYRvBfgA6)
