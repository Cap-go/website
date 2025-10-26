---
locale: en
---
# Using @capgo/native-audio

The `@capgo/native-audio` package provides high-performance native audio engine for games and apps. Here is a tutorial on how to use this package.

## Installation

To install the package, run the following command:

```bash
npm install @capgo/native-audio
npx cap sync
```

## Usage

### Preload Audio

```typescript
import { NativeAudio } from '@capgo/native-audio';

await NativeAudio.preload({
  assetId: 'click',
  assetPath: 'sounds/click.mp3',
});
```

### Play Audio

```typescript
import { NativeAudio } from '@capgo/native-audio';

await NativeAudio.play({
  assetId: 'click',
});
```

### Stop Audio

```typescript
import { NativeAudio } from '@capgo/native-audio';

await NativeAudio.stop({
  assetId: 'click',
});
```

That's it! You have successfully integrated native audio into your Capacitor app.
