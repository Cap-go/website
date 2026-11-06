---
slug: how-your-usage-is-counted
title: How your usage is counted in Capgo
description: >-
  Understand how Capgo count your usage, and use it at best. Learn to manage
  better your plan
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-11-25T00:00:00.000Z
updated_at: 2026-11-06T00:00:00.000Z
head_image: /usage_explained.webp
head_image_alt: "How your usage is counted in Capgo Capgo blog illustration"
keywords: mobile app development, live updates, OTA updates, continuous integration, mobile app updates
tag: Solution
published: true
locale: en
origin: human
next_blog: ''
---

Capgo reports monthly active users (MAU), build time, storage, and bandwidth. On paid plans, MAU and build time determine plan fit and overage charges. Storage and bandwidth are included under the [fair-use policy](/fair-use/).

Organizations without a subscription still pay for storage and bandwidth with credits. See the [payment documentation](/docs/webapp/payment/) for how credits work.


## Users

Each time a user download your Capacitor JS app and opens it, it will send a request to Capgo backend to know is update is available.
When the app does that, it sends little information, including the most important one `DeviceID`

`DeviceID`: is a unique ID (UUID) generated on the device. **Starting from plugin version v5.10.0, v6.25.0 and v7.25.0**, this ID now persists across app reinstalls (stored securely in device storage). Prior to these versions, the ID was reset with each app installation.

Each time your account receives a new Device ID, it saved in database.
Each time an old `DeviceID` request an update (app open), it got is record updated (updated_at in the database).

This data is saved in 2 places:
- device table with `update_at` value
- app_stats with daily counter who represents the number of device who became active today and haven't been active this month.

For plan limit the first method is used because it's 100% reliable, for displaying the chart the second one is used.
You can see both in your account on the home page:
- in the chart is the second method
- in the table of apps is the first method.

> Capgo don't count emulator and dev build in your usage. Keep in mind after the trial you can't have more than 3% of them, or that will lock your account, until you fix it.

> Capgo is also doing some filtering for you. If you have CI/CD configured to send your version to Google PLAY, Google is running your Capacitor app each time to 20+ real device. During the 4 first hours of a new bundle, we block Google data center IP to prevent them to being counted.

Each month, this data starts from zero.


- Create or update a device in my database at each device request
- Add to a daily counter the number of active device who hasn't been active this month.

The first method returns: 900+ users
while the second one is at 200+ users on your account
For plan limit I use the first method, who is 100% reliable, and to display the chart I use the second one.
You can see both on your account home page.

## Storage

Storage measures the bundle versions and Delta assets retained for your apps. Linking one bundle to several channels or serving it from several regions does not multiply its storage usage.

Paid plans include storage under the [fair-use policy](/fair-use/). You can still monitor storage on the Usage page, but it does not determine your paid plan or create overage charges. Credit-only organizations without a subscription still pay for storage.

Remove unused bundles to keep your release history manageable. List your bundles with:

```sh
npx @capgo/cli@latest bundle list
```

When you are ready to remove unused versions, use:

```sh
npx @capgo/cli@latest bundle cleanup
```

Review the cleanup options before deleting versions you may need for delivery or rollback. You can also configure [unused-bundle retention](/docs/webapp/bundles/#can-i-control-how-long-unused-bundles-are-kept).

## Bandwidth

Bandwidth measures bundle delivery to devices. Downloads served from the edge cache do not count toward Capgo bandwidth usage, and regional replication does not multiply it.

Paid plans include bandwidth under the [fair-use policy](/fair-use/). Passing the former bandwidth allowance does not create overage charges or stop downloads on a paid plan. Credit-only organizations without a subscription still pay for bandwidth.

Keep bundles small and use [Delta updates](/docs/live-updates/differentials/) to reduce the amount your users download. This helps users on slow or metered connections, even when bandwidth is included in your plan.

## Observability

[Capgo Observe](/docs/webapp/observe/) supports normal production monitoring and troubleshooting under the [fair-use policy](/fair-use/). Use focused queries for releases, devices, and incidents. Unbounded log streaming, repeated bulk extraction, and excessive automated polling are outside fair use. Capgo will contact you to review excessive usage and agree on changes or a suitable arrangement.

## Keep going from How your usage is counted in Capgo

If you are using **How your usage is counted in Capgo** to plan live update delivery, connect it with [Capgo Live Updates](/live-update/) for the product workflow in Capgo Live Updates, [Overview](/docs/live-updates/) for the implementation detail in Overview, [Features](/docs/live-updates/features/) for the implementation detail in Features, [Update Behavior](/docs/live-updates/update-behavior/) for the implementation detail in Update Behavior, and [Update Types](/docs/live-updates/update-types/) for the implementation detail in Update Types.
