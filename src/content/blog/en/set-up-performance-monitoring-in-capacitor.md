---
slug: set-up-performance-monitoring-in-capacitor
title: Set Up Performance Monitoring in Capacitor
description: Learn how to set up performance monitoring in your app using Firebase and Sentry for improved efficiency and user satisfaction.
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2025-03-23T05:36:41.635Z
updated_at: 2025-10-10T01:50:18.000Z
head_image: https://assets.seobotai.com/capgo.app/67df674387fa49042c75b4e1-1742708253934.jpg
head_image_alt: Mobile Development
keywords: Capacitor, performance monitoring, Firebase, Sentry, mobile app development, error tracking, monitoring tools
tag: Development, Mobile, Updates
published: true
locale: en
next_blog: ''
---

**Want to optimize your [Capacitor](https://capacitorjs.com/) app's performance?** Monitoring tools like [Firebase](https://firebase.google.com/) and [Sentry](https://sentry.io/) can help you track crashes, resource usage, and response times, ensuring a smoother user experience. Here's a quick breakdown:

-   **Why Monitor Performance**: Identify crashes, optimize resource usage, and improve response times.
-   **Tools to Use**:
    -   **Firebase**: Real-time performance data, network monitoring, and custom event tracking.
    -   **Sentry**: Detailed error tracking, stack trace analysis, and real-time notifications.
-   **Setup Steps**:
    -   Install Firebase or Sentry SDK.
    -   Configure your app for tracking performance metrics or errors.
    -   Use dashboards to analyze and improve app performance.

**Quick Comparison**:

| Feature | Firebase | Sentry |
| --- | --- | --- |
| Real-time Monitoring | Slight delay | Near-instant |
| Native Support | Android, iOS | Android, iOS, Web |
| Custom Metrics | Basic | Flexible |
| Integration Complexity | Google-based workflows | Simple SDK setup |

For live updates, integrate tools like **[Capgo](https://capgo.app/)** to push fixes instantly without app store delays. Start monitoring today to enhance your app's efficiency and user satisfaction.

## Optimize app health with [Firebase](https://firebase.google.com/) Performance Monitoring ...

![Firebase](https://mars-images.imgix.net/seobot/screenshots/firebase.google.com-ab24bd47674782df651734052f495a0c-2025-03-23.jpg?auto=compress)

<iframe src="https://www.youtube.com/embed/ENaOg5YefjQ" aria-label="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" style="width: 100%; height: 500px;" allowfullscreen></iframe>

## Select a Monitoring Tool

Choose a monitoring tool that fits your app's requirements and your team's expertise. Here's a look at Firebase Performance Monitoring and Sentry to help you decide.

### Tool Comparison

| Feature | Firebase Performance Monitoring | Sentry |
| --- | --- | --- |
| Pricing Model | Free tier with scalable paid options | Free tier with affordable growth plans |
| Real-time Monitoring | Performance insights with slight delay | Near-instant monitoring |
| Native Platform Support | Android and iOS | Android, iOS, and web |
| Integration Complexity | Works with Google services | Simple SDK setup |
| Custom Event Tracking | Basic custom metrics | Flexible custom event tracking |
| Retention Period | Limited on the free tier | Extended across all plans |

### Selection Criteria

When deciding between these tools, consider the following:

-   **App Size and Traffic**: For apps expecting rapid growth, Firebase is a solid choice. Sentry might be better suited for smaller-scale implementations.
-   **Technical Requirements**: Firebase requires [Google Play Services](https://en.wikipedia.org/wiki/Google_Play_Services), making it ideal for apps within that ecosystem. Sentry works independently, offering more flexibility across platforms.
-   **Team Experience**: Firebase aligns well with teams already familiar with Google tools, while Sentry's straightforward SDK setup is easier for broader use cases.
-   **Budget Constraints**: Both tools offer free tiers, but compare the costs of scaling features to ensure they fit your budget.
-   **Integration Goals**: Firebase integrates seamlessly with Google-based workflows, while Sentry is particularly strong in error tracking.
-   **Regulatory Requirements**: Ensure the tool complies with standards like [GDPR](https://en.wikipedia.org/wiki/General_Data_Protection_Regulation), especially if your app handles sensitive user data.
-   **Update Frequency**: If frequent updates are critical, tools like Capgo can speed up live fixes, complementing your monitoring setup.

## Firebase Setup Guide

Setting up Firebase Performance Monitoring in your [Capacitor app](https://capgo.app/plugins/ivs-player/) requires a few clear steps to ensure accurate data tracking.

### Install Firebase SDK

Start by adding the Firebase SDK to your project and configuring it for your platform(s):

-   **Install Firebase Dependencies**

Run the following commands to install the necessary Firebase packages:

```bash
npm install @capacitor-firebase/performance
npm install firebase
```

-   **Initialize Firebase**

Set up Firebase in your main application file:

```typescript
import { FirebasePerformance } from '@capacitor-firebase/performance';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  // Add your Firebase configuration object here
};

initializeApp(firebaseConfig);
await FirebasePerformance.initializePerformance();
```

-   **Add Platform Configurations**

Update your `capacitor.config.json` file to enable performance monitoring:

```json
{
  "plugins": {
    "FirebasePerformance": {
      "collectMetrics": true,
      "instrumentationEnabled": true,
      "dataCollectionEnabled": true
    }
  }
}
```

### Set Up Performance Tracking

You can start tracking specific app activities like database queries or network requests using Firebase Performance Monitoring.

-   **Track Database Queries**

```typescript
async function trackDatabaseQuery() {
  const trace = await FirebasePerformance.startTrace({ traceName: 'database_query' });

  // Perform your database operation
  await performDatabaseOperation();

  await FirebasePerformance.stopTrace({ traceName: 'database_query' });
}
```

-   **Monitor Network Requests**

```typescript
await FirebasePerformance.setAttributes({
  traceName: 'api_call',
  attributes: {
    endpoint: '/users',
    method: 'GET'
  }
});
```

-   **Track Custom Metrics**

For custom metrics, such as tracking the value of a shopping cart:

```typescript
await FirebasePerformance.putMetric({
  traceName: 'checkout_flow',
  metricName: 'cart_value',
  value: 99.99
});
```

Once these traces are implemented, you can review the collected data in the Firebase Console.

### Use Firebase Console

After setting up monitoring, you can view and analyze your app's performance data in the Firebase Console:

1.  **Access Performance Data**
    
    -   Log in to Firebase Console.
    -   Select your project.
    -   Navigate to **Performance Monitoring**.
    -   Choose your app from the dropdown menu.
2.  **Monitor Key Metrics**
    

The dashboard provides insights into various performance indicators, including:

-   App start time
-   Success rate of network requests
-   Screen render time
-   Results from custom traces

3.  **Set Up Custom Reports**

Create tailored reports to analyze specific aspects of your app's performance, such as:

-   Performance differences by location
-   Metrics based on device type
-   Effects of network conditions
-   Patterns in custom traces

Use these tools to identify and address performance bottlenecks effectively.

## [Sentry](https://sentry.io/) Error Tracking Setup

![Sentry](https://mars-images.imgix.net/seobot/screenshots/sentry.io-925fc70e12ac801815ba3ab27e6adcda-2025-03-23.jpg?auto=compress)

Firebase handles performance metrics, but Sentry is all about catching and diagnosing errors. Together, they give you a strong monitoring setup.

### Install Sentry SDK

Start by installing the required Sentry packages:

```bash
npm install @sentry/capacitor
# Add the Sentry package for your specific framework
```

Once installed, set up Sentry in your app's entry point.

### Initialize Sentry

Configure Sentry in your app's entry point using the following setup:

```typescript
import * as Sentry from "@sentry/capacitor";
import { BrowserTracing } from "@sentry/browser";

Sentry.init({
    dsn: "your-project-dsn",
    integrations: [new BrowserTracing()],
    tracesSampleRate: 0.2,
    environment: "production",
    release: "app-version@" + process.env.VERSION,
    dist: process.env.BUILD_NUMBER,
    debug: false
});
```

This configuration includes release tracking, which links errors to specific app versions.

### Configure Error Tracking

You can tailor error tracking further by using custom error boundaries and try-catch blocks.

**Custom Error Boundaries:**

```typescript
class ErrorBoundary extends React.Component {
    componentDidCatch(error, errorInfo) {
        Sentry.captureException(error, { extra: errorInfo });
    }
}
```

**Tracking Specific Errors:**

```typescript
try {
    riskyOperation();
} catch (error) {
    Sentry.captureException(error, {
        tags: { operation: "data_sync", severity: "critical" },
        extra: { userId: currentUser.id, timestamp: new Date().toISOString() }
    });
}
```

**Monitoring Performance:**

```typescript
const transaction = Sentry.startTransaction({
    name: "API Request",
    op: "http.request"
});

try {
    await makeApiCall();
} finally {
    transaction.finish();
}
```

These methods ensure your app logs errors effectively, making them easier to track and resolve via Sentry.

### Use Sentry Dashboard

The Sentry dashboard provides tools to dig into errors and understand them better:

-   **Real-time monitoring**: Check error frequency, resolution status, and the users affected.
-   **Error analysis**: Review stack traces, group similar errors, and filter by environment.
-   **Alerts**: Set error thresholds, configure notification options, and create custom alert rules.

This dashboard makes diagnosing and fixing issues straightforward.

## Monitoring Best Practices

### Focus on Key Metrics

Capgo's analysis of 750 production apps [\[1\]](https://capgo.app/) highlights key metrics to monitor:

-   **Update Success Rate**: Aim for at least 82%.
-   **Update Speed**: Global CDN should deliver 5 MB in 114 ms.
-   **User Adoption**: 95% of users should update within 24 hours.
-   **API Response Time**: Keep it under 500 ms (global average is 434 ms).

Set up alerts to quickly detect any deviations in these metrics.

### Create Effective Alert Rules

Here's an example of how to configure alerts for performance monitoring:

```typescript
// Example alert configuration
{
    performance: {
        apiLatency: {
            threshold: 1000, // ms
            period: "5m",
            condition: "above"
        },
        errorRate: {
            threshold: 1.0, // percentage
            period: "15m",
            condition: "above"
        },
        updateSuccess: {
            threshold: 75, // percentage
            period: "1h",
            condition: "below"
        }
    }
}
```

### Keep Monitoring and Adjusting

Once your alerts are in place, focus on continuous monitoring and refinement:

-   **Regular Performance Checks**: Review update success rates by region, analyze error trends for different app versions, and monitor API response times during peak hours.
    
-   **Staged Rollouts for Updates**: Begin with 10% of users for the first 24 hours. If everything runs smoothly, increase to 50% and finalize the rollout after 48 hours of stable performance.
    
-   **Ongoing Optimization**: Investigate failed updates, identify slow-performing API endpoints, and evaluate user engagement following updates to ensure sustained improvements.
    

## [Capgo](https://capgo.app/) Updates and Monitoring

![Capgo](https://mars-images.imgix.net/seobot/screenshots/capgo.app-26aea05b7e2e737b790a9becb40f7bc5-2025-03-23.jpg?auto=compress)

### Capgo Core Features

Capgo's live update system, tested on 750 production apps, delivers 5MB bundles in just 114ms [\[1\]](https://capgo.app/).

Key features include:

-   **Real-time Analytics**: Monitor update success rates, which currently average 82% worldwide [\[1\]](https://capgo.app/).
-   **Instant Deployment**: Push critical fixes without waiting for app store approvals.
-   **Partial Updates**: Download only the changed components, saving bandwidth and time.
-   **Version Control**: Quickly roll back updates that negatively impact performance.

This system integrates easily with existing monitoring tools, ensuring smooth operation.

> "We rolled out Capgo OTA updates in production for our user base of +5000. We're seeing very smooth operation almost all our users are upto date within minutes of the OTA being deployed to @Capgo." - colenso [\[1\]](https://capgo.app/)

### Combine Tools with Capgo

Capgo's analytics enable staged rollouts, helping teams ensure stability before a full release.

| Monitoring Aspect | Capgo Integration | Additional Tools |
| --- | --- | --- |
| Error Tracking | Built-in error monitoring | Pair with Sentry for detailed stack traces |
| Performance Metrics | Tracks update success rates | Use Firebase for user interaction data |
| Response Time | API response monitoring | Enhance with custom Firebase timing events |

To configure Capgo’s channel system effectively:

-   Deploy updates to beta testers first.
-   Use Capgo's analytics to monitor performance metrics.
-   Gradually expand the rollout to the broader user base.

> "We practice agile development and @Capgo is mission-critical in delivering continuously to our users!" - Rodrigo Mantica [\[1\]](https://capgo.app/)

With 23.5M updates delivered globally, Capgo’s real-time dashboard provides clear insights, empowering teams to make smart decisions about updates and performance improvements.

## Next Steps

### Main Points

Keeping an eye on key metrics is crucial for effective performance monitoring. Use tools to track these critical indicators:

| **Metric Type** | **Key Focus Areas** | **Recommended Tools** |
| --- | --- | --- |
| App Performance | Response times, crashes | Firebase Performance |
| Error Tracking | Exception rates, stack traces | Sentry |
| Update Analytics | Distribution success | Capgo Analytics |

Dive deeper into these metrics and tools through the resources listed below.

### Learn More

Performance monitoring tools and practices are always advancing. Stay ahead by exploring these guides and strategies:

**Official Documentation**:

-   Firebase Performance Monitoring documentation
-   Sentry's Capacitor integration guide
-   Capacitor's official performance optimization guides

**Advanced Implementation**: Explore Capgo's analytics system, successfully used in over 750 production apps [\[1\]](https://capgo.app/). Their documentation provides insights into monitoring patterns and live update strategies that work seamlessly with other performance tracking tools.