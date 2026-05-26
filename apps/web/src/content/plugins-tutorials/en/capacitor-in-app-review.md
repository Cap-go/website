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

## What This Plugin Exposes

- `requestReview` - Request an in-app review from the user.

## Example Usage

### `requestReview`

Request an in-app review from the user.

```typescript
import { CapgoInAppReview } from '@capgo/capacitor-in-app-review';

// Request a review at an appropriate moment in your app
await CapgoInAppReview.requestReview();
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-in-app-review/
- Docs: /docs/plugins/in-app-review/

## Keep going from Using @capgo/capacitor-in-app-review

If you are using **Using @capgo/capacitor-in-app-review** to plan store approval and distribution, connect it with [@capgo/capacitor-in-app-review](/docs/plugins/in-app-review/) for the implementation detail in @capgo/capacitor-in-app-review, [Getting Started](/docs/plugins/in-app-review/getting-started/) for the implementation detail in Getting Started, [@capgo/native-market](/docs/plugins/native-market/) for the implementation detail in @capgo/native-market, [Using @capgo/native-market](/plugins/capacitor-native-market/) for the native capability in Using @capgo/native-market, and [Capacitor OTA Updates: App Store Approval Guide](/blog/capacitor-ota-updates-app-store-approval-guide/) for the practical context in Capacitor OTA Updates: App Store Approval Guide.
