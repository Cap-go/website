---
title: 自動更新
description: capacitor-updaterを使用した自動更新の方法
sidebar:
  order: 2
locale: ja
---

このモードにより、開発者はcapacitor-updaterを自動更新モードで使用し、Capgoチャンネルまたは同等のものを通じて更新をプッシュすることができます。

### 前提条件

Capgo自動更新を使用する前に、アプリのバージョンが[https://semverorg/](https://semverorg/)を使用していることを確認してください。

これはCapgoでバージョンを管理するための規則です。

アプリでバージョンを設定するには2つの方法があります：

新しい方法：`capacitorconfigjson`ファイルの`version`フィールドを使用

```json
{
  "plugins": {
    "CapacitorUpdater": {
      "autoUpdate": true, // 自動更新を有効化、デフォルトはtrue
      "appId": "comexampleapp", // サーバーでアプリを識別するために使用
      "version": "100" // アップデートをチェックするために使用
    }
  }
}
```

これらのオプションは、プラグインがアップデートをチェックする際とCLIがバージョンをアップロードする際に使用されます。

古い方法：
プロジェクト内の3つのファイルで：

* `packagejson`の**version**
* `android/app/buildgradle`の**versionName**
* `ios/App/Appxcodeproj/projectpbxproj`の**CURRENT\_PROJECT\_VERSION**

### チュートリアル

5分でアプリをセットアップ

[capacitor updaterを使用してcapacitorアプリをシームレスに更新する](https://capgo.app/blog/update-your-capacitor-apps-seamlessly-using-capacitor-updater)

5分でCIをセットアップ

[GitHub actionsによる自動ビルドとリリース](https://capgo.app/blog/automatic-build-and-release-with-github-actions)

### インストール

```bash
npm install @capgo/capacitor-updater
npx cap sync
```

### はじめに

[登録](https://capgo.app)をクリックしてアカウントを作成してください。

サーバーではチャンネルやバージョンなど、さらに多くの機能を管理できます。

`autoUpdate`は`capacitorconfig`のデータを使用してCapgoサーバーを識別します。

:::note
会社の規定でコードをサーバーに送信できない場合でも、Capgo Cloudを使用することは可能です。
:::

#### バージョンの検証

自動更新を設定した場合、アプリが動作中で準備ができていることをJS内から通知する必要があります。

これは、アプリ内で`notifyAppReady`を呼び出すことで実行できます。

できるだけ早く実行してください。

```ts
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()
```

#### ユーザーフロー
* ユーザーがアプリを開くと、アプリはサーバーにアップデートの確認を行い、見つかった場合はバックグラウンドでダウンロードされます
* ユーザーがアプリを終了すると、新しいバージョンがアクティブに設定されます
* ユーザーが再度アプリを開くと、新しいアクティブバージョンを読み込み、デフォルトとして設定します
* `notifyAppReady()`が呼び出された場合、ユーザーがアプリを終了すると、過去のバージョンは削除されます
* ユーザーは次の更新サイクルまで通常のアプリフローを続けます

:::danger
⚠️ アプリで`notifyAppReady()`を呼び出さないと、現在のバージョンが無効としてマークされ、前回の有効なバンドルまたはストックに戻ります
:::

#### 開発フロー

新機能を開発する際は、capgoが最新の更新バンドルで作業を上書きし続けるため、`autoUpdate`をブロックしてください。
設定で`autoUpdate`をfalseに設定してください。
何らかの理由で更新に行き詰まった場合は、アプリを削除して再インストールできます。
その前に必ず設定で`autoUpdate`をfalseに設定してください。
そしてXcodeまたはAndroid studioで再度ビルドしてください。

各コミット時にバージョンをアップロードするようにCI/CDを設定するには、このガイドに従ってください。

[GitHub actionsによる自動ビルドとリリース](https://capgo.app/blog/automatic-build-and-release-with-github-actions)

#### メジャーアップデート利用可能イベント

`disableAutoUpdateBreaking`がtrueに設定されている場合、アプリがメジャーな破壊的更新を拒否したときにイベントをリッスンできます。

```jsx
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdateraddListener('majorAvailable', (info: any) => {
  consolelog('majorAvailable was fired', infoversion)
})
```
