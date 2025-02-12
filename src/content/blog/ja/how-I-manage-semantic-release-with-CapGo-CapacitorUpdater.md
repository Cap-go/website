---
slug: ja__how-rapido-cloud-manage-semantic-rerlease-with-CapGo-CapacitorUpdater
title: Rapido CloudがCapGo CapacitorUpdaterを使ってSemantic Releaseを管理する方法
description: >-
  これは、CapGo CapacitorUpdaterを使用する私のアプリケーションのバージョンを管理するためにSemantic
  Releaseを構成する方法です。
author: Rupert Barrow
author_image_url: 'https://avatars.githubusercontent.com/u/48629751?v=4'
author_url: 'https://linkedin.com/in/rbarrow'
created_at: 2024-09-22T00:00:00.000Z
updated_at: 2024-09-22T00:00:00.000Z
head_image: /rapido_cloud_study_case.webp
head_image_alt: Study case rapido cloud
keywords: semantic release, semantic-release, CapGo, CapacitorUpdater, mobile app development, live updates, OTA updates, continuous integration, mobile app updates
tag: Case Study
published: true
locale: ja
next_blog: ''
---

# Rapido CloudがCapGo CapacitorUpdaterでSemantic Releaseを管理する方法

## 1 はじめに

Rapido Cloud（wwwrapidocloud）では、Salesforceクライアント向けに、Salesforce Mobile SDKやSalesforce Mobile Publisherを利用する難しいループを回らずに、自社ブランドのモバイルアプリケーションを簡単に展開できるモバイルアプリケーションを開発しています。

このモバイルアプリは、Ionic 8、Angular 18、TypeScript、Capacitor、そして現在はCapGo CapacitorUpdaterを含む、広く普及したコンポーネントとツールを用いて、現代的で「標準的な」プラットフォーム上で開発しています。これにより、Lightning Web ComponentsなどのSalesforceプラットフォームの特定の管理を望まないクライアントにとって、より扱いやすくなっています。また、Ionic + Angularモバイルアプリケーションの開発者やメンテナンス担当者を採用するのも容易で安価です。

この記事では、私の設計、選択、実装について説明し、CapGoと`semantic-release`がGithub Actionsを介してすべてのデプロイメントを自動的に管理するための非常に成功した簡単な選択肢となる理由を示します。これらはすべて、CapGo CapacitorUpdaterの14日間の無料試用期間中に設計、テスト、文書化されました。

## 2 なぜCapGoを使うのか？ なぜsemantic-releaseを使うのか？
CapGo CapacitorUpdaterは、モバイルアプリのデプロイをApple AppStore/Google PlayStoreの標準的な配信プロセスを通るよりも、はるかにシンプルで迅速かつ柔軟にするという約束で私を惹きつけました。これは、過去にSalesforce Experience Cloudで通常webアプリに集中していた私が、初めてストアにプッシュするモバイルアプリです。

成功させるための学習曲線が怖かったのですが、私のアプリはApple TestFlightにかなり簡単に載せることができました。その後、CapGo CapacitorUpdaterを使用して、更新をずっと早くデプロイすることができる状況になりました。

私の最初の要件とテストケースは、自分の電話で実際のモバイルアプリとしてアプリをテストするためにデプロイすることで、モバイルエミュレータやIIonicが提案するNexusモバイルブラウザを介してテストするのではありません。私のアプリは、ジオロケーションやフォトギャラリー、カメラへのアクセスなどのネイティブ機能を使用しているからです。キャパシタモバイルアプリのテスト経験がなかったため、すべてがうまく機能するかどうか不安でした：実際の条件で実際のアプリをテストするより良い方法はありません！

したがって、CapGo CapacitorUpdaterは、私がソースコードに新機能や修正を保存してから1分後に、モバイル上でアプリを更新するのを助けてくれました：これはとても楽で、非常に柔軟で、簡単に設定できるものでした！

