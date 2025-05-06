---
slug: come-rapido-cloud-gestisce-semantic-release-con-CapGo-CapacitorUpdater
title: Capgo CapacitorUpdaterによるRapido CloudのSemantic Releaseの管理方法
description: CapGo CapacitorUpdaterを使用するアプリケーションのリリースを管理するためのsemantic releaseの設定方法です
author: Rupert Barrow
author_image_url: 'https://avatars.githubusercontent.com/u/48629751?v=4'
author_url: 'https://linkedin.com/in/rbarrow'
created_at: 2024-09-22T00:00:00.000Z
updated_at: 2024-09-22T00:00:00.000Z
head_image: /rapido_cloud_study_case.webp
head_image_alt: クラウドのクイックケーススタディ
keywords: >-
  semantic release, semantic-release, CapGo, CapacitorUpdater, mobile app
  development, live updates, OTA updates, continuous integration, mobile app
  updates
tag: Case Study
published: true
locale: ja
next_blog: ''
---
## 1. はじめに

Rapido Cloud (www.rapido.cloud)では、SalesforceのMobile SDKやMobile Publisherの複雑な手順を踏まずに、Salesforceクライアントが独自のブランドのモバイルアプリケーションを簡単にデプロイできるようにするモバイルアプリケーションを開発しています。

このモバイルアプリは、Ionic 8、Angular 18、TypeScript、Capacitor、そして現在はCapGo CapacitorUpdaterなど、モダンで「標準的な」プラットフォームと広く普及したコンポーネントやツールを使用して開発しました。これらは、Lightning Web Componentsなどのセールスフォース固有のプラットフォームを管理したくないクライアントにとってより扱いやすく、私にとってもIonic + Angularモバイルアプリケーションの開発者やメンテナーを採用しやすく、コストも抑えられます。

この記事では、CapGoと`semantic-release`をGithub Actionsを通じて全てのデプロイメントを自動的に管理する非常に成功した当たり前の選択肢にする私の設計、選択、実装について説明します。これらはすべて、CapGo CapacitorUpdaterの14日間の無料トライアル期間中に設計、テスト、文書化されました。

## 2. なぜCapGoを使用するのか？なぜsemantic-releaseを使用するのか？

CapGo CapacitorUpdaterは、標準的なApple AppStore/Google PlayStoreの配信プロセスを経るよりも、モバイルアプリのデプロイメントをはるかに簡単に、はるかに迅速に、そして柔軟にできるという約束に魅力を感じました。
これは私が初めてストアにプッシュするモバイルアプリケーションで、これまではSalesforce Experience Cloud上で開発されたWebアプリに集中していました。

成功に至るまでの学習曲線に少し不安を感じていましたが、Apple TestFlightへのアプリの掲載は比較的簡単でした。その後、CapGo CapacitorUpdaterを使用して更新をより迅速にデプロイできる状態になりました。

私の最初の要件とテストケースは、IIonicが提案するNexusモバイルブラウザを通じてモバイルエミュレータやシミュレータでテストする代わりに、自分自身のために自分の電話で実際のモバイルアプリとしてアプリをテストすることでした。これは、私のアプリがジオロケーションや写真ギャラリー、カメラへのアクセスなどのネイティブ機能を使用しているためです。Capacitorモバイルアプリのテスト経験がなかったため、すべてが適切に動作するかどうか確信が持てませんでした：実際のアプリを実際の条件でテストすること以上に良いものはありません！

そのため、CapGo CapacitorUpdaterは、ソースコードに新機能や修正を保存してから1分後に、私のモバイル上でアプリケーションを更新するのに役立ちました：とても安心で、柔軟で、セットアップも簡単でした！

## 3. ブランチとリリースモデル、そしてsemantic-releaseの適合性

### これが私のブランチとリリースモデルの組織方法です

すべてのアプリケーション（モバイル、Web、Salesforce）において：
- **開発**は`main`から分岐した`feature/...`ブランチで行われ、メンテナンスやカスタム配信のための特定の機能以外の大部分の開発ブランチの参照となる`main`にマージされます（詳細は後述）
- **デプロイメントはリリースブランチから__トリガー__されます**。これらは：`production`、プレリリースブランチ（`alpha`、`beta`、`nightly`など）、そしてカスタマー固有またはコンテキスト固有のブランチのカスタム配信用のブランチがあります
- **デプロイメントはプルリクエスト**がデプロイメントブランチにマージされることでトリガーされます。semantic releaseがタグとその他すべてを管理するため、タグトリガーのデプロイメントは使用しません。

