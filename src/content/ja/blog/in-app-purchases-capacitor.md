---
slug: in-app-purchases-capacitor
title: Capacitorのアプリ内購入
description: Capacitor PurchasesプラグインとRevenueCatを使用して、Capacitorアプリでアプリ内課金を実装する方法。
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-01-19T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /revenuecat_iap.webp
head_image_alt: アプリ内購入によるRevenue Catは収益を生み出します。
tag: Tutorial
published: true
locale: ja
next_blog: ''
---

カパシタ購入は、iOSおよびAndroidのアプリ内購入を可能にするCapacitorフレームワーク用のプラグインです。複数のプラットフォームにわたるシンプルで一貫したAPIを提供し、開発者がモバイルアプリにアプリ内サブスクリプションと購入を実装するのを容易にします。

Capacitor Purchasesプラグインの主な機能の一つは、アプリ内サブスクリプションと購入のためのツールを提供するプラットフォームであるRevenueCatと統合されていることです。RevenueCatは、複数のプラットフォームにわたるシンプルで一貫したAPIを提供することで、アプリ内サブスクリプションと購入の実装プロセスを簡素化し、レシートの検証やユーザー管理などのタスクを自動化します。

RevenueCatを使用することで、開発者は簡単にサブスクリプションを管理し、収益を追跡し、関連する他のタスクを実行できます。RevenueCatが提供する機能には以下が含まれます：

- 自動レシート検証
- ユーザー管理
- カスタム価格モデルのサポート
- 詳細な分析
- スケーラビリティ

Capacitor PurchasesプラグインとRevenueCatを使用することで、開発者はモバイルアプリにおけるアプリ内サブスクリプションと購入を実装する際に時間と労力を節約でき、ユーザーエクスペリエンスを向上させ収益を増やすための追加機能を提供できます。

Capacitor PurchasesプラグインとRevenueCatを使用することで、開発者はアプリ内サブスクリプションと購入を簡単に管理および追跡し、レシートを検証し、複数のプラットフォーム間でユーザーを管理できます。また、カスタム価格モデルを作成し、パフォーマンスと収益を向上させるための詳細な分析を得ることもできます。

## インストール

CapacitorとCapacitor Purchasesプラグインの最新バージョンを使用してください。CapacitorとCapacitor Purchasesプラグインの最新バージョンはCapacitorのウェブサイトで確認できます。

Capacitor Purchasesプラグインをインストールするには、以下のコマンドを実行します：
`npm i @capgo/capacitor-purchases`
プラグインをアプリのネイティブコードに追加します。
`npx cap sync`

Xcodeでアプリ内購入の機能を追加します：

![Xcodeステップ1](/iap_step1webp)
その後
![Xcodeステップ2](/iap_step2webp)

## 1 RevenueCatアカウントを作成

このガイドでは、少しのコードでサブスクリプションとRevenueCatのSDKを使い始める方法を説明します。

