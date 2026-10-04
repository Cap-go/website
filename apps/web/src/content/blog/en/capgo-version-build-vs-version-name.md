---
slug: capgo-version-build-vs-version-name
title: 'Capgo version_build vs version_name: Setup Steps'
description: 'Learn how Capgo version_build vs version_name works, where each value comes from, and how to check OTA eligibility before releasing a bundle.'
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2026-09-06T09:18:06.000Z
updated_at: 2026-09-06T09:18:06.000Z
head_image: /capgo_banner.png
head_image_alt: Diagram of a Capacitor native app baseline and downloaded Capgo bundle.
keywords: ''
tag: 'Mobile, Updates, Tutorial'
published: true
locale: en
next_blog: ''
---
[Capgo](<https://capgo.app>)’s version names can feel backward at first: `version_build` is the native app baseline, while `version_name` tracks the bundle on the device. Get the distinction right and you can check why a device will, or won’t, receive an OTA update before you roll it out.

We analyzed the troubleshooting pages of 5 live-update platforms, including our own, and found our documentation lists 7 named version_build mismatch codes, versus 5, 2, 2, and 0 for the other four. More named codes means less guessing when a version_build mismatch shows up.

### Table of Contents

  * Step 1: Locate version_build and version_name in Capgo
  * Step 2: Identify the native baseline and the downloaded bundle
  * Step 3: Check where your native app version comes from
  * Step 4: Set and verify the bundle version Capgo receives
  * Step 5: Test channel eligibility before rolling out an update
  * Step 6: Diagnose version mismatches and make releases repeatable
  * FAQ
  * Conclusion



## Step 1: Locate version_build and version_name in Capgo

Start by treating these as two different facts about one app install. `version_build` tells Capgo which native app version is on the device. `version_name` tells Capgo which JavaScript bundle the device has downloaded. They can hold different values, and that’s often expected.

In Capgo’s version model, the native version is the reference point for update eligibility. Capgo compares the bundle assigned to a channel with that native baseline. The device’s installed bundle version helps identify its current web code, but it does not replace the native baseline in the channel’s version rules.

Look the device up on the Devices page of the Capgo console and record both values before troubleshooting. Then compare them with the channel’s target bundle. The [Capgo channel rules](<https://capgo.app/docs/live-updates/channels/>) explain how a channel’s target version is checked against `version_build`.

Value| What it represents| Use it to answer| Typical source  
---|---|---|---  
`version_build`| Native app baseline sent to Capgo| Can this native app receive the channel’s target bundle?| Native app version, or an explicit Capacitor configuration value  
`version_name`| Current downloaded JavaScript bundle| Which bundle version is installed now?| Bundle version resolved during upload  
Channel target| Bundle assigned to the device’s channel| What version is Capgo checking for an update?| Current channel assignment  
  
Keep the three values in separate columns in a release note or test report. If the team writes one generic “app version,” it’s easy to compare the wrong pair. For eligibility, compare the target bundle with `version_build`. For installed web code, check `version_name`.

Capgo’s naming can seem unlike Android conventions, where teams often use “build” to mean an incrementing build number. Here, read the field by its Capgo role, not by what the name suggests. That small habit prevents a lot of release-room confusion.

## Step 2: Identify the native baseline and the downloaded bundle

Before changing a version value, identify which code is native and which code is delivered as a bundle. The native app is the installed iOS or Android binary. The bundle contains the web assets that a Capacitor app can receive through an OTA update.

Imagine a native app shipped with baseline `1.2.3`. A later web fix is uploaded as bundle `1.2.4`. Capgo checks whether the channel’s target bundle is allowed for native baseline `1.2.3`. If it is eligible, the device may download that bundle. After installation, `version_name` reflects the bundle now on the device. The native baseline remains tied to the installed binary.

That difference matters when a user has an older app-store build but a newer web bundle. The bundle can change without replacing the native binary, but an OTA update cannot add native code that wasn’t included in the app. If a change needs a new plugin or native setting, plan a native build rather than treating a bundle upload as a substitute.

![Diagram of a Capacitor native app baseline and downloaded Capgo bundle.](https://rebelgrowth.s3.us-east-1.amazonaws.com/blog-images/batch_109512_0_e3095b249bbe.webp)

Use this quick check when values look out of sync:

  * Confirm which native binary is installed on the test device.
  * Find the version value Capgo receives as the native baseline.
  * Check the bundle version assigned to the device’s channel.
  * Record the installed bundle version separately from both.



Don’t infer the native baseline from `package.json` unless your build process deliberately copies that value into the native version or Capgo configuration. A JavaScript project version and a store-installed app version can drift. The right source is the one your app actually sends to Capgo.

Once you can name the baseline and the current bundle, the next task is tracing each value back to its source file. That’s where platform differences tend to show up.

## Step 3: Check where your native app version comes from

For a reliable `version_build`, find the native version that your Capacitor app reports. Capgo’s version documentation describes different source keys for iOS and Android, then uses the resulting native value as the OTA comparison baseline.

### On iOS

Check `CFBundleShortVersionString` in the app’s `Info.plist`. In most Xcode projects that key is set to `$(MARKETING_VERSION)`, so the value you actually edit is the target’s Marketing Version. Verify the value in the built app, not only in a template or a file your build may overwrite.

When a team updates the Xcode project but not the value that reaches the app, a local project view can look correct while the installed binary reports something else. Compare the version in the generated native app with the value your release process expects.

### On Android

Check `defaultConfig.versionName` in the Android app’s Gradle configuration. That native version name is used in Capgo’s OTA comparison. Don’t confuse it with an Android build code or an unrelated JavaScript package version. For this check, the important question is what version name the native app sends.

A shared version policy can help both platforms stay aligned, but don’t assume they already share one source. iOS and Android may have separate files, build steps, or release timing. Compare their final values during the release check, especially if one platform has a different store rollout schedule.

Some apps explicitly set the native version in `capacitor.config.ts` through the updater configuration’s version value. The [Capgo Semver Tester](<https://capgo.app/semver_tester/>) describes this native baseline as a value that can come from configuration or native app metadata. If your app overrides the native metadata, document that choice so no one expects the store version to be the source.

For each platform, write down the source file, the resolved value, and the build that contains it. This makes a mismatch easier to trace after a release, when the repository may already contain a newer version than the app installed on a tester’s device.

Only change the source that your build actually reads. Editing a stale file can make a code review look complete while leaving the packaged native version unchanged.

## Step 4: Set and verify the bundle version Capgo receives

The bundle version describes the JavaScript update, not the installed native binary. Capgo can take that version from the `version` field in `package.json` when you don’t supply an explicit bundle version. The CLI’s `--bundle` option can set the version sent during upload.

Pick one path and make it clear in your release process. If `package.json` is the source, bump that field before uploading. If CI passes a bundle version through the CLI, make the job print the resolved version in its release log. A silent mix of both paths makes it harder to tell why the channel received a particular value.

Use semantic versioning in the familiar `major.minor.patch` shape, such as `1.2.3`. Capgo channel strategies use the parts of that version to decide whether a target bundle fits a native baseline. A pre-release suffix such as `-beta.1` can help label channel-specific builds, but keep the version parseable and consistent across your release tools.

Think through the increment before publishing:

  * Use a patch change for a compatible web fix within the same release line.
  * Use a minor change when the change belongs to a new compatible feature line.
  * Use a major change when the compatibility boundary changes and older native code may not support the bundle.



Those labels are a team convention, not a way to add native capability through OTA. A version number cannot prove that a bundle is safe for a native app. Keep actual compatibility decisions tied to the code and dependencies in the binary.

Before upload, compare the package version or CLI value with the version shown for the bundle after upload. Also inspect the channel that will serve it. Uploading a correctly named bundle to an unintended channel can still lead to the wrong test result.

Invalid or inconsistent strings deserve a stop-and-check, not a guess. Keep a known-good release value, correct the source, and test the resolved version before promoting it.

The [Capgo CLI command reference](<https://capgo.app/docs/cli/commands/>) is useful when you wire the upload into a script, because the bundle version is part of the release command’s inputs.

## Step 5: Test channel eligibility before rolling out an update

Channel eligibility is a comparison, not a guess based on which bundle looks newer. Capgo checks the channel’s target bundle against the native baseline sent as `version_build`. The current downloaded bundle, reported as `version_name`, is not the baseline for those channel rules.

For example, say an installed native app reports `1.2.3`, while its current bundle is `1.2.4`. If a channel points to `1.2.5`, evaluate the target against the native baseline `1.2.3`, not just against the current bundle `1.2.4`. Which targets are permitted depends on the channel’s update strategy.

Capgo documents strategies such as major and minor that constrain updates against the native baseline. With a major strategy, a target with a higher major version can be blocked. With a minor strategy, a target that changes the baseline’s major or minor line can be blocked. Check the configured strategy rather than assuming every newer-looking bundle will be accepted.

![Developer testing Capgo channel eligibility for an OTA bundle against a native app version.](https://rebelgrowth.s3.us-east-1.amazonaws.com/blog-images/batch_109512_1_32028ad71192.webp)

Test the exact combination you plan to release:

  1. Install the native build that represents the users you’re targeting.
  2. Confirm the native baseline sent to Capgo.
  3. Assign the test device to the intended channel.
  4. Check the channel target and its version strategy.
  5. Request an update and confirm the device’s result.



Run the same check on another native baseline if your user base has more than one store version in use. A bundle that works for a fresh build may be blocked for an older binary, and that may be the intended safety rule.

For wider releases, start with a test channel or a limited rollout. Watch for unexpected eligibility results before expanding the audience. Capgo’s channel model lets teams direct bundles through release channels; keep each channel’s target and intended native line clear in your release notes.

If a test device doesn’t update, check its channel assignment and version values before uploading again. Repeatedly publishing the same bundle won’t fix a baseline mismatch.

## Step 6: Diagnose version mismatches and make releases repeatable

When the values don’t match your expectation, trace them in order. First confirm the native app version on the device. Then check whether a configuration override changes the baseline. Next compare the bundle version that Capgo received with the channel target. This sequence separates a bad source value from a channel rule that is working as set.

Common causes include bumping `package.json` while leaving the native version unchanged, building one platform from a different release branch, and testing a device assigned to another channel. Another source of confusion is calling every number a “build version.” Write down which value is native, which is the uploaded bundle, and which is currently installed.

For CI/CD, make the version inputs explicit. Let the pipeline read the intended release version from a controlled source, then pass it to the upload command or update the package field before the upload step. Record the resolved native baseline and bundle target in the job output. Avoid relying on a developer’s local state that the build server cannot see.

Use a release gate that fails when a required version is missing or has a format your team doesn’t accept. Then run a test upload to the right channel before promotion. Capgo supports a CLI-based deployment flow, so teams can put bundle upload into their existing CI/CD job and retain a visible command log.

Don’t confuse these values with the Android WebView engine version. Our `@capgo/capacitor-webview-version-checker` plugin checks whether a device’s WebView engine is outdated and can show a native update prompt. That is a separate question from `version_build` and `version_name`, so it never replaces checking the native baseline and the channel’s target bundle.

When migrating from a legacy scheme, don’t rename every existing value in one pass. Map the old native version to the native baseline first. Then map the uploaded web release to the bundle version. Test representative existing app builds against the channel strategy before directing users to it.

Keep a short release record with the source commit, native version, uploaded bundle version, channel, and test result. If a release needs to be paused or rolled back, that record helps the team identify which bundle went where. It also makes the next deployment repeatable rather than dependent on someone remembering which file was changed.

## FAQ

### What is the difference between version_build and version_name in Capgo?

`version_build` is the native app baseline, while `version_name` is the current downloaded bundle version. Capgo uses the native baseline when it checks a channel’s target bundle for eligibility. Keep the two values separate in logs and release notes so you can tell which native app is installed and which web bundle it has.

### Does version_name control whether an OTA update is allowed?

No, Capgo’s channel version strategies compare the target bundle with `version_build`, the native baseline. `version_name` identifies the current downloaded bundle. If a device doesn’t receive an update, check its baseline, channel target, and configured strategy before changing the current bundle value.

### Where does Capgo get the native version?

On iOS, Capgo reads `CFBundleShortVersionString`, which Xcode usually fills from `MARKETING_VERSION`. On Android, the native version comes from `defaultConfig.versionName`. An explicit updater version in Capacitor configuration can change which value your app sends, so verify the built app.

### Where does Capgo get the bundle version?

Capgo can use the `version` field in `package.json` when you don’t pass an explicit bundle version. You can also provide the version with the CLI’s `--bundle` option. Choose one clear source for your release workflow, then verify the version Capgo received after upload.

## Conclusion

Use `version_build` for the native baseline and `version_name` for the installed bundle. Before your next rollout, verify both values on a test device and compare the channel target with the baseline. That one check can catch a version mismatch before it reaches a wider audience.
