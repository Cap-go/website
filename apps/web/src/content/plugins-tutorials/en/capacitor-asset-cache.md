---
locale: en
---
# Using @capgo/capacitor-asset-cache

`@capgo/capacitor-asset-cache` stores large CDN images and videos in app-owned persistent storage, then returns local source URLs for Capacitor webviews.

## Install

```bash
npm install @capgo/capacitor-asset-cache
npx cap sync
```

## What This Plugin Exposes

- `bind` - Attach an image or video element to a local asset source and update it when ready.
- `src` - Return a local source string after the asset exists locally.
- `resolve` - Return the local source plus cache metadata.
- `configure` - Set default CDN and revalidation behavior.
- `get`, `list`, `remove`, `clear`, and `getCacheSize` - Manage the cache explicitly when needed.

## Example Usage

Configure a CDN once, then bind elements by relative path:

```typescript
import { AssetCache } from '@capgo/capacitor-asset-cache';

AssetCache.configure({
  cdnUrl: 'https://cdn.example.com/assets/',
  revalidate: {
    strategy: 'ttl',
    maxAgeSeconds: 86400,
  },
});

const hero = document.querySelector<HTMLImageElement>('#hero');

if (hero) {
  AssetCache.bind(hero, 'images/hero.jpg');
}
```

The element gets `data-asset-cache-state="loading"` while the native fetch runs, then receives the local source URL and moves to `ready`.

```css
img[data-asset-cache-state='loading'],
video[data-asset-cache-state='loading'] {
  opacity: 0.45;
}
```

## Protected Assets

Headers are sent by the plugin while it fetches or revalidates the remote file. The web element still receives only the local source URL.

```typescript
const src = await AssetCache.src('private/videos/intro.mp4', {
  cdnUrl: 'https://cdn.example.com/assets/',
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```

## Without A CDN Base URL

Pass an absolute URL when you do not want to configure `cdnUrl`.

```typescript
const src = await AssetCache.src('https://cdn.example.com/assets/videos/intro.mp4');
```

Relative paths require either a configured `cdnUrl` or a per-call `cdnUrl`.

## Storage Notes

On iOS, files live under Application Support and are excluded from iCloud backup. On Android, files live under the app internal files directory. The system does not treat these files as disposable cache files, but uninstall, app data clear, `clear()`, and `remove()` still delete them.

## Full Reference

- GitHub: https://github.com/Cap-go/capacitor-asset-cache/
- Docs: /docs/plugins/asset-cache/

## Keep going from Using @capgo/capacitor-asset-cache

If you are using **Using @capgo/capacitor-asset-cache** to plan persistent media loading, connect it with [@capgo/capacitor-asset-cache](/docs/plugins/asset-cache/) for implementation details, [Getting Started](/docs/plugins/asset-cache/getting-started/) for implementation details, [@capgo/capacitor-downloader](/docs/plugins/downloader/) for explicit background downloads, and [@capgo/capacitor-file](/docs/plugins/file/) for general local file access.
