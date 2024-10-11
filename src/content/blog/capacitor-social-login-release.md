---
slug: Release-of-a-brand-new-capacitor-social-login
title: Release of a brand new Capacitor Social Login plugin
author: WcaleNieWolny
author_url: 'https://github.com/WcaleNieWolny/WcaleNieWolny'
created_at: 2024-10-08T00:00:00.000Z
updated_at: 2024-10-08T00:00:00.000Z
head_image: /social_login_plugin_blog.webp
head_image_alt: Capgo organization system illusatration
tag: Capacitor
published: true
next_blog: ''
locale: en
---

# Introduction

Hey, I am Michael ([WcaleNieWolny](https://github.com/WcaleNieWolny)) 👋,

After a month of hard (and a bit painful 🙃) work, I am pleased to announce the first release of the Capacitor Social Login. This plugin is designed to assist in handling both Google and Apple Login on iOS and Android. Furthermore, together with Martin, we have been working on some unique features that include:

 - The introduction of Login with Apple on Android 
 - The adoption of the new Google Credentials API
 - The addition of detailed documentation

# Login with Apple on Android

First, let’s discuss the major innovation of ‘Login with Apple’ on Android. This was non-trivial, as Apple’s SDK doesn’t provide this functionality. I used [this article](https://johncodeos.com/how-to-add-sign-in-with-apple-button-to-your-android-app-using-kotlin/) as my reference point, but I changed it a little in order to make it more secure. The flow I ended up looks like this:

<figure><img style="margin-left: auto;margin-right: auto;max-height: 600px !important;" src="/apple-login-flow-chart.svg" alt="Apple Login flow chart" /><figcaption></figcaption></figure> 

Unfortunately, it requires a backend and some modifications to your’s app code, but it’s the best I could do.

# Refreshed Google Login on Android

Next, I attempted to implement Google Login on Android. As it turns out, [CodetrixStudio’s CapacitorGoogleAuth](https://github.com/CodetrixStudio/CapacitorGoogleAuth) uses a [soon-to-be deprecated GMS library](https://developer.android.com/identity/sign-in/legacy-gsi-migration#authorization). As a result of this GMS library being considered legacy, I decided to use the [CredentialManager](https://developer.android.com/identity/sign-in/credential-manager-siwg). This helped simply the login flow and it removed the annoying [error 10](https://github.com/CodetrixStudio/CapacitorGoogleAuth/issues/332) 🎉

# Documentation

Lastly, I wrote some amazing ✨ documentation. I spent a lot of time making sure that the docs were accurate and extensive.
The docs include a detailed guide on setting both Apple and Google. I also provided an [example backend](https://github.com/WcaleNieWolny/capgo-social-login-backend-demo) for Login with Apple 🍎

Feel free to check out the [Apple](https://github.com/Cap-go/capacitor-social-login/blob/main/docs/setup_apple.md) and [Google](https://github.com/Cap-go/capacitor-social-login/blob/main/docs/setup_google.md) guides!

# Conclusion

In conclusion, the Capacitor Social Login plugin introduces a lot of new and exciting features with more to come in the future 🚀
