---
slug: google-play-contacts-permission-policy-capacitor
title: "Google Play Contacts Policy 2027: Capacitor Guide"
description: "Google Play's Contacts Permissions policy limits READ_CONTACTS from January 2027. Learn what changes for Capacitor apps and how to use the Contact Picker."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-10-01T09:00:00.000Z
updated_at: 2026-10-01T03:59:51.000Z
head_image: /blog-images/privacy-manifest-for-capacitor-apps-guide.webp
head_image_alt: "Privacy illustration for the Google Play contacts permission policy in Capacitor apps"
keywords: google play contacts policy 2027, READ_CONTACTS policy, android contact picker capacitor, android 17 contacts permission, capacitor contacts plugin, play console contacts declaration
tag: Android, Google Play, Capacitor
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "When does the Google Play Contacts Permissions policy take effect?"
    answer: "Google announced it on April 15, 2026. Compliance is mandatory from January 27, 2027 for apps that target Android 17 (API level 37) or later. Play Console started prompting apps that declare READ_CONTACTS to submit a declaration in September 2026."
  - question: "Does the policy apply if my app targets Android 16?"
    answer: "The policy scope is apps targeting Android 17 (API 37) or higher. Google Play's target API level requirements will push every app there over time, so plan the migration now rather than when your target level must change."
  - question: "Can I still pick a contact without READ_CONTACTS?"
    answer: "Yes. The Android Contact Picker returns only the contacts and fields the user selects, without READ_CONTACTS. With @capgo/capacitor-contacts, call pickContacts with the property option to get one phone number, email or postal address with no permission."
  - question: "Does this policy affect iOS?"
    answer: "No. It is a Google Play policy. On iOS, the system contact picker already works without the contacts permission, and @capgo/capacitor-contacts pickContact and pickContacts never require it."
  - question: "What use cases can keep READ_CONTACTS?"
    answer: "Google lists core features such as contact management, dialers and SMS, call screening, CRM, accessibility, friend matching, backup and restore, and keyboards or autocomplete. Inviting, referring, sharing or choosing someone to pay are expected to use the Contact Picker instead."
---

Google Play's Contacts Permissions policy means that, from January 27, 2027, apps targeting Android 17 (API level 37) or later may only request `READ_CONTACTS` if the Android Contact Picker cannot support a core feature, and must justify it with a Play Console declaration. For most Capacitor apps that read contacts to invite a friend, share a file or fill in a phone number, the fix is to switch to the Contact Picker and remove the permission. This guide explains the policy, shows how to do that with [`@capgo/capacitor-contacts`](/plugins/capacitor-contacts/), and covers what to do if you really need the full address book.

## What the policy says

Google announced the policy on April 15, 2026, as part of a set of privacy updates. The key points, from the Play Console Help pages:

- **Scope:** apps that target Android 17 (API 37) or higher and request `READ_CONTACTS`.
- **Rule:** you may only request `READ_CONTACTS` if the Android Contact Picker is not sufficient for a core feature of your app.
- **Declaration:** apps that keep the permission must fill a declaration in Play Console describing which features need it and why the picker is not enough.
- **Timeline:** Play Console began prompting apps that declare `READ_CONTACTS` in September 2026. Compliance is mandatory on January 27, 2027. Google mentions a 30 day self-service extension in Play Console.
- **Exemptions:** private apps and enterprise device management apps are out of scope.
- **Data:** contacts data is personal and sensitive under the User Data policy, and you may not publish non-public contacts data without authorization from the people it describes.

### Use cases that can keep READ_CONTACTS

Google lists core features such as contact management apps, dialers and SMS apps, call history and call screening, CRM, accessibility features, personal assistants, friend matching, backup and restore, and keyboards or autocomplete.

### Use cases that should switch to the picker

Inviting or referring someone, sharing files, collaborating, or choosing a contact to send money to. If that is why your app reads contacts, the declaration will not be accepted. Use the picker.

## What changes on Android 17

Android 17 ships a new system Contact Picker. Apps get a temporary, read-only session URI that only exposes the contacts and fields the user selected, without any permission. For apps targeting Android 17, the system automatically upgrades the classic `Intent.ACTION_PICK` contacts intent to this new picker. Apps can also request specific data fields (phone, email, postal address) and multiple selection through a new intent action.

On older Android versions, picking a specific data row (for example a phone number) through the contacts picker has always returned a URI the app can read without `READ_CONTACTS`. That is what makes a permission-free flow possible on every Android version.

## Why "pick a contact" used to need READ_CONTACTS

Many Capacitor plugins implement "pick contact" by opening the picker for a whole contact, then querying the address book for that contact's phone numbers and emails. That second query needs `READ_CONTACTS`. So even apps that only wanted one phone number ended up declaring the permission, which is exactly what the policy targets.

The fix is to ask the picker for the specific field you need, so the result URI already carries the data.

## Pick a phone, email or address without READ_CONTACTS

[`@capgo/capacitor-contacts`](/docs/plugins/contacts/) added a `property` option in version 8.1.0. When set, Android opens the picker against the phone, email or postal address table and reads the selected row from the granted URI. No `READ_CONTACTS` is needed on any Android version. On iOS, the system picker never needs a contacts permission.

