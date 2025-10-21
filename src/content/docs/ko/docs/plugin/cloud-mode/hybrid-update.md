---
title: 하이브리드 업데이트
description: 자동 업데이트를 위한 업데이트 방법
sidebar:
  order: 3
locale: ko
---

사용자에게 업데이트를 푸시할 때, 업데이트를 적용하기 전에 상황에 맞게 업데이트 주기를 처리하는 몇 가지 방법이 있습니다

- 자동 업데이트
- ```updateAvailable``` 이벤트 감지
- 모달 창 표시 또는 업데이트 지연

## 자동 업데이트

`directUpdate`를 `true`로 설정하여 앱 시작마다 업데이트 주기가 강제로 실행되도록 할 수 있습니다.
이는 사용자 상호작용 없이 일반적인 업데이트 주기를 트리거합니다

```tsx
// capacitorconfigjson
{
	"appId": "*******",
	"appName": "Name",
	"plugins": {
		"CapacitorUpdater": {
			"directUpdate": true,
		},
    "SplashScreen": {
      "launchAutoHide": false,
    }
	}
}
```

그리고 앱에서 `appReady` 이벤트를 받으면 스플래시 화면을 숨겨야 합니다:

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'
import { SplashScreen } from '@capacitor/splash-screen'

CapacitorUpdateraddListener('appReady', () => {
  // Hide splash
  SplashScreenhide()
})

CapacitorUpdater.notifyAppReady()
```

## 강제 업데이트

`updateAvailable` 이벤트에 리스너를 추가하고 앱이 업데이트될 것임을 사용자에게 알리는 알림을 표시합니다:

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'
import { Dialog } from '@capacitor/dialog'

CapacitorUpdateraddListener('updateAvailable', async (res) => {
  try {
    await Dialogalert({
      title: '업데이트 가능',
      message: `버전 ${resbundleversion}이 사용 가능합니다. 지금 앱이 업데이트됩니다`,
    })
    CapacitorUpdaterset(resbundle)
  }
  catch (error) {
    consolelog(error)
  }
})

CapacitorUpdater.notifyAppReady()
```

## 모달 업데이트

사용자에게 업데이트 여부를 물어보는 대화상자를 표시하여 사용자가 결정하도록 할 수도 있습니다:

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'
import { Dialog } from '@capacitor/dialog'

CapacitorUpdateraddListener('updateAvailable', async (res) => {
  try {
    const { value } = await Dialogconfirm({
      title: '업데이트 가능',
      message: `버전 ${resbundleversion}이 사용 가능합니다. 지금 업데이트하시겠습니까?`,
    })

    if (value)
      CapacitorUpdaterset(resbundle)

  }
  catch (error) {
    consolelog(error)
  }
})

CapacitorUpdater.notifyAppReady()
```
