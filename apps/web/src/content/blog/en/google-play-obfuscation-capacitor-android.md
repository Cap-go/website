---
slug: google-play-obfuscation-capacitor-android
title: Fix DEX Code Optimization Below Threshold (Capacitor)
description: >-
  Play Console warns DEX code optimization is below our threshold. Enable R8
  minify and shrink on Capacitor Android release builds, upload mapping, and
  ship a new AAB.
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-09-02T11:47:00.000Z
updated_at: 2026-11-19T10:34:55.000Z
head_image: /blog-images/google-play-obfuscation-capacitor-android.png
head_image_alt: "Capgo blog graphic: Fix Google Play obfuscation below 25% in Capacitor apps, with an Android vitals card showing 3% obfuscation and R8 minifyEnabled reaching 25 percent"
keywords: >-
  dex code optimization is below our threshold, dex code optimisation below
  threshold, obfuscation percentage, R8 APK login, android.r8.gradual.support,
  Capacitor Android, Google Play Console, DEX optimization, R8 minifyEnabled
tag: Development, Android, Google Play
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: What does DEX code optimization is below our threshold mean?
    answer: >-
      Google Play measured shrinking, bytecode optimization, and name
      obfuscation on the DEX in your uploaded App Bundle and scored at least one
      metric below its policy floor. For many apps that floor is 25% on each
      metric when DEX size is over 10 MB. Capacitor projects often fail because
      the Android template ships release builds with R8 off.
  - question: What is obfuscation percentage on Google Play?
    answer: >-
      In App bundle explorer and Android vitals, obfuscation percentage reflects
      how much of your app DEX had classes, fields, and methods renamed by a
      shrinker such as R8. Optimization and shrinking are separate percentages.
      Play derives them from mapping files, r8.json on recent AGP versions, or
      heuristics when no mapping exists.
  - question: How do I fix DEX code optimisation below threshold in Capacitor?
    answer: >-
      In android/app/build.gradle, set minifyEnabled true and shrinkResources
      true on release, use proguard-android-optimize.txt, rely on Capacitor
      plugin consumer keep rules, build bundleRelease, attach mapping.txt in Play
      Console, and upload the new AAB to a test track before production.
  - question: >-
      Why does Gradle say Cannot use optimization.enable=true without setting
      android.r8.gradual.support flag?
    answer: >-
      You turned on the AGP optimization DSL with enable=true while using
      packageScope or other gradual R8 features. Add android.r8.gradual.support=true
      to gradle.properties, or switch a Capacitor app to the legacy release block
      with isMinifyEnabled true instead of optimization.enable.
  - question: Why does my Capacitor app crash after I enable R8?
    answer: >-
      A plugin may use reflection without shipping consumer ProGuard rules. Test
      a release APK, add a narrow keep rule for the failing package only, and
      avoid broad rules such as -keep class ** { *; }. Core Capacitor keep rules
      ship with @capacitor/android 3.2.3 and later.
  - question: How do I verify obfuscation improved after upload?
    answer: >-
      Open Test and release, App bundle explorer for the version you uploaded,
      and read obfuscation, optimization, and shrinking. Confirm
      app/build/outputs/mapping/release/mapping.txt exists locally and appears
      under Downloads, Assets in Play Console.
---

**Quick answer:** When Play Console says **DEX code optimization is below our threshold**, Google scored shrinking, optimization, or obfuscation on your **DEX** too low, often because the Capacitor Android **release** build still has R8 off. Turn on R8 minify and resource shrink, use `proguard-android-optimize.txt`, keep Capacitor plugins with the shipped consumer rules, rebuild a release **AAB**, and upload it with `mapping.txt`. JavaScript minification does not count toward this warning.

```groovy
// android/app/build.gradle (Groovy)
buildTypes {
    release {
        minifyEnabled true
        shrinkResources true
        proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
    }
}
```

