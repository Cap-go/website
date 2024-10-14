---
slug: self-hosted-capgo
title: Self hosted Capgo
description: >-
  Self-hosting Capgo allows you to deploy Capacitor live updates to your users
  without having to use the Capgo cloud service.
author: Anik Dhabal Babu
author_url: 'https://x.com/anikdhabal'
created_at: 2023-09-20T00:00:00.000Z
updated_at: 2023-09-20T00:00:00.000Z
head_image: /self-hosted-capgo.webp
head_image_alt: self-hosted capgo
tag: Solution
published: true
locale: en
next_blog: ''
---

This article provides a step-by-step guide on how to self-host Capgo, as well as a discussion of the benefits and challenges of self-hosting.

# Introduction

Self Hosting is a form of running your own website or application by setting up a server and network yourself. Instead of using a Platform as a Service or a Public Cloud Provider, those who choose to self-host will run their own networks and be responsible for the maintenance and uptime in addition to building their website or application.

The easiest way to get started with Capgo is with our [official managed service in the cloud](https://capgo.app/), but if you’re happy to manage your own, you can also self-host Capgo on your server.

## What is self hosting?

Self-hosting, in the context of the digital realm, refers to the practice of running your own servers or hosting infrastructure to manage and control your online presence and services. Instead of relying on third-party hosting providers, individuals and organizations choose to set up and manage their servers, websites, applications, and data storage on their terms.

## Why do you choose self-hosting?

There are many reasons why people choose to self-host. Some of the most common benefits include:

* **Privacy and control:** Self-hosting gives you complete control over your data and privacy. You don't have to worry about third-party providers tracking your activity or selling your data.

* **Cost savings:** Self-hosting can be more cost-effective in the long run, especially if you're using a lot of resources or running multiple services.

* **Customization:** Self-hosting gives you the flexibility to customize your applications and services to meet your specific needs.

* **Learning and experimentation:** Self-hosting can be a great way to learn about Linux, system administration, and other technical topics. It can also be a fun way to experiment with new software and services.

* **Independence:** Self-hosting reduces your dependency on external providers. You're not at the mercy of their terms of service, pricing changes, or potential service disruptions. This independence can be crucial for businesses and individuals who rely on their online presence for critical functions.

## What’s the difference between Capgo Cloud and Capgo Self-Hosted?

There is only one version of Capgo. Both my Cloud and my Self-Hosted products are completely equal. There’s no premium and exclusive commercial version with a better or more complete feature set.

You get the same dashboard, same actionable metrics and same commitment to [respecting the privacy of your visitors](https://capgo.app/privacy/) with both.

I started developing Capgo in December 2018, and I launched the SaaS subscription business in May 2019. The project is very much alive, actively developed and fast-growing. It is robust and battle-tested too.

Here are the differences between Capgo Cloud and Capgo Self-Hosted:

|   | Cloud | Self-hosted |
| --- | --- | --- |
| **Hosting** | Easy and convenient. It takes 2 minutes to start sending your first update, high availability, backups, security, and maintenance all done for you by me. I manage everything for you so you don’t have to worry about anything. | You do it all yourself. You need to get a server, and you need to manage your infrastructure. You are responsible for installation, maintenance, upgrades, server capacity, uptime, backup, security, stability, consistency, loading time and so on. |
| **Storage** | All visitor data is exclusively processed on EU-owned cloud infrastructure. I keep your site data on a secure, encrypted and server in Germany. This ensures that your site data is protected by the strict European Union data privacy laws and ensures compliance with GDPR. Your website data never leaves the EU. | You have full control and can host your Capgo on any server in any country that you wish. Host it on a server in your basement or host it with any cloud provider wherever you want, even those that are not GDPR compliant. |
| **Raw data** | You see all your site stats and metrics on my modern-looking, simple to use and fast loading dashboard. You can only see the stats aggregated in the dashboard. | Are you an analyst and want access to the raw data? Hosting Capgo yourself gives you that option. Take the data directly from the database and import it to a data analysis tool of your choice. |
| **Costs** | There’s a cost associated with providing an updater service, so I charge a subscription fee. | You only need to pay for your server and whatever cost there is associated with running a server. You never have to pay any fees to me, only to your cloud provider. |
| **Premium Support** | Real support delivered by real human beings who build and maintain Capgo. | Premium support is not included. Self-hosted release is community supported only. |
| **Releases** | Continuously developed and improved with new features and updates multiple times per week. | It’s a long term release published twice per year, so the latest features won’t be immediately available as they’re battled-tested in the cloud first. |

# Using the CLI with self-hosted capgo
To use the CLI with self-hosted capgo edit the capacitor.config.ts from your app directory and set it like this:

```ts
const config: CapacitorConfig = {
  appId: 'com.demo.app',
  appName: 'demoApp',
  webDir: 'dist',
  bundledWebRuntime: false,
  plugins: {
    CapacitorUpdater : {
      localHost: "http://localhost:5173",
      localWebHost: "http://localhost:5173",
      localSupa: "http://localhost:54321",
      localSupaAnon: "see_notes",
    },
  },
};
```

Note: To get localSupaAnon please follow this [tutorial](https://capgo.app/docs/self-hosted/local-dev/getting-started/) and copy the anon key into localSupaAnon

# Using the capacitor updater with self-hosted capgo

**Requirement**

Cloned [capgo](https://github.com/Cap-go/capgo/)

To use the capacitor updater with self-hosted capgo edit the `capacitor.config.ts` from your app directory and set it like this:

```ts
const config: CapacitorConfig = {
  appId: 'com.demo.app',
  appName: 'demoApp',
  webDir: 'dist',
  bundledWebRuntime: false,
  plugins: {
    CapacitorUpdater : {
      statsUrl: "http://localhost:54321/functions/v1/stats",
      channelUrl: "http://localhost:54321/functions/v1/channel_self",
      updateUrl: "http://localhost:54321/functions/v1/updates"
    },
  },
};
```

This will enable you to use local capgo in development. However, by default, this is not enough.

# Conclusion

In conclusion, self-hosting Capgo can be a good option for organizations that have the resources and expertise to do so. It offers a number of benefits, including control over the update process, security, and compliance. However, it is important to carefully weigh the benefits and challenges before deciding whether to self-host.

If you are considering self-hosting Capgo, I recommend that you start by reading the Capgo [self-hosting documentation](https://capgo.app/docs/self-hosted/getting-started/). This will give you a good understanding of the requirements and risks of self-hosting. 

