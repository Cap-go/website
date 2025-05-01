---
slug: integrate-universal-links-capacitor-nextjs
title: Capacitor로 Next.js에서 유니버설 링크를 통합하는 방법
description: 'Next.js와 Capacitor를 사용하여, iOS 및 Android 플랫폼에서 앱의 유니버셜 링크를 구성하는 단계별 방법을 알아보세요.'
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://twitter.com/martindonadieu'
created_at: 2023-12-14T00:00:00.000Z
updated_at: 2023-12-14T00:00:00.000Z
head_image: /deeplink_next_capacitor.webp
head_image_alt: Capacitor 유니버셜 링크
keywords: >-
  Capacitor, Universal Links, Next.js, mobile app development, live updates, OTA
  updates, continuous integration, mobile app updates
tag: DeepLinking
published: true
locale: ko
next_blog: ''
---

iOS의 유니버설 링크와 Android의 앱 링크를 사용하면 사용자가 브라우저를 거치지 않고 링크를 통해 직접 앱으로 이동할 수 있습니다. 이는 특히 사용자 경험을 개선하고 웹 페이지에서 앱으로의 컨텍스트를 유지하는 데 유용합니다. 이 가이드에서는 Capacitor를 사용하여 Nextjs 앱에서 이러한 딥 링크를 설정하는 과정을 설명하겠습니다.

딥 링크 설정은 많은 코드가 필요하지 않지만 일부 구성이 필요합니다. 이 가이드를 마치면 `https://www.capgo.app/details/22`와 같은 링크를 클릭하여 앱이 설치되어 있다면 올바른 페이지로 앱이 열리게 됩니다.

## Nextjs 딥 링크 설정

먼저, 새로운 Nextjs 앱과 테스트를 위한 상세 페이지를 만들어보겠습니다:

```sh
npx create-next-app@latest capgoLinks
cd capgoLinks
mkdir pages/details
touch pages/details/[id].js
npm run build
npx cap add ios
npx cap add android
```

**capacitor.config.json** 파일에서 **번들 ID**가 올바르게 설정되어 있는지 확인하세요. 이는 설정에 매우 중요합니다:

```json
{
  "appId": "com.capgo.deeplinks",
  "appName": "capgoLinks",
  "webDir": "out",
  "bundledWebRuntime": false
}
```

라우팅의 경우, Nextjs는 파일 기반 라우팅을 사용하므로 `pages/details/[id].js`에 파일을 생성함으로써 이미 와일드카드 라우트를 설정했습니다.

`pages/details/[id].js`에서는 Nextjs의 내장 라우터를 사용하여 URL에서 ID를 가져올 수 있습니다:

```jsx
import { useRouter } from 'next/router'

function DetailsPage() {
  const router = useRouter()
  const { id } = router.query

  return (
    <div>
      <p>My ID: {id}</p>
    </div>
  )
}

export default DetailsPage
```

이제 Capacitor로 `appUrlOpen` 이벤트를 처리해보겠습니다. 이 이벤트는 앱이 사용자 정의 URL 스키마를 통해 열릴 때 트리거됩니다. `pages/_app.js` 파일에 리스너를 추가하세요:

```jsx
import { useEffect } from 'react'
import { App } from '@capacitor/app'

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    App.addListener('appUrlOpen', (event) => {
      const slug = event.url.split('.app').pop()
      if (slug)
        window.location.href = slug

    })
  }, [])

  return <Component {...pageProps} />
}

export default MyApp
```

이 코드는 `appUrlOpen` 이벤트를 수신하고 Nextjs 앱 내에서 적절한 라우트로 이동합니다.

## iOS 구성

iOS의 경우, Associated Domains가 활성화된 앱 ID가 필요합니다. `YOURTEAMID`와 `com.your.bundleid`를 실제 팀 ID와 번들 ID로 대체하여 다음 내용으로 **apple-app-site-association** 파일을 만드세요:

```json
{
  "applinks": {
    "apps": [],
    "details": [
      {
        "appID": "YOURTEAMID.com.your.bundleid",
        "paths": ["*"]
      }
    ]
  }
}
```

이 파일을 도메인의 `.well-known` 디렉토리에 업로드하여 `https://www.capgo.app/.well-known/apple-app-site-association`에서 접근할 수 있도록 하세요.

Xcode에서 `applinks:capgo.app` 형식을 사용하여 앱의 권한에 도메인을 추가하세요.

## Android 구성

Android 앱 링크를 위해 다음 단계를 따르세요:

1. 키스토어 파일이 없다면 생성하세요.
2. 키스토어에서 SHA256 지문을 얻으세요.
3. 패키지 이름과 SHA256 지문이 포함된 **assetlinks.json** 파일을 만드세요.
4. 이 파일을 도메인의 `.well-known` 디렉토리에 업로드하세요.

`AndroidManifest.xml`의 딥 링크를 처리하는 `activity` 요소에 `intent-filter`를 추가하세요:

```xml
<activity ...>
  <intent-filter android:autoVerify="true">
    <action android:name="android.intent.action.VIEW" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.BROWSABLE" />
    <data android:scheme="https" android:host="capgo.app" />
  </intent-filter>
</activity>
```

`assetlinks.json` 파일을 업로드한 후, Google의 Digital Asset Links 도구를 사용하여 확인할 수 있습니다. 모든 것이 올바르게 설정되면 녹색 체크마크가 표시됩니다.

앱을 빌드하고 서명하려면 다음 명령어를 사용하세요:

```sh
cd android
./gradlew assembleRelease
cd ..
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore android/app/build/outputs/apk/release/app-release-unsigned.apk alias_name
zipalign -v 4 android/app/build/outputs/apk/release/app-release-unsigned.apk capgo.apk
adb install capgo.apk
```

이렇게 하면 연결된 Android 기기에 서명된 앱이 설치됩니다.

## 네이티브 프로젝트 설정을 위한 Capacitor 구성

네이티브 프로젝트 설정을 자동화하려면 [Capacitor configure 패키지](https://github.com/ionic-team/capacitor-configure/)의 사용을 고려해보세요. 프로젝트에 설치하세요:

```sh
npm install @capacitor/configure
```

프로젝트 루트에 `capacitor.config.yaml` 파일을 생성하세요:

```yaml
vars:
  BUNDLE_ID: com.capgo.deeplinks
  PACKAGE_NAME: com.capgo.deeplinks
platforms:
  ios:
    targets:
      App:
        bundleId: $BUNDLE_ID
    entitlements:
      - com.apple.developer.associated-domains: ['applinks:capgo.app']
  android:
    packageName: $PACKAGE_NAME
```

이 구성으로 configure 도구를 실행하세요:

```sh
npx cap-config run capacitor.config.yaml
```

이렇게 하면 YAML 파일에 지정된 설정이 네이티브 프로젝트에 적용됩니다.

## 결론

Nextjs 앱에서 Capacitor를 사용하여 딥 링크를 설정하는 것은 iOS와 Android 모두에 대해 도메인과 프로젝트 설정을 구성하는 것을 포함합니다. 이 과정은 세심한 주의가 필요하지만, 이전 방식에 비해 간소화되었으며 추가 플러그인이 필요하지 않습니다. 도메인 확인 파일이 올바르게 제공되는지 확인하고 각 플랫폼의 도구로 확인하세요. 설정이 완료되면 앱이 웹 링크에서 원활하게 열리며, 사용자가 웹에서 앱으로 자연스럽게 전환할 수 있습니다.