---
slug: come-funziona-la-versione-in-capgo
title: Capgoでのバージョニングの仕組み
description: >-
  Capacitor アプリのバージョン管理方法を Capgo でどのように行うかを理解し、最大限に活用しましょう。major、minor、patch
  の意味を理解しましょう。
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-08-25T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /versionning.webp
head_image_alt: Capgoのバンドルバージョニングシステム
keywords: >-
  mobile app development, live updates, OTA updates, continuous integration,
  mobile app updates
tag: Tutorial
published: true
locale: ja
next_blog: how-to-release-major-version-in-capgo
---
Here's the Japanese translation:

Capgoは、Capacitorアプリでバージョンを管理するために2つの主要な変数を使用します：
  - ネイティブバージョン
  - JavaScriptバージョン

<div class="mx-auto" style="width:100%;">
  <img src="/graph_capgo.webp" alt="Capacitor update system">
</div>

すべてのバージョンの選択はCapgoのサーバーサイドで決定されます。

## バージョニングシステム

バージョン管理のために、CapgoはSemVerシステムを使用します。詳細は[こちら](https://semver.org/)をご覧ください。

### バージョン

Capgoが比較するバージョンの参照元

  > `capacitor.config.json`ファイルのversionキーを設定することで、この動作を上書きできます[設定ドキュメント](/docs/plugin/settings/#version)
  > ネイティブバージョンはすべてのプラットフォームで無視されます。

#### IOS

IOSでは、変数は`ios/App/App/Info.plist`の`CFBundleShortVersionString`キー、または`Info.plist`ファイルで`MARKETING_VERSION`が設定されている場合は`ios/App/App.xcodeproj/project.pbxproj`の`MARKETING_VERSION`キーに設定されます。

#### Android

Androidでは、変数は`android/app/build.gradle`の`defaultConfig.versionName`キーに設定されます。

#### JavaScript（Capgoバンドルバージョン）

JavaScriptでは、変数は`package.json`の`version`キーに設定できます。
それ以外の場合は、アップロードコマンドで提供する必要があります。

## デフォルトの動作

設定を変更していない場合のCapgoチャンネルの動作方法です。

> この動作はデフォルトに設定した単一のチャンネルに基づきます。

### Capacitorアプリの新規インストール時
ユーザーがIonicアプリを初めてダウンロードして開くと、Capgoサーバーに接続します。

現在、4つの結果が発生する可能性があります：
  - ネイティブバンドルバージョン（1.2.3）がCapgoバンドルバージョン（1.2.4）より低い場合、Capgoはバンドルをユーザーに送信します。
  - ネイティブバンドルバージョン（1.2.3）がCapgoバンドルバージョン（1.2.3）と等しい場合、Capgoは「更新不要」を送信します。
  - ネイティブバンドルバージョン（1.2.4）がCapgoバンドルバージョン（1.2.3）より高い場合、Capgoは「更新不要」を送信します。
  - ネイティブバンドルバージョン（1.2.3）がCapgoバンドルバージョン（2.2.3）よりMAJORが低い場合、Capgoは「更新不要」を送信します。

### その他の設定

#### ネイティブ以下への自動ダウングレードを無効化

この設定をfalseに変更すると、Capgoは常にバージョンの信頼できるソースとみなされます。
その場合、動作は以下のようになります：
- ネイティブバージョン（1.2.4）がCapgoバージョン（1.2.3）より高い

> Capgoはそのバージョンをユーザーに送信します。

#### 自動アップグレード戦略の無効化

選択できる戦略がいくつかあります。詳細は[こちら](/docs/cli/commands/#disable-updates-strategy)で確認できます。

## JavaScriptバンドルバージョン

JavaScriptバンドルバージョンは、`npx @capgo/cli@latest bundle upload --channel production`を実行する際に送信するバージョンです。

`--bundle 1.2.3`オプションを使用しない場合、Capgoは`package.json`ファイルのversionキーからバンドルバージョンを取得します。

IonicアプリがCapgoからバージョンをインストールした後、以下の比較に使用されます：
  - JavaScriptバンドルバージョン（1.2.3）がCapgoバンドルバージョン（1.2.4）より低い場合、Capgoはバンドルをユーザーに送信します。

以下のガード条件があります：
  - ネイティブバンドルバージョンがCapgoバージョンより高い場合、`ネイティブ以下への自動ダウングレードを無効化`条件が適用されます。
  - ネイティブバンドルバージョンがCapgoバージョンよりMAJORが低い場合、`メジャーバージョン以上への自動アップグレードを無効化`条件が適用されます。

## App Storeのアップデート

CapacitorJSアプリをApp Storeに公開する場合、シンプルな処理が行われます。

ユーザーはストアから新しいバージョンを取得し、デフォルトでアプリ内のすべてのローカルアップデートが削除されます。

この動作を変更したい場合は、`resetWhenUpdate`設定を変更する必要があります。詳細は[こちら](/docs/plugin/api#settings)をご覧ください。

これはクラウドからの他の設定とは異なり、アプリ側でのみ変更できます。

### その他の設定

これらの動作の後、deviceIDに関連する特定の動作を設定できます。

Capgoでは、各deviceIDの動作を上書きすることができます。

deviceIDを以下のいずれかにリンクできます：
  - 特定のバンドルバージョン
  - 特定のチャンネル

これにより、上記のすべての設定がバイパスされます。

詳細は以下の記事をご覧ください。
