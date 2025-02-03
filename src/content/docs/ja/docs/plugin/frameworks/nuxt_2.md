---
title: Nuxt 2
description: Nuxt 2でプラグインをインストールする方法
sidebar:
  order: 1
locale: ja
---

# Nuxt 2 でのインストール

`plugins`ディレクトリに`capacitor-updaterjs`プラグインファイルを作成します

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

これによりクライアントサイドでプラグインが読み込まれ、アプリがアップデートを受信する準備ができたことを通知します