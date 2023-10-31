---
title: "CLI"
sidebar:
  order: 1
---

### Usage

All command should be run in your app folder with capacitor project ignited. See below.

[Capacitor: Cross-platform native runtime for web apps](https://capacitorjs.com/docs/getting-started)

### **Init**

`npx @capgo/cli init [apikey]`

This method is here to onboard you step by step.

It will add your app to Capgo. It will add the code to your app to validate the update. Likewise, it will build your app. Furthermore, it will upload your app to Capgo. And it will help you to check if the update works.

### **Login**

`npx @capgo/cli login [apikey]`

This method is here to remember the `apikey` for you.

:::note
use `--apikey=********` in any command to override it
:::

**Optionaly you can give:**

`--local` This will store your **apikey** in the local repo and git ignore it.

## **Doctor**

`npx @capgo/cli doctor`

Command to check if you are up-to-date with Capgo packages.

This command will also be useful for bug report.

## App

### **Add**

`npx @capgo/cli app add [appId]`

`[appId]` your app ID the format `com.test.app` is explained [here](https://capacitorjs.com/docs/cli/commands/init).

> 💡 All option will be guessed in your config if not provided.

Optionally, you can give:

* `--icon [/path/to/my/icon]` to have a custom icon display in Capgo web app.
* `--name [test]` to have a custom name in the list.
* `--apikey [key]` API key to link to your account.

Example of `capacitor.config.json` for appId and AppName, the icon is guess in the resources folder

```json
{
  "appId": "ee.forgr.capacitor_go",
  "appName": "Capgo",
  "webDir": "dist"
}
```

### **Set**

`npx @capgo/cli app set [appId]`

`[appId]` is your app ID, the format is explained [here](https://capacitorjs.com/docs/cli/commands/init).

Optionally, you can give:

* `--icon [/path/to/my/icon]` to have a custom icon display in Capgo web app.
* `--name [test]` to have a custom name in the list.
* `--retention [retention]` retention period of app bundle in days, 0 by default = infinite.
* `--apikey [key]` API key to link to your account.

### **List**

`npx @capgo/cli app list [appId]`

`[appId]` your app ID the format `com.test.app` is explained [here](https://capacitorjs.com/docs/cli/commands/init).

Optionally, you can give:

* `--apikey [key]` API key to link to your account.

### **Delete**

`npx @capgo/cli app delete [appId]`

`[appId]` your app ID the format `com.test.app` is explained [here](https://capacitorjs.com/docs/cli/commands/init).

Optionally, you can give:

* `--apikey [key]` API key to link to your account.
* `--bundle` with the version number will only delete this version.

### Debug

`npx @capgo/cli app debug [appId]`

`[appId]` your app ID the format `com.test.app` is explained [here](https://capacitorjs.com/docs/cli/commands/init).

Optionally, you can give:

* `--apikey [key]` API key to link to your account.
* `--device` with the specific device you want to debug

## Bundle

### Upload

`npx @capgo/cli bundle upload [appId]`

`[appId]` is your app ID, the format is explained [here](https://capacitorjs.com/docs/cli/commands/init).

Optionally, you can give:

* `--apikey [key]` API key to link to your account.
* `--path [/path/to/my/bundle]` to upload a specific folder.
* `--channel [test]` to upload to a specific channel.
* `--external="https://mydomain.com/myapp.zip"` to link to an external URL instead of upload to Capgo cloud, it should be a zip URL in HTTPS.
* `--key [/path/to/my/private_key]` the path of your private key.
* `--key-data [privateKey]` the private key data, if you want to use inline.
* `--no-key` to ignore the signing key and send clear update.
* `--bundle [1.0.0]` to set the bundle version number of the file to upload.
* `--iv-session-key [key]` to send a custom session key to the cloud.
* `--bundle-url` prints bundle url into stdout. Useful when [parsing bundle url from shell](https://github.com/Cap-go/CLI/pull/132).
* `--no-code-check` to ignore the code check and send the bundle anyway.

> ⭐️ External option helps to unlock 2 cases: corporate with privacy concern, don't send the code to a third part and app bigger than 200 MB. With this setting, Capgo store only the link to the zip and sends the link to all apps.

> 👀 Capgo cloud never looks at what is in the link (for external option), or in the code when stored.

> 🔑 You can add a second layer of security by using encryption, then Capgo will not be able to look or modify anything, it becomes “trustless”.

Example of `package.json` for version

```json
{
  "version": "1.0.2"
}
```

> ⛔ Version should be greater than “0.0.0”.

> 💡 Don't forget to update the version number each time you send one, or the device will don't see the update.

### **List**

`npx @capgo/cli bundle list [appId]`

`[appId]` your app ID the format `com.test.app` is explained [here](https://capacitorjs.com/docs/cli/commands/init).

Optionally, you can give:

* `--apikey [key]` API key to link to your account.

### **Delete**

`npx @capgo/cli bundle delete [appId]`

`[appId]` your app ID the format `com.test.app` is explained [here](https://capacitorjs.com/docs/cli/commands/init).

Optionally, you can give:

* `--apikey [key]` API key to link to your account.
* `--bundle` with the version number will only delete this version.

### Cleanup

in a SemVer range for a major version to Cloud

`npx @capgo/cli bundle cleanup [appId] --bundle=[majorVersion] --keep=[numberToKeep]`

`[appId]` your app ID the format `com.test.app` is explained [here](https://capacitorjs.com/docs/cli/commands/init).

Optionally, you can give:

* `--apikey [key]` API key to link to your account.
* `--bundle [majorVersion]` a version you wish to remove previous packages for, it will keep the last one + `numberToKeep`.
* `--keep [numberToKeep]` the number of packages you wish to keep (default 4).

For example: If you have 10 versions from 10.0.1 to 10.0.11, and you use `npx @capgo/cli cleanup [appId] --bundle=10.0.0` it will remove 10.0.1 to 10.0.6. 10.0.7 until 10.0.11 will be kept.

If you have 20 versions in total, and you don't provide a bundle number like this: `npx @capgo/cli cleanup [appId] --keep=2` It will remove 18 versions, and keep the last 2.

> This command will ask for confirmation, it shows a table of what it will be keeping and removing.

:::note
This command will ignore bundles which are currently in use in any channel.
:::

### **Encrypt**

`npx @capgo/cli bundle encrypt [path/to/zip]`

This command is used when you use external source to store your code or for test purpose. 

Optionally, you can give:

`--key [/path/to/my/private_key]` the path of your private key.
`--key-data [privateKey]` the private key data, if you want to use inline. 
The command will print your `ivSessionKey`y and generate an encrypted zip, to use it with the upload command or decryt command.

### **Decrypt**

`npx @capgo/cli bundle decrypt [path/to/zip] [ivSessionKey]`

Optionally, you can give:

`--key [/path/to/my/private_key]` the path of your private key.

`--key-data [privateKey]` the private key data, if you want to use inline. This command is mainly used for test purpose, it will decrypt the zip and print the base64 decrypted session key in the console.

### **Zip**

`npx @capgo/cli bundle zip [appId]`

`[appId]` is your app ID, the format is explained [here](https://capacitorjs.com/docs/cli/commands/init).

Optionally, you can give:

* `--path [/path/to/my/bundle]` to upload a specific folder.
* `--bundle [1.0.0]` to set the bundle version number of the filename.
* `--name [myapp]` to override the filename.
* `--json` to output info as json.
  
## Channel

### **Add**

`npx @capgo/cli channel add [channelId] [appId]`

`[channelId]` the name of your new channel. `[appId]` your app ID the format `com.test.app` is explained [here](https://capacitorjs.com/docs/cli/commands/init).

### **Delete**

`npx @capgo/cli channel delete [channelId] [appId]`

`[channelId]` the name of your channel you want to delete. `[appId]` your app ID the format `com.test.app` is explained [here](https://capacitorjs.com/docs/cli/commands/init).

### **List**

`npx @capgo/cli channel list [appId]`

`[appId]` your app ID the format `com.test.app` is explained [here](https://capacitorjs.com/docs/cli/commands/init).

Optionally, you can give:

* `--apikey [key]` API key to link to your account.

### **Set**

`npx @capgo/cli channel set [channelId] [appId]`

`[appId]` is your app ID, the format is explained [here](https://capacitorjs.com/docs/cli/commands/init).

Optionally, you can give:

* `--bundle [1.2.3]` your app bundle already sent to the cloud, to link it to a channel.
* `--latest` get the bundle version from `package.json:version`, cannot be used with `--bundle`.
* `--downgrade` allows the channel to send downgrade version to devices.
* `--no-downgrade` disallows the channel to send downgrade version to devices.
* `--upgrade` allows the channel to send upgrade (major) version to devices.
* `--no-upgrade` disallow the channel to send upgrade (major) version to devices.
* `--ios` allows the channel to send version to iOS devices.
* `--no-ios` disallows the channel to send version to iOS devices.
* `--android` allows the channel to send version to android devices.
* `--no-android` disallows the channel to send version to android devices.
* `--self-assign` allows devices to self assign to this channel.
* `--no-self-assign` disallows devices to self assign to this channel.
* `--disable-auto-update STRATEGY`  Disable auto update strategy for this channel.The possible options are: major, minor, metadata, none.
* `--apikey [key]` API key to link to your account.

## Disable updates strategy

There are a few ways to handle disabling updates for too old versions.\
Capgo cannot update native code thus an update from a version with the old native code to a version with the updated native code should not be possible.
There are a couple of ways to achieve that.

First, the `major` strategy. It prevents an update from `0.0.0` -> `1.0.0`. The major is the highlighted number (**1**.0.0 and **0**.0.0).\
Second is the `minor` strategy. It prevents an update from `0.0.0` -> `1.1.0` or an update from `1.1.0` to `1.2.0`. 
**BE AWARE** this strategy does not prevent an update from `0.1.0` -> `1.1.0`

Lastly the most complicated strategy. The `metadata` strategy.\
First you need to know that initially after you enable it the updates **WILL** fail as the channel is lacking the required metadata.\
If the channel is lacking metadata you will see a message like this:
<figure><img src="/fail-metadata.png" alt=""></figure>

If you see something like this you know that you have to go to the current bundle for the failing channel and set the metadata.\
First, figure out what channel is failing. You can do that by looking at the `misconfigured` column
<figure><img src="/misconfigured-table.png" alt=""></figure>

Then go to the failing channel and click on `Bundle number`. This should take you to the bundle page.
<figure><img src="/fail-channel-show.png" alt=""></figure>

Once there fill the `Minimal update version` field. This should be a [semver](https://devhints.io/semver).\
If the value you pass is not a semver you will get an error, but if everything goes correctly you should see something like this:
<figure><img src="/set-min-update-version.png" alt=""></figure>

Now, you likely do not want to set this data manually every time you update. Fortunately, the CLI will prevent you from sending an update without this metadata
<figure><img src="/cli-fail-no-metadata.png" alt=""></figure>

To properly upload a bundle when using the `metadata` option you need to pass the `--min-update-version` with the valid semver. Something like this:
<figure><img src="/cli-upload-with-metadata.png" alt=""></figure>

The `--min-update-version` is not the ONLY way to do compatibility.
There also exists the `--auto-min-update-version`. Here is how it works.

First, it takes a look at the version curently uploaded to the channel. It checks compatibility same as `bundle compatibility` command would.
Second, if the new version is 100% compatible it reuses the `min_update_version` from the latest version in the channel.
If not, then it sets the `min_update_version` to the bundle number of the newly uploaded version.

You will always get an information what is the `min_update_version` when using this option. It will look something like this:
<figure><img src="/min_update_version_info.png" alt=""></figure>

If the new version is not compatible it should look something like this
<figure><img src="/min_update_version_not_compatible.png" alt=""></figure>

## End-to-End encryption (Trustless)

Capgo supports end-to-end encryption, this means that your bundle(code) is encrypted before sent to the cloud and decrypted on the device. For that, you need to generate an RSA key pair, you can use the following command to generate it.

The encryption system is a combination of RSA and AES, the RSA key is used to encrypt the AES key, and the AES key is used to encrypt the file.

See below for more information about the encryption system.

<figure><img src="/crypto_explained.png" alt=""><figcaption><p>Ecryption schema</p></figcaption></figure>

### Create key for your app

`npx @capgo/cli key create`

Optionally, you can give: `--force` to overwrite the existing key. This command will create for you a key pair in your app, and will ask you to save the private key in a safe place. It's recommended to not git commit the private and public key, and to not share it with anyone.

> After your local test, remove the key from the config file and add it on the CI step with `key save`

### Save key in your app config

`npx @capgo/cli key save`

Optionally, you can give:

`--key [/path/to/my/private_key]` the path of your private key.

`--key-data [privateKey]` the private key data, if you want to use inline. This command is useful if you followed the recommendation and didn't commit the key in your app, and in the config.

## Ci integration

To automate your work, I recommend you make GitHub action do the job of pushing to our server

[GitHub action tutorial](https://capgo.app/blog/automatic-build-and-release-with-github-actions)

## Our demo app

[GitHub - Cap-go/demo-app](https://github.com/Cap-go/demo-app)

Don’t forget to configure CI env variable with your API key
