---
slug: migrating-cordova-to-capacitor
title: CordovaからCapacitorへのWebアプリの移行：ステップバイステップガイド
description: >-
  このステップバイステップガイドは、CordovaからCapacitorへのウェブアプリの移行を助けるもので、すべてのセクションを網羅し、読みやすく従いやすくしています。
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-07T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /migrating-cordova-to-capacitor.webp
head_image_alt: CordovaからCapacitorへの移行イラストレーション
keywords: >-
  Cordova, Capacitor, migration, mobile app development, live updates, OTA
  updates, continuous integration, mobile app updates
tag: Migration
published: true
locale: ja
next_blog: ''
---
# CordovaからCapacitorへのWebアプリの移行：ステップバイステップガイド

このガイドは、CordovaからCapacitorへのWebアプリの移行を手助けし、読みやすく、フォローしやすい形で進めます。全セクションをカバーし、ステップバイステップのアプローチを提供します。

## CordovaとCapacitorの紹介

CordovaとCapacitorは、Web開発者がHTML、CSS、およびJavaScriptを使用してさまざまなプラットフォーム向けにネイティブアプリケーションを作成するためのツールです。両者には共通点がありますが、ネイティブプロジェクト管理、プラグイン管理、CLI/バージョン管理へのアプローチにおいて重要な違いがあります。

## 移行戦略

CordovaからCapacitorへの移行は、アプリの複雑さに応じて段階的に行うことも、完全に置き換えることもできます。CapacitorはCordovaとの後方互換性があるため、準備ができ次第、既存のWebアプリを切り替えることが可能です。

移行を支援するために、[Ionic VS Code Extension](https://marketplace.visualstudio.com/items/?itemName=ionic.ionic)を使用することや、既存のCordovaプラグインを監査することを検討してください。必要に応じて、Cordovaプラグインを引き続き使用することも、Capacitorの同等品に置き換えることもできます。

## ステップバイステップの移行ガイド

CordovaからCapacitorへWebアプリを移行するための手順は以下の通りです。

1. **別のコードブランチで作業する**：これらの変更を適用する際には、別のコードブランチで作業することをお勧めします。

2. **Capacitorでアプリを初期化する**：ターミナルでプロジェクトを開き、[WebアプリにCapacitorを追加する方法](https://capacitorjs.com/docs/getting-started/#adding-capacitor-to-your-app)または[IonicアプリにCapacitorを追加する方法](https://capacitorjs.com/docs/getting-started/with-ionic/#existing-ionic-project)のガイドに従ってください。アプリ名とバンドルIDのために、Cordovaの`config.xml`ファイルの情報を使用します。

3. **Webアプリをビルドする**：ネイティブプラットフォームを追加する前に、少なくとも1回はWebプロジェクトをビルドしてください。これにより、`www`フォルダがCapacitorの設定ファイルで正しく構成されます。

4. **プラットフォームを追加する**：`npx cap add ios`と`npx cap add android`を実行して、iOSとAndroidプラットフォームを追加します。これにより、プロジェクトのルートに別々のネイティブプロジェクトフォルダが作成されます。

5. **アイコンとスプラッシュスクリーンを生成する**：既存のアイコンとスプラッシュスクリーンの画像がある場合は、`cordova-res`ツールを使用して生成し、ネイティブプロジェクトにコピーします。

6. **既存のCordovaプラグインを監査し移行する**：既存のCordovaプラグインを確認し、可能な限りCapacitorの同等物に置き換えます。不要なプラグインは削除します。

7. **Cordovaプラグインを削除する**：Cordovaプラグインを置き換えたり削除した後は、プラグインをアンインストールし、`npx cap sync`を実行して、ネイティブプロジェクトからプラグインコードを削除します。

8. **追加の権限を適用する**：`plugin.xml`とiOSおよびAndroidの必要な設定の間でマッピングして、必要な権限を適用します。

9. **設定を構成する**：`config.xml`の設定を手動でCapacitorの設定ファイルに追加します。

10. **プラットフォーム固有の設定を処理する**：必要に応じて、各プラットフォーム（iOSとAndroid）のために`config.xml`から要素を構成します。

11. **コンテンツ提供のスキームを変更する**：必要に応じて、アプリ内のコンテンツ提供に使用するスキームを変更して、データ損失を避けます。

12. **テストしてCordovaを削除する**：移行したアプリをテストして、すべての変更が正しく適用されていることを確認します。満足したら、プロジェクトからCordovaを削除するか、Cordovaプラグインを引き続き使用する予定がある場合はそのまま残します。

おめでとうございます！CordovaからCapacitorへのWebアプリの移行に成功しました。CapacitorプロジェクトでCordovaプラグインを使用する方法やCapacitorの開発ワークフローについて詳しく学ぶには、[公式Capacitorドキュメント](https://capacitorjs.com/docs/)をご覧ください。

## Capgoサービスによるライブアップデート

Capgoを提供できることを誇りに思います。これは、Capacitorアプリ向けのライブアップデートを可能にし、公正な価格でOTA（Over-The-Air）アップデートを提供します。この機能は、迅速な修正、新機能の展開、およびユーザーがアプリストアの承認を待つことなく常にアプリの最新バージョンを持つことを保証するのに特に便利です。

### Capgoサービスの仕組み

Capgoは、Capacitorアプリにライブアップデートをデプロイできるクラウドベースのサービスです。Webダッシュボードと、アプリに統合できるネイティブSDKで構成されています。SDKは、起動時または特定の間隔で更新を確認し、バックグラウンドでダウンロードします。更新が利用可能な場合、SDKはユーザーにインストールを促します。ユーザーが承諾すれば、更新が即座にインストールされ、適用されます。

### Capgoライブアップデートの利点

- **迅速な更新**：アプリストアの承認を待つことなく、即座に更新をデプロイします。
- **Apple Storeへの依存の削減**：アプリストアの制限を回避します。
- **ユーザー体験の向上**：ユーザーが手動でアプリを更新することなく、最新の機能とバグ修正を提供し続けます。

### Capgoライブアップデートの実装方法

CapgoライブアップデートをCapacitorプロジェクトで実装するには、以下の手順に従います：
- [Capgoアカウント](https://web.capgo.app/)にサインアップします。
- プロジェクトにCapgo SDKをインストールします。
- アプリを起動時または特定の間隔で更新を確認するように構成します。
- Capgoダッシュボードを使用してアプリに更新をデプロイします。

## 結論

このガイドが、あなたのWebアプリをCordovaからCapacitorに移行するのに役立ったことを願っています。質問や移行プロセスに関して支援が必要な場合は、[discord](https://discord.capgo.app)サーバーでお気軽にお問い合わせください。
