---
locale: ko
---

@capgo/capacitor-callkit-voip 패키지 노래 부르기

`@capgo/capacitor-callkit-voip` 패키지는 Ionic Capacitor에 PushKit 기능을 제공합니다. BetterCall 앱과 함께 사용하도록 설계되었지만 다른 프로젝트에서도 사용할 수 있습니다.

## 설치

패키지를 설치하려면 다음 명령을 실행하면 됩니다.

```bash
npm install @capgo/capacitor-callkit-voip
ionic cap sync
```

설치를 진행하기 전에 컴퓨터에 Xcode가 설치되어 있는지 확인하십시오.

## iOS 프로젝트 구성

패키지를 사용하도록 iOS 프로젝트를 구성하려면 다음 단계를 따르세요.

1 Xcode 프로젝트를 열고 기능 창으로 이동합니다.
2 확인란을 선택하여 "Voice over IP" 기능을 활성화합니다.
3 Apple 개발자 웹사이트에 인증서를 등록하세요. 제공된 링크에서 자세한 지침을 확인할 수 있습니다.
4 인증서를 다운로드하고 열어 키체인 접근 앱으로 가져옵니다.
5 제공된 이미지에 표시된 대로 인증서를 내보냅니다.
6 파일을 내보낸 폴더로 이동하고 터미널에서 다음 명령을 실행합니다.

```bash
openssl pkcs12 -in YOUR_CERTIFICATES.p12 -out app.pem -nodes -clcerts
```

그러면 VOIP 알림을 보내는 데 사용할 수 있는 `apppem` 인증서 파일이 생성됩니다.

## 용법

패키지가 설치되고 iOS 프로젝트가 구성되면 코드에서 이를 사용할 수 있습니다.

먼저 `CallKitVoip` 모듈을 가져옵니다.

```typescript
import { CallKitVoip } from "@capgo/capacitor-callkit-voip";
```

다음으로 `register()` 메서드를 호출하여 VOIP 알림 등록을 시작해야 합니다.

```typescript
async function registerVoipNotification() {
  // Register token
  CallKitVoip.addListener("registration", ({ token }) => {
    console.log(`VOIP token has been received ${token}`);
  });

  // Handle incoming call
  CallKitVoip.addListener("callAnswered", ({ username, connectionId }) => {
    console.log(`Call has been received from ${username} (connectionId: ${connectionId})`);
  });

  // Init plugin, start registration of VOIP notifications
  await CallKitVoip.register();
  console.log("Push notification has been registered");
}
```

VOIP 알림을 보내려면 제공된 `sendVoipsh` 스크립트를 사용할 수 있습니다.

```shell
#!/bin/bash

function main {
    connectionId=${1:?"connectionId should be specified"}
    token=${2:?"Enter device token that you received on register listener"}
    username=${3:-Anonymus"}

    curl -v \
    -d "{\"aps\":{\"alert\":\"Incoming call\", \"content-available\":\"1\"}, \"Username\": \"${username}\", \"ConnectionId\": \"${connectionId}\"}" \
    -H "apns-topic: .voip" \
    -H "apns-push-type: voip" \
    -H "apns-priority: 10" \
    --http2 \
    --cert app.pem \
    "https://api.development.push.apple.com/3/device/${token}"
}

main $@
```

## 결론

`@capgo/capacitor-callkit-voip` 패키지를 사용하면 Ionic Capacitor 프로젝트에 PushKit 기능을 추가할 수 있습니다. 설치 및 사용 지침을 따르면 앱에서 VOIP 알림을 보내고 받을 수 있습니다.