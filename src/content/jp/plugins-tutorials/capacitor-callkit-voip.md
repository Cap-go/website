---
locale: jp
---

`@capgo/capacitor-callkit-voip` パッケージ

`@capgo/capacitor-callkit-voip` パッケージは、Ionic Capacitor に PushKit 機能を提供します。このパッケージは BetterCall アプリと一緒に使用するように設計されていますが、他のプロジェクトでも使用できます。

## インストール

パッケージをインストールするには、次のコマンドを実行します：

```bash
npm install @capgo/capacitor-callkit-voip
ionic cap sync
```

インストールを進める前に、コンピュータに Xcode がインストールされていることを確認してください。

## iOS プロジェクトの設定

パッケージを使用するために iOS プロジェクトを設定するには、以下の手順に従ってください：

1. Xcode プロジェクトを開き、Capabilities ペインに移動します。
2. チェックボックスを選択して「Voice over IP」機能を有効にします。
3. Apple Developer ウェブサイトで証明書を登録します。詳細な手順は提供されたリンクにあります。
4. 証明書をダウンロードして、Keychain Access アプリにインポートするために開きます。
5. 提供された画像のように証明書をエクスポートします。
6. エクスポートしたファイルのフォルダに移動し、ターミナルで次のコマンドを実行します：

```bash
openssl pkcs12 -in YOUR_CERTIFICATES.p12 -out app.pem -nodes -clcerts
```

これにより、VOIP 通知を送信するために使用できる `apppem` 証明書ファイルが生成されます。

## 使用方法

パッケージがインストールされ、iOS プロジェクトが設定されたら、コード内で使用を開始できます。

まず、`CallKitVoip` モジュールをインポートします：

```typescript
import { CallKitVoip } from "@capgo/capacitor-callkit-voip";
```

次に、VOIP 通知の登録を開始するために `register()` メソッドを呼び出す必要があります：

```typescript
async function registerVoipNotification() {
  // Register token
  CallKitVoip.addListener("registration", ({ token }) => {
    console.log(`VOIP token has been received ${token}`);
  });

  // Handle incoming call
  CallKitVoip.addListener("callAnswered", ({ username, connectionId }) => {
    console.log(`Call has been received from ${username} (connectionId: ${connectionId})`);
  });

  // Init plugin, start registration of VOIP notifications
  await CallKitVoip.register();
  console.log("Push notification has been registered");
}
```

VOIP 通知を送信するには、提供された `sendVoipsh` スクリプトを使用できます：

```shell
#!/bin/bash

function main {
    connectionId=${1:?"connectionId should be specified"}
    token=${2:?"Enter device token that you received on register listener"}
    username=${3:-Anonymus"}

    curl -v \
    -d "{\"aps\":{\"alert\":\"Incoming call\", \"content-available\":\"1\"}, \"Username\": \"${username}\", \"ConnectionId\": \"${connectionId}\"}" \
    -H "apns-topic: .voip" \
    -H "apns-push-type: voip" \
    -H "apns-priority: 10" \
    --http2 \
    --cert app.pem \
    "https://api.development.push.apple.com/3/device/${token}"
}

main $@
```

## 結論

`@capgo/capacitor-callkit-voip` パッケージを使用することで、Ionic Capacitor プロジェクトに PushKit 機能を追加できます。インストールと使用の手順に従うことで、アプリ内で VOIP 通知を送受信できるようになります。