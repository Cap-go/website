---
slug: "Auto-update-on-premise"
title: "Auto-update on-premise"
description: "Documentation for Capacitor Updater"

---
This documentation will explain how to run your own auto-update server.

# Before starting

If you use this work on your own, I couldn't suggest you more to support my work thought [this](https://github.com/sponsors/riderx).

I made a big bet to open source all the precious code I built here.

I could have kept it for myself and put a high ticket price.

I want to focus on Capgo tooling, and make it an open and transparent business.

I do think it would make our world a better place by opening instead of fighting and hiding.

But to make it possible, it is necessary for all of us to do our part, including you 🥹.

Capgo offer can't suit you, then put your own price and back a bootstrapped Maker 
[HERE](https://github.com/sponsors/riderx) on your own terms.

# Configuration

You have to configure the plugin to use your own URL like that:
```json
{
  "plugins": {
    "CapacitorUpdater": {
      "autoUpdate": true,
      "autoUpdateUrl": "https://YOURURL",
      "statsUrl": "https://YOURURLFORSTATS"
    }
  }
}
```

# Server API

The plugin will call the API each time the app is open your URL with these headers:
```json
{
            "cap_platform": "ios" | "android",
            "cap_device_id": "UNIQUE_DEVICE_ID",
            "cap_app_id": "APPID_FROM_CAPACITOR_CONFIG",
            "cap_version_build": "VERSION_NUMBER_FROM_STORE",
            "cap_plugin_version":"PLUGIN_VERSION,
            "cap_version_name": "LAST_DOWNLOADER_VERSION" || "builtin"
}
```
The server API should respond, in JSON, to the capacitor-updater plugin.
with this data if update is necessary:
```json
{
  "version": "1.2.3",
  "url": "https://path_to_the_zip_file_of_the_code.com"
}
```

In Auto-update the server should do the work of compares the version and return the right one, if returned the plugin, start the download process.

If you add "message" key, the version will not be set and the message will be display in logs instead.

The zip should have `index.html` file at the root, or only one folder at the root with `index.html` inside