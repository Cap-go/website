---
locale: en
---

# Using @capgo/capacitor-accelerometer Package

The `@capgo/capacitor-accelerometer` package provides access to device accelerometer sensors, allowing you to read acceleration forces and detect device motion in your Capacitor applications. This tutorial will guide you through installation, configuration, and practical usage including shake detection, tilt sensing, and step counting.

## Installation

Install the package using your preferred package manager:

```bash
npm install @capgo/capacitor-accelerometer
npx cap sync
```

## Platform Support

- **iOS**: Full support (all devices)
- **Android**: Full support (all devices)
- **Web**: Supported via DeviceMotion API (requires HTTPS)

No additional configuration required for iOS and Android.

## Basic Usage

### Importing the Plugin

```typescript
import { Accelerometer } from '@capgo/capacitor-accelerometer';
```

### Starting Acceleration Monitoring

```typescript
async function startAccelerometer() {
  try {
    await Accelerometer.start({
      interval: 100 // Update interval in milliseconds
    });

    console.log('Accelerometer started');
  } catch (error) {
    console.error('Failed to start accelerometer:', error);
  }
}
```

### Listening to Acceleration Events

```typescript
function setupAccelerationListener() {
  Accelerometer.addListener('accelerationChange', (data) => {
    console.log('X-axis:', data.x, 'm/s²');
    console.log('Y-axis:', data.y, 'm/s²');
    console.log('Z-axis:', data.z, 'm/s²');
    console.log('Timestamp:', data.timestamp);

    updateDisplay(data);
  });
}

function updateDisplay(data: any) {
  document.getElementById('x-axis').textContent = data.x.toFixed(2);
  document.getElementById('y-axis').textContent = data.y.toFixed(2);
  document.getElementById('z-axis').textContent = data.z.toFixed(2);
}
```

### Getting Current Acceleration

```typescript
async function getCurrentAcceleration() {
  try {
    const reading = await Accelerometer.getCurrentAcceleration();

    console.log('Current acceleration:');
    console.log('X:', reading.x);
    console.log('Y:', reading.y);
    console.log('Z:', reading.z);

    return reading;
  } catch (error) {
    console.error('Failed to get acceleration:', error);
    return null;
  }
}
```

### Stopping Monitoring

```typescript
async function stopAccelerometer() {
  try {
    await Accelerometer.stop();
    console.log('Accelerometer stopped');
  } catch (error) {
    console.error('Failed to stop accelerometer:', error);
  }
}
```

## Understanding Accelerometer Data

### Coordinate System
- **X-axis**: Left (-) to Right (+)
- **Y-axis**: Bottom (-) to Top (+)
- **Z-axis**: Back (-) to Front (+)

### Gravity Effects
When device is at rest:
- Flat on table: Z ≈ 9.8 m/s²
- Standing upright: Y ≈ 9.8 m/s²
- On its side: X ≈ ±9.8 m/s²

### Acceleration Units
- Measured in meters per second squared (m/s²)
- Earth's gravity: 9.8 m/s²
- Total force = device acceleration + gravity

## Complete Accelerometer Service

Here's a comprehensive service for managing accelerometer functionality:

```typescript
import { Accelerometer } from '@capgo/capacitor-accelerometer';

export interface AccelerationData {
  x: number;
  y: number;
  z: number;
  timestamp: number;
}

export class AccelerometerService {
  private listener: any = null;
  private isMonitoring = false;
  private callbacks: Map<string, Function> = new Map();

  async startMonitoring(interval: number = 100): Promise<void> {
    if (this.isMonitoring) {
      console.log('Already monitoring');
      return;
    }

    await Accelerometer.start({ interval });

    this.listener = Accelerometer.addListener('accelerationChange', (data) => {
      this.handleAcceleration(data);
    });

    this.isMonitoring = true;
    console.log('Accelerometer monitoring started');
  }

  async stopMonitoring(): Promise<void> {
    if (!this.isMonitoring) {
      return;
    }

    if (this.listener) {
      this.listener.remove();
      this.listener = null;
    }

    await Accelerometer.stop();

    this.isMonitoring = false;
    console.log('Accelerometer monitoring stopped');
  }

  private handleAcceleration(data: AccelerationData): void {
    this.callbacks.forEach((callback) => {
      callback(data);
    });
  }

  subscribe(key: string, callback: Function): void {
    this.callbacks.set(key, callback);
  }

  unsubscribe(key: string): void {
    this.callbacks.delete(key);
  }

  calculateMagnitude(data: AccelerationData): number {
    return Math.sqrt(
      data.x * data.x +
      data.y * data.y +
      data.z * data.z
    );
  }

  isMonitoringActive(): boolean {
    return this.isMonitoring;
  }
}
```

## Shake Detection

Implement shake gesture detection:

