---
slug: ios-spm-vs-cocoapods-capacitor-migration-guide
title: "CocoaPods is Dying: Why You Should Migrate to Swift Package Manager Now"
description: >-
  CocoaPods will become read-only in December 2026. Learn why Swift Package Manager (SPM) is the future of iOS dependency management and how to migrate your Capacitor app today.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2026-01-15T00:00:00.000Z
updated_at: 2026-01-15T00:00:00.000Z
head_image: /capacitor-guide.webp
head_image_alt: Swift Package Manager vs CocoaPods comparison
keywords: Swift Package Manager, SPM, CocoaPods, Capacitor, iOS, migration, dependency management, Xcode, Apple
tag: Tutorial
published: true
locale: en
next_blog: ''
---

After 13 years of being the dominant iOS dependency manager, CocoaPods is officially sunsetting. The CocoaPods trunk will become **read-only on December 2, 2026**, meaning no new pods can be added and no updates to existing pods will be accepted. If you're still using CocoaPods for your Capacitor project, now is the time to migrate to Swift Package Manager (SPM).

## Why CocoaPods is Shutting Down

In August 2024, the CocoaPods team announced they were entering maintenance mode. By November 2024, they confirmed the specs repository would become read-only by December 2, 2026. The team isn't killing CocoaPods—existing projects will still work as long as GitHub and jsDelivr continue operating—but they're putting it into retirement.

### Key Timeline

| Date | Event |
|------|-------|
| January 2025 | First notification to CocoaPods contributors |
| September-October 2026 | Second notification before final switch |
| November 1-7, 2026 | Test run of read-only mode |
| **December 2, 2026** | **Trunk becomes permanently read-only** |

## Why Swift Package Manager is Better

SPM isn't just the alternative—it's the superior choice. Here's why:

### 1. Faster Dependency Installation

SPM is significantly faster than CocoaPods when installing and updating dependencies. CocoaPods requires:
- Running `pod install` which can take minutes
- Cloning the entire specs repository
- Analyzing the dependency graph from scratch each time

SPM uses a more efficient resolution algorithm and caches packages intelligently, resulting in dramatically faster build times.

### 2. Apple's Official Support

SPM is built and maintained by Apple. It's integrated directly into Xcode and Swift, meaning:
- **Native Xcode integration**: No workspace files, no extra configuration
- **First-party support**: Updates come directly from Apple with each Xcode release
- **Future-proof**: Apple will continue investing in SPM as part of the Swift ecosystem

CocoaPods, on the other hand, was always a community tool working around Apple's limitations rather than with Apple's blessing.

### 3. Simpler Project Structure

With CocoaPods, you need:
- A `Podfile`
- A `Podfile.lock`
- A `Pods` directory (often gigabytes in size)
- A `.xcworkspace` file

With SPM, dependency information lives directly in your Xcode project. No extra files, no workspace, no bloat.

### 4. Better Security

SPM packages are resolved and verified using checksums. The package manifest (`Package.swift`) is type-safe Swift code, reducing the risk of malformed configurations that could introduce vulnerabilities.

## Capacitor and SPM

**Capacitor 8 now uses SPM as the default dependency manager for new iOS projects.** This isn't just a preference—it's the direction the entire ecosystem is moving.

### Capgo Plugins Are SPM-Ready

All Capgo plugins fully support SPM. We've migrated our entire plugin ecosystem and now primarily test on SPM. This includes:

- `@capgo/capacitor-updater`
- `@capgo/capacitor-inappbrowser`
- `@capgo/capacitor-flash`
- `@capgo/capacitor-screen-recorder`
- And all other Capgo plugins

### Future Capacitor Versions

The next major version of Capacitor will enforce SPM as the default, with CocoaPods becoming a legacy option. Get ahead of the curve by migrating now.

## How to Migrate Your Capacitor Project to SPM

Migrating is straightforward with Capacitor's built-in tools.

### Option 1: Fresh Migration (Recommended)

If you haven't made manual changes to your Xcode project:

```bash
# Remove the existing iOS directory
rm -rf ios

# Re-add iOS with SPM
npx cap add ios --packagemanager SPM
```

This gives you a clean SPM-based project.

### Option 2: In-Place Migration

For projects with custom Xcode modifications:

```bash
npx cap spm-migration-assistant
```

This tool guides you through the migration while preserving your customizations. Two manual steps are still required:
1. Removing the CocoaPods configuration from your project
2. Adding SPM package dependencies in Xcode

### Adding iOS to a New Project

For new Capacitor projects:

```bash
npx cap add ios --packagemanager SPM
```

That's it—your project is now using SPM from the start.

## Handling Third-Party Plugins

One important note: **you cannot mix SPM and CocoaPods in the same project.** While all Ionic-maintained Capacitor plugins support SPM, some third-party plugins may still need updates.

### Checking Plugin Compatibility

Before migrating, verify your plugins support SPM. Most actively maintained plugins have already added SPM support. If a plugin you depend on doesn't support SPM yet:

1. Check if there's an open issue or PR for SPM support
2. Consider using Ionic's [capacitor-plugin-converter](https://github.com/ionic-team/capacitor-plugin-converter) to convert simple plugins
3. Reach out to the plugin maintainer

### Plugin Limitations

If your plugin mixes Objective-C and Swift, automatic conversion tools won't work—SPM doesn't allow mixing these languages in the same target. These plugins require manual conversion.

## Migration Checklist

Before you migrate:

- [ ] Verify all your plugins support SPM
- [ ] Back up your project (or create a new git branch)
- [ ] Document any custom Xcode project modifications
- [ ] Run your test suite to establish a baseline

During migration:

- [ ] Run the migration assistant or fresh migration
- [ ] Update any custom build scripts that reference CocoaPods
- [ ] Verify the project builds successfully
- [ ] Run your test suite again

After migration:

- [ ] Remove any leftover CocoaPods files (`Podfile`, `Podfile.lock`, `Pods/`)
- [ ] Update your CI/CD pipelines to remove `pod install` steps
- [ ] Update your documentation

## Conclusion

CocoaPods served the iOS community well for over a decade, but its time is ending. Swift Package Manager offers faster builds, better Xcode integration, and long-term support from Apple. With Capacitor 8 defaulting to SPM and future versions enforcing it, there's no reason to wait.

Start your migration today. Your CI/CD pipelines—and your sanity—will thank you.

## Resources

- [Capacitor SPM Documentation](https://capacitorjs.com/docs/ios/spm)
- [CocoaPods Sunset Announcement](https://blog.cocoapods.org/CocoaPods-Specs-Repo/)
- [Ionic's SPM Migration Guide](https://ionic.io/blog/swift-package-manager-and-capacitor)
- [capacitor-plugin-converter](https://github.com/ionic-team/capacitor-plugin-converter)
