---
locale: en
---

# Using @capgo/capacitor-audio-recorder Package

The `@capgo/capacitor-audio-recorder` package enables high-quality audio recording across iOS, Android, and Web platforms with a simple unified API. This tutorial will guide you through installation, configuration, and building a complete voice recorder application.

## Installation

Install the package using your preferred package manager:

```bash
npm install @capgo/capacitor-audio-recorder
npx cap sync
```

## Platform Configuration

### iOS

Add microphone permission to your `Info.plist`:

```xml
<key>NSMicrophoneUsageDescription</key>
<string>This app needs access to the microphone to record audio</string>
```

### Android

Add permissions to your `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

### Web

The plugin uses the MediaRecorder API, which requires HTTPS in production environments.

## Platform Support

- **iOS**: Full support with AAC, MP3, and WAV formats
- **Android**: Full support with all formats
- **Web**: Supported via MediaRecorder API (browser-dependent formats)

## Basic Usage

### Importing the Plugin

```typescript
import { AudioRecorder } from '@capgo/capacitor-audio-recorder';
```

### Checking Permissions

```typescript
async function checkMicrophonePermission() {
  const permission = await AudioRecorder.checkPermissions();
  console.log('Microphone permission:', permission.recordAudio);

  return permission.recordAudio === 'granted';
}
```

### Requesting Permissions

```typescript
async function requestMicrophonePermission() {
  const permission = await AudioRecorder.requestPermissions();

  if (permission.recordAudio === 'granted') {
    console.log('Permission granted');
    return true;
  } else {
    console.log('Permission denied');
    return false;
  }
}
```

### Starting Recording

```typescript
async function startRecording() {
  const hasPermission = await checkMicrophonePermission() ||
                        await requestMicrophonePermission();

  if (!hasPermission) {
    throw new Error('Microphone permission denied');
  }

  await AudioRecorder.startRecording();
  console.log('Recording started');
}
```

### Stopping Recording

```typescript
async function stopRecording() {
  const result = await AudioRecorder.stopRecording();

  console.log('Recording stopped');
  console.log('File path:', result.filePath);
  console.log('Duration:', result.duration, 'seconds');
  console.log('File size:', result.fileSize, 'bytes');

  return result;
}
```

### Pausing and Resuming

```typescript
async function pauseRecording() {
  await AudioRecorder.pauseRecording();
  console.log('Recording paused');
}

async function resumeRecording() {
  await AudioRecorder.resumeRecording();
  console.log('Recording resumed');
}
```

### Getting Recording Status

```typescript
async function getRecordingStatus() {
  const status = await AudioRecorder.getStatus();

  console.log('Is recording:', status.isRecording);
  console.log('Current time:', status.currentTime, 'seconds');

  return status;
}
```

## Complete Voice Recorder Service

Here's a comprehensive service for managing audio recording:

```typescript
import { AudioRecorder } from '@capgo/capacitor-audio-recorder';

export interface RecordingResult {
  filePath: string;
  duration: number;
  fileSize: number;
  mimeType: string;
}

export interface RecordingConfig {
  format?: 'aac' | 'mp3' | 'wav';
  sampleRate?: number;
  channels?: 1 | 2;
  bitRate?: number;
}

export class VoiceRecorderService {
  private isRecording = false;
  private isPaused = false;
  private hasPermission = false;
  private recordingPath: string | null = null;
  private startTime: number = 0;

  async initialize(): Promise<boolean> {
    const permission = await AudioRecorder.checkPermissions();

    if (permission.recordAudio === 'granted') {
      this.hasPermission = true;
      return true;
    }

    const requested = await AudioRecorder.requestPermissions();
    this.hasPermission = requested.recordAudio === 'granted';

    return this.hasPermission;
  }

  private async ensurePermission(): Promise<void> {
    if (!this.hasPermission) {
      const granted = await this.initialize();
      if (!granted) {
        throw new Error('Microphone permission denied');
      }
    }
  }

  async startRecording(config?: RecordingConfig): Promise<void> {
    if (this.isRecording) {
      throw new Error('Already recording');
    }

    await this.ensurePermission();

    await AudioRecorder.startRecording(config);

    this.isRecording = true;
    this.isPaused = false;
    this.startTime = Date.now();

    console.log('Recording started');
  }

  async pauseRecording(): Promise<void> {
    if (!this.isRecording || this.isPaused) {
      return;
    }

    await AudioRecorder.pauseRecording();
    this.isPaused = true;

    console.log('Recording paused');
  }

