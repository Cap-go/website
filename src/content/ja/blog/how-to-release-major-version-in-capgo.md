---
slug: how-to-release-major-version-in-capgo
title: Capgoでメインバージョンを公開する方法
description: ユーザーアプリケーションに影響を与えずに、アプリのメインバージョンをいつどのようにリリースするかを理解すること。
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2022-08-30T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /capgo-feature-image.webp
head_image_alt: キャプゴメインシステム
tag: Tutorial
published: true
locale: ja
next_blog: how-to-send-specific-version-to-users
---

## メジャーバージョンをリリースするとき

バージョン管理は難しい場合があります。通常、ユーザーに大きな変更が現れたときにメジャーアップデートを送信したいと思います。

しかし、バージョン管理はそのために作られたわけではありません。アプリストアのバージョンはネイティブバージョンとは異なります。

ネイティブバージョンは*コード*の破壊的変更を管理するために作られています。

例えば、iOSでは、iOS 16がAppleの「ストアバージョン」ですが、コードバージョンは「20A5283p」です（そこではSemVerは使われていないようです）。

今では、これらを混合せず、それぞれの目的に応じて使用することが明確です！

## メジャーリリース

あなたのCapacitorアプリでは、破壊的変更が発生したときにメジャーリリースが必要です。  
例えば、新しいiOSターゲット（15から16）、またはCapacitorの新バージョン（3から4）、または使用しているプラグイン（12から20）がメジャーバージョンに更新された場合です。

この変更は、すべてのツールが破壊的変更を処理するために調整されなければならないことを意味します。

だからこそ、Capgoはこのシステムに従っています。  
もしあなたがメジャーバージョンをリリースすると、Capgoはストアからインストールされていないユーザーには送信しません。  
この動作はカスタマイズ可能です。詳細については[こちら](/docs/tooling/cli/#disable-updates-strategy)を参照してください。

### バージョン

Capgoが比較するバージョンの取得方法

#### iOS
> CapgoがJavaScriptバージョンと比較し、メジャーアップグレードを見つけるために使用します。

iOSでは、変数はプロジェクトのここ`ios/App/App/Infoplist`内のキー `CFBundleShortVersionString`または`ios/App/Appxcodeproj/projectpbxproj`内のキー `MARKETING_VERSION`に設定されます（`MARKETING_VERSION`が`Infoplist`ファイルで設定されている場合）。  
> この動作は`capacitorconfigjson`ファイルにバージョンキーを設定することでオーバーライドできます。[こちらのドキュメント](/docs/plugin/auto-update#advanced-settings/)を参照してください。

#### Android
> CapgoがJavaScriptバージョンと比較し、メジャーアップグレードを見つけるために使用します。

Androidでは、変数はプロジェクトのここ`android/app/buildgradle`内のキー `defaultConfigversionName`に設定されます。  
> この動作は`capacitorconfigjson`ファイルにバージョンキーを設定することでオーバーライドできます。[こちらのドキュメント](/docs/plugin/auto-update#advanced-settings/)を参照してください。

#### JavaScript
> Capgoがネイティブバージョンと比較し、メジャーアップグレードを見つけるために使用します。

JavaScriptでは、変数はプロジェクトのここ`packagejson`のキー `version`に設定されます。

## 例

あなたのIonicアプリは現在、バージョン`123`でCapacitor 3を使用してリリースされています。

あなたはCapacitor 4へのアップグレードを行っています。

バージョン番号を`223`にアップグレードする必要があり、その結果、すべてのパッケージがCapgoを含め、この大きな変更を認識します。

このバージョンをCapgoおよびApp Storeにリリースすると、  
次の全てのライブアップデート`224`は`123`バージョンのユーザーには決して送信されず、`223`バージョンのユーザーにのみ送信されます。

このパターンに従えば、もう心配する必要はありません。すべてはうまく処理されます。

## これに従わない場合

この場合、それはあなたがCapacitor 4を使った新しいアプリをAppleとGoogleに送信しなければならないことを意味しますが、Capgoには送信しないということです。

次に、あなたは100%のユーザーがアプリを持つ、もしくは少なくとも90%が持つまで待たなければなりません。これは数ヶ月かかる可能性があります。

その間、旧ユーザーが新しいバージョンを取得できないため、Capgoでのアップデートを送信することができません。  
更新を受け取るユーザーを選択する方法はありません。