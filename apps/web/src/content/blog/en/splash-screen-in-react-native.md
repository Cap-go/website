---
slug: splash-screen-in-react-native
title: 'React Native Splash Screen: Expo, Bootsplash, and Bare CLI (2026)'
description: >-
  React Native splash screen setup for Expo (expo-splash-screen in app.json,
  preventAutoHideAsync) and bare CLI (react-native-bootsplash,
  react-native-splash-screen). Loading screens, animated splash tips, and fixes.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2026-05-24T07:15:52.262Z
updated_at: 2026-11-05T09:24:35.000Z
head_image: /blog-images/splash-screen-in-react-native.webp
head_image_alt: >-
  React Native splash screen Expo and bare CLI Capgo blog illustration
keywords: >-
  react native splash screen, expo splash screen, react-native-splash-screen,
  react-native-bootsplash, splash screen react native, splash screen expo,
  react native expo splash screen, react native loading screen, animated splash
  screen react native
tag: 'Mobile, Guides'
published: true
locale: en
origin: ai
next_blog: ''
faq:
  - question: How do I add a splash screen in Expo (expo splash screen)?
    answer: >-
      Add the expo-splash-screen config plugin to app.json or app.config.js with
      backgroundColor and image paths, rebuild with a development or production
      binary, then call SplashScreen.preventAutoHideAsync() in global scope and
      SplashScreen.hideAsync() after fonts, auth, and navigation are ready.
      Expo Go is not the final check for native splash assets.
  - question: How do I keep the splash screen visible while my React Native app loads?
    answer: >-
      In Expo, call preventAutoHideAsync() before React renders, return null
      until async startup work finishes, then hideAsync() when the first real
      screen can paint. On bare React Native with react-native-splash-screen,
      call SplashScreen.show(this) in Android MainActivity or [RNSplashScreen
      show] in iOS AppDelegate, then SplashScreen.hide() from JavaScript when
      ready. With react-native-bootsplash, call RNBootSplash.init(this,
      R.style.BootTheme) on Android or RNBootSplash.initWithStoryboard on iOS,
      then BootSplash.hide() from JavaScript after the same readiness checks.
  - question: What is the difference between react-native-splash-screen and react-native-bootsplash?
    answer: >-
      react-native-bootsplash is actively maintained for current React Native
      releases and includes a CLI to generate Android and iOS launch assets.
      react-native-splash-screen is a widely used legacy library still common
      in older codebases; choose bootsplash for new bare CLI projects unless you
      are patching an existing splash-screen integration.
  - question: How do I set up a splash screen on bare React Native without Expo?
    answer: >-
      Install react-native-bootsplash, run its generate command for launch
      assets, initialize with RNBootSplash.init on Android MainActivity or
      RNBootSplash.initWithStoryboard on iOS AppDelegate, and call
      BootSplash.hide() from JavaScript when startup tasks finish.
      Alternatively, wire react-native-splash-screen with SplashScreen.show(this)
      on Android or [RNSplashScreen show] on iOS, then hide from JS. Rebuild
      native projects after asset or theme changes.
  - question: Can I use an animated splash screen in React Native or Expo?
    answer: >-
      iOS launch screens stay static. Android 12+ system splash screens can use
      a short animated icon on the native layer, but most Expo and React Native
      teams keep the native asset simple, hide when the app is ready, then run a
      Lottie or React Native animation on the first screen. Avoid setTimeout
      delays that hide the splash before or after real loading finishes.
  - question: I am choosing React Native or Capacitor for a new app. Where does the splash screen fit?
    answer: >-
      React Native splash screens are configured with expo-splash-screen or bare
      CLI libraries before JavaScript runs. Capacitor apps use native launch
      screens plus the @capacitor/splash-screen plugin in the WebView layer.
      Compare stacks in Capgo's React Native vs Capacitor guide if platform
      choice affects how you ship launch branding.
takeaways:
  - "On Expo, use expo-splash-screen with its config plugin in app.json or app.config.js."
  - "Call SplashScreen.preventAutoHideAsync() early, then hideAsync() when fonts, auth and navigation are ready."
  - "On bare React Native CLI, react-native-bootsplash is the common choice."
  - "Capacitor apps handle the splash with the official Splash Screen plugin."
cta:
  title: "Building with web tech instead of React Native?"
  text: "Capacitor runs your web app natively on iOS and Android. Capgo live updates ship fixes and web-layer UI changes without a new store build. Native splash and launch-screen assets still require a new binary."
  href: "https://capgo.app/register/"
  label: "Try Capgo live updates"
