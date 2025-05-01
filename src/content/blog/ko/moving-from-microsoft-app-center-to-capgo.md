---
slug: moving-from-microsoft-app-center-to-capgo
title: Von Microsoft App Center zu Capgo für Live App Updates wechseln
description: >-
  Microsoft beendet die Unterstützung für Cordova-basierte Anwendungen. Wechseln
  Sie von Microsoft App Center zu Capgo für Live Mobile App Updates
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-03-21T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /app_center.webp
head_image_alt: Microsoft App Center 일러스트레이션
keywords: >-
  Microsoft, App Center, mobile app development, live updates, OTA updates,
  continuous integration, mobile app updates
tag: Alternatives
published: true
locale: ko
next_blog: ''
---

Microsoft는 최근 자사의 클라우드 제품인 App Center에서 [Apache Cordova에서 실행되는 앱에 대한 지원을 중단](https://devblogsmicrosoftcom/appcenter/announcing-apache-cordova-retirement/)한다고 발표했습니다. 이로 인해 App Center를 사용하는 기업과 팀들이 대안을 찾게 되었고, [Capgo](https://capgoapp/) 플랫폼이 Capacitor 앱을 완벽하게 지원하는 훌륭한 옵션이라는 점을 말씀드리게 되어 기쁩니다.

## Microsoft App Center에서 Capgo Cloud로

Capacitor는 Ionic으로 네이티브 모바일 앱을 구축하는 새로운 방식이며, 대부분의 Cordova 플러그인이 Capacitor에서 지원됩니다. Capgo는 CodePush와 유사한 실시간 업데이트 기능을 제공하지만, 플랫폼 종속성이 없고 즉각적인 앱 배포가 가능합니다. Capgo를 통해 개발팀은 복잡한 앱 제공 프로세스를 아웃소싱하고 Ionic 앱의 고유한 기능에만 전적으로 집중할 수 있습니다. 또한 App Center와 달리 Capgo는 Capacitor와 같은 하이브리드 아키텍처에 100% 집중하고 있습니다.

Capacitor 고객은 전체 프로세스를 안내하는 [마이그레이션 가이드](https://capgoapp/blog/appcenter-migration/)를 사용하여 몇 가지 단계만으로 Microsoft App Center에서 Capgo로 쉽게 마이그레이션할 수 있습니다. Capgo는 Capacitor 사용자가 활용할 수 있는 완전한 기능 목록을 포함하고 있습니다.

Microsoft App Center에서 Capgo로의 마이그레이션에 대해 자세히 알아보시려면, 지금 [무료 Capgo 계정](/register/)을 만들어보세요.

## 크레딧

[Ionic](https://ioniccom/)에 많은 감사를 드립니다. 이 글은 [이 글](https://ionicio/blog/moving-from-microsoft-app-center-to-ionic-appflow/)을 chat-gpt-3로 다시 작성하고 수정한 것입니다.