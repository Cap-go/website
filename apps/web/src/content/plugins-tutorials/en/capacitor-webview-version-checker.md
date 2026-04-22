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

## What This Plugin Exposes

- `check` - Runs a version check and returns the latest known status.
- `startMonitoring` - Enables background monitoring (typically on app resume).
- `stopMonitoring` - Disables monitoring.
- `getLastStatus` - Returns the last resolved status, or `null` if no check was run yet.

## Example Usage

### `check`

Runs a version check and returns the latest known status.

```typescript
import { WebviewVersionChecker } from '@capgo/capacitor-webview-version-checker';

await WebviewVersionChecker.check();
```

### `startMonitoring`

Enables background monitoring (typically on app resume).

```typescript
import { WebviewVersionChecker } from '@capgo/capacitor-webview-version-checker';

await WebviewVersionChecker.startMonitoring();
```

### `stopMonitoring`

Disables monitoring.

```typescript
import { WebviewVersionChecker } from '@capgo/capacitor-webview-version-checker';

await WebviewVersionChecker.stopMonitoring();
```

### `getLastStatus`

Returns the last resolved status, or `null` if no check was run yet.

```typescript
import { WebviewVersionChecker } from '@capgo/capacitor-webview-version-checker';

await WebviewVersionChecker.getLastStatus();
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-webview-version-checker/
- Docs: /docs/plugins/webview-version-checker/
