---
locale: en
---
# Using @capgo/keep-awake Package

The `@capgo/keep-awake` package allows you to prevent the device screen from dimming or sleeping. This is useful for video players, navigation apps, games, presentations, and any app that needs the screen to stay on. In this tutorial, we will guide you through the process of installing and using this package in your Capacitor app.

## Installation

To install the `@capgo/keep-awake` package, run the following command in your project's root directory:

```bash
npm install @capgo/keep-awake
npx cap sync
```

## iOS Setup

The `@capgo/keep-awake` package works out of the box on iOS, so no additional setup is required.

## Android Setup

The `@capgo/keep-awake` package works out of the box on Android. No permissions are required.

## Web Setup

On the web, the plugin uses the Screen Wake Lock API. Not all browsers support this API, so always check with `isSupported()` first.

## API

The `@capgo/keep-awake` package provides the following API methods:

### keepAwake()

This method prevents the device from dimming the screen.

```typescript
import { KeepAwake } from '@capgo/keep-awake';

async function enableKeepAwake() {
  await KeepAwake.keepAwake();
  console.log('Screen will stay on');
}
```

### allowSleep()

This method allows the device to dim the screen (disables keep awake).

```typescript
import { KeepAwake } from '@capgo/keep-awake';

async function disableKeepAwake() {
  await KeepAwake.allowSleep();
  console.log('Screen can now dim');
}
```

### isSupported()

This method checks if the keep awake feature is supported on the current platform.

```typescript
import { KeepAwake } from '@capgo/keep-awake';

async function checkSupport() {
  const { isSupported } = await KeepAwake.isSupported();
  console.log('Keep awake supported:', isSupported);
}
```

### isKeptAwake()

This method checks if the device is currently being kept awake.

```typescript
import { KeepAwake } from '@capgo/keep-awake';

async function checkStatus() {
  const { isKeptAwake } = await KeepAwake.isKeptAwake();
  console.log('Screen is kept awake:', isKeptAwake ? 'YES' : 'NO');
}
```

### getPluginVersion()

This method returns the native plugin version.

```typescript
import { KeepAwake } from '@capgo/keep-awake';

async function getVersion() {
  const { version } = await KeepAwake.getPluginVersion();
  console.log('Plugin version:', version);
}
```

## Complete Example - Video Player

Here's a complete example showing how to use keep awake with a video player:

```typescript
import { KeepAwake } from '@capgo/keep-awake';

class VideoPlayerController {
  private isPlaying = false;

  async initialize() {
    const { isSupported } = await KeepAwake.isSupported();
    if (!isSupported) {
      console.warn('Keep awake not supported - screen may dim during playback');
    }
  }

  async onPlay() {
    this.isPlaying = true;
    try {
      await KeepAwake.keepAwake();
      console.log('Screen will stay on during playback');
    } catch (error) {
      console.error('Failed to enable keep awake:', error);
    }
  }

  async onPause() {
    this.isPlaying = false;
    try {
      await KeepAwake.allowSleep();
      console.log('Screen can now dim');
    } catch (error) {
      console.error('Failed to disable keep awake:', error);
    }
  }

  async onStop() {
    this.isPlaying = false;
    await KeepAwake.allowSleep();
  }

  // Call this when component is destroyed
  async cleanup() {
    if (this.isPlaying) {
      await KeepAwake.allowSleep();
    }
  }
}

// Usage
const player = new VideoPlayerController();
await player.initialize();

// When video starts playing
await player.onPlay();

// When video is paused
await player.onPause();

// When leaving the page
await player.cleanup();
```

## Complete Example - Presentation Mode Toggle

Here's an example of a presentation mode toggle button:

```typescript
import { KeepAwake } from '@capgo/keep-awake';

class PresentationMode {
  private enabled = false;

  async toggle(): Promise<boolean> {
    const { isSupported } = await KeepAwake.isSupported();

    if (!isSupported) {
      throw new Error('Presentation mode not available on this device');
    }

    if (this.enabled) {
      await KeepAwake.allowSleep();
      this.enabled = false;
    } else {
      await KeepAwake.keepAwake();
      this.enabled = true;
    }

    return this.enabled;
  }

  async getStatus(): Promise<boolean> {
    const { isKeptAwake } = await KeepAwake.isKeptAwake();
    this.enabled = isKeptAwake;
    return this.enabled;
  }

  async disable() {
    if (this.enabled) {
      await KeepAwake.allowSleep();
      this.enabled = false;
    }
  }
}

// Usage with a button
const presentationMode = new PresentationMode();

document.getElementById('toggleBtn')?.addEventListener('click', async () => {
  try {
    const isEnabled = await presentationMode.toggle();
    updateUI(isEnabled);
  } catch (error) {
    alert(error.message);
  }
});

function updateUI(isEnabled: boolean) {
  const btn = document.getElementById('toggleBtn');
  if (btn) {
    btn.textContent = isEnabled ? 'Disable Presentation Mode' : 'Enable Presentation Mode';
  }
}
```

## Best Practices

1. **Always check support first** - Especially on web, not all browsers support the Screen Wake Lock API.

2. **Remember to allow sleep** - Always call `allowSleep()` when you no longer need the screen to stay on to conserve battery.

3. **Handle component lifecycle** - Make sure to disable keep awake when your component or page is destroyed.

4. **Handle errors gracefully** - Wrap keep awake calls in try-catch blocks.

5. **Consider battery impact** - Keeping the screen on drains battery faster. Only use when necessary.

That's it! You have successfully learned how to use the `@capgo/keep-awake` package in your Capacitor app to prevent the screen from dimming.
