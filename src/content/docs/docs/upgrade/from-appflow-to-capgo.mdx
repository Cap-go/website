---
title: Migrate from AppFlow to Capgo
description: Complete guide to migrate your app from Ionic AppFlow to Capgo
sidebar:
  order: 7
---

## AppFlow Configuration Reference

Before migrating, note your current AppFlow configuration in `capacitor.config.ts`:

```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  plugins: {
    LiveUpdates: {
      appId: 'your-app-id',
      channel: 'Production',
      autoUpdateMethod: 'background', // or 'always latest', 'force update'
      maxVersions: 2
    }
  }
};
```

This configuration will help map AppFlow features to Capgo equivalents.

## Update Strategy Migration

### Background Updates (Default)
If using AppFlow's default background updates:

```typescript
// Capgo equivalent in capacitor.config.ts
{
  plugins: {
    CapacitorUpdater: {
      autoUpdate: true,
      directUpdate: false,
      autoDeletePrevious: true
    }
  }
}
```

### Force Updates
If using AppFlow's force update strategy:

```typescript
// Capgo equivalent in capacitor.config.ts
{
  plugins: {
    CapacitorUpdater: {
      autoUpdate: true,
      directUpdate: true,
      keepUrlPathAfterReload: true
    }
  }
}

// Required JavaScript code
import { CapacitorUpdater } from '@capgo/capacitor-updater';
import { SplashScreen } from '@capacitor/splash-screen';

CapacitorUpdater.addListener('appReady', () => {
  SplashScreen.hide();
});

CapacitorUpdater.notifyAppReady();
```

### Always Latest Updates
If using AppFlow's always latest strategy, implement with Capgo:

```typescript
import { CapacitorUpdater } from '@capgo/capacitor-updater';
import { App } from '@capacitor/app';

async function setupAlwaysLatest() {
  App.addListener('resume', async () => {
    const result = await CapacitorUpdater.download({
      url: 'your-update-url'
    });
    if (result) {
      await CapacitorUpdater.set({ id: result.id });
    }
  });
}
```

## API Method Migration

| AppFlow Method | Capgo Equivalent | Notes |
|---------------|------------------|-------|
| `sync()` | `download()` | Downloads new updates |
| `reload()` | `set()` | Applies updates immediately |
| `setConfig()` | `setChannel()` | Updates channel configuration |

### Example Migration

```typescript
// AppFlow code
import * as LiveUpdates from '@capacitor/live-updates';
const result = await LiveUpdates.sync();
if (result.activeApplicationPathChanged) {
  await LiveUpdates.reload();
}

// Capgo equivalent
import { CapacitorUpdater } from '@capgo/capacitor-updater';
const bundle = await CapacitorUpdater.download({
  url: 'your-update-url'
});
if (bundle) {
  await CapacitorUpdater.set({ id: bundle.id });
}
```


## Why migrate to Capgo?

With Ionic AppFlow's shutdown announcement, migrating to Capgo provides a seamless transition for your mobile app development workflow. Capgo offers enhanced features, better performance, and significant cost savings while maintaining all the critical functionality you need.

### Key Benefits
- Faster update delivery (< 1 minute vs 10 minutes)
- More affordable pricing ($14/month vs $499/month)
- End-to-end encryption included in all plans
- Enhanced control over update channels
- Comprehensive CI/CD integration options

## Migration Steps

### 1. Live Updates Migration

#### Remove Previous Dependencies
```bash
npm uninstall @ionic/appflow
# Remove any AppFlow-specific configurations from capacitor.config.json
```

#### Install Capgo
```bash
npm install @capgo/capacitor-updater
npx cap sync
```

#### Update Configuration
Add Capgo configuration to your `capacitor.config.json`:
```json
{
  "plugins": {
    "CapacitorUpdater": {
      "autoUpdate": true
    }
  }
}
```

### 2. CI/CD Migration

Capgo provides flexible CI/CD options:

#### Option 1: Use Your Existing CI/CD
Follow our detailed tutorials for setting up CI/CD with popular platforms:
- [iOS Build Setup](https://capgo.app/blog/automatic-capacitor-ios-build-github-action/)
- [Android Build Setup](https://capgo.app/blog/automatic-capacitor-android-build-github-action/)
- [GitHub Actions Integration](https://capgo.app/blog/github-action-capacitor/)

#### Option 2: CI/CD Done For You
Let us handle your CI/CD setup with our [managed service](https://cal.com/martindonadieu/mobile-ci-cd-done-for-you).

### 3. Channel Setup

1. Create channels in Capgo dashboard:
```bash
npx @capgo/cli channel create production
npx @capgo/cli channel create staging
```

2. Configure channel settings:
```bash
# Set up production channel
npx @capgo/cli channel update production --no-downgrade --no-upgrade

# Set up staging channel
npx @capgo/cli channel update staging
```

### 4. Testing the Migration

1. **Test Live Updates**
```bash
# Create and upload a test bundle
npx @capgo/cli bundle create --channel staging
```

2. **Verify Update Reception**
- Install the app on a test device
- Check that updates are received correctly
- Verify update installation process
- Test recovery functionality

3. **Validate CI/CD Pipeline**
- Make a test commit
- Verify build process
- Check automatic deployment
- Confirm channel assignment

## Troubleshooting

### Common Issues

#### Updates Not Received
- Verify channel configuration
- Check device logs
- Ensure proper network connectivity
- Validate bundle version format

#### Build Pipeline Issues
- Verify GitHub Actions configuration
- Check signing certificates
- Validate environment variables
- Review build logs

#### Version Conflicts
- Check version numbering
- Verify channel constraints
- Review update conditions

## Next Steps

1. [Register for a Capgo account](/register/)
2. Follow our [quickstart guide](/docs/getting-started/quickstart/)
3. Set up [CI/CD integration](/docs/getting-started/cicd-integration/)
4. Configure [live updates](/docs/live-updates/)

For enterprise teams requiring dedicated support during migration, [schedule a call with our team](https://cal.com/martindonadieu/capgo-enterprise-inquiry).

Remember to test thoroughly in a staging environment before deploying to production. Our support team is available to help if you encounter any issues during migration.
