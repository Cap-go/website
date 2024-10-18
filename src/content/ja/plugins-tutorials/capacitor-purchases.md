---
locale: ja
---

@capgo/capacitor-purchasesパッケージチュートリアル

このチュートリアルでは、Capacitorにおけるアプリ内購入のために@capgo/capacitor-purchasesパッケージを使用するプロセスを案内します。

## ステップ1: パッケージをインストールする

@capgo/capacitor-purchasesパッケージをインストールするには、ターミナルを開いて以下のコマンドを実行します。

```bash
npm install @capgo/capacitor-purchases
npx cap sync
```

## ステップ2: Androidプラットフォームを設定する

Androidプラットフォームをターゲットにしている場合、android/app/src/main/AndroidManifest.xmlファイルにいくつかの設定を追加する必要があります。ファイルを開き、以下のコードスニペットを追加します。

```xml
<!-- Add your configuration here -->
```

## ステップ3: パッケージをセットアップする

@capgo/capacitor-purchasesパッケージをセットアップするには、APIキーとオプションのアプリユーザーIDを使用して`setup`メソッドを使います。以下はその例です。

```typescript
import { Plugins } from "@capacitor/core";

const { CapacitorPurchases } = Plugins;

const setupPurchases = async () => {
  const apiKey = "YOUR_API_KEY";
  const appUserID = "OPTIONAL_APP_USER_ID";

  await CapacitorPurchases.setup({ apiKey, appUserID });
};

setupPurchases();
```

## ステップ4: 購入更新イベントを処理する

ユーザーの購入に変更があった場合に通知されるように「purchasesUpdate」イベントをリッスンできます。イベントのリスナーを追加する方法の例を示します。

```typescript
import { Plugins, PluginListenerHandle } from "@capacitor/core";

const { CapacitorPurchases } = Plugins;

const addPurchasesUpdateListener = (): PluginListenerHandle => {
  return CapacitorPurchases.addListener(
    "purchasesUpdate",
    (data: { purchases: Package; customerInfo: CustomerInfo }) => {
      // Handle purchases update here
    }
  );
};

const purchasesUpdateListener = addPurchasesUpdateListener();
```

## ステップ5: 利用可能なオファリングを取得する

`getOfferings`メソッドを使用して、ユーザーのために利用可能なオファリングを取得できます。以下はその例です。

```typescript
import { Plugins } from "@capacitor/core";

const { CapacitorPurchases } = Plugins;

const getOfferings = async () => {
  const offerings = await CapacitorPurchases.getOfferings();
  console.log(offerings);
};

getOfferings();
```

## ステップ6: パッケージを購入する

購入を行うには、パッケージIDを使用して`purchasePackage`メソッドを使います。以下はその例です。

```typescript
import { Plugins } from "@capacitor/core";

const { CapacitorPurchases } = Plugins;

const purchasePackage = async (packageId: string) => {
  await CapacitorPurchases.purchasePackage({ packageId });
};

purchasePackage("PACKAGE_ID");
```

## ステップ7: 購入を復元する

ユーザーの購入を復元したい場合は、`restorePurchases`メソッドを使用します。以下はその例です。

```typescript
import { Plugins } from "@capacitor/core";

const { CapacitorPurchases } = Plugins;

const restorePurchases = async () => {
  await CapacitorPurchases.restorePurchases();
};

restorePurchases();
```

## 以上です！

@capgo/capacitor-purchasesパッケージを使用してCapacitorでのアプリ内購入を成功裏に学びました。コーディングを楽しんでください！