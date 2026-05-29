---
locale: en
---
# Using @capgo/capacitor-home-indicator

Capacitor Home Indicator Plugin for controlling the iOS home indicator visibility. The home indicator is the horizontal bar at the bottom of iOS devices without a physical home button.

## Install

```bash
bun add @capgo/capacitor-home-indicator
bunx cap sync
```

## What This Plugin Exposes

- `hide` - Hide the home indicator at the bottom of the screen.
- `show` - Show the home indicator at the bottom of the screen.
- `isHidden` - Check whether the home indicator is currently hidden.

## Example Usage

### `hide`

Hide the home indicator at the bottom of the screen.

```typescript
import { HomeIndicator } from '@capgo/capacitor-home-indicator';

await HomeIndicator.hide();
```

### `show`

Show the home indicator at the bottom of the screen.

```typescript
import { HomeIndicator } from '@capgo/capacitor-home-indicator';

await HomeIndicator.show();
```

### `isHidden`

Check whether the home indicator is currently hidden.

```typescript
import { HomeIndicator } from '@capgo/capacitor-home-indicator';

const { hidden } = await HomeIndicator.isHidden();
if (hidden) {
  console.log('Home indicator is hidden');
} else {
  console.log('Home indicator is visible');
}
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-home-indicator/
- Docs: /docs/plugins/home-indicator/

## Keep going from Using @capgo/capacitor-home-indicator

If you are using **Using @capgo/capacitor-home-indicator** to plan native plugin work, connect it with [@capgo/capacitor-home-indicator](/docs/plugins/home-indicator/) for the implementation detail in @capgo/capacitor-home-indicator, [Getting Started](/docs/plugins/home-indicator/getting-started/) for the implementation detail in Getting Started, [Capgo Plugin Directory](/plugins/) for the product workflow in Capgo Plugin Directory, [Capacitor Plugins by Capgo](/docs/plugins/) for the implementation detail in Capacitor Plugins by Capgo, and [Adding or Updating Plugins](/docs/contributing/adding-plugins/) for the implementation detail in Adding or Updating Plugins.
