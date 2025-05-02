---
slug: 특정 버전의 앱을 사용자에게 보내는 방법
title: 특정 사용자나 그룹에게 특정 업데이트를 보내는 방법
description: >-
  테스트플라이트나 구글 베타 프로세스 없이도 사용자가 베타 버전을 사용할 수 있도록 하세요. Ionic 앱에 버튼만 추가하면 바로 사용할 수
  있습니다!
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-06-17T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /capgo_select_update.webp
head_image_alt: TestFlight 대체 일러스트레이션
keywords: >-
  mobile app development, live updates, OTA updates, continuous integration,
  mobile app updates
tag: alternatives
published: true
locale: ko
next_blog: ''
original_slug: how-to-send-specific-version-to-users
---
## 서문

Capgo의 업데이트 시스템을 내 앱처럼 즐기기 시작하면, "더 많은 것을 원하면 어떡하지?"라는 생각이 들기 시작할 것입니다.

저도 같은 생각이 들었지만, 제가 Capgo의 제작자이기 때문에 살펴볼 수 있었습니다!

> 모든 것이 오픈소스이기 때문에, 여러분도 이런 능력을 가질 수 있습니다 :)

Capacitor 앱 배포 과정에서 다음으로 겪은 어려움은 다른 팀원들이 업데이트를 테스트하게 하는 것입니다!

TestFlight의 경우, 문제는 간단합니다. 팀원들을 초대하고 사용법을 이해시키는 것이 시간이 많이 걸립니다!

그리고 물론, Apple에 제출할 때마다 봇이 진행하는 무작위 검토 과정이 있어서 5분이 걸릴 수도 있고 5시간이 걸릴 수도 있습니다.

이로 인해 프레젠테이션이 여러 번 지연된 적이 있습니다...

Google의 경우는 더 심각합니다. 제 인생의 큰 수수께끼인데, 프로덕션 버전을 출시하는 데는 2시간도 걸리지 않지만, 비공개 베타를 출시하는 데는 1-2일이 걸립니다.

## 해결책

이를 해결하기 위해, Capgo에 채널 시스템을 만들었습니다.

`npx @capgo/cli@latest bundle upload -c production`은 모든 사용자에게 업데이트합니다 (프로덕션 채널이 기본값으로 설정된 경우)

`npx @capgo/cli@latest bundle upload -c development`를 실행하면 버전이 다른 채널로 이동합니다. 이는 [GitHub action](/blog/manage-dev-and-prod-build-with-github-actions/)에서 자동화할 수 있습니다.

그런 다음 사용자가 채널에서 업데이트를 받을 수 있는 2가지 방법이 있습니다

### 초자동 방식

채널 설정을 위한 자체 백엔드를 만들고 싶지 않을 때 유용하며, 구현이 빠릅니다.

이 방식에서는 채널 중 하나를 자체 설정이 가능하도록 허용하기만 하면 됩니다.

![Capgo에서 자체 설정 허용](/self_set.webp)

그리고 Ionic 앱 코드에 다음을 추가하세요. 가장 좋은 경험을 위해 "베타 등록" 같은 버튼을 클릭한 후 이를 사용하세요
```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

const deviceId = await CapacitorUpdater.setChannel({ channel: 'beta' })
```

### 수동 방식

내부 팀에게 유용하며 구현이 빠릅니다.
사용자가 앱에서 deviceID를 복사하여 수동으로 보낼 수 있도록 하세요. 다음 코드가 도움이 될 것입니다:
```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

const deviceId = await CapacitorUpdater.getDeviceId()
```
앱 어딘가에 버튼을 숨기거나, 예를 들어 `admin` 역할을 가진 로그인된 사용자에게만 버튼을 표시하세요.

그런 다음 Capgo 웹 앱이나 네이티브 앱에 접속하여 앱 관리자로 로그인하고, 앱을 선택한 후 기기 목록을 클릭하세요.

검색창에 deviceID를 입력하고 찾은 기기를 클릭한 다음 Channel 링크를 클릭하여 `development`를 선택하세요. 팀원에게 앱을 다시 열고 30초 기다렸다가 닫았다 열도록 요청하세요.

그러면 새 버전을 받을 수 있습니다.

### 자동 방식

베타 테스터에게 유용하지만 구현에 시간이 더 걸립니다.

수동 방식과 마찬가지로 deviceID를 얻어야 합니다
```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

const deviceId = await CapacitorUpdater.getDeviceId()
```

하지만 이번에는 자동으로 백엔드에 전송해야 합니다. 구현 방법은 여러분이 결정하세요.

나중에 편리하도록 데이터베이스에 저장하는 것을 추천합니다.

그런 다음 백엔드에서 Capgo 백엔드로도 전송해야 합니다. 아래 두 가지 코드 예시가 있습니다:
<Tabs>
  <TabItem value="nodejs" label="NodeJS">

```js
import axios from 'axios'

await axios.post('https://api.capgo.app/device', {
  app_id: 'YOUR_APP_ID',
  device_id: 'DEVICE_ID',
  channel: 'CHANNEL_NAME', // The name of the channel, or undefined if version_id provided
  version_id: 'VERSION_NAME' // this is optionnal, if provide it will override the channel, that usefull when you want to debug only one user.
}, {
  headers: {
    authorization: 'YOUR_API_KEY' // choose a key with 'write' or 'all' rights
  }
})
```
</TabItem>

<TabItem value="cloudflare" label="Cloudflare">
  
```js
addEventListener('fetch', (event) => {
  event.respondWith(
    handleRequest(event.request).catch(
      err => new Response(err.stack, { status: 500 })
    )
  )
})

async function handleRequest(request) {
  const { pathname, method } = new URL(request.url)
  const body = await request.json()
  const newBody = JSON.stringify({
    app_id: 'YOUR_APP_ID',
    device_id: body.device_id,
    channel: 'alpha'
  })
  const newUrl = new URL('https://api.capgo.app/device')
  const options = {
    headers: {
      authorization: 'YOUR_API_KEY',
    },
    method: 'POST',
    body: newBody
  }

  if (request.method === 'DELETE') {
    // DELETE the channel link
    options.method = 'DELETE'
    return fetch(newUrl.toString(), options)
  }

  return fetch(newUrl.toString(), options)
}
```
배포된 URL에 POST로 device_id를 본문에 담아 보내서 추가하고, DELETE 메서드로 삭제하면 됩니다.
</TabItem>

이 설정이 완료되면 앱에서 채널 옵트인 버튼을 추가하고 웹 앱에서 설정이 되었는지 확인해보세요.

override를 제거하려면 `null`을 보낼 수도 있습니다

기기에 설정된 override를 프로그래밍 방식으로 확인해야 하는 경우, 같은 URL에서 확인할 수 있습니다

```js
import axios from 'axios'

const res = await axios.get('https://api.capgo.app/device?app_id=YOUR_APP_ID&device_id=DEVICE_ID', {
  headers: {
    authorization: 'YOUR_API_KEY' // choose a key with 'write' or 'all' rights
  }
})

console.log('data', res.json())
```
