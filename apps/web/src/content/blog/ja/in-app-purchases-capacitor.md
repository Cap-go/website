---
slug: in-app-purchases-capacitor
title: Capacitorのアプリ内購入
description: Capacitorアプリ向けにCapacitor PurchasesプラグインとRevenueCatを使用してアプリ内購入を実装する方法
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-01-19T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /revenuecat_iap.webp
head_image_alt: RevenueCatのアプリ内購入
keywords: >-
  Capacitor, in-app purchases, RevenueCat, mobile app development, live updates,
  OTA updates, continuous integration, mobile app updates
tag: Tutorial
published: true
locale: ja
next_blog: ''
---
>> このプラグインは現在、RevenueCatの公式リポジトリに移管されました。詳細については[公式ドキュメント](https://www.revenuecat.com/docs/getting-started/installation/capacitor)をご覧ください。

Capacitor Purchasesは、iOSとAndroidのアプリ内購入を可能にするCapacitorフレームワークのプラグインです。複数のプラットフォームで一貫した簡単なAPIを提供し、開発者がモバイルアプリにアプリ内サブスクリプションや購入を実装する際の手間を軽減します。

Capacitor Purchasesプラグインの主な機能の1つは、アプリ内サブスクリプションや購入のためのツールを提供するプラットフォームであるRevenueCatとの統合です。RevenueCatは、複数のプラットフォームにわたる一貫したAPIを提供し、領収書の検証やユーザー管理などのタスクを自動化することで、アプリ内サブスクリプションや購入の実装プロセスを簡素化します。

RevenueCatを使用することで、開発者はサブスクリプションの管理、収益追跡、その他関連タスクを簡単に行うことができます。RevenueCatが提供する機能には以下が含まれます：

- 自動領収書検証
- ユーザー管理
- カスタム価格モデルのサポート
- 詳細な分析
- 拡張性

Capacitor PurchasesプラグインとRevenueCatを使用することで、開発者はモバイルアプリ内でのアプリ内サブスクリプションや購入の実装時に時間と労力を節約でき、ユーザー体験を向上させ収益を増加させるための追加機能を提供できます。

Capacitor PurchasesプラグインとRevenueCatを使用すると、開発者はアプリ内サブスクリプションや購入を簡単に管理・追跡し、領収書を検証し、複数のプラットフォームでユーザーを管理できます。また、カスタム価格モデルを作成し、パフォーマンスや収益を向上させるための詳細な分析を取得できます。

## インストール

最新のCapacitorとCapacitor Purchasesプラグインのバージョンを使用してください。CapacitorとCapacitor Purchasesプラグインの最新バージョンはCapacitorのウェブサイトで確認できます。

Capacitor Purchasesプラグインをインストールするには、以下のコマンドを実行します：
`npm i @capgo/capacitor-purchases`
プラグインをアプリのネイティブコードに追加します
`npx cap sync`

Xcodeでアプリ内購入の機能を追加します：

![Xcode step 1](/iap_step1.webp)
その後
![xcode step 2](/iap_step2.webp)

## 1. RevenueCatアカウントを作成する
このガイドでは、数行のコードでサブスクリプションとRevenueCatのSDKを使用する方法を説明します。

新しいRevenueCatアカウントに[こちら](https://app.revenuecat.com/)からサインアップしてください。

> ### 📘
> 
> 💡 おすすめのヒント！
> 
> RevenueCatは、アプリを販売する意図がある場合、各アプリまたはプロジェクトごとに別々のRevenueCatアカウントを作成することを推奨しています。これにより、RevenueCatサポートが個々のプロジェクトを転送するのを待つよりも、アカウント全体を転送することで転送プロセスが速くなります。

### 組織 / 企業

RevenueCatに登録する際は、会社アカウントの使用をお勧めします。また、プロジェクト内でアプリを設定することができます。あなたのチームの他のメンバーを[共同作業者](https://www.revenuecat.com/docs/collaborators/)としてプロジェクトに招待できますが、**請求の管理はプロジェクトの所有者のみ**が行えます。プロジェクトの共同作業者は請求の詳細を管理できません。

## 2. プロジェクトとアプリの設定

### ▶️ プロジェクトを作成する

RevenueCatのダッシュボードに移動し、上部のナビゲーションメニューの「プロジェクト」から[新しいプロジェクトを追加](https://app.revenuecat.com/overview/)します。

![RevenueCat step 1](/revenuecat_step1.webp)

新しいプロジェクトを作成するためのポップアップモーダル

### ▶️ アプリ / プラットフォームを追加する

プロジェクトダッシュボードの左側のメニューの「プロジェクト設定 > アプリ」から、追加するアプリのプラットフォームを選択します。

![RevenueCat step 2](/revenuecat_step2.webp)

アプリプラットフォームを選択するためのプロジェクトダッシュボード

「アプリ名」フィールドは、RevenueCatにアプリを追加するために必須です。その他の設定フィールドは後で追加できます。テストおよび本番の購入を行うためには、Bundle ID（iOS） / Package Name（Android）およびShared Secret（iOS） / Service Credentials（Android）を設定する必要があります。

![RevenueCat step 3](/revenuecat_step3.webp)

Apple App Storeアプリの設定ページ

> ### 📘
> 
> 💡 おすすめのヒント！
> 
> アプリを登録した後は、[プラットフォームサーバーノーティフィケーション](https://www.revenuecat.com/docs/server-notifications/)の設定を行うことをRevenueCatは推奨しています。これらの通知は必須ではありませんが、[Webhooks](https://www.revenuecat.com/docs/webhooks/)や統合の配信時間を短縮し、サブスクライバーの更新のラグを減少させます。

> ### 📘
> 
> ステージングと本番のアプリおよびユーザー
> 
> RevenueCat自体はステージングおよび本番用の環境は持っていません。むしろ、ユーザーの基盤となるトランザクションはサンドボックスと本番によって区別されます。
> 
> どのRevenueCatアプリも、店舗からサンドボックスおよび本番の購入を行うことができます。ステージングと本番用に別々のアプリを持っている場合は、RevenueCatで複数のプロジェクトを作成して設定を反映させることができます。
> 
> さらに、ユーザーも環境によって分離されません。同じユーザーが同時にアクティブなサンドボックス購入とアクティブな本番購入を持つことができます。

### ▶️ サービス認証情報

RevenueCatがアプリストアと連携するためにはサービス認証情報を設定する必要があります。詳細についてはRevenueCatガイドの[App Store Connect Shared Secret](https://www.revenuecat.com/docs/itunesconnect-app-specific-shared-secret/)、[Play Service Credentials](https://www.revenuecat.com/docs/creating-play-service-credentials/)、および[Amazon Appstore Shared Secret](https://www.revenuecat.com/docs/service-credentials/amazon-appstore-credentials/)をご覧ください。

Playサービスの認証情報は、Googleのサーバー全体に伝播するのに最大36時間かかる場合があります。

## 3. 製品の設定

### ▶️ ストアの設定

RevenueCatを使用して製品を取得する前に、各ストアで製品を設定する必要があります。次のガイドを参照してください：[App Store Connect](https://www.revenuecat.com/docs/ios-products/)、[Google Play Console](https://www.revenuecat.com/docs/android-products/)、[Amazon Appstore](https://www.revenuecat.com/docs/amazon-product-setup/)、および[Stripe](https://www.revenuecat.com/docs/stripe-products/)でこのプロセスをナビゲートします。

iOS製品を販売する場合は、必ず「Paid Applications Agreement」にサインし、**App Store Connect > Agreements, Tax, and Banking**で銀行および税情報を記入してください。**これが完了しないと、いかなる購入もテストできません。**

> ### 📘
> 
> テスト中にストアの設定をスキップしたいですか？
> 
> iOSでは、StoreKit Configurationファイルを使用してテストを行うことでApp Store Connectでの製品設定を遅らせることができます。これらの設定ファイルは最小限の設定で済み、Xcodeから直接設定できます。
> 
> StoreKit Configurationファイルの設定についてはRevenueCatの[Sandbox Testing](https://www.revenuecat.com/docs/apple-app-store/#ios-14-only-testing-on-the-simulator)ガイドで詳しく読むことができます。

### ▶️ RevenueCatでの製品と特権の設定

あなたのアプリ内製品が[App Store Connect](https://www.revenuecat.com/docs/ios-products/)、[Google Play Console](https://www.revenuecat.com/docs/android-products/)、[Amazon Appstore](https://www.revenuecat.com/docs/amazon-product-setup/)、または[Stripe](https://www.revenuecat.com/docs/stripe-products/)で設定されたら、その設定をRevenueCatのダッシュボードにコピーする必要があります。RevenueCatは、特権システムを使用してプレミアム機能へのアクセスを制御し、Offeringsを使用して顧客に提供する製品のセットを管理します。

特権は、特定の製品を購入することで顧客が「権利を持つ」アクセスレベルです。
Offeringsは、あなたが支払いの壁で「提供」したいアプリ内製品を整理し、リモートでそれらを構成する簡単な方法です。RevenueCatは、コードを簡素化し、アプリの更新を行うことなく製品を変更できるように、これらの機能の活用を**推奨**しています。

[製品の設定](https://www.revenuecat.com/docs/entitlements/)を参照して、製品を設定し、その後Offeringsや特権に整理します。

![RevenueCat step 4](/revenuecat_step4.webp)

## 4. RevenueCatのPurchases SDKの使用

RevenueCat SDKは、プラットフォーム間での購入とサブスクリプションをシームレスに実装し、RevenueCatサーバーとのトークンを同期します。

SDKに問題が発生した場合は、[SDKのトラブルシューティング](https://www.revenuecat.com/docs/troubleshooting-the-sdks/)を参照してください。

> ### 📘
> 
> Purchasesを設定する際は、公開SDKキーのみを使用してください。
> 
> ダッシュボードの「プロジェクト設定」内の「APIキー」タブから公開SDKキーを取得できます。

一般的に、_Purchases_の共有インスタンスはアプリ起動時に1回だけ設定してください。その後、同じインスタンスはSDKの`.shared`インスタンスを介してアプリ全体で共有されます。

SDKの[設定について](https://docs.revenuecat.com/docs/configuring-sdk/)は、詳細情報とベストプラクティスを参照してください。

_Purchases_は公開SDKキーでのみ設定してください。RevenueCatの[認証ガイド](https://www.revenuecat.com/docs/authentication/)で利用可能な異なるAPIキーについて詳しく読むことができます。

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

開発中は、RevenueCatはより詳細なデバッグログを有効にすることを推奨しています。これらのログに関する詳細については、彼らの[デバッグ](https://www.revenuecat.com/docs/debugging/)ガイドをご覧ください。

RevenueCatを既存の購入コードとともに使用する予定がある場合は、[Observer Mode](https://www.revenuecat.com/docs/observer-mode/)に関するガイドを参照してください。

> ### 📘
> 
> ユーザーIDでのPurchasesの設定
> 
> アプリにユーザー認証システムがある場合は、設定時または後日 `.logIn()` を呼び出すことでユーザー識別子を提供できます。詳細を知りたい場合は、RevenueCatガイドの[ユーザーの識別](https://www.revenuecat.com/docs/user-ids/)をチェックしてください。

SDKは自動的に[設定されたオファリング](https://www.revenuecat.com/docs/entitlements/#offerings)を取得し、Apple、Google、またはAmazonから商品情報を取得します。したがって、顧客が購入画面を起動したときには、利用可能な商品がすでに読み込まれています。

以下はオファリングを取得する例です。オファリングを利用して、ペイウォール画面を整理できます。詳細やベストプラクティスについては、RevenueCatガイドの[商品を表示する](https://www.revenuecat.com/docs/displaying-products/)をご覧ください。

### ▶️ 利用可能な商品の取得と表示

> ### 📘
> 
> ユーザーIDでの購入の設定
> 
> アプリにユーザー認証システムがある場合、設定時または後で`.logIn()`の呼び出しでユーザー識別子を提供できます。詳細については、RevenueCatガイドの[ユーザーを識別する](https://www.revenuecat.com/docs/user-ids/)をご覧ください。

SDKは自動的に[設定されたオファリング](https://www.revenuecat.com/docs/entitlements/#offerings)を取得し、Apple、Google、またはAmazonから商品情報を取得します。したがって、顧客が購入画面を起動したときには、利用可能な商品がすでに読み込まれています。

以下はオファリングを取得する例です。オファリングを利用して、ペイウォール画面を整理できます。詳細やベストプラクティスについては、RevenueCatガイドの[商品を表示する](https://www.revenuecat.com/docs/displaying-products/)をご覧ください。

```javascript
const { offerings } = await CapacitorPurchases.getOfferings()
if (offerings.current !== null) {  
    // Display current offering with offerings.current
}
```

[オファリング](https://www.revenuecat.com/docs/entitlements/#offerings)、[商品](https://www.revenuecat.com/docs/entitlements/#products)、または利用可能な[パッケージ](https://www.revenuecat.com/docs/entitlements/#adding-packages)が空である場合、これはそれぞれのストアでの設定の問題によるものです。

App Store Connectでの最も一般的な理由は、古い「有料アプリケーション契約」や、商品が「送信準備完了」状態にないことです。Google Playでは、アプリがクローズドトラックに公開されておらず、有効なテストユーザーが追加されていない場合に通常この問題が発生します。

この問題のトラブルシューティングに関する詳細は、RevenueCatの[ヘルプセンター](https://support.revenuecat.com/hc/en-us/articles/360041793174/)をご覧ください。

### ▶️ 購入を行う

SDKには、購入を促進するための簡単なメソッドが含まれています。`purchase:package`は取得したオファリングからパッケージを取り、該当するアプリストアでトランザクションを処理します。

以下のコードサンプルは、パッケージを購入し、その確認が「your_entitlement_id」コンテンツをアンロックするプロセスを示しています。`purchase:package`メソッドの詳細については、RevenueCatガイドの[購入を行う](https://www.revenuecat.com/docs/making-purchases/)をご覧ください。

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

### ▶️ サブスクリプションの状態を確認する

最新の状態を取得する必要があるときは、このメソッドをいつでも使用できます。このメソッドはアプリのライフサイクル全体で何度でも呼び出すことが安全です。_Purchases_は、更新のたびに最新の`CustomerInfo`を自動的にキャッシュします。そのため、ほとんどの場合、このメソッドはキャッシュから読み込まれ、非常に速く実行されます。

このメソッドは、ユーザーにどのUIを表示するかを決定するとき、またはユーザーが特定の権利レベルを必要とするアクションを実行するときに呼び出すのが一般的です。

> ### 📘
> 
> 💡 ヒントです！
> 
> サブスクリプションがアクティブかどうかだけでなく、非常に多くの情報にアクセスできます。サブスクリプションが更新されるかどうか、ユーザーのクレジットカードに問題が検出されたか、さらなる詳細については、RevenueCatガイドの[サブスクリプション状態](https://www.revenuecat.com/docs/customer-info/)をご覧ください。

RevenueCatは、ユーザーがアプリ内購入を復元し、**同じストアアカウント**（Apple、Google、またはAmazonアカウント）から以前に購入したコンテンツを再アクティブ化できるようにします。すべてのアプリに、ユーザーが復元メソッドをトリガーする方法を持つことをお勧めします。ユーザーが購入へのアクセスを失った場合（例：アプリをアンインストール/再インストールしたり、アカウント情報を失った場合など）、Appleは復元メカニズムを要求します。

```javascript
  const res = await CapacitorPurchases.restoreTransactions()
  const purchaserInfo = res.purchaserInfo
  const ids: string[] = [] // extract active subscriptions ids
  purchaserInfo.activeSubscriptions.forEach((id) => {
    ids.push(id)
  })

```

異なる[アプリユーザーID](https://www.revenuecat.com/docs/user-ids/)が同じ基盤ストアアカウント（Apple、Google、またはAmazonアカウント）からトランザクションを復元すると、RevenueCatは2つのアプリユーザーIDの間にエイリアスを作成し、今後は同じユーザーとしてカウントする可能性があります。異なる設定可能な復元動作についての詳細は、RevenueCatガイドの[購入を復元する](https://www.revenuecat.com/docs/restoring-purchases/)をご覧ください。

SDKはどのプラットフォームでもシームレスに動作するため、ユーザーの購入情報の変更はさまざまなソースから来る可能性があります。任意のデリゲートメソッド`purchases:receivedUpdated:`に適合することで、顧客の`CustomerInfo`の変更に応じることができます。

このメソッドは、SDKが`getCustomerInfo()`、`purchase(package:)`、`purchase(product:)`、または`restorePurchases()`の呼び出しから更新された`CustomerInfo`オブジェクトを受信するたびに発火します。

CustomerInfoの更新は、RevenueCatのバックエンドからアプリにプッシュされるのではなく、更新は上記のようにRevenueCatへのアウトバウンドネットワークリクエストからのみ可能です。

アプリによっては、デリゲートを無視し、次回アプリが起動されたときやSDKメソッドの完了ブロックで顧客情報の変更を単に処理するだけで十分な場合があります。

```javascript
CapacitorPurchases.addListener('purchasesUpdate', (data) => {
  console.log('purchasesUpdate', data)
})
```

> ### 👍
> 
> おめでとうございます！
> 
> サーバーコードを書くことなく、完全に機能したサブスクリプション購入システムを実装しました。おめでとうございます！

### サンプルアプリ

SDKを統合するためのより完全な例をダウンロードするには、RevenueCatサンプルアプリリソースにアクセスしてください。

**[サンプルを見る](https://www.revenuecat.com/docs/sample-apps/)**

私は近いうちに、CapacitorとVue.jsを使用したサンプルアプリを公開する予定です。

Capacitor SDKの深い使用を移動する必要がある場合は、ドキュメントを[こちら](https://github.com/Cap-go/capacitor-purchases/)で確認してください。

### 次のステップ
\
1. まだ行っていない場合は、RevenueCatの[権利に関するガイド](https://www.revenuecat.com/docs/entitlements/)を確認して、商品が正しく設定されていることを確認してください。
2. 独自のユーザー識別子を使用したい場合は、[アプリユーザーIDの設定](https://www.revenuecat.com/docs/user-ids/)についてお読みください。
3. 他のシステムからRevenueCatに移行する場合は、RevenueCatガイドの[既存のサブスクリプションを移行する](https://www.revenuecat.com/docs/migrating-existing-subscriptions/)をご覧ください。
4. 統合をテストする準備ができたら、RevenueCatの[テストとデバッグに関するガイド](https://www.revenuecat.com/docs/debugging/)に従ってください。
5. App Store小規模ビジネスプログラムに該当する場合は、RevenueCatガイドの[申し込み方法とRevenueCatへの通知](https://www.revenuecat.com/docs/app-store-small-business-program/)をご覧ください。

アプリでライブ更新が必要な場合 

ここで参加してください👇

## アカウントを取得するにはこちらに登録してください

[Capgo](/register/)
