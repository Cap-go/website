---
locale: en
---
# Using @capgo/capacitor-speech-recognition Package

The `@capgo/capacitor-speech-recognition` package provides natural, low-latency speech recognition for Capacitor apps with cross-platform parity across iOS and Android. This tutorial will guide you through installing and using this package to add voice transcription capabilities to your app.

## Installation

To install the `@capgo/capacitor-speech-recognition` package, run the following command in your project's root directory:

```bash
npm install @capgo/capacitor-speech-recognition
npx cap sync
```

## iOS Setup

For iOS, you need to add permission descriptions to your app's `Info.plist` file:

```xml
<key>NSSpeechRecognitionUsageDescription</key>
<string>We need access to speech recognition to transcribe your voice</string>
<key>NSMicrophoneUsageDescription</key>
<string>We need access to your microphone to record audio for transcription</string>
```

## Android Setup

The Android platform automatically includes the required `RECORD_AUDIO` permission. No additional configuration is needed.

## API

The `@capgo/capacitor-speech-recognition` package provides the following API methods:

### available()

This method checks if speech recognition is available on the device.

```javascript
import { SpeechRecognition } from '@capgo/capacitor-speech-recognition';

async function checkAvailability() {
  const { available } = await SpeechRecognition.available();
  console.log('Speech recognition available:', available);
}
```

### requestPermissions()

This method requests the necessary microphone and speech recognition permissions.

```javascript
import { SpeechRecognition } from '@capgo/capacitor-speech-recognition';

async function requestPermissions() {
  const { speechRecognition } = await SpeechRecognition.requestPermissions();
  console.log('Permission status:', speechRecognition);
}
```

### checkPermissions()

This method checks the current permission state without requesting them.

```javascript
import { SpeechRecognition } from '@capgo/capacitor-speech-recognition';

async function checkPermissions() {
  const { speechRecognition } = await SpeechRecognition.checkPermissions();
  console.log('Current permission:', speechRecognition);
}
```

### start(options)

This method starts the speech recognition with optional configuration.

```javascript
import { SpeechRecognition } from '@capgo/capacitor-speech-recognition';

async function startRecognition() {
  const options = {
    language: 'en-US',
    maxResults: 3,
    partialResults: true,
    addPunctuation: true, // iOS 16+ only
  };

  await SpeechRecognition.start(options);
  console.log('Speech recognition started');
}
```

Available options:
- `language` (string): Locale identifier like 'en-US'. Defaults to device language.
- `maxResults` (number): Maximum number of results. Defaults to 5.
- `prompt` (string): Prompt text for Android dialog (Android only).
- `popup` (boolean): Show system dialog on Android. Defaults to false.
- `partialResults` (boolean): Enable streaming partial results.
- `addPunctuation` (boolean): Enable automatic punctuation (iOS 16+ only).
- `allowForSilence` (number): Milliseconds of silence before segment split (Android only).

### stop()

This method stops the speech recognition and cleans up resources.

```javascript
import { SpeechRecognition } from '@capgo/capacitor-speech-recognition';

async function stopRecognition() {
  await SpeechRecognition.stop();
  console.log('Speech recognition stopped');
}
```

### getSupportedLanguages()

This method retrieves the list of supported languages.

```javascript
import { SpeechRecognition } from '@capgo/capacitor-speech-recognition';

async function getSupportedLanguages() {
  const { languages } = await SpeechRecognition.getSupportedLanguages();
  console.log('Supported languages:', languages);
}
```

Note: Android 13+ devices no longer expose this list, so the array may be empty.

### isListening()

This method checks if speech recognition is currently active.

```javascript
import { SpeechRecognition } from '@capgo/capacitor-speech-recognition';

async function checkListening() {
  const { listening } = await SpeechRecognition.isListening();
  console.log('Is listening:', listening);
}
```

### getPluginVersion()

This method returns the native plugin version.

```javascript
import { SpeechRecognition } from '@capgo/capacitor-speech-recognition';

async function getVersion() {
  const { version } = await SpeechRecognition.getPluginVersion();
  console.log('Plugin version:', version);
}
```

## Event Listeners

### partialResults

Listen for partial transcription updates while recognition is active.

```javascript
import { SpeechRecognition } from '@capgo/capacitor-speech-recognition';

const listener = await SpeechRecognition.addListener('partialResults', (event) => {
  const transcription = event.matches?.[0];
  console.log('Partial result:', transcription);
});

// Remove listener when done
await listener.remove();
```

### segmentResults (Android only)

Listen for segmented recognition results.

