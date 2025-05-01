---
slug: create-react-mobile-apps-with-capacitor
title: Construction d'applications mobiles avec React et Capacitor
description: 'React, Capacitor를 사용하여 모바일 앱을 구축하고 Konsta UI로 네이티브 UI를 향상시키는 방법을 알아보세요.'
author: Martin Donadieu
author_image_url: 'https://avatars.githubusercontent.com/u/4084527?v=4'
author_url: 'https://x.com/martindonadieu'
created_at: 2023-02-21T00:00:00.000Z
updated_at: 2023-03-10T00:00:00.000Z
head_image: /react_capacitor.webp
head_image_alt: React와 Capacitor 일러스트레이션
keywords: >-
  React, Capacitor, mobile app development, live updates, OTA updates,
  continuous integration, mobile app updates
tag: Tutorial
published: true
locale: ko
next_blog: update-your-capacitor-apps-seamlessly-using-capacitor-updater
---

[React](https://reactjsorg/)와 Capacitor를 사용하여 네이티브 모바일 개발로 전환하는 방법을 이 튜토리얼에서 알아보겠습니다. 선택적으로 Tailwind CSS와 함께 [Konsta UI](https://konstauicom/)를 추가하여 모바일 UI를 개선할 수도 있습니다.

Capacitor를 사용하면 큰 수정이나 React Native와 같은 새로운 기술을 배우지 않고도 React 웹 애플리케이션을 네이티브 모바일 앱으로 쉽게 변환할 수 있습니다.

간단한 몇 단계만으로 대부분의 React 애플리케이션을 모바일 앱으로 변환할 수 있습니다.

이 튜토리얼에서는 새로운 React 앱으로 시작하여 Capacitor를 통해 네이티브 모바일 앱으로 전환하는 과정을 안내합니다. 추가로 [Konsta UI](https://konstauicom/)를 사용하여 Tailwind CSS로 모바일 UI를 개선할 수도 있습니다.

## Capacitor 소개

CapacitorJS는 혁신적입니다! 어떤 웹 프로젝트에도 쉽게 통합할 수 있으며, 애플리케이션을 네이티브 웹뷰로 래핑하여 Xcode와 Android Studio 프로젝트를 자동으로 생성합니다. 또한 플러그인을 통해 JS 브리지를 통해 카메라와 같은 네이티브 기기 기능에 접근할 수 있습니다.

Capacitor를 사용하면 복잡한 설정이나 가파른 학습 곡선 없이 훌륭한 네이티브 모바일 앱을 얻을 수 있습니다. 간단한 API와 간소화된 기능으로 프로젝트에 쉽게 통합할 수 있습니다. Capacitor로 완전히 기능하는 네이티브 앱을 만드는 것이 얼마나 쉬운지 놀라실 것입니다!

## React 앱 준비하기

React 애플리케이션을 시작하는 다양한 방법이 있지만, 이 튜토리얼에서는 빈 React 애플리케이션을 제공하는 가장 간단한 방법을 사용하겠습니다:

[[CODE_BLOCK]]

네이티브 모바일 앱을 만들기 위해서는 프로젝트의 **export**가 필요합니다. 따라서 React 프로젝트를 빌드하고 내보내는 데 사용할 수 있는 간단한 스크립트를 **package.json**에 추가해 보겠습니다:

[[CODE_BLOCK]]

이제 `npm run build`를 실행하면 프로젝트 루트에 새로운 out 폴더가 생성될 것입니다.

이 폴더는 나중에 Capacitor에서 사용되지만, 지금은 올바르게 설정해야 합니다.

## React 앱에 Capacitor 추가하기

웹 앱을 네이티브 모바일 컨테이너로 패키징하기 위해서는 몇 가지 초기 단계를 따라야 하지만, 이후에는 단순히 `sync` 명령어 실행만으로 충분합니다.

먼저 개발 의존성으로 [Capacitor CLI](https://capacitorjs.com/docs/cli/)를 설치하고 프로젝트에 설정할 수 있습니다. 설정 중에 이름과 번들 ID에 대해 기본값을 수락하려면 "enter"를 누르면 됩니다.

다음으로 코어 패키지와 iOS 및 Android 플랫폼용 관련 패키지를 설치해야 합니다.

마지막으로 플랫폼을 추가하면 Capacitor가 프로젝트 루트에 각 플랫폼용 폴더를 생성합니다:

[[CODE_BLOCK]]

이제 React 프로젝트에 새로운 **ios**와 **android** 폴더가 보일 것입니다.

**이것들은 실제 네이티브 프로젝트입니다!**

나중에 Android 프로젝트에 접근하려면 [Android Studio](https://developer.android.com/studio/)를 설치해야 합니다. iOS의 경우 Mac이 필요하며 [Xcode](https://developer.apple.com/xcode/)를 설치해야 합니다.

또한 프로젝트에서 **capacitor.config.ts** 파일을 찾을 수 있는데, 이는 동기화 중에 사용되는 기본적인 Capacitor 설정을 포함합니다. 주의해야 할 유일한 것은 **webDir**로, 빌드 명령어의 결과물을 가리켜야 합니다. 현재는 부정확합니다.

이를 수정하기 위해 **capacitor.config.json** 파일을 열고 **webDir**을 업데이트하세요:

[[CODE_BLOCK]]

다음 명령어를 실행하여 시도해볼 수 있습니다:

[[CODE_BLOCK]]

첫 번째 명령어 `npm run build`는 React 프로젝트를 빌드하고 정적 빌드를 내보냅니다.

두 번째 명령어 `npx cap sync`는 모든 웹 코드를 네이티브 플랫폼의 올바른 위치에 동기화하여 앱에서 표시될 수 있도록 합니다.

또한 sync 명령어는 네이티브 플랫폼을 업데이트하고 플러그인을 설치할 수 있으므로, 새로운 [Capacitor plugins](https://capacitorjs.com/docs/plugins/)를 설치할 때 `npx cap sync`를 다시 실행해야 합니다.