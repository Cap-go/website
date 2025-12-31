---
slug: capacitor-social-login-release
title: Capacitor ソーシャルログインプラグインの新リリース
description: >-
  Capacitor Social Loginプラグインは、iOS、Android、Webで
  Google、Facebook、Appleでのログインを可能にするプラグインです。
author: WcaleNieWolny
author_image_url: 'https://avatars.githubusercontent.com/u/50914789?v=4'
author_url: 'https://github.com/WcaleNieWolny/WcaleNieWolny'
created_at: 2024-10-08T00:00:00.000Z
updated_at: 2024-10-08T00:00:00.000Z
head_image: /social_login_plugin_blog.webp
head_image_alt: Capgoの組織システムの説明
keywords: >-
  Oauth, social login, mobile app development, live updates, OTA updates,
  continuous integration, mobile app updates
tag: Capacitor
published: true
next_blog: ''
locale: ja
---
## はじめに

こんにちは、Michael（[WcaleNieWolny](https://github.com/WcaleNieWolny)）です 👋

1ヶ月の大変な（そして少し苦しい 🙃）作業の末、Capacitor Social Loginの最初のリリースを発表できることを嬉しく思います。このプラグインは、iOSとAndroidの両方でGoogleとAppleのログインを処理することを目的としています。さらに、Martinと共に以下のようなユニークな機能の開発に取り組んできました：

 - AndroidでのAppleログインの導入
 - 新しいGoogle Credentials APIの採用
 - 詳細なドキュメントの追加

## AndroidでのAppleログイン

まず、AndroidでのAppleログインという大きな革新について説明します。AppleのSDKはこの機能を提供していないため、これは簡単な作業ではありませんでした。[この記事](https://johncodeos.com/how-to-add-sign-in-with-apple-button-to-your-android-app-using-kotlin/)を参考にしましたが、より安全にするために少し変更を加えました。最終的なフローは以下のようになります：

<figure><img style="margin-left: auto;margin-right: auto;max-height: 600px !important;" src="/apple-login-flow-chart.svg" alt="Apple Login flow chart" /><figcaption></figcaption></figure>

残念ながら、バックエンドとアプリコードの一部変更が必要ですが、これが最善の方法でした。

## AndroidでのGoogleログインの刷新

次に、AndroidでのGoogleログインの実装に取り組みました。[CodetrixStudioのCapacitorGoogleAuth](https://github.com/CodetrixStudio/CapacitorGoogleAuth)は[間もなく非推奨となるGMSライブラリ](https://developer.android.com/identity/sign-in/legacy-gsi-migration#authorization)を使用していることが判明しました。このGMSライブラリがレガシーとみなされているため、[CredentialManager](https://developer.android.com/identity/sign-in/credential-manager-siwg)を使用することにしました。これによりログインフローが簡素化され、厄介な[エラー10](https://github.com/CodetrixStudio/CapacitorGoogleAuth/issues/332)も解消されました 🎉

## ドキュメント

最後に、素晴らしい✨ドキュメントを作成しました。ドキュメントの正確性と包括性を確保するために多くの時間を費やしました。
ドキュメントにはAppleとGoogle両方の設定に関する詳細なガイドが含まれています。また、Appleログイン用の[サンプルバックエンド](https://github.com/WcaleNieWolny/capgo-social-login-backend-demo)も提供しています 🍎

[Apple](https://github.com/Cap-go/capacitor-social-login/blob/main/docs/setup_apple.md)と[Google](https://github.com/Cap-go/capacitor-social-login/blob/main/docs/setup_google.md)のガイドをぜひご確認ください！

## まとめ

結論として、Capacitor Social Loginプラグインは多くの新しい魅力的な機能を導入し、将来さらなる機能が追加される予定です 🚀
