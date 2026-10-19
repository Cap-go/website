---
slug: capacitor-community-contacts-alternative
title: "Capacitor Community Contacts Alternative"
description: "An alternative to the @capacitor-community/contacts plugin: update contacts, groups, pagination and permission-free picking, with a full migration guide."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-10-01T09:00:00.000Z
updated_at: 2026-10-01T03:59:51.000Z
head_image: /capgo_plugins.webp
head_image_alt: "Capgo plugins illustration for a Capacitor contacts plugin comparison"
keywords: capacitor community contacts alternative, @capacitor-community/contacts, capacitor contacts plugin, update contact capacitor, ionic contacts plugin, @capgo/capacitor-contacts
tag: Alternatives, Capacitor, Migration
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "Can @capacitor-community/contacts update an existing contact?"
    answer: "No. Version 8.0.0 exposes getContact, getContacts, createContact, deleteContact and pickContact. To change a contact you would delete and recreate it, which changes its ID. @capgo/capacitor-contacts has updateContactById, which keeps the ID."
  - question: "Is @capgo/capacitor-contacts free?"
    answer: "Yes. It is open source and published on npm. Version 8 targets Capacitor 8."
  - question: "Can I migrate one screen at a time?"
    answer: "Yes. Both plugins register under different native names (Contacts and CapacitorContacts), so they can be installed side by side during migration. Remove the old one once every call site is moved, and check that your manifest still declares the permissions you need."
  - question: "Do I need READ_CONTACTS to pick a contact on Android?"
    answer: "Not with @capgo/capacitor-contacts if you pass the property option to pickContacts. It returns one phone number, email or postal address without any permission. The community plugin requests the contacts permission before opening its picker."
---

If you need a Capacitor community contacts alternative, the most complete drop-in replacement is [`@capgo/capacitor-contacts`](/plugins/capacitor-contacts/). It covers what `@capacitor-community/contacts` does (read, create, delete and pick contacts) and adds updating a contact without changing its ID, pagination, groups, accounts, native contact screens, and permission-free picking on Android, which matters for Google Play's 2027 contacts policy. This guide compares both and maps every call so you can migrate in an afternoon.

## Why look for an alternative

`@capacitor-community/contacts` is maintained and has a Capacitor 8 release. It is a fine choice for simple read and create flows. Teams usually outgrow it for these reasons:

