---
title: 매뉴얼
description: Capgo アップデーターをマニュアルモードで使用する方法
sidebar:
  order: 3
locale: ja
---

## 始める前に

:::tip
このツールを無料で使用する場合は、[GitHub sponsor](https://githubcom/sponsors/riderx/)で私の仕事をサポートする時間を取ってください。

私はここで構築したすべてのコードをオープンソース化することを決めました。

高額な価格で自分のものにしておくこともできました。

その代わりに、オープンで透明性のあるビジネスにしたいと考えています。

戦い隠すのではなく、開放することで世界をよりよい場所にできると考えています。

これを実現するには、あなたを含む私たち全員が各自の役割を果たす必要があります🥹

Capgo cloudのサービスが合わない場合は、bootstrappedメーカーを[ここ](https://githubcom/sponsors/riderx/)であなたの条件でサポートしてください。
:::

## クイックインストール

```
npm install @capgo/capacitor-updater
npx cap sync
```

#### 設定

自動更新を無効にするには、設定に以下を追加してください：

```tsx
// capacitorconfigjson
{
	"appId": "*******",
	"appName": "Name",
	"plugins": {
		"CapacitorUpdater": {
			"autoUpdate": false
		}
	}
}
```

手動ダウンロードを使用するには、アプリに以下のコードを追加してください：

```typescript
import { CapacitorUpdater } from '@capgo/capacitor-updater'
import { SplashScreen } from '@capacitor/splash-screen'
import { App } from '@capacitor/app'
let data = {version: ""}
CapacitorUpdaternotifyAppReady()
AppaddListener('appStateChange', async(state) => {
     if (stateisActive) {
       // ダウンロードの失敗を防ぐため、アプリがアクティブな時間中にダウンロードを実行します
       data = await CapacitorUpdaterdownload({
       version: '004',
       url: 'https://githubcom/Cap-go/demo-app/releases/download/004/distzip',
       })
     }
     if (!stateisActive && dataversion !== "") {
       // ユーザーがアプリを離れた時に切り替えを実行します
       SplashScreenshow()
       try {
         await CapacitorUpdaterset(data)
       } catch (err) {
         consolelog(err)
         SplashScreenhide() // セットに失敗した場合、新しいアプリが非表示にする必要があります
       }
     }
 })
```

⚠️ 破損した更新を送信した場合、アプリは最後に動作していたバージョン、または何も動作しない場合はネイティブビルドに含まれているバージョンに戻ります。

## デモアプリ

詳細についてはデモアプリをご確認ください：

[GitHub - Cap-go/demo-app: 手動モードと自動モードのデモアプリ](https://githubcom/Cap-go/demo-app/)

## パッケージ

リリース/アップデートサーバーURLからダウンロードするファイルの名前は何でも構いませんが、ZIPファイルには本番用Capacitorビルド出力フォルダの内容全体（通常は`{プロジェクトディレクトリ}/dist/`または`{プロジェクトディレクトリ}/www/`）が含まれている必要があります。

ここには`indexhtml`があり、アプリの実行に必要なすべてのバンドルされたJavaScript、CSS、およびWebリソースも含まれている必要があります。

このファイルにパスワード暗号化を施さないでください。解凍に失敗します。