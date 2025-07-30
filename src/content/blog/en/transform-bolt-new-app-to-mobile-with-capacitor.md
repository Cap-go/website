---
slug: transform-bolt-new-app-to-mobile-with-capacitor
title: >-
  Transform Your Bolt.new Project into Native Mobile Apps with Capacitor
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

## Step 1: Set Up Your Development Environment

### Get Cursor - Your AI-Powered Code Editor

To work efficiently with your Bolt.new project, we'll use [Cursor](https://cursor.sh/), an intelligent code editor that simplifies development:

1. Head to [cursor.sh](https://cursor.sh/) and grab the installer for your OS
2. Run through the installation process
3. Launch Cursor once it's ready

![Start Cursor](/start_in_cursor.webp)

### Configure Cursor for Maximum Productivity

Getting the most out of Cursor requires some initial setup:

1. **Consider Getting Cursor Pro** - The free version works, but Pro ($20/month) unlocks:
   - Unlimited AI assistance
   - Premium models (GPT-4, Claude)
   - Instant responses
   - Premium support

2. **Access Settings** with `Command+,` (Mac) or `Ctrl+,` (Windows)

![Cursor Settings](/cursor_settings.webp)

3. **Activate AI Features** - Ensure AI assistance is turned on:

![Allow Models](/allow_models.webp)

4. **Pick Your AI Model** - We recommend Claude or GPT-4:

![Select Cursor Model](/select_cursor_model.webp)

5. **Enable Command Running** - Let Cursor execute commands automatically:

![Allow Run Commands](/allow_run_commands.webp)

## Step 2: Export Your Bolt.new Project

Now let's bring your Bolt.new project into Cursor.

### Download Your Project

1. Navigate to your Bolt.new project in your browser
2. Find the **Download** or **Export** button in Bolt's interface

![Bolt.new download button](/bolt-download-button.webp)

3. Download the ZIP file containing your project
4. Extract it to a folder on your computer

![Bolt.new project files](/bolt-project-files.webp)

### Open in Cursor

Once extracted, open the project in Cursor:

1. Use `File > Open Folder` in Cursor
2. Select your extracted Bolt.new project folder
3. Cursor will load your project

![Open in Cursor](/open_in_cursor.webp)

### Alternative: Clone from GitHub

If you've connected Bolt.new to GitHub:

1. Press `Shift+Command+P` (Mac) or `Shift+Ctrl+P` (Windows)
2. Search for "Git: Clone"
3. Enter your repository URL
4. Pick a location to save it

![Clone in Cursor](/clone_in_cursor.webp)

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

## Step 3: Install Development Tools

### Option A: Let Cursor AI Handle Everything

1. Press `Command+K` (Mac) or `Ctrl+K` (Windows) in Cursor
2. Type this request:
   ```
   Install all necessary development tools including Node.js, then install project dependencies and start the dev server
   ```

Cursor AI will automatically:
- Install Node.js and npm if needed
- Set up Homebrew on macOS
- Install all project dependencies
- Launch your development server

![Install Homebrew](/install_brew.webp)

### Option B: Manual Installation Process

If you prefer manual control or the AI approach encounters issues:

**First, open Cursor's terminal** with `Shift+Command+T` (Mac) or `Shift+Ctrl+T` (Windows)

**For macOS users:**
```shell
# Get Homebrew package manager
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js via Homebrew
brew install node

# Move to your project folder
cd your-bolt-project

# Install project packages
npm install

# Launch development server
npm run dev
```

**For Windows users:**
1. Download Node.js installer from [nodejs.org](https://nodejs.org/)
2. Complete the installation wizard
3. In Cursor's terminal:
```shell
cd your-bolt-project
npm install
npm run dev
```

![Bolt.new app running locally](/bolt-app-running.webp)

Your Bolt.new app should now be running (typically at `http://localhost:5173` for Vite projects).

## Step 4: Configure Build for Mobile

Your configuration will vary based on your project framework.

### Option A: Automatic Configuration with Cursor AI

Ask Cursor AI to handle the configuration:
```
Configure my Bolt.new project for mobile deployment with proper build settings
```

Cursor will detect your framework and apply the right configuration.

### Option B: Manual Configuration by Framework

**For React + Vite Projects:**

Edit `vite.config.js`:
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

**For Vue + Vite Projects:**

Modify `vite.config.js`:
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

Time to create the production build of your Bolt.new app.

### Option A: Build with Cursor AI

Simply ask Cursor:
```
Build my Bolt.new project for production deployment
```

Cursor will run the appropriate build command based on your framework.

### Option B: Build Manually

**For Vite-based Projects (React/Vue/Svelte):**
```shell
npm run build
```

![Bolt.new Vite build success](/bolt-vite-build.webp)

**For Next.js Applications:**
```shell
npm run static
```

### Confirm Build Success

Ensure your build generated the correct output:
- **Vite projects**: Look for a `dist` directory
- **Next.js projects**: Check for an `out` directory

![Bolt.new build output](/bolt-build-output.webp)

## Step 6: Add Capacitor to Your Bolt.new Project

Let's transform your web application into native mobile apps.

### Option A: Quick Setup with Cursor AI

Press `Command+K` (Mac) or `Ctrl+K` (Windows) and request:
```
Add Capacitor to my project and set up iOS and Android platforms
```

Cursor AI will handle the entire setup process.

### Option B: Step-by-Step Manual Setup

**Install Capacitor's command-line tools:**
```shell
npm install -D @capacitor/cli
```

**Initialize your Capacitor project:**
```shell
npx cap init
```

![Capacitor initialization Bolt](/capacitor-init-bolt.webp)

You'll be prompted for:
- **App name**: Your Bolt.new project name
- **Bundle ID**: Format like `com.yourcompany.yourapp`

**Continue with manual setup - install essential packages:**
```shell
npm install @capacitor/core @capacitor/ios @capacitor/android
```

**Add mobile platform support:**
```shell
npx cap add ios
npx cap add android
```

![Capacitor platforms added Bolt](/capacitor-platforms-bolt.webp)

## Step 7: Configure Capacitor

Time to configure Capacitor for your specific framework.

### Option A: Auto-Configuration with Cursor

Request Cursor's help:
```
Configure capacitor.config.ts for my Bolt.new project build output
```

### Option B: Manual Configuration

**For Vite-Based Applications:**

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

**For Next.js Applications:**

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

Prepare your app for mobile deployment.

### Option A: Using Cursor AI

Tell Cursor:
```
Build my project and sync it with Capacitor for mobile deployment
```

### Option B: Manual Process

Execute these commands in sequence:
```shell
npm run build
npx cap sync
```

![Capacitor sync Bolt complete](/capacitor-sync-bolt.webp)

## Step 9: Open Native IDEs

Access the native development environments for your app.

### iOS Development

**Option A: Via Cursor AI**
```
Open my iOS project in Xcode
```

**Option B: Terminal Command**
```shell
npx cap open ios
```

![Xcode opening Bolt project](/xcode-bolt-project.webp)

### Android Development

**Option A: Via Cursor AI**
```
Open my Android project in Android Studio
```

**Option B: Terminal Command**
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

Speed up your development workflow with hot reloading.

### Option A: Automatic Setup with Cursor

Ask Cursor:
```
Enable live reload for my Capacitor app development
```

Cursor will configure everything automatically.

### Option B: Manual Configuration

1. **Get your local IP address:**

```shell
# macOS
ipconfig getifaddr en0

# Windows  
ipconfig
```

2. **Update your `capacitor.config.ts`:**

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

3. **Apply the configuration:**
```shell
npx cap copy
```

![Live reload enabled Bolt](/capacitor-live-reload-bolt.webp)

## Step 12: Add Native Features

Enhance your Bolt.new app with device-specific capabilities.

### Option A: AI-Powered Integration

Request from Cursor:
```
Add native share, camera, and geolocation features to my Bolt.new app
```

Cursor will install plugins and create the integration code.

### Option B: Manual Plugin Installation

**Install popular native plugins:**
```shell
npm i @capacitor/share @capacitor/camera @capacitor/geolocation
```

**Create a utilities file for React projects:**

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

**With Cursor AI:**
```
Sync my native feature changes to all platforms
```

**Manual command:**
```shell
npx cap sync
```

![Native features added Bolt](/bolt-native-features.webp)

## Step 13: Optimize for Production

### App Icons and Splash Screens

**Option A: Cursor AI Setup**

Request:
```
Create app icons and splash screens for my mobile app
```

**Option B: Manual Asset Creation**

1. **Get the assets tool:**
```shell
npm install -D @capacitor/assets
```

2. **Prepare your graphics:**
   - Create `assets/icon.png` (1024x1024px)
   - Create `assets/splash.png` (2732x2732px)

3. **Generate all sizes automatically:**
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

**Option A: Build with Cursor AI**
```
Create the final production build and prepare for app store deployment
```

**Option B: Manual Build Process**
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
