---
locale: en
---
# Using @capgo/capacitor-admob

The `@capgo/capacitor-admob` package allows you to integrate Google AdMob ads into your Capacitor app. Here is a tutorial on how to use this package.

## Installation

To install the package, run the following command:

```bash
npm install @capgo/capacitor-admob
npx cap sync
```

## Configuration

### Android Setup

Add the following to your `AndroidManifest.xml`:

```xml
<meta-data
  android:name="com.google.android.gms.ads.APPLICATION_ID"
  android:value="ca-app-pub-xxxxxxxxxxxxxxxx~yyyyyyyyyy"/>
```

### iOS Setup

Add your AdMob App ID to your `Info.plist`:

```xml
<key>GADApplicationIdentifier</key>
<string>ca-app-pub-xxxxxxxxxxxxxxxx~yyyyyyyyyy</string>
```

## Usage

### Initialize AdMob

```typescript
import { AdMob } from '@capgo/capacitor-admob';

await AdMob.initialize({
  requestTrackingAuthorization: true,
  testingDevices: ['YOUR_DEVICE_ID'],
});
```

### Show Banner Ad

```typescript
import { AdMob, BannerAdSize, BannerAdPosition } from '@capgo/capacitor-admob';

await AdMob.showBanner({
  adId: 'ca-app-pub-xxxxxxxxxxxxxxxx/yyyyyyyyyy',
  adSize: BannerAdSize.BANNER,
  position: BannerAdPosition.BOTTOM_CENTER,
});
```

### Show Interstitial Ad

```typescript
import { AdMob } from '@capgo/capacitor-admob';

await AdMob.prepareInterstitial({
  adId: 'ca-app-pub-xxxxxxxxxxxxxxxx/yyyyyyyyyy',
});

await AdMob.showInterstitial();
```

That's it! You have successfully integrated AdMob into your Capacitor app.
