---
locale: en
---
# Using @capgo/capacitor-ibeacon Package

The `@capgo/capacitor-ibeacon` package enables iBeacon detection and monitoring in your Capacitor apps, providing proximity detection, region monitoring, and beacon ranging capabilities. In this tutorial, we will guide you through the installation, configuration, and usage of this package in your Ionic Capacitor app.

## Installation

To install the `@capgo/capacitor-ibeacon` package, run the following command in your project's root directory:

```bash
npm install @capgo/capacitor-ibeacon
npx cap sync
```

## iOS Setup

### 1. Configure Info.plist

Add the following permissions to your `Info.plist` file:

```xml
<key>NSLocationWhenInUseUsageDescription</key>
<string>This app needs location access to detect nearby beacons</string>

<key>NSLocationAlwaysAndWhenInUseUsageDescription</key>
<string>This app needs location access to monitor beacons in the background</string>

<key>NSBluetoothAlwaysUsageDescription</key>
<string>This app uses Bluetooth to detect nearby beacons</string>

<key>UIBackgroundModes</key>
<array>
  <string>location</string>
</array>
```

The plugin uses native CoreLocation framework and works out of the box on iOS after adding these permissions.

## Android Setup

### 1. Configure AndroidManifest.xml

Add the necessary permissions to your `AndroidManifest.xml`:

```xml
<manifest>
  <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
  <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
  <uses-permission android:name="android.permission.BLUETOOTH" />
  <uses-permission android:name="android.permission.BLUETOOTH_ADMIN" />
  <uses-permission android:name="android.permission.ACCESS_BACKGROUND_LOCATION" />
</manifest>
```

### 2. Add AltBeacon Library

The Android implementation requires the AltBeacon library. Add it to your app's `build.gradle`:

```gradle
dependencies {
    implementation 'org.altbeacon:android-beacon-library:2.20+'
}
```

## API Usage

### Request Permissions

Before using beacon features, request location permissions:

```typescript
import { CapacitorIbeacon } from '@capgo/capacitor-ibeacon';

async function requestPermissions() {
  // Request "When In Use" permission (for foreground use)
  const { status } = await CapacitorIbeacon.requestWhenInUseAuthorization();
  console.log('Permission status:', status);

  if (status === 'authorized_when_in_use' || status === 'authorized_always') {
    console.log('Permission granted');
  } else {
    console.log('Permission denied');
  }
}

async function requestAlwaysPermission() {
  // Request "Always" permission (for background monitoring)
  const { status } = await CapacitorIbeacon.requestAlwaysAuthorization();
  console.log('Always permission status:', status);
}
```

### Check Device Capabilities

Verify that the device supports beacon detection:

```typescript
async function checkCapabilities() {
  // Check if Bluetooth is enabled
  const { enabled } = await CapacitorIbeacon.isBluetoothEnabled();
  if (!enabled) {
    console.log('Please enable Bluetooth');
    return false;
  }

  // Check if ranging is available
  const { available } = await CapacitorIbeacon.isRangingAvailable();
  if (!available) {
    console.log('Beacon ranging is not available on this device');
    return false;
  }

  return true;
}
```

### Monitor Beacon Regions

Monitoring allows you to detect when users enter or exit a beacon region, even in the background:

```typescript
async function startMonitoring() {
  await CapacitorIbeacon.startMonitoringForRegion({
    identifier: 'MyStoreRegion',
    uuid: 'B9407F30-F5F8-466E-AFF9-25556B57FE6D',
    major: 1, // Optional
    minor: 2  // Optional
  });

  console.log('Started monitoring for beacon region');
}

async function stopMonitoring() {
  await CapacitorIbeacon.stopMonitoringForRegion({
    identifier: 'MyStoreRegion',
    uuid: 'B9407F30-F5F8-466E-AFF9-25556B57FE6D'
  });

  console.log('Stopped monitoring');
}
```

### Range Beacons

Ranging provides continuous updates about nearby beacons and their distances (foreground only):

```typescript
async function startRanging() {
  await CapacitorIbeacon.startRangingBeaconsInRegion({
    identifier: 'MyStoreRegion',
    uuid: 'B9407F30-F5F8-466E-AFF9-25556B57FE6D'
  });

  console.log('Started ranging beacons');
}

async function stopRanging() {
  await CapacitorIbeacon.stopRangingBeaconsInRegion({
    identifier: 'MyStoreRegion',
    uuid: 'B9407F30-F5F8-466E-AFF9-25556B57FE6D'
  });

  console.log('Stopped ranging');
}
```