- **No update method.** You can create and delete contacts, but not edit one. Delete and recreate gives the contact a new ID, which breaks any reference you stored and can lose data the plugin does not read.
- **No pagination.** `getContacts` returns the whole address book in one call. On a device with 5,000 contacts and photos, that is slow and memory heavy.
- **Picking needs the permission on Android.** The Android `pickContact` requests the contacts permission group before opening the picker, then reads the contact from the address book. Under [Google Play's Contacts Permissions policy](/blog/google-play-contacts-permission-policy-capacitor/), apps targeting Android 17 can only keep `READ_CONTACTS` for core features.
- **No groups, accounts or native screens.** No way to list groups, choose the account a new contact is saved to, or open the system "new contact" form.

## Feature comparison

| Feature | @capacitor-community/contacts 8.0 | @capgo/capacitor-contacts 8.1 |
| --- | --- | --- |
| Read one / all contacts | `getContact`, `getContacts` | `getContactById`, `getContacts` |
| Field selection | `projection` object | `fields` array |
| Pagination | No | `limit`, `offset` |
| Count contacts | No | `countContacts` |
| Create | `createContact` | `createContact` |
| Update in place | No | `updateContactById` |
| Delete | `deleteContact` | `deleteContactById` |
| Pick one contact | `pickContact` | `pickContact` |
| Pick several | No | `pickContacts({ multiple: true })` |
| Pick one phone/email/address without permission | No | `pickContacts({ property })` |
| Groups | No | `getGroups`, `getGroupById`, `createGroup`, `deleteGroupById` |
| Accounts | No | `getAccounts` |
| Native create / view / edit screens | No | `displayCreateContact`, `displayContactById`, `displayUpdateContactById` |
| Separate read and write permission states | No (single alias) | `readContacts`, `writeContacts` |
| iOS limited access state | `limited` | `limited` |
| Open settings | No | `openSettings` |

## Install

```bash
bun add @capgo/capacitor-contacts
bunx cap sync
```

The plugin does not add permissions to your Android manifest. Add only what you use:

```xml
<!-- Needed for getContacts, getContactById, countContacts, groups, accounts -->
<uses-permission android:name="android.permission.READ_CONTACTS" />
<!-- Needed for createContact, updateContactById, deleteContactById, groups writes -->
<uses-permission android:name="android.permission.WRITE_CONTACTS" />
```

On iOS, add `NSContactsUsageDescription` to `Info.plist` if you read or write the address book. Picking does not need it.

## Migration guide, call by call

### Permissions

```ts
// Before
import { Contacts } from '@capacitor-community/contacts';
const perm = await Contacts.requestPermissions();
if (perm.contacts !== 'granted') return;

// After
import { CapacitorContacts } from '@capgo/capacitor-contacts';
const status = await CapacitorContacts.requestPermissions({ permissions: ['readContacts'] });
if (status.readContacts !== 'granted' && status.readContacts !== 'limited') {
  await CapacitorContacts.openSettings();
  return;
}
```

On iOS 18 and later, users can grant access to a subset of contacts. The plugin reports that as `limited`. Treat it as granted and only expect the shared contacts.

### Read all contacts

```ts
// Before: whole address book, projection object
const { contacts } = await Contacts.getContacts({
  projection: { name: true, phones: true, emails: true },
});
const first = contacts[0];
console.log(first.name?.display, first.phones?.[0]?.number);

// After: fields array, paginated
const pageSize = 200;
let offset = 0;
for (;;) {
  const { contacts } = await CapacitorContacts.getContacts({
    fields: ['displayName', 'givenName', 'familyName', 'phoneNumbers', 'emailAddresses'],
    limit: pageSize,
    offset,
  });
  render(contacts);
  if (contacts.length < pageSize) break;
  offset += pageSize;
}

declare function render(list: unknown[]): void;
```

Use `countContacts()` first if you want to show a progress bar.

### Read one contact

```ts
// Before
const { contact } = await Contacts.getContact({
  contactId: id,
  projection: { name: true, phones: true },
});

// After
const { contact } = await CapacitorContacts.getContactById({
  id,
  fields: ['displayName', 'phoneNumbers'],
});
if (!contact) console.log('Not found');
```

### Create a contact

```ts
// Before
const { contactId } = await Contacts.createContact({
  contact: {
    name: { given: 'Ada', family: 'Lovelace' },
    phones: [{ type: PhoneType.Mobile, number: '+44 20 7946 0000' }],
    emails: [{ type: EmailType.Work, address: 'ada@example.com' }],
  },
});

// After
const { id } = await CapacitorContacts.createContact({
  contact: {
    givenName: 'Ada',
    familyName: 'Lovelace',
    phoneNumbers: [{ type: 'MOBILE', value: '+44 20 7946 0000' }],
    emailAddresses: [{ type: 'WORK', value: 'ada@example.com' }],
  },
});
```

`displayName` is read only in the Capgo plugin. Write `givenName` and `familyName`, and the device formats the display name.

### Update a contact (new)

```ts
await CapacitorContacts.updateContactById({
  id,
  contact: {
    givenName: 'Ada',
    familyName: 'King',
    jobTitle: 'Analyst',
    phoneNumbers: [{ type: 'MOBILE', value: '+44 20 7946 0000' }],
  },
});
```

The ID stays the same, so any reference you saved still works. Read the contact first and send back the fields you want to keep, so you do not clear something by accident.

If you prefer to let the user edit, open the system editor:

```ts
await CapacitorContacts.displayUpdateContactById({ id });
```

### Delete a contact

```ts
// Before
await Contacts.deleteContact({ contactId: id });

// After
await CapacitorContacts.deleteContactById({ id });
```

### Pick a contact

```ts
// Before: requests the contacts permission on Android first
const { contact } = await Contacts.pickContact({
  projection: { name: true, phones: true },
});

// After: one phone number, no permission on Android or iOS
import { ContactProperty } from '@capgo/capacitor-contacts';

const { contacts } = await CapacitorContacts.pickContacts({
  property: ContactProperty.PhoneNumber,
});
const phone = contacts[0]?.phoneNumbers?.[0]?.value;
```

If you need the full contact record from the picker, call `pickContact()` without `property`. On Android that returns the full contact only when `READ_CONTACTS` is granted.

## Field mapping

| Community payload | Capgo `Contact` |
| --- | --- |
| `contactId` | `id` |
| `name.display` | `displayName` (read only) |
| `name.given` / `middle` / `family` | `givenName` / `middleName` / `familyName` |
| `name.prefix` / `suffix` | `namePrefix` / `nameSuffix` |
| `organization.company` | `organizationName` |
| `organization.jobTitle` | `jobTitle` |
| `birthday` `{ day, month, year }` | `birthday` `{ day, month, year }` |
| `note` | `note` |
| `phones[].number` | `phoneNumbers[].value` |
| `emails[].address` | `emailAddresses[].value` |
| `urls[]` (strings) | `urlAddresses[].value` |
| `postalAddresses[].region` / `postcode` | `postalAddresses[].state` / `postalCode` |
| `image.base64String` | `photo` (base64 string) |

Type values change too: the Capgo plugin uses uppercase strings such as `'MOBILE'`, `'HOME'`, `'WORK'` for phones and emails.

## Migrate one screen at a time

The two plugins register under different native names (`Contacts` and `CapacitorContacts`), so they can be installed together while you move call sites. A small adapter keeps the rest of your app unchanged:

```ts
import { CapacitorContacts } from '@capgo/capacitor-contacts';

export interface AppContact {
  id: string;
  name: string;
  phones: string[];
}

export async function listContacts(limit = 200, offset = 0): Promise<AppContact[]> {
  const { contacts } = await CapacitorContacts.getContacts({
    fields: ['displayName', 'phoneNumbers'],
    limit,
    offset,
  });
  return contacts.map((c) => ({
    id: c.id ?? '',
    name: c.displayName ?? '',
    phones: (c.phoneNumbers ?? []).map((p) => p.value),
  }));
}
```

When the last call site is moved, remove the community plugin, run `bunx cap sync`, and check the merged Android manifest to confirm only the permissions you need remain.

## Troubleshooting

**`getContacts` returns an empty list on iOS.** The user granted limited access and shared no contacts, or denied access. Check `readContacts` and offer `openSettings()`.

**Created contact does not show in a specific account on Android.** Pass an `account` (from `getAccounts()`) in the contact you create.

**Photos make lists slow.** Do not request `photo` in list views. Load it with `getContactById` when the user opens a contact.

**Play Console flags `READ_CONTACTS`.** Move invite and share flows to `pickContacts({ property })` and remove the permission if nothing else needs it.

## Ship it

Swapping plugins is a native change, so it needs a store build. [Capgo Build](/native-build/) can produce iOS and Android builds in the cloud. After that, fixes to your contact screens are JavaScript and can go out with [Capgo live updates](/live-update/). The full API is in the [contacts plugin docs](/docs/plugins/contacts/).
