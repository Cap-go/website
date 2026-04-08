---
locale: en
---

# Complete Tutorial: Using @capgo/capacitor-volume-buttons for iOS and Android

The `@capgo/capacitor-volume-buttons` package enables your Capacitor mobile applications to detect and respond to hardware volume button presses on iOS and Android devices. This tutorial covers integrating volume button detection into your iOS and Android mobile apps built with Capacitor or Cordova for custom controls and interactions.

## What is Capacitor Volume Buttons?

The @capgo/capacitor-volume-buttons plugin provides native hardware button detection for your iOS and Android mobile apps. This Capacitor plugin lets you use the physical volume up and volume down buttons for custom functionality in your mobile application, beyond just controlling audio volume. Works seamlessly in both Capacitor and Cordova mobile projects.

## Why Use Volume Buttons in Mobile Apps?

Physical button detection enhances mobile app user experience on iOS and Android:

- Use volume buttons as camera shutter in iOS and Android photo apps
- Navigate content with hardware buttons on mobile devices
- Control games with physical buttons on iOS and Android
- Accessibility features for mobile applications
- Quick actions without touching screen in Capacitor apps
- Emergency features triggered by hardware buttons
- Works on all iOS (iPhone/iPad) and Android mobile devices

## Installation for iOS and Android

To install the @capgo/capacitor-volume-buttons package for your Capacitor mobile app:

```bash
npm install @capgo/capacitor-volume-buttons
npx cap sync
```

This syncs the volume button listener with your native iOS and Android projects.

## Basic Usage in Mobile Apps

### Listen for Volume Button Presses on iOS and Android

```typescript
import { VolumeButtons } from '@capgo/capacitor-volume-buttons';

// Listen for hardware buttons on iOS and Android devices
VolumeButtons.addListener('volumeButtonPressed', (event) => {
  console.log('Volume button pressed on mobile device:', event.direction);

  if (event.direction === 'up') {
    console.log('Volume up pressed on iOS or Android');
    handleVolumeUp();
  } else if (event.direction === 'down') {
    console.log('Volume down pressed on mobile device');
    handleVolumeDown();
  }
});
```

### Remove Listeners for Mobile App

```typescript
// Clean up when leaving screen in mobile app
await VolumeButtons.removeAllListeners();
```

## Use Cases for iOS and Android Mobile Apps

### Camera Shutter for Mobile Photography Apps

```typescript
// Use volume buttons as shutter on iOS and Android
VolumeButtons.addListener('volumeButtonPressed', async (event) => {
  await capturePhoto(); // Take photo on mobile device
  console.log('Photo captured via volume button on iOS or Android');
});
```

### Page Navigation in Mobile Reading Apps

```typescript
let currentPage = 0;

// Navigate with hardware buttons on iOS and Android
VolumeButtons.addListener('volumeButtonPressed', (event) => {
  if (event.direction === 'up') {
    currentPage++;
    showPage(currentPage); // Next page on mobile device
  } else {
    currentPage = Math.max(0, currentPage - 1);
    showPage(currentPage); // Previous page on iOS or Android
  }
});
```

### Game Controls for Mobile Gaming

```typescript
// Use physical buttons for mobile game on iOS and Android
VolumeButtons.addListener('volumeButtonPressed', (event) => {
  if (event.direction === 'up') {
    player.jump(); // Jump action on mobile device
  } else {
    player.crouch(); // Crouch action on iOS or Android
  }
});
```

## Platform-Specific Notes

### iOS Volume Button Detection

- Works on iOS 10.0+ mobile devices (iPhone and iPad)
- Detects hardware button presses on iOS
- System volume UI may still appear briefly on iOS devices
- Reliable detection on all iPhone models

### Android Volume Button Detection

- Works on Android 5.0+ mobile devices
- Requires app to be in foreground on Android
- Some Android devices may have slight delay
- Works across all Android manufacturers

## Best Practices for Mobile Apps

### Debounce Rapid Presses on Mobile Devices

```typescript
let lastPress = 0;
const DEBOUNCE_MS = 300;

// Prevent accidental double-presses on iOS or Android
VolumeButtons.addListener('volumeButtonPressed', (event) => {
  const now = Date.now();
  if (now - lastPress < DEBOUNCE_MS) {
    return; // Ignore rapid presses on mobile device
  }
  lastPress = now;
  handlePress(event.direction);
});
```

### Provide Alternative Controls for Mobile App

Remember that volume buttons still control actual volume on iOS and Android. Always provide alternative controls in your mobile application for users who need volume functionality.

## Conclusion

You have successfully integrated hardware volume button detection into your Capacitor mobile application for iOS and Android. This plugin enables custom interactions using physical buttons on mobile devices.

For detailed API documentation, visit the [GitHub repository](https://github.com/Cap-go/capacitor-volume-buttons).
