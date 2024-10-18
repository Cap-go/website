---
locale: ja
---

Capgo Cloudへのファイルのアップロードとダウンロードに@capgo/cliを使用する

[@capgo/cli](https://wwwnpmjscom/package/@capgo/cli/)は、Capgo Cloudにファイルをアップロードおよびダウンロードするためのコマンドラインインターフェース（CLI）ツールです。このチュートリアルでは、@capgo/cliを使用してCapgo Cloud内のファイルを管理する手順を説明します。

### ステップ1: 登録

@capgo/cliを使用する前に、[capgoapp](https://capgoapp/)でアカウントを登録し、APIキーを取得する必要があります。

### ステップ2: インストール

@capgo/cliをインストールするには、ターミナルを開き、次のコマンドを実行します:

```bash
npm install -g @capgo/cli
```

### ステップ3: Capgo Cloudにログイン

@capgo/cliを使用してCapgo Cloudにログインするには、次のコマンドを実行します:

```bash
npx @capgo/cli login [apikey]
```

`[apikey]`を登録中に取得したAPIキーに置き換えます。オプションで、`--local`フラグを使用してAPIキーをローカルフォルダーに保存できます。

### ステップ4: Capgo Cloudに新しいアプリを追加

Capgo Cloudに新しいアプリを追加するには、次のコマンドを使用します:

```bash
npx @capgo/cli add [appId]
```

`[appId]`を`comtestapp`形式のアプリIDに置き換えます。また、アイコン、名前、およびAPIキーをカスタマイズするために、`--icon`、`--name`、`--apikey`フラグを使用できます。

### ステップ5: Capgo Cloudにバージョンをアップロード

アプリのバージョンをCapgo Cloudにアップロードするには、次のコマンドを実行します:

```bash
npx @capgo/cli upload [appId]
```

`[appId]`をアプリIDに置き換えます。アップロードオプションをカスタマイズするために、`--apikey`、`--path`、`--channel`、`--external`、`--key`、`--key-data`、`--no-key`、`--bundle`、および`--iv-session-key`フラグを使用できます。

### ステップ6: チャンネルの管理

@capgo/cliを使用してCapgo Cloudでチャンネルを作成および削除できます。

新しいチャンネルを追加するには、次のコマンドを使用します:

```bash
npx @capgo/cli channel add [channelId] [appId]
```

`[channelId]`を新しいチャンネルの名前に、`[appId]`をアプリIDに置き換えます。

チャンネルを削除するには、次のコマンドを使用します:

```bash
npx @capgo/cli channel delete [channelId] [appId]
```

`[channelId]`を削除するチャンネルの名前に、`[appId]`をアプリIDに置き換えます。

### ステップ7: エンドツーエンドの暗号化

@capgo/cliは、コードのエンドツーエンドの暗号化をサポートしています。次のコマンドを使用してRSAキーのペアを生成できます:

```bash
npx @capgo/cli key create
```

プライベートキーをアプリの設定に保存するには、次のコマンドを実行します:

```bash
npx @capgo/cli key save
```

あなたのキーでzipファイルを暗号化するには、次のコマンドを使用します:

```bash
npx @capgo/cli encrypt [path/to/zip]
```

あなたのキーでzipファイルを復号化するには、次のコマンドを使用します:

```bash
npx @capgo/cli encrypt [path/to/zip] [ivSessionKey]
```

`[path/to/zip]`と`[ivSessionKey]`を適切な値に置き換えます。

### 結論

このチュートリアルでは、@capgo/cliを使用してCapgo Cloudにファイルをアップロードおよびダウンロードする方法を学びました。@capgo/cliは、アプリのバージョンとチャンネルを管理するための便利なコマンドラインインターフェースを提供します。詳細については、公式の[ドキュメント](https://capgoapp/docs/)を参照してください。