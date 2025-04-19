---
slug: capacitor-cli-project-setup-guide
title: "Capacitor CLI: Project Setup Guide"
description: Learn how to set up Capacitor CLI for building native iOS and Android apps using web technologies in a few easy steps.
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2025-04-18T03:02:50.225Z
updated_at: 2025-04-18T03:04:53.935Z
head_image: https://assets.seobotai.com/capgo.app/6801ba663c6b972ab5067847-1744945493935.jpg
head_image_alt: Mobile Development
keywords: Capacitor, CLI, mobile apps, iOS, Android, project setup, live updates, troubleshooting
tag: Development, Mobile, Updates
published: true
locale: en
next_blog: ''
---

**Want to build iOS and Android apps with one codebase?** [Capacitor](https://capacitorjs.com/) CLI simplifies the process, letting you create native apps using web technologies. Here's what you'll learn:

-   **Quick Setup**: Install Capacitor CLI and initialize your project in minutes.
-   **Platform Integration**: Add iOS and Android support with simple commands.
-   **Live Updates**: Use [Capgo](https://capgo.app/) for instant over-the-air updates.
-   **Common Fixes**: Troubleshoot issues like sync errors or build failures.

**Key Steps to Get Started:**

1.  Install [Node.js](https://nodejs.org/en), npm, JDK, [Xcode](https://developer.apple.com/xcode/), and [Android Studio](https://developer.android.com/studio).
2.  Run `npm install @capacitor/core @capacitor/cli` and initialize your project.
3.  Add iOS and Android platforms using `npx cap add ios` and `npx cap add android`.
4.  Optional: Set up Capgo for live [app updates](https://capgo.app/plugins/capacitor-updater/).

This guide covers everything you need to set up Capacitor CLI, configure platforms, and deploy your app. Let’s dive in!

## Introducing [Capacitor](https://capacitorjs.com/) Configure

![Capacitor](https://assets.seobotai.com/capgo.app/6801ba663c6b972ab5067847/7e137b9b90adb3934b29b03381f213c1.jpg)

<iframe src="https://www.youtube.com/embed/HufvY63esXs" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## Setup Requirements

To get started, make sure you have the following tools installed:

-   **Node.js** (version 14 or newer) and **npm**
-   **Java JDK** (version 11 or newer)
-   **Xcode** (version 12 or newer for iOS builds)
-   **Android Studio** (for Android builds)
-   **Capacitor CLI** (version 6 or 7)

_Optional:_ If you want to enable live updates, check out the "[Capgo Setup Guide](https://capgo.app/docs/plugin/cloud-mode/getting-started/)" below.

## CLI Installation Steps

Before starting, ensure you have **Node.js**, **npm**, **JDK**, **Xcode**, and **Android Studio** set up. Once ready, you can install the Capacitor CLI by running:

```bash
npm install --save @capacitor/core @capacitor/cli
npx cap init
```

This command installs Capacitor and sets up its core components.

After completing this step, move on to **Creating a New Project** to scaffold your application.

## Creating a New Project

To get started with your project [using Capacitor CLI](https://capgo.app/docs/cli/commands/), follow these steps:

```bash
mkdir my-app && cd my-app
npm init -y
npx cap init my-app com.company.app --web-dir dist
```

### Updating the Configuration File

Edit the `capacitor.config.json` file to include the following settings:

```json
{
  "appId": "com.company.app",
  "appName": "My App",
  "webDir": "dist",
  "bundledWebRuntime": false,
  "server": {
    "hostname": "app.example.com",
    "androidScheme": "https"
  }
}
```

Once updated, use this configuration to set up Capacitor for your project.

## Platform Setup

Now that the project scaffolding is done, it’s time to set up iOS and Android targets.

### Adding iOS and Android

Start by installing the necessary platform-specific packages using the Capacitor CLI:

```bash
npm install @capacitor/ios @capacitor/android
npx cap add ios
npx cap add android
```

For iOS, make sure you have Xcode 14 or later, [CocoaPods](https://cocoapods.org/) 1.11 or newer, and macOS 12 or higher. For Android, you’ll need Android Studio Giraffe (2022.3.1+), JDK 17 or later, and [Gradle](https://gradle.org/) 7.5 or above.

Once installed, you’ll need to keep your native targets updated with changes to your web application.

### Platform Updates

To sync your platforms with the latest web changes, follow these steps after updating your web app:

```bash
npm run build
npx cap sync
```

The `cap sync` command handles two tasks:

-   Copies updated web assets to the native platforms
-   Updates native configurations and plugins to match the latest changes

### IDE Setup

Open the platform-specific projects in the appropriate IDEs:

```bash
npx cap open ios     # Opens Xcode
npx cap open android # Opens Android Studio
```

**In Xcode:**

1.  Choose your development team.
2.  Set up signing certificates.
3.  Update your bundle identifier.

**In Android Studio:**

1.  Modify the application ID in `build.gradle`.
2.  Configure the keystore for signing.
3.  Set up both debug and release build variants.

When everything is configured, build the projects using `npx cap build ios` or `npx cap build android`. Don’t forget to run `npx cap sync` again to ensure all assets are up to date.

## [Capgo](https://capgo.app/) Setup Guide

![Capgo](https://assets.seobotai.com/capgo.app/6801ba663c6b972ab5067847/d09851ee64a6d6c4e2e08ff1d656af11.jpg)

Set up Capgo to enable instant over-the-air updates for your app.

### Key Features of Capgo

Capgo offers several tools to streamline app updates:

-   **End-to-end encryption** ensures secure delivery of updates.
-   Updates run **in the background** when the app launches.
-   **Analytics tools** help track update success rates and user engagement.
-   A **one-click rollback** option lets you quickly recover from problematic updates.
-   Use the **[channel system](https://capgo.app/docs/plugin/cloud-mode/channel-system/)** for staged rollouts and beta testing.

### Installing Capgo

Follow these steps to get started with Capgo:

1.  [Install the Capgo CLI](https://capgo.app/docs/self-hosted/local-dev/cli/):
    
    ```bash
    npm install --save @capgo/cli
    ```
    
2.  [Initialize Capgo](https://capgo.app/docs/webapp/) in your project:
    
    ```bash
    npx capgo init
    ```
    
3.  Build and release updates:
    
    ```bash
    npm run build
    npx capgo release
    ```
    
4.  Open the app to trigger the background update process.
    

### Best Practices

-   Use channels to test updates before rolling them out to all users.
-   Monitor analytics to ensure updates are delivered successfully and users stay engaged.
-   Enable error tracking to catch and fix issues early.
-   Keep the rollback feature ready to quickly address any problems.

Capgo is compatible with Capacitor 6 and 7, integrates smoothly with CI/CD pipelines, and complies with Apple and Google store requirements.

## Common Issues and Tips

Once you've completed the platform and Capgo setup, you might face some common errors. Here's how to address them quickly.

### Environment Setup Issues

-   **CLI Not Found**  
    **Error**: The command `npx cap` fails.  
    **Fix**: Run `npm install --save @capacitor/cli @capacitor/core` and try again.
    
-   **Node Version Mismatch**  
    **Error**: CLI commands fail due to Node.js version errors.  
    **Fix**: Install Node.js version 14 or higher as outlined in the setup requirements.
    

### Configuration Problems

-   **Config Mismatch**  
    **Error**: Changes in `capacitor.config.json` don't take effect.  
    **Fix**: Make sure the `appId` and `webDir` values match your project's `package.json` and the web build output folder.
    
-   **Platform Sync Errors**  
    **Error**: Running `npx cap sync` results in plugin version conflicts.  
    **Fix**: Update `@capacitor/android` and `@capacitor/ios` to the same major version, then rerun the sync command.
    

### Build and Deployment

-   **Build Signing Failures**  
    **Error**: iOS or Android builds fail due to missing certificates or a keystore.  
    **Fix**: Follow the IDE setup instructions. For iOS, add your development team in Xcode. For Android, configure the keystore in `build.gradle`.
    
-   **Web Directory Not Found**  
    **Error**: `npx cap sync` can't find the web assets.  
    **Fix**: Run your web build command (e.g., `npm run build`) before syncing the platforms.
    

### Live Update Issues

-   **[Capgo Update Failures](https://capgo.app/docs/plugin/cloud-mode/manual-update/)**  
    **Error**: Updates are not appearing in the production app.  
    **Fix**: Double-check your [Capgo API key](https://capgo.app/docs/webapp/api-keys/) in `capacitor.config.json` and ensure you're targeting the correct channel.

For more details on platform-specific setup, revisit the Platform Setup section. If you're working with live updates, consult the Capgo Setup Guide for additional troubleshooting tips.

## Summary

### Setup Review

Start your web app with Capacitor CLI, set up iOS and Android platforms, and optionally include Capgo for live updates.

Here's how to get started:

-   Use the Capacitor CLI to initialize your project.
-   Set up your app's package ID and define the web output directory.
-   Add support for iOS and Android platforms.
-   Install and set up Capgo with the following command: `npm install --save @capgo/cli && npx capgo init`

For detailed setup instructions or troubleshooting, check out the official Capacitor and Capgo documentation.