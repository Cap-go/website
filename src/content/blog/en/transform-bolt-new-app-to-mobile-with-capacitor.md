---
slug: transform-bolt-new-app-to-mobile-with-capacitor
title: >-
  2025 Transform Your Bolt.new Project into Native Mobile Apps with Capacitor
description: >-
  Learn how to export your Bolt.new web application and transform it into native mobile apps using Capacitor. Complete guide for React, Vue, and other frameworks.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2025-07-28T00:00:00.000Z
updated_at: 2025-07-28T00:00:00.000Z
head_image: /bolt_capacitor.webp
head_image_alt: Bolt.new and Capacitor integration illustration
keywords: Bolt.new, Capacitor, mobile app development, React, Vue, export project, native mobile apps
tag: Tutorial
published: true
locale: en
next_blog: building-a-native-mobile-app-with-nextjs-and-capacitor
---

## Introduction

[Bolt.new](https://bolt.new/) is an innovative AI-powered development platform that can generate full-stack web applications using various frameworks like React, Vue, Svelte, and more. But what if you want to bring your Bolt.new creation to mobile devices? In this comprehensive tutorial, we'll show you how to export your Bolt.new project and transform it into native mobile apps using [Capacitor](https://capacitorjs.com/).

Whether your Bolt.new project uses React, Vue, or another supported framework, this guide will help you create native iOS and Android apps with access to device features like camera, storage, and push notifications.

### Why Transform Your Bolt.new App to Mobile?

- **Cross-Platform Reach**: Deploy your AI-generated app to mobile app stores
- **Native Device Access**: Use camera, GPS, file system, and other native features
- **Improved Performance**: Native container provides better performance than web views
- **Offline Capabilities**: Work offline with native storage solutions
- **Push Notifications**: Engage users with native push notification support

### Why Capacitor Over Expo?

If you're considering mobile development options, Capacitor offers significant advantages over Expo, especially for web-first development:

- **One Codebase, Three Platforms**: Your existing React, Next.js, or Vue.js website becomes iOS, Android, AND web app with zero conversion needed
- **No Rebuilding Required**: Take your Bolt.new project as-is - no need to rewrite for a different framework like Expo requires
- **True Web-First Approach**: Unlike Expo which is mobile-first and clunky on web, Capacitor treats web as a first-class citizen
- **Seamless Development**: Continue using your familiar web development tools and workflows
- **Framework Freedom**: Works with any web framework (React, Vue, Svelte, Next.js, etc.) - not locked into React Native like Expo

**The Key Difference:**
- **With Capacitor**: Build your website → Add mobile support (same codebase)
- **With Expo**: Build for mobile → Try to make web work (different approach, often clunky)

Since your Bolt.new project is already a web application, Capacitor lets you extend it to mobile without changing a single line of code. Expo would require rebuilding your entire project for their framework.

## Step 1: Export Your Bolt.new Project

First, let's get your project code from Bolt.new to your local development environment.

### Downloading Your Project

1. Open your Bolt.new project in the browser
2. Look for the **Download** or **Export** option in the Bolt interface

![Bolt.new download button](/bolt-download-button.webp)

3. Click **Download ZIP** to get your complete project files
4. Extract the ZIP file to your development directory

![Bolt.new project files](/bolt-project-files.webp)

### Alternative: Git Repository Export

If your Bolt.new project is connected to a Git repository:

```shell
git clone https://github.com/yourusername/your-bolt-project.git
cd your-bolt-project
```

## Step 2: Identify Your Project Framework

Bolt.new can generate projects using different frameworks. Let's identify what you're working with:

### Check package.json

Open `package.json` to see what framework your project uses:

![Bolt.new package.json inspection](/bolt-package-json.webp)

Common Bolt.new project types:
- **React + Vite**: Most common setup
- **Vue + Vite**: Vue.js applications
- **Svelte**: Svelte applications
- **Next.js**: Full-stack React apps
- **Vanilla JS**: Plain JavaScript apps

## Step 3: Set Up Your Development Environment

Navigate to your project directory and install dependencies:

```shell
cd your-bolt-project
npm install
```

Start the development server to verify everything works:

```shell
npm run dev
```

![Bolt.new app running locally](/bolt-app-running.webp)

Your Bolt.new app should now be running (typically at `http://localhost:5173` for Vite projects).

## Step 4: Configure Build for Mobile

The configuration depends on your project framework:

### For React + Vite Projects

Update your `vite.config.js`:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
})
```

### For Vue + Vite Projects

Update your `vite.config.js`:

```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: './',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  },
})
```

### For Next.js Projects

Add to your `package.json` scripts:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "static": "next build && next export"
  }
}
```