こちらから新しいRevenueCatアカウントにサインアップしてください：[こちら](https://apprevenuecatcom/)

> ### 📘
> 
> 💡 ヒント！
> 
> RevenueCatは、アプリを販売する意図がある場合、各アプリ/プロジェクトごとに別々のRevenueCatアカウントを作成することを推奨しています。これは、個別のプロジェクトを転送するのを待つのではなく、アカウント全体を転送できるため、転送プロセスを迅速にします。

### 組織 / エンタープライズ

RevenueCatに登録し、プロジェクト内にアプリを設定する際は、会社アカウントの使用を推奨します。チームの他のメンバーをプロジェクトの[コラボレーター](https://wwwrevenuecatcom/docs/collaborators/)として招待できますが、**請求を管理できるのはプロジェクトのオーナーのみ**です。プロジェクトのコラボレーターは請求の詳細を管理できません。

## 2 プロジェクトおよびアプリの設定

### ▶️ プロジェクトを作成

RevenueCatのダッシュボードに移動し、上部のナビゲーションメニューの「プロジェクト」から[新しいプロジェクトを追加](https://apprevenuecatcom/overview/)します。

![RevenueCatステップ1](/revenuecat_step1webp)

新しいプロジェクトを作成するためのポップアップモーダル

### ▶️ アプリ/プラットフォームを追加

プロジェクトダッシュボードの左メニューの**プロジェクト設定 > アプリ**から、追加するアプリのプラットフォームを選択します。

![RevenueCatステップ2](/revenuecat_step2webp)

アプリプラットフォームを選択するためのプロジェクトダッシュボード

**アプリ名**フィールドは、RevenueCatにアプリを追加するために必須です。そのほかの設定フィールドは後で追加できます。テストおよび本番購入を行うために、バンドルID（iOS）/パッケージ名（Android）や、共有シークレット（iOS）/サービス資格情報（Android）を設定する必要があります。

![RevenueCatステップ3](/revenuecat_step3)webp)

Apple App Storeアプリのアプリ設定ページ

> ### 📘
> 
> 💡 ヒントを紹介します!
> 
> アプリを登録した後、RevenueCatは[プラットフォームサーバーノーティフィケーション](https://wwwrevenuecatcom/docs/server-notifications/)の設定を推奨します。これらの通知は必須ではありませんが、[ウェブフック](https://wwwrevenuecatcom/docs/webhooks/)や統合の配信時間を短縮し、購読者の更新の遅延時間を減少させるのに役立ちます。

> ### 📘
> 
> ステージングとプロダクションのアプリとユーザー
> 
> RevenueCat自体にはステージングおよびプロダクション用の別の環境はありません。ユーザーの根本的なトランザクションは、サンドボックスとプロダクションによって区別されています。
> 
> どのRevenueCatアプリでも、ストアからサンドボックス購入とプロダクション購入の両方を行うことができます。ステージングとプロダクション用に別々のアプリを持っている場合は、RevenueCat内であなたのセットアップを反映する複数のプロジェクトを作成できます。
> 
> さらに、ユーザーは環境によって分離されているわけではありません。同じユーザーが同時にアクティブなサンドボックス購入とアクティブなプロダクション購入を持つことができます。

### ▶️ サービス認証情報

RevenueCatがあなたの代わりにアプリストアと通信するためにサービス認証情報を設定する必要があります。詳細については、RevenueCatガイドの[App Store Connect Shared Secret](https://wwwrevenuecatcom/docs/itunesconnect-app-specific-shared-secret/)、[Play Service Credentials](https://wwwrevenuecatcom/docs/creating-play-service-credentials/)、および[Amazon Appstore Shared Secret](https://wwwrevenuecatcom/docs/service-credentials/amazon-appstore-credentials/)を参照してください。

プレスサービスの認証情報がGoogleのサーバー全体に広がるまでに最大36時間かかる場合があることに注意してください。

## 3 製品設定

### ▶️ ストア設定

RevenueCatを使用して製品を取得する前に、各ストアで製品を設定する必要があります。次のガイドを参照して、[App Store Connect](https://wwwrevenuecatcom/docs/ios-products/)、[Google Play Console](https://wwwrevenuecatcom/docs/android-products/)、[Amazon Appstore](https://wwwrevenuecatcom/docs/amazon-product-setup/)、および[Stripe](https://wwwrevenuecatcom/docs/stripe-products/)の設定をナビゲートするのに役立ちます。

iOS製品を販売する場合は、必ず「Paid Applications Agreement」に署名し、**App Store Connect > Agreements, Tax, and Banking**で銀行口座および税情報を記入してください。**これは、購入のテストを行う前に完了する必要があります。**

> ### 📘
> 
> テスト中にストア設定をスキップしたいですか？
> 
> iOSでは、StoreKit Configurationファイルを使用してテストすることにより、App Store Connectでの製品の設定を遅延させることができます。これらの設定ファイルは最小限の設定が必要で、Xcodeを通じて直接設定可能です。
> 
> RevenueCatの[Sandbox Testing](https://wwwrevenuecatcom/docs/apple-app-store/#ios-14-only-testing-on-the-simulator)ガイドでStoreKit Configurationファイルの設定方法について詳しく読むことができます。

### ▶️ RevenueCatでの製品および特典の設定

In-app製品が[App Store Connect](https://wwwrevenuecatcom/docs/ios-products/)、[Google Play Console](https://wwwrevenuecatcom/docs/android-products/)、[Amazon Appstore](https://wwwrevenuecatcom/docs/amazon-product-setup/)、または[Stripe](https://wwwrevenuecatcom/docs/stripe-products/)で設定されたら、その設定をRevenueCatダッシュボードにコピーする必要があります。RevenueCatは、エンタイトルメントシステムを使用してプレミアム機能へのアクセスを制御し、オファリングを使用して顧客に提供する製品のセットを管理します。

特典は、顧客が特定の製品を購入した後に「権利」を持つアクセスレベルです。
オファリングは、あなたがペイウォールで「提供したい」in-app製品を整理し、リモートで設定する簡単な方法です。RevenueCatは、これらの機能を活用してコードを簡素化し、アプリのアップデートをリリースせずに製品を変更できるようにすることを**推奨**します。

製品を設定し、それをオファリングまたは特典に整理するには、[製品の設定](https://wwwrevenuecatcom/docs/entitlements/)を参照してください。

![RevenueCat step 4](/revenuecat_step4webp)

## 4RevenueCatの購入SDKを使用する

RevenueCat SDKは、プラットフォーム間での購入とサブスクリプションをシームレスに実装し、RevenueCatサーバーとトークンを同期します。

SDKに問題が発生した場合は、ガイダンスのために[SDKのトラブルシューティング](https://wwwrevenuecatcom/docs/troubleshooting-the-sdks/)を参照してください。

> ### 📘
> 
> 購入を設定するために公開SDKキーのみを使用してください。
> 
> 公開SDKキーは、ダッシュボードの**プロジェクト設定**の**APIキー**タブから取得できます。

_Purchases_の共有インスタンスは通常アプリ起動時に1回だけ設定する必要があります。その後は、SDK内の`shared`インスタンスにアクセスすることで、アプリ全体で同じインスタンスが共有されます。

SDKの設定に関する詳細やベストプラクティスについては、RevenueCatガイドの[SDKの設定](https://docsrevenuecatcom/docs/configuring-sdk/)を参照してください。

_Purchases_を公開SDKキーのみで設定するようにしてください。RevenueCatの[認証ガイド](https://wwwrevenuecatcom/docs/authentication/)で利用可能な異なるAPIキーについての詳細を読んでください。

```javascript
import { CapacitorPurchases } from '@capgo/capacitor-purchases'
import { isPlatform } from '@ionic/vue' // use the right one for your framework

CapacitorPurchases.setDebugLogsEnabled({ enabled: import.meta.env.DEV }) // Enable to get debug logs in dev mode
if (isPlatform('ios')) {
    CapacitorPurchases.setup({ apiKey:'appl_******'})
} else if (isPlatform('android')) {
    CapacitorPurchases.setup({ apiKey:'goog_******'})
}
```

開発中は、RevenueCatはより詳細なデバッグログを有効にすることを推奨します。これらのログについての詳細は、[デバッグガイド](https://wwwrevenuecatcom/docs/debugging/)を参照してください。

既存の購入コードとともにRevenueCatを使用する予定がある場合は、[オブザーバーモード](https://wwwrevenuecatcom/docs/observer-mode/)のガイドを参照してください。

> ### 📘
> 
> ユーザーIDでの購入の設定
> 
> アプリにユーザー認証システムがある場合は、設定時にユーザー識別子を提供することも、後で`logIn()`を呼び出すことで提供することもできます。詳細については、RevenueCatガイドの[ユーザーの識別](https://wwwrevenuecatcom/docs/user-ids/)を確認してください。

SDKは自動的に[設定されたオファリング](https://wwwrevenuecatcom/docs/entitlements/#offerings)を取得し、Apple、Google、またはAmazonから製品情報を取得します。これにより、顧客が購入画面を起動した際に、利用可能な製品はすでに読み込まれています。

以下はオファリングを取得する例です。オファリングを利用してペイウォール画面を整理できます。詳細やベストプラクティスについては、RevenueCatガイドの[製品の表示](https://wwwrevenuecatcom/docs/displaying-products/)を参照してください。

### ▶️ 利用可能な製品を取得して表示

> ### 📘
> 
> ユーザーIDでの購入の設定
> 
> アプリにユーザー認証システムがある場合は、設定時にユーザー識別子を提供することも、後で`logIn()`を呼び出すことで提供することもできます。詳細については、RevenueCatガイドの[ユーザーの識別](https://wwwrevenuecatcom/docs/user-ids/)を確認してください。

SDKは自動的に[設定されたオファリング](https://wwwrevenuecatcom/docs/entitlements/#offerings)を取得し、Apple、Google、またはAmazonから製品情報を取得します。これにより、顧客が購入画面を起動した際に、利用可能な製品はすでに読み込まれています。

以下はオファリングを取得する例です。オファリングを利用してペイウォール画面を整理できます。詳細やベストプラクティスについては、RevenueCatガイドの[製品の表示](https://wwwrevenuecatcom/docs/displaying-products/)を参照してください。

```javascript
const { offerings } = await CapacitorPurchases.getOfferings()
if (offerings.current !== null) {  
    // Display current offering with offerings.current
}
```

[オファリング](https://wwwrevenuecatcom/docs/entitlements/#offerings)、[製品](https://wwwrevenuecatcom/docs/entitlements/#products)、または利用可能な[パッケージ](https://wwwrevenuecatcom/docs/entitlements/#adding-packages)の取得が空の場合、それはそれぞれのストアにおける設定の問題が原因です。

App Store Connectでこれが発生する最も一般的な理由は、古い「有料アプリケーション契約」や、製品が少なくとも「提出準備完了」の状態にないことです。Google Playでは、通常アプリがクローズドトラックで公開されていない場合や、有効なテストユーザーが追加されていない場合に発生します。

この問題のトラブルシューティングに関する詳細は、RevenueCatの[ヘルプセンター](https://supportrevenuecatcom/hc/en-us/articles/360041793174/)を参照してください。

### ▶️ 購入を行う

SDKには購入を促進するためのシンプルなメソッドが含まれています。`purchase:package`は、取得したオファリングからパッケージを取り出し、各アプリストアでトランザクションを処理します。

以下のコードサンプルは、パッケージを購入し、「your_entitlement_id」コンテンツが解除されることを確認するプロセスを示しています。`purchase:package`メソッドの詳細は、RevenueCatの[購入の作成](https://wwwrevenuecatcom/docs/making-purchases/)ガイドにあります。

```typescript
const purchase = async (p: Package): Promise<PurchaserInfo | null> => {
  try {
    // console.log('purchase', p)
    const data = await CapacitorPurchases.purchasePackage({
      identifier: p.identifier,
      offeringIdentifier: p.offeringIdentifier,
    })
    const purchaserInfo = data.purchaserInfo
    // console.log('listenBuy', purchaserInfo)
    if (purchaserInfo.activeSubscriptions.includes(p.identifier)) {
      // set the user as paid
    }
    return purchaserInfo
  }
  catch (e) {
    console.error('listenBuy error', e)
  }
  return null
}
```

### ▶️ サブスクリプションステータスの確認

最新のステータスを取得する必要があるときは、このメソッドを使用できます。このメソッドはアプリのライフサイクルを通じて安全に繰り返し呼び出せます。_Purchases_は、更新されるたびに最新の`CustomerInfo`を自動的にキャッシュします。したがって、ほとんどの場合、このメソッドはキャッシュからデータを取得し、非常に高速に実行されます。

このメソッドは、ユーザーに表示するUIを決定するときや、特定のエンタイトルメントレベルを必要とするアクションをユーザーが実行するときによく呼び出されます。

> ### 📘
> 
> 💡 ヒントです！
> 
> サブスクリプションに関する情報は、アクティブかどうかだけではなく、もっと多くの情報にアクセスできます。サブスクリプションが更新される設定になっているか、ユーザーのクレジットカードで問題が検出されているかどうかなど、詳細についてはRevenueCatの[サブスクリプションステータス](https://wwwrevenuecatcom/docs/customer-info/)ガイドをご覧ください。

RevenueCatは、ユーザーがアプリ内購入を復元できるようにし、**同じストアアカウント**（Apple、Google、またはAmazonアカウント）から以前に購入したコンテンツを再アクティブ化します。すべてのアプリには、ユーザーが復元メソッドをトリガーできる方法があることを推奨します。ユーザーが購入へのアクセスを失った場合（例：アプリのアンインストール/再インストール、アカウント情報の喪失など）、Appleは復元メカニズムを要求します。

```javascript
  const res = await CapacitorPurchases.restoreTransactions()
  const purchaserInfo = res.purchaserInfo
  const ids: string[] = [] // extract active subscriptions ids
  purchaserInfo.activeSubscriptions.forEach((id) => {
    ids.push(id)
  })

```

異なる[App User ID](https://wwwrevenuecatcom/docs/user-ids/)が同じストアアカウント（Apple、Google、またはAmazonアカウント）からトランザクションを復元する場合、RevenueCatは2つのApp User IDの間でエイリアスを作成し、今後同じユーザーとしてカウントすることがあります。復元動作の異なる構成可能な動作に関する詳細は、RevenueCatの[購入の復元](https://wwwrevenuecatcom/docs/restoring-purchases/)ガイドをご覧ください。

SDKは、任意のプラットフォームでシームレスに機能するため、ユーザーの購入情報がさまざまなソースから変更される場合があります。任意の`CustomerInfo`の変更に対して応答するには、オプショナルデリゲートメソッド`purchases:receivedUpdated:`に準拠することができます。

このメソッドは、SDKが`getCustomerInfo()`、`purchase(package:)`、`purchase(product:)`、または`restorePurchases()`を呼び出した際に更新された`CustomerInfo`オブジェクトを受信するたびに発火します。

CustomerInfoの更新は、RevenueCatバックエンドからアプリにプッシュされることはなく、更新は上記のようにRevenueCatへのアウトバウンドネットワークリクエストからのみ行われます。

アプリによっては、デリゲートを無視し、次回アプリが起動されたときやSDKメソッドの完了ブロックで顧客情報の変更を処理するだけで十分な場合があります。

```javascript
CapacitorPurchases.addListener('purchasesUpdate', (data) => {
  console.log('purchasesUpdate', data)
})
```

> ### 👍
> 
> やりましたね！
> 
> サーバーコードを書くのに1カ月費やすことなく、完全なサブスクリプション購入システムを実装しました。おめでとうございます！

### サンプルアプリ

SDKの統合のより完全な例をダウンロードするには、RevenueCatのサンプルアプリリソースをご覧ください。

**[サンプルを見る](https://wwwrevenuecatcom/docs/sample-apps/)**

今後、CapacitorとVuejsを使用したサンプルアプリを公開予定です。

Capacitor SDKの深い使用を移動する必要がある場合は、[こちらのドキュメンテーション](https://githubcom/Cap-go/capacitor-purchases/)を確認してください。

### 次のステップ
\
- まだの場合は、RevenueCatの[エンタイトルメントに関するガイド](https://wwwrevenuecatcom/docs/entitlements/)をチェックして、製品が正しく構成されていることを確認してください。
- 独自のユーザー識別子を使用したい場合は、[アプリユーザーIDの設定について](https://wwwrevenuecatcom/docs/user-ids/)お読みください。
- 他のシステムからRevenueCatに移行する場合、RevenueCatの[既存のサブスクリプションの移行に関するガイド](https://wwwrevenuecat)を参照してください。com/docs/migrating-existing-subscriptions/)
- 統合のテストの準備ができたら、RevenueCatの[テストとデバッグに関するガイド](https://wwwrevenuecatcom/docs/debugging/)を参照してください。
- App Storeの小規模ビジネスプログラムに該当する場合、RevenueCatの[申請方法とRevenueCatに通知する方法](https://wwwrevenuecatcom/docs/app-store-small-business-program/)に関するガイドを確認してください。

アプリでライブアップデートが必要な場合

こちらから参加してください👇

## アカウントを取得するにはこちらに登録してください

[Capgo](/register/)