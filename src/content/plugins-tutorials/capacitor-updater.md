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

### Install the plugin

You should end up with this code added to your app :

`npm i @capgo/capacitor-updater && npx cap sync`
To install the plugin into your Capacitor app.

And then add to your app this code to notify the native plugin that the JS bundle is healthy (if you don't do this, the native plugin will rollback to the previous version):

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()
```

This will tell the native plugin the installation as succeeded.

Then do a `npm run build && npx cap copy` to update your app.

### Login to Capgo CLOUD

First, use the `all` [apikey](https://web.capgo.app/dashboard/apikeys/) present in your account to log in with the CLI:

`npx @capgo/cli@latest login YOU_KEY`

### Add your first app

Let's get started by first creating an app in Capgo Cloud with the CLI.

`npx @capgo/cli@latest app add`

This command will use all variables defined in the Capacitor config file to create the app.

### Upload your first version

Run the command to build your code and send it to Capgo with:
`npx @capgo/cli@latest bundle upload`

By default, the version name will be the one in your `package.json` file.

Check in [Capgo](https://web.capgo.app/) if the build is present.

You can even test it with my [mobile sandbox app](https://capgo.app/app_mobile/).

### Make channel default

After you have sent your app to Capgo, you need to make your channel `default` to let apps receive updates from Capgo.

`npx @capgo/cli@latest channel set production -s default`

## Receive a Live Update on a Device

For your application to receive a live update from Deploy, you'll need to run the app on a device or an emulator. The easiest way to do this is simply to use the following command to launch your local app in an emulator or a device connected to your computer.

    npx cap run [ios | android]

Open the app, put it in the background and open it again, you should see in the logs the app did the update.

Congrats! 🎉 You have successfully deployed your first Live Update. This is just the start of what you can do with Live Updates. To learn more, view the complete [Live Updates docs](/docs/plugin/cloud-mode/getting-started/).


> If you need to stop receive in local the update run this command
`npx @capgo/cli@latest channel set`


## Conclusion

Congratulations! You have successfully learned how to use the `@capgo/capacitor-updater` package to enable auto-updates in your Ionic Capacitor app. Whether you choose the auto-update or manual setup, you now have the tools to keep your app up-to-date with ease.
