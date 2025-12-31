---
slug: how-to-customize-build-scripts-with-capacitor-cli
title: Capacitor CLIでビルドスクリプトをカスタマイズする方法
description: >-
  Capacitor
  CLIを使用してビルドスクリプトをカスタマイズし、すべてのプラットフォームで効率的な配布とカスタマイズされたアップデートを行う方法を学びましょう。
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://github.com/riderx'
created_at: 2025-04-02T01:58:36.984Z
updated_at: 2025-12-31T01:33:21.000Z
head_image: >-
  https://assets.seobotai.com/capgo.app/67ec7f117747adc4bca87873-1743559128944.jpg
head_image_alt: モバイル開発
keywords: >-
  Capacitor, build scripts, mobile development, deployment automation,
  environment variables, app updates
tag: 'Development, Mobile, Updates'
published: true
locale: ja
next_blog: ''
---
[Capacitor](https://capacitorjs.com/) CLIを使用すると、iOS、Android、Webプラットフォーム向けのアプリのビルドプロセスをカスタマイズできます。ビルドスクリプトを調整することで以下が可能です:

-   **更新の高速化**: アプリストアの遅延なしで即座に変更をプッシュ。
-   **デプロイメントの制御**: 更新のロールバックや特定のユーザーグループへのターゲティング。
-   **アプリのセキュリティ**: 暗号化を使用して更新を保護。
-   **ビルドの最適化**: プラットフォーム固有のニーズに合わせて設定を調整。

### 主な機能の概要:

-   **設定ファイル**: `capacitor.config.json`と`package.json`でビルド設定を管理。
-   **カスタムスクリプト**: 自動化のためのprebuildとpostbuildタスクを追加。
-   **ビルドフック**: ビルドプロセスの特定のステージでコードを実行。
-   **環境変数**: `.env`ファイルで環境固有のビルドを簡素化。

[Capgo](https://capgo.app/)というデプロイメントツールは、[自動更新](https://capgo.app/docs/live-updates/update-behavior/)、バージョン追跡、グローバルなパフォーマンス最適化でこのプロセスを強化します。最大限の効率を得るためのビルドスクリプトの設定とカスタマイズ方法について、以下で詳しく説明します。

## [Capacitor](https://capacitorjs.com/)の設定について

![Capacitor Framework Documentation Website](https://assets.seobotai.com/capgo.app/67ec7f117747adc4bca87873/7e137b9b90adb3934b29b03381f213c1.jpg)

<Steps>

1. Capacitorをインストール
2. プロジェクトを初期化
3. プラットフォームを追加
4. ビルドを設定

</Steps>

## Capacitorのデフォルトビルドプロセス

Capacitorのデフォルトビルドプロセスを理解することは、効果的にカスタマイズするために重要です。以下で、Capacitor CLIのビルドプロセスと主要な設定ファイルについて説明します。

### 標準的なビルドステップ

Capacitorはウェブアプリをプラットフォーム固有のビルドに変換するために段階的なプロセスを使用します。デフォルトのビルドプロセスでは以下のことが行われます:

| フェーズ | 説明 | 出力 |
| --- | --- | --- |
| **Webビルド** | フレームワークツールを使用してWebアセットをコンパイル | 最適化されたWebバンドル |
| **アセットのコピー** | Webアセットをネイティブプラットフォームフォルダに移動 | プラットフォーム固有のアセットディレクトリ |
| **ネイティブビルド** | プラットフォーム固有のビルドコマンドを実行 | デプロイ可能なバイナリ |
| **検証** | ビルドの整合性と依存関係をチェック | ビルドステータスと警告 |

### 主要な設定ファイル

2つの主要な設定ファイルがCapacitorのビルド処理方法を決定します:

**capacitor.config.json**  
これはCapacitorプロジェクトのコア設定ファイルです。ビルドの重要なパラメータを設定します:

```json
{
  "appId": "com.example.app",
  "appName": "Example App",
  "webDir": "dist",
  "plugins": {
    "SplashScreen": {
      "launchShowDuration": 0
    }
  }
}
```

-   **`appId`**: アプリの一意の識別子。
-   **`appName`**: アプリの名前。
-   **`webDir`**: Capacitorが Web アセットを探す場所を指定（例：`dist`）。
-   **`plugins`**: SplashScreen オプションなど、プラグイン固有の設定を可能にします。

**package.json**  
このファイルにはビルドプロセスに影響を与えるビルドスクリプトと依存関係が含まれています:

```json
{
  "scripts": {
    "build": "vite build",
    "cap:build": "cap build",
    "cap:sync": "cap sync"
  }
}
```

-   `capacitor.config.json`の`webDir`設定は、ネイティブビルドに含めるコンパイル済みWebアセットの場所をCapacitorに伝えます。
-   `capacitor.config.json`を変更した後は、ネイティブプロジェクトを更新するために`cap sync`を実行する必要があります。

次に、これらの設定をさらにカスタマイズする方法を探ります。

## ビルドスクリプトの変更

プロジェクトのニーズに合わせてCapacitorのデフォルトビルドプロセスを調整できます。方法は以下の通りです:

### 設定ファイルの設定

`capacitor.config.json`ファイルを編集してビルドプロセスを調整できます。以下は設定例です:

```json
{
  "appId": "com.example.app",
  "appName": "Example App",
  "webDir": "dist",
  "server": {
    "hostname": "app.example.com",
    "allowNavigation": ["*.example.com"]
  },
  "android": {
    "buildOptions": {
      "keystorePath": "release.keystore"
    }
  },
  "ios": {
    "scheme": "App"
  }
}
```

以下は変更可能な主要な設定です:

-   **`webDir`**: コンパイル済みWebアセットの場所を指定。
-   **`server`**: ホスト名やナビゲーション権限を含む開発サーバーを設定。
-   **`android/ios`**: AndroidのKeystoreの詳細やiOSのプロビジョニングオプションなど、プラットフォーム固有のビルド設定を許可。

### NPMスクリプトの作成

ワークフローを効率化するために、`package.json`ファイルにカスタムNPMスクリプトを追加します。例:

```json
{
  "scripts": {
    "prebuild": "node scripts/prepare-env.js",
    "build": "vite build",
    "postbuild": "node scripts/notify-complete.js",
    "build:android": "cap build android",
    "build:ios": "cap build ios"
  }
}
```

-   **`prebuild`と`postbuild`**: 環境のセットアップやビルド完了時の通知などのタスクに使用。
-   **`build:platform`**: AndroidまたはiOSアプリをビルドするためのプラットフォーム固有のコマンド。

ビルドフックを追加することで、さらに自動化を進めることができます。

### ビルドフックのセットアップ

より高度な制御のために、ビルドプロセスの特定のポイントでカスタムコードを実行するビルドフックを使用します。`capacitor.config.ts`での設定例:

```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'Example App',
  webDir: 'dist',
  plugins: {
    CapacitorHooks: {
      beforeBuild: async () => {
        console.log('Build starting...');
      },
      afterBuild: async () => {
        console.log('Build complete!');
      }
    }
  }
};

export default config;
```

ビルドフックでは以下が可能です:

-   ビルド開始前の要件検証
-   プロセス中のアセット変換
-   重要なポイントでの通知トリガー
-   バージョン番号の自動更新
-   シームレスな自動テストの実行

このアプローチにより、ビルドライフサイクル全体でより大きな柔軟性と制御が得られます。

## 高度なビルドカスタマイズ

大規模なプロジェクトでは、ビルドプロセスの微調整が大きな違いを生み出します。環境固有のビルドとプラットフォームのカスタマイズを効果的に処理する方法を説明します。

### 環境変数

各環境用に別々の`.env`ファイルを作成して環境変数を設定します:

-   `.env.development`
-   `.env.staging`
-   `.env.production`

そして、環境に基づいて適切なファイルを読み込むようにビルドスクリプトを設定します:

```javascript
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
});
```

これらの設定をプラットフォーム固有の要件に合わせてさらに調整できます。

### プラットフォーム固有のビルド

AndroidとiOS向けのビルドをカスタマイズするには、以下の構造を使用します:

```typescript
const config: CapacitorConfig = {
  android: {
    buildOptions: {
      debuggable: true,
      jvmArgs: ["-Xmx2048m"]
    }
  },
  ios: {
    scheme: "App Debug",
    xcodePreferences: {
      automaticSigning: false
    }
  }
};
```

これらの設定により、各プラットフォーム向けのビルドを調整し、スムーズなデプロイメントを確保できます。

| 機能 | Android | iOS |
| --- | --- | --- |
| デバッグシンボル | [ProGuard](https://www.guardsquare.com/proguard)マッピングファイル | dSYMファイル |
| ビルドバリアント | debug, release, staging | debug, release |
| コード署名 | Keystoreの管理 | プロビジョニングプロファイル |
| アセット管理 | res/drawableの最適化 | アセットカタログ |

ビルドを最適化するための追加のヒント:

-   デプロイメント時間を節約するための部分更新の使用
-   問題を素早く特定するためのエラートラッキングの設定
-   ベータテストバージョン用のチャネルシステムの作成
-   セキュアな配布のためのエンドツーエンド暗号化の有効化

Capgoのような分析とセキュアな更新のためのツールと組み合わせることで、これらのテクニックによりデプロイメントプロセスをより制御できます[\[1\]](https://capgo.app/) 。

## ビルドスクリプトの問題と修正

カスタムビルド設定を使用する際は、ビルドプロセスをスムーズに進めるために、エラーに素早く対処することが重要です。

### 一般的なエラーの修正

多くのビルドスクリプトの問題は、環境設定や依存関係の問題に起因します。以下に一般的な問題の対処方法を示します:

**環境変数の欠落**

このようなエラーが発生した場合:

```bash
Error: Missing required environment variable APP_KEY
```

プロジェクトのルートディレクトリに`.env.local`ファイルを作成することで修正できます。例:

```bash
APP_KEY=your-secret-key
API_URL=https://api.example.com
```

**プラットフォーム固有のビルド失敗**

Android署名エラーの場合、このコマンドを使用:

```bash
keytool -genkey -v -keystore release.keystore -alias app -keyalg RSA
```

iOSプロビジョニングプロファイルの問題の場合、これを試してください:

```bash
xcode-select --install
```

| エラータイプ | 一般的な原因 | 解決策 |
| --- | --- | --- |
| 署名設定 | Keystoreの詳細の欠落 | `KEYSTORE_PATH`と認証情報を設定 |
| ビルド環境 | 未定義の変数 | プラットフォーム固有の`.env`ファイルを作成 |
| 依存関係 | バージョンの不一致 | `package.json`を更新して同期 |

修正を適用後、徹底的なビルドテストを実行して変更が確実なものであることを確認します。

### ビルドスクリプトのテスト

エラーが解決したら、以下の手順でビルドスクリプトを検証します:

-   **自動検証**: 主要なコマンドを実行してビルドプロセスが期待通り動作することを確認。

```bash
npm run verify:build
```

-   **環境の検証**: ビルド開始前に環境変数の欠落をチェック。

```javascript
checkEnvVariables(['APP_KEY', 'API_URL']);
```

-   **ビルドスクリプトのデバッグ**: ビルド中の潜在的な問題を捕捉するための詳細なスクリプトを追加。

```javascript
debug('Starting build process...');
```

テストに関する追加のヒント:

-   [Docker](https://www.docker.com/)コン

このセキュリティフレームワークは、何百もの企業アプリケーションにわたって厳密にテストされています。より高度なセキュリティを必要とするチームのために、Capgoはカスタマイズ可能な設定を備えたセルフホスト型ソリューションも提供しています。

Capgoのチャネルシステムにより、アップデートの配信が柔軟になります。開発者は特定のユーザーグループに異なるバージョンを提供できるため、ベータテストや段階的なリリースに最適です。

## まとめ

### ビルドステップの概要

カスタムビルドスクリプトは、ビルドフック、環境変数、プラットフォーム固有のコマンドを活用することで、自動化された一貫性のあるデプロイメントを可能にします。これらのプロセスは、Capgoで実現可能なデプロイメントの改善のための強固な基盤を作ります。

### Capgoのメリット

Capgoはデプロイメントを簡素化し、750以上の本番アプリケーションで2,350万回以上のアップデートを提供してきました[\[1\]](https://capgo.app/) 。部分的なアップデートシステムにより、帯域幅の使用量とデプロイメント時間を削減します。

このプラットフォームは、高速なアップデート、グローバルなパフォーマンス最適化、セキュリティのためのエンドツーエンドの暗号化、柔軟なチャネルベースの配信システムを提供します。この設定により、ターゲットを絞ったアップデート、ベータテスト、強固なセキュリティフレームワークを維持しながらアプリストアのガイドラインへの準拠をサポートします。
