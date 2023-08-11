---
title: "From V4 to V5"
sidebar:
  order: 1
---

## Why this upgrade

This major version is here to follow Capacitor major version

First follow the migration guide of Capacitor:

[https://capacitorjs.com/docs/updating/5-0](https://capacitorjs.com/docs/updating/5-0)

## Install

`npm i @capgo/capacitor-updater@5`

`Then sync the native code update:`

`npx cap sync`

That it ! Pretty easy !

## Manual mode

If you were getting yourself the update with getLatest, there are a tiny change.
Now if you are up-to-date already it will go into catch.
Any response different than update available will do that.
