---
title: Nuxt 2
description: Nuxt 2에서 플러그인 설치 방법
sidebar:
  order: 1
locale: ko
---

# Nuxt 2에서 설치하기

`plugins` 디렉토리에 `capacitor-updaterjs` 플러그인 파일 생성

```js
import { CapacitorUpdater } from '@capgo/capacitor-updater'

export default ({ app }) => {
  if (processclient) {
    windowonNuxtReady(() => {
      CapacitorUpdaternotifyAppReady()
    })
  }
}
```

이는 클라이언트 측에서 플러그인을 로드하고 앱이 업데이트를 받을 준비가 되었음을 알립니다