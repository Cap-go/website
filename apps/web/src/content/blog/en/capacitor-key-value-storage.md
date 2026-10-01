---
slug: capacitor-key-value-storage
title: "Key-Value Storage in Capacitor: Preferences vs SQLite"
description: "Compare key-value storage in Capacitor: Preferences, SQLite key-value stores and Keychain storage. Learn which fits settings, cache and secrets."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-10-01T09:00:00.000Z
updated_at: 2026-10-01T09:00:00.000Z
head_image: /capgo_plugins.webp
head_image_alt: "Capgo logo for a comparison of key-value storage options in Capacitor"
keywords: capacitor key value storage, capacitor preferences, sqlite key value store capacitor, capacitor storage, ionic storage alternative, capacitor secure storage
tag: Tutorial, Capacitor, Best Practices
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "What is the best key-value storage for Capacitor?"
    answer: "It depends on the data. Use @capacitor/preferences for a few small settings, a SQLite-backed store such as Fast SQL's KeyValueStore for larger or many values and cached API responses, and Keychain or Keystore storage such as @capgo/capacitor-native-biometric setData for tokens and keys."
  - question: "Is Capacitor Preferences encrypted?"
    answer: "No. Preferences uses UserDefaults on iOS and SharedPreferences on Android, both stored in plaintext inside the app sandbox, and localStorage on the web. Do not store tokens, passwords or encryption keys in it."
  - question: "Can I use localStorage in a Capacitor app?"
    answer: "For throwaway cache only. localStorage and IndexedDB live inside the WebView's storage, which the operating system can clear under storage pressure, and they are tied to the WebView origin. Use a native-backed store for data you need to keep."
  - question: "How do I store JSON objects in a Capacitor key-value store?"
    answer: "Preferences and @capgo/capacitor-data-storage-sqlite accept strings, so call JSON.stringify before saving and JSON.parse after reading. Fast SQL's KeyValueStore accepts objects, arrays, numbers, booleans and Uint8Array directly and returns the same type."
  - question: "What replaces Ionic Storage in Capacitor 8?"
    answer: "For simple settings, @capacitor/preferences. For a larger key-value store on native SQLite, Fast SQL's KeyValueStore or @capgo/capacitor-data-storage-sqlite. Both keep data in a real database file instead of WebView storage."
---

For key-value storage in Capacitor, use `@capacitor/preferences` for a handful of small settings, a SQLite-backed key-value store for anything larger or more numerous, and the Keychain or Keystore for secrets. This guide compares the options available on Capacitor 8, shows working code for each, and explains how to move from one to another without losing user data.

Most apps end up using two of these at once: Preferences or SQLite for app state, and secure storage for the auth token.

## The options at a glance

| | `localStorage` / IndexedDB | `@capacitor/preferences` | Fast SQL `KeyValueStore` | `@capgo/capacitor-data-storage-sqlite` | `@capgo/capacitor-native-biometric` `setData` |
| --- | --- | --- | --- | --- | --- |
| Backed by | WebView storage | UserDefaults / SharedPreferences | SQLite file | SQLite file | Keychain / Keystore |
| Survives OS storage cleanup | Not guaranteed | Yes | Yes | Yes | Yes |
| Value types | Strings (localStorage) | Strings | JSON values, numbers, booleans, `Uint8Array` | Strings | Strings |
| Good size range | Small | Small, a few KB per value | Large values, many keys | Many keys | Very small (under ~8 KB on Android) |
| Encryption | No | No | Optional SQLCipher, key from secure storage | Optional SQLCipher, passphrase in config | Yes, hardware-backed |
| Namespaces | Per origin | `group` option | `store` option | Tables | Key names |
| Query by prefix | No | No | List keys | `filtervalues` | No |
| Web | Yes | `localStorage` | SQLite Wasm (OPFS) | IndexedDB | Not for secrets |

## Why not localStorage

`localStorage` and IndexedDB work inside a Capacitor WebView, but the data belongs to the WebView, not to your app's native storage. The OS can reclaim WebView storage when the device runs low on space, and Capacitor's own documentation recommends against relying on it for data you cannot lose. Changing the app's hostname or scheme in `capacitor.config` also changes the origin, which points the WebView at a different, empty storage.

