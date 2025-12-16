---
locale: en
---
# Using @capgo/capacitor-in-app-review Package

The `@capgo/capacitor-in-app-review` package allows you to prompt users to submit app store ratings and reviews without leaving your app. In this tutorial, we will guide you through the process of installing and using this package in your Ionic Capacitor app.

## Installation

To install the `@capgo/capacitor-in-app-review` package, run the following command in your project's root directory:

```bash
npm install @capgo/capacitor-in-app-review
npx cap sync
```

## iOS Setup

The `@capgo/capacitor-in-app-review` package works out of the box on iOS, so no additional setup is required.

## Android Setup

No additional setup is required for Android. However, note that the review dialog will not be shown in debug builds. You need to have the app installed from the Play Store (internal testing track works) to see the actual dialog.

## API

The `@capgo/capacitor-in-app-review` package provides the following API methods:

### requestReview()

This method triggers the native in-app review dialog. The dialog may or may not be shown depending on platform-specific quotas and guidelines.

```javascript
import { CapgoInAppReview } from '@capgo/capacitor-in-app-review';

async function requestAppReview() {
  try {
    await CapgoInAppReview.requestReview();
    console.log('Review requested successfully');
  } catch (error) {
    console.error('Failed to request review:', error);
  }
}
```

### getPluginVersion()

This method returns the native plugin version.

```javascript
import { CapgoInAppReview } from '@capgo/capacitor-in-app-review';

async function getVersion() {
  const { version } = await CapgoInAppReview.getPluginVersion();
  console.log('Plugin version:', version);
}
```

## Best Practices

When requesting reviews, follow these guidelines for the best results:

### When to Request Reviews

Request reviews at moments when users are most likely to have a positive experience:

```javascript
import { CapgoInAppReview } from '@capgo/capacitor-in-app-review';

// Good: After completing a positive action
async function onTaskCompleted() {
  // User just completed something successfully
  await CapgoInAppReview.requestReview();
}

// Good: After multiple successful app usages
let appOpenCount = 0;
async function onAppOpen() {
  appOpenCount++;
  if (appOpenCount === 5) {
    await CapgoInAppReview.requestReview();
  }
}
```

### When NOT to Request Reviews

```javascript
// Bad: Don't request on app launch
async function onAppStart() {
  // DON'T do this
  await CapgoInAppReview.requestReview();
}

// Bad: Don't request in response to a button tap
function onRateUsButtonClick() {
  // DON'T do this - Apple may reject your app
  CapgoInAppReview.requestReview();
}

// Bad: Don't request after an error
function onError(error) {
  // DON'T do this
  CapgoInAppReview.requestReview();
}
```

## Platform Guidelines

### iOS Guidelines

- The system automatically limits the display of the prompt to 3 times within a 365-day period
- You should not call `requestReview()` in response to a button tap
- The system may or may not show the dialog based on App Store policy
- In development, the dialog will always appear but won't submit reviews

### Android Guidelines

- Google Play enforces a quota on how often a user can be shown the review dialog
- The API might not show the dialog if the quota has been reached
- The dialog will not be shown in debug builds
- For testing, install the app from the Play Store (internal testing track works)

## Complete Example

Here's a complete example of implementing review requests with proper tracking:

```javascript
import { CapgoInAppReview } from '@capgo/capacitor-in-app-review';
import { Preferences } from '@capacitor/preferences';

class ReviewManager {
  static LAST_REQUEST_KEY = 'lastReviewRequest';
  static MIN_DAYS_BETWEEN_REQUESTS = 30;

  async maybeRequestReview() {
    const canRequest = await this.canRequestReview();

    if (canRequest) {
      await CapgoInAppReview.requestReview();
      await this.recordReviewRequest();
    }
  }

  async canRequestReview() {
    const lastRequest = await Preferences.get({
      key: ReviewManager.LAST_REQUEST_KEY
    });

    if (!lastRequest.value) {
      return true;
    }

    const daysSinceLastRequest =
      (Date.now() - parseInt(lastRequest.value)) / (1000 * 60 * 60 * 24);

    return daysSinceLastRequest >= ReviewManager.MIN_DAYS_BETWEEN_REQUESTS;
  }

  async recordReviewRequest() {
    await Preferences.set({
      key: ReviewManager.LAST_REQUEST_KEY,
      value: Date.now().toString()
    });
  }
}

// Usage
const reviewManager = new ReviewManager();

// Call after a positive user interaction
async function onPositiveInteraction() {
  await reviewManager.maybeRequestReview();
}
```

That's it! You have successfully learned how to use the `@capgo/capacitor-in-app-review` package in your Ionic Capacitor app to request app store reviews from your users.
