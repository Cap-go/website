---
slug: sentry-react-native
title: 'Sentry React Native: 2026 Integration Guide'
description: 'Integrate sentry react native from start to finish with our 2026 guide. Covers setup, native crashes, source maps, performance, and Capgo integration for'
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2026-07-06T08:40:18.832Z
updated_at: 2026-07-06T08:40:20.036Z
head_image: 'https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/c8a7733c-6d83-449d-a959-cb5bc9fd940f/sentry-react-native-integration-guide.jpg'
head_image_alt: 'Sentry React Native: 2026 Integration Guide'
keywords: 'sentry react native, react native monitoring, error tracking, mobile crash reporting, capgo'
tag: 'Mobile, Capacitor, Guides'
published: true
locale: en
next_blog: ''
---
You've got a React Native app working locally, QA has signed off, and production is close. Then the obvious question lands: what happens when it breaks on a user's device?

Without Sentry, the answer is usually bad. You get a support ticket, a vague screenshot, maybe a console log from a dev build that doesn't match production. With Sentry React Native set up properly, you get the error, the stack, the release that shipped it, and enough context to fix it without guessing. The catch is that **basic installation is the easy part**. The painful parts come later: native integration, symbolication, source maps, release naming, and keeping all of that aligned when your delivery model includes live updates.

Most guides stop too early. A real setup has to survive CI, App Store builds, Android releases, and JavaScript bundles that don't always come from the original binary.

