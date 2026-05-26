---
locale: en
---
# Using @capgo/capacitor-nfc

Public API surface for the Capacitor NFC plugin.

## Install

```bash
bun add @capgo/capacitor-nfc
bunx cap sync
```

## What This Plugin Exposes

- `startScanning` - Starts listening for NFC tags.
- `stopScanning` - Stops the ongoing NFC scanning session.
- `write` - Writes the provided NDEF records to the last discovered tag.
- `erase` - Attempts to erase the last discovered tag by writing an empty NDEF message.

## Example Usage

### `startScanning`

Starts listening for NFC tags.

```typescript
import { CapacitorNfc } from '@capgo/capacitor-nfc';

await CapacitorNfc.startScanning();
```

### `stopScanning`

Stops the ongoing NFC scanning session.

```typescript
import { CapacitorNfc } from '@capgo/capacitor-nfc';

await CapacitorNfc.stopScanning();
```

### `write`

Writes the provided NDEF records to the last discovered tag.

```typescript
import { CapacitorNfc } from '@capgo/capacitor-nfc';

await CapacitorNfc.write({} as WriteTagOptions);
```

### `erase`

Attempts to erase the last discovered tag by writing an empty NDEF message.

```typescript
import { CapacitorNfc } from '@capgo/capacitor-nfc';

await CapacitorNfc.erase();
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-nfc/
- Docs: /docs/plugins/nfc/

## Keep going from Using @capgo/capacitor-nfc

If you are using **Using @capgo/capacitor-nfc** to plan dashboard and API operations, connect it with [@capgo/capacitor-nfc](/docs/plugins/nfc/) for the implementation detail in @capgo/capacitor-nfc, [Getting Started](/docs/plugins/nfc/getting-started/) for the implementation detail in Getting Started, [API Overview](/docs/public-api/) for the implementation detail in API Overview, [Introduction](/docs/webapp/) for the implementation detail in Introduction, and [API Keys](/docs/public-api/api-keys/) for the implementation detail in API Keys.
