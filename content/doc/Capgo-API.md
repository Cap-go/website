---
slug: "Capgo-API"
title: "Capgo API"
description: "Documentation for Capgo API"

---
# Intro

This is the documentation of the backend API of Capgo cloud

You can access to the API you need to add in the headers your API key as `authorization`
you get it [there](https://web.capgo.app/app/apikeys)

# Channels

This endpoint allows you to check and modify all available Channels of your app

## POST

`https://api.capgo.app/channel`

Send this

```ts
interface ChannelSet {
  app_id: string;
  channel: string;
  version?: string;
  public?: boolean;
}
```

receive this:

```json
{
  status: "ok";
}
```

## GET

`https://api.capgo.app/channel`

Send `appid` as URL parameter and receive array of channel:

```js
{
  id: number;
  created_at: string;
  name: string;
  app_id: string;
  version: number;
  created_by: string;
  updated_at: string;
  public: boolean;
  disableAutoUpdateUnderNative: boolean;
  disableAutoUpdateToMajor: boolean;
}
[];
```

and optionally `channel` name as URL parameter to receive one:

```js
{
  id: number;
  created_at: string;
  name: string;
  app_id: string;
  version: number;
  created_by: string;
  updated_at: string;
  public: boolean;
  disableAutoUpdateUnderNative: boolean;
  disableAutoUpdateToMajor: boolean;
}
```

## DELETE

`https://api.capgo.app/channel`

Send this

```ts
interface Channel {
  channel: string;
}
```

receive this:

```js
{
  status: "ok";
}
```

# Devices

This endpoint allows you to check and modify all devices link to your app

##POST
`https://api.capgo.app/device`

Send this

```ts
interface DeviceLink {
  app_id: string;
  device_id: string;
  version_id?: string;
  channel_id?: string;
}
```

receive this:

```js
{
  status: "ok";
}
```

## GET

`https://api.capgo.app/device`

Send `appid` as URL parameter and receive array of channel:

```js
{
    created_at?: string | undefined;
    updated_at?: string | undefined;
    device_id: string;
    version: number;
    app_id: string;
    platform?: "ios" | "android" | undefined;
    plugin_version: string;
    os_version?: string | undefined;
}[]
```

and optionally `channel` name as URL parameter to receive one:

```js
{
    created_at?: string | undefined;
    updated_at?: string | undefined;
    device_id: string;
    version: number;
    app_id: string;
    platform?: "ios" | "android" | undefined;
    plugin_version: string;
    os_version?: string | undefined;
}
```

## DELETE

`https://api.capgo.app/device`

Send this

```ts
interface Version {
  device_id: string;
}
```

receive this:

```js
{
  status: "ok";
}
```

# Versions

This endpoint allows you to check and modify all versions link to your app

## GET

`https://api.capgo.app/versions`

Send `app_id` as URL parameter and receive array of channel:

```js
{
  id: number;
  created_at: string;
  name: string;
  app_id: string;
  version: number;
  created_by: string;
  updated_at: string;
  public: boolean;
  disableAutoUpdateUnderNative: boolean;
  disableAutoUpdateToMajor: boolean;
}
[];
```

## DELETE

`https://api.capgo.app/versions`

Send this

```ts
interface Version {
  app_id: string;
}
```

receive this:

```js
{
  status: "ok";
}
```
