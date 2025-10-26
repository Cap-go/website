---
locale: en
---
# Using @capgo/ivs-player

The `@capgo/ivs-player` package provides Amazon IVS player integration for ultra-low latency live streaming. Here is a tutorial on how to use this package.

## Installation

To install the package, run the following command:

```bash
npm install @capgo/ivs-player
npx cap sync
```

## Usage

### Create Player

```typescript
import { IvsPlayer } from '@capgo/ivs-player';

await IvsPlayer.create({
  url: 'https://your-stream-url.m3u8',
});
```

### Start Playback

```typescript
import { IvsPlayer } from '@capgo/ivs-player';

await IvsPlayer.start();
```

### Pause Playback

```typescript
import { IvsPlayer } from '@capgo/ivs-player';

await IvsPlayer.pause();
```

That's it! You have successfully integrated Amazon IVS player into your Capacitor app.
