---
locale: en
---
# Using @capgo/capacitor-firebase-performance

Capacitor plugin for Firebase Performance Monitoring.

## Install

```bash
bun add @capgo/capacitor-firebase-performance
bunx cap sync
```

`bunx cap sync` copies the plugin's native code into your native projects. Run it again after every plugin upgrade.

## Import

```typescript
import { FirebasePerformance } from '@capgo/capacitor-firebase-performance';
```

## API at a glance

| Method | Description |
| --- | --- |
| `startTrace` | Starts a trace. |
| `stopTrace` | Stops a trace. |
| `incrementMetric` | Atomically increments the metric with the given name for the selected trace by the `incrementBy` value. |
| `setEnabled` | Enables or disables performance monitoring. Will be applied with the next start of the app. |
| `isEnabled` | Determines whether performance monitoring is enabled or disabled. |
| `putAttribute` | Sets a custom attribute of a trace to a given value. |
| `getAttribute` | Returns the value of a custom attribute of a trace. |
| `getAttributes` | Gets the all the custom attributes of a trace with their values. |
| `removeAttribute` | Removes a custom attribute from a trace given its name. |
| `putMetric` | Sets the value of a custom metric. |
| `getMetric` | Get the value of a custom metric by name. |
| `record` | Records a trace given its name and options. |

## Examples

### `startTrace()`

Starts a trace.

```typescript
import { FirebasePerformance } from '@capgo/capacitor-firebase-performance';

await FirebasePerformance.startTrace({ traceName: 'trace' });
```

### `stopTrace()`

Stops a trace.

```typescript
import { FirebasePerformance } from '@capgo/capacitor-firebase-performance';

await FirebasePerformance.stopTrace({ traceName: 'trace' });
```

### `incrementMetric()`

Atomically increments the metric with the given name for the selected trace by the `incrementBy` value.

```typescript
import { FirebasePerformance } from '@capgo/capacitor-firebase-performance';

await FirebasePerformance.incrementMetric({
  traceName: 'trace',
  metricName: 'metric',
});
```

### `setEnabled()`

Enables or disables performance monitoring. Will be applied with the next start of the app.

```typescript
import { FirebasePerformance } from '@capgo/capacitor-firebase-performance';

await FirebasePerformance.setEnabled({ enabled: true });
```

### `isEnabled()`

Determines whether performance monitoring is enabled or disabled.

```typescript
import { FirebasePerformance } from '@capgo/capacitor-firebase-performance';

const result = await FirebasePerformance.isEnabled();
console.log(result);
```

### `putAttribute()`

Sets a custom attribute of a trace to a given value.

```typescript
import { FirebasePerformance } from '@capgo/capacitor-firebase-performance';

await FirebasePerformance.putAttribute({
  traceName: 'trace',
  attribute: "experiment",
  value: "A",
});
```

The table above lists the 12 core methods. Listener and version helpers, and the full contract of each method, are documented in the [GitHub repository](https://github.com/Cap-go/capacitor-firebase/tree/main/packages/performance).

## Full reference

- [GitHub repository](https://github.com/Cap-go/capacitor-firebase/tree/main/packages/performance)
- [Documentation](/docs/plugins/firebase-performance/)
- [API reference](/docs/plugins/firebase-performance/getting-started/)

## Keep going from Using @capgo/capacitor-firebase-performance

If you are using **Using @capgo/capacitor-firebase-performance** to plan native plugin work, connect it with [Capgo Plugin Directory](/plugins/) for the product workflow in Capgo Plugin Directory, [Capacitor Plugins by Capgo](/docs/plugins/) for the implementation detail in Capacitor Plugins by Capgo, [Adding or Updating Plugins](/docs/contributing/adding-plugins/) for the implementation detail in Adding or Updating Plugins, [Ionic Enterprise Plugin Alternatives](/ionic-enterprise-plugins/) for the product workflow in Ionic Enterprise Plugin Alternatives, and [Capgo Native Builds](/native-build/) for the product workflow in Capgo Native Builds.
