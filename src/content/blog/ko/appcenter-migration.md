---
slug: appcenter-migration
title: App Center에서 Capgo로 마이그레이션
description: 이 가이드에서는 Microsoft CodePush 대안인 Capgo Live Updates의 전체 마이그레이션 과정을 안내합니다.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-03-22T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /migrate_appcenter.webp
head_image_alt: Capacitor JS 개발자가 대안을 찾고 있습니다.
keywords: >-
  App Center, migration, live updates, OTA updates, continuous integration,
  mobile app updates
tag: Migration
published: true
locale: ko
next_blog: automatic-build-and-release-with-github-actions
---
## 마이그레이션 요약

* [Capgo](/register/)는 개발 팀이 실시간 앱을 배포된 앱으로 전송할 수 있도록 돕는 서비스입니다.
* jQuery Mobile, Framework 7, Sencha, KendoUI, Ionic 또는 커스텀 솔루션으로 작성된 Capacitor JS 앱은 마이그레이션할 수 있습니다. **기존의 Ionic 앱은 필요하지 않습니다.**.
* [Colt](https://volt.build/)는 App Center Build(안드로이드/iOS 앱 빌드)를 위한 동등한 서비스를 제공합니다. 테스트, 진단 및 분석 서비스를 제공합니다.

##### 참고

앱이 여전히 Cordova를 사용 중이라면, 먼저 [Capacitor로 마이그레이션](https://capacitorjs.com/docs/cordova/migrating-from-cordova-to-capacitor/)해야 합니다.

이온 팀이 Cordova의 영적 후계자로 만들었으며, Capacitor는 개발이 네이티브 도구 및 기능에 가깝게 이동할 수 있도록 해주며 더 나은 사용자 경험과 성능을 제공하는 것을 목표로 합니다.

다행히 마이그레이션 프로세스는 간단하며 대부분의 Cordova 플러그인은 Capacitor와 하위 호환됩니다. [여기서 마이그레이션 시작하기](https://capacitorjs.com/docs/cordova/migrating-from-cordova-to-capacitor/).

## Capgo 소개

Capgo는 시간이 지남에 따라 앱 업데이트를 처리합니다. 개발 팀은 앱의 고유한 기능에 완전히 집중하고 복잡한 앱 배포 프로세스를 Capgo에 아웃소싱할 수 있습니다.

Capgo는 웹 배달과 모바일 간의 간극을 메워줍니다.

## Capgo 필수 조건

App Center와 마찬가지로, [Capgo](/register/)는 Azure DevOps, Bitbucket, GitHub 및 GitLab의 Git 저장소에 호스팅된 앱을 지원합니다.

### Capgo CLI 설치

##### 참고

컴퓨터에 Node 및 NPM이 설치되어 있어야 합니다. 진행하기 전에 확인하세요. 항상 [현재 LTS 버전](https://nodejs.org/)을 사용하세요. Capgo는 이전 버전을 지원하지 않습니다.

### `package.json` 및 Capacitor 구성 파일 만들기

##### 참고

시작하기 전에, 새로운 Git 브랜치에서 변경하는 것을 추천합니다.

[Capgo](/register/)는 Capacitor 앱을 자동화하기 위해 만들어졌으므로, 앱에 없을 수 있는 파일이 하나 필요합니다. 먼저 `capacitor.config.json` 파일을 생성하세요. 파일을 생성하는 가장 쉬운 방법은 앱의 루트에서 다음 명령을 실행하는 것입니다:

```shell
npm install @capacitor/core
```

그런 다음, CLI 설문지를 사용하여 Capacitor를 초기화하세요:

```shell
npx cap init
```

CLI가 몇 가지 질문을 할 것이며, 시작은 앱 이름과 앱에 사용할 패키지 ID로 시작합니다.

마지막으로, 새 파일을 프로젝트에 커밋하세요:

    git add .git commit -m "added package json and capacitor config" && git push

### 코드 마이그레이션

새로 필요한 [Capgo](/register/) 파일이 준비되었으므로, 실제 앱에 집중할 수 있습니다. [Capgo](/register/)는 전체 빌드된 앱이 `dist`라는 이름의 디렉터리 안에 있을 것으로 예상합니다.

빌드된 코드가 `dist` 디렉터리에 없다면, Capacitor 구성 파일에서 이 값을 변경하세요.

앱의 디렉터리 구조는 다음과 같아야 합니다:

![App Structure](/directory_looklike.webp)

## Capgo 구성

앱이 [Capgo](https://web.capgo.app/) 통합을 준비하면, 회원가입하고 첫 번째 버전을 업로드할 API 키를 가져올 시간입니다! [Capgo 계정 등록](https://web.capgo.app/register/)으로 시작하세요.

Capgo에 로그인 한 후, 계정 페이지로 이동하여 API 키를 클릭한 다음 '쓰기' 키를 클릭하여 클립보드에 복사합니다.

### Capgo SDK 설치

명령 줄에서, Capacitor 앱 폴더의 루트에 직접 다음 명령을 실행하세요:

`npm i @capgo/capacitor-updater && npx cap sync`
Capacitor 앱에 플러그인을 설치하기 위해.

그런 다음 이 코드를 CodePush 대신 앱에 추가하세요:

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()
```

이 코드는 네이티브 플러그인에게 설치가 성공했음을 알립니다.

## 라이브 업데이트 배포 (CodePush 대안)

라이브 업데이트 기능은 설치된 [Capgo SDK](https://github.com/Cap-go/capacitor-updater/)를 사용하여 특정 배포 채널 대상을 듣습니다. 웹 빌드가 채널 대상에 할당되면, 해당 업데이트는 지정된 채널 대상을 구성한 바이너리가 실행 중인 사용자 장치에 배포됩니다.

### Capgo CLOUD에 로그인

먼저 계정에 있는 `all` [apikey](https://web.capgo.app/dashboard/apikeys/)를 사용하여 CLI로 로그인하세요:

```shell
npx @capgo/cli@latest login YOURKEY
```

## 첫 번째 앱 추가

CLI를 사용하여 Capgo Cloud에서 앱을 먼저 만듭시다.

`npx @capgo/cli@latest app add`

이 명령은 Capacitor 구성 파일에서 정의된 모든 변수를 사용하여 앱을 생성합니다.

## 첫 번째 번들 업로드

코드를 빌드하고 Capgo에 전송하는 명령을 실행하세요:
```shell
npx @capgo/cli@latest bundle upload --channel production
```

기본적으로 버전 이름은 `package.json` 파일의 이름이 됩니다.

[Capgo](https://web.capgo.app/)에서 빌드가 존재하는지 확인하세요.

저의 [모바일 샌드박스 앱](https://capgo.app/app_mobile/).으로 테스트할 수 있습니다.

### 채널 기본 설정

앱을 Capgo에 보낸 후 채널을 `default`로 설정해야 앱이 Capgo에서 업데이트를 받을 수 있습니다.

```shell
npx @capgo/cli@latest channel set production -s default
```

## 업데이트를 검증하기 위한 앱 구성

이 구성을 기본 JavaScript 파일에 추가하세요.

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

CapacitorUpdater.notifyAppReady()
```

그런 다음 `npm run build && npx cap copy`를 실행하여 앱을 업데이트하세요.

### 장치에서 라이브 업데이트 받기

배포에서 라이브 업데이트를 받으려면 장치나 에뮬레이터에서 앱을 실행해야 합니다. 가장 쉬운 방법은 로컬 앱을 에뮬레이터나 컴퓨터에 연결된 장치에서 실행하는 것입니다.

    npx cap run [ios | android]

앱을 열고 백그라운드로 두었다가 다시 열면, 로그에서 앱이 업데이트를 수행한 것을 확인할 수 있어야 합니다.

축하합니다! 🎉 첫 번째 라이브 업데이트를 성공적으로 배포했습니다. 이는 라이브 업데이트로 할 수 있는 일의 시작일 뿐입니다. 자세한 내용을 보려면 전체 [라이브 업데이트 문서](/docs/plugin/cloud-mode/getting-started/)를 참조하세요.

## App Center 종속성 제거

Capgo의 서비스를 통합했으므로, App Center에 대한 모든 참조를 제거해야 합니다. 사용하지 않는 코드/서비스를 제거하는 것이 모범 사례일 뿐만 아니라, SDK를 제거하면 앱의 크기가 줄어들 것입니다.

먼저 터미널을 열고 App Center 플러그인을 제거하세요:
```shell
    cordova plugin remove cordova-plugin-appcenter-analytics cordova-plugin-appcenter-crashes cordova-plugin-code-push
```

다음으로 `config.xml`을 열고 다음 `preference` 값을 제거하세요. 다음과 유사하게 보일 것입니다:
```xml
    <preference name="APP_SECRET" value="0000-0000-0000-0000-000000000000" /><preference name="CodePushDeploymentKey" value="YOUR-ANDROID-DEPLOYMENT-KEY" /><preference name="CodePushPublicKey" value="YOUR-PUBLIC-KEY" />
```

앱에서 App Center Analytics를 사용하고 있었다면, 다음 `preferences` 요소를 제거하세요: `APPCENTER_ANALYTICS_ENABLE_IN_JS` 및 `APPCENTER_CRASHES_ALWAYS_SEND`.

다음 `<preference name="APP_SECRET" value="0000-0000-0000-0000-000000000000" />` 요소를 제거하세요:

```xml
    <access origin="https://codepush.appcenter.ms" /><access origin="https://codepush.blob.core.windows.net" /><access origin="https://codepushupdates.azureedge.net" />
```

`index.html` 파일의 CSP `meta` 태그에서 CodePush에 대한 참조를 제거하세요 (`https://codepush.appcenter.ms`):
```xml
    <meta http-equiv="Content-Security-Policy" content="default-src https://codepush.appcenter.ms 'self' data: gap: https://ssl.gstatic.com 'unsafe-eval'; style-src 'self' 'unsafe-inline'; media-src *" />
```

마지막으로 앱 내에서 `codePush.sync();`와 같은 App Center 서비스에 대한 모든 코드 참조를 제거하세요.

## 다음 단계

App Center에서 Capgo로 전환하고 라이브 업데이트를 활용했습니다. 이는 Capgo를 사용할 수 있는 일의 시작일 뿐입니다. 나머지 서비스에는 채널(여러 환경) 및 오버라이드가 포함됩니다. 클라우드 CLI 통합을 통해 GitHub Action, GitLab, Jenkins 등과 같은 CI/CD 플랫폼에서 Capgo를 사용할 수 있습니다.

## 자동 앱 업데이트 전송

코드가 GitHub에 호스팅되면, GitHub 작업 덕분에 몇 단계만 더 거치면 자동 빌드 및 릴리스를 설정할 수 있습니다.

이와 관련된 두 번째 기사를 작성했습니다.

## 감사의 말

[이온](https://ionic.com/)에 대해 대단히 감사합니다. 이 기사는 [이 기사를](https://ionic.io/blog/moving-from-microsoft-app-center-to-ionic-appflow/) 기반으로 하여 chat-gpt-3로 재작성하고 수정되었습니다.
