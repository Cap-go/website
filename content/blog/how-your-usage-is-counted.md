---
slug: "how-your-usage-is-counted"
title: How your usage is counted in Capgo
description: Understand how Capgo count your usage, and use it at best. Learn to manage better your plan
author: Martin Donadieu
author_url: https://twitter.com/martindonadieu
created_at: 2022-11-25
updated_at: 2022-11-25
head_image: "/usage_explained.webp"
head_image_alt: Capgo usage system explained
tag: Solution
published: true
next_blog: ""

---

In Capgo, 3 values are counted and important to understand
- Users
- Storage
- Bandwidth

Each one as a slight different way of being counted


## Users

Each time a user download your app and open it, it will send a request to Capgo backend to know is update is available.
When the app does that, it sends little information, including the most important one `DeviceID`

`DeviceID`: is a unique ID (UUID) define by the OS of the device, this ID is unique by app install.

Each time your account receive a new Device ID, it saved in database.
Each time an old `DeviceID` request an update (app open), it got is record updated (updated_at in the database).

This data is saved in 2 places:
- device table with `update_at` value
- app_stats with daily counter who represent the number of device who became active today and haven't been active this month.

For plan limit the first method is used because it's 100% reliable, for display the chart the second one is used.
You can see both in your account in the home page:
- in the chart is the second method
- in the table of apps is the first method.

> Capgo count emulator and dev build in your usage, disable emulator and dev build in your default channel, after you have done your tests.

> Capgo is also doing some filtering for you. If you have CI/CD configured to send your version to Google PLAY, Google is running your app each time to 20+ real device. During the 4 first hours of a new bundle, we block Google data center IP to prevent them to be counted.

Each month, this data start from zero.


- Create or update a device in my database at each device request
- Add to a daily counter the number of active device who haven't been active this month.
the first method return : 900+ users
while the second one is at 200+ users on your account
For plan limit i use the first method who is 100% reliable and for display the chart i use the second one.
You can see both on your account home page.

## Storage

Each time you upload a bundle, this number is increase by the size of the upload.

This data is only related to your upload size, better your app size is, better you stay in your plan.

If you reach the limit or near you can list your bundles with the CLI:
`npx @capgo/cli@latest list`
To see what you could clean, removing a bundle, free the storage but don't delete the stats.

When you are ready for cleanup, use this command to remove many bundles:
`npx @capgo/cli@latest cleanup`

PS: this is good for the planet, but also for your wallet 💪.

> You can also use the `--external` of upload to use your storage, and not count in your plan.

## Bandwidth

The calculation of this value is a bit more complex, but the idea is the same as the storage.

Each time a user download a bundle, this number is increase by the size of the download.

This data is only related to your download size, better your app size is, better you stay in your plan.

> One important thing to note, Capgo cannot see what size is downloaded, it only sees the size of the bundle. So if you have a big bundle, and you have many users who fail to download it, you will reach the limit quickly.

The best way to stay in your plan is to have a small bundle, and if you can't, show a download bar to your user, and let them know how much they have left to download.

In the future, Capgo will improve the download system to have more chance to download the bundle in one time.
