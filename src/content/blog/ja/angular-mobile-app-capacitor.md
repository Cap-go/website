---
slug: angular-mobile-app-capacitor
title: Créer des applications mobiles avec Angular et Capacitor
description: AngularとCapacitor、Konsta UIの高度なネイティブユーザーインターフェースでモバイルアプリを作成する方法を学びましょう。
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-06T00:00:00.000Z
updated_at: 2023-06-06T00:00:00.000Z
head_image: /angular_capacitor.webp
head_image_alt: Angular および Capacitor イラストレーション
keywords: >-
  Angular, mobile app development, live updates, OTA updates, continuous
  integration, mobile app updates
tag: Tutorial
published: true
locale: ja
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---

In this tutorial, we'll begin with a new [Angular](https://angulario/) アプリから始めて、Capacitorを使用してネイティブモバイルアプリの世界に移行します。オプションとして、[Konsta UI](https://konstauicom/)を追加してTailwind CSSでモバイルUIを改善することもできます。

Capacitorを使用すると、大きな変更を加えたり、React Nativeのような新しいスキルを学ぶことなく、AngularのWebアプリケーションを簡単にネイティブモバイルアプリに変換できます。

ほとんどのAngularアプリケーションは、いくつかの簡単なステップでモバイルアプリに変換できます。

このチュートリアルでは、新しいAngularアプリから始めて、Capacitorを組み込んでネイティブモバイルアプリの世界に移行するプロセスをご案内します。さらに、オプションとして[Konsta UI](https://konstauicom/)を使用してTailwind CSSでモバイルUIを強化することもできます。

## Capacitorについて

CapacitorJSは革新的です！どのWebプロジェクトにも簡単に組み込むことができ、アプリケーションをネイティブWebviewにラップして、XcodeとAndroid Studioのプロジェクトを生成します。さらに、そのプラグインはJSブリッジを介してカメラなどのネイティブデバイス機能へのアクセスを提供します。

Capacitorを使用すると、複雑なセットアップや急な学習曲線なしに、素晴らしいネイティブモバイルアプリを得ることができます。スリムなAPIと合理化された機能により、プロジェクトへの統合が非常に簡単です。Capacitorで完全に機能するネイティブアプリを実現する簡単さに驚かれることでしょう！

## Angularアプリの準備

新しいAngularアプリを作成するには、次のコマンドを実行します：

[[CODE_BLOCK]]

Angularバージョンを求められたら「Angular」を選択してください。

ネイティブモバイルアプリを作成するには、プロジェクトの**エクスポート**が必要です。そのため、Angularプロジェクトをビルドしてコピーするための簡単なスクリプトを**packagejson**に含めましょう：

[[CODE_BLOCK]]

`build`コマンドを実行すると、プロジェクトのルートに新しい`dist`フォルダが表示されるはずです。

このフォルダは後でCapacitorによって使用されますが、現時点では正しくセットアップする必要があります。

## AngularアプリへのCapacitorの追加

Webアプリをネイティブモバイルコンテナにパッケージ化するには、最初にいくつかのステップを踏む必要がありますが、その後は単一の`sync`コマンドを実行するだけです。

まず、[Capacitor CLI](https://capacitorjscom/docs/cli/)を開発依存関係としてインストールし、プロジェクト内でセットアップします。セットアップ中、名前とバンドルIDのデフォルト値を受け入れるにはEnterキーを押してください。

次に、コアパッケージとiOSおよびAndroidプラットフォーム用の関連パッケージをインストールする必要があります。

最後に、プラットフォームを追加できます。Capacitorはプロジェクトのルートに各プラットフォーム用のフォルダを作成します：

[[CODE_BLOCK]]

この時点で、Angularプロジェクト内に新しい**ios**と**android**フォルダが表示されるはずです。

**これらは実際のネイティブプロジェクトです！**

後でAndroidプロジェクトにアクセスするには、[Android Studio](https://developerandroidcom/studio/)をインストールする必要があります。iOSの場合、Macが必要で[Xcode](https://developerapplecom/xcode/)をインストールする必要があります。

さらに、プロジェクト内に**capacitorconfigts**ファイルが見つかるはずです。これには、同期中に使用される基本的なCapacitor設定が含まれています。注意する必要があるのは**webDir**だけで、これはビルドコマンドの結果を指している必要があります。現在は不正確です。

これを修正するには、**capacitorconfigjson**ファイルを開いて**webDir**を更新してください：

[[CODE_BLOCK]]

以下のコマンドを実行して試してみることができます：

[[CODE_BLOCK]]

最初のコマンド`npm run build`は単にAngularプロジェクトをビルドして静的ビルドをコピーし、2番目のコマンド`npx cap sync`はすべてのWebコードをネイティブプラットフォームの適切な場所に同期させてアプリで表示できるようにします。

さらに、同期コマンドはネイティブプラットフォームを更新しプラグインをインストールする可能性があるので、新しい[Capacitor plugins](https://capacitorjscom/docs/plugins/)をインストールする際は再度`npx cap sync`を実行する必要があります。