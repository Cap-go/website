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
updated_at: 2025-05-01T00:00:00.000Z
head_image: /stripe_apple.webp
head_image_alt: Capacitorアプリケーションにおけるストライプ決済の実装
keywords: >-
  capacitor, stripe, payment links, app store guidelines, iOS, digital goods,
  in-app purchases, external payments
tag: Tutorial
published: true
locale: ja
---
# iOS 앱스토어 새 지침에 따른 Capacitor 앱에서 Stripe 결제 링크 구현하기

2025년 5월 1일부터 Apple은 [Epic v. Apple 소송](https://storage.courtlistener.com/recap/gov.uscourts.cand.364265/gov.uscourts.cand.364265.1508.0_2.pdf) 판결에 따라 앱스토어 심사 지침을 크게 변경했습니다. 이러한 변경사항은 특히 미국의 앱 개발자들이 디지털 상품과 서비스에 대해 외부 결제 방식으로 연결할 수 있도록 허용하여, Apple의 인앱 결제 시스템에 대한 대안을 제공합니다.

## 모바일 결제를 영원히 바꾼 Epic의 전투

이 순간까지의 여정은 길고 논쟁이 많았습니다. 2020년 8월, 인기 게임 포트나이트의 제작사인 Epic Games가 Apple의 30% 수수료를 우회하는 직접 결제 옵션을 구현하면서 의도적으로 Apple의 앱스토어 지침을 위반하면서 시작되었습니다. Apple은 즉시 앱스토어에서 포트나이트를 제거했고, Epic은 iOS 앱 배포와 인앱 결제에 대한 Apple의 통제에 이의를 제기하는 소송을 제기했습니다.

수년간의 법적 공방, 항소, 재항소 끝에 법원은 마침내 Apple이 개발자들이 앱 외부의 대체 결제 방식으로 사용자를 안내하도록 허용해야 한다고 판결했습니다. 이 결정은 2008년 출시 이후 동일한 기본 재무 모델로 운영되어 온 앱스토어 생태계의 경제성을 근본적으로 변화시켰습니다.

### 최종 판결 - 더 이상의 항소 없음

이 판결이 특히 중요한 이유는 최종적이며 더 이상 항소할 수 없다는 점입니다. 대법원은 2025년 초 Apple의 항소를 기각했으며, 이로써 하급법원의 결정이 확정되었습니다. 이는 개발자들이 Apple이 추가 법적 이의제기를 통해 이 결정을 뒤집을 수 없다는 확신을 가지고 외부 결제 방식을 구현할 수 있다는 것을 의미합니다.

### 법으로 보장된 공정한 대우

가장 중요한 것은, 판결이 명시적으로 Apple이 외부 결제 방식을 사용하는 앱을 차별할 수 없다고 명시했다는 점입니다. 법원은 특히 Apple이 다음과 같은 행위를 금지했습니다:

1. 외부 결제 방식을 사용하는 앱에 추가 수수료를 부과하거나 추가 요구사항을 부과하는 것
2. Apple의 IAP 시스템을 독점적으로 사용하는 앱에 검색 결과나 추천에서 우대하는 것
3. 기술적 수단을 사용하여 외부 결제 경험을 Apple 자체 시스템보다 열등하게 만드는 것
4. 기본적인 소비자 정보를 넘어서는 부담스러운 공개 요구사항을 부과하는 것

이러한 명시적인 보호는 개발자들이 Apple의 미묘한 보복이나 차별에 대한 두려움 없이 Stripe나 다른 외부 결제 제공업체를 구현할 수 있다는 것을 의미합니다. 경쟁의 장이 법적으로 평준화되었으며, Apple은 결제 방식 선택에 관계없이 모든 앱을 동등하게 대우해야 합니다.

이 판결은 Apple의 폐쇄적인 정원 접근 방식에 대한 가장 중요한 도전 중 하나를 나타내며, 모바일 앱 수익화가 작동할 수 있는 방식의 중요한 전환점을 표시합니다. Apple의 30% 수수료(소규모 비즈니스의 경우 15%로 감소)에 대해 오랫동안 불만을 제기해온 개발자들에게, 이 판결은 더 높은 수익 마진과 고객 경험에 대한 더 많은 통제권을 제공하는 길을 제시합니다.

## Apple의 인앱 구매 대신 Stripe 사용의 재정적 이점

이 변화의 재정적 영향은 개발자들에게 상당합니다:

- **낮은 결제 처리 수수료**: Apple은 일반적으로 인앱 구매에 대해 30% 수수료(소규모 비즈니스의 경우 15%)를 부과하는 반면, Stripe의 수수료는 거래당 약 2.9% + $0.30에 불과합니다. 이 차이는 수익 마진을 크게 증가시킬 수 있습니다.
  
- **더 빠른 정산**: Apple의 경우 일반적으로 자금을 받는 데 45-90일이 걸립니다. 반면 Stripe는 2-3 영업일 내에 은행 계좌로 결제금을 입금합니다.

- **간소화된 환불 프로세스**: Apple의 더 복잡한 환불 시스템을 거치는 대신 Stripe 대시보드를 통해 직접 환불을 처리할 수 있습니다.

이러한 비용 절감과 개선된 현금 흐름은 특히 소규모 개발자와 기업에게 게임 체인저가 될 수 있습니다.

이 글에서는 Apple의 [업데이트된 지침](https://developer.apple.com/app-store/review/guidelines/#business)을 준수하면서 이러한 새로운 규칙을 활용하기 위해 Capacitor 앱에서 Stripe 결제 링크를 구현하는 방법을 살펴보겠습니다.

> 이 구현은 [Stripe의 공식 Payment Links 문서](https://docs.stripe.com/mobile/digital-goods/payment-links)를 기반으로 하며, 특별히 Capacitor 앱에 맞게 조정되었습니다.

## 새로운 지침 이해하기

업데이트된 앱스토어 심사 지침은 이제 개발자가 디지털 상품과 구독에 대한 결제 처리를 위해 외부 웹사이트로 사용자를 안내하는 것을 허용합니다. 이 변경사항은 현재 미국 앱스토어에 배포된 앱에만 적용됩니다.

이해해야 할 주요 사항:

1. 이제 앱 내에서 디지털 상품에 대한 외부 결제 옵션으로 연결할 수 있습니다
2. 이는 미국 앱스토어의 앱에만 적용됩니다
3. Apple의 공개 요구사항을 여전히 준수해야 합니다
4. 모든 고객 지원과 환불 처리에 대한 책임은 여전히 귀하에게 있습니다

## Capacitor 앱에서 Stripe 결제 링크 설정하기

기술적 구현에 대해 자세히 살펴보겠습니다:

### 1단계: Stripe 대시보드에서 결제 링크 만들기

먼저, Stripe 대시보드에서 결제 링크를 생성합니다:

1. Stripe 대시보드의 결제 링크 섹션으로 이동
2. "+ New"를 클릭하여 새 결제 링크 생성
3. 제품 또는 구독 세부 정보 정의
4. "결제 후" 설정에서 "확인 페이지 표시 안 함" 선택
5. 성공 URL로 유니버설 링크 설정(나중에 구성할 예정)
6. "링크 만들기"를 클릭하여 결제 링크 생성

### 2단계: Capacitor 앱에서 유니버설 링크 설정

결제 완료 후 사용자를 앱으로 다시 리디렉션하기 위해 유니버설 링크를 구성합니다:

1. 도메인에 `apple-app-site-association` 파일 생성:

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

2. 이 파일을 `https://yourdomain.com/.well-known/apple-app-site-association`에 호스팅

3. 올바른 MIME 타입 `application/json`으로 제공되는지 확인

4. 적절한 권한을 추가하여 Capacitor 앱이 유니버설 링크를 처리하도록 구성. 먼저 `capacitor.config.ts`에서:

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

5. Xcode 프로젝트에 Associated Domains 권한 추가:
   - Xcode 프로젝트 열기
   - 앱 타겟 선택
   - "Signing & Capabilities"로 이동
   - "+ Capability" 클릭 후 "Associated Domains" 선택
   - `applinks:yourdomain.com` 추가

### 3단계: 폴백 페이지 만들기

앱이 설치되지 않은 경우를 처리하기 위해 리디렉션 URL에 폴백 페이지를 만듭니다:

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

### 4단계: Capacitor 앱에서 결제 버튼 구현

이제 앱에 결제 버튼을 추가합니다:

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

> **Safari가 중요한 이유**: 결제 링크를 인앱 브라우저 대신 Safari(`window.open`을 통해)에서 여는 것이 유리한 이유는 Stripe Link에 이전에 결제 정보를 저장한 사용자의 자격 증명이 자동으로 사용 가능하기 때문입니다. 이는 사용자가 신용카드 정보를 다시 입력할 필요가 없는 더 부드러운 체크아웃 경험을 만들어 마찰과 이탈률을 크게 줄입니다.

### 5단계: 앱에서 유니버설 링크 처리

사용자가 다시 리디렉션될 때 유니버설 링크를 처리하도록 앱을 구성합니다:

1. 먼저 App 플러그인 설치:

```bash
npm install @capacitor/app
```

2. 앱에서 App 플러그인 등록:

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

### 6단계: 주문 처리를 위한 웹훅 설정

마지막으로, 성공적인 결제를 처리하기 위해 서버에 웹훅을 구성합니다:

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

## Android 호환성

분명히 말씀드리겠습니다: Epic v. Apple 판결은 모바일 결제 환경을 근본적으로 변화시켰습니다. iOS 앱에 직접적인 영향을 미칠 뿐만 아니라, 외부 결제 방식을 사용해온 Android 개발자들의 입지도 강화했습니다.

**이제 Android 개발자들은 완전한 자신감을 가지고 외부 결제 솔루션을 구현할 수 있습니다.** Apple 판결로 설정된 선례는 향후 잠재적 제한으로부터 모든 플랫폼의 개발자들을 효과적으로 보호합니다. 이 법원 결정은 많은 Android 개발자들이 수년간 해왔던 것 - 더 낮은 수수료로 대체 결제 옵션 제공 - 을 인정했습니다.

Google Play 스토어는 항상 외부 결제 방식에 대해 Apple보다 덜 제한적이었으며, 이제 법적 선례가 확립되어 Android 앱에서 Stripe나 다른 외부 결제 제공업체를 구현하는 데 사실상 위험이 없습니다. 이러한 구현을 진행하면서 법적으로 안전한 기반 위에 있다는 것을 알 수 있습니다.

iOS용으로 다룬 구현은 Android 기기에서도 거의 동일하게 작동합니다. Google Play 스토어는 외부 결제 방식에 대해 동일한 제한이 없기 때문에, 특별한 공개 대화상자 없이도 동일한

> **Note**: IP 위치 정보가 작동하긴 하지만, IP 위치 확인이 항상 100% 정확하지는 않다는 점을 기억하는 것이 중요합니다. 중요한 애플리케이션의 경우, 여러 감지 방법을 사용하거나 사용자가 수동으로 지역을 선택할 수 있도록 하는 것을 고려하세요.

### Capacitor 플러그인을 사용한 더 정확한 위치 감지

더 정확한 위치 감지를 위해, Capacitor Geolocation 플러그인과 @capgo/nativegeocoder를 함께 사용하여 사용자의 국가를 더 정확하게 확인할 수 있습니다:

1. 먼저, 필요한 플러그인을 설치하세요:

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
        class="w-full py-3 font-medium text-white transition-colors bg-indigo-600 rounded-lg hover:bg-indigo-700"
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

2. Capacitor 프로젝트에서 플러그인을 구성하세요. `capacitor.config.ts`에 다음을 추가하세요:

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

3. 위치 기반 지역 감지를 구현하세요:

```bash
npm install @capacitor/geolocation @capgo/nativegeocoder
```

이 구현은 사용자가 물리적으로 미국에 위치해 있는지 더 정확하게 확인하는 방법을 제공합니다. 먼저 기기의 GPS와 네이티브 지오코더를 사용하여 국가를 확인하고, 실패할 경우(권한 문제나 기타 오류로 인해) IP 기반 감지로 대체됩니다.

`info.plist` (iOS)와 `AndroidManifest.xml` (Android) 파일에 필요한 권한을 추가하는 것을 잊지 마세요:

iOS의 경우 (`ios/App/App/Info.plist`):
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

Android의 경우 (`android/app/src/main/AndroidManifest.xml`):
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

이 접근 방식을 사용하면 새로운 Apple 가이드라인에 따라 사용자가 외부 결제 옵션을 사용할 수 있는지 가장 정확하게 확인할 수 있습니다.

## 구독 관리

Stripe를 결제에 사용할 때의 주요 장점 중 하나는 구독을 제공하고 관리할 수 있다는 것입니다. 다음은 Capacitor 앱에서 구독 관리를 처리하는 방법입니다:

### 1. 구독 관리 페이지 만들기

앱에 사용자의 활성 구독을 표시하는 구독 관리 페이지를 추가하세요:

```xml
<key>NSLocationWhenInUseUsageDescription</key>
<string>We need your location to determine which payment method to use based on regional availability.</string>
```

### 2. 구독 관리를 위한 고객 포털

Stripe는 사용자가 구독을 관리할 수 있는 고객 포털을 제공합니다. 서버에서 이 포털로의 링크를 생성할 수 있습니다:

```xml
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
```

## App Store 규정 준수 확인

Apple의 가이드라인을 준수하기 위한 구현 사항:

1. 외부 구매에 대한 적절한 고지 포함
2. 사용자가 앱을 떠난다는 것을 알리는 모달 시트 구현(Apple 요구사항)
3. 앱 내에서 이루어지는 구매에 대한 Apple의 수수료를 회피하려 하지 않기
4. Apple이 거래에 책임이 없다는 것을 사용자에게 명확히 전달

다음은 필요한 고지 모달을 구현하는 예시입니다:

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
        class="w-full py-3 font-medium text-white transition-colors bg-indigo-600 rounded-lg hover:bg-indigo-700"
      >
        Manage Subscription
      </button>
    </div>
    
    <div v-else class="no-subscription">
      <p class="mb-4">You don't have an active subscription.</p>
      <button 
        @click="goToPricingPage" 
        class="w-full py-3 font-medium text-white transition-colors bg-indigo-600 rounded-lg hover:bg-indigo-700"
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

## 구현 테스트

구현을 테스트하는 방법:

1. 앱에서 결제 버튼을 클릭하면 고지 사항이 표시되고 Stripe 결제 페이지가 열려야 합니다
2. Stripe 테스트 카드 `4242 4242 4242 4242`를 사용하여 테스트 결제를 완료하세요
3. 결제 후에는 유니버설 링크를 통해 앱으로 다시 리디렉션되어야 합니다
4. 웹훅이 `checkout.session.completed` 이벤트를 수신했는지 확인하세요

## 결론

iOS 앱에서 디지털 상품에 대한 외부 결제 옵션을 사용할 수 있게 된 것은 개발자에게 더 많은 유연성을 제공하는 중요한 변화입니다. 현재는 미국 App Store의 앱에만 적용되지만, Apple의 인앱 구매 시스템에 대한 중요한 대안을 제공합니다.

Capacitor에서 Stripe Payment Links를 사용하면 Apple의 가이드라인을 준수하면서 간소화된 결제 경험을 빠르게 구현할 수 있습니다. 이 방식은 또한 Stripe의 강력한 결제 인프라, 더 낮은 처리 수수료(30% 대신 3%), 그리고 Apple의 인앱 구매 시스템에 비해 훨씬 더 빠른 정산(몇 달이 아닌 며칠)이라는 장점을 제공합니다.

이러한 거래는 Apple의 생태계 외부에서 발생하므로 모든 고객 지원과 환불 문제를 직접 처리해야 한다는 점을 기억하세요.

Capacitor 앱에서 Stripe Payment Links를 구현해 보셨나요? 아래 댓글에서 여러분의 경험을 공유해 주세요!

## FAQs

**Q: 이 접근 방식이 Apple의 가이드라인을 준수하나요?**  
A: 네, 2025년 5월 1일부터 Apple은 미국 App Store에 배포되는 앱에서 디지털 상품과 서비스에 대한 외부 결제 방법 링크를 허용합니다(필요한 고지 사항을 포함하는 경우).

**Q: 외부 결제 방법을 사용할 때 Apple의 수수료를 지불해야 하나요?**  
A: 아니요, 새로운 규칙의 주요 이점 중 하나는 Apple의 시스템 외부에서 처리되는 결제에는 수수료가 부과되지 않는다는 것입니다.

**Q: 이러한 새로운 규칙을 활용하려면 회사가 미국에 기반을 두어야 하나요?**  
A: 아니요, 전 세계 어느 회사든 앱이 미국 App Store에서 이용 가능하고 구매하는 사용자가 미국에 위치해 있다면 외부 결제 방법을 구현할 수 있습니다. 이 규정은 회사의 위치가 아닌 마켓플레이스(미국 App Store)와 사용자의 위치에 적용됩니다. 즉, 유럽, 아시아, 남미 또는 다른 어느 곳의 개발자든 미국 기반 고객을 위해 Stripe Payment Links를 구현할 수 있습니다.

**Q: 미국 외 지역의 사용자가 외부 결제 옵션을 사용하려고 하면 어떻게 되나요?**  
A: (글에서 보여준 것처럼) 지역 감지를 구현하여 미국 사용자에게만 외부 결제 옵션을 제공해야 합니다. 다른 지역의 경우 계속해서 Apple의 인앱 구매 시스템을 사용해야 합니다.

**Q: 실물 상품이나 앱 외부에서 소비되는 서비스에 이것을 사용할 수 있나요?**  
A: 네, Apple은 항상 실물 상품과 앱 외부에서 소비되는 서비스(승차 공유나 음식 배달 같은)에 대해 외부 결제 방법을 허용해 왔습니다.
