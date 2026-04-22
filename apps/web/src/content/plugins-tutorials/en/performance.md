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

## What This Plugin Exposes

- `startTrace` - Starts a trace.
- `stopTrace` - Stops a trace.
- `incrementMetric` - Atomically increments the metric with the given name for the selected trace by the `incrementBy` value.
- `setEnabled` - Enables or disables performance monitoring. Will be applied with the next start of the app.

## Example Usage

### `startTrace`

Starts a trace.

```typescript
import { FirebasePerformance } from '@capgo/capacitor-firebase-performance';

await FirebasePerformance.startTrace({} as StartTraceOptions);
```

### `stopTrace`

Stops a trace.

```typescript
import { FirebasePerformance } from '@capgo/capacitor-firebase-performance';

await FirebasePerformance.stopTrace({} as StopTraceOptions);
```

### `incrementMetric`

Atomically increments the metric with the given name for the selected trace by the `incrementBy` value.

```typescript
import { FirebasePerformance } from '@capgo/capacitor-firebase-performance';

await FirebasePerformance.incrementMetric({} as IncrementMetricOptions);
```

### `setEnabled`

Enables or disables performance monitoring. Will be applied with the next start of the app.

```typescript
import { FirebasePerformance } from '@capgo/capacitor-firebase-performance';

await FirebasePerformance.setEnabled({} as SetEnabledOptions);
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-firebase/tree/main/packages/performance
- Docs: /docs/plugins/firebase-performance/