```typescript
class ShakeDetector {
  private accelerometer: AccelerometerService;
  private lastUpdate = 0;
  private lastX = 0;
  private lastY = 0;
  private lastZ = 0;
  private shakeThreshold = 15;
  private shakeInterval = 100; // ms
  private onShakeCallback: Function | null = null;

  constructor() {
    this.accelerometer = new AccelerometerService();
  }

  async start(onShake: Function) {
    this.onShakeCallback = onShake;

    await this.accelerometer.startMonitoring(this.shakeInterval);

    this.accelerometer.subscribe('shake', (data: AccelerationData) => {
      this.detectShake(data);
    });
  }

  async stop() {
    this.accelerometer.unsubscribe('shake');
    await this.accelerometer.stopMonitoring();
  }

  private detectShake(data: AccelerationData): void {
    const currentTime = Date.now();

    if (currentTime - this.lastUpdate > this.shakeInterval) {
      const deltaX = Math.abs(data.x - this.lastX);
      const deltaY = Math.abs(data.y - this.lastY);
      const deltaZ = Math.abs(data.z - this.lastZ);

      if (deltaX > this.shakeThreshold ||
          deltaY > this.shakeThreshold ||
          deltaZ > this.shakeThreshold) {

        console.log('Shake detected!');
        if (this.onShakeCallback) {
          this.onShakeCallback();
        }
      }

      this.lastUpdate = currentTime;
      this.lastX = data.x;
      this.lastY = data.y;
      this.lastZ = data.z;
    }
  }

  setThreshold(threshold: number) {
    this.shakeThreshold = threshold;
  }
}

// Usage
const shakeDetector = new ShakeDetector();
shakeDetector.start(() => {
  console.log('User shook the device!');
  // Trigger shake action
});
```

## Tilt Detection

Detect device orientation and tilt angles:

```typescript
class TiltDetector {
  private accelerometer: AccelerometerService;

  constructor() {
    this.accelerometer = new AccelerometerService();
  }

  async start(onTilt: Function) {
    await this.accelerometer.startMonitoring(200);

    this.accelerometer.subscribe('tilt', (data: AccelerationData) => {
      const tiltInfo = this.analyzeTilt(data);
      onTilt(tiltInfo);
    });
  }

  async stop() {
    this.accelerometer.unsubscribe('tilt');
    await this.accelerometer.stopMonitoring();
  }

  private analyzeTilt(data: AccelerationData) {
    // Calculate tilt angles
    const roll = Math.atan2(data.y, data.z) * (180 / Math.PI);
    const pitch = Math.atan2(-data.x, Math.sqrt(data.y * data.y + data.z * data.z)) * (180 / Math.PI);

    // Determine orientation
    const orientation = this.getOrientation(data);

    return {
      roll: roll.toFixed(1),
      pitch: pitch.toFixed(1),
      orientation: orientation,
      isFlat: this.isDeviceFlat(data),
      isUpright: this.isDeviceUpright(data)
    };
  }

  private getOrientation(data: AccelerationData): string {
    const absX = Math.abs(data.x);
    const absY = Math.abs(data.y);
    const absZ = Math.abs(data.z);

    if (absZ > absX && absZ > absY) {
      return data.z > 0 ? 'face-up' : 'face-down';
    } else if (absY > absX && absY > absZ) {
      return data.y > 0 ? 'portrait' : 'portrait-upside-down';
    } else {
      return data.x > 0 ? 'landscape-right' : 'landscape-left';
    }
  }

  private isDeviceFlat(data: AccelerationData): boolean {
    return Math.abs(data.z - 9.8) < 2.0;
  }

  private isDeviceUpright(data: AccelerationData): boolean {
    return Math.abs(data.y - 9.8) < 2.0;
  }
}

// Usage
const tiltDetector = new TiltDetector();
tiltDetector.start((tiltInfo) => {
  console.log('Roll:', tiltInfo.roll);
  console.log('Pitch:', tiltInfo.pitch);
  console.log('Orientation:', tiltInfo.orientation);
});
```

## Step Counter

Implement a basic step counter:

```typescript
class StepCounter {
  private accelerometer: AccelerometerService;
  private steps = 0;
  private lastMagnitude = 0;
  private threshold = 11;
  private minStepInterval = 300; // ms
  private lastStepTime = 0;

  constructor() {
    this.accelerometer = new AccelerometerService();
  }

  async start(onStep: Function) {
    await this.accelerometer.startMonitoring(50);

    this.accelerometer.subscribe('steps', (data: AccelerationData) => {
      this.detectStep(data, onStep);
    });
  }

  async stop() {
    this.accelerometer.unsubscribe('steps');
    await this.accelerometer.stopMonitoring();
  }

  private detectStep(data: AccelerationData, onStep: Function): void {
    const magnitude = this.accelerometer.calculateMagnitude(data);
    const currentTime = Date.now();

    // Detect peak
    if (magnitude > this.threshold &&
        this.lastMagnitude < this.threshold &&
        currentTime - this.lastStepTime > this.minStepInterval) {

      this.steps++;
      this.lastStepTime = currentTime;

      console.log('Step detected! Total steps:', this.steps);
      onStep(this.steps);
    }

    this.lastMagnitude = magnitude;
  }

  getSteps(): number {
    return this.steps;
  }

  resetSteps(): void {
    this.steps = 0;
  }

  setThreshold(threshold: number) {
    this.threshold = threshold;
  }
}

// Usage
const stepCounter = new StepCounter();
stepCounter.start((steps: number) => {
  console.log('Steps:', steps);
  document.getElementById('step-count').textContent = steps.toString();
});
```

