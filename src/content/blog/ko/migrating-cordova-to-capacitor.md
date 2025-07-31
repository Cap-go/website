---
slug: migrating-cordova-to-capacitor
title: 'Cordova에서 Capacitor로 웹 앱 마이그레이션하기: 단계별 가이드'
description: >-
  이 단계별 가이드는 웹 앱을 Cordova에서 Capacitor로 마이그레이션하는 데 도움이 되며, 모든 섹션을 다루고 읽고 따르기 쉽게
  설명합니다.
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-06-07T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /migrating-cordova-to-capacitor.webp
head_image_alt: Cordova에서 Capacitor로의 마이그레이션 설명
keywords: >-
  Cordova, Capacitor, migration, mobile app development, live updates, OTA
  updates, continuous integration, mobile app updates
tag: Migration
published: true
locale: ko
next_blog: ''
---
# Cordova에서 Capacitor로 웹 앱 마이그레이션하기: 단계별 가이드

이 가이드는 Cordova에서 Capacitor로 웹 앱을 마이그레이션하는 과정을 쉽게 읽고 따를 수 있도록 도와줍니다. 모든 섹션을 다루고 단계별 접근 방식을 제공할 것입니다.

## Cordova와 Capacitor 소개

Cordova와 Capacitor는 모두 웹 개발자가 HTML, CSS, JavaScript를 사용하여 다양한 플랫폼용 네이티브 애플리케이션을 만들 수 있게 해주는 도구입니다. 유사점이 있지만, 네이티브 프로젝트 관리, 플러그인 관리, CLI/버전 관리 방식에서 주요한 차이가 있습니다.

## 마이그레이션 전략

Cordova에서 Capacitor로의 마이그레이션은 앱의 복잡성에 따라 점진적으로 또는 완전한 교체로 진행할 수 있습니다. Capacitor는 Cordova와 하위 호환성이 있어 준비가 되었을 때 기존 웹 앱을 전환할 수 있습니다.

