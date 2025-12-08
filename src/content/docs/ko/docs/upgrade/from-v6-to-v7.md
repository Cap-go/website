---
title: "V6에서 V7로"
locale: ko
description: "Capgo 업데이터의 버전 6에서 버전 7로 전환하는 자세한 가이드로, 성공적인 업그레이드 프로세스에 필요한 단계와 고려 사항을 설명하여 최신 Capacitor 기능 및 개선 사항과의 호환성을 보장합니다."
sidebar:
  order: 1
---

## 이 업그레이드가 필요한 이유

이 메이저 버전은 Capacitor 메이저 버전을 따르기 위한 것입니다

먼저 Capacitor의 마이그레이션 가이드를 따르세요:

[https://capacitorjs.com/docs/updating/7-0](https://capacitorjs.com/docs/updating/7-0/)

## 설치

`npm i @capgo/capacitor-updater@7`

`그런 다음 네이티브 코드 업데이트를 동기화합니다:`

`npx cap sync`

그게 전부입니다! 매우 쉽죠!

## 암호화 마이그레이션

`key-v1` 암호화 방법을 사용하는 경우 `key-v1`이 V7에서 더 이상 지원되지 않으므로 새로운 암호화 시스템으로 마이그레이션해야 합니다. [[memory:96112]]

여기에서 암호화 마이그레이션 가이드를 따르세요: [암호화 마이그레이션 가이드](/docs/cli/migrations/encryption/)

## 구성 변경 사항

`capacitor.config` 파일에 다음 속성을 추가하는 것이 좋습니다:
- `capacitorUpdater`
- `appId`
- `version`
- `autoUpdate`

이러한 설정은 플러그인과 그 동작을 더 잘 관리하는 데 도움이 됩니다.

