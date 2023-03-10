---
slug: "introducing-end-to-end-security-to-capacitor-updater-with-code-signing"
title: Introducing end to end encryption to capacitor-updater with code signing
description: Using RSA + AES cryptography to encrypt updates, designed for the enterprise and high security apps
author: Martin Donadieu
author_url: https://twitter.com/martindonadieu
created_at: 2022-11-27
updated_at: 2022-11-27
head_image: "/secure_upload.webp"
head_image_alt: Secure upload Capgo
tag: Solution
published: true
next_blog: ""

---

[Capacitor-updater](https://github.com/Cap-go/capacitor-updater) now supports end-to-end code encryption for enterprise customers. Code signing makes sure the updates run by end users’ devices have not been tampered with and provides an extra level of protection above Capacitor-updater’s standard web-grade security.

## The default security of Capacitor-updater

By default, Capgo’s security model is similar to that of web hosting providers. Capgo stores updates [encrypted at rest](https://cloud.google.com/docs/security/encryption/default-encryption) and serves them over HTTPS using modern ciphers. Similarly, publishing an update from a developer’s computer always uses HTTPS.

![Capgo scores an A+ on SSL Labs’ HTTPS test](/ssllabs_report.webp)

Capgo’s default security scores an A+ on SSL Labs’ HTTPS test (https://www.ssllabs.com, November 2022)

Like best-in-class web hosts, Capgo uses HTTPS to protect the privacy and integrity of network connections between the server and end users’ devices. This is an excellent level of security that works well both for the web and Ionic apps that use Capgo.

## The cloud infrastructure supply chain

Another thing Capgo and most web hosts have in common is they run on lower-level cloud infrastructure, often from AWS, GCP, or another popular cloud provider. The hardware and software operated by these cloud providers and Capgo or other web hosts are part of the cloud supply chain.

The cloud supply chain and its security model work for a vast number of websites and apps. Every web developer who uses a cloud provider puts trust in that provider and expects the files they upload to be the files that are run or served without being tampered with. And cloud providers work hard at keeping their infrastructure secure.

But obviously, hardware and software vulnerabilities get discovered. Cloud providers patch vulnerabilities on timely schedules, proactively prevent malicious software(e.g. [Google’s SLSA](https://security.googleblog.com/2021/06/introducing-slsa-end-to-end-framework.html)), and build layers of defense in depth, and in practice, cloud infrastructure has shown to meet most websites and apps’ security needs. However, some Ionic apps include compromised cloud infrastructure in their threat models. For these Capacitor JS apps with the highest security requirements above the web, we built end-to-end code signing in to Capgo and the [Capgo Updates standard protocol](https://docs.capgo.app/self-hosted/auto-update/update-endpoint/).

## End-to-end code signing with Capgo

Capgo’s end-to-end code signing uses public-key cryptography to ensure end users’ devices run only unmodified, original updates from the Capacitor app developer.

“End-to-end” means this security covers the flow from the time a developer publishes an update to the time an end user’s device receives and runs the update. “Code signing” is using cryptography and a secret private key to “sign” code, and later using a trusted public key to verify the signature.

Here is a simple* schema to explain how it works:

![Capgo encryption schema](/ecryption_flow.webp)

* Complex in practice, cryptography is hard

*Definition*:
- AES: Advanced Encryption Standard, a symmetric encryption algorithm, one key for encryption and decryption.
- RSA: Rivest–Shamir–Adleman, an asymmetric encryption algorithm, two keys are used: a public key and a private key.
- Cypher: The encrypted data.
- Session key: An AES key used to encrypt and decrypt data.

We use AES to encrypt the update and RSA to encrypt the AES key. The AES key is encrypted with the public key of the developer. The developer’s private key is used to decrypt the AES key and decrypt the update.

We use two different encryption algorithms because RSA cannot be used to encrypt large amounts of data. AES is used to encrypt the update and RSA is used to encrypt the AES key.

With this, Capgo cannot even read the content of your bundle, it can only verify the integrity of the bundle. This is a strong security model that is used by many enterprise customers.

With end-to-end code signing, Capgo becomes a “trustless” cloud infrastructure. If one of Capgo’s cloud providers or even Capgo itself were to modify a code-signed update, end users’ devices would reject that update and run the previous, trusted update that’s already on the device.

While web-level HTTPS is sufficient for many Ionic apps, some large companies find the extra level of security from end-to-end code signing appealing. Some of these companies make finance apps that issue high-value, permanent transactions. Other companies have CISOs who include compromised cloud infrastructure in their threat models. We built end-to-end code signing in to Capgo for these use cases and are interested in hearing more from companies with higher-level security needs.

## Getting started for enterprise customers

For large companies or projects who care deeply about security, we want to make code signing easy to set up and maintain. To that end, we now provide the following features:

-   Quick certificate setup and configuration
-   Support for code signing development servers with both Capgo and development builds
-   Production code signing on every update

Capgo code signing is available for all customers. To get started, follow the [setup instructions](https://docs.capgo.app/tooling/cli#end-to-end-encryption-trustless).

## Credits

Thanks a lot to [Ionic](https://ionic.com), this article is based on [this article](https://ionic.io/blog/introducing-the-ionic-end-to-end-testing-reference-example) rewroted with chat-gpt-3 and adapted.