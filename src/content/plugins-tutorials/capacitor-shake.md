# Using @capgo/capacitor-shake

The `@capgo/capacitor-shake` package allows you to detect shake gestures on a device. Here is a tutorial on how to use this package in your Capacitor app.

## Installation

To install the package, run the following command:

```bash
npm install @capgo/capacitor-shake
npx cap sync
```

## Add the Listener

To detect shake gestures, you need to add a listener for the `shake` event. Here is an example of how to do it:

```typescript
import { Plugins } from '@capacitor/core';

const { CapacitorShake } = Plugins;

CapacitorShake.addListener('shake', () => {
  console.log('Shake gesture detected!');
});
```

In this example, we import the `CapacitorShake` plugin from `@capacitor/core` and use the `addListener` method to add a listener for the `shake` event. When the shake gesture is detected, the callback function will be executed.

## Remove the Listener

If you want to remove the `shake` event listener, you can use the `removeAllListeners` method:

```typescript
import { Plugins } from '@capacitor/core';

const { CapacitorShake } = Plugins;

CapacitorShake.removeAllListeners('shake');
```

In this example, we use the `removeAllListeners` method to remove all `shake` event listeners.

That's it! You have successfully integrated the `@capgo/capacitor-shake` package into your Capacitor app. You can now detect shake gestures on the device.