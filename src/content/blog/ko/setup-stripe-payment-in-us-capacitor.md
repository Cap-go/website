---
slug: setup-stripe-payment-in-us-capacitor
title: Capacitor 앱에서 새로운 Apple 가이드라인에 따라 Stripe 결제 링크 구현하기
description: >-
  캡acitator 앱에서 Stripe 결제 링크를 구현하여 2025년 5월 1일부터 시행되는 새로운 Apple 지침에 따라 디지털 상품
  결제를 처리하는 방법을 배워보세요.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2025-05-01T00:00:00.000Z
updated_at: 2025-05-01T00:00:00.000Z
head_image: /stripe_apple.webp
head_image_alt: Capacitor 앱에서 Stripe 결제 구현
keywords: >-
  capacitor, stripe, payment links, app store guidelines, iOS, digital goods,
  in-app purchases, external payments
tag: Tutorial
published: true
locale: ko
---
# Capacitor 앱에서 Stripe 결제 링크 구현하기: 새로운 Apple 가이드라인에 따른 규정

2025년 5월 1일부터 Apple은 [Epic v. Apple 사건](https://storage.courtlistener.com/recap/gov.uscourts.cand.364265/gov.uscourts.cand.364265.1508.0_2.pdf)의 법원 판결에 따라 App Store 리뷰 가이드라인에 대한 중대한 변경 사항을 도입했습니다. 이러한 변경 사항은 특히 미국의 앱 개발자들이 디지털 상품 및 서비스에 대한 외부 결제 방법으로 연결할 수 있도록 하여, Apple의 인앱 구매 시스템에 대한 대안을 열어줍니다.

## 모바일 결제를 영원히 변화시킨 에픽 전투

이 순간에 이르기까지의 길은 길고 논란이 많았습니다. 이 모든 것은 2020년 8월, 인기 게임 Fortnite의 제작사 Epic Games가 Apple의 30% 수수료를 우회하는 직접 결제 옵션을 구현하면서 Apple의 App Store 가이드라인을 고의적으로 위반했을 때 시작되었습니다. Apple은 즉시 Fortnite를 App Store에서 제거했으며, Epic은 Apple의 iOS 앱 배포 및 인앱 결제에 대한 통제를 도전하는 소송을 제기했습니다.

수년 간의 법정 싸움, 항소 및 반항소 끝에 법원은 Apple이 개발자가 앱 외부의 대체 결제 방법으로 사용자들을 유도하도록 허용해야 한다고 최종 판결했습니다. 이 결정은 2008년 시작 이후 동일한 기본 재정 모델로 운영되어 온 App Store 생태계의 경제학을 근본적으로 변화시킵니다.

### 최종 판결 - 더 이상 항소 없음

이 판결의 특히 중요한 점은 최종적이며 더 이상 항소할 수 없다는 것입니다. 대법원은 2025년 초 Apple의 항소를 기각하여 하급 법원의 결정을 법의 통치로 확립했습니다. 이는 개발자들이 Apple이 이후의 법적 도전으로 이 결정을 뒤집을 수 없다는 확신을 가지고 외부 결제 방법을 구현할 수 있음을 의미합니다.

### 법에 의해 보장된 동등한 대우

가장 중요한 것은 이 판결이 Apple이 외부 결제 방법을 사용하는 앱에 대해 차별할 수 없다고 명시하고 있다는 것입니다. 법원은 특히 Apple이:

1. 외부 결제 방법을 사용하는 앱에 대해 추가 수수료를 부과하거나 추가 요구사항을 강요하는 것
2. Apple의 인앱 구매 시스템을 독점적으로 사용하는 앱에 대해 검색 결과나 피처링에서 우대하는 것
3. 기술적 조치를 사용하여 외부 결제 경험을 Apple 자신의 시스템보다 열등하게 만드는 것
4. 기본 소비자 정보 외에 부담스러운 공시 요구사항을 부과하는 것

이러한 명시적 보호 조항은 개발자들이 Apple의 미묘한 보복이나 차별에 대한 두려움 없이 Stripe 또는其他 외부 결제 제공자를 구현할 수 있도록 합니다. 법적으로 평준화된 경쟁 환경이 조성되었으며, Apple은 결제 방법 선택에 관계없이 모든 앱을 동등하게 대우해야 합니다.

이 판결은 Apple의 폐쇄적인 접근 방식에 대한 가장 중대한 도전 중 하나를 나타내며, 모바일 앱 수익화 방식의 중대한 변화를 의미합니다. Apple의 30% 수수료(소기업의 경우 15%로 인하)에 오랜 불만을 품어온 개발자들에게 이 판결은 더 높은 이익 마진과 고객 경험에 대한 더 많은 통제의 길을 열어줍니다.

## Apple의 인앱 구매에 비해 Stripe 사용의 재정적 이점

이 변화의 재정적 영향은 개발자들에게 상당합니다:

- **감소된 결제 처리 수수료**: Apple은 인앱 구매에 대해 일반적으로 30% 커미션(소기업의 경우 15%)을 부과하는 반면, Stripe의 수수료는 거래당 약 2.9% + $0.30입니다. 이러한 차이는 수익 마진을 크게 증가시킬 수 있습니다.

- **더 빠른 지급**: Apple을 사용할 경우, 보통 자금을 받기 위해 45-90일을 기다려야 합니다. 반면 Stripe는 2-3 영업일 내에 자금을 귀하의 은행 계좌로 지급합니다.

- **간소화된 환불 프로세스**: Apple의 복잡한 환불 시스템을 거치지 않고 Stripe의 대시보드를 통해 직접 환불을 처리할 수 있습니다.

이러한 비용 절감 및 개선된 현금 흐름은 특히 소규모 개발자와 기업에게 큰 변화를 가져올 수 있습니다.

이 기사에서는 Apple의 [업데이트된 가이드라인](https://developer.apple.com/app-store/review/guidelines/#business)을 준수하면서 이러한 새로운 규칙을 활용하기 위해 Capacitor 앱에서 Stripe 결제 링크를 구현하는 방법을 탐구합니다.

> 이 구현은 [결제 링크에 대한 Stripe의 공식 문서](https://docs.stripe.com/mobile/digital-goods/payment-links)를 기반으로 하며, Capacitor 앱에 맞게 조정되었습니다.

## 새로운 가이드라인 이해하기

업데이트된 App Store 리뷰 가이드라인은 이제 개발자가 디지털 상품 및 구독 결제를 위해 외부 웹사이트로 사용자들을 유도할 수 있도록 허용합니다. 이 변화는 현재 미국 App Store에서 배포되는 앱에만 적용됩니다.

여기서 이해해야 할 주요 사항들:

1. 이제 앱 내에서 디지털 상품에 대한 외부 결제 옵션에 링크할 수 있습니다.
2. 이는 미국 App Store의 앱에만 적용됩니다.
3. 여전히 Apple의 공시 요구 사항을 준수해야 합니다.
4. 모든 고객 지원 및 환불 처리에 대한 책임이 있습니다.

## Capacitor 앱에서 Stripe 결제 링크 설정하기

이제 기술적 구현으로 들어가 보겠습니다:

### 단계 1: Stripe 대시보드에서 결제 링크 만들기

먼저 Stripe 대시보드에서 결제 링크를 생성합니다:

1. Stripe 대시보드의 결제 링크 섹션으로 이동합니다.
2. "+ 새로 만들기"를 클릭하여 새 결제 링크를 생성합니다.
3. 제품 또는 구독 세부 정보를 정의합니다.
4. "결제 후" 설정에서 "확인 페이지 표시하지 않기"를 선택합니다.
5. 성공 URL로서 유니버설 링크를 설정합니다(이것은 나중에 구성할 것입니다).
6. "링크 생성"을 클릭하여 결제 링크를 생성합니다.

### 단계 2: Capacitor 앱에서 유니버설 링크 설정하기

결제 완료 후 사용자를 앱으로 다시 리디렉션하기 위해 유니버설 링크를 구성합니다:

1. 도메인에 `apple-app-site-association` 파일을 생성합니다:

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

2. 이 파일을 `https://yourdomain.com/.well-known/apple-app-site-association`에 호스팅합니다.

3. 올바른 MIME 타입 `application/json`으로 제공되는지 확인합니다.

4. Capacitor 앱에서 유니버설 링크를 처리하도록 적절한 권한을 추가하여 구성합니다. 먼저 `capacitor.config.ts`에서:

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

5. Xcode 프로젝트에 Associated Domains 권한을 추가합니다:
   - Xcode 프로젝트를 엽니다.
   - 앱 대상을 선택합니다.
   - "Signing & Capabilities"로 이동합니다.
   - "+ Capability"를 클릭하고 "Associated Domains"를 선택합니다.
   - `applinks:yourdomain.com`을 추가합니다.

### 단계 3: 대체 페이지 만들기

앱이 설치되지 않은 경우를 처리하기 위해 리디렉션 URL에 대체 페이지를 만듭니다:

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

### 단계 4: Capacitor 앱에서 결제 버튼 구현하기

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

> **왜 Safari가 중요한가**: 결제 링크를 인앱 브라우저가 아닌 Safari에서(`window.open`을 통해) 여는 것은 사용자들이 Stripe Link에 이전에 저장한 결제 정보를 자동으로 사용할 수 있게 하여 유리합니다. 이는 사용자들이 신용 카드 정보를 다시 입력할 필요가 없어 원활한 체크아웃 경험을 제공하여 이탈률과 마찰을 크게 줄일 수 있습니다.

### 단계 5: 앱에서 유니버설 링크 처리하기

사용자가 다시 리디렉션될 때 앱이 유니버설 링크를 처리하도록 구성합니다:

1. 먼저, 앱 플러그인을 설치합니다:

```bash
npm install @capacitor/app
```

2. 앱에서 앱 플러그인을 등록합니다:

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

### 단계 6: 주문 이행을 위한 웹훅 설정하기

마지막으로, 서버에서 성공적인 결제를 처리하기 위한 웹훅을 구성합니다:

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

분명히 하자면, Epic v. Apple 판결은 모바일 결제 생태계를 근본적으로 변화시켰습니다. iOS 앱에 직접적인 영향을 미칠 뿐만 아니라, 외부 결제 방법을 사용해 온 Android 개발자들에게도 그 위치를 강화시킵니다.

**Android 개발자들은 이제 외부 결제 솔루션을 완전히 확신하고 구현할 수 있습니다.** Apple의 판결이 설정한 선례는 플랫폼 전반에 걸쳐 개발자들을 잠재적인 미래 제한으로부터 효과적으로 보호합니다. 이 법원 결정은 많은 Android 개발자들이 수년 간 해온 일을 증명해주었습니다 - 더 낮은 수수료로 대체 결제 옵션을 제공하는 것입니다.

Google Play Store는 항상 Apple보다 외부 결제 방법에 대해 덜 제한적이었으며, 이제 법적 선례가 마련되었으므로, Android 앱에서 Stripe 또는 다른 외부 결제 제공자를 구현하는 데 사실상 위험이 없습니다. 이러한 구현을 진행하면서 법적 기초가 확고하다는 것을 알고 나아갈 수 있습니다.

앞서 다룬 iOS에 대한 구현은 Android 디바이스에서도 거의 동일하게 작동합니다. Google Play Store는 외부 결제 방법에 대한 제한이 없으므로, 특별한 공시 대화 상자 없이 동일한 Stripe 결제 링크 접근 방식을 사용할 수 있습니다.

딥 링크를 처리하기 위해 (iOS의 유니버설 링크에 해당하는), 다음을 수행해야 합니다:

1. 리디렉션 URL을 처리하기 위해 `AndroidManifest.xml`에서 앱 링크를 설정합니다.
2. 도메인에 앱의 세부 정보를 가진 `.well-known/assetlinks.json` 파일을 생성합니다.
3. 성공적인 결제를 처리하기 위해 동일한 `appUrlOpen` 리스너 로직을 사용합니다.

Capacitor의 장점은 플랫폼 특정 구성 작업을 완료한 후에도 실제 결제 흐름 코드는 양쪽 플랫폼 모두에서 동일하게 유지된다는 것입니다.

## 결제 UI 생성하기

여기 Capacitor 앱에 추가할 수 있는 결제 버튼 컴포넌트의 예가 있습니다:

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

## 다양한 지역 처리하기

새로운 Apple 가이드라인이 미국 App Store의 앱에만 적용되므로, 사용자 지역을 감지하고 적절한 결제 방법을 적용하기 위한 전략이 필요합니다. 다음은 IP 지리 위치를 사용한 더 신뢰할 수 있는 접근 방식입니다:

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

이 접근 방식은 사용자의 IP 주소에 따라 사용자의 국가를 확인하기 위해 무료 `ipapi.co` 서비스를 사용합니다. MaxMind와 같은 다른 지리 위치 서비스를 사용하거나 보안을 위해 이 체크를 서버 측에서 구현할 수도 있습니다.

> **주의**: 이 접근 방식이 작동하지만, IP 지리적 위치 정보가 항상 100% 정확하지 않다는 점을 기억하는 것이 중요합니다. 미션 크리티컬 애플리케이션의 경우 여러 탐지 방법을 사용하거나 사용자가 수동으로 지역을 선택할 수 있도록 고려하세요.

### Capacitor 플러그인을 통한 보다 정확한 위치 탐지

보다 정확한 위치 탐지를 위해 Capacitor Geolocation 플러그인과 @capgo/nativegeocoder를 함께 사용하여 사용자의 국가를 더 높은 정밀도로 결정할 수 있습니다:

1. 먼저, 필요한 플러그인을 설치합니다:

```bash
npm install @capacitor/geolocation @capgo/nativegeocoder
```

2. Capacitor 프로젝트에서 플러그인을 구성합니다. 다음 내용을 `capacitor.config.ts`에 추가하세요:

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

3. 위치 기반 지역 탐지를 구현합니다:

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

이 구현은 사용자가 물리적으로 미국에 위치하는지 여부를 결정하는 더 정확한 방법을 제공합니다. 처음에는 장치의 GPS와 네이티브 지오코더를 사용하여 국가를 결정하려고 시도합니다. 이 과정이 실패하면(권한 문제나 기타 오류로 인해) IP 기반 탐지로 넘어갑니다.

`info.plist`(iOS) 및 `AndroidManifest.xml`(Android) 파일에 필요한 권한을 추가하는 것을 잊지 마세요:

iOS (`ios/App/App/Info.plist`):
```xml
<key>NSLocationWhenInUseUsageDescription</key>
<string>We need your location to determine which payment method to use based on regional availability.</string>
```

Android (`android/app/src/main/AndroidManifest.xml`):
```xml
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
```

이 접근 방식을 사용하면 새로운 Apple 가이드라인에 따라 사용자가 외부 결제 옵션을 이용할 수 있는 가장 정확한 방법을 제공합니다.

## 구독 관리

결제를 위해 Stripe를 사용하는 주요 장점 중 하나는 구독을 제공하고 관리할 수 있는 능력입니다. Capacitor 앱에서 구독 관리를 처리하는 방법은 다음과 같습니다:

### 1. 구독 관리 페이지 생성

사용자의 활성 구독을 표시하기 위해 앱에 구독 관리 페이지를 추가합니다:

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

### 2. 구독 관리를 위한 고객 포털

Stripe는 사용자가 구독을 관리할 수 있도록 하는 고객 포털을 제공합니다. 서버에서 이 포털로의 링크를 생성할 수 있습니다:

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

## 앱 스토어 준수 보장

구현이 Apple의 지침을 준수하는지 확인하려면:

1. 외부 구매에 대한 적절한 공지를 포함합니다
2. 사용자가 앱을 떠나는 것임을 알리는 모달 시트를 구현합니다(Apple에서 요구함)
3. 앱 내에서 이루어진 구매에 대해 Apple의 수수료를 우회하려고 시도하지 않습니다
4. Apple이 거래에 책임이 없음을 사용자에게 명확히 전달합니다

필요한 공지 모달을 구현한 예시는 다음과 같습니다:

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

## 구현 테스트

구현을 테스트하려면:

1. 앱 내 결제 버튼을 클릭하면 공지가 표시된 후 Stripe 결제 페이지가 열립니다
2. Stripe 테스트 카드 `4242 4242 4242 4242`를 사용하여 테스트 결제를 완료합니다
3. 결제가 완료되면, 사용자에게 보편적인 링크를 통해 앱으로 다시 리디렉션되어야 합니다
4. 웹훅이 `checkout.session.completed` 이벤트를 수신했는지 확인합니다

## 결론

iOS 앱에서 디지털 상품에 대해 외부 결제 옵션을 사용할 수 있는 능력은 개발자에게 더 큰 유연성을 제공하는 중대한 변화입니다. 이 변화는 현재 미국 App Store의 앱에만 해당되지만, Apple의 인앱 구매 시스템에 대한 중요한 대안을 제공합니다.

Stripe Payment Links와 Capacitor를 사용하면 Apple의 가이드라인을 준수하면서 간소화된 결제 경험을 빠르게 구현할 수 있습니다. 이 접근 방식은 Stripe의 강력한 결제 인프라, 낮은 처리 수수료(3% 대 30%), 그리고 Apple의 인앱 구매 시스템에 비해 훨씬 빠른 지급(몇 달이 아닌 몇 일)이라는 장점을 제공합니다.

모든 고객 지원 및 환불 문제는 Apple의 생태계 외부에서 발생하므로 직접 처리해야 한다는 점을 기억하세요.

Capacitor 앱에 Stripe Payment Links를 구현하셨나요? 아래 댓글에서 경험을 공유해 주세요!

## 자주 묻는 질문

**Q: 이 접근 방식이 Apple의 지침을 준수하나요?**  
A: 예, 2025년 5월 1일부로 Apple은 미국 App Store에서 배포되는 앱의 디지털 상품 및 서비스에 대해 외부 결제 방법으로 연결하는 것을 허용하며, 필요 공지를 포함하면 됩니다.

**Q: 외부 결제 방법을 사용할 때 Apple의 수수료를 지불해야 하나요?**  
A: 아니요, 새로운 규칙의 주요 이점 중 하나는 Apple의 시스템 외부에서 처리된 결제는 그들의 수수료에 적용되지 않습니다.

**Q: 제 회사가 이 새로운 규칙을 활용하기 위해 미국에 기반해야 하나요?**  
A: 아니요, 세계 어디에서나 회사는 미국 App Store에서 앱을 이용할 수 있고, 구매를 하는 사용자가 미국에 위치하기만 하면 외부 결제 방법을 구현할 수 있습니다. 이 규칙은 시장(미국 App Store)과 사용자 위치에 적용되며, 회사 위치에는 적용되지 않습니다. 이는 유럽, 아시아, 남미 또는 다른 곳의 개발자도 미국 기반 고객을 위해 Stripe Payment Links를 구현할 수 있음을 의미합니다.

**Q: 미국 외부의 사용자가 외부 결제 옵션을 사용하려고 하면 어떻게 되나요?**  
A: (기사를 통해 표시된 대로) 미국의 사용자에게만 외부 결제 옵션을 제공하기 위해 지역 탐지를 구현해야 합니다. 다른 지역의 경우 Apple의 인앱 구매 시스템을 계속 사용해야 합니다.

**Q: 이 방법을 앱 외부에서 소비되는 물리적 상품이나 서비스에 사용할 수 있나요?**  
A: 예, Apple은 앱 외부에서 소비되는 물리적 상품 및 서비스에 대해 항상 외부 결제 방법을 허용했습니다(예: 차량 공유 또는 음식 배달).
