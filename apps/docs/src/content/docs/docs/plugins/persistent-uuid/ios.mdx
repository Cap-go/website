---
title: iOS Behavior
description: "How @capgo/capacitor-persistent-uuid persists identifiers on iOS."
sidebar:
  order: 4
---

## Storage Model

On iOS, the plugin stores the UUID in Keychain as a generic password item. The item is device-only and uses the bundle identifier as the default scope.

This survives app updates and iOS updates. It also survives reinstall flows as long as iOS keeps the Keychain item and the app keeps compatible Keychain access through the same bundle and Apple team rules.

## Stable Scope Rules

Use the default scope when the bundle identifier is stable.

~~~typescript
const result = await PersistentUuid.getId();
~~~

Use a custom scope when multiple build variants should resolve to one app identifier.

~~~typescript
const result = await PersistentUuid.getId({ scope: 'com.example.app' });
~~~

## Limits

The UUID can be lost if the user erases the device, Keychain data is cleared, Keychain access changes, the bundle/team access changes, or the app calls resetId.

## Keep going from iOS Behavior

If you are validating iOS persistence, connect this page with [Getting Started](/docs/plugins/persistent-uuid/getting-started/) for API usage, [Android behavior](/docs/plugins/persistent-uuid/android/) for Android reinstall behavior, and [Using @capgo/capacitor-persistent-uuid](/plugins/capacitor-persistent-uuid/) for a complete walkthrough.
