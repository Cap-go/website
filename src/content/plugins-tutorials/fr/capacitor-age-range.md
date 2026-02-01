---
locale: fr
---
# Using @capgo/capacitor-age-range Package

The `@capgo/capacitor-age-range` package provides cross-platform age range detection for Capacitor apps. It uses **Google Play Age Signals** on Android and **Apple DeclaredAgeRange** on iOS, mapping both to a unified API.

## Installation

To install the package, run the following command in your project's root directory:

```bash
npm install @capgo/capacitor-age-range
npx cap sync
```

## iOS Setup

Add the `com.apple.developer.declared-age-range` entitlement to your app:

1. In Xcode, select your target → **Signing & Capabilities**
2. Click **+ Capability** → search for **Declared Age Range**
3. Enable it

Or add manually to your `*.entitlements` file:

```xml
<key>com.apple.developer.declared-age-range</key>
<true/>
```

> **Note:** The DeclaredAgeRange framework requires iOS 26+. On older versions, the plugin returns `NOT_AVAILABLE`.

## Android Setup

No additional setup is needed. The plugin uses Google Play Age Signals API which works automatically when the Play Store is installed.

## API

The `@capgo/capacitor-age-range` package provides the following API methods:

### requestAgeRange(options?)

Requests the user's age range. On iOS, this shows a system dialog. On Android, this queries Play Age Signals in the background.

```javascript
import { AgeRange } from '@capgo/capacitor-age-range';

async function checkAge() {
  const result = await AgeRange.requestAgeRange({
    ageGates: [13, 16, 18] // iOS only, ignored on Android
  });

  switch (result.status) {
    case 'SHARING':
      console.log('Age range:', result.ageLower, '-', result.ageUpper);
      console.log('Source:', result.declarationSource);
      break;
    case 'DECLINED_SHARING':
      console.log('User declined to share age');
      break;
    case 'NOT_AVAILABLE':
      console.log('Age range API not available');
      break;
    case 'ERROR':
      console.log('Error occurred');
      break;
  }
}
```

### getPluginVersion()

Returns the native plugin version.

```javascript
const { version } = await AgeRange.getPluginVersion();
console.log('Plugin version:', version);
```

## Complete Example

```javascript
import { AgeRange } from '@capgo/capacitor-age-range';

async function verifyAge() {
  const result = await AgeRange.requestAgeRange({ ageGates: [13, 18] });

  if (result.status === 'SHARING') {
    const isAdult = (result.ageLower ?? 0) >= 18;
    if (isAdult) {
      enableAdultContent();
    } else {
      enableChildSafeContent();
    }
  } else {
    // Default to child-safe experience
    enableChildSafeContent();
  }
}
```

That's it! You have successfully learned how to use the `@capgo/capacitor-age-range` package for cross-platform age range detection in your Capacitor app.