Update `next.config.js`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
```

## Step 5: Build Your Project

Build your Bolt.new project for production:

### For Vite Projects (React/Vue/Svelte)

```shell
npm run build
```

![Bolt.new Vite build success](/bolt-vite-build.webp)

### For Next.js Projects

```shell
npm run static
```

### Verify Build Output

Check that your build created the appropriate output directory:
- Vite projects: `dist` folder
- Next.js projects: `out` folder

![Bolt.new build output](/bolt-build-output.webp)

## Step 6: Add Capacitor to Your Bolt.new Project

Now let's transform your web app into a native mobile app.

### Install Capacitor CLI

```shell
npm install -D @capacitor/cli
```

### Initialize Capacitor

```shell
npx cap init
```

![Capacitor initialization Bolt](/capacitor-init-bolt.webp)

When prompted:
- **App name**: Use your Bolt.new project name
- **Bundle ID**: Use format like `com.yourcompany.yourapp`

### Install Core Capacitor Packages

```shell
npm install @capacitor/core @capacitor/ios @capacitor/android
```

### Add Native Platforms

```shell
npx cap add ios
npx cap add android
```

![Capacitor platforms added Bolt](/capacitor-platforms-bolt.webp)

## Step 7: Configure Capacitor

Update `capacitor.config.ts` based on your build output:

### For Vite Projects

```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.yourcompany.yourapp',
  appName: 'Your Bolt App',
  webDir: 'dist',
  bundledWebRuntime: false,
  server: {
    androidScheme: 'https'
  }
};

export default config;
```

### For Next.js Projects

```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.yourcompany.yourapp',
  appName: 'Your Bolt App',
  webDir: 'out',
  bundledWebRuntime: false,
  server: {
    androidScheme: 'https'
  }
};

export default config;
```

## Step 8: Build and Sync

Build your project and sync with Capacitor:

```shell
npm run build
npx cap sync
```

![Capacitor sync Bolt complete](/capacitor-sync-bolt.webp)

## Step 9: Open Native IDEs

### For iOS Development

```shell
npx cap open ios
```

![Xcode opening Bolt project](/xcode-bolt-project.webp)

### For Android Development

```shell
npx cap open android
```

![Android Studio opening Bolt project](/android-studio-bolt-project.webp)

## Step 10: Build and Run Your Mobile App

### Running on iOS

1. In Xcode, select your target device or simulator
2. Configure signing (Apple Developer account required for device deployment)
3. Click the **Play** button to build and run

![Bolt app running on iOS](/bolt-ios-app.webp)

### Running on Android

1. In Android Studio, select your target device or emulator
2. Click the **Run** button to build and deploy

![Bolt app running on Android](/bolt-android-app.webp)

## Step 11: Enable Live Reload (Development)

For faster development iterations:

1. Find your local IP address:

```shell
# macOS
ipconfig getifaddr en0

# Windows
ipconfig
```

2. Update `capacitor.config.ts`:

```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.yourcompany.yourapp',
  appName: 'Your Bolt App',
  webDir: 'dist', // or 'out' for Next.js
  bundledWebRuntime: false,
  server: {
    url: 'http://YOUR_IP_ADDRESS:5173', // or 3000 for Next.js
    cleartext: true,
  },
};

export default config;
```

3. Apply changes:

```shell
npx cap copy
```

![Live reload enabled Bolt](/capacitor-live-reload-bolt.webp)

## Step 12: Add Native Features

Enhance your Bolt.new app with native capabilities:

### Install Common Plugins

```shell
npm i @capacitor/share @capacitor/camera @capacitor/geolocation
```

### Add Native Functionality

For React projects, create a utilities file:

```javascript
// utils/capacitor.js
import { Share } from '@capacitor/share';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Geolocation } from '@capacitor/geolocation';

