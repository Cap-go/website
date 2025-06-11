---
slug: capgo-storage-hourly-change
title: Capgo Storage Hourly Change
description: Capgo billing for storage is chaning. Learn how it's changing!
author: WcaleNieWolny
author_image_url: https://avatars.githubusercontent.com/u/50914789?v=4
author_url: https://github.com/riderx
created_at: 2025-06-11T14:00:00.000Z
updated_at: 2025-06-11T14:00:00.000Z
head_image: /capgo-storage-update.webp
head_image_alt: Capgo Storage Update
keywords: capgo, storage, billing, change, hourly, update
tag: Development, Mobile, Updates, Capgo
published: true
locale: en
next_blog: ''
---

# Introduction

Recently, the Capgo team has decided to change the way that billing for storage works. In this article, you will learn how this change is impacting you and why it was made

# What's changing?

Currently, the storage billing system checks if your total stroage doesn't exceed the storage limit for your plan. If it does, you will be blocked from uploading new bundles.

This works well for a lot of use cases, and some stroage providers such as Google Drive or Apple iCloud use this approach.

However, this approach has some limitations and it doesn't scale well for enterprise use cases. Capgo is a platform targeting developers, and for them, the current approach is different from the standard storage approach offered by every other storage provider (mainly S3).

In S3, you pay **PER HOUR** for the storage you use.

Let's say that you have a week where you store 30 GB of data and in the next 3 weeks you store 10 GB of data.
Currently, if you were to try to do that in Capgo, you would require the 'pay as you go' plan.

However, if you really think about it, storing 30 GB of data for a week and 10 GB of data for 3 weeks is equivalent to storing 15 GB of data for 4 weeks.

Currently, Capgo doesn't support this approach.

# How does it work now?

After this change goes live, Capgo will allow you to store as much data as you want. If you want to upload 100 GB of bundles, you can do that.

Capgo will then calculate the total storage usage for each hour.

The billing/plans remain the same, so now each plan will have the same GB limit, but it will be calculated per hour.

Here is a table explaining the new plan storage limits:

| Plan | Old limit | New limit |
|------|---------------|---------------|
| Solo | 2 GiB          | 2 GiB * 24 hours * 31 days = 1488 GiB/h |
| Maker  | 5 GiB         | 5 GiB * 24 hours * 31 days = 3720 GiB/h |
| Team | 10 GiB       | 10 GiB * 24 hours * 31 days = 7440 GiB/h |
| Pay as you go | 20 GiB       | 20 GiB * 24 hours * 31 days = 14880 GiB/h |

Please be aware that if you exceed your monthly storage limit, you will not be able to upload new bundles until the next billing cycle starts. In that case, please contact us at [support@capgo.app](mailto:support@capgo.app) and we will help you out.

Please note that the Capgo team is working on a solution to allow you to store more data than the monthly limit. We intend to add a system that allows you to pre-purchase extra storage/MAU/Bandwidth.