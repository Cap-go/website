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
