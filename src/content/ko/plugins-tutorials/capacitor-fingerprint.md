---
locale: ko
---

@capgo/capacitor-fingerprint 패키지 노래 부르기

`@capgo/capacitor-fingerprint` 패키지는 Fingerprint PRO용 Capacitor 클라이언트입니다. 사기 탐지를 위해 100% 정확한 장치 식별을 제공합니다. 이 튜토리얼에서는 설치 프로세스와 패키지 API 사용 방법을 다룹니다.

## 설치

`@capgo/capacitor-fingerprint` 패키지를 설치하려면 다음 명령을 실행하세요:

```bash
npm install @capgo/capacitor-fingerprint
npx cap sync
```

## API 사용법

### 짐

`@capgo/capacitor-fingerprint` 플러그인을 로드하려면 `load` 기능을 사용하세요. 사용 방법에 대한 예는 다음과 같습니다.

```typescript
import { Plugins } from '@capacitor/core';

const { CapacitorFingerprint } = Plugins;

async function loadFingerprintPlugin() {
  try {
    await CapacitorFingerprint.load({
      // options
    });
    console.log('Fingerprint plugin loaded successfully');
  } catch (error) {
    console.error('Failed to load Fingerprint plugin:', error);
  }
}

loadFingerprintPlugin();
```

### 방문자 ID 받기

방문자 ID를 얻으려면 `getVisitorId` 함수를 사용하세요. 사용 방법의 예는 다음과 같습니다.

```typescript
import { Plugins } from '@capacitor/core';

const { CapacitorFingerprint } = Plugins;

async function getVisitorId() {
  try {
    const result = await CapacitorFingerprint.getVisitorId();
    const visitorId = result.visitorId;
    console.log('Visitor ID:', visitorId);
  } catch (error) {
    console.error('Failed to get Visitor ID:', error);
  }
}

getVisitorId();
```

### 방문자 데이터 가져오기

방문자 데이터를 얻으려면 `getVisitorData` 함수를 사용하세요. 사용 방법의 예는 다음과 같습니다.

```typescript
import { Plugins } from '@capacitor/core';

const { CapacitorFingerprint } = Plugins;

async function getVisitorData() {
  try {
    const result = await CapacitorFingerprint.getVisitorData();
    const visitorData = result.visitorData;
    console.log('Visitor Data:', visitorData);
  } catch (error) {
    console.error('Failed to get Visitor Data:', error);
  }
}

getVisitorData();
```

## 결론

이 튜토리얼에서는 `@capgo/capacitor-fingerprint` 패키지의 설치 프로세스와 API 사용 방법을 다루었습니다. 이제 Fingerprint PRO 서비스를 사용하여 장치 식별 및 사기 감지를 Capacitor 앱에 통합할 수 있습니다. 자세한 내용은 다음을 참조하세요. 패키지 문서를 살펴보고 패키지가 제공하는 추가 기능을 살펴보세요.