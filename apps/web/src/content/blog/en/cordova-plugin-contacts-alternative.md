---
slug: cordova-plugin-contacts-alternative
title: "cordova-plugin-contacts Alternative for Capacitor"
description: "cordova-plugin-contacts alternative for Capacitor: read, pick, create, update and delete device contacts with @capgo/capacitor-contacts."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-11-18T09:00:00.000Z
updated_at: 2026-11-18T09:00:00.000Z
head_image: /migrating-cordova-to-capacitor.webp
head_image_alt: "Illustration of migrating a Cordova app to Capacitor, used for a contacts plugin guide"
keywords: cordova-plugin-contacts alternative, capacitor contacts, @capgo/capacitor-contacts, navigator.contacts, pick contact capacitor
tag: Alternatives, Capacitor, Migration
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "What is the best cordova-plugin-contacts alternative in Capacitor?"
    answer: "@capgo/capacitor-contacts maps navigator.contacts find, pick, save and remove to typed promises, adds updateContactById, pagination, groups, native contact UIs, and Android property picking without READ_CONTACTS when you only need one phone, email or address."
  - question: "Is cordova-plugin-contacts still maintained?"
    answer: "The Apache Cordova README states the plugin is deprecated and the community will not fix new issues. npm lists version 3.0.1 with a registry modified date of 14 June 2022."
  - question: "How do Cordova ContactFindOptions filters map to Capacitor?"
    answer: "Cordova find applies a case insensitive filter on selected fields in the native query. @capgo/capacitor-contacts getContacts returns pages from the device store; apply your own filter on displayName or phoneNumbers in JavaScript, or narrow fields with the fields option to keep payloads small."
  - question: "Where are the docs?"
    answer: "https://capgo.app/docs/plugins/contacts/, npm @capgo/capacitor-contacts, and GitHub Cap-go/capacitor-contacts."
---

The practical **cordova-plugin-contacts alternative** for a Capacitor app is [`@capgo/capacitor-contacts`](/plugins/capacitor-contacts/). It replaces the global `navigator.contacts` object and callback style `Contact.save` / `Contact.remove` calls with `CapacitorContacts` promises, adds `updateContactById` so you do not delete and recreate contacts to change them, and supports `pickContacts` with an optional `property` on Android when Google Play limits broad contacts access. This guide lists npm facts, install steps, usage, and an API map for your Cordova to Capacitor move.

## Why leave cordova-plugin-contacts in Capacitor