export const shareContent = async (title, text, url) => {
  await Share.share({
    title,
    text,
    url,
    dialogTitle: 'Share with friends',
  });
};

export const takePicture = async () => {
  const image = await Camera.getPhoto({
    quality: 90,
    allowEditing: true,
    resultType: CameraResultType.Uri
  });
  return image;
};

export const getCurrentPosition = async () => {
  const coordinates = await Geolocation.getCurrentPosition();
  return coordinates;
};
```

### Use in Your Components

```jsx
// For React components
import React from 'react';
import { shareContent, takePicture } from '../utils/capacitor';

function MyComponent() {
  const handleShare = () => {
    shareContent('My Bolt App', 'Check out this amazing app!', 'https://your-app.com');
  };

  const handleCamera = async () => {
    try {
      const photo = await takePicture();
      console.log('Photo taken:', photo);
    } catch (error) {
      console.error('Camera error:', error);
    }
  };

  return (
    <div>
      <button onClick={handleShare}>Share App</button>
      <button onClick={handleCamera}>Take Photo</button>
    </div>
  );
}

export default MyComponent;
```

### Sync Changes

```shell
npx cap sync
```

![Native features added Bolt](/bolt-native-features.webp)

## Step 13: Optimize for Production

### App Icons and Splash Screens

1. Install Capacitor Assets:

```shell
npm install -D @capacitor/assets
```

2. Create assets folder and add:
   - `assets/icon.png` (1024x1024px)
   - `assets/splash.png` (2732x2732px)

3. Generate all required assets:

```shell
npx capacitor-assets generate
```

![Bolt app assets generated](/bolt-app-assets.webp)

### Optimize Build

For Vite projects, optimize your build:

```javascript
// vite.config.js
export default defineConfig({
  plugins: [react()], // or vue()
  base: './',
  build: {
    outDir: 'dist',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'], // adjust for your framework
        },
      },
    },
  },
})
```

### Final Build

```shell
npm run build
npx cap sync
npx cap copy
```

## Troubleshooting Common Issues

### Framework-Specific Issues

#### React/Vite Projects
- Ensure `base: './'` is set in Vite config
- Check that all imports use relative paths
- Verify that the `dist` folder is generated correctly

#### Vue Projects
- Make sure Vue Router uses hash mode for mobile
- Check that assets are properly referenced
- Verify component lazy loading works in mobile context

#### Next.js Projects
- Ensure static export is configured correctly
- Check that dynamic imports work in static context
- Verify that API routes are not used (or properly handled)

### Build Errors

If you encounter build errors:

1. Clear node_modules and reinstall:
```shell
rm -rf node_modules package-lock.json
npm install
```

2. Check Bolt.new project dependencies for mobile compatibility
3. Ensure all relative paths are correct for mobile deployment

### Missing Assets

For asset loading issues:

1. Verify all assets are in the public folder
2. Use relative paths for images and files
3. Check that the build process copies all necessary assets

## Conclusion

Congratulations! You've successfully transformed your Bolt.new project into native mobile applications. Your AI-generated web app can now:

- Run natively on iOS and Android devices
- Access device features like camera, GPS, and storage
- Be distributed through app stores
- Provide an optimized mobile user experience

### Next Steps

- **Live Updates**: Implement [Capgo](https://capgo.app/) for instant over-the-air updates
- **Analytics**: Add mobile analytics to track user behavior
- **Performance**: Monitor and optimize your app's mobile performance
- **Testing**: Test your app on various devices and screen sizes

Your Bolt.new creation is now ready for the mobile ecosystem!

## Resources

- [Bolt.new Platform](https://bolt.new/)
- [Capacitor Documentation](https://capacitorjs.com/docs)
- [Vite Mobile Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Capgo - Live Updates for Capacitor Apps](https://capgo.app/)

Learn how Capgo can help you deliver instant updates to your mobile app, [sign up for a free account](/register/) today. 
