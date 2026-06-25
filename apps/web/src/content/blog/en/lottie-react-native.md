---
slug: lottie-react-native
title: Lottie React Native
description: 'Our complete guide teaches you to use lottie react native. Covers Expo & bare workflows, animation controls, performance tuning, and best practices for 2026.'
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2026-06-25T09:27:00.852Z
updated_at: 2026-06-25T09:29:28.000Z
head_image: 'https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/65847988-3518-4343-87b0-8ae084aa3a99/lottie-react-native-doodle-illustration.jpg'
head_image_alt: Lottie React Native
keywords: 'lottie react native, react native animation, expo lottie, mobile animation, react native guide'
tag: 'Mobile, Guides'
published: true
locale: en
next_blog: ''
---
You're probably in one of two spots right now. Either you have a designer handing you a Lottie JSON and asking, “Can we get this into the app today?”, or you already wired it up and noticed the animation works in development but starts feeling expensive once real devices, startup time, and release builds enter the picture.

That's where Lottie React Native gets interesting. The basic demo is easy. Production-ready implementation isn't. The difference usually comes down to how you install it, how you control playback, and whether you treat animation files like harmless assets or like part of your performance budget.

<a id="why-lottie-is-essential-for-react-native-apps"></a>

## Table of Contents
- [Why Lottie Is Essential for React Native Apps](#why-lottie-is-essential-for-react-native-apps)
  - [Design and engineering stop fighting the same battle](#design-and-engineering-stop-fighting-the-same-battle)
  - [Where Lottie fits best](#where-lottie-fits-best)
- [Setting Up Your Lottie Development Environment](#setting-up-your-lottie-development-environment)
  - [Choose the workflow before you install](#choose-the-workflow-before-you-install)
  - [Expo managed setup](#expo-managed-setup)
  - [Bare React Native setup](#bare-react-native-setup)
  - [Bare workflow checks that save time](#bare-workflow-checks-that-save-time)
- [Displaying Your First Lottie Animation](#displaying-your-first-lottie-animation)
  - [Add a local animation file](#add-a-local-animation-file)
  - [Render it with LottieView](#render-it-with-lottieview)
  - [A better first-screen test](#a-better-first-screen-test)
- [Mastering Lottie Animation Controls](#mastering-lottie-animation-controls)
  - [Use props when playback is simple](#use-props-when-playback-is-simple)
  - [Use refs when state drives the animation](#use-refs-when-state-drives-the-animation)
  - [A reliable liked and unliked pattern](#a-reliable-liked-and-unliked-pattern)
- [Performance Tuning for Production Apps](#performance-tuning-for-production-apps)
  - [Where teams get into trouble](#where-teams-get-into-trouble)
  - [What to optimize first](#what-to-optimize-first)
  - [Local files versus remote delivery](#local-files-versus-remote-delivery)
- [Troubleshooting Common Lottie Issues](#troubleshooting-common-lottie-issues)
  - [Animation doesn't render on Android](#animation-doesnt-render-on-android)
  - [Playback is choppy on older devices](#playback-is-choppy-on-older-devices)
  - [The ref is null or play does nothing](#the-ref-is-null-or-play-does-nothing)
  - [The animation looks wrong across screen sizes](#the-animation-looks-wrong-across-screen-sizes)

## Why Lottie Is Essential for React Native Apps

If you've ever tried to recreate a polished product animation by hand in React Native, you already know the pain. Small motion details turn into a pile of timing logic, interpolations, and platform quirks. The animation may look close, but “close” usually isn't what the designer shipped.

Lottie changed that workflow. Airbnb open-sourced Lottie in 2016, and that release changed mobile animation by letting designers ship animations directly instead of forcing engineers to rebuild them frame by frame. In some enterprise settings, that shift reduced mobile app development costs by **up to 40%**, according to [Airbnb's Lottie overview](https://airbnb.io/lottie/).

<a id="design-and-engineering-stop-fighting-the-same-battle"></a>
### Design and engineering stop fighting the same battle

A key benefit of Lottie React Native isn't just “pretty animations in JSON.” It's the separation of concerns. Designers work in After Effects and export with Bodymovin. Developers render the output with native-backed playback instead of translating motion into custom code.

That matters because animation work has a habit of spreading. A single celebratory state animation can touch design review, product review, Android behavior, iOS behavior, accessibility, and startup performance. Lottie narrows that surface area.

> **Practical rule:** Use Lottie when the animation is part of the product experience, not when you only need a simple opacity or translate transition.

There's also a user experience angle. Motion gives feedback, confirms actions, and makes loading states feel less dead. If your team is thinking seriously about polish, retention, or trust in the interface, animation is part of that conversation. The broader [app user experience discussion](https://capgo.app/blog/app-user-experience/) usually ends up in the same place: fast feedback beats static screens.

<a id="where-lottie-fits-best"></a>
### Where Lottie fits best

Lottie React Native tends to work best for:

- **Branded micro-interactions** like likes, saves, checkmarks, and purchase success states
- **Onboarding illustrations** that need to feel custom without shipping video
- **Loading and empty states** where static UI feels unfinished
- **Feature education** when product wants motion without embedding GIFs or MP4s

What it doesn't solve is every animation problem. For basic screen transitions, React Native's own animation tools are often simpler. For very large or highly interactive motion systems, the JSON format can become a trade-off instead of a win. That trade-off becomes more important once you hit production, which is where most tutorials stop too early.

<a id="setting-up-your-lottie-development-environment"></a>
## Setting Up Your Lottie Development Environment

The install path depends on one decision first: **Expo managed workflow or bare React Native**. Don't mix the mental models. Most setup problems happen when developers follow a bare workflow guide inside Expo, or assume Expo abstracts every native detail away.

![A flowchart showing the setup steps for Lottie animations in Expo and Bare React Native projects.](https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/c3b30338-dbb8-41e7-8d42-443dc54f1174/lottie-react-native-setup-guide.jpg)

<a id="choose-the-workflow-before-you-install"></a>
### Choose the workflow before you install

If your app lives in Expo and you want the fastest setup, stay on the Expo path unless you know you need custom native work. If you're in a bare app, or you already rely on native modules that need direct control, install it as a normal native dependency and validate both iOS and Android builds immediately.

A lot of teams underestimate how much easier debugging becomes when you keep your setup aligned with the project type. That's also why many teams building custom native integrations move early to an [Expo development client workflow](https://capgo.app/blog/expo-development-client/) instead of waiting until the app gets harder to change.

<a id="expo-managed-setup"></a>
### Expo managed setup

For Expo-managed apps, keep it minimal.

1. **Install the package**
   ```bash
   npx expo install lottie-react-native
   ```

2. **Restart Metro**
   ```bash
   npx expo start -c
   ```

3. **Verify on device or simulator**
   Start with a local JSON file and render a very small animation first. Don't debug a large asset and a new install at the same time.

A few practical notes matter in Expo:

- **Prefer local files first:** Remote animation debugging adds network noise when you're only trying to prove the library is working.
- **Test release behavior early:** Development mode can hide issues related to timing and performance.
- **Watch asset paths:** Misplaced JSON files are one of the most common “it renders nothing” causes.

> Expo is the quickest route to “it works.” That doesn't mean it's the quickest route to “it scales.”

<a id="bare-react-native-setup"></a>
### Bare React Native setup

In a bare project, install and validate native dependencies right away.

1. **Install the package**
   ```bash
   npm install lottie-react-native
   ```

2. **Install iOS pods**
   ```bash
   cd ios && pod install && cd ..
   ```

3. **Rebuild the app**
   ```bash
   npx react-native run-ios
   ```
   or
   ```bash
   npx react-native run-android
   ```

Here's the part many quick-start guides skip: after installation, do a full native rebuild before deciding something is broken. Hot reload won't rescue a native dependency that hasn't been compiled into the app correctly.

<a id="bare-workflow-checks-that-save-time"></a>
### Bare workflow checks that save time

Use this short checklist before moving on:

| Check | Why it matters |
|---|---|
| **Rebuild after install** | Native modules need a fresh compile |
| **Run `pod install`** | iOS won't be reliable without it |
| **Use a simple local JSON first** | Isolates install issues from asset issues |
| **Test both platforms early** | Android and iOS can fail for different reasons |

If the package installs cleanly but your first animation doesn't show, that's usually not an install problem. It's usually the asset path, component sizing, or playback configuration.

<a id="displaying-your-first-lottie-animation"></a>
## Displaying Your First Lottie Animation

The first working animation should be boring. Local file. Fixed size. Autoplay on. Loop optional. Don't start with conditional playback, remote JSON, or a heavily layered animation export.

![A modern developer workspace with a laptop displaying code and a monitor showing a mobile animation app.](https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/dcb46158-2870-4586-9400-a4d6a3e26c24/lottie-react-native-developer-setup.jpg)

<a id="add-a-local-animation-file"></a>
### Add a local animation file

Create an asset folder if you don't already have one:

```text
assets/
  animations/
    success.json
```

Keep names simple. Avoid spaces, odd punctuation, and folders with many levels of nesting. You want `require()` paths to stay obvious.

If you're using Lottie for an initial branded loading screen or handoff after launch, think carefully before putting a large animation into the startup path. That's especially true when you're also tuning your [React Native splash screen behavior](https://capgo.app/blog/splash-screen-in-react-native/).

<a id="render-it-with-lottieview"></a>
### Render it with LottieView

Create a dedicated component instead of dropping it straight into a large screen file:

```tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';

export function SuccessAnimation() {
  return (
    <View style={styles.container}>
      <LottieView
        source={require('../assets/animations/success.json')}
        autoPlay
        loop={false}
        style={styles.animation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  animation: {
    width: 220,
    height: 220,
  },
});
```

That does three useful things:

- it proves the library renders correctly
- it proves the asset path resolves correctly
- it gives you one isolated place to adjust playback and sizing later

A few gotchas show up immediately if you skip the basics:

- **No width or height:** The animation can exist but be invisible.
- **Bad `require()` path:** Metro won't find the file.
- **Invalid export:** Some JSON files are technically valid but include features that don't behave as expected on mobile.

> Keep the first render local and deterministic. You're testing integration, not architecture.

<a id="a-better-first-screen-test"></a>
### A better first-screen test

Put the component on a simple screen with a neutral background:

```tsx
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { SuccessAnimation } from './src/SuccessAnimation';

export default function App() {
  return (
    <SafeAreaView style={styles.screen}>
      <SuccessAnimation />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
```

If this works in both iOS and Android simulators, you've cleared the first real hurdle. From there, the next step isn't adding more animations. It's learning when to use declarative props and when to take direct control with refs.

<a id="mastering-lottie-animation-controls"></a>
## Mastering Lottie Animation Controls

Most Lottie React Native bugs show up when the animation needs to react to state. Autoplay is easy. “Play this segment when the user likes an item, reverse when they unlike it, and don't stutter when the component re-renders” is where things get messy.

![A comparison chart explaining declarative versus imperative animation control methods in Lottie, highlighting their specific use cases.](https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/839a7592-6e23-49df-a368-255f10fb1d6f/lottie-react-native-animation-control.jpg)

<a id="use-props-when-playback-is-simple"></a>
### Use props when playback is simple

For non-interactive playback, props are enough.

```tsx
<LottieView
  source={require('../assets/animations/loading.json')}
  autoPlay
  loop
  speed={1}
/>
```

This style is good for:

- loading indicators
- passive onboarding illustrations
- decorative empty states

It's declarative and readable. The component mounts, playback starts, and React stays in charge. If the animation logic can be described entirely by props, keep it there.

A more advanced declarative case is `progress`, where you tie the animation frame to another value. That works well when motion should reflect some external progress source, but it's less convenient for one-off trigger events.

Here's a quick visual comparison before moving to refs:

<iframe width="100%" style="aspect-ratio: 16 / 9;" src="https://www.youtube.com/embed/oOdaiXDM2ew" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

<a id="use-refs-when-state-drives-the-animation"></a>
### Use refs when state drives the animation

When the user taps, toggles, or completes an action, a ref is usually the safer tool. Real-world data shows **68% of developers using hybrid frameworks report failed animation triggers due to improper ref handling in `useEffect` hooks**, which is why dependable patterns built around `animation.current.play()` matter, as noted in this [Capacitor-focused discussion of failed triggers](https://www.youtube.com/watch?v=FySemYmSPHg).

That problem isn't limited to hybrid apps. It appears in plain React Native too, especially when developers recreate refs, trigger playback before mount, or tie animation calls to unstable effects.

```tsx
import React, { useRef, useState } from 'react';
import { Pressable } from 'react-native';
import LottieView from 'lottie-react-native';

export function LikeButton() {
  const animationRef = useRef<LottieView>(null);
  const [liked, setLiked] = useState(false);

  const onPress = () => {
    if (!animationRef.current) return;

    if (liked) {
      animationRef.current.play(60, 0);
    } else {
      animationRef.current.play(0, 60);
    }

    setLiked(!liked);
  };

  return (
    <Pressable onPress={onPress}>
      <LottieView
        ref={animationRef}
        source={require('../assets/animations/like.json')}
        loop={false}
        autoPlay={false}
        style={{ width: 96, height: 96 }}
      />
    </Pressable>
  );
}
```

<a id="a-reliable-liked-and-unliked-pattern"></a>
### A reliable liked and unliked pattern

This pattern holds up better in production than calling `play()` inside `useEffect` every time state changes.

Why it works:

- **The event owns the animation trigger:** A press event is a stable moment to start playback.
- **The ref stays local and persistent:** `useRef` avoids unnecessary rerenders.
- **The component avoids autoplay conflicts:** You don't want mount behavior fighting user-triggered behavior.

Common mistakes worth avoiding:

1. **Triggering before the ref exists**  
   If `animationRef.current` is null, playback won't happen. Guard it.

2. **Using `autoPlay` with imperative controls**  
   Pick one default owner for playback.

3. **Driving everything through `useEffect`**  
   Effects are useful, but for UI actions they often add timing problems instead of removing them.

> If an animation responds to a tap, trigger it inside the tap handler first. Reach for `useEffect` only when the source of truth lives outside that interaction.

<a id="performance-tuning-for-production-apps"></a>
## Performance Tuning for Production Apps

Lottie React Native is one of those libraries that looks lightweight until teams start stuffing large JSON files into the app bundle and wondering why startup regressed. The animation itself isn't always the problem. The delivery strategy is.

![An infographic detailing three key benefits of Lottie performance tuning: reduced bundle size, improved frame rates, and lower memory usage.](https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/3c7a4d8f-1374-405f-9cef-ad0f488ee0e2/lottie-react-native-performance-tuning.jpg)

<a id="where-teams-get-into-trouble"></a>
### Where teams get into trouble

The easiest mistake is bundling every animation directly into JavaScript and loading it all too early. According to [this guide on shipping Lottie JSON incorrectly](https://dev.to/retyui/boost-your-react-native-app-start-time-stop-shipping-lottie-json-incorrectly-2074), overloading JS bundles with assets like Lottie JSONs can increase app start times by **40% or more on mid-range devices**, and moving them to native assets for on-demand loading is a critical optimization.

That lines up with what many teams see in practice. The problem isn't a single tiny success animation. It's the pile-up:

- onboarding motion
- loader states
- e-commerce reactions
- branded empty screens
- locale files and other bundle-heavy assets sitting beside them

If your app already has a startup budget problem, Lottie files can make it worse fast.

<a id="what-to-optimize-first"></a>
### What to optimize first

Start with the export itself. A sloppy animation export carries complexity you'll pay for later in parsing, memory, and render stability. Don't accept every designer export as-is.

Use this production checklist:

- **Compress the JSON before shipping:** Smaller files are easier to load and less likely to bloat startup.
- **Move non-critical animations out of the JS bundle:** Keep launch code focused on what the app needs immediately.
- **Load animations on demand:** Render when the screen or action needs it.
- **Audit old-device behavior:** A modern simulator can hide expensive playback.
- **Avoid using large Lottie files as startup decoration:** If it's not critical to first interaction, it shouldn't compete with app launch.

For teams doing serious mobile performance work, [AppLighter's guide to mobile performance](https://www.applighter.com/blog/react-native-performance-benchmarks-expo-vs-bare-vs-flutter-vs-native-2026) is a useful companion read because it puts animation decisions in the larger context of app startup, rendering, and framework trade-offs.

> **One hard truth:** A beautiful animation that delays first interaction is usually a product bug, not a design win.

You should also think beyond React Native in isolation. Teams working in hybrid stacks run into similar asset-loading problems, and the broader [animation performance guidance for Capacitor apps](https://capgo.app/blog/ultimate-guide-to-animation-performance-in-capacitor-apps/) maps well to Lottie decisions too.

<a id="local-files-versus-remote-delivery"></a>
### Local files versus remote delivery

Local files are predictable. They work offline, remove network variability, and are easier to test. They're also easy to over-bundle.

Remote delivery keeps the binary leaner, but now your animation has availability, caching, and fallback concerns. That trade-off is acceptable for non-critical motion. It's risky for primary UX states like purchase confirmation or authentication success.

A practical split works well:

| Asset type | Better default |
|---|---|
| **Core interaction animation** | Local, optimized, not oversized |
| **Occasional promotional motion** | Remote with fallback |
| **Startup-path animation** | Local only if absolutely necessary |
| **Rarely used feature illustration** | On-demand load |

If you only apply one rule from this section, use this one: **treat Lottie JSONs as performance-sensitive assets, not harmless decoration**.

<a id="troubleshooting-common-lottie-issues"></a>
## Troubleshooting Common Lottie Issues

When Lottie breaks, the cause is usually ordinary. Wrong path. Missing size. Bad ref timing. Overweight JSON. The fastest way to debug it is to reduce variables.

<a id="animation-doesnt-render-on-android"></a>
### Animation doesn't render on Android

First, confirm the JSON file resolves. Then give the component explicit dimensions.

```tsx
<LottieView
  source={require('../assets/animations/success.json')}
  autoPlay
  style={{ width: 200, height: 200 }}
/>
```

If that still fails, swap in a different known-good animation. That tells you whether the issue is the file or the setup.

<a id="playback-is-choppy-on-older-devices"></a>
### Playback is choppy on older devices

This usually points to the asset, not the component API.

Try these fixes:

- **Reduce animation complexity:** Ask for a lighter export if the source file is heavy.
- **Load later:** Don't compete with initial screen work.
- **Test a compressed version:** If the compressed file behaves better, you found the bottleneck.
- **Remove multiple simultaneous Lottie views:** Several animations on one screen can be too much.

<a id="the-ref-is-null-or-play-does-nothing"></a>
### The ref is null or play does nothing

Null refs usually mean the trigger fires before mount, or the component got conditionally removed.

```tsx
if (animationRef.current) {
  animationRef.current.play();
}
```

Keep the ref stable with `useRef`, and don't recreate the animated component unnecessarily. If you're debugging repeated weirdness in local builds, clearing stale caches can help. A simple [Yarn cache cleanup routine](https://capgo.app/blog/yarn-clear-cache/) is sometimes enough to remove misleading asset behavior during development.

<a id="the-animation-looks-wrong-across-screen-sizes"></a>
### The animation looks wrong across screen sizes

Don't let the animation define layout. Put it inside a container and size it intentionally.

- **Use fixed bounds for icons and reactions**
- **Use aspect-aware wrappers for larger illustrations**
- **Avoid stretching to full width without checking the export's intended composition**

> Most “Lottie is broken” reports end up being layout issues, asset issues, or timing issues. The library is often doing exactly what you asked.

If you need a final debugging shortcut, remove every advanced prop, render one local animation in a centered view, and build back up from there. That approach isolates problems faster than staring at a busy production screen.

---

Capgo helps teams ship JavaScript, asset, and config fixes to Capacitor apps without waiting on store review. If you maintain a hybrid app and need a safer way to push updates, handle staged rollouts, and recover quickly from front-end issues, [Capgo](https://capgo.app) is worth a look.
