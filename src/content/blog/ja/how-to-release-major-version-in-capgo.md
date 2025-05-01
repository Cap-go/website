---
slug: how-to-release-major-version-in-capgo
title: Come rilasciare una versione major in capgo
description: アプリのクリティカルバージョンをユーザーアプリを破損することなくリリースする必要がある時期と方法を理解する
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-08-30T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /capgo-feature-image.webp
head_image_alt: Capgoメジャーバージョンシステム
keywords: >-
  mobile app development, live updates, OTA updates, continuous integration,
  mobile app updates
tag: Tutorial
published: true
locale: ja
next_blog: how-to-send-specific-version-to-users
---

## メジャーバージョンをリリースする際

バージョニングの管理は難しい場合があります。通常、ユーザーにとって大きな変更がある場合にメジャーアップデートを送信したいと考えます

しかし、バージョニングはそのために作られたものではありません。App Storeのバージョンは、ネイティブバージョンとは異なります

ネイティブバージョンは*コード*の破壊的変更を管理するために作られています

例えばiOSでは、iOS 16は Appleの`ストアバージョン`ですが、コードバージョンは`20A5283p`です（彼らはそこでSemVerを使用していないようです）

これらを混同せず、それぞれの目的に応じて使用することが重要です！

## メジャーリリース

Capacitorアプリでは、破壊的変更が発生した際にメジャーリリースが必要です
例えば、新しいiOSターゲット（15から16）、新しいバージョンのCapacitor（3から4）、または使用しているプラグイン（12から20）がメジャーバージョンにアップデートされた場合です

この変更は、破壊的変更に対応するためにすべてのツールを調整する必要があることを意味します

そのためCapgoはこのシステムに従っています
メジャーバージョンをリリースする場合、Capgoはストアからインストールしていないユーザーにはそれを送信しません\
この動作はカスタマイズ可能です。詳細は[こちら](/docs/cli/commands/#disable-updates-strategy)で確認できます

### バージョン

Capgoがバージョンを比較する場所

#### iOS
  > JavaScriptバージョンと比較してメジャーアップグレードを見つけるためにCapgoによって使用されます

 iOSでは、変数は`ios/App/App/Infoplist`の`CFBundleShortVersionString`キー、または`Infoplist`ファイルで`MARKETING_VERSION`が設定されている場合は`ios/App/Appxcodeproj/projectpbxproj`の`MARKETING_VERSION`キーで設定されます
  > この動作は`capacitorconfigjson`ファイルでversionキーを設定することでオーバーライドできます [ドキュメントはこちら](/docs/plugin/auto-update#advanced-settings/)

#### Android
  > JavaScriptバージョンと比較してメジャーアップグレードを見つけるためにCapgoによって使用されます

  Androidでは、変数は`android/app/buildgradle`の`defaultConfigversionName`キーで設定されます
  > この動作は`capacitorconfigjson`ファイルでversionキーを設定することでオーバーライドできます [ドキュメントはこちら](/docs/plugin/auto-update#advanced-settings/)

#### JavaScript
  > ネイティブバージョンと比較してメジャーアップグレードを見つけるためにCapgoによって使用されます

  JavaScriptでは、変数は`packagejson`の`version`キーで設定されます

## 例

現在、Capacitor 3でバージョン`123`のIonicアプリがリリースされています

Capacitor 4にアップグレードする場合

バージョン番号を`223`にアップグレードする必要があります。そうすることで、Capgoを含むすべてのパッケージがこの大きな変更に気付きます

このバージョンをCapgoとApp Storeにリリースすると

次のCapgoのライブアップデート`224`は、`123`バージョンのユーザーには送信されず、`223`バージョンのユーザーにのみ送信されます

このパターンに従えば、心配する必要はなく、すべてが適切に処理されます

## このパターンに従わない場合

この場合、Capacitor 4の新しいアプリをAppleとGoogleに送信する必要がありますが、Capgoには送信しません

その後、ユーザーの100%、または少なくとも90%が新しいアプリを入手するのを待つ必要があります。これには数ヶ月かかる可能性があります

この間、古いユーザーは新しいバージョンを取得できないため、Capgoでアップデートを送信することはできません
アップデートを受け取るユーザーを選択する方法もありません