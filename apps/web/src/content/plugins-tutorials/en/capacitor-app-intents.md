---
locale: en
---
# Using @capgo/capacitor-app-intents

Capgo App Intents plugin interface.

## Install

```bash
bun add @capgo/capacitor-app-intents
bunx cap sync
```

`bunx cap sync` copies the plugin's native code into your native projects. Run it again after every plugin upgrade.

## Import

```typescript
import { CapgoAppIntents } from '@capgo/capacitor-app-intents';
```

## API at a glance

| Method | Description |
| --- | --- |
| `getPendingInvocations` | Return invocations queued before JavaScript was ready. |
| `removePendingInvocation` | Remove one pending invocation after your handler processes it. |
| `setEntityCatalog` | Persist an entity catalog for a given type string. |
| `setHomeScreenShortcutItems` | Replace Home Screen quick actions (UIApplicationShortcutItems). |
| `indexSpotlightEntities` | Index Spotlight items for your app domain. |
| `removeSpotlightEntities` | Remove Spotlight items by id. |
| `performAppleSchemaTemplate` | Queue a JavaScript handler for an alpha Apple schema template. |

## Examples

### `getPendingInvocations()`

Return invocations queued before JavaScript was ready.

```typescript
import { CapgoAppIntents } from '@capgo/capacitor-app-intents';

const result = await CapgoAppIntents.getPendingInvocations();
console.log(result);
```

### `removePendingInvocation()`

Remove one pending invocation after your handler processes it.

```typescript
import { CapgoAppIntents } from '@capgo/capacitor-app-intents';

await CapgoAppIntents.removePendingInvocation({ id: 'id-123' });
```

### `setEntityCatalog()`

Persist an entity catalog for a given type string.

```typescript
import { CapgoAppIntents } from '@capgo/capacitor-app-intents';

await CapgoAppIntents.setEntityCatalog({
  type: 'type',
  entries: [
    {
      id: 'id-123',
      title: 'Hello from Capacitor',
    },
  ],
});
```

### `setHomeScreenShortcutItems()`

Replace Home Screen quick actions (UIApplicationShortcutItems).

```typescript
import { CapgoAppIntents } from '@capgo/capacitor-app-intents';

await CapgoAppIntents.setHomeScreenShortcutItems({
  items: [
    {
      type: 'type',
      title: 'Hello from Capacitor',
    },
  ],
});
```

### `indexSpotlightEntities()`

Index Spotlight items for your app domain.

```typescript
import { CapgoAppIntents } from '@capgo/capacitor-app-intents';

await CapgoAppIntents.indexSpotlightEntities({
  entities: [
    {
      id: 'id-123',
      title: 'Hello from Capacitor',
      actionName: 'action',
    },
  ],
});
```

### `removeSpotlightEntities()`

Remove Spotlight items by id.

```typescript
import { CapgoAppIntents } from '@capgo/capacitor-app-intents';

await CapgoAppIntents.removeSpotlightEntities({ ids: ['ids'] });
```

The table above lists the 7 core methods. Listener and version helpers, and the full contract of each method, are documented in the [GitHub repository](https://github.com/Cap-go/capacitor-app-intents/).

## Listen to events

`addListener` returns a handle. Call `handle.remove()` when the screen unmounts, or `CapgoAppIntents.removeAllListeners()` to clear every listener.

## Full reference

- [GitHub repository](https://github.com/Cap-go/capacitor-app-intents/)
- [Documentation](/docs/plugins/app-intents/)
- [API reference](/docs/plugins/app-intents/getting-started/)