Use them as a cache that can disappear. Use one of the native-backed options for everything else.

## Option 1: Capacitor Preferences for small settings

`@capacitor/preferences` is the official plugin for lightweight key-value data. On iOS it writes to `UserDefaults`, on Android to `SharedPreferences`, on the web to `localStorage`.

```bash
bun add @capacitor/preferences
bunx cap sync
```

```typescript
import { Preferences } from '@capacitor/preferences';

interface Settings {
  theme: 'light' | 'dark' | 'system';
  fontScale: number;
}

const DEFAULTS: Settings = { theme: 'system', fontScale: 1 };

export async function loadSettings(): Promise<Settings> {
  const { value } = await Preferences.get({ key: 'settings' });
  return value ? { ...DEFAULTS, ...JSON.parse(value) } : DEFAULTS;
}

export async function saveSettings(settings: Settings): Promise<void> {
  await Preferences.set({ key: 'settings', value: JSON.stringify(settings) });
}
```

Use it for: theme, language, onboarding flags, the last selected tab, feature toggles.

Do not use it for:

- **Secrets.** Values are stored in plaintext inside the app sandbox, and are included in device backups.
- **Large values.** `UserDefaults` and `SharedPreferences` load their whole file into memory. Large JSON blobs slow down every read and write.
- **Many keys you need to list or clear by prefix.** `keys()` returns everything, so you filter in JavaScript.

`Preferences.configure({ group: 'MyApp' })` changes the namespace the keys are stored under. The default group is `CapacitorStorage`.

## Option 2: a SQLite key-value store

Once you store cached API responses, drafts, offline queues or hundreds of entries, a SQLite file is a better home. It handles large values, writes are atomic, and you can encrypt it.

### Fast SQL KeyValueStore

`@capgo/capacitor-fast-sql` includes a `KeyValueStore` class on top of its SQLite connection. It creates a `__kv_store` table, keeps the value type, and supports multiple named stores in one database.

```bash
bun add @capgo/capacitor-fast-sql
bunx cap sync
```

Fast SQL needs two native settings (iOS local networking in `Info.plist`, a localhost cleartext rule on Android). They are covered in [How to use SQLite in a Capacitor app](/blog/how-to-use-sqlite-in-capacitor-apps/).

```typescript
import { KeyValueStore } from '@capgo/capacitor-fast-sql';

const cache = await KeyValueStore.open({ database: 'app', store: 'api-cache' });

// Objects, arrays, numbers, booleans, null and Uint8Array are stored as-is
await cache.set('user:42', { id: 42, name: 'Ada', roles: ['admin'] });
await cache.set('lastSync', Date.now());

const user = (await cache.get('user:42')) as { id: number; name: string } | null;
const exists = await cache.has('lastSync');
const allKeys = await cache.keys();

await cache.remove('user:42');
await cache.clear(); // only clears the 'api-cache' store
await cache.close();
```

API summary: `open(options)`, `fromConnection(connection, store)`, `set`, `get` (returns `null` when missing), `has`, `remove`, `clear`, `keys`, `close`.

Two patterns worth knowing:

**Several stores, one database.** The `store` option namespaces keys, so `settings`, `drafts` and `api-cache` can live side by side and be cleared independently.

**Key-value next to real tables.** If your app already uses Fast SQL for relational data, reuse the connection instead of opening a second one:

```typescript
import { FastSQL, KeyValueStore } from '@capgo/capacitor-fast-sql';

const db = await FastSQL.connect({ database: 'app' });
const drafts = await KeyValueStore.fromConnection(db, 'drafts');
// You own `db`: drafts.close() does not disconnect it
```

Later, when a key-value blob grows into something you want to query (all drafts older than a week, for example), you can move it into a proper table in the same database.

#### Encrypted key-value storage

`KeyValueStore.open` accepts the same options as `FastSQL.connect`, including `encrypted` and `encryptionKey` on iOS and Android:

