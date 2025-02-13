---
title: V3 から V4 へ
description: V3からV4へのアップグレード方法
sidebar:
  order: 3
locale: ja
---

## アップグレードの理由

Discordコミュニティでの多くの対話を通じて、手動モードが非常に手動的すぎて安全でないことが分かりました。例えば、自動リバートが不可能で、手動更新に失敗した場合、ユーザーはアプリを削除して再インストールする必要があり、これは terrible UXでした。

その間、これを機会としてより多くの自由度を提供し、私が作成した悪いコードをすべて削除することにしました。

## インストール

`npm i @capgo/capacitor-updater@4`

## クラウド自動更新

アプリで基本的な例を使用している場合は、新しいバージョンに安全に移行できます。お楽しみください！

## セルフホスト自動更新

こちらも簡単です。変更点は以下の通りです：

* 設定名が`autoUpdateUrl`から`updateUrl`に変更
* エンドポイントメソッドが`GET`から`POST`に変更

## 手動ユーザー

これが最も大きな変更ですが、良い方向への変更です！多くの改善が加えられました。注意深くお読みください。

## 変更点

* `autoUpdateUrl`が`updateUrl`になりました。この設定は手動モードでも使用できるようになったためです
* `cancelDelay`と`delayUpdate`を削除し、`setDelay`に統合
* セットに`versionName`が不要に
* ほとんどの関数で返される`version`キーが`BundleInfo`オブジェクトに変更

```typescript
interface BundleInfo {
  id: string;
  version: string;
  downloaded: string;
  status: 'success' | 'error' | 'pending' | 'downloading'
}
```

* 紛らわしい名前の変更（説明は難しいかもしれませんが、使用時には新しい名前が理解しやすいはずです）：
  * `version`と呼ばれていたものは現在`bundle`を指します
  * `id`は10文字のランダムな文字列だった古い`version`を指し、このidはバンドルにアクセスする唯一の信頼できるユニークな方法です。例：`7Dfcd2RedN`
  * `version`は現在、バンドルに選択した`versionName`を指します。例：`100`
* `updateUrl`が`get`から`post`に変更。カスタムヘッダーが一部のユーザーで問題となっていたため、またpostの方が論理的なため。以前のヘッダーはすべてボディに移動し、`cap_`プレフィックスは削除
* `versionName`メソッドが削除され、`getId`に統合
* listが`BundleInfo`のリストを返すように
* `getId`を`getDeviceId`に改名
* `autoUpdate`がデフォルトでtrueに。手動モードを使用する場合は、falseに設定

## 新機能

* メソッド`getLatest`：`updateUrl`で設定したサーバーから利用可能な最新バージョンを取得可能
* メソッド`setDelay`：`{kind: "background" | "kill" | "nativeVersion" | "date", value?: string}`を引数として受け取り、異なるモードの遅延を設定
* メソッド`next`：次のバックグラウンド化時にバージョンを設定。即時実行する`set`の反対
* メソッド`isAutoUpdateEnabled`：自動更新コンテキストにいるかどうかを確認
* イベント`downloadComplete`：ダウンロードが100%に達した時
* ダウンロードメソッドで`version`フィールドが必須に
* `notifyAppReady`が手動モードでも必須に。10秒以内に呼び出されないと以前のバージョンに戻ります

## 貢献者

[@lincolnthree](https://github.com/lincolnthree/) この作業を始めていただき、ありがとうございます。このアップデートはあなたなしでは実現不可能でした。
