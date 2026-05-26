---
locale: en
---
# Using @capgo/capacitor-mux-player

Native Mux Player SDK to play video on IOS and Android.

## Install

```bash
bun add @capgo/capacitor-mux-player
bunx cap sync
```

## What This Plugin Exposes

- `play` - Launch the native Mux Player in fullscreen and begin playback.
- `dismiss` - Dismiss the player if it is visible.
- `isActive` - Returns whether the player is currently being displayed.

## Example Usage

### `play`

Launch the native Mux Player in fullscreen and begin playback.

```typescript
import { MuxPlayer } from '@capgo/capacitor-mux-player';

await MuxPlayer.play({} as MuxPlayOptions);
```

### `dismiss`

Dismiss the player if it is visible.

```typescript
import { MuxPlayer } from '@capgo/capacitor-mux-player';

await MuxPlayer.dismiss();
```

### `isActive`

Returns whether the player is currently being displayed.

```typescript
import { MuxPlayer } from '@capgo/capacitor-mux-player';

await MuxPlayer.isActive();
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-mux-player/
- Docs: /docs/plugins/mux-player/

## Keep going from Using @capgo/capacitor-mux-player

If you are using **Using @capgo/capacitor-mux-player** to plan native media and interface behavior, connect it with [@capgo/capacitor-mux-player](/docs/plugins/mux-player/) for the implementation detail in @capgo/capacitor-mux-player, [Getting Started](/docs/plugins/mux-player/getting-started/) for the implementation detail in Getting Started, [Using @capgo/capacitor-live-activities](/plugins/capacitor-live-activities/) for the native capability in Using @capgo/capacitor-live-activities, [@capgo/capacitor-live-activities](/docs/plugins/live-activities/) for the implementation detail in @capgo/capacitor-live-activities, and [Using @capgo/capacitor-video-player](/plugins/capacitor-video-player/) for the native capability in Using @capgo/capacitor-video-player.
