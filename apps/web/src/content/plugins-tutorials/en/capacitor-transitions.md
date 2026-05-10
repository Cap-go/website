---
locale: en
published: true
---
# Using @capgo/transitions

`@capgo/transitions` adds Ionic-style route transitions to Capacitor apps without adopting Ionic UI. It runs in the web layer, keeps your existing router, and can auto-enable an iOS edge swipe-back gesture only inside native Capacitor iOS.

## Install

```bash
bun add @capgo/transitions
```

There is no native sync step because the package does not add native plugin code.

## Register the elements

```ts
import '@capgo/transitions';
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
import { setDirection } from '@capgo/transitions/react';

setDirection('forward');
router.push('/message/42');

setDirection('back');
router.back();
```

## React example

```tsx
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { initTransitions, setDirection, setupPage, setupRouterOutlet } from '@capgo/transitions/react';
import '@capgo/transitions';

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

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-transitions/
- Docs: /docs/plugins/transitions/