```typescript
import { KeyValueStore } from '@capgo/capacitor-fast-sql';
import { NativeBiometric } from '@capgo/capacitor-native-biometric';

async function getKey(): Promise<string> {
  const { isSaved } = await NativeBiometric.isDataSaved({ key: 'kv.key' });
  if (isSaved) return (await NativeBiometric.getData({ key: 'kv.key' })).value;
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  const key = Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
  await NativeBiometric.setData({ key: 'kv.key', value: key });
  return key;
}

const secureStore = await KeyValueStore.open({
  database: 'secure-kv',
  encrypted: true,
  encryptionKey: await getKey(),
});
```

This requires SQLCipher in the native builds. The setup, plus what to do when the key is lost after a backup restore, is in [How to encrypt a SQLite database in Capacitor](/blog/encrypt-sqlite-database-capacitor/).

### @capgo/capacitor-data-storage-sqlite

`@capgo/capacitor-data-storage-sqlite` is a dedicated key-value plugin on SQLite (originally by Jean Pierre Quéau, now maintained by Capgo). Values are strings, and it adds a few extras: multiple tables per store, prefix and suffix filtering, and JSON import and export.

```bash
bun add @capgo/capacitor-data-storage-sqlite
bunx cap sync
```

```typescript
import { CapgoCapacitorDataStorageSqlite as Store } from '@capgo/capacitor-data-storage-sqlite';

await Store.openStore({ database: 'appStore', table: 'settings' });

await Store.set({ key: 'locale', value: 'fr' });
await Store.set({ key: 'profile', value: JSON.stringify({ name: 'Ada' }) });

const { value } = await Store.get({ key: 'locale' });
const { result: hasProfile } = await Store.iskey({ key: 'profile' });
const { keys } = await Store.keys();

// Switch table inside the same store
await Store.setTable({ table: 'drafts' });
const { values } = await Store.filtervalues({ filter: 'note%' }); // values whose key starts with "note"

await Store.remove({ key: 'note-1' });
await Store.clear(); // clears the current table
```

`filtervalues` applies the filter as a SQL `LIKE` pattern on the key (`note%` for a prefix, `%note` for a suffix, plain text for contains). The pattern is inserted into the SQL string, so only pass filters you control, never raw user input.

On the web it uses IndexedDB through `localforage`, which you install separately:

```bash
bun add localforage
```

About its encryption: `openStore({ encrypted: true, mode: 'secret' })` uses SQLCipher with a passphrase from `capacitor.config` under `plugins.CapgoCapacitorDataStorageSqlite.encryptionSecret`. That passphrase ships inside your app bundle, and if you do not set it the plugin falls back to a built-in default. Treat this as protection against casual file inspection, not against someone who unpacks your app. For real secrets use a key from the Keychain or Keystore, as in the Fast SQL example above.

### Fast SQL KeyValueStore or data-storage-sqlite?

- Pick **Fast SQL `KeyValueStore`** if you want typed values without manual JSON, binary values, a runtime encryption key, or already use Fast SQL for tables.
- Pick **data-storage-sqlite** if you need its table and filter features, JSON export and import, or Electron support.

## Option 3: Keychain and Keystore for secrets

Auth tokens, refresh tokens, API keys and database encryption keys belong in platform secure storage. `@capgo/capacitor-native-biometric` (8.6.0 and later) exposes a generic key-value API on top of the iOS Keychain and Android Keystore:

```bash
bun add @capgo/capacitor-native-biometric
bunx cap sync
```

```typescript
import { AccessControl, NativeBiometric } from '@capgo/capacitor-native-biometric';

// Silent read and write
await NativeBiometric.setData({ key: 'session.refreshToken', value: token });
const { value: refreshToken } = await NativeBiometric.getData({ key: 'session.refreshToken' });

// Require Face ID / Touch ID / fingerprint to read
await NativeBiometric.setData({
  key: 'wallet.pin',
  value: pin,
  accessControl: AccessControl.BIOMETRY_ANY,
});
const { value: secretPin } = await NativeBiometric.getSecureData({
  key: 'wallet.pin',
  reason: 'Confirm it is you',
});

await NativeBiometric.deleteData({ key: 'session.refreshToken' });
```

