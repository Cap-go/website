---
locale: en
---
# Using @capgo/capacitor-persistent-uuid

Generate one persistent app-scoped UUID for Capacitor and keep it stable across reinstall and update flows where normal app storage is removed.

## Install

~~~bash
npm install @capgo/capacitor-persistent-uuid
npx cap sync
~~~

## What This Plugin Exposes

- getId - Read the stored UUID, creating one if none exists for the selected scope.
- resetId - Rotate the stored UUID for logout, privacy reset, or test cleanup flows.
- scope - Optional namespace for apps whose debug and production package identifiers differ.

## Example Usage

~~~typescript
import { PersistentUuid } from '@capgo/capacitor-persistent-uuid';

const { id, created, scope } = await PersistentUuid.getId();

console.log(id);
console.log(created);
console.log(scope);
~~~

## Share One UUID Across Build Variants

~~~typescript
const result = await PersistentUuid.getId({
  scope: 'com.example.app',
});

console.log(result.id);
~~~

## Reset The Identifier

~~~typescript
const replacement = await PersistentUuid.resetId();
console.log(replacement.id);
~~~

## Platform Notes

Android stores the UUID in AccountManager so it can survive Android Studio reinstall cycles and debug vs Play signing differences when the package name or custom scope is stable. iOS stores the UUID in Keychain and keeps it through app and iOS updates while Keychain access remains compatible. Web uses localStorage as a development fallback.

This plugin does not expose a hardware ID and does not survive factory reset, manual account removal, Keychain clearing, browser storage clearing, or resetId.

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-persistent-uuid/
- Docs: /docs/plugins/persistent-uuid/

## Keep Going

If you are using **@capgo/capacitor-persistent-uuid** to keep app identity stable, connect it with [@capgo/capacitor-persistent-uuid](/docs/plugins/persistent-uuid/) for the overview, [Getting Started](/docs/plugins/persistent-uuid/getting-started/) for install and API examples, [Android behavior](/docs/plugins/persistent-uuid/android/) for reinstall details, [iOS behavior](/docs/plugins/persistent-uuid/ios/) for Keychain details, and [@capgo/capacitor-persistent-account](/plugins/capacitor-persistent-account/) when you need account data persistence instead of a UUID.
