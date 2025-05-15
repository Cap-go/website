---
slug: how-to-release-major-version-in-capgo
title: capgoでメジャーバージョンをリリースする方法
description: アプリのユーザーアプリを壊さずに、いつ、どのようにメジャーバージョンをリリースする必要があるかを理解します。
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-08-30T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /capgo-feature-image.webp
head_image_alt: Capgo メジャーバージョンシステム
keywords: >-
  mobile app development, live updates, OTA updates, continuous integration,
  mobile app updates
tag: Tutorial
published: true
locale: ja
next_blog: how-to-send-specific-version-to-users
---
## メジャーバージョンをリリースする際に

バージョン管理は難しいことがあります。通常、ユーザーに対して大きな変更が生じたときにメジャーアップデートを行いたいと思うでしょう。

しかし、バージョン管理はそのために作られたわけではなく、アプリストアのバージョンはネイティブバージョンとは異なります。

ネイティブバージョンは*コード*の破壊的変更を管理するために作られています。

例えば、iOSでは、iOS 16がAppleの`ストアバージョン`ですが、コードバージョンは`20A5283p`です（そこでSemVerは使用していないようです）。

これで、私たちがそれらを混同せず、目的に応じて使用することが明確になりました！

## メジャーリリース

あなたのCapacitorアプリでは、破壊的変更が発生したときにメジャーリリースが必要です。 
例えば、新しいiOSターゲット（15から16）、またはCapacitorの新バージョン（3から4）、またはあなたが使用しているプラグイン（1.2から2.0）がメジャーバージョンに更新された場合です。

この変更は、すべてのツールが破壊的変更を処理するように調整されなければならないことを意味します。

だからこそCapgoはこのシステムに従っています。
したがって、メジャーバージョンをリリースすると、Capgoはストアからインストールされていないユーザーには送信しません。\
この動作はカスタマイズ可能です。詳細は[こちら](/docs/cli/commands/#disable-updates-strategy)で学べます。

### バージョン

Capgoが比較するためのバージョンを見つける場所

#### iOS
  > CapgoがJavaScriptバージョンと比較してメジャーアップグレードを見つけるために使用します。

 iOSでは、変数はプロジェクト内の`ios/App/App/Info.plist`のキー`CFBundleShortVersionString`、またはキー`MARKETING_VERSION`が`Info.plist`ファイルに設定されている場合は`ios/App/App.xcodeproj/project.pbxproj`に設定されています。
  > この動作は、`capacitor.config.json`ファイルにバージョンキーを設定することでオーバーライドできます。[ドキュメントはこちら](/docs/plugin/auto-update#advanced-settings/)

#### Android
  > CapgoがJavaScriptバージョンと比較してメジャーアップグレードを見つけるために使用します。

 Androidでは、変数はプロジェクト内の`android/app/build.gradle`のキー`defaultConfig.versionName`に設定されています。
  > この動作は、`capacitor.config.json`ファイルにバージョンキーを設定することでオーバーライドできます。[ドキュメントはこちら](/docs/plugin/auto-update#advanced-settings/)

#### JavaScript
  > Capgoがネイティブバージョンと比較してメジャーアップグレードを見つけるために使用します。

 JavaScriptでは、変数はプロジェクト内の`package.json`のキー`version`に設定されています。
## 例

あなたのIonicアプリは現在、Capacitor 3を使用してバージョン`1.2.3`でリリースされています。

あなたはCapacitor 4にアップグレードしています。

バージョン番号を`2.2.3`にアップグレードする必要があります。その後、すべてのパッケージがCapgoを含むこの大きな変更に気付きます。

このバージョンをCapgoとApp Storeにリリースすると、Capgoの次のライブアップデート`2.2.4`は`1.2.3`バージョンのユーザーには送信されません。`2.2.3`バージョンのユーザーのみに送信されます。

このパターンに従えば、もう心配する必要はなく、すべてが適切に処理されます。

## このパターンに従わない場合

この場合、あなたはCapacitor 4を使用した新しいアプリをAppleとGoogleに送信しなければなりませんが、Capgoには送信しません。

その後、あなたは100%のユーザー、または少なくとも90%がアプリを持つのを待たなければならず、それには数ヶ月かかるでしょう。

その間、古いユーザーは新しいバージョンを受け取ることができないため、Capgoで更新を送信することはできません。
更新を受け取るユーザーを選択する方法がありません。
