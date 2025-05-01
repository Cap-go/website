---
slug: release-of-a-brand-new-capacitor-social-login
title: CapacitorのSNSログインプラグインの新リリース
description: >-
  Capacitor Social Login 플러그인은 iOS, Android 및 웹에서 Google, Facebook 및 Apple로 로그인할
  수 있게 해주는 플러그인입니다.
author: WcaleNieWolny
author_image_url: 'https://avatars.githubusercontent.com/u/50914789?v=4'
author_url: 'https://github.com/WcaleNieWolny/WcaleNieWolny'
created_at: 2024-10-08T00:00:00.000Z
updated_at: 2024-10-08T00:00:00.000Z
head_image: /social_login_plugin_blog.webp
head_image_alt: Capgo의 시스템 구성도
keywords: >-
  Oauth, social login, mobile app development, live updates, OTA updates,
  continuous integration, mobile app updates
tag: Capacitor
published: true
next_blog: ''
locale: ko
---

## 소개

안녕하세요, 저는 Michael ([WcaleNieWolny](https://githubcom/WcaleNieWolny))입니다 👋,

한 달간의 힘들고 (약간 고통스러운 🙃) 작업 끝에, Capacitor Social Login의 첫 릴리스를 발표하게 되어 기쁩니다. 이 플러그인은 iOS와 Android에서 Google과 Apple 로그인을 모두 처리하는 것을 돕기 위해 설계되었습니다. 또한, Martin과 함께 다음과 같은 독특한 기능들을 개발해왔습니다:

- Android에서 Apple 로그인 도입
- 새로운 Google Credentials API 채택
- 상세한 문서 추가

## Android에서 Apple 로그인

먼저, Android에서 'Apple 로그인'의 주요 혁신에 대해 이야기해보겠습니다. Apple SDK가 이 기능을 제공하지 않기 때문에 간단하지 않았습니다. [이 문서](https://johncodeoscom/how-to-add-sign-in-with-apple-button-to-your-android-app-using-kotlin/)를 참고했지만, 더 안전하게 만들기 위해 약간 수정했습니다. 최종적으로 구현된 흐름은 다음과 같습니다:

<figure><img style="margin-left: auto;margin-right: auto;max-height: 600px !important;" src="/apple-login-flow-chart.svg" alt="Apple Login flow chart" /><figcaption></figcaption></figure>

안타깝게도 백엔드와 앱 코드의 일부 수정이 필요하지만, 현재로서는 최선의 방법입니다.

## Android에서 개선된 Google 로그인

다음으로, Android에서 Google 로그인을 구현하고자 했습니다. [CodetrixStudio의 CapacitorGoogleAuth](https://githubcom/CodetrixStudio/CapacitorGoogleAuth)가 [곧 지원 중단될 GMS 라이브러리](https://developerandroidcom/identity/sign-in/legacy-gsi-migration#authorization)를 사용한다는 것을 알게 되었습니다. 이 GMS 라이브러리가 레거시로 간주되어, [CredentialManager](https://developerandroidcom/identity/sign-in/credential-manager-siwg)를 사용하기로 결정했습니다. 이를 통해 로그인 흐름을 단순화하고 성가신 [오류 10](https://githubcom/CodetrixStudio/CapacitorGoogleAuth/issues/332)을 제거할 수 있었습니다 🎉

## 문서

마지막으로, 훌륭한 ✨ 문서를 작성했습니다. 문서의 정확성과 포괄성을 보장하기 위해 많은 시간을 투자했습니다.
문서에는 Apple과 Google 설정에 대한 상세한 가이드가 포함되어 있습니다. 또한 Apple 로그인을 위한 [예제 백엔드](https://githubcom/WcaleNieWolny/capgo-social-login-backend-demo)도 제공했습니다 🍎

[Apple](https://githubcom/Cap-go/capacitor-social-login/blob/main/docs/setup_applemd)과 [Google](https://githubcom/Cap-go/capacitor-social-login/blob/main/docs/setup_googlemd) 가이드를 확인해보세요!

## 결론

결론적으로, Capacitor Social Login 플러그인은 많은 새롭고 흥미로운 기능을 도입했으며, 앞으로도 더 많은 기능이 추가될 예정입니다 🚀