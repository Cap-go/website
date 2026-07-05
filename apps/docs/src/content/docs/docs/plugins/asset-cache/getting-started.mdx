---
title: Getting Started
description: Install @capgo/capacitor-asset-cache and display CDN assets through local Capacitor sources.
sidebar:
  order: 2
---

import { Aside } from '@astrojs/starlight/components';

## Install

You can use our AI-Assisted Setup to install the plugin. Add the Capgo skills to your AI tool using the following command:

```bash
npx skills add https://github.com/Cap-go/capgo-skills --skill capacitor-plugins
```

Then use the following prompt:

```text
Use the `capacitor-plugins` skill from `Cap-go/capgo-skills` to install the `@capgo/capacitor-asset-cache` plugin in my project.
```

If you prefer Manual Setup, install the plugin by running:

```bash
npm install @capgo/capacitor-asset-cache
npx cap sync
```

## Import

```typescript
import { AssetCache } from '@capgo/capacitor-asset-cache';
```

## Configure A CDN

Configure a CDN base URL once when your app starts. Relative asset paths will be resolved against this URL.

```typescript
AssetCache.configure({
  cdnUrl: 'https://cdn.example.com/assets/',
  revalidate: {
    strategy: 'ttl',
    maxAgeSeconds: 86400,
  },
});
```

You can skip `cdnUrl` if you pass absolute URLs to `bind`, `src`, or `resolve`.

```typescript
const src = await AssetCache.src('https://cdn.example.com/assets/videos/intro.mp4');
```

## Bind An Image Or Video

`bind` is the most transparent display path. It marks the element as loading, fetches or revalidates the asset natively, then assigns the local source URL when the local file is ready.

```typescript
const image = document.querySelector<HTMLImageElement>('#hero');

if (image) {
  const binding = AssetCache.bind(image, 'images/hero.jpg');
  await binding.promise;
}
```

```html
<img id="hero" alt="Product preview" />
```

```css
img[data-asset-cache-state='loading'],
video[data-asset-cache-state='loading'] {
  opacity: 0.45;
}

img[data-asset-cache-state='ready'],
video[data-asset-cache-state='ready'] {
  opacity: 1;
}
```

<Aside type="note">
  The element never receives the CDN URL in the successful path. It receives the local webview URL after the asset exists in persistent storage.
</Aside>

## React

```tsx
import { useEffect, useRef } from 'react';
import { AssetCache } from '@capgo/capacitor-asset-cache';

AssetCache.configure({ cdnUrl: 'https://cdn.example.com/assets/' });

export function HeroImage() {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!imageRef.current) return;

    const binding = AssetCache.bind(imageRef.current, 'images/hero.jpg');
    return () => binding.cancel();
  }, []);

  return <img ref={imageRef} alt="Product preview" />;
}
```

## Vue

```vue
<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { AssetCache, type AssetCacheBinding } from '@capgo/capacitor-asset-cache';

const image = ref<HTMLImageElement | null>(null);
let binding: AssetCacheBinding | undefined;

onMounted(() => {
  if (image.value) {
    binding = AssetCache.bind(image.value, 'images/hero.jpg', {
      cdnUrl: 'https://cdn.example.com/assets/',
    });
  }
});

onUnmounted(() => binding?.cancel());
</script>

<template>
  <img ref="image" alt="Product preview" />
</template>
```

## Direct Source For Framework State

Use `src` when your framework already controls loading and error state. The promise resolves with a local source string only after the local file exists.

```typescript
const src = await AssetCache.src('videos/intro.mp4');

videoElement.src = src;
```

Use `resolve` when you also need metadata:

```typescript
const source = await AssetCache.resolve('images/hero.jpg');

console.log(source.src, source.local, source.fromCache, source.status);
```

## Protected Assets

Pass headers to the native fetch. This is useful for signed CDN paths, authenticated media, or short-lived tokens.

```typescript
const src = await AssetCache.src('private/videos/intro.mp4', {
  cdnUrl: 'https://cdn.example.com/assets/',
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```

Headers are used by the plugin while fetching or revalidating the remote file. The image or video tag still receives only the local source URL returned by the plugin.

## Revalidation

Set a default strategy with `configure` or override it for one asset.

```typescript
await AssetCache.src('videos/intro.mp4', {
  revalidate: {
    strategy: 'etag',
  },
});
```

Available strategies:

| Strategy | Use when |
| --- | --- |
| `never` | A cached local file is enough until you explicitly remove it. |
| `ttl` | You want a simple freshness window. |
| `always` | You want the plugin to check the remote asset every time. |
| `etag` | Your CDN returns stable ETag headers. |
| `last-modified` | Your CDN returns reliable Last-Modified headers. |

## Storage And Privacy

- iOS stores files under Application Support and excludes the cache root from iCloud backup.
- Android stores files under the app internal files directory.
- Web uses the browser Cache API and localStorage metadata as a development fallback.
- Cached files are hidden inside the app sandbox, not saved to public user media.
- Cached files are removed on uninstall, app data clear, or plugin `clear()` or `remove()`.

The cache is persistent, but it is not a security boundary by itself. Encrypt highly sensitive assets before serving them if they must remain unreadable on a compromised device.

## Advanced Cache Control

Most UI code should use `bind`, `src`, or `resolve`. Use these helpers when you need explicit cache management:

| Method | Description |
| --- | --- |
| `get` | Resolve a remote URL into native file metadata. |
| `list` | Return cached assets that still exist on disk. |
| `getCacheSize` | Return total cached bytes. |
| `remove` | Remove one cached asset by key or URL. |
| `clear` | Remove every cached asset managed by the plugin. |

```typescript
const asset = await AssetCache.get({
  url: 'https://cdn.example.com/assets/videos/intro.mp4',
  key: 'videos/intro.mp4',
  revalidate: { strategy: 'last-modified' },
});
```

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-asset-cache/
- Package: `@capgo/capacitor-asset-cache`
