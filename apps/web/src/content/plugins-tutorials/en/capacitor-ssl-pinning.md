---
locale: en
---
# Using @capgo/capacitor-ssl-pinning

Capacitor API for inspecting SSL pinning configuration.

## Install

```bash
bun add @capgo/capacitor-ssl-pinning
bunx cap sync
```

`bunx cap sync` copies the plugin's native code into your native projects. Run it again after every plugin upgrade.

## Import

```typescript
import { SSLPinning } from '@capgo/capacitor-ssl-pinning';
```

## API at a glance

| Method | Description |
| --- | --- |
| `getConfiguration` | Returns the active native configuration visible to the plugin. |

## Examples

### `getConfiguration()`

Returns the active native configuration visible to the plugin.

```typescript
import { SSLPinning } from '@capgo/capacitor-ssl-pinning';

const result = await SSLPinning.getConfiguration();
console.log(result);
```

## Full reference

- [GitHub repository](https://github.com/Cap-go/capacitor-ssl-pinning/)
- [Documentation](/docs/plugins/ssl-pinning/)
- [API reference](/docs/plugins/ssl-pinning/getting-started/)

## Keep going from Using @capgo/capacitor-ssl-pinning

If you are using **Using @capgo/capacitor-ssl-pinning** to plan security and compliance, connect it with [@capgo/capacitor-ssl-pinning](/docs/plugins/ssl-pinning/) for the implementation detail in @capgo/capacitor-ssl-pinning, [Getting Started](/docs/plugins/ssl-pinning/getting-started/) for the implementation detail in Getting Started, [Encryption](/docs/live-updates/encryption/) for the implementation detail in Encryption, [Compliance](/docs/live-updates/compliance/) for the implementation detail in Compliance, and [Capgo Security Scanner](/security-scanner/) for the product workflow in Capgo Security Scanner.
