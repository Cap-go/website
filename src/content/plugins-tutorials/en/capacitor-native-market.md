---
locale: en
---
# Using @capgo/native-market

The `@capgo/native-market` package allows you to link to app stores for ratings, reviews, and app updates. Here is a tutorial on how to use this package.

## Installation

To install the package, run the following command:

```bash
npm install @capgo/native-market
npx cap sync
```

## Usage

### Open App Store

```typescript
import { NativeMarket } from '@capgo/native-market';

await NativeMarket.openStoreListing({
  appId: 'com.example.app',
});
```

### Open Developer Page

```typescript
import { NativeMarket } from '@capgo/native-market';

await NativeMarket.openDevPage({
  devId: '1234567890',
});
```

That's it! You have successfully integrated native market links into your Capacitor app.
