---
locale: ja
---

`@capgo/logsnag`パッケージの紹介

`@capgo/logsnag`パッケージは、通知の取得とプロジェクトイベントの追跡のための強力なツールです。このチュートリアルでは、パッケージのインストールと使用法について説明します。

## インストール

`@capgo/logsnag`パッケージをインストールするには、ターミナルを開いて以下のコマンドを実行してください。

```sh
npm install --save @capgo/logsnag
```

## 使用方法

### ライブラリのインポート

プロジェクトで`@capgo/logsnag`パッケージを使用するには、インポートする必要があります。JavaScriptファイルの先頭に以下のインポート文を追加してください。

```js
import { LogSnag } from '@capgo/logsnag';
```

### クライアントの初期化

`@capgo/logsnag`の機能を使用する前に、クライアントを初期化する必要があります。以下のコードを使用してクライアントを初期化してください。

```js
const logsnag = new LogSnag({
  token: 'YOUR_API_TOKEN',
  project: 'YOUR_PROJECT_NAME'
});
```
`YOUR_API_TOKEN`を実際のAPIトークンに、`YOUR_PROJECT_NAME`をプロジェクト名に置き換えてください。

### イベントの公開

`@capgo/logsnag`を使用してイベントを公開するには、`logsnag`オブジェクトの`publish`メソッドを使用します。以下は、イベントを公開するためのコードスニペットの例です。

```js
logsnag.publish({
  channel: "waitlist",
  event: "User Joined",
  icon: "🎉",
  tags: {
    name: "john doe",
    email: "john@example.com",
  },
  notify: true
});
```
特定のイベントに応じてプロパティの値をカスタマイズできます。チャネル、イベント名、アイコン、タグ、通知の有無を指定できます。

### インサイトの公開

イベントに加えて、`@capgo/logsnag`を使用してインサイトも公開できます。インサイトは、プロジェクトに関する貴重な情報と統計を提供します。以下は、インサイトを公開するためのコードスニペットの例です。

```js
logsnag.insight({
  title: "User Count",
  value: "100",
  icon: "👨",
});
```
プロパティの値をインサイトに合わせて修正してください。タイトル、値、アイコンを指定できます。

これで終了です！これで、プロジェクトに`@capgo/logsnag`パッケージをインストールして使用する方法を学びました。プロジェクトイベントの追跡と通知の受信を簡単に楽しんでください！