---
locale: en
---
# Using @capgo/capacitor-gtm

The main interface for the Google Tag Manager plugin.

## Install

```bash
bun add @capgo/capacitor-gtm
bunx cap sync
```

`bunx cap sync` copies the native code into your iOS and Android projects. Run it again after every plugin upgrade.

## Import

```typescript
import { GoogleTagManager } from '@capgo/capacitor-gtm';
```

## API at a glance

| Method | Description |
| --- | --- |
| `initialize` | Initializes Google Tag Manager with the specified container ID. |
| `push` | Pushes an event to the Google Tag Manager dataLayer. |
| `setUserProperty` | Sets a user property in the Google Tag Manager dataLayer. |
| `getValue` | Gets a value from the Google Tag Manager dataLayer. Searches through the dataLayer for the most recent value of the specified key. |
| `reset` | Resets the Google Tag Manager instance and clears all data. This will remove all data from the dataLayer and require re-initialization. |

## Examples

### `initialize()`

Initializes Google Tag Manager with the specified container ID.

```typescript
import { GoogleTagManager } from '@capgo/capacitor-gtm';

await GoogleTagManager.initialize({ containerId: 'container-id-123' });
```

### `push()`

Pushes an event to the Google Tag Manager dataLayer.

```typescript
import { GoogleTagManager } from '@capgo/capacitor-gtm';

await GoogleTagManager.push({
  event: 'purchase',
  parameters: {
    value: 99.99,
    currency: 'USD'
  }
});
```

### `setUserProperty()`

Sets a user property in the Google Tag Manager dataLayer.

```typescript
import { GoogleTagManager } from '@capgo/capacitor-gtm';

await GoogleTagManager.setUserProperty({
  key: 'user_type',
  value: 'premium'
});
```

### `getValue()`

Gets a value from the Google Tag Manager dataLayer. Searches through the dataLayer for the most recent value of the specified key.

```typescript
import { GoogleTagManager } from '@capgo/capacitor-gtm';

const result = await GoogleTagManager.getValue({ key: 'key-123' });
console.log(result);
```

### `reset()`

Resets the Google Tag Manager instance and clears all data. This will remove all data from the dataLayer and require re-initialization.

```typescript
import { GoogleTagManager } from '@capgo/capacitor-gtm';

await GoogleTagManager.reset();
```

## Full reference

- [GitHub repository](https://github.com/Cap-go/capacitor-gtm/)
- [Documentation](/docs/plugins/gtm/)
- [API reference](/docs/plugins/gtm/getting-started/)

## Keep going from Using @capgo/capacitor-gtm

If you are using **Using @capgo/capacitor-gtm** to plan native plugin work, connect it with [@capgo/capacitor-gtm](/docs/plugins/gtm/) for the implementation detail in @capgo/capacitor-gtm, [Getting Started](/docs/plugins/gtm/getting-started/) for the implementation detail in Getting Started, [Capgo Plugin Directory](/plugins/) for the product workflow in Capgo Plugin Directory, [Capacitor Plugins by Capgo](/docs/plugins/) for the implementation detail in Capacitor Plugins by Capgo, and [Adding or Updating Plugins](/docs/contributing/adding-plugins/) for the implementation detail in Adding or Updating Plugins.
