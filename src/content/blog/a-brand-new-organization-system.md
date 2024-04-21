---
slug: "a-brand-new-organization-system"
title: A brand new organization system
description: A backstory on how the capgo team added a organization system
author: WcaleNieWolny
author_url: https://github.com/WcaleNieWolny/WcaleNieWolny
created_at: 2024-04-15
updated_at: 2024-04-15
head_image: "/organization_system_blog.webp"
head_image_alt: Capgo organization system illusatration
tag: Story
published: true
next_blog: ""

---

## Introduction

Hey, I am [WcaleNieWolny](https://github.com/WcaleNieWolny/WcaleNieWolny) - Capgo's lead software engineer.

Over the past 8 months, I have been developing the [organization system](/docs/webapp/organization-system/), and as of April 14, I am happy to announce that the system has been completed 🎉 🎊

Finally, after 8 months, every single part of Capgo is accessible to org members. This includes:
 - apps
 - statistics
 - billing
 - full CLI support
 - and so much more!

It has not been easy to get here; there have been 3 major revisions of the systems.

## Organizations v1

The beginnings were rough... Initially, I started working on this 2 weeks after joining the project. 
At the time, I had little to no knowledge about the codebase or any bigger idea on how to implement this.

This led to implementing the most hacky solution that only supported accessing the apps, channels, and versions.
It did not even allow for the invited user to access stats.

And then I waited for Martin to review this. I waited and waited, but nothing really happened. 3 months later, I decided to come back to this and fix all the merge conflicts. I also decided to test, which turned out to be a great idea.
To no surprise, the hacky solution completely failed. At that moment, I decided to fix all bugs and write an extensive E2E test.
I had to work with very broken code and a lot of bad decisions made by the past me, but after 2 hard weeks, I finally got it to function.

That does not, however, mean that it was perfect. The owner of the organization still had a lot more access than even the highest invited user. User experience also was quite lacking. The invited user could not even see the application statistics, manage billing, and the CLI was limited to upload only. 

Despite all of those challenges, Martin had reviewed the PR, and a week later, it got pushed into prod. 

## Organizations v2

The organization system was working rather well despite all of the challenges. Users were using it, and it really pushed the entire project forward. However, I still had to:
 - fix the mess made in [row level security](https://supabase.com/docs/guides/auth/row-level-security)
 - add support for the entire CLI
 - ensure that admin users have the same access as the owner

After [a lot of discussions](https://github.com/Cap-go/capgo/issues/564) with Martin, we decided that the best way to move forward was to rewrite the entire security rules and to move all the resource ownership to organizations and not users.
This would allow for easier integration with the new organization system, and it would also remove a lot of legacy code.

Writing the new RLS code was very tedious, but after a week and a half, the entire migration was ready.

This time, however, we decided against writing the E2E test, which meant that we had to test it manually. After 3 very extensive calls together, Martin and I finally decided to push to production and hope it would go well 🙏

It didn't... It turns out that I broke user registration, and new users could not create an account 😅

After a quick panic call, I quickly pushed some changes into prod and went to bed. Unfortunately, my changes only created more problems 😰

After I woke up, I discovered that users had a lot of empty organizations. This is not supposed to happen as only 1 organization should be allowed per user. It took some time of brainstorming to remove all of the duplicated, empty orgs, but aside from that, the changes went rather smoothly.

## Organizations v3

Even this was not enough. There was still a huge component missing - billing.

So far only the owner could manage the billing. This has created some interesting issues where a user purchased a plan thinking he was buying it for the organization. 
We quickly fixed the issue manually and it was at this point that we decided that this issue was unacceptable

The migration was rather smooth. It took a week of work but compared to V1 and V2 it really was not that hard 🚀

## Organizations v4 - the future

After all of this hard work I think it's time to focus on something else for now 😎

It was not easy but I learned a lot and capgo has recived a very nice and important feature
I still have to deperecate the legacy functions, improve the webapp user experiance, monitor for bugs, 
but there should not be any major changes to this system.


<br>

Thank you for reading 🚀
