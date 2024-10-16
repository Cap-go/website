---
locale: jp
---

revenuecat/purchases-capacitor チュートリアル

このチュートリアルでは、`@revenuecat/purchases-capacitor` パッケージを使用して、Ionic Capacitor アプリにアプリ内購入とサブスクリプションを実装するプロセスをガイドします。

## 前提条件

始める前に、以下を確認してください。

- 設定された Ionic Capacitor プロジェクト
- RevenueCat アカウント（https://apprevenuecatcom/signup でサインアップ）
- アプリストアアカウント（Apple App Store および/または Google Play Store）に設定されたアプリ内製品またはサブスクリプション

## インストール

1 ターミナルまたはコマンドプロンプトを開き、プロジェクトディレクトリに移動します。

2 次のコマンドを実行してパッケージをインストールします：

```bash
npm install @revenuecat/purchases-capacitor
```

3 インストール後、Capacitor プロジェクトを同期します：

```bash
npx cap sync
```

## 設定

1 アプリのメイン TypeScript ファイル（例：`appcomponentts`）に Purchases モジュールをインポートします：

```typescript
import { Purchases } from '@revenuecat/purchases-capacitor';
```

2 RevenueCat API キーを使用して SDK を設定します：

```typescript
async function initializePurchases() {
  await Purchases.configure({
    apiKey: 'YOUR_REVENUECAT_API_KEY',
  });
}
```

アプリが起動したときにこの関数を呼び出します。例えば、メインコンポーネントの `ngOnInit()` メソッド内です。

## 基本的な使い方

### 利用可能な製品の取得

利用可能な製品のリストを取得するには：

```typescript
async function getProducts() {
  try {
    const offerings = await Purchases.getOfferings();
    if (offerings.current !== null) {
      const products = offerings.current.availablePackages;
      console.log('Available products:', products);
    }
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}
```

### 購入の実行

購入を開始するには：

```typescript
async function purchasePackage(package: PurchasesPackage) {
  try {
    const { customerInfo, productIdentifier } = await Purchases.purchasePackage({ aPackage: package });
    console.log('Purchase successful:', productIdentifier);
    console.log('Customer Info:', customerInfo);
  } catch (error) {
    console.error('Error making purchase:', error);
  }
}
```

### サブスクリプションの状態確認

ユーザーの現在のサブスクリプションの状態を確認するには：

```typescript
async function checkSubscriptionStatus() {
  try {
    const { customerInfo } = await Purchases.getCustomerInfo();
    const activeSubscriptions = customerInfo.activeSubscriptions;
    console.log('Active subscriptions:', activeSubscriptions);
  } catch (error) {
    console.error('Error checking subscription status:', error);
  }
}
```

### 購入の復元

ユーザーの以前の購入を復元するには：

```typescript
async function restorePurchases() {
  try {
    const { customerInfo } = await Purchases.restorePurchases();
    console.log('Purchases restored:', customerInfo);
  } catch (error) {
    console.error('Error restoring purchases:', error);
  }
}
```

## 高度な機能

### ユーザーの識別

独自のユーザー ID システムがある場合は、ユーザーを RevenueCat に識別させることができます：

```typescript
async function identifyUser(userId: string) {
  try {
    const { customerInfo } = await Purchases.logIn({ appUserID: userId });
    console.log('User identified:', customerInfo);
  } catch (error) {
    console.error('Error identifying user:', error);
  }
}
```

### イントロダクテリー価格の適格性確認

ユーザーがイントロダクテリー価格の適格性があるか確認するには：

```typescript
async function checkIntroEligibility(productIdentifiers: string[]) {
  try {
    const eligibility = await Purchases.checkTrialOrIntroductoryPriceEligibility({ productIdentifiers });
    console.log('Introductory price eligibility:', eligibility);
  } catch (error) {
    console.error('Error checking eligibility:', error);
  }
}
```

### 属性の設定

ユーザーにカスタム属性を設定できます：

```typescript
async function setUserAttributes() {
  try {
    await Purchases.setAttributes({
      'user_level': '5',
      'user_type': 'premium'
    });
    console.log('Attributes set successfully');
  } catch (error) {
    console.error('Error setting attributes:', error);
  }
}
```

## 結論

このチュートリアルでは、`@revenuecat/purchases-capacitor` パッケージを使用したアプリ内購入とサブスクリプションの実装の基本を説明しました。エラーを適切に処理し、実装を十分にテストすることを忘れないでください。

詳細な API ドキュメントや高度な使用法については、RevenueCat のドキュメント（https://docsrevenuecatcom/）を参照してください。

RevenueCat ダッシュボードで製品を設定し、アプリストア製品にリンクすることを忘れないでください。また、リリース前にサンドボックス環境で実装をテストすることを確認してください。