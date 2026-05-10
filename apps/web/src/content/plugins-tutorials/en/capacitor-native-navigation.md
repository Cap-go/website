---
locale: en
published: true
---
# Using @capgo/native-navigation

`@capgo/native-navigation` renders native top navigation, bottom tab chrome, and route transition shells over a single full-screen Capacitor WebView. Your web framework still owns routes and content, while native owns the app frame.

## Install and sync

```bash
bun add @capgo/native-navigation
bunx cap sync
```

## Configure the native frame

```ts
import { NativeNavigation } from '@capgo/native-navigation';

await NativeNavigation.configure({
  contentInsetMode: 'css',
  animationDuration: 360,
  colors: {
    tint: '#0f172a',
    inactiveTint: '#64748b',
  },
});
```

## Render a native navbar

```ts
await NativeNavigation.setNavbar({
  title: 'Inbox',
  subtitle: 'Native chrome',
  transparent: true,
  backButton: { visible: false },
  rightItems: [
    {
      id: 'compose',
      title: 'Compose',
      icon: {
        svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>',
      },
    },
  ],
});
```

## Render a native tabbar

```ts
await NativeNavigation.setTabbar({
  selectedId: 'inbox',
  labels: true,
  icons: true,
  tabs: [
    {
      id: 'inbox',
      title: 'Inbox',
      icon: {
        svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16v16H4z"/><path d="m4 13 4 4h8l4-4"/></svg>',
      },
    },
    {
      id: 'search',
      title: 'Search',
      icon: {
        svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m20 20-3-3"/></svg>',
      },
    },
  ],
});
```

## Connect native events to your router

Native bars emit intent. Your router still performs the route change:

```ts
await NativeNavigation.addListener('navbarBack', () => {
  router.back();
});

await NativeNavigation.addListener('navbarItemTap', ({ id }) => {
  if (id === 'compose') router.push('/compose');
});

await NativeNavigation.addListener('tabSelect', ({ id }) => {
  router.push(`/${id}`);
});
```

## Animate route changes

Use a transition transaction around your normal web route update:

```ts
const transition = await NativeNavigation.beginTransition({
  direction: 'forward',
});

router.push('/message/42');
await router.ready?.();

await NativeNavigation.setNavbar({
  title: 'Message',
  backButton: { visible: true, title: 'Inbox' },
});

await NativeNavigation.finishTransition({
  id: transition.id,
  direction: 'forward',
});
```

## Pad content with native insets

When `contentInsetMode` is `css`, the plugin writes CSS variables for the native bars:

```css
.page {
  padding-top: var(--cap-native-navigation-top);
  padding-bottom: var(--cap-native-navigation-bottom);
}
```

## Icon choices

Icons are native descriptors, not React or Vue nodes. Use SVG when you do not want to bundle native assets:

```ts
const icon = {
  svg: '<svg viewBox="0 0 24 24"><path d="M3 10.5 12 3l9 7.5"/></svg>',
  template: true,
  ios: { sfSymbol: 'house.fill' },
  android: { resource: 'ic_menu_view' },
};
```

Inline SVG supports `path`, `line`, `polyline`, `polygon`, `circle`, and `rect`, which covers common icon sets such as Lucide and Feather.

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-native-navigation/
- Docs: /docs/plugins/native-navigation/
