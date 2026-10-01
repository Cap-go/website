---
locale: en
---
# Using @capgo/capacitor-is-root

Capacitor Is Root Plugin for detecting rooted (Android) or jailbroken (iOS) devices.

## Install

```bash
bun add @capgo/capacitor-is-root
bunx cap sync
```

`bunx cap sync` copies the plugin's native code into your native projects. Run it again after every plugin upgrade.

## Import

```typescript
import { IsRoot } from '@capgo/capacitor-is-root';
```

## API at a glance

| Method | Description |
| --- | --- |
| `isRooted` | Performs the default root/jailbreak detection checks. |
| `isRootedWithBusyBox` | Extends the default detection with BusyBox specific checks (Android only). |
| `detectRootManagementApps` | Detects if known root management applications are present (Android only). |
| `detectPotentiallyDangerousApps` | Detects potentially dangerous applications commonly found on rooted devices (Android only). |
| `detectTestKeys` | Detects debug/test build tags (Android only). |
| `checkForBusyBoxBinary` | Checks whether a BusyBox binary exists on the device (Android only). |
| `checkForSuBinary` | Checks whether a `su` binary is present (Android only). |
| `checkSuExists` | Detects if the `su` binary can be executed (Android only). |
| `checkForRWPaths` | Detects world writable system paths (Android only). |
| `checkForDangerousProps` | Detects dangerous system properties (Android only). |
| `checkForRootNative` | Executes RootBeer native checks (Android only). |
| `detectRootCloakingApps` | Detects applications that can hide root (Android only). |
| `isSelinuxFlagInEnabled` | Checks the SELinux enforcement state (Android only). |
| `isExistBuildTags` | Detects test build tags on the OS image (Android only). |
| `doesSuperuserApkExist` | Detects if superuser APKs are installed (Android only). |
| `isExistSUPath` | Checks for known `su` binary locations (Android only). |
| `checkDirPermissions` | Detects writable directories that should be protected (Android only). |
| `checkExecutingCommands` | Executes `which su` style commands to detect root (Android only). |
| `checkInstalledPackages` | Detects suspicious installed packages (Android only). |
| `checkforOverTheAirCertificates` | Detects tampered OTA certificates (Android only). |
| `isRunningOnEmulator` | Detects common emulator fingerprints (Android only). |
| `simpleCheckEmulator` | Performs a lightweight emulator check (Android only). |
| `simpleCheckSDKBF86` | Detects x86 emulator fingerprints (Android only). |
| `simpleCheckQRREFPH` | Detects QC reference phone builds (Android only). |
| `simpleCheckBuild` | Detects build host anomalies (Android only). |
| `checkGenymotion` | Detects Genymotion emulator fingerprints (Android only). |
| `checkGeneric` | Detects generic emulator fingerprints (Android only). |
| `checkGoogleSDK` | Detects Google SDK emulator fingerprints (Android only). |
| `togetDeviceInfo` | Returns device information collected during detection. |
| `isRootedWithEmulator` | Extends the default detection with emulator heuristics (Android only). |
| `isRootedWithBusyBoxWithEmulator` | Extends the BusyBox detection with emulator heuristics (Android only). |

## Examples

### `isRooted()`

Performs the default root/jailbreak detection checks.

```typescript
import { IsRoot } from '@capgo/capacitor-is-root';

const { result } = await IsRoot.isRooted();
if (result) {
  console.log('Device is rooted/jailbroken');
} else {
  console.log('Device is not rooted/jailbroken');
}
```

### `isRootedWithBusyBox()`

Extends the default detection with BusyBox specific checks (Android only).

```typescript
import { IsRoot } from '@capgo/capacitor-is-root';

const result = await IsRoot.isRootedWithBusyBox();
console.log(result);
```

### `detectRootManagementApps()`

Detects if known root management applications are present (Android only).

```typescript
import { IsRoot } from '@capgo/capacitor-is-root';

const result = await IsRoot.detectRootManagementApps();
console.log(result);
```

### `detectPotentiallyDangerousApps()`

Detects potentially dangerous applications commonly found on rooted devices (Android only).

```typescript
import { IsRoot } from '@capgo/capacitor-is-root';

const result = await IsRoot.detectPotentiallyDangerousApps();
console.log(result);
```

### `detectTestKeys()`

Detects debug/test build tags (Android only).

```typescript
import { IsRoot } from '@capgo/capacitor-is-root';

const result = await IsRoot.detectTestKeys();
console.log(result);
```

### `checkForBusyBoxBinary()`

Checks whether a BusyBox binary exists on the device (Android only).

```typescript
import { IsRoot } from '@capgo/capacitor-is-root';

const result = await IsRoot.checkForBusyBoxBinary();
console.log(result);
```

The table above lists all 31 methods; check the [GitHub repository](https://github.com/Cap-go/capacitor-is-root/) for the full contract of each one.

## Full reference

- [GitHub repository](https://github.com/Cap-go/capacitor-is-root/)
- [Documentation](/docs/plugins/is-root/)
- [API reference](/docs/plugins/is-root/getting-started/)

## Keep going from Using @capgo/capacitor-is-root

If you are using **Using @capgo/capacitor-is-root** to plan native plugin work, connect it with [@capgo/capacitor-is-root](/docs/plugins/is-root/) for the implementation detail in @capgo/capacitor-is-root, [Getting Started](/docs/plugins/is-root/getting-started/) for the implementation detail in Getting Started, [Capgo Plugin Directory](/plugins/) for the product workflow in Capgo Plugin Directory, [Capacitor Plugins by Capgo](/docs/plugins/) for the implementation detail in Capacitor Plugins by Capgo, and [Adding or Updating Plugins](/docs/contributing/adding-plugins/) for the implementation detail in Adding or Updating Plugins.
