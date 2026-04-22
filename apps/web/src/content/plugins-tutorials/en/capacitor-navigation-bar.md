---
locale: en
---
# Using @capgo/capacitor-navigation-bar

Capacitor Navigation Bar Plugin for customizing the Android navigation bar.

## Install

```bash
bun add @capgo/capacitor-navigation-bar
bunx cap sync
```

## What This Plugin Exposes

- `setNavigationBarColor` - Set the navigation bar color and button theme.
- `getNavigationBarColor` - Get the current navigation bar color and button theme.

## Example Usage

### `setNavigationBarColor`

Set the navigation bar color and button theme.

```typescript
import { NavigationBar } from '@capgo/capacitor-navigation-bar';

// Set to white with dark buttons
await NavigationBar.setNavigationBarColor({
  color: NavigationBarColor.WHITE,
  darkButtons: true
});

// Set to custom color
await NavigationBar.setNavigationBarColor({
  color: '#FF5733',
  darkButtons: false
});

// Set a custom divider color on Android 9+
await NavigationBar.setNavigationBarColor({
  color: NavigationBarColor.WHITE,
  darkButtons: true,
  dividerColor: '#D9D9D9'
});
```

### `getNavigationBarColor`

Get the current navigation bar color and button theme.

```typescript
import { NavigationBar } from '@capgo/capacitor-navigation-bar';

const { color, darkButtons } = await NavigationBar.getNavigationBarColor();
console.log('Current color:', color);
console.log('Using dark buttons:', darkButtons);
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-navigation-bar/
- Docs: /docs/plugins/navigation-bar/
