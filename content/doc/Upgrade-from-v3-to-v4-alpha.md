---
slug: "Upgrade-from-v3-to-v4-alpha"
title: "Upgrade from v3 to v4 alpha"
description: Documentation for upgrading from v3 to v4 alpha Capgo

---
# Why this upgrade

After many talk in the discord community with you.
I discover the manual mode was very too manual and not safe to use, as example auto-revert was not possible, so if you failed update in manual the user have to remove the app and install back, what is terrible UX.

Meanwhile, I took this as an opportunity to give more freedom to you, and remove all bad code I made. 

# install

`npm i @capgo/capacitor-updater@next`

# Auto-update cloud

if you use the basic example in your app, you are safe to migrate to the new version, enjoy!

# Auto-update self-hosted

For you, still simple, the changes are the name of setting `autoUpdateUrl` and the change from `get` to `post`

# Manual users

For you, this is the most significant changes, but for the best! You get tons of improvements, Read carefully.

# Changes 

- `autoUpdateUrl` become `updateUrl` since this setting can be use in manual mode now too
- Delete of `cancelDelay` and `delayUpdate` in favor of `setDelay`
- No more `versionName` in set
- Change `version` key who was returned in most function to object `BundleInfo` 
```ts
interface BundleInfo {
  id: string;
  version: string;
  downloaded: string;
  status: 'success' | 'error' | 'pending' | 'downloading'
}
```
- Renamed of misleading names now (even to explain cannot be clear, but at usage is easy to understand the new one):
  - what was called a `version` is now refer to a `bundle`
  - `id` refer to the old `version` who was a random string of 10 char, this `id` is the only trustable and unique way to access to your bundles, example `7Dfcd2RedN`.
  - `version` refer now to the `versionName` you choose for a bundle, example `1.0.0`
- `updateUrl` move from `get` to `post`, since custom headers were a problem to some of you and post is more logical, all previous headers go to the body and prefix `cap_` disappear.
- `versionName` method is deleted, in favor of `getId`
- list return now a list of `BundleInfo`
- Rename `getId` in `getDeviceId`

# News

- Method `getLatest`, this method allow you to get from your server set with `updateUrl` the last version available.
- Method `setDelay` who take `{delay: boolean}` as argument to set true or false the delay for auto-update
- Method `next`, to set the version in next backgrounding, in opposite to `set` who do it instantly.
- Method `isAutoUpdateEnabled`, to let you know if you are in auto-update context
- Event `downloadComplete` when download reach 100%
- Added mandatory field `version` in download method
- `notifyAppReady` become mandatory in manual mode too, if not call after 10 sec the app revert to past version


# Contributors
[@lincolnthree](https://github.com/lincolnthree) Thank you so much for starting this work, it was impossible to make this update work without you.