## 3 自分のブランチングおよびリリースモデル、semantic-releaseがどのようにフィットするか

CapGoサーバーへのデリバリーが正しく機能するようになったので、これを自動化し、CI/CDパイプラインに組み込む必要があります。

### これが私のブランチングおよびリリースモデルの組織方法です

すべてのアプリケーションに対して、モバイル、ウェブ、またはSalesforceを問わず：
- **開発**は、`main`からの`feature/`ブランチで実施され、これらは主に開発ブランチの参照である`main`にマージされます。メンテナンスやカスタムデリバリー用の特定の機能のブランチを除きます（詳細については後で説明します）。
- **デプロイメントは__リリースブランチからトリガーされます__** これは、`production`、プレリリースブランチ（`alpha`、`beta`、`nightly`など）や、カスタムデリバリー用の顧客特有またはコンテキスト特有のブランチを含むことができます。
- **デプロイメントは、プルリクエストのマージによってトリガーされます**。タグトリガーのデプロイメントは使用しません。なぜなら、semantic-releaseがタグと残りを管理してくれるからです。

基本的に、これがGitlabフローです：

![Gitlab Flow](/RBW_Gitlab_Flowwebp)

*Gitlabフロー - ソース https://faundev/c/stories/manuelherrera/git-branching-strategies-in-2022*

### semantic-releaseの動作に関する補足：

デプロイメントブランチでsemantic-releaseがトリガーされると、前のタグのバージョン番号と配信された修正または機能に基づいて、ブランチ上の新しいバージョン番号が自動的に計算されます。修正は新しいパッチバージョンを生成し、機能は新しいマイナーバージョンを生成します。それは、リリース番号に事前リリースの `alpha`、`beta` なども自動的に含まれます。

セマンティックリリースはコミットから変更履歴を生成し、従来のコミットに定義されている修正と機能をグループ化します（詳細は https://www.conventionalcommits.org/en/about を参照）し、セマンティックリリースで設定されています。

また、すべてのGit（私の場合はGithub）でマージされたプルリクエストと関連する問題をタグとリリースにリンクするコメントを付けて更新します。最後に、このGithubリリースでは、必要に応じてソースコード、バイナリ、`CHANGELOG.md` などのアセットも添付されます。

## 4 セマンティックリリースおよびCapGoにおけるブランチ、リリース/事前リリース、チャネル

私がCapGoのデプロイメントにおいてセマンティックリリースに実行してほしいことは次のとおりです。

### セマンティックリリースにバージョン番号を生成してほしい

