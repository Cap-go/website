---
title: Nuxt 2
description: Nuxt 2 にプラグインをインストールする方法
sidebar:
  order: 1
locale: ja
---

# Nuxt 2 へのインストール

プラグインファイル `capacitor-updaterjs` を `plugins` ディレクトリに作成します

```js

import { CapacitorUpdater } from '@capgo/capacitor-updater'

export default ({ app }) => {
  if (processclient) {
    windowonNuxtReady(() => {
      CapacitorUpdaternotifyAppReady()
    })
  }
}
```

これにより、クライアントサイドでプラグインが読み込まれ、アプリがアップデートを受信する準備ができたことを通知します