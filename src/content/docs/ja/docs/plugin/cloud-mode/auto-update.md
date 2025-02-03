---
title: Mise à jour automatique
description: Capacitor-updaterでの自動アップデートの使用方法
sidebar:
  order: 2
locale: ja
---

このモードでは、開発者は自動更新モードでcapacitor-updaterを使用し、Capgoチャンネルまたはそれに相当するものを通じて更新をプッシュできます。

### 前提条件

Capgo自動更新を使用する前に、アプリのバージョンが[https://semverorg/](https://semverorg/)を使用していることを確認してください。

これはCapgoでバージョンを管理するために使用する規則です。

アプリでバージョンを設定する方法は2つあります：

新しい方法：`capacitorconfigjson`ファイルの`version`フィールドを使用します

```json
{
  "plugins": {
    "CapacitorUpdater": {
      "autoUpdate": true, // 自動更新を有効化、デフォルトはtrue
      "appId": "comexampleapp", // サーバーでアプリを識別するために使用
      "version": "100" // 更新をチェックするために使用
    }
  }
}
```
これらのオプションは、プラグインが更新をチェックし、CLIがバージョンをアップロードする際に使用されます。

古い方法：
プロジェクトの3つのファイルで：

* `packagejson`の**version**
* `android/app/buildgradle`の**versionName**
* `ios/App/Appxcodeproj/projectpbxproj`の**CURRENT\_PROJECT\_VERSION**

### チュートリアル

5分でアプリを設定

[capacitor updaterを使用してCapacitorアプリをシームレスに更新](https://capgoapp/blog/update-your-capacitor-apps-seamlessly-using-capacitor-updater)

5分でCIを設定

[GitHub actionsで自動ビルドとリリース](https://capgoapp/blog/automatic-build-and-release-with-github-actions)

### インストール

```bash
npm install @capgo/capacitor-updater
npx cap sync
```

### はじめに

[register](https://capgoapp)をクリックしてアカウントを作成してください

サーバーではチャンネルやバージョンなどの管理が可能です

`autoUpdate`は`capacitorconfig`のデータを使用してCapgoサーバーを識別します

:::note
会社の規定で許可されていない場合でも、コードを当社のサーバーに送信せずにCapgo Cloudを使用できます
:::

#### バージョンの検証

自動更新を設定する場合、アプリが正常に動作し準備ができていることをJS内から通知する必要があります

これはアプリ内で`notifyAppReady`を呼び出すことで行えます

できるだけ早く実行してください

```ts
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdaternotifyAppReady()
```

#### ユーザーフロー
* ユーザーがアプリを開くと、アプリはサーバーに更新をチェックし、更新が見つかった場合はバックグラウンドでダウンロードされます
* ユーザーがアプリを終了すると、新しいバージョンがアクティブに設定されます
* ユーザーが再度アプリを開くと、新しいアクティブバージョンを読み込み、デフォルトとして設定します
* `notifyAppReady()`が呼び出されると、ユーザーがアプリを終了した時に以前のバージョンは削除されます
* ユーザーは次の更新サイクルまで通常のアプリフローを継続します

:::danger
⚠️ アプリで`notifyAppReady()`を呼び出さないと、現在のバージョンは無効としてマークされ、以前の有効なバンドルまたはストックに戻ります
:::

#### 開発フロー

新機能を開発する際は、capgoが最新の更新バンドルで作業を上書きし続けるため、`autoUpdate`をブロックしてください
設定で`autoUpdate`をfalseに設定してください
何らかの理由で更新で行き詰まった場合は、アプリを削除して再インストールできます
その前に設定で`autoUpdate`をfalseに設定してください
そしてXcodeまたはAndroid studioで再度ビルドしてください

各コミットでバージョンをアップロードするためにCI/CDを設定するには、このガイドを参照してください

[GitHub actionsで自動ビルドとリリース](https://capgoapp/blog/automatic-build-and-release-with-github-actions)

#### メジャー更新可能イベント

`disableAutoUpdateBreaking`がtrueに設定されている場合、アプリがメジャーな破壊的更新を拒否したことを知るためにイベントをリッスンできます

```jsx
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdateraddListener('majorAvailable', (info: any) => {
  consolelog('majorAvailable was fired', infoversion)
})
```