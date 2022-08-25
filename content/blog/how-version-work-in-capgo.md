---
slug: "how-version-work-in-capgo"
title: How version work in Capgo
description: Understand how Capgo manage versions in your app, and use it at best.
author: Martin Donadieu
author_url: https://twitter.com/martindonadieu
created_at: 2022-08-25
updated_at: 2022-08-25
head_image: "/capgo-feature-image.webp"
head_image_alt: Capgo version system
tag: Tutorial
published: true
next_blog: "how-to-send-specific-version-to-users"

---

Capgo use 2 main variable to manage versions in your app:
  - Native version
  - Javescript versions

All versions choices are decide server side by Capgo.

## Versionning system

To manage version Capgo use the Semver system read more about it [here](https://semver.org/).
## Native versions

Where capgo find the Native version ?

### IOS
  in IOS the var is set on your project here `ios/App/App.xcodeproj/project.pbxproj` under the key `CURRENT_PROJECT_VERSION`

### Android
  in Android the var is set on your project here `android/app/build.gradle` under the key `defaultConfig.versionName`

## Default behavior

This is how capgo channel will behave if you didn't change any settings.

> This behavior will be base on the unique channel you made public.

### When Fresh install of your app
When user did download your app for the first time and open the app it contact capgo server.

At this moment 4 output can happen:
  - They native version (1.2.3) is lower than Capgo version (1.2.4), Capgo send his version to the user.
  - They native version (1.2.3) is equal to Capgo version (1.2.3), Capgo send "no need to update".
  - They native version (1.2.4) is higher than Capgo version (1.2.3), Capgo send "no need to update".
  - They native version (1.2.3) is MAJOR lower than Capgo version (2.2.3), Capgo send "no need to update".

### Other settings

#### Disable auto downgrade under native

If you change this setting to false, Capgo will consider is is always the trustable source of the version.
So at this moment if :
- They native version (1.2.4) is higher than Capgo version (1.2.3)

Capgo send his version to the user.

#### Disable auto upgrade above major

If you change this setting to false, Capgo will consider upgrade to MAJOR is not an issue.
So at this moment if :
- They native version (1.2.3) is MAJOR lower than Capgo version (2.2.3)

Capgo send his version to the user.

## Javescript version

Native version is the one you send when doing `npx @capgo/cli@latest upload --channel production`

If you didn't use the option `--version 1.2.3` Capgo will get the version from your `package.json` file.

After Your app has install one version from Capgo, this is this version who will be compare for:
  - They Javescript version (1.2.3) is lower than Capgo version (1.2.4), Capgo send his version to the user.

With some guard conditions:
  - if native version is higher than Capgo version, the `Disable auto downgrade under native` condition is apply.
  - if native version is MAJOR lower than Capgo version, the `Disable auto upgrade above major` condition is apply.

## App store update

When you publish your app on the App Store, what happen is simple.

Your user will get the new version from the store and remove all local update in they app by default.

If you want to change that behavior you need to set the setting `resetWhenUpdate` read more about it [here](https://docs.capgo.app/plugin/auto-update/cloud#advanced-settings)

This can only be change on the app side not from cloud like other settings.

### Other settings

After all this behavior you can have above that some specific one liked to the deviceID.

In Capgo you can decide to override the behavior for each deviceID.

Yon can link one deviceID to:
  - a specific version
  - a specific channel

This will bypass all settings done above.

LEarn more about it on the article below.

