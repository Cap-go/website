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

## Keep going from Using @capgo/capacitor-audio-session

If you are using **Using @capgo/capacitor-audio-session** to plan native media and interface behavior, connect it with [@capgo/capacitor-audio-session](/docs/plugins/audiosession/) for the implementation detail in @capgo/capacitor-audio-session, [Getting Started](/docs/plugins/audiosession/getting-started/) for the implementation detail in Getting Started, [Using @capgo/capacitor-live-activities](/plugins/capacitor-live-activities/) for the native capability in Using @capgo/capacitor-live-activities, [@capgo/capacitor-live-activities](/docs/plugins/live-activities/) for the implementation detail in @capgo/capacitor-live-activities, and [Using @capgo/capacitor-video-player](/plugins/capacitor-video-player/) for the native capability in Using @capgo/capacitor-video-player.
