---
locale: ja
---

`@capgo/walletconnect` パッケージの使い方

`@capgo/walletconnect` パッケージは、WalletConnect を Ionic Capacitor アプリに統合するための機能を提供します。WalletConnect は、暗号化された QR コードを使用して、分散型アプリケーション (dApp) がモバイルウォレットに接続できるオープンプロトコルです。

`@capgo/walletconnect` パッケージをアプリで使用するための手順は以下の通りです：

## ステップ 1: パッケージのインストール

```bash
npm install @capgo/walletconnect
```

## ステップ 2: パッケージのインポート

`WalletConnect` 機能を使用したい TypeScript ファイルで、パッケージをインポートします：

```typescript
import { WalletConnect } from "@capgo/walletconnect";
```

## ステップ 3: WalletConnect セッションの作成

WalletConnect セッションを作成するには、`WalletConnect.createSession()` メソッドを使用します。これにより、ユーザーが dApp が提供する QR コードをスキャンできる QR コードスキャナーが開きます。

```typescript
async function createSession() {
  const session = await WalletConnect.createSession();
  // Handle the session object returned
  console.log("WalletConnect session created:", session);
}
```

## ステップ 4: セッションイベントをリッスンする

WalletConnect セッションに関連するイベントをリッスンするには、`WalletConnect.addListener()` メソッドを使用します。リッスン可能なイベント名は以下の通りです：

- `sessionRequest`: モバイルウォレットからのセッションリクエストを受信したときにトリガーされます
- `sessionApproved`: ユーザーがセッションリクエストを承認したときにトリガーされます
- `sessionConnected`: セッションが正常に接続されたときにトリガーされます
- `sessionDisconnected`: セッションが切断されたときにトリガーされます

```typescript
WalletConnect.addListener("sessionRequest", (sessionRequestData) => {
  // Handle the session request data
  console.log("Session request received:", sessionRequestData);
});

WalletConnect.addListener("sessionApproved", () => {
  console.log("Session request approved by user");
});

WalletConnect.addListener("sessionConnected", () => {
  console.log("Session connected");
});

WalletConnect.addListener("sessionDisconnected", () => {
  console.log("Session disconnected");
});
```

## ステップ 5: セッションリクエストを承認する

セッションリクエストを受信したときは、`WalletConnect.approveSession()` メソッドを呼び出すことで承認できます。

```typescript
async function approveSession(sessionRequestData) {
  await WalletConnect.approveSession(sessionRequestData);
  // Handle the approved session
  console.log("Session request approved and session connected");
}
```

## ステップ 6: セッションを取得する

現在のセッションオブジェクトを取得するには、`WalletConnect.getSession()` メソッドを使用します。

```typescript
async function getSession() {
  const session = await WalletConnect.getSession();
  console.log("Current WalletConnect session:", session);
}
```

## ステップ 7: セッションを切断する

現在のセッションを切断するには、`WalletConnect.disconnectSession()` メソッドを使用します。

```typescript
async function disconnectSession() {
  await WalletConnect.disconnectSession();
  // Handle the disconnected session
  console.log("Session disconnected");
}
```

以上です！これで、`@capgo/walletconnect` パッケージを Ionic Capacitor アプリに正常に統合し、WalletConnect 機能を使用できるようになりました。

注意: 上記の手順は、`@capgo/walletconnect` パッケージの使用に関する基本的な概要を提供します。より詳細な機能やオプションについては、パッケージのドキュメントを参照してください。残念ながら、`@capgo/ngx-intl-tel-input-app` パッケージの使用方法についてのチュートリアルを生成するための情報はありません。