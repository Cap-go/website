---
locale: en
---

# Using @capgo/capacitor-realtimekit Package

The `@capgo/capacitor-realtimekit` package provides seamless integration with Cloudflare Calls, enabling you to add professional video conferencing, audio calls, and real-time communication features to your Capacitor applications with minimal setup. This tutorial will guide you through installation, configuration, and building a complete video conferencing solution.

## Installation

Install the package using your preferred package manager:

```bash
npm install @capgo/capacitor-realtimekit
npx cap sync
```

## Platform Requirements

### iOS
- iOS 14.0 or higher
- Xcode 13 or higher
- Swift Package Manager (automatic)

### Android
- Android API 24 (Android 7.0) or higher
- Gradle 7.0 or higher

### Web
Not supported - this is a native-only plugin leveraging platform-specific WebRTC implementations.

## Dependencies

The plugin automatically manages its dependencies:

- **iOS**: RealtimeKitCoreiOS SDK (via Swift Package Manager)
- **Android**: `com.cloudflare.realtimekit:ui-android` version `0.2.2`

### Customizing Android SDK Version

If you need a specific version of the Cloudflare RealtimeKit Android SDK, you can specify it in your app's `build.gradle`:

```kotlin
buildscript {
    ext {
        realtimekitUiVersion = '0.2.2'  // Specify your desired version
    }
}
```

## iOS Configuration

Add the required permissions and background modes to your app's `Info.plist`:

```xml
<!-- Camera permission -->
<key>NSCameraUsageDescription</key>
<string>We need camera access for video calls</string>

<!-- Microphone permission -->
<key>NSMicrophoneUsageDescription</key>
<string>We need microphone access for audio calls</string>

<!-- Photo library permission (for sharing images during calls) -->
<key>NSPhotoLibraryUsageDescription</key>
<string>We need photo library access to share images</string>

<!-- Bluetooth permission (for audio routing) -->
<key>NSBluetoothPeripheralUsageDescription</key>
<string>We need Bluetooth access for audio routing</string>

<!-- Background modes for continuous calling -->
<key>UIBackgroundModes</key>
<array>
  <string>audio</string>
  <string>voip</string>
  <string>fetch</string>
  <string>remote-notification</string>
</array>
```

## Android Configuration

Add the required permissions to your `AndroidManifest.xml`:

```xml
<!-- Camera permission -->
<uses-permission android:name="android.permission.CAMERA" />

<!-- Microphone permission -->
<uses-permission android:name="android.permission.RECORD_AUDIO" />

<!-- Internet permission -->
<uses-permission android:name="android.permission.INTERNET" />

<!-- Audio settings permission -->
<uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />

<!-- Declare camera features (not required but recommended) -->
<uses-feature android:name="android.hardware.camera" android:required="false" />
<uses-feature android:name="android.hardware.camera.autofocus" android:required="false" />
```

## Cloudflare Calls Setup

Before using the plugin, you need to set up Cloudflare Calls. This requires a Cloudflare account and backend service to generate meeting URLs.

### 1. Create Cloudflare Account

1. Sign up at [Cloudflare](https://dash.cloudflare.com/sign-up)
2. Navigate to the Calls section in your dashboard
3. Enable the Calls API
4. Note your App ID and API credentials

### 2. Backend Setup

You'll need a backend service to create and manage meeting sessions. Here's an example using Cloudflare Workers:

```typescript
// Cloudflare Worker to create meetings
export default {
  async fetch(request: Request, env: any): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/create-meeting') {
      return await createMeeting(env);
    }

    if (url.pathname.startsWith('/join/')) {
      const meetingId = url.pathname.split('/')[2];
      return await joinMeeting(meetingId, env);
    }

    return new Response('Not found', { status: 404 });
  }
};

async function createMeeting(env: any): Promise<Response> {
  const meetingId = generateMeetingId();

  const callsApiUrl = `https://rtc.live.cloudflare.com/v1/apps/${env.CALLS_APP_ID}/sessions/new`;

  const response = await fetch(callsApiUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.CALLS_API_TOKEN}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      sessionDescription: {
        sessionId: meetingId
      }
    })
  });

  const data = await response.json();

  return new Response(JSON.stringify({
    meetingId: meetingId,
    meetingUrl: `https://your-app.com/meeting/${meetingId}`,
    sessionToken: data.sessionToken
  }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

async function joinMeeting(meetingId: string, env: any): Promise<Response> {
  // Generate join token for existing meeting
  const callsApiUrl = `https://rtc.live.cloudflare.com/v1/apps/${env.CALLS_APP_ID}/sessions/${meetingId}/tracks/new`;

  const response = await fetch(callsApiUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.CALLS_API_TOKEN}`,
      'Content-Type': 'application/json'
    }
  });

  const data = await response.json();

  return new Response(JSON.stringify({
    meetingId: meetingId,
    meetingUrl: `https://your-app.com/meeting/${meetingId}`,
    trackToken: data.trackToken
  }), {
    headers: { 'Content-Type': 'application/json' }
  });
}