  async resumeRecording(): Promise<void> {
    if (!this.isRecording || !this.isPaused) {
      return;
    }

    await AudioRecorder.resumeRecording();
    this.isPaused = false;

    console.log('Recording resumed');
  }

  async stopRecording(): Promise<RecordingResult | null> {
    if (!this.isRecording) {
      return null;
    }

    const result = await AudioRecorder.stopRecording();

    this.isRecording = false;
    this.isPaused = false;
    this.recordingPath = result.filePath;

    console.log('Recording stopped');
    console.log('Duration:', result.duration, 'seconds');
    console.log('File size:', result.fileSize, 'bytes');

    return result;
  }

  async getCurrentStatus() {
    const status = await AudioRecorder.getStatus();

    return {
      isRecording: status.isRecording,
      isPaused: this.isPaused,
      duration: status.currentTime,
      elapsedTime: Date.now() - this.startTime
    };
  }

  getRecordingState() {
    return {
      isRecording: this.isRecording,
      isPaused: this.isPaused
    };
  }

  getRecordingPath(): string | null {
    return this.recordingPath;
  }

  formatDuration(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  formatFileSize(bytes: number): string {
    if (bytes < 1024) {
      return `${bytes} B`;
    } else if (bytes < 1024 * 1024) {
      return `${(bytes / 1024).toFixed(1)} KB`;
    } else {
      return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    }
  }
}
```

## Audio Quality Configurations

### High Quality (Music/Podcast)

```typescript
const highQualityConfig: RecordingConfig = {
  format: 'aac',
  sampleRate: 44100,  // 44.1 kHz (CD quality)
  channels: 2,         // Stereo
  bitRate: 320000      // 320 kbps
};

await recorder.startRecording(highQualityConfig);
```

### Medium Quality (Voice Notes)

```typescript
const mediumQualityConfig: RecordingConfig = {
  format: 'aac',
  sampleRate: 22050,  // 22 kHz
  channels: 1,         // Mono
  bitRate: 128000      // 128 kbps
};

await recorder.startRecording(mediumQualityConfig);
```

### Low Quality (Voice Memos)

```typescript
const lowQualityConfig: RecordingConfig = {
  format: 'aac',
  sampleRate: 16000,  // 16 kHz
  channels: 1,         // Mono
  bitRate: 64000       // 64 kbps
};

await recorder.startRecording(lowQualityConfig);
```

## Voice Recorder UI Component

```typescript
class VoiceRecorderUI {
  private recorder: VoiceRecorderService;
  private updateInterval: any;
  private recordings: RecordingResult[] = [];

  constructor() {
    this.recorder = new VoiceRecorderService();
  }

  async initialize() {
    const initialized = await this.recorder.initialize();

    if (!initialized) {
      this.showPermissionDenied();
      return;
    }

    this.setupEventListeners();
    this.updateUI();
  }

  setupEventListeners() {
    const recordButton = document.getElementById('record-btn');
    const pauseButton = document.getElementById('pause-btn');
    const stopButton = document.getElementById('stop-btn');

    recordButton?.addEventListener('click', () => this.handleRecord());
    pauseButton?.addEventListener('click', () => this.handlePause());
    stopButton?.addEventListener('click', () => this.handleStop());
  }

  async handleRecord() {
    try {
      await this.recorder.startRecording({
        format: 'aac',
        sampleRate: 44100,
        channels: 2,
        bitRate: 192000
      });

      this.startDurationUpdate();
      this.updateUI('recording');
    } catch (error) {
      console.error('Failed to start recording:', error);
      alert('Failed to start recording: ' + error.message);
    }
  }

  async handlePause() {
    const state = this.recorder.getRecordingState();

    try {
      if (state.isPaused) {
        await this.recorder.resumeRecording();
        this.updateUI('recording');
      } else {
        await this.recorder.pauseRecording();
        this.updateUI('paused');
      }
    } catch (error) {
      console.error('Failed to pause/resume:', error);
    }
  }

  async handleStop() {
    try {
      const result = await this.recorder.stopRecording();

      this.stopDurationUpdate();
      this.updateUI('stopped');

      if (result) {
        this.recordings.push(result);
        this.showRecordingResult(result);
      }
    } catch (error) {
      console.error('Failed to stop recording:', error);
    }
  }

  startDurationUpdate() {
    this.updateInterval = setInterval(async () => {
      try {
        const status = await this.recorder.getCurrentStatus();
        this.updateDurationDisplay(status.duration);
      } catch (error) {
        console.error('Failed to get status:', error);
      }
    }, 100);
  }

