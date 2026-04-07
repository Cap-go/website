---
slug: capacitor-social-login-release
title: 브랜드 뉴 Capacitor 소셜 로그인 플러그인 출시
description: >-
  Capacitor 소셜 로그인 플러그인은 iOS, Android 및 웹에서 Google, Facebook 및 Apple로 로그인할 수 있게
  해주는 플러그인입니다.
author: WcaleNieWolny
author_image_url: 'https://avatars.githubusercontent.com/u/50914789?v=4'
author_url: 'https://github.com/WcaleNieWolny/WcaleNieWolny'
created_at: 2024-10-08T00:00:00.000Z
updated_at: 2025-12-31T01:33:21.000Z
head_image: /social_login_plugin_blog.webp
head_image_alt: Capgo 조직 시스템 일러스트레이션
keywords: >-
  Oauth, social login, mobile app development, live updates, OTA updates,
  continuous integration, mobile app updates
tag: Capacitor
published: true
next_blog: ''
locale: ko
---
## 소개

안녕하세요, 저는 마이클 ([WcaleNieWolny](https://github.com/WcaleNieWolny)) 👋입니다.

한 달간의 힘든 (조금은 고통스러운 🙃) 작업 끝에, Capacitor Social Login의 첫 번째 릴리스를 발표하게 되어 기쁩니다. 이 플러그인은 iOS와 Android에서 Google 및 Apple 로그인을 처리하는 데 도움을 주도록 설계되었습니다. 또한, 마틴과 함께 몇 가지 독특한 기능을 개발해왔습니다:

 - Android에서 Apple 로그인이 도입됨
 - 새로운 Google Credentials API 채택
 - 자세한 문서 추가

## Android에서 Apple 로그인

먼저, Android의 'Apple 로그인'의 주요 혁신을 논의해 보겠습니다. 이는 간단치 않았습니다. Apple의 SDK는 이 기능을 제공하지 않기 때문입니다. 저는 [이 기사](https://johncodeos.com/how-to-add-sign-in-with-apple-button-to-your-android-app-using-kotlin/)를 참고했지만, 더욱 안전하게 만들기 위해 약간 수정했습니다. 최종 흐름은 다음과 같습니다:

<figure><img style="margin-left: auto;margin-right: auto;max-height: 600px !important;" src="/apple-login-flow-chart.svg" alt="Apple Login flow chart" /><figcaption></figcaption></figure> 

안타깝게도, 백엔드와 귀하의 앱 코드에 몇 가지 수정을 필요로 하지만, 제가 할 수 있는 최선이었습니다.

## Android의 Google 로그인 새단장

다음으로, Android에서 Google 로그인을 구현하려고 했습니다. 알고 보니, [CodetrixStudio의 CapacitorGoogleAuth](https://github.com/CodetrixStudio/CapacitorGoogleAuth)는 [곧 더 이상 사용되지 않을 GMS 라이브러리](https://developer.android.com/identity/sign-in/legacy-gsi-migration#authorization)를 사용하고 있었습니다. 이 GMS 라이브러리가 레거시로 간주됨에 따라, 저는 [CredentialManager](https://developer.android.com/identity/sign-in/credential-manager-siwg)를 사용하기로 결정했습니다. 이는 로그인 흐름을 단순화하고 성가신 [오류 10](https://github.com/CodetrixStudio/CapacitorGoogleAuth/issues/332)을 제거하는 데 도움이 되었습니다 🎉

## 문서화

마지막으로, 저는 멋진 ✨ 문서를 작성했습니다. 문서가 정확하고 포괄적인지 확인하는 데 많은 시간을 투자했습니다. 문서에는 Apple과 Google 설정에 대한 자세한 가이드가 포함되어 있습니다. 또한 Apple 로그인을 위한 [예제 백엔드](https://github.com/WcaleNieWolny/capgo-social-login-backend-demo)도 제공했습니다 🍎 

[Apple](https://github.com/Cap-go/capacitor-social-login/blob/main/docs/setup_apple.md) 및 [Google](https://github.com/Cap-go/capacitor-social-login/blob/main/docs/setup_google.md) 가이드를 확인해 보세요!

## 결론

결론적으로, Capacitor Social Login 플러그인은 많은 새로운 흥미로운 기능을 도입하며 앞으로도 더 많은 기능이 추가될 예정입니다 🚀
