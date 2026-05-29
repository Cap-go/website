---
slug: do-google-allow-live-updates
title: Does Google Allow Live Updates Without Store Review?
description: >-
  How can you push code updates to production Android apps and be fully
  compliant with Google’s guidelines? 
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-01-13T00:00:00.000Z
updated_at: 2026-05-29T11:34:25.000Z
head_image: /playstore.webp
head_image_alt: Capacitor bypass illustration
keywords: Google, live updates, OTA updates, continuous integration, mobile app updates
tag: Tutorial
published: true
locale: en
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---

Google Play is less restrictive than Apple when it comes to updating apps.

Updating your apps distributed via Google Play can be a tricky task, but it is important to follow Google's guidelines to remain compliant. According to Google Play's guidelines, apps must not modify, replace or update themselves using any method apart from Google Play's own update mechanism. This means that downloading executable code, such as dex, JAR, or .so files, from a source apart from Google Play is not permitted.

However, this restriction does not apply to code that runs in a virtual machine or an interpreter that provides indirect access to Android APIs, such as JavaScript in a webview or browser. This means that you can use interpreted languages, such as JavaScript, Python, Lua, etc., to update your app without going through Google Play's review process. One tool that can help with this process is the Capgo Capacitor plugin. This plugin allows developers to update their HTML, CSS, and JavaScript code and send updates to their apps without the need for review.

Additionally, apps or third-party code that utilize interpreted languages, such as JavaScript, Python, Lua, etc., which are loaded at runtime, must not allow potential violations of Google Play's policies. It is important to note that this interpreted code should not packaged with the app.

By following these guidelines and using tools like the Capgo Capacitor plugin, you can ensure that your app updates are compliant with Google Play's policies, and that your app remains available to users on the platform. Keep in mind that it's always a good idea to double-check the latest version of Google's policies to make sure you're following them correctly.

For more information on how to install Capgo to bypass review, please refer to my next article.

## Keep going from Does Google Allow Live Updates Without Store Review?

If you are using **Does Google Allow Live Updates Without Store Review?** to plan store approval and distribution, connect it with [@capgo/capacitor-in-app-review](/docs/plugins/in-app-review/) for the implementation detail in @capgo/capacitor-in-app-review, [Using @capgo/capacitor-in-app-review](/plugins/capacitor-in-app-review/) for the native capability in Using @capgo/capacitor-in-app-review, [@capgo/capacitor-native-market](/docs/plugins/native-market/) for the implementation detail in @capgo/capacitor-native-market, [Using @capgo/capacitor-native-market](/plugins/capacitor-native-market/) for the native capability in Using @capgo/capacitor-native-market, and [Capacitor OTA Updates: App Store Approval Guide](/blog/capacitor-ota-updates-app-store-approval-guide/) for the practical context in Capacitor OTA Updates: App Store Approval Guide.
