---
slug: "Capgo-CLI"
title: "Capgo CLI"
description: "Documentation for Capgo CLI"

---
# Usage


All command should be run in your app folder with capacitor project ignited. See below

[Capacitor: Cross-platform native runtime for web apps](https://capacitorjs.com/docs/getting-started)

# **Login to Cloud**

`npx @capgo/cli login [apikey]` 

This method is here to remember the `apikey` for you.
You can also use `--apikey=********` in every command to override it

# **Add app to Cloud**

`npx @capgo/cli add [appId]` 


> 💡 All option will be guessed in your config if not provided

Optionally, you can give:

- `[appId]` your app ID the format `com.test.app` is explained **[here](https://capacitorjs.com/docs/cli/init)**
- icon with `--icon /path/to/my/icon` to have a custom icon in the list
- name with `--name test` to have a custom name in the list

Example of capacitor.config.json for appId and AppName, the icon is guess in the resources folder
```
{
  "appId": 'ee.forgr.capacitor_go',
  "appName": 'Capgo',
  "webDir": 'dist',
}
```

# Upload **version to Cloud**

`npx @capgo/cli upload [appId]` 

Optionally, you can give:

- `[appId]` is your app ID the format is explained **[here](https://capacitorjs.com/docs/cli/init)**
- icon with `--path ./www` to send your code to the cloud
- channel with `--channel prod` to link this version to channel by default, it's `dev`
- version with `--version 1.0.0` to choose the version number, if not provided it use the one in the `package.json`
- external zip link with `--external` to use zipped version from external storage, it should be a zip URL in HTTPS
> ⭐️ External option help to unlock 2 cases: `corporate with privacy concern`, don't send the code to a third part and `app bigger than 30 mbs`. With this setting capgo store only the link to the zip and send the link to all app

> 👀 Capgo cloud never look of what is in the link (for externa option), or in the code when stored. This will be write in the privacy policy, i have to ask a lawyer to make it clear in legal point of view.

Example of package.json for version
```
{
 "version": "1.0.2"
}
```

> ⛔ Version should be greater than “0.0.0”


> 💡 Don't forget to update the version number each time you send one, or device will don't see the update


# **Send version to Cloud channel**

`npx @capgo/cli set [appId]` 

Optionally, you can give:

- `[appId]` your app ID the format is explained **[here](https://capacitorjs.com/docs/cli/init)**
- `--version` your app version already sent to the cloud
- `--channel` the channel you want to link the version, it doesn't exist it will be created
- `--state` set the channel state, can be private or public. To use in your app, channel need to be public.

# **Delete package or version to Cloud**

`npx @capgo/cli delete [appId]` 

Optionally, you can give:

`[appId]` your app ID present in the Cloud

Optionally, you can give:

`--local` This will store your login in the local repo and git ignore it.
`--version` with the version number will only delete this version

# Ci integration

To automate your work, I recommend you make GitHub action do the job of pushing to our server 

[GitHub action tutorial](https://capgo.app/blog/automatic-build-and-release-with-github-actions)

# Our demo app

[GitHub - Cap-go/demo-app](https://github.com/Cap-go/demo-app)

Don’t forget to configure CI env variable with your API key