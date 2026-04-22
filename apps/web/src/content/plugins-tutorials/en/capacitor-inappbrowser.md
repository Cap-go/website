---
locale: en
---
# Using @capgo/inappbrowser

Capacitor plugin in app browser.

## Install

```bash
bun add @capgo/inappbrowser
bunx cap sync
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
import { InAppBrowser } from '@capgo/inappbrowser';

await InAppBrowser.goBack();
```

### `open`

Open url in a new window fullscreen, on android it use chrome custom tabs, on ios it use SFSafariViewController.

```typescript
import { InAppBrowser } from '@capgo/inappbrowser';

await InAppBrowser.open({} as OpenOptions);
```

### `clearCookies`

Clear cookies of url When `id` is omitted, applies to all open webviews.

```typescript
import { InAppBrowser } from '@capgo/inappbrowser';

await InAppBrowser.clearCookies({} as ClearCookieOptions);
```

### `clearAllCookies`

Clear all cookies When `id` is omitted, applies to all open webviews.

```typescript
import { InAppBrowser } from '@capgo/inappbrowser';

await InAppBrowser.clearAllCookies();
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-inappbrowser/
- Docs: /docs/plugins/inappbrowser/
