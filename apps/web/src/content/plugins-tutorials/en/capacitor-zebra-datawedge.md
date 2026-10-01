---
locale: en
---
# Using @capgo/capacitor-zebra-datawedge

Capacitor plugin for Zebra DataWedge profile management, notifications, queries, and soft scanning on Zebra Android devices.

## Install

```bash
bun add @capgo/capacitor-zebra-datawedge
bunx cap sync
```

`bunx cap sync` copies the native code into your iOS and Android projects. Run it again after every plugin upgrade.

## Import

```typescript
import { ZebraDataWedge } from '@capgo/capacitor-zebra-datawedge';
```

## API at a glance

| Method | Description |
| --- | --- |
| `cloneProfile` | See the source definitions for current behavior. |
| `createProfile` | See the source definitions for current behavior. |
| `deleteProfile` | See the source definitions for current behavior. |
| `importConfig` | See the source definitions for current behavior. |
| `renameProfile` | See the source definitions for current behavior. |
| `restoreConfig` | See the source definitions for current behavior. |
| `setConfig` | See the source definitions for current behavior. |
| `setDisabledAppList` | See the source definitions for current behavior. |
| `setIgnoreDisabledProfiles` | See the source definitions for current behavior. |
| `registerForNotification` | See the source definitions for current behavior. |
| `unRegisterForNotification` | See the source definitions for current behavior. |
| `enumerateScanners` | See the source definitions for current behavior. |
| `getActiveProfile` | See the source definitions for current behavior. |
| `getAssociatedApps` | See the source definitions for current behavior. |
| `getConfig` | See the source definitions for current behavior. |
| `getDatawedgeStatus` | See the source definitions for current behavior. |
| `getDisabledAppList` | See the source definitions for current behavior. |
| `getIgnoreDisabledProfiles` | See the source definitions for current behavior. |
| `getProfilesList` | See the source definitions for current behavior. |
| `getScannerStatus` | See the source definitions for current behavior. |
| `getVersionInfo` | See the source definitions for current behavior. |
| `disableDatawedge` | See the source definitions for current behavior. |
| `disableScannerInput` | See the source definitions for current behavior. |
| `enableDatawedge` | See the source definitions for current behavior. |
| `enableScannerInput` | See the source definitions for current behavior. |
| `enumerateTriggers` | See the source definitions for current behavior. |
| `notify` | See the source definitions for current behavior. |
| `resetDefaultProfile` | See the source definitions for current behavior. |
| `setDefaultProfile` | See the source definitions for current behavior. |
| `setReportingOptions` | See the source definitions for current behavior. |
| `softRfidTrigger` | See the source definitions for current behavior. |
| `softScanTrigger` | See the source definitions for current behavior. |
| `switchScanner` | See the source definitions for current behavior. |
| `switchScannerParams` | See the source definitions for current behavior. |
| `switchToProfile` | See the source definitions for current behavior. |

## Examples

### `cloneProfile()`

See the API reference for the current contract.

```typescript
import { ZebraDataWedge } from '@capgo/capacitor-zebra-datawedge';

await ZebraDataWedge.cloneProfile({
  destProfileName: 'path/to/file',
  sourceProfileName: 'path/to/file',
});
```

### `createProfile()`

See the API reference for the current contract.

```typescript
import { ZebraDataWedge } from '@capgo/capacitor-zebra-datawedge';

await ZebraDataWedge.createProfile({ profileName: 'path/to/file' });
```

### `deleteProfile()`

See the API reference for the current contract.

```typescript
import { ZebraDataWedge } from '@capgo/capacitor-zebra-datawedge';

await ZebraDataWedge.deleteProfile({ profileNames: [] });
```

### `importConfig()`

See the API reference for the current contract.

```typescript
import { ZebraDataWedge } from '@capgo/capacitor-zebra-datawedge';

await ZebraDataWedge.importConfig({ folderPath: 'path/to/file' });
```

### `renameProfile()`

See the API reference for the current contract.

```typescript
import { ZebraDataWedge } from '@capgo/capacitor-zebra-datawedge';

await ZebraDataWedge.renameProfile({
  currentProfileName: 'path/to/file',
  newProfileName: 'path/to/file',
});
```

### `restoreConfig()`

See the API reference for the current contract.

```typescript
import { ZebraDataWedge } from '@capgo/capacitor-zebra-datawedge';

await ZebraDataWedge.restoreConfig();
```

The [API reference](/docs/plugins/zebra-datawedge/getting-started/) covers the other 29 methods.

## Listen to events

`addListener` returns a handle. Call `handle.remove()` when the screen unmounts, or `ZebraDataWedge.removeAllListeners()` to clear every listener.

## Full reference

- [GitHub repository](https://github.com/Cap-go/capacitor-zebra-datawedge/)
- [Documentation](/docs/plugins/zebra-datawedge/)
- [API reference](/docs/plugins/zebra-datawedge/getting-started/)

## Keep going from Using @capgo/capacitor-zebra-datawedge

If you are using **Using @capgo/capacitor-zebra-datawedge** to plan native plugin work, connect it with [@capgo/capacitor-zebra-datawedge](/docs/plugins/zebra-datawedge/) for the implementation detail in @capgo/capacitor-zebra-datawedge, [Getting Started](/docs/plugins/zebra-datawedge/getting-started/) for the implementation detail in Getting Started, [Capgo Plugin Directory](/plugins/) for the product workflow in Capgo Plugin Directory, [Capacitor Plugins by Capgo](/docs/plugins/) for the implementation detail in Capacitor Plugins by Capgo, and [Adding or Updating Plugins](/docs/contributing/adding-plugins/) for the implementation detail in Adding or Updating Plugins.