function generateMeetingId(): string {
  return Math.random().toString(36).substring(2, 15) +
         Math.random().toString(36).substring(2, 15);
}
```

### 3. Environment Variables

Configure your Cloudflare Worker with:

```toml
# wrangler.toml
[vars]
CALLS_APP_ID = "your-app-id"

[secrets]
CALLS_API_TOKEN = "your-api-token"
```

## Basic Usage

### Import the Plugin

```typescript
import { CapacitorRealtimekit } from '@capgo/capacitor-realtimekit';
```

### Initialize the Plugin

```typescript
async function initializeRealtimeKit() {
  try {
    await CapacitorRealtimekit.initialize();
    console.log('RealtimeKit initialized successfully');
    return true;
  } catch (error) {
    console.error('Failed to initialize RealtimeKit:', error);
    return false;
  }
}
```

### Start a Meeting

```typescript
async function startMeeting(meetingUrl: string) {
  try {
    await CapacitorRealtimekit.startMeeting({
      url: meetingUrl
    });
    console.log('Meeting started successfully');
  } catch (error) {
    console.error('Failed to start meeting:', error);
    throw error;
  }
}
```

### Get Plugin Version

```typescript
async function checkVersion() {
  try {
    const result = await CapacitorRealtimekit.getPluginVersion();
    console.log('Plugin version:', result.version);
    return result.version;
  } catch (error) {
    console.error('Failed to get version:', error);
    return 'unknown';
  }
}
```

## Complete Video Conferencing Service

Here's a production-ready service for managing video meetings:

```typescript
import { CapacitorRealtimekit } from '@capgo/capacitor-realtimekit';

export interface MeetingConfig {
  url: string;
  displayName?: string;
  audioOnly?: boolean;
}

export interface MeetingInfo {
  id: string;
  url: string;
  startedAt: Date;
}

export class VideoConferenceService {
  private isInitialized = false;
  private currentMeeting: MeetingInfo | null = null;
  private backendUrl: string;

  constructor(backendUrl: string) {
    this.backendUrl = backendUrl;
  }

  async initialize(): Promise<boolean> {
    if (this.isInitialized) {
      console.log('VideoConferenceService already initialized');
      return true;
    }

    try {
      await CapacitorRealtimekit.initialize();
      this.isInitialized = true;
      console.log('VideoConferenceService initialized');
      return true;
    } catch (error) {
      console.error('Failed to initialize:', error);
      return false;
    }
  }

  async createMeeting(): Promise<MeetingInfo> {
    if (!this.isInitialized) {
      await this.initialize();
    }

    try {
      const response = await fetch(`${this.backendUrl}/create-meeting`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      if (!response.ok) {
        throw new Error('Failed to create meeting');
      }

      const data = await response.json();

      return {
        id: data.meetingId,
        url: data.meetingUrl,
        startedAt: new Date()
      };
    } catch (error) {
      console.error('Error creating meeting:', error);
      throw error;
    }
  }

  async startMeeting(config: MeetingConfig): Promise<void> {
    if (!this.isInitialized) {
      const initialized = await this.initialize();
      if (!initialized) {
        throw new Error('Failed to initialize video service');
      }
    }

    try {
      await CapacitorRealtimekit.startMeeting({
        url: config.url
      });

      this.currentMeeting = {
        id: this.extractMeetingId(config.url),
        url: config.url,
        startedAt: new Date()
      };

      console.log('Meeting started:', this.currentMeeting.id);
    } catch (error) {
      console.error('Failed to start meeting:', error);
      throw error;
    }
  }

  async joinMeeting(meetingUrl: string, displayName?: string): Promise<void> {
    const config: MeetingConfig = {
      url: meetingUrl,
      displayName: displayName
    };

    await this.startMeeting(config);
  }

  async createAndJoinMeeting(displayName?: string): Promise<string> {
    const meeting = await this.createMeeting();
    await this.joinMeeting(meeting.url, displayName);
    return meeting.url;
  }

  getCurrentMeeting(): MeetingInfo | null {
    return this.currentMeeting;
  }

  isInMeeting(): boolean {
    return this.currentMeeting !== null;
  }

  getMeetingDuration(): number {
    if (!this.currentMeeting) {
      return 0;
    }

    return Date.now() - this.currentMeeting.startedAt.getTime();
  }

  private extractMeetingId(url: string): string {
    const parts = url.split('/');
    return parts[parts.length - 1];
  }

  async getPluginVersion(): Promise<string> {
    try {
      const result = await CapacitorRealtimekit.getPluginVersion();
      return result.version;
    } catch (error) {
      console.error('Failed to get plugin version:', error);
      return 'unknown';
    }
  }
}
```

## Application Examples

### Video Chat Application

```typescript
class VideoChatApp {
  private videoService: VideoConferenceService;

