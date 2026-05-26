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

## Keep going from Using @capgo/capacitor-speech-recognition

If you are using **Using @capgo/capacitor-speech-recognition** to plan dashboard and API operations, connect it with [@capgo/capacitor-speech-recognition](/docs/plugins/speech-recognition/) for the implementation detail in @capgo/capacitor-speech-recognition, [Getting Started](/docs/plugins/speech-recognition/getting-started/) for the implementation detail in Getting Started, [API Overview](/docs/public-api/) for the implementation detail in API Overview, [Introduction](/docs/webapp/) for the implementation detail in Introduction, and [API Keys](/docs/public-api/api-keys/) for the implementation detail in API Keys.
