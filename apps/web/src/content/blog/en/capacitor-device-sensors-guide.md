---
slug: capacitor-device-sensors-guide
title: "Capacitor Device Sensors Guide: Motion, Compass, Steps"
description: "Capacitor device sensors guide: read the accelerometer, barometer, compass, pedometer, light and proximity sensors on iOS and Android, with permissions."
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2026-10-01T09:00:00.000Z
updated_at: 2026-10-01T09:00:00.000Z
head_image: /capgo_plugins.webp
head_image_alt: "Smartphone sensors such as accelerometer, compass and barometer used in a Capacitor app"
keywords: capacitor device sensors, capacitor accelerometer, capacitor compass, capacitor pedometer, capacitor barometer, capacitor light sensor, capacitor proximity sensor, ionic sensors, capacitor gyroscope
tag: Guides, Capacitor, Mobile
published: true
locale: en
origin: human
next_blog: ''
faq:
  - question: "Which Capacitor sensor plugins need a permission prompt?"
    answer: "On iOS, the pedometer and barometer (and the accelerometer plugin, per its setup docs) use Core Motion and need NSMotionUsageDescription, and the compass needs location permission because iOS derives heading from Core Location. On Android, only the pedometer needs a runtime permission, ACTIVITY_RECOGNITION on Android 10+. Accelerometer, barometer, compass, light and proximity sensors need none."
  - question: "Why does the light sensor not work on iOS?"
    answer: "Apple does not expose the ambient light sensor through a public API, so no App Store compliant plugin can read lux values on iPhone. @capgo/capacitor-light-sensor reports available: false on iOS. Use the screen brightness or the system dark mode setting as a proxy."
  - question: "Do these sensor plugins work in the browser?"
    answer: "Partly. Browsers expose motion and orientation through DeviceMotionEvent and DeviceOrientationEvent, and some plugins fall back to them. Barometer, pedometer, light and proximity readings are generally not available on the web, so always check isAvailable() and design a fallback."
  - question: "Should I use the accelerometer or the pedometer to count steps?"
    answer: "Use the pedometer. It reads the dedicated low-power step counter that runs even when your app is closed, and it is far more accurate than counting peaks in raw accelerometer data, which drains battery and only works while your app is running."
  - question: "How do I read the gyroscope in Capacitor?"
    answer: "Use the standard DeviceMotionEvent in the WebView. event.rotationRate gives rotation in degrees per second around each axis. On iOS, call DeviceMotionEvent.requestPermission() from a user tap first."
---

Capacitor device sensors are available through small, focused plugins: `@capgo/capacitor-accelerometer` for motion, `@capgo/capacitor-barometer` for air pressure, `@capgo/capacitor-compass` for heading, `@capgo/capacitor-pedometer` for steps, plus light, proximity and shake plugins. Each follows the same pattern: check availability, request permission if needed, start updates, listen, and stop when you are done. This guide covers every sensor with Capacitor 8 code, the platform differences that matter, and the battery rules that keep apps out of trouble.

## Sensor overview

| Sensor | Plugin | iOS | Android | Permission |
| --- | --- | --- | --- | --- |
| Accelerometer | [`@capgo/capacitor-accelerometer`](/plugins/capacitor-accelerometer/) | Yes | Yes | iOS `NSMotionUsageDescription` |
| Barometer | [`@capgo/capacitor-barometer`](/plugins/capacitor-barometer/) | Yes, with relative altitude | Yes, pressure only, on devices with a sensor | iOS motion usage string |
| Compass | [`@capgo/capacitor-compass`](/plugins/capacitor-compass/) | Yes | Yes, with accuracy events | iOS location when in use |
| Pedometer | [`@capgo/capacitor-pedometer`](/plugins/capacitor-pedometer/) | Steps, distance, floors, pace, cadence | Steps | iOS motion, Android `ACTIVITY_RECOGNITION` |
| Ambient light | [`@capgo/capacitor-light-sensor`](/plugins/capacitor-light-sensor/) | No public API | Yes | None |
| Proximity | [`@capgo/capacitor-proximity`](/plugins/capacitor-proximity/) | Yes | Yes | None |
| Shake gesture | [`@capgo/capacitor-shake`](/plugins/capacitor-shake/) | Yes | Yes | None |
| Gyroscope / orientation | Web `DeviceMotionEvent` / `DeviceOrientationEvent` | Yes | Yes | iOS `requestPermission()` in the WebView |