## Motion Activity Detector

Detect different types of motion:

```typescript
class MotionDetector {
  private accelerometer: AccelerometerService;
  private motionBuffer: number[] = [];
  private bufferSize = 20;

  constructor() {
    this.accelerometer = new AccelerometerService();
  }

  async start(onMotionChange: Function) {
    await this.accelerometer.startMonitoring(100);

    this.accelerometer.subscribe('motion', (data: AccelerationData) => {
      const activity = this.analyzeMotion(data);
      onMotionChange(activity);
    });
  }

  async stop() {
    this.accelerometer.unsubscribe('motion');
    await this.accelerometer.stopMonitoring();
  }

  private analyzeMotion(data: AccelerationData): string {
    const magnitude = this.accelerometer.calculateMagnitude(data);

    this.motionBuffer.push(magnitude);
    if (this.motionBuffer.length > this.bufferSize) {
      this.motionBuffer.shift();
    }

    if (this.motionBuffer.length < this.bufferSize) {
      return 'unknown';
    }

    const variance = this.calculateVariance(this.motionBuffer);
    const mean = this.calculateMean(this.motionBuffer);

    // Classify activity
    if (variance < 0.5) {
      return 'stationary';
    } else if (variance < 2.0 && mean < 11) {
      return 'walking';
    } else if (variance > 2.0 && mean < 13) {
      return 'running';
    } else if (variance > 5.0) {
      return 'intense-activity';
    } else {
      return 'moving';
    }
  }

  private calculateMean(values: number[]): number {
    const sum = values.reduce((acc, val) => acc + val, 0);
    return sum / values.length;
  }

  private calculateVariance(values: number[]): number {
    const mean = this.calculateMean(values);
    const squaredDiffs = values.map(value => Math.pow(value - mean, 2));
    return this.calculateMean(squaredDiffs);
  }
}

// Usage
const motionDetector = new MotionDetector();
motionDetector.start((activity: string) => {
  console.log('Current activity:', activity);
  document.getElementById('activity').textContent = activity;
});
```

## Data Filtering

Smooth accelerometer data to reduce noise:

```typescript
class AccelerometerFilter {
  private alpha = 0.8; // Low-pass filter coefficient
  private filteredX = 0;
  private filteredY = 0;
  private filteredZ = 0;

  filter(data: AccelerationData): AccelerationData {
    // Low-pass filter
    this.filteredX = this.alpha * data.x + (1 - this.alpha) * this.filteredX;
    this.filteredY = this.alpha * data.y + (1 - this.alpha) * this.filteredY;
    this.filteredZ = this.alpha * data.z + (1 - this.alpha) * this.filteredZ;

    return {
      x: this.filteredX,
      y: this.filteredY,
      z: this.filteredZ,
      timestamp: data.timestamp
    };
  }

  // Remove gravity component
  removeGravity(data: AccelerationData): AccelerationData {
    const gravityX = this.alpha * this.filteredX;
    const gravityY = this.alpha * this.filteredY;
    const gravityZ = this.alpha * this.filteredZ;

    return {
      x: data.x - gravityX,
      y: data.y - gravityY,
      z: data.z - gravityZ,
      timestamp: data.timestamp
    };
  }
}
```

## Best Practices

1. **Choose Appropriate Intervals**:
   - Gaming: 16-50ms (60-20 FPS)
   - Fitness: 100-200ms
   - General: 200-500ms

2. **Battery Optimization**: Higher frequencies drain battery faster

3. **Data Filtering**: Use low-pass filters to reduce noise

4. **Remove Listeners**: Always clean up when done

5. **Test on Devices**: Simulators don't provide realistic data

6. **Consider Context**: Combine with other sensors for better accuracy

## Troubleshooting

### Noisy Data

```typescript
const filter = new AccelerometerFilter();

Accelerometer.addListener('accelerationChange', (data) => {
  const filtered = filter.filter(data);
  // Use filtered data
});
```

### High Battery Usage

```typescript
// Use longer intervals when precision isn't critical
await Accelerometer.start({ interval: 500 }); // Instead of 100ms
```

### False Shake Detection

```typescript
// Increase threshold or add cooldown period
shakeDetector.setThreshold(20); // Higher threshold
```

## Conclusion

The `@capgo/capacitor-accelerometer` plugin provides powerful motion sensing capabilities for iOS, Android, and Web platforms. By properly implementing accelerometer monitoring, you can create engaging gesture-based interfaces, fitness tracking, and motion-aware applications.

For more information, visit the [official documentation](https://capgo.app/docs/plugins/accelerometer/) or check the [GitHub repository](https://github.com/Cap-go/capacitor-accelerometer).
