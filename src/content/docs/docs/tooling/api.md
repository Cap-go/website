---
title: "API"
description: "Capgo cloud API documentation"
sidebar:
  order: 2
---

## Intro

This is the documentation of the backend API of Capgo cloud

You can access to the API. You need to add in the headers your API key as `authorization`. You get it [there](https://web.capgo.app/dashboard/apikeys/)

## Channels

This endpoint allows you to check and modify all available Channels of your app

### POST

`https://api.capgo.app/channel`

Send this to create or update channel

```typescript
type disable_update = "major" | "minor" | "version_number" | "none"
interface ChannelSet {
  app_id: string
  channel: string
  version?: string
  public?: boolean
  disableAutoUpdateUnderNative?: boolean
  disableAutoUpdate?: disable_update
  ios?: boolean
  android?: boolean
  allow_device_self_set?: boolean
  allow_emulator?: boolean
  allow_dev?: boolean
}
```

receive this:

```json
{ "status": "ok" }
```

### GET

`https://api.capgo.app/channel`

Send `app_id` as URL parameter and receive array of 50 first channels.\
You can get the next one by sending `page=1`

```typescript
interface Channel {
    id: number;
    created_at: string;
    name: string;
    app_id: string;
    version: {
        id: number,
        name: string
    };
    created_by: string;
    updated_at: string;
    public: boolean; // default or not
    disableAutoUpdateUnderNative: boolean;
    disableAutoUpdate: boolean;
    allow_emulator: boolean;
    allow_dev: boolean;
}[]
```

and optionally `channel` name as URL parameter to receive one:

```typescript
interface Channel {
    id: number;
    created_at: string;
    name: string;
    app_id: string;
    version: {
        id: number,
        name: string
    };
    created_by: string;
    updated_at: string;
    public: boolean; // default or not
    disableAutoUpdateUnderNative: boolean;
    disableAutoUpdate: boolean;
    allow_emulator: boolean;
    allow_dev: boolean;
}
```

### DELETE

`https://api.capgo.app/channel`

Send this

```typescript
interface Channel {
  channel: string
}
```

receive this:

```json
{ "status": "ok" }
```

## Devices

This endpoint allows you to check and modify all devices link to your app

### POST&#x20;

`https://api.capgo.app/device`

Send this

```typescript
interface DeviceLink {
  app_id: string
  device_id: string
  version_id?: string // version name ( will be migrate to better name)
  channel?: string // channel name
}
```

receive this:

```json
{ "status": "ok" }
```

### GET

`https://api.capgo.app/device`

Send `app_id` as URL parameter and receive array of 50 first devices.\
You can get the next one by sending `page=1`

```typescript
interface Device{
    created_at?: string | undefined;
    updated_at?: string | undefined;
    device_id: string;
    custom_id: string;
    version: {
        id: number,
        name: string
    };
    app_id: string;
    platform?: "ios" | "android" | undefined;
    plugin_version: string;
    os_version?: string | undefined;
    version_build: string;
    is_prod: boolean;
    is_emulator: boolean;
}[]       
```

and optionally `device_id` name as URL parameter to receive one:

```typescript
interface Device {
    created_at?: string | undefined;
    updated_at?: string | undefined;
    device_id: string;
    version: {
        id: number,
        name: string
    };
    app_id: string;
    platform?: "ios" | "android" | undefined;
    plugin_version: string;
    os_version?: string | undefined;
}
```

### DELETE

This endpoint is for unlink channel and version override. You can't delete a device from Capgo

`https://api.capgo.app/device`

Send this

```typescript
interface Device {
  device_id: string
  app_id: string
}
```

receive this:

```json
{ "status": "ok" }
```

## Bundles&#x20;

This endpoint allows you to check and delete all bundles link to your app.

### GET

`https://api.capgo.app/bundle`

Send `app_id` as URL parameter and receive array of 50 first bundles.\
You can get the next one by sending `page=1`

```typescript
interface Bundle {
  app_id: string
  bucket_id: string | null
  checksum: string | null
  created_at: string | null
  deleted: boolean
  external_url: string | null
  id: number
  minUpdateVersion: string | null
  name: string
  native_packages: Json[] | null
  owner_org: string
  r2_path: string | null
  session_key: string | null
  storage_provider: string
  updated_at: string | null
  user_id: string | null
}[]
```

### DELETE

Delete one bundle in the Cloud

`https://api.capgo.app/bundle`

Send this

```typescript
interface Bundle {
  app_id: string
  version: string
}
```

receive this:

```json
{ "status": "ok" }
```

Alternatively you can send&#x20;

```typescript
interface Bundle {
  app_id: string
}
```

To delete all bundle.
