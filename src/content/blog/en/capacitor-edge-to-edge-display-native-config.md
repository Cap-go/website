---
slug: capacitor-edge-to-edge-display-native-config
title: How to Enable Edge-to-Edge Display in Capacitor Without Hacks or Plugins
description: Learn how to properly configure edge-to-edge display in your Capacitor apps using the official adjustMarginsForEdgeToEdge config option - no plugins or hacks needed.
author: Martin Donadieu
author_image_url: https://avatars.githubusercontent.com/u/4084527?v=4
author_url: https://github.com/riderx
created_at: 2025-10-24T00:00:00.000Z
updated_at: 2025-10-24T00:00:00.000Z
head_image: https://capgo.app/capgo-feature-image.webp
head_image_alt: Edge-to-Edge Display Configuration
keywords: Capacitor, edge-to-edge, Android 15, adjustMarginsForEdgeToEdge, mobile development, native configuration
tag: Development, Mobile, Configuration
published: true
locale: en
next_blog: ''
---

**Trying to implement edge-to-edge display in your Capacitor app?** You don't need any hacks, plugins, or workarounds. Capacitor has official support for edge-to-edge display through the `adjustMarginsForEdgeToEdge` configuration option - it's just not widely documented.

Many developers struggle with edge-to-edge layouts in Capacitor apps, especially when targeting Android 15+. They often resort to custom plugins or CSS hacks to achieve the modern edge-to-edge look. But there's a better, native way.

## What is Edge-to-Edge Display?

Edge-to-edge display allows your app content to extend behind system bars (status bar and navigation bar), creating a more immersive, modern UI experience. Starting with Android 15, Google is pushing edge-to-edge as the standard for all apps.

## The Official Solution: adjustMarginsForEdgeToEdge

Capacitor provides the `adjustMarginsForEdgeToEdge` configuration option specifically for this purpose. This is documented in the [official Capacitor config documentation](https://capacitorjs.com/docs/config), but it's easy to miss.

### How to Configure It

Add this to your `capacitor.config.ts` or `capacitor.config.json`:

```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'My App',
  webDir: 'dist',
  android: {
    adjustMarginsForEdgeToEdge: 'auto' // or 'force' or 'disable'
  }
};

export default config;
```

Or in JSON format:

```json
{
  "appId": "com.example.app",
  "appName": "My App",
  "webDir": "dist",
  "android": {
    "adjustMarginsForEdgeToEdge": "auto"
  }
}
```

### Configuration Options

The `adjustMarginsForEdgeToEdge` option accepts three values:

#### 1. `"auto"` (Recommended)

```typescript
adjustMarginsForEdgeToEdge: 'auto'
```

**What it does:** Automatically checks for Android 15+ and the `windowOptOutEdgeToEdgeEnforcement` setting. Adjusts margins intelligently based on the device and configuration.

**Best for:** Most production apps that want edge-to-edge on supported devices while maintaining compatibility with older Android versions.

#### 2. `"force"`

```typescript
adjustMarginsForEdgeToEdge: 'force'
```

**What it does:** Forces margin adjustments for edge-to-edge regardless of Android version or other settings.

**Best for:** Apps that want edge-to-edge behavior across all supported Android versions.

#### 3. `"disable"`

```typescript
adjustMarginsForEdgeToEdge: 'disable'
```

**What it does:** Disables automatic margin adjustments completely.

**Best for:** Apps that handle edge-to-edge layout manually or don't want edge-to-edge behavior.

**Note:** Currently `"disable"` is the default, but this will change to `"auto"` in Capacitor 8.

## Why This Matters for Android 15+

Starting with Android 15, Google is enforcing edge-to-edge display as the default behavior. Apps that don't properly handle edge-to-edge layouts may experience UI issues like:

- Content hidden behind system bars
- Awkward spacing and padding
- Inconsistent appearance across devices
- Poor user experience

By using the official `adjustMarginsForEdgeToEdge` config, you ensure your app handles these changes properly without custom code.

## Complete Example

Here's a complete example configuration for a modern Capacitor app:

```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.myapp',
  appName: 'My Awesome App',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  android: {
    // Enable edge-to-edge automatically on supported devices
    adjustMarginsForEdgeToEdge: 'auto',

    // Other Android config options...
    backgroundColor: '#ffffff'
  }
};

export default config;
```

## CSS Considerations

When using edge-to-edge display, you may need to add some CSS to handle safe areas:

```css
/* Add padding for system bars */
body {
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
}

/* Or use viewport-fit */
meta[name="viewport"] {
  content: "width=device-width, initial-scale=1, viewport-fit=cover";
}
```

## Testing Your Configuration

After configuring `adjustMarginsForEdgeToEdge`, test your app on:

1. **Android 15+ devices** - Check that content properly respects system bars
2. **Older Android versions** - Ensure backward compatibility
3. **Different screen sizes** - Verify layouts work across devices
4. **Light and dark themes** - Test both theme modes

## Common Mistakes to Avoid

### Don't Use Plugins for This

You don't need third-party plugins like `capacitor-edge-to-edge` or similar. The native config handles this cleanly.

### Don't Mix with Manual Implementations

If you're using `adjustMarginsForEdgeToEdge`, remove any manual window insets handling or CSS hacks you may have added.

### Don't Forget Safe Area CSS

The config handles margin adjustments, but you still need to use CSS safe area insets for proper content padding.

## Migration Guide

If you're currently using plugins or hacks for edge-to-edge:

1. **Remove any edge-to-edge plugins** from your dependencies
2. **Add the config option** to your `capacitor.config.ts`
3. **Clean and rebuild** your Android project
4. **Test thoroughly** on target devices

```bash
# Clean the Android project
npx cap sync android
cd android
./gradlew clean
cd ..

# Rebuild
npx cap copy android
npx cap open android
```

## Future-Proofing

Remember that Capacitor 8 will make `"auto"` the default value. To prepare:

1. **Test with `"auto"` now** to catch any issues early
2. **Update your CSS** to handle safe areas properly
3. **Review your layouts** on edge-to-edge enabled devices

## Additional Resources

- [Official Capacitor Config Documentation](https://capacitorjs.com/docs/config)
- [Android Edge-to-Edge Guidelines](https://developer.android.com/develop/ui/views/layout/edge-to-edge)
- [CSS Safe Area Insets](https://developer.mozilla.org/en-US/docs/Web/CSS/env)

## Conclusion

Edge-to-edge display in Capacitor doesn't require plugins, hacks, or complicated workarounds. The `adjustMarginsForEdgeToEdge` configuration option provides a clean, native solution that's officially supported and future-proof.

Start with `"auto"` for most apps, test thoroughly across devices, and add appropriate safe area CSS. Your app will be ready for Android 15 and beyond with minimal effort.

**Questions or running into issues?** The Capacitor community and [official documentation](https://capacitorjs.com/docs/config) are great resources for additional help.
