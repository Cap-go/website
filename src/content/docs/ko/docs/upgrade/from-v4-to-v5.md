---
title: V4에서 V5로
description: V4에서 V5로 업그레이드하는 방법
sidebar:
  order: 2
locale: ko
---

## 이번 업그레이드의 이유

이 메이저 버전은 Capacitor 메이저 버전을 따르기 위한 것입니다

먼저 Capacitor의 마이그레이션 가이드를 따르세요:

[https://capacitorjscom/docs/updating/5-0](https://capacitorjscom/docs/updating/5-0/)

## 설치

`npm i @capgo/capacitor-updater@5`

`그런 다음 네이티브 코드 업데이트를 동기화하세요:`

`npx cap sync`

이게 전부입니다! 매우 쉽죠!

## 수동 모드

getLatest로 직접 업데이트를 가져오고 있었다면, 작은 변경사항이 있습니다
이제 이미 최신 상태라면 catch로 진입하게 됩니다
업데이트 가능 상태가 아닌 다른 모든 응답은 이렇게 동작할 것입니다