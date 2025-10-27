---
locale: en
---

# Using @capgo/capacitor-pedometer Package

The `@capgo/capacitor-pedometer` package provides comprehensive access to device pedometer sensors, allowing you to track steps, distance, pace, cadence, and floors climbed. This tutorial will guide you through installation, configuration, and building complete fitness tracking applications.

## Installation

Install the package using your preferred package manager:

```bash
npm install @capgo/capacitor-pedometer
npx cap sync
```

## Platform Requirements

### iOS
- iOS 8.0 or higher
- iPhone 5S or newer (devices with M7+ motion coprocessor)
- CoreMotion framework (automatically included)

### Android
- Android API 21 (Android 5.0) or higher
- Hardware step counter sensor (most devices since 2014)
- Activity recognition permission

### Web
Not supported - requires native platform sensors.

## iOS Configuration

Add the motion usage description to your app's `Info.plist`:

```xml
<key>NSMotionUsageDescription</key>
<string>We need access to your motion data to track steps and activity</string>
```

## Android Configuration

The plugin automatically adds the `ACTIVITY_RECOGNITION` permission to your `AndroidManifest.xml`.

For Android 10 (API 29) and above, you must request this permission at runtime:

```xml
<uses-permission android:name="android.permission.ACTIVITY_RECOGNITION" />
```

## Basic Usage

### Import the Plugin

```typescript
import { CapacitorPedometer } from '@capgo/capacitor-pedometer';
```

### Check Pedometer Availability

```typescript
async function checkPedometerSupport() {
  const result = await CapacitorPedometer.isAvailable();

  console.log('Step counting available:', result.stepCounting);
  console.log('Distance available:', result.distance);
  console.log('Floor counting available:', result.floorCounting);
  console.log('Pace available:', result.pace);
  console.log('Cadence available:', result.cadence);

  return result;
}
```

### Request Permissions

```typescript
async function requestPermissions() {
  const permission = await CapacitorPedometer.requestPermissions();

  if (permission.activityRecognition === 'granted') {
    console.log('Permission granted');
    return true;
  } else {
    console.error('Permission denied');
    return false;
  }
}
```

### Get Step Count for Today

```typescript
async function getTodaySteps() {
  // Get today at midnight
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const measurements = await CapacitorPedometer.getMeasurement({
    startDate: today,
    endDate: new Date()
  });

  console.log('Steps today:', measurements.numberOfSteps);
  console.log('Distance today:', measurements.distance, 'meters');

  return measurements;
}
```

### Start Real-time Updates

```typescript
// Add listener for real-time pedometer data
CapacitorPedometer.addListener('measurement', (data) => {
  console.log('Steps:', data.numberOfSteps);
  console.log('Distance:', data.distance, 'meters');
  console.log('Floors ascended:', data.floorsAscended);
  console.log('Floors descended:', data.floorsDescended);
  console.log('Current pace:', data.currentPace, 's/m');
  console.log('Current cadence:', data.currentCadence, 'steps/s');
});

// Start receiving updates
await CapacitorPedometer.startMeasurementUpdates();
```

### Stop Updates

```typescript
await CapacitorPedometer.stopMeasurementUpdates();
CapacitorPedometer.removeAllListeners();
```

## Complete Pedometer Service

Here's a production-ready service for tracking steps and activity:

```typescript
import { CapacitorPedometer } from '@capgo/capacitor-pedometer';

export interface PedometerMeasurement {
  numberOfSteps: number;
  distance: number;
  floorsAscended?: number;
  floorsDescended?: number;
  currentPace?: number;
  currentCadence?: number;
  startDate: Date;
  endDate: Date;
}

export class PedometerService {
  private listener: any;
  private isTracking = false;
  private hasPermission = false;

  async initialize(): Promise<boolean> {
    // Check if pedometer is available
    const available = await CapacitorPedometer.isAvailable();

    if (!available.stepCounting) {
      console.error('Step counting not available on this device');
      return false;
    }

    // Check permissions
    const permission = await CapacitorPedometer.checkPermissions();

    if (permission.activityRecognition === 'granted') {
      this.hasPermission = true;
      return true;
    }

    // Request permission if not granted
    const requested = await CapacitorPedometer.requestPermissions();
    this.hasPermission = requested.activityRecognition === 'granted';

    return this.hasPermission;
  }

  async startTracking(onUpdate: (data: PedometerMeasurement) => void): Promise<void> {
    if (this.isTracking) {
      console.log('Already tracking');
      return;
    }

    if (!this.hasPermission) {
      const initialized = await this.initialize();
      if (!initialized) {
        throw new Error('Failed to initialize pedometer');
      }
    }

    // Add listener
    this.listener = CapacitorPedometer.addListener('measurement', (data) => {
      onUpdate(data);
    });

    // Start updates
    await CapacitorPedometer.startMeasurementUpdates();
    this.isTracking = true;

    console.log('Pedometer tracking started');
  }

  async stopTracking(): Promise<void> {
    if (!this.isTracking) {
      return;
    }

    await CapacitorPedometer.stopMeasurementUpdates();

    if (this.listener) {
      this.listener.remove();
      this.listener = null;
    }

    this.isTracking = false;
    console.log('Pedometer tracking stopped');
  }

  async getTodaySteps(): Promise<number> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const measurements = await CapacitorPedometer.getMeasurement({
      startDate: today,
      endDate: new Date()
    });

    return measurements.numberOfSteps;
  }

  async getStepsForDate(date: Date): Promise<PedometerMeasurement> {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    return await CapacitorPedometer.getMeasurement({
      startDate: startOfDay,
      endDate: endOfDay
    });
  }

  async getStepsForDateRange(startDate: Date, endDate: Date): Promise<PedometerMeasurement> {
    return await CapacitorPedometer.getMeasurement({
      startDate,
      endDate
    });
  }

  async getWeeklySteps(): Promise<number[]> {
    const today = new Date();
    const weekSteps: number[] = [];

    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);

      const measurements = await this.getStepsForDate(date);
      weekSteps.push(measurements.numberOfSteps);
    }

    return weekSteps;
  }

  isCurrentlyTracking(): boolean {
    return this.isTracking;
  }

  formatDistance(meters: number): string {
    if (meters < 1000) {
      return `${meters.toFixed(0)} m`;
    } else {
      return `${(meters / 1000).toFixed(2)} km`;
    }
  }

  calculateCalories(steps: number, weightKg: number = 70): number {
    // Rough estimate: 0.04 calories per step per kg of body weight
    return steps * 0.04 * weightKg;
  }
}
```

## Application Examples

### Fitness Tracking App

```typescript
class FitnessApp {
  private pedometer: PedometerService;
  private dailyGoal = 10000; // steps

  constructor() {
    this.pedometer = new PedometerService();
  }

  async initialize() {
    const initialized = await this.pedometer.initialize();

    if (!initialized) {
      this.showError('Pedometer not available on this device');
      return;
    }

    await this.startDailyTracking();
  }

  async startDailyTracking() {
    await this.pedometer.startTracking((data) => {
      this.updateUI(data);
      this.checkDailyGoal(data.numberOfSteps);
    });
  }

  updateUI(data: PedometerMeasurement) {
    const steps = data.numberOfSteps;
    const distance = this.pedometer.formatDistance(data.distance);
    const calories = this.pedometer.calculateCalories(steps);
    const progress = (steps / this.dailyGoal) * 100;

    console.log('=== Daily Activity ===');
    console.log(`Steps: ${steps} / ${this.dailyGoal}`);
    console.log(`Distance: ${distance}`);
    console.log(`Calories: ${calories.toFixed(0)} kcal`);
    console.log(`Progress: ${progress.toFixed(0)}%`);

    if (data.floorsAscended !== undefined) {
      console.log(`Floors climbed: ${data.floorsAscended}`);
    }
  }

  checkDailyGoal(steps: number) {
    if (steps >= this.dailyGoal) {
      this.showAchievement('Daily goal reached! 🎉');
    }
  }

  async showWeeklySummary() {
    const weeklySteps = await this.pedometer.getWeeklySteps();
    const totalSteps = weeklySteps.reduce((sum, steps) => sum + steps, 0);
    const avgSteps = Math.floor(totalSteps / 7);

    console.log('=== Weekly Summary ===');
    console.log(`Total steps: ${totalSteps}`);
    console.log(`Average daily: ${avgSteps}`);
    console.log(`Days goal met: ${weeklySteps.filter(s => s >= this.dailyGoal).length}`);

    weeklySteps.forEach((steps, index) => {
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const date = new Date();
      date.setDate(date.getDate() - (6 - index));
      console.log(`${days[date.getDay()]}: ${steps} steps`);
    });
  }

  private showError(message: string) {
    console.error('Error:', message);
  }

  private showAchievement(message: string) {
    console.log('Achievement:', message);
    // Show notification
  }
}

// Usage
const app = new FitnessApp();
app.initialize();
```

### Step Challenge App

