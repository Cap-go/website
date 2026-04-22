---
locale: en
---
# Using @capgo/capacitor-widget-kit

Capacitor bridge for an iOS-first WidgetKit / Live Activities plugin.

## Install

```bash
bun add @capgo/capacitor-widget-kit
bunx cap sync
```

## What This Plugin Exposes

- `areActivitiesSupported` - Check whether the native template activity bridge can run on the current device.
- `startTemplateActivity` - Persist a generic SVG template activity and start the matching native Live Activity bridge.
- `updateTemplateActivity` - Replace part or all of the stored activity definition/state.
- `endTemplateActivity` - End a running activity while optionally persisting one last state snapshot.

## Example Usage

### `areActivitiesSupported`

Check whether the native template activity bridge can run on the current device.

```typescript
import { CapgoWidgetKit } from '@capgo/capacitor-widget-kit';

await CapgoWidgetKit.areActivitiesSupported();
```

### `startTemplateActivity`

Persist a generic SVG template activity and start the matching native Live Activity bridge.

```typescript
import { CapgoWidgetKit } from '@capgo/capacitor-widget-kit';

await CapgoWidgetKit.startTemplateActivity({} as StartTemplateActivityOptions);
```

### `updateTemplateActivity`

Replace part or all of the stored activity definition/state.

```typescript
import { CapgoWidgetKit } from '@capgo/capacitor-widget-kit';

await CapgoWidgetKit.updateTemplateActivity({} as UpdateTemplateActivityOptions);
```

### `endTemplateActivity`

End a running activity while optionally persisting one last state snapshot.

```typescript
import { CapgoWidgetKit } from '@capgo/capacitor-widget-kit';

await CapgoWidgetKit.endTemplateActivity({} as EndTemplateActivityOptions);
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-widget-kit/
- Docs: /docs/plugins/widget-kit/
