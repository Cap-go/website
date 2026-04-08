---
locale: ko
---

capgo/camera-preview 패키지 튜토리얼

이 튜토리얼에서는 Capacitor 프로젝트에서 `@capgo/camera-preview` 패키지를 사용하는 단계를 안내합니다. 이 패키지를 사용하면 JavaScript 및 HTML 코드에서 카메라와 상호 작용할 수 있습니다.

## 설치

`@capgo/camera-preview` 패키지를 설치하려면 터미널을 열고 다음 명령 중 하나를 실행하세요.

```bash
yarn add @capgo/camera-preview
```

또는

```bash
npm install @capgo/camera-preview
```

설치가 완료된 후 다음 명령을 실행하여 Capacitor 프로젝트를 동기화합니다.

```bash
npx cap sync
```

### 추가 Android 설치 단계

Android를 사용하는 경우 프로젝트에 몇 가지 추가 변경이 필요합니다. `android/app/src/main/AndroidManifestxml` 파일을 열고 닫는 `</application>` 태그 위에 다음 줄을 추가하여 CAMERA를 요청합니다. 허가:

```xml
<uses-permission android:name="android.permission.CAMERA" />
```

자세한 도움말은 [Capacitor 문서](https://capacitorjs.com/docs/android/configuration/#configuring-androidmanifestxml/)를 참조하세요.

### 추가 iOS 설치 단계

iOS를 사용하는 경우 `Infoplist` 파일에 두 가지 권한을 추가해야 합니다. [Capacitor 설명서](https://capacitorjs.com/docs/ios/configuration/#configuring-infoplist)에 따라 `NSCameraUsageDescription` 및 ` NSMicrophoneUsageDescription` 권한 `NSMicrophoneUsageDescription` 권한은 오디오를 사용할 경우에만 필요합니다. 오디오가 필요하지 않은 경우 `disableAudio` 옵션을 `true`로 설정하여 마이크 권한 요청을 비활성화할 수 있습니다.

### 추가 웹 설치 단계

Ionic과 함께 웹 플랫폼을 사용하는 경우 'appmodulets'의 입력 스크립트에 다음 줄을 추가하세요.

```typescript
import '@capgo/camera-preview';
```

이렇게 하면 Capacitor가 플러그인에서 웹 플랫폼을 등록할 수 있습니다.

## API

`@capgo/camera-preview` 패키지는 다음과 같은 API 메소드를 제공합니다:

### 시작(옵션: CameraPreviewOptions)

카메라 미리보기 인스턴스를 시작합니다.

### 멈추다()

카메라 미리보기 인스턴스를 중지합니다.

### 캡처(옵션: CameraPreviewPictureOptions)

카메라에서 사진을 캡처합니다.

### CaptureSample(옵션: CameraSampleOptions)

샘플 이미지 캡처

### getSupportedFlashModes()

지원되는 플래시 모드를 가져옵니다.

### getHorizontalFov()

수평 시야를 가져옵니다.

### setFlashMode(옵션: { flashMode: CameraPreviewFlashMode | string; })

플래시 모드를 설정합니다

### 뒤집기()

카메라를 뒤집는다

### setOpacity(옵션: CameraOpacityOptions)

카메라 불투명도를 설정합니다

### 녹화비디오 중지()

비디오 녹화를 중지합니다

### startRecordVideo(옵션: CameraPreviewOptions)

비디오 녹화를 시작합니다

이러한 메서드의 매개변수 및 반환 값에 대한 자세한 내용은 `@capgo/camera-preview` 패키지 문서를 참조하세요.

## 결론

이 튜토리얼에서는 Capacitor 프로젝트에서 `@capgo/camera-preview` 패키지를 설치하고 사용하는 방법을 배웠습니다. 사용 가능한 API 메소드와 사용법을 살펴보았습니다. 이제 이 패키지를 사용하여 카메라 기능을 애플리케이션에 통합할 수 있습니다.