Install only what you use. Each plugin is small, and fewer permission strings mean fewer questions in App Review.

```bash
bun add @capgo/capacitor-accelerometer @capgo/capacitor-compass @capgo/capacitor-pedometer
bunx cap sync
```

## iOS setup

Add the usage strings your sensors need to `ios/App/App/Info.plist`:

```xml
<!-- Accelerometer, pedometer, barometer altitude -->
<key>NSMotionUsageDescription</key>
<string>Counts your steps and detects movement during workouts.</string>

<!-- Compass heading -->
<key>NSLocationWhenInUseUsageDescription</key>
<string>Shows which direction you are facing on the map.</string>
```

Explain the user benefit in plain words. Generic text like "This app needs motion access" is a frequent App Review rejection reason.

## Android setup

Most sensors need no permission. The pedometer plugin adds `ACTIVITY_RECOGNITION` to the merged manifest, and you request it at runtime on Android 10+.

If a sensor is essential, declare the hardware feature so Google Play hides your app from devices without it. If it is optional, declare it with `required="false"` and check availability at runtime:

```xml
<uses-feature android:name="android.hardware.sensor.barometer" android:required="false" />
<uses-feature android:name="android.hardware.sensor.stepcounter" android:required="false" />
<uses-feature android:name="android.hardware.sensor.compass" android:required="false" />
```

## Accelerometer: motion and tilt

The accelerometer reports acceleration on the x, y and z axes in G. A phone lying flat reads about `z = -1` or `1` depending on the platform convention, because gravity is included.

```typescript
import { CapacitorAccelerometer } from '@capgo/capacitor-accelerometer';

const { isAvailable } = await CapacitorAccelerometer.isAvailable();
if (isAvailable) {
  await CapacitorAccelerometer.requestPermissions();

  const listener = await CapacitorAccelerometer.addListener('measurement', ({ x, y, z }) => {
    const tiltX = Math.atan2(x, Math.sqrt(y * y + z * z)) * (180 / Math.PI);
    ball.style.transform = `translateX(${tiltX * 3}px)`;
  });

  await CapacitorAccelerometer.startMeasurementUpdates();

  // later
  await CapacitorAccelerometer.stopMeasurementUpdates();
  await listener.remove();
}
```

Use cases: tilt controls in games, "lift to wake" UI, fall or impact detection, activity intensity. Raw data is noisy, so smooth it with a low-pass filter before using it:

```typescript
const alpha = 0.2;
let smoothed = { x: 0, y: 0, z: 0 };

function lowPass(m: { x: number; y: number; z: number }) {
  smoothed = {
    x: smoothed.x + alpha * (m.x - smoothed.x),
    y: smoothed.y + alpha * (m.y - smoothed.y),
    z: smoothed.z + alpha * (m.z - smoothed.z),
  };
  return smoothed;
}
```

Do not update the DOM on every sample. Store the latest value and render it in a `requestAnimationFrame` loop.

### Shake gestures

For "shake to report a bug" or "shake to undo", you do not need to tune thresholds yourself:

```typescript
import { CapacitorShake } from '@capgo/capacitor-shake';

const handle = await CapacitorShake.addListener('shake', () => openFeedbackForm());
```

## Gyroscope and device orientation

There is no separate plugin needed for rotation. The WebView already exposes it:

```typescript
async function enableMotion() {
  // iOS 13+ requires a user gesture and explicit permission
  const DME = DeviceMotionEvent as unknown as { requestPermission?: () => Promise<'granted' | 'denied'> };
  if (typeof DME.requestPermission === 'function') {
    const result = await DME.requestPermission();
    if (result !== 'granted') return;
  }

  window.addEventListener('devicemotion', (e) => {
    const r = e.rotationRate; // alpha, beta, gamma in degrees per second
    if (r) updateRotation(r.alpha ?? 0, r.beta ?? 0, r.gamma ?? 0);
  });

  window.addEventListener('deviceorientation', (e) => {
    // alpha: 0-360 around z, beta: -180..180 front/back, gamma: -90..90 left/right
    updateOrientation(e.alpha, e.beta, e.gamma);
  });
}

document.querySelector('#enable-motion')!.addEventListener('click', enableMotion);
```