基本的に、これはGitlab Flowです：

![Gitlab Flow](/RBW_Gitlab_Flow.webp)

*Gitlab Flow - source https://faun.dev/c/stories/manuelherrera/git-branching-strategies-in-2022*

### semantic-releaseの動作に関する補足：

デプロイメントブランチで、semantic-releaseがトリガーされると、そのブランチ上の前のタグのバージョン番号と配信された修正や機能に応じて、このブランチの新しいバージョン番号を自動的に計算します。修正は新しいパッチバージョンを作成し、機能は新しいマイナーバージョンを作成します。また、プレリリースの`alpha`、`beta`などもバージョン番号に自動的に含まれます。

Semantic releaseは、コミットからchangelogを生成し、conventional commits（https://www.conventionalcommits.org/en/about を参照）で定義され、semantic releaseで設定された修正と機能をグループ化します。

また、タグとリリースにリンクするコメントを付けて、すべてのgit（私の場合はGithub）のマージされたプルリクエストと関連する課題を更新します。最後に、このGithubリリースに、ソースコード、必要に応じてバイナリ、`CHANGELOG.md`などのアセットを添付します。

## 4. semantic releaseとCapGoにおけるブランチ、リリース/プレリリース、チャンネル

したがって、CapGoデプロイメントのためにsemantic releaseに望むことは以下の通りです。

### semantic releaseにバージョン番号を生成させたい

CapGoは"Conventional Commits"の`standard-version`ツールの独自バージョンを開発し、文書化しており、フォークしたリポジトリ`standard-version`（https://github.com/Cap-go/standard-version）、および独自の`capacitor-standard-version`（https://github.com/Cap-go/capacitor-standard-version）、`capacitor-plugin-standard-version`（https://github.com/Cap-go/capacitor-plugin-standard-version）リポジトリを持っています。彼らはブログでCapGoのデプロイメントで使用されるバージョンスキームについて文書化しています（https://capgo.app/blog/how-version-work-in-capgo/）。JavaScriptバンドルは、`semantic-release`も従う（当然ながら！）"標準的な"semver "Semantic Versioning"（https://semver.org）に従います。

これは素晴らしく、私にとって安心です。なぜなら、私は`semantic-release`を広く使用しているからです。

### 異なるチャンネルでアプリデプロイメントをsemantic releaseに生成させたい

上述のように、`alpha`、`beta`、`nightly`などのブランチからプレリリースバージョンをデプロイする必要があります。また、`production-customer-jones`、`production-customer-doe`などのブランチでカスタマー固有のバージョンもデプロイする必要があります。

CapGoは"チャンネル"機能を提供しており、これはsemantic releaseも同様にサポートしているため、これらを連携させることに興奮しています。これらはXCode Cloudで管理される異なるブランチビルドとも適合します（詳細は後述）。

プレリリースでsemantic releaseによって生成されるsemverバージョン番号は`1.0.0-alpha.1`のようになります。このブランチでの連続したビルドでは、ビルド番号が`1.0.0-alpha.2`などに増加します。明示的には文書化されていませんが、これらのバージョン番号はCapGoでサポートされており、これは私にとって素晴らしいニュースです：私はsemantic releaseのチャンネルとプレリリースを使用して、Capgoチャンネルでアプリのバージョンを生成します。

## 5. アプリケーションのリリースにCapGoをどのように使用できますか？

CapGoへのアプリバンドルのデプロイメントを自動化するには、CapGo CLIコマンド`bundle upload`を使用する必要があります。`npx @capgo/cli@latest bundle upload --help`と入力すると、多数のアップロードオプションが表示されます。その中で、以下を使用します：
```
npx @capgo/cli bundle upload --channel $CHANNEL --apikey $CAPGO_APIKEY --bundle $VERSION --bundle-url $CAPGO_APPID
```
- CHANNELは、デプロイしたいCapGoチャンネル（例：`alpha`）です
- VERSIONはsemantic releaseによって生成されます（例：`1.0.0-alpha.1`）
- CAPGO_APIKEYはCI/CDパイプラインログインを一意に識別するためにCapGoによって提供されます
- CAPGO_APPIDはアプリケーションを一意に識別するためにCapGoによって提供されます（例：`com.mystartup.mysuperapp`）

## 6. semantic release + CapGo CapacitorUpdateのセットアップ

