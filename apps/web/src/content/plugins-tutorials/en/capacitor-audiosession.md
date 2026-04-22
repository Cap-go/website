---
locale: en
---
# Using @capgo/capacitor-audio-session

iOS-only plugin to query and control the audio session output and listen to route changes and interruptions.

## Install

```bash
bun add @capgo/capacitor-audio-session
bunx cap sync
```

## What This Plugin Exposes

- `currentOutputs` - Get the current active audio output routes.
- `overrideOutput` - Override the current audio output route.

## Example Usage

### `currentOutputs`

Get the current active audio output routes.

```typescript
import { AudioSession } from '@capgo/capacitor-audio-session';

await AudioSession.currentOutputs();
```

### `overrideOutput`

Override the current audio output route.

```typescript
import { AudioSession } from '@capgo/capacitor-audio-session';

await AudioSession.overrideOutput({} as OutputOverrideType);
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-audiosession/
- Docs: /docs/plugins/audiosession/
