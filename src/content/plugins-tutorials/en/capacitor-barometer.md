---
locale: en
---

# Using @capgo/capacitor-barometer Package

The `@capgo/capacitor-barometer` package provides access to device barometric pressure sensors, allowing you to monitor atmospheric pressure and calculate altitude changes in your Capacitor applications. This tutorial will guide you through installation, configuration, and practical usage.

## Installation

Install the package using your preferred package manager:

```bash
npm install @capgo/capacitor-barometer
npx cap sync
```

## Platform Requirements

### iOS
- Requires iPhone 6 or newer (devices with barometer sensor)
- No additional configuration needed

### Android
- Requires device with pressure sensor (TYPE_PRESSURE)
- Automatically available on supported devices

### Web
Not supported - browsers don't provide barometer API access.

## Basic Usage

### Importing the Plugin

```typescript
import { Barometer } from '@capgo/capacitor-barometer';
```

### Checking Sensor Availability

Always check if the barometer is available before using it:

```typescript
async function checkBarometerAvailability() {
  try {
    const { available } = await Barometer.isAvailable();

    if (available) {
      console.log('Barometer sensor is available');
      return true;
    } else {
      console.log('Barometer not available on this device');
      return false;
    }
  } catch (error) {
    console.error('Error checking barometer:', error);
    return false;
  }
}
```

### Starting Pressure Monitoring

```typescript
async function startMonitoring() {
  const isAvailable = await checkBarometerAvailability();

  if (!isAvailable) {
    alert('Barometer not available on this device');
    return;
  }

  try {
    await Barometer.start({
      interval: 1000 // Update interval in milliseconds
    });

    console.log('Barometer monitoring started');
  } catch (error) {
    console.error('Failed to start barometer:', error);
  }
}
```

### Listening to Pressure Changes

```typescript
function setupPressureListener() {
  Barometer.addListener('pressureChange', (data) => {
    console.log('Atmospheric Pressure:', data.pressure, 'hPa');
    console.log('Relative Altitude:', data.relativeAltitude, 'm');
    console.log('Timestamp:', data.timestamp);

    updateUI(data);
  });
}

function updateUI(data: any) {
  // Update your UI with pressure and altitude data
  document.getElementById('pressure').textContent = `${data.pressure.toFixed(1)} hPa`;
  document.getElementById('altitude').textContent = `${data.relativeAltitude.toFixed(1)} m`;
}
```

### Getting Current Reading

```typescript
async function getCurrentPressure() {
  try {
    const reading = await Barometer.getCurrentReading();

    console.log('Current pressure:', reading.pressure, 'hPa');
    console.log('Relative altitude:', reading.relativeAltitude, 'm');

    return reading;
  } catch (error) {
    console.error('Failed to get reading:', error);
    return null;
  }
}
```

### Stopping Monitoring

```typescript
async function stopMonitoring() {
  try {
    await Barometer.stop();
    console.log('Barometer monitoring stopped');
  } catch (error) {
    console.error('Failed to stop barometer:', error);
  }
}
```

## Complete Barometer Service

Here's a comprehensive service for managing barometer functionality:

```typescript
import { Barometer } from '@capgo/capacitor-barometer';

export interface PressureReading {
  pressure: number;        // hPa
  relativeAltitude: number; // meters
  timestamp: number;
}

export class BarometerService {
  private listener: any = null;
  private isMonitoring = false;
  private readings: PressureReading[] = [];
  private maxReadings = 100;

  async initialize(): Promise<boolean> {
    const { available } = await Barometer.isAvailable();

    if (!available) {
      console.warn('Barometer not available');
      return false;
    }

    return true;
  }

  async startMonitoring(interval: number = 1000): Promise<void> {
    if (this.isMonitoring) {
      console.log('Already monitoring');
      return;
    }

    const initialized = await this.initialize();
    if (!initialized) {
      throw new Error('Barometer not available');
    }

    await Barometer.start({ interval });

    this.listener = Barometer.addListener('pressureChange', (data) => {
      this.handlePressureChange(data);
    });

    this.isMonitoring = true;
    console.log('Barometer monitoring started');
  }

  async stopMonitoring(): Promise<void> {
    if (!this.isMonitoring) {
      return;
    }

    if (this.listener) {
      this.listener.remove();
      this.listener = null;
    }

    await Barometer.stop();

    this.isMonitoring = false;
    console.log('Barometer monitoring stopped');
  }

  private handlePressureChange(data: any): void {
    const reading: PressureReading = {
      pressure: data.pressure,
      relativeAltitude: data.relativeAltitude,
      timestamp: data.timestamp
    };

    this.readings.push(reading);

    if (this.readings.length > this.maxReadings) {
      this.readings.shift();
    }

    // Notify observers or update UI
    this.onReadingUpdate(reading);
  }

  private onReadingUpdate(reading: PressureReading): void {
    // Override this method or use events
    console.log('New reading:', reading);
  }

  getLatestReading(): PressureReading | null {
    return this.readings.length > 0
      ? this.readings[this.readings.length - 1]
      : null;
  }

  getAllReadings(): PressureReading[] {
    return [...this.readings];
  }

  getAveragePressure(): number {
    if (this.readings.length === 0) return 0;

    const sum = this.readings.reduce((acc, r) => acc + r.pressure, 0);
    return sum / this.readings.length;
  }

  getPressureTrend(): 'rising' | 'falling' | 'stable' {
    if (this.readings.length < 10) return 'stable';

    const recent = this.readings.slice(-10);
    const first = recent[0].pressure;
    const last = recent[recent.length - 1].pressure;
    const diff = last - first;

    if (diff > 0.5) return 'rising';
    if (diff < -0.5) return 'falling';
    return 'stable';
  }

  clearReadings(): void {
    this.readings = [];
  }

  // Convert pressure to different units
  convertPressure(hPa: number, unit: 'inHg' | 'mmHg' | 'mb'): number {
    switch (unit) {
      case 'inHg':
        return hPa * 0.02953;
      case 'mmHg':
        return hPa * 0.750062;
      case 'mb':
        return hPa; // 1 hPa = 1 mb
      default:
        return hPa;
    }
  }

  // Calculate altitude from pressure
  calculateAltitude(pressure: number, seaLevelPressure: number = 1013.25): number {
    // Barometric formula
    const altitude = 44330 * (1 - Math.pow(pressure / seaLevelPressure, 1 / 5.255));
    return altitude;
  }

  isMonitoringActive(): boolean {
    return this.isMonitoring;
  }
}
```

## Practical Applications

### Weather Station App

```typescript
class WeatherStation {
  private barometer: BarometerService;

  constructor() {
    this.barometer = new BarometerService();
  }

  async start() {
    await this.barometer.startMonitoring(2000); // Every 2 seconds

    setInterval(() => {
      this.updateWeatherDisplay();
    }, 5000);
  }

  updateWeatherDisplay() {
    const reading = this.barometer.getLatestReading();
    if (!reading) return;

    const trend = this.barometer.getPressureTrend();
    const forecast = this.predictWeather(reading.pressure, trend);

    console.log('Current Conditions:');
    console.log(`Pressure: ${reading.pressure.toFixed(1)} hPa`);
    console.log(`Trend: ${trend}`);
    console.log(`Forecast: ${forecast}`);
  }

  predictWeather(pressure: number, trend: string): string {
    if (pressure > 1020 && trend === 'rising') {
      return 'Clear and sunny';
    } else if (pressure < 1000 && trend === 'falling') {
      return 'Stormy weather approaching';
    } else if (trend === 'falling') {
      return 'Weather deteriorating';
    } else if (trend === 'rising') {
      return 'Improving conditions';
    } else {
      return 'Stable weather';
    }
  }
}
```

### Altitude Tracker

```typescript
class AltitudeTracker {
  private barometer: BarometerService;
  private startPressure: number = 0;

  constructor() {
    this.barometer = new BarometerService();
  }

  async startTracking() {
    await this.barometer.startMonitoring(500);

    // Set reference pressure
    const reading = await Barometer.getCurrentReading();
    this.startPressure = reading.pressure;

    console.log('Altitude tracking started');
    console.log('Reference pressure:', this.startPressure, 'hPa');
  }

  getAltitudeChange(): number {
    const current = this.barometer.getLatestReading();
    if (!current) return 0;

    return this.barometer.calculateAltitude(
      current.pressure,
      this.startPressure
    );
  }

  displayAltitudeChange() {
    const change = this.getAltitudeChange();

    if (change > 0) {
      console.log(`Gained ${change.toFixed(1)} meters`);
    } else if (change < 0) {
      console.log(`Lost ${Math.abs(change).toFixed(1)} meters`);
    } else {
      console.log('No altitude change');
    }
  }
}
```