```typescript
class StepChallengeApp {
  private pedometer: PedometerService;
  private challenges: Map<string, StepChallenge> = new Map();

  constructor() {
    this.pedometer = new PedometerService();
  }

  async createChallenge(name: string, targetSteps: number, durationDays: number) {
    const challenge: StepChallenge = {
      id: Date.now().toString(),
      name,
      targetSteps,
      startDate: new Date(),
      endDate: new Date(Date.now() + durationDays * 24 * 60 * 60 * 1000),
      currentSteps: 0,
      participants: []
    };

    this.challenges.set(challenge.id, challenge);

    // Start tracking
    await this.pedometer.startTracking((data) => {
      this.updateChallengeProgress(challenge.id, data.numberOfSteps);
    });

    return challenge;
  }

  updateChallengeProgress(challengeId: string, steps: number) {
    const challenge = this.challenges.get(challengeId);

    if (!challenge) return;

    challenge.currentSteps = steps;
    const progress = (steps / challenge.targetSteps) * 100;

    console.log(`Challenge: ${challenge.name}`);
    console.log(`Progress: ${steps} / ${challenge.targetSteps} (${progress.toFixed(0)}%)`);

    if (steps >= challenge.targetSteps) {
      this.completeChallenge(challengeId);
    }
  }

  completeChallenge(challengeId: string) {
    const challenge = this.challenges.get(challengeId);

    if (challenge) {
      console.log(`🏆 Challenge completed: ${challenge.name}`);
      // Award badge, notify participants, etc.
    }
  }

  async getChallengeLeaderboard(challengeId: string) {
    const challenge = this.challenges.get(challengeId);

    if (!challenge) return [];

    // Sort participants by steps
    return challenge.participants.sort((a, b) => b.steps - a.steps);
  }
}

interface StepChallenge {
  id: string;
  name: string;
  targetSteps: number;
  startDate: Date;
  endDate: Date;
  currentSteps: number;
  participants: Array<{ id: string; name: string; steps: number }>;
}
```

### Health Dashboard

```typescript
class HealthDashboard {
  private pedometer: PedometerService;

  constructor() {
    this.pedometer = new PedometerService();
  }

  async initialize() {
    await this.pedometer.initialize();
    await this.startTracking();
  }

  async startTracking() {
    await this.pedometer.startTracking((data) => {
      this.displayHealthMetrics(data);
    });
  }

  displayHealthMetrics(data: PedometerMeasurement) {
    const metrics = this.calculateHealthMetrics(data);

    console.log('=== Health Metrics ===');
    console.log(`Steps: ${metrics.steps}`);
    console.log(`Distance: ${metrics.distance}`);
    console.log(`Active time: ${metrics.activeMinutes} min`);
    console.log(`Calories: ${metrics.calories} kcal`);
    console.log(`Pace: ${metrics.pace}`);

    if (metrics.floorsClimbed) {
      console.log(`Floors: ${metrics.floorsClimbed}`);
    }

    // Activity level
    console.log(`Activity: ${this.getActivityLevel(metrics.steps)}`);
  }

  calculateHealthMetrics(data: PedometerMeasurement) {
    const steps = data.numberOfSteps;
    const distance = this.pedometer.formatDistance(data.distance);
    const calories = this.pedometer.calculateCalories(steps);

    // Estimate active time (assuming 100 steps per minute)
    const activeMinutes = Math.floor(steps / 100);

    // Format pace
    let pace = 'N/A';
    if (data.currentPace) {
      const minsPerKm = (data.currentPace * 1000) / 60;
      pace = `${minsPerKm.toFixed(2)} min/km`;
    }

    return {
      steps,
      distance,
      activeMinutes,
      calories: calories.toFixed(0),
      pace,
      floorsClimbed: data.floorsAscended
    };
  }

  getActivityLevel(steps: number): string {
    if (steps < 3000) return 'Sedentary 😴';
    if (steps < 5000) return 'Lightly Active 🚶';
    if (steps < 7500) return 'Moderately Active 🚶‍♂️';
    if (steps < 10000) return 'Active 🏃';
    return 'Very Active 🏃‍♂️';
  }

  async generateMonthlyReport() {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const measurements = await this.pedometer.getStepsForDateRange(
      startOfMonth,
      endOfMonth
    );

    const totalSteps = measurements.numberOfSteps;
    const totalDistance = measurements.distance;
    const days = endOfMonth.getDate();
    const avgSteps = Math.floor(totalSteps / days);

    console.log('=== Monthly Report ===');
    console.log(`Total steps: ${totalSteps}`);
    console.log(`Total distance: ${this.pedometer.formatDistance(totalDistance)}`);
    console.log(`Average daily: ${avgSteps} steps`);
    console.log(`Days tracked: ${days}`);
  }
}
```

## Framework Integration

### React Integration

