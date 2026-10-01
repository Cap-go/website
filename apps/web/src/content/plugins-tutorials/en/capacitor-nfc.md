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

`bunx cap sync` copies the plugin's native code into your native projects. Run it again after every plugin upgrade.

## Import

```typescript
import { CapacitorNfc } from '@capgo/capacitor-nfc';
```

## API at a glance

| Method | Description |
| --- | --- |
| `startScanning` | Starts listening for NFC tags. |
| `stopScanning` | Stops the ongoing NFC scanning session. |
| `write` | Writes the provided NDEF records to the last discovered tag. |
| `erase` | Attempts to erase the last discovered tag by writing an empty NDEF message. |
| `makeReadOnly` | Attempts to make the last discovered tag read-only. |
| `share` | Shares an NDEF message with another device via peer-to-peer (Android only). |
| `unshare` | Stops sharing previously provided NDEF message (Android only). |
| `getStatus` | Returns the current NFC adapter status. |
| `showSettings` | Opens the system settings page where the user can enable NFC. |
| `isSupported` | Checks whether the device has NFC hardware support. |

## Examples

### `startScanning()`

Starts listening for NFC tags.

```typescript
import { CapacitorNfc } from '@capgo/capacitor-nfc';

await CapacitorNfc.startScanning();
```

### `stopScanning()`

Stops the ongoing NFC scanning session.

```typescript
import { CapacitorNfc } from '@capgo/capacitor-nfc';

await CapacitorNfc.stopScanning();
```

### `write()`

Writes the provided NDEF records to the last discovered tag.

```typescript
import { CapacitorNfc } from '@capgo/capacitor-nfc';

await CapacitorNfc.write({
  records: [
    {
      tnf: 1,
      type: [1],
      id: [1],
      payload: [1],
    },
  ],
});
```

### `erase()`

Attempts to erase the last discovered tag by writing an empty NDEF message.

```typescript
import { CapacitorNfc } from '@capgo/capacitor-nfc';

await CapacitorNfc.erase();
```

### `makeReadOnly()`

Attempts to make the last discovered tag read-only.

```typescript
import { CapacitorNfc } from '@capgo/capacitor-nfc';

await CapacitorNfc.makeReadOnly();
```

### `share()`

Shares an NDEF message with another device via peer-to-peer (Android only).

```typescript
import { CapacitorNfc } from '@capgo/capacitor-nfc';

await CapacitorNfc.share({
  records: [
    {
      tnf: 1,
      type: [1],
      id: [1],
      payload: [1],
    },
  ],
});
```

The table above lists all 10 methods; check the [GitHub repository](https://github.com/Cap-go/capacitor-nfc/) for the full contract of each one.

## Listen to events

`addListener` returns a handle. Call `handle.remove()` when the screen unmounts.

## Full reference

- [GitHub repository](https://github.com/Cap-go/capacitor-nfc/)
- [Documentation](/docs/plugins/nfc/)
- [API reference](/docs/plugins/nfc/getting-started/)

## Keep going from Using @capgo/capacitor-nfc

If you are using **Using @capgo/capacitor-nfc** to plan dashboard and API operations, connect it with [@capgo/capacitor-nfc](/docs/plugins/nfc/) for the implementation detail in @capgo/capacitor-nfc, [Getting Started](/docs/plugins/nfc/getting-started/) for the implementation detail in Getting Started, [API Overview](/docs/public-api/) for the implementation detail in API Overview, [Introduction](/docs/webapp/) for the implementation detail in Introduction, and [API Keys](/docs/public-api/api-keys/) for the implementation detail in API Keys.
