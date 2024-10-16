---
slug: how-version-work-in-capgo
title: Capgoにおけるバージョンの仕組み
description: >-
  CapgoがあなたのCapacitorアプリでバージョンを管理する方法を理解し、それを最適に使用します。メジャー、マイナー、パッチの重要性について学びましょう。
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2022-08-25T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /versionning.webp
head_image_alt: バージョン-パッケージ-システム-キャプゴ
tag: Tutorial
published: true
locale: ja
next_blog: how-to-release-major-version-in-capgo
---

Capgoは、Capacitorアプリでバージョンを管理するために2つの主な変数を使用します：
  - ネイティブバージョン
  - JavaScriptバージョン


<div class="mx-auto" style="width:100%;">
  <img src="/graph_capgo.webp" alt="Capacitor update system">
</div>

すべてのバージョン選択は、Capgoによってサーバーサイドで決定されます

## バージョニングシステム

バージョン管理のために、CapgoはSemVerシステムを使用します。詳細については[こちら](https://semverorg/)を参照してください。
### バージョン

Capgoが比較するバージョンの取得場所

  > この動作は、`capacitorconfigjson`ファイルでversionキーを設定することでオーバーライドできます[ドキュメントはこちら](/docs/plugin/settings/#version)
  > ネイティブバージョンは、すべてのプラットフォームで無視されます

#### iOS

 iOSでは、変数はプロジェクトのここ`ios/App/App/Infoplist`で`CFBundleShortVersionString`キーの下に設定されるか、`ios/App/App.xcodeproj/project.pbxproj`で`MARKETING_VERSION`キーの下に設定されます。ただし、`MARKETING_VERSION`が`Infoplist`ファイルに設定されている場合です。

#### Android

  Androidでは、変数はプロジェクトのここ`android/app/build.gradle`で`defaultConfig.versionName`キーの下に設定されます。

#### JavaScript（Capgoバンドルバージョン）

  JavaScriptでは、変数は`package.json`の`version`キーの下に設定できます。
  そうでない場合は、アップロードコマンドで提供する必要があります。

## デフォルト動作

設定を変更しなかった場合、Capgoチャネルはこのように動作します。

> この動作は、デフォルトとして作成したユニークチャネルに基づきます。

### Capacitorアプリの新規インストール時
ユーザーが初めてIonicアプリをダウンロードし、アプリを開くと、Capgoサーバーに接続します。

現在、以下の4つの出力が発生する可能性があります：
  - ネイティブバンドルバージョン（123）がCapgoバンドルバージョン（124）よりも低い場合、Capgoはユーザーにバンドルを送信します。
  - ネイティブバンドルバージョン（123）がCapgoバンドルバージョン（123）と等しい場合、Capgoは「更新の必要なし」と送信します。
  - ネイティブバンドルバージョン（124）がCapgoバンドルバージョン（123）よりも高い場合、Capgoは「更新の必要なし」と送信します。
  - ネイティブバンドルバージョン（123）がCapgoバンドルバージョン（223）よりも大幅に低い場合、Capgoは「更新の必要なし」と送信します。

### その他の設定

#### ネイティブの自動ダウングレードを無効にする

この設定をfalseに変更すると、Capgoは常にバージョンの信頼できるソースとして認識します。
その後、動作が次のようになります：
- ネイティブバージョン（124）がCapgoバージョン（123）よりも高い

> Capgoはユーザーにそのバージョンを送信します。

#### 自動アップグレード戦略を無効にする

いくつかの戦略から選択できます。詳細については[こちら](/docs/tooling/cli/#disable-updates-strategy)をご覧ください。

## JavaScriptバンドルバージョン

JavaScriptバンドルバージョンは、`npx @capgo/cli@latest bundle upload --channel production`を実行したときに送信するものです。

`--bundle 123`オプションを使用しなかった場合、Capgoは`package.json`ファイルからバンドルバージョンを取得します（versionキーで）。

IonicアプリがCapgoから1つのバージョンをインストールした後、そのバージョンが比較されます：
  - 彼らのJavaScriptバンドルバージョン（123）がCapgoバンドルバージョン（124）よりも低い場合、Capgoはユーザーにそのバンドルを送信します。

いくつかのガード条件があります：
  - ネイティブバンドルバージョンがCapgoバージョンよりも高い場合、`ネイティブの自動ダウングレードを無効にする`条件が適用されます。
  - ネイティブバンドルバージョンがCapgoバージョンよりも大幅に低い場合、`メジャー以上の自動アップグレードを無効にする`条件が適用されます。

## アプリストアの更新

Capacitor JSアプリをApp Storeに公開する際、起こることはシンプルです。

ユーザーはストアから新しいバージョンを取得し、デフォルトでアプリ内のすべてのローカル更新を削除します。

この動作を変更したい場合は、`resetWhenUpdate`設定を設定する必要があります。詳細については[こちら](/docs/plugin/api#settings)をご覧ください。

これは、他の設定のようにクラウドから変更することはできず、アプリ側でのみ変更可能です。

### その他の設定

このすべての動作の後、デバイスIDに関連する特定のものを持つことができます。

Capgoでは、各デバイスIDの動作をオーバーライドすることができます。

デバイスIDを以下にリンクできます：
  - 特定のバンドルバージョン
  - 特定のチャネル

これにより、上記で行われたすべての設定がバイパスされます。

以下の記事で詳細を学びましょう。