---
slug: do-apple-allow-live-updates
title: 애플은 앱스토어 리뷰 없이 앱에 실시간 업데이트를 보내는 것을 허용하나요?
description: iOS 앱에 대한 코드 업데이트를 Apple의 가이드라인을 완전히 준수하면서 프로덕션에 배포하려면 어떻게 해야 할까요?
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-01-13T00:00:00.000Z
updated_at: 2022-01-13T00:00:00.000Z
head_image: /apple_appstore.webp
head_image_alt: Capacitor 우회 예시
keywords: 'Apple, live updates, OTA updates, continuous integration, mobile app updates'
tag: Tutorial
published: true
locale: ko
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---
App Store 검토 과정을 거치지 않고 Capacitor JS 앱을 업데이트하는 것은 Apple의 공식 지침에 명시된 특정 조건에서 가능합니다. 다만, 이는 법률적 조언이 아님을 유의하시기 바랍니다. 앱에 직접 코드 업데이트를 푸시하고 Apple의 지침을 준수하기 위해서는 다음 조건을 충족해야 합니다:

- 코드는 Apple의 내장 WebKit 프레임워크에서 실행되어야 함
- 코드는 추가 기능이나 기능성을 제공, 잠금 해제 또는 활성화해서는 안 됨
- 사용자는 업데이트가 진행되고 있다는 것을 인지하지 않아야 함

Capgo Capacitor 플러그인은 HTML, CSS, JavaScript를 수정하고 업데이트할 수 있도록 하여 첫 번째 조건을 만족시킵니다.
Facebook의 React Native와 Expo와 같은 서비스를 사용하여 만든 앱의 경우, App Store 검토 과정 없이 자체적으로 업데이트하는 기능이 이미 오랫동안 사용 가능했습니다.

두 번째 조건인 추가 기능이나 기능성을 제공하지 않는 것은 개발자가 결정합니다. Capgo는 새로운 기능이나 기능성을 도입하는 것이 아닌, 작은 수정이나 픽스를 위한 것입니다. 중요한 변경사항의 경우 App Store를 통해 업데이트를 배포해야 합니다. 많은 다른 개발자들이 Apple의 거부 없이 라이브 업데이트를 사용하고 있다는 점을 참고하시기 바랍니다.

Google Play는 앱 업데이트에 있어 Apple보다 덜 제한적입니다. Google Play는 자사 스토어에서 설치된 JavaScript 번들이 포함된 앱이 Google이 아닌 서비스를 통해 업데이트되는 것을 허용합니다.

검토를 우회하기 위한 Capgo 설치 방법에 대한 자세한 내용은 다음 글을 참조하시기 바랍니다.
