---
locale: ko
---

capgo/capacitor-updater 패키지 튜토리얼

이 튜토리얼은 `@capgo/capacitor-updater` 패키지를 사용하여 Ionic Capacitor 앱에서 자동 업데이트를 활성화하는 과정을 안내합니다.

## 전제 조건

시작하기 전에 다음이 설치되어 있는지 확인하십시오.

- Nodejs
- npm

## 설치

`@capgo/capacitor-updater` 패키지를 설치하려면 터미널이나 명령 프롬프트를 열고 다음 명령을 실행하세요.

```
npm install @capgo/capacitor-updater
```

그러면 프로젝트에 패키지가 다운로드되어 설치됩니다.

### 플러그인 설치

앱에 다음 코드가 추가되어야 합니다.

`npm i @capgo/capacitor-updater && npx cap sync`
Capacitor 앱에 플러그인을 설치하려면

그런 다음 이 코드를 앱에 추가하여 JS 번들이 정상임을 네이티브 플러그인에 알리고, 그렇게 하지 못할 경우 네이티브 플러그인은 이전 버전으로 롤백합니다.

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()
```

그러면 기본 플러그인에 설치가 성공했음을 알립니다.

그런 다음 `npm run build && npx cap copy`를 수행하여 앱을 업데이트하세요.

### Capgo CLOUD에 로그인하세요.

먼저 계정에 있는 `all` [apikey](https://webcapgoapp/dashboard/apikeys/)를 사용하여 CLI로 로그인합니다.

`npx @capgo/cli@최신 로그인 YOU_KEY`

### 첫 번째 앱 추가

먼저 CLI를 사용하여 Capgo Cloud에서 앱을 만들어 시작해 보겠습니다.

`npx @capgo/cli@최신 앱 추가`

이 명령은 Capacitor 구성 파일에 정의된 모든 변수를 사용하여 앱을 생성합니다.

### 첫 번째 버전 업로드

명령을 실행하여 코드를 빌드하고 다음을 사용하여 Capgo로 보냅니다.
`npx @capgo/cli@최신 번들 업로드`

기본적으로 버전 이름은 `packagejson` 파일에 있는 이름입니다.

빌드가 있는지 [Capgo](https://webcapgoapp/)에서 확인하세요.

내 [모바일 샌드박스 앱](https://capgoapp/app_mobile/)으로 테스트할 수도 있습니다.

### 채널을 기본 채널로 설정

앱을 Capgo로 보낸 후 앱이 Capgo에서 업데이트를 받을 수 있도록 채널을 '기본값'으로 설정해야 합니다.

`npx @capgo/cli@latest 채널 세트 제작 -s 기본값`

## 장치에서 실시간 업데이트 받기

애플리케이션이 Deploy에서 라이브 업데이트를 받으려면 기기나 에뮬레이터에서 앱을 실행해야 합니다. 가장 쉬운 방법은 다음 명령을 사용하여 연결된 에뮬레이터나 기기에서 로컬 앱을 실행하는 것입니다. 당신의 컴퓨터에

    npx 캡 실행 [ios | 기계적 인조 인간]

앱을 열고 백그라운드에 두고 다시 열면 앱이 업데이트를 수행한 로그가 표시됩니다.

축하해요! 🎉 첫 번째 라이브 업데이트를 성공적으로 배포했습니다. 이는 라이브 업데이트로 수행할 수 있는 작업의 시작일 뿐입니다. 자세히 알아보려면 전체 [라이브 업데이트 문서](/docs/plugin/cloud-mode/getting-started/)를 확인하세요.


> 로컬에서 업데이트 수신을 중지해야 하는 경우 이 명령을 실행하세요.
`npx @capgo/cli@최신 채널 세트`


## 결론

축하해요! Ionic Capacitor 앱에서 자동 업데이트를 활성화하기 위해 `@capgo/capacitor-updater` 패키지를 사용하는 방법을 성공적으로 배웠습니다. 자동 업데이트를 선택하든 수동 설정을 선택하든 이제 앱을 최신 상태로 유지할 수 있는 도구가 있습니다. -쉽게 데이트하세요