```bash
bun add @capgo/capacitor-contacts
bunx cap sync
```

```ts
import { CapacitorContacts, ContactProperty } from '@capgo/capacitor-contacts';

export async function pickPhoneNumber(): Promise<string | undefined> {
  const { contacts } = await CapacitorContacts.pickContacts({
    property: ContactProperty.PhoneNumber,
  });
  const picked = contacts[0];
  return picked?.phoneNumbers?.[0]?.value;
}

export async function pickEmail(): Promise<string | undefined> {
  const { contacts } = await CapacitorContacts.pickContacts({
    property: ContactProperty.EmailAddress,
  });
  return contacts[0]?.emailAddresses?.[0]?.value;
}
```

With `property`, the result contains the contact `id`, `displayName` and the selected property only. Multiple selection is ignored, property picking always returns one value. If the user cancels, check for an empty array.

The plugin does not declare `READ_CONTACTS` or `WRITE_CONTACTS` in its own manifest, so if you only use property picking, your merged manifest stays clean.

## When you still need READ_CONTACTS

These plugin methods read the address book and keep requiring the permission:

- `pickContacts()` or `pickContact()` without `property`, when you want the full contact record
- `getContacts()`, `getContactById()`, `countContacts()`
- `getGroups()`, `getGroupById()`, `getAccounts()`

If your app is a CRM, a backup tool or a friend matching feature, that is a legitimate core use. Add the permission yourself and file the declaration:

```xml
<!-- android/app/src/main/AndroidManifest.xml -->
<uses-permission android:name="android.permission.READ_CONTACTS" />
```

```ts
import { CapacitorContacts } from '@capgo/capacitor-contacts';

const perm = await CapacitorContacts.requestPermissions({ permissions: ['readContacts'] });
if (perm.readContacts === 'granted' || perm.readContacts === 'limited') {
  const { contacts } = await CapacitorContacts.getContacts({
    fields: ['displayName', 'phoneNumbers'],
    limit: 200,
    offset: 0,
  });
  console.log(contacts.length);
}
```

The policy targets `READ_CONTACTS`. Writing contacts with `WRITE_CONTACTS` (for `createContact`, `updateContactById`, `deleteContactById`) is not the subject of this policy, but only add it if you use those methods.

## Migration plan for a Capacitor app

1. **Audit the merged manifest.** Build your release and open `android/app/build/intermediates/merged_manifest/` (or use Android Studio's Merged Manifest tab). Some plugins add `READ_CONTACTS` without you noticing. If a plugin adds it and you do not need it, remove it with `tools:node="remove"`:

   ```xml
   <manifest xmlns:android="http://schemas.android.com/apk/res/android"
       xmlns:tools="http://schemas.android.com/tools">
       <uses-permission android:name="android.permission.READ_CONTACTS" tools:node="remove" />
   </manifest>
   ```

2. **List every place you touch contacts.** For each one, decide: picker with a property, or full address book.
3. **Replace invite and share flows** with `pickContacts({ property })`.
4. **Keep the permission only for core features**, and prepare the declaration text: which feature, why the picker is not enough, a video if the feature is hard to find.
5. **Ship a native build.** Manifest and plugin changes need a new Play release. If you build in CI, [Capgo Build](/native-build/) can produce signed Android builds, and the [Android keystore generator](/tools/android-keystore-generator/) helps if you are setting up signing for the first time.
6. **Ship UI changes over the air.** Once the new native plugin is live, wording and flow tweaks around the picker can go out through [Capgo live updates](/live-update/).

## Migrating from another contacts plugin

If you use `@capacitor-community/contacts` (8.0.0 at the time of writing), its Android `pickContact` requests the contacts permission group before opening the picker, then reads the full contact from the address book. There is no property mode. The method names also differ (`getContact` vs `getContactById`, projection objects vs a `fields` array). Our [comparison of the community contacts plugin and the Capgo plugin](/blog/capacitor-community-contacts-alternative/) maps each call.

If you still use a Cordova contacts plugin inside Capacitor, now is a good time to replace it. See [migrating from Cordova to Capacitor](/blog/migrating-cordova-to-capacitor/).

## Troubleshooting

**The picker returns a contact with no phone number.** You called `pickContacts()` without `property` and the app has no `READ_CONTACTS`. Only `id` and `displayName` (and on Android 17+, picker-granted fields) come back. Add `property`.

**Play Console still says the app declares READ_CONTACTS.** A library adds it. Check the merged manifest and remove it with `tools:node="remove"`. Also check older releases in other tracks, each active artifact counts.

**Declaration rejected.** Invites, referrals and sharing are listed as cases for the picker. Rework the feature or show clearly why the full list is core (for example friend matching that runs against the whole address book).

**iOS asks for contacts permission.** You call a method that reads the address book. Picking never needs it. Remove `NSContactsUsageDescription` if you only pick.

## Key dates

| Date | What happens |
| --- | --- |
| April 15, 2026 | Policy announced |
| September 2026 | Play Console prompts apps declaring `READ_CONTACTS` to file a declaration |
| January 27, 2027 | Compliance mandatory for apps targeting Android 17 (API 37) or later |

Check the Play Console Help page for the policy before you submit, Google can update deadlines and wording.
