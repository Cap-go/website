---
locale: en
---
# Using @capgo/capacitor-jw-player

Playes videos from jwplayer.com.

## Install

```bash
bun add @capgo/capacitor-jw-player
bunx cap sync
```

`bunx cap sync` copies the native code into your iOS and Android projects. Run it again after every plugin upgrade.

## Import

```typescript
import { JwPlayer } from '@capgo/capacitor-jw-player';
```

## API at a glance

| Method | Description |
| --- | --- |
| `initialize` | Initialize the JW Player. |
| `play` | Play a video. |
| `pause` | Pause the currently playing media. |
| `resume` | Resume the currently paused media. |
| `stop` | Stop the currently playing media. |
| `seekTo` | Seek to a specific position in the currently playing media. |
| `setVolume` | Set the volume level. |
| `getPosition` | Get the current position in the media. |
| `getState` | Get the current player state. |
| `setSpeed` | Set the playback speed. |
| `setPlaylistIndex` | Set the current item in the playlist by index. |
| `loadPlaylist` | Load a playlist. |
| `loadPlaylistWithItems` | Load a playlist with items. |
| `getAudioTracks` | Get available audio tracks. |
| `getCurrentAudioTrack` | Get the current audio track. |
| `setCurrentAudioTrack` | Set the current audio track. |
| `getCaptions` | Get the available captions/subtitles. |
| `getCurrentCaptions` | Get the current captions/subtitles track. |
| `setCurrentCaptions` | Set the current captions/subtitles track. |
| `currentPlaylist` | Get the current playlist. |

## Examples

### `initialize()`

Initialize the JW Player.

```typescript
import { JwPlayer } from '@capgo/capacitor-jw-player';

await JwPlayer.initialize({ licenseKey: 'license-key-123' });
```

### `play()`

Play a video.

```typescript
import { JwPlayer } from '@capgo/capacitor-jw-player';

await JwPlayer.play({
  mediaUrl: 'https://example.com',
  mediaType: 'video',
});
```

### `pause()`

Pause the currently playing media.

```typescript
import { JwPlayer } from '@capgo/capacitor-jw-player';

await JwPlayer.pause();
```

### `resume()`

Resume the currently paused media.

```typescript
import { JwPlayer } from '@capgo/capacitor-jw-player';

await JwPlayer.resume();
```

### `stop()`

Stop the currently playing media.

```typescript
import { JwPlayer } from '@capgo/capacitor-jw-player';

await JwPlayer.stop();
```

### `seekTo()`

Seek to a specific position in the currently playing media.

```typescript
import { JwPlayer } from '@capgo/capacitor-jw-player';

await JwPlayer.seekTo({ time: 1 });
```

The [API reference](/docs/plugins/jw-player/getting-started/) covers the other 14 methods.

## Full reference

- [GitHub repository](https://github.com/Cap-go/capacitor-jw-player/)
- [Documentation](/docs/plugins/jw-player/)
- [API reference](/docs/plugins/jw-player/getting-started/)

## Keep going from Using @capgo/capacitor-jw-player

If you are using **Using @capgo/capacitor-jw-player** to plan native plugin work, connect it with [@capgo/capacitor-jw-player](/docs/plugins/jw-player/) for the implementation detail in @capgo/capacitor-jw-player, [Getting Started](/docs/plugins/jw-player/getting-started/) for the implementation detail in Getting Started, [Capgo Plugin Directory](/plugins/) for the product workflow in Capgo Plugin Directory, [Capacitor Plugins by Capgo](/docs/plugins/) for the implementation detail in Capacitor Plugins by Capgo, and [Adding or Updating Plugins](/docs/contributing/adding-plugins/) for the implementation detail in Adding or Updating Plugins.
