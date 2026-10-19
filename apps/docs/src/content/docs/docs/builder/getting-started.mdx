---
title: Getting Started
description: Create your first native build with Capgo Cloud Build
sidebar:
  order: 1
---


import { Aside } from '@astrojs/starlight/components';
import MermaidGraph from '@/components/MermaidGraph.astro';
import BuildCredentialsQuestionnaire from '@/components/BuildCredentialsQuestionnaire.astro';

export const buildProcessFlowGraph = `flowchart LR
    A[Your CI] -->|1. Prepare Native Project| B[Prepared iOS / Android Project]
    B -->|2. Upload| C[Capgo Build]
    C -->|3. Compile and Sign| D[Dedicated Build Infrastructure]
    D -->|4. Stream Logs| E[Your Terminal]
    D -->|Return Signed Artifact or Store Delivery| F[Output]
    D -->|5. Clean Temporary Project Data| G[Cleanup]`;

Get started with Capgo Cloud Build and create your first iOS or Android native build in minutes.

## What You'll Need

Before you begin, ensure you have:

- A Capacitor app that builds successfully locally
- Node.js 20 or higher installed
- A Capgo account (a free trial is enough to get started)
- Your app already registered in Capgo (run `npx @capgo/cli@latest app add` if not)
- *(No need to prepare signing credentials in advance — we'll set them up in the next step.)*

## Configure your signing credentials

Capgo needs signing credentials to build and submit your app — but you don't have to wrangle them by hand. Answer a couple of questions and we'll point you to the exact command to run:

<BuildCredentialsQuestionnaire />

## Run your first build

You need to be authenticated with Capgo to build. If you haven't already:

```bash
npx @capgo/cli@latest login
# or, in CI, set the token directly:
export CAPGO_TOKEN=your_api_key
```

If you just ran **`build init`**, you're already set — the onboarding offers to start a build for you at the end, so your first build may already be on its way. 🎉

Otherwise, start a build yourself with `build request` — set `--platform` to whichever you're building:

```bash
npx @capgo/cli@latest build request com.example.app --platform <android|ios> --build-mode debug
```

The CLI uploads the prepared native project and streams build logs live in your terminal. Capgo Build can return a signed artifact or submit it to App Store Connect or Google Play when you configure the appropriate release flow.

## Understanding the Build Process

When you run the build command, here's what happens:

<MermaidGraph graph={buildProcessFlowGraph} ariaLabel="Capgo Cloud Build process flow diagram" />

1. **Prepare in your CI** - Build the web layer, resolve private dependencies, and synchronize the completed assets into the native project.
2. **Upload** - The prepared native project is uploaded to secure cloud storage for the build.
3. **Build Execution** - Capgo compiles and signs the native project on dedicated infrastructure.
4. **Log Streaming** - Real-time logs stream to your terminal via Server-Sent Events.
5. **Cleanup** - The build environment and temporary project data are cleaned up after the build; output retention depends on the selected artifact and store-delivery options.

## Use Capgo Build with Bitrise or another CI

Capgo Build does not replace your existing CI. Keep the steps that need your private access in Bitrise or another CI system: install from private registries, resolve private CocoaPods over SSH, run custom native setup, build the web layer, and run `npx cap sync`.

Then call Capgo Build with the prepared native project. Capgo receives the ready `ios/` or `android/` project to compile and sign, so it does not need your private Nexus, CocoaPods SSH, or web-build credentials. The compiled web assets are already inside that prepared native project; they are used for the build rather than retained as a source repository.

## What Gets Built

Capgo Build receives the prepared native project required to compile your app. Your web source code, private dependency installation, and Capacitor sync remain in your CI.

### What Gets Uploaded

| Included | Description |
|----------|-------------|
| `ios/` or `android/` | The native platform folder you're building |
| `package.json`, `package-lock.json` | Dependency manifest |
| `capacitor.config.*` | Capacitor configuration |
| `resources/` | App icons, splash screens |
| Native plugin code | Only the `ios/` or `android/` subfolder of each Capacitor plugin |

### What's NOT Uploaded

| Excluded | Why |
|----------|-----|
| `node_modules/` (most of it) | Only native plugin code is included, not JS dependencies |
| `src/` | Your web source code stays local |
| `dist/`, `www/`, `build/` (root level) | Already synced into the native folder via `cap sync` |
| `.git/` | Version control history |
| `.gradle/`, `.idea/`, `.swiftpm/` | Build caches and IDE settings |
| `.env`, secrets | Never uploaded |

<Aside>
Your built web assets (JS, CSS, and HTML) are uploaded only because `npx cap sync` has copied them into the native project. The web source and dependency-installation steps stay in your CI; the prepared native project is used to build the binary and then cleaned up.
</Aside>

### Your Responsibilities

Before running `npx @capgo/cli@latest build request`:

1. **Prepare in your CI** - Resolve private package registries, SSH-based CocoaPods, device SDKs, extensions, and any custom native preparation in Bitrise or your existing CI.
2. **Build your web assets** - Run `npm run build` (or your framework's build command).
3. **Sync to native** - Run `npx cap sync` to copy the compiled web assets into the prepared native project.
4. **Request the native build** - Send the prepared `ios/` or `android/` project to Capgo Build.

### What Capgo Build Handles

- Native iOS compilation (Xcode, Fastlane)
- Native Android compilation (Gradle)
- Code signing with your credentials
- Optional App Store Connect or Google Play submission
- Supported native build configuration and credential values passed as environment variables

Capgo Build does not need access to your private Nexus registry or SSH credentials once your CI has prepared the native project. See [Build Configuration](/docs/builder/configuration/) for supported environment variables and store options.

For a kiosk flavour distributed through MDM, configure the Android project/build to produce an APK. When requesting the build, use both flags to skip Google Play and retrieve the signed output:

```bash
npx @capgo/cli@latest build request YOUR_APP_ID --platform android --no-playstore-upload --output-upload
```

`--no-playstore-upload` prevents Play Store upload even if Play credentials are saved; `--output-upload` provides a time-limited link to the signed output. Distribute that APK through your MDM.

## Next Steps

Now that you've created your first build:

- [Configure iOS builds](/docs/builder/ios/) - Set up certificates and profiles
- [Configure Android builds](/docs/builder/android/) - Set up keystores and Play Store
- [Troubleshooting](/docs/builder/troubleshooting/) - Common issues and solutions
- [CLI Reference](/docs/cli/reference/build/) - Complete command documentation

## Need Help?

- Check the [troubleshooting guide](/docs/builder/troubleshooting/)
- Join our [Discord community](https://discord.com/invite/VnYRvBfgA6)
- Email support at support@capgo.app