```typescript
import { useState, useEffect } from 'react';
import { PedometerService, PedometerMeasurement } from './PedometerService';

function usePedometer() {
  const [service] = useState(() => new PedometerService());
  const [steps, setSteps] = useState(0);
  const [distance, setDistance] = useState(0);
  const [isTracking, setIsTracking] = useState(false);

  useEffect(() => {
    service.initialize();

    return () => {
      service.stopTracking();
    };
  }, [service]);

  const startTracking = async () => {
    await service.startTracking((data: PedometerMeasurement) => {
      setSteps(data.numberOfSteps);
      setDistance(data.distance);
    });
    setIsTracking(true);
  };

  const stopTracking = async () => {
    await service.stopTracking();
    setIsTracking(false);
  };

  return {
    steps,
    distance,
    isTracking,
    startTracking,
    stopTracking
  };
}

// Usage in component
function StepCounter() {
  const { steps, distance, isTracking, startTracking, stopTracking } = usePedometer();

  return (
    <div>
      <h1>Steps Today: {steps}</h1>
      <p>Distance: {(distance / 1000).toFixed(2)} km</p>
      <button onClick={isTracking ? stopTracking : startTracking}>
        {isTracking ? 'Stop' : 'Start'} Tracking
      </button>
    </div>
  );
}
```

### Vue 3 Integration

```typescript
import { ref, onMounted, onUnmounted } from 'vue';
import { PedometerService } from './PedometerService';

export function usePedometer() {
  const service = new PedometerService();
  const steps = ref(0);
  const distance = ref(0);
  const isTracking = ref(false);

  onMounted(async () => {
    await service.initialize();
  });

  onUnmounted(async () => {
    await service.stopTracking();
  });

  const startTracking = async () => {
    await service.startTracking((data) => {
      steps.value = data.numberOfSteps;
      distance.value = data.distance;
    });
    isTracking.value = true;
  };

  const stopTracking = async () => {
    await service.stopTracking();
    isTracking.value = false;
  };

  return {
    steps,
    distance,
    isTracking,
    startTracking,
    stopTracking
  };
}
```

## Understanding Pedometer Data

### Step Counting
- Measured by device motion sensors
- Accuracy: ±5% under normal conditions
- Works in background (with proper permissions)

### Distance Calculation
- Estimated from steps and average stride length
- Default stride: ~0.762 meters (30 inches)
- More accurate with user calibration

### Pace & Cadence
- **Pace**: Time per unit distance (seconds/meter)
- **Cadence**: Steps per second
- Available during active movement

### Floor Counting (iOS only)
- Requires barometric pressure sensor
- Detects elevation changes
- One floor ≈ 3 meters vertical

## Best Practices

1. **Check Availability**: Always verify pedometer support before use
2. **Request Permissions Early**: Ask for permissions at app start
3. **Battery Optimization**: Stop updates when not needed
4. **Background Tracking**: Configure background modes for iOS
5. **Data Validation**: Filter unrealistic values
6. **User Calibration**: Allow users to set stride length
7. **Privacy**: Be transparent about data collection

## Troubleshooting

### Permission Denied

```typescript
async function handlePermissionDenied() {
  const permission = await CapacitorPedometer.checkPermissions();

  if (permission.activityRecognition === 'denied') {
    alert(
      'Motion tracking permission is required. Please enable it in Settings:\n\n' +
      'iOS: Settings > [App] > Motion & Fitness\n' +
      'Android: Settings > Apps > [App] > Permissions > Physical activity'
    );
  }
}
```

### Steps Not Updating

```typescript
async function troubleshootTracking() {
  // Check availability
  const available = await CapacitorPedometer.isAvailable();
  if (!available.stepCounting) {
    console.error('Step counting not available');
    return;
  }

  // Check permissions
  const permission = await CapacitorPedometer.checkPermissions();
  if (permission.activityRecognition !== 'granted') {
    console.error('Permission not granted');
    return;
  }

  // Restart tracking
  await CapacitorPedometer.stopMeasurementUpdates();
  await CapacitorPedometer.startMeasurementUpdates();

  console.log('Tracking restarted');
}
```

### Background Tracking on iOS

Add background modes to `Info.plist`:

```xml
<key>UIBackgroundModes</key>
<array>
  <string>fitness</string>
</array>
```

## Conclusion

The `@capgo/capacitor-pedometer` plugin provides powerful step tracking and activity monitoring capabilities for iOS and Android platforms. By properly implementing pedometer tracking, you can create engaging fitness applications that help users reach their health goals.

For more information, visit the [official documentation](https://capgo.app/docs/plugins/pedometer/) or check the [GitHub repository](https://github.com/Cap-go/capacitor-pedometer).
