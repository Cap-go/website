---
locale: en
---
# Using @capgo/capacitor-speech-synthesis Package

The `@capgo/capacitor-speech-synthesis` package allows you to synthesize speech from text with full control over language, voice, pitch, rate, and volume. In this tutorial, we'll guide you through installing and using this package in your Capacitor app.

## Installation

To install the `@capgo/capacitor-speech-synthesis` package, run the following command in your project's root directory:

```bash
npm install @capgo/capacitor-speech-synthesis
npx cap sync
```

## API

The `@capgo/capacitor-speech-synthesis` package provides the following API methods:

### speak(options)

This method speaks the given text using the specified voice settings.

```javascript
import { SpeechSynthesis } from '@capgo/capacitor-speech-synthesis';

async function speakText() {
  const options = {
    text: 'Hello, world! This is text-to-speech.',
    language: 'en-US',
    rate: 1.0,
    pitch: 1.0,
    volume: 1.0
  };

  try {
    await SpeechSynthesis.speak(options);
    console.log('Speech completed');
  } catch (error) {
    console.error('Speech failed:', error);
  }
}
```

**Options:**
- `text` (string, required): The text to speak
- `language` (string, optional): Language code (e.g., 'en-US', 'es-ES', 'fr-FR')
- `rate` (number, optional): Speech rate from 0.1 to 10.0 (default: 1.0)
- `pitch` (number, optional): Voice pitch from 0.5 to 2.0 (default: 1.0)
- `volume` (number, optional): Volume from 0.0 to 1.0 (default: 1.0)
- `voice` (string, optional): Voice identifier from getVoices()

### stop()

This method stops any ongoing speech synthesis.

```javascript
import { SpeechSynthesis } from '@capgo/capacitor-speech-synthesis';

async function stopSpeaking() {
  await SpeechSynthesis.stop();
  console.log('Speech stopped');
}
```

### getVoices()

This method retrieves the list of available voices for speech synthesis.

```javascript
import { SpeechSynthesis } from '@capgo/capacitor-speech-synthesis';

async function listVoices() {
  const { voices } = await SpeechSynthesis.getVoices();

  voices.forEach(voice => {
    console.log('Voice:', voice.name);
    console.log('Language:', voice.lang);
    console.log('URI:', voice.voiceURI);
    console.log('Default:', voice.default);
    console.log('---');
  });
}
```

### getSupportedLanguages()

This method returns the list of supported language codes.

```javascript
import { SpeechSynthesis } from '@capgo/capacitor-speech-synthesis';

async function listLanguages() {
  const { languages } = await SpeechSynthesis.getSupportedLanguages();
  console.log('Supported languages:', languages);
}
```

### isSpeaking()

This method checks if speech synthesis is currently active.

```javascript
import { SpeechSynthesis } from '@capgo/capacitor-speech-synthesis';

async function checkSpeaking() {
  const { speaking } = await SpeechSynthesis.isSpeaking();
  console.log('Currently speaking:', speaking);
}
```

## Complete Example

Here's a complete example demonstrating various features of the plugin:

```javascript
import { SpeechSynthesis } from '@capgo/capacitor-speech-synthesis';

class TextToSpeechService {
  constructor() {
    this.currentVoice = null;
    this.init();
  }

  async init() {
    // Get available voices
    const { voices } = await SpeechSynthesis.getVoices();

    // Find preferred English voice
    const englishVoice = voices.find(v => v.lang.startsWith('en'));
    this.currentVoice = englishVoice?.voiceURI;

    console.log('Using voice:', englishVoice?.name);
  }

  async speak(text, options = {}) {
    try {
      // Stop any ongoing speech
      await SpeechSynthesis.stop();

      // Speak the text
      await SpeechSynthesis.speak({
        text,
        language: 'en-US',
        rate: 1.0,
        pitch: 1.0,
        volume: 1.0,
        voice: this.currentVoice,
        ...options
      });

      console.log('Speech completed');
    } catch (error) {
      console.error('Speech failed:', error);
    }
  }

  async speakSlowly(text) {
    await this.speak(text, { rate: 0.7 });
  }

  async speakQuickly(text) {
    await this.speak(text, { rate: 1.5 });
  }

  async stop() {
    await SpeechSynthesis.stop();
  }

  async isSpeaking() {
    const { speaking } = await SpeechSynthesis.isSpeaking();
    return speaking;
  }
}

// Usage
const tts = new TextToSpeechService();

// Speak normal text
await tts.speak('Hello, how are you today?');

// Speak slowly
await tts.speakSlowly('This is spoken slowly.');

// Speak quickly
await tts.speakQuickly('This is spoken quickly.');

// Stop speaking
await tts.stop();
```

## Multi-language Support

Here's how to use multiple languages:

```javascript
import { SpeechSynthesis } from '@capgo/capacitor-speech-synthesis';

async function speakInMultipleLanguages() {
  const messages = [
    { text: 'Hello!', language: 'en-US' },
    { text: 'Bonjour!', language: 'fr-FR' },
    { text: 'Hola!', language: 'es-ES' },
    { text: 'こんにちは!', language: 'ja-JP' }
  ];

  for (const message of messages) {
    await SpeechSynthesis.speak({
      text: message.text,
      language: message.language
    });

    // Wait a bit between languages
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}
```

## Voice Selection

Here's how to select a specific voice for a language:

```javascript
import { SpeechSynthesis } from '@capgo/capacitor-speech-synthesis';

async function selectVoice(languageCode) {
  const { voices } = await SpeechSynthesis.getVoices();

  // Filter voices by language
  const languageVoices = voices.filter(v => v.lang.startsWith(languageCode));

  if (languageVoices.length > 0) {
    console.log('Available voices for', languageCode);
    languageVoices.forEach((voice, index) => {
      console.log(`${index + 1}. ${voice.name}`);
    });

    // Use the first voice
    await SpeechSynthesis.speak({
      text: 'Testing voice selection',
      language: languageCode,
      voice: languageVoices[0].voiceURI
    });
  } else {
    console.log('No voices available for', languageCode);
  }
}
```

## Best Practices

1. **Stop Before Speak**: Always call `stop()` before starting new speech to avoid overlap
2. **Voice Availability**: Check available voices using `getVoices()` before using specific voices
3. **Rate Control**: Keep speech rate between 0.5 and 2.0 for natural-sounding speech
4. **Language Codes**: Use standard language codes like 'en-US', 'es-ES', 'fr-FR'
5. **Error Handling**: Wrap all speech synthesis calls in try-catch blocks

## Troubleshooting

### No speech output
- Check that device volume is not muted
- Verify the text is not empty
- Ensure the language is supported on the device

### Voice not found
- Use `getVoices()` to get available voices
- Check that the voice identifier is correct
- Some voices may not be available on all devices

### Speech interrupted
- Make sure to call `stop()` before starting new speech
- Check if another app is using audio

## Conclusion

The `@capgo/capacitor-speech-synthesis` package provides a powerful and flexible way to add text-to-speech functionality to your Capacitor app. With support for multiple languages, voices, and fine-grained control over speech parameters, you can create engaging voice experiences for your users.
