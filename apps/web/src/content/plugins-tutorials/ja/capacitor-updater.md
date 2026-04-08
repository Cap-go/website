---
locale: ja
---

capgo/capacitor-updater パッケージチュートリアル

このチュートリアルでは、Ionic Capacitor アプリで自動更新を有効にするために `@capgo/capacitor-updater` パッケージを使用するプロセスを案内します。

## 前提条件

始める前に、以下がインストールされていることを確認してください：

- Nodejs
- npm

## インストール

`@capgo/capacitor-updater` パッケージをインストールするには、ターミナルまたはコマンドプロンプトを開き、以下のコマンドを実行します：

```
npm install @capgo/capacitor-updater
```

これにより、プロジェクトにパッケージがダウンロードされインストールされます。

### プラグインのインストール

アプリに以下のコードが追加されるはずです：

`npm i @capgo/capacitor-updater && npx cap sync`
Capacitor アプリにプラグインをインストールするために。

次に、JS バンドルが正常であることをネイティブプラグインに通知するためにアプリにこのコードを追加してください。これを行わないと、ネイティブプラグインは前のバージョンにロールバックします：

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()
```

これにより、ネイティブプラグインにインストールが成功したことを伝えます。

次に、アプリを更新するために `npm run build && npx cap copy` を実行してください。

### Capgo CLOUD にログイン

最初に、アカウントにある `all` [apikey](https://console.capgo.app/dashboard/apikeys/) を使用して CLI でログインします：

`npx @capgo/cli@latest login YOUR_KEY`

### 最初のアプリを追加

まず、CLI で Capgo Cloud にアプリを作成することから始めましょう。

`npx @capgo/cli@latest app add`

このコマンドは、Capacitor コンフィグファイルで定義されているすべての変数を使用してアプリを作成します。

### 最初のバージョンをアップロード

コードをビルドして Capgo に送信するコマンドを実行します：
`npx @capgo/cli@latest bundle upload`

デフォルトでは、バージョン名は `packagejson` ファイルにあるものになります。

[Capgo](https://console.capgo.app/) でビルドが存在するか確認してください。

私の [モバイルサンドボックスアプリ](https://capgo.app/app_mobile/) を使ってテストすることもできます。

### チャンネルをデフォルトに設定

アプリを Capgo に送信した後、アプリが Capgo からの更新を受け取るためには、チャンネルを `default` に設定する必要があります。

`npx @capgo/cli@latest channel set production -s default`

## デバイスでライブアップデートを受信

アプリケーションが Deploy からのライブアップデートを受信するためには、デバイスまたはエミュレーターでアプリを実行する必要があります。これを行う最も簡単な方法は、以下のコマンドを使用してエミュレーターまたはコンピューターに接続されたデバイスでローカルアプリを起動することです。

    npx cap run [ios | android]

アプリを開き、バックグラウンドに移動して再度開くと、ログにアプリが更新を行ったことが表示されるはずです。

おめでとうございます！ 🎉 最初のライブアップデートを成功裏にデプロイしました。これはライブアップデートでできることの始まりです。詳しくは、完全な [ライブアップデートドキュメント](/docs/plugin/cloud-mode/getting-started/) をご覧ください。

> ローカルでの更新を停止する必要がある場合は、このコマンドを実行してください。
`npx @capgo/cli@latest channel set`

## 結論

おめでとうございます！ `@capgo/capacitor-updater` パッケージを使用して Ionic Capacitor アプリで自動更新を有効にする方法を成功裏に学びました。自動更新を選択するか手動設定を選択するかに関わらず、今ではアプリを簡単に最新の状態に保つためのツールを手に入れました。
