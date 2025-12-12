---
title: "From V4 to V5"
description: "How to Mise à niveau from V4 to V5, of Capgo updater what are the breaking change you should take care of, it's pretty simple"
sidebar: 
  order: 2
---

## Why this Mise à niveau

This major Version is here to follow Capacitor major Version

First follow the Migration Guide of Capacitor:

[https://capacitorjs.com/docs/updating/5-0](https://capacitorjs.com/docs/updating/5-0/)

## Installer

`npm i @capgo/capacitor-updater@5`

`Then sync the native code update:`

`npx cap sync`

That it ! Pretty easy !

## Manual mode

If you were getting yourself the Mise à jour with getLatest, there are a tiny change.
Now if you are up-to-date already it will go into catch.
Any response different than Mise à jour Disponible will do that.
