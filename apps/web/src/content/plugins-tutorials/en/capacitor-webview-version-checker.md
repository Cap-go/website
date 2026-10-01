---
locale: en
---
# Using @capgo/capacitor-webview-version-checker

Public API for checking WebView freshness and guiding users to updates.

## Install

```bash
bun add @capgo/capacitor-webview-version-checker
bunx cap sync
```

`bunx cap sync` copies the native code into your iOS and Android projects. Run it again after every plugin upgrade.

## Import

```typescript
import { WebviewVersionChecker } from '@capgo/capacitor-webview-version-checker';
```

## API at a glance

| Method | Description |
| --- | --- |
| `check` | Runs a version check and returns the latest known status. |
| `startMonitoring` | Enables background monitoring (typically on app resume). |
| `stopMonitoring` | Disables monitoring. |
| `getLastStatus` | Returns the last resolved status, or `null` if no check was run yet. |
| `showUpdatePrompt` | Shows a native prompt asking the user to update the WebView. |
| `openUpdatePage` | Opens the configured update page directly. |

## Examples

### `check()`

Runs a version check and returns the latest known status.

```typescript
import { WebviewVersionChecker } from '@capgo/capacitor-webview-version-checker';

const result = await WebviewVersionChecker.check();
console.log(result);
```

### `startMonitoring()`

Enables background monitoring (typically on app resume).

```typescript
import { WebviewVersionChecker } from '@capgo/capacitor-webview-version-checker';

const result = await WebviewVersionChecker.startMonitoring();
console.log(result);
```

### `stopMonitoring()`

Disables monitoring.

```typescript
import { WebviewVersionChecker } from '@capgo/capacitor-webview-version-checker';

const result = await WebviewVersionChecker.stopMonitoring();
console.log(result);
```

### `getLastStatus()`

Returns the last resolved status, or `null` if no check was run yet.

```typescript
import { WebviewVersionChecker } from '@capgo/capacitor-webview-version-checker';

const result = await WebviewVersionChecker.getLastStatus();
console.log(result);
```

### `showUpdatePrompt()`

Shows a native prompt asking the user to update the WebView.

```typescript
import { WebviewVersionChecker } from '@capgo/capacitor-webview-version-checker';

const result = await WebviewVersionChecker.showUpdatePrompt();
console.log(result);
```

### `openUpdatePage()`

Opens the configured update page directly.

```typescript
import { WebviewVersionChecker } from '@capgo/capacitor-webview-version-checker';

const result = await WebviewVersionChecker.openUpdatePage();
console.log(result);
```

## Listen to events

`addListener` returns a handle. Call `handle.remove()` when the screen unmounts, or `WebviewVersionChecker.removeAllListeners()` to clear every listener.

## Full reference

- [GitHub repository](https://github.com/Cap-go/capacitor-webview-version-checker/)
- [Documentation](/docs/plugins/webview-version-checker/)
- [API reference](/docs/plugins/webview-version-checker/getting-started/)

## Keep going from Using @capgo/capacitor-webview-version-checker

If you are using **Using @capgo/capacitor-webview-version-checker** to plan native media and interface behavior, connect it with [@capgo/capacitor-webview-version-checker](/docs/plugins/webview-version-checker/) for the implementation detail in @capgo/capacitor-webview-version-checker, [Getting Started](/docs/plugins/webview-version-checker/getting-started/) for the implementation detail in Getting Started, [Using @capgo/capacitor-live-activities](/plugins/capacitor-live-activities/) for the native capability in Using @capgo/capacitor-live-activities, [@capgo/capacitor-live-activities](/docs/plugins/live-activities/) for the implementation detail in @capgo/capacitor-live-activities, and [Using @capgo/capacitor-video-player](/plugins/capacitor-video-player/) for the native capability in Using @capgo/capacitor-video-player.
