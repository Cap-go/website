---
title: "@capgo/capacitor-asset-cache"
description: Persistent native cache for CDN images and videos with local-only media sources.
tableOfContents: false
next: false
prev: false
sidebar:
  order: 1
  label: "Introduction"
hero:
  tagline: Cache heavy CDN media in app-owned persistent storage and bind images or videos to local webview URLs.
  actions:
    - text: Get started
      link: /docs/plugins/asset-cache/getting-started/
      icon: right-arrow
      variant: primary
    - text: GitHub
      link: https://github.com/Cap-go/capacitor-asset-cache/
      icon: external
      variant: minimal
---

import { Aside, Card, CardGrid } from '@astrojs/starlight/components';

<CardGrid stagger>
  <Card title="Local-only display sources" icon="rocket">
    `src`, `resolve`, and `bind` return a source only after a local file exists. Your img or video tag receives a local webview URL.
  </Card>
  <Card title="Persistent native storage" icon="setting">
    Cached assets live in app-owned persistent storage, not the platform cache folder that the system may evict under pressure.
  </Card>
  <Card title="Protected CDN support" icon="puzzle">
    Pass headers to the native fetch for signed or authenticated assets while the web element still loads only the local file.
  </Card>
  <Card title="Framework-friendly binding" icon="pencil">
    Bind native cache resolution to plain HTML, React refs, Vue refs, or any framework that can assign an img or video src.
  </Card>
</CardGrid>

## Overview

`@capgo/capacitor-asset-cache` caches large images, videos, and other CDN assets in app-owned persistent storage, then gives the web app a local source URL for display.

The normal path is:

1. Configure a CDN base URL once, or pass an absolute URL per asset.
2. Call `AssetCache.bind(element, path)` or `AssetCache.src(path)`.
3. The plugin fetches or revalidates the remote asset natively.
4. The element receives a local webview URL only after the local file is ready.

<Aside type="note">
  Successful display APIs are local-only. If the plugin cannot create or reuse a local file, `src(...)` and `resolve(...)` reject and `bind(...)` marks the element as `error`.
</Aside>

## When To Use It

Use Asset Cache when your app displays heavy remote media that should survive normal storage pressure:

- onboarding or marketing videos served from a CDN
- hero images, galleries, or image sequences reused across sessions
- protected media that requires request headers
- offline-tolerant screens where a previously fetched local asset is enough
- Capacitor apps where `<img>` and `<video>` should not fetch protected URLs directly

## Core API

- `configure(options)` sets default CDN and revalidation behavior.
- `bind(element, path, options?)` updates an image or video element when the local file is ready.
- `src(path, options?)` returns a local source string for framework state.
- `resolve(path, options?)` returns the local source plus cache metadata.
- `get(options)` resolves a remote URL into persistent native file metadata.
- `remove(options)` removes one cached asset by key or URL.
- `clear()` removes every cached asset managed by the plugin.
- `list()` returns cached assets that still exist on disk.
- `getCacheSize()` returns total cached bytes.
- `getPluginVersion()` returns the native implementation version marker.

## Revalidation Model

The cache can be checked in different ways per asset or through defaults:

| Strategy | Behavior |
| --- | --- |
| `never` | Use the local file when present. |
| `ttl` | Re-download after `maxAgeSeconds`. |
| `always` | Revalidate on every call and send known validators. |
| `etag` | Use the known HTTP ETag validator when present. |
| `last-modified` | Use the known HTTP Last-Modified validator when present. |

## Storage Model

On iOS, files are stored under Application Support and the cache root is excluded from iCloud backup. On Android, files are stored under the app internal files directory.

The cache is hidden inside the app sandbox and is not visible as public user media. It is removed when the app is uninstalled, when the user clears app data, or when your app calls `clear()` or `remove()`.

## Keep going from @capgo/capacitor-asset-cache

If you are using **@capgo/capacitor-asset-cache** to plan persistent media loading, connect it with [Getting Started](/docs/plugins/asset-cache/getting-started/) for implementation details, [@capgo/capacitor-downloader](/docs/plugins/downloader/) for explicit background downloads, [@capgo/capacitor-file](/docs/plugins/file/) for general local file access, and [Using @capgo/capacitor-asset-cache](/plugins/capacitor-asset-cache/) for the tutorial.