Keep values small. The plugin documents that Android Keystore-backed encryption works best under about 8 KB per value. If you need to protect a lot of data, store one random key here and use it to encrypt a SQLite database. Our post on [secure storage for offline tokens](/blog/secure-storage-for-offline-tokens-in-capacitor/) goes deeper into token handling.

Remember that Keychain items on iOS can outlive an app uninstall. On first launch after a fresh install, clear stale secrets if your app expects a clean slate (store a "first run done" flag in Preferences, which is removed on uninstall, and wipe Keychain entries when it is missing).

## Choosing: a decision list

1. **Is it a secret?** Token, password, PIN, key. Use Keychain or Keystore storage.
2. **Is it a few small settings?** Use Preferences.
3. **Is it many entries, large JSON, binary data, or cache you want to expire and clear in groups?** Use a SQLite key-value store.
4. **Do you need to filter, sort or join it?** It is not key-value data anymore. Create a table, see the [SQLite guide](/blog/how-to-use-sqlite-in-capacitor-apps/), or use a typed layer like [Kysely](/blog/kysely-capacitor-sqlite/).

## Migrating existing data between stores

Moving from `localStorage` or Preferences to a SQLite store is a one-time copy at startup. Do it before the rest of the app reads data, and record that it ran.

```typescript
import { Preferences } from '@capacitor/preferences';
import { KeyValueStore, type KeyValueValue } from '@capgo/capacitor-fast-sql';

export async function migrateToSqliteStore(): Promise<KeyValueStore> {
  const kv = await KeyValueStore.open({ database: 'app', store: 'settings' });
  if (await kv.has('__migrated_v1')) return kv;

  const { keys } = await Preferences.keys();
  for (const key of keys) {
    const { value } = await Preferences.get({ key });
    if (value === null) continue;
    let parsed: KeyValueValue = value;
    try {
      parsed = JSON.parse(value) as KeyValueValue;
    } catch {
      // keep plain strings as strings
    }
    await kv.set(key, parsed);
  }

  // Also copy from localStorage if older versions used it
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && !(await kv.has(key))) {
      await kv.set(key, localStorage.getItem(key));
    }
  }

  await kv.set('__migrated_v1', true);
  // Remove the old copies only after a release or two, once you are confident
  return kv;
}
```

Remove secrets from the old store as soon as they are copied into secure storage. Leaving a token in Preferences after moving it to the Keychain keeps the original exposure.

Because this code runs in JavaScript, you can ship it with a [Capgo live update](/live-update/). The SQLite plugin itself is native, so the release that adds it needs a store build. Ship the plugin first, then the migration code.

## Troubleshooting

**Preferences values are `null` after an update on the web.** The origin changed (port, hostname, or scheme), so `localStorage` is a different, empty store.

**Fast SQL `KeyValueStore.open` throws on iOS.** The local HTTP channel is blocked. Add `NSAllowsLocalNetworking` to `Info.plist` and rebuild the native app.

**`get` returns a string where you expected an object in data-storage-sqlite.** That plugin stores strings only. `JSON.parse` the value.

**Secrets missing after restoring a backup on a new phone.** Keystore keys and device-only Keychain items do not transfer to new hardware. Treat secure storage as a cache of credentials you can re-obtain by signing in again.

**Settings lost after reinstall but tokens still there on iOS.** Expected: Preferences is deleted with the app, Keychain items can remain. Use the first-run flag pattern above.

## Summary

- Preferences: small, non-sensitive settings.
- SQLite key-value store (Fast SQL `KeyValueStore` or `@capgo/capacitor-data-storage-sqlite`): many or large values, cache, drafts, optionally encrypted.
- Keychain or Keystore (`@capgo/capacitor-native-biometric` `setData`): secrets and encryption keys.

Plugin references: [Fast SQL docs](/docs/plugins/fast-sql/), [data-storage-sqlite docs](/docs/plugins/data-storage-sqlite/), and the [native biometric plugin page](/plugins/capacitor-native-biometric/).