Call `requestPermission` from a button tap, never on page load, or iOS rejects the request.

## Compass: heading

```typescript
import { CapgoCompass, CompassAccuracy } from '@capgo/capacitor-compass';

const status = await CapgoCompass.requestPermissions(); // iOS: location permission
if (status.compass === 'granted') {
  await CapgoCompass.addListener('headingChange', ({ value }) => {
    needle.style.transform = `rotate(${-value}deg)`;
  });

  await CapgoCompass.startListening({
    minInterval: 100,      // ms between events
    minHeadingChange: 2,   // degrees
  });

  // Android only: ask the user to calibrate when accuracy drops
  await CapgoCompass.addListener('accuracyChange', ({ accuracy }) => {
    calibrationHint.hidden = accuracy >= CompassAccuracy.MEDIUM;
  });
  await CapgoCompass.watchAccuracy();
}

// One-off reading
const { value } = await CapgoCompass.getCurrentHeading();
```

`value` is degrees from magnetic north, 0 to 360. Things to know:

- The magnetometer is disturbed by magnets in phone cases, laptops and car mounts. Show a calibration hint (move the phone in a figure eight) when Android reports low accuracy.
- Throttle with `minInterval` and `minHeadingChange` rather than in JavaScript. It saves bridge traffic.
- For a map that rotates with the user, combine heading with geolocation. If you need location while the app is in the background, see the [background geolocation plugin](/plugins/capacitor-background-geolocation/).

## Pedometer: steps, distance and floors

The step counter is a low-power chip that counts continuously, even when your app is not running.

```typescript
import { CapacitorPedometer } from '@capgo/capacitor-pedometer';

const features = await CapacitorPedometer.isAvailable();
// { stepCounting, distance, pace, cadence, floorCounting }

const perm = await CapacitorPedometer.requestPermissions();
if (perm.activityRecognition !== 'granted') {
  // explain why and link to settings
}

// Steps today (start and end are required on iOS)
const startOfDay = new Date();
startOfDay.setHours(0, 0, 0, 0);
const today = await CapacitorPedometer.getMeasurement({
  start: startOfDay.getTime(),
  end: Date.now(),
});
console.log(today.numberOfSteps, today.distance, today.floorsAscended);

// Live updates during a walk
await CapacitorPedometer.addListener('measurement', (m) => {
  stepsEl.textContent = String(m.numberOfSteps ?? 0);
});
await CapacitorPedometer.startMeasurementUpdates();
```

Platform differences:

- **iOS** (Core Motion) answers historical queries for about the last seven days and also provides distance, floors, pace and cadence on supported devices.
- **Android** reports steps only. The hardware counter resets on reboot, so do not treat it as a lifetime total. Store your own baseline.

For long-term history, daily totals across devices, or data from a watch, read from the health store with [`@capgo/capacitor-health`](/plugins/capacitor-health/) instead. It aggregates steps from all sources in Apple Health and Health Connect. Our [Health Connect migration guide](/blog/google-fit-to-health-connect-migration-in-capacitor/) explains the setup.

## Barometer: pressure and altitude

```typescript
import { CapacitorBarometer } from '@capgo/capacitor-barometer';

const { isAvailable } = await CapacitorBarometer.isAvailable();
if (isAvailable) {
  await CapacitorBarometer.requestPermissions();
  await CapacitorBarometer.addListener('measurement', ({ pressure, relativeAltitude }) => {
    pressureEl.textContent = `${pressure.toFixed(1)} hPa`;
    altitudeEl.textContent = `${relativeAltitude.toFixed(1)} m`;
  });
  await CapacitorBarometer.startMeasurementUpdates();
}
```

`pressure` is in hectopascals on both platforms. `relativeAltitude` is the change in meters since updates started, provided by iOS only. On Android it is always `0`, so compute it yourself with the barometric formula:

```typescript
const P0 = 1013.25; // standard sea-level pressure in hPa
const altitudeMeters = (p: number) => 44330 * (1 - Math.pow(p / P0, 1 / 5.255));

let baseline: number | null = null;
function relativeAltitude(pressure: number) {
  baseline ??= altitudeMeters(pressure);
  return altitudeMeters(pressure) - baseline;
}
```

Absolute altitude from pressure is off by tens of meters because weather changes sea-level pressure. Relative changes over minutes are accurate to about a meter, which is enough for counting floors or climbs. Many budget Android phones have no barometer, so always check `isAvailable`.

## Ambient light sensor (Android)

```typescript
import { LightSensor } from '@capgo/capacitor-light-sensor';

const { available } = await LightSensor.isAvailable(); // always false on iOS
if (available) {
  await LightSensor.addListener('lightSensorChange', ({ illuminance }) => {
    document.body.classList.toggle('high-contrast', illuminance > 10_000); // bright sunlight
  });
  await LightSensor.start({ updateInterval: 500 });
}
```

Typical values: below 10 lux is a dark room, a few hundred lux is an office, tens of thousands is direct sunlight. Use it for a reading mode that adapts to the room, or to raise contrast outdoors. To change the screen brightness itself, pair it with [`@capgo/capacitor-brightness`](/plugins/capacitor-brightness/).

## Proximity sensor

The proximity sensor tells you when something covers the top of the screen, usually the user's ear during a call.

```typescript
import { CapacitorProximity } from '@capgo/capacitor-proximity';

const status = await CapacitorProximity.getStatus();
if (status.available) {
  await CapacitorProximity.enable();  // screen turns off when covered
}

// when the call or voice message ends
await CapacitorProximity.disable();
```

On iOS this toggles `UIDevice.isProximityMonitoringEnabled`, which turns the display off while covered. On Android the plugin listens to the proximity sensor and dims the app window. Enable it only while a voice call, voice message, or walkie-talkie mode is active, so the user's cheek does not press buttons.

## Practical rules for sensor apps

1. **Check availability first.** Tablets often lack a step counter or barometer, and emulators fake most sensors. Hide features you cannot support.
2. **Stop updates when not visible.** Use `@capacitor/app`'s `appStateChange` to stop listeners when the app goes to the background and restart them on resume. Sensors left running drain the battery and cause one-star reviews.
3. **Throttle in native code when the plugin allows it** (compass `minInterval`, light sensor `updateInterval`), not in JavaScript.
4. **Ask for permission in context.** Request motion access when the user starts a workout, not on first launch.
5. **Test on real hardware.** Simulators return constant or synthetic values. Test at least one budget Android phone, where sensors are missing or noisy.
6. **Respect privacy rules.** Motion and location data count as sensitive in App Store privacy labels and the Play data safety form. Declare what you collect.

## Troubleshooting

**No events on iOS**: the usage string is missing in `Info.plist`, or permission was denied. Check Settings, Privacy and Security, Motion and Fitness.

**Pedometer returns 0 on Android**: `ACTIVITY_RECOGNITION` was denied, or the device has no step counter. Check `isAvailable().stepCounting`.

**Compass jumps around**: magnetic interference or no calibration. Watch accuracy on Android and show a calibration hint.

**`relativeAltitude` is always 0**: expected on Android. Compute it from pressure as shown above.

**`DeviceMotionEvent.requestPermission` throws**: it was not called from a user gesture.

**Battery drain reports**: listeners keep running in the background. Stop them on `appStateChange`.

## Ship sensor features quickly

Thresholds, smoothing factors and UI for sensor features usually need several rounds of tuning with real users. That logic lives in JavaScript, so you can adjust it with [Capgo live updates](/live-update/) without a store review, while new plugins and permission strings go through a regular build. If you are connecting external sensors like chest straps, continue with our guide to [building a heart rate monitor with Capacitor](/blog/how-to-build-a-heart-rate-monitor-with-capacitor/).
