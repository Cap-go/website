---
locale: ko
---

수익 고양이/purchases-capacitor Tutorial

이 튜토리얼은 `@revenuecat/purchases-capacitor` 패키지를 사용하여 Ionic Capacitor 앱에서 인앱 구매 및 구독을 구현하는 과정을 안내합니다.

## 전제 조건

시작하기 전에 다음 사항이 있는지 확인하세요.

- 이온 커패시터 프로젝트 설정
- RevenueCat 계정(https://apprevenuecatcom/signup에서 가입)
- 귀하의 앱 스토어 계정(Apple App Store 및/또는 Google Play Store)에 구성된 인앱 상품 또는 구독

## 설치

1 터미널이나 명령 프롬프트를 열고 프로젝트 디렉터리로 이동합니다.

2 다음 명령을 실행하여 패키지를 설치합니다.

```bash
npm install @revenuecat/purchases-capacitor
```

3 설치 후 Capacitor 프로젝트를 동기화합니다.

```bash
npx cap sync
```

## 구성

1 앱의 기본 TypeScript 파일(예: `appcomComponentts`)에서 구매 모듈을 가져옵니다.

```typescript
import { Purchases } from '@revenuecat/purchases-capacitor';
```

2 RevenueCat API 키를 사용하여 SDK를 구성합니다.

```typescript
async function initializePurchases() {
  await Purchases.configure({
    apiKey: 'YOUR_REVENUECAT_API_KEY',
  });
}
```

앱이 시작될 때(예: 기본 구성 요소의 `ngOnInit()` 메서드에서) 이 함수를 호출하세요.

## 기본 사용법

### 사용 가능한 제품을 가져오는 중

사용 가능한 제품 목록을 얻으려면:

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

### 구매하기

구매를 시작하려면:

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

### 구독 상태 확인하기

사용자의 현재 구독 상태를 확인하려면 다음 안내를 따르세요.

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

### 구매 복원

사용자의 이전 구매를 복원하려면 다음 단계를 따르세요.

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

## 고급 기능

### 사용자 식별

자체 사용자 ID 시스템이 있는 경우 RevenueCat에서 사용자를 식별할 수 있습니다.

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

### 할인 가격 적격성 확인

사용자가 신규 할인 가격을 받을 자격이 있는지 확인하려면 다음 단계를 따르세요.

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

### 속성 설정

사용자에 대한 사용자 정의 속성을 설정할 수 있습니다.

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

## 결론

이 튜토리얼에서는 `@revenuecat/purchases-capacitor` 패키지를 사용하여 인앱 구매 및 구독을 구현하는 기본 사항을 다루었습니다. 오류를 적절하게 처리하고 구현을 철저히 테스트하는 것을 잊지 마세요.

고급 사용법 및 자세한 API 문서는 https://docsrevenuecatcom/의 RevenueCat 문서를 참조하세요.

RevenueCat 대시보드에서 제품을 구성하고 이를 앱 스토어 제품에 연결하는 것을 잊지 마세요. 또한 프로덕션으로 출시하기 전에 샌드박스 환경에서 구현을 테스트해야 합니다.