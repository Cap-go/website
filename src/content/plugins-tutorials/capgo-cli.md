# Using Capgo CLI for Uploading and Downloading Files

The Capgo CLI is a command-line tool that allows you to upload and download files from the Capgo Cloud. It is designed to work with the Capgo Cloud service, which provides a platform for managing and distributing updates to your Ionic Capacitor apps. In this tutorial, we will walk you through the steps of using the Capgo CLI to upload and download files.

## Prerequisites

Before you can use the Capgo CLI, you need to register on the Capgo website and obtain an API key. You can register at [https://capgo.app/](https://capgo.app/) and obtain your API key from the "apikey" section in your account.

## Installation

To install the Capgo CLI, open your terminal and run the following command:

```
npm install -g @capgo/cli
```

## Login to Cloud

To login to the Capgo Cloud using the API key, run the following command:

```
npx @capgo/cli login [apikey]
```

Replace `[apikey]` with your actual API key.

Optionally, you can add the `--local` flag to save the API key in the local folder.

## Adding a New App to Cloud

To add a new app to the Capgo Cloud, use the following command:

```
npx @capgo/cli add [appId]
```

Replace `[appId]` with your app ID in the format `com.test.app`.

Optionally, you can provide additional options:
- `--icon [/path/to/my/icon]`: Specify a custom icon for the app in the list.
- `--name [test]`: Provide a custom name for the app in the list.
- `--apikey [key]`: Link the app to a specific API key.

## Sending a Version to Cloud

To send a version of your app to the Capgo Cloud, use the following command:

```
npx @capgo/cli upload [appId]
```

Replace `[appId]` with your app ID in the format `com.test.app`.

Optionally, you can provide additional options:
- `--apikey [key]`: Link the version to a specific API key.
- `--path [/path/to/my/app]`: Upload a specific folder instead of the default.
- `--channel [test]`: Upload the version to a specific channel.
- `--external [https://mydomain.com/myapp.zip]`: Link to an external URL instead of uploading to the Capgo Cloud. The URL should be a zip file in HTTPS.
- `--key [/path/to/my/private_key]`: Specify the path of your private key.
- `--key-data [privateKey]`: Specify the private key data inline.
- `--no-key`: Ignore signing key and send a clear update.
- `--bundle [1.0.0]`: Set the bundle version number of the file to upload.
- `--iv-session-key [key]`: Send a custom session key to the cloud.

## Managing Channels

You can manage channels in the Capgo Cloud using the following commands:

### Add a Channel
To add a new channel, use the command:

```
npx @capgo/cli channel add [channelId] [appId]
```

Replace `[channelId]` with the name of the new channel, and `[appId]` with your app ID.

### Delete a Channel
To delete a channel, use the command:

```
npx @capgo/cli channel delete [channelId] [appId]
```

Replace `[channelId]` with the name of the channel you want to delete, and `[appId]` with your app ID.

Please note that deleting a channel will ignore any bundles that are currently in use in any channel.

## End-to-End Encryption

The Capgo CLI supports end-to-end encryption, which ensures that your code is encrypted before being sent to the cloud and decrypted on the device. To set up encryption, follow these steps:

### Create a Key Pair for Your App
To generate an RSA key pair, use the following command:

```
npx @capgo/cli key create
```

Optionally, you can add the `--force` flag to overwrite any existing key.

This command