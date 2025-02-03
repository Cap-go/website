---
title: 매뉴얼
description: Capgo 업데이트를 수동 모드에서 사용하는 방법
sidebar:
  order: 3
locale: ko
---

## 시작하기 전에

:::tip
이 도구를 무료로 사용하신다면, [GitHub 후원](https://githubcom/sponsors/riderx/)을 통해 제 작업을 지원해주시길 바랍니다.

저는 여기서 만든 모든 코드를 오픈소스로 공개하기로 결정했습니다.

높은 가격을 매기고 비공개로 유지할 수도 있었지만,

대신 이를 개방적이고 투명한 비즈니스로 만들고 싶었습니다.

싸우고 숨기는 대신 개방함으로써 우리 세상이 더 나아질 것이라고 생각합니다.

이를 가능하게 만들려면 여러분을 포함한 우리 모두가 각자의 역할을 해야 합니다 🥹

만약 Capgo 클라우드 서비스가 적합하지 않다면, [여기서](https://githubcom/sponsors/riderx/) 원하시는 방식으로 부트스트랩 메이커를 후원해주세요
:::

## 빠른 설치

```
npm install @capgo/capacitor-updater
npx cap sync
```

#### 설정

자동 업데이트를 비활성화하려면 다음을 설정에 추가하세요:

```tsx
// capacitorconfigjson
{
	"appId": "*******",
	"appName": "Name",
	"plugins": {
		"CapacitorUpdater": {
			"autoUpdate": false
		}
	}
}
```

그런 다음 수동 다운로드를 사용하기 위해 앱에 이 코드를 추가하세요

```typescript
import { CapacitorUpdater } from '@capgo/capacitor-updater'
import { SplashScreen } from '@capacitor/splash-screen'
import { App } from '@capacitor/app'
let data = {version: ""}
CapacitorUpdaternotifyAppReady()
AppaddListener('appStateChange', async(state) => {
     if (stateisActive) {
       // 다운로드 실패를 방지하기 위해 앱 사용 중일 때 다운로드 수행
       data = await CapacitorUpdaterdownload({
       version: '004',
       url: 'https://githubcom/Cap-go/demo-app/releases/download/004/distzip',
       })
     }
     if (!stateisActive && dataversion !== "") {
       // 사용자가 앱을 나갈 때 전환 수행
       SplashScreenshow()
       try {
         await CapacitorUpdaterset(data)
       } catch (err) {
         consolelog(err)
         SplashScreenhide() // set이 실패한 경우를 위해, 그렇지 않으면 새 앱에서 숨겨야 함
       }
     }
 })
```

⚠️ 손상된 업데이트를 전송하면, 앱은 마지막으로 작동했던 버전이나 네이티브 빌드에 포함된 버전으로 되돌아갑니다. 어느 것도 작동하지 않는 경우

## 데모 앱

더 자세한 정보는 데모 앱을 확인하세요

[GitHub - Cap-go/demo-app: 수동 및 자동 모드가 있는 데모 앱](https://githubcom/Cap-go/demo-app/)

## 패키지

릴리스/업데이트 서버 URL에서 다운로드하는 파일의 이름은 상관없지만, zip 파일에는 프로덕션 Capacitor 빌드 출력 폴더의 전체 내용이 포함되어야 합니다. 일반적으로 `{project directory}/dist/` 또는 `{project directory}/www/` 입니다.

여기에 `indexhtml`이 위치하며, 앱 실행에 필요한 모든 번들링된 JavaScript, CSS 및 웹 리소스도 포함되어야 합니다.

이 파일을 비밀번호로 암호화하지 마세요. 압축 해제에 실패할 것입니다.