### Listen to Beacon Events

Set up event listeners to respond to beacon detection:

```typescript
import { PluginListenerHandle } from '@capacitor/core';

let rangingListener: PluginListenerHandle;
let enterListener: PluginListenerHandle;
let exitListener: PluginListenerHandle;

async function setupBeaconListeners() {
  // Listen for ranging updates (continuous distance measurements)
  rangingListener = await CapacitorIbeacon.addListener(
    'didRangeBeacons',
    (data) => {
      console.log('Beacons detected:', data.beacons.length);

      data.beacons.forEach(beacon => {
        console.log(`Beacon: ${beacon.uuid}`);
        console.log(`Major: ${beacon.major}, Minor: ${beacon.minor}`);
        console.log(`Distance: ${beacon.accuracy.toFixed(2)}m`);
        console.log(`Proximity: ${beacon.proximity}`);
        console.log(`RSSI: ${beacon.rssi}`);

        // Handle based on proximity
        switch (beacon.proximity) {
          case 'immediate':
            console.log('Very close to beacon (< 0.5m)');
            break;
          case 'near':
            console.log('Near beacon (0.5m - 3m)');
            break;
          case 'far':
            console.log('Far from beacon (> 3m)');
            break;
          case 'unknown':
            console.log('Distance unknown');
            break;
        }
      });
    }
  );

  // Listen for region entry
  enterListener = await CapacitorIbeacon.addListener(
    'didEnterRegion',
    (data) => {
      console.log('Entered beacon region:', data.region.identifier);
      // Show welcome message, trigger content, etc.
      showWelcomeNotification();
    }
  );

  // Listen for region exit
  exitListener = await CapacitorIbeacon.addListener(
    'didExitRegion',
    (data) => {
      console.log('Exited beacon region:', data.region.identifier);
      // Show goodbye message, save data, etc.
      showGoodbyeNotification();
    }
  );

  // Listen for region state determination
  const stateListener = await CapacitorIbeacon.addListener(
    'didDetermineStateForRegion',
    (data) => {
      console.log(`Region ${data.region.identifier}: ${data.state}`);
      // state can be 'inside', 'outside', or 'unknown'
    }
  );
}

function removeListeners() {
  rangingListener?.remove();
  enterListener?.remove();
  exitListener?.remove();
}
```

### Advertise as iBeacon (iOS Only)

Turn your device into an iBeacon transmitter:

```typescript
async function startAdvertising() {
  try {
    await CapacitorIbeacon.startAdvertising({
      uuid: 'B9407F30-F5F8-466E-AFF9-25556B57FE6D',
      major: 1,
      minor: 2,
      identifier: 'MyBeacon',
      measuredPower: -59 // Optional: calibrated RSSI at 1 meter
    });

    console.log('Started advertising as iBeacon');
  } catch (error) {
    console.error('Failed to start advertising:', error);
  }
}

async function stopAdvertising() {
  await CapacitorIbeacon.stopAdvertising();
  console.log('Stopped advertising');
}
```

### Enable ARMA Filtering (Android Only)

For smoother distance measurements on Android:

```typescript
async function enableFiltering() {
  await CapacitorIbeacon.enableARMAFilter({ enabled: true });
  console.log('ARMA filtering enabled');
}
```

## Complete Example

Here's a complete example of a beacon service:

```typescript
import { CapacitorIbeacon } from '@capgo/capacitor-ibeacon';
import { PluginListenerHandle } from '@capacitor/core';

export class BeaconService {
  private listeners: PluginListenerHandle[] = [];
  private isInitialized = false;

  async initialize(): Promise<boolean> {
    try {
      // Check permissions
      const { status } = await CapacitorIbeacon.requestWhenInUseAuthorization();
      if (status !== 'authorized_when_in_use' && status !== 'authorized_always') {
        console.error('Location permission not granted');
        return false;
      }

      // Check Bluetooth
      const { enabled } = await CapacitorIbeacon.isBluetoothEnabled();
      if (!enabled) {
        console.error('Bluetooth is not enabled');
        return false;
      }

      // Check ranging availability
      const { available } = await CapacitorIbeacon.isRangingAvailable();
      if (!available) {
        console.error('Ranging not available');
        return false;
      }

      this.setupListeners();
      this.isInitialized = true;
      return true;
    } catch (error) {
      console.error('Failed to initialize beacon service:', error);
      return false;
    }
  }

  private async setupListeners() {
    // Ranging listener
    this.listeners.push(
      await CapacitorIbeacon.addListener('didRangeBeacons', (data) => {
        this.handleRangedBeacons(data.beacons);
      })
    );

    // Entry listener
    this.listeners.push(
      await CapacitorIbeacon.addListener('didEnterRegion', (data) => {
        console.log('Welcome! Entered region:', data.region.identifier);
        this.onEnterRegion(data.region);
      })
    );

    // Exit listener
    this.listeners.push(
      await CapacitorIbeacon.addListener('didExitRegion', (data) => {
        console.log('Goodbye! Left region:', data.region.identifier);
        this.onExitRegion(data.region);
      })
    );

    // State listener
    this.listeners.push(
      await CapacitorIbeacon.addListener('didDetermineStateForRegion', (data) => {
        console.log(`Region ${data.region.identifier} state: ${data.state}`);
      })
    );
  }

  async startMonitoringRegion(
    uuid: string,
    identifier: string,
    major?: number,
    minor?: number
  ) {
    if (!this.isInitialized) {
      throw new Error('Beacon service not initialized');
    }

    await CapacitorIbeacon.startMonitoringForRegion({
      identifier,
      uuid,
      major,
      minor
    });

    console.log(`Started monitoring region: ${identifier}`);
  }

  async startRangingRegion(uuid: string, identifier: string) {
    if (!this.isInitialized) {
      throw new Error('Beacon service not initialized');
    }

    await CapacitorIbeacon.startRangingBeaconsInRegion({
      identifier,
      uuid
    });

    console.log(`Started ranging in region: ${identifier}`);
  }

  async stopMonitoringRegion(uuid: string, identifier: string) {
    await CapacitorIbeacon.stopMonitoringForRegion({
      identifier,
      uuid
    });

    console.log(`Stopped monitoring region: ${identifier}`);
  }

  async stopRangingRegion(uuid: string, identifier: string) {
    await CapacitorIbeacon.stopRangingBeaconsInRegion({
      identifier,
      uuid
    });

    console.log(`Stopped ranging in region: ${identifier}`);
  }

  private handleRangedBeacons(beacons: any[]) {
    if (beacons.length === 0) {
      return;
    }

    // Find nearest beacon
    const nearest = beacons.reduce((prev, current) => {
      return current.accuracy < prev.accuracy ? current : prev;
    });

    console.log('Nearest beacon:', {
      uuid: nearest.uuid,
      major: nearest.major,
      minor: nearest.minor,
      distance: `${nearest.accuracy.toFixed(2)}m`,
      proximity: nearest.proximity
    });

    // Handle proximity-based actions
    this.handleProximityChange(nearest);
  }

  private handleProximityChange(beacon: any) {
    switch (beacon.proximity) {
      case 'immediate': // < 0.5m
        this.onImmediateProximity(beacon);
        break;
      case 'near': // 0.5m - 3m
        this.onNearProximity(beacon);
        break;
      case 'far': // > 3m
        this.onFarProximity(beacon);
        break;
      case 'unknown':
        console.log('Beacon distance unknown');
        break;
    }
  }

  private onEnterRegion(region: any) {
    // Implement your logic for entering a region
    // E.g., show welcome notification, load content, etc.
    console.log('Implementing enter region logic for:', region);
  }

  private onExitRegion(region: any) {
    // Implement your logic for exiting a region
    // E.g., save state, show goodbye message, etc.
    console.log('Implementing exit region logic for:', region);
  }

  private onImmediateProximity(beacon: any) {
    console.log('Very close to beacon - trigger immediate action');
    // E.g., unlock door, show detailed info, etc.
  }

  private onNearProximity(beacon: any) {
    console.log('Near beacon - show relevant content');
    // E.g., display product info, show directions, etc.
  }

  private onFarProximity(beacon: any) {
    console.log('Far from beacon - show general info');
    // E.g., show overview, general notifications, etc.
  }

  cleanup() {
    this.listeners.forEach(listener => listener.remove());
    this.listeners = [];
    this.isInitialized = false;
  }
}
```

## Usage in Your App