  stopDurationUpdate() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
      this.updateInterval = null;
    }
  }

  updateDurationDisplay(duration: number) {
    const display = document.getElementById('duration');
    if (display) {
      display.textContent = this.recorder.formatDuration(duration);
    }
  }

  updateUI(state: 'idle' | 'recording' | 'paused' | 'stopped') {
    const recordBtn = document.getElementById('record-btn');
    const pauseBtn = document.getElementById('pause-btn');
    const stopBtn = document.getElementById('stop-btn');

    // Update button states
    switch (state) {
      case 'idle':
        recordBtn?.removeAttribute('disabled');
        pauseBtn?.setAttribute('disabled', 'true');
        stopBtn?.setAttribute('disabled', 'true');
        break;

      case 'recording':
        recordBtn?.setAttribute('disabled', 'true');
        pauseBtn?.removeAttribute('disabled');
        stopBtn?.removeAttribute('disabled');
        pauseBtn!.textContent = 'Pause';
        break;

      case 'paused':
        pauseBtn!.textContent = 'Resume';
        break;

      case 'stopped':
        recordBtn?.removeAttribute('disabled');
        pauseBtn?.setAttribute('disabled', 'true');
        stopBtn?.setAttribute('disabled', 'true');
        break;
    }

    // Update visual feedback
    const indicator = document.getElementById('recording-indicator');
    if (indicator) {
      indicator.className = `indicator ${state}`;
    }
  }

  showRecordingResult(result: RecordingResult) {
    console.log('Recording complete:', result);

    const resultDiv = document.createElement('div');
    resultDiv.className = 'recording-result';
    resultDiv.innerHTML = `
      <h3>Recording Saved</h3>
      <p>Duration: ${this.recorder.formatDuration(result.duration)}</p>
      <p>Size: ${this.recorder.formatFileSize(result.fileSize)}</p>
      <p>Format: ${result.mimeType}</p>
      <button onclick="playRecording('${result.filePath}')">Play</button>
      <button onclick="shareRecording('${result.filePath}')">Share</button>
    `;

    const container = document.getElementById('results');
    container?.appendChild(resultDiv);
  }

  showPermissionDenied() {
    const container = document.getElementById('recorder-container');
    if (container) {
      container.innerHTML = `
        <div class="permission-denied">
          <h3>Microphone Permission Required</h3>
          <p>This app needs access to your microphone to record audio.</p>
          <button onclick="window.location.reload()">Grant Permission</button>
        </div>
      `;
    }
  }

  getRecordings(): RecordingResult[] {
    return this.recordings;
  }

  clearRecordings() {
    this.recordings = [];
  }
}

// Initialize
const recorderUI = new VoiceRecorderUI();
recorderUI.initialize();
```

## Audio Playback Integration

```typescript
class AudioPlayer {
  private audio: HTMLAudioElement | null = null;
  private currentRecording: RecordingResult | null = null;

  async playRecording(filePath: string) {
    if (this.audio) {
      this.audio.pause();
    }

    this.audio = new Audio(filePath);

    this.audio.addEventListener('ended', () => {
      this.onPlaybackComplete();
    });

    this.audio.addEventListener('error', (error) => {
      console.error('Playback error:', error);
      alert('Failed to play recording');
    });

    try {
      await this.audio.play();
      console.log('Playback started');
    } catch (error) {
      console.error('Failed to play:', error);
    }
  }

  pause() {
    if (this.audio) {
      this.audio.pause();
    }
  }

  resume() {
    if (this.audio) {
      this.audio.play();
    }
  }

  stop() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }
  }

  getCurrentTime(): number {
    return this.audio?.currentTime || 0;
  }

  getDuration(): number {
    return this.audio?.duration || 0;
  }

  setVolume(volume: number) {
    if (this.audio) {
      this.audio.volume = Math.max(0, Math.min(1, volume));
    }
  }

  private onPlaybackComplete() {
    console.log('Playback completed');
    // Update UI
  }
}
```

## Recording Manager with Storage

```typescript
import { Filesystem, Directory } from '@capacitor/filesystem';

class RecordingManager {
  private recorder: VoiceRecorderService;
  private recordings: Map<string, RecordingResult> = new Map();

  constructor() {
    this.recorder = new VoiceRecorderService();
  }

  async initialize() {
    await this.recorder.initialize();
    await this.loadRecordingsIndex();
  }

  async startRecording(name?: string): Promise<void> {
    const config: RecordingConfig = {
      format: 'aac',
      sampleRate: 44100,
      channels: 2,
      bitRate: 192000
    };

    await this.recorder.startRecording(config);
  }

