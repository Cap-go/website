---
title: "From V6 to V7"
description: "A detailed guide on transitioning from version 6 to version 7 of Capgo updater, outlining the necessary steps and considerations for a successful upgrade process, ensuring compatibility with the latest Capacitor features and improvements."
sidebar:
  order: 2
---

## Why this upgrade

This major version is here to follow Capacitor major version

First follow the migration guide of Capacitor:

[https://capacitorjs.com/docs/updating/7-0](https://capacitorjs.com/docs/updating/7-0/)

## Install

`npm i @capgo/capacitor-updater@7`

`Then sync the native code update:`

`npx cap sync`

That it ! Pretty easy !

## Encryption Migration

If you're using the `key-v1` encryption method, you'll need to migrate to the new encryption system as `key-v1` is no longer supported in V7. [[memory:96112]]

Follow the encryption migration guide here: [Encryption Migration Guide](/docs/cli/migrations/encryption/)

## Configuration Changes

We recommend adding the following properties in your `capacitor.config` file:
- `capacitorUpdater`
- `appId`
- `version`
- `autoUpdate`

These settings should help managed better the plugin's and it's behaviors.


