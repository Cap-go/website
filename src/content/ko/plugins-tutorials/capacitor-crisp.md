---
locale: ko
---

@capgo/capacitor-crisp 패키지를 노래하세요

`@capgo/capacitor-crisp` 패키지를 사용하면 기본 SDK인 Crisp를 Capacitor 앱에 통합할 수 있습니다. Crisp 구성, 채팅 상자 열기, 사용자 세부 정보 설정, 이벤트 전송 등을 위한 방법을 제공합니다.

`@capgo/capacitor-crisp` 패키지를 시작하려면 다음 단계를 따르세요.

## 설치

1 터미널을 열고 Capacitor 앱의 루트 디렉터리로 이동합니다.
2 다음 명령을 실행하여 패키지를 설치합니다.

```bash
npm install @capgo/capacitor-crisp
npx cap sync
```

## Crisp 초기화

`@capgo/capacitor-crisp` 패키지에서 제공하는 방법을 사용하기 전에 웹 사이트 ID로 Crisp를 구성해야 합니다. 프로젝트에 다음 코드를 추가합니다.

```typescript
import { CapacitorCrisp } from '@capgo/capacitor-crisp';

CapacitorCrisp.configure({ websiteID: '******-****-****-****-********' });
```

'********-****-****-****-********'`를 실제 Crisp 웹사이트 ID로 바꾸세요.

### iOS 통합

iOS를 대상으로 하는 경우 앱의 Infoplist 파일에 다음 권한을 추가해야 합니다.

- 개인정보 보호 - 카메라 사용 설명(NSCameraUsageDescription)
- 개인 정보 보호 - 사진 라이브러리 추가 사용 설명(NSPhotoLibraryAddUsageDescription)

앱에 해당 권한이 필요한 이유를 설명하는 각 권한에 대한 설명을 제공하세요.

### 안드로이드 통합

Android 통합에는 추가 단계가 필요하지 않습니다.

## 채팅 상자를 엽니다

앱에서 Crisp 채팅 상자를 열려면 `@capgo/capacitor-crisp` 패키지에서 제공하는 `openMessenger` 메서드를 사용하세요. 프로젝트에 다음 코드를 추가하세요.

```typescript
import { CapacitorCrisp } from '@capgo/capacitor-crisp';

CapacitorCrisp.openMessenger();
```

그러면 사용자가 지원팀과 대화를 시작할 수 있는 Crisp 채팅 상자가 열립니다.

## 추가 기능

`@capgo/capacitor-crisp` 패키지는 Crisp를 사용자 정의하고 상호 작용하기 위한 여러 가지 다른 방법을 제공합니다. 사용 가능한 방법 중 일부는 다음과 같습니다.

- `setTokenID`: 사용자의 토큰 ID를 설정합니다.
- `setUser`: 닉네임, 전화번호, 이메일, 아바타 등 사용자 세부정보를 설정합니다.
- `pushEvent`: Crisp에 맞춤 이벤트 보내기
- `setCompany`: 이름, URL, 설명, 고용, 지리적 위치를 포함한 회사 세부정보 설정
- `setInt`: 맞춤 정수 값을 설정합니다.
- `setString`: 사용자 정의 문자열 값을 설정합니다.
- `sendMessage`: Crisp에게 채팅 메시지 보내기
- `setSegment`: 사용자의 세그먼트를 설정합니다.
- `reset`: Crisp 구성을 재설정합니다.

이러한 메서드와 해당 매개 변수에 대한 자세한 내용은 `@capgo/capacitor-crisp` 패키지의 공식 문서를 참조하세요.

그게 다야! `@capgo/capacitor-crisp` 패키지를 사용하여 Crisp를 Capacitor 앱에 통합하는 방법을 배웠습니다. Crisp 채팅 상자를 통해 사용자와 원활한 커뮤니케이션을 즐기세요.