  async stopAndSaveRecording(name: string): Promise<RecordingResult> {
    const result = await this.recorder.stopRecording();

    if (!result) {
      throw new Error('No recording to save');
    }

    // Save recording metadata
    const id = Date.now().toString();
    const metadata = {
      ...result,
      id,
      name,
      createdAt: new Date().toISOString()
    };

    this.recordings.set(id, metadata);
    await this.saveRecordingsIndex();

    return metadata;
  }

  async deleteRecording(id: string): Promise<void> {
    const recording = this.recordings.get(id);

    if (!recording) {
      throw new Error('Recording not found');
    }

    try {
      // Delete file
      await Filesystem.deleteFile({
        path: recording.filePath,
        directory: Directory.Data
      });

      // Remove from index
      this.recordings.delete(id);
      await this.saveRecordingsIndex();

      console.log('Recording deleted:', id);
    } catch (error) {
      console.error('Failed to delete recording:', error);
      throw error;
    }
  }

  async getAllRecordings(): Promise<RecordingResult[]> {
    return Array.from(this.recordings.values());
  }

  async getRecording(id: string): Promise<RecordingResult | null> {
    return this.recordings.get(id) || null;
  }

  private async saveRecordingsIndex(): Promise<void> {
    const data = JSON.stringify(Array.from(this.recordings.entries()));

    await Filesystem.writeFile({
      path: 'recordings-index.json',
      data: data,
      directory: Directory.Data
    });
  }

  private async loadRecordingsIndex(): Promise<void> {
    try {
      const result = await Filesystem.readFile({
        path: 'recordings-index.json',
        directory: Directory.Data
      });

      const entries = JSON.parse(result.data as string);
      this.recordings = new Map(entries);

      console.log('Loaded', this.recordings.size, 'recordings');
    } catch (error) {
      console.log('No recordings index found, starting fresh');
      this.recordings = new Map();
    }
  }

  getTotalDuration(): number {
    let total = 0;
    this.recordings.forEach(recording => {
      total += recording.duration;
    });
    return total;
  }

  getTotalSize(): number {
    let total = 0;
    this.recordings.forEach(recording => {
      total += recording.fileSize;
    });
    return total;
  }
}
```

## Best Practices

1. **Request Permissions Early**: Check permissions before showing record UI
2. **Handle Interruptions**: Phone calls, alarms can interrupt recording
3. **Manage Storage**: Clean up old recordings to save space
4. **Provide Feedback**: Show recording status, duration, and waveform
5. **Choose Appropriate Quality**: Balance quality and file size
6. **Error Handling**: Handle permission denial, storage full, etc.
7. **Test on Real Devices**: Simulators have limited audio support
8. **Background Recording**: Handle app going to background

## Common Issues

### Permission Denied

```typescript
async function handlePermissionDenied() {
  const permission = await AudioRecorder.checkPermissions();

  if (permission.recordAudio === 'denied') {
    alert(
      'Microphone access is required to record audio. Please enable it in Settings:\n\n' +
      'iOS: Settings > [App] > Microphone\n' +
      'Android: Settings > Apps > [App] > Permissions'
    );
  }
}
```

### Recording Interrupted

```typescript
// Listen for app state changes
document.addEventListener('pause', async () => {
  const status = await recorder.getCurrentStatus();

  if (status.isRecording) {
    await recorder.pauseRecording();
    console.log('Recording paused due to app going to background');
  }
});

document.addEventListener('resume', async () => {
  const state = recorder.getRecordingState();

  if (state.isPaused) {
    // Optionally resume
    // await recorder.resumeRecording();
  }
});
```

### Storage Management

```typescript
async function cleanupOldRecordings() {
  const manager = new RecordingManager();
  const recordings = await manager.getAllRecordings();

  // Delete recordings older than 30 days
  const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);

  for (const recording of recordings) {
    const createdAt = new Date(recording.createdAt).getTime();

    if (createdAt < thirtyDaysAgo) {
      await manager.deleteRecording(recording.id);
      console.log('Deleted old recording:', recording.name);
    }
  }
}
```

## Conclusion

The `@capgo/capacitor-audio-recorder` plugin provides powerful audio recording capabilities across iOS, Android, and Web platforms. By properly implementing permission handling, quality configuration, and storage management, you can create professional voice recording applications.

For more information, visit the [official documentation](https://capgo.app/docs/plugins/audio-recorder/) or check the [GitHub repository](https://github.com/Cap-go/capacitor-audio-recorder).
