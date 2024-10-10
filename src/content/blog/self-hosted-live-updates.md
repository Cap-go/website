---
slug: "self-hosted-live-updates"
title: Self-hosted Live Updates
description: I'm excited to announce Self-hosted Live Updates, the next iteration of Capgo’s Live Updates!
author: Martin Donadieu
author_url: https://x.com/martindonadieu
created_at: 2022-12-03
updated_at: 2023-06-29
head_image: "/self_hosted.webp"
head_image_alt: Self hosted updates
tag: Solution
published: true
locale: en
next_blog: ""

---

I am delighted to announce the release of Self-hosted Live Updates, which represents the latest evolution of Capgo's Live Updates.

While many enterprises currently utilize the Live Updates SDK to access the most recent JavaScript, HTML, and CSS updates for their applications, some may encounter hindrances due to corporate policies, industry regulations, or geographical restrictions. With Self-hosted Live Updates, you can now distribute web build artifacts via your infrastructure.

This means you can avoid delays caused by Apple Store reviews, address bugs and modify content more rapidly, and ensure that your users are always operating on the latest version of your app. Additionally, I have heard from numerous large enterprises who would like to leverage Live Updates but face challenges due to strict compliance standards. This issue is now a thing of the past thanks to Self-hosted Live Updates.

## How do self-hosted live updates work?

Deploying Capgo-hosted Live Updates is a breeze using the [Capgo SDK](https://github.com/Cap-go/capacitor-updater/). As for Self-hosted Live Updates, I have enhanced the Capgo CLI with the necessary functionalities to enable configuration on your infrastructure.

To ensure a safe and coordinated delivery of the latest web build artifacts to end-users, Capgo now allows the Capacitor Live Updates plugin to employ a public/private key pairing. When using Self-hosted Live Updates, an additional handshake is performed to provide reassurance that the artifacts downloaded via the plugin from the enterprise's infrastructure are unmodified.

![Capgo encryption schema](/encryption_flow.webp)

The following outlines the steps to establish the key pairing and the subsequent process for delivering the updated experience to end-users.

### One-time key pair setup

To generate a public/private key pair, enterprises can utilize the following Capgo Cloud CLI command:

```shell
npx @capgo/cli@latest key create
```

This command will set `CapacitorUpdater.privateKey` properties in your config file.
And generate 2 key files, `capgo_key.pub` and `capgo_key` in your project root directory.

This key pair is used to sign the update and verify the update on the app side.

### Self-hosted live updates workflow

To start implementing Self-hosted Live Updates, an enterprise must first perform a web build of their bug fixes, content updates, or any other web-based code changes they wish to make. Next, they must sign the build artifact using the private key obtained during the one-time setup process, and finally upload the bundle to their preferred storage location.

First build your code:
```shell
npm run build
```

Then Zip your build:
```shell
npx @capgo/cli/latest bundle zip
```

Then encrypt your zip:

```shell
npx @capgo/cli@latest bundle encrypt abc123.zip”
```

This command will print you an ivSessionKey, you need to save it for the next step.

Now upload your encrypted zip to your enterprise storage and get the URL of the zip file.

Capgo must then be informed of a new Live Update that is ready for consumption. This is done via another CLI command:

```shell
npx @capgo/cli@latest bundle upload --external=https://abc.com/app/updates/abc123.zip --iv-session-key=YourKey
```

Once the command is run, Capgo is aware of a new update ready to be distributed to the app’s users. Now, when the app is started, the Live Updates plugin checks with Capgo to see if any changes need to be brought down.

Capgo responds back to the plugin with “Yes, an update is available” and the Live Updates plugin downloads the new live update using the URL location provided from the \`register\` CLI command:

```shell
https://abc.com/app/updates/abc123.zip
```

The organization’s API returns the Live Update bundle from the location, and the app decrypts the zip and applies the live update. Voilà!

## Get started

I am thrilled to extend the reach of Live Updates to even more enterprises than before. Both organizations and Ionic app users will quickly recognize the advantages of Capgo's secure distribution of over-the-air app updates.

For more information on Self-hosted Live Updates by Capgo, you can [check out the docs](/docs/tooling/cli/#upload-version). Ready to deploy instant app updates directly to your users? [Register here today!](/register/)
