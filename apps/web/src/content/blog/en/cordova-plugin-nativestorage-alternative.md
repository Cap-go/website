---
slug: cordova-plugin-nativestorage-alternative
title: "cordova-plugin-nativestorage Alternative for Capacitor"
description: "cordova-plugin-nativestorage alternative for Capacitor: persistent key-value storage with @capgo/capacitor-data-storage-sqlite and optional encryption."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-11-17T12:00:00.000Z
updated_at: 2026-11-17T12:00:00.000Z
head_image: /migrating-cordova-to-capacitor.webp
head_image_alt: "Illustration of migrating a Cordova app to Capacitor, used for a native storage plugin guide"
keywords: cordova-plugin-nativestorage alternative, capacitor key value storage, capacitor sqlite storage, @capgo/capacitor-data-storage-sqlite
tag: Alternatives, Capacitor, Migration
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "What is the best cordova-plugin-nativestorage alternative in Capacitor?"
    answer: "@capgo/capacitor-data-storage-sqlite mirrors NativeStorage set and get with set(), get(), keys(), and clear() on a SQLite backend."
  - question: "Is cordova-plugin-nativestorage still maintained?"
    answer: "npm lists cordova-plugin-nativestorage at version 2.3.2 with a registry modified date of 14 June 2022. Upstream is TheCocoaProject/cordova-plugin-nativestorage."
  - question: "Can I import JSON from NativeStorage?"
    answer: "Capgo documents importFromJson() and exportToJson() in definitions.ts for bulk migrations."
  - question: "Where are the docs?"
    answer: "https://capgo.app/docs/plugins/data-storage-sqlite/, npm @capgo/capacitor-data-storage-sqlite, and GitHub Cap-go/capacitor-data-storage-sqlite."
---

The practical **cordova-plugin-nativestorage alternative** for a Capacitor app is [`@capgo/capacitor-data-storage-sqlite`](/plugins/capacitor-data-storage-sqlite/). It keeps the same small key/value persistence model as `NativeStorage` but stores strings in SQLite with optional encryption and multi table stores in `definitions.ts`. This guide covers npm facts, install steps, usage, and an API map for your Cordova to Capacitor move.

## Why leave cordova-plugin-nativestorage in Capacitor

**cordova-plugin-nativestorage** on npm is version **2.3.2**. The registry `modified` timestamp is **14 June 2022**. The source lives at [TheCocoaProject/cordova-plugin-nativestorage](https://github.com/TheCocoaProject/cordova-plugin-nativestorage). The README explains it exists because iOS and Android can evict WebView `localStorage`, and documents:

- `NativeStorage.setItem(reference, object, success, error)`
- `getItem`, `remove`, `clear`, and `keys` (v2 API through `StorageHandle` in www)
- `initWithSuiteName` for iOS app groups
- JSON serializable objects stored as native key/value pairs

In a Capacitor codebase the Cordova plugin still means callback style APIs and no typed store management.

[`@capgo/capacitor-data-storage-sqlite`](https://www.npmjs.com/package/@capgo/capacitor-data-storage-sqlite) latest on npm is **8.0.64** with a `modified` date of **13 November 2026**. `src/definitions.ts` documents `openStore()`, `set()`, `get()`, `remove()`, `clear()`, `keys()`, `keysvalues()`, `setTable()`, `importFromJson()`, and `exportToJson()`. Capgo ships fixes on an open source cadence where a human still reviews, tests and merges 50+ pull requests daily.

## Install

```bash
bun add @capgo/capacitor-data-storage-sqlite
bunx cap sync
```

Call `openStore()` once at startup with `database` and `table` names from the docs before other methods.

## Usage example

```ts
import { CapgoCapacitorDataStorageSqlite } from '@capgo/capacitor-data-storage-sqlite';

export async function persistSession(token: string) {
  await CapgoCapacitorDataStorageSqlite.openStore({
    database: 'session',
    table: 'kv',
  });
  await CapgoCapacitorDataStorageSqlite.set({ key: 'authToken', value: token });
  const { value } = await CapgoCapacitorDataStorageSqlite.get({ key: 'authToken' });
  return value;
}
```

## Migrating from Cordova to Capacitor

```js
// Before (Cordova)
NativeStorage.setItem('user', { id: 1, name: 'Ada' }, () => {}, console.error);
NativeStorage.getItem('user', (obj) => console.log(obj), console.error);
```

```ts
// After (Capacitor)
import { CapgoCapacitorDataStorageSqlite } from '@capgo/capacitor-data-storage-sqlite';

await CapgoCapacitorDataStorageSqlite.openStore({ database: 'app', table: 'kv' });
await CapgoCapacitorDataStorageSqlite.set({
  key: 'user',
  value: JSON.stringify({ id: 1, name: 'Ada' }),
});
const { value } = await CapgoCapacitorDataStorageSqlite.get({ key: 'user' });
console.log(JSON.parse(value));
```

### API mapping table

| cordova-plugin-nativestorage (`NativeStorage`) | @capgo/capacitor-data-storage-sqlite |
| --- | --- |
| `setItem(reference, object, success, error)` | `set({ key, value })` with string values |
| `getItem(reference, success, error)` | `get({ key })` returns `capValueResult` |
| `remove(reference, success, error)` | `remove({ key })` |
| `clear(success, error)` | `clear()` |
| `keys(success, error)` | `keys()` returns `capKeysResult` |
| `initWithSuiteName(suiteName, ...)` | `openStore()` options for database and table per docs |
| Object values stored natively | Serialize objects with `JSON.stringify()` |
| Callback errors | Promise rejection |
| Cordova plugin install | `bun add @capgo/capacitor-data-storage-sqlite` plus `bunx cap sync` |

## Links and next steps

- Plugin docs: [https://capgo.app/docs/plugins/data-storage-sqlite/](/docs/plugins/data-storage-sqlite/)
- Marketing page: [/plugins/capacitor-data-storage-sqlite/](/plugins/capacitor-data-storage-sqlite/)
- npm: [https://www.npmjs.com/package/@capgo/capacitor-data-storage-sqlite](https://www.npmjs.com/package/@capgo/capacitor-data-storage-sqlite)
- GitHub: [https://github.com/Cap-go/capacitor-data-storage-sqlite/](https://github.com/Cap-go/capacitor-data-storage-sqlite/)
- Cordova upstream: [https://github.com/TheCocoaProject/cordova-plugin-nativestorage](https://github.com/TheCocoaProject/cordova-plugin-nativestorage)

Storage still lives in the app sandbox. After you add the plugin, ship a store build via [Capgo Build](/native-build/). For the full platform move, read the [Cordova to Capacitor migration guide](/blog/migrating-cordova-to-capacitor/).