---
**Quick answer:** Use **`expo-splash-screen`** with the **config plugin** in **`app.json`** or **`app.config.js`** when the app runs on **Expo** (including dev clients and EAS builds). Call **`SplashScreen.preventAutoHideAsync()`** in **global scope**, then **`SplashScreen.hideAsync()`** when fonts, auth, and navigation are ready. On **bare React Native CLI**, prefer **`react-native-bootsplash`** for new work; maintain legacy apps with **`react-native-splash-screen`** until you migrate. Keep the **native splash static**, hide it when the first real screen can render, and move **animated splash** branding into the first React screen. Building with web tech instead? [Capacitor uses `@capacitor/splash-screen`](#splash-screens-in-capacitor) with the same readiness rule, and [Capgo](https://capgo.app/register/) ships web-layer live updates without a store build. Native splash assets still need a new binary.

You tap your app icon on a real device, and for a split second the user gets a white flash, a stretched logo, or a frozen launch screen that disappears before anything useful is ready. That gap is what **`react native splash screen`** setup is meant to cover: native launch UI until JavaScript can show a stable first frame.

<a id="why-a-professional-splash-screen-matters"></a>

## Table of Contents
- [Why a Professional Splash Screen Matters](#why-a-professional-splash-screen-matters)
  - [What the splash screen is actually doing](#what-the-splash-screen-is-actually-doing)
- [Preparing Perfect Splash Screen Assets](#preparing-perfect-splash-screen-assets)
  - [What to prepare before coding](#what-to-prepare-before-coding)
  - [Common asset mistakes](#common-asset-mistakes)
  - [A practical export workflow](#a-practical-export-workflow)
- [Implementing with the Expo Go and Development Client Workflow](#implementing-with-the-expo-go-and-development-client-workflow)
  - [Configure the native splash declaratively](#configure-the-native-splash-declaratively)
  - [Hide the splash based on readiness, not time](#hide-the-splash-based-on-readiness-not-time)
  - [What to expect in Expo Go and dev builds](#what-to-expect-in-expo-go-and-dev-builds)
- [Configuring for Bare React Native CLI Projects](#configuring-for-bare-react-native-cli-projects)
  - [Android setup in a bare project](#android-setup-in-a-bare-project)
  - [iOS setup in a bare project](#ios-setup-in-a-bare-project)
  - [Bare CLI gives you more control over the handoff](#bare-cli-gives-you-more-control-over-the-handoff)
  - [Expo-managed versus bare CLI](#expo-managed-versus-bare-cli)
- [Advanced Techniques for Animated and Performant Splash Screens](#advanced-techniques-for-animated-and-performant-splash-screens)
  - [Animation should follow startup reality](#animation-should-follow-startup-reality)
  - [Treat launch as orchestration](#treat-launch-as-orchestration)
- [React Native vs Capacitor: Splash Screens and Shipping Fixes](#react-native-vs-capacitor-splash-screens)
  - [Splash screens in Capacitor](#splash-screens-in-capacitor)
  - [Why web teams pick Capacitor over React Native](#why-web-teams-pick-capacitor)
- [Troubleshooting Common Splash Screen Issues](#troubleshooting-common-splash-screen-issues)
  - [Stretched or blurry splash image](#stretched-or-blurry-splash-image)
  - [White screen after the splash hides](#white-screen-after-the-splash-hides)
  - [Splash screen missing on one platform](#splash-screen-missing-on-one-platform)
  - [Build breaks after adding splash configuration](#build-breaks-after-adding-splash-configuration)
- [Frequently asked questions](#frequently-asked-questions)

## Why a Professional Splash Screen Matters

A user taps your app from the home screen, and the launch sequence shows a blank white frame before the first UI appears. In production, that reads as instability. It does not matter that React Native is still loading the JavaScript bundle or restoring state in the background. The first impression is already wrong.

In React Native, the splash screen is the first native surface your app controls. It covers the handoff between process start and the first usable React-rendered frame. That makes it a startup tool, not just a branding asset. If you time it well, users see a stable launch that feels intentional. If you hide it too early, they see layout shifts, missing fonts, or a dead-looking screen while auth, navigation, or remote config catches up.

![A man with a concerned expression looking at a blank white screen on his smartphone.](https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/047edba6-03a2-475f-b536-8d97ab879553/splash-screen-in-react-native-blank-smartphone.jpg)

<a id="what-the-splash-screen-is-actually-doing"></a>
### What the splash screen is actually doing

A production splash screen usually needs to handle four startup concerns:

- **Cover native-to-JS startup work:** font loading, persisted session restore, feature flag reads, and initial navigation state all compete for the first frame.
- **Prevent visual glitches:** it avoids flashes of system white, unstyled text, or a partially mounted root view.
- **Keep launch visually consistent:** the background color and logo can match your app shell so the transition feels controlled.
- **Force startup decisions:** teams have to define what "ready" means before removing the launch screen.

> **Practical rule:** Hide the splash when the first real screen can render cleanly, not after an arbitrary delay.

This is also where the Expo-managed and bare CLI workflows start to diverge. In Expo-managed projects, splash setup is mostly declarative, and the main engineering decision is when to call the hide API based on app readiness. In bare React Native CLI projects, you own more native setup on Android and iOS, which gives you more control but also more ways to introduce launch flicker, theme mismatches, or platform-specific regressions.

That trade-off matters in real projects. Expo is faster to configure and easier to keep consistent across environments. Bare projects are often the right choice when the app already depends on custom native modules, custom launch behavior, or stricter control over the startup path.

Teams that treat launch as part of product quality usually review it alongside broader UX work, not as an isolated native task. That is the same mindset covered in [Capgo's guide to app user experience](/blog/app-user-experience/). If you are weighing **React Native** against **Capacitor** for a greenfield app, read [Comparing React Native vs Capacitor](/blog/comparing-react-native-vs-capacitor/) before you lock launch tooling. Capacitor teams configure splash screens in native projects and with [@capacitor/splash-screen](/blog/nextjs-mobile-app-capacitor-from-scratch/) during app initialization, as outlined in the [Capacitor app initialization guide](/blog/capacitor-app-initialization-step-by-step-guide/).

<a id="preparing-perfect-splash-screen-assets"></a>
## Preparing Perfect Splash Screen Assets

Most splash screen bugs start in design files, not code. If the base asset is wrong, no amount of Android XML or iOS storyboard cleanup will save it.

The safest approach is to treat the splash as a **layout system**, not a single full-screen image. Use a background color plus a centered logo or illustration. That scales more predictably across tall Android devices, iPhones, tablets, and wider device orientations than trying to fit one detailed poster-style image everywhere.

![A checklist illustrating four essential requirements for designing perfect mobile app splash screen assets.](https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/23b37f80-73e5-42fc-8069-8bd8544b847f/splash-screen-in-react-native-design-checklist.jpg)

<a id="what-to-prepare-before-coding"></a>
### What to prepare before coding

Start with a clean source file from design. Vector is ideal for the handoff, even if the exported launch asset is a PNG.

Use this checklist:

- **Source artwork:** Keep a master logo or mark in SVG, AI, or another editable source format so exports stay consistent.
- **Background color:** Define the exact splash background color up front and make sure it matches the first screen or app shell background.
- **Safe margins:** Leave enough empty space around the logo so aggressive cropping on unusual aspect ratios doesn't cut into the design.
- **Platform variants:** Export the image sizes your workflow needs, rather than stretching one file everywhere.
- **Dark mode review:** If your app supports dark surfaces, confirm the logo still reads cleanly against the chosen background.

Expo's guidance is useful here because it reinforces that launch assets are now part of the build pipeline, not an afterthought. Its docs recommend a **square 1024×1024 PNG** for app icons and note that EAS Build can generate the required sizes for projects created with `npx create-expo-app`, which shows how asset generation has moved into modern tooling rather than manual repetition.

<a id="common-asset-mistakes"></a>
### Common asset mistakes

The most common visual failures are predictable:

| Problem | Likely cause | Better approach |
|---|---|---|
| Blurry logo | Exported from a low-resolution raster | Re-export from vector source |
| Cropped edges | Artwork placed too close to the boundaries | Increase safe padding |
| Stretching | Full-screen image forced into many aspect ratios | Use background color plus centered image |
| Mismatched transition | Splash background differs from first screen | Align launch and app shell colors |

> A splash image shouldn't carry dense text, tiny details, or marketing copy. Launch screens are viewed briefly and rendered under tight native constraints.

For teams shipping frequent visual updates, image discipline matters beyond launch. The same habits apply to delivery bundles and binary size, which is why guides like [optimizing images for updates](https://capgo.app/blog/optimise-your-images-for-updates/) are worth reviewing when you standardize asset exports.

<a id="a-practical-export-workflow"></a>
### A practical export workflow

A setup that works well in real projects looks like this:

1. **Design one centered composition** on a plain background.
2. **Export a transparent logo PNG** if your workflow supports a separate background color.
3. **Keep naming consistent** across platforms so asset swaps don't become guesswork.
4. **Test on small and tall simulators early** before wiring the splash lifecycle.
5. **Rebuild after asset changes** because launch resources often sit in native caches.

That last point matters more than people expect. Many splash screen issues that look like configuration bugs are just stale native assets.

<a id="implementing-with-the-expo-go-and-development-client-workflow"></a>
## Expo splash screen (`expo-splash-screen`)

If you are searching for **expo splash screen** or **react native expo splash screen**, start with the [`expo-splash-screen`](https://docs.expo.dev/versions/latest/sdk/splash-screen/) package. It fits managed and prebuild workflows, keeps launch assets in config, and exposes JavaScript APIs to control visibility in store builds.

![Screenshot from https://reactnative.dev/](https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/screenshots/16842bff-c5b9-41c6-84c5-b63363e4b741/splash-screen-in-react-native-landing-page.jpg)

The key behavior to understand is simple. **Keep the native splash visible until the first meaningful UI frame is ready.** Expo documents [`preventAutoHideAsync()`](https://docs.expo.dev/versions/latest/sdk/splash-screen/) so the configured splash stays up until you call [`hideAsync()`](https://docs.expo.dev/versions/latest/sdk/splash-screen/). Call **`preventAutoHideAsync()` in global scope without awaiting**, not inside a hook, or the splash may auto-hide before your code runs. Hiding too early can briefly expose a blank screen on iOS and Android.

<a id="keep-splash-visible-expo"></a>
### Keep the splash on while loading (Expo)

This is the usual **react native loading screen** pattern: the native splash covers font loading, persisted auth, and remote config while React returns `null`. When `isReady` becomes true, call `hideAsync()`. Optional [`SplashScreen.setOptions()`](https://docs.expo.dev/versions/latest/sdk/splash-screen/) adjusts fade behavior on hide. Test splash assets in a **development client**, **preview**, or **production** build; Expo documents that **Expo Go** is not the authoritative environment for native splash configuration.

<a id="configure-the-native-splash-declaratively"></a>
### Configure the native splash declaratively

In an Expo project, the visual side usually lives in **`app.json`**, **`app.config.js`**, or **`app.config.ts`** under the **`expo-splash-screen` config plugin**, as described in [Expo's splash screen and app icon guide](https://docs.expo.dev/develop/user-interface/splash-screen-and-app-icon/).

A typical `app.json` setup looks like this:

```json
{
  "expo": {
    "plugins": [
      [
        "expo-splash-screen",
        {
          "backgroundColor": "#111111",
          "image": "./assets/splash-icon.png",
          "imageWidth": 200
        }
      ]
    ]
  }
}
```

The exact fields can vary by project setup, but the pattern stays the same. You define the native launch appearance in config, then control visibility from JavaScript.

A few practical choices matter here:

- **Use a background color close to your initial screen** so the transition feels continuous.
- **Keep the image simple** because launch surfaces aren't the place for dense artwork.
- **Avoid fake branding delays** that hold users on a logo when the app is already ready.

<a id="hide-the-splash-based-on-readiness-not-time"></a>
### Hide the splash based on readiness, not time

Many tutorials often go off course. They use `setTimeout`, which is easy to demo and wrong for production.

Use startup state instead. A common root-level pattern looks like this:

```tsx
import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Load fonts
        // Restore auth state
        // Read persisted settings
      } finally {
        setIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  if (!isReady) {
    return null;
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      {/* Your real app UI */}
    </View>
  );
}
```

Two details make this pattern reliable.

First, `preventAutoHideAsync()` is called before the app starts rendering meaningful UI. Second, the hide happens only after the root view is ready to lay out, which reduces the chance of a flash between the native splash and the React tree.

> Don't hide the splash when your async work starts finishing. Hide it when the UI that depends on that work can actually render.

That distinction matters most when startup includes auth restoration, remote configuration, or font loading. If your home screen depends on custom fonts and a signed-in state, the splash should cover that gap.

A useful walkthrough of the broader React Native landing and startup ecosystem is below:

<iframe width="100%" style="aspect-ratio: 16 / 9;" src="https://www.youtube.com/embed/MqLteLe-Fow" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

<a id="what-to-expect-in-expo-go-and-dev-builds"></a>
### What to expect in Expo Go and dev builds

Expo adds one extra wrinkle. The splash behavior you expect in a standalone build may not match what you see in Expo Go.

That mismatch confuses a lot of teams. You change the asset or timing logic, test in Expo Go, and conclude the configuration is broken when the actual problem is that the development environment doesn't behave like a production binary.

Use this mental model:

- **Expo Go is convenient for iteration**
  but it isn't the final authority on native splash behavior.
- **Development clients are closer to reality**
  because they include your generated native project.
- **Standalone builds are the final check**
  for launch timing, theme behavior, and asset correctness.

If your splash still flashes or lingers, the bug is usually one of three things: hiding too early, rendering `null` for too long after hide, or testing in an environment that doesn't reflect release behavior.

<a id="configuring-for-bare-react-native-cli-projects"></a>
## Bare React Native CLI splash screen

A bare React Native app gives you direct control over launch behavior. For **new bare CLI projects**, [`react-native-bootsplash`](https://github.com/zoontek/react-native-bootsplash) is the maintained option (active releases through 2026 and aligned with current React Native support policy). Many production apps still ship [`react-native-splash-screen`](https://github.com/crazycodeboy/react-native-splash-screen); treat it as **legacy maintenance** unless you are already integrated.

**Animated splash screen (React Native or Expo):** iOS **`LaunchScreen.storyboard`** stays static. Android 12+ can show a brief **animated vector icon** in the system splash, but **`expo-splash-screen`** and most bare CLI setups still use a **static PNG** and move motion into the first React screen (for example Lottie). Hide the native splash when startup work finishes, then animate there. See [animation performance in Capacitor apps](/blog/ultimate-guide-to-animation-performance-in-capacitor-apps/) for the same startup discipline on another stack.

In CLI projects, the native handoff goal is unchanged: show launch UI immediately, then hide only after meaningful UI can render.

![A four-step infographic illustrating the process for setting up a splash screen in React Native CLI.](https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/325db6b3-7ae6-4106-8a2b-86d8f7971ef7/splash-screen-in-react-native-setup-process.jpg)

<a id="android-setup-in-a-bare-project"></a>
### Android setup in a bare project

Android splash setup lives in a few places at once: theme resources, drawables, `AndroidManifest.xml`, and `MainActivity`. That split is why small mistakes create visible flashes.

The usual flow is straightforward:

1. Generate splash assets for the Android resource folders you support.
2. Define a launch theme with the correct background color and splash drawable.
3. Apply that theme to the launcher activity in `AndroidManifest.xml`.
4. Initialize the splash screen in `MainActivity`.
5. Hide it from JavaScript after startup tasks that block first render are done.

A simplified `MainActivity.kt` pattern often looks like this:

```kotlin
override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    // initialize splash handling here depending on the library
}
```

That snippet is intentionally generic because the exact call depends on the library. The native integration point is usually the easy part. The mistakes tend to come from resources and theme transitions.

Here are the Android issues that show up in production:

- **Theme mismatch:** If the launch theme uses a different background color than your first app screen, users see a flash during handoff.
- **Incorrect asset buckets:** Android will stretch or blur assets that are missing from the expected density folders.
- **Testing with Metro only:** Native resource changes usually need a clean rebuild. Hot reload will not validate launch behavior.
- **Android 12 launch rules:** Newer Android versions apply their own splash behavior first, so custom setups need to respect those platform constraints.
- **Slow JS after hide:** If React hides the splash before the root view can paint, users get a blank frame instead of a smooth transition.

That last point matters more than the image itself. Timing problems are usually perceived as performance problems.

<a id="ios-setup-in-a-bare-project"></a>
### iOS setup in a bare project

On iOS, the center of gravity is `LaunchScreen.storyboard` plus a small native hook in `AppDelegate`. The platform expects the launch screen to be static and lightweight. Treat it like a snapshot of the first screen's visual structure, not a mini onboarding flow.

The reliable setup looks like this:

- Add assets to the Xcode asset catalog.
- Configure `LaunchScreen.storyboard` with simple constraints.
- Keep the layout static. Background color, logo, and safe spacing are usually enough.
- Add the library's native bootstrap call in `AppDelegate`.
- Hide the splash from JavaScript only after the app is completely ready to render.

Teams new to iOS often overbuild the storyboard. That usually backfires. Complex constraints, multiple nested views, or attempts to animate the launch screen make the setup harder to maintain and easier to break across device sizes.

A plain launch screen is the safer choice.

<a id="bare-cli-gives-you-more-control-over-the-handoff"></a>
### Bare CLI gives you more control over the handoff

This is the key difference between Expo-managed and bare CLI. Expo gives you a faster path to a correct default. Bare gives you full responsibility for the native launch pipeline.

That trade-off becomes useful when startup is doing more than loading a bundle. Apps with auth restoration, encrypted storage reads, custom native SDK initialization, or white-label branding rules often need the extra control. Bare projects let you align the splash timing with that work instead of forcing everything through higher-level configuration.

If you plan to add an animated transition after launch, keep the native splash static on iOS and prefer a static asset on Android unless you deliberately configure the Android 12 animated icon. Move motion into the first React screen. The performance trade-offs are similar to what matters in any mobile startup path. Heavy work during the first paint is expensive. This [guide to animation performance in Capacitor apps](/blog/ultimate-guide-to-animation-performance-in-capacitor-apps/) covers the same principle from another stack, and the lesson carries over cleanly to React Native.

<a id="expo-managed-versus-bare-cli"></a>
### Expo-managed versus bare CLI

The practical comparison is less about image display and more about where startup complexity lives.

| Decision point | Expo-managed | Bare CLI |
|---|---|---|
| Setup speed | Faster initial setup | More native work |
| Native customization | More constrained | Full control |
| Asset generation flow | More declarative | More manual |
| Debugging surface | JS config plus generated native layer | Direct Android and iOS files |
| Best fit | Teams optimizing for speed and consistency | Teams needing deep native control |

If the app is already in Expo and the launch requirements are standard, staying there usually saves time. If the startup path depends on native initialization order, custom themes, or platform-specific boot logic, bare CLI is often the cleaner long-term choice.

Both workflows can ship a polished splash screen. The difference is who owns the launch pipeline, your framework or your team.

<a id="advanced-techniques-for-animated-and-performant-splash-screens"></a>
## Advanced Techniques for Animated and Performant Splash Screens

Animated splash screens look polished when they respect the startup pipeline. They look cheap when they distract from it.

That's why I treat animation as an enhancement layer, not the foundation. The first job is still timing. If the app isn't ready, the splash stays. If the app is ready, the transition should move quickly into the first usable screen.

<a id="animation-should-follow-startup-reality"></a>
### Animation should follow startup reality

A common pattern is to keep the native splash simple, then run a lightweight branded animation in the first React screen after launch. That gives you more flexibility than trying to animate the true native launch surface itself.

Lottie is a practical choice for this kind of handoff because it can deliver motion without building a heavy custom animation stack in the first screen. The important part is sequencing:

- Native splash remains visible during critical startup work.
- React mounts the first real screen or a controlled transition screen.
- Optional animation plays only if it doesn't block interaction longer than necessary.

What doesn't work is the old `setTimeout(2000)` pattern. On a fast device, that makes the app wait for no reason. On a slow device, it often just replaces one loading state with another.

<a id="treat-launch-as-orchestration"></a>
### Treat launch as orchestration

A better mental model is **startup orchestration**. The splash screen should cover the exact tasks that must complete before the app can show meaningful content.

That usually includes some mix of:

- **Auth bootstrap:** Restoring a session or deciding whether to route to sign-in.
- **Essential storage reads:** Theme, locale, onboarding state, and last-known critical preferences.
- **Font readiness:** Especially if the first screen depends on custom typography for layout stability.
- **Remote config that gates UI:** Only if the first screen cannot safely render without it.

There's another nuance that many tutorials miss. Splash screen behavior changes depending on the environment. The [discussion of Expo splash handling in development and production](https://dev.to/abdullah_nasir_98b2b478ee/how-to-setup-splash-screen-in-react-native-expo-10e2) points out that behavior may not appear the same in Expo Go as it does in standalone builds, and that automatic visibility management changes once you take manual control. That's one reason delay-based examples age badly. They hide the actual startup sequence instead of aligning with it.

> A launch screen shouldn't be used to fake speed. It should be used to prevent users from seeing unfinished UI.

If you're adding motion in a hybrid stack or evaluating broader rendering performance, [this guide to animation performance in Capacitor apps](https://capgo.app/blog/ultimate-guide-to-animation-performance-in-capacitor-apps/) is useful context because the same discipline applies. Keep startup work lean, avoid unnecessary blocking, and let animation support responsiveness instead of competing with it.

One practical note for teams shipping visual fixes outside full binary releases: platforms such as **Capgo** handle JavaScript, CSS, copy, config, and asset updates for Capacitor and Electron apps, but native splash changes in React Native still belong to the native build pipeline because the true splash screen appears before the JavaScript app is running.

<a id="react-native-vs-capacitor-splash-screens"></a>
## React Native vs Capacitor: Splash Screens and Shipping Fixes

If you are reading this because you are starting a new app, or because your team already has a web app in React, Vue, Angular, or Svelte, it is worth comparing how splash screens work in **Capacitor**. The native launch screen concept is the same, but the day to day workflow is simpler for web teams.

<a id="splash-screens-in-capacitor"></a>
### Splash screens in Capacitor

Capacitor apps use the official [`@capacitor/splash-screen`](https://capacitorjs.com/docs/apis/splash-screen) plugin. You configure it once in `capacitor.config.ts` and hide it from your web code when the app is ready:

```ts
// capacitor.config.ts
import type { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'Example',
  webDir: 'dist',
  plugins: {
    SplashScreen: {
      launchAutoHide: false,
      backgroundColor: '#ffffff',
    },
  },
}

export default config
```

```ts
// main.ts, after your router, fonts, and auth are ready
import { SplashScreen } from '@capacitor/splash-screen'

await SplashScreen.hide()
```

The readiness rule from this guide is identical: keep the native splash static, hide it when the first real screen can paint, and run any animation in the first screen of your app. For native assets, `@capacitor/assets` generates the Android and iOS icon and splash files from your source icon and splash images (for example `icon-only.png` and `splash.png` in an `assets` folder). The step by step flow is covered in [Capacitor app initialization](/blog/capacitor-app-initialization-step-by-step-guide/).

<a id="why-web-teams-pick-capacitor"></a>
### Why web teams pick Capacitor over React Native

- **Reuse the app you already have:** Capacitor wraps your existing web app in a native shell, so your components, CSS, and build tooling keep working. React Native requires rewriting the UI in React Native components.
- **Any framework:** React, Vue, Angular, Svelte, or plain JavaScript all work. You are not tied to React.
- **Native access when you need it:** official and community plugins cover camera, push, biometrics, and more, and you can write your own Swift or Kotlin plugin.
- **Live updates for the app layer:** with [Capgo](/), you push JavaScript, HTML, CSS, and asset fixes to users on the next launch, with channels, staged rollouts, and one click rollback, without waiting for store review on every web layer change. Native changes, including the native splash screen itself, still ship through the stores. See the [Capgo live updates docs](/docs/live-updates/).

For a full comparison of performance, tooling, and team fit, read [Comparing React Native vs Capacitor](/blog/comparing-react-native-vs-capacitor/). If you are on Expo today and weighing a move, [Alternative to Expo](/blog/alternative-to-expo/) walks through the options.

<a id="troubleshooting-common-splash-screen-issues"></a>
## Troubleshooting Common Splash Screen Issues

Most splash problems fall into a small set of repeat offenders. The fix gets easier once you separate **asset issues**, **timing issues**, and **native integration issues**.

Community patterns across recent React Native guides have converged on the same core flow: add the library, configure native launch assets, call `show` during startup, and hide once the app is ready. Android setups commonly involve `MainActivity` plus XML or drawable resources, while iOS centers on `LaunchScreen.storyboard` and `AppDelegate`. The same overview notes that Expo recommends a square **1024×1024 PNG** for app icons and that EAS Build can generate required sizes for projects created with `npx create-expo-app`, as summarized in [this React Native splash screen guide](https://www.scaler.com/topics/react-native-splash-screen/).

<a id="stretched-or-blurry-splash-image"></a>
### Stretched or blurry splash image

**Symptom:** The logo looks soft, cropped, or oddly scaled.

**Cause:** The base image wasn't exported correctly, or the layout depends on a full-screen raster that doesn't adapt well.

**Fix:** Replace poster-style artwork with a centered logo on a flat background. Re-export from the original design source, regenerate density-specific assets, and verify that your Android drawables or iOS asset catalog contain the intended files.

<a id="white-screen-after-the-splash-hides"></a>
### White screen after the splash hides

**Symptom:** The native splash disappears, then users see a blank frame before the first screen.

**Cause:** Your app is hiding the splash before the root UI can render meaningful content.

**Fix:** Tie splash dismissal to readiness, not elapsed time. In Expo, that usually means holding the splash until your root view can lay out. In bare projects, use the equivalent pattern and make sure the first rendered screen doesn't immediately block on more async work.

<a id="splash-screen-missing-on-one-platform"></a>
### Splash screen missing on one platform

**Symptom:** Android shows it, iOS doesn't, or the reverse.

**Cause:** One native side wasn't fully configured. Often it's a forgotten storyboard reference, theme wiring issue, or asset not added to the correct target.

**Fix:** Check platform-specific files one by one. On Android, inspect the launch theme and resource references. On iOS, confirm `LaunchScreen.storyboard`, asset catalog membership, and app target settings in Xcode.

<a id="build-breaks-after-adding-splash-configuration"></a>
### Build breaks after adding splash configuration

**Symptom:** The app stopped compiling after introducing a library or changing splash files.

**Cause:** Native project files and generated configuration can drift out of sync, especially after plugin or asset changes.

**Fix:** Clean the build, reinstall dependencies if needed, and rebuild the native project fully. If you're in Expo with generated native layers, regenerate carefully and verify plugin config. If you're in a bare app, review `MainActivity`, `AppDelegate`, resource names, and any plist or manifest edits for small mismatches.

The fastest teams treat the splash screen as part of release engineering, not a one-time visual task. That matters even more when startup assets, UI text, or app-shell behavior need to change quickly after launch. [Capgo](https://capgo.app/) gives Capacitor and Electron teams a way to ship JavaScript, CSS, copy, config, and asset fixes on the next launch with rollout controls and rollback support, which is useful when the problem is in the app layer rather than the native launch screen itself.

<a id="frequently-asked-questions"></a>
## Frequently asked questions

**How do I add a splash screen in Expo (expo splash screen)?**  
Add the **`expo-splash-screen`** plugin to **`app.json`** or **`app.config.js`**, set **`backgroundColor`** and **`image`**, rebuild a native binary, call **`preventAutoHideAsync()`** in global scope, and **`hideAsync()`** when the first screen is ready. Validate in a dev client or production build, not only Expo Go.

**How do I keep the splash screen visible while my React Native app loads?**  
In Expo, **`preventAutoHideAsync()`** plus returning **`null`** until async work completes, then **`hideAsync()`**. With **`react-native-splash-screen`**, call **`SplashScreen.show(this)`** in Android **`MainActivity`** or **`[RNSplashScreen show]`** in iOS **`AppDelegate`**, then **`SplashScreen.hide()`** from JavaScript when ready. With **`react-native-bootsplash`**, initialize natively per platform, then call **`BootSplash.hide()`** after the same readiness gate.

**What is the difference between react-native-splash-screen and react-native-bootsplash?**  
**Bootsplash** is actively maintained and ships a generator for launch assets. **react-native-splash-screen** remains common in older repos but sees slower maintenance; prefer bootsplash for new bare CLI apps.

**How do I set up a splash screen on bare React Native without Expo?**  
Install **react-native-bootsplash**, generate assets, call **`RNBootSplash.init(this, R.style.BootTheme)`** on Android or **`RNBootSplash.initWithStoryboard("BootSplash", rootView: rootView)`** on iOS, then **`BootSplash.hide()`** from JS when startup finishes. Legacy projects may use **`SplashScreen.show(this)`** / **`[RNSplashScreen show]`** with **`SplashScreen.hide()`** instead. Rebuild after native asset changes.

**Can I use an animated splash screen in React Native or Expo?**  
On **iOS**, keep the launch screen static. On **Android 12+**, the system splash can use a short animated icon, but most teams keep **`expo-splash-screen`** or bootsplash assets static, hide when ready, then animate in React (for example Lottie). Do not rely on **`setTimeout`** to fake loading time.

**Where does splash setup differ between React Native and Capacitor?**  
React Native uses **expo-splash-screen** or bare CLI libraries before JS runs. Capacitor uses native launch screens plus **`@capacitor/splash-screen`** in the WebView stack. See [Comparing React Native vs Capacitor](/blog/comparing-react-native-vs-capacitor/) and [Capacitor app initialization](/blog/capacitor-app-initialization-step-by-step-guide/).

## Ship your Capacitor app faster with Capgo

Building with Capacitor, or planning to move a web app to mobile? [Create a free Capgo account](https://capgo.app/register/) and push your first live update in minutes. Capgo delivers JavaScript, CSS, and asset fixes to your users on the next launch, with staged rollouts and instant rollback, so a bug in your app layer never has to wait for store review.

## Keep going from React Native Splash Screen (Expo and bare CLI)

If you are using **this guide** to plan native media and interface behavior, connect it with [Using @capgo/capacitor-live-activities](/plugins/capacitor-live-activities/) for the native capability in Using @capgo/capacitor-live-activities, [@capgo/capacitor-live-activities](/docs/plugins/live-activities/) for the implementation detail in @capgo/capacitor-live-activities, [Using @capgo/capacitor-video-player](/plugins/capacitor-video-player/) for the native capability in Using @capgo/capacitor-video-player, [@capgo/capacitor-video-player](/docs/plugins/video-player/) for the implementation detail in @capgo/capacitor-video-player, and [Using @capgo/capacitor-native-navigation](/plugins/capacitor-native-navigation/) for the native capability in Using @capgo/capacitor-native-navigation.
