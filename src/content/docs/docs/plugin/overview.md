---
title: "Overview"
description: "Explanation of the two different approaches"
sidebar:
  order: 1
---


### Cloud Mode (Recommended)
Cloud Mode is our recommended choice for hassle-free update management. Capgo's backend takes care of all the update logic, making decisions about updates server-side for better security and control. This mode is all about ease of use: once set up, it runs smoothly on its own, offering advanced features like statistics, and channels. It can also be set-up in a manual mode so it gives you more control, allowing you to decide when to update using your JavaScript code. The backend still manages what gets updated. This mode shares many benefits with the Auto Mode, especially in security and advanced features, but adds the flexibility of timing updates yourself.


### Self Hosted Mode

Self-Hosted Auto Mode is for those who want to handle all the update logic on their server. It offers complete autonomy but requires a separate server and more work to manage updates and server requirements.

Self-Hosted Manual Mode mixes control and autonomy. You decide when to update through JavaScript, but your server handles what gets updated. It's a bit complex since you're including update code in the updates.


:::note 
If you chose to self host you're missing out on all the great features capgo cloud has to offer such as: auto reverts, email alerts, channels, statistics, encryption and more.
:::

:::danger
If you send a bad update to your users you can and will break their app.
:::

