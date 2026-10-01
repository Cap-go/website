---
locale: en
---
# Using @capgo/capacitor-in-app-review

Capacitor In-App Review Plugin interface for prompting users to submit app store ratings and reviews without leaving the app.

## Install

```bash
bun add @capgo/capacitor-in-app-review
bunx cap sync
```

`bunx cap sync` copies the native code into your iOS and Android projects. Run it again after every plugin upgrade.

## Import

```typescript
import { CapgoInAppReview } from '@capgo/capacitor-in-app-review';
```

## API at a glance

| Method | Description |
| --- | --- |
| `requestReview` | Request an in-app review from the user. |

## Examples

### `requestReview()`

Request an in-app review from the user.

```typescript
import { CapgoInAppReview } from '@capgo/capacitor-in-app-review';

// Request a review at an appropriate moment in your app
await CapgoInAppReview.requestReview();
```

## Full reference

- [GitHub repository](https://github.com/Cap-go/capacitor-in-app-review/)
- [Documentation](/docs/plugins/in-app-review/)
- [API reference](/docs/plugins/in-app-review/getting-started/)

## Keep going from Using @capgo/capacitor-in-app-review

If you are using **Using @capgo/capacitor-in-app-review** to plan store approval and distribution, connect it with [@capgo/capacitor-in-app-review](/docs/plugins/in-app-review/) for the implementation detail in @capgo/capacitor-in-app-review, [Getting Started](/docs/plugins/in-app-review/getting-started/) for the implementation detail in Getting Started, [@capgo/capacitor-native-market](/docs/plugins/native-market/) for the implementation detail in @capgo/capacitor-native-market, [Using @capgo/capacitor-native-market](/plugins/capacitor-native-market/) for the native capability in Using @capgo/capacitor-native-market, and [Capacitor OTA Updates: App Store Approval Guide](/blog/capacitor-ota-updates-app-store-approval-guide/) for the practical context in Capacitor OTA Updates: App Store Approval Guide.
