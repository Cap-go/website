---
locale: ko
---

@capgo/capacitor-mute 패키지를 노래하세요

`@capgo/capacitor-mute` 패키지는 장치에서 음소거 스위치가 활성화 또는 비활성화되었는지 감지할 수 있는 커패시터 플러그인입니다. 장치의 음소거 상태를 확인하기 위한 간단한 API를 제공합니다.

## 설치

npm을 사용하여 `@capgo/capacitor-mute` 패키지를 설치할 수 있습니다.

```bash
npm install @capgo/capacitor-mute
npx cap sync
```

## 용법

`@capgo/capacitor-mute` 패키지를 사용하려면 패키지를 가져와 `isMulated()` 메서드를 호출해야 합니다.

```typescript
import { isMuted } from '@capgo/capacitor-mute';

isMuted().then((result) => {
  console.log('Mute status:', result);
}).catch((error) => {
  console.error('Error checking mute status:', error);
});
```

`isMute()` 메소드는 장치가 음소거되었는지 여부를 나타내는 부울 값으로 확인되는 Promise를 반환합니다. Promise가 거부되면 오류 메시지가 표시됩니다.

## 예

다음은 `@capgo/capacitor-mute` 패키지를 사용하여 장치의 음소거 상태를 확인하고 결과에 따라 메시지를 표시하는 방법의 예입니다.

```typescript
import { isMuted } from '@capgo/capacitor-mute';

isMuted().then((result) => {
  if (result) {
    console.log('The device is currently muted');
    // Display a message or perform some actions for muted device
  } else {
    console.log('The device is not muted');
    // Display a message or perform some actions for non-muted device
  }
}).catch((error) => {
  console.error('Error checking mute status:', error);
});
```

이 예에서는 장치가 음소거된 경우 "장치가 현재 음소거되어 있습니다"라는 메시지가 표시됩니다. 장치가 음소거되지 않은 경우 "장치가 음소거되지 않았습니다."라는 메시지가 표시됩니다.

## 가능한 문제

Xcode 14가 설치된 iOS 장치에서는 '@capgo/capacitor-mute' 라이브러리가 Apple에서 예상한 대로 구성되지 않을 수 있습니다. 이 문제는 현재 라이브러리 개발자가 해결하고 있습니다. 이 문제를 해결하려면 다음 지침을 따르세요. 패키지 문서의 [알려진 문제](https://githubcom/CocoaPods/CocoaPods/issues/8891/) 섹션

## 결론

`@capgo/capacitor-mute` 패키지는 장치의 음소거 상태를 감지할 수 있는 유용한 Capacitor 플러그인입니다. 이 튜토리얼에 설명된 설치 및 사용 단계를 따르면 이 패키지를 Capacitor 프로젝트에 쉽게 통합하고 활용할 수 있습니다. 음소거 상태를 확인하는 API