**cordova-plugin-contacts** on npm is version **3.0.1**. The registry `modified` timestamp is **14 June 2022**. The source lives at [apache/cordova-plugin-contacts](https://github.com/apache/cordova-plugin-contacts/). The README includes an explicit deprecation notice: the Cordova community will not do more work on the plugin.

The Apache README documents these `navigator.contacts` APIs:

- `navigator.contacts.create()` returns a `Contact` object (synchronous)
- `navigator.contacts.find(contactFields, success, error, options)` with `ContactFindOptions` (`filter`, `multiple`, `desiredFields`, Android `hasPhoneNumber`)
- `navigator.contacts.pickContact(success, error)`
- `Contact.prototype.save(success, error)` and `Contact.prototype.remove(success, error)`
- `Contact` fields such as `name`, `phoneNumbers`, `emails`, `addresses` using `ContactField` and `ContactName` objects

In a Capacitor codebase the Cordova plugin still means `deviceready`, `cordova.exec`, and Android lifecycle quirks when `pickContact` returns through `resume`.

[`@capgo/capacitor-contacts`](https://www.npmjs.com/package/@capgo/capacitor-contacts) latest on npm is **8.1.12** with a `modified` date of **12 November 2026**. `src/definitions.ts` documents `getContacts`, `getContactById`, `createContact`, `updateContactById`, `deleteContactById`, `pickContact`, `pickContacts`, `checkPermissions`, `requestPermissions`, groups, accounts, and native `displayCreateContact` / `displayUpdateContactById` helpers. Capgo ships fixes on an open source cadence where a human still reviews, tests and merges 50+ pull requests daily.

## Install

```bash
bun add @capgo/capacitor-contacts
bunx cap sync
```

On iOS add `NSContactsUsageDescription` to `Info.plist`. On Android declare `READ_CONTACTS` and `WRITE_CONTACTS` only when your flow reads or writes the full address book. For detail-only picking see the `property` option in the plugin docs.

## Usage example

```ts
import { CapacitorContacts, ContactProperty } from '@capgo/capacitor-contacts';

export async function pickOnePhoneNumber() {
  const { contacts } = await CapacitorContacts.pickContacts({
    property: ContactProperty.PhoneNumber,
  });
  return contacts[0]?.phoneNumbers?.[0]?.value;
}

export async function listFirstPage() {
  const status = await CapacitorContacts.requestPermissions({ permissions: ['readContacts'] });
  if (status.readContacts !== 'granted' && status.readContacts !== 'limited') {
    throw new Error('Contacts permission denied');
  }
  const { contacts } = await CapacitorContacts.getContacts({
    limit: 50,
    offset: 0,
    fields: ['id', 'displayName', 'phoneNumbers'],
  });
  return contacts;
}
```

Import `ContactProperty` from `@capgo/capacitor-contacts` when you use `property` picking.

## Migrating from Cordova to Capacitor

```js
// Before (Cordova find)
var options = new ContactFindOptions();
options.filter = 'Bob';
options.multiple = true;
navigator.contacts.find(
  [navigator.contacts.fieldType.displayName],
  (contacts) => console.log(contacts.length),
  (err) => console.error(err),
  options,
);
```

```ts
// After (Capacitor)
import { CapacitorContacts } from '@capgo/capacitor-contacts';

const { contacts } = await CapacitorContacts.getContacts({
  fields: ['displayName', 'phoneNumbers'],
  limit: 200,
});
const matches = contacts.filter((c) =>
  c.displayName?.toLowerCase().includes('bob'),
);
console.log(matches.length);
```

```js
// Before (Cordova save)
var contact = navigator.contacts.create();
contact.name = new ContactName();
contact.name.givenName = 'Jane';
contact.phoneNumbers = [new ContactField('mobile', '555-0100', true)];
contact.save(onSuccess, onError);
```

```ts
// After (Capacitor)
await CapacitorContacts.createContact({
  contact: {
    givenName: 'Jane',
    phoneNumbers: [{ value: '555-0100', type: 'MOBILE', isPrimary: true }],
  },
});
```

### API mapping table

| cordova-plugin-contacts | @capgo/capacitor-contacts |
| --- | --- |
| `navigator.contacts.create()` | Build a `Contact` object in TypeScript, then `createContact({ contact })` |
| `navigator.contacts.find(fields, ...)` | `getContacts({ fields, limit, offset })` plus app side filter (no Cordova `filter` string on device) |
| `ContactFindOptions.multiple` | `getContacts` pagination or `pickContacts({ multiple: true })` |
| `navigator.contacts.pickContact(...)` | `pickContact()` or `pickContacts()` |
| `contact.save(...)` | `createContact` when `id` is empty, `updateContactById` when `id` is set |
| `contact.remove(...)` | `deleteContactById({ id })` |
| `ContactName` / `ContactField` | Typed `givenName`, `phoneNumbers`, `emailAddresses`, `postalAddresses` |
| Not in Cordova | `countContacts`, `getGroups`, `createGroup`, `displayCreateContact`, `pickContacts({ property })` |
| Cordova plugin install | `bun add @capgo/capacitor-contacts` plus `bunx cap sync` |

## Links and next steps

- Plugin docs: [https://capgo.app/docs/plugins/contacts/](/docs/plugins/contacts/)
- Marketing page: [/plugins/capacitor-contacts/](/plugins/capacitor-contacts/)
- npm: [https://www.npmjs.com/package/@capgo/capacitor-contacts](https://www.npmjs.com/package/@capgo/capacitor-contacts)
- GitHub: [https://github.com/Cap-go/capacitor-contacts/](https://github.com/Cap-go/capacitor-contacts/)
- Cordova upstream: [https://github.com/apache/cordova-plugin-contacts](https://github.com/apache/cordova-plugin-contacts)

Contacts permission flows ship in the native binary, so plan a store build after you swap plugins. Use [Capgo Build](/native-build/) for cloud builds, then ship picker and list UI tweaks with [Capgo live updates](/live-update/) where the logic stays in JavaScript. For the full platform move, read the [Cordova to Capacitor migration guide](/blog/migrating-cordova-to-capacitor/).