---
locale: en
published: true
---
# Using @capgo/capacitor-native-navigation

`@capgo/capacitor-native-navigation` renders native top navigation, bottom tab chrome, and route transition shells over a single full-screen Capacitor WebView. Your web framework still owns routes and content, while native owns the app frame.

## Install and sync

```bash
npm install @capgo/capacitor-native-navigation
npx cap sync
```

## Configure the native frame

```ts
import { NativeNavigation } from '@capgo/capacitor-native-navigation';

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
  labelVisibilityMode: 'selected',
  icons: true,
  colors: {
    dynamic: true,
    tint: '#0f172a',
    inactiveTint: '#64748b',
  },
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

## Add a zoom transition

Use the zoom helpers for routes that open from a card, grid item, or media preview.

```ts
import { beginZoomTransition, finishZoomTransition } from '@capgo/capacitor-native-navigation';

const card = document.querySelector('[data-message-card]');
if (card) {
  const transition = await beginZoomTransition(card, { cornerRadius: 18 });

  router.push('/message/42');
  await router.ready?.();

  await NativeNavigation.setNavbar({
    title: 'Message',
    backButton: { visible: true, title: 'Inbox' },
  });

  await finishZoomTransition(undefined, {
    id: transition.id,
    cornerRadius: 18,
  });
}
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

## Combine with @capgo/capacitor-transitions

Use Native Navigation for the native navbar, tabbar, safe-area insets, and native intent events. Use `@capgo/capacitor-transitions` for the WebView page stack underneath that native chrome.

```bash
npm install @capgo/capacitor-native-navigation @capgo/capacitor-transitions
npx cap sync
```

Initialize both packages once:

```ts
import { NativeNavigation } from '@capgo/capacitor-native-navigation';
import '@capgo/capacitor-transitions';
import { initTransitions, setupRouterOutlet, setDirection } from '@capgo/capacitor-transitions/react';

initTransitions({ platform: 'auto' });

const outlet = document.querySelector('cap-router-outlet');
if (outlet) {
  setupRouterOutlet(outlet, { platform: 'auto', swipeGesture: 'auto' });
}

await NativeNavigation.configure({
  contentInsetMode: 'css',
});
```

Keep the transition outlet focused on pages, not duplicate web bars:

```html
<cap-router-outlet platform="auto" swipe-gesture="auto">
  <cap-page>
    <cap-content slot="content" fullscreen>
      <main class="page">Inbox content</main>
    </cap-content>
  </cap-page>
</cap-router-outlet>
```

Drive both packages from the same router actions:

```ts
async function openMessage(id: string) {
  setDirection('forward');
  await router.push(`/messages/${id}`);
  await NativeNavigation.setNavbar({
    title: 'Message',
    backButton: { visible: true, title: 'Inbox' },
  });
}

await NativeNavigation.addListener('navbarBack', () => {
  setDirection('back');
  router.back();
});

await NativeNavigation.addListener('tabSelect', ({ id }) => {
  setDirection('root');
  router.push(`/${id}`);
});
```

Pick one animation layer per route change. Let `@capgo/capacitor-transitions` animate normal page pushes, and use Native Navigation's zoom helpers only for shared-element or zoom routes.

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-native-navigation/
- Docs: /docs/plugins/native-navigation/

## Keep going from Using @capgo/capacitor-native-navigation

If you are using **Using @capgo/capacitor-native-navigation** to plan native media and interface behavior, connect it with [@capgo/capacitor-native-navigation](/docs/plugins/native-navigation/) for the implementation detail in @capgo/capacitor-native-navigation, [Getting Started](/docs/plugins/native-navigation/getting-started/) for the implementation detail in Getting Started, [Using @capgo/capacitor-live-activities](/plugins/capacitor-live-activities/) for the native capability in Using @capgo/capacitor-live-activities, [@capgo/capacitor-live-activities](/docs/plugins/live-activities/) for the implementation detail in @capgo/capacitor-live-activities, and [Using @capgo/capacitor-video-player](/plugins/capacitor-video-player/) for the native capability in Using @capgo/capacitor-video-player.
