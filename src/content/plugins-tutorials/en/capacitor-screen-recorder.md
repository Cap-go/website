---
locale: en
---
# @capgo/capacitor-screen-recorder
A Capacitor plugin for recording the device's screen.

## Installation
To install the package, run the following command:
```
npm install @capgo/capacitor-screen-recorder
npx cap sync
```
Make sure to add the necessary permissions and configurations for the plugin to work properly.

## Usage
To start recording the screen, use the `start()` method:
```typescript
import { Plugins } from '@capacitor/core';
const { CapacitorScreenRecorder } = Plugins;

CapacitorScreenRecorder.start();
```

To stop the recording, use the `stop()` method:
```typescript
import { Plugins } from '@capacitor/core';
const { CapacitorScreenRecorder } = Plugins;

CapacitorScreenRecorder.stop();
```

That's it! You can now record the screen of your device using the Capacitor Screen Recorder plugin.
## Android

Add this permissions
```xml
  <uses-permission android:name="android.permission.CAPTURE_VIDEO_OUTPUT" />
  <uses-permission android:name="android.permission.FOREGROUND_SERVICE_MEDIA_PROJECTION" />
```

## Compatibility
This plugin is compatible with Capacitor 4 and above.

## Contributing
Contributions to this plugin are greatly appreciated. If you encounter any issues or have any suggestions, please feel free to submit a pull request or create an issue on the GitHub repository.

## License
This package is licensed under the MIT License.
