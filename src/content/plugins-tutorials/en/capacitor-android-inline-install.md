---
locale: en
---
# Using @capgo/capacitor-android-inline-install

The `@capgo/capacitor-android-inline-install` package enables inline app installation on Android devices. Here is a tutorial on how to use this package.

## Installation

To install the package, run the following command:

```bash
npm install @capgo/capacitor-android-inline-install
npx cap sync
```

## Configuration

This plugin works only on Android and requires API level 21 or higher.

## Usage

### Trigger Inline Installation

```typescript
import { InlineInstall } from '@capgo/capacitor-android-inline-install';

await InlineInstall.install({
  packageName: 'com.example.app',
});
```

### Check Installation Status

```typescript
import { InlineInstall } from '@capgo/capacitor-android-inline-install';

const status = await InlineInstall.getStatus({
  packageName: 'com.example.app',
});

console.log('Installation status:', status);
```

That's it! You have successfully integrated inline installation into your Android app.
