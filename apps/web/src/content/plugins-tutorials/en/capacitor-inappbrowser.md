---
locale: en
---
# Using @capgo/capacitor-inappbrowser

Capacitor plugin in app browser.

## Install

```bash
npm install @capgo/capacitor-inappbrowser
npx cap sync
```

## What This Plugin Exposes

- `goBack` - Navigates back in the WebView's history if possible.
- `open` - Open url in a new window fullscreen, on android it use chrome custom tabs, on ios it use SFSafariViewController.
- `clearCookies` - Clear cookies of url When `id` is omitted, applies to all open webviews.
- `clearAllCookies` - Clear all cookies When `id` is omitted, applies to all open webviews.

## Example Usage

### `goBack`

Navigates back in the WebView's history if possible.

```typescript
import { InAppBrowser } from '@capgo/capacitor-inappbrowser';

await InAppBrowser.goBack();
```

### `open`

Open url in a new window fullscreen, on android it use chrome custom tabs, on ios it use SFSafariViewController.

```typescript
import { InAppBrowser } from '@capgo/capacitor-inappbrowser';

await InAppBrowser.open({} as OpenOptions);
```

### `clearCookies`

Clear cookies of url When `id` is omitted, applies to all open webviews.

```typescript
import { InAppBrowser } from '@capgo/capacitor-inappbrowser';

await InAppBrowser.clearCookies({} as ClearCookieOptions);
```

### `clearAllCookies`

Clear all cookies When `id` is omitted, applies to all open webviews.

```typescript
import { InAppBrowser } from '@capgo/capacitor-inappbrowser';

await InAppBrowser.clearAllCookies();
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-inappbrowser/
- Docs: /docs/plugins/inappbrowser/

## Keep going from Using @capgo/capacitor-inappbrowser

If you are using **Using @capgo/capacitor-inappbrowser** to plan native plugin work, connect it with [@capgo/capacitor-inappbrowser](/docs/plugins/inappbrowser/) for the implementation detail in @capgo/capacitor-inappbrowser, [Getting Started](/docs/plugins/inappbrowser/getting-started/) for the implementation detail in Getting Started, [Capgo Plugin Directory](/plugins/) for the product workflow in Capgo Plugin Directory, [Capacitor Plugins by Capgo](/docs/plugins/) for the implementation detail in Capacitor Plugins by Capgo, and [Adding or Updating Plugins](/docs/contributing/adding-plugins/) for the implementation detail in Adding or Updating Plugins.
