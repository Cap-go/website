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
