---
slug: 앱스토어-심사-우회하기
title: App Store 검토 없이 Capacitor JS 앱을 업데이트하는 방법
description: Capgo Feature를 통해 Apple의 가이드라인을 완벽히 준수하면서 iOS 아이오닉 앱에 코드 업데이트를 푸시하는 방법은 무엇일까요?
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2022-01-13T00:00:00.000Z
updated_at: 2022-01-13T00:00:00.000Z
head_image: /bypass_illustration.webp
head_image_alt: Capacitor 우회 그림
keywords: >-
  Apple, App Store, mobile app development, live updates, OTA updates,
  continuous integration, mobile app updates
tag: Tutorial
published: true
locale: ko
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
original_slug: how-to-bypass-app-store-review
---
_물어봐주셔서 기쁩니다._

제 변호사들이 이것이 법적 조언은 아니라고 말씀드리라고 했지만, Apple의 공식 지침의 문구를 이해하는 데는 법학 학위가 필요하지 않습니다. Apple의 지침에 따르면 다음 세 가지 조건 하에서 App Store를 우회하여 실행 가능한 코드를 앱에 직접 푸시할 수 있습니다:

* 코드가 Apple의 내장 WebKit 프레임워크에 의해 실행됨
* 코드가 추가 기능이나 기능성을 제공하거나, 잠금 해제하거나, 활성화하지 않음
* 사용자가 업데이트가 진행되고 있음을 알지 못함

Capgo capacitor 플러그인을 사용하면 HTML CSS 및 JavaScript만 업데이트하고 수정할 수 있으므로, 첫 번째 조건은 충족됩니다.

참고로, App Store 없이 자체 업데이트가 가능한 앱은 꽤 오랫동안 존재해 왔습니다.
Facebook의 React Native와 Expo와 같은 서비스를 사용하여 만든 앱에만 해당됩니다.

React Native가 Capacitor보다 더 네이티브하지 않다는 증거입니다 😆

Capgo는 네이티브 Capacitor 앱에 코드 레벨 업데이트를 푸시할 수 있는 최초의 저렴한 솔루션입니다.
두 번째 조건인 새로운 기능이나 기능성 없음은 실제로 여러분에게 달려있습니다.

Capgo는 새로운 기능이나 기능성을 푸시하기 위한 것이 아닙니다. 버그 수정, 로깅이나 추적 추가, 메시지 업데이트, 사용자 강제 업그레이드 등을 위한 사소한 릴리스를 피하기 위한 것입니다.

새로운 기능이나 기능성을 위해서는 앱 스토어를 통해 릴리스해야 합니다. 참고로, (대기업을 위한 대안인) Ionic AppFlow는 5천만 대 이상의 iOS 기기에 설치되어 있으며, 이를 사용한다고 해서 거부된 앱은 없었습니다.

수천 명의 다른 개발자들이 라이브 업데이트를 사용하고 있다는 것을 알려드리고 싶어서 말씀드립니다. 여러분은 혼자가 아닙니다.

Apple과 Google은 앱 업데이트에 대한 자체 규칙을 가지고 있습니다.

Apple의 경우, [3.3.2 항목을 참조하세요](https://developer.apple.com/programs/information/Apple_Developer_Program_Information_8_12_15.pdf/).
[...] 전술한 내용의 유일한 예외는 Apple의 내장 WebKit 프레임워크나 JavascriptCore에 의해 다운로드되고 실행되는 스크립트와 코드입니다 [...] __요약__: OTA 업데이트는 중요한 변경 없이 버그 수정이나 개선을 위해서만 사용해야 합니다.

__Google__ Play는 덜 제한적입니다 - JavaScript 번들이 포함된 Google Play에서 설치된 앱은 [Google 서비스로만 업데이트할 필요가 없다](https://support.google.com/googleplay/android-developer/answer/9888379/?hl=en)고 명시되어 있습니다.

Capgo를 설치하여 심사를 우회하는 방법에 대한 자세한 내용은 다음 글을 확인하세요.
