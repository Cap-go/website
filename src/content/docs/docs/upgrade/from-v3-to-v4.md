---
title: "From V3 to V4"
sidebar:
  order: 2
---

## Why this upgrade

After many talk in the discord community with you. I discovered the manual mode was very too manual and not safe to use, for example, auto-revert was not possible, so if you failed update in manual the user have to remove the app and install back, what is terrible UX.

Meanwhile, I took this as an opportunity to give more freedom to you, and remove all bad code I made.

## Install

`npm i @capgo/capacitor-updater@4`

## Auto-update cloud

If you use the basic example in your app, you are safe to migrate to the new version, enjoy!

## Auto-update self-hosted

For you, still simple, the changes are:

* The name of the setting from `autoUpdateUrl` in `updateUrl`
* The Endpoint method changed from `GET` to POST

## Manual users

For you, this is the most significant change, but for the best! You get tons of improvements, Read carefully.

## Changes

* `autoUpdateUrl` becomes `updateUrl` since this setting can be used in manual mode now too
* Delete of `cancelDelay` and `delayUpdate` in favor of `setDelay`
* No more `versionName` in set
* Change `version` key, who was returned in most function to object `BundleInfo`

```typescript
interface BundleInfo {
  id: string;
  version: string;
  downloaded: string;
  status: 'success' | 'error' | 'pending' | 'downloading'
}
```

* Renamed of misleading names now (even to explain cannot be clear, but at usage is easy to understand the new one):
  * what was called a `version` is now referring to a `bundle`
  * `id` refer to the old `version` who was a random string of 10 char, this `id` is the only trustable and unique way to access to your bundles, example `7Dfcd2RedN`.
  * `version` refer now to the `versionName` you choose for a bundle, example `1.0.0`
* `updateUrl` move from `get` to `post`, since custom headers were a problem for some of you and post is more logical, all previous headers go to the body and prefix `cap_` disappear.
* `versionName` method is deleted, in favor of `getId`
* list returns now a list of `BundleInfo`
* Rename `getId` in `getDeviceId`
* `autoUpdate` becomes true by default, if you use Manual mode, set it to false.

## News

* Method `getLatest`, this method allows you to get from your server set with `updateUrl` the last version available.
* Method `setDelay` who take `{`kind`:` "background" | "kill" | "nativeVersion" | "date", value? : string`}` as argument to set delay to different modes.
* Method `next`, to set the version in next backgrounding, in opposite to `set` who do it instantly.
* Method `isAutoUpdateEnabled`, to let you know if you are in auto-update context
* Event `downloadComplete` when download reach 100%
* Added mandatory field `version` in download method
* `notifyAppReady` become mandatory in manual mode too, if not call after 10 sec the app reverts to past version.

## Contributors

[@lincolnthree](https://github.com/lincolnthree) Thank you so much for starting this work, it was impossible to make this update work without you.
