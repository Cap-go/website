---
locale: fr
title: "From V6 to V7"
description: "A detailed Guide on transitioning from Version 6 to Version 7 of Capgo updater, outlining the necessary steps and considerations for a successful Mise à niveau process, ensuring compatibility with the latest Capacitor Fonctionnalités and improvements."
sidebar: 
  order: 1
---

## Why this Mise à niveau

This major Version is here to follow Capacitor major Version

First follow the Migration Guide of Capacitor:

[https://capacitorjs.com/docs/updating/7-0](https://capacitorjs.com/docs/updating/7-0/)

## Installer

`npm i @capgo/capacitor-updater@7`

`Then sync the native code update:`

`npx cap sync`

That it ! Pretty easy !

## Chiffrement Migration

If you're using the `key-v1` encryption method, you'll need to migrate to the new encryption system as `key-v1` is no longer supported in V7. [[memory:96112]]

Follow the Chiffrement Migration Guide here: [Chiffrement Migration Guide](/docs/CLI/migrations/Chiffrement/)

## Configuration Changes

We recommend adding the following properties in your `capacitor.config` file:
- `capacitorUpdater`
- `appId`
- `version`
- `autoUpdate`

These Paramètres should Aide managed better the plugin's and it's behaviors.


