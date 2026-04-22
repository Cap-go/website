---
locale: en
---
# Using @capgo/capacitor-firebase-firestore

Capacitor plugin for Firebase Cloud Firestore.

## Install

```bash
bun add @capgo/capacitor-firebase-firestore
bunx cap sync
```

## What This Plugin Exposes

- `addDocument` - Adds a new document to a collection with the given data.
- `setDocument` - Writes to the document referred to by the specified reference. If the document does not yet exist, it will be created.
- `getDocument` - Reads the document referred to by the specified reference.
- `updateDocument` - Updates fields in the document referred to by the specified reference.

## Example Usage

### `addDocument`

Adds a new document to a collection with the given data.

```typescript
import { FirebaseFirestore } from '@capgo/capacitor-firebase-firestore';

await FirebaseFirestore.addDocument({} as AddDocumentOptions);
```

### `setDocument`

Writes to the document referred to by the specified reference. If the document does not yet exist, it will be created.

```typescript
import { FirebaseFirestore } from '@capgo/capacitor-firebase-firestore';

await FirebaseFirestore.setDocument({} as SetDocumentOptions);
```

### `getDocument`

Reads the document referred to by the specified reference.

```typescript
import { FirebaseFirestore } from '@capgo/capacitor-firebase-firestore';

await FirebaseFirestore.getDocument({} as GetDocumentOptions);
```

### `updateDocument`

Updates fields in the document referred to by the specified reference.

```typescript
import { FirebaseFirestore } from '@capgo/capacitor-firebase-firestore';

await FirebaseFirestore.updateDocument({} as UpdateDocumentOptions);
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-firebase/tree/main/packages/firestore
- Docs: /docs/plugins/firebase-firestore/
