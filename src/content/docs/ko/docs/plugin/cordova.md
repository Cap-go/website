---
title: 코르도바
description: Capacitor-updater가 Cordova에서 사용 가능할까요?
sidebar:
  order: 8
locale: ko
---

이 플러그인이 Cordova에서도 사용 가능할지 궁금하셨을 것입니다

저는 이를 위한 R&D 저장소를 시작했지만, 이는 많은 작업이 필요합니다

## 문제점

가능하다는 것을 알고 있지만, 이를 위해서는 Capacitor에서 했던 것처럼 Cordova 코드베이스의 모든 코드를 읽어봐야 작동 방식을 이해할 수 있습니다

Android 버전은 둘 다 Java를 사용하기 때문에 더 쉽지만, iOS는 Swift가 Cordova에서 아직 잘 지원되지 않기 때문에 전체적인 재작성이 필요합니다

## 해결방안

그동안 다음과 같은 방법을 시도해 볼 수 있습니다:

* GitHub에서 [저를 후원](https://githubcom/sponsors/riderx)하시면 우선순위를 둘 수 있습니다. 이는 최소 1개월의 작업이 필요합니다
* 저를 컨설턴트로 고용하세요. 저는 큰 기업들이 capacitor로 마이그레이션하는 것을 도와왔습니다. 보통 10-20일이 소요되며, 팀에게 [이점](https://ionicio/resources/articles/capacitor-vs-cordova-modern-hybrid-app-development)이 매우 큽니다