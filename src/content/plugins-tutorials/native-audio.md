# Using @capgo/native-audio Package

This tutorial will guide you on how to use the `@capgo/native-audio` package for playing sounds in your Capacitor application.

## Step 1: Installation

To install the package, open your terminal and run the following command:

```bash
npm install @capgo/native-audio
```

or if you prefer using yarn:

```bash
yarn add @capgo/native-audio
```

## Step 2: Sync Native Files

After installing the package, sync the native files with the following command:

```bash
npx cap sync
```

## Step 3: Configuration

No additional configuration is required for this plugin.

## Step 4: Usage

To use the `@capgo/native-audio` package, you need to import the `NativeAudio` object from the package and use its methods.

Here's an example of how to preload an audio file and play it:

```typescript
import { NativeAudio } from '@capgo/native-audio';

// Preload the audio file
NativeAudio.preload({
  assetId: 'fire',
  assetPath: 'assets/sounds/fire.mp3',
  audioChannelNum: 1,
  isUrl: false,
});

// Play the loaded audio file
NativeAudio.play({
  assetId: 'fire',
});
```

The `preload` method is used to load an audio file into memory, and the `play` method is used to play the loaded audio file.

Other supported methods include `pause`, `resume`, `loop`, `stop`, `unload`, `setVolume`, `getDuration`, and `getCurrentTime`. You can refer to the [official documentation](https://github.com/Cap-go/native-audio/blob/main/README.md) for more details on these methods.

That's it! You have now learned how to use the `@capgo/native-audio` package to play sounds in your Capacitor application.