  constructor() {
    this.videoService = new VideoConferenceService('https://your-backend.com');
  }

  async initialize() {
    const initialized = await this.videoService.initialize();

    if (!initialized) {
      this.showError('Failed to initialize video service');
      return;
    }

    console.log('Video chat app ready');
  }

  async hostMeeting() {
    try {
      this.showLoading('Creating meeting...');

      const meetingUrl = await this.videoService.createAndJoinMeeting('Host');

      this.hideLoading();
      this.showMeetingUrl(meetingUrl);

      console.log('Meeting created and joined:', meetingUrl);
    } catch (error) {
      this.hideLoading();
      this.showError('Failed to create meeting');
      console.error(error);
    }
  }

  async joinMeetingById(meetingId: string) {
    try {
      this.showLoading('Joining meeting...');

      const meetingUrl = `https://your-app.com/meeting/${meetingId}`;
      await this.videoService.joinMeeting(meetingUrl, 'Guest');

      this.hideLoading();
      console.log('Joined meeting:', meetingId);
    } catch (error) {
      this.hideLoading();
      this.showError('Failed to join meeting');
      console.error(error);
    }
  }

  private showMeetingUrl(url: string) {
    console.log('Meeting URL:', url);
    // Show share dialog with URL
  }

  private showLoading(message: string) {
    console.log('Loading:', message);
    // Show loading spinner
  }

  private hideLoading() {
    console.log('Loading hidden');
    // Hide loading spinner
  }

  private showError(message: string) {
    console.error('Error:', message);
    // Show error dialog
  }
}

// Usage
const app = new VideoChatApp();
app.initialize();
```

### Telehealth Application

```typescript
class TelehealthApp {
  private videoService: VideoConferenceService;

  constructor() {
    this.videoService = new VideoConferenceService('https://telehealth-backend.com');
  }

  async scheduleAppointment(doctorId: string, patientId: string, scheduledTime: Date): Promise<string> {
    const response = await fetch('https://telehealth-backend.com/appointments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        doctorId,
        patientId,
        scheduledTime: scheduledTime.toISOString()
      })
    });

    const data = await response.json();
    return data.appointmentId;
  }

  async startConsultation(appointmentId: string, isDoctor: boolean) {
    try {
      // Get meeting URL for appointment
      const response = await fetch(`https://telehealth-backend.com/appointments/${appointmentId}/meeting`);
      const data = await response.json();

      // Join the consultation
      const displayName = isDoctor ? 'Dr. Smith' : 'Patient';
      await this.videoService.joinMeeting(data.meetingUrl, displayName);

      console.log('Consultation started for appointment:', appointmentId);
    } catch (error) {
      console.error('Failed to start consultation:', error);
      throw error;
    }
  }

  async endConsultation() {
    const meeting = this.videoService.getCurrentMeeting();

    if (meeting) {
      const duration = this.videoService.getMeetingDuration();
      console.log('Consultation duration:', Math.floor(duration / 1000), 'seconds');

      // Log consultation end to backend
      await this.logConsultationEnd(meeting.id, duration);
    }
  }

  private async logConsultationEnd(meetingId: string, duration: number) {
    await fetch('https://telehealth-backend.com/consultations/end', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        meetingId,
        duration,
        endedAt: new Date().toISOString()
      })
    });
  }
}
```

### Online Education Platform

```typescript
class OnlineClassroom {
  private videoService: VideoConferenceService;
  private classroomId: string;

  constructor(classroomId: string) {
    this.classroomId = classroomId;
    this.videoService = new VideoConferenceService('https://education-platform.com');
  }

  async startClass(teacherName: string) {
    try {
      await this.videoService.initialize();

      // Create meeting for the class
      const meeting = await this.videoService.createMeeting();

      // Save meeting URL to classroom
      await this.saveClassMeeting(meeting.url);

      // Join as teacher
      await this.videoService.joinMeeting(meeting.url, teacherName);

      console.log('Class started:', this.classroomId);
      return meeting.url;
    } catch (error) {
      console.error('Failed to start class:', error);
      throw error;
    }
  }

