---
title: Dari V4 ke V5
description: V4에서 V5로 업데이트하는 방법
sidebar:
  order: 2
locale: ko
---

## 업그레이드가 필요한 이유

이 메이저 버전은 Capacitor 메이저 버전을 따르기 위한 것입니다

먼저 Capacitor의 마이그레이션 가이드를 따르세요:

[https://capacitorjs.com/docs/updating/5-0](https://capacitorjs.com/docs/updating/5-0/)

## 설치

`npm i @capgo/capacitor-updater@5`

`그런 다음 네이티브 코드 업데이트를 동기화하세요:`

`npx cap sync`

이게 전부입니다! 매우 쉽죠!

## 수동 모드

getLatest로 직접 업데이트를 받고 있었다면, 약간의 변경사항이 있습니다
이제 이미 최신 상태인 경우 catch로 이동합니다
업데이트 가능 상태가 아닌 다른 모든 응답도 동일하게 작동합니다