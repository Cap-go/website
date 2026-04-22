---
locale: en
---
# Using @capgo/capacitor-speech-recognition

Capacitor plugin for comprehensive on-device speech recognition with live partial results.

## Install

```bash
bun add @capgo/capacitor-speech-recognition
bunx cap sync
```

## What This Plugin Exposes

- `available` - Checks whether the native speech recognition service is usable on the current device.
- `isOnDeviceRecognitionAvailable` - Checks whether the platform's newer on-device recognition path is available for the selected locale.
- `start` - Begins capturing audio and transcribing speech.
- `stop` - Stops listening and tears down native resources.

## Example Usage

### `available`

Checks whether the native speech recognition service is usable on the current device.

```typescript
import { SpeechRecognition } from '@capgo/capacitor-speech-recognition';

await SpeechRecognition.available();
```

### `isOnDeviceRecognitionAvailable`

Checks whether the platform's newer on-device recognition path is available for the selected locale.

```typescript
import { SpeechRecognition } from '@capgo/capacitor-speech-recognition';

await SpeechRecognition.isOnDeviceRecognitionAvailable();
```

### `start`

Begins capturing audio and transcribing speech.

```typescript
import { SpeechRecognition } from '@capgo/capacitor-speech-recognition';

await SpeechRecognition.start();
```

### `stop`

Stops listening and tears down native resources.

```typescript
import { SpeechRecognition } from '@capgo/capacitor-speech-recognition';

await SpeechRecognition.stop();
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-speech-recognition/
- Docs: /docs/plugins/speech-recognition/
