---
slug: do-google-allow-live-updates
title: Google에서는 앱 스토어 심사 없이 앱을 실시간으로 업데이트하는 것을 허용하나요?
description: Android 앱을 구글의 가이드라인을 완벽히 준수하면서 프로덕션 단계에서 코드 업데이트를 푸시하려면 어떻게 해야 할까요?
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-01-13T00:00:00.000Z
updated_at: 2023-06-29T00:00:00.000Z
head_image: /playstore.webp
head_image_alt: Capacitor 우회 설명
keywords: 'Google, live updates, OTA updates, continuous integration, mobile app updates'
tag: Tutorial
published: true
locale: ko
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---

Google Play는 앱 업데이트와 관련하여 Apple보다 덜 제한적입니다

Google Play를 통해 배포된 앱을 업데이트하는 것은 까다로운 작업일 수 있지만, Google의 가이드라인을 준수하는 것이 중요합니다. Google Play의 가이드라인에 따르면, 앱은 Google Play의 자체 업데이트 메커니즘 외에 다른 방법으로 자신을 수정, 교체 또는 업데이트해서는 안 됩니다. 이는 Google Play 이외의 소스에서 dex, JAR 또는 so 파일과 같은 실행 가능한 코드를 다운로드하는 것이 허용되지 않음을 의미합니다

하지만 이러한 제한은 웹뷰나 브라우저에서 JavaScript와 같이 Android API에 간접적으로 접근할 수 있는 가상 머신이나 인터프리터에서 실행되는 코드에는 적용되지 않습니다. 이는 JavaScript, Python, Lua 등과 같은 인터프리터 언어를 사용하여 Google Play의 검토 과정 없이 앱을 업데이트할 수 있다는 것을 의미합니다. Capgo Capacitor 플러그인은 이 과정에 도움이 될 수 있는 도구입니다. 이 플러그인을 사용하면 개발자가 HTML, CSS, JavaScript 코드를 업데이트하고 검토 없이 앱에 업데이트를 보낼 수 있습니다

또한, 런타임에 로드되는 JavaScript, Python, Lua 등과 같은 인터프리터 언어를 사용하는 앱이나 서드파티 코드는 Google Play 정책의 잠재적 위반을 허용해서는 안 됩니다. 이러한 인터프리터 코드는 앱과 함께 패키징되어서는 안 된다는 점에 유의해야 합니다

이러한 가이드라인을 따르고 Capgo Capacitor 플러그인과 같은 도구를 사용함으로써, 앱 업데이트가 Google Play의 정책을 준수하고 플랫폼에서 사용자가 계속 앱을 사용할 수 있도록 보장할 수 있습니다. 항상 최신 버전의 Google 정책을 다시 확인하여 올바르게 따르고 있는지 확인하는 것이 좋습니다

Capgo를 설치하여 검토를 우회하는 방법에 대한 자세한 내용은 다음 문서를 참조하세요