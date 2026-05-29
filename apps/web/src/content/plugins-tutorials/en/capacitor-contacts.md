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

## What This Plugin Exposes

- `countContacts` - Count the total number of contacts on the device.
- `createContact` - Create a new contact programmatically.
- `createGroup` - Create a new contact group.
- `deleteContactById` - Delete a contact by ID.

## Example Usage

### `countContacts`

Count the total number of contacts on the device.

```typescript
import { CapacitorContacts } from '@capgo/capacitor-contacts';

await CapacitorContacts.countContacts();
```

### `createContact`

Create a new contact programmatically.

```typescript
import { CapacitorContacts } from '@capgo/capacitor-contacts';

await CapacitorContacts.createContact({} as CreateContactOptions);
```

### `createGroup`

Create a new contact group.

```typescript
import { CapacitorContacts } from '@capgo/capacitor-contacts';

await CapacitorContacts.createGroup({} as CreateGroupOptions);
```

### `deleteContactById`

Delete a contact by ID.

```typescript
import { CapacitorContacts } from '@capgo/capacitor-contacts';

await CapacitorContacts.deleteContactById({} as DeleteContactByIdOptions);
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-contacts/
- Docs: /docs/plugins/contacts/

## Keep going from Using @capgo/capacitor-contacts

If you are using **Using @capgo/capacitor-contacts** to plan dashboard and API operations, connect it with [@capgo/capacitor-contacts](/docs/plugins/contacts/) for the implementation detail in @capgo/capacitor-contacts, [Getting Started](/docs/plugins/contacts/getting-started/) for the implementation detail in Getting Started, [API Overview](/docs/public-api/) for the implementation detail in API Overview, [Introduction](/docs/webapp/) for the implementation detail in Introduction, and [API Keys](/docs/public-api/api-keys/) for the implementation detail in API Keys.
