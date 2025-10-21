---
title: Mise à jour hybride
description: 自動アップデートの更新方法
sidebar:
  order: 3
locale: ja
---

ユーザーへの更新を配信する際、適用前に必要に応じて以下の方法で更新サイクルに対応できます：

- サイレント更新
- ```updateAvailable```イベントのリッスン
- モーダルウィンドウの表示または更新の遅延

## サイレント更新

`directUpdate`を`true`に設定することで、アプリ起動時ごとに強制的に更新サイクルを実行できます。
これにより、ユーザーの操作なしで通常の更新サイクルがトリガーされます

```tsx
// capacitorconfigjson
{
	"appId": "*******",
	"appName": "Name",
	"plugins": {
		"CapacitorUpdater": {
			"directUpdate": true,
		},
    "SplashScreen": {
      "launchAutoHide": false,
    }
	}
}
```

そしてアプリ内では、`appReady`イベントを受信したときにスプラッシュスクリーンを非表示にする必要があります：

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'
import { SplashScreen } from '@capacitor/splash-screen'

CapacitorUpdateraddListener('appReady', () => {
  // Hide splash
  SplashScreenhide()
})

CapacitorUpdater.notifyAppReady()
```

## 強制更新

`updateAvailable`イベントにリスナーを追加し、アプリが更新されることをユーザーに通知するアラートを表示します：

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'
import { Dialog } from '@capacitor/dialog'

CapacitorUpdateraddListener('updateAvailable', async (res) => {
  try {
    await Dialogalert({
      title: '更新が利用可能です',
      message: `バージョン${resbundleversion}が利用可能です。アプリは今更新されます`,
    })
    CapacitorUpdaterset(resbundle)
  }
  catch (error) {
    consolelog(error)
  }
})

CapacitorUpdater.notifyAppReady()
```

## モーダル更新

ダイアログを表示して更新するかどうかをユーザーに決定させることもできます：

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'
import { Dialog } from '@capacitor/dialog'

CapacitorUpdateraddListener('updateAvailable', async (res) => {
  try {
    const { value } = await Dialogconfirm({
      title: '更新が利用可能です',
      message: `バージョン${resbundleversion}が利用可能です。今すぐ更新しますか？`,
    })

    if (value)
      CapacitorUpdaterset(resbundle)

  }
  catch (error) {
    consolelog(error)
  }
})

CapacitorUpdater.notifyAppReady()
```
