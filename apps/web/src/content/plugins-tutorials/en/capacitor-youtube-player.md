---
locale: en
---
# Using @capgo/capacitor-youtube-player

YouTube Player Plugin interface for Capacitor. Provides methods to control YouTube video playback in your app.

## Install

```bash
bun add @capgo/capacitor-youtube-player
bunx cap sync
```

## What This Plugin Exposes

- `initialize` - Initialize a new YouTube player instance.
- `destroy` - Destroy a player instance and free resources.
- `stopVideo` - Stop video playback and cancel loading. Use this sparingly - pauseVideo() is usually preferred.
- `playVideo` - Play the currently cued or loaded video. Final player state will be PLAYING (1).

## Example Usage

### `initialize`

Initialize a new YouTube player instance.

```typescript
import { YoutubePlayer } from '@capgo/capacitor-youtube-player';

await YoutubePlayer.initialize({
  playerId: 'my-player',
  videoId: 'dQw4w9WgXcQ',
  playerSize: { width: 640, height: 360 },
  privacyEnhanced: true
});
```

### `destroy`

Destroy a player instance and free resources.

```typescript
import { YoutubePlayer } from '@capgo/capacitor-youtube-player';

await YoutubePlayer.destroy({} as PlayerIdOptions);
```

### `stopVideo`

Stop video playback and cancel loading. Use this sparingly - pauseVideo() is usually preferred.

```typescript
import { YoutubePlayer } from '@capgo/capacitor-youtube-player';

await YoutubePlayer.stopVideo({} as PlayerIdOptions);
```

### `playVideo`

Play the currently cued or loaded video. Final player state will be PLAYING (1).

```typescript
import { YoutubePlayer } from '@capgo/capacitor-youtube-player';

await YoutubePlayer.playVideo({} as PlayerIdOptions);
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-youtube-player/
- Docs: /docs/plugins/youtube-player/

## Keep going from Using @capgo/capacitor-youtube-player

If you are using **Using @capgo/capacitor-youtube-player** to plan native media and interface behavior, connect it with [@capgo/capacitor-youtube-player](/docs/plugins/youtube-player/) for the implementation detail in @capgo/capacitor-youtube-player, [Getting Started](/docs/plugins/youtube-player/getting-started/) for the implementation detail in Getting Started, [Using @capgo/capacitor-live-activities](/plugins/capacitor-live-activities/) for the native capability in Using @capgo/capacitor-live-activities, [@capgo/capacitor-live-activities](/docs/plugins/live-activities/) for the implementation detail in @capgo/capacitor-live-activities, and [Using @capgo/capacitor-video-player](/plugins/capacitor-video-player/) for the native capability in Using @capgo/capacitor-video-player.