最後に、これらすべてがどのように組み合わされているのでしょうか？

![App bundle versions built with semantic release and Github Actions](/RBW_CapGo_channels_and_versions.webp)

*semantic releaseとGithub Actionsで構築されたアプリバンドルバージョン*

### Github Actionsによるsemantic releaseの自動化

semantic releaseの美しさは、Github Actionワークフローの形でのデプロイメント自動化が非常にシンプルであることです。これは他のCI/CDプラットフォームでも非常に似た形になります。
```yaml
# ./github/workflows/release.yml

name: Release

on:
  workflow_dispatch:
  push:
    branches: [alpha, alpha-nocapgo, dev-rupert]    # <--- adapt this

env:
  CAPGO_APPID: com.mystartup.mysuperapp             # <--- adapt this
  CAPGO_APIKEY: ${{ secrets.CAPGO_APIKEY }}

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: "npm"
      - run: npm install
      - run: npx semantic-release
        env:
          DEBUG: true
          GITHUB_TOKEN: ${{ github.token }}
```

これは単にNodeJS環境をインストールし、その後semantic releaseを呼び出します。

`branches`にリストされているブランチへのマージごとに、semantic releaseはデプロイメントをトリガーします。
リポジトリのシークレットに`CAPGO_APIKEY`を設定してください。
ここで`CAPGO_APPID`を更新してください。

semantic releaseの動作は`.releaserc.json`設定ファイルで設定されます。
以下が私の設定で、説明は以下の通りです：
```json
// .releaserc.json

{
  "branches": [
    {
      "name": "release",
      "channel": "production"
    },
    {
      "name": "alpha",
      "channel": "alpha",
      "prerelease": "alpha"
    },
    {
      "name": "alpha-nocapgo",
      "channel": "alpha",
      "prerelease": "alpha-nocapgo"
    },
    {
      "name": "dev-rupert",
      "channel": "development",
      "prerelease": "development"
    },
    {
      "name": "dev-paul",
      "channel": "development",
      "prerelease": "development"
    }
  ],
  "ci": true,
  "debug": true,
  "dryRun": false,
  "repositoryUrl": "https://github.com/RupertBarrow/mysuperapp",

  "verifyConditions": ["@semantic-release/github"],

  "plugins": [
    [
      "@semantic-release/commit-analyzer",
      {
        "preset": "angular",
        "releaseRules": [
          { "type": "breaking", "release": "major" },
          { "type": "feat", "release": "minor" },
          { "type": "fix", "release": "patch" },
          { "type": "ci", "release": "patch" },
          { "type": "doc", "release": "patch" },
          { "type": "docs", "release": "patch" },
          { "type": "refactor", "scope": "core-*", "release": "minor" },
          { "type": "refactor", "release": "patch" },

          { "scope": "no-release", "release": false }
        ]
      }
    ],

    "@semantic-release/release-notes-generator",

    ["@semantic-release/changelog", { "changelogFile": "CHANGELOG.md" }],

    [
      "@semantic-release/git",
      {
        "assets": ["package.json", "CHANGELOG.md", "ios/App/App.xcodeproj/project.pbxproj"],
        "message": "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
      }
    ],

    ["@semantic-release/github", { "assets": ["CHANGELOG.md"] }],

    [
      "@semantic-release/exec",
      {
        "prepareCmd": "npm run build",
        "publishCmd": "npm add -D @capgo/cli && npx @capgo/cli bundle upload --channel ${branch.channel} --apikey $CAPGO_APIKEY --bundle ${nextRelease.version} --bundle-url $CAPGO_APPID"
      }
    ]
  ]
}
```

- `branches`：
  - `branches`はブランチ（`name`）の設定を、CapGoチャンネル（`channel`）とプレリリースバージョン番号の呼び方（`prerelease`）にマッピングします。例えば、`branch.prerelease = "development"`の場合、semantic releaseによって生成されるバージョン番号は`x.y.z-development.n`となります
  - `alpha`と`alpha-nocapgo`ブランチへのデプロイメントは両方とも`alpha`チャンネルにアプリをデプロイしますが、バージョン番号のプレリリース名が異なります
  - 開発者ブランチ`dev-rupert`や`dev-paul`へのデプロイメントは両方ともCapGoの`development`チャンネルにデプロイされ、すべてバージョン番号に同じ`development`プレリリースキーワードが使用されます
