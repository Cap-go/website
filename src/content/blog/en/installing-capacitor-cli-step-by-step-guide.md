---
slug: installing-capacitor-cli-step-by-step-guide
title: "Installing Capacitor CLI: Step-by-Step Guide"
description: Learn to install and configure Capacitor CLI for transforming web apps into native mobile apps efficiently.
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2025-04-04T02:49:29.961Z
updated_at: 2025-10-10T02:23:14.000Z
head_image: https://assets.seobotai.com/capgo.app/67ef362eebbb9dc80641f34f-1743734983341.jpg
head_image_alt: Mobile Development
keywords: Capacitor, CLI, mobile app development, Node.js, Android, iOS, live updates
tag: Development, Mobile, Updates
published: true
locale: en
next_blog: ''
---

**[Capacitor](https://capacitorjs.com/) CLI helps you transform web apps into native iOS and Android apps with one codebase.** Here's how to set it up quickly:

-   **Prerequisites**: Install [Node.js](https://nodejs.org/en) (v16+), npm, and a web framework (React, Vue, Angular, etc.).
-   **[Install Capacitor CLI](https://capgo.app/docs/cli/commands)**: Run `npm install @capacitor/cli @capacitor/core` and initialize your project with `npx cap init`.
-   **Prepare Platforms**: Add support for iOS (`npx cap add ios`) and Android (`npx cap add android`) platforms.
-   **Build and Sync**: Use `npm run build` and `npx cap sync` to transfer web assets to native projects.
-   **Optional Live Updates**: Use tools like [Capgo](https://capgo.app/) to push updates instantly without app store delays.

Capacitor CLI simplifies app development and maintenance. Follow the guide for smooth setup and troubleshooting.

## Build a Mobile App Fast! React + [Capacitor](https://capacitorjs.com/) + [Tailwind](https://tailwindcss.com/) + [DaisyUI](https://daisyui.com/)

![Capacitor](https://assets.seobotai.com/capgo.app/67ef362eebbb9dc80641f34f/7e137b9b90adb3934b29b03381f213c1.jpg)

<iframe src="https://www.youtube.com/embed/PPXktTJXMPE" aria-label="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## Before You Start

Get your environment ready by following these steps:

### Set Up [Node.js](https://nodejs.org/en) and npm

![Node.js](https://assets.seobotai.com/capgo.app/67ef362eebbb9dc80641f34f/a74739743b1f15b8d0bf124a9c30cba9.jpg)

You'll need Node.js version 16 or higher. The latest LTS version is recommended. To check your setup, run:

```bash
node --version
npm --version
```

If you need to update, download Node.js (which includes npm) from the official website.

After confirming Node.js is ready, ensure your web project meets the necessary Capacitor requirements.

### Check Your Web Project

Your web project should have the following:

-   **A valid package.json**: Make sure it's properly configured.
-   **A build directory**: This is where your web assets live (commonly `dist` or `www`).
-   **An entry point**: Your build directory must include an `index.html` file.

Here’s a quick look at key `package.json` fields:

| Required Field | Example Value | Purpose |
| --- | --- | --- |
| name | "my-app" | Identifies the project |
| version | "1.0.0" | Specifies app version |
| build directory | "dist" or "www" | Points to web assets |

Once your Node.js and web project are ready, move on to installing platform-specific tools.

### Install Required Software

**For Android Development:**

-   Download and install the latest version of **[Android Studio](https://developer.android.com/studio)**.
-   Set up the Android SDK with at least API level 22.
-   Configure the `ANDROID_HOME` environment variable.

**For iOS Development (Mac only):**

-   Install **[Xcode](https://developer.apple.com/xcode/) 14** or a newer version.
    
-   Install Command Line Tools.
    
-   Use [Homebrew](https://brew.sh/) to install [CocoaPods](https://cocoapods.org/):
    
    ```bash
    brew install cocoapods
    ```
    
-   Accept the Xcode license:
    
    ```bash
    sudo xcodebuild -license accept
    ```
    

When integrating Capgo later, make sure you have a stable internet connection and valid SSL certificates.

With these steps done, you're set for a smooth Capacitor development process. Next, you’ll install the Capacitor CLI.

## Install Capacitor CLI

With your environment ready, it's time to install and configure Capacitor CLI.

### Add Capacitor Packages

Start by installing the Capacitor CLI and Core packages using npm:

```bash
npm install @capacitor/cli @capacitor/core
```

Once installed, confirm the setup by checking the [Capacitor version](https://capgo.app/plugins/ivs-player/):

```bash
npx cap --version
```

### Set Up Your Project

Initialize Capacitor in your project with the following command:

```bash
npx cap init
```

During initialization, you'll be prompted to provide these details:

| Setting | Description | Example |
| --- | --- | --- |
| App Name | The name displayed in app stores | "My Awesome App" |
| App ID | A unique identifier for your app | "com.mycompany.myapp" |
| Web Directory | Path to your web assets | "dist" or "www" |

Next, update your configuration file (`capacitor.config.ts` or `capacitor.config.json`) with the relevant settings:

```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.mycompany.myapp',
  appName: 'My Awesome App',
  webDir: 'dist',
  bundledWebRuntime: false
};

export default config;
```

### Set Up iOS and Android

Add support for iOS and Android platforms with these commands:

```bash
npx cap add ios
npx cap add android
```

This will generate native projects:

-   **iOS**: Creates an `ios` folder containing the Xcode project.
-   **Android**: Creates an `android` folder for the Android Studio project.

After making any changes to your web assets, run the following commands to build and sync:

```bash
npm run build
npx cap sync
```

This process compiles your web assets and transfers them to the native projects, including any installed [Capacitor plugins](https://capgo.app/plugins/).

To open the native projects for further customization:

```bash
npx cap open ios     # Opens Xcode
npx cap open android # Opens Android Studio
```

Now you're ready to test your setup and resolve any issues that may arise.

## Fix Common Problems

When setting up Capacitor CLI, you might run into a few common hiccups. Here's how to tackle them:

### Android Gradle Issues

If you're facing Gradle-related problems, try these steps:

1.  Navigate to the Android directory and clear the build cache:
    
    ```bash
    cd android
    ./gradlew cleanBuildCache
    ```
    
2.  Update the Gradle version in `android/build.gradle`:
    
    ```kotlin
    buildscript {
        ext {
            gradleVersion = '8.1.0'
        }
    }
    ```
    
3.  Add the following lines to `android/gradle.properties` for better performance:
    
    ```properties
    org.gradle.jvmargs=-Xmx4608m
    org.gradle.parallel=true
    ```
    

If problems persist, revisit your setup or consult additional troubleshooting resources.

### App Shows Blank Screen

A blank screen usually points to a configuration issue. Here's how to address it:

-   **Check the Web Directory Path**: Ensure the `webDir` matches your build output.
    
    ```typescript
    const config: CapacitorConfig = {
        webDir: 'dist', // Adjust if necessary
    };
    ```
    
-   **Verify Server Configuration**: Confirm the server settings are correct.
    
    ```typescript
    server: {
        url: 'http://localhost:3000',
        cleartext: true
    }
    ```
    
-   **Update Content Security Policy**: Add this meta tag to your HTML for proper resource loading.
    
    ```html
    <meta http-equiv="Content-Security-Policy" content="default-src 'self' 'unsafe-inline' 'unsafe-eval' data: *">
    ```
    

### Plugin Not Working

If a plugin isn't behaving as expected, follow these steps:

1.  Perform a clean installation of dependencies:
    
    ```bash
    rm -rf node_modules
    npm cache clean --force
    npm install
    ```
    
2.  Check the plugin settings in `capacitor.config.ts` to ensure they're configured correctly:
    
    ```typescript
    plugins: {
        PluginName: {
            option: 'value'
        }
    }
    ```
    

For those using [Capgo's native plugin](https://capgo.app/plugins/), it automatically synchronizes plugins and maintains compatibility during updates.

After applying these fixes, rebuild your project to verify the changes:

```bash
npm run build && npx cap copy && npx cap sync
```

Once everything is running smoothly, you can move forward with exploring live update options with Capgo.

## Live Updates with [Capgo](https://capgo.app/)

![Capgo](https://assets.seobotai.com/capgo.app/67ef362eebbb9dc80641f34f/435c1a19c50c4ff1b7d76cbc4edeb6d0.jpg)

Simplify [app updates](https://capgo.app/plugins/capacitor-updater/) using Capgo. It lets you push updates directly to users, skipping the need for app store reviews.

**Getting started is simple.** First, install the necessary packages:

```bash
npm install @capgo/cli @capgo/capacitor-updater
npx cap sync
```

Then, initialize Capgo in your project:

```bash
npx @capgo/cli init
```

### Pricing Plans

Capgo offers several pricing tiers to suit different needs:

| Plan | Monthly Active Users | Bandwidth | Storage | Price (Annual) |
| --- | --- | --- | --- | --- |
| SOLO | 1,000 | 50 GB | 2 GB | $12/month |
| MAKER | 10,000 | 500 GB | 5 GB | $33/month |
| TEAM | 100,000 | 2,000 GB | 10 GB | $83/month |

For enterprise users, the PAYG plan starts at $249/month and includes perks like API access, custom domains, and dedicated support.

### Configuration for Live Updates

To enable live updates, add the following to your `capacitor.config.ts` file:

```typescript
{
  plugins: {
    CapacitorUpdater: {
      autoUpdate: true,
      updateUrl: 'https://api.capgo.app/updates'
    }
  }
}
```

### Key Features

Capgo provides several standout features:

-   **[Secure updates](https://capgo.app/docs/live-updates/update-behavior/)** with end-to-end encryption
-   **Automated deployments** through integrated CI/CD
-   **Targeted updates** via user assignment
-   **Instant rollback** with version control
-   **Real-time analytics** to track updates

### Deployment Commands

Test updates in development before deploying them live. Use the following commands:

-   Deploy to staging:
    
    ```bash
    npx @capgo/cli deploy --channel staging
    ```
    
-   Deploy to production:
    
    ```bash
    npx @capgo/cli deploy --channel production
    ```
    

Capgo ensures compliance with Apple and Android guidelines, so your live updates won't risk app store violations. It's an efficient way to manage Capacitor apps after installation.

## Conclusion

Setting up Capacitor CLI is simple when you have the right prerequisites in place. This setup ensures smoother app updates and efficient development workflows.

Modern tools make app maintenance easier than ever. For example, Capgo now provides live updates, replacing older methods. Its integration with the CLI installation makes it a great option for developers working with Capacitor apps.

The [Capacitor ecosystem](https://capgo.app/blog/capacitor-comprehensive-guide/) is constantly improving with new tools and features. Installing the CLI is just the starting point for [building mobile apps](https://capgo.app/blog/angular-mobile-app-capacitor/), and you'll benefit from detailed documentation and an active developer community.

Be sure to keep the Capacitor CLI and its packages up to date to avoid compatibility issues.
