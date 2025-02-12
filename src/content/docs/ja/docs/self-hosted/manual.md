---
title: マニュアル
description: Capgo アップデーターをマニュアルモードで使用する方法
sidebar:
  order: 3
locale: ja
---

## 始める前に

:::tip
このツールを無料で使用する場合は、[GitHub sponsor](https://githubcom/sponsors/riderx/)で私の作業をサポートする時間を取ってください。

私はここで構築したすべてのコードをオープンソース化することを決意しました。

高額な価格を設定して、自分だけのものにしておくこともできました。

代わりに、オープンで透明性のあるビジネスにしたいと考えています。

戦いや隠蔽ではなく、開放することで、より良い世界を作ることができると考えています。

これを実現するためには、あなたを含む私たち全員が自分の役割を果たす必要があります🥹

Capgo cloudのサービスが適していない場合は、あなたの条件で独立した開発者を[ここ](https://githubcom/sponsors/riderx/)でサポートしてください。
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

その後、手動ダウンロードを使用するために、アプリに以下のコードを追加してください：

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
       // ユーザーがアプリを離れたときに切り替えを実行します
       SplashScreenshow()
       try {
         await CapacitorUpdaterset(data)
       } catch (err) {
         consolelog(err)
         SplashScreenhide() // セットに失敗した場合、そうでなければ新しいアプリが非表示にする必要があります
       }
     }
 })
```

⚠️ 破損した更新を送信した場合、アプリは最後に動作していたバージョン、または動作するものがない場合はネイティブビルドに含まれているバージョンに戻ります。

## デモアプリ

詳細についてはデモアプリをチェックしてください

[GitHub - Cap-go/demo-app: デモアプリ（手動およびオートモード）](https://githubcom/Cap-go/demo-app/)

## パッケージ

リリース/アップデートサーバーURLからダウンロードするファイルの名前は何でも構いませんが、zipファイルにはプロダクションCapacitorビルド出力フォルダの完全な内容が含まれている必要があります。通常は`{project directory}/dist/`または`{project directory}/www/`です。

これは`indexhtml`が配置される場所で、アプリの実行に必要なすべてのバンドルされたJavaScript、CSS、およびWebリソースも含まれている必要があります。

このファイルにパスワード暗号化を施さないでください。解凍に失敗します。