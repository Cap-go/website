---
locale: ko
---

@capgo/capacitor-flash 패키지 노래 부르기

`@capgo/capacitor-flash` 패키지를 사용하면 장치의 손전등/토치를 켜고 끌 수 있습니다. 이 튜토리얼에서는 Ionic Capacitor 앱에서 이 패키지를 설치하고 사용하는 과정을 안내합니다.

## 설치

`@capgo/capacitor-flash` 패키지를 설치하려면 프로젝트의 루트 디렉터리에서 다음 명령을 실행하세요.

```bash
npm install @capgo/capacitor-flash
npx cap sync
```

## iOS 설정

`@capgo/capacitor-flash` 패키지는 iOS에서 기본적으로 작동하므로 추가 설정이 필요하지 않습니다.

## 안드로이드 설정

Android의 경우 앱의 `AndroidManifestxml` 파일에서 필요한 권한을 선언해야 합니다. `<manifest>` 태그 안에 다음 줄을 추가하세요.

```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-feature android:name="android.hardware.camera" />
```

## API

`@capgo/capacitor-flash` 패키지는 다음과 같은 API 메소드를 제공합니다:

### 사용 가능()

이 방법은 장치에서 손전등을 사용할 수 있는지 확인합니다.

```javascript
import { CapacitorFlash } from '@capgo/capacitor-flash';

async function checkFlashlightAvailability() {
  const isAvailable = await CapacitorFlash.isAvailable();
  console.log('Flashlight availability:', isAvailable);
}
```

### 스위치 켜기(옵션)

이 메소드는 장치의 손전등을 켭니다. 손전등의 강도를 조정하는 옵션을 전달할 수 있습니다

```javascript
import { CapacitorFlash } from '@capgo/capacitor-flash';

async function switchOnFlashlight() {
  const options = {
    intensity: 100, // Set the intensity to 100%
  };
  await CapacitorFlash.switchOn(options);
  console.log('Flashlight switched on');
}
```

### 스위치끄기()

이 방법은 장치의 손전등을 끕니다.

```javascript
import { CapacitorFlash } from '@capgo/capacitor-flash';

async function switchOffFlashlight() {
  await CapacitorFlash.switchOff();
  console.log('Flashlight switched off');
}
```

### isSwitchedOn()

이 방법은 손전등이 현재 켜져 있는지 꺼져 있는지 확인합니다.

```javascript
import { CapacitorFlash } from '@capgo/capacitor-flash';

async function checkFlashlightStatus() {
  const isSwitchedOn = await CapacitorFlash.isSwitchedOn();
  console.log('Flashlight status:', isSwitchedOn ? 'ON' : 'OFF');
}
```

### 토글()

이 방법은 손전등을 토글합니다. 즉, 켜져 있으면 꺼지고 그 반대도 마찬가지입니다.

```javascript
import { CapacitorFlash } from '@capgo/capacitor-flash';

async function toggleFlashlight() {
  await CapacitorFlash.toggle();
  console.log('Flashlight toggled');
}
```

그게 다야! Ionic Capacitor 앱에서 `@capgo/capacitor-flash` 패키지를 사용하여 장치의 손전등/토치를 제어하는 ​​방법을 성공적으로 배웠습니다.