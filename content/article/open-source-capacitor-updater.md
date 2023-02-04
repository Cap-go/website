---
slug: "open-source-capacitor-updater"
title: "Capgo: open-source Ionic AppFlow alternative"
description: Capgo is an open-source, simple and lightweight Ionic AppFlow alternative. One aspect that makes Capgo different the other tooling such as AppFlow is the fact that Capgo is fully open-source software and focus on Capacitor Js. Let’s take a look at what that means exactly.
author: Martin Donadieu
author_url: https://twitter.com/martindonadieu
created_at: 2022-04-08
updated_at: 2022-04-08
head_image: "/appflow_alt.webp"
head_image_alt: Ionic AppFlow alternative illustration
tag: Alternatives
published: false
next_blog: ""

---
Capgo is an open-source, simple and lightweight Ionic AppFlow alternative. One aspect that makes Capgo different from the other tooling such as AppFlow is the fact that Capgo is fully open-source software and focus on Capacitor. Let’s take a look at what that means exactly.

![Capgo: open-source Ionic AppFlow alternative](https://capgo.app/blog/uploads/google-analytics-alternatives.webp "Capgo: open-source AppFlow alternative")

1. [What is Auto-update system?](https://capgo.app/blog/open-source-capacitor-updater#what-is-auto-update-system)
2. [What is an open-source Auto-update system?](https://capgo.app/blog/open-source-capacitor-updater#what-is-open-source-auto-update-system)
3. [What license is Capgo released under?](https://capgo.app/blog/open-source-capacitor-updater#what-license-is-capgo-released-under)
4. [Can Capgo be self-hosted?](https://capgo.app/blog/open-source-capacitor-updater#can-capgo-be-self-hosted)
5. [Capgo is open in other ways too](https://capgo.app/blog/open-source-capacitor-updater#capgo-is-open-in-other-ways-too)
 1. [Open to community feedback with a public roadmap](https://capgo.app/blog/open-source-capacitor-updater#open-to-community-feedback-with-a-public-roadmap)
6. [Is AppFlow open-source too?](https://capgo.app/blog/open-source-capacitor-updater#is-AppFlow-open-source-too)
7. [What are the other ways that Capgo is different from AppFlow?](https://capgo.app/blog/open-source-capacitor-updater#what-are-the-other-ways-that-capgo-is-different-from-AppFlow)
8. [AppFlow is expensive, so why is Capgo cheap?](https://capgo.app/blog/open-source-capacitor-updater#AppFlow-is-expensive-so-why-is-capgo-cheap)
9. [How to switch from AppFlow to an open-source alternative](https://capgo.app/blog/open-source-capacitor-updater#how-to-switch-from-google-analytics-to-an-open-source-analytics-alternative)

## What is Auto-update system?

Auto-update system is the process of sending update to user directly while they use the app, that bypass the native update process. With Capgo activated in your app, you get access to a simple process to fix and update Capacitor app.

In addition, you get a simple dashboard with metrics such as the number of unique devices, the number of updates sends of your app and the breakdown of version used by devices.

All this data you can use to understand the usage of your app and to figure out what you can do to improve your future efforts.

## What is an open-source Auto-update system?

Being open-source means that my [source code](https://github.com/capgo/capacitor-updater/) is available and accessible on GitHub, so anyone can check it out. You can read it, inspect it and review it to understand how it works and to ensure it keeps the data private and secure.

This gives you full transparency on how I handle the update data. It is this transparency and openness that means that open-source products can be more trustworthy than proprietary and closed source products.

You can even download Capgo, install and run it on your server.

## What license is Capgo released under?

Capgo (capacitor-updater) is open-source under the GNU Lesser General Public License Version 3 (LGPLv3) or any later version. You can [find it here](https://github.com/Cap-go/capacitor-updater/blob/main/LICENCE).

The goal of the LGPL license is to maximize user freedom and to encourage companies to contribute to open-source. You can read more about [why I chose the LGPL license for my startup](https://capgo.app/blog/blog/open-source-licenses).

The LGPL allow you to use freely in your app capacitor-updater without any modifications of it.

The Capgo app is in AGPLv3, the app have more restricted license since it's not meant to be included in any other app.

## Can Capgo be self-hosted?

Yes, you can self-host Capgo. Capgo Self-Hosted is my free as in beer and free as in speech version. It’s the same product as my Capgo solution, only the self-hosted version you have to install, host and manage yourself.

It's fully open-source and all the code is available on GitHub. Take a look at the full details of my [self-hosted Auto-update system](https://capgo.app/blog/self-hosted-capgo) solution and read here the [installation instructions](https://docs.capgo.app/plugin/auto-update/self-hosted){:target="_blank"}.

## Capgo is open in other ways too

I welcome feedback from my community. I have a [public roadmap](https://github.com/orgs/Cap-go/projects/1) driven by the features suggested by the community members, I am available to you via email or GitHub if you have any questions or need any help.


## Is AppFlow open-source too?

No, AppFlow is not open-source. AppFlow is a closed source, proprietary product. There’s simply no way of knowing what’s going on behind the scenes when you’re using the AppFlow system in your app. You have to put your trust in Ionic.

## What are the other ways that Capgo is different from AppFlow?

Other than Capgo being open-source while AppFlow being closed source, there are many other ways that these two products differ:

1. Capgo is more simple to use as it take care only of capacitor app and web build. Tracks a smaller number of metrics and presents them on an easier to understand dashboard. Rather than tracking every metric imaginable, many of them that you will never find a use for, [Capgo focuses on the most essential stats](https://capgo.app/blog/simple-app-analytics) only.
2. [Capgo is lightweight](https://capgo.app/blog/lightweight-web-analytics). My script is a small script that is lighter and faster to load, so you will reduce the weight of your app compared to when using AppFlow. My script is using the modern architecture of capacitor and take full advantage of it.
3. Capgo doesn’t track nor collect any personal data. This means that I am [compliant with privacy regulations](https://capgo.app/blog/data-policy) out of the box. There is no need for you to include consent prompts nor to have a privacy policy because of the Capgo.

For further details on the differences between the two, take a look at my [Capgo vs AppFlow comparison](https://capgo.app/blog/alternative-to-AppFlow).

## AppFlow is expensive, so why is Capgo cheap?

Capgo is an independently owned and actively developed project. To keep the project development going, to stay in business, to continue putting effort into building a better product and to cover my costs, I need to charge a lower fee.

AppFlow is expensive because Ionic has built their company around it, and they build system also include the native part who necessity a lot of compute power.

Capgo has no part in that business model. Nothing is being built in my side. With Capgo, you 100% own and control all of your CI/CD. I just store and manage the version for you.

I choose this business model than CI/CD one. If you want free solution, you can self-host Capgo on your server.

## How to switch from AppFlow to an open-source updater

[Sign up for a 15-day unlimited-use free trial](https://web.capgo.app/blog/register/) with no obligations and explore my open-source app update system. You don’t even need to build a new native app with Capgo, you can use my test app until you’ve tested Capgo and figured out if you like my product.

Capgo is simple to set up and integrate into your app, regardless of which Framework you use or how you’ve built your app. You simply insert my one-line JavaScript snippet into the `main` section of the app, and I take care of the rest.