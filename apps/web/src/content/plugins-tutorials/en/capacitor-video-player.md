---
locale: en
---
# Using @capgo/capacitor-video-player

Capacitor plugin to play video in native player.

## Install

```bash
bun add @capgo/capacitor-video-player
bunx cap sync
```

`bunx cap sync` copies the plugin's native code into your native projects. Run it again after every plugin upgrade.

## Import

```typescript
import { VideoPlayer } from '@capgo/capacitor-video-player';
```

## API at a glance

| Method | Description |
| --- | --- |
| `initPlayer` | Initialize a video player. |
| `isPlaying` | Return if a given playerId is playing. |
| `play` | Play the current video from a given playerId. |
| `pause` | Pause the current video from a given playerId. |
| `getDuration` | Get the duration of the current video from a given playerId. |
| `getCurrentTime` | Get the current time of the current video from a given playerId. |
| `setCurrentTime` | Set the current time to seek the current video to from a given playerId. |
| `getVolume` | Get the volume of the current video from a given playerId. |
| `setVolume` | Set the volume of the current video to from a given playerId. |
| `getMuted` | Get the muted of the current video from a given playerId. |
| `setMuted` | Set the muted of the current video to from a given playerId. |
| `setRate` | Set the rate of the current video from a given playerId. |
| `getRate` | Get the rate of the current video from a given playerId. |
| `stopAllPlayers` | Stop all players playing. |
| `showController` | Show controller. |
| `isControllerIsFullyVisible` | isControllerIsFullyVisible. |
| `exitPlayer` | Exit player. |
| `hidePlayer` | Hide the currently presented player UI without stopping playback (native fullscreen). |
| `showPlayer` | Show again a previously hidden player UI (native fullscreen). |

## Examples

### `initPlayer()`

Initialize a video player.

```typescript
import { VideoPlayer } from '@capgo/capacitor-video-player';

const result = await VideoPlayer.initPlayer({ mode: 'mode' });
console.log(result);
```

### `isPlaying()`

Return if a given playerId is playing.

```typescript
import { VideoPlayer } from '@capgo/capacitor-video-player';

const result = await VideoPlayer.isPlaying({ playerId: 'player-id-123' });
console.log(result);
```

### `play()`

Play the current video from a given playerId.

```typescript
import { VideoPlayer } from '@capgo/capacitor-video-player';

const result = await VideoPlayer.play({ playerId: 'player-id-123' });
console.log(result);
```

### `pause()`

Pause the current video from a given playerId.

```typescript
import { VideoPlayer } from '@capgo/capacitor-video-player';

const result = await VideoPlayer.pause({ playerId: 'player-id-123' });
console.log(result);
```

### `getDuration()`

Get the duration of the current video from a given playerId.

```typescript
import { VideoPlayer } from '@capgo/capacitor-video-player';

const result = await VideoPlayer.getDuration({ playerId: 'player-id-123' });
console.log(result);
```

### `getCurrentTime()`

Get the current time of the current video from a given playerId.

```typescript
import { VideoPlayer } from '@capgo/capacitor-video-player';

const result = await VideoPlayer.getCurrentTime({ playerId: 'player-id-123' });
console.log(result);
```

The table above lists all 19 methods; check the [GitHub repository](https://github.com/Cap-go/capacitor-video-player/) for the full contract of each one.

## Full reference

- [GitHub repository](https://github.com/Cap-go/capacitor-video-player/)
- [Documentation](/docs/plugins/video-player/)
- [API reference](/docs/plugins/video-player/getting-started/)

## Keep going from Using @capgo/capacitor-video-player

If you are using **Using @capgo/capacitor-video-player** to plan native media and interface behavior, connect it with [@capgo/capacitor-video-player](/docs/plugins/video-player/) for the implementation detail in @capgo/capacitor-video-player, [Getting Started](/docs/plugins/video-player/getting-started/) for the implementation detail in Getting Started, [Using @capgo/capacitor-live-activities](/plugins/capacitor-live-activities/) for the native capability in Using @capgo/capacitor-live-activities, [@capgo/capacitor-live-activities](/docs/plugins/live-activities/) for the implementation detail in @capgo/capacitor-live-activities, and [Using @capgo/capacitor-native-navigation](/plugins/capacitor-native-navigation/) for the native capability in Using @capgo/capacitor-native-navigation.