마이그레이션을 돕기 위해 [Ionic VS Code Extension](https://marketplace.visualstudio.com/items/?itemName=ionic.ionic)을 사용하고 기존 Cordova 플러그인을 검토하는 것을 고려하세요. 필요한 경우 Cordova 플러그인을 계속 사용하거나 Capacitor 대응 버전으로 교체할 수 있습니다.

## 단계별 마이그레이션 가이드

Cordova에서 Capacitor로 웹 앱을 마이그레이션하려면 다음 단계를 따르세요:

1. **별도의 코드 브랜치에서 작업**: 이러한 변경사항을 적용할 때는 별도의 코드 브랜치에서 작업하는 것이 권장됩니다.

2. **Capacitor로 앱 초기화**: 터미널에서 프로젝트를 열고 [웹 앱에 Capacitor 추가하기](https://capacitorjs.com/docs/getting-started/#adding-capacitor-to-your-app) 또는 [Ionic 앱에 Capacitor 추가하기](https://capacitorjs.com/docs/getting-started/with-ionic/#existing-ionic-project) 가이드를 따르세요. Cordova `config.xml` 파일의 앱 이름과 번들 ID 정보를 사용하세요.

3. **웹 앱 빌드**: 네이티브 플랫폼을 추가하기 전에 웹 프로젝트를 최소 한 번 빌드하세요. 이는 `www` 폴더가 Capacitor 구성 파일에 올바르게 구성되도록 보장합니다.

4. **플랫폼 추가**: `npx cap add ios`와 `npx cap add android`를 실행하여 iOS와 Android 플랫폼을 추가하세요. 이는 프로젝트 루트에 별도의 네이티브 프로젝트 폴더를 생성합니다.

5. **아이콘과 스플래시 스크린 생성**: 기존 아이콘과 스플래시 스크린 이미지가 있다면, `cordova-res` 도구를 사용하여 네이티브 프로젝트에 생성하고 복사하세요.

6. **기존 Cordova 플러그인 검토 및 마이그레이션**: 기존 Cordova 플러그인을 검토하고 가능한 경우 Capacitor 대응 버전으로 교체하세요. 불필요한 플러그인은 제거하세요.

7. **Cordova 플러그인 제거**: Cordova 플러그인을 교체하거나 제거한 후, 플러그인을 제거하고 `npx cap sync`를 실행하여 네이티브 프로젝트에서 플러그인 코드를 제거하세요.

8. **추가 권한 적용**: iOS와 Android에서 필요한 권한을 적용하기 위해 `plugin.xml`과 필요한 설정을 매핑하세요.

9. **환경설정 구성**: `config.xml`의 환경설정을 Capacitor 구성 파일에 수동으로 추가하세요.

10. **플랫폼별 구성 처리**: 필요에 따라 각 플랫폼(iOS와 Android)에 대한 `config.xml`의 요소를 구성하세요.

11. **콘텐츠 제공 스키마 변경**: 필요한 경우 데이터 손실을 방지하기 위해 앱에서 콘텐츠를 제공하는 스키마를 변경하세요.

12. **테스트 및 Cordova 제거**: 마이그레이션된 앱을 테스트하여 모든 변경사항이 올바르게 적용되었는지 확인하세요. 만족스럽다면 프로젝트에서 Cordova를 제거하거나, Cordova 플러그인을 계속 사용할 계획이라면 유지할 수 있습니다.

축하합니다! Cordova에서 Capacitor로 웹 앱을 성공적으로 마이그레이션했습니다. Capacitor 프로젝트에서 Cordova 플러그인 사용하기나 Capacitor 개발 워크플로우에 대해 자세히 알아보려면 [공식 Capacitor 문서](https://capacitorjs.com/docs/)를 방문하세요.

## Capgo 서비스를 통한 실시간 업데이트

당사는 합리적인 가격으로 Over-The-Air (OTA) 업데이트를 제공할 수 있는 Capacitor 앱용 실시간 업데이트 솔루션인 Capgo를 제공합니다. 이 기능은 빠른 수정, 새로운 기능 배포, 앱 스토어 승인을 기다리지 않고도 사용자가 항상 최신 버전의 앱을 사용할 수 있도록 하는 데 특히 유용합니다.

### Capgo 서비스 작동 방식

Capgo는 Capacitor 앱에 실시간 업데이트를 배포할 수 있게 해주는 클라우드 기반 서비스입니다. 웹 대시보드와 앱에 통합할 수 있는 네이티브 SDK로 구성됩니다. SDK는 시작 시 또는 특정 간격으로 업데이트를 확인하고 백그라운드에서 다운로드합니다. 업데이트가 가능할 때 SDK가 사용자에게 설치를 요청합니다. 사용자가 동의하면 업데이트가 즉시 설치되고 적용됩니다.

### Capgo 실시간 업데이트의 장점

- **더 빠른 업데이트:** 앱 스토어 승인을 기다리지 않고 즉시 업데이트 배포
- **Apple Store 의존도 감소:** 앱 스토어 제한사항과 한계 우회
- **향상된 사용자 경험:** 사용자가 수동으로 앱을 업데이트할 필요 없이 최신 기능과 버그 수정을 유지

### Capgo 실시간 업데이트 구현 방법

Capacitor 프로젝트에서 Capgo 실시간 업데이트를 구현하려면 다음 단계를 따르세요:
- [Capgo 계정](https://web.capgo.app/)에 가입하세요.
- 프로젝트에 Capgo SDK를 설치하세요.
- 시작 시 또는 특정 간격으로 업데이트를 확인하도록 앱을 구성하세요.
- Capgo 대시보드를 사용하여 앱에 업데이트를 배포하세요.

## 결론

이 가이드가 Cordova에서 Capacitor로 웹 앱을 마이그레이션하는 데 도움이 되었기를 바랍니다. 마이그레이션 과정에 대해 질문이 있거나 도움이 필요하다면 우리의 [discord](https://discord.capgo.app) 서버에서 연락해 주세요.
