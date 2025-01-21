---
locale: ko
---

capgo/커패시터-스크린 레코더
장치 화면을 녹화하기 위한 Capacitor 플러그인

## 설치
패키지를 설치하려면 다음 명령을 실행하십시오.
```
npm install @capgo/capacitor-screen-recorder
npx cap sync
```
플러그인이 제대로 작동하려면 필요한 권한과 구성을 추가하세요.

## 용법
화면 녹화를 시작하려면 'start()' 메서드를 사용하세요.
```typescript
import { Plugins } from '@capacitor/core';
const { CapacitorScreenRecorder } = Plugins;

CapacitorScreenRecorder.start();
```

녹음을 중지하려면 `stop()` 메서드를 사용하세요.
```typescript
import { Plugins } from '@capacitor/core';
const { CapacitorScreenRecorder } = Plugins;

CapacitorScreenRecorder.stop();
```

그게 다야! 이제 Capacitor Screen Recorder 플러그인을 사용하여 장치의 화면을 녹화할 수 있습니다.
## 안드로이드

이 권한을 추가하세요
```xml
  <uses-permission android:name="android.permission.CAPTURE_VIDEO_OUTPUT" />
  <uses-permission android:name="android.permission.FOREGROUND_SERVICE_MEDIA_PROJECTION" />
```

## 호환성
이 플러그인은 Capacitor 4 이상과 호환됩니다.

## 기여
이 플러그인에 대한 기여에 크게 감사드립니다. 문제가 발생하거나 제안 사항이 있는 경우 언제든지 끌어오기 요청을 제출하거나 GitHub 저장소에 문제를 생성해 주세요.

## 라이선스
이 패키지는 MIT 라이선스에 따라 라이선스가 부여됩니다.