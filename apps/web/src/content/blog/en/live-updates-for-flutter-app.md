---
slug: live-updates-for-flutter-app
title: Flutter live update
description: >-
  Do it possible to send live update to Flutter Apps without the App Store
  review ?
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-12-16T00:00:00.000Z
updated_at: 2026-05-29T11:34:25.000Z
head_image: /blog-images/policy-safe-live-updates.webp
head_image_alt: Policy-safe live updates inside the approved native app shell
keywords: Flutter, mobile app development, live updates, OTA updates, continuous integration, mobile app updates
tag: Tutorial
published: true
locale: en
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---

Capgo Live Update is a service that allows developers to deploy updates to their mobile apps without going through the traditional App Store submission process. This can be a convenient way to quickly fix bugs or make small updates to an app without waiting for the App Store review process. However, Capgo Live Update does not support updating Flutter apps because Flutter apps are compiled to native code.

Flutter is a mobile app development framework that uses the Dart programming language. One of the key features of Flutter is that it allows developers to create apps that can run on both iOS and Android using a single codebase. To achieve this, Flutter compiles the app's code into native code for each platform. This means that the app is essentially a native app, rather than a web-based app or a hybrid app.

Because Flutter apps are compiled to native code, it is not possible to use Capgo Live Update to deploy updates to a Flutter app. Instead, developers must submit updates to the app stores as they would with any other native app.

Additionally, making updates to native code is generally against the rules for app stores. Both the Apple App Store and the Google Play Store have policies in place that prohibit developers from introducing changes to an app's native code after it has been submitted for review. This is because introducing changes to native code can potentially introduce security vulnerabilities or other issues that could compromise the app's performance.

In summary, while Capgo Live Update is a useful tool for quickly deploying updates to certain types of mobile apps, it cannot be used to update Flutter apps.

It's due to the nature of Flutter's compilation process and the rules of the app stores.

## Keep going from Flutter live update

If you are using **Flutter live update** to plan store approval and distribution, connect it with [@capgo/capacitor-in-app-review](/docs/plugins/in-app-review/) for the implementation detail in @capgo/capacitor-in-app-review, [Using @capgo/capacitor-in-app-review](/plugins/capacitor-in-app-review/) for the native capability in Using @capgo/capacitor-in-app-review, [@capgo/capacitor-native-market](/docs/plugins/native-market/) for the implementation detail in @capgo/capacitor-native-market, [Using @capgo/capacitor-native-market](/plugins/capacitor-native-market/) for the native capability in Using @capgo/capacitor-native-market, and [Capacitor OTA Updates: App Store Approval Guide](/blog/capacitor-ota-updates-app-store-approval-guide/) for the practical context in Capacitor OTA Updates: App Store Approval Guide.
