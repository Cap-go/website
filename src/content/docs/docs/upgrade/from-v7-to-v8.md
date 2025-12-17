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

## iOS Minimum Version Requirement

The iOS minimum deployment target has been bumped to **15.5** to ensure that iOS devices with [CVE-2022-36943](https://nvd.nist.gov/vuln/detail/CVE-2022-36943) are excluded. This is the minimum version of the iOS zip library that has the security fix implemented.

### Swift Package Manager (SPM) Workaround

Capacitor currently has a bug ([ionic-team/capacitor#7556](https://github.com/ionic-team/capacitor/issues/7556)) that does not allow setting the iOS deployment target to 15.5 when using SPM.

If you need SPM support, you can temporarily use our fork:

**GitHub:** [https://github.com/Cap-go/capacitor-plus](https://github.com/Cap-go/capacitor-plus)

To use it, replace the CLI package `@capacitor/cli` with `@capacitor-plus/cli`:

```bash
npm uninstall @capacitor/cli
npm install @capacitor-plus/cli
```

Then use the CLI as usual:

```bash
npx capacitor sync
```

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

- [ ] Follow Capacitor's v8 [migration guide](https://capacitorjs.com/docs/updating/8-0), check for breaking changes.
- [ ] Bump iOS minimum deployment target to 15.5 (required for CVE-2022-36943 fix)
- [ ] If using SPM, temporarily switch to [@capacitor-plus/cli](https://github.com/Cap-go/capacitor-plus) until [ionic-team/capacitor#7556](https://github.com/ionic-team/capacitor/issues/7556) is fixed
- [ ] [Update](#install) @capgo/capacitor-updater to ^8.0.0
- [ ] [Run](#install) `npx cap sync`
- [ ] Test your app thoroughly on both iOS and Android

## Need Help?

If you encounter any issues during the migration, please:

1. Check our [documentation](/docs/live-updates/)
2. Visit our [Discord community](https://discord.com/invite/VnYRvBfgA6)
3. Open an issue on [GitHub](https://github.com/Cap-go/capacitor-updater/issues)
