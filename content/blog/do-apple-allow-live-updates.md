---
slug: "do-apple-allow-live-updates"
title: Do apple allow to send live update to Apps without the App Store review.
description: 'How can you push code updates to production iOS apps and be fully compliant with Apple’s guidelines? '
author: Martin Donadieu
author_url: https://twitter.com/martindonadieu
created_at: 2022-01-13
updated_at: 2022-01-13
head_image: "/apple_appstore.webp"
head_image_alt: Capacitor bypass illustration
tag: Tutorial
published: true
next_blog: "update-your-capacitor-apps-seamlessly-using-capacitor-updater"

---

Updating Capacitor JS apps without going through the App Store review process is possible under certain conditions outlined in Apple's official guidelines. However, it is important to note that this is not legal advice. In order for code updates to be pushed directly to an app and remain compliant with Apple's guidelines, the following conditions must be met:

- The code must be run by Apple's built-in WebKit framework
- The code must not provide, unlock or enable additional features or functionality
- The user must not be aware that an update is occurring

The Capgo Capacitor plugin allows for updates and modifications to be made to HTML, CSS, and JavaScript, satisfying the first condition. 
The ability for apps to update themselves without going through the App Store review process has been available for some time for apps created using JavaScript frameworks such as Facebook's React Native and services like Expo.

The second condition, not providing additional features or functionality, is determined by the developer. Capgo is intended for making small tweaks or fixes, rather than introducing new features or functionality. For significant changes, it is necessary to release updates through the App Store. It is worth noting that many other developers use live updates without any issues or rejection from Apple.

Google Play is less restrictive than Apple when it comes to updating apps. Google Play allows for apps installed from their store with JavaScript bundles to be updated by non-Google services. 

For more information on how to install Capgo to bypass review, please refer to my next article.