```javascript
import { SpeechRecognition } from '@capgo/capacitor-speech-recognition';

const listener = await SpeechRecognition.addListener('segmentResults', (event) => {
  const segment = event.matches?.[0];
  console.log('Segment result:', segment);
});
```

### endOfSegmentedSession (Android only)

Listen for segmented session completion.

```javascript
import { SpeechRecognition } from '@capgo/capacitor-speech-recognition';

const listener = await SpeechRecognition.addListener('endOfSegmentedSession', () => {
  console.log('Segmented session ended');
});
```

### listeningState

Listen for changes in the listening state.

```javascript
import { SpeechRecognition } from '@capgo/capacitor-speech-recognition';

const listener = await SpeechRecognition.addListener('listeningState', (event) => {
  console.log('Listening state:', event.status); // 'started' or 'stopped'
});
```

### removeAllListeners()

Remove all registered event listeners.

```javascript
import { SpeechRecognition } from '@capgo/capacitor-speech-recognition';

await SpeechRecognition.removeAllListeners();
```

## Complete Example

Here's a complete example showing how to implement voice recognition in your app:

```javascript
import { SpeechRecognition } from '@capgo/capacitor-speech-recognition';

class VoiceRecorder {
  constructor() {
    this.isRecording = false;
    this.partialListener = null;
  }

  async initialize() {
    // Check availability
    const { available } = await SpeechRecognition.available();
    if (!available) {
      throw new Error('Speech recognition not available');
    }

    // Request permissions
    const { speechRecognition } = await SpeechRecognition.requestPermissions();
    if (speechRecognition !== 'granted') {
      throw new Error('Permission denied');
    }

    return true;
  }

  async startRecording(onTranscript) {
    if (this.isRecording) {
      console.warn('Already recording');
      return;
    }

    // Set up listener
    this.partialListener = await SpeechRecognition.addListener(
      'partialResults',
      (event) => {
        const text = event.matches?.[0] || '';
        onTranscript(text);
      }
    );

    // Start recognition
    await SpeechRecognition.start({
      language: 'en-US',
      maxResults: 3,
      partialResults: true,
      addPunctuation: true,
    });

    this.isRecording = true;
  }

  async stopRecording() {
    if (!this.isRecording) {
      return;
    }

    // Stop recognition
    await SpeechRecognition.stop();

    // Clean up listener
    if (this.partialListener) {
      await this.partialListener.remove();
      this.partialListener = null;
    }

    this.isRecording = false;
  }

  async getSupportedLanguages() {
    const { languages } = await SpeechRecognition.getSupportedLanguages();
    return languages;
  }
}

// Usage
const recorder = new VoiceRecorder();

async function startVoiceNote() {
  try {
    await recorder.initialize();

    await recorder.startRecording((transcript) => {
      console.log('Current transcript:', transcript);
      // Update UI with transcript
    });
  } catch (error) {
    console.error('Error starting voice note:', error);
  }
}

async function stopVoiceNote() {
  try {
    await recorder.stopRecording();
  } catch (error) {
    console.error('Error stopping voice note:', error);
  }
}
```

## Platform-Specific Notes

### iOS
- Requires iOS 10.0+
- Uses native `SFSpeechRecognizer`
- Supports punctuation on iOS 16+
- May require internet connection for some languages

### Android
- Requires API 23+ (Android 6.0)
- Uses `SpeechRecognizer` API
- Supports segmented sessions with `allowForSilence` option
- Android 13+ doesn't expose supported languages list

### Web
- Limited support via Web Speech API
- Requires HTTPS connection
- Browser compatibility varies

## Error Handling

Always handle errors gracefully when working with speech recognition:

```javascript
try {
  const { available } = await SpeechRecognition.available();
  if (!available) {
    console.error('Speech recognition not available');
    return;
  }

  await SpeechRecognition.start({
    language: 'en-US',
    partialResults: true,
  });
} catch (error) {
  console.error('Speech recognition error:', error);
  // Show user-friendly error message
}
```

## Best Practices

1. **Always check availability** before using speech recognition
2. **Request permissions** early in your app flow
3. **Clean up listeners** when they're no longer needed to prevent memory leaks
4. **Provide visual feedback** when listening is active
5. **Handle errors gracefully** with user-friendly messages
6. **Test with different accents and languages** for your target audience
7. **Use appropriate language codes** matching your user's locale

## Conclusion

The `@capgo/capacitor-speech-recognition` package provides a powerful and easy-to-use solution for adding speech recognition to your Capacitor apps. With cross-platform support, real-time partial results, and comprehensive event listeners, you can create sophisticated voice-enabled features for your users.
