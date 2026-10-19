---
title: Android Behavior
description: "How @capgo/capacitor-persistent-uuid persists identifiers on Android."
sidebar:
  order: 3
---

## Storage Model

On Android, the plugin stores the UUID in AccountManager under a plugin-owned authenticator account. The default account name uses the app package name as the scope.

This lets the UUID survive common reinstall paths where app-private storage would be removed, including Android Studio uninstall/reinstall cycles and installs signed with different debug or Play signing keys when the package name stays the same.

## Stable Scope Rules

Use the default scope when the app package name is stable across builds.

~~~typescript
const result = await PersistentUuid.getId();
~~~

Use a custom scope when debug, staging, and production builds use different package identifiers but should share one persistent UUID.

~~~typescript
const result = await PersistentUuid.getId({ scope: 'com.example.app' });
~~~

## Limits

The UUID can be lost if the user removes the account from Android settings, the device is factory reset, the package/scope changes, or the app calls resetId.

## Keep going from Android Behavior

If you are validating Android reinstall behavior, connect this page with [Getting Started](/docs/plugins/persistent-uuid/getting-started/) for API usage, [iOS behavior](/docs/plugins/persistent-uuid/ios/) for Apple platform differences, and [Using @capgo/capacitor-persistent-uuid](/plugins/capacitor-persistent-uuid/) for a complete walkthrough.
