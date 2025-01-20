---
locale: ja
---

capgo/inappbrowser パッケージ チュートリアル

`@capgo/inappbrowser` パッケージは、URLをアプリ内ブラウザウィンドウで開くことを可能にするCapacitorプラグインです。このパッケージの使用方法についてのステップバイステップガイドを以下に示します。

## インストール

パッケージをインストールするには、プロジェクトのルートディレクトリで以下のコマンドを実行してください：

[[コードブロック]]

## 使用法

1 `@capgo/inappbrowser` パッケージから `InAppBrowser` クラスをインポートします：

   [[コードブロック]]

2 `InAppBrowser.open` メソッドを使用して、URLを新しいフルスクリーンウィンドウで開きます：

   [[コードブロック]]

   `"YOUR_URL"` を開きたいURLに置き換えてください。

3 `InAppBrowser` クラスが提供する他のメソッドも利用できます：

   - `clearCookies`: すべてのクッキーを削除
   - `close`: アプリ内ブラウザウィンドウを閉じる
   - `openWebView`: ツールバー付きの新しいウェブビューでURLを開く
   - `setUrl`: アプリ内ブラウザのURLを設定

   これらのメソッドの詳細については、以下のAPIセクションを参照してください。

## API

`@capgo/inappbrowser` パッケージは、以下のAPIメソッドを提供します：

- `open(options: OpenOptions)`: 新しいフルスクリーンウィンドウでURLを開きます。`OpenOptions`オブジェクトをパラメーターとして受け取ります。
- `clearCookies()`: すべてのクッキーを削除します。
- `close()`: アプリ内ブラウザウィンドウを閉じます。
- `openWebView(options: OpenWebViewOptions)`: ツールバー付きの新しいウェブビューでURLを開きます。`OpenWebViewOptions`オブジェクトをパラメーターとして受け取ります。
- `setUrl(options: { url: string; })`: アプリ内ブラウザのURLを設定します。`url`プロパティを持つオブジェクトをパラメーターとして受け取ります。
- `addListener('urlChangeEvent', listenerFunc: UrlChangeListener)`: URL変更イベントをリッスンします。`UrlChangeListener`関数をパラメーターとして受け取ります。
- `addListener('closeEvent', listenerFunc: UrlChangeListener)`: 閉じるイベントをリッスンします。`UrlChangeListener`関数をパラメーターとして受け取ります。
- `addListener('confirmBtnClicked', listenerFunc: UrlChangeListener)`: 確認ボタンのクリックイベントをリッスンします。`UrlChangeListener`関数をパラメーターとして受け取ります。
- `removeAllListeners()`: すべてのイベントリスナーを削除します。

これらのメソッドのパラメーターや戻り値に関する詳細については、パッケージのドキュメントを参照してください。

以上です！`@capgo/inappbrowser` パッケージを使用して、Capacitorのアプリ内ブラウザウィンドウでURLを開く方法を学びました。コーディングを楽しんでください！