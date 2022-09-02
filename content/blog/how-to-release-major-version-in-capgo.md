---
slug: "how-to-release-major-version-in-capgo"
title: How to release major version in capgo
description: Understand how and when it's necessary to release major version
author: Martin Donadieu
author_url: https://twitter.com/martindonadieu
created_at: 2022-08-30
updated_at: 2022-08-30
head_image: "/capgo-feature-image.webp"
head_image_alt: Capgo major version system
tag: Tutorial
published: true
next_blog: "how-to-send-specific-version-to-users"

---

## When releasing a major version

Versionning can be difficult to manage, ussually you want to send a Major update when a major change appear for the users.

But versionning is not made for that, the store version (the one use in the app store) is different from the Native version.

Native version is made to manage breaking change in the *code*

In IOS for exemple ios 16 is the `store version` of Apple, but the code version is `20A5283p` (they don't seems to use semver there)

Now it's clear we don't mix them and use them for hat they are made !

## Major release

In your app a major release is necessary when a breaking change happen, for exemple a new IOS target (15 to 16), or a new version of capacitorn (3 to 4), or a plugin (1.2 to 2.0) you use have been updated to a major version.

This change mean all tooling have to be aligned to handle the breaking change.

That why Capgo follow this system.
So if you release a major version, Capgo will not send it to user who don't have it installed from the store.

### Versions

Where capgo find the version to compare

#### IOS
  > Will be use by capgo to compare to JavaScript version and find Major upgrade

  in IOS the var is set on your project here `ios/App/App.xcodeproj/project.pbxproj` under the key `CURRENT_PROJECT_VERSION`

#### Android
  > Will be use by capgo to compare to JavaScript version and find Major upgrade

  in Android the var is set on your project here `android/app/build.gradle` under the key `defaultConfig.versionName`

#### Javascript
  > Will be use by capgo to compare to Native version and find Major upgrade

  in Javascript the var is set on your project here `package.json` under the key `version`
## Exemple

Your app is currently released with the version `1.2.3` with Capacitor 3

You are doing the upgrade to capacitor 4.

You need to upgrade your version number to `2.2.3` then all your package include capgo with notice this big change.

So when you will release this version to Capgo and the appstore.

All next live update in Capgo `2.2.4` will never be send to user with `1.2.3` version. Only with `2.2.3` version.

If you follow this pattern no need to worry more, all is well handle.


## If i don't follow this

In this case that mean you have to send your new app with Capacitor 4 to Apple and google but don't to Capgo.

Then you have to wait 100% of your users, have the app or at least 90%, it will take months probably.

While during this time you cannot send any update with Capgo, since old user cannot get new version. and you don't have a way to select only some users to receive the update.

