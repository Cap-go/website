---
locale: ko
---

@capgo/native-purchases 패키지를 노래하세요

@capgo/native-purchases 패키지는 간편한 인앱 구매 기능을 제공하는 Capacitor용 플러그인입니다. 이 튜토리얼에서는 Capacitor 프로젝트에서 패키지를 설치하고 사용하는 단계를 안내합니다.

## 설치

@capgo/native-purchases 패키지를 설치하려면 터미널을 열고 다음 명령을 실행하십시오.

```bash
npm install @capgo/native-purchases
npx cap sync
```

그러면 패키지가 설치되고 네이티브 파일이 프로젝트와 동기화됩니다.

### 안드로이드 설정

Android를 사용하는 경우 AndroidManifestxml 파일에 일부 구성을 추가해야 합니다. `android/app/src/main/AndroidManifestxml`에 있는 파일을 열고 다음 코드를 추가합니다.

```xml
<!-- Add any necessary configuration here -->
```

### iOS 설정

iOS를 사용하는 경우 추가 단계가 필요하지 않습니다.

## 패키지 사용하기

@capgo/native-purchases 패키지는 인앱 구매를 처리하기 위한 여러 방법을 제공합니다. 다음은 이러한 방법을 사용하는 방법에 대한 몇 가지 예입니다.

### 구매 복원

사용자의 이전 구매를 복원하려면 `restorePurchases()` 메서드를 사용하세요.

```typescript
import { nativePurchases } from '@capgo/native-purchases';

nativePurchases.restorePurchases();
```

### 제품 구매

특정 제품에 대한 구매를 시작하려면 'purchaseProduct()' 메서드를 사용하세요.

```typescript
import { nativePurchases } from '@capgo/native-purchases';

nativePurchases.purchaseProduct({ productIdentifier: 'com.example.product' });
```

### 제품 정보 얻기

특정 제품에 대한 정보를 검색하려면 `getProducts()` 메서드를 사용하세요.

```typescript
import { nativePurchases } from '@capgo/native-purchases';

nativePurchases.getProducts({ productIdentifiers: ['com.example.product'] });
```

다음은 @capgo/native-purchases 패키지를 사용하는 방법에 대한 몇 가지 예입니다. 사용 가능한 메서드와 해당 매개 변수에 대한 자세한 내용은 패키지 설명서를 참조하세요.

## 결론

이 튜토리얼에서는 @capgo/native-purchases 패키지의 설치 프로세스와 기본 사용법을 다뤘습니다. 여기에 설명된 단계를 따르면 인앱 구매 기능을 Capacitor 프로젝트에 통합할 수 있습니다.