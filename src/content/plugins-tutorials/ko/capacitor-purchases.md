---
locale: ko
---

@capgo/capacitor-purchases 패키지 튜토리얼을 노래하세요.

이 튜토리얼은 Capacitor에서 인앱 구매를 위해 @capgo/capacitor-purchases 패키지를 사용하는 과정을 안내합니다.

## 1단계: 패키지 설치

@capgo/capacitor-purchases 패키지를 설치하려면 터미널을 열고 다음 명령을 실행하십시오.

```bash
npm install @capgo/capacitor-purchases
npx cap sync
```

## 2단계: Android 플랫폼 구성

Android 플랫폼을 대상으로 하는 경우 android/app/src/main/AndroidManifestxml 파일에 일부 구성을 추가해야 합니다. 파일을 열고 다음 코드 조각을 추가합니다.

```xml
<!-- Add your configuration here -->
```

## 3단계: 패키지 설정

@capgo/capacitor-purchases 패키지를 설정하려면 API 키 및 선택적 앱 사용자 ID와 함께 `setup` 메서드를 사용하세요. 다음은 예입니다.

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

## 4단계: 구매 업데이트 이벤트 처리

"purchasesUpdate" 이벤트를 수신하여 사용자 구매에 변경 사항이 있을 때 알림을 받을 수 있습니다. 다음은 이벤트에 대한 리스너를 추가하는 방법에 대한 예입니다.

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

## 5단계: 사용 가능한 제품 가져오기

`getOfferings` 메소드를 사용하여 사용자가 사용할 수 있는 제품을 가져올 수 있습니다. 예는 다음과 같습니다.

```typescript
import { Plugins } from "@capacitor/core";

const { CapacitorPurchases } = Plugins;

const getOfferings = async () => {
  const offerings = await CapacitorPurchases.getOfferings();
  console.log(offerings);
};

getOfferings();
```

## 6단계: 패키지 구매

구매하려면 패키지 ID와 함께 `purchasePackage` 메소드를 사용하세요. 예는 다음과 같습니다.

```typescript
import { Plugins } from "@capacitor/core";

const { CapacitorPurchases } = Plugins;

const purchasePackage = async (packageId: string) => {
  await CapacitorPurchases.purchasePackage({ packageId });
};

purchasePackage("PACKAGE_ID");
```

## 7단계: 구매 복원

사용자의 구매를 복원하려면 `restorePurchases` 메소드를 사용하세요. 다음은 예입니다:

```typescript
import { Plugins } from "@capacitor/core";

const { CapacitorPurchases } = Plugins;

const restorePurchases = async () => {
  await CapacitorPurchases.restorePurchases();
};

restorePurchases();
```

## 바로 그거야!

Capacitor에서 인앱 구매를 위해 @capgo/capacitor-purchases 패키지를 사용하는 방법을 성공적으로 배웠습니다. 즐거운 코딩 되세요!