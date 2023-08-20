# Using @capgo/capacitor-navigation-bar

## Installation

To use the `@capgo/capacitor-navigation-bar` package, you need to first install it by running the following command:

```bash
npm install @capgo/capacitor-navigation-bar
npx cap sync
```

## Setting the Navigation Bar Color

You can set the navigation bar color for Android Lollipop and higher using the `setNavigationBarColor` function. Here is an example of how to use it:

```typescript
import { setNavigationBarColor } from '@capgo/capacitor-navigation-bar';

...

setNavigationBarColor({ color: '#FF0000' });
```

The `color` parameter is a string that represents the color of the navigation bar.

## Getting the Navigation Bar Color

You can also get the current navigation bar color using the `getNavigationBarColor` function. Here is an example of how to use it:

```typescript
import { getNavigationBarColor } from '@capgo/capacitor-navigation-bar';

...

const color = getNavigationBarColor();
console.log(color);
```

The `color` variable will contain the current navigation bar color.

And that's it! You now know how to use the `@capgo/capacitor-navigation-bar` package to set and get the navigation bar color in your Android app.