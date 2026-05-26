---
locale: en
published: true
---
# Using @capgo/capacitor-transitions

`@capgo/capacitor-transitions` adds Ionic-style route transitions to Capacitor apps without adopting Ionic UI. It runs in the web layer, keeps your existing router, and can auto-enable an iOS edge swipe-back gesture only inside native Capacitor iOS.

## Install

```bash
npm install @capgo/capacitor-transitions
```

There is no native sync step because the package does not add native plugin code.

## Register the elements

```ts
import '@capgo/capacitor-transitions';
```

## Wrap your pages

```html
<cap-router-outlet platform="auto" swipe-gesture="auto">
  <cap-page>
    <cap-header slot="header">
      <h1>Inbox</h1>
    </cap-header>

    <cap-content slot="content">
      <button>Open message</button>
    </cap-content>

    <cap-footer slot="footer">
      <nav>Tabs</nav>
    </cap-footer>
  </cap-page>
</cap-router-outlet>
```

## Connect it to a router

Set the transition direction before your normal route update:

```ts
import { setDirection } from '@capgo/capacitor-transitions/react';

setDirection('forward');
router.push('/message/42');

setDirection('back');
router.back();
```

## React example

```tsx
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { initTransitions, setDirection, setupPage, setupRouterOutlet } from '@capgo/capacitor-transitions/react';
import '@capgo/capacitor-transitions';

initTransitions({ platform: 'auto' });

export function AppShell() {
  const outletRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!outletRef.current) return;
    setupRouterOutlet(outletRef.current, { platform: 'auto', swipeGesture: 'auto' });
  }, []);

  return <cap-router-outlet ref={outletRef}>{/* routes */}</cap-router-outlet>;
}

export function InboxPage() {
  const navigate = useNavigate();
  const pageRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!pageRef.current) return;
    return setupPage(pageRef.current);
  }, []);

  return (
    <cap-page ref={pageRef}>
      <cap-header slot="header">
        <h1>Inbox</h1>
      </cap-header>
      <cap-content slot="content">
        <button
          onClick={() => {
            setDirection('forward');
            navigate('/message/42');
          }}
        >
          Open message
        </button>
      </cap-content>
    </cap-page>
  );
}
```

The React subpath includes JSX typings for the custom elements. If TypeScript still reports that `cap-router-outlet` does not exist on `JSX.IntrinsicElements`, add this file:

```ts
// src/capgo-transitions.d.ts
import '@capgo/capacitor-transitions/react';
```

For Vite, Create React App, and most webpack React apps, keeping that file under `src/` is enough. For Next.js or custom TypeScript setups, make sure it is included by `tsconfig.json`:

```json
{
  "include": ["src", "src/capgo-transitions.d.ts"]
}
```

## Enable swipe back

Use `swipe-gesture="auto"` to enable the gesture only when Capacitor reports a native iOS runtime:

```html
<cap-router-outlet swipe-gesture="auto"></cap-router-outlet>
```

You can also force it from JavaScript:

```ts
const outlet = document.querySelector('cap-router-outlet');

outlet?.setSwipeGesture(true);
outlet?.setSwipeGesture(false);
outlet?.setSwipeGesture('auto');
```

The gesture follows the finger during the transition, then completes or cancels when the user releases. Add `data-swipe-gesture-ignore` on buttons, sliders, or drawers that should not start the edge gesture.

## Use with native navigation

Install `@capgo/native-navigation` when the native layer should own the navbar or tabbar:

```bash
npm install @capgo/native-navigation
npx cap sync
```

Configure native chrome, then keep transitions focused on the WebView pages:

```ts
import { NativeNavigation } from '@capgo/native-navigation';
import { setDirection } from '@capgo/capacitor-transitions/react';
import { router } from './router';

await NativeNavigation.configure({
  contentInsetMode: 'css',
});

await NativeNavigation.setNavbar({
  title: 'Inbox',
  backButton: { visible: false },
});

await NativeNavigation.addListener('navbarBack', () => {
  setDirection('back');
  router.back();
});

async function openMessage(id: string) {
  setDirection('forward');
  router.push(`/message/${id}`);

  await NativeNavigation.setNavbar({
    title: 'Message',
    backButton: { visible: true, title: 'Inbox' },
  });
}
```

Use `cap-content` for the animated page body and native-navigation CSS variables for insets:

```html
<cap-router-outlet platform="auto" swipe-gesture="auto">
  <cap-page>
    <cap-content slot="content" fullscreen>
      <main class="native-page">Inbox content</main>
    </cap-content>
  </cap-page>
</cap-router-outlet>
```

```css
.native-page {
  padding-top: var(--cap-native-navigation-top);
  padding-bottom: var(--cap-native-navigation-bottom);
}
```

Do not duplicate the native navbar as a moving web header. `@capgo/native-navigation` keeps the bar native; `@capgo/capacitor-transitions` animates the page content underneath it.

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-transitions/
- Docs: /docs/plugins/transitions/

## Keep going from Using @capgo/capacitor-transitions

If you are using **Using @capgo/capacitor-transitions** to plan native media and interface behavior, connect it with [@capgo/capacitor-transitions](/docs/plugins/transitions/) for the implementation detail in @capgo/capacitor-transitions, [Getting Started](/docs/plugins/transitions/getting-started/) for the implementation detail in Getting Started, [Using @capgo/capacitor-live-activities](/plugins/capacitor-live-activities/) for the native capability in Using @capgo/capacitor-live-activities, [@capgo/capacitor-live-activities](/docs/plugins/live-activities/) for the implementation detail in @capgo/capacitor-live-activities, and [Using @capgo/capacitor-video-player](/plugins/capacitor-video-player/) for the native capability in Using @capgo/capacitor-video-player.