## Table of Contents
- [Getting Started with the Sentry SDK](#getting-started-with-the-sentry-sdk)
  - [What you need before installing](#what-you-need-before-installing)
  - [Running the wizard and reviewing the result](#running-the-wizard-and-reviewing-the-result)
- [Configuring Native iOS and Android Projects](#configuring-native-ios-and-android-projects)
  - [What changed on iOS](#what-changed-on-ios)
  - [What changed on Android](#what-changed-on-android)
  - [Native setup checks that save time later](#native-setup-checks-that-save-time-later)
- [Automating Releases and Source Maps](#automating-releases-and-source-maps)
  - [Why manual uploads fail in practice](#why-manual-uploads-fail-in-practice)
  - [A release process that actually holds up](#a-release-process-that-actually-holds-up)
  - [A practical CI script pattern](#a-practical-ci-script-pattern)
- [Capturing Performance Data and Custom Events](#capturing-performance-data-and-custom-events)
  - [Tracing a slow screen instead of guessing](#tracing-a-slow-screen-instead-of-guessing)
  - [Adding useful context to errors](#adding-useful-context-to-errors)
- [Verifying and Troubleshooting Your Integration](#verifying-and-troubleshooting-your-integration)
  - [Triggering test events safely](#triggering-test-events-safely)
  - [What to check in the Sentry UI](#what-to-check-in-the-sentry-ui)
  - [Common Sentry React Native Troubleshooting](#common-sentry-react-native-troubleshooting)
- [Integrating with Live Update Workflows like Capgo](#integrating-with-live-update-workflows-like-capgo)
  - [Matching release identifiers to live bundles](#matching-release-identifiers-to-live-bundles)

<a id="getting-started-with-the-sentry-sdk"></a>
## Getting Started with the Sentry SDK

The fastest way to get Sentry React Native into a new app is still the install wizard. It handles most of the repetitive setup and gets you to a working baseline quickly. That matters, because hand-rolling the first install usually leads to tiny mismatches that you won't notice until the first production crash.

<a id="what-you-need-before-installing"></a>
### What you need before installing

You need a normal React Native dev environment first. Node, a package manager, platform tooling for iOS and Android, and Watchman on macOS if that's already part of your workflow. You also need a Sentry account and a project created for React Native.

If you're still evaluating whether React Native is the right operational choice for your team, this [React Native guide for businesses](https://wistec.com.au/mobile-app-development-react-native/) gives useful non-marketing context around platform trade-offs, staffing, and maintenance expectations. It's worth reading before you commit your monitoring and release process around a shared codebase.

Install the SDK with the wizard from the project root:

```bash
npx @sentry/wizard@latest -i reactNative
```

The wizard asks a few things that developers often click through too quickly:

- **Project selection**. Pick the actual Sentry project you intend to use in production, not a temporary sandbox you'll forget to update later.
- **Native changes**. Say yes. JavaScript-only error capture is not enough for mobile apps.
- **Optional features**. Turn on what you know you'll use, but don't enable everything blindly on day one if your team won't review the resulting data.

<a id="running-the-wizard-and-reviewing-the-result"></a>
### Running the wizard and reviewing the result

After the wizard finishes, inspect the changes instead of trusting them without review. You should see a Sentry package in `package.json`, native changes under `ios` and `android`, and an initialization block in your app entry file.

A typical initialization looks like this:

```ts
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'YOUR_DSN',
});
```

The **DSN** tells the SDK where to send events. Treat it as configuration, not as a secret vault item that must never be visible. It isn't the same as an auth token. Still, keep your environment setup clean and consistent so your app points to the right Sentry project in each environment.

A practical pattern is to load the DSN from environment-specific config and initialize Sentry before the rest of your app tree mounts. If you're also working through startup polish, this guide to [React Native splash screen setup](https://capgo.app/blog/splash-screen-in-react-native/) is useful because startup code order often intersects with where teams place Sentry initialization.

> **Practical rule:** initialize Sentry as early as possible in app startup. If you wait until after navigation, auth hydration, or remote config, you'll miss startup failures.

At this stage, don't chase perfection. The immediate goal is simple: launch the app, trigger a JavaScript exception later in the article, and confirm events reach Sentry. Once that's working, the native and release layers become much easier to reason about.

<a id="configuring-native-ios-and-android-projects"></a>
## Configuring Native iOS and Android Projects

At this stage, many React Native teams get a false sense of completion. The JavaScript SDK is installed, events show up, and everyone assumes crash reporting is done. It isn't. If native integration is off, some of the crashes you care about most will never reach Sentry in a usable form.

<a id="what-changed-on-ios"></a>
### What changed on iOS

Open the iOS project and review what the wizard changed. In a bare React Native app, that usually means updates around app startup and build phases. You're looking for Sentry initialization hooks and upload steps tied to your build process.

In Xcode, check these places:

- **App delegate startup code**. The app needs native Sentry initialization early in launch.
- **Build Phases**. Look for any Sentry upload script related to debug symbols or source map handling.
- **Build settings and archive behavior**. Symbol files must be generated and available during archive builds.

If your app uses `AppDelegate.mm`, the initialization often sits close to the React Native bridge bootstrapping. The exact file content can vary by React Native version, template, and whether you're using the new architecture, so don't copy snippets from random repos unless they match your project shape.

What matters is the intent: iOS native crashes need symbol data, and the app has to start Sentry before the crash can be observed reliably.

> If iOS crashes appear in Sentry with unreadable native frames, the problem usually isn't “Sentry is broken.” It's symbol upload or release matching.

<a id="what-changed-on-android"></a>
### What changed on Android

Android usually adds changes in Gradle files and sometimes manifest-level configuration. Review `android/build.gradle`, `android/app/build.gradle`, and any Sentry-related plugin or task wiring.

Things to verify:

1. **The Sentry Gradle plugin is applied** so release artifacts can be processed during build time.
2. **Variant handling is sane** if you use product flavors or multiple build types.
3. **ProGuard or R8 outputs are accounted for** if your release builds shrink or obfuscate code.

A common Android mistake is assuming a successful local debug run proves the release setup is correct. It doesn't. The release path is different, especially once minification and CI signing enter the picture. If your team maintains separate debug, staging, QA, and store builds, this breakdown of [mobile build types](https://capgo.app/blog/types-of-builds/) is a useful reference for keeping monitoring behavior aligned with each build variant.

<a id="native-setup-checks-that-save-time-later"></a>
### Native setup checks that save time later

Don't stop at “the wizard modified files.” Verify behavior directly.

Use this checklist:

- **Archive an iOS build locally** and confirm the build doesn't fail during symbol processing.
- **Create a release Android build** and inspect CI logs for Sentry-related tasks.
- **Check the package name and bundle identifier mapping** in Sentry if you manage multiple apps under one org.
- **Confirm release naming conventions now**, before CI starts uploading artifacts under inconsistent names.

Here's what usually does not work well:

| Approach | What goes wrong |
|---|---|
| Trusting the wizard without review | Native setup drifts when React Native or build tooling changes |
| Testing only in debug mode | Debug success hides release-time symbolication issues |
| Mixing manual and automated upload steps | Artifacts land under different releases and won't match events |

The best setup is boring. Native startup hooks are in place, build scripts run every time, and release naming is deterministic across iOS, Android, and JavaScript bundles.

<a id="automating-releases-and-source-maps"></a>
## Automating Releases and Source Maps

If there's one place where Sentry React Native setups fall apart, it's here. Teams install the SDK, see events, and postpone release automation. Then the first serious production issue comes in and the stack trace is minified, the release is missing, or the source map upload belonged to a different bundle.

Manual source map uploads sound acceptable when you're shipping rarely. In practice, they fail because humans are bad at repetitive release bookkeeping.

<a id="why-manual-uploads-fail-in-practice"></a>
### Why manual uploads fail in practice

The failure modes are predictable:

- **Someone forgets to upload maps** after a late-night hotfix.
- **The uploaded files belong to a different commit** than the binary or OTA bundle users run.
- **The release name changes slightly** between iOS, Android, and CI steps.
- **A rebuild happens after map upload** and invalidates what Sentry should be matching against.

That's why I don't recommend a “document the steps in Notion” approach. It works until one urgent release goes out under pressure.

![A seven-step flowchart illustrating the automated process of managing Sentry releases and source maps for React Native.](https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/4a9506c6-c48e-4c76-8f14-f197a25175d6/sentry-react-native-automation-flow.jpg)

<a id="a-release-process-that-actually-holds-up"></a>
### A release process that actually holds up

A reliable setup has a few properties:

- **Release IDs are generated once** and reused everywhere.
- **Build, bundle, and upload steps happen in the same pipeline**.
- **Source maps are uploaded from CI**, not from a developer laptop.
- **The app initializes Sentry with the same release string** that CI used during upload.

That last point matters more than commonly expected. You don't just need source maps in Sentry. You need **the correct source maps attached to the exact release identifier emitted by the app at runtime**.

If your team is already standardizing mobile automation, this guide to [automatic build and release workflows with GitHub Actions](https://capgo.app/blog/automatic-build-and-release-with-github-actions/) fits well with the same operational model.

<a id="a-practical-ci-script-pattern"></a>
### A practical CI script pattern

Use a script like this in CI and feed values from your pipeline environment:

```bash
#!/usr/bin/env bash
set -euo pipefail

export SENTRY_AUTH_TOKEN="$SENTRY_AUTH_TOKEN"
export SENTRY_ORG="your-org"
export SENTRY_PROJECT="your-project"

RELEASE_NAME="${APP_VERSION}+${GIT_SHA}"

npx sentry-cli releases new "$RELEASE_NAME"

npx react-native bundle \
  --platform ios \
  --dev false \
  --entry-file index.js \
  --bundle-output ./dist/main.jsbundle \
  --sourcemap-output ./dist/main.jsbundle.map

npx sentry-cli releases files "$RELEASE_NAME" upload-sourcemaps ./dist \
  --rewrite \
  --strip-prefix "$(pwd)"

npx sentry-cli releases finalize "$RELEASE_NAME"
```

You'll need to adapt the bundle command for Android, and many teams split platform-specific jobs instead of forcing one script to do both. That's fine. What matters is consistency.

> **Release discipline beats clever scripting.** Pick one naming convention, inject it into the app at build time, and never let local ad hoc uploads compete with CI.

For React Native, I prefer storing the release string in one build-generated config location and reading it during `Sentry.init()`:

```ts
Sentry.init({
  dsn: Config.SENTRY_DSN,
  release: Config.SENTRY_RELEASE,
  dist: Config.SENTRY_DIST,
});
```

The payoff is simple. When an event arrives, Sentry can map the minified frame back to the code you shipped, not the code you think you shipped.

<a id="capturing-performance-data-and-custom-events"></a>
## Capturing Performance Data and Custom Events

Crashes tell you what broke. Performance tracing tells you what users felt before they gave up.

A common report sounds like this: “The dashboard is slow.” That's not enough to debug. Slow where? On navigation? During data fetch? While rendering a heavy chart? Sentry becomes useful here when you stop treating it like an error inbox and start instrumenting app behavior.

![A software developer coding on a laptop with data visualization graphs displayed on a background monitor.](https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/39f792db-d73f-41e0-93e2-ff32a7810214/sentry-react-native-software-development.jpg)

<a id="tracing-a-slow-screen-instead-of-guessing"></a>
### Tracing a slow screen instead of guessing

Start by enabling performance tracing in your initialization. The exact sampling strategy depends on your environment and volume tolerance, but the structure looks like this:

```ts
Sentry.init({
  dsn: Config.SENTRY_DSN,
  tracesSampleRate: 1.0,
});
```

If you use React Navigation, wire the integration so screen transitions produce trace data. Then reproduce the complaint on a physical device, not just a simulator. Simulators hide the kind of sluggishness users notice.

A practical dashboard example:

1. A user opens the main dashboard after login.
2. Navigation completes, but content appears late.
3. The trace shows the screen transaction is long.
4. Child spans reveal one API request and one expensive render path.
5. You optimize the render path, ship again, and compare the new trace shape.

That's better than arguing from gut feel.

For teams thinking broadly about webview or hybrid app monitoring patterns, this write-up on [performance monitoring in Capacitor projects](https://capgo.app/blog/set-up-performance-monitoring-in-capacitor/) is worth scanning because the operational mindset is similar even though the stack differs.

<a id="adding-useful-context-to-errors"></a>
### Adding useful context to errors

Performance data gets more useful when events carry business context. Not vanity metadata. Just enough to answer who was affected, what screen they were on, and what happened right before failure.

Use these tools deliberately:

- **User context** with `Sentry.setUser()` so support can correlate reports to an affected account without digging through guesswork.
- **Breadcrumbs** for actions like tapping submit, opening a modal, or starting a sync.
- **Custom tags** for dimensions like plan type, feature flag state, or API region.
- **Captured exceptions with extra context** when you catch and rethrow or surface controlled failures.

Example:

```ts
Sentry.setUser({
  id: user.id,
  email: user.email,
});

Sentry.addBreadcrumb({
  category: 'navigation',
  message: 'Opened dashboard screen',
  level: 'info',
});

try {
  await loadDashboard();
} catch (error) {
  Sentry.captureException(error, {
    tags: { screen: 'dashboard' },
    extra: { widget: 'balance-summary' },
  });
}
```

> A breadcrumb trail is often the difference between “user says the app froze” and “the app failed after opening dashboard, starting sync, and retrying a stale request.”

When custom instrumentation goes wrong, it usually goes wrong by being too noisy. Don't capture every button press in the app forever. Capture boundaries, state transitions, and operations that matter when debugging. Enough context to explain the event. Not enough to drown it.

<a id="verifying-and-troubleshooting-your-integration"></a>
## Verifying and Troubleshooting Your Integration

You should verify Sentry before shipping, after build pipeline changes, and after SDK upgrades. “It worked months ago” isn't a meaningful test.

The cleanest way is to trigger controlled failures for both JavaScript and native paths, then inspect how they arrive in Sentry.

![A male software developer writing code on a computer monitor with a test integration checklist on his desk.](https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/3d2913c2-f644-429d-960b-ad8bb86328d2/sentry-react-native-software-developer.jpg)

<a id="triggering-test-events-safely"></a>
### Triggering test events safely

For a JavaScript error, add a temporary button in a non-production screen:

```ts
<Button
  title="Trigger JS Error"
  onPress={() => {
    throw new Error('Test JavaScript Sentry error');
  }}
/>
```

For a captured exception that won't crash the app:

```ts
<Button
  title="Capture Exception"
  onPress={() => {
    Sentry.captureException(new Error('Handled Sentry test error'));
  }}
/>
```

Native crash testing should be done carefully and only in development or controlled QA builds. The exact helper methods available can vary by SDK version and platform wiring, so I prefer using the SDK's documented native crash test utility when present rather than inventing your own crash path.

<a id="what-to-check-in-the-sentry-ui"></a>
### What to check in the Sentry UI

When the event appears, inspect more than the title.

Check these fields:

- **Platform and mechanism**. This helps distinguish JS exceptions from native crashes.
- **Release and dist**. If they're blank or wrong, source maps and symbolication will drift.
- **Stack frames**. Readable source locations should appear for properly uploaded JavaScript maps.
- **Breadcrumbs and tags**. Confirm your custom context arrived.
- **Environment**. Make sure development and production events aren't mixed into one stream.

If a native event arrives but has poor symbolication, don't keep tweaking app code. That's usually a build artifact problem.

<a id="common-sentry-react-native-troubleshooting"></a>
### Common Sentry React Native Troubleshooting

| Symptom | Likely Cause | Solution |
|---|---|---|
| JavaScript errors arrive, but stack traces are minified | Source maps weren't uploaded for the matching release | Verify CI uploads maps after bundling and that `release` in `Sentry.init()` matches the uploaded release exactly |
| Native crashes don't appear | Native SDK hooks are missing or not initialized early enough | Recheck iOS and Android native setup, then test with a controlled native crash path in a QA build |
| iOS native frames are unreadable | Debug symbols were not uploaded or not linked to the right build | Confirm archive builds generate symbols and that upload steps run during CI or Xcode archive flow |
| Android release behavior differs from debug | Shrinking or obfuscation changes the release artifact path | Review release Gradle tasks and verify Sentry processing runs for release variants |
| Events show up under the wrong environment | Build-time config is leaking between environments | Separate DSN, environment, release, and dist values per build target |
| Breadcrumbs or user data are missing | Context is set too late or cleared during app state changes | Set user and tags immediately after auth state resolves, and add breadcrumbs around critical flows |

A final habit that pays off is keeping a tiny “monitoring smoke test” checklist in your release process. Trigger one JS event in staging, confirm release values, and verify source locations before promoting a build.

<a id="integrating-with-live-update-workflows-like-capgo"></a>
## Integrating with Live Update Workflows like Capgo

Live updates change the release model. The binary in the store might stay the same while the JavaScript bundle changes underneath it. If Sentry still thinks only in terms of the original app version, stack traces become misleading fast.

The fix is to make **Sentry release identity follow the live bundle**, not just the native binary.

<a id="matching-release-identifiers-to-live-bundles"></a>
### Matching release identifiers to live bundles

For live update workflows, treat `release` and `dist` as runtime identifiers tied to the delivered JavaScript package. The native app version still matters, but it isn't enough on its own once bundles can change independently.

A practical pattern looks like this:

- Use the native app version as part of the base release name.
- Append the live update version or package identifier.
- Use `dist` for channel or build-specific differentiation when that fits your model.
- Upload source maps for each live bundle under that exact release identifier.

For example, if your app loads update metadata at startup, initialize Sentry with values derived from the currently active bundle, not just from static build config.

```ts
Sentry.init({
  dsn: Config.SENTRY_DSN,
  release: activeBundle.releaseName,
  dist: activeBundle.channel,
});
```

That way, when a user hits an error on a hotfixed bundle, Sentry resolves frames against the source map for that hotfix instead of the older store bundle.

This matters with any OTA-style workflow. If you want a good primer on the moving pieces behind that delivery model, this explanation of [how live updates work in Capacitor apps](https://capgo.app/blog/how-live-updates-for-capacitor-work/) is a solid reference.

Here's the kind of operational view teams aim for when they combine update metadata with release tracking:

![Screenshot from https://capgo.app](https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/screenshots/022746a0-6fb7-4033-aa63-fd820149f63d/sentry-react-native-capgo-platform.jpg)

The main mistake to avoid is reusing one static release string for every post-store update. If multiple bundles share the same Sentry release, debugging turns into guesswork again.

---

If your team ships fixes outside app store review cycles, [Capgo](https://capgo.app) is worth evaluating. It gives Capacitor teams a structured way to deliver live updates, target channels, control rollouts, and recover from bad releases quickly. Pair that with disciplined Sentry release naming and source map uploads, and you get a workflow where errors still point to the exact code users are running.
