---
slug: migrating-cordova-to-capacitor
title: 'Cordova에서 Capacitor로 웹 앱 마이그레이션하기: 단계별 가이드'
description: >-
  このステップバイステップのガイドでは、CordovaからCapacitorへのWebアプリの移行について、全てのセクションをカバーし、読みやすく理解しやすい形で説明します。
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-07T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /migrating-cordova-to-capacitor.webp
head_image_alt: Cordova から Capacitor への移行の説明
keywords: >-
  Cordova, Capacitor, migration, mobile app development, live updates, OTA
  updates, continuous integration, mobile app updates
tag: Migration
published: true
locale: ja
next_blog: ''
---

# Cordovaから Capacitorへのウェブアプリ移行：ステップバイステップガイド

このガイドは、CordovaからCapacitorへのウェブアプリの移行を、読みやすく理解しやすい形で支援します。すべてのセクションを網羅し、段階的なアプローチを提供します。

## CordovaとCapacitorの概要

CordovaとCapacitorは、どちらもウェブ開発者がHTML、CSS、JavaScriptを使用して、様々なプラットフォーム向けのネイティブアプリケーションを作成できるツールです。類似点はありますが、ネイティブプロジェクト管理、プラグイン管理、CLI/バージョン管理においてアプローチが異なります。

## 移行戦略

CordovaからCapacitorへの移行は、アプリの複雑さに応じて、段階的に行うことも、完全に置き換えることもできます。Capacitorは Cordovaと後方互換性があり、既存のウェブアプリを準備が整った時点で切り替えることができます。

移行を支援するために、[Ionic VS Code Extension](https://marketplacevisualstudiocom/items/?itemName=ionicionic)の使用と、既存のCordovaプラグインの監査を検討してください。必要に応じてCordovaプラグインを継続して使用することも、Capacitorの同等のものに置き換えることもできます。

## ステップバイステップ移行ガイド

CordovaからCapacitorへウェブアプリを移行するには、以下の手順に従ってください：

1. **別のコードブランチで作業する**: これらの変更を適用する際は、別のコードブランチで作業することを推奨します。

2. **Capacitorでアプリを初期化する**: ターミナルでプロジェクトを開き、[ウェブアプリへのCapacitorの追加](https://capacitorjscom/docs/getting-started/#adding-capacitor-to-your-app)または[IonicアプリへのCapacitorの追加](https://capacitorjscom/docs/getting-started/with-ionic/#existing-ionic-project)のガイドに従います。Cordovaの`configxml`ファイルからアプリ名とBundle IDの情報を使用してください。

3. **ウェブアプリをビルドする**: ネイティブプラットフォームを追加する前に、ウェブプロジェクトを少なくとも1回ビルドします。これにより、`www`フォルダがCapacitor設定ファイルで適切に構成されます。

4. **プラットフォームを追加する**: `npx cap add ios`と`npx cap add android`を実行して、iOSとAndroidのプラットフォームを追加します。これにより、プロジェクトのルートに個別のネイティブプロジェクトフォルダが作成されます。

5. **アイコンとスプラッシュスクリーンを生成する**: 既存のアイコンとスプラッシュスクリーン画像がある場合は、`cordova-res`ツールを使用してそれらを生成し、ネイティブプロジェクトにコピーします。

6. **既存のCordovaプラグインを監査し移行する**: 既存のCordovaプラグインを確認し、可能な場合はCapacitorの同等のものに置き換えます。不要なプラグインを削除します。

7. **Cordovaプラグインを削除する**: Cordovaプラグインを置き換えるか削除した後、プラグインをアンインストールし、`npx cap sync`を実行してネイティブプロジェクトからプラグインコードを削除します。

8. **追加の権限を適用する**: 必要な権限を適用するために、`pluginxml`とiOSおよびAndroidの必要な設定との間でマッピングを行います。

9. **設定を構成する**: `configxml`から設定をCapacitor設定ファイルに手動で追加します。

10. **プラットフォーム固有の設定を処理する**: 必要に応じて、各プラットフォーム（iOSとAndroid）の`configxml`の要素を設定します。

11. **コンテンツ提供のスキームを変更する**: 必要な場合は、データ損失を避けるためにアプリでコンテンツを提供するために使用されるスキームを変更します。

12. **テストしCordovaを削除する**: 移行したアプリをテストして、すべての変更が正しく適用されていることを確認します。問題がなければ、プロジェクトからCordovaを削除するか、Cordovaプラグインを引き続き使用する予定がある場合は残しておくことができます。

おめでとうございます！CordovaからCapacitorへのウェブアプリの移行が完了しました。Capacitorプロジェクトでのプラグインの使用やCapacitor開発ワークフローについての詳細は、[公式Capacitorドキュメント](https://capacitorjscom/docs/)をご覧ください。

## Capgoサービスによるライブアップデート

私たちは、Capacitorアプリのライブアップデートを可能にするソリューションであるCapgoを提供しており、適正な価格でOver-The-Air（OTA）アップデートを提供できます。この機能は、迅速な修正の適用、新機能のデプロイ、そしてアプリストアの承認を待つことなくユーザーが常に最新バージョンのアプリを利用できるようにする上で特に有用です。

### Capgoサービスの仕組み

Capgoは、Capacitorアプリにライブアップデートをデプロイできるクラウドベースのサービスです。Webダッシュボードとアプリに統合できるネイティブSDKで構成されています。SDKは起動時または特定の間隔でアップデートを確認し、バックグラウンドでダウンロードします。アップデートが利用可能な場合、SDKはユーザーにインストールを促します。ユーザーが承認すると、アップデートは即座にインストールされ適用されます。

### Capgoライブアップデートのメリット

- **より迅速なアップデート：** アププストアの承認を待つことなく、即座にアップデートをデプロイ
- **App Storeへの依存度低下：** アプリストアの制限や制約をバイパス
- **ユーザー体験の向上：** ユーザーが手動でアップデートする必要なく、最新の機能とバグ修正を提供

### Capgoライブアップデートの実装方法

Capacitorプロジェクトでのライブアップデートの実装手順：
- [Capgoアカウント](https://webcapgoapp/)に登録
- プロジェクトにCapgo SDKをインストール
- 起動時または特定の間隔でアップデートを確認するようアプリを設定
- Capgoダッシュボードを使用してアプリにアップデートをデプロイ

## まとめ

このガイドがWebアプリをCordovaからCapacitorへの移行の参考になれば幸いです。移行プロセスについて質問がある場合や支援が必要な場合は、[discord](https://discordgg/VnYRvBfgA6)サーバーでお気軽にお問い合わせください。