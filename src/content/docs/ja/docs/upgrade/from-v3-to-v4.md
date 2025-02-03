---
title: V3에서 V4로
description: V3 から V4 へのアップグレード方法
sidebar:
  order: 3
locale: ja
---

## アップグレードの理由

Discordコミュニティでの多くの対話を通じて、手動モードが非常に手動すぎて安全でないことがわかりました。例えば、自動復帰が不可能で、手動更新に失敗した場合、ユーザーはアプリを削除して再インストールする必要があり、これは terrible UX でした。

その間、これを機会としてより多くの自由度を提供し、私が作った悪いコードをすべて削除することにしました。

## インストール

`npm i @capgo/capacitor-updater@4`

## 自動更新クラウド

アプリで基本的な例を使用している場合は、新しいバージョンに安全に移行できます。お楽しみください！

## 自動更新セルフホスト

変更点は簡単です：

* 設定名が `autoUpdateUrl` から `updateUrl` に変更
* エンドポイントメソッドが `GET` から `POST` に変更

## 手動ユーザー

最も大きな変更ですが、より良い方向へ！多くの改善が加えられました。注意深く読んでください。

## 変更点

* `autoUpdateUrl` が `updateUrl` になりました。この設定は手動モードでも使用可能になったためです
* `cancelDelay` と `delayUpdate` を廃止し、`setDelay` に統合
* set での `versionName` を廃止
* ほとんどの関数で返されていた `version` キーを `BundleInfo` オブジェクトに変更

```typescript
interface BundleInfo {
  id: string;
  version: string;
  downloaded: string;
  status: 'success' | 'error' | 'pending' | 'downloading'
}
```

* 誤解を招く名前の変更（説明は難しいかもしれませんが、使用時には新しい名前が理解しやすいはずです）：
  * `version` と呼ばれていたものは現在 `bundle` と呼ばれます
  * `id` は以前の10文字のランダム文字列だった `version` を指します。この `id` がバンドルにアクセスする唯一の信頼できる一意の方法です。例：`7Dfcd2RedN`
  * `version` は現在バンドルに選択した `versionName` を指します。例：`100`
* `updateUrl` が `get` から `post` に変更。カスタムヘッダーが問題となっていたためで、postの方が論理的です。以前のヘッダーはすべてボディに移動し、`cap_` プレフィックスは削除されました
* `versionName` メソッドを削除し、`getId` に統合
* list が `BundleInfo` のリストを返すように変更
* `getId` を `getDeviceId` に変更
* `autoUpdate` がデフォルトで true になりました。手動モードを使用する場合は false に設定してください

## 新機能

* `getLatest` メソッド。`updateUrl` で設定したサーバーから利用可能な最新バージョンを取得できます
* `setDelay` メソッド。`{kind: "background" | "kill" | "nativeVersion" | "date", value?: string}` を引数に取り、異なるモードの遅延を設定します
* `next` メソッド。次のバックグラウンド時にバージョンを設定します。即時実行する `set` の反対です
* `isAutoUpdateEnabled` メソッド。自動更新コンテキストにいるかどうかを確認できます
* ダウンロードが100%に達したときの `downloadComplete` イベント
* download メソッドで `version` フィールドが必須に
* `notifyAppReady` が手動モードでも必須になりました。10秒以内に呼び出されない場合、アプリは以前のバージョンに戻ります

## 貢献者

[@lincolnthree](https://githubcom/lincolnthree/) この作業を始めていただき、ありがとうございます。このアップデートの実現は、あなたなしには不可能でした。