---
slug: "self-hosted-live-updates"
title: Self-hosted Live Updates
description: I'm excited to announce Self-hosted Live Updates, the next iteration of Capgo’s Live Updates!
author: Martin Donadieu
author_url: https://twitter.com/martindonadieu
created_at: 2022-12-03
updated_at: 2022-12-03
head_image: "/self_hosted.webp"
head_image_alt: Self hosted updates
tag: Solution
published: true
next_blog: ""

---

While many enterprises leverage, the Live Updates SDK to pull down the latest JavaScript, HTML, and CSS changes into their applications, others are hampered by corporate policy, industry regulations, or other geographical restrictions. With Self-hosted Live Updates, you can now distribute web build artifacts through your infrastructure.

That means no more app store delays, quicker bug fixes and content changes, and ensuring your users are always on the app’s latest version.

I’ve also heard time and time again – large enterprises want to use Live Updates, but strict compliance standards get in the way. Until now.

## How do self-hosted live updates work?

Capgo-hosted Live Updates can be configured and deployed easily in Capgo with the Capgo SDK. For Self-hosted Live Updates, I’ve added functionality to the Capgo CLI for configuration on your infrastructure.

In order for Capgo to ensure a securely coordinated delivery of the newly updated web build artifacts to end-users, the Capacitor Live Updates plugin now can utilize a public/private key pairing. The additional handshake when using Self-hosted Live Updates adds peace of mind that the artifacts delivered by the enterprise’s infrastructure and pulled down via the plugin have remained unmodified.

![Capgo encryption schema](/ecryption_flow.webp)

The following walks through the steps to set up the key pairing, as well as the workflow that ultimately brings the updated experience to end users.

### One-time key pair setup

To generate a public/private key pair, enterprises can utilize the following Capgo Cloud CLI command:

```
npx @capgo/cli@latest key create
```

This command will set `CapacitorUpdater.privateKey` properties in your config file.
And generate 2 key file, `capgo_key.pub` and `capgo_key` in your project root directory.

This key pair is used to sign the update and verify the update on the app side.

### Self-hosted live updates workflow

Implementing Self-hosted Live Updates begins with an enterprise performing a web build of their bug fix, content updates, or other web-based code changes. They then sign the build artifact with the private key obtained from the one-time setup and upload the bundle to the storage location of their choice.

```
npx @capgo/cli@latest encrypt abc123.zip”
```
This command will print you a ivSessionKey, you need to save it for the next step.

Now upload your encrypted zip in your enterprise storage and get the URL of the zip file.

Capgo must then be informed of a new Live Update that is ready for consumption. This is done via another CLI command:
```
npx @capgo/cli@latest upload --external=https://abc.com/app/updates/abc123.zip --iv-session-key=YourKey
```

Once the command is run, Capgo is aware of a new update ready to be distributed to the app’s users. Now, when the app is started, the Live Updates plugin checks with Capgo to see if any changes need to be brought down.

Capgo responds back to the plugin with “Yes, an update is available” and the Live Updates plugin downloads the new live update using the URL location provided from the \`register\` CLI command:

```
https://abc.com/app/updates/abc123.zip
```

The organization’s API returns the Live Update bundle from the location, and the app decrypt the zip and applies the live update. Voilà!

## Get started

I'm excited to bring the power of Live Updates to more enterprises than ever. Organizations and Ionic app users alike will quickly realize the benefits of Capgo’s secure distribution of over-the-air app updates. 

For more information on Self-hosted Live Updates by Capgo, you can [check out the docs](https://docs.capgo.app/tooling/cli#upload-version). Ready to deploy instant app updates directly to your users? [Register here today!](https://web.capgo.app/register/)
