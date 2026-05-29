---
locale: en
---
# Using @capgo/capacitor-nativegeocoder

Capacitor plugin for native forward and reverse geocoding.

## Install

```bash
npm install @capgo/capacitor-nativegeocoder
npx cap sync
```

## What This Plugin Exposes

- `reverseGeocode` - Convert latitude and longitude to an address.
- `forwardGeocode` - Convert an address to latitude and longitude.

## Example Usage

### `reverseGeocode`

Convert latitude and longitude to an address.

```typescript
import { NativeGeocoder } from '@capgo/capacitor-nativegeocoder';

await NativeGeocoder.reverseGeocode({} as ReverseOptions);
```

### `forwardGeocode`

Convert an address to latitude and longitude.

```typescript
import { NativeGeocoder } from '@capgo/capacitor-nativegeocoder';

await NativeGeocoder.forwardGeocode({} as ForwardOptions);
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-nativegeocoder/
- Docs: /docs/plugins/nativegeocoder/

## Keep going from Using @capgo/capacitor-nativegeocoder

If you are using **Using @capgo/capacitor-nativegeocoder** to plan native plugin work, connect it with [@capgo/capacitor-nativegeocoder](/docs/plugins/nativegeocoder/) for the implementation detail in @capgo/capacitor-nativegeocoder, [Getting Started](/docs/plugins/nativegeocoder/getting-started/) for the implementation detail in Getting Started, [Capgo Plugin Directory](/plugins/) for the product workflow in Capgo Plugin Directory, [Capacitor Plugins by Capgo](/docs/plugins/) for the implementation detail in Capacitor Plugins by Capgo, and [Adding or Updating Plugins](/docs/contributing/adding-plugins/) for the implementation detail in Adding or Updating Plugins.