CapGoは、自社独自の「従来のコミット」の `standard-version` ツールを開発し文書化しました。フォークされたリポジトリ `standard-version` (https://github.com/Cap-go/standard-version) や独自の `capacitor-standard-version` (https://github.com/Cap-go/capacitor-standard-version)、さらに `capacitor-plugin-standard-version` (https://github.com/Cap-go/capacitor-plugin-standard-version) リポジトリがあります。CapGoのデプロイメントで使用されるバージョンスキームについては、彼らのブログに文書化されています (https://capgoapp/blog/how-version-work-in-capgo/)。JavaScriptバンドルは「標準的な」セマンバー「セマンティックバージョニング」(https://semver.org) に従っており、`semantic-release` もこれに従います（当然！）。

それは素晴らしいことであり、私は `semantic-release` を広く使用しているので安心しています。

### また、セマンティックリリースに異なるチャネルでアプリデプロイメントを生成してほしい

上記のように、`alpha`、`beta`、`nightly` などのブランチから事前リリースバージョンをデプロイする必要がありますが、`production-customer-jones`、`production-customer-doe` などの特定の顧客用のバージョンも必要です。

CapGoは「チャネル」機能を提供しており、これはセマンティックリリースもサポートしているものですので、両者を連携させることにワクワクしています。これらはまた、XCode Cloudによって管理される異なるブランチビルドとも一致します（これについては下記で詳しく説明します）。

セマンティックリリースによって事前リリースで生成されるセマンバーのバージョン番号は `100-alpha1` のようになります。このブランチでの連続ビルドはビルド番号を `100-alpha2` などに増加させます。明示的に文書化されてはいませんが、これらのバージョン番号はCapGoによってサポートされており、私にとっては素晴らしいニュースです：私はセマンティックリリースチャネルと事前リリースを使用してCapGoチャネルを持つアプリのバージョンを生成します。

## 5 CapGoを使用してアプリケーションをリリースするにはどうすればよいですか？

アプリバンドルのCapGoへのデプロイメントを自動化するには、CapGo CLIコマンド `bundle upload` を使用する必要があります。`npx @capgo/cli@latest bundle upload --help` と入力し、多くのアップロードオプションを確認します。その中で、私たちは次のものを使用します：
[[コードブロック]]
- CHANNEL はデプロイするCapGoチャネル（例：`alpha`）
- VERSION はセマンティックリリースによって生成される（例：`100-alpha1`）
- CAPGO_APIKEY は、CI/CDパイプラインのログインを一意に識別するためにCapGoによって提供されます。
- CAPGO_APPID は、アプリケーションを一意に識別するためにCapGoによって提供されます（例：`commystartupmysuperapp`）

## 6 私のセマンティックリリース + CapGo CapacitorUpdate セットアップ

最後に、これらはすべてどのように組み合わさるのでしょうか？

![セマンティックリリースとGithub Actionsで構築されたアプリバンドルバージョン](/RBW_CapGo_channels_and_versions.webp)

*セマンティックリリースとGithub Actionsで構築されたアプリバンドルバージョン*

### Github Actionsによるセマンティックリリースの自動化

セマンティックリリースの魅力は、デプロイメントの自動化がGithub Actionワークフローという形で非常にシンプルであることです。これは他のCI/CDプラットフォームでも非常に似たようなものになるでしょう。
[[コードブロック]]

これはNodeJS環境をインストールし、その後セマンティックリリースを呼び出します。

`branches` にリストされているブランチでの各マージに対して、セマンティックリリースがデプロイメントをトリガーします。
リポジトリのシークレットに `CAPGO_APIKEY` を設定してください。
ここで `CAPGO_APPID` を更新します。

セマンティックリリースの動作は、その `releaserc.json` 設定ファイルで設定されています。以下に私の設定を示します。詳細は下記に説明します：
```
npx @capgo/cli bundle upload --channel $CHANNEL --apikey $CAPGO_APIKEY --bundle $VERSION --bundle-url $CAPGO_APPID
```

- `branches` : 
  - `branches`は、ブランチの構成（`name`）をCapGoチャネル（`channel`）にマッピングし、プレリリースバージョン番号の呼び方（`prerelease`）を設定します。たとえば、`branchprerelease = "development"`の場合、セマンティックリリースによって生成されるバージョン番号は`xyz-development`になります。
  - `alpha`および`alpha-nocapgo`ブランチへのデプロイは、どちらも`alpha`チャネルにアプリをデプロイしますが、バージョン番号のプレリリース名称が異なります。
  - 開発者ブランチ`dev-rupert`または`dev-paul`へのデプロイは、どちらもCapGoの`development`チャネルにデプロイされ、すべて同じ`development`プレリリースキーワードがバージョン番号に含まれます。
- `verifyConditions` : セマンティックリリースの最初の段階で、正しいGithubへのアクセスがあるかを確認します。ここにCapGo CLIの認証チェックを後で追加することを考えています。
- `@semantic-release/commit-analyzer` : 標準的なセマンティックリリースの機能です - 彼らのドキュメントを参照してください（https://githubcom/semantic-release/semantic-release?tab=readme-ov-file#commit-message-format）
- `@semantic-release/release-notes-generator` : 変更ログファイルを`CHANGELOG.md`として生成します。
- `@semantic-release/git` : Ionicビルドによって更新されたファイル（`package.json`、`CHANGELOG.md`、`ios/App/App.xcodeproj/project.pbxproj` - 現在Android向けのビルドは行っていません）をコミットします。
- `@semantic-release/github` : `CHANGELOG.md`ファイルをGithubリリースの資産として添付します。
- `@semantic-release/exec`: アプリのビルドを準備するための2つのコマンドを使用します（`prepareCmd`）、その後、CapGoサーバーにアプリバンドルを効果的にデプロイします（`publishCmd`）

バージョン番号の計算とインクリメントの仕方、変更ログの生成、Githubタグまたはリリースの必要性などの説明に時間をかける必要がないことに気付くでしょう：すべてはデフォルトでセマンティックリリースによって処理されており、最小限の構成で済みます。

### XCode Cloudでの新しいバイナリのビルド

このすべてをXCode Cloudと統合することで、新しいバージョンのアプリケーションバイナリのビルドは簡単です（Google Playにはまだデプロイしていませんが、そのビルドも似たようなものになるはずです）：
- 私は、このブランチ（例：`production`）に変更があったときにビルドするXCode Cloudプロセスを設定しました。
- このブランチでは、`CHANGELOG.md`ファイルが更新されたときのみXCode Cloudにビルドを設定しました。これは、セマンティックリリースによって生成される各バージョンの後に更新されます。
- 異なるチャンネルに対するデプロイをシミュレートするために、異なるブランチでビルドをトリガーできます。XCode Cloudの各ブランチの設定では、`releaserc.json`に設定された`branchchannel`の値で環境変数を手動で設定します（はい、これは手動の重複です）。その後、希望すれば、カスタムリリースブランチからデプロイされた各カスタマーアプリケーションごとに異なるAppStoreアプリケーションをデプロイすることも可能です。

![XCode CloudでCapGoチャネルを使ったアプリバイナリのビルド](/RBW_XCode_Cloud_building.webp)

*XCode CloudでCapGoチャネルを使ったアプリバイナリのビルド*

## 7 結論

結論として、セマンティックリリースパイプラインにCapGo CapacitorUpdaterを統合できたことを非常に嬉しく思います。14日間の試用期間内に迅速に行われた結果は次のとおりです：
- バンドルバージョン番号はセマンティックリリースによって自動的に生成され、CapGoサーバーと互換性があります。
- セマンティックリリースはCapGoアプリケーションバンドルを自動的にデプロイし、CapGoチャネルも利用しています。
- これはアプリケーションバイナリのXCode Cloudビルドともよく合致しています。

### 次のステップ

私は現在このアプリの開発段階にあり、TestFlight（iOS向け）を通じてテスターに迅速に提供する予定です。CapGoの力を考慮すると、テストのためにAppStoreに無料版のアプリをデプロイし、それをCapGoを使用して定期的に更新することは間違いないでしょう。次に、別のレコードのもとにAppStoreにアプリの別の（有料）バージョンを展開し、CapGoで定期的に更新します。

CapGoの `bundle upload` 前提条件のより良い事前検証を私のセマンティックリリース設定に追加したいと思います。

今後Ionic + Angular + Capacitorで開発されるモバイルアプリのために、クリーンでシンプルで再現可能なセマンティックリリースパイプラインを持つことができました。

## 著者 - ルパート・バロウ

私はセールスフォースに22年以上の経験があり、クライアントとユーザーとして、パートナーや統合者として、アーキテクト、開発者、ビジネスアナリスト、コンサルタントとして活動してきました。私はアルティウスサービスを共同設立し、COOおよびCTOとして13年間共同管理した成功したセールスフォースSIパートナーであるフランスで、新たな冒険に出かける前に、セールスフォースのソロプラナーとして私の**Rapido Cloud**製品を提供しています。

私のLinkedInはhttps://linkedincom/in/rbarrowで見つけることができます。

私たちのセールスフォースの提供は、https://wwwrapido-companionappおよびhttps://wwwrapidocloud（開発中）でご覧いただけます。
