---
title: "From V7 to V8"
description: "A detailed guide on transitioning from version 7 to version 8 of Capgo updater, outlining the necessary steps and considerations for a successful upgrade process, ensuring compatibility with Capacitor 8 features and improvements."
sidebar:
  order: 0
---

## Why this upgrade

This major version is here to follow Capacitor major version 8

First follow the migration guide of Capacitor:

[https://capacitorjs.com/docs/updating/8-0](https://capacitorjs.com/docs/updating/8-0/)

## Install

`npm i @capgo/capacitor-updater@8`

Then sync the native code update:

`npx cap sync`

That's it! Pretty easy!

## What's New in V8

Version 8 of capacitor-updater brings full compatibility with Capacitor 8, ensuring your app can leverage the latest mobile OS features and improvements.

### Key Updates

- **Capacitor 8 Compatibility**: Full support for Capacitor 8's enhanced native features
- **Performance Improvements**: Optimized update delivery and installation process
- **Enhanced Stability**: Bug fixes and stability improvements from v7
- **Maintained API Compatibility**: No breaking changes to the plugin API from v7

## Configuration

The configuration remains the same as v7. Your existing `capacitor.config` settings will continue to work:

```typescript
{
  plugins: {
    CapacitorUpdater: {
      appId: 'your-app-id',
      version: '1.0.0',
      autoUpdate: true,
      // ... other settings
    }
  }
}
```

## Migration Checklist

- [ ] Update @capacitor/core to ^8.0.0
- [ ] Update @capacitor/android to ^8.0.0
- [ ] Update @capacitor/ios to ^8.0.0
- [ ] Follow Capacitor's v8 migration guide
- [ ] Update @capgo/capacitor-updater to ^8.0.0
- [ ] Run `npx cap sync`
- [ ] Test your app thoroughly on both iOS and Android

## Need Help?

If you encounter any issues during the migration, please:

1. Check our [documentation](/docs/live-updates/)
2. Visit our [Discord community](https://discord.com/invite/VnYRvBfgA6)
3. Open an issue on [GitHub](https://github.com/Cap-go/capacitor-updater/issues)
