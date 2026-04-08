---
slug: live-updates-for-flutter-app
title: Flutter 실시간 업데이트
description: App Store 검토 없이 Flutter 앱에 실시간 업데이트를 보내는 것이 가능한가요?
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-12-16T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /bypass_illustration.webp
head_image_alt: Capacitor 바이패스 그림
keywords: >-
  Flutter, mobile app development, live updates, OTA updates, continuous
  integration, mobile app updates
tag: Tutorial
published: true
locale: ko
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---
Capgo Live Update는 개발자가 기존의 앱스토어 제출 과정 없이 모바일 앱을 업데이트할 수 있게 해주는 서비스입니다. 이는 앱스토어 심사 과정을 기다리지 않고도 버그를 빠르게 수정하거나 작은 업데이트를 할 수 있는 편리한 방법입니다. 하지만 Capgo Live Update는 Flutter 앱이 네이티브 코드로 컴파일되기 때문에 Flutter 앱의 업데이트를 지원하지 않습니다.

Flutter는 Dart 프로그래밍 언어를 사용하는 모바일 앱 개발 프레임워크입니다. Flutter의 주요 특징 중 하나는 개발자가 단일 코드베이스를 사용하여 iOS와 Android 모두에서 실행할 수 있는 앱을 만들 수 있다는 것입니다. 이를 위해 Flutter는 앱 코드를 각 플랫폼의 네이티브 코드로 컴파일합니다. 이는 앱이 웹 기반 앱이나 하이브리드 앱이 아닌 본질적으로 네이티브 앱이라는 것을 의미합니다.

Flutter 앱이 네이티브 코드로 컴파일되기 때문에 Capgo Live Update를 사용하여 Flutter 앱을 업데이트하는 것은 불가능합니다. 대신 개발자는 다른 네이티브 앱과 마찬가지로 앱스토어에 업데이트를 제출해야 합니다.

또한, 네이티브 코드를 업데이트하는 것은 일반적으로 앱스토어의 규칙에 위배됩니다. Apple App Store와 Google Play Store 모두 앱이 심사를 위해 제출된 후 네이티브 코드를 변경하는 것을 금지하는 정책을 가지고 있습니다. 이는 네이티브 코드를 변경하면 보안 취약점이나 앱 성능을 저하시킬 수 있는 다른 문제들이 발생할 수 있기 때문입니다.

요약하자면, Capgo Live Update는 특정 유형의 모바일 앱에 대한 업데이트를 빠르게 배포하는데 유용한 도구이지만, Flutter 앱을 업데이트하는 데는 사용할 수 없습니다.

이는 Flutter의 컴파일 과정의 특성과 앱스토어의 규칙 때문입니다.