### Pressure Alert System

```typescript
class PressureAlertSystem {
  private barometer: BarometerService;
  private thresholds = {
    stormWarning: 980,
    highPressure: 1030,
    rapidFall: -3 // hPa per hour
  };

  constructor() {
    this.barometer = new BarometerService();
  }

  async startMonitoring() {
    await this.barometer.startMonitoring(1000);

    setInterval(() => {
      this.checkAlerts();
    }, 60000); // Check every minute
  }

  checkAlerts() {
    const reading = this.barometer.getLatestReading();
    if (!reading) return;

    // Check for storm warning
    if (reading.pressure < this.thresholds.stormWarning) {
      this.sendAlert('Storm Warning', 'Very low pressure detected');
    }

    // Check for high pressure
    if (reading.pressure > this.thresholds.highPressure) {
      this.sendAlert('High Pressure', 'Excellent weather conditions');
    }

    // Check for rapid pressure drop
    const hourlyChange = this.calculateHourlyChange();
    if (hourlyChange < this.thresholds.rapidFall) {
      this.sendAlert('Rapid Pressure Drop', 'Weather changing quickly');
    }
  }

  calculateHourlyChange(): number {
    const readings = this.barometer.getAllReadings();
    if (readings.length < 60) return 0;

    const oneHourAgo = readings[readings.length - 60];
    const current = readings[readings.length - 1];

    return current.pressure - oneHourAgo.pressure;
  }

  sendAlert(title: string, message: string) {
    console.log(`ALERT: ${title}`);
    console.log(message);
    // Implement notification logic
  }
}
```

## Understanding Barometric Pressure

### Pressure Units
- **Hectopascals (hPa)**: Standard unit, 1 hPa = 1 millibar
- **Inches of Mercury (inHg)**: Common in US weather reports
- **Millimeters of Mercury (mmHg)**: Medical and scientific use

### Typical Values
- Standard sea level: 1013.25 hPa
- High pressure: 1020-1050 hPa (clear weather)
- Low pressure: 980-1000 hPa (stormy weather)
- Hurricane/Typhoon: < 950 hPa

### Altitude Effects
- Pressure decreases ~12 hPa per 100m elevation
- Not absolute altitude - relative to starting point
- Affected by weather systems

## Best Practices

1. **Calibration**: Set reference pressure at known altitude
2. **Filtering**: Use moving average to reduce noise
3. **Update Frequency**: 1-2 seconds is ideal for most apps
4. **Battery Impact**: Monitor battery usage with continuous sensing
5. **Sensor Availability**: Always check before using
6. **Context**: Combine with GPS for absolute altitude

## Troubleshooting

### Sensor Not Available

```typescript
const fallbackToGPS = async () => {
  const { available } = await Barometer.isAvailable();

  if (!available) {
    console.log('Using GPS for altitude instead');
    // Implement GPS altitude fallback
  }
};
```

### Noisy Readings

```typescript
class ReadingFilter {
  private buffer: number[] = [];
  private size = 5;

  filter(value: number): number {
    this.buffer.push(value);
    if (this.buffer.length > this.size) {
      this.buffer.shift();
    }

    // Return median value
    const sorted = [...this.buffer].sort((a, b) => a - b);
    return sorted[Math.floor(sorted.length / 2)];
  }
}
```

## Conclusion

The `@capgo/capacitor-barometer` plugin provides reliable access to atmospheric pressure data across iOS and Android platforms. By properly implementing barometer monitoring, you can create weather apps, altitude trackers, and other innovative applications that leverage pressure sensing.

For more information, visit the [official documentation](https://capgo.app/docs/plugins/barometer/) or check the [GitHub repository](https://github.com/Cap-go/capacitor-barometer).
