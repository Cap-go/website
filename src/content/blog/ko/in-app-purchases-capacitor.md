---
slug: 앱내 구매-Capacitor
title: Capacitor의 인앱 결제
description: Capacitor 앱에서 Capacitor Purchases 플러그인과 RevenueCat을 사용하여 인앱 구매를 구현하는 방법
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-01-19T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /revenuecat_iap.webp
head_image_alt: 인앱 결제 Revenue Cat
keywords: >-
  Capacitor, in-app purchases, RevenueCat, mobile app development, live updates,
  OTA updates, continuous integration, mobile app updates
tag: Tutorial
published: true
locale: ko
next_blog: ''
original_slug: in-app-purchases-capacitor
---
>> 이 플러그인은 이제 RevenueCat 공식 저장소로 이전되었습니다. 자세한 내용은 [공식 문서](https://www.revenuecat.com/docs/getting-started/installation/capacitor)를 참조하세요.

Capacitor Purchases는 iOS와 Android에서 인앱 구매를 가능하게 하는 Capacitor 프레임워크용 플러그인입니다. 여러 플랫폼에서 일관된 간단한 API를 제공하여 개발자가 모바일 앱에서 인앱 구독과 구매를 쉽게 구현할 수 있도록 합니다.

Capacitor Purchases 플러그인의 주요 특징 중 하나는 인앱 구독과 인앱 구매를 위한 도구를 제공하는 플랫폼인 RevenueCat과의 통합입니다. RevenueCat은 여러 플랫폼에서 간단하고 일관된 API를 제공하고 영수증 검증 및 사용자 관리와 같은 작업을 자동화하여 인앱 구독과 구매 구현 과정을 단순화합니다.

RevenueCat을 사용하면 개발자는 구독을 쉽게 관리하고, 수익을 추적하며, 기타 관련 작업을 수행할 수 있습니다. RevenueCat이 제공하는 일부 기능은 다음과 같습니다:

- 자동화된 영수증 검증
- 사용자 관리
- 맞춤형 가격 모델 지원
- 상세 분석
- 확장성

Capacitor Purchases 플러그인과 RevenueCat을 사용함으로써 개발자는 모바일 앱에서 인앱 구독과 구매를 구현할 때 시간과 노력을 절약할 수 있으며, 사용자 경험을 향상시키고 수익을 증가시키는 데 도움이 되는 추가 기능을 제공할 수 있습니다.

Capacitor Purchases 플러그인과 RevenueCat을 사용하면 개발자는 여러 플랫폼에서 인앱 구독과 구매를 쉽게 관리하고 추적하며, 영수증을 검증하고 사용자를 관리할 수 있습니다. 또한 맞춤형 가격 모델을 만들고 성과와 수익을 개선하기 위한 상세 분석을 얻을 수 있습니다.

## 설치

Capacitor와 Capacitor Purchases 플러그인의 최신 버전을 사용하시기 바랍니다. Capacitor 웹사이트에서 Capacitor와 Capacitor Purchases 플러그인의 최신 버전을 확인할 수 있습니다.

Capacitor Purchases 플러그인을 설치하려면 다음 명령어를 실행하세요:
`npm i @capgo/capacitor-purchases`
앱의 네이티브 코드에 플러그인을 추가하세요
`npx cap sync`

Xcode에서 인앱 구매 기능을 추가하세요:

![Xcode step 1](/iap_step1.webp)
그리고
![xcode step 2](/iap_step2.webp)

## 1. RevenueCat 계정 만들기
이 가이드는 몇 줄의 코드만으로 구독과 RevenueCat SDK를 시작하고 실행하는 방법을 안내합니다.

[여기](https://app.revenuecat.com/)에서 새로운 RevenueCat 계정에 가입하세요.

> ### 📘
> 
> 💡 팁!
> 
> RevenueCat은 각 앱/프로젝트마다 별도의 RevenueCat 계정을 만들것을 권장합니다. 특히 앱을 판매할 계획이 있다면 더욱 그렇습니다. 전체 계정을 이전할 수 있어 RevenueCat 지원팀에 개별 프로젝트 이전을 요청하고 기다릴 필요가 없어 이전 과정이 빨라집니다.

### 조직/기업

RevenueCat에 등록하고 프로젝트 내에서 앱을 설정할 때 회사 계정을 사용하는 것을 권장합니다. 프로젝트에 팀의 나머지 멤버를 [협력자](https://www.revenuecat.com/docs/collaborators/)로 초대할 수 있지만, **프로젝트 소유자만 결제를 관리할 수 있습니다**. 프로젝트 협력자는 결제 세부 정보를 관리할 수 없습니다.

## 2. 프로젝트 및 앱 구성

### ▶️ 프로젝트 생성

RevenueCat 대시보드로 이동하여 상단 탐색 메뉴의 _Projects_ 드롭다운에서 [새 프로젝트 추가](https://app.revenuecat.com/overview/)를 선택하세요.

![RevenueCat step 1](/revenuecat_step1.webp)

새 프로젝트 생성을 위한 팝업 모달

### ▶️ 앱/플랫폼 추가

프로젝트 대시보드의 왼쪽 메뉴에서 **Project Settings > Apps**로 이동하여 추가할 앱의 플랫폼을 선택하세요.

![RevenueCat step 2](/revenuecat_step2.webp)

앱 플랫폼 선택을 위한 프로젝트 대시보드

**앱 이름** 필드는 RevenueCat에 앱을 추가하는데 필수입니다. 나머지 구성 필드는 나중에 추가할 수 있습니다. 테스트 및 프로덕션 구매를 하려면 번들 ID(iOS)/패키지 이름(Android)과 공유 시크릿(iOS)/서비스 자격 증명(Android)이 구성되어야 합니다.

![RevenueCat step 3](/revenuecat_step3.webp)

Apple App Store 앱을 위한 앱 구성 페이지

> ### 📘
> 
> 💡 팁!
> 
> 앱을 등록한 후 RevenueCat은 [플랫폼 서버 알림](https://www.revenuecat.com/docs/server-notifications/) 설정을 권장합니다. 이러한 알림은 필수는 아니지만 [웹훅](https://www.revenuecat.com/docs/webhooks/) 및 통합 전달 시간을 단축하고 구독자 업데이트의 지연 시간을 줄여줍니다.

> ### 📘
> 
> 스테이징 vs. 프로덕션 앱 및 사용자
> 
> RevenueCat 자체는 스테이징과 프로덕션을 위한 별도의 환경이 없습니다. 대신 사용자의 기본 거래는 샌드박스와 프로덕션으로 구분됩니다.
> 
> 모든 RevenueCat 앱은 스토어에서 샌드박스와 프로덕션 구매를 모두 할 수 있습니다. 스테이징과 프로덕션을 위한 별도의 앱이 있는 경우 설정을 미러링하기 위해 RevenueCat에서 여러 프로젝트를 만들 수 있습니다.
> 
> 또한 사용자도 환경별로 분리되지 않습니다. 동일한 사용자가 동시에 활성 샌드박스 구매와 활성 프로덕션 구매를 가질 수 있습니다.

### ▶️ 서비스 자격 증명

RevenueCat이 앱 스토어와 귀하를 대신하여 통신할 수 있도록 서비스 자격 증명을 설정해야 합니다. 자세한 내용은 RevenueCat의 [App Store Connect 공유 시크릿](https://www.revenuecat.com/docs/itunesconnect-app-specific-shared-secret/), [Play 서비스 자격 증명](https://www.revenuecat.com/docs/creating-play-service-credentials/), [Amazon Appstore 공유 시크릿](https://www.revenuecat.com/docs/service-credentials/amazon-appstore-credentials/) 가이드를 참조하세요.

Play 서비스 자격 증명은 Google 서버 전체에 전파되는 데 최대 36시간이 걸릴 수 있습니다.

## 3. 상품 구성

### ▶️ 스토어 설정

RevenueCat을 사용하여 상품을 가져오기 전에 각 스토어에서 상품을 구성해야 합니다. 이 과정을 안내하는 [App Store Connect](https://www.revenuecat.com/docs/ios-products/), [Google Play Console](https://www.revenuecat.com/docs/android-products/), [Amazon Appstore](https://www.revenuecat.com/docs/amazon-product-setup/), [Stripe](https://www.revenuecat.com/docs/stripe-products/) 가이드를 참조하세요.

iOS 상품을 판매하는 경우 **App Store Connect > Agreements, Tax, and Banking**에서 '유료 애플리케이션 계약'에 서명하고 은행 및 세금 정보를 작성해야 합니다. **구매를 테스트하기 전에 이 작업을 완료해야 합니다**.

> ### 📘
> 
> 테스트하는 동안 스토어 설정을 건너뛰고 싶으신가요?
> 
> iOS에서는 StoreKit 구성 파일을 대신 테스트하여 App Store Connect에서 상품 구성을 지연할 수 있습니다. 이러한 구성 파일은 최소한의 설정만 필요하며 Xcode에서 직접 구성할 수 있습니다.
> 
> StoreKit 구성 파일 설정에 대한 자세한 내용은 RevenueCat의 [샌드박스 테스트](https://www.revenuecat.com/docs/apple-app-store/#ios-14-only-testing-on-the-simulator) 가이드를 참조하세요.

### ▶️ RevenueCat에서 상품 및 자격 구성

[App Store Connect](https://www.revenuecat.com/docs/ios-products/), [Google Play Console](https://www.revenuecat.com/docs/android-products/), [Amazon Appstore](https://www.revenuecat.com/docs/amazon-product-setup/), [Stripe](https://www.revenuecat.com/docs/stripe-products/)에서 인앱 상품이 구성되면 해당 구성을 RevenueCat 대시보드에 복사해야 합니다. RevenueCat은 프리미엄 기능에 대한 접근을 제어하기 위한 자격 시스템과 고객에게 제공하는 상품 세트를 관리하기 위한 제안을 사용합니다.

자격은 특정 상품을 구매한 후 고객이 "권한을 가지게 되는" 접근 수준입니다.
제안은 결제 화면에서 "제공"하고자 하는 인앱 상품을 구성하고 원격으로 관리할 수 있는 간단한 방법입니다. RevenueCat은 코드를 단순화하고 앱 업데이트 없이 상품을 변경할 수 있도록 이러한 기능을 활용하는 것을 **권장합니다**.

상품을 설정한 다음 제안이나 자격으로 구성하는 방법은 [상품 구성](https://www.revenuecat.com/docs/entitlements/)을 참조하세요.

![RevenueCat step 4](/revenuecat_step4.webp)

## 4. RevenueCat의 Purchases SDK 사용하기

RevenueCat SDK는 토큰을 RevenueCat 서버와 동기화하면서 플랫폼 전반에 걸쳐 구매와 구독을 원활하게 구현합니다.

SDK에 문제가 발생하면 [SDK 문제 해결](https://www.revenuecat.com/docs/troubleshooting-the-sdks/)에서 안내를 참조하세요.

> ### 📘
> 
> Purchases를 구성할 때는 공개 SDK 키만 사용하세요
> 
> 대시보드의 **Project settings** 아래 **API keys** 탭에서 공개 SDK 키를 얻을 수 있습니다.

_Purchases_의 공유 인스턴스는 보통 앱 실행 시 한 번만 구성해야 합니다. 이후에는 SDK에서 `.shared` 인스턴스에 접근하여 앱 전체에서 동일한 인스턴스가 공유됩니다.

SDK는 자동으로 [구성된 Offerings](https://www.revenuecat.com/docs/entitlements/#offerings)를 가져오고 Apple, Google 또는 Amazon에서 제품 정보를 검색합니다. 따라서 고객이 구매 화면을 실행할 때 사용 가능한 제품이 이미 로드되어 있을 것입니다.

다음은 Offerings를 가져오는 예시입니다. Offerings를 사용하여 페이월 화면을 구성할 수 있습니다. 자세한 정보와 모범 사례는 RevenueCat의 [제품 표시](https://www.revenuecat.com/docs/displaying-products/) 가이드를 참조하세요.

### ▶️ 사용 가능한 제품 가져오기 및 표시

> ### 📘
> 
> 사용자 ID로 Purchases 구성하기
> 
> 앱에 사용자 인증 시스템이 있는 경우, 구성 시점에 사용자 식별자를 제공하거나 나중에 `.logIn()` 호출로 제공할 수 있습니다. 자세한 내용은 RevenueCat의 [사용자 식별](https://www.revenuecat.com/docs/user-ids/) 가이드를 확인하세요.

SDK는 자동으로 [구성된 Offerings](https://www.revenuecat.com/docs/entitlements/#offerings)를 가져오고 Apple, Google 또는 Amazon에서 제품 정보를 검색합니다. 따라서 고객이 구매 화면을 실행할 때 사용 가능한 제품이 이미 로드되어 있을 것입니다.

다음은 Offerings를 가져오는 예시입니다. Offerings를 사용하여 페이월 화면을 구성할 수 있습니다. 자세한 정보와 모범 사례는 RevenueCat의 [제품 표시](https://www.revenuecat.com/docs/displaying-products/) 가이드를 참조하세요.

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

[Offerings](https://www.revenuecat.com/docs/entitlements/#offerings), [제품](https://www.revenuecat.com/docs/entitlements/#products) 또는 사용 가능한 [패키지](https://www.revenuecat.com/docs/entitlements/#adding-packages)를 가져올 때 비어있다면, 해당 스토어의 구성 문제 때문입니다.

App Store Connect에서 가장 흔한 원인은 '유료 애플리케이션 계약'이 만료되었거나 제품이 '제출 준비' 상태가 아닌 경우입니다. GooglePlay에서는 주로 앱이 비공개 트랙에 게시되지 않았거나 유효한 테스트 사용자가 추가되지 않은 경우에 발생합니다.

이 문제 해결에 대한 자세한 정보는 RevenueCat [고객 지원 센터](https://support.revenuecat.com/hc/en-us/articles/360041793174/)에서 찾을 수 있습니다.

### ▶️ 구매하기

SDK에는 구매를 용이하게 하는 간단한 메서드가 포함되어 있습니다. `purchase:package`는 가져온 Offering에서 패키지를 가져와 해당 앱 스토어와 거래를 처리합니다.

아래 코드 예시는 패키지를 구매하고 "your_entitlement_id" 콘텐츠의 잠금이 해제되었는지 확인하는 과정을 보여줍니다. `purchase:package` 메서드에 대한 자세한 내용은 RevenueCat의 [구매하기](https://www.revenuecat.com/docs/making-purchases/) 가이드에서 확인할 수 있습니다.

```javascript
const { offerings } = await CapacitorPurchases.getOfferings()
if (offerings.current !== null) {  
    // Display current offering with offerings.current
}
```

### ▶️ 구독 상태 확인

앱의 수명 주기 동안 최신 상태를 확인해야 할 때마다 이 메서드를 사용할 수 있으며, 반복적으로 호출해도 안전합니다. _Purchases_는 업데이트될 때마다 최신 `CustomerInfo`를 자동으로 캐시하므로 대부분의 경우 이 메서드는 캐시에서 데이터를 가져와 매우 빠르게 실행됩니다.

사용자에게 어떤 UI를 보여줄지 결정할 때와 사용자가 특정 자격 수준이 필요한 작업을 수행할 때마다 이 메서드를 호출하는 것이 일반적입니다.

> ### 📘
> 
> 💡 유용한 팁!
> 
> 구독이 활성화되어 있는지 여부 외에도 더 많은 정보에 접근할 수 있습니다. 구독이 갱신될 예정인지, 사용자의 신용카드에 문제가 감지되었는지 등을 알아보려면 RevenueCat의 [구독 상태](https://www.revenuecat.com/docs/customer-info/) 가이드를 참조하세요.

RevenueCat을 사용하면 사용자가 인앱 구매를 복원하여 **동일한 스토어 계정**(Apple, Google 또는 Amazon 계정)에서 이전에 구매한 콘텐츠를 다시 활성화할 수 있습니다. 모든 앱에 사용자가 복원 메서드를 실행할 수 있는 방법을 제공하는 것을 권장합니다. Apple은 사용자가 구매에 대한 접근 권한을 잃은 경우(예: 앱 제거/재설치, 계정 정보 분실 등) 복원 메커니즘을 필수로 요구합니다.

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

두 개의 서로 다른 [App User ID](https://www.revenuecat.com/docs/user-ids/)가 동일한 기본 스토어 계정(Apple, Google 또는 Amazon 계정)에서 거래를 복원하는 경우,
RevenueCat는 두 App User ID 간에 별칭을 생성하려 시도하고 앞으로 동일한 사용자로 간주할 수 있습니다. 다양한 구성 가능한 복원 동작에 대한 자세한 내용은 RevenueCat의 [구매 복원](https://www.revenuecat.com/docs/restoring-purchases/) 가이드를 참조하세요.

SDK가 모든 플랫폼에서 원활하게 작동하므로 사용자의 구매 정보 변경은 다양한 소스에서 올 수 있습니다. 선택적 델리게이트 메서드인 `purchases:receivedUpdated:`를 구현하여 고객의 `CustomerInfo` 변경에 응답할 수 있습니다.

이 메서드는 SDK가 `getCustomerInfo()`, `purchase(package:)`, `purchase(product:)` 또는 `restorePurchases()` 호출로부터 업데이트된 `CustomerInfo` 객체를 받을 때마다 실행됩니다.

CustomerInfo 업데이트는 RevenueCat 백엔드에서 앱으로 푸시되지 않으며, 위에서 언급한 대로 RevenueCat에 대한 아웃바운드 네트워크 요청을 통해서만 업데이트가 발생할 수 있습니다.

앱에 따라 델리게이트를 무시하고 앱이 다시 실행되거나 SDK 메서드의 완료 블록에서 고객 정보 변경을 처리하는 것으로 충분할 수 있습니다.

```javascript
  const res = await CapacitorPurchases.restoreTransactions()
  const purchaserInfo = res.purchaserInfo
  const ids: string[] = [] // extract active subscriptions ids
  purchaserInfo.activeSubscriptions.forEach((id) => {
    ids.push(id)
  })

```

> ### 👍
> 
> 해냈습니다!
> 
> 이제 한 달 동안 서버 코드를 작성하지 않고도 완전한 기능을 갖춘 구독 구매 시스템을 구현했습니다. 축하합니다!

### 샘플 앱

SDK 통합의 더 완전한 예제를 다운로드하려면 RevenueCat 샘플 앱 리소스를 확인하세요.

**[샘플 보기](https://www.revenuecat.com/docs/sample-apps/)**

곧 Capacitor와 Vue.js를 사용하는 샘플 앱을 게시할 예정입니다.

Capacitor SDK의 심층적인 사용법을 확인하려면 [여기](https://github.com/Cap-go/capacitor-purchases/)에서 문서를 확인하세요.

### 다음 단계
\
-   아직 하지 않았다면, RevenueCat의 [자격 가이드](https://www.revenuecat.com/docs/entitlements/)를 확인하여 제품이 올바르게 구성되어 있는지 확인하세요.
-   자체 사용자 식별자를 사용하려면 [앱 사용자 ID 설정](https://www.revenuecat.com/docs/user-ids/)에 대해 읽어보세요.
-   다른 시스템에서 RevenueCat으로 이전하는 경우, RevenueCat의 [기존 구독 마이그레이션](https://www.revenuecat.com/docs/migrating-existing-subscriptions/) 가이드를 참조하세요.
-   통합을 테스트할 준비가 되면 RevenueCat의 [테스트 및 디버깅](https://www.revenuecat.com/docs/debugging/) 가이드를 따르세요.
-   App Store Small Business Program 자격이 있다면 RevenueCat의 [신청 방법 및 RevenueCat에 알리는 방법](https://www.revenuecat.com/docs/app-store-small-business-program/) 가이드를 확인하세요.


앱에서 실시간 업데이트가 필요하다면

여기에 참여하세요 👇

## 계정을 받으려면 여기에서 등록하세요

[Capgo](/register/)