- `verifyConditions`：semantic releaseの最初のステージで、Githubへの適切なアクセスがあるかチェックします。後でここにCapGo CLIの認証チェックを追加することを希望しています
- `@semantic-release/commit-analyzer`：標準的なsemantic releaseの機能 - 彼らのドキュメント（https://github.com/semantic-release/semantic-release?tab=readme-ov-file#commit-message-format）を参照してください
- `@semantic-release/release-notes-generator`：changelogファイルを`CHANGELOG.md`として生成します
- `@semantic-release/git`：アプリケーションのIonicビルドとsemantic releaseの作業によって更新された以下のファイルをコミットします（`package.json`、`CHANGELOG.md`、`ios/App/App.xcodeproj/project.pbxproj` - まだAndroidのビルドは行っていません）
- `@semantic-release/github`：`CHANGELOG.md`ファイルをアセットとしてGithubリリースに添付します
- `@semantic-release/exec`：これら2つのコマンドを使用してアプリのビルドを準備し（`prepareCmd`）、その後アプリバンドルをCapGoサーバーに効果的にビルドデプロイします（`publishCmd`）

バージョン番号の計算と増加方法、changelogの生成方法、Githubタグやリリースの生成方法などを説明する手間がないことに気付くでしょう：すべてがsemantic releaseによって最小限の設定でデフォルトで処理されます。

### XCode Cloudによる新しいバイナリのビルド

アプリケーションバイナリの新バージョンをビルドするためのXCode Cloudとの統合は簡単です（まだGoogle Playへのデプロイはしていませんが、そのビルドも同様のはずです）：
- この目的で使用したいブランチ（例：`production`）に変更があった時にビルドするようXCode Cloudプロセスを設定します
- このブランチでは、`CHANGELOG.md`ファイルが更新された時のみビルドするようXCode Cloudを設定します。これはsemantic releaseで各バージョンが生成された後に更新されます
- 異なるチャンネル向けのデプロイをシミュレートするため、異なるブランチでビルドをトリガーできます。異なるブランチ上のXCode Cloudビルドの各設定で、`releaserc.json`で設定された`branch.channel`の値を環境変数として手動で設定し（はい、これは手動での重複です）、必要であれば、前述のようにカスタムリリースブランチからデプロイされる各カスタマーアプリケーション用に異なるAppStoreアプリケーションをデプロイすることができます。

![CapGoチャンネルを使用したXCode Cloudでのアプリバイナリのビルド](/RBW_XCode_Cloud_building.webp)

*CapGoチャンネルを使用したXCode Cloudでのアプリバイナリのビルド*

## 7. 結論

結論として、14日間のトライアル期間内に、CapGo CapacitorUpdaterを標準的なsemantic releaseパイプラインに迅速に統合できたことを非常に嬉しく思います。その結果は以下の通りです：
- バンドルバージョン番号はsemantic releaseによって自動的に生成され、CapGoサーバーと互換性があります
- semantic releaseは自動的にCapGoアプリケーションバンドルをデプロイし、CapGoチャンネルも活用します
- これはアプリケーションバイナリのXCode Cloudビルドとうまく適合します

### 次のステップ

現在、このアプリは開発フェーズにあります。TestFlight（iOS向け）を通じてテスターに早急に提供する予定です。CapGoのパワーを考慮すると、テスト用にAppStoreに無料バージョンのアプリをデプロイし、テスト中にCapGoを使用して定期的に更新する予定です。その後、別のレコードで別の（有料）バージョンのアプリをAppStoreにデプロイし、同様にCapGoで定期的に更新します。

semantic release設定にCapGo `bundle upload`の前提条件をより良く事前検証することを追加したいと考えています。

これで、Ionic + Angular + Capacitorで開発される将来のモバイルアプリ向けにクリーンでシンプル、かつ再現可能なsemantic releaseパイプラインを手に入れました。

## 著者 - Rupert Barrow

私はSalesforceで22年以上の経験を持ち、クライアントとユーザー、パートナーとインテグレーター、アーキテクト、開発者、ビジネスアナリスト、コンサルタントとして活動してきました。フランスで成功したSalesforce SIパートナーであるAltius Servicesを共同創設し、13年間COOとCTOとして共同経営した後、**Rapido Cloud**製品を提供するSalesforceソロプレナーとして新しい冒険に乗り出しました。

LinkedInは https://linkedin.com/in/rbarrow でご覧いただけます。

Salesforce製品は https://www.rapido-companion.app と https://www.rapido.cloud（開発中）でご覧いただけます。
