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

## What This Plugin Exposes

- `speak` - Speaks the given text with specified options. The utterance is added to the speech queue.
- `synthesizeToFile` - Synthesizes speech to an audio file (Android/iOS only). Returns the file path where the audio was saved.
- `cancel` - Cancels all queued utterances and stops current speech.
- `pause` - Pauses speech immediately.

## Example Usage

### `speak`

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

### `synthesizeToFile`

Synthesizes speech to an audio file (Android/iOS only). Returns the file path where the audio was saved.

```typescript
import { SpeechSynthesis } from '@capgo/capacitor-speech-synthesis';

const result = await SpeechSynthesis.synthesizeToFile({
  text: 'Hello, world!',
  language: 'en-US'
});
console.log('Audio file saved at:', result.filePath);
```

### `cancel`

Cancels all queued utterances and stops current speech.

```typescript
import { SpeechSynthesis } from '@capgo/capacitor-speech-synthesis';

await SpeechSynthesis.cancel();
```

### `pause`

Pauses speech immediately.

```typescript
import { SpeechSynthesis } from '@capgo/capacitor-speech-synthesis';

await SpeechSynthesis.pause();
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-speech-synthesis/
- Docs: /docs/plugins/speech-synthesis/
