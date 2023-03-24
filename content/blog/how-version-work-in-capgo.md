---
slug: "how-version-work-in-capgo"
title: How version work in Capgo
description: Understand how Capgo manage versions in your Capacitor app, and use it at best. Learn the meaning of major, minor, patch.
author: Martin Donadieu
author_url: https://twitter.com/martindonadieu
created_at: 2022-08-25
updated_at: 2022-08-25
head_image: "/versionning.webp"
head_image_alt: Capgo bundle version system
tag: Tutorial
published: true
next_blog: "how-to-release-major-version-in-capgo"

---

Capgo uses 2 main variables to manage versions in your Capacitor app:
  - Native version
  - JavaScript versions

All versions choices are decided server side by Capgo.

## Versioning system

To manage version Capgo use the SemVer system, read more about it [here](https://semver.org/).
### Versions

Where Capgo find the version to compare

#### IOS

  in IOS the var is set on your project here `ios/App/App.xcodeproj/project.pbxproj` under the key `MARKETING_VERSION`

#### Android

  in Android, the var is set on your project here `android/app/build.gradle` under the key `defaultConfig.versionName`

#### JavaScript

  in JavaScript, the var is set on your project here `package.json` under the key `version`

## Default behavior

This is how Capgo channel will behave if you didn't change any settings.

> This behavior will be based on the unique channel you made default.

### When Fresh installation of your Capacitor app
When user did download your Ionic app for the first time and opens the app it contacts Capgo server.

Currently, 4 outputs can happen:
  - The native bundle version (1.2.3) is lower than Capgo bundle version (1.2.4), Capgo sends his bundle to the user.
  - The native bundle version (1.2.3) is equal to Capgo bundle version (1.2.3), Capgo send “no need to update”.
  - The native bundle version (1.2.4) is higher than Capgo bundle version (1.2.3), Capgo send “no need to update”.
  - The native bundle version (1.2.3) is MAJOR lower than Capgo bundle version (2.2.3), Capgo send “no need to update”.

### Other settings

#### Disable auto-downgrade under native

If you change this setting to false, Capgo will consider is always the trustable source of the version.
Then the behavior become :
- The native version (1.2.4) is higher than Capgo version (1.2.3)

> Capgo sends his version to the user.

#### Disable auto-upgrade above major

If you change this setting to false, Capgo will consider upgrade to MAJOR is not an issue.
Then the behavior becomes:
- The native version (1.2.3) is MAJOR lower than Capgo version (2.2.3)

> Capgo send his version to the user.

## JavaScript bundle version

The JavaScript bundle version is the one you send when doing `npx @capgo/cli@latest upload --channel production`

If you didn't use the option `--bundle 1.2.3`, Capgo will get the bundle version from your `package.json` file (in the version key).

After Your Ionic app has installed one version from Capgo, this is this version who will be compared for:
  - Their JavaScript bundle version (1.2.3) is lower than Capgo bundle version (1.2.4), Capgo send his bundle to the user.

With some guard conditions:
  - If native bundle version is higher than Capgo version, the `Disable auto downgrade under native` condition is applied.
  - If native bundle version is MAJOR lower than Capgo version, the `Disable auto upgrade above major` condition is applied.

## App store update

When you publish your Capacitor JS app on the App Store, what happen is simple.

Your user will get the new version from the store and remove all local update in their app by default.

If you want to change that behavior, you need to set the setting `resetWhenUpdate` read more about it [here](https://docs.capgo.app/plugin/api#settings)

This can only be change on the app side, not from cloud like other settings.

### Other settings

After all this behavior, you can have above that some specific one liked to the deviceID.

In Capgo, you can decide to override the behavior for each deviceID.

Yon can link one deviceID to:
  - a specific bundle version
  - a specific channel

This will bypass all settings done above.

Learn more about it on the article below.