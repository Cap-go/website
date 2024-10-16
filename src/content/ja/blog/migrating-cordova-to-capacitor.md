---
slug: migrating-cordova-to-capacitor
title: CordovaからCapacitorへのWebアプリケーション移行：ステップバイステップガイド
description: >-
  このステップバイステップガイドは、CordovaからCapacitorへのWebアプリケーションの移行を支援します。すべての部分をカバーしており、読みやすく、従いやすい内容です。
author: Martin Donadieu
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-07T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /migrating-cordova-to-capacitor.webp
head_image_alt: CordovaからCapacitorへの移行のイラスト。
tag: Migration
published: true
locale: ja
next_blog: ''
---

# CordovaからCapacitorへのWebアプリの移行：ステップバイステップガイド

このガイドは、WebアプリをCordovaからCapacitorに移行する手助けをします。読みやすく、従いやすい内容になっています。すべてのセクションをカバーし、ステップバイステップのアプローチを提供します。

## CordovaとCapacitorの紹介

CordovaとCapacitorは、Web開発者がHTML、CSS、JavaScriptを使用してさまざまなプラットフォーム向けにネイティブアプリケーションを作成できるツールです。似ている点もありますが、ネイティブプロジェクト管理、プラグイン管理、CLI/バージョン管理のアプローチには重要な違いがあります。

## 移行戦略

CordovaからCapacitorへの移行は、アプリの複雑さに応じて段階的または完全な置き換えとして行うことができます。CapacitorはCordovaと後方互換性があるため、準備が整ったときに既存のWebアプリを切り替えることができます。

移行時のサポートとして、[Ionic VS Code拡張機能](https://marketplacevisualstudiocom/items/?itemName=ionicionic)を使用し、既存のCordovaプラグインを監査することを検討してください。必要に応じてCordovaプラグインを引き続き使用することも、Capacitorの同等品に置き換えることもできます。

## ステップバイステップの移行ガイド

CordovaからCapacitorにWebアプリを移行するための手順は以下の通りです：

1. **別のコードブランチで作業する**：これらの変更を適用する際は、別のコードブランチで作業することを推奨します。

2. **Capacitorでアプリを初期化する**：ターミナルでプロジェクトを開き、[WebアプリにCapacitorを追加するためのガイド](https://capacitorjscom/docs/getting-started/#adding-capacitor-to-your-app)または[IonicアプリにCapacitorを追加するためのガイド](https://capacitorjscom/docs/getting-started/with-ionic/#existing-ionic-project)に従ってください。アプリ名とバンドルIDにはCordovaの`config.xml`ファイルからの情報を使用します。

3. **Webアプリをビルドする**：ネイティブプラットフォームを追加する前に、少なくとも1回はWebプロジェクトをビルドします。これにより、Capacitorの設定ファイル内で`www`フォルダが正しく構成されます。

4. **プラットフォームを追加する**：`npx cap add ios`および`npx cap add android`を実行して、iOSおよびAndroidプラットフォームを追加します。これにより、プロジェクトのルートに別々のネイティブプロジェクトフォルダが作成されます。

5. **アイコンとスプラッシュスクリーンを生成する**：既存のアイコンとスプラッシュ画面の画像がある場合は、`cordova-res`ツールを使用して生成し、ネイティブプロジェクトにコピーします。

6. **既存のCordovaプラグインを監査し、移行する**：既存のCordovaプラグインをレビューし、可能であればCapacitorの同等品に置き換えます。不要なプラグインは削除します。

7. **Cordovaプラグインを削除する**：Cordovaプラグインを置き換えたり削除した後は、プラグインをアンインストールし、`npx cap sync`を実行してネイティブプロジェクトからプラグインコードを削除します。

8. **追加の権限を適用する**：iOSおよびAndroidにおける`plugin.xml`と必要な設定のマッピングを行い、必要な権限を適用します。

9. **設定を構成する**：`config.xml`の設定を手動でCapacitorの設定ファイルに追加します。

10. **プラットフォーム固有の設定を処理する**：必要に応じて、各プラットフォーム（iOSおよびAndroid）のために`config.xml`からの要素を構成します。

11. **コンテンツ提供のスキームを変更する**：必要に応じて、アプリ内のコンテンツ提供に使用するスキームを変更し、データ損失を防ぎます。

12. **テストし、Cordovaを削除する**：移行したアプリをテストして、すべての変更が正しく適用されていることを確認します。満足した場合は、プロジェクトからCordovaを削除するか、Cordovaプラグインを引き続き使用する予定の場合はそのままにします。

おめでとうございます！CordovaからCapacitorへのWebアプリの移行に成功しました。CapacitorプロジェクトでCordovaプラグインを使用する方法やCapacitor開発のワークフローについて詳しく知りたい場合は、[公式のCapacitorドキュメント](https://capacitorjscom/docs/)を訪れてください。

## Capgoサービスによるライブアップデート

私たちは、Capgoを提供できることを誇りに思っています。これは、Capacitorアプリのライブアップデートを可能にし、公正な価格でOver-The-Air (OTA) アップデートを提供します。この機能は、迅速な修正を行い、新機能を展開し、ユーザーがアプリストアの承認を待つことなく、常に最新のアプリバージョンを利用できるようにするのに特に便利です。

### Capgoサービスの仕組み

Capgoは、Capacitorアプリにライブアップデートを展開できるクラウドベースのサービスです。ウエブダッシュボードとアプリに統合できるネイティブSDKで構成されています。SDKは、起動時または特定の間隔でアップデートを確認し、バックグラウンドでダウンロードします。更新が利用可能な場合、SDKはユーザーにインストールを促します。ユーザーが受け入れた場合、アップデートは即座にインストールされ適用されます。

### Capgoライブアップデートの利点

- **迅速なアップデート:** アプリストアの承認を待たずに即座にアップデートを展開できます。
- **Apple Storeへの依存度の減少:** アプリストアの制限や制約を回避できます。
- **向上したユーザー体験:** ユーザーが手動でアプリを更新する必要なしに、最新の機能やバグ修正を提供してエンゲージメントを維持します。

### Capgoライブアップデートの実装方法

CapacitorプロジェクトにCapgoライブアップデートを実装するには、以下の手順に従います：
- [Capgoアカウント](https://webcapgoapp/)にサインアップします。
- プロジェクトにCapgo SDKをインストールします。
- アプリが起動時または特定の間隔でアップデートを確認するように設定します。
- Capgoダッシュボードを使用してアプリにアップデートを展開します。

## 結論

このガイドがCordovaからCapacitorへのウェブアプリの移行に役立つことを願っています。移行プロセスに関して質問がある場合やサポートが必要な場合は、[discord](https://discordgg/VnYRvBfgA6)サーバーでお気軽にご連絡ください。