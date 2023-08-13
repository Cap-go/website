---
slug: "how-to-release-major-version-in-capgo"
title: How to release major version in capgo
description: Understand how and when it's necessary to release major version for your app without breaking your user app
author: Martin Donadieu
author_url: https://x.com/martindonadieu
created_at: 2022-08-30
updated_at: 2023-06-29
head_image: "/capgo-feature-image.webp"
head_image_alt: Capgo major version system
tag: Tutorial
published: true
next_blog: "how-to-send-specific-version-to-users"

---

## When releasing a major version

Versioning can be difficult to manage, usually you want to send a Major update when a major change appears for the users.

But versioning is not made for that, the app store version is different from the Native version.

Native version is made to manage breaking change in the *code*

In IOS, for example, iOS 16 is the `store version` of Apple, but the code version is `20A5283p` (they don't seem to use SemVer there)

Now it's clear we don't mix them and use them for what they are made!

## Major release

In your Capacitor app, a major release is necessary when a breaking change happens. 
For example, a new IOS target (15 to 16), or a new version of Capacitor (3 to 4), or a plugin (1.2 to 2.0) you use have been updated to a major version.

This change means all tooling has to be aligned to handle the breaking change.

That why Capgo follows this system.
So if you release a major version, Capgo will not send it to a user who doesn't have it installed from the store.

### Versions

Where Capgo find the version to compare

#### IOS
  > Will be used by Capgo to compare to JavaScript version and find Major upgrade

  in IOS the var is set on your project here `ios/App/App.xcodeproj/project.pbxproj` under the key `CURRENT_PROJECT_VERSION`

#### Android
  > Will be uses by Capgo to compare to JavaScript version and find Major upgrade

  in Android, the var is set on your project here `android/app/build.gradle` under the key `defaultConfig.versionName`

#### JavaScript
  > Will be used by Capgo to compare to Native version and find Major upgrade

  in JavaScript, the var is set on your project here `package.json` under the key `version`
## Example

Your Ionic app is currently released with the version `1.2.3` with Capacitor 3

You are doing the upgrade to capacitor 4.

You need to upgrade your version number to `2.2.3`, then all your packages include Capgo with notice this big change.

When you release this version to Capgo and the App Store.

All next live update in Capgo `2.2.4` will never be sent to user with `1.2.3` version. Only with `2.2.3` version.

If you follow this pattern, no need to worry more, all is well handled.


## If I don't follow this

In this case, that means you have to send your new app with Capacitor 4 to Apple and Google, but don't to Capgo.

Then you have to wait 100% of your users, have the app or at least 90%, it will take months, probably.

While during this time you cannot send any update with Capgo, since old user cannot get the new version.
You don't have a way to select only some users to receive the update.

