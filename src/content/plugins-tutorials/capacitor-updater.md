# @capgo/capacitor-updater Package Tutorial

This tutorial will guide you through the process of using the `@capgo/capacitor-updater` package to enable auto-updates in your Ionic Capacitor app.

## Prerequisites

Before we start, make sure you have the following installed:

- Node.js
- npm

## Installation

To install the `@capgo/capacitor-updater` package, open your terminal or command prompt and run the following command:

```
npm install @capgo/capacitor-updater
```

This will download and install the package in your project.

## Setup

Once the package is installed, you need to sync your Capacitor project to update the configuration.

```
npx cap sync
```

## Auto-update Setup

To enable auto-updates in your app, you need to follow these steps:

1. Create an account on [capgo.app](https://capgo.app/) and obtain your API key.

2. Login to the CLI using the API key:

   ```
   npx @capgo/cli@latest init API_KEY
   ```

   Replace `API_KEY` with your actual API key.

3. Follow the steps provided by the CLI to complete the setup.

For detailed instructions on the auto-update setup, refer to the [Auto update documentation](https://capgo.app/docs/plugin/auto-update/).

## Manual Setup

If you prefer to manually control the update process, follow these steps:

1. Open your `capacitor.config.json` file and set `"autoUpdate"` to `false`:

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

2. In your main code file, import `CapacitorUpdater` from `@capgo/capacitor-updater`:

   ```javascript
   import { CapacitorUpdater } from '@capgo/capacitor-updater'
   ```

3. Call the `notifyAppReady` method to inform Capacitor Updater that the current update bundle has loaded successfully:

   ```javascript
   CapacitorUpdater.notifyAppReady()
   ```

4. Add the following code to download and set the new version of your app:

   ```javascript
   const version = await CapacitorUpdater.download({
      url: 'https://github.com/Cap-go/demo-app/releases/download/0.0.4/dist.zip',
   })
   await CapacitorUpdater.set(version)
   ```

   Replace the `url` with the URL of your updated distribution zip file.

5. Failed updates will automatically roll back to the last successful version.

For more details on using the manual setup, refer to the provided code examples and comments in the documentation.

## Conclusion

Congratulations! You have successfully learned how to use the `@capgo/capacitor-updater` package to enable auto-updates in your Ionic Capacitor app. Whether you choose the auto-update or manual setup, you now have the tools to keep your app up-to-date with ease.