  async joinClass(studentName: string) {
    try {
      await this.videoService.initialize();

      // Get meeting URL for classroom
      const meetingUrl = await this.getClassMeeting();

      if (!meetingUrl) {
        throw new Error('No active class session');
      }

      // Join as student
      await this.videoService.joinMeeting(meetingUrl, studentName);

      console.log('Joined class:', this.classroomId);
    } catch (error) {
      console.error('Failed to join class:', error);
      throw error;
    }
  }

  private async saveClassMeeting(meetingUrl: string) {
    await fetch(`https://education-platform.com/classrooms/${this.classroomId}/meeting`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ meetingUrl })
    });
  }

  private async getClassMeeting(): Promise<string | null> {
    const response = await fetch(`https://education-platform.com/classrooms/${this.classroomId}/meeting`);
    const data = await response.json();
    return data.meetingUrl || null;
  }
}
```

## Framework Integration

### React Integration

```typescript
import { useState, useEffect } from 'react';
import { VideoConferenceService } from './VideoConferenceService';

function useVideoConference(backendUrl: string) {
  const [service] = useState(() => new VideoConferenceService(backendUrl));
  const [isReady, setIsReady] = useState(false);
  const [isInMeeting, setIsInMeeting] = useState(false);

  useEffect(() => {
    service.initialize().then(setIsReady);
  }, [service]);

  const createMeeting = async () => {
    const url = await service.createAndJoinMeeting();
    setIsInMeeting(true);
    return url;
  };

  const joinMeeting = async (url: string, name?: string) => {
    await service.joinMeeting(url, name);
    setIsInMeeting(true);
  };

  return {
    isReady,
    isInMeeting,
    createMeeting,
    joinMeeting
  };
}

// Usage in component
function VideoCallScreen() {
  const { isReady, createMeeting, joinMeeting } = useVideoConference('https://your-backend.com');

  return (
    <div>
      <button onClick={createMeeting} disabled={!isReady}>
        Start Meeting
      </button>
      <button onClick={() => joinMeeting('meeting-url')} disabled={!isReady}>
        Join Meeting
      </button>
    </div>
  );
}
```

### Vue 3 Integration

```typescript
import { ref, onMounted } from 'vue';
import { VideoConferenceService } from './VideoConferenceService';

export function useVideoConference(backendUrl: string) {
  const service = new VideoConferenceService(backendUrl);
  const isReady = ref(false);
  const isInMeeting = ref(false);

  onMounted(async () => {
    isReady.value = await service.initialize();
  });

  const createMeeting = async () => {
    const url = await service.createAndJoinMeeting();
    isInMeeting.value = true;
    return url;
  };

  const joinMeeting = async (url: string, name?: string) => {
    await service.joinMeeting(url, name);
    isInMeeting.value = true;
  };

  return {
    isReady,
    isInMeeting,
    createMeeting,
    joinMeeting
  };
}
```

## Best Practices

1. **Initialize Early**: Initialize the plugin when your app starts
2. **Check Permissions**: Verify camera/microphone permissions before starting
3. **Error Handling**: Always wrap calls in try-catch blocks
4. **Backend Security**: Use authentication for meeting creation
5. **Meeting URLs**: Keep meeting URLs secure and validate them
6. **Background Audio**: Configure iOS background modes for audio continuity
7. **User Feedback**: Show loading states and error messages
8. **Network Checks**: Verify internet connectivity before joining

## Troubleshooting

### Meeting Not Starting

```typescript
async function troubleshootMeeting(meetingUrl: string) {
  console.log('Troubleshooting meeting...');

  // Check initialization
  try {
    const version = await CapacitorRealtimekit.getPluginVersion();
    console.log('Plugin version:', version.version);
  } catch (error) {
    console.error('Plugin not initialized');
    return;
  }

  // Verify URL format
  if (!meetingUrl.startsWith('https://')) {
    console.error('Invalid meeting URL, must use HTTPS');
    return;
  }

  // Check network
  if (!navigator.onLine) {
    console.error('No internet connection');
    return;
  }

  console.log('All checks passed, retry starting meeting');
}
```

### Permission Issues

**iOS**: Ensure all usage descriptions are in Info.plist

**Android**: Verify permissions are in AndroidManifest.xml and request them at runtime if needed

### Audio Issues on iOS

Ensure background audio mode is configured:

```xml
<key>UIBackgroundModes</key>
<array>
  <string>audio</string>
  <string>voip</string>
</array>
```

## Conclusion

The `@capgo/capacitor-realtimekit` plugin provides a powerful, easy-to-use solution for adding video conferencing to your Capacitor applications. By leveraging Cloudflare's infrastructure and the plugin's built-in UI, you can create professional video communication features with minimal code.

For more information, visit the [official documentation](https://capgo.app/docs/plugins/realtimekit/) or check the [GitHub repository](https://github.com/Cap-go/capacitor-realtimekit).