```kotlin
// android/app/build.gradle.kts
buildTypes {
    getByName("release") {
        isMinifyEnabled = true
        isShrinkResources = true
        proguardFiles(
            getDefaultProguardFile("proguard-android-optimize.txt"),
            "proguard-rules.pro"
        )
    }
}
```

The vitals card often shows low **obfuscation percentage** alongside optimization and shrinking:

![Google Play Console Android vitals warning showing obfuscation at 3 percent, below the 25 percent app optimization threshold, with a February 2027 fix date](/blog-images/google-play-obfuscation-android-vitals.webp)

Policy and measurement detail: [Play Console technical quality requirements](https://support.google.com/googleplay/android-developer/answer/17492799), [DEX code optimization](https://developer.android.com/topic/performance/vitals/code-optimization), and [enable app optimization with R8](https://developer.android.com/topic/performance/app-optimization/enable-app-optimization).

## What Google Play is measuring

Google Play inspects compiled **Java and Kotlin DEX** inside your App Bundle: Capacitor, plugins, and AndroidX. From **February 2027**, apps with more than **10 MB** of DEX must meet published floors on all three metrics (games use a higher DEX size gate). Play does not publish a separate numeric threshold for every app size; see the official policy link above for enforcement timing and eligibility.

| Metric | What it means | Typical Capacitor cause of a low score |
| --- | --- | --- |
| Obfuscation | Class, field, and method names shortened | `minifyEnabled` is still `false` |
| Optimization | R8 inlines, merges, and rewrites bytecode | Default `proguard-android.txt` includes `-dontoptimize` |
| Shrinking | Unused classes and methods removed | Code shrinking never turned on |

On recent Android Gradle Plugin versions, Play can read `r8.json` inside the bundle. Otherwise it uses `mapping.txt` or DEX heuristics. A release built without R8 often has almost no mapping file, so readable names remain and Play reports a few percent obfuscation.

## Step 1: Turn R8 on for release

The Capacitor template still ships release builds **without** R8:

```groovy
buildTypes {
    release {
        minifyEnabled false
        proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
    }
}
```

That default lives in [android-template/app/build.gradle](https://github.com/ionic-team/capacitor/blob/main/android-template/app/build.gradle). Debug builds should stay unminified. Release builds you upload to Play should not.

Three details matter:

1. `minifyEnabled true` runs R8 (shrink, obfuscate, optimize).
2. `shrinkResources true` removes unused Android resources and requires minification.
3. Use `proguard-android-optimize.txt`. Plain `proguard-android.txt` ships `-dontoptimize`, which blocks optimization. See [Capacitor Plugin AGP 9 Build Error Fix](/blog/fix-capacitor-plugin-build-errors-with-agp-9/) if a plugin still references the old file.

Do not set `minifyEnabled true` on `debug`. Keep local runs fast and stack traces readable.

## Step 2: Do not disable R8 full mode

Open `android/gradle.properties` and remove this line if it exists:

```properties
android.enableR8.fullMode=false
```

AGP 8+ enables full mode by default. That legacy flag caps optimization.

Search `android/app/proguard-rules.pro` for:

```text
-dontobfuscate
-dontoptimize
-dontshrink
-keep class ** { *; }
```

Those rules keep scores low even after you enable R8.

## Cannot use optimization.enable=true without android.r8.gradual.support

On **Android Gradle Plugin 9.0 and later**, Google added an `optimization { }` block with `enable = true` and an experimental **`packageScope`** path to optimize named packages first ([optimize specified packages](https://developer.android.com/topic/performance/app-optimization/optimize-specified-packages)).

If you set `optimization { enable = true }` together with **`packageScope`**, Gradle requires this property in the project **`gradle.properties`** file (not module level):

```properties
android.r8.gradual.support=true
```

`packageScope` also requires **R8 full mode** (remove `android.enableR8.fullMode=false`).

**Capacitor recommendation:** Most Capacitor apps should **not** start with `packageScope`. Use the legacy release block at the top of this post (`minifyEnabled` / `isMinifyEnabled` plus `shrinkResources`). That satisfies Play DEX optimization without the gradual DSL.

If you already adopted `optimization { enable = true }` from an AGP 9.3+ template and hit the Gradle error, either add `android.r8.gradual.support=true` and configure `packageScope` per the Android doc, or revert to `isMinifyEnabled = true` and `isShrinkResources = true` with `proguard-android-optimize.txt`. The `optimization.enable` property itself was added in **AGP 8.13**; full `packageScope` gradual mode is documented for **AGP 9.0+**.

## Step 3: Keep Capacitor plugins, not the whole app

R8 respects reflection metadata. Capacitor discovers plugins by annotation, so they need keep rules. **You usually do not add them yourself.** Since Capacitor 3.2.3, `@capacitor/android` ships [consumer ProGuard rules](https://github.com/ionic-team/capacitor/blob/main/android/capacitor/proguard-rules.pro) for `@CapacitorPlugin`, `@PluginMethod`, and `com.getcapacitor.Plugin`.

Add rules in `android/app/proguard-rules.pro` only for a **reproducible release crash**:

```text
# Good: one misbehaving plugin package
-keep class com.mycompany.myplugin.** { *; }

# Bad: this tanks obfuscation and shrinking
-keep class com.getcapacitor.** { *; }
-keep class ** { *; }
```

Official notes: [Using ProGuard](https://capacitorjs.com/docs/android/troubleshooting#using-proguard).

## Step 4: Build a real release bundle

Play grades what you upload, not a debug APK. From the project root:

```bash
bun run build
bunx cap sync android
cd android
./gradlew bundleRelease
```

For signing without Android Studio, see [Build and Install Release APK Without Android Studio](/blog/android-release-build-without-android-studio/). You can generate or inspect an upload keystore with the [Android keystore generator](/tools/android-keystore-generator/).

Install a **release APK** (`./gradlew assembleRelease`) and exercise native plugins. R8 issues rarely appear in debug `cap run` sessions.

After `bundleRelease`, confirm R8 ran:

- `app/build/outputs/mapping/release/mapping.txt`
- `app/build/outputs/mapping/release/configuration.txt`
- On supported AGP versions, `r8.json` inside the `.aab`

If `mapping.txt` is missing, verify `minifyEnabled true` on **release** and that keep rules do not include `-dontobfuscate`.

## Step 5: Upload mapping and re-check Play

Obfuscated crashes need the mapping file for each version.

1. **Play Console:** **Test and release → App bundle explorer →** your version **→ Downloads → Assets**. Upload `mapping.txt` if it is not already attached (deobfuscation file).
2. **Firebase Crashlytics / Sentry:** upload the same mapping from CI.

Open **App bundle explorer** for DEX size plus obfuscation, optimization, and shrinking percentages. **Monitor and improve → Android vitals** updates after Play analyzes the version you shipped.

## Troubleshooting

### App crashes after enabling R8 (login, plugins, reflection)

Symptoms often surface only on a **release** install (search queries such as **R8 APK login** usually mean auth broke under obfuscation). Steps:

1. Reproduce on `assembleRelease`, not debug.
2. Read the stack trace. With mapping uploaded, Play and crash tools deobfuscate it.
3. Add the **smallest** `-keep` rule for the package that crashed. Remove app-wide keeps.
4. Update plugins that ship no consumer rules. Prefer maintained plugins from the [Capgo plugin directory](/plugins/).

### Broad keep rules still yield a low obfuscation percentage

Use [R8 Configuration Analyzer](https://developer.android.com/topic/performance/app-optimization/r8-configuration-analyzer) on **AGP 9.3+** after `assembleRelease`. On older AGP, use APK Analyzer with `mapping.txt` and Play's bundle explorer. App-level `-keep class com.foo.** { *; }` is a common culprit.

### Play still shows the warning on an old version

Upload a **new** `.aab` built with R8 on. Internal testing is enough to refresh bundle explorer metrics for that artifact. Confirm CI did not deploy an unsigned debug artifact.

## What this does not replace

- **JavaScript minification** in Vite does not change DEX scores.
- **[Capgo live updates](/live-update/)** refresh the web layer only. DEX optimization needs a native store upload once R8 is enabled in the binary.
- **16 KB page size** is a separate requirement. See [Android 16 KB page size](/blog/android-16kb-page-size-capacitor-plugins/).

For CI, ensure workflows run `bundleRelease` or `assembleRelease`, not debug. See [Automatic Capacitor Android build with GitHub Actions](/blog/automatic-capacitor-android-build-github-action/).

## Frequently asked questions

<a id="what-does-dex-code-optimization-below-threshold-mean"></a>
### What does DEX code optimization is below our threshold mean?

Play measured your uploaded **DEX** and found shrinking, optimization, or obfuscation below the policy floor described in [Google Play technical quality requirements](https://support.google.com/googleplay/android-developer/answer/17492799). Capacitor apps often ship with R8 disabled on release, so all three scores stay in single digits until you enable minify with optimize defaults.

<a id="what-is-obfuscation-percentage-on-google-play"></a>
### What is obfuscation percentage on Google Play?

It is the share of app DEX code that R8 (or another shrinker) renamed. **Optimization percentage** and **shrinking percentage** are separate lines in App bundle explorer. None of the three is a substitute for the others.

<a id="how-do-i-fix-dex-code-optimisation-below-threshold"></a>
### How do I fix DEX code optimisation below threshold in Capacitor?

Enable R8 on the **release** build type, use `proguard-android-optimize.txt`, run `./gradlew bundleRelease`, upload `mapping.txt`, and publish the new AAB. British spelling **optimisation** and American **optimization** refer to the same Play metric.

<a id="optimization-enable-without-android-r8-gradual-support"></a>
### Why does Gradle require android.r8.gradual.support?

When `optimization.enable=true` is used with **`packageScope`** (AGP 9.0+ gradual path), Android Gradle Plugin expects `android.r8.gradual.support=true` in **`gradle.properties`**. Capacitor teams can avoid that path by using `isMinifyEnabled` / `minifyEnabled` instead of the new DSL.

<a id="capacitor-crashes-after-r8"></a>
### Why does my Capacitor app crash after I enable R8?

Reflection-heavy plugins without keep rules are the usual cause. Test release, tighten keeps, update the plugin. Do not disable R8 to pass Play; fix rules instead.

<a id="verify-obfuscation-percentage-improved"></a>
### How do I verify obfuscation percentage improved?

Compare **App bundle explorer** before and after your optimized upload. Locally, confirm `mapping.txt` is non-empty and matches the version code you shipped.

## Checklist

- [ ] `release { minifyEnabled true; shrinkResources true }`
- [ ] `proguard-android-optimize.txt` (not `proguard-android.txt`)
- [ ] No `-dontobfuscate` / `-dontoptimize` / app-wide `-keep class **`
- [ ] Capacitor 3.2.3+ so plugin consumer rules apply
- [ ] Release build produces `mapping.txt`
- [ ] Native plugins tested on a release install
- [ ] New `.aab` uploaded; mapping attached in App bundle explorer
- [ ] Obfuscation, optimization, and shrinking each meet Play floors for your DEX size

## Keep going from Fix DEX Code Optimization Below Threshold (Capacitor)

If you are using **Fix DEX Code Optimization Below Threshold (Capacitor)** to plan Android store releases, connect it with [Capgo Native Builds](/native-build/) for release App Bundles, [Capgo CI/CD](/ci_cd/) for the upload pipeline, [CI/CD Integration](/docs/getting-started/cicd-integration/) for implementation detail, [Automatic Capacitor Android build with GitHub actions](/blog/automatic-capacitor-android-build-github-action/) for self-hosted pipelines, and [Capgo Consulting](/consulting/) if a plugin breaks after R8 is enabled.