# Using @capgo/capacitor-fingerprint Package

The `@capgo/capacitor-fingerprint` package is a Capacitor client for Fingerprint PRO. It provides 100% accurate device identification for fraud detection. In this tutorial, we will cover the installation process and how to use the package's API.

## Installation

To install the `@capgo/capacitor-fingerprint` package, run the following command:

```bash
npm install @capgo/capacitor-fingerprint
npx cap sync
```

## API Usage

### Load

To load the `@capgo/capacitor-fingerprint` plugin, use the `load` function. Here's an example of how to use it:

```typescript
import { Plugins } from '@capacitor/core';

const { CapacitorFingerprint } = Plugins;

async function loadFingerprintPlugin() {
  try {
    await CapacitorFingerprint.load({
      // options
    });
    console.log('Fingerprint plugin loaded successfully');
  } catch (error) {
    console.error('Failed to load Fingerprint plugin:', error);
  }
}

loadFingerprintPlugin();
```

### Get Visitor ID

To get the visitor ID, use the `getVisitorId` function. Here's an example of how to use it:

```typescript
import { Plugins } from '@capacitor/core';

const { CapacitorFingerprint } = Plugins;

async function getVisitorId() {
  try {
    const result = await CapacitorFingerprint.getVisitorId();
    const visitorId = result.visitorId;
    console.log('Visitor ID:', visitorId);
  } catch (error) {
    console.error('Failed to get Visitor ID:', error);
  }
}

getVisitorId();
```

### Get Visitor Data

To get the visitor data, use the `getVisitorData` function. Here's an example of how to use it:

```typescript
import { Plugins } from '@capacitor/core';

const { CapacitorFingerprint } = Plugins;

async function getVisitorData() {
  try {
    const result = await CapacitorFingerprint.getVisitorData();
    const visitorData = result.visitorData;
    console.log('Visitor Data:', visitorData);
  } catch (error) {
    console.error('Failed to get Visitor Data:', error);
  }
}

getVisitorData();
```

## Conclusion

In this tutorial, we covered the installation process of the `@capgo/capacitor-fingerprint` package and how to use its API. You can now integrate device identification and fraud detection into your Capacitor app using the Fingerprint PRO service. For more details, refer to the package's documentation and explore additional functionalities it provides.