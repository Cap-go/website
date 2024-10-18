---
locale: ko
---

지오코딩에 @capgo/nativegeocoder 사용

`@capgo/nativegeocoder` 패키지는 기본 정방향 및 역방향 지오코딩 기능을 제공하는 커패시터 플러그인입니다. 지오코딩은 주소를 지리적 좌표(위도 및 경도)로 또는 그 반대로 변환하는 프로세스입니다.

`@capgo/nativegeocoder` 패키지를 사용하려면 아래 단계를 따르세요.

### 1단계: 패키지 설치

npm을 사용하여 패키지를 설치합니다.

```bash
npm install @capgo/nativegeocoder
```

### 2단계: 프로젝트 동기화

프로젝트를 동기화하려면 다음 명령을 실행하세요.

```bash
npx cap sync
```

### 3단계: 플러그인 가져오기

코드에서 `@capgo/nativegeocoder`에서 `NativeGeocoder`를 가져옵니다.

```javascript
import { NativeGeocoder } from '@capgo/nativegeocoder';
```

### 4단계: 지오코딩 기능 구현

`@capgo/nativegeocoder` 플러그인은 지오코딩을 위한 두 가지 주요 방법을 제공합니다.

#### 역지오코딩

역지오코딩은 지리적 좌표(위도 및 경도)를 주소로 변환하는 프로세스입니다.

```typescript
const reverseOptions = {
  latitude: 37.7749,
  longitude: -122.4194,
};

const address = NativeGeocoder.reverseGeocode(reverseOptions);
console.log(address);
```

'reverseGeocode' 메소드는 위도 및 경도 속성을 가진 객체를 가져와서 결과로 주소를 반환합니다.

#### 순방향 지오코딩

정방향 지오코딩은 주소를 지리적 좌표(위도 및 경도)로 변환하는 프로세스입니다.

```typescript
const forwardOptions = {
  address: '1600 Amphitheatre Parkway, Mountain View, CA',
};

const coordinates = NativeGeocoder.forwardGeocode(forwardOptions);
console.log(coordinates);
```

`forwardGeocode` 메소드는 주소 속성을 가진 객체를 가져오고 결과로 좌표를 반환합니다.

### 결론

`@capgo/nativegeocoder` 패키지는 Capacitor 프로젝트에서 지오코딩을 수행하는 간단하고 효율적인 방법을 제공합니다. 이 튜토리얼에 설명된 단계를 따르면 지오코딩 기능을 애플리케이션에 쉽게 통합할 수 있습니다.