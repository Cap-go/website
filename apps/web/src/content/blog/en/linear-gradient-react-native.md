---
slug: linear-gradient-react-native
title: 'Master Linear Gradient React Native: Beautiful UIs in 2026'
description: 'Learn to implement stunning linear gradient react native effects. This 2026 guide covers Expo, Bare RN, backgrounds, buttons, text masks, animations, and'
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2026-06-29T13:08:56.203Z
updated_at: 2026-06-29T13:08:57.029Z
head_image: 'https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/99df39df-0a7c-45b5-b39a-ff77c00ff821/linear-gradient-react-native-tutorial-slide.jpg'
head_image_alt: 'Master Linear Gradient React Native: Beautiful UIs in 2026'
keywords: 'react native, linear gradient, react native ui, mobile ui design, expo'
tag: 'Development, Mobile'
published: true
locale: en
next_blog: ''
---
You've probably hit one of two situations.

Either your screen looks flat and unfinished, and you want a background or button that feels like an actual product instead of a scaffold. Or you already tried adding a React Native gradient, and now you're stuck in setup limbo because half the examples use Expo and the other half assume a bare native project.

That split is where most tutorials stop being useful. The component API is simple. The environment choice isn't. A clean linear gradient React Native setup depends less on the `colors` prop and more on whether you're in Expo-managed workflow or dealing with native linking, pods, and test mocks yourself.

## Table of Contents
- [Why Your React Native App Needs Gradients](#why-your-react-native-app-needs-gradients)
  - [What gradients do well](#what-gradients-do-well)
- [Choosing Your Path Expo vs Bare React Native Setup](#choosing-your-path-expo-vs-bare-react-native-setup)
  - [Expo setup](#expo-setup)
  - [Bare React Native setup](#bare-react-native-setup)
  - [Where bare projects usually break](#where-bare-projects-usually-break)
- [Core Gradient Techniques for UI Elements](#core-gradient-techniques-for-ui-elements)
  - [Full screen background gradients](#full-screen-background-gradients)
  - [Gradient buttons that still behave like buttons](#gradient-buttons-that-still-behave-like-buttons)
  - [Gradient text with a mask](#gradient-text-with-a-mask)
- [Bringing Gradients to Life with Animations](#bringing-gradients-to-life-with-animations)
  - [A shimmer loader that feels native](#a-shimmer-loader-that-feels-native)
  - [The animated component](#the-animated-component)
- [Performance Accessibility and Platform Quirks](#performance-accessibility-and-platform-quirks)
  - [Performance checklist](#performance-checklist)
  - [Accessibility checklist](#accessibility-checklist)
  - [Platform quirks checklist](#platform-quirks-checklist)
- [Troubleshooting and Final Best Practices](#troubleshooting-and-final-best-practices)
  - [Gradient not appearing](#gradient-not-appearing)
  - [iOS build breaks after install](#ios-build-breaks-after-install)
  - [Tests fail with native module errors](#tests-fail-with-native-module-errors)

<a id="why-your-react-native-app-needs-gradients"></a>
## Why Your React Native App Needs Gradients

A lot of mobile UIs fail for the same reason. The layout is fine, spacing is fine, typography is acceptable, but the screen still feels dead. Solid fills make everything look like placeholders unless the rest of the visual system is doing a lot of work.

A **linear gradient React Native** component fixes that with very little code. It adds depth, creates separation between sections, and gives high-priority elements a clear visual weight. A good gradient background can make a login screen feel intentional. A good gradient button can make the primary action obvious without resorting to heavy shadows or overly loud borders.

By **2019, expo-linear-gradient and react-native-linear-gradient appeared in over 42% of React Native projects**, which is a strong signal that gradients aren't a niche effect anymore. They're standard UI tooling in production apps, not decoration bolted on at the end, as noted in [this React Native gradient adoption write-up](https://market.gluestack.io/blog/linear-gradient-react-native).

<a id="what-gradients-do-well"></a>
### What gradients do well

- **Create depth:** A screen with one flat background often looks unfinished. A subtle top-to-bottom blend makes the surface feel layered.
- **Guide attention:** Primary CTAs, onboarding cards, and hero headers stand out without adding visual noise.
- **Replace image assets:** In many cases, a gradient gives you polish without shipping extra background images.

> **Practical rule:** Use gradients where hierarchy matters. Backgrounds, hero cards, CTA surfaces, and media overlays benefit most. Form fields, dense lists, and body copy containers usually don't.

There's also a product design angle here. Teams working across platforms already spend time trying to keep interfaces consistent. If that's part of your stack, these [cross-platform UI and UX practices for mobile apps](https://capgo.app/blog/cross-platform-uiux-best-practices-for-capacitor-apps/) line up well with the same thinking: fewer assets, more reusable surfaces, and visual systems that hold up across screens.

<a id="choosing-your-path-expo-vs-bare-react-native-setup"></a>
## Choosing Your Path Expo vs Bare React Native Setup

This is the fork that causes most of the pain. The rendering API feels almost identical in both libraries, but setup isn't.

If you're in an Expo-managed app, use `expo-linear-gradient`. If you're in a bare React Native app, use `react-native-linear-gradient`. Don't try to blur those lines unless you know exactly why you're doing it.

![A comparison infographic between Expo-managed and bare React Native workflows for implementing linear gradients.](https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/d922ccec-bf9f-44a8-999e-555efd2578cc/linear-gradient-react-native-comparison-infographic.jpg)

<a id="expo-setup"></a>
### Expo setup

Expo is the smoother path. Installation is straightforward, version matching is handled for you, and you don't have to think about native linking.

Install it like this:

```bash
npx expo install expo-linear-gradient
```

Use it like this:

```tsx
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
  return (
    <LinearGradient
      colors={['#0f172a', '#1d4ed8']}
      style={styles.container}
    >
      <Text style={styles.text}>Hello gradient</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
  },
});
```

Expo is the right choice when you want fast setup, sane defaults, and fewer native edges. That's also why teams exploring advanced Expo workflows often end up using an [Expo development client for custom native capabilities](https://capgo.app/blog/expo-development-client/) only when the managed path no longer covers the app's needs.

<a id="bare-react-native-setup"></a>
### Bare React Native setup

Bare React Native gives you direct native module access, but you own the rough edges.

Install the package:

```bash
npm install react-native-linear-gradient
```

For iOS, install pods:

```bash
cd ios && pod install
```

Basic usage:

```tsx
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function App() {
  return (
    <LinearGradient
      colors={['#111827', '#7c3aed']}
      style={styles.container}
    >
      <Text style={styles.text}>Hello gradient</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
  },
});
```

<a id="where-bare-projects-usually-break"></a>
### Where bare projects usually break

The missing piece in most tutorials is testing and native setup. According to [this Stack Overflow discussion summary](https://stackoverflow.com/questions/69007713/problem-with-linear-gradient-react-native), **68% of Stack Overflow threads on this topic in 2024 to 2025 involve native module failures in bare React Native setups**, and the same source notes recurring problems with Jest mocking and iOS CocoaPods conflicts.

If you use Jest in a bare app, add the mock explicitly:

```js
// jest.setup.js
import mockRNLinearGradient from 'react-native-linear-gradient/jest/linear-gradient-mock';

jest.mock('react-native-linear-gradient', () => mockRNLinearGradient);
```

And reference that setup file in your Jest config:

```js
module.exports = {
  preset: 'react-native',
  setupFiles: ['<rootDir>/jest.setup.js'],
};
```

> Bare React Native works well for gradients. It just doesn't forgive incomplete setup. Most failures aren't visual bugs. They're linking, pods, or test environment issues.

Here's the practical decision table:

| Project type | Library | Best fit |
|---|---|---|
| Expo-managed app | `expo-linear-gradient` | Fastest path, least setup |
| Bare React Native app | `react-native-linear-gradient` | Full native control |
| Bare app with Jest | `react-native-linear-gradient` + mock | Required to keep tests stable |

<a id="core-gradient-techniques-for-ui-elements"></a>
## Core Gradient Techniques for UI Elements

A common approach is to use the same small set of gradient patterns over and over. Backgrounds. Buttons. Headlines. If those three are solid, you can reuse them across a lot of screens.

![A person working on a laptop displaying a modern dashboard interface with colorful gradient design elements.](https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/3e4f75c4-631a-4743-b677-0b0f8c2a2eec/linear-gradient-react-native-dashboard-ui.jpg)

A useful mental model is this:

- `colors` controls the palette
- `start` and `end` control direction
- `locations` controls where transitions happen

If your splash or onboarding entry screen uses a gradient, it pairs naturally with the broader startup sequence patterns described in this [React Native splash screen guide](https://capgo.app/blog/splash-screen-in-react-native/).

<a id="full-screen-background-gradients"></a>
### Full screen background gradients

This is the simplest and most reusable pattern.

```tsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
// For bare RN, switch to:
// import LinearGradient from 'react-native-linear-gradient';

export default function WelcomeScreen() {
  return (
    <LinearGradient
      colors={['#0f172a', '#1e293b', '#2563eb']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Welcome back</Text>
        <Text style={styles.subtitle}>Your workspace is ready.</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 8,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 16,
  },
});
```

A diagonal blend usually feels more dynamic than a default vertical one. That's why `start={{ x: 0, y: 0 }}` and `end={{ x: 1, y: 1 }}` are a good default when the screen is mostly decorative.

> Don't choose colors in isolation. Test them behind real text, icons, and status bar styles. A palette that looks nice in Figma can fail instantly once content sits on top of it.

<a id="gradient-buttons-that-still-behave-like-buttons"></a>
### Gradient buttons that still behave like buttons

The common mistake here is putting touch behavior directly on the gradient and forgetting about disabled state, press feedback, or padding consistency. Keep the button semantic and let the gradient be the visual layer.

```tsx
import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

type Props = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function GradientButton({
  title,
  onPress,
  disabled = false,
  style,
}: Props) {
  return (
    <Pressable onPress={onPress} disabled={disabled} style={style}>
      {({ pressed }) => (
        <LinearGradient
          colors={
            disabled
              ? ['#94a3b8', '#94a3b8']
              : pressed
              ? ['#7c3aed', '#2563eb']
              : ['#8b5cf6', '#3b82f6']
          }
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.button}
        >
          <Text style={styles.label}>{title}</Text>
        </LinearGradient>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 52,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  label: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
```

For buttons, a horizontal gradient often reads better than a diagonal one. It keeps the label stable and avoids making the control feel tilted.

<a id="gradient-text-with-a-mask"></a>
### Gradient text with a mask

This is the flashiest pattern in the set, and it's useful when you keep it restrained. Hero titles, upgrade banners, and empty-state headlines are good candidates. Paragraph text isn't.

You'll need `@react-native-masked-view/masked-view`.

```bash
npm install @react-native-masked-view/masked-view
```

Then build the text mask:

```tsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';

export default function GradientHeadline() {
  return (
    <View style={styles.container}>
      <MaskedView
        maskElement={
          <View style={styles.maskWrapper}>
            <Text style={styles.title}>Premium analytics</Text>
          </View>
        }
      >
        <LinearGradient
          colors={['#22c55e', '#06b6d4', '#3b82f6']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          locations={[0, 0.5, 1]}
        >
          <Text style={[styles.title, styles.hiddenText]}>Premium analytics</Text>
        </LinearGradient>
      </MaskedView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
  },
  maskWrapper: {
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: -1,
  },
  hiddenText: {
    opacity: 0,
  },
});
```

`locations` matters most when you want one color to occupy more visual space than another. If the blend feels muddy, reduce the number of colors first. That usually fixes the design faster than tweaking every stop.

<a id="bringing-gradients-to-life-with-animations"></a>
## Bringing Gradients to Life with Animations

Static gradients give you polish. Animated gradients give you feedback.

The most practical use isn't a flashy background. It's a shimmer loader. That effect tells users the app is active, data is coming, and the layout they're seeing is intentional rather than broken.

![A hand holding a smartphone displaying a sleek mobile banking app dashboard with a gradient design.](https://cdnimg.co/c504846a-b33a-4018-bc93-5bfa9be0f3af/b8ad7680-70e1-4bc6-b025-d8ae30521023/linear-gradient-react-native-mobile-app.jpg)

A shimmer component also complements other motion patterns. If your app already uses animated icons or loaders, this [Lottie in React Native guide](https://capgo.app/blog/lottie-react-native/) is useful for deciding when a gradient shimmer is enough and when a richer animation asset makes more sense.

<a id="a-shimmer-loader-that-feels-native"></a>
### A shimmer loader that feels native

The simplest reliable version uses `react-native-reanimated` to move a gradient band across a clipped placeholder.

Install Reanimated if it isn't already in your app, then create a wrapper with `overflow: 'hidden'`. Inside it, animate a gradient layer from left to right.

```tsx
import React, { useEffect } from 'react';
import { StyleSheet, View, ViewStyle, StyleProp } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const AnimatedView = Animated.createAnimatedComponent(View);

type Props = {
  width?: number | string;
  height?: number;
  borderRadius?: number;
  style?: StyleProp<ViewStyle>;
};

export function ShimmerPlaceholder({
  width = '100%',
  height = 16,
  borderRadius = 8,
  style,
}: Props) {
  const translateX = useSharedValue(-220);

  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(220, {
        duration: 1200,
        easing: Easing.linear,
      }),
      -1,
      false
    );
  }, [translateX]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View
      style={[
        styles.container,
        { width, height, borderRadius },
        style,
      ]}
    >
      <AnimatedView style={[styles.shimmer, animatedStyle]}>
        <LinearGradient
          colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.35)', 'rgba(255,255,255,0)']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={styles.gradient}
        />
      </AnimatedView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    backgroundColor: '#e5e7eb',
  },
  shimmer: {
    ...StyleSheet.absoluteFillObject,
    width: 220,
  },
  gradient: {
    flex: 1,
  },
});
```

What makes this work is that you're not trying to animate the gradient definition itself. You're animating a gradient layer across a static placeholder. That's simpler, easier to reason about, and usually more stable across devices.

Here's a visual walkthrough of the effect in practice:

<iframe width="100%" style="aspect-ratio: 16 / 9;" src="https://www.youtube.com/embed/ZSPvvGU2LBg" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

<a id="the-animated-component"></a>
### The animated component

A few implementation notes matter:

- **Use clipping:** The parent needs `overflow: 'hidden'`, or the shimmer will bleed outside rounded corners.
- **Keep the band narrow:** A smaller animated layer is easier to tune than animating the entire surface.
- **Match the base color to the screen:** Skeleton loaders should fit the surrounding layout, not look like a separate widget.

> Animated gradients work best when users barely notice them. If the shimmer becomes the loudest thing on the screen, it's doing too much.

<a id="performance-accessibility-and-platform-quirks"></a>
## Performance Accessibility and Platform Quirks

Once gradients move from demo screens into production, the concerns change. The code still looks simple, but rendering behavior, readability, and platform consistency start to matter more than the initial effect.

If you're tightening app responsiveness more broadly, this [mobile app performance optimization guide](https://capgo.app/blog/app-performance-optimization/) fits the same mindset: reduce unnecessary work, measure on real devices, and optimize the surfaces users see most.

<a id="performance-checklist"></a>
### Performance checklist

Native gradients are generally efficient, but you can still misuse them.

- **Prefer gradients over large decorative images:** They're often cleaner to ship and easier to adapt to multiple screen sizes.
- **Avoid stacking many full-screen layers:** One background gradient is fine. Several overlapping translucent gradients plus blur plus heavy animation can get expensive.
- **Memoize reusable components:** If a gradient card is used in a list, keep props stable and avoid rerendering it for unrelated parent state.

A good rule is to keep gradients structural, not excessive. Use them to define surfaces, not every row in a dense feed.

<a id="accessibility-checklist"></a>
### Accessibility checklist

Gradients can hurt readability fast because contrast changes across the surface.

- **Test text against the lightest area:** If white text only works on the dark side of the blend, it doesn't work.
- **Add a scrim when needed:** A subtle dark overlay between background and text is often better than changing the entire palette.
- **Reserve gradient text for large display copy:** It looks good on headlines. It's a poor choice for small labels, helper text, or anything critical to complete a task.

> Check the worst-case point on the gradient, not the prettiest one.

<a id="platform-quirks-checklist"></a>
### Platform quirks checklist

iOS and Android usually render the same gradient closely, but not always perfectly.

| Issue | What usually helps |
|---|---|
| Gradient looks different across platforms | Use fewer colors and clearer contrast between stops |
| Rounded corners don't clip the gradient | Put `overflow: 'hidden'` on the container |
| Gradient doesn't show at all | Check width, height, or `flex: 1` first |

Also watch your status bar and safe area treatment. A gradient that looks balanced in the simulator can feel top-heavy on a device with a notch if the content and background don't account for that extra space.

<a id="troubleshooting-and-final-best-practices"></a>
## Troubleshooting and Final Best Practices

Here's the short version I'd keep in a project note.

- **Match the library to the workflow:** `expo-linear-gradient` for Expo-managed apps, `react-native-linear-gradient` for bare React Native.
- **Keep gradients purposeful:** Backgrounds, CTAs, overlays, and hero text are strong use cases.
- **Control direction intentionally:** Horizontal for buttons, diagonal for decorative backgrounds, masked only for large text.
- **Design for content, not empty states:** Test with real copy, icons, and status bar treatment.
- **Treat bare setup as native setup:** Pods, linking, and Jest mocks aren't optional details.

Three common failures come up repeatedly.

<a id="gradient-not-appearing"></a>
### Gradient not appearing

Cause: the component has no visible size.

Fix: give it `flex: 1`, an explicit height, or a parent with dimensions. A gradient with no layout box won't render in any meaningful way.

<a id="ios-build-breaks-after-install"></a>
### iOS build breaks after install

Cause: pods weren't installed or the native dependency graph is out of sync.

Fix: run `pod install` in `ios`, clean the build folder if needed, then rebuild the app. In bare projects, package install alone usually isn't enough.

<a id="tests-fail-with-native-module-errors"></a>
### Tests fail with native module errors

Cause: Jest is trying to load the actual native module.

Fix: mock `react-native-linear-gradient` with `react-native-linear-gradient/jest/linear-gradient-mock` in your Jest setup file.

If you keep one idea from this whole guide, keep this one: the gradient itself is easy. The production-ready setup is the main effort. Once you pick the right library for your app architecture, everything after that gets much more predictable.

---

If your team ships hybrid mobile apps and wants to push JavaScript, CSS, copy, config, and asset updates without waiting on store review, [Capgo](https://capgo.app) is worth a look. It gives CapacitorJS and Electron teams controlled live updates, rollout channels, rollback protection, and release visibility without turning your deployment process into a black box.
