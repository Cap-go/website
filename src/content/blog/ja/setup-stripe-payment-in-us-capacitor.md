---
slug: setup-stripe-payment-in-us-capacitor
title: Capacitorアプリでの新しいAppleガイドラインに従ったStripe Payment Linksの実装
description: >-
  Capacitorアプリで2025年5月1日から施行される新しいAppleのガイドラインに準拠してデジタル商品の支払いを処理するためのStripe
  Payment Linksの実装方法を学びましょう。
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2025-05-01T00:00:00.000Z
updated_at: 2025-11-21T05:04:49.000Z
head_image: /stripe_apple.webp
head_image_alt: Capacitorアプリケーションにおけるストライプ決済の実装
keywords: >-
  capacitor, stripe, payment links, app store guidelines, iOS, digital goods,
  in-app purchases, external payments
tag: Tutorial
published: true
locale: ja
---
# StripeペイメントリンクをCapacitorアプリに実装する - 新しいAppleガイドラインに従って

2025年5月1日より、Appleは[Epic v. Apple訴訟](https://storage.courtlistener.com/recap/gov.uscourts.cand.364265/gov.uscourts.cand.364265.1508.0_2.pdf)の判決を受けて、App Store審査ガイドラインに重要な変更を加えました。これらの変更により、米国のアプリ開発者はデジタル商品やサービスの外部決済方法へのリンクを提供することが可能になり、Appleのアプリ内課金システム以外の選択肢が開かれました。

## モバイル決済を永遠に変えたEpicバトル

この瞬間に至るまでの道のりは長く、論争が絶えませんでした。すべては2020年8月、大人気ゲーム「フォートナイト」の開発元であるEpic Gamesが、Appleの30%手数料を回避する直接支払いオプションを実装し、意図的にApp Storeのガイドラインに違反したことから始まりました。AppleはすぐにフォートナイトをApp Storeから削除し、EpicはAppleのiOSアプリ配信とアプリ内決済に対する支配を争う訴訟を起こしました。

何年にもわたる法的闘争、控訴、反控訴を経て、裁判所は最終的にAppleに対し、アプリ外の代替決済方法へユーザーを誘導することを許可するよう命じました。この決定は、2008年の開始以来、同じ基本的な財務モデルで運営されてきたApp Storeエコシステムの経済性を根本的に変えるものです。

### 最終判決 - これ以上の控訴はなし

この判決が特に重要なのは、これが最終的なもので、これ以上控訴できないということです。最高裁判所は2025年初頭にAppleの上告を棄却し、下級裁判所の決定が法として確定しました。これにより、開発者はAppleがさらなる法的異議申し立てを通じてこの決定を覆すことができないという確信を持って、外部決済方法を実装できます。

### 法律により保証される平等な扱い

最も重要なのは、判決が外部決済方法を使用するアプリを差別することをAppleに禁じていることです。裁判所は具体的にAppleに以下を禁止しました：

1. 外部決済方法を使用するアプリに追加料金を課したり、追加要件を課したりすること
2. AppleのIAPシステムを排他的に使用するアプリに検索結果や特集で優遇的な扱いをすること
3. 技術的手段を用いて外部決済体験をApple自身のシステムより劣るものにすること
4. 基本的な消費者情報を超える過度な開示要件を課すこと

これらの明示的な保護により、開発者はAppleからの微妙な報復や差別を恐れることなく、Stripeやその他の外部決済プロバイダーを実装できます。競争の場は法的に平準化され、Appleは決済方法の選択に関係なく、すべてのアプリを平等に扱わなければなりません。

この判決は、Appleのウォールドガーデンアプローチに対する最も重要な挑戦の1つであり、モバイルアプリの収益化がどのように機能するかについての重要な転換点を示しています。Appleの30%手数料（小規模ビジネスの場合15%に引き下げ）について長年不満を持っていた開発者にとって、この判決はより高い利益率と顧客体験へのより大きなコントロールへの道を開くものです。

## Appleのアプリケーション内購入よりもStripeを使用する経済的メリット

この変更による財務上の影響は開発者にとって大きなものです：

- **決済処理手数料の削減**：Appleは通常アプリ内購入に対して30%の手数料（小規模ビジネスの場合15%）を課しますが、Stripeの手数料は取引あたり約2.9% + $0.30のみです。この差は収益率を大幅に向上させる可能性があります。
  
- **より早い支払い**：Appleの場合、通常資金を受け取るまでに45-90日かかります。一方、Stripeは2-3営業日以内に銀行口座に支払いを入金します。

- **簡素化された返金プロセス**：Appleのより複雑な返金システムを通さずに、Stripeのダッシュボードから直接返金を処理できます。

これらのコスト削減と改善されたキャッシュフローは、特に小規模な開発者やビジネスにとってゲームチェンジャーとなる可能性があります。

この記事では、新しいルールを活用するためにCapacitorアプリでStripeペイメントリンクを実装する方法を探りながら、[更新されたガイドライン](https://developer.apple.com/app-store/review/guidelines/#business)への準拠を確保する方法を説明します。

> この実装は[StripeのPayment Linksに関する公式ドキュメント](https://docs.stripe.com/mobile/digital-goods/payment-links)に基づいており、Capacitorアプリ向けに特別に適応されています。

## 新しいガイドラインを理解する

更新されたApp Store審査ガイドラインでは、デジタル商品やサブスクリプションの決済処理のために外部ウェブサイトへユーザーを誘導することが許可されるようになりました。この変更は現在、米国App Storeで配信されるアプリにのみ適用されます。

理解すべき重要なポイント：

1. アプリ内でデジタル商品の外部決済オプションへリンクできるようになりました
2. これは米国App Storeのアプリにのみ適用されます
3. Appleの開示要件には引き続き従う必要があります
4. すべての顧客サポートと返金処理に対する責任は引き続き開発者にあります

## CapacitorアプリでStripeペイメントリンクを設定する

技術的な実装について詳しく見ていきましょう：

### ステップ1：Stripeダッシュボードでペイメントリンクを作成する

まず、Stripeダッシュボードでペイメントリンクを作成します：

1. Stripeダッシュボードのペイメントリンクセクションに移動
2. "＋新規"をクリックして新しいペイメントリンクを作成
3. 商品またはサブスクリプションの詳細を定義
4. "支払い後"設定で"確認ページを表示しない"を選択
5. 成功URLとしてユニバーサルリンクを設定（後で設定します）
6. "リンクを作成"をクリックしてペイメントリンクを生成

### ステップ2：Capacitorアプリでユニバーサルリンクを設定する

支払い完了後にユーザーをアプリに戻すために、ユニバーサルリンクを設定します：

1. ドメインに`apple-app-site-association`ファイルを作成します：

```json
{
  "applinks": {
    "apps": [],
    "details": [
      {
        "appIDs": ["YOURTEAMID.com.yourdomain.yourapp"],
        "components": [
          {
            "/": "/checkout_redirect*",
            "comment": "Matches any URL whose path starts with /checkout_redirect"
          }
        ]
      }
    ]
  }
}
```

2. このファイルを`https://yourdomain.com/.well-known/apple-app-site-association`でホストします

3. 正しいMIMEタイプ`application/json`で提供されていることを確認します

4. 適切なエンタイトルメントを追加してCapacitorアプリがユニバーサルリンクを処理できるように設定します。まず、`capacitor.config.ts`で：

```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  // Your existing app configuration (appId, appName, etc.)
  plugins: {
    Geolocation: {
      // Request precise location access on iOS
      iosLocationAccuracy: 'reduced'
    }
  }
};

export default config;
```

5. Xcodeプロジェクトに関連ドメインエンタイトルメントを追加します：
   - Xcodeプロジェクトを開く
   - アプリターゲットを選択
   - "Signing & Capabilities"に移動
   - "+ Capability"をクリックして"Associated Domains"を選択
   - `applinks:yourdomain.com`を追加

### ステップ3：フォールバックページを作成する

アプリがインストールされていない場合に対応するため、リダイレクトURLにフォールバックページを作成します：

```html
<!DOCTYPE html>
<html>
<head>
  <title>Redirecting...</title>
  <meta http-equiv="refresh" content="0;url=https://yourdomain.com/app-download">
</head>
<body>
  <p>Redirecting to download page...</p>
</body>
</html>
```

### ステップ4：Capacitorアプリに決済ボタンを実装する

次に、アプリに決済ボタンを追加します：

```typescript
import { Capacitor } from '@capacitor/core';

export async function openPaymentLink(userEmail, userId) {
  // Use your actual Stripe payment link
  const baseUrl = 'https://buy.stripe.com/your_payment_link';
  
  // Add URL parameters to customize the experience
  const params = new URLSearchParams({
    prefilled_email: encodeURIComponent(userEmail),
    client_reference_id: userId
  });

  const fullUrl = `${baseUrl}?${params.toString()}`;
  
  // Simple window.open works in both web and Capacitor
  // Using _blank opens in Safari on iOS which is important for users with saved Stripe Link credentials
  window.open(fullUrl, '_blank');
}
```

> **Safariが重要な理由**：ペイメントリンクをアプリ内ブラウザではなくSafari（`window.open`経由）で開くことは、以前にStripe Linkで支払い情報を保存したユーザーが自動的に認証情報を利用できるため有益です。これにより、ユーザーがクレジットカード情報を再入力する必要がない、よりスムーズなチェックアウト体験が作られ、離脱率が大幅に低下します。

### ステップ5：アプリでユニバーサルリンクを処理する

ユーザーが戻ってきたときにユニバーサルリンクを処理するようにアプリを設定します：

1. まず、Appプラグインをインストールします：

```bash
npm install @capacitor/app
```

2. アプリでAppプラグインを登録します：

```typescript
import { App } from '@capacitor/app';

// In your initialization code
App.addListener('appUrlOpen', (event) => {
  // Example URL: https://yourdomain.com/checkout_redirect?session_id=cs_test_...
  const url = new URL(event.url);
  
  if (url.pathname.startsWith('/checkout_redirect')) {
    // Extract any parameters you need
    const params = new URLSearchParams(url.search);
    const sessionId = params.get('session_id');
    
    // Handle successful payment
    if (sessionId) {
      // Verify the payment on your server if needed
      verifyPayment(sessionId);
      
      // Update UI to reflect successful purchase
      updatePurchaseStatus(true);
    }
  }
});

async function verifyPayment(sessionId) {
  // Call your backend to verify the payment
  // This is optional if you're relying on webhooks
}

function updatePurchaseStatus(success) {
  // Update your app UI to reflect purchase status
}
```

### ステップ6：注文履行用のWebhookを設定する

最後に、成功した支払いを処理するためにサーバーにWebhookを設定します：

```javascript
// Using Express.js as an example
const express = require('express');
const stripe = require('stripe')('sk_test_your_stripe_secret_key');
const app = express();

// Use raw body parser for webhook signature verification
app.post('/webhook', express.raw({type: 'application/json'}), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = 'whsec_your_webhook_secret';
  
  let event;
  
  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.log(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  
  // Handle the checkout.session.completed event
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    
    // Retrieve client_reference_id (your user ID)
    const userId = session.client_reference_id;
    
    // Grant access to the purchased content
    await grantAccess(userId, session.id);
  }
  
  res.status(200).send();
});

async function grantAccess(userId, sessionId) {
  // Your logic to grant access to the purchased content
  // This could be updating a database, sending a notification, etc.
}

app.listen(3000, () => console.log('Webhook server running on port 3000'));
```

## Android互換性

はっきりさせましょう：Epic v. Apple訴訟は、モバイル決済の環境を根本的に変えました。これはiOSアプリに直接影響を与えるだけでなく、外部決済方法を使用してきたAndroid開発者の立場も強化します。

**Android開発者は今や完全な自信を持って外部決済ソリューションを実装できます。** Appleの判決で設定された先例は、将来の潜在的な制限から開発者をプラットフォーム全体で効果的に保護します。この裁判所の決定は、多くのAndroid開発者が何年も行ってきたこと - より低い手数料で代替の決済オプションを提供すること - を正当化しました。

GoogleのPlay StoreはAppleよりも外部決済方法に対して制限が少なく、今や法的先例が確立されたことで、AndroidアプリでStripeやその他の外部決済プロバイダーを実装するリスクは事実上ありません。これらの実装を進めるにあたり、法的に確固たる基盤に立っていることを認識できます。

iOSについて説明した実装は、Androidデバイスでもほぼ同じように機能します。Google Play Storeは外部決済方法に対して同様の制限がないため、特別な開示ダイアログを必要とせずに、同じStripeペイメントリンクのアプローチを使用できます。

ディープリンク（iOSのユニバーサルリンクに相当）を処理するには、以下が必要です：

1. リダイレクトURLを処理するために`AndroidManifest.xml`でAppリンクを設定する
2. アプリの詳細を含む`.well-known/assetlinks.json`ファイルをドメインに作成する
3. 成功した支払いを処理するために同じ`appUrlOpen`リスナーロジックを使用する

Capacitorの素晴らしい点は、プラットフォーム固有の設定を実装すれば、実際の決済フローコードは両プラットフォームで同じままということです。

## 決済UIの作成

以下は、Capacitorアプリに追加できるVueでの決済ボタンコンポーネントの例です：

```vue
<template>
  <div class="payment-container">
    <div class="pricing-card">
      <h2 class="mb-4 text-xl font-bold">{{ product.name }}</h2>
      <p class="mb-6 text-gray-600">{{ product.description }}</p>
      <div class="mb-6 price-tag">
        <span class="text-2xl font-bold">${{ product.price }}</span>
        <span v-if="product.isSubscription" class="text-sm text-gray-500">/month</span>
      </div>
      <button 
        @click="handlePayment" 
        class="py-3 w-full font-medium text-white bg-indigo-600 rounded-lg transition-colors hover:bg-indigo-700"
      >
        Purchase Now
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Dialog } from '@capacitor/dialog';

const props = defineProps({
  product: {
    type: Object,
    required: true
  },
  userEmail: {
    type: String,
    default: ''
  },
  userId: {
    type: String,
    required: true
  }
});

const isLoading = ref(false);

async function showExternalPaymentDisclosure() {
  const { value } = await Dialog.confirm({
    title: 'Leaving App for Payment',
    message: 'You are about to leave this app to make a payment. Apple is not responsible for the privacy or security of payments that are not made through the App Store. All payment-related issues, including refunds, must be handled by our support team.',
    okButtonTitle: 'Continue',
    cancelButtonTitle: 'Cancel'
  });
  
  return value;
}

async function openPaymentLink() {
  // Use your actual Stripe payment link
  const baseUrl = 'https://buy.stripe.com/your_payment_link';
  
  // Add URL parameters to customize the experience
  const params = new URLSearchParams({
    prefilled_email: encodeURIComponent(props.userEmail),
    client_reference_id: props.userId
  });

  const fullUrl = `${baseUrl}?${params.toString()}`;
  
  // Simple window.open works in both web and Capacitor
  // Using _blank opens in Safari on iOS which is important for users with saved Stripe Link credentials
  window.open(fullUrl, '_blank');
}

async function handlePayment() {
  isLoading.value = true;
  try {
    // Only show the disclosure on iOS
    if (window.Capacitor?.getPlatform() === 'ios') {
      const userConfirmed = await showExternalPaymentDisclosure();
      if (!userConfirmed) return;
    }
    
    await openPaymentLink();
  } catch (error) {
    console.error('Payment error:', error);
    await Dialog.alert({
      title: 'Payment Error',
      message: 'There was an error initiating the payment. Please try again.'
    });
  } finally {
    isLoading.value = false;
  }
}
</script>
```

## 異なる地域の取り扱い

新しいAppleガイドラインは米国App Storeのアプリにのみ適用されるため、ユーザーの地域を検出し、適切な決済方法を適用する戦略が必要です。以下はIPジオロケーションを使用したより信頼性の高いアプローチです：

```typescript
import { Capacitor } from '@capacitor/core';

async function determinePaymentMethod() {
  // Always use Stripe for Android
  if (Capacitor.getPlatform() !== 'ios') {
    return 'external';
  }
  
  try {
    // Use a geolocation service to determine user's country
    const response = await fetch('https://ipapi.co/json/');
    const locationData = await response.json();
    
    // Check if the user is in the United States
    if (locationData.country_code === 'US') {
      return 'external'; // Can use Stripe Payment Links
    } else {
      return 'iap'; // Must use In-App Purchases
    }
  } catch (error) {
    console.error('Error detecting region:', error);
    return 'iap'; // Default to IAP to be safe
  }
}

export async function processPayment(product, userEmail, userId) {
  const paymentMethod = await determinePaymentMethod();
  
  if (paymentMethod === 'external') {
    // Use Stripe Payment Links
    await initiateExternalPayment(userEmail, userId);
  } else {
    // Use Apple's In-App Purchase
    await initiateInAppPurchase(product.appleProductId);
  }
}
```

このアプローチは、無料の`ipapi.co`サービスを使用してIPアドレスに基づいてユーザーの国を特定します。MaxMindなどの他のジオロケーションサービスを使用することもできますし、セキュリティを高めるためにこのチェックをサーバーサイドで実装することもできます。

> **注意**: このアプローチは機能しますが、IPジオロケーションは必ずしも100%正確ではないことを覚えておくことが重要です。ミッションクリティカルなアプリケーションでは、複数の検出方法を使用するか、ユーザーが手動で地域を選択できるようにすることを検討してください。

### Capacitorプラグインを使用したより正確な位置情報検出

より正確な位置情報検出のために、Capacitor Geolocationプラグインと@capgo/nativegeocoderを使用して、より高精度でユーザーの国を特定することができます：

1. まず、必要なプラグインをインストールします：

```bash
npm install @capacitor/geolocation @capgo/nativegeocoder
```

2. Capacitorプロジェクトでプラグインを設定します。`capacitor.config.ts`に以下を追加してください：

```typescript
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  // Your existing app configuration (appId, appName, etc.)
  plugins: {
    Geolocation: {
      // Request precise location access on iOS
      iosLocationAccuracy: 'reduced'
    }
  }
};

export default config;
```

3. 位置情報ベースの地域検出を実装します：

```typescript
import { Capacitor } from '@capacitor/core';
import { Geolocation } from '@capacitor/geolocation';
import { NativeGeocoder } from '@capgo/nativegeocoder';

async function isUserInUSA() {
  try {
    // Request permission first
    const permissionStatus = await Geolocation.requestPermissions();
    
    if (permissionStatus.location === 'granted') {
      // Get current position
      const position = await Geolocation.getCurrentPosition({
        timeout: 10000,
        enableHighAccuracy: false
      });
      
      // Use NativeGeocoder to reverse geocode the coordinates
      const results = await NativeGeocoder.reverseGeocode({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
        useLocale: true,
        maxResults: 1
      });
      
      if (results.addresses.length > 0) {
        // Check if the user is in the USA
        return results.addresses[0].countryCode === 'US';
      }
    }
    
    // If we couldn't determine location or permission denied, fall back to IP detection
    return await isUserInUSAByIP();
  } catch (error) {
    console.error('Error detecting location:', error);
    // Fall back to IP detection on error
    return await isUserInUSAByIP();
  }
}

async function isUserInUSAByIP() {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    return data.country_code === 'US';
  } catch (error) {
    console.error('Error detecting IP location:', error);
    return false; // Default to false to be safe
  }
}

export async function determinePaymentMethod() {
  // Always use Stripe for Android
  if (Capacitor.getPlatform() !== 'ios') {
    return 'external';
  }
  
  // Check if user is in the USA
  const isUSA = await isUserInUSA();
  return isUSA ? 'external' : 'iap';
}

export async function processPayment(product, userEmail, userId) {
  const paymentMethod = await determinePaymentMethod();
  
  if (paymentMethod === 'external') {
    // Use Stripe Payment Links
    await initiateExternalPayment(userEmail, userId);
  } else {
    // Use Apple's In-App Purchase
    await initiateInAppPurchase(product.appleProductId);
  }
}
```

この実装は、ユーザーが物理的にアメリカ合衆国に所在しているかどうかを判断するより正確な方法を提供します。最初にデバイスのGPSとネイティブジオコーダーを使用して国を特定しようとします。それが失敗した場合（権限の問題やその他のエラーにより）、IPベースの検出にフォールバックします。

`info.plist`（iOS）と`AndroidManifest.xml`（Android）ファイルに必要な権限を追加することを忘れないでください：

iOS（`ios/App/App/Info.plist`）の場合：
```xml
<key>NSLocationWhenInUseUsageDescription</key>
<string>We need your location to determine which payment method to use based on regional availability.</string>
```

Android（`android/app/src/main/AndroidManifest.xml`）の場合：
```xml
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
```

このアプローチを使用することで、新しいAppleのガイドラインの下で外部決済オプションの対象となるユーザーを判断する最も正確な方法が得られます。

## サブスクリプションの管理

Stripeを支払いに使用する主な利点の1つは、サブスクリプションを提供および管理する機能です。以下は、Capacitorアプリでサブスクリプション管理を処理する方法です：

### 1. サブスクリプション管理ページの作成

ユーザーのアクティブなサブスクリプションを表示するサブスクリプション管理ページをアプリに追加します：

```vue
<template>
  <div class="subscription-manager">
    <div v-if="isLoading" class="loading-indicator">
      Loading subscription data...
    </div>
    
    <div v-else-if="subscription" class="subscription-info">
      <h2 class="mb-4 text-xl font-bold">Your Subscription</h2>
      
      <div class="mb-6 plan-details">
        <p><span class="font-medium">Plan:</span> {{ subscription.planName }}</p>
        <p><span class="font-medium">Status:</span> {{ subscription.status }}</p>
        <p><span class="font-medium">Renews:</span> {{ formatDate(subscription.currentPeriodEnd) }}</p>
      </div>
      
      <button 
        @click="manageSubscription" 
        class="py-3 w-full font-medium text-white bg-indigo-600 rounded-lg transition-colors hover:bg-indigo-700"
      >
        Manage Subscription
      </button>
    </div>
    
    <div v-else class="no-subscription">
      <p class="mb-4">You don't have an active subscription.</p>
      <button 
        @click="goToPricingPage" 
        class="py-3 w-full font-medium text-white bg-indigo-600 rounded-lg transition-colors hover:bg-indigo-700"
      >
        View Plans
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getUserSubscription } from '../services/subscription';

const subscription = ref(null);
const isLoading = ref(true);

onMounted(async () => {
  try {
    const userData = await getUserSubscription();
    subscription.value = userData.subscription;
  } catch (error) {
    console.error('Failed to load subscription:', error);
  } finally {
    isLoading.value = false;
  }
});

function formatDate(timestamp) {
  return new Date(timestamp * 1000).toLocaleDateString();
}

function manageSubscription() {
  // Open Stripe Customer Portal
  window.open(subscription.value.portalUrl, '_blank');
}

function goToPricingPage() {
  // Navigate to pricing page
  // router.push('/pricing');
}
</script>
```

### 2. サブスクリプション管理のためのカスタマーポータル

Stripeはユーザーがサブスクリプションを管理できるカスタマーポータルを提供しています。サーバーからこのポータルへのリンクを作成できます：

```javascript
// Server-side code (Node.js)
const stripe = require('stripe')('sk_your_stripe_secret_key');

async function createPortalSession(customerId) {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: 'https://yourdomain.com/account',
  });
  
  return session.url;
}
```

## App Storeコンプライアンスの確保

実装がAppleのガイドラインに準拠していることを確認するために：

1. 外部購入に関する適切な開示を含める
2. アプリを離れることをユーザーに通知するモーダルシート（Appleが要求）を実装する
3. アプリ内で行われた購入に対するAppleのコミッションを回避しようとしない
4. 取引についてAppleが責任を負わないことをユーザーに明確に伝える

以下は、必要な開示モーダルを実装する例です：

```typescript
import { Dialog } from '@capacitor/dialog';

async function showExternalPaymentDisclosure() {
  const { value } = await Dialog.confirm({
    title: 'Leaving App for Payment',
    message: 'You are about to leave this app to make a payment. Apple is not responsible for the privacy or security of payments that are not made through the App Store. All payment-related issues, including refunds, must be handled by our support team.',
    okButtonTitle: 'Continue',
    cancelButtonTitle: 'Cancel'
  });
  
  return value;
}

export async function initiateExternalPayment(userEmail, userId) {
  const userConfirmed = await showExternalPaymentDisclosure();
  
  if (userConfirmed) {
    await openPaymentLink(userEmail, userId);
  }
}
```

## 実装のテスト

実装をテストするには：

1. アプリで支払いボタンをクリックし、開示を表示してからStripe支払いページを開く
2. Stripeのテストカード`4242 4242 4242 4242`を使用してテスト支払いを完了する
3. 支払い後、ユニバーサルリンクを介してアプリに戻されるはずです
4. WebhookがチェックアウトセッションイベントOKを受信したことを確認する

## 結論

iOSアプリでデジタル商品に外部決済オプションを使用できる機能は、開発者により多くの柔軟性を与える重要な変更です。この変更は現在、米国App Storeのアプリにのみ適用されますが、Appleのアプリ内購入システムに代わる重要な選択肢を提供します。

CapacitorでStripe Payment Linksを使用することで、Appleのガイドラインに準拠しながら、合理化されたチェックアウト体験を素早く実装できます。このアプローチは、Stripeの堅牢な決済インフラストラクチャ、より低い処理手数料（30%ではなく3%）、そしてAppleのアプリ内購入システムと比較してはるかに早い支払い（数ヶ月ではなく数日）という利点も提供します。

これらの取引はAppleのエコシステム外で行われるため、カスタマーサポートと返金の問題はすべて直接処理する必要があることを忘れないでください。

あなたのCapacitorアプリでStripe Payment Linksを実装しましたか？以下のコメントで経験を共有してください！

## よくある質問

**Q: このアプローチはAppleのガイドラインに準拠していますか？**  
A: はい、2025年5月1日以降、必要な開示を含める限り、米国App Storeで配信されるアプリでデジタル商品やサービスの外部決済方法へのリンクが許可されています。

**Q: 外部決済方法を使用する場合、Appleのコミッションを支払う必要がありますか？**  
A: いいえ、新しいルールの主な利点の1つは、Appleのシステム外で処理される支払いにはコミッションが適用されないことです。

**Q: これらの新しいルールを利用するには、会社が米国を拠点とする必要がありますか？**  
A: いいえ、アプリが米国App Storeで利用可能で、購入を行うユーザーが米国に所在している限り、世界中のどの会社でも外部決済方法を実装できます。この規則は、会社の所在地ではなく、マーケットプレイス（米国App Store）とユーザーの所在地に適用されます。これは、ヨーロッパ、アジア、南米、またはその他の地域の開発者が米国のユーザー向けにStripe Payment Linksを実装できることを意味します。

**Q: 米国外のユーザーが外部決済オプションを使用しようとした場合はどうなりますか？**  
A: （記事で示したように）地域検出を実装して、米国のユーザーにのみ外部決済オプションを提供する必要があります。他の地域では、引き続きAppleのアプリ内購入システムを使用する必要があります。

**Q: 物理的な商品やアプリ外で消費されるサービスにこれを使用できますか？**  
A: はい、Appleは常に物理的な商品やアプリ外で消費されるサービス（配車サービスやフードデリバリーなど）の外部決済方法を許可してきました。
