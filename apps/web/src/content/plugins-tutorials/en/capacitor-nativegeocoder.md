---
locale: en
---
# Using @capgo/nativegeocoder

Capacitor plugin for native forward and reverse geocoding.

## Install

```bash
bun add @capgo/nativegeocoder
bunx cap sync
```

## What This Plugin Exposes

- `reverseGeocode` - Convert latitude and longitude to an address.
- `forwardGeocode` - Convert an address to latitude and longitude.

## Example Usage

### `reverseGeocode`

Convert latitude and longitude to an address.

```typescript
import { NativeGeocoder } from '@capgo/nativegeocoder';

await NativeGeocoder.reverseGeocode({} as ReverseOptions);
```

### `forwardGeocode`

Convert an address to latitude and longitude.

```typescript
import { NativeGeocoder } from '@capgo/nativegeocoder';

await NativeGeocoder.forwardGeocode({} as ForwardOptions);
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-nativegeocoder/
- Docs: /docs/plugins/nativegeocoder/