```typescript
// Initialize the beacon service
const beaconService = new BeaconService();

async function initBeacons() {
  const initialized = await beaconService.initialize();

  if (initialized) {
    // Start monitoring for your beacon region
    await beaconService.startMonitoringRegion(
      'B9407F30-F5F8-466E-AFF9-25556B57FE6D',
      'MyStore',
      1,
      2
    );

    // Start ranging for distance updates
    await beaconService.startRangingRegion(
      'B9407F30-F5F8-466E-AFF9-25556B57FE6D',
      'MyStore'
    );
  }
}

// Clean up when component unmounts
function cleanup() {
  beaconService.cleanup();
}
```

## Use Cases

### 1. Proximity Marketing

Trigger notifications or content when users approach your store:

```typescript
private onEnterRegion(region: any) {
  if (region.identifier === 'MyStore') {
    showNotification('Welcome to our store! Check out today\'s deals!');
    loadPromotionalContent();
  }
}
```

### 2. Indoor Navigation

Guide users through a building:

```typescript
private handleRangedBeacons(beacons: any[]) {
  const sortedBeacons = beacons.sort((a, b) => a.accuracy - b.accuracy);
  const nearest = sortedBeacons[0];

  // Update navigation based on nearest beacon
  updateNavigationRoute(nearest.major, nearest.minor);
}
```

### 3. Attendance Tracking

Automatically check-in when users enter a location:

```typescript
private async onEnterRegion(region: any) {
  if (region.identifier === 'Office') {
    await checkInEmployee();
  }
}
```

### 4. Museum Tours

Provide contextual information about exhibits:

```typescript
private onNearProximity(beacon: any) {
  // Each beacon represents a different exhibit
  const exhibitInfo = getExhibitInfo(beacon.major, beacon.minor);
  displayExhibitContent(exhibitInfo);
}
```

## Best Practices

1. **Request Appropriate Permissions**
   - Use "When In Use" for foreground features
   - Only request "Always" if you truly need background monitoring
   - Explain clearly why you need location access

2. **Battery Optimization**
   - Use monitoring instead of ranging when possible (more efficient)
   - Stop ranging when not actively needed
   - Consider using wider beacon regions to reduce processing

3. **Handle Bluetooth State**
   - Always check if Bluetooth is enabled before starting
   - Provide clear instructions if Bluetooth is off
   - Handle Bluetooth state changes gracefully

4. **Error Handling**
   ```typescript
   try {
     await CapacitorIbeacon.startMonitoringForRegion(region);
   } catch (error) {
     console.error('Failed to start monitoring:', error);
     // Show user-friendly error message
   }
   ```

5. **Clean Up Resources**
   - Always remove event listeners when done
   - Stop ranging/monitoring when leaving the screen
   - Implement proper lifecycle management

6. **Test on Real Devices**
   - Beacon features don't work in simulators/emulators
   - Test with physical beacons
   - Verify background monitoring works as expected

## Troubleshooting

### Beacons Not Detected
- Ensure Bluetooth is enabled
- Verify location permissions are granted
- Check that beacon UUID matches exactly (case-sensitive)
- Confirm beacon is powered and transmitting
- Try removing major/minor filters initially

### Background Monitoring Not Working
- Verify "Always" location permission is granted
- Check that `UIBackgroundModes` includes `location` (iOS)
- Ensure `ACCESS_BACKGROUND_LOCATION` is added (Android 10+)
- Note: iOS may delay callbacks to save battery

### Inaccurate Distance Measurements
- RSSI values vary with environment (walls, interference)
- Use multiple beacons for better accuracy
- Calibrate `measuredPower` at exactly 1 meter from beacon
- Enable ARMA filtering on Android for smoother values
- Consider proximity zones rather than exact distances

### Permission Denied
- Check Info.plist usage descriptions are clear and accurate
- Verify AndroidManifest.xml has correct permissions
- On Android 12+, ensure BLUETOOTH_SCAN permission is requested
- Provide clear explanation to users about why permissions are needed

## Conclusion

The `@capgo/capacitor-ibeacon` plugin provides powerful beacon detection and monitoring capabilities for your Capacitor app. By following this tutorial, you can implement proximity-based features, indoor navigation, attendance tracking, and location-aware experiences.

For more information, visit the [official documentation](https://capgo.app/docs/plugins/ibeacon/) or check the [GitHub repository](https://github.com/Cap-go/capacitor-ibeacon).
