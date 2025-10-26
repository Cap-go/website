---
locale: en
---
# Using @capgo/home-indicator

The `@capgo/home-indicator` package allows you to control iOS home indicator visibility. Here is a tutorial on how to use this package.

## Installation

To install the package, run the following command:

```bash
npm install @capgo/home-indicator
npx cap sync
```

## Usage

### Hide Home Indicator

```typescript
import { HomeIndicator } from '@capgo/home-indicator';

await HomeIndicator.hide();
```

### Show Home Indicator

```typescript
import { HomeIndicator } from '@capgo/home-indicator';

await HomeIndicator.show();
```

That's it! You have successfully integrated home indicator control into your iOS app.
