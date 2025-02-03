---
title: Hybrid-Aktualisierung
description: 自動アップデートのための更新方法
sidebar:
  order: 3
locale: ja
---

ユーザーにアップデートを配信する際、適用前に必要に応じて以下のような方法でアップデートサイクルに対応できます：

- サイレントアップデート
- ```updateAvailable```イベントのリッスン
- モーダルウィンドウの表示または更新の遅延

## サイレントアップデート

`directUpdate`を`true`に設定することで、アプリ起動時に毎回アップデートサイクルを強制的に実行させることができます。
これにより、ユーザーの操作なしで通常のアップデートサイクルが実行されます。

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

そして、アプリ内で`appReady`イベントを受信した際にスプラッシュスクリーンを非表示にする必要があります：

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'
import { SplashScreen } from '@capacitor/splash-screen'

CapacitorUpdateraddListener('appReady', () => {
  // Hide splash
  SplashScreenhide()
})

CapacitorUpdaternotifyAppReady()
```

## 強制アップデート

`updateAvailable`イベントのリスナーを追加し、アプリがアップデートされることをユーザーに通知するアラートを表示します：

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'
import { Dialog } from '@capacitor/dialog'

CapacitorUpdateraddListener('updateAvailable', async (res) => {
  try {
    await Dialogalert({
      title: 'アップデートが利用可能です',
      message: `バージョン${resbundleversion}が利用可能です。アプリは今すぐ更新されます`,
    })
    CapacitorUpdaterset(resbundle)
  }
  catch (error) {
    consolelog(error)
  }
})

CapacitorUpdaternotifyAppReady()
```

## モーダルアップデート

ダイアログを表示してユーザーに更新の選択をさせることもできます：

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'
import { Dialog } from '@capacitor/dialog'

CapacitorUpdateraddListener('updateAvailable', async (res) => {
  try {
    const { value } = await Dialogconfirm({
      title: 'アップデートが利用可能です',
      message: `バージョン${resbundleversion}が利用可能です。今すぐ更新しますか？`,
    })

    if (value)
      CapacitorUpdaterset(resbundle)

  }
  catch (error) {
    consolelog(error)
  }
})

CapacitorUpdaternotifyAppReady()
```