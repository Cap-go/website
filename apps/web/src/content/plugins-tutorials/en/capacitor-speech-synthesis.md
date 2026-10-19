---
locale: en
---
# Using @capgo/capacitor-speech-synthesis

Speech Synthesis Plugin for synthesizing speech from text.

## Install

```bash
bun add @capgo/capacitor-speech-synthesis
bunx cap sync
```

`bunx cap sync` copies the plugin's native code into your native projects. Run it again after every plugin upgrade.

## Import

```typescript
import { SpeechSynthesis } from '@capgo/capacitor-speech-synthesis';
```

## API at a glance

| Method | Description |
| --- | --- |
| `speak` | Speaks the given text with specified options. The utterance is added to the speech queue. |
| `synthesizeToFile` | Synthesizes speech to an audio file (Android/iOS only). Returns the file path where the audio was saved. |
| `cancel` | Cancels all queued utterances and stops current speech. |
| `pause` | Pauses speech immediately. |
| `resume` | Resumes paused speech. |
| `isSpeaking` | Checks if speech synthesis is currently speaking. |
| `isAvailable` | Checks if speech synthesis is available on the device. |
| `getVoices` | Gets all available voices. |
| `getLanguages` | Gets all available languages. |
| `isLanguageAvailable` | Checks if a specific language is available. |
| `isVoiceAvailable` | Checks if a specific voice is available. |
| `initialize` | Initializes the speech synthesis engine (iOS optimization). This can reduce latency for the first speech request. |
| `activateAudioSession` | Activates the audio session with a specific category (iOS only). |
| `deactivateAudioSession` | Deactivates the audio session (iOS only). |

## Examples

### `speak()`

Speaks the given text with specified options. The utterance is added to the speech queue.

```typescript
import { SpeechSynthesis } from '@capgo/capacitor-speech-synthesis';

const result = await SpeechSynthesis.speak({
  text: 'Hello, world!',
  language: 'en-US',
  rate: 1.0,
  pitch: 1.0,
  volume: 1.0,
  queueStrategy: 'Add'
});
console.log('Utterance ID:', result.utteranceId);
```

### `synthesizeToFile()`

Synthesizes speech to an audio file (Android/iOS only). Returns the file path where the audio was saved.

```typescript
import { SpeechSynthesis } from '@capgo/capacitor-speech-synthesis';

const result = await SpeechSynthesis.synthesizeToFile({
  text: 'Hello, world!',
  language: 'en-US'
});
console.log('Audio file saved at:', result.filePath);
```

### `cancel()`

Cancels all queued utterances and stops current speech.

```typescript
import { SpeechSynthesis } from '@capgo/capacitor-speech-synthesis';

await SpeechSynthesis.cancel();
```

### `pause()`

Pauses speech immediately.

```typescript
import { SpeechSynthesis } from '@capgo/capacitor-speech-synthesis';

await SpeechSynthesis.pause();
```

### `resume()`

Resumes paused speech.

```typescript
import { SpeechSynthesis } from '@capgo/capacitor-speech-synthesis';

await SpeechSynthesis.resume();
```

### `isSpeaking()`

Checks if speech synthesis is currently speaking.

```typescript
import { SpeechSynthesis } from '@capgo/capacitor-speech-synthesis';

const { isSpeaking } = await SpeechSynthesis.isSpeaking();
console.log('Is speaking:', isSpeaking);
```

The table above lists the 14 core methods. Listener and version helpers, and the full contract of each method, are documented in the [GitHub repository](https://github.com/Cap-go/capacitor-speech-synthesis/).

## Listen to events

`addListener` returns a handle. Call `handle.remove()` when the screen unmounts, or `SpeechSynthesis.removeAllListeners()` to clear every listener.

## Full reference

- [GitHub repository](https://github.com/Cap-go/capacitor-speech-synthesis/)
- [Documentation](/docs/plugins/speech-synthesis/)
- [API reference](/docs/plugins/speech-synthesis/getting-started/)

## Keep going from Using @capgo/capacitor-speech-synthesis

If you are using **Using @capgo/capacitor-speech-synthesis** to plan native plugin work, connect it with [@capgo/capacitor-speech-synthesis](/docs/plugins/speech-synthesis/) for the implementation detail in @capgo/capacitor-speech-synthesis, [Getting Started](/docs/plugins/speech-synthesis/getting-started/) for the implementation detail in Getting Started, [Capgo Plugin Directory](/plugins/) for the product workflow in Capgo Plugin Directory, [Capacitor Plugins by Capgo](/docs/plugins/) for the implementation detail in Capacitor Plugins by Capgo, and [Adding or Updating Plugins](/docs/contributing/adding-plugins/) for the implementation detail in Adding or Updating Plugins.
