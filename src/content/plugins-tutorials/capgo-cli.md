## Using @capgo/cli for Uploading and Downloading Files to Capgo Cloud

[@capgo/cli](https://www.npmjs.com/package/@capgo/cli) is a command-line interface (CLI) tool that allows you to upload and download files to and from the Capgo Cloud. In this tutorial, we will walk through the steps to use @capgo/cli for managing files in the Capgo Cloud.

### Step 1: Registration

Before using @capgo/cli, you need to register an account on [capgo.app](https://capgo.app/) and obtain your API key.

### Step 2: Installation

To install @capgo/cli, open your terminal and run the following command:

```bash
npm install -g @capgo/cli
```

### Step 3: Login to Capgo Cloud

To log in to the Capgo Cloud using @capgo/cli, run the following command:

```bash
npx @capgo/cli login [apikey]
```

Replace `[apikey]` with your API key obtained during registration. Optionally, you can use the `--local` flag to save the API key in the local folder.

### Step 4: Adding a new app to Capgo Cloud

To add a new app to the Capgo Cloud, use the following command:

```bash
npx @capgo/cli add [appId]
```

Replace `[appId]` with your app ID in the format `com.test.app`. You can also use the `--icon`, `--name`, and `--apikey` flags to customize the icon, name, and API key for the app.

### Step 5: Uploading a version to Capgo Cloud

To upload a version of your app to the Capgo Cloud, run the following command:

```bash
npx @capgo/cli upload [appId]
```

Replace `[appId]` with your app ID. You can use the `--apikey`, `--path`, `--channel`, `--external`, `--key`, `--key-data`, `--no-key`, `--bundle`, and `--iv-session-key` flags to customize the upload options.

### Step 6: Managing channels

You can create and delete channels in the Capgo Cloud using @capgo/cli. 

To add a new channel, use the command:

```bash
npx @capgo/cli channel add [channelId] [appId]
```

Replace `[channelId]` with the name of the new channel and `[appId]` with your app ID.

To delete a channel, use the command:

```bash
npx @capgo/cli channel delete [channelId] [appId]
```

Replace `[channelId]` with the name of the channel to delete and `[appId]` with your app ID.

### Step 7: End-to-End Encryption

@capgo/cli supports end-to-end encryption for your code. You can generate an RSA key pair using the following command:

```bash
npx @capgo/cli key create
```

You can save the private key in your app config by running:

```bash
npx @capgo/cli key save
```

To encrypt a zip file with your key, use the command:

```bash
npx @capgo/cli encrypt [path/to/zip]
```

To decrypt a zip file with your key, use the command:

```bash
npx @capgo/cli encrypt [path/to/zip] [ivSessionKey]
```

Replace `[path/to/zip]` and `[ivSessionKey]` with the appropriate values.

### Conclusion

In this tutorial, we have learned how to use @capgo/cli for uploading and downloading files to and from the Capgo Cloud. @capgo/cli provides a convenient command-line interface for managing your app versions and channels. For more information, refer to the official [documentation](https://capgo.app/docs/).