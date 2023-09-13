---
slug: "quasar-config-with-capgo"
title: Quasar configuration with capgo
description: How to set up a quasar configuration with capgo
author: Ayush Mishra
author_url: https://twitter.com/ayusham001
created_at: 2023-09-13
updated_at: 2023-09-13
head_image: ""
head_image_alt: Quasar Configuration
tag: TUTORIAL
published: true
next_blog: ""
---

# Simplifying Quasar Configuration with CapGo: A Comprehensive Guide

Quasar is a powerful Vue.js framework that simplifies cross-platform application development. However, configuring a Quasar project can be a complex and daunting task, especially for newcomers. Fortunately, there's a solution that can make this process easier and more streamlined: CapGo. In this comprehensive guide, we will explore how to simplify Quasar configuration using CapGo, a tool that allows you to update your Ionic Capacitor apps without going through the App/Play Store review process.

## What is CapGo?

CapGo is a game-changer for developers using Ionic Capacitor, a framework that enables you to build cross-platform apps using web technologies. With CapGo, you can update your app without going through the lengthy App Store and Play Store review processes, making it ideal for quick bug fixes and feature updates.

CapGo offers three ways to update your apps:

1. **capgo.app**: A comprehensive auto-update system that can be set up in just five minutes. It allows you to manage versions, updates, reversions, and view statistics with ease.

2. **Your Own Server**: You can set up your server with an auto-update system. This option provides more control over your updates.

3. **Manual Methods**: If you prefer a more hands-on approach, you can manually zip, upload, and download updates directly from your JavaScript code.

Now that you have an overview of CapGo let's dive into how it simplifies Quasar configuration.

## Installation

To get started with CapGo in your Quasar project, you need to install the CapGo Capacitor Updater package. Open your terminal and run the following commands:

```shell
npm install @capgo/capacitor-updater
npx cap sync
```
## Auto-Update Setup
1. **Create a CapGo Account and Get Your API Key**:
Before you can start using CapGo, you need to create an account on capgo.app and obtain your API key.

2. **Initialize CapGo**:
In your terminal, run the following command to initialize CapGo with your API key:
    
```shell
npx @capgo/cli@latest init API_KEY
```
Follow the on-screen instructions to set up your app. You will be prompted to configure various options, such as enabling TypeScript, choosing a CSS pre-processor, and adding router and Vuex store support.

3. **Notify App Ready**:
In your Quasar application code, add the following import statement to notify CapGo when your app is ready:
    
```javascript
import { CapacitorUpdater } from '@capgo/capacitor-updater'
CapacitorUpdater.notifyAppReady()
```
This informs CapGo that the current update bundle has loaded successfully. Failing to call this method may result in your application rolling back to the previously successful version or the built-in bundle.

4. **Download and Set Updates**
You can use CapGo to download and set updates in your application. Here's an example of how to do it:
        
```javascript
const version = await CapacitorUpdater.download({
    url: 'https://example.com/update.zip', // Replace with your update URL
})
await CapacitorUpdater.set(version); // Sets the new version and reloads the app
```
Failed updates will automatically roll back to the last successful version, ensuring a seamless user experience.

## Manual Setup

If you prefer more control over the update process, you can manually download update distribution zip files from a custom URL and manage the updates in your code.
1. **Configure Capacitor**:
Edit your `capacitor.config.json` file to set `autoUpdate` to `false`:
        
```json
// capacitor.config.json
{
  "appId": "**.***.**",
  "appName": "Name",
  "plugins": {
    "CapacitorUpdater": {
      "autoUpdate": false
    }
  }
}
```
2. **Notify App Ready**
In your Quasar application code, add the following import statement to notify Capacitor Updater when your app is ready:
            
```javascript
import { CapacitorUpdater } from '@capgo/capacitor-updater'
CapacitorUpdater.notifyAppReady()
```

3. **Download and Set Updates Manually**:
You can use Capacitor Updater to manually download and set updates. Here's an example:
                    
```javascript
const version = await CapacitorUpdater.download({
    url: 'https://example.com/update.zip', // Replace with your update URL
})
await CapacitorUpdater.set(version); // Sets the new version and reloads the app
```

## Conclusion
Configuring a Quasar project can be a challenging task, especially for newcomers. However, with CapGo, you can simplify the process and even enable auto-updates for your Ionic Capacitor apps. Whether you choose the automated or manual setup, CapGo empowers you to manage updates with ease, ensuring that your users always have access to the latest features and bug fixes. Say goodbye to the lengthy App/Play Store review process and embrace the efficiency of CapGo in your Quasar projects.