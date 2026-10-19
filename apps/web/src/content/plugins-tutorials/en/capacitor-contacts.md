---
locale: en
---
# Using @capgo/capacitor-contacts

Capacitor Contacts Plugin interface for managing device contacts.

## Install

```bash
bun add @capgo/capacitor-contacts
bunx cap sync
```

`bunx cap sync` copies the plugin's native code into your native projects. Run it again after every plugin upgrade.

## Import

```typescript
import { CapacitorContacts } from '@capgo/capacitor-contacts';
```

## API at a glance

| Method | Description |
| --- | --- |
| `countContacts` | Count the total number of contacts on the device. |
| `createContact` | Create a new contact programmatically. |
| `createGroup` | Create a new contact group. |
| `deleteContactById` | Delete a contact by ID. |
| `deleteGroupById` | Delete a group by ID. |
| `displayContactById` | Display a contact using the native contact viewer. |
| `displayCreateContact` | Display the native create contact UI. |
| `displayUpdateContactById` | Display the native update contact UI for a specific contact. |
| `getAccounts` | Get all accounts available on the device. |
| `getContactById` | Get a specific contact by ID. |
| `getContacts` | Get all contacts from the device. |
| `getGroupById` | Get a specific group by ID. |
| `getGroups` | Get all contact groups. |
| `isAvailable` | Check if contacts are available on the device. |
| `isSupported` | Check if the plugin is supported on the current platform. |
| `openSettings` | Open the device's contacts settings. |
| `pickContact` | Pick a single contact using the native contact picker. |
| `pickContacts` | Pick one or more contacts using the native contact picker. |
| `updateContactById` | Update an existing contact by ID. |
| `checkPermissions` | Check the current permission status for contacts. |
| `requestPermissions` | Request permissions to access contacts. |

## Examples

### `countContacts()`

Count the total number of contacts on the device.

```typescript
import { CapacitorContacts } from '@capgo/capacitor-contacts';

const result = await CapacitorContacts.countContacts();
console.log(result);
```

### `createContact()`

Create a new contact programmatically.

```typescript
import { CapacitorContacts } from '@capgo/capacitor-contacts';

const result = await CapacitorContacts.createContact({ contact: {} });
console.log(result);
```

### `createGroup()`

Create a new contact group.

```typescript
import { CapacitorContacts } from '@capgo/capacitor-contacts';

const result = await CapacitorContacts.createGroup({ group: { name: 'example' } });
console.log(result);
```

### `deleteContactById()`

Delete a contact by ID.

```typescript
import { CapacitorContacts } from '@capgo/capacitor-contacts';

await CapacitorContacts.deleteContactById({ id: 'id-123' });
```

### `deleteGroupById()`

Delete a group by ID.

```typescript
import { CapacitorContacts } from '@capgo/capacitor-contacts';

await CapacitorContacts.deleteGroupById({ id: 'id-123' });
```

### `displayContactById()`

Display a contact using the native contact viewer.

```typescript
import { CapacitorContacts } from '@capgo/capacitor-contacts';

await CapacitorContacts.displayContactById({ id: 'id-123' });
```

The table above lists the 21 core methods. Listener and version helpers, and the full contract of each method, are documented in the [GitHub repository](https://github.com/Cap-go/capacitor-contacts/).

## Full reference

- [GitHub repository](https://github.com/Cap-go/capacitor-contacts/)
- [Documentation](/docs/plugins/contacts/)
- [API reference](/docs/plugins/contacts/getting-started/)

## Keep going from Using @capgo/capacitor-contacts

If you are using **Using @capgo/capacitor-contacts** to plan dashboard and API operations, connect it with [@capgo/capacitor-contacts](/docs/plugins/contacts/) for the implementation detail in @capgo/capacitor-contacts, [Getting Started](/docs/plugins/contacts/getting-started/) for the implementation detail in Getting Started, [API Overview](/docs/public-api/) for the implementation detail in API Overview, [Introduction](/docs/webapp/) for the implementation detail in Introduction, and [API Keys](/docs/public-api/api-keys/) for the implementation detail in API Keys.
