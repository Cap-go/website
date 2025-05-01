---
slug: appcenter-migration
title: Migration von App Center zu Capgo
description: Microsoft CodePush의 대안인 Capgo Live Updates의 전체 마이그레이션 과정을 안내해드리겠습니다.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-03-22T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /migrate_appcenter.webp
head_image_alt: Capacitor JS 데브를 위한 대안 검색
keywords: >-
  App Center, migration, live updates, OTA updates, continuous integration,
  mobile app updates
tag: Migration
published: true
locale: ko
next_blog: automatic-build-and-release-with-github-actions
---

## 마이그레이션 요약

* [Capgo](/register/)는 개발팀이 배포된 앱에 실시간 앱을 전송하는 것을 돕는 서비스입니다
* jQuery Mobile, Framework 7, Sencha, KendoUI, Ionic 또는 사용자 정의 솔루션으로 작성된 Capacitor JS 앱을 마이그레이션할 수 있습니다 **기존 Ionic 앱이 필요하지 않습니다**
* [Colt](https://voltbuild/)는 App Center Build(Android/iOS 앱 빌드)에 대한 동등한 서비스를 제공합니다 테스트, 진단 및 분석 서비스용

##### 참고

앱이 여전히 Cordova를 사용하고 있다면, Capgo로 마이그레이션하기 전에 먼저 [Capacitor로 마이그레이션](https://capacitorjscom/docs/cordova/migrating-from-cordova-to-capacitor/)해야 합니다

Ionic 팀이 Cordova의 정신적 후계자로 만든 Capacitor는 더 나은 사용자 경험과 성능을 제공하는 것을 목표로 네이티브 도구 및 기능에 가깝게 개발할 수 있게 합니다

다행히도 마이그레이션 과정은 쉽고 대부분의 Cordova 플러그인이 Capacitor와 하위 호환됩니다 [여기서 마이그레이션 시작하기](https://capacitorjscom/docs/cordova/migrating-from-cordova-to-capacitor/)

## Capgo 소개

Capgo는 시간이 지남에 따라 앱을 업데이트하는 것을 처리합니다 개발팀은 앱의 고유한 기능에 완전히 집중할 수 있으며 복잡한 앱 전달 프로세스를 Capgo에 아웃소싱할 수 있습니다

Capgo는 웹 전달과 모바일 사이의 격차를 메워줍니다

## Capgo 전제 조건

App Center와 마찬가지로, [Capgo](/register/)는 Azure DevOps, Bitbucket, GitHub 및 GitLab의 Git 저장소에 호스팅된 앱을 지원합니다

### Capgo CLI 설치

##### 참고

계속하기 전에 컴퓨터에 Node와 NPM이 설치되어 있어야 합니다 항상 [현재 LTS 버전](https://nodejsorg/)을 사용하세요 Capgo는 이전 버전을 지원하지 않습니다

### `packagejson` 및 Capacitor 구성 파일 생성

##### 참고

시작하기 전에 새로운 Git 브랜치에서 변경하는 것을 권장합니다

[Capgo](/register/)는 capacitor 앱을 자동화하기 위해 만들어졌기 때문에, 앱에 없을 수 있는 하나의 파일이 필요합니다 먼저 `capacitorconfigjson` 파일을 생성하세요 앱의 루트에서 실행하는 것이 가장 쉬운 방법입니다:

[[CODE_BLOCK]]

그런 다음 CLI 설문을 사용하여 Capacitor를 초기화하세요:

[[CODE_BLOCK]]

CLI는 앱 이름부터 시작하여 앱에 사용하고 싶은 패키지 ID 등 몇 가지 질문을 할 것입니다

마지막으로 새 파일을 프로젝트에 커밋하세요:

    git add git commit -m "added package json and capacitor config" && git push

### 코드 마이그레이션

이제 새로운 필수 [Capgo](/register/) 파일이 준비되었으니, 실제 앱 자체에 주목할 수 있습니다 [Capgo](/register/)는 빌드된 전체 앱이 `dist`라는 디렉토리 안에 있기를 기대합니다

빌드된 코드가 `dist` 디렉토리에 없다면, Capacitor 구성 파일에서 이 값을 변경하세요

앱의 디렉토리 구조는 다음과 같아야 합니다:

![앱 구조](/directory_looklikewebp)

## Capgo 구성

앱이 [Capgo](https://webcapgoapp/) 통합을 위해 준비되었다면, 가입하고 첫 번째 버전을 업로드하기 위한 API 키를 받을 시간입니다! [Capgo 계정 가입](/register/)으로 시작하세요

Capgo에 로그인하면 계정 페이지로 이동한 다음 API 키를 클릭하고, '쓰기' 키를 클릭하여 클립보드에 복사하세요

### Capgo SDK 설치

명령줄에서 Capacitor 앱 폴더의 루트에 직접 다음 명령을 실행하세요:

`npm i @capgo/capacitor-updater && npx cap sync`
플러그인을 Capacitor 앱에 설치하기 위해

그리고 CodePush 대신 앱에 다음 코드를 추가하세요:

[[CODE_BLOCK]]

이는 네이티브 플러그인에 설치가 성공했음을 알려줄 것입니다

## 실시간 업데이트 배포 (CodePush 대안)

실시간 업데이트 기능은 네이티브 애플리케이션에 설치된 [Capgo SDK](https://githubcom/Cap-go/capacitor-updater/)를 사용하여 특정 배포 채널 대상을 수신합니다 웹 빌드가 채널 대상에 할당되면, 해당 업데이트는 지정된 채널 대상을 수신하도록 구성된 바이너리를 실행하는 사용자 기기에 배포됩니다