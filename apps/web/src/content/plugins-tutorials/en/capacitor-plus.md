---
locale: en
---
# Using Capacitor+ (@capacitor-plus) Packages

Capacitor+ is an automated, always-synced fork of [Capacitor](https://capacitorjs.com) maintained by [Capgo](https://capgo.app). It provides a drop-in replacement for the official Capacitor packages with one key advantage: **community PRs and fixes are merged faster**.

## Why Capacitor+ Exists

The Ionic team maintains Capacitor with their own priorities and release schedule. This means community contributions - bug fixes, improvements, and features - can wait months or even years to be merged. Some never make it at all.

**Capacitor+ solves this problem by:**

1. **Merging PRs from Forks** - Valuable PRs that are stuck in the upstream queue are actively merged
2. **Continuous Sync** - Every change from upstream Capacitor is automatically pulled, tested, and verified
3. **Rapid Releases** - When changes pass CI, they're automatically published to npm under the `@capacitor-plus` scope
4. **Community-First** - Your contributions matter and get prioritized
5. **Security Reviewed** - Every change is analyzed by AI for security vulnerabilities, breaking changes, and stability risks

## Available Packages

| Package | Description |
|---------|-------------|
| `@capacitor-plus/core` | Core runtime library |
| `@capacitor-plus/cli` | Command-line interface |
| `@capacitor-plus/android` | Android runtime |
| `@capacitor-plus/ios` | iOS runtime |

## Installation

### New Project

For a new project, simply use the Capacitor+ packages instead of the official ones:

```bash
npm install @capacitor-plus/core @capacitor-plus/cli
npm install @capacitor-plus/android  # for Android
npm install @capacitor-plus/ios      # for iOS
```

Then initialize your project:

```bash
npx cap init
npx cap add android
npx cap add ios
```

### Migrating from Official Capacitor

To migrate an existing project from official Capacitor to Capacitor+:

```bash
# Remove official packages
npm uninstall @capacitor/core @capacitor/cli @capacitor/android @capacitor/ios

# Install Capacitor+ packages
npm install @capacitor-plus/core @capacitor-plus/cli
npm install @capacitor-plus/android  # if using Android
npm install @capacitor-plus/ios      # if using iOS
```

Since Capacitor+ is a drop-in replacement with the same API, no code changes are required. Your imports remain the same:

```typescript
// These imports work the same with Capacitor+
import { Capacitor } from '@capacitor/core';
import { registerPlugin } from '@capacitor/core';
```

## How It Works

```
┌─────────────────────┐     ┌──────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  ionic-team/        │     │  CI/CD           │     │  Claude Code     │     │  npm publish    │
│  capacitor          │────▶│  Pipeline        │────▶│  Security Review │────▶│  @capacitor-plus│
│  (upstream)         │     │  (daily sync)    │     │  (AI analysis)   │     │  packages       │
└─────────────────────┘     └──────────────────┘     └──────────────────┘     └─────────────────┘
```

1. **Daily Sync**: A GitHub Action fetches the latest changes from `ionic-team/capacitor`
2. **PR Creation**: Changes are proposed as pull requests to the `plus` branch
3. **CI Validation**: Full test suite runs (lint, unit tests, iOS build, Android build)
4. **Claude Code Review**: AI-powered comprehensive security analysis checks for:
   - Security vulnerabilities (injection, XSS, etc.)
   - Breaking API changes
   - Crash risks and stability issues
   - Data integrity and privacy concerns
   - Malicious code patterns
5. **Auto-Merge**: Only if CI passes AND Claude approves (no issues detected)
6. **Auto-Publish**: A new version is published to npm under `@capacitor-plus/*`

## Security Review

Every upstream sync is analyzed for:

| Check | Description |
|-------|-------------|
| Security | Command injection, XSS, path traversal, hardcoded secrets, etc. |
| Breaking Changes | Removed/renamed APIs, changed signatures, config format changes |
| Stability | Null dereferences, unhandled exceptions, race conditions, memory leaks |
| Data Safety | Data loss scenarios, privacy violations, insecure storage |
| Code Integrity | Obfuscated code, suspicious network calls, backdoors |

If any issues are detected, the PR is flagged for manual review and will NOT be auto-merged.

## Want Your PR Merged?

Have a PR stuck in the official Capacitor repo? Here's how to get it into Capacitor+:

1. **Open an issue** in the [Capacitor+ repo](https://github.com/Cap-go/capacitor-plus) linking to your upstream PR
2. **Or submit the PR directly** to the `plus` branch
3. The team will review it, run CI, and merge it if it passes

This way, you and others can benefit from your work immediately, without waiting for the upstream release cycle.

## Benefits

- **Get Stuck PRs Now**: Community fixes and features that are waiting upstream are merged
- **Stay Current**: Get upstream fixes as soon as they pass CI
- **Security First**: Every change is reviewed for vulnerabilities and stability risks
- **Verified Releases**: Only changes that pass both CI tests AND AI security review are published
- **Drop-in Replacement**: Same API as Capacitor, just a different package scope
- **Your Voice Matters**: Submit your own PRs or request specific upstream PRs to be merged

## Example: Using Capacitor+ with Plugins

All official Capacitor plugins work seamlessly with Capacitor+:

```typescript
import { Capacitor } from '@capacitor/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';

// Everything works exactly the same
const platform = Capacitor.getPlatform();

const photo = await Camera.getPhoto({
  resultType: CameraResultType.Uri
});

const position = await Geolocation.getCurrentPosition();
```

Capgo plugins also work perfectly with Capacitor+:

```typescript
import { CapacitorUpdater } from '@capgo/capacitor-updater';
import { ScreenOrientation } from '@capgo/capacitor-screen-orientation';

// Use Capgo plugins with Capacitor+
await CapacitorUpdater.notifyAppReady();
await ScreenOrientation.lock({ orientation: 'portrait' });
```

That's it! You now have a faster-updated version of Capacitor with community improvements merged faster. Your apps will benefit from bug fixes and features without waiting for